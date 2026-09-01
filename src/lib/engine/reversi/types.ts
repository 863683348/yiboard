/** 弈界 YiBoard — 黑白棋（Reversi / Othello）类型定义 */

export const REVERSI_SIZE = 8;
export type ReversiColor = 'black' | 'white';
export type ReversiCell = null | ReversiColor;
/** 一维棋盘，长度为 size * size */
export type ReversiBoard = ReversiCell[];

export interface ReversiState {
  board: ReversiBoard;
  size: number;
  turn: ReversiColor;
  moveNumber: number;
  /** 上一步落子的索引（用于高亮），pass 时为 null */
  lastMove: number | null;
  status: 'playing' | 'finished';
  winner: ReversiColor | 'draw' | null;
  /** 连续 pass 次数（双方连续 pass 即终局） */
  passCount: number;
}

export function idx(x: number, y: number, size: number): number {
  return y * size + x;
}

export function xy(i: number, size: number): { x: number; y: number } {
  return { x: i % size, y: Math.floor(i / size) };
}

export function inBounds(x: number, y: number, size: number): boolean {
  return x >= 0 && x < size && y >= 0 && y < size;
}

export function opposite(color: ReversiColor): ReversiColor {
  return color === 'black' ? 'white' : 'black';
}

export function createBoard(size: number = REVERSI_SIZE): ReversiBoard {
  return Array<ReversiCell>(size * size).fill(null);
}
