/**
 * 棋盘原语测试：胜负判定 / 记谱往返 / 落子合法性。
 * 服务端权威的根基，P0 语义，必须覆盖。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  BLACK,
  WHITE,
  boardSize,
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

/* ---------------- 变体棋盘：9/13/15 尺寸 + 5/6/7 连珠 ---------------- */

test('9×9 棋盘：长度/边长/边界校验', () => {
  const b = createBoard(9);
  assert.equal(b.length, 81);
  assert.equal(boardSize(b), 9);
  assert.equal(index(8, 8, 9), 8 * 9 + 8);
  assert.equal(isLegalMove(b, 0, 0), true);
  assert.equal(isLegalMove(b, 8, 8), true);
  assert.equal(isLegalMove(b, 9, 0), false);
  assert.equal(isLegalMove(b, 0, 9), false);
  assert.equal(isLegalMove(b, -1, 0), false);
});

test('13×13 棋盘：长度/边长', () => {
  const b = createBoard(13);
  assert.equal(b.length, 169);
  assert.equal(boardSize(b), 13);
  assert.equal(index(12, 12, 13), 12 * 13 + 12);
});

test('6 连珠判胜、5 连不判胜（9×9 变体）', () => {
  const b = createBoard(9);
  // 5 连：不算胜
  for (let x = 1; x <= 5; x += 1) place(b, x, 4, BLACK);
  assert.equal(findWinningLine(b, 5, 4, 6), null);
  // 补到 6 连：判胜并返回整条线
  place(b, 6, 4, BLACK);
  const line = findWinningLine(b, 6, 4, 6);
  assert.ok(line);
  assert.equal(line.length, 6);
  assert.deepEqual(line[0], { x: 1, y: 4 });
  assert.deepEqual(line[5], { x: 6, y: 4 });
});

test('7 连珠判胜（13×13 变体）', () => {
  const b = createBoard(13);
  for (let y = 3; y <= 9; y += 1) place(b, 6, y, WHITE);
  const line = findWinningLine(b, 6, 9, 7);
  assert.ok(line);
  assert.equal(line.length, 7);
});

test('6 连珠下 4 连不判胜', () => {
  const b = createBoard(9);
  for (let y = 1; y <= 4; y += 1) place(b, 2, y, BLACK);
  assert.equal(findWinningLine(b, 2, 4, 6), null);
});

test('变体记谱往返：9×9 与 13×13', () => {
  // 9×9：列 A–I，行 1–9
  assert.deepEqual(fromNotation('A1', 9), { x: 0, y: 8 });
  assert.deepEqual(fromNotation('I9', 9), { x: 8, y: 0 });
  assert.equal(toNotation(0, 8, 9), 'A1');
  assert.equal(toNotation(8, 0, 9), 'I9');
  // 13×13：列 A–M，行 1–13
  assert.deepEqual(fromNotation('M1', 13), { x: 12, y: 12 });
  assert.equal(toNotation(12, 12, 13), 'M1');
  assert.equal(toNotation(4, 4, 13), 'E9');
});

test('变体记谱越界：超出当前尺寸返回 null', () => {
  assert.deepEqual(fromNotation('I9', 9), { x: 8, y: 0 }); // 合法
  assert.equal(fromNotation('O15', 9), null); // 列 O 超出 9×9
  assert.equal(fromNotation('A10', 9), null); // 行 10 超出 9×9
  assert.equal(fromNotation('M13', 9), null); // 13×13 记号放到 9×9 上非法
});
