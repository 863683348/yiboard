'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Vercel env 可用 NEXT_PUBLIC_GA_MEASUREMENT_ID 覆盖；默认站主提供的 GA4 ID。 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-X8TRL4YQ7R';

/**
 * GA4（Google Analytics 4）埋点：
 * - 仅生产环境加载，开发/预览不污染真实数据
 * - App Router 的 SPA 路由切换不会自动发 page_view → 用 pathname 监听手动补发
 * - gtag() 先入 dataLayer 队列，SDK 异步加载完成后自动消费，无竞态
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const inited = useRef(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    // 同一路径只发一次 page_view（防 StrictMode 双跑 / 重复触发）
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    if (!inited.current) {
      inited.current = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer!.push(args);
      };
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(s);
      window.gtag('js', new Date());
      // send_page_view: false → 页面浏览统一走下面的 event，避免双计
      window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
    }

    window.gtag?.('event', 'page_view', { page_path: pathname });
  }, [pathname]);

  return null;
}
