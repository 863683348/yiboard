/** 弈界 YiBoard — 围棋（Go/Weiqi/Baduk）类型定义 */

export const GO_BOARD_SIZES = [9, 13, 19] as const;
export type GoBoardSize = (typeof GO_BOARD_SIZES)[number];

export type GoColor = 'black' | 'white';
export type GoIntersection = null | GoColor;
/** 一维棋盘，长度为 size * size */
export type GoBoard = GoIntersection[];

export type GoMoveType = 'place' | 'pass' | 'resign';

export interface GoMove {
  type: GoMoveType;
  x?: number;
  y?: number;
}

export interface GoState {
  board: GoBoard;
  size: GoBoardSize;
  turn: GoColor;
  moveNumber: number;
  lastMove: GoMove | null;
  /** 历史局面哈希，用于简单打劫判定 */
  history: string[];
  /** 连续 pass 次数 */
  passes: number;
  status: 'playing' | 'finished';
  winner: GoColor | 'draw' | null;
  /** 被提棋子计数（黑提掉的白子数 / 白提掉的黑子数） */
  blackPrisoners: number;
  whitePrisoners: number;
  /** 终局时按数子法计算的差值（黑 - 白，含贴目） */
  margin?: number;
}

export interface GoScore {
  black: number;
  white: number;
  /** 贴目（komi），白棋得分会加上此值 */
  komi: number;
}

export function idx(x: number, y: number, size: GoBoardSize): number {
  return y * size + x;
}

export function xy(i: number, size: GoBoardSize): { x: number; y: number } {
  return { x: i % size, y: Math.floor(i / size) };
}

export function inBounds(x: number, y: number, size: GoBoardSize): boolean {
  return x >= 0 && x < size && y >= 0 && y < size;
}

export function hashBoard(board: GoBoard): string {
  return board.map(c => (c === null ? '.' : c === 'black' ? 'X' : 'O')).join('');
}

export function createBoard(size: GoBoardSize = 19): GoBoard {
  return Array(size * size).fill(null);
}

export function cloneBoard(board: GoBoard): GoBoard {
  return [...board];
}

export function opposite(color: GoColor): GoColor {
  return color === 'black' ? 'white' : 'black';
}
