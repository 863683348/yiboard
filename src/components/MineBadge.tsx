'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * 排行榜"我"徽章（客户端）。
 * 服务端 rankings 页面不再读 session（readUser 需要 cookie → 强制动态渲染），
 * 改为客户端轻量查询 /api/me 高亮当前用户，服务端输出保持 ISR 可缓存。
 */
export function MineBadge({ userId }: { userId: string }) {
  const t = useTranslations('rankings');
  const [mine, setMine] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && data?.user?.id === userId) setMine(true);
      })
      .catch(() => {
        /* 未登录 / 网络错误：不高亮即可 */
      });
    return () => {
      alive = false;
    };
  }, [userId]);

  if (!mine) return null;
  return (
    <span className="yb-chip yb-chip-accent" style={{ marginLeft: 8 }}>
      {t('you')}
    </span>
  );
}
