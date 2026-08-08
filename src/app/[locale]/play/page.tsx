import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { FriendGame } from '@/components/FriendGame';
import { GomokuGame } from '@/components/GomokuGame';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

type SearchParams = Promise<{ mode?: string; room?: string }>;

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'play' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: meta('description'),
    alternates: localeAlternates('play', locale),
  };
}

export default async function PlayPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const { mode, room } = await props.searchParams;
  const friend = mode === 'friend' || Boolean(room);
  const t = await getTranslations({ locale, namespace: 'play' });

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-8)' }}>
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <h1 className="yb-h2">{t('title')}</h1>
        <nav
          aria-label={t('title')}
          style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
        >
          <Link
            href="/play"
            aria-current={friend ? undefined : 'page'}
            className={friend ? 'yb-btn yb-btn-ghost yb-btn-sm' : 'yb-btn yb-btn-outline yb-btn-sm'}
          >
            {t('vsAi')}
          </Link>
          <Link
            href="/play?mode=friend"
            aria-current={friend ? 'page' : undefined}
            className={friend ? 'yb-btn yb-btn-outline yb-btn-sm' : 'yb-btn yb-btn-ghost yb-btn-sm'}
          >
            {t('vsFriend')}
          </Link>
        </nav>
      </header>

      {friend ? <FriendGame initialCode={room ?? null} /> : <GomokuGame variant="full" />}
    </div>
  );
}
