'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * 首页"全球访问次数"胶囊计数器。
 * 客户端入站时 POST /api/visit 原子 +1，真实累计不造假。
 */
export function VisitCounter() {
  const t = useTranslations('home');
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/visit', { method: 'POST', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { count?: number } | null) => {
        if (!cancelled && data && typeof data.count === 'number') {
          setCount(data.count);
        }
      })
      .catch(() => {
        /* 失败静默，不显示错误 */
      });
    return () => {
      cancelled = true;
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
