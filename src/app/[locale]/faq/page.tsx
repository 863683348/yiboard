import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return { title: t('title'), description: t('sub'), alternates: localeAlternates('faq', locale) };
}

const ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;
const ANSWERS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'] as const;

export default async function FaqPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      <div style={{ maxWidth: 760, marginTop: 'var(--space-8)', display: 'grid', gap: 'var(--space-3)' }}>
        {ITEMS.map((q, i) => (
          <details key={q} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <summary
              style={{
                cursor: 'pointer',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--weight-emphasis)',
                color: 'var(--fg)',
                listStyle: 'none',
              }}
            >
              {t(q)}
            </summary>
            <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
              {t(ANSWERS[i]!)}
            </p>
          </details>
        ))}
      </div>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/contact" className="yb-btn yb-btn-outline">
          {t('sub')}
        </Link>
      </section>
    </div>
  );
}
