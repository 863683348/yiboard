/**
 * 密码哈希 —— Node 内置 crypto.scrypt，零新增依赖。
 *
 * 格式（v2，显式成本参数）：scrypt$<N>$<r>$<p>$<salt-hex>$<derived-hex>
 * 兼容旧格式（v1，无成本参数）：scrypt$<salt-hex>$<derived-hex>（N=16384, r=8, p=1）
 * 旧哈希在用户下次登录成功时按 verify 通过处理，无需迁移；新注册/改密一律落 v2。
 * salt 16B / derived 64B，timing-safe 比较。
 */

import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

/**
 * 推荐成本：N=2^16, r=8, p=1（内存 128×N×r = 64MB）。
 * 比 Node 默认（N=2^14）强 4 倍；128MB 对 Vercel serverless 单次登录可接受。
 * 显式 maxmem 必须大于实际内存需求，否则 Node 报 memory limit exceeded。
 */
const COST_N = 2 ** 16;
const COST_R = 8;
const COST_P = 1;
const MAX_MEM = 128 * 1024 * 1024; // 128MB
/** v1 旧格式的隐式成本（Node scrypt 默认值 N=2^14）。 */
const LEGACY_N = 16384;

const KEY_LEN = 64;

type ScryptOptions = { N: number; r: number; p: number; maxmem: number };

const scrypt = promisify(scryptCb) as (
  pw: string,
  salt: string,
  len: number,
  opts: ScryptOptions,
) => Promise<Buffer>;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derived = await scrypt(password, salt, KEY_LEN, { N: COST_N, r: COST_R, p: COST_P, maxmem: MAX_MEM });
  return `scrypt$${COST_N}$${COST_R}$${COST_P}$${salt}$${derived.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length === 6 && parts[0] === 'scrypt') {
    // v2：scrypt$N$r$p$salt$hash —— 解析参数后按各自成本验签
    const N = Number(parts[1]);
    const r = Number(parts[2]);
    const p = Number(parts[3]);
    const salt = parts[4];
    const expectedHex = parts[5];
    if (!Number.isInteger(N) || !Number.isInteger(r) || !Number.isInteger(p) || N <= 0 || r <= 0 || p <= 0) return false;
    return verifyWith(password, salt!, expectedHex!, { N, r, p, maxmem: MAX_MEM });
  }
  if (parts.length === 3 && parts[0] === 'scrypt') {
    // v1 旧格式：scrypt$salt$hash —— 用默认成本，老用户登录不失效
    return verifyWith(password, parts[1]!, parts[2]!, { N: LEGACY_N, r: 8, p: 1, maxmem: MAX_MEM });
  }
  return false;
}

async function verifyWith(password: string, salt: string, expectedHex: string, opts: ScryptOptions): Promise<boolean> {
  if (!salt || !expectedHex) return false;
  try {
    const derived = await scrypt(password, salt, KEY_LEN, opts);
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
