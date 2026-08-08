/**
 * 随机匹配 —— 不需要分享链接的人人对战。
 * POST   入队（若已有人在等，当场配对并返回房间号）
 * GET    轮询状态（同时给自己的队列条目续心跳）
 * DELETE 退出队列
 */

import { ok } from '@/lib/http';
import { ensureUser } from '@/lib/session';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST() {
  const user = await ensureUser();
  const state = await getStore().joinMatchQueue({
    userId: user.id,
    elo: user.elo,
    locale: user.locale,
  });
  return ok(state);
}

export async function GET() {
  const user = await ensureUser();
  const state = await getStore().pollMatchQueue(user.id);
  return ok(state);
}

export async function DELETE() {
  const user = await ensureUser();
  await getStore().leaveMatchQueue(user.id);
  return ok({ status: 'idle' as const, waitingCount: await getStore().countMatchQueue() });
}
