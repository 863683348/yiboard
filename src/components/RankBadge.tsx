import { rankColorVar, rankFromElo, type Rank } from '@/lib/rank';

export interface RankBadgeProps {
  elo?: number;
  rank?: Rank;
  /** 只显示徽章方块，不带段位全名 */
  compact?: boolean;
  size?: 'sm' | 'md';
}

/**
 * 段位徽章 —— 形 + 色双编码：品级方章、段位圆章，色盲用户也能区分。
 */
export function RankBadge({ elo, rank, compact = false, size = 'md' }: RankBadgeProps) {
  const resolved = rank ?? rankFromElo(elo ?? 1200);
  const color = rankColorVar(resolved.tier);
  const isDan = resolved.tier === 'dan';
  const box = size === 'sm' ? 22 : 28;

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}
      title={`${resolved.name} · ${resolved.zh}`}
    >
      <span
        aria-hidden
        className="yb-num"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: box,
          height: box,
          borderRadius: isDan ? 'var(--radius-pill)' : 4,
          border: `1.5px solid ${color}`,
          color,
          fontFamily: 'var(--font-display)',
          fontSize: size === 'sm' ? 10 : 11,
          fontWeight: 700,
          letterSpacing: '0.02em',
          flexShrink: 0,
        }}
      >
        {resolved.short}
      </span>
      {compact ? null : (
        <span
          style={{
            fontSize: size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)',
            fontWeight: 'var(--weight-emphasis)',
            color: 'var(--fg)',
            whiteSpace: 'nowrap',
          }}
        >
          {resolved.name}
        </span>
      )}
    </span>
  );
}
