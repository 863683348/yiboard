'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';

type MatchState =
  | { status: 'idle'; waitingCount: number }
  | { status: 'waiting'; waitingCount: number; since: string }
  | { status: 'matched'; waitingCount: number; code: string };

const POLL_MS = 2000;

/** 秒 -> 0:07 / 1:23 */
function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function MatchMaker() {
  const t = useTranslations('play');
  const router = useRouter();

  const [state, setState] = useState<MatchState>({ status: 'idle', waitingCount: 0 });
  const [busy, setBusy] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState(false);
  const searching = state.status === 'waiting';
  const leftRef = useRef(false);

  /** 进房：匹配成功后跳到好友对局页，房间已经在服务端开好 */
  const enterRoom = useCallback(
    (code: string) => {
      leftRef.current = true; // 已经进房了，卸载时不要再发退出队列
      router.push(`/play?mode=friend&room=${code}`);
    },
    [router],
  );

  async function start() {
    if (busy) return;
    setBusy(true);
    setError(false);
    leftRef.current = false;
    try {
      const res = await fetch('/api/match', { method: 'POST' });
      if (!res.ok) throw new Error('join failed');
      const next = (await res.json()) as MatchState;
      setElapsed(0);
      setState(next);
      if (next.status === 'matched') enterRoom(next.code);
    } catch {
      setError(true);
      setState({ status: 'idle', waitingCount: 0 });
    } finally {
      setBusy(false);
    }
  }

  async function cancel() {
    if (busy) return;
    setBusy(true);
    leftRef.current = true;
    try {
      await fetch('/api/match', { method: 'DELETE' });
    } catch {
      /* 取消失败无所谓：45 秒没心跳服务端会自动把我剔出队列 */
    } finally {
      setState({ status: 'idle', waitingCount: 0 });
      setElapsed(0);
      setBusy(false);
    }
  }

  // 轮询：等待中每 2 秒问一次服务端，顺便给自己的队列条目续心跳
  useEffect(() => {
    if (!searching) return;
    let alive = true;
    const timer = setInterval(() => {
      void (async () => {
        try {
          const res = await fetch('/api/match', { cache: 'no-store' });
          if (!res.ok || !alive) return;
          const next = (await res.json()) as MatchState;
          if (!alive) return;
          setState(next);
          if (next.status === 'matched') enterRoom(next.code);
        } catch {
          /* 单次轮询失败忽略，下一拍再试 */
        }
      })();
    }, POLL_MS);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [searching, enterRoom]);

  // 计时器：让"已等待 0:12"这类反馈动起来，用户知道系统没死
  useEffect(() => {
    if (!searching) return;
    const timer = setInterval(() => setElapsed((n) => n + 1), 1000);
    return () => clearInterval(timer);
  }, [searching]);

  // 离开页面/关标签时退出队列，别留幽灵条目占坑
  useEffect(() => {
    if (!searching) return;
    const bail = () => {
      if (leftRef.current) return;
      navigator.sendBeacon?.('/api/match/leave');
    };
    window.addEventListener('pagehide', bail);
    return () => {
      window.removeEventListener('pagehide', bail);
      if (!leftRef.current) void fetch('/api/match', { method: 'DELETE' }).catch(() => {});
    };
  }, [searching]);

  return (
    <div className="yb-card" style={{ padding: 'var(--card-pad)', maxWidth: 560 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
        <SwordsIcon />
        <div>
          <h2 className="yb-h3" style={{ margin: 0 }}>
            {t('match.title')}
          </h2>
          <p className="yb-lead" style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            {t('match.body')}
          </p>
        </div>
      </div>

      {searching ? (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <PulseDot />
            <strong style={{ fontSize: 'var(--text-base)', color: 'var(--fg)' }}>
              {t('match.searching')}
            </strong>
            <span className="yb-num yb-meta" style={{ marginLeft: 'auto' }}>
              {clock(elapsed)}
            </span>
          </div>

          <div
            aria-hidden
            style={{
              height: 4,
              marginTop: 'var(--space-4)',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-3)',
              overflow: 'hidden',
            }}
          >
            <span className="yb-match-sweep" />
          </div>

          <p className="yb-meta" style={{ marginTop: 'var(--space-3)' }}>
            {t('match.queueCount', { count: state.waitingCount })}
          </p>

          <button
            type="button"
            onClick={() => void cancel()}
            disabled={busy}
            className="yb-btn yb-btn-outline"
            style={{ marginTop: 'var(--space-5)' }}
          >
            {t('match.cancel')}
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <button
            type="button"
            onClick={() => void start()}
            disabled={busy}
            className="yb-btn yb-btn-primary"
          >
            {busy ? t('match.starting') : t('match.start')}
          </button>
          {state.waitingCount > 0 ? (
            <p className="yb-meta" style={{ marginTop: 'var(--space-3)' }}>
              {t('match.queueCount', { count: state.waitingCount })}
            </p>
          ) : null}
          {error ? (
            <p className="yb-meta" style={{ marginTop: 'var(--space-3)', color: 'var(--accent)' }}>
              {t('match.error')}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

/** 交叉双剑 —— 对战语义，统一 1.5 描边 24px */
function SwordsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
      <path d="m13 19 6-6" />
      <path d="m16 16 4 4" />
      <path d="M19 21h2v-2" />
      <path d="M9.5 6.5 21 18v3h-3L6.5 9.5" />
      <path d="m5 16 3 3" />
      <path d="M3 21v-2h2" />
    </svg>
  );
}

/** 呼吸绿点 —— 表示队列活着 */
function PulseDot() {
  return (
    <span
      aria-hidden
      className="yb-match-pulse"
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--success)',
        flexShrink: 0,
      }}
    />
  );
}
