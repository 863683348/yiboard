import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';

import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('sub'), alternates: localeAlternates('contact') };
}

const CONTACT_EMAIL = 'ahmedlzany423@gmail.com';

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      <div className="yb-card" style={{ padding: 'var(--card-pad)', maxWidth: 560, marginTop: 'var(--space-8)' }}>
        <p className="yb-meta">{t('emailLabel')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="yb-btn yb-btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <EnvelopeSimple size={16} weight="regular" aria-hidden />
            {CONTACT_EMAIL}
          </a>
        </div>
        <p className="yb-meta" style={{ marginTop: 'var(--space-4)' }}>
          {t('emailNote')}
        </p>
        <hr className="yb-rule" style={{ marginBlock: 'var(--space-4)' }} />
        <p className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>
          {t('privacyNote')}
        </p>
      </div>
    </div>
  );
}
