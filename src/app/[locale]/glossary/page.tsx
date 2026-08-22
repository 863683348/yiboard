import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BookOpen, Lightbulb } from '@phosphor-icons/react/dist/ssr';

import { GLOSSARY } from '@/lib/glossary';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'glossary' });
  return {
    title: t('title'),
    description: t('sub'),
    alternates: localeAlternates('glossary', locale),
  };
}

/** zh/en 双语字段，其他语言回退 en（与 blog 数据层同策略）。 */
function pick<T>(field: { zh: T; en: T }, locale: string): T {
  return (field as Record<string, T>)[locale] ?? field.en;
}

export default async function GlossaryPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'glossary' });

  // FAQPage JSON-LD：每条术语 = 一个 Q&A，直接进 PAA / 富媒体候选。
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GLOSSARY.map((term) => ({
      '@type': 'Question',
      name: `${pick(term.name, locale)}（${term.id}）`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${pick(term.def, locale)} ${pick(term.tip, locale)}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
        <header style={{ maxWidth: '58ch' }}>
          <span className="yb-chip yb-chip-accent">
            <BookOpen size={14} weight="bold" aria-hidden /> {t('chip')}
          </span>
          <h1 className="yb-h2" style={{ marginTop: 'var(--space-3)' }}>
            {t('title')}
          </h1>
          <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
            {t('sub')}
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-2)', marginTop: 'var(--space-3)' }}>
            {t('howToLink')}{' '}
            <Link href="/how-to" style={{ color: 'var(--accent)' }}>
              {t('howToLinkCta')}
            </Link>
          </p>
        </header>

        <section className="yb-section" style={{ maxWidth: 860 }}>
          <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-4)' }}>
            {GLOSSARY.map((term) => (
              <article
                key={term.id}
                id={term.anchor}
                className="yb-card"
                style={{ padding: 'var(--card-pad)' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <h2 className="yb-h3" style={{ margin: 0 }}>
                    {pick(term.name, locale)}
                  </h2>
                  <span className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>
                    {term.id}
                  </span>
                </div>
                <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-base)', color: 'var(--fg)', maxWidth: '64ch' }}>
                  {pick(term.def, locale)}
                </p>
                <p
                  style={{
                    marginTop: 'var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--fg-2)',
                    borderLeft: '2px solid var(--accent)',
                    paddingLeft: 'var(--space-3)',
                    maxWidth: '64ch',
                  }}
                >
                  <Lightbulb size={14} weight="bold" aria-hidden style={{ verticalAlign: -2, marginRight: 6 }} />
                  {pick(term.tip, locale)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
          <Link href="/play" className="yb-btn yb-btn-primary">
            {t('cta')}
          </Link>
        </section>
      </div>
    </>
  );
}
