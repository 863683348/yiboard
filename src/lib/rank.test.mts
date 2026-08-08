/**
 * 段位系统核心逻辑测试（ADR-012 十八级双轨）。
 * 纯函数，零依赖，node --test 直跑。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  BASE_ELO,
  RANKS,
  STARTING_ELO,
  progressToNext,
  rankFromElo,
  updateElo,
} from './rank.ts';

test('新手起点 1200 落在六品（index 3）', () => {
  const rank = rankFromElo(STARTING_ELO);
  assert.equal(rank.index, 3);
  assert.equal(rank.name, 'Sixth Grade');
  assert.equal(rank.zh, '六品');
});

test('ELO 边界精确落在正确段位', () => {
  assert.equal(rankFromElo(BASE_ELO).index, 0); // 900 = 九品
  assert.equal(rankFromElo(BASE_ELO + 17 * 100).index, 17); // 2600 = 九段
  assert.equal(rankFromElo(0).index, 0); // 低于下限不越界
  assert.equal(rankFromElo(99999).index, 17); // 高于上限不越界
});

test('九品到九段共 18 级，段位区 index 9-17', () => {
  assert.equal(RANKS.length, 18);
  assert.equal(RANKS[9]!.name, 'First Dan');
  assert.equal(RANKS[17]!.name, 'Ninth Dan');
});

test('progressToNext：1200 距五品（index 4）差 100 分', () => {
  const p = progressToNext(STARTING_ELO);
  assert.ok(p);
  assert.equal(p.next.index, 4);
  assert.equal(p.remaining, 100);
});

test('九段没有下一级', () => {
  assert.equal(progressToNext(RANKS[17]!.floor), null);
});

test('updateElo：同分互搏，胜方 +K/2，负方 -K/2（K=40 区间）', () => {
  const winner = updateElo(1200, 1200, 'win');
  const loser = updateElo(1200, 1200, 'loss');
  assert.equal(winner, 1220);
  assert.equal(loser, 1180);
});

test('updateElo 下限保护：不会跌穿九品底', () => {
  assert.equal(updateElo(BASE_ELO, 99999, 'loss'), BASE_ELO);
});
