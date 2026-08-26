import { fail, ok, readJson } from '@/lib/http';
import { getStore } from '@/lib/store';
import type { GameResult } from '@/lib/store/types';

interface Body {
  result?: GameResult;
  moves?: string;
  blackDifficulty?: string | null;
  whiteDifficulty?: string | null;
  locale?: string;
  size?: number;
  winCount?: number;
}

const RESULTS: readonly GameResult[] = ['black', 'white', 'draw'];
const SIZES = [9, 13, 15] as const;
const WIN_COUNTS = [5, 6, 7] as const;

/** 15×15 满盘最多 225 手；300 给足余量，超过即视为伪造棋谱。 */
const MAX_MOVES = 300;
const MAX_MOVES_CHARS = MAX_MOVES * 4;
const MAX_PAYLOAD_BYTES = 16 * 1024;

/**
 * AI vs AI 对局自动持久化为"回放卡"，供 /replays/[id] 渲染 + sitemap 索引。
 * 与用户分享共用同一张 shareCards 表（复用 ShareReplay 渲染），用 payload.kind='replay' 区分。
 * 校验上限与 /api/share 完全一致，防伪造 / 超大 payload。
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

  const moves = typeof body.moves === 'string' ? body.moves : '';
  const moveCount = moves ? moves.split(',').filter(Boolean).length : 0;
  if (moveCount > MAX_MOVES || moves.length > MAX_MOVES_CHARS) return fail('BAD_REQUEST', 'MOVES_TOO_LONG');
  if (new TextEncoder().encode(JSON.stringify(body)).length > MAX_PAYLOAD_BYTES) {
    return fail('BAD_REQUEST', 'PAYLOAD_TOO_LARGE');
  }

  const blackDifficulty = body.blackDifficulty ?? null;
  const whiteDifficulty = body.whiteDifficulty ?? null;

  const card = await getStore().createShareCard({
    gameId: null,
    ownerId: null,
    locale: body.locale ?? 'en',
    payload: {
      result: body.result,
      playerColor: null,
      playerName: 'AI',
      rankName: 'AI vs AI',
      moveCount,
      moves,
      difficulty:
        blackDifficulty && whiteDifficulty ? `${blackDifficulty} vs ${whiteDifficulty}` : null,
      size,
      winCount,
      kind: 'replay',
      blackDifficulty,
      whiteDifficulty,
    },
  });

  return ok({ id: card.id, url: `/replays/${card.id}` });
}
