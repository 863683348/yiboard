/**
 * 象棋规则引擎测试（node:test）
 * 覆盖：初始布局、合法走法、将军/飞将/马将、将死判定、AI 走子
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { createBoard, legalMoves, gameStatus, isInCheck, applyMove, undoTargetIndex } from './rules.ts'
import { bestMove } from './ai.ts'
import { idx, XQ_SIZE } from './types.ts'

test('initial board has standard layout', () => {
  const b = createBoard()
  // 红方底线
  assert.equal(b[idx(0, 9)]?.type, 'r')
  assert.equal(b[idx(4, 9)]?.type, 'k')
  assert.equal(b[idx(8, 9)]?.type, 'r')
  // 黑方底线
  assert.equal(b[idx(0, 0)]?.type, 'r')
  assert.equal(b[idx(4, 0)]?.type, 'k')
  // 炮/兵
  assert.equal(b[idx(1, 7)]?.type, 'c')
  assert.equal(b[idx(1, 2)]?.type, 'c')
  assert.equal(b[idx(0, 6)]?.type, 'p')
  assert.equal(b[idx(0, 3)]?.type, 'p')
})

test('initial position has 44 legal moves for each side', () => {
  const b = createBoard()
  assert.equal(legalMoves(b, 'red').length, 44)
  assert.equal(legalMoves(b, 'black').length, 44)
  assert.equal(gameStatus(b, 'red').status, 'playing')
})

test('flying general detection', () => {
  const b = createBoard()
  for (let i = 0; i < XQ_SIZE; i++) b[i] = null
  b[idx(4, 9)] = { type: 'k', color: 'red' }
  b[idx(4, 0)] = { type: 'k', color: 'black' }
  assert.equal(isInCheck(b, 'red'), true)
  assert.equal(isInCheck(b, 'black'), true)
})

test('chariot check and king escape', () => {
  const b = createBoard()
  for (let i = 0; i < XQ_SIZE; i++) b[i] = null
  b[idx(4, 9)] = { type: 'k', color: 'red' }
  b[idx(4, 0)] = { type: 'k', color: 'black' }
  b[idx(4, 1)] = { type: 'r', color: 'red' }
  assert.equal(isInCheck(b, 'black'), true)
  // 黑将只能左右逃到 (3,0) (5,0)
  const moves = legalMoves(b, 'black')
  assert.ok(moves.length >= 1)
  for (const m of moves) {
    assert.equal(b[m.from]?.type, 'k') // 只有将能走
  }
})

test('horse check detection', () => {
  const b = createBoard()
  for (let i = 0; i < XQ_SIZE; i++) b[i] = null
  b[idx(4, 9)] = { type: 'k', color: 'red' }
  b[idx(4, 0)] = { type: 'k', color: 'black' }
  b[idx(5, 2)] = { type: 'n', color: 'red' }
  assert.equal(isInCheck(b, 'black'), true)
})

test('applyMove alternates turns', () => {
  const b = createBoard()
  const m = legalMoves(b, 'red')[0]!
  const r = applyMove({ board: b, turn: 'red' }, m)
  assert.equal(r.turn, 'black')
  assert.equal(r.board[m.to], b[m.from])
  assert.equal(r.board[m.from], null)
})

test('AI returns a legal move', () => {
  const b = createBoard()
  const m = bestMove(b, 'black', 'novice')
  assert.ok(m)
  const legal = legalMoves(b, 'black')
  assert.ok(legal.some(l => l.from === m!.from && l.to === m!.to))
})

test('undoTargetIndex reverts to previous player turn', () => {
  // 空 / 单快照：保持不变
  assert.equal(undoTargetIndex([]), 0)
  assert.equal(undoTargetIndex(['red']), 1)
  // 玩家落子后 AI 尚未应手：连这一步一起撤销
  assert.equal(undoTargetIndex(['red', 'black']), 1)
  // 一个完整回合后：回到初始（玩家上一步 + AI 应手一并撤销）
  assert.equal(undoTargetIndex(['red', 'black', 'red']), 1)
  // 两个完整回合后：回到上一个红方行棋点
  assert.equal(undoTargetIndex(['red', 'black', 'red', 'black', 'red']), 3)
})
