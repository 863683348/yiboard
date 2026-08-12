import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { getPostBySlug, getPostSlugs, type PostBlock } from '@/lib/blog/posts';
import { routing } from '@/i18n/routing';

/** 每篇文章 × 每种语言都预生成（5 语 × 7 篇 = 35 个静态页）。 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs().map((slug) => ({ locale, slug })),
  );
}

/** 非 zh/en 语言（es/ja/pt-BR）回退英文内容。 */
function langFor(locale: string): 'zh' | 'en' {
  return locale === 'zh' ? 'zh' : 'en';
}

/** 解析正文里的 markdown 链接 `[text](/path)` → next-intl Link；纯文本原样返回。 */
function renderRichText(text: string, locale: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return parts.map((part, i) => {
    const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (!m) return part;
    const [label, url] = [m[1]!, m[2]!];
    // 外链直接 <a>；站内相对路径走 next-intl Link 自动带语言前缀
    if (/^https?:\/\//.test(url)) {
      return (
        <a key={`${keyPrefix}-${i}`} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
          {label}
        </a>
      );
    }
    return (
      <Link key={`${keyPrefix}-${i}`} href={url} style={{ textDecoration: 'underline' }}>
        {label}
      </Link>
    );
  });
}

/** 渲染内容块：段落 / h2 / 列表 / FAQ / CTA。 */
function Block({ block, locale }: { block: PostBlock; locale: string }) {
  if (typeof block === 'string') {
    return <p style={{ marginTop: 'var(--space-3)' }}>{renderRichText(block, locale, 'p')}</p>;
  }
  if (block.type === 'h2') {
    return (
      <h2 className="yb-h3" style={{ marginTop: 'var(--space-8)' }}>
        {block.text}
      </h2>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul style={{ marginTop: 'var(--space-3)', paddingLeft: '1.5em', display: 'grid', gap: 'var(--space-2)' }}>
        {block.items.map((item, i) => (
          <li key={i}>{renderRichText(item, locale, `li-${i}`)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'faq') {
    return (
      <div style={{ marginTop: 'var(--space-3)', display: 'grid', gap: 'var(--space-4)' }}>
        {block.items.map((item, i) => (
          <details key={i} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{item.q}</summary>
            <p style={{ marginTop: 'var(--space-2)', color: 'var(--fg-2)' }}>{item.a}</p>
          </details>
        ))}
      </div>
    );
  }
  // cta
  return (
    <p style={{ marginTop: 'var(--space-6)' }}>
      <Link href={block.href} className="yb-btn yb-btn-primary">
        {block.text}
      </Link>
    </p>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const lang = langFor(locale);
  const title = post.title[lang];
  const description = post.description[lang];
  return {
    title,
    description,
    keywords: post.keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
    alternates: localeAlternates(`/blog/${slug}`, locale),
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const lang = langFor(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[lang],
    description: post.description[lang],
    datePublished: post.date,
    inLanguage: lang,
    author: { '@type': 'Organization', name: 'YiBoard' },
    publisher: { '@type': 'Organization', name: 'YiBoard' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yiboardgame.com/blog/${slug}`,
    },
  };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article style={{ maxWidth: 720 }}>
        <p className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>
          <time dateTime={post.date}>{post.date}</time>
        </p>
        <h1 className="yb-h2" style={{ marginTop: 'var(--space-2)' }}>
          {post.title[lang]}
        </h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)', color: 'var(--fg-2)' }}>
          {post.description[lang]}
        </p>
        {post.content[lang].map((block, i) => (
          <Block key={i} block={block} locale={locale} />
        ))}
      </article>
    </div>
  );
}
