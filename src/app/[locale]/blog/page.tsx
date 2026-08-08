import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title'), description: t('sub'), alternates: localeAlternates('blog', locale) };
}

const POSTS = ['p1', 'p2', 'p3'] as const;

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      <div className="yb-grid yb-grid-1" style={{ maxWidth: 760, marginTop: 'var(--space-8)', gap: 'var(--space-4)' }}>
        {POSTS.map((post) => (
          <article key={post} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <p className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>
              {t(`${post}Date`)}
            </p>
            <h2 className="yb-h3" style={{ marginTop: 'var(--space-2)' }}>
              {t(`${post}Title`)}
            </h2>
            <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
              {t(`${post}Excerpt`)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
