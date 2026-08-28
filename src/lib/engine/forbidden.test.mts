/**
 * Forbidden move detection tests (Renju rules).
 * Pure functions, zero dependencies — runs with node --test directly.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { createBoard, index, BLACK, WHITE } from './board.ts'
import { isForbiddenMove } from './forbidden.ts'

test('should allow normal moves on empty board', () => {
  const board = createBoard(15)
  assert.equal(isForbiddenMove(board, { x: 7, y: 7 }, BLACK, 5), false)
  assert.equal(isForbiddenMove(board, { x: 7, y: 7 }, WHITE, 5), false)
})

test('should reject overline for black', () => {
  const board = createBoard(15)
  for (let i = 0; i < 5; i++) {
    board[index(3 + i, 7, 15)] = BLACK
  }
  assert.equal(isForbiddenMove(board, { x: 8, y: 7 }, BLACK, 5), true)
})

test('should allow overline for white', () => {
  const board = createBoard(15)
  for (let i = 0; i < 5; i++) {
    board[index(3 + i, 7, 15)] = WHITE
  }
  assert.equal(isForbiddenMove(board, { x: 8, y: 7 }, WHITE, 5), false)
})

test('should work with different board sizes', () => {
  const board = createBoard(9)
  assert.equal(isForbiddenMove(board, { x: 4, y: 4 }, BLACK, 5), false)
})

test('should respect winCount parameter', () => {
  const board = createBoard(15)
  for (let i = 0; i < 5; i++) {
    board[index(3 + i, 7, 15)] = BLACK
  }
  assert.equal(isForbiddenMove(board, { x: 8, y: 7 }, BLACK, 6), false)
})
