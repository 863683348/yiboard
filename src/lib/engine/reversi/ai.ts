/** 弈界 YiBoard — 黑白棋 AI（带位置权重的极小化极大搜索） */

import {
  type ReversiState,
  type ReversiColor,
  xy,
  opposite,
} from './types.ts';
import { legalMoves, placeStone, hasLegalMove, countDiscs } from './rules.ts';

export type ReversiDifficulty = 'novice' | 'gentle' | 'steady' | 'sharp';

const DEPTH: Record<ReversiDifficulty, number> = {
  novice: 1,
  gentle: 2,
  steady: 3,
  sharp: 4,
};

// 位置权重：角最高，角旁（X 位）为负，边次之。标准 Othello 启发式。
const WEIGHTS: number[][] = [
  [120, -20, 20, 5, 5, 20, -20, 120],
  [-20, -40, -5, -5, -5, -5, -40, -20],
  [20, -5, 15, 3, 3, 15, -5, 20],
  [5, -5, 3, 3, 3, 3, -5, 5],
  [5, -5, 3, 3, 3, 3, -5, 5],
  [20, -5, 15, 3, 3, 15, -5, 20],
  [-20, -40, -5, -5, -5, -5, -40, -20],
  [120, -20, 20, 5, 5, 20, -20, 120],
];

function evaluate(state: ReversiState, color: ReversiColor): number {
  const { black, white } = countDiscs(state.board);
  const mine = color === 'black' ? black : white;
  const theirs = color === 'black' ? white : black;
  let positional = 0;
  for (let i = 0; i < state.board.length; i++) {
    const c = state.board[i];
    if (!c) continue;
    const { x, y } = xy(i, state.size);
    const w = WEIGHTS[y]?.[x] ?? 0;
    positional += c === color ? w : -w;
  }
  // 终局阶段棋子数差最重要，开局阶段位置权重主导
  const empties = state.board.filter((c) => c === null).length;
  const discWeight = empties > 12 ? 1 : 12;
  return positional * 10 + (mine - theirs) * discWeight;
}

function isTerminal(state: ReversiState): boolean {
  return (
    state.status === 'finished' ||
    (!hasLegalMove(state, state.turn) && !hasLegalMove(state, opposite(state.turn)))
  );
}

function minimax(
  state: ReversiState,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  me: ReversiColor,
): number {
  if (depth === 0 || isTerminal(state)) return evaluate(state, me);

  const moves = legalMoves(state, state.turn);
  if (moves.length === 0) {
    const passed = { ...state, turn: opposite(state.turn) };
    if (isTerminal(passed)) return evaluate(state, me);
    return minimax(passed, depth - 1, alpha, beta, !maximizing, me);
  }

  if (maximizing) {
    let best = -Infinity;
    for (const m of moves) {
      const next = placeStone(state, m, state.turn);
      if (!next) continue;
      best = Math.max(best, minimax(next, depth - 1, alpha, beta, false, me));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }
  let best = Infinity;
  for (const m of moves) {
    const next = placeStone(state, m, state.turn);
    if (!next) continue;
    best = Math.min(best, minimax(next, depth - 1, alpha, beta, true, me));
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

/** 选择最佳着法，返回棋盘索引；无合法着法返回 null（调用方应 pass） */
export function bestMove(
  state: ReversiState,
  color: ReversiColor = state.turn,
  difficulty: ReversiDifficulty = 'steady',
): number | null {
  const moves = legalMoves(state, color);
  if (moves.length === 0) return null;
  if (difficulty === 'novice') {
    return moves[Math.floor(Math.random() * moves.length)]!;
  }
  const depth = DEPTH[difficulty];
  let best: number | null = null;
  let bestScore = -Infinity;
  for (const m of moves) {
    const next = placeStone(state, m, color);
    if (!next) continue;
    const s = minimax(next, depth - 1, -Infinity, Infinity, false, color);
    if (s > bestScore) {
      bestScore = s;
      best = m;
    }
  }
  return best;
}

/** 给 AI 提示一个着法（与 bestMove 相同，语义上用于「提示」按钮） */
export function suggestedMove(
  state: ReversiState,
  color: ReversiColor = state.turn,
): number | null {
  return bestMove(state, color, 'sharp');
}
