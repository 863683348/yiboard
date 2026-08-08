/** 发起 Google 登录：生成 state 存 cookie，302 跳 Google。 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { buildGoogleAuthUrl, googleCredentials } from '@/lib/google';

export const dynamic = 'force-dynamic';

const OAUTH_STATE_COOKIE = 'yb_oauth_state';

export async function GET(request: Request) {
  const creds = googleCredentials();
  if (!creds) {
    return NextResponse.json({ error: 'GOOGLE_NOT_CONFIGURED' }, { status: 503 });
  }

  const state = crypto.randomUUID();
  const jar = await cookies();
  jar.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600, // 10 分钟
  });

  const redirectUri = new URL('/api/auth/google/callback', request.url).toString();
  return NextResponse.redirect(buildGoogleAuthUrl(creds.clientId, redirectUri, state));
}
