/**
 * 服务端会话读取 —— 路由与 RSC 共用。
 *
 * ensureUser() 在没有有效 cookie 时当场签发一个访客身份并写回。
 * 只在 Route Handler / Server Action 里调用它（RSC 不允许写 cookie）；
 * 页面里请用 readUser()，读不到就当没登录，别在渲染阶段偷偷种 cookie。
 */

import { cookies } from 'next/headers';

import {
  GUEST_COOKIE,
  guestCookieOptions,
  newGuestIdentity,
  signGuestToken,
  verifyGuestToken,
} from './auth';
import { getStore } from './store';
import type { UserRecord } from './store/types';

export async function readUser(): Promise<UserRecord | null> {
  const jar = await cookies();
  const token = jar.get(GUEST_COOKIE)?.value;
  if (!token) return null;

  const claims = await verifyGuestToken(token);
  if (!claims) return null;

  return getStore().getUser(claims.sub);
}

export async function ensureUser(locale = 'zh'): Promise<UserRecord> {
  const jar = await cookies();
  const store = getStore();
  const token = jar.get(GUEST_COOKIE)?.value;

  if (token) {
    const claims = await verifyGuestToken(token);
    if (claims) {
      const existing = await store.getUser(claims.sub);
      if (existing) return existing;
      // token 有效但库里没人（内存实现重启过）—— 按同一个 ID 重建，段位从头开始
      return store.createGuestUser({ id: claims.sub, displayName: claims.name, locale });
    }
  }

  const identity = newGuestIdentity();
  const user = await store.createGuestUser({
    id: identity.sub,
    displayName: identity.name,
    locale,
  });
  jar.set(GUEST_COOKIE, await signGuestToken(identity), guestCookieOptions());
  return user;
}
