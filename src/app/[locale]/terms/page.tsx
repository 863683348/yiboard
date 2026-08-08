import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return { title: t('title'), description: t('lead'), alternates: localeAlternates('terms') };
}

const SECTIONS = ['s1', 's2', 's3', 's4', 's5', 's6'] as const;

export default async function TermsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'terms' });

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '62ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-meta" style={{ marginTop: 'var(--space-2)' }}>
          {t('updated')}
        </p>
        <p className="yb-lead" style={{ marginTop: 'var(--space-4)' }}>
          {t('lead')}
        </p>
      </header>

      <div style={{ maxWidth: '62ch', marginTop: 'var(--space-8)', display: 'grid', gap: 'var(--space-6)' }}>
        {SECTIONS.map((section) => (
          <section key={section}>
            <h2 className="yb-h3">{t(`${section}Title`)}</h2>
            <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-base)', color: 'var(--fg-2)' }}>
              {t(`${section}Body`)}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
