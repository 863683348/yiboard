'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

/**
 * 首页"全球玩家"统计区：服务端聚合 + 客户端拉取，30s 缓存。
 * 显示真实数字——不造假。零时显示加载骨架，错误时回退为占位。
 */
interface Stats {
  totalUsers: number;
  aiGames: number;
  friendGames: number;
  /** 此刻正在排队等对手的人数（心跳 45s 内有效） */
  waitingPlayers: number;
}

export function GlobalStats() {
  const t = useTranslations('home');
  const play = useTranslations('play');
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/stats', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Stats | null) => {
        if (!cancelled && data) setStats(data);
      })
      .catch(() => {
        /* 网络错误静默，保留骨架 */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      aria-labelledby="global-stats-heading"
      className="yb-card"
      style={{ padding: 'var(--card-pad)', marginTop: 'var(--space-8)', maxWidth: 720 }}
    >
      <h3
        id="global-stats-heading"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          margin: 0,
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-emphasis)',
          color: 'var(--success)',
          letterSpacing: 'var(--tracking-caps)',
          textTransform: 'uppercase',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--success)',
            display: 'inline-block',
          }}
        />
        {t('statsHeading')}
      </h3>

      <div
        style={{
          marginTop: 'var(--space-4)',
          display: 'grid',
          gap: 'var(--space-3)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        }}
      >
        <StatBox label={t('statsTotal')} value={stats?.totalUsers} />
        <StatBox label={t('statsAi')} value={stats?.aiGames} />
        <StatBox label={t('statsFriend')} value={stats?.friendGames} />
      </div>

      {/* 有人在排队才提示并给入口——0 人时不显示，免得点进去空等 */}
      {stats && stats.waitingPlayers > 0 ? (
        <p style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
          <Link href="/play?mode=match" className="yb-btn yb-btn-outline yb-btn-sm">
            {play('match.queueCount', { count: stats.waitingPlayers })}
          </Link>
        </p>
      ) : null}
    </section>
  );
}

function StatBox({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-2)',
      }}
    >
      <div
        className="yb-num"
        style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--weight-emphasis)',
          color: 'var(--accent)',
          minHeight: '1.2em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value === undefined ? '—' : value.toLocaleString()}
      </div>
      <div className="yb-meta" style={{ marginTop: 4, fontSize: 'var(--text-xs)' }}>
        {label}
      </div>
    </div>
  );
}