/** 弈界 YiBoard — 围棋规则引擎（提子、打劫、数子） */

import {
  type GoBoard,
  type GoColor,
  type GoMove,
  type GoScore,
  type GoState,
  type GoBoardSize,
  createBoard,
  cloneBoard,
  hashBoard,
  idx,
  xy,
  inBounds,
  opposite,
} from './types.ts';

export { createBoard, cloneBoard, hashBoard, idx, xy, inBounds, opposite } from './types.ts';

/** 创建一个全新对局 */
export function createGame(size: GoBoardSize = 19): GoState {
  return {
    board: createBoard(size),
    size,
    turn: 'black',
    moveNumber: 0,
    lastMove: null,
    history: [],
    passes: 0,
    status: 'playing',
    winner: null,
    blackPrisoners: 0,
    whitePrisoners: 0,
  };
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

/** 找出某个点所在棋块（连通的同色棋子）以及其气点（上下左右空点集合） */
function getGroup(
  board: GoBoard,
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
      if (cell === null) {
        libertiesSet.add(n);
      } else if (cell === color && !visited.has(n)) {
        visited.add(n);
        stack.push(n);
      }
    }
  }
  return { stones, liberties: Array.from(libertiesSet) };
}

/** 在 placement 后移除对方无气棋块，返回被提子坐标 */
function removeCapturedStones(
  board: GoBoard,
  size: GoBoardSize,
  placedColor: GoColor,
): { captured: number[]; newBoard: GoBoard } {
  const newBoard = cloneBoard(board);
  const opponent = opposite(placedColor);
  const captured: number[] = [];

  for (let i = 0; i < newBoard.length; i++) {
    const cell = newBoard[i];
    if (cell !== opponent) continue;
    const { stones, liberties } = getGroup(newBoard, i, size);
    if (liberties.length === 0) {
      for (const s of stones) {
        newBoard[s] = null;
        captured.push(s);
      }
    }
  }
  return { captured, newBoard };
}

/** 判断落子是否合法。返回 { legal: boolean, reason?: string } */
export function isLegalMove(
  state: GoState,
  x: number,
  y: number,
  color: GoColor = state.turn,
): { legal: boolean; reason?: string } {
  if (state.status === 'finished') return { legal: false, reason: 'game over' };
  if (!inBounds(x, y, state.size)) return { legal: false, reason: 'out of bounds' };
  const i = idx(x, y, state.size);
  if (state.board[i] !== null) return { legal: false, reason: 'occupied' };

  // 模拟落子
  const temp = cloneBoard(state.board);
  temp[i] = color;
  const opponent = opposite(color);

  // 先提对方无气子
  const { captured, newBoard } = removeCapturedStones(temp, state.size, color);

  // 检查己方是否还有气
  const ownGroup = getGroup(newBoard, i, state.size);
  if (ownGroup.liberties.length === 0) {
    return { legal: false, reason: 'suicide' };
  }

  // 打劫：不能走成与历史某一局面完全相同的形状（简单 ko）
  const nextHash = hashBoard(newBoard);
  if (state.history.includes(nextHash)) {
    return { legal: false, reason: 'ko' };
  }

  return { legal: true };
}

/** 尝试落子。成功返回新状态，失败返回 null */
export function placeStone(
  state: GoState,
  x: number,
  y: number,
  color: GoColor = state.turn,
): GoState | null {
  const check = isLegalMove(state, x, y, color);
  if (!check.legal) return null;

  const i = idx(x, y, state.size);
  const temp = cloneBoard(state.board);
  temp[i] = color;

  const { captured, newBoard } = removeCapturedStones(temp, state.size, color);
  const nextHash = hashBoard(newBoard);

  const newPrisoners =
    color === 'black'
      ? { blackPrisoners: state.blackPrisoners + captured.length, whitePrisoners: state.whitePrisoners }
      : { blackPrisoners: state.blackPrisoners, whitePrisoners: state.whitePrisoners + captured.length };

  const move: GoMove = { type: 'place', x, y };

  return {
    ...state,
    board: newBoard,
    turn: opposite(color),
    moveNumber: state.moveNumber + 1,
    lastMove: move,
    history: [...state.history, nextHash],
    passes: 0,
    status: 'playing',
    winner: null,
    ...newPrisoners,
  };
}

/** Pass */
export function pass(state: GoState, color: GoColor = state.turn): GoState {
  if (state.status === 'finished') return state;
  const newPasses = state.passes + 1;
  const finished = newPasses >= 2;
  const nextState: GoState = {
    ...state,
    turn: opposite(color),
    moveNumber: state.moveNumber + 1,
    lastMove: { type: 'pass' },
    history: [...state.history, hashBoard(state.board)],
    passes: newPasses,
    status: finished ? 'finished' : 'playing',
  };
  if (finished) {
    const { winner, margin } = scoreGame(nextState);
    nextState.winner = winner;
    nextState.margin = margin;
  }
  return nextState;
}

/** 认输 */
export function resign(state: GoState, color: GoColor = state.turn): GoState {
  if (state.status === 'finished') return state;
  return {
    ...state,
    status: 'finished',
    winner: opposite(color),
    lastMove: { type: 'resign' },
  };
}

function territoryOwner(board: GoBoard, size: GoBoardSize, emptyI: number): GoColor | 'neutral' | 'edge' {
  const { x, y } = xy(emptyI, size);
  let touchesBlack = false;
  let touchesWhite = false;

  // 洪水填充找出这片空区域相邻的所有颜色
  const region: number[] = [];
  const visited = new Set<number>();
  const stack = [emptyI];
  visited.add(emptyI);

  while (stack.length > 0) {
    const i = stack.pop()!;
    region.push(i);
    const cx = i % size;
    const cy = Math.floor(i / size);
    for (const n of neighbors(i, size)) {
      const cell = board[n];
      if (cell === null) {
        if (!visited.has(n)) {
          visited.add(n);
          stack.push(n);
        }
      } else if (cell === 'black') {
        touchesBlack = true;
      } else if (cell === 'white') {
        touchesWhite = true;
      }
    }
  }

  if (touchesBlack && !touchesWhite) return 'black';
  if (touchesWhite && !touchesBlack) return 'white';
  return 'neutral';
}

/** 计算终局得分：采用数子法（中国规则简化版） = 活子 + 领地，含贴目 */
export function calculateScore(state: GoState): GoScore {
  const { board, size } = state;
  const komi = size === 9 ? 5.5 : size === 13 ? 6.5 : 7.5;

  let blackStones = 0;
  let whiteStones = 0;
  for (const cell of board) {
    if (cell === 'black') blackStones++;
    else if (cell === 'white') whiteStones++;
  }

  const visited = new Set<number>();
  let blackTerritory = 0;
  let whiteTerritory = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i] !== null || visited.has(i)) continue;
    const owner = territoryOwner(board, size, i);
    if (owner === 'black') {
      // 计算这片区域大小
      const regionVisited = new Set<number>();
      const stack = [i];
      regionVisited.add(i);
      let count = 0;
      while (stack.length > 0) {
        const ci = stack.pop()!;
        count++;
        for (const n of neighbors(ci, size)) {
          if (board[n] === null && !regionVisited.has(n)) {
            regionVisited.add(n);
            stack.push(n);
          }
        }
      }
      blackTerritory += count;
      regionVisited.forEach(v => visited.add(v));
    } else if (owner === 'white') {
      const regionVisited = new Set<number>();
      const stack = [i];
      regionVisited.add(i);
      let count = 0;
      while (stack.length > 0) {
        const ci = stack.pop()!;
        count++;
        for (const n of neighbors(ci, size)) {
          if (board[n] === null && !regionVisited.has(n)) {
            regionVisited.add(n);
            stack.push(n);
          }
        }
      }
      whiteTerritory += count;
      regionVisited.forEach(v => visited.add(v));
    } else {
      // neutral: 仅标记访问过，不计分
      const stack = [i];
      visited.add(i);
      while (stack.length > 0) {
        const ci = stack.pop()!;
        for (const n of neighbors(ci, size)) {
          if (board[n] === null && !visited.has(n)) {
            visited.add(n);
            stack.push(n);
          }
        }
      }
    }
  }

  return {
    black: blackStones + blackTerritory,
    white: whiteStones + whiteTerritory + komi,
    komi,
  };
}

/** 判定胜负并返回 margin（黑 - 白，含贴目） */
export function scoreGame(state: GoState): { winner: GoColor | 'draw' | null; margin: number } {
  const scores = calculateScore(state);
  const margin = scores.black - scores.white;
  if (margin > 0) return { winner: 'black', margin };
  if (margin < 0) return { winner: 'white', margin: -margin };
  return { winner: 'draw', margin: 0 };
}

/** 列出某颜色的所有合法落子（不含 pass/resign） */
export function legalMoves(state: GoState, color: GoColor = state.turn): { x: number; y: number }[] {
  const moves: { x: number; y: number }[] = [];
  for (let y = 0; y < state.size; y++) {
    for (let x = 0; x < state.size; x++) {
      if (isLegalMove(state, x, y, color).legal) {
        moves.push({ x, y });
      }
    }
  }
  return moves;
}
