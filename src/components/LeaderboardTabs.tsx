'use client';

import { useState } from 'react';

import { MineBadge } from './MineBadge';

export interface LeaderboardRow {
  position: number;
  userId: string;
  displayName: string;
  elo: number;
  rankName: string;
  wins: number;
  gamesPlayed: number;
  winRate: number;
}

type Tab = 'all' | 'week' | 'month';

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All-time' },
  { key: 'week', label: 'This week' },
  { key: 'month', label: 'This month' },
];

export function LeaderboardTabs({
  all,
  week,
  month,
}: {
  all: LeaderboardRow[];
  week: LeaderboardRow[];
  month: LeaderboardRow[];
}) {
  const [tab, setTab] = useState<Tab>('all');
  const rows = tab === 'all' ? all : tab === 'week' ? week : month;
  const winLabel = tab === 'all' ? 'Wins' : tab === 'week' ? 'Wins · 7d' : 'Wins · 30d';

  return (
    <div>
      <div
        role="tablist"
        aria-label="Leaderboard period"
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-5)',
          flexWrap: 'wrap',
        }}
      >
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={active ? 'yb-chip yb-chip-accent' : 'yb-chip'}
              style={{
                cursor: 'pointer',
                border: '1px solid var(--border)',
                background: active ? 'var(--accent)' : 'var(--surface)',
                color: active ? '#fff' : 'var(--fg)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {rows.length === 0 ? (
        <p className="yb-meta" style={{ padding: 'var(--space-6)' }}>
          No ranked games finished in this period yet — play a friend match to get on the board.
        </p>
      ) : (
        <div className="yb-card" style={{ overflowX: 'auto', padding: '0 var(--space-2)' }}>
          <table className="yb-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: 56 }}>
                  #
                </th>
                <th scope="col">Player</th>
                <th scope="col">Rank</th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  Rating
                </th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  {winLabel}
                </th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  Played
                </th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  Win%
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.userId}>
                  <td className="yb-num" style={{ color: 'var(--meta)' }}>
                    {r.position}
                  </td>
                  <td style={{ color: 'var(--fg)', fontWeight: 'var(--weight-emphasis)' }}>
                    {r.displayName}
                    <MineBadge userId={r.userId} />
                  </td>
                  <td style={{ color: 'var(--fg-2)' }}>{r.rankName}</td>
                  <td className="yb-num" style={{ textAlign: 'right' }}>
                    {r.elo}
                  </td>
                  <td className="yb-num" style={{ textAlign: 'right' }}>
                    {r.wins}
                  </td>
                  <td className="yb-num" style={{ textAlign: 'right' }}>
                    {r.gamesPlayed}
                  </td>
                  <td className="yb-num" style={{ textAlign: 'right' }}>
                    {r.winRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
