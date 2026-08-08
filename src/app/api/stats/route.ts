/** 首页"全球玩家"统计：GET /api/stats */
import { ok } from '@/lib/http';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';
/** Edge 缓存 30 秒，避免每个访客都查 DB */
export const revalidate = 30;

export async function GET() {
  const store = getStore();
  const [stats, waitingPlayers] = await Promise.all([
    store.getStats(),
    // 队列数拿不到不影响主统计——热度提示降级为 0，不让首页整块挂掉
    store.countMatchQueue().catch(() => 0),
  ]);
  return ok({ ...stats, waitingPlayers });
}