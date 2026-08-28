/** 弈界 YiBoard — 象棋 AI（minimax + alpha-beta 剪枝） */

import { legalMoves, cloneBoard, gameStatus } from './rules'
import { type XQBoard, type XQColor, type XQMove, XQ_SIZE } from './types'

export type XQDifficulty = 'novice' | 'gentle' | 'steady' | 'sharp'

const DEPTH_MAP: Record<XQDifficulty, number> = { novice: 1, gentle: 2, steady: 3, sharp: 4 }

type PieceType = 'k' | 'a' | 'b' | 'n' | 'r' | 'c' | 'p'
const PIECE_VALUES: Record<PieceType, number> = { p: 10, n: 40, b: 20, a: 20, c: 45, r: 90, k: 0 }

function pieceSquareValue(type: PieceType, color: XQColor, x: number, y: number): number {
  const isRed = color === 'red'
  const row = isRed ? (8 - y) : y
  switch (type) {
    case 'p': {
      const crossed = isRed ? y <= 4 : y >= 5
      let v = crossed ? 30 : 10
      if (crossed) v += (4 - Math.abs(x - 4)) * 3
      return v
    }
    case 'n': {
      const centerBonus = Math.abs(x - 4) <= 2 && row >= 2 && row <= 6 ? 8 : 0
      return 35 + centerBonus
    }
    case 'r': {
      const openFile = x === 0 || x === 8 ? 5 : 0
      return 85 + openFile
    }
    case 'c': return 40
    case 'b':
    case 'a': return 20
    default: return 0
  }
}

function evaluate(b: XQBoard, color: XQColor): number {
  let score = 0
  for (let i = 0; i < XQ_SIZE; i++) {
    const cell = b[i]
    if (!cell) continue
    const x = i % 9
    const y = Math.floor(i / 9)
    const pv = PIECE_VALUES[cell.type as PieceType] ?? 0
    const ps = pieceSquareValue(cell.type as PieceType, cell.color, x, y)
    score += cell.color === color ? (pv + ps) : -(pv + ps)
  }
  return score
}

function minimaxSync(b: XQBoard, depth: number, alpha: number, beta: number, maximizing: boolean, aiColor: XQColor): number {
  const oppColor: XQColor = aiColor === 'red' ? 'black' : 'red'
  const checkColor = maximizing ? aiColor : oppColor

  if (depth === 0) return evaluate(b, aiColor)

  const moves = legalMoves(b, checkColor)
  if (moves.length === 0) {
    const { status } = gameStatus(b, checkColor)
    if (status === 'checkmate') return maximizing ? -100000 + depth : 100000 - depth
    return 0
  }

  if (maximizing) {
    let maxEval = -Infinity
    for (const move of moves) {
      const nb = cloneBoard(b)
      nb[move.to] = nb[move.from]!
      nb[move.from] = null
      const ev = minimaxSync(nb, depth - 1, alpha, beta, false, aiColor)
      maxEval = Math.max(maxEval, ev)
      alpha = Math.max(alpha, ev)
      if (beta <= alpha) break
    }
    return maxEval
  } else {
    let minEval = Infinity
    for (const move of moves) {
      const nb = cloneBoard(b)
      nb[move.to] = nb[move.from]!
      nb[move.from] = null
      const ev = minimaxSync(nb, depth - 1, alpha, beta, true, aiColor)
      minEval = Math.min(minEval, ev)
      beta = Math.min(beta, ev)
      if (beta <= alpha) break
    }
    return minEval
  }
}

export function bestMove(b: XQBoard, color: XQColor, difficulty: XQDifficulty): XQMove | null {
  const moves = legalMoves(b, color)
  if (moves.length === 0) return null

  const depth = DEPTH_MAP[difficulty]
  let bestEval = -Infinity
  let bestMove: XQMove | null = null

  for (const move of moves) {
    const nb = cloneBoard(b)
    nb[move.to] = nb[move.from]!
    nb[move.from] = null
    const ev = minimaxSync(nb, depth - 1, -Infinity, Infinity, false, color)
    if (ev > bestEval) {
      bestEval = ev
      bestMove = move
    }
  }
  return bestMove
}
