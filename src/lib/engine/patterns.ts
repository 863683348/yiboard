/**
 * 弈界 YiBoard — 棋型评估
 *
 * 把一条线序列化成 'X'(己方) / '.'(空) / 'O'(对方或墙) 的字符串，
 * 按"强棋型优先 + 消耗式匹配"计分：匹配到的 X 位被替换成 '#'，
 * 防止同一批棋子被弱棋型重复计分。
 */

import { at, DIRECTIONS, lineThrough, opponent, type Board, type Cell, type Player } from './board';

export const SCORE = {
  FIVE: 10_000_000,
  OPEN_FOUR: 500_000,
  FOUR: 60_000,
  OPEN_THREE: 15_000,
  BROKEN_THREE: 12_000,
  THREE: 1_500,
  OPEN_TWO: 800,
  TWO: 150,
  ONE: 10,
} as const;

/** 顺序即优先级：强棋型先吃掉棋子，弱棋型不再重复计分。 */
const PATTERNS: ReadonlyArray<readonly [string, number]> = [
  ['XXXXX', SCORE.FIVE],

  ['.XXXX.', SCORE.OPEN_FOUR],

  ['XXXX.', SCORE.FOUR],
  ['.XXXX', SCORE.FOUR],
  ['XXX.X', SCORE.FOUR],
  ['X.XXX', SCORE.FOUR],
  ['XX.XX', SCORE.FOUR],

  ['.XXX.', SCORE.OPEN_THREE],

  ['.XX.X.', SCORE.BROKEN_THREE],
  ['.X.XX.', SCORE.BROKEN_THREE],

  ['XXX.', SCORE.THREE],
  ['.XXX', SCORE.THREE],
  ['XX.X', SCORE.THREE],
  ['X.XX', SCORE.THREE],

  ['.XX.', SCORE.OPEN_TWO],
  ['XX.', SCORE.TWO],
  ['.XX', SCORE.TWO],
  ['X.X', SCORE.TWO],

  ['.X.', SCORE.ONE],
];

/** 线 → 字符串。两端补 'O' 当墙，让"贴边"自动失去开放端。 */
export function serializeLine(cells: readonly Cell[], player: Player): string {
  const foe = opponent(player);
  let out = 'O';
  for (const cell of cells) {
    if (cell === player) out += 'X';
    else if (cell === foe) out += 'O';
    else out += '.';
  }
  return `${out}O`;
}

export function scoreSerializedLine(line: string): number {
  let working = line;
  let total = 0;

  for (const [pattern, value] of PATTERNS) {
    let cursor = working.indexOf(pattern);
    while (cursor !== -1) {
      total += value;
      working =
        working.slice(0, cursor) +
        pattern.replace(/X/g, '#') +
        working.slice(cursor + pattern.length);
      cursor = working.indexOf(pattern, cursor + 1);
    }
  }

  return total;
}

/** 穿过 (x,y) 的四条线，对 player 的总分。 */
export function scoreLinesThrough(board: Board, x: number, y: number, player: Player): number {
  let total = 0;
  for (const [dx, dy] of DIRECTIONS) {
    total += scoreSerializedLine(serializeLine(lineThrough(board, x, y, dx, dy), player));
  }
  return total;
}

/**
 * 增量评估：只有穿过落点的四条线会变化，所以整盘分差 = 这四条线的分差。
 * 返回「己方视角」的分值变化（己方增益 - 对方增益）。
 */
export function deltaAfterMove(
  board: Board,
  x: number,
  y: number,
  player: Player,
): number {
  const foe = opponent(player);

  const beforeSelf = scoreLinesThrough(board, x, y, player);
  const beforeFoe = scoreLinesThrough(board, x, y, foe);

  board[y * 15 + x] = player;

  const afterSelf = scoreLinesThrough(board, x, y, player);
  const afterFoe = scoreLinesThrough(board, x, y, foe);

  board[y * 15 + x] = 0;

  return afterSelf - beforeSelf - (afterFoe - beforeFoe);
}

/**
 * 单点启发值：把该点分别假设为己方 / 对方落子，取两者加权。
 * 用于候选着法排序 —— 进攻价值高的点和必须防守的点都会被排到前面。
 */
export function heuristicAt(board: Board, x: number, y: number, player: Player): number {
  const foe = opponent(player);
  const offense = scoreLinesThrough(board, x, y, player);
  const defense = scoreLinesThrough(board, x, y, foe);

  board[y * 15 + x] = player;
  const offenseAfter = scoreLinesThrough(board, x, y, player);
  board[y * 15 + x] = foe;
  const defenseAfter = scoreLinesThrough(board, x, y, foe);
  board[y * 15 + x] = 0;

  return (offenseAfter - offense) + (defenseAfter - defense) * 0.9;
}

/** 整盘静态评估（己方视角）。仅用于根节点校准，搜索内部走增量。 */
export function evaluateBoard(board: Board, player: Player): number {
  const foe = opponent(player);
  let self = 0;
  let against = 0;

  // 行
  for (let y = 0; y < 15; y += 1) {
    const row: Cell[] = [];
    for (let x = 0; x < 15; x += 1) row.push(at(board, x, y));
    self += scoreSerializedLine(serializeLine(row, player));
    against += scoreSerializedLine(serializeLine(row, foe));
  }
  // 列
  for (let x = 0; x < 15; x += 1) {
    const col: Cell[] = [];
    for (let y = 0; y < 15; y += 1) col.push(at(board, x, y));
    self += scoreSerializedLine(serializeLine(col, player));
    against += scoreSerializedLine(serializeLine(col, foe));
  }
  // 两组对角线
  for (let start = -14; start <= 14; start += 1) {
    const main: Cell[] = [];
    const anti: Cell[] = [];
    for (let i = 0; i < 15; i += 1) {
      const mx = i;
      const my = i - start;
      if (my >= 0 && my < 15) main.push(at(board, mx, my));
      const ax = i;
      const ay = start + 14 - i;
      if (ay >= 0 && ay < 15) anti.push(at(board, ax, ay));
    }
    if (main.length >= 5) {
      self += scoreSerializedLine(serializeLine(main, player));
      against += scoreSerializedLine(serializeLine(main, foe));
    }
    if (anti.length >= 5) {
      self += scoreSerializedLine(serializeLine(anti, player));
      against += scoreSerializedLine(serializeLine(anti, foe));
    }
  }

  return self - against;
}
