import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return { title: meta('about.title'), description: meta('about.description'),
    keywords: meta('about.keywords'), openGraph: { title: meta('about.title'), description: meta('about.description'), images: [{ url: '/og.png', width: 1200, height: 630 }] }, twitter: { card: 'summary_large_image', title: meta('about.title'), description: meta('about.description'), images: ['/og.png'] }, alternates: localeAlternates('about', locale) };
}

export const revalidate = 86400;

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const contactEmail = 'ahmedlzany423@gmail.com';

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '62ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('lead')}
        </p>
      </header>

      <div style={{ maxWidth: '62ch', marginTop: 'var(--space-8)', display: 'grid', gap: 'var(--space-5)' }}>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--fg)', margin: 0 }}>{t('p1')}</p>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--fg)', margin: 0 }}>{t('p2')}</p>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--fg)', margin: 0 }}>{t('p3')}</p>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--fg)', margin: 0 }}>{t('p4')}</p>
      </div>

      {/* ---------------- 实体棋盘 ---------------- */}
      <section className="yb-section" style={{ maxWidth: '62ch' }}>
        <div className="yb-card" style={{ padding: 'var(--card-pad)' }}>
          <h2 className="yb-h3">{t('shopTitle')}</h2>
          <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
            {t('shopBody')}
          </p>
        </div>
      </section>

      {/* ---------------- 联系 ---------------- */}
      <section style={{ maxWidth: '62ch', marginTop: 'var(--space-8)' }}>
        <h2 className="yb-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
          {t('contact')}
        </h2>
        <a
          href={`mailto:${contactEmail}`}
          className="yb-btn yb-btn-outline"
          style={{ textDecoration: 'none' }}
        >
          <EnvelopeSimple size={16} weight="regular" aria-hidden />
          {contactEmail}
        </a>
      </section>

      {/* ---------------- 常见问题（FAQ 正文随语言本地化，schema 统一英文，与 /faq 约定一致） ---------------- */}
      <section className="yb-section" style={{ maxWidth: '62ch' }}>
        <h2 className="yb-h3" style={{ marginBottom: 'var(--space-4)' }}>{t('faqHead')}</h2>
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {(['1', '2', '3'] as const).map((i) => (
            <details
              key={i}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                background: 'var(--surface-2)',
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 'var(--weight-emphasis)', fontSize: 'var(--text-base)', color: 'var(--fg)' }}>
                {t(`q${i}`)}
              </summary>
              <p style={{ marginTop: 'var(--space-3)', marginBottom: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
                {t(`a${i}`)}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: '62ch', marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {nav('play')}
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Is YiBoard free to play?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every game runs free in your browser with no account required. Optional extras such as the physical board line are separate and not yet on sale.' } },
              { '@type': 'Question', name: 'Do I need to install anything?', acceptedAnswer: { '@type': 'Answer', text: 'No. YiBoard is a responsive web app — it opens in any desktop or mobile browser with no download, no install and no sign-up.' } },
              { '@type': 'Question', name: 'Which board games can I play on YiBoard?', acceptedAnswer: { '@type': 'Answer', text: 'Six: gomoku (five-in-a-row), renju, xiangqi (Chinese chess), Go, reversi and tsumego — plus chess. Each one has rules, a live board and shared game replays.' } },
            ],
          }),
        }}
      />
    </div>
  );
}
