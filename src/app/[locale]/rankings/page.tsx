import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MineBadge } from '@/components/MineBadge';
import { RankBadge } from '@/components/RankBadge';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { getStore } from '@/lib/store';

// 排行榜数据来自 Neon DB，5 分钟 ISR 重生足够；"我"的高亮已下沉到客户端
// MineBadge（fetch /api/me），服务端不再读 session → 页面可被边缘缓存。
export const revalidate = 300;

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return { title: meta('rankings.title'), description: meta('rankings.description'), alternates: localeAlternates('rankings', locale) };
}

export default async function RankingsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'rankings' });
  const entries = await getStore().listRankings(100);

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-10)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {t('sub')}
        </p>
      </header>

      {entries.length === 0 ? (
        <div
          className="yb-card"
          style={{ padding: 'var(--space-10)', marginTop: 'var(--space-8)', maxWidth: 520 }}
        >
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
        <div
          className="yb-card"
          style={{ marginTop: 'var(--space-8)', overflowX: 'auto', padding: '0 var(--space-2)' }}
        >
          <table className="yb-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: 56 }}>
                  {t('position')}
                </th>
                <th scope="col">{t('player')}</th>
                <th scope="col">{t('rank')}</th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  {t('rating')}
                </th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  {t('played')}
                </th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  {t('winRate')}
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const winRate =
                  entry.gamesPlayed > 0
                    ? Math.round((entry.gamesWon / entry.gamesPlayed) * 100)
                    : 0;
                return (
                  <tr key={entry.userId}>
                    <td className="yb-num" style={{ color: 'var(--meta)' }}>
                      {entry.position}
                    </td>
                    <td style={{ color: 'var(--fg)', fontWeight: 'var(--weight-emphasis)' }}>
                      {entry.displayName}
                      <MineBadge userId={entry.userId} />
                    </td>
                    <td>
                      <RankBadge elo={entry.elo} size="sm" />
                    </td>
                    <td className="yb-num" style={{ textAlign: 'right' }}>
                      {entry.elo}
                    </td>
                    <td className="yb-num" style={{ textAlign: 'right' }}>
                      {entry.gamesPlayed}
                    </td>
                    <td className="yb-num" style={{ textAlign: 'right' }}>
                      {winRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
