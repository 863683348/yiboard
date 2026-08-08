import { fail, ok } from '@/lib/http';
import { enterRoom } from '@/lib/rooms';
import { ensureUser } from '@/lib/session';

type Params = { params: Promise<{ code: string }> };

/**
 * 拉房间状态。第一次 GET 顺手把请求者接进空位——
 * 好友点开邀请链接就直接在局里，不需要再点一次"加入"。
 */
export async function GET(_request: Request, context: Params) {
  const { code } = await context.params;
  const user = await ensureUser();

  const result = await enterRoom(code.toUpperCase(), user.id);
  if (!result.ok) return fail(result.error);
  return ok(result.view, { headers: { 'cache-control': 'no-store' } });
}
