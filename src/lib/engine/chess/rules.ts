/** 弈界 YiBoard — 国际象棋规则引擎（走法生成、王车易位、吃过路兵、将军/将死判定） */

import {
  type Cell,
  type PieceType,
  type ChessColor,
  type ChessBoard,
  type ChessMove,
  type GameStatus,
  type CastlingRights,
  type ChessState,
  idx,
  xy,
  inBounds,
  opposite,
  cloneBoard,
} from './types.ts';

export { cloneBoard, idx, xy, inBounds, opposite } from './types.ts';

const KNIGHT_OFFSETS: ReadonlyArray<[number, number]> = [
  [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2],
];
const KING_OFFSETS: ReadonlyArray<[number, number]> = [
  [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1],
];
const ROOK_DIRS: ReadonlyArray<[number, number]> = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const BISHOP_DIRS: ReadonlyArray<[number, number]> = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const QUEEN_DIRS: ReadonlyArray<[number, number]> = [...ROOK_DIRS, ...BISHOP_DIRS];

const EMPTY_CASTLING: CastlingRights = {
  whiteKingside: false,
  whiteQueenside: false,
  blackKingside: false,
  blackQueenside: false,
};

function createInitialBoard(): ChessBoard {
  const b: ChessBoard = Array(64).fill(null);
  const back: PieceType[] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  for (let x = 0; x < 8; x++) {
    b[idx(x, 0)] = { type: back[x]!, color: 'white' };
    b[idx(x, 1)] = { type: 'p', color: 'white' };
    b[idx(x, 6)] = { type: 'p', color: 'black' };
    b[idx(x, 7)] = { type: back[x]!, color: 'black' };
  }
  return b;
}

export function createGame(): ChessState {
  return {
    board: createInitialBoard(),
    turn: 'white',
    castling: { whiteKingside: true, whiteQueenside: true, blackKingside: true, blackQueenside: true },
    enPassant: null,
    halfmove: 0,
    fullmove: 1,
    status: 'playing',
    winner: null,
    lastMove: null,
    inCheck: false,
  };
}

/** 判断 sq 是否被 by 方攻击（用于将军 / 易位合法性） */
export function isSquareAttacked(board: ChessBoard, sq: number, by: ChessColor): boolean {
  const { x, y } = xy(sq);

  // 兵的攻击：by 方兵从 (x±1, y-pawnDir) 攻击 sq
  const pawnDir = by === 'white' ? 1 : -1;
  for (const dx of [-1, 1]) {
    const px = x + dx;
    const py = y - pawnDir;
    if (inBounds(px, py)) {
      const p = board[idx(px, py)];
      if (p && p.color === by && p.type === 'p') return true;
    }
  }
  // 马
  for (const [dx, dy] of KNIGHT_OFFSETS) {
    const nx = x + dx;
    const ny = y + dy;
    if (inBounds(nx, ny)) {
      const p = board[idx(nx, ny)];
      if (p && p.color === by && p.type === 'n') return true;
    }
  }
  // 王
  for (const [dx, dy] of KING_OFFSETS) {
    const nx = x + dx;
    const ny = y + dy;
    if (inBounds(nx, ny)) {
      const p = board[idx(nx, ny)];
      if (p && p.color === by && p.type === 'k') return true;
    }
  }
  // 车 / 后（直线）
  for (const [dx, dy] of ROOK_DIRS) {
    let nx = x + dx;
    let ny = y + dy;
    while (inBounds(nx, ny)) {
      const p = board[idx(nx, ny)];
      if (p) {
        if (p.color === by && (p.type === 'r' || p.type === 'q')) return true;
        break;
      }
      nx += dx;
      ny += dy;
    }
  }
  // 象 / 后（斜线）
  for (const [dx, dy] of BISHOP_DIRS) {
    let nx = x + dx;
    let ny = y + dy;
    while (inBounds(nx, ny)) {
      const p = board[idx(nx, ny)];
      if (p) {
        if (p.color === by && (p.type === 'b' || p.type === 'q')) return true;
        break;
      }
      nx += dx;
      ny += dy;
    }
  }
  return false;
}

export function findKing(board: ChessBoard, color: ChessColor): number {
  for (let i = 0; i < 64; i++) {
    const p = board[i];
    if (p && p.color === color && p.type === 'k') return i;
  }
  return -1;
}

export function isInCheck(board: ChessBoard, color: ChessColor): boolean {
  const k = findKing(board, color);
  if (k < 0) return true;
  return isSquareAttacked(board, k, opposite(color));
}

/** 伪合法走法（不考虑己方被将军）。promotion 默认升后。 */
function pseudoMoves(board: ChessBoard, i: number, enPassant: number | null): ChessMove[] {
  const piece = board[i];
  if (!piece) return [];
  const { x, y } = xy(i);
  const color = piece.color;
  const moves: ChessMove[] = [];
  const add = (to: number, flag: ChessMove['flag'] = 'normal', promotion?: PieceType) => {
    const target = board[to];
    const captured = target && target.color !== color ? target : null;
    moves.push({ from: i, to, piece: piece.type, color, captured, promotion, flag });
  };
  const dir = color === 'white' ? 1 : -1;

  switch (piece.type) {
    case 'p': {
      const fwd1 = y + dir;
      if (inBounds(x, fwd1) && !board[idx(x, fwd1)]) {
        if (fwd1 === 0 || fwd1 === 7) add(idx(x, fwd1), 'promotion', 'q');
        else add(idx(x, fwd1));
        const fwd2 = y + 2 * dir;
        if (y === (color === 'white' ? 1 : 6) && !board[idx(x, fwd2)]) add(idx(x, fwd2), 'double');
      }
      for (const dx of [-1, 1]) {
        const cx = x + dx;
        const cy = y + dir;
        if (!inBounds(cx, cy)) continue;
        const t = board[idx(cx, cy)];
        if (t && t.color !== color) {
          if (cy === 0 || cy === 7) add(idx(cx, cy), 'capture', 'q');
          else add(idx(cx, cy), 'capture');
        } else if (enPassant !== null && idx(cx, cy) === enPassant) {
          add(idx(cx, cy), 'enpassant');
        }
      }
      break;
    }
    case 'n': {
      for (const [dx, dy] of KNIGHT_OFFSETS) {
        const nx = x + dx;
        const ny = y + dy;
        if (!inBounds(nx, ny)) continue;
        const t = board[idx(nx, ny)];
        if (!t || t.color !== color) add(idx(nx, ny), t ? 'capture' : 'normal');
      }
      break;
    }
    case 'k': {
      for (const [dx, dy] of KING_OFFSETS) {
        const nx = x + dx;
        const ny = y + dy;
        if (!inBounds(nx, ny)) continue;
        const t = board[idx(nx, ny)];
        if (!t || t.color !== color) add(idx(nx, ny), t ? 'capture' : 'normal');
      }
      break;
    }
    case 'b': {
      for (const [dx, dy] of BISHOP_DIRS) {
        let nx = x + dx;
        let ny = y + dy;
        while (inBounds(nx, ny)) {
          const t = board[idx(nx, ny)];
          if (!t) add(idx(nx, ny));
          else { if (t.color !== color) add(idx(nx, ny), 'capture'); break; }
          nx += dx;
          ny += dy;
        }
      }
      break;
    }
    case 'r': {
      for (const [dx, dy] of ROOK_DIRS) {
        let nx = x + dx;
        let ny = y + dy;
        while (inBounds(nx, ny)) {
          const t = board[idx(nx, ny)];
          if (!t) add(idx(nx, ny));
          else { if (t.color !== color) add(idx(nx, ny), 'capture'); break; }
          nx += dx;
          ny += dy;
        }
      }
      break;
    }
    case 'q': {
      for (const [dx, dy] of QUEEN_DIRS) {
        let nx = x + dx;
        let ny = y + dy;
        while (inBounds(nx, ny)) {
          const t = board[idx(nx, ny)];
          if (!t) add(idx(nx, ny));
          else { if (t.color !== color) add(idx(nx, ny), 'capture'); break; }
          nx += dx;
          ny += dy;
        }
      }
      break;
    }
  }
  return moves;
}

function leavesKingInCheck(board: ChessBoard, move: ChessMove, color: ChessColor): boolean {
  const nb = cloneBoard(board);
  if (move.flag === 'enpassant') {
    nb[move.to] = { type: move.promotion ?? move.piece, color: move.color };
    nb[move.from] = null;
    nb[idx(xy(move.to).x, xy(move.from).y)] = null;
  } else {
    nb[move.to] = { type: move.promotion ?? move.piece, color: move.color };
    nb[move.from] = null;
  }
  return isInCheck(nb, color);
}

function addCastlingMoves(state: ChessState, color: ChessColor, out: ChessMove[]): void {
  const board = state.board;
  const rank = color === 'white' ? 0 : 7;
  const enemy = opposite(color);
  const kingStart = idx(4, rank);
  const king = board[kingStart];
  if (!king || king.type !== 'k' || king.color !== color) return;
  if (isInCheck(board, color)) return;

  const kingSide = color === 'white' ? state.castling.whiteKingside : state.castling.blackKingside;
  if (kingSide) {
    const rook = board[idx(7, rank)];
    if (
      rook && rook.type === 'r' && rook.color === color &&
      !board[idx(5, rank)] && !board[idx(6, rank)] &&
      !isSquareAttacked(board, idx(5, rank), enemy) &&
      !isSquareAttacked(board, idx(6, rank), enemy)
    ) {
      out.push({ from: kingStart, to: idx(6, rank), piece: 'k', color, captured: null, flag: 'castle-k' });
    }
  }

  const queenSide = color === 'white' ? state.castling.whiteQueenside : state.castling.blackQueenside;
  if (queenSide) {
    const rook = board[idx(0, rank)];
    if (
      rook && rook.type === 'r' && rook.color === color &&
      !board[idx(1, rank)] && !board[idx(2, rank)] && !board[idx(3, rank)] &&
      !isSquareAttacked(board, idx(3, rank), enemy) &&
      !isSquareAttacked(board, idx(2, rank), enemy)
    ) {
      out.push({ from: kingStart, to: idx(2, rank), piece: 'k', color, captured: null, flag: 'castle-q' });
    }
  }
}

export function legalMoves(state: ChessState, color: ChessColor = state.turn): ChessMove[] {
  const board = state.board;
  const result: ChessMove[] = [];
  for (let i = 0; i < 64; i++) {
    const p = board[i];
    if (!p || p.color !== color) continue;
    const pm = pseudoMoves(board, i, state.enPassant);
    for (const m of pm) {
      if (!leavesKingInCheck(board, m, color)) result.push(m);
    }
  }
  addCastlingMoves(state, color, result);
  return result;
}

/** 取得某方某子的全部合法目标格 */
export function legalTargetsFrom(state: ChessState, from: number): number[] {
  return legalMoves(state, state.board[from]?.color ?? state.turn)
    .filter((m) => m.from === from)
    .map((m) => m.to);
}

export function applyMove(state: ChessState, move: ChessMove): ChessState {
  const board = cloneBoard(state.board);
  const piece = board[move.from]!;
  const color = piece.color;

  const target = board[move.to];
  let captured = target;

  if (move.flag === 'enpassant') {
    board[idx(xy(move.to).x, xy(move.from).y)] = null;
  }

  board[move.to] = { type: move.promotion ?? piece.type, color };
  board[move.from] = null;

  if (move.flag === 'castle-k') {
    const rank = color === 'white' ? 0 : 7;
    board[idx(5, rank)] = board[idx(7, rank)]!;
    board[idx(7, rank)] = null;
  } else if (move.flag === 'castle-q') {
    const rank = color === 'white' ? 0 : 7;
    board[idx(3, rank)] = board[idx(0, rank)]!;
    board[idx(0, rank)] = null;
  }

  const castling = { ...state.castling };
  if (piece.type === 'k') {
    if (color === 'white') { castling.whiteKingside = false; castling.whiteQueenside = false; }
    else { castling.blackKingside = false; castling.blackQueenside = false; }
  }
  const myRank = color === 'white' ? 0 : 7;
  const oppRank = color === 'white' ? 7 : 0;
  if (move.from === idx(0, myRank)) {
    if (color === 'white') castling.whiteQueenside = false; else castling.blackQueenside = false;
  }
  if (move.from === idx(7, myRank)) {
    if (color === 'white') castling.whiteKingside = false; else castling.blackKingside = false;
  }
  if (move.to === idx(0, oppRank)) {
    if (color === 'white') castling.blackQueenside = false; else castling.whiteQueenside = false;
  }
  if (move.to === idx(7, oppRank)) {
    if (color === 'white') castling.blackKingside = false; else castling.whiteKingside = false;
  }

  let enPassant: number | null = null;
  if (piece.type === 'p' && Math.abs(xy(move.to).y - xy(move.from).y) === 2) {
    enPassant = idx(xy(move.to).x, (xy(move.from).y + xy(move.to).y) / 2);
  }

  const halfmove = piece.type === 'p' || captured ? 0 : state.halfmove + 1;
  const fullmove = color === 'black' ? state.fullmove + 1 : state.fullmove;

  const turn = opposite(color);
  const { status, winner } = statusOf(board, turn, castling, enPassant, halfmove);

  return {
    board,
    turn,
    castling,
    enPassant,
    halfmove,
    fullmove,
    status,
    winner,
    lastMove: move,
    inCheck: status === 'check' || status === 'checkmate',
  };
}

function insufficientMaterial(board: ChessBoard): boolean {
  const minors: PieceType[] = [];
  for (const c of board) {
    if (c && c.type !== 'k') minors.push(c.type);
  }
  if (minors.length === 0) return true; // 王 vs 王
  if (minors.length === 1 && (minors[0] === 'b' || minors[0] === 'n')) return true; // 王 vs 单象/单马
  return false;
}

export function statusOf(
  board: ChessBoard,
  turn: ChessColor,
  castling: CastlingRights,
  enPassant: number | null,
  halfmove: number,
): { status: GameStatus; winner: ChessColor | null } {
  const probe: ChessState = {
    board,
    turn,
    castling,
    enPassant,
    halfmove,
    fullmove: 1,
    status: 'playing',
    winner: null,
    lastMove: null,
    inCheck: false,
  };
  const moves = legalMoves(probe, turn);
  const check = isInCheck(board, turn);
  if (moves.length === 0) {
    return check ? { status: 'checkmate', winner: opposite(turn) } : { status: 'stalemate', winner: null };
  }
  if (halfmove >= 100) return { status: 'draw', winner: null };
  if (insufficientMaterial(board)) return { status: 'draw', winner: null };
  return { status: check ? 'check' : 'playing', winner: null };
}

/** 引擎内部悔棋辅助：截到上一个玩家行棋点（同时撤销玩家与 AI 各一步） */
export function undoTargetIndex(turns: ChessColor[]): number {
  if (turns.length <= 1) return turns.length;
  let j = turns.length - 2;
  while (j >= 0 && turns[j] !== 'white') j--;
  if (j < 0) j = 0;
  return j + 1;
}
