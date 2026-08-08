/** 首页"全球访问次数"计数器：POST /api/visit */
import { ok } from '@/lib/http';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST() {
  const store = getStore();
  const count = await store.incrementVisit().catch(() => 0);
  return ok({ count });
}
