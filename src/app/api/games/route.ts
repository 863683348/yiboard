import { fail, ok, readJson } from '@/lib/http';
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
}

const RESULTS: readonly GameResult[] = ['black', 'white', 'draw'];

/** 人机对局回传战绩。ELO 不动（Spec §9 AC-07），只累计场次与胜场。 */
export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body || !body.result || !RESULTS.includes(body.result)) return fail('BAD_REQUEST');

  const user = await ensureUser();
  const playsBlack = body.playerColor !== 'white';

  const { game } = await getStore().recordGame({
    mode: 'ai',
    blackId: playsBlack ? user.id : null,
    whiteId: playsBlack ? null : user.id,
    difficulty: body.difficulty ?? null,
    result: body.result,
    moves: typeof body.moves === 'string' ? body.moves : '',
    durationMs: Number.isFinite(body.durationMs) ? Number(body.durationMs) : 0,
  });

  return ok({ id: game.id, moveCount: game.moveCount });
}
