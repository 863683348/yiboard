import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getPostBySlug, getPostSlugs, POSTS, type PostBlock, type BlogPost } from '@/lib/blog/posts';
import { routing, BLOG_LOCALES, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';

type Params = { locale: string; slug: string };

// 博客正文用轻量 markdown 链接语法 [文字](/内部路径) 或 [文字](https://外部)。
// 此前 Block 直接输出原始字符串，内链从未真正渲染成 <a>（还向用户展示裸 markdown）。
// renderInline 把这类语法解析为真实链接；其余文本原样输出。
const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function renderInline(text: string): ReactNode {
  if (!text.includes('[')) return text;
  const parts: ReactNode[] = [];
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[2] ?? '';
    // 协议白名单：仅站内相对路径与 http(s) 可作链接；javascript:/data: 等一律按纯文本输出（纵深防御，正文当前均为开发维护的 posts.ts）
    const safeScheme = href.startsWith('/') || /^https?:\/\//i.test(href);
    if (href.startsWith('/')) {
      parts.push(
        <Link key={k++} href={href} style={{ textDecoration: 'underline', color: 'var(--accent)' }}>
          {m[1]}
        </Link>
      );
    } else if (safeScheme) {
      parts.push(
        <a key={k++} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--accent)' }}>
          {m[1]}
        </a>
      );
    } else {
      parts.push(text.slice(m.index, m.index + m[0].length));
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

// Canonical 与 hreflang：en 无前缀（默认语言），zh 带 /zh 前缀；es/ja/pt-BR 回退英文内容但保留各自 URL。
function hrefFor(locale: Locale, slug: string) {
  return locale === routing.defaultLocale ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
}

// 博客实体（与 layout.tsx 的 Organization 一致：同名、同 URL、同 GitHub sameAs、同 logo），强化 E-E-A-T 实体一致性。
const YIBOARD_SAMEAS = ['https://github.com/863683348/yiboard'];

// 相关文章：按标题+描述英文关键词重合度取 3 篇（排除自身），文章间内链。
function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const tokenize = (s: string) =>
    new Set(
      (s || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
  const curTokens = tokenize(
    current.title.en + ' ' + current.description.en + ' ' + (current.keywords || []).join(' ')
  );
  const scored = POSTS.filter((p) => p.slug !== slug)
    .map((p) => {
      const t = tokenize(p.title.en + ' ' + p.description.en + ' ' + (p.keywords || []).join(' '));
      let score = 0;
      curTokens.forEach((w) => { if (t.has(w)) score++; });
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1));
  return scored.slice(0, limit).map((s) => s.p);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const isZh = locale === 'zh';
  const lang = (isZh ? 'zh' : 'en') as 'zh' | 'en';
  const canonical = hrefFor(locale as Locale, slug);
  // 仅 en/zh 有真实博客内容；es/ja/ko/pt-BR 回退英文属占位，统一 noindex（博客收缩策略）。
  const inBlog = BLOG_LOCALES.includes(locale as Locale);
  return {
    // 只给裸标题，品牌后缀由 layout 的 title.template ('%s — YiBoard') 统一追加，避免 "— YiBoard — YiBoard"
    title: post.title[lang],
    description: post.description[lang],
    keywords: post.keywords,
    alternates: {
      canonical,
      // 博客 hreflang 只列 en/zh + x-default；非内容语言不进 hreflang（避免英文正文以 4 个外语 URL 重复曝光）。
      languages: {
        en: hrefFor('en', slug),
        zh: hrefFor('zh', slug),
        'x-default': hrefFor(routing.defaultLocale, slug),
      },
    },
    ...(inBlog ? {} : { robots: { index: false, follow: true } }),
  };
}

function Block({ block, lang }: { block: PostBlock; lang: 'zh' | 'en' }) {
  if (typeof block === 'string') return <p style={{ marginTop: 'var(--space-3)', lineHeight: 1.7 }}>{renderInline(block)}</p>;
  if (block.type === 'h2') return <h2 className="yb-h3" style={{ marginTop: 'var(--space-8)' }}>{block.text}</h2>;
  if (block.type === 'ul') {
    return (
      <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-5)', display: 'grid', gap: 'var(--space-2)', lineHeight: 1.6 }}>
        {block.items.map((it, i) => (
          <li key={i} style={{ fontSize: 'var(--text-sm)' }}>{renderInline(it)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'faq') {
    return (
      <div style={{ marginTop: 'var(--space-4)' }}>
        {block.items.map((it, i) => (
          <details key={i} style={{ marginTop: 'var(--space-3)', border: '1px solid var(--border-soft)', borderRadius: 8, padding: 'var(--space-3)' }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{it.q}</summary>
            <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{renderInline(it.a)}</p>
          </details>
        ))}
      </div>
    );
  }
  if (block.type === 'cta') {
    return (
      <p style={{ marginTop: 'var(--space-8)' }}>
        <a
          href={block.href}
          style={{
            display: 'inline-block',
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--accent)',
            color: 'var(--accent-on)',
            borderRadius: 8,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {block.text}
        </a>
      </p>
    );
  }
  return null;
}

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // 非 en/zh 语言回退英文内容（URL 保留该语言前缀，canonical 指向该 URL；如需严格避免重复可后续改为重定向）
  const isZh = locale === 'zh';
  const lang = (isZh ? 'zh' : 'en') as 'zh' | 'en';
  const canonical = hrefFor(locale as Locale, slug);

  const faqItems = post.content[lang].filter((b): b is Extract<PostBlock, { type: 'faq' }> => typeof b !== 'string' && b.type === 'faq').flatMap((b) => b.items);
  const howTo = post.howTo?.[lang as 'zh' | 'en'] ?? post.howTo?.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'YiBoard', item: 'https://yiboardgame.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://yiboardgame.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title[lang], item: `https://yiboardgame.com${canonical}` },
        ],
      },
      {
        '@type': 'Article',
        headline: post.title[lang],
        description: post.description[lang],
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: isZh ? 'zh' : 'en',
        author: {
          '@type': 'Organization',
          name: 'YiBoard',
          url: 'https://yiboardgame.com',
          sameAs: YIBOARD_SAMEAS,
        },
        publisher: {
          '@type': 'Organization',
          name: 'YiBoard',
          url: 'https://yiboardgame.com',
          sameAs: YIBOARD_SAMEAS,
          logo: {
            '@type': 'ImageObject',
            url: 'https://yiboardgame.com/og.png',
            width: 1200,
            height: 630,
          },
        },
        url: `https://yiboardgame.com${canonical}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://yiboardgame.com${canonical}` },
      },
      ...(faqItems.length
        ? [{
            '@type': 'FAQPage',
            mainEntity: faqItems.map((it) => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
          }]
        : []),
      ...(howTo
        ? [{
            '@type': 'HowTo',
            name: howTo.name,
            step: howTo.steps.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.name,
              text: s.text,
            })),
          }]
        : []),
    ],
  };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-xs)', color: 'var(--fg-2)' }}>
        <Link href="/" style={{ textDecoration: 'underline' }}>YiBoard</Link>
        {' › '}
        <Link href="/blog" style={{ textDecoration: 'underline' }}>Blog</Link>
        {' › '}
        <span>{post.title[lang]}</span>
      </nav>

      <article style={{ maxWidth: 720 }}>
        <p className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>{post.date}</p>
        <h1 className="yb-h2">{post.title[lang]}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>{post.description[lang]}</p>

        <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {post.tags.map((tg) => (
            <Link
              key={tg}
              href={`/blog/tag/${tg}`}
              style={{
                fontSize: 'var(--text-xs)',
                padding: '2px var(--space-3)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                textDecoration: 'none',
                color: 'var(--fg)',
              }}
            >
              #{tg}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-8)' }}>
          {post.content[lang].map((b, i) => (
            <Block key={i} block={b} lang={lang} />
          ))}
        </div>

        {howTo && (
          <section style={{ marginTop: 'var(--space-10)' }}>
            <h2 className="yb-h3">{howTo.name}</h2>
            <ol style={{ marginTop: 'var(--space-4)', paddingLeft: 'var(--space-6)', display: 'grid', gap: 'var(--space-4)', lineHeight: 1.6 }}>
              {howTo.steps.map((s, i) => (
                <li key={i}>
                  <strong>{s.name}</strong>
                  <p style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {(() => {
          const related = getRelatedPosts(slug);
          if (!related.length) return null;
          return (
            <section style={{ marginTop: 'var(--space-10)' }}>
              <h2 className="yb-h3">Related</h2>
              <ul style={{ marginTop: 'var(--space-4)', display: 'grid', gap: 'var(--space-3)', listStyle: 'none', padding: 0 }}>
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={hrefFor(locale as Locale, p.slug)}
                      style={{ textDecoration: 'underline', fontWeight: 600 }}
                    >
                      {p.title[lang]}
                    </Link>
                    <p style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--fg-2)' }}>{p.date}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}

        {/* 信息页导航：把链接权重从博客正文导向规则/玩法/术语/FAQ/棋题/棋谱等信息页（打破"全链 /play"的单点内链结构） */}
        <section style={{ marginTop: 'var(--space-10)' }}>
          <h2 className="yb-h3">{t('explore.title')}</h2>
          <ul style={{ marginTop: 'var(--space-4)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', listStyle: 'none', padding: 0 }}>
            {[
              { href: '/how-to', label: t('explore.howTo') },
              { href: '/gomoku-rules', label: t('explore.rules') },
              { href: '/renju-rules', label: t('explore.renju') },
              { href: '/glossary', label: t('explore.glossary') },
              { href: '/faq', label: t('explore.faq') },
              { href: '/puzzle', label: t('explore.puzzle') },
              { href: '/games', label: t('explore.games') },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{
                    display: 'inline-block',
                    padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 999,
                    fontSize: 'var(--text-sm)',
                    textDecoration: 'none',
                    color: 'var(--fg)',
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-soft)' }}>
          <p style={{ fontSize: 'var(--text-sm)' }}>
            YiBoard (yiboardgame.com) — 中华棋类，浏览器即玩，免费无注册。{' '}
            <Link href="/play" style={{ textDecoration: 'underline' }}>去下一局</Link>{' '}
            · <Link href="/blog" style={{ textDecoration: 'underline' }}>更多博客</Link>{' '}
            · <Link href="/how-to" style={{ textDecoration: 'underline' }}>玩法指南</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
