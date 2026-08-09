'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * 首页"全球访问次数"胶囊 —— 只读展示全站累计访问数。
 * 计数由全局 PageViewTracker（根 layout）统一上报，这里不再 POST，避免首页双计。
 * 挂载后延迟读取，让首载上报先落库，显示的是含本次访问的最新值。
 */
export function VisitCounter() {
  const t = useTranslations('home');
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      fetch('/api/visit', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((data: { count?: number } | null) => {
          if (!cancelled && data && typeof data.count === 'number') {
            setCount(data.count);
          }
        })
        .catch(() => {
          /* 失败静默，不显示错误 */
        });
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const display = count === null ? '—' : count.toLocaleString();

  return (
    <span
      className="yb-visit-pill"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 999,
        background: 'var(--surface-3)',
        color: 'var(--text-2)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 2px var(--shadow)',
      }}
    >
      <GlobeIcon aria-hidden />
      {t('visitCount', { count: display })}
    </span>
  );
}

function GlobeIcon({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: 'var(--accent)', flexShrink: 0 }}
      aria-hidden={ariaHidden}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
