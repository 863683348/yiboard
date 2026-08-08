/** 首页"全球玩家"统计：GET /api/stats */
import { ok } from '@/lib/http';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';
/** Edge 缓存 30 秒，避免每个访客都查 DB */
export const revalidate = 30;

export async function GET() {
  const stats = await getStore().getStats();
  return ok(stats);
}