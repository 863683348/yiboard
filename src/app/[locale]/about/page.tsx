import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: t('lead'), alternates: localeAlternates('about') };
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const contactEmail = 'hello@yiboard.com';

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

      <section style={{ maxWidth: '62ch', marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {nav('play')}
        </Link>
      </section>
    </div>
  );
}
