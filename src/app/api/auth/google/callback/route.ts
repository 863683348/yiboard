/** Google OAuth 回调：验 state → 换 token → 取 profile → 登录/升级 → 发 member JWT。 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { GUEST_COOKIE, guestCookieOptions, signGuestToken } from '@/lib/auth';
import { exchangeGoogleCode, fetchGoogleProfile, googleCredentials, hasVerifiedEmail } from '@/lib/google';
import { readUser } from '@/lib/session';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

const OAUTH_STATE_COOKIE = 'yb_oauth_state';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const jar = await cookies();
  const expected = jar.get(OAUTH_STATE_COOKIE)?.value;
  jar.delete(OAUTH_STATE_COOKIE);

  const fail = () => NextResponse.redirect(new URL('/profile?google=error', url.origin));
  if (!code || !state || !expected || state !== expected) return fail();

  const creds = googleCredentials();
  if (!creds) return fail();

  try {
    const redirectUri = new URL('/api/auth/google/callback', url.origin).toString();
    const { access_token: accessToken } = await exchangeGoogleCode(code, creds, redirectUri);
    const profile = await fetchGoogleProfile(accessToken);
    // 只接受 Google 已验证的邮箱，防未验证邮箱占用本站账号
    if (!hasVerifiedEmail(profile)) return fail();
    const email = profile.email!.toLowerCase().trim();

    const store = getStore();
    const existing = await store.findUserByEmail(email);
    // 当前浏览器的访客身份（可能没有——直接点登录链接的场景）
    const visitor = await readUser();

    let userId: string;
    let displayName: string | undefined;

    if (existing) {
      // 已有账号（之前绑过邮箱或 Google 登录过）→ 直接登录
      userId = existing.id;
      displayName = existing.displayName;
    } else if (visitor) {
      // 访客 + Google 账号 → 升级访客，战绩/段位原样保留
      const upgraded = await store.upgradeGuest({
        userId: visitor.id,
        email,
        passwordHash: null,
        displayName: profile.name ?? undefined,
      });
      userId = upgraded.id;
      displayName = upgraded.displayName;
    } else {
      // 全新用户：建访客再升级（走同一路径，保证 email/isGuest 一致）
      const created = await store.createGuestUser({
        id: crypto.randomUUID(),
        displayName: profile.name ?? 'YiBoard player',
        locale: 'en',
      });
      const upgraded = await store.upgradeGuest({
        userId: created.id,
        email,
        passwordHash: null,
        displayName: profile.name ?? undefined,
      });
      userId = upgraded.id;
      displayName = upgraded.displayName;
    }

    const token = await signGuestToken({ sub: userId, kind: 'member', name: displayName ?? 'Player' });
    jar.set(GUEST_COOKIE, token, guestCookieOptions());
    return NextResponse.redirect(new URL('/profile?google=ok', url.origin));
  } catch {
    return fail();
  }
}
