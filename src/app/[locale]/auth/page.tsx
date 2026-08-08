import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { AuthForm } from '@/components/AuthForm';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('title'), description: t('sub'), alternates: localeAlternates('auth', locale) };
}

export default async function AuthPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'auth' });

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '46ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>
      <div style={{ marginTop: 'var(--space-8)' }}>
        <AuthForm />
      </div>
    </div>
  );
}
