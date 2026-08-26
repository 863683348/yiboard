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
  size?: number;
  winCount?: number;
}

const RESULTS: readonly GameResult[] = ['black', 'white', 'draw'];
const SIZES = [9, 13, 15] as const;
const WIN_COUNTS = [5, 6, 7] as const;

/** 15×15 满盘最多 225 手；300 给足余量，超过即视为伪造棋谱。 */
const MAX_MOVES = 300;
/** 单条棋谱串上限（"H8," 最短 3 字符 × 300 + 分隔符余量）。 */
const MAX_MOVES_CHARS = MAX_MOVES * 4;
/** 整包 payload 上限（含 moves / 玩家名 / 段位等），防 jsonb 膨胀。 */
const MAX_PAYLOAD_BYTES = 16 * 1024;

export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body || !body.result || !RESULTS.includes(body.result)) return fail('BAD_REQUEST');

  // 变体配置（可选，缺省 15×15/五连）；非法或连珠>尺寸即拒
  const size = body.size ?? 15;
  const winCount = body.winCount ?? 5;
  if (!(SIZES as readonly number[]).includes(size)) return fail('BAD_REQUEST', 'INVALID_SIZE');
  if (!(WIN_COUNTS as readonly number[]).includes(winCount)) {
    return fail('BAD_REQUEST', 'INVALID_WIN_COUNT');
  }
  if (winCount > size) return fail('BAD_REQUEST', 'INVALID_VARIANT');

  const user = await ensureUser(body.locale ?? 'en');
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
      size,
      winCount,
    },
  });

  return ok({ id: card.id, url: `/share/${card.id}` });
}
