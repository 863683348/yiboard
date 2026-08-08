/**
 * 弈界 YiBoard — 对局状态机
 * 每次落子返回全新 state（棋盘做 copy），便于 React 直接比较引用。
 */

import {
  BLACK,
  cloneBoard,
  createBoard,
  findWinningLine,
  isFull,
  isLegalMove,
  opponent,
  place,
  toNotation,
  type Board,
  type Player,
  type Point,
} from './board';

export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  turn: Player;
  moves: Point[];
  status: GameStatus;
  winner: Player | null;
  winningLine: Point[] | null;
  lastMove: Point | null;
}

export function createGame(first: Player = BLACK): GameState {
  return {
    board: createBoard(),
    turn: first,
    moves: [],
    status: 'playing',
    winner: null,
    winningLine: null,
    lastMove: null,
  };
}

export function applyMove(state: GameState, x: number, y: number): GameState | null {
  if (state.status !== 'playing') return null;
  if (!isLegalMove(state.board, x, y)) return null;

  const board = cloneBoard(state.board);
  place(board, x, y, state.turn);

  const winningLine = findWinningLine(board, x, y);
  const moves = [...state.moves, { x, y }];

  if (winningLine) {
    return {
      board,
      turn: state.turn,
      moves,
      status: 'won',
      winner: state.turn,
      winningLine,
      lastMove: { x, y },
    };
  }

  if (isFull(board)) {
    return {
      board,
      turn: state.turn,
      moves,
      status: 'draw',
      winner: null,
      winningLine: null,
      lastMove: { x, y },
    };
  }

  return {
    board,
    turn: opponent(state.turn),
    moves,
    status: 'playing',
    winner: null,
    winningLine: null,
    lastMove: { x, y },
  };
}

/** 悔棋：重放前 n-plies 手。人机模式一次退 2 手（对手 + 自己）。 */
export function undo(state: GameState, plies = 1): GameState {
  const kept = state.moves.slice(0, Math.max(0, state.moves.length - plies));
  return replay(kept);
}

export function replay(moves: readonly Point[], first: Player = BLACK): GameState {
  let state = createGame(first);
  for (const move of moves) {
    const next = applyMove(state, move.x, move.y);
    if (!next) break;
    state = next;
  }
  return state;
}

/** 序列化成紧凑棋谱串（用于分享卡 / URL），例：`H8,I9,G7` */
export function serializeMoves(moves: readonly Point[]): string {
  return moves.map((m) => toNotation(m.x, m.y)).join(',');
}

export function boardToArray(board: Board): number[] {
  return Array.from(board);
}
