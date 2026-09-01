import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Lightbulb, ListNumbers, TextAlignLeft } from '@phosphor-icons/react/dist/ssr';

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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Do I need an account to play?', acceptedAnswer: { '@type': 'Answer', text: 'No. Open the board and play — your progress is saved in this browser for 180 days. Attach an email only when you want it on another device.' } },
      { '@type': 'Question', name: 'How strong is the engine?', acceptedAnswer: { '@type': 'Answer', text: 'Three levels: Gentle (2-ply), Steady (4-ply), Sharp (6-ply). It runs alpha-beta search under a 500 ms budget, in your browser.' } },
      { '@type': 'Question', name: 'How do I play a friend?', acceptedAnswer: { '@type': 'Answer', text: 'On the Play page pick "Against a friend", create a room, and send the code or link. They join straight onto the board, no account needed.' } },
      { '@type': 'Question', name: 'How does the ladder work?', acceptedAnswer: { '@type': 'Answer', text: 'Friend matches settle ELO, mapped to the eighteen grades and dans from Ninth Grade to Ninth Dan. Everyone starts at 1200 (Sixth Grade). Engine games do not move your rating.' } },
      { '@type': 'Question', name: 'How long is my data kept?', acceptedAnswer: { '@type': 'Answer', text: 'Guest records last 180 days. With an email attached they are kept until you ask us to delete them.' } },
      { '@type': 'Question', name: 'When does the membership launch?', acceptedAnswer: { '@type': 'Answer', text: 'Payments are being integrated (later phase). Everything is free until then, and we will announce before launching.' } },
      { '@type': 'Question', name: 'Is there a mobile app?', acceptedAnswer: { '@type': 'Answer', text: 'YiBoard is a responsive web app (PWA planned), so it plays in any mobile browser with no download.' } },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
          <h2 className="yb-h3" style={{ marginBottom: 'var(--space-4)' }}>
            {t('moreGamesTitle')}
          </h2>
          <div className="yb-grid yb-grid-2" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <RelatedLink href="/xiangqi" label={t('nav.xiangqi')} />
            <RelatedLink href="/go" label={t('nav.go')} />
            <RelatedLink href="/reversi" label={t('nav.reversi')} />
            <RelatedLink href="/chess" label={t('nav.chess')} />
          </div>
          <Link href="/how-to" className="yb-btn yb-btn-primary">
            {t('rulesCta')}
          </Link>
          <Link href="/play" className="yb-btn yb-btn-outline" style={{ marginLeft: 'var(--space-3)' }}>
            {t('playCta')}
          </Link>
          <Link href="/contact" className="yb-btn yb-btn-outline" style={{ marginLeft: 'var(--space-3)' }}>
            {t('contactCta')}
          </Link>
        </section>
      </div>
    </>
  );
}

function RelatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-2)',
        textDecoration: 'none',
        color: 'var(--fg)',
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--weight-emphasis)',
      }}
    >
      {label}
      <span aria-hidden style={{ color: 'var(--accent)' }}>→</span>
    </Link>
  );
}
