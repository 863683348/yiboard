'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 全局页面浏览上报：挂在根 layout，所有页面（含 SPA 路由切换）都会触发。
 * pathname 变化 → POST /api/visit 原子 +1，让"全球访问次数"累计全站所有页面。
 * 只负责计数，不负责显示（显示由 VisitCounter 只读展示）。
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const reported = useRef<string | null>(null);

  useEffect(() => {
    // 首载 + 每次路由切换各上报一次；同一 pathname 只报一次（防 StrictMode/重复触发）
    if (reported.current === pathname) return;
    reported.current = pathname;
    fetch('/api/visit', { method: 'POST', cache: 'no-store' }).catch(() => {
      /* 失败静默，不影响浏览 */
    });
  }, [pathname]);

  return null;
}
