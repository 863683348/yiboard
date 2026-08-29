/** 弈界 YiBoard — 围棋启发式 AI（弱 AI，适合新手 playable） */

import {
  type GoState,
  type GoMove,
  type GoColor,
  type GoBoardSize,
} from './types.ts';
import {
  cloneBoard,
  hashBoard,
  idx,
  xy,
  inBounds,
  opposite,
  placeStone,
  legalMoves,
  calculateScore,
} from './rules.ts';

export type GoDifficulty = 'novice' | 'gentle' | 'steady' | 'sharp';

const DEPTH_MAP: Record<GoDifficulty, number> = { novice: 1, gentle: 1, steady: 1, sharp: 2 };

/** 点的基本价值：中心 > 星位 > 边 > 角（围棋谚语：金角银边草肚皮） */
function positionValue(x: number, y: number, size: GoBoardSize): number {
  const cx = (size - 1) / 2;
  const cy = (size - 1) / 2;
  const dx = Math.abs(x - cx);
  const dy = Math.abs(y - cy);
  const distance = Math.max(dx, dy);
  return (size - 1 - distance) * 2;
}

/** 评估某个着法对 color 的即时收益 */
function evaluateMove(
  state: GoState,
  x: number,
  y: number,
  color: GoColor,
): number {
  const next = placeStone(state, x, y, color);
  if (!next) return -Infinity;

  let score = 0;
  const size = state.size;

  // 1. 提子收益（越大越好）
  const captured =
    color === 'black'
      ? next.blackPrisoners - state.blackPrisoners
      : next.whitePrisoners - state.whitePrisoners;
  score += captured * 80;

  // 2. 己方棋块的气：气越多越好
  const ownGroup = getGroupForIndex(next.board, idx(x, y, size), size);
  score += ownGroup.liberties.length * 12;

  // 3. 周围己方棋块的气：增强连片
  for (const n of neighbors(idx(x, y, size), size)) {
    const cell = next.board[n];
    if (cell === color) {
      const g = getGroupForIndex(next.board, n, size);
      score += g.liberties.length * 3;
    }
  }

  // 4. 位置价值
  score += positionValue(x, y, size);

  // 5. 开局前 10 手：偏好角和边（更大开局价值）
  if (state.moveNumber <= 10) {
    const cornerDist = Math.min(x, size - 1 - x) + Math.min(y, size - 1 - y);
    score += (size - cornerDist) * 1.5;
  }

  // 6. 让对手形成弱块：若落子后邻接对方棋块只剩 1 气，加分
  for (const n of neighbors(idx(x, y, size), size)) {
    const cell = next.board[n];
    if (cell === opposite(color)) {
      const g = getGroupForIndex(next.board, n, size);
      if (g.liberties.length === 1) score += 25;
      else if (g.liberties.length === 2) score += 8;
    }
  }

  // 7. 避免在棋盘上造出只有 1 气的孤子（易被提）
  if (ownGroup.liberties.length === 1) score -= 40;

  return score;
}

function neighbors(i: number, size: GoBoardSize): number[] {
  const { x, y } = xy(i, size);
  const result: number[] = [];
  if (x > 0) result.push(idx(x - 1, y, size));
  if (x < size - 1) result.push(idx(x + 1, y, size));
  if (y > 0) result.push(idx(x, y - 1, size));
  if (y < size - 1) result.push(idx(x, y + 1, size));
  return result;
}

function getGroupForIndex(
  board: import('./types.ts').GoBoard,
  startI: number,
  size: GoBoardSize,
): { stones: number[]; liberties: number[] } {
  const color = board[startI];
  if (!color) return { stones: [], liberties: [startI] };
  const stones: number[] = [];
  const libertiesSet = new Set<number>();
  const visited = new Set<number>();
  const stack = [startI];
  visited.add(startI);
  while (stack.length > 0) {
    const i = stack.pop()!;
    stones.push(i);
    for (const n of neighbors(i, size)) {
      const cell = board[n];
      if (cell === null) libertiesSet.add(n);
      else if (cell === color && !visited.has(n)) {
        visited.add(n);
        stack.push(n);
      }
    }
  }
  return { stones, liberties: Array.from(libertiesSet) };
}

/** 选择最佳着法。若局面已大差，可能选择 pass */
export function bestMove(
  state: GoState,
  color: GoColor = state.turn,
  difficulty: GoDifficulty = 'steady',
): GoMove | null {
  const moves = legalMoves(state, color);
  if (moves.length === 0) return { type: 'pass' };

  // 新手难度加入随机扰动，避免重复落同一位置
  const randomness = difficulty === 'novice' ? 30 : difficulty === 'gentle' ? 15 : difficulty === 'steady' ? 5 : 0;

  let best: { x: number; y: number } | null = null;
  let bestScore = -Infinity;

  for (const move of moves) {
    let score = evaluateMove(state, move.x, move.y, color);
    score += (Math.random() - 0.5) * randomness;
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }

  if (!best) return { type: 'pass' };

  // sharp 模式下做一次 1-ply 极小化极大修正
  if (difficulty === 'sharp') {
    const myMove = best;
    const afterMyMove = placeStone(state, myMove.x, myMove.y, color);
    if (afterMyMove) {
      const oppMoves = legalMoves(afterMyMove, opposite(color));
      let worstOpp = -Infinity;
      for (const om of oppMoves) {
        const afterOpp = placeStone(afterMyMove, om.x, om.y, opposite(color));
        if (afterOpp) {
          const scores = calculateScore(afterOpp);
          const margin = color === 'black' ? scores.black - scores.white : scores.white - scores.black;
          if (margin > worstOpp) worstOpp = margin;
        }
      }
      // 如果对手有应手能让自己反而落后很多，宁可 pass 或换点
      if (worstOpp < -15 && moves.length > 1) {
        // 选次优
        let secondBest: { x: number; y: number } | null = null;
        let secondScore = -Infinity;
        for (const move of moves) {
          if (move.x === myMove.x && move.y === myMove.y) continue;
          let score = evaluateMove(state, move.x, move.y, color);
          if (score > secondScore) {
            secondScore = score;
            secondBest = move;
          }
        }
        if (secondBest) best = secondBest;
      }
    }
  }

  return { type: 'place', x: best.x, y: best.y };
}

export function suggestedMove(state: GoState, color: GoColor = state.turn): GoMove | null {
  return bestMove(state, color, 'sharp');
}
