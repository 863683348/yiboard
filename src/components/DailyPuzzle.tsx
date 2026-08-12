'use client';

import { useMemo, useState } from 'react';

const SIZE = 15;

/** 确定性 PRNG：同一天种子 → 同一道残局，保证每日稳定且可被爬虫复现。 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateSeed(d: Date) {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

type Cell = { r: number; c: number };
type Stones = Map<string, 'b' | 'w'>;

type Orientation = 'h' | 'v' | 'd1' | 'd2';

function step(o: Orientation, r: number, c: number, i: number): Cell {
  if (o === 'h') return { r, c: c + i };
  if (o === 'v') return { r: r + i, c };
  if (o === 'd1') return { r: r + i, c: c + i };
  return { r: r + i, c: c - i };
}

function key(r: number, c: number) {
  return `${r},${c}`;
}

export function DailyPuzzle() {
  const today = useMemo(() => new Date(), []);
  const seed = dateSeed(today);

  const { stones, win } = useMemo<{ stones: Stones; win: Cell }>(() => {
    const rnd = mulberry32(seed);
    const orientations: Orientation[] = ['h', 'v', 'd1', 'd2'];
    const o = orientations[Math.floor(rnd() * orientations.length)]!;
    const r0 = 2 + Math.floor(rnd() * (SIZE - 7));
    const c0 = 2 + Math.floor(rnd() * (SIZE - 7));
    const line: Cell[] = [];
    for (let i = 0; i < 4; i++) line.push(step(o, r0, c0, i));
    const end = Math.floor(rnd() * 2);
    const winCell = end === 0 ? step(o, r0, c0, -1) : step(o, r0, c0, 4);
    const map: Stones = new Map();
    line.forEach((p) => map.set(key(p.r, p.c), 'b'));
    let tries = 0;
    while (map.size < 9 && tries < 80) {
      tries++;
      const r = 1 + Math.floor(rnd() * (SIZE - 2));
      const c = 1 + Math.floor(rnd() * (SIZE - 2));
      const k = key(r, c);
      if (map.has(k) || k === key(winCell.r, winCell.c)) continue;
      // 不与成五线相邻，避免视觉误导
      const near = line.some((p) => Math.abs(p.r - r) <= 1 && Math.abs(p.c - c) <= 1);
      if (near) continue;
      map.set(k, 'w');
    }
    return { stones: map, win: winCell };
  }, [seed]);

  const [picked, setPicked] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);

  function onCell(r: number, c: number) {
    if (solved) return;
    const k = key(r, c);
    if (stones.has(k)) return;
    if (r === win.r && c === win.c) {
      setPicked(k);
      setSolved(true);
      setWrong(false);
    } else {
      setPicked(k);
      setWrong(true);
    }
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <div
        role="grid"
        aria-label="Daily Gomoku puzzle board"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          gap: 2,
          background: 'var(--board-surface)',
          border: '1px solid var(--board-edge)',
          borderRadius: 'var(--radius-md)',
          padding: 6,
          aspectRatio: '1 / 1',
        }}
      >
        {Array.from({ length: SIZE * SIZE }).map((_, idx) => {
          const r = Math.floor(idx / SIZE);
          const c = idx % SIZE;
          const k = key(r, c);
          const color = stones.get(k);
          const isWin = solved && r === win.r && c === win.c;
          const isPicked = picked === k;
          return (
            <button
              key={idx}
              type="button"
              role="gridcell"
              aria-label={color ? `${color} stone at ${String.fromCharCode(65 + c)}${r + 1}` : `empty ${String.fromCharCode(65 + c)}${r + 1}`}
              onClick={() => onCell(r, c)}
              disabled={!!color}
              style={{
                appearance: 'none',
                border: 0,
                margin: 0,
                padding: 0,
                borderRadius: '50%',
                aspectRatio: '1 / 1',
                cursor: color ? 'default' : solved ? 'default' : 'pointer',
                background:
                  color === 'b'
                    ? 'radial-gradient(circle at 35% 30%, #4b4b4b, #111)'
                    : color === 'w'
                      ? 'radial-gradient(circle at 35% 30%, #fff, #c9c9c9)'
                      : isWin
                        ? 'var(--accent)'
                        : isPicked
                          ? 'var(--danger, #d9534f)'
                          : 'transparent',
                boxShadow: color ? 'inset 0 0 0 1px rgba(0,0,0,0.25)' : 'none',
              }}
            />
          );
        })}
      </div>

      <p
        style={{
          marginTop: 'var(--space-4)',
          fontSize: 'var(--text-sm)',
          color: solved ? 'var(--accent)' : wrong ? 'var(--fg-2)' : 'var(--fg-2)',
          minHeight: '1.5em',
        }}
      >
        {solved
          ? 'Solved — that was the winning move. Come back tomorrow for a new puzzle.'
          : wrong
            ? 'Not quite. Look for the line of four black stones and complete the five.'
            : 'Black has four in a row. Click the empty point that completes five and wins.'}
      </p>
    </div>
  );
}
