// Forbidden move detection for Renju rules
// Black (BLACK) has forbidden moves: double-three, double-four, overline
// White (WHITE) has no restrictions

import type { Board, Point, Player } from './board.ts'
import { BLACK, index, boardSize } from './board.ts'

export const FORBIDDEN_PLAYERS: ReadonlySet<Player> = new Set([BLACK])

function countStonesInDirection(
  board: Board,
  x: number,
  y: number,
  dx: number,
  dy: number,
  player: Player,
  boardSizeNum: number,
): { count: number; openEnd: boolean } {
  let count = 0
  let openEnd = false

  let cx = x + dx
  let cy = y + dy

  while (cx >= 0 && cx < boardSizeNum && cy >= 0 && cy < boardSizeNum) {
    const idx = index(cx, cy, boardSizeNum)
    if (board[idx] === player) {
      count++
      cx += dx
      cy += dy
    } else if (board[idx] === 0) {
      // Check if this end is open
      const nx = cx + dx
      const ny = cy + dy
      if (nx >= 0 && nx < boardSizeNum && ny >= 0 && ny < boardSizeNum && board[index(nx, ny, boardSizeNum)] === 0) {
        openEnd = true
      }
      break
    } else {
      break
    }
  }

  return { count, openEnd }
}

function getOpenThreeCount(
  board: Board,
  x: number,
  y: number,
  player: Player,
  boardSizeNum: number,
): number {
  const dirs: ReadonlyArray<[number, number]> = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ]
  let openThreeCount = 0

  for (const [dx, dy] of dirs) {
    const forward = countStonesInDirection(board, x, y, dx, dy, player, boardSizeNum)
    const backward = countStonesInDirection(board, x, y, -dx, -dy, player, boardSizeNum)

    const totalStones = forward.count + backward.count
    const totalOpenEnds = (forward.openEnd ? 1 : 0) + (backward.openEnd ? 1 : 0)

    // Open three: 2 stones with both ends open
    if (totalStones === 2 && totalOpenEnds === 2) {
      openThreeCount++
    }
  }

  return openThreeCount
}

function getOpenFourCount(
  board: Board,
  x: number,
  y: number,
  player: Player,
  boardSizeNum: number,
): number {
  const dirs: ReadonlyArray<[number, number]> = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ]
  let openFourCount = 0

  for (const [dx, dy] of dirs) {
    const forward = countStonesInDirection(board, x, y, dx, dy, player, boardSizeNum)
    const backward = countStonesInDirection(board, x, y, -dx, -dy, player, boardSizeNum)

    const totalStones = forward.count + backward.count
    const totalOpenEnds = (forward.openEnd ? 1 : 0) + (backward.openEnd ? 1 : 0)

    // Open four: 3 stones with both ends open
    if (totalStones === 3 && totalOpenEnds === 2) {
      openFourCount++
    }
  }

  return openFourCount
}

function isLongConnect(board: Board, x: number, y: number, player: Player, winCount: number): boolean {
  const dirs: ReadonlyArray<[number, number]> = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ]

  for (const [dx, dy] of dirs) {
    let count = 1

    // Forward
    let fx = x + dx
    let fy = y + dy
    const bsz = boardSize(board)
    while (fx >= 0 && fx < bsz && fy >= 0 && fy < bsz) {
      const idx = index(fx, fy, bsz)
      if (board[idx] === player) {
        count++
        fx += dx
        fy += dy
      } else {
        break
      }
    }

    // Backward
    fx = x - dx
    fy = y - dy
    while (fx >= 0 && fx < bsz && fy >= 0 && fy < bsz) {
      const idx = index(fx, fy, bsz)
      if (board[idx] === player) {
        count++
        fx -= dx
        fy -= dy
      } else {
        break
      }
    }

    if (count > winCount) {
      return true
    }
  }

  return false
}

export function isForbiddenMove(
  board: Board,
  point: Point,
  player: Player,
  winCount: number,
): boolean {
  if (!FORBIDDEN_PLAYERS.has(player)) {
    return false
  }

  const bsz = boardSize(board)
  const { x, y } = point

  // Check overline
  if (isLongConnect(board, x, y, player, winCount)) {
    return true
  }

  // Check double-open-three
  const openThreeCount = getOpenThreeCount(board, x, y, player, bsz)
  if (openThreeCount >= 2) {
    return true
  }

  // Check double-open-four
  const openFourCount = getOpenFourCount(board, x, y, player, bsz)
  if (openFourCount >= 2) {
    return true
  }

  return false
}

export type GameMode = 'gomoku' | 'renju'
