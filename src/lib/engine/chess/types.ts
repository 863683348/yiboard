/** 弈界 YiBoard — 国际象棋（Chess）类型定义 */

export const CHESS_SIZE = 64;

export type ChessColor = 'white' | 'black';
export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface Piece {
  type: PieceType;
  color: ChessColor;
}

export type Cell = null | Piece;
export type ChessBoard = Cell[];

export type MoveFlag =
  | 'normal'
  | 'capture'
  | 'double'
  | 'castle-k'
  | 'castle-q'
  | 'enpassant'
  | 'promotion';

export interface ChessMove {
  from: number;
  to: number;
  piece: PieceType;
  color: ChessColor;
  captured: Piece | null;
  promotion?: PieceType;
  flag: MoveFlag;
}

export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';

export interface CastlingRights {
  whiteKingside: boolean;
  whiteQueenside: boolean;
  blackKingside: boolean;
  blackQueenside: boolean;
}

export interface ChessState {
  board: ChessBoard;
  turn: ChessColor;
  castling: CastlingRights;
  enPassant: number | null;
  halfmove: number;
  fullmove: number;
  status: GameStatus;
  winner: ChessColor | null;
  lastMove: ChessMove | null;
  inCheck: boolean;
}

/** Unicode 棋子符号（白方空心、黑方实心） */
export const PIECE_UNICODE: Record<PieceType, { white: string; black: string }> = {
  k: { white: '♔', black: '♚' },
  q: { white: '♕', black: '♛' },
  r: { white: '♖', black: '♜' },
  b: { white: '♗', black: '♝' },
  n: { white: '♘', black: '♞' },
  p: { white: '♙', black: '♟' },
};

export const PIECE_VALUES: Record<PieceType, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

export const FILE_LETTERS = 'abcdefgh';

/** 坐标：x = 文件 0..7（a..h），y = 行 0..7（1..8，y=0 为白方底线） */
export function idx(x: number, y: number): number {
  return y * 8 + x;
}

export function xy(i: number): { x: number; y: number } {
  return { x: i % 8, y: Math.floor(i / 8) };
}

export function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function cloneBoard(b: ChessBoard): ChessBoard {
  return [...b];
}

export function opposite(c: ChessColor): ChessColor {
  return c === 'white' ? 'black' : 'white';
}
