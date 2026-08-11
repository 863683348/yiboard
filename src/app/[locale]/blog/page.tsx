import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { localeAlternates } from '@/i18n/metadata';
import { POSTS } from '@/lib/blog/posts';
import { Link } from '@/i18n/navigation';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return { title: meta('blog.title'), description: meta('blog.description'), alternates: localeAlternates('blog', locale) };
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const isZh = locale === 'zh';
  const lang = isZh ? 'zh' : 'en';

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      <div className="yb-grid yb-grid-1" style={{ maxWidth: 760, marginTop: 'var(--space-8)', gap: 'var(--space-4)' }}>
        {[...POSTS]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((post) => (
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
          </article>
        ))}
      </div>
    </div>
  );
}
