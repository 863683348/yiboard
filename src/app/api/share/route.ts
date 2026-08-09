import { fail, ok, readJson } from '@/lib/http';
import { rankFromElo } from '@/lib/rank';
import { ensureUser } from '@/lib/session';
import { getStore } from '@/lib/store';
import type { GameResult } from '@/lib/store/types';

interface Body {
  result?: GameResult;
  moves?: string;
  difficulty?: string | null;
  playerColor?: 'black' | 'white' | null;
  locale?: string;
}

const RESULTS: readonly GameResult[] = ['black', 'white', 'draw'];

/** 15×15 满盘最多 225 手；300 给足余量，超过即视为伪造棋谱。 */
const MAX_MOVES = 300;
/** 单条棋谱串上限（"H8," 最短 3 字符 × 300 + 分隔符余量）。 */
const MAX_MOVES_CHARS = MAX_MOVES * 4;
/** 整包 payload 上限（含 moves / 玩家名 / 段位等），防 jsonb 膨胀。 */
const MAX_PAYLOAD_BYTES = 16 * 1024;

export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body || !body.result || !RESULTS.includes(body.result)) return fail('BAD_REQUEST');

  const user = await ensureUser(body.locale ?? 'zh');
  const moves = typeof body.moves === 'string' ? body.moves : '';
  const moveCount = moves ? moves.split(',').filter(Boolean).length : 0;
  // 手数 / 棋谱串长度 / 整包大小三重上限，防超大 payload 撑爆 jsonb
  if (moveCount > MAX_MOVES || moves.length > MAX_MOVES_CHARS) return fail('BAD_REQUEST', 'MOVES_TOO_LONG');
  if (new TextEncoder().encode(JSON.stringify(body)).length > MAX_PAYLOAD_BYTES) {
    return fail('BAD_REQUEST', 'PAYLOAD_TOO_LARGE');
  }

  const card = await getStore().createShareCard({
    gameId: null,
    ownerId: user.id,
    locale: body.locale ?? user.locale,
    payload: {
      result: body.result,
      playerColor: body.playerColor ?? null,
      playerName: user.displayName,
      rankName: rankFromElo(user.elo).name,
      moveCount,
      moves,
      difficulty: body.difficulty ?? null,
    },
  });

  return ok({ id: card.id, url: `/share/${card.id}` });
}
