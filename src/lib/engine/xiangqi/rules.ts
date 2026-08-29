/** 弈界 YiBoard — 象棋走法规则 */

import type { Cell, PieceType, XQBoard, XQColor, XQMove, GameStatus } from './types.ts'
import { XQ_ROWS, XQ_COLS, XQ_SIZE, idx, xy } from './types.ts'

export function createBoard(): XQBoard {
  const b: XQBoard = Array(XQ_SIZE).fill(null)

  // 黑方（上方，y=0 底线 / y=2 炮 / y=3 卒）
  const blackBack: PieceType[] = ['r', 'n', 'b', 'a', 'k', 'a', 'b', 'n', 'r']
  for (let x = 0; x < XQ_COLS; x++) {
    b[idx(x, 0)] = { type: blackBack[x]!, color: 'black' }
  }
  b[idx(1, 2)] = { type: 'c', color: 'black' }
  b[idx(7, 2)] = { type: 'c', color: 'black' }
  for (const x of [0, 2, 4, 6, 8]) {
    b[idx(x, 3)] = { type: 'p', color: 'black' }
  }

  // 红方（下方，y=9 底线 / y=7 炮 / y=6 兵）
  const redBack: PieceType[] = ['r', 'n', 'b', 'a', 'k', 'a', 'b', 'n', 'r']
  for (let x = 0; x < XQ_COLS; x++) {
    b[idx(x, 9)] = { type: redBack[x]!, color: 'red' }
  }
  b[idx(1, 7)] = { type: 'c', color: 'red' }
  b[idx(7, 7)] = { type: 'c', color: 'red' }
  for (const x of [0, 2, 4, 6, 8]) {
    b[idx(x, 6)] = { type: 'p', color: 'red' }
  }

  return b
}

export function cloneBoard(b: XQBoard): XQBoard { return [...b] }

function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < XQ_COLS && y >= 0 && y < XQ_ROWS
}

function palCenter(color: XQColor): { minX: number; maxX: number; minY: number; maxY: number } {
  const baseY = color === 'red' ? 7 : 0
  return { minX: 3, maxX: 5, minY: baseY, maxY: baseY + 2 }
}

function riverBound(color: XQColor): { minY: number; maxY: number } {
  return color === 'red' ? { minY: 5, maxY: 9 } : { minY: 0, maxY: 4 }
}

export function rawMoves(b: XQBoard, i: number): number[] {
  const cell = b[i]
  if (!cell) return []
  const { x, y } = xy(i)
  const { type, color } = cell
  const moves: number[] = []

  const tryAdd = (nx: number, ny: number) => {
    if (!inBounds(nx, ny)) return
    const j = idx(nx, ny)
    const target = b[j]
    if (target && target.color === color) return
    moves.push(j)
  }

  const slide = (dx: number, dy: number) => {
    let nx = x + dx, ny = y + dy
    while (inBounds(nx, ny)) {
      const j = idx(nx, ny)
      const target = b[j]
      if (target) {
        if (target.color !== color) moves.push(j)
        break
      }
      moves.push(j)
      nx += dx; ny += dy
    }
  }

  switch (type) {
    case 'k': {
      const p = palCenter(color)
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]] as [number,number][]) {
        const nx = x + dx, ny = y + dy
        if (nx >= p.minX && nx <= p.maxX && ny >= p.minY && ny <= p.maxY) tryAdd(nx, ny)
      }
      {
        const dir = color === 'red' ? -1 : 1
        let nx = x, ny = y + dir, blocked = false
        while (inBounds(nx, ny)) {
          const target = b[idx(nx, ny)]
          if (target) {
            if (target.type === 'k' && target.color !== color && !blocked) moves.push(idx(nx, ny))
            blocked = true; break
          }
          ny += dir
        }
      }
      break
    }
    case 'a': {
      const p = palCenter(color)
      for (const [dx, dy] of [[1,1],[1,-1],[-1,1],[-1,-1]] as [number,number][]) {
        const nx = x + dx, ny = y + dy
        if (nx >= p.minX && nx <= p.maxX && ny >= p.minY && ny <= p.maxY) tryAdd(nx, ny)
      }
      break
    }
    case 'b': {
      const rb = riverBound(color)
      for (const [dx, dy] of [[2,2],[2,-2],[-2,2],[-2,-2]] as [number,number][]) {
        const nx = x + dx, ny = y + dy
        if (!inBounds(nx, ny)) continue
        if (ny < rb.minY || ny > rb.maxY) continue
        if (b[idx(x + dx / 2, y + dy / 2)]) continue
        tryAdd(nx, ny)
      }
      break
    }
    case 'n': {
      const leaps: [number,number,number,number][] = [
        [1,2,0,1],[1,-2,0,-1],[-1,2,0,1],[-1,-2,0,-1],
        [2,1,1,0],[2,-1,1,0],[-2,1,-1,0],[-2,-1,-1,0],
      ]
      for (const [dx, dy, bx, by] of leaps) {
        const nx = x + dx, ny = y + dy
        if (!inBounds(nx, ny)) continue
        if (b[idx(x + bx, y + by)]) continue
        tryAdd(nx, ny)
      }
      break
    }
    case 'r':
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]] as [number,number][]) slide(dx, dy)
      break
    case 'c':
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]] as [number,number][]) {
        let nx = x + dx, ny = y + dy, screen = false
        while (inBounds(nx, ny)) {
          const j = idx(nx, ny)
          const target = b[j]
          if (!screen) {
            if (target) screen = true
            else moves.push(j)
          } else {
            if (target) {
              if (target.color !== color) moves.push(j)
              break
            }
          }
          nx += dx; ny += dy
        }
      }
      break
    case 'p': {
      const dir = color === 'red' ? -1 : 1
      const crossed = color === 'red' ? y <= 4 : y >= 5
      tryAdd(x, y + dir)
      if (crossed) { tryAdd(x - 1, y); tryAdd(x + 1, y) }
      break
    }
  }
  return moves
}

export function isInCheck(b: XQBoard, color: XQColor): boolean {
  let kingI = -1
  for (let i = 0; i < XQ_SIZE; i++) {
    const c = b[i]
    if (c && c.type === 'k' && c.color === color) { kingI = i; break }
  }
  if (kingI < 0) return true
  for (let i = 0; i < XQ_SIZE; i++) {
    const c = b[i]
    if (!c || c.color === color) continue
    const moves = rawMoves(b, i)
    if (moves.includes(kingI)) return true
  }
  return false
}

export function hasLegalMoves(b: XQBoard, color: XQColor): boolean {
  for (let i = 0; i < XQ_SIZE; i++) {
    const c = b[i]
    if (!c || c.color !== color) continue
    const moves = rawMoves(b, i)
    for (const j of moves) {
      const nb = cloneBoard(b)
      nb[j] = nb[i]!; nb[i] = null
      if (!isInCheck(nb, color)) return true
    }
  }
  return false
}

export function legalMoves(b: XQBoard, color: XQColor): XQMove[] {
  const result: XQMove[] = []
  for (let i = 0; i < XQ_SIZE; i++) {
    const c = b[i]
    if (!c || c.color !== color) continue
    const raw = rawMoves(b, i)
    for (const j of raw) {
      const nb = cloneBoard(b)
      nb[j] = nb[i]!; nb[i] = null
      if (!isInCheck(nb, color)) result.push({ from: i, to: j, captured: b[j] ?? undefined })
    }
  }
  return result
}

export function gameStatus(b: XQBoard, color: XQColor): { status: GameStatus; winner: XQColor | null } {
  const inCheck = isInCheck(b, color)
  const hasMoves = hasLegalMoves(b, color)
  if (!hasMoves) {
    return { status: inCheck ? 'checkmate' : 'stalemate', winner: inCheck ? (color === 'red' ? 'black' : 'red') : null }
  }
  return { status: inCheck ? 'check' : 'playing', winner: null }
}

export function applyMove(state: { board: XQBoard; turn: XQColor }, move: XQMove): { board: XQBoard; turn: XQColor } {
  const b = cloneBoard(state.board)
  b[move.to] = b[move.from]!
  b[move.from] = null
  return { board: b, turn: state.turn === 'red' ? 'black' : 'red' }
}

/**
 * UI 悔棋（undo）辅助：给定历史快照的轮次序列（'red' = 玩家行棋点），
 * 返回应将 history 切片到的长度，以"撤回到上一个玩家行棋点"——
 * 即同时撤销玩家上一步与 AI 的应手。
 * 例：['red','black','red'] -> 1（回到初始）；
 *     ['red','black','red','black','red'] -> 3（回到上一个红方回合）。
 * 若 AI 尚未应手（如 ['red','black']），则一并撤销玩家这一步。
 */
export function undoTargetIndex(turns: XQColor[]): number {
  if (turns.length <= 1) return turns.length
  let j = turns.length - 2
  while (j >= 0 && turns[j] !== 'red') j--
  if (j < 0) j = 0
  return j + 1
}
