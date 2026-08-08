'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowsClockwise, Copy, Check, UsersThree } from '@phosphor-icons/react';

import { Board } from '@/components/Board';
import { useAppearance } from '@/components/useAppearance';
import { BLACK, fromNotation, type Point } from '@/lib/engine/board';
import { boardToArray, replay } from '@/lib/engine/game';

type Side = 'black' | 'white';

interface RoomView {
  code: string;
  status: 'waiting' | 'playing' | 'closed';
  moves: string[];
  yourSide: Side | null;
  turn: Side;
  result: 'black' | 'white' | 'draw' | null;
  opponentPresent: boolean;
  updatedAt: string;
}

const POLL_MS = 1400;

export function FriendGame({ initialCode }: { initialCode: string | null }) {
  const t = useTranslations('play');
  const { board } = useAppearance();
  const [code, setCode] = useState<string | null>(initialCode);
  const [room, setRoom] = useState<RoomView | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pending = useRef(false);

  const points = useMemo<Point[]>(
    () => (room?.moves ?? []).map(fromNotation).filter((p): p is Point => p !== null),
    [room?.moves],
  );
  const state = useMemo(() => replay(points, BLACK), [points]);
  const cells = useMemo(() => boardToArray(state.board), [state]);

  const pull = useCallback(async (target: string) => {
    if (pending.current) return;
    pending.current = true;
    try {
      const response = await fetch(`/api/rooms/${target}`, { cache: 'no-store' });
      if (response.ok) {
        setRoom((await response.json()) as RoomView);
        setError(null);
      } else {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? 'ROOM_NOT_FOUND');
      }
    } catch {
      /* 网络抖一下不弹错，下一轮轮询会补上 */
    } finally {
      pending.current = false;
    }
  }, []);

  useEffect(() => {
    if (!code) return;
    void pull(code);
    const timer = setInterval(() => void pull(code), POLL_MS);
    return () => clearInterval(timer);
  }, [code, pull]);

  const createRoom = useCallback(async () => {
    setBusy(true);
    try {
      const response = await fetch('/api/rooms', { method: 'POST' });
      if (!response.ok) return;
      const view = (await response.json()) as RoomView;
      setRoom(view);
      setCode(view.code);
      window.history.replaceState(null, '', `?mode=friend&room=${view.code}`);
    } finally {
      setBusy(false);
    }
  }, []);

  const join = useCallback(() => {
    const target = joinCode.trim().toUpperCase();
    if (target.length < 4) return;
    setCode(target);
    window.history.replaceState(null, '', `?mode=friend&room=${target}`);
  }, [joinCode]);

  const play = useCallback(
    async (x: number, y: number) => {
      if (!code || !room || room.yourSide !== room.turn || room.result) return;
      const response = await fetch(`/api/rooms/${code}/move`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ x, y }),
      });
      if (response.ok) {
        setRoom((await response.json()) as RoomView);
        setError(null);
      } else {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? 'ILLEGAL_MOVE');
      }
    },
    [code, room],
  );

  const inviteUrl =
    typeof window !== 'undefined' && code
      ? `${window.location.origin}${window.location.pathname}?mode=friend&room=${code}`
      : '';

  const copyInvite = useCallback(async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* 复制被拒就让用户看着链接手动选 */
    }
  }, [inviteUrl]);

  /* ---------------- 还没有房间：开房 / 输码进房 ---------------- */
  if (!code) {
    return (
      <div className="yb-card" style={{ padding: 'var(--space-10)', maxWidth: 520 }}>
        <UsersThree size={28} weight="regular" color="var(--accent)" aria-hidden />
        <h2 className="yb-h3" style={{ marginTop: 'var(--space-4)' }}>
          {t('invite.title')}
        </h2>
        <p className="yb-meta" style={{ marginTop: 'var(--space-2)' }}>
          {t('invite.body')}
        </p>

        <button
          type="button"
          className="yb-btn yb-btn-primary"
          onClick={() => void createRoom()}
          disabled={busy}
          style={{ marginTop: 'var(--space-6)', width: '100%' }}
        >
          {t('vsFriend')}
        </button>

        <hr className="yb-rule" style={{ marginBlock: 'var(--space-6)' }} />

        <label className="yb-eyebrow" htmlFor="room-code">
          {t('invite.code')}
        </label>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <input
            id="room-code"
            value={joinCode}
            onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
            onKeyDown={(event) => {
              if (event.key === 'Enter') join();
            }}
            maxLength={8}
            autoComplete="off"
            spellCheck={false}
            className="yb-num"
            style={{
              flex: 1,
              height: 44,
              paddingInline: 'var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-strong)',
              background: 'var(--surface)',
              color: 'var(--fg)',
              fontSize: 'var(--text-base)',
              letterSpacing: '0.18em',
            }}
          />
          <button type="button" className="yb-btn yb-btn-outline" onClick={join}>
            {t('vsFriend')}
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- 房间里 ---------------- */
  const yourTurn = room?.yourSide === room?.turn && !room?.result && room?.opponentPresent;

  const status = (() => {
    if (!room) return t('invite.waiting');
    if (error === 'ROOM_NOT_FOUND') return t('invite.waiting');
    if (room.result) {
      if (room.result === 'draw') return t('draw');
      const count = room.moves.length;
      return room.result === room.yourSide
        ? t('wonByYou', { count })
        : t('wonByOpponent', { count });
    }
    if (!room.opponentPresent) return t('invite.waiting');
    return yourTurn ? t('turnYours') : t('turnOpponent');
  })();

  return (
    <div className="yb-play-layout">
      <div style={{ display: 'grid', justifyItems: 'center' }}>
        <Board
          theme={board}
          cells={cells}
          lastMove={state.lastMove}
          winningLine={state.winningLine}
          onPlay={(x, y) => void play(x, y)}
          disabled={!yourTurn}
          ariaLabel={t('title')}
        />
      </div>

      <aside
        className="yb-card"
        style={{ padding: 'var(--card-pad)', display: 'grid', gap: 'var(--space-5)' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: 'var(--radius-pill)',
                background: room?.result
                  ? 'var(--accent)'
                  : yourTurn
                    ? 'var(--success)'
                    : 'var(--meta)',
              }}
            />
            <strong style={{ fontSize: 'var(--text-base)' }}>{status}</strong>
          </div>
          <p className="yb-meta" style={{ marginTop: 6 }}>
            {t('moveCount', { count: room?.moves.length ?? 0 })}
            {room?.yourSide ? ` · ${room.yourSide === 'black' ? t('black') : t('white')}` : ''}
          </p>
          {error && error !== 'ROOM_NOT_FOUND' ? (
            <p style={{ marginTop: 6, fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>
              {error === 'ILLEGAL_MOVE' ? t('illegal') : t('turnOpponent')}
            </p>
          ) : null}
        </div>

        <hr className="yb-rule" />

        <div>
          <h2 className="yb-eyebrow">{t('invite.code')}</h2>
          <p
            className="yb-num"
            style={{
              marginTop: 'var(--space-2)',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              letterSpacing: '0.22em',
              color: 'var(--accent)',
            }}
          >
            {code}
          </p>
          <p className="yb-meta" style={{ marginTop: 'var(--space-2)' }}>
            {room?.opponentPresent ? t('invite.joined') : t('invite.body')}
          </p>
          <button
            type="button"
            className="yb-btn yb-btn-outline yb-btn-sm"
            onClick={() => void copyInvite()}
            style={{ marginTop: 'var(--space-3)', width: '100%' }}
          >
            {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
            {copied ? t('copied') : t('copyLink')}
          </button>
        </div>

        <hr className="yb-rule" />

        <button
          type="button"
          className="yb-btn yb-btn-ghost yb-btn-sm"
          onClick={() => {
            setCode(null);
            setRoom(null);
            setError(null);
            window.history.replaceState(null, '', '?mode=friend');
          }}
        >
          <ArrowsClockwise size={15} aria-hidden />
          {t('newGame')}
        </button>
      </aside>
    </div>
  );
}
