/**
 * 登录（用户名或邮箱 + 密码）：POST /api/auth/login
 * 校验成功后种 member JWT。访客在登录后其身份被登录账号取代（战绩归账号）。
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { GUEST_COOKIE, guestCookieOptions, signGuestToken } from '@/lib/auth';
import { fail, readJson } from '@/lib/http';
import { verifyPassword } from '@/lib/password';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

interface LoginBody {
  /** 用户名或邮箱 */
  identifier?: string;
  password?: string;
}

export async function POST(request: Request) {
  const body = await readJson<LoginBody>(request);
  const identifier = body?.identifier?.trim().toLowerCase() ?? '';
  const password = body?.password ?? '';
  if (!identifier || !password) return fail('BAD_REQUEST');

  const store = getStore();
  const user =
    (await store.findUserByEmail(identifier)) ??
    (await store.findUserByUsername(identifier));

  // 用户不存在 / 无密码（Google 账号）→ 统一报错，不泄露账号是否存在
  const passwordHash = user ? await store.getPasswordHash(user.id) : null;
  if (!user || !passwordHash || !(await verifyPassword(password, passwordHash))) {
    return fail('UNAUTHORIZED', 'INVALID_CREDENTIALS');
  }

  const token = await signGuestToken({ sub: user.id, kind: 'member', name: user.displayName });
  const jar = await cookies();
  jar.set(GUEST_COOKIE, token, guestCookieOptions());

  return NextResponse.json({ ok: true, redirect: '/profile' });
}
