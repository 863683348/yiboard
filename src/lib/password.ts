/**
 * 密码哈希 —— Node 内置 crypto.scrypt，零新增依赖。
 * 格式：scrypt$<salt-hex>$<derived-hex>（salt 16B / derived 64B，timing-safe 比较）。
 */

import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCb) as (pw: string, salt: string, len: number) => Promise<Buffer>;

const KEY_LEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derived = (await scrypt(password, salt, KEY_LEN)).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  const salt = parts[1];
  const expectedHex = parts[2];
  if (!salt || !expectedHex) return false;
  try {
    const derived = await scrypt(password, salt, KEY_LEN);
    const expected = Buffer.from(expectedHex, 'hex');
    return derived.length === expected.length && timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

/** 用户名规则：3-20 位字母/数字/下划线，字母开头 */
export function isValidUsername(username: string): boolean {
  return /^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(username);
}

/** 邮箱基本格式校验（服务端；完整校验靠发送验证信，P2） */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
