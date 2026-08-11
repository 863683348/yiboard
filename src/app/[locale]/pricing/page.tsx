import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return { title: meta('pricing.title'), description: meta('pricing.description'),
    keywords: meta('pricing.keywords'), alternates: localeAlternates('pricing', locale) };
}

const TIERS = ['free', 'plus', 'pro'] as const;

export const revalidate = 86400;

export default async function PricingPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pricing' });
  const faq = ['faqQ1', 'faqQ2', 'faqQ3'] as const;
  const faqA = ['faqA1', 'faqA2', 'faqA3'] as const;

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      {/* ---------------- 三档 ---------------- */}
      <div className="yb-grid yb-grid-3" style={{ marginTop: 'var(--space-8)' }}>
        {TIERS.map((tier) => {
          const free = tier === 'free';
          const popular = tier === 'plus';
          return (
            <article
              key={tier}
              className="yb-card"
              style={{
                padding: 'var(--card-pad)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                border: popular ? '1.5px solid var(--accent)' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <h2 className="yb-h3">{t(`${tier}.name`)}</h2>
                {popular ? <span className="yb-chip yb-chip-accent">{t('popular')}</span> : null}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--fg)' }}>
                  {free ? t(`${tier}.price`) : `$${t(`${tier}.price`)}`}
                </span>
                {!free ? <span className="yb-meta">{t('monthly')}</span> : null}
              </div>

              <p className="yb-meta">{t(`${tier}.note`)}</p>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: 'var(--space-2)',
                  flexGrow: 1,
                }}
              >
                {Array.from({ length: 4 }, (_, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}
                  >
                    <Check size={15} weight="bold" aria-hidden style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                    {t(`${tier}.features.${i}`)}
                  </li>
                ))}
              </ul>

              {free ? (
                <Link href="/play" className="yb-btn yb-btn-primary" style={{ justifyContent: 'center' }}>
                  {t('cta')}
                </Link>
              ) : (
                <span
                  className="yb-btn yb-btn-outline"
                  style={{ justifyContent: 'center', opacity: 0.65, cursor: 'default' }}
                  aria-disabled="true"
                >
                  {t('comingSoon')}
                </span>
              )}
            </article>
          );
        })}
      </div>

      {/* ---------------- 定价 FAQ ---------------- */}
      <section className="yb-section" style={{ maxWidth: 720 }}>
        <h2 className="yb-h3">{t('faqTitle')}</h2>
        <div className="yb-card" style={{ padding: 'var(--card-pad)', marginTop: 'var(--space-5)', display: 'grid', gap: 'var(--space-4)' }}>
          {faq.map((q, i) => (
            <div key={q}>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)' }}>{t(q)}</h3>
              <p style={{ marginTop: 4, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>{t(faqA[i]!)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
