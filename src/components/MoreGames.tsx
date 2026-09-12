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
  const isZh = locale === 'zh';
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

      {/* 对比专题收口：把每个棋种页的权重导向 /gomoku-vs-go 与 /gomoku-vs-xiangqi
          两个「近胜利」对比页（旗舰词 gomoku vs go 长期排 9–11 名）。 */}
      <div
        style={{
          marginTop: 'var(--space-4)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
          {isZh ? '对比一下：' : 'Compare:'}
        </span>
        <Link
          href="/gomoku-vs-go"
          style={{
            display: 'inline-block',
            padding: 'var(--space-2) var(--space-4)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-2)',
            textDecoration: 'none',
            color: 'var(--fg)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-emphasis)',
          }}
        >
          {isZh ? '五子棋 vs 围棋' : 'Gomoku vs Go'}
        </Link>
        <Link
          href="/gomoku-vs-xiangqi"
          style={{
            display: 'inline-block',
            padding: 'var(--space-2) var(--space-4)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-2)',
            textDecoration: 'none',
            color: 'var(--fg)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-emphasis)',
          }}
        >
          {isZh ? '五子棋 vs 象棋' : 'Gomoku vs Xiangqi'}
        </Link>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <Link href="/how-to" className="yb-btn yb-btn-primary">
          {t('games.learnAll')}
        </Link>
      </div>
    </section>
  );
}
