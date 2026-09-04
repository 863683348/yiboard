import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

// 六种棋的集群内链：从任一棋种页把权重导向其余 5 个棋种页 + 玩法说明 hub。
// 这是把"近胜利页"(4–10 名) 彼此串联、集中放大域名权重的核心结构。
const GAMES = [
  { href: '/xiangqi', key: 'xiangqi' },
  { href: '/go', key: 'go' },
  { href: '/reversi', key: 'reversi' },
  { href: '/chess', key: 'chess' },
  { href: '/tsumego', key: 'tsumego' },
  { href: '/play', key: 'gomoku' },
] as const;

export async function MoreGames({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  return (
    <section className="yb-container yb-section" style={{ maxWidth: 920, marginTop: 'var(--space-8)' }}>
      <h2 className="yb-h3">{t('games.moreHeading')}</h2>
      <div className="yb-grid yb-grid-3" style={{ marginTop: 'var(--space-4)', gap: 'var(--space-3)' }}>
        {GAMES.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            style={{
              display: 'block',
              padding: 'var(--space-4)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-2)',
              textDecoration: 'none',
              color: 'var(--fg)',
              fontWeight: 'var(--weight-emphasis)',
            }}
          >
            {t(`games.${g.key}.name`)}
          </Link>
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-4)' }}>
        <Link href="/how-to" className="yb-btn yb-btn-primary">
          {t('games.learnAll')}
        </Link>
      </div>
    </section>
  );
}
