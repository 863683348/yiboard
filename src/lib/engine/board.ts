/**
 * 弈界 YiBoard — 五子棋棋盘原语
 * 纯函数 + 扁平 Int8Array，无框架依赖，可在 Node / 浏览器 / Worker 同构运行。
 * 棋盘尺寸可参数化（9/13/15/19，默认 15），连珠数可参数化（5/6/7，默认 5）。
 * 默认参数下行为与历史版本完全一致（15×15 / 五连判胜）。
 */

export const BOARD_SIZE = 15;
export const DEFAULT_WIN_COUNT = 5;
export const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;

export const EMPTY = 0 as const;
export const BLACK = 1 as const;
export const WHITE = 2 as const;

export type Cell = typeof EMPTY | typeof BLACK | typeof WHITE;
export type Player = typeof BLACK | typeof WHITE;
export type Board = Int8Array;

/** 四个扫描方向：横 / 竖 / 主对角 / 反对角 */
export const DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

export interface Point {
  x: number;
  y: number;
}

/** 从扁平数组长度反推边长（棋盘总是正方形）。9→81、13→169、15→225。 */
export function boardSize(board: Board): number {
  return Math.round(Math.sqrt(board.length));
}

export function createBoard(size: number = BOARD_SIZE): Board {
  return new Int8Array(size * size);
}

export function cloneBoard(board: Board): Board {
  return Int8Array.from(board) as Board;
}

export function inBounds(x: number, y: number, size: number = BOARD_SIZE): boolean {
  return x >= 0 && x < size && y >= 0 && y < size;
}

export function index(x: number, y: number, size: number = BOARD_SIZE): number {
  return y * size + x;
}

export function at(board: Board, x: number, y: number): Cell {
  const size = boardSize(board);
  if (!inBounds(x, y, size)) return EMPTY;
  return board[index(x, y, size)] as Cell;
}

export function opponent(player: Player): Player {
  return player === BLACK ? WHITE : BLACK;
}

/** 落子是否合法：在界内 + 该点为空。禁手规则不在 MVP 范围（见 Spec §3）。 */
export function isLegalMove(board: Board, x: number, y: number): boolean {
  const size = boardSize(board);
  return inBounds(x, y, size) && board[index(x, y, size)] === EMPTY;
}

/** 就地落子。调用方负责先做 isLegalMove 校验。 */
export function place(board: Board, x: number, y: number, player: Player): void {
  board[index(x, y, boardSize(board))] = player;
}

export function unplace(board: Board, x: number, y: number): void {
  board[index(x, y, boardSize(board))] = EMPTY;
}

/**
 * 判定以 (x,y) 为最后一手是否达成 winCount 连子（默认五连）。
 * 返回构成连线的全部落点（含首尾），用于 UI 画朱砂连线；无连子返回 null。
 * 长连（≥winCount）同样判胜（自由五子棋规则，Spec §10）。
 */
export function findWinningLine(
  board: Board,
  x: number,
  y: number,
  winCount: number = DEFAULT_WIN_COUNT,
): Point[] | null {
  const player = at(board, x, y);
  if (player === EMPTY) return null;

  for (const [dx, dy] of DIRECTIONS) {
    const line: Point[] = [{ x, y }];

    for (let step = 1; ; step += 1) {
      const nx = x + dx * step;
      const ny = y + dy * step;
      if (at(board, nx, ny) !== player) break;
      line.push({ x: nx, y: ny });
    }
    for (let step = 1; ; step += 1) {
      const nx = x - dx * step;
      const ny = y - dy * step;
      if (at(board, nx, ny) !== player) break;
      line.unshift({ x: nx, y: ny });
    }

    if (line.length >= winCount) return line;
  }

  return null;
}

export function isFull(board: Board): boolean {
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === EMPTY) return false;
  }
  return true;
}

export function stoneCount(board: Board): number {
  let n = 0;
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== EMPTY) n += 1;
  }
  return n;
}

/** 该点在 radius 切比雪夫距离内是否有子——用于收缩候选着法空间。 */
export function hasNeighbor(board: Board, x: number, y: number, radius = 2): boolean {
  for (let dy = -radius; dy <= radius; dy += 1) {
    for (let dx = -radius; dx <= radius; dx += 1) {
      if (dx === 0 && dy === 0) continue;
      if (at(board, x + dx, y + dy) !== EMPTY) return true;
    }
  }
  return false;
}

/** 抽出穿过 (x,y)、方向为 (dx,dy) 的整条线。 */
export function lineThrough(
  board: Board,
  x: number,
  y: number,
  dx: number,
  dy: number,
): Cell[] {
  const size = boardSize(board);
  let sx = x;
  let sy = y;
  while (inBounds(sx - dx, sy - dy, size)) {
    sx -= dx;
    sy -= dy;
  }

  const cells: Cell[] = [];
  let cx = sx;
  let cy = sy;
  while (inBounds(cx, cy, size)) {
    cells.push(board[index(cx, cy, size)] as Cell);
    cx += dx;
    cy += dy;
  }
  return cells;
}

/** 棋谱坐标：内部 (x,y) ←→ 展示用 "H8" 记号（列 A–O，行 1–N，自下而上）。 */
const COLUMN_LABELS = 'ABCDEFGHIJKLMNO';

export function toNotation(x: number, y: number, size: number = BOARD_SIZE): string {
  return `${COLUMN_LABELS[x] ?? '?'}${size - y}`;
}

export function fromNotation(notation: string, size: number = BOARD_SIZE): Point | null {
  const match = /^([A-Oa-o])(\d{1,2})$/.exec(notation.trim());
  if (!match) return null;
  const x = COLUMN_LABELS.indexOf(match[1]!.toUpperCase());
  const y = size - Number(match[2]);
  return inBounds(x, y, size) ? { x, y } : null;
}
