/**
 * 棋盘原语测试：胜负判定 / 记谱往返 / 落子合法性。
 * 服务端权威的根基，P0 语义，必须覆盖。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  BLACK,
  WHITE,
  createBoard,
  findWinningLine,
  fromNotation,
  index,
  isLegalMove,
  place,
  toNotation,
} from './board.ts';

test('竖五连判胜并返回整条线', () => {
  const b = createBoard();
  for (let y = 7; y <= 11; y += 1) place(b, 7, y, BLACK);
  const line = findWinningLine(b, 7, 11);
  assert.ok(line);
  assert.equal(line.length, 5);
  assert.deepEqual(line[0], { x: 7, y: 7 });
  assert.deepEqual(line[4], { x: 7, y: 11 });
});

test('长连（6 子）同样判胜（自由规则）', () => {
  const b = createBoard();
  for (let x = 3; x <= 8; x += 1) place(b, x, 5, BLACK);
  const line = findWinningLine(b, 8, 5);
  assert.ok(line);
  assert.equal(line.length, 6);
});

test('对角五连', () => {
  const b = createBoard();
  for (let i = 0; i < 5; i += 1) place(b, 3 + i, 3 + i, WHITE);
  assert.ok(findWinningLine(b, 7, 7));
});

test('四连不判胜，无连线返回 null', () => {
  const b = createBoard();
  for (let y = 5; y <= 8; y += 1) place(b, 10, y, BLACK);
  assert.equal(findWinningLine(b, 10, 8), null);
});

test('空点不判胜', () => {
  const b = createBoard();
  assert.equal(findWinningLine(b, 7, 7), null);
});

test('记谱往返：H8 ↔ (7,7)，A1 ↔ (0,14)，O15 ↔ (14,0)', () => {
  assert.deepEqual(fromNotation('H8'), { x: 7, y: 7 });
  assert.deepEqual(fromNotation('A1'), { x: 0, y: 14 });
  assert.deepEqual(fromNotation('O15'), { x: 14, y: 0 });
  assert.equal(toNotation(7, 7), 'H8');
  assert.equal(toNotation(0, 14), 'A1');
  assert.equal(toNotation(14, 0), 'O15');
});

test('非法记谱返回 null', () => {
  assert.equal(fromNotation('P16'), null);
  assert.equal(fromNotation('Z9'), null);
  assert.equal(fromNotation('garbage'), null);
});

test('落子合法性：越界与占用点均非法', () => {
  const b = createBoard();
  place(b, 7, 7, BLACK);
  assert.equal(isLegalMove(b, 7, 7), false);
  assert.equal(isLegalMove(b, -1, 7), false);
  assert.equal(isLegalMove(b, 15, 7), false);
  assert.equal(isLegalMove(b, 0, 0), true);
});

test('index 计算：y 行优先', () => {
  assert.equal(index(0, 0), 0);
  assert.equal(index(7, 7), 7 * 15 + 7);
});
