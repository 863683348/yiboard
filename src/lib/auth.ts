/**
 * 弈界 YiBoard — 访客身份（ADR-009）
 *
 * 免注册即玩：首次访问签发匿名 JWT，180 天有效。
 * 绑定邮箱升级为正式账号时 user_id 保持不变，历史战绩与段位完整继承。
 */

import { SignJWT, jwtVerify } from 'jose';

export const GUEST_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-yb_guest' : 'yb_guest';
export const GUEST_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

const ISSUER = 'yiboard';
const AUDIENCE = 'yiboard-web';

export interface GuestClaims {
  /** 稳定用户 ID —— 升级为正式账号后不变 */
  sub: string;
  /** guest = 匿名，member = 已绑定邮箱 */
  kind: 'guest' | 'member';
  /** 展示名，如 "Guest 4F2A" */
  name: string;
}

function secretKey(): Uint8Array {
  const raw = process.env.YB_AUTH_SECRET;
  if (!raw) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('YB_AUTH_SECRET is required in production');
    }
    // 仅本地开发回退，保证 clone 下来就能跑
    return new TextEncoder().encode('yiboard-local-development-secret-key-32b');
  }
  if (raw.length < 32) throw new Error('YB_AUTH_SECRET must be at least 32 characters');
  return new TextEncoder().encode(raw);
}

export async function signGuestToken(claims: GuestClaims): Promise<string> {
  return new SignJWT({ kind: claims.kind, name: claims.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(claims.sub)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${GUEST_MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifyGuestToken(token: string): Promise<GuestClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    if (typeof payload.sub !== 'string') return null;
    return {
      sub: payload.sub,
      kind: payload.kind === 'member' ? 'member' : 'guest',
      name: typeof payload.name === 'string' ? payload.name : 'Guest',
    };
  } catch {
    return null;
  }
}

/** 生成访客 ID 与展示名。名字取 ID 后四位十六进制，短、可读、无歧义。 */
export function newGuestIdentity(): GuestClaims {
  const sub = crypto.randomUUID();
  const tail = sub.replace(/-/g, '').slice(-4).toUpperCase();
  return { sub, kind: 'guest', name: `Guest ${tail}` };
}

export function guestCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: GUEST_MAX_AGE_SECONDS,
  };
}

/** 房间邀请码：6 位大写字母数字，剔除易混字符 O/0/I/1。 */
const ROOM_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function newRoomCode(length = 6): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = '';
  for (const byte of bytes) {
    out += ROOM_ALPHABET[byte % ROOM_ALPHABET.length];
  }
  return out;
}
