/**
 * 退出匹配队列的 beacon 端点。
 * navigator.sendBeacon 只能发 POST，没法用主路由的 DELETE，所以单开一个。
 * 关标签/切页时调用，避免队列里留下幽灵条目让别人白等。
 */

import { ok } from '@/lib/http';
import { readUser } from '@/lib/session';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST() {
  const user = await readUser();
  if (user) await getStore().leaveMatchQueue(user.id);
  return ok({ status: 'idle' as const });
}
