/**
 * 弈界 YiBoard — 段位系统（ADR-012）
 *
 * 十八级双轨阶梯：九品 → 一品 → 初段 → 九段。
 * 与 ELO 等距映射，每级 100 分；1200 分 = 六品（新手起点）。
 * 对外文案全部用英文段位名，中文名仅在 zh 语境下作为副标题。
 */

export type RankTier = 'entry' | 'mid' | 'high' | 'dan';

export interface Rank {
  /** 0 = 九品，17 = 九段 */
  index: number;
  /** 英文正式名，展示主用 */
  name: string;
  /** 简写，用于徽章内 */
  short: string;
  /** 中文名，zh 语境副标题 */
  zh: string;
  tier: RankTier;
  /** 该级最低 ELO（index 0 视为下不封底） */
  floor: number;
  /** 该级最高 ELO（index 17 视为上不封顶） */
  ceiling: number;
}

const ORDINALS = [
  'Ninth',
  'Eighth',
  'Seventh',
  'Sixth',
  'Fifth',
  'Fourth',
  'Third',
  'Second',
  'First',
] as const;

const ZH_GRADE = ['九品', '八品', '七品', '六品', '五品', '四品', '三品', '二品', '一品'] as const;
const ZH_DAN = ['初段', '二段', '三段', '四段', '五段', '六段', '七段', '八段', '九段'] as const;

export const RANK_COUNT = 18;
export const BAND = 100;
/** index 0 的下沿；1200 落在 index 3（六品） */
export const BASE_ELO = 900;
export const STARTING_ELO = 1200;

function tierOf(index: number): RankTier {
  if (index >= 9) return 'dan';
  if (index >= 6) return 'high';
  if (index >= 3) return 'mid';
  return 'entry';
}

export const RANKS: readonly Rank[] = Array.from({ length: RANK_COUNT }, (_, index) => {
  const isDan = index >= 9;
  const slot = isDan ? index - 9 : index;
  const ordinal = isDan ? ORDINALS[8 - slot]! : ORDINALS[slot]!;

  return {
    index,
    name: isDan ? `${ordinal} Dan` : `${ordinal} Grade`,
    short: isDan ? `${slot + 1}D` : `${9 - slot}G`,
    zh: isDan ? ZH_DAN[slot]! : ZH_GRADE[slot]!,
    tier: tierOf(index),
    floor: BASE_ELO + index * BAND,
    ceiling: BASE_ELO + (index + 1) * BAND - 1,
  } satisfies Rank;
});

export function rankFromElo(elo: number): Rank {
  const raw = Math.floor((elo - BASE_ELO) / BAND);
  const index = Math.min(RANK_COUNT - 1, Math.max(0, raw));
  return RANKS[index]!;
}

/** 距离下一级还差多少分；已是九段返回 null。 */
export function progressToNext(elo: number): { next: Rank; remaining: number; ratio: number } | null {
  const current = rankFromElo(elo);
  if (current.index === RANK_COUNT - 1) return null;
  const next = RANKS[current.index + 1]!;
  const clamped = Math.max(elo, current.floor);
  const remaining = Math.max(0, next.floor - clamped);
  return { next, remaining, ratio: Math.min(1, (clamped - current.floor) / BAND) };
}

export type Outcome = 'win' | 'loss' | 'draw';

/** K 因子随段位收敛：新手波动大，高段稳定。 */
export function kFactor(elo: number): number {
  if (elo < 1400) return 40;
  if (elo < 1900) return 28;
  return 18;
}

export function expectedScore(selfElo: number, foeElo: number): number {
  return 1 / (1 + 10 ** ((foeElo - selfElo) / 400));
}

export function updateElo(selfElo: number, foeElo: number, outcome: Outcome): number {
  const actual = outcome === 'win' ? 1 : outcome === 'draw' ? 0.5 : 0;
  const next = selfElo + kFactor(selfElo) * (actual - expectedScore(selfElo, foeElo));
  return Math.max(BASE_ELO, Math.round(next));
}

/** 徽章配色令牌名（不返回裸 hex —— 组件里一律走 CSS 变量）。 */
export function rankColorVar(tier: RankTier): string {
  switch (tier) {
    case 'dan':
      return 'var(--rank-dan)';
    case 'high':
      return 'var(--rank-grade-high)';
    case 'mid':
      return 'var(--rank-grade-mid)';
    default:
      return 'var(--rank-grade-entry)';
  }
}
