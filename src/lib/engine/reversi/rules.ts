/** 弈界 YiBoard — 黑白棋规则引擎（翻子、合法着法、pass、胜负） */

import {
  type ReversiBoard,
  type ReversiColor,
  type ReversiState,
  REVERSI_SIZE,
  idx,
  xy,
  inBounds,
  opposite,
  createBoard,
} from './types.ts';

export { createBoard, idx, xy, inBounds, opposite } from './types.ts';

const DIRECTIONS: ReadonlyArray<[number, number]> = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

/** 创建一个全新对局（标准 8×8 开局四子） */
export function createGame(size: number = REVERSI_SIZE): ReversiState {
  const board = createBoard(size);
  const mid = size / 2;
  board[idx(mid - 1, mid - 1, size)] = 'white';
  board[idx(mid, mid, size)] = 'white';
  board[idx(mid - 1, mid, size)] = 'black';
  board[idx(mid, mid - 1, size)] = 'black';
  return {
    board,
    size,
    turn: 'black',
    moveNumber: 0,
    lastMove: null,
    status: 'playing',
    winner: null,
    passCount: 0,
  };
}

/** 若把 color 落在 i，返回所有会被翻转的对方棋子索引 */
export function flipsFor(board: ReversiBoard, size: number, i: number, color: ReversiColor): number[] {
  if (board[i] !== null) return [];
  const { x, y } = xy(i, size);
  const opp = opposite(color);
  const flips: number[] = [];
  for (const [dx, dy] of DIRECTIONS) {
    const line: number[] = [];
    let cx = x + dx;
    let cy = y + dy;
    while (inBounds(cx, cy, size) && board[idx(cx, cy, size)] === opp) {
      line.push(idx(cx, cy, size));
      cx += dx;
      cy += dy;
    }
    if (line.length > 0 && inBounds(cx, cy, size) && board[idx(cx, cy, size)] === color) {
      flips.push(...line);
    }
  }
  return flips;
}

export function isLegalMove(state: ReversiState, i: number, color: ReversiColor = state.turn): boolean {
  if (state.status === 'finished') return false;
  if (state.board[i] !== null) return false;
  return flipsFor(state.board, state.size, i, color).length > 0;
}

export function legalMoves(state: ReversiState, color: ReversiColor = state.turn): number[] {
  const moves: number[] = [];
  for (let i = 0; i < state.board.length; i++) {
    if (isLegalMove(state, i, color)) moves.push(i);
  }
  return moves;
}

export function hasLegalMove(state: ReversiState, color: ReversiColor = state.turn): boolean {
  for (let i = 0; i < state.board.length; i++) {
    if (isLegalMove(state, i, color)) return true;
  }
  return false;
}

function computeWinner(board: ReversiBoard): ReversiColor | 'draw' {
  let black = 0;
  let white = 0;
  for (const c of board) {
    if (c === 'black') black++;
    else if (c === 'white') white++;
  }
  if (black > white) return 'black';
  if (white > black) return 'white';
  return 'draw';
}

/** 尝试落子。成功返回新状态，失败返回 null */
export function placeStone(
  state: ReversiState,
  i: number,
  color: ReversiColor = state.turn,
): ReversiState | null {
  if (!isLegalMove(state, i, color)) return null;

  const board = [...state.board];
  board[i] = color;
  for (const f of flipsFor(board, state.size, i, color)) board[f] = color;

  let turn: ReversiColor = opposite(color);
  let status: 'playing' | 'finished' = 'playing';
  let winner: ReversiColor | 'draw' | null = null;

  // 对方无子可下则自动 pass；若双方都无子可下则终局
  if (!hasLegalMove({ ...state, board, turn }, turn)) {
    if (!hasLegalMove({ ...state, board, turn: color }, color)) {
      status = 'finished';
      winner = computeWinner(board);
    } else {
      turn = color; // 对方跳过，仍轮到本方
    }
  }

  return {
    ...state,
    board,
    turn,
    moveNumber: state.moveNumber + 1,
    lastMove: i,
    passCount: 0,
    status,
    winner,
  };
}

/** Pass：无合法着法时调用。连续两次 pass 终局 */
export function pass(state: ReversiState, color: ReversiColor = state.turn): ReversiState {
  if (state.status === 'finished') return state;
  const passCount = state.passCount + 1;
  if (passCount >= 2) {
    return { ...state, status: 'finished', winner: computeWinner(state.board), passCount };
  }
  return { ...state, turn: opposite(color), passCount };
}

export function resign(state: ReversiState, color: ReversiColor = state.turn): ReversiState {
  if (state.status === 'finished') return state;
  return { ...state, status: 'finished', winner: opposite(color) };
}

export function countDiscs(board: ReversiBoard): { black: number; white: number } {
  let black = 0;
  let white = 0;
  for (const c of board) {
    if (c === 'black') black++;
    else if (c === 'white') white++;
  }
  return { black, white };
}

export function score(state: ReversiState): {
  black: number;
  white: number;
  winner: ReversiColor | 'draw' | null;
} {
  const { black, white } = countDiscs(state.board);
  return { black, white, winner: state.winner };
}
