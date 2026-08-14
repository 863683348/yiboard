import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getPostBySlug, getPostSlugs, type PostBlock } from '@/lib/blog/posts';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';

type Params = { locale: string; slug: string };

// Canonical 与 hreflang：en 无前缀（默认语言），zh 带 /zh 前缀；es/ja/pt-BR 回退英文内容但保留各自 URL。
function hrefFor(locale: Locale, slug: string) {
  return locale === routing.defaultLocale ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
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
  return {
    title: `${post.title[lang]} — YiBoard`,
    description: post.description[lang],
    keywords: post.keywords,
    alternates: {
      canonical,
      languages: Object.fromEntries(routing.locales.map((l) => [l, hrefFor(l, slug)])),
    },
  };
}

function Block({ block, lang }: { block: PostBlock; lang: 'zh' | 'en' }) {
  if (typeof block === 'string') return <p style={{ marginTop: 'var(--space-3)', lineHeight: 1.7 }}>{block}</p>;
  if (block.type === 'h2') return <h2 className="yb-h3" style={{ marginTop: 'var(--space-8)' }}>{block.text}</h2>;
  if (block.type === 'ul') {
    return (
      <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-5)', display: 'grid', gap: 'var(--space-2)', lineHeight: 1.6 }}>
        {block.items.map((it, i) => (
          <li key={i} style={{ fontSize: 'var(--text-sm)' }}>{it}</li>
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
            <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{it.a}</p>
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
        author: { '@type': 'Organization', name: 'YiBoard', url: 'https://yiboardgame.com' },
        publisher: { '@type': 'Organization', name: 'YiBoard', url: 'https://yiboardgame.com' },
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
