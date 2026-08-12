import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { getStore } from '@/lib/store';
import { rankFromElo } from '@/lib/rank';
import { LeaderboardTabs, type LeaderboardRow } from '@/components/LeaderboardTabs';

// 排行榜数据来自 Neon DB，5 分钟 ISR 重生足够；"我"的高亮已下沉到客户端
// MineBadge（fetch /api/me），服务端不再读 session → 页面可被边缘缓存。
export const revalidate = 300;

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: meta('rankings.title'),
    description: meta('rankings.description'),
    keywords: meta('rankings.keywords'),
    openGraph: {
      title: meta('rankings.title'),
      description: meta('rankings.description'),
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta('rankings.title'),
      description: meta('rankings.description'),
      images: ['/og.png'],
    },
    alternates: localeAlternates('rankings', locale),
  };
}

export default async function RankingsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'rankings' });
  const store = getStore();
  const [all, week, month] = await Promise.all([
    store.listRankings(100),
    store.listPeriodLeaders('week', 50),
    store.listPeriodLeaders('month', 50),
  ]);

  const toRow = (e: {
    userId: string;
    displayName: string;
    elo: number;
    position: number;
    wins: number;
    gamesPlayed: number;
  }): LeaderboardRow => {
    const winRate = e.gamesPlayed > 0 ? Math.round((e.wins / e.gamesPlayed) * 100) : 0;
    return {
      position: e.position,
      userId: e.userId,
      displayName: e.displayName,
      elo: e.elo,
      rankName: rankFromElo(e.elo).name,
      wins: e.wins,
      gamesPlayed: e.gamesPlayed,
      winRate,
    };
  };

  const allRows = all.map((e) =>
    toRow({
      userId: e.userId,
      displayName: e.displayName,
      elo: e.elo,
      position: e.position,
      wins: e.gamesWon,
      gamesPlayed: e.gamesPlayed,
    }),
  );
  const weekRows = week.map(toRow);
  const monthRows = month.map(toRow);

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-10)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      <div style={{ marginTop: 'var(--space-8)' }}>
        {allRows.length === 0 ? (
          <div className="yb-card" style={{ padding: 'var(--space-10)', maxWidth: 520 }}>
            <p style={{ color: 'var(--fg-2)' }}>{t('empty')}</p>
            <Link
              href="/play?mode=friend"
              className="yb-btn yb-btn-primary"
              style={{ marginTop: 'var(--space-5)' }}
            >
              {t('emptyAction')}
            </Link>
          </div>
        ) : (
          <LeaderboardTabs all={allRows} week={weekRows} month={monthRows} />
        )}
      </div>
    </div>
  );
}
