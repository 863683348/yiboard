/** 弈界 YiBoard — 象棋走法规则 */

import type { Cell, PieceType, XQBoard, XQColor, XQMove, GameStatus } from './types'
import { XQ_ROWS, XQ_COLS, XQ_SIZE, idx, xy } from './types'

export function createBoard(): XQBoard {
  const b: XQBoard = Array(XQ_SIZE).fill(null)
  const setup: [string, XQColor, number][] = [
    ['r','black',0],['n','black',1],['b','black',2],['a','black',3],
    ['k','black',4],['a','black',5],['b','black',6],['n','black',7],['r','black',8],
    ['c','black',18],['c','black',54],
    ['p','black',27],['p','black',45],['p','black',63],['p','black',81],['p','black',99],
    ['r','red',72],['n','red',81],['b','red',90],['a','red',99],
    ['k','red',108],['a','red',117],['b','red',126],['n','red',135],['r','red',144],
    ['c','red',126],['c','red',162],
    ['p','red',135],['p','red',153],['p','red',171],['p','red',189],['p','red',207],
  ]
  for (const [type, color, i] of setup) {
    b[i] = { type: type as import('./types').PieceType, color }
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
