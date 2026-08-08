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

export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body || !body.result || !RESULTS.includes(body.result)) return fail('BAD_REQUEST');

  const user = await ensureUser(body.locale ?? 'en');
  const moves = typeof body.moves === 'string' ? body.moves : '';

  const card = await getStore().createShareCard({
    gameId: null,
    ownerId: user.id,
    locale: body.locale ?? user.locale,
    payload: {
      result: body.result,
      playerColor: body.playerColor ?? null,
      playerName: user.displayName,
      rankName: rankFromElo(user.elo).name,
      moveCount: moves ? moves.split(',').filter(Boolean).length : 0,
      moves,
      difficulty: body.difficulty ?? null,
    },
  });

  return ok({ id: card.id, url: `/share/${card.id}` });
}
