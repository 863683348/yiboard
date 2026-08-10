'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const VISIT_SEEN_KEY = 'yb-visit-seen';

/**
 * 全局页面浏览上报：挂在根 layout，所有页面（含 SPA 路由切换）都会触发。
 * pathname 变化 → POST /api/visit +1，让"全球访问次数"累计全站所有页面。
 *
 * 节流（降低 Fast Origin Transfer / Serverless 调用）：
 * - 同一会话内同一路径只上报一次（sessionStorage 记忆）→ 刷新页面不重复计数
 * - 跨路径（SPA 导航）仍分别上报，保留"每页访问"语义
 * 只负责计数，不负责显示（显示由 VisitCounter 只读展示）。
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let seen: string[] = [];
    try {
      seen = JSON.parse(sessionStorage.getItem(VISIT_SEEN_KEY) ?? '[]');
    } catch {
      /* 忽略解析失败，视为空 */
    }
    if (seen.includes(pathname)) return;
    seen.push(pathname);
    try {
      sessionStorage.setItem(VISIT_SEEN_KEY, JSON.stringify(seen));
    } catch {
      /* 隐私模式等场景忽略 */
    }
    fetch('/api/visit', { method: 'POST', cache: 'no-store' }).catch(() => {
      /* 失败静默，不影响浏览 */
    });
  }, [pathname]);

  return null;
}
