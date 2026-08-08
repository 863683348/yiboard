/** 临时诊断端点：只暴露 DATABASE_URL 前缀，不暴露密码。部署后访问 /api/_diag 确认 env 注入。 */
import { ok } from '@/lib/http';

export async function GET() {
  const url = process.env.DATABASE_URL ?? '';
  return ok({
    hasDatabaseUrl: url.length > 0,
    prefix: url ? url.slice(0, 25) + '...' : null,
    nodeEnv: process.env.NODE_ENV ?? null,
    storeKind: url ? 'neon (drizzle)' : 'memory (globalThis)',
  });
}