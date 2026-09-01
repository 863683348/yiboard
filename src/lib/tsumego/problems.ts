/** 弈界 YiBoard — 围棋死活题数据集（复用 Go 棋盘与引擎类型） */

import type { GoBoard, GoColor, GoBoardSize } from '@/lib/engine/go';

export interface TsumegoMove {
  x: number;
  y: number;
  color: GoColor;
}

export interface TsumegoProblem {
  id: string;
  size: GoBoardSize;
  /** 轮到谁走（即解题方） */
  toMove: GoColor;
  title: { en: string; zh: string };
  goal: { en: string; zh: string };
  /** 每行一个字符串，长度 = size；字符：'.' 空、'b' 黑、'w' 白 */
  setup: string[];
  /** 首手正确着法的棋盘一维索引（可接受任一） */
  answers: number[];
  /** 完整正解着法（用于"揭示答案"演示） */
  solution: TsumegoMove[];
}

/** 由 setup 字符串构造 GoBoard */
export function boardFromSetup(setup: string[]): GoBoard {
  const size = setup.length;
  const board: GoBoard = new Array(size * size).fill(null);
  for (let y = 0; y < size; y++) {
    const row = setup[y] ?? '';
    for (let x = 0; x < size; x++) {
      const ch = row[x];
      if (ch === 'b') board[y * size + x] = 'black';
      else if (ch === 'w') board[y * size + x] = 'white';
    }
  }
  return board;
}

/**
 * 三道入门级死活题（均为 9×9，已手工校验气数）：
 * 1) 黑先 — 收气吃白（白仅一气，落此气即提）
 * 2) 黑先 — 提吃白单子（白仅一气）
 * 3) 白先 — 提吃黑单子（黑仅一气）
 */
export const TSUMEGO_PROBLEMS: TsumegoProblem[] = [
  {
    id: 'capture-group',
    size: 9,
    toMove: 'black',
    title: { en: 'Black to capture', zh: '黑先：提吃白棋' },
    goal: { en: 'The white group has only one liberty. Play it to capture.', zh: '白棋块只剩一口气，落在此处即可提吃。' },
    setup: [
      '.........',
      '.........',
      '.........',
      '....b....',
      '..bwwb...',
      '..bwwb...',
      '...bb....',
      '.........',
      '.........',
    ],
    answers: [30], // idx(3,3,9)
    solution: [{ x: 3, y: 3, color: 'black' }],
  },
  {
    id: 'capture-stone',
    size: 9,
    toMove: 'black',
    title: { en: 'Black to capture', zh: '黑先：提吃白子' },
    goal: { en: 'The white stone has only one liberty. Capture it.', zh: '白子只剩一口气，落在此处即可提吃。' },
    setup: [
      '.........',
      '.........',
      '.........',
      '.........',
      '...bwb...',
      '....b....',
      '.........',
      '.........',
      '.........',
    ],
    answers: [31], // idx(4,3,9): the white stone's only liberty
    solution: [{ x: 4, y: 3, color: 'black' }],
  },
  {
    id: 'white-capture',
    size: 9,
    toMove: 'white',
    title: { en: 'White to capture', zh: '白先：提吃黑子' },
    goal: { en: 'The black stone has only one liberty. Capture it.', zh: '黑子只剩一口气，落在此处即可提吃。' },
    setup: [
      '.........',
      '.........',
      '.........',
      '.........',
      '...wbw...',
      '....w....',
      '.........',
      '.........',
      '.........',
    ],
    answers: [31], // idx(4,3,9): the black stone's only liberty
    solution: [{ x: 4, y: 3, color: 'white' }],
  },
];
