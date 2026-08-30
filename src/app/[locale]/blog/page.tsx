import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { localeAlternates } from '@/i18n/metadata';
import { POSTS } from '@/lib/blog/posts';
import { routing, BLOG_LOCALES, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  // 博客仅 en/zh 有真实内容；其余语言版本的博客索引 noindex 且不进 hreflang（收缩策略）。
  const inBlog = BLOG_LOCALES.includes(locale as Locale);
  return {
    title: meta('blog.title'),
    description: meta('blog.description'),
    keywords: meta('blog.keywords'),
    openGraph: { title: meta('blog.title'), description: meta('blog.description'), images: [{ url: '/og.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: meta('blog.title'), description: meta('blog.description'), images: ['/og.png'] },
    alternates: localeAlternates('blog', locale, BLOG_LOCALES),
    ...(inBlog ? {} : { robots: { index: false, follow: true } }),
  };
}

export const revalidate = 3600;

// 站内搜索：匹配标题 / 摘要 / 关键词（中英都算），供 sitelinks searchbox（SearchAction /blog?q=）真实使用。
function matchPost(post: (typeof POSTS)[number], q: string): boolean {
  const hay = [
    post.title.zh, post.title.en,
    post.description.zh, post.description.en,
    ...(post.keywords ?? []),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const sp = await props.searchParams;
  // 重复参数（?q=a&q=b）时 Next 给数组，取首项，避免 .trim() 抛 TypeError 导致 500
  const qParam = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const rawQ = (qParam ?? '').trim();
  const q = rawQ.toLowerCase();
  const isZh = locale === 'zh';
  const lang = isZh ? 'zh' : 'en';
  const searching = q.length > 0;
  const posts = [...POSTS]
    .filter((p) => !searching || matchPost(p, q))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const t = await getTranslations({ locale, namespace: 'blog' });
  const blogHref = locale === routing.defaultLocale ? '/blog' : `/${locale}/blog`;

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      <form
        action={blogHref}
        method="get"
        role="search"
        aria-label={t('searchLabel')}
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          maxWidth: 560,
          marginTop: 'var(--space-6)',
        }}
      >
        <input
          type="search"
          name="q"
          defaultValue={rawQ}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchLabel')}
          style={{
            flex: 1,
            padding: 'var(--space-3) var(--space-4)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-2)',
            color: 'var(--fg)',
            fontSize: 'var(--text-base)',
          }}
        />
        <button
          type="submit"
          className="yb-btn yb-btn-primary"
          style={{ whiteSpace: 'nowrap' }}
        >
          {t('searchButton')}
        </button>
        {searching && (
          <Link
            href="/blog"
            className="yb-btn yb-btn-outline"
            style={{ whiteSpace: 'nowrap' }}
          >
            {t('clearSearch')}
          </Link>
        )}
      </form>

      {searching && (
        <p className="yb-meta" style={{ marginTop: 'var(--space-4)' }}>
          {posts.length
            ? t('resultsCount', { count: posts.length, q: rawQ })
            : t('noResults', { q: rawQ })}
        </p>
      )}

      <div className="yb-grid yb-grid-1" style={{ maxWidth: 760, marginTop: 'var(--space-6)', gap: 'var(--space-4)' }}>
        {posts.map((post) => (
          <article key={post.slug} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <p className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>
              {post.date}
            </p>
            <h2 className="yb-h3" style={{ marginTop: 'var(--space-2)' }}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'underline' }}>
                {post.title[lang as 'zh' | 'en']}
              </Link>
            </h2>
            <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
              {post.description[lang as 'zh' | 'en']}
            </p>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
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
          </article>
        ))}

        {searching && posts.length === 0 && (
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--fg-2)' }}>
            <Link href="/blog" style={{ textDecoration: 'underline' }}>
              {t('allPosts')}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
