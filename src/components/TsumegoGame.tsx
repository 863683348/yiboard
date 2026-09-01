/** 弈界 YiBoard — 围棋死活题解题组件（人机提示版，复用 GoBoard 与 Go 引擎） */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Lightbulb, ArrowRight, CheckCircle, Warning } from '@phosphor-icons/react';

import { GoBoard } from '@/components/GoBoard';
import {
  placeStone,
  idx,
  type GoBoard as GoBoardType,
  type GoMove,
  type GoState,
} from '@/lib/engine/go';
import { TSUMEGO_PROBLEMS, boardFromSetup, type TsumegoProblem } from '@/lib/tsumego/problems';

export interface TsumegoGameProps {
  locale: string;
}

function applySolution(p: TsumegoProblem): GoBoardType {
  let state: GoState = {
    board: boardFromSetup(p.setup),
    size: p.size,
    turn: p.toMove,
    moveNumber: 0,
    lastMove: null,
    history: [],
    passes: 0,
    status: 'playing',
    winner: null,
    blackPrisoners: 0,
    whitePrisoners: 0,
  };
  for (const mv of p.solution) {
    const next = placeStone(state, mv.x, mv.y, mv.color);
    if (!next) break;
    state = next;
  }
  return state.board;
}

export default function TsumegoGame({ locale }: TsumegoGameProps) {
  const isZh = locale === 'zh';
  const [index, setIndex] = useState(0);
  const [board, setBoard] = useState<GoBoardType>(() => boardFromSetup(TSUMEGO_PROBLEMS[0]!.setup));
  const [displayLast, setDisplayLast] = useState<GoMove | null>(null);
  const [status, setStatus] = useState<'playing' | 'solved' | 'wrong'>('playing');
  const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const problem = TSUMEGO_PROBLEMS[index]!;
  const size = problem.size;

  const load = useCallback((i: number) => {
    const p = TSUMEGO_PROBLEMS[i]!;
    setIndex(i);
    setBoard(boardFromSetup(p.setup));
    setDisplayLast(null);
    setStatus('playing');
    if (wrongTimer.current) clearTimeout(wrongTimer.current);
  }, []);

  useEffect(() => {
    load(0);
    return () => {
      if (wrongTimer.current) clearTimeout(wrongTimer.current);
    };
  }, [load]);

  const handlePlay = useCallback(
    (x: number, y: number) => {
      if (status !== 'playing') return;
      const i = idx(x, y, size);
      if (board[i] !== null) return;
      if (problem.answers.includes(i)) {
        const solved = applySolution(problem);
        setBoard(solved);
        setDisplayLast({ type: 'place', x: problem.solution[0]!.x, y: problem.solution[0]!.y });
        setStatus('solved');
      } else {
        setStatus('wrong');
        if (wrongTimer.current) clearTimeout(wrongTimer.current);
        wrongTimer.current = setTimeout(() => setStatus('playing'), 1600);
      }
    },
    [status, board, problem, size],
  );

  const handleReveal = useCallback(() => {
    const solved = applySolution(problem);
    setBoard(solved);
    setDisplayLast({ type: 'place', x: problem.solution[0]!.x, y: problem.solution[0]!.y });
    setStatus('solved');
  }, [problem]);

  const handleNext = useCallback(() => {
    load((index + 1) % TSUMEGO_PROBLEMS.length);
  }, [index, load]);

  const note =
    status === 'solved'
      ? isZh ? '正确！这就是正解。' : 'Correct — that is the solution.'
      : status === 'wrong'
        ? isZh ? '不是这里，再想想。' : 'Not quite — try again.'
        : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div>
        <h3 className="yb-h3" style={{ marginBottom: 'var(--space-1)' }}>
          {problem.title[isZh ? 'zh' : 'en']}
        </h3>
        <p className="yb-meta">{problem.goal[isZh ? 'zh' : 'en']}</p>
      </div>

      <GoBoard
        board={board}
        size={size}
        lastMove={displayLast}
        onPlay={handlePlay}
        disabled={status !== 'playing'}
        ariaLabel={isZh ? '死活题棋盘' : 'Tsumego board'}
        className="yb-board"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minHeight: 24 }}>
        {status === 'solved' ? (
          <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 'var(--weight-emphasis)' }}>
            <CheckCircle size={16} /> {note}
          </span>
        ) : status === 'wrong' ? (
          <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 'var(--weight-emphasis)' }}>
            <Warning size={16} /> {note}
          </span>
        ) : (
          <span className="yb-meta">{isZh ? `第 ${index + 1} / ${TSUMEGO_PROBLEMS.length} 题 · 轮到${problem.toMove === 'black' ? '黑' : '白'}走` : `Problem ${index + 1} / ${TSUMEGO_PROBLEMS.length} · ${problem.toMove} to play`}</span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleReveal}>
          <Lightbulb size={14} />
          {isZh ? '揭示答案' : 'Reveal solution'}
        </button>
        <button className="yb-btn yb-btn-primary yb-btn-sm" onClick={handleNext}>
          {isZh ? '下一题' : 'Next problem'}
          <ArrowRight size={14} weight="bold" aria-hidden />
        </button>
      </div>
    </div>
  );
}
