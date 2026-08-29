/** 弈界 YiBoard — 象棋（Xiangqi）类型定义 */

export const XQ_ROWS = 10;
export const XQ_COLS = 9;
export const XQ_SIZE = XQ_ROWS * XQ_COLS;

export type PieceType = 'k' | 'a' | 'b' | 'n' | 'r' | 'c' | 'p';
export type XQColor = 'red' | 'black';
export type Cell = null | { type: PieceType; color: XQColor };
export type XQBoard = Cell[];
export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';

export interface XQMove {
  from: number;
  to: number;
  captured?: Cell;
}

export interface XiangqiState {
  board: XQBoard;
  turn: XQColor;
  moves: XQMove[];
  status: GameStatus;
  winner: XQColor | null;
  lastMove: XQMove | null;
  inCheck: boolean;
}

/** 棋子 Unicode 映射（红方用大写，黑方用小写，区分方向） */
export const PIECE_UNICODE: Record<PieceType, { red: string; black: string }> = {
  k: { red: '帥', black: '將' },
  a: { red: '仕', black: '士' },
  b: { red: '相', black: '象' },
  n: { red: '馬', black: '馬' },
  r: { red: '車', black: '車' },
  c: { red: '炮', black: '砲' },
  p: { red: '兵', black: '卒' },
};

export const PIECE_VALUES: Record<PieceType, number> = {
  p: 10,
  n: 40,
  b: 20,
  a: 20,
  c: 45,
  r: 90,
  k: 0,
};

export function idx(x: number, y: number): number {
  return y * XQ_COLS + x;
}

export function xy(i: number): { x: number; y: number } {
  return { x: i % XQ_COLS, y: Math.floor(i / XQ_COLS) };
}
