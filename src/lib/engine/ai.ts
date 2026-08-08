/**
 * 弈界 YiBoard — AI 搜索（Minimax + Alpha-Beta + 迭代加深）
 *
 * 硬约束（Spec §9 AC-03）：单步思考 < 500ms。
 * 手段：候选着法收缩（只看已有棋子 2 格邻域）+ 启发排序 + 时间预算熔断。
 */

import {
  BOARD_SIZE,
  at,
  findWinningLine,
  hasNeighbor,
  isFull,
  opponent,
  place,
  stoneCount,
  unplace,
  type Board,
  type Player,
  type Point,
} from './board';
import { SCORE, deltaAfterMove, heuristicAt } from './patterns';

export type Difficulty = 'gentle' | 'steady' | 'sharp';

export interface MoveResult {
  point: Point;
  score: number;
  depth: number;
  nodes: number;
  elapsedMs: number;
}

interface Profile {
  maxDepth: number;
  width: number;
  budgetMs: number;
  /** 从前 N 个候选里随机 —— 让低难度会犯人类式的小错，而不是刻意送分 */
  spread: number;
}

const PROFILES: Record<Difficulty, Profile> = {
  gentle: { maxDepth: 2, width: 6, budgetMs: 120, spread: 3 },
  steady: { maxDepth: 4, width: 8, budgetMs: 300, spread: 1 },
  sharp: { maxDepth: 6, width: 10, budgetMs: 450, spread: 1 },
};

const WIN_SCORE = 100_000_000;
const CENTER = Math.floor(BOARD_SIZE / 2);

interface SearchContext {
  board: Board;
  rootPlayer: Player;
  foePlayer: Player;
  width: number;
  deadline: number;
  maxDepth: number;
  nodes: number;
  timedOut: boolean;
}

function candidates(board: Board, side: Player, width: number): Point[] {
  const scored: Array<{ point: Point; value: number }> = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (at(board, x, y) !== 0) continue;
      if (!hasNeighbor(board, x, y, 2)) continue;
      scored.push({ point: { x, y }, value: heuristicAt(board, x, y, side) });
    }
  }

  scored.sort((a, b) => b.value - a.value);
  return scored.slice(0, width).map((entry) => entry.point);
}

function search(
  ctx: SearchContext,
  depth: number,
  alphaIn: number,
  betaIn: number,
  isMax: boolean,
  running: number,
): number {
  if (Date.now() > ctx.deadline) {
    ctx.timedOut = true;
    return running;
  }
  if (depth === 0) return running;

  const side = isMax ? ctx.rootPlayer : ctx.foePlayer;
  const moves = candidates(ctx.board, side, ctx.width);
  if (moves.length === 0) return running;

  let alpha = alphaIn;
  let beta = betaIn;
  let best = isMax ? -Infinity : Infinity;

  for (const move of moves) {
    const delta = deltaAfterMove(ctx.board, move.x, move.y, side);
    place(ctx.board, move.x, move.y, side);
    ctx.nodes += 1;

    let value: number;
    if (findWinningLine(ctx.board, move.x, move.y)) {
      const ply = ctx.maxDepth - depth;
      value = isMax ? WIN_SCORE - ply : -WIN_SCORE + ply;
    } else {
      value = search(ctx, depth - 1, alpha, beta, !isMax, running + (isMax ? delta : -delta));
    }

    unplace(ctx.board, move.x, move.y);

    if (isMax) {
      if (value > best) best = value;
      if (best > alpha) alpha = best;
    } else {
      if (value < best) best = value;
      if (best < beta) beta = best;
    }

    if (alpha >= beta) break;
    if (ctx.timedOut) break;
  }

  return best;
}

/** 战术速判：一步成五 / 必须封堵对手成五。命中直接返回，不进搜索。 */
function tacticalMove(board: Board, player: Player): Point | null {
  const foe = opponent(player);
  const pool: Point[] = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (at(board, x, y) !== 0) continue;
      if (!hasNeighbor(board, x, y, 2)) continue;
      pool.push({ x, y });
    }
  }

  for (const point of pool) {
    place(board, point.x, point.y, player);
    const win = findWinningLine(board, point.x, point.y);
    unplace(board, point.x, point.y);
    if (win) return point;
  }

  for (const point of pool) {
    place(board, point.x, point.y, foe);
    const lose = findWinningLine(board, point.x, point.y);
    unplace(board, point.x, point.y);
    if (lose) return point;
  }

  return null;
}

export function chooseMove(
  board: Board,
  player: Player,
  difficulty: Difficulty = 'steady',
): MoveResult | null {
  const startedAt = Date.now();
  const profile = PROFILES[difficulty];

  if (isFull(board)) return null;

  if (stoneCount(board) === 0) {
    return {
      point: { x: CENTER, y: CENTER },
      score: 0,
      depth: 0,
      nodes: 0,
      elapsedMs: Date.now() - startedAt,
    };
  }

  const tactical = tacticalMove(board, player);
  if (tactical) {
    return {
      point: tactical,
      score: SCORE.FIVE,
      depth: 1,
      nodes: 0,
      elapsedMs: Date.now() - startedAt,
    };
  }

  const ctx: SearchContext = {
    board,
    rootPlayer: player,
    foePlayer: opponent(player),
    width: profile.width,
    deadline: startedAt + profile.budgetMs,
    maxDepth: profile.maxDepth,
    nodes: 0,
    timedOut: false,
  };

  const roots = candidates(board, player, profile.width);
  if (roots.length === 0) {
    return { point: { x: CENTER, y: CENTER }, score: 0, depth: 0, nodes: 0, elapsedMs: 0 };
  }

  let ranked: Array<{ point: Point; score: number }> = roots.map((point) => ({ point, score: 0 }));
  let completedDepth = 0;

  // 迭代加深：每层都留一份完整结果，超时就用上一层的答案，绝不返回半成品。
  for (let depth = 2; depth <= profile.maxDepth; depth += 2) {
    ctx.maxDepth = depth;
    const round: Array<{ point: Point; score: number }> = [];
    let alpha = -Infinity;

    for (const { point } of ranked) {
      const delta = deltaAfterMove(board, point.x, point.y, player);
      place(board, point.x, point.y, player);
      ctx.nodes += 1;

      let value: number;
      if (findWinningLine(board, point.x, point.y)) {
        value = WIN_SCORE;
      } else {
        value = search(ctx, depth - 1, alpha, Infinity, false, delta);
      }

      unplace(board, point.x, point.y);
      round.push({ point, score: value });
      if (value > alpha) alpha = value;
      if (ctx.timedOut) break;
    }

    if (round.length === ranked.length) {
      round.sort((a, b) => b.score - a.score);
      ranked = round;
      completedDepth = depth;
    }
    if (ctx.timedOut) break;
  }

  const top = ranked.slice(0, Math.max(1, profile.spread));
  const picked = top[Math.floor(Math.random() * top.length)] ?? ranked[0]!;

  return {
    point: picked.point,
    score: picked.score,
    depth: completedDepth,
    nodes: ctx.nodes,
    elapsedMs: Date.now() - startedAt,
  };
}
