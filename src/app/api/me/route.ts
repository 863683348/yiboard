/** 轻量用户态接口：供 Navbar 客户端自取（登录名 / 登录态）。
 * 目的：让 layout 不再服务端读 cookie → 页面可被 CDN 静态缓存，大幅降低 Fast Origin Transfer。
 * 仅返回展示所需字段，最小化回源响应体积。 */
import { ok } from '@/lib/http';
import { readUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await readUser();
  return ok({
    user: user ? { displayName: user.displayName, username: user.username } : null,
  });
}
