import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Lightbulb, ListNumbers, TextAlignLeft } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'howTo' });
  return { title: t('title'), description: t('sub'), alternates: localeAlternates('how-to', locale) };
}

export const revalidate = 86400;

export default async function HowToPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'howTo' });
  const rules = ['rule1', 'rule2', 'rule3', 'rule4', 'rule5'] as const;
  const tips = [
    { title: 'tip1Title', body: 'tip1Body' },
    { title: 'tip2Title', body: 'tip2Body' },
    { title: 'tip3Title', body: 'tip3Body' },
  ] as const;

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '58ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      {/* ---------------- 规则 ---------------- */}
      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead
          icon={<ListNumbers size={18} weight="bold" aria-hidden />}
          title={t('rulesTitle')}
        />
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

      {/* ---------------- CTA ---------------- */}
      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {t('cta')}
        </Link>
      </section>
    </div>
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
