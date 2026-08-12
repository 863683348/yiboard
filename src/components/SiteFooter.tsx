import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { LOCALE_LABELS, routing, type Locale } from '@/i18n/routing';

const COLUMNS = [
  {
    heading: 'play' as const,
    links: [
      { href: '/play', label: 'nav.play' },
      { href: '/rankings', label: 'nav.rankings' },
      { href: '/pricing', label: 'nav.pricing' },
    ],
  },
  {
    heading: 'learn' as const,
    links: [
      { href: '/how-to', label: 'nav.howTo' },
      { href: '/blog', label: 'nav.blog' },
      { href: '/puzzle', label: 'footer.puzzle' },
      { href: '/games', label: 'footer.games' },
      { href: '/about', label: 'nav.about' },
    ],
  },
  {
    heading: 'legal' as const,
    links: [
      { href: '/privacy', label: 'footer.privacy' },
      { href: '/terms', label: 'footer.terms' },
      { href: '/faq', label: 'footer.faq' },
      { href: '/contact', label: 'footer.contact' },
    ],
  },
  {
    heading: 'project' as const,
    links: [{ href: '/about', label: 'about.contact' }],
  },
];

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 'var(--space-20)' }}>
      <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'var(--space-8)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                aria-hidden
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}
              >
                {t('brand.hanzi')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                }}
              >
                {t('brand.name')}
              </span>
            </div>
            <p className="yb-meta" style={{ marginTop: 'var(--space-2)', maxWidth: 260 }}>
              {t('footer.tagline')}
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={t(`footer.${column.heading}`)}>
              <h2 className="yb-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
                {t(`footer.${column.heading}`)}
              </h2>
              <ul style={{ display: 'grid', gap: 'var(--space-2)', listStyle: 'none', padding: 0 }}>
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--fg-2)',
                        textDecoration: 'none',
                      }}
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="yb-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
              {t('footer.language')}
            </h2>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                listStyle: 'none',
                padding: 0,
              }}
            >
              {routing.locales.map((l) => (
                <li key={l}>
                  <Link
                    href="/"
                    locale={l}
                    hrefLang={l}
                    className={l === locale ? 'yb-chip yb-chip-accent' : 'yb-chip'}
                    style={{ textDecoration: 'none' }}
                  >
                    {LOCALE_LABELS[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="yb-rule" style={{ marginBlock: 'var(--space-8)' }} />

        <p className="yb-meta">{t('footer.rights', { year })}</p>
      </div>
    </footer>
  );
}
