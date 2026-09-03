import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Lightbulb, ListNumbers, TextAlignLeft, BookOpen, GameController } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const tMeta = await getTranslations({ locale, namespace: 'meta.howTo' });
  return {
    title: tMeta('title'),
    description: tMeta('description'),
    keywords: tMeta('keywords'),
    alternates: localeAlternates('how-to', locale),
  };
}

export default async function HowToPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'howTo' });
  const homeT = await getTranslations({ locale, namespace: 'home' });

  const rules = ['rule1', 'rule2', 'rule3', 'rule4', 'rule5'] as const;
  const tips = [
    { title: 'tip1Title', body: 'tip1Body' },
    { title: 'tip2Title', body: 'tip2Body' },
    { title: 'tip3Title', body: 'tip3Body' },
  ] as const;

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`faq.${i}.q`),
    a: t(`faq.${i}.a`),
  }));

  const games = [
    { key: 'gomoku', rulesHref: '/gomoku-rules', playHref: '/play' },
    { key: 'xiangqi', rulesHref: '/learn-xiangqi', playHref: '/xiangqi' },
    { key: 'go', rulesHref: '/go-rules', playHref: '/go' },
    { key: 'reversi', rulesHref: '/reversi-rules', playHref: '/reversi' },
    { key: 'chess', rulesHref: '/chess-rules', playHref: '/chess' },
    { key: 'tsumego', rulesHref: '/tsumego-rules', playHref: '/tsumego' },
  ] as const;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
        <header style={{ maxWidth: '58ch' }}>
          <h1 className="yb-h2">{t('title')}</h1>
          <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>{t('sub')}</p>
        </header>

        {/* ---------------- 六种棋入口 ---------------- */}
        <section className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead icon={<GameController size={18} weight="bold" aria-hidden />} title={t('gamesTitle')} />
          <div className="yb-grid yb-grid-2" style={{ gap: 'var(--space-4)' }}>
            {games.map((g) => (
              <article
                key={g.key}
                className="yb-card"
                style={{ padding: 'var(--card-pad)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
              >
                <h3 className="yb-h3" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
                  {homeT(`games.${g.key}.name`)}
                </h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)', flex: 1 }}>
                  {homeT(`games.${g.key}.blurb`)}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <Link href={g.rulesHref} className="yb-btn yb-btn-outline" style={{ fontSize: 'var(--text-sm)' }}>
                    {t('rulesCta')}
                  </Link>
                  <Link href={g.playHref} className="yb-btn yb-btn-primary" style={{ fontSize: 'var(--text-sm)' }}>
                    {t('playCta')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- 五子棋详解（保留最完整的内容） ---------------- */}
        <section className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead icon={<ListNumbers size={18} weight="bold" aria-hidden />} title={t('featuredGameTitle')} />
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: 'var(--space-3)',
            }}
          >
            {rules.map((key, i) => (
              <li
                key={key}
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  alignItems: 'flex-start',
                  padding: 'var(--space-4)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-2)',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-pill)',
                    border: '1.5px solid var(--accent)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--fg)', maxWidth: '58ch' }}>
                  {t(key)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- 三个进阶贴士 ---------------- */}
        <section className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead
            icon={<Lightbulb size={18} weight="bold" aria-hidden />}
            title={t('openingTitle')}
          />
          <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-4)' }}>
            {tips.map((tip) => (
              <article key={tip.title} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)' }}>
                  {t(tip.title)}
                </h3>
                <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
                  {t(tip.body)}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- 记谱说明 ---------------- */}
        <section className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead
            icon={<TextAlignLeft size={18} weight="bold" aria-hidden />}
            title={t('notationTitle')}
          />
          <div className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-2)', margin: 0 }}>
              {t('notationBody')}
            </p>
            <p
              className="yb-num"
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-base)',
                color: 'var(--fg)',
                letterSpacing: '0.08em',
              }}
            >
              A1 · H8 · O15
            </p>
          </div>
        </section>

        {/* ---------------- 相关规则指南 ---------------- */}
        <section className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead
            icon={<BookOpen size={18} weight="bold" aria-hidden />}
            title={t('relatedTitle')}
          />
          <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)' }}>
            {games.map((g) => (
              <RelatedLink key={g.key} href={g.rulesHref} label={homeT(`games.${g.key}.name`)} />
            ))}
            <RelatedLink href="/renju-rules" label={t('nav.renjuRules')} />
            <RelatedLink href="/gomoku-vs-go" label={t('nav.gomokuVsGo')} />
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead
            icon={<Lightbulb size={18} weight="bold" aria-hidden />}
            title={t('faqTitle')}
          />
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            {faqItems.map((it, i) => (
              <details
                key={i}
                style={{ border: '1px solid var(--border-soft)', borderRadius: 8, padding: 'var(--space-3)' }}
              >
                <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{it.q}</summary>
                <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--fg-2)' }}>
                  {it.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
          <h2 className="yb-h3" style={{ marginBottom: 'var(--space-4)' }}>
            {t('moreGamesTitle')}
          </h2>
          <div className="yb-grid yb-grid-2" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <RelatedLink href="/xiangqi" label={homeT('games.xiangqi.name')} />
            <RelatedLink href="/go" label={homeT('games.go.name')} />
            <RelatedLink href="/reversi" label={homeT('games.reversi.name')} />
            <RelatedLink href="/chess" label={homeT('games.chess.name')} />
          </div>
          <Link href="/play" className="yb-btn yb-btn-primary">
            {t('cta')}
          </Link>
          <Link
            href="/glossary"
            className="yb-btn yb-btn-outline"
            style={{ marginLeft: 'var(--space-3)' }}
          >
            {t('glossaryLink')}
          </Link>
          <Link
            href="/faq"
            className="yb-btn yb-btn-outline"
            style={{ marginLeft: 'var(--space-3)' }}
          >
            {t('faqLink')}
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

function SectionHead({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          color: 'var(--accent)',
        }}
      >
        {icon}
      </span>
      <h2 className="yb-h3" style={{ margin: 0 }}>
        {title}
      </h2>
    </div>
  );
}
