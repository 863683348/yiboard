/** 登出：清掉登录 Cookie。 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { GUEST_COOKIE, guestCookieOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const jar = await cookies();
  jar.delete(GUEST_COOKIE);
  return NextResponse.json({ ok: true, redirect: '/' });
}

/** GET 也支持（表单/直接访问兜底） */
export async function GET(request: Request) {
  const jar = await cookies();
  jar.delete(GUEST_COOKIE);
  return NextResponse.redirect(new URL('/', request.url));
}
