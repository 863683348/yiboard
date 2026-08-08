'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play } from '@phosphor-icons/react';

import { Board } from '@/components/Board';
import { BLACK, WHITE, createBoard, findWinningLine, place, type Point } from '@/lib/engine/board';
import { parseMoves } from '@/lib/rooms';
import type { GameResult } from '@/lib/store/types';

const STEP_MS = 650;

/**
 * 分享页对局回放：默认停在终局，点 Replay 从空盘逐步走到终局。
 * 纯展示，不走引擎；只重放服务端存的棋谱（防作弊，Spec §9）。
 */
export function ShareReplay({
  moves,
  result,
  ariaLabel,
}: {
  moves: string;
  result: GameResult;
  ariaLabel: string;
}) {
  const t = useTranslations('share');
  const points = useMemo<Point[]>(() => parseMoves(moves), [moves]);
  const total = points.length;
  const [step, setStep] = useState(total);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const view = useMemo(() => {
    const board = createBoard();
    const upto = points.slice(0, step);
    upto.forEach((p, i) => place(board, p.x, p.y, i % 2 === 0 ? BLACK : WHITE));
    const last = upto.length ? upto[upto.length - 1]! : null;
    const finished = step >= total;
    const winningLine =
      finished && last && result !== 'draw' ? findWinningLine(board, last.x, last.y) : null;
    return { cells: Array.from(board), last, winningLine };
  }, [points, step, total, result]);

  useEffect(() => {
    if (!playing) return;
    if (step >= total) {
      setPlaying(false);
      return;
    }
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= total) {
          if (timer.current) clearInterval(timer.current);
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, step, total]);

  const start = () => {
    if (step >= total) setStep(0);
    setPlaying(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--space-3)', justifyItems: 'center' }}>
      <Board
        cells={view.cells}
        lastMove={view.last}
        winningLine={view.winningLine}
        ariaLabel={ariaLabel}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button type="button" className="yb-btn yb-btn-primary yb-btn-sm" onClick={start}>
          <Play size={15} weight="fill" aria-hidden />
          {t('replay')}
        </button>
        <span className="yb-num yb-meta">
          {Math.min(step, total)} / {total}
        </span>
      </div>
    </div>
  );
}
