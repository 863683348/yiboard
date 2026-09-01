/** 弈界 YiBoard — 国际象棋 AI（minimax + alpha-beta 剪枝） */

import { legalMoves, applyMove, statusOf, xy } from './rules.ts';
import {
  PIECE_VALUES,
  type ChessBoard,
  type ChessColor,
  type ChessMove,
  type ChessState,
  type Piece,
} from './types.ts';

export type ChessDifficulty = 'novice' | 'gentle' | 'steady' | 'sharp';

const DEPTH_MAP: Record<ChessDifficulty, number> = { novice: 1, gentle: 2, steady: 3, sharp: 4 };

const NO_RIGHTS = {
  whiteKingside: false,
  whiteQueenside: false,
  blackKingside: false,
  blackQueenside: false,
};

/** 位置性加成：靠中心、兵向前推进有奖励；简单且朝向无关，避免棋谱表方向错误 */
function positional(piece: Piece, i: number): number {
  const { x, y } = xy(i);
  const cx = Math.abs(x - 3.5);
  const cy = Math.abs(y - 3.5);
  const centerBonus = (3.5 - (cx + cy) / 2) * 4;

  let advance = 0;
  if (piece.type === 'p') {
    advance = (piece.color === 'white' ? y : 7 - y) * 6;
  }
  return centerBonus + advance;
}

function evaluate(board: ChessBoard, aiColor: ChessColor): number {
  let score = 0;
  for (let i = 0; i < 64; i++) {
    const p = board[i];
    if (!p) continue;
    const pv = PIECE_VALUES[p.type] ?? 0;
    const ps = positional(p, i);
    score += p.color === aiColor ? pv + ps : -(pv + ps);
  }
  return score;
}

function minimax(
  state: ChessState,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  aiColor: ChessColor,
): number {
  if (depth === 0) return evaluate(state.board, aiColor);

  const moves = legalMoves(state, state.turn);
  if (moves.length === 0) {
    const { status } = statusOf(state.board, state.turn, state.castling, state.enPassant, state.halfmove);
    if (status === 'checkmate') return maximizing ? -100000 + depth : 100000 - depth;
    return 0; // 和棋 / 逼和
  }

  if (maximizing) {
    let best = -Infinity;
    for (const m of moves) {
      const ns = applyMove(state, m);
      const ev = minimax(ns, depth - 1, alpha, beta, false, aiColor);
      if (ev > best) best = ev;
      if (ev > alpha) alpha = ev;
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) {
      const ns = applyMove(state, m);
      const ev = minimax(ns, depth - 1, alpha, beta, true, aiColor);
      if (ev < best) best = ev;
      if (ev < beta) beta = ev;
      if (beta <= alpha) break;
    }
    return best;
  }
}

export function bestMove(
  state: ChessState,
  color: ChessColor,
  difficulty: ChessDifficulty,
): ChessMove | null {
  const moves = legalMoves(state, color);
  if (moves.length === 0) return null;
  if (difficulty === 'novice') {
    return moves[Math.floor(Math.random() * moves.length)]!;
  }

  const depth = DEPTH_MAP[difficulty];
  let bestMove: ChessMove | null = null;
  let bestEval = -Infinity;

  for (const m of moves) {
    const ns = applyMove(state, m);
    const ev = minimax(ns, depth - 1, -Infinity, Infinity, false, color);
    if (ev > bestEval) {
      bestEval = ev;
      bestMove = m;
    }
  }
  return bestMove;
}
