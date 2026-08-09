/**
 * 注册（邮箱密码账号）：POST /api/auth/register
 * 访客身份存在时升级访客（战绩/段位保留）；否则新建账号。
 * 成功后种 member JWT，前端跳 /profile。
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { GUEST_COOKIE, guestCookieOptions, signGuestToken } from '@/lib/auth';
import { fail, readJson } from '@/lib/http';
import { hashPassword, isValidEmail, isValidUsername } from '@/lib/password';
import { readUser } from '@/lib/session';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

interface RegisterBody {
  username?: string;
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  const body = await readJson<RegisterBody>(request);
  const username = body?.username?.trim().toLowerCase() ?? '';
  const email = body?.email?.trim().toLowerCase() ?? '';
  const password = body?.password ?? '';

  if (!isValidUsername(username)) return fail('BAD_REQUEST', 'INVALID_USERNAME');
  if (!isValidEmail(email)) return fail('BAD_REQUEST', 'INVALID_EMAIL');
  if (password.length < 8 || password.length > 72) return fail('BAD_REQUEST', 'WEAK_PASSWORD');

  const store = getStore();
  const existingEmail = await store.findUserByEmail(email);
  if (existingEmail) return fail('CONFLICT', 'EMAIL_TAKEN');
  const existingName = await store.findUserByUsername(username);
  if (existingName) return fail('CONFLICT', 'USERNAME_TAKEN');

  const passwordHash = await hashPassword(password);
  const visitor = await readUser();

  let userId: string;
  if (visitor) {
    const upgraded = await store.upgradeGuest({ userId: visitor.id, username, email, passwordHash, displayName: username });
    userId = upgraded.id;
  } else {
    const created = await store.createGuestUser({ id: crypto.randomUUID(), displayName: username, locale: 'en' });
    const upgraded = await store.upgradeGuest({ userId: created.id, username, email, passwordHash, displayName: username });
    userId = upgraded.id;
  }

  const token = await signGuestToken({ sub: userId, kind: 'member', name: username });
  const jar = await cookies();
  jar.set(GUEST_COOKIE, token, guestCookieOptions());

  return NextResponse.json({ ok: true, redirect: '/profile?registered=1' });
}
