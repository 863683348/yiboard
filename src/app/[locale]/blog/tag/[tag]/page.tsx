import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getAllTags, getPostsByTag, POSTS, type BlogPost } from '@/lib/blog/posts';
import { routing, BLOG_LOCALES, type Locale } from '@/i18n/routing';
import { localeAlternates } from '@/i18n/metadata';
import { Link } from '@/i18n/navigation';

type Params = { locale: string; tag: string };

// Controlled tag vocabulary → display labels (en/zh). Avoids touching message files.
const TAG_LABELS: Record<string, { en: string; zh: string }> = {
  gomoku: { en: 'Gomoku', zh: '五子棋' },
  xiangqi: { en: 'Xiangqi', zh: '象棋' },
  go: { en: 'Go', zh: '围棋' },
  strategy: { en: 'Strategy', zh: '策略' },
  rules: { en: 'Rules', zh: '规则' },
  engineering: { en: 'Engineering', zh: '技术' },
  product: { en: 'Product', zh: '产品' },
  privacy: { en: 'Privacy', zh: '隐私' },
  multilingual: { en: 'Multilingual', zh: '多语言' },
  ai: { en: 'AI', zh: '人工智能' },
};

function tagLabel(tag: string, isZh: boolean): string {
  return (isZh ? TAG_LABELS[tag]?.zh : TAG_LABELS[tag]?.en) ?? tag;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllTags().map((tag) => ({ locale, tag })),
  );
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, tag } = await props.params;
  if (!getAllTags().includes(tag)) return {};
  const isZh = locale === 'zh';
  const label = tagLabel(tag, isZh);
  const title = isZh ? `${label}文章` : `${label} Articles`;
  const description = isZh
    ? `阅读 YiBoard 博客中所有关于${label}的文章。`
    : `Read every YiBoard blog post tagged with ${label}.`;
  const path = `blog/tag/${tag}`;
  // 博客标签归档仅 en/zh 有真实内容；其余语言版本 noindex 且不进 hreflang（收缩策略）。
  const inBlog = BLOG_LOCALES.includes(locale as Locale);
  return {
    title,
    description,
    alternates: localeAlternates(path, locale, BLOG_LOCALES),
    openGraph: {
      title,
      description,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
    ...(inBlog ? {} : { robots: { index: false, follow: true } }),
  };
}

export const revalidate = 3600;

export default async function BlogTagPage(props: { params: Promise<Params> }) {
  const { locale, tag } = await props.params;
  setRequestLocale(locale);
  if (!getAllTags().includes(tag)) notFound();

  const isZh = locale === 'zh';
  const lang = (isZh ? 'zh' : 'en') as 'zh' | 'en';
  const label = tagLabel(tag, isZh);
  const posts = getPostsByTag(tag);
  const t = await getTranslations({ locale, namespace: 'blog' });

  const canonical = locale === routing.defaultLocale ? `/blog/tag/${tag}` : `/${locale}/blog/tag/${tag}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'YiBoard', item: 'https://yiboardgame.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://yiboardgame.com/blog' },
          { '@type': 'ListItem', position: 3, name: label, item: `https://yiboardgame.com${canonical}` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: isZh ? `${label}文章` : `${label} Articles`,
        description: isZh
          ? `阅读 YiBoard 博客中所有关于${label}的文章。`
          : `Read every YiBoard blog post tagged with ${label}.`,
        url: `https://yiboardgame.com${canonical}`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: posts.length,
          itemListElement: posts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.title[lang],
            url: `https://yiboardgame.com${locale === routing.defaultLocale ? `/blog/${p.slug}` : `/${locale}/blog/${p.slug}`}`,
          })),
        },
      },
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
        <span>{label}</span>
      </nav>

      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{isZh ? `${label}文章` : `${label} Articles`}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {isZh
            ? `共 ${posts.length} 篇关于${label}的文章。`
            : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'} tagged with ${label}.`}
        </p>
      </header>

      <div className="yb-grid yb-grid-1" style={{ maxWidth: 760, marginTop: 'var(--space-6)', gap: 'var(--space-4)' }}>
        {posts.map((post: BlogPost) => (
          <article key={post.slug} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <p className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>{post.date}</p>
            <h2 className="yb-h3" style={{ marginTop: 'var(--space-2)' }}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'underline' }}>
                {post.title[lang]}
              </Link>
            </h2>
            <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
              {post.description[lang]}
            </p>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {post.tags.map((tg) => (
                <Link
                  key={tg}
                  href={`/blog/tag/${tg}`}
                  style={{
                    fontSize: 'var(--text-xs)',
                    padding: '2px var(--space-3)',
                    border: tg === tag ? '1px solid var(--accent)' : '1px solid var(--border)',
                    borderRadius: 999,
                    textDecoration: 'none',
                    color: tg === tag ? 'var(--accent)' : 'var(--fg)',
                  }}
                >
                  #{tg}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 'var(--space-10)' }}>
        <Link href="/blog" className="yb-btn yb-btn-outline">{t('allPosts')}</Link>
      </div>
    </div>
  );
}
