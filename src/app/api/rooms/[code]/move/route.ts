import { fail, ok, readJson } from '@/lib/http';
import { playRoomMove } from '@/lib/rooms';
import { ensureUser } from '@/lib/session';

type Params = { params: Promise<{ code: string }> };

interface Body {
  x?: number;
  y?: number;
}

/** 落子。合法性、轮次、胜负全部服务端判定，客户端的话一句不信。 */
export async function POST(request: Request, context: Params) {
  const { code } = await context.params;
  const body = await readJson<Body>(request);
  if (!body || !Number.isInteger(body.x) || !Number.isInteger(body.y)) return fail('BAD_REQUEST');

  const user = await ensureUser();
  const result = await playRoomMove(code.toUpperCase(), user.id, body.x as number, body.y as number);
  if (!result.ok) return fail(result.error);
  return ok(result.view, { headers: { 'cache-control': 'no-store' } });
}
