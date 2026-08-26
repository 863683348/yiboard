import { fail, ok, readJson } from '@/lib/http';
import { BLACK, fromNotation } from '@/lib/engine/board';
import { replay } from '@/lib/engine/game';
import { ensureUser } from '@/lib/session';
import { getStore } from '@/lib/store';
import type { GameResult } from '@/lib/store/types';

interface Body {
  mode?: string;
  difficulty?: string | null;
  playerColor?: 'black' | 'white';
  result?: GameResult;
  moves?: string;
  durationMs?: number;
  size?: number;
  winCount?: number;
}

const RESULTS: readonly GameResult[] = ['black', 'white', 'draw'];
const SIZES = [9, 13, 15] as const;
const WIN_COUNTS = [5, 6, 7] as const;
/** 15×15 满盘最多 225 手；300 给足余量，超过即视为伪造棋谱。 */
const MAX_MOVES = 300;

/**
 * 人机对局回传战绩。ELO 不动（Spec §9 AC-07），只累计场次与胜场。
 *
 * 服务端权威校验（安全加固）：客户端自报 result 不做数——
 * 用引擎重放收到的棋谱（按变体配置 size/winCount），终局胜负/和棋必须与上报 result 一致，否则拒收。
 */
export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body || !body.result || !RESULTS.includes(body.result)) return fail('BAD_REQUEST');

  const size = body.size ?? 15;
  const winCount = body.winCount ?? 5;
  if (!(SIZES as readonly number[]).includes(size)) return fail('BAD_REQUEST', 'INVALID_SIZE');
  if (!(WIN_COUNTS as readonly number[]).includes(winCount)) {
    return fail('BAD_REQUEST', 'INVALID_WIN_COUNT');
  }
  if (winCount > size) return fail('BAD_REQUEST', 'INVALID_VARIANT');

  const movesRaw = typeof body.moves === 'string' ? body.moves : '';
  // 解析棋谱：格式如 "H8,I9,G7"（按变体尺寸解析），任一非法落点即拒
  const points = movesRaw
    ? movesRaw.split(',').map((n) => fromNotation(n, size))
    : [];
  if (points.length > MAX_MOVES || points.some((p) => p === null)) {
    return fail('BAD_REQUEST', 'INVALID_MOVES');
  }

  // 服务端重放判定真实终局（棋谱从黑方先手开始，与人机对局一致）
  const finalState = replay(
    points as NonNullable<(typeof points)[number]>[],
    BLACK,
    size,
    winCount,
  );
  // 未分胜负的棋谱一律拒收（防"未结束棋谱报任意胜负"刷战绩）
  if (finalState.status === 'playing') return fail('BAD_REQUEST', 'GAME_NOT_FINISHED');
  const actualResult: GameResult =
    finalState.status === 'draw' ? 'draw' : finalState.winner === BLACK ? 'black' : 'white';
  if (actualResult !== body.result) return fail('BAD_REQUEST', 'RESULT_MISMATCH');

  const user = await ensureUser();
  const playsBlack = body.playerColor !== 'white';

  const { game } = await getStore().recordGame({
    mode: 'ai',
    blackId: playsBlack ? user.id : null,
    whiteId: playsBlack ? null : user.id,
    difficulty: body.difficulty ?? null,
    result: body.result,
    moves: movesRaw,
    durationMs: Number.isFinite(body.durationMs) ? Number(body.durationMs) : 0,
  });

  return ok({ id: game.id, moveCount: game.moveCount });
}
