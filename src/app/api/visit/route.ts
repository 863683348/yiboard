/** 全站访问次数计数器：POST 原子 +1（全局页面浏览上报）；GET 只读当前累计（胶囊展示）。 */
import { ok } from '@/lib/http';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST() {
  const store = getStore();
  const count = await store.incrementVisit().catch(() => 0);
  return ok({ count });
}

export async function GET() {
  const store = getStore();
  const count = await store.getVisitCount().catch(() => 0);
  return ok({ count });
}
