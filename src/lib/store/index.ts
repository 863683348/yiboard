/**
 * Store 工厂。
 * 无 DATABASE_URL → 内存实现（本地开发 / 预览）。
 * 有 DATABASE_URL → Neon + Drizzle 实现（生产持久化）。
 *
 * 注意：必须挂 globalThis——Next.js 16 Turbopack 会把 Server Components 与 Route Handlers
 * 编译成独立的模块图，模块级单例会各持一份实例，导致 RSC 页面永远读不到
 * API 写入的数据（rankings / profile / share 全空）。挂到全局对象后，单进程内
 * 所有调用方共享同一实例。Neon 模式存数据库天然无此问题，但保持统一入口。
 */

import { createNeonStore } from './neon';
import { memoryStore } from './memory';
import type { Store } from './types';

const GLOBAL_KEY = '__yiboard_store';

type GlobalWithStore = typeof globalThis & { [GLOBAL_KEY]?: Store };

export function getStore(): Store {
  const g = globalThis as GlobalWithStore;

  if (!g[GLOBAL_KEY]) {
    const url = process.env.DATABASE_URL;
    g[GLOBAL_KEY] = url ? createNeonStore(url) : memoryStore;
  }

  return g[GLOBAL_KEY]!;
}

export * from './types';
