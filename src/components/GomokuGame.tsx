'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowCounterClockwise, ArrowsClockwise, Flag, ShareNetwork } from '@phosphor-icons/react';

import { Board } from '@/components/Board';
import type { Difficulty } from '@/lib/engine/ai';
import { BLACK, WHITE, toNotation, type Player } from '@/lib/engine/board';
import { applyMove, boardToArray, createGame, serializeMoves, undo, type GameState } from '@/lib/engine/game';

const DIFFICULTIES: ReadonlyArray<{ value: Difficulty; label: string; note: string }> = [
  { value: 'gentle', label: 'difficultyGentle', note: 'difficultyGentleNote' },
  { value: 'steady', label: 'difficultySteady', note: 'difficultySteadyNote' },
  { value: 'sharp', label: 'difficultySharp', note: 'difficultySharpNote' },
];

export interface GomokuGameProps {
  /** hero 只给棋盘 + 一行状态；full 带完整控制面板 */
  variant?: 'hero' | 'full';
  initialDifficulty?: Difficulty;
}

export function GomokuGame({ variant = 'full', initialDifficulty = 'steady' }: GomokuGameProps) {
  const t = useTranslations('play');
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [playerColor, setPlayerColor] = useState<Player>(BLACK);
  const [game, setGame] = useState<GameState>(() => createGame(BLACK));
  const [thinking, setThinking] = useState(false);
  const [thinkMs, setThinkMs] = useState<number | null>(null);
  const [resigned, setResigned] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const startedAt = useRef<number | null>(null);
  const reported = useRef(false);

  const cells = useMemo(() => boardToArray(game.board), [game]);
  const over = game.status !== 'playing' || resigned;
  const enginesTurn = !over && game.turn !== playerColor;

  /* 引擎在自己的回合出手。
     - 搜索模块用动态 import 切出去：首屏只发棋盘 SVG，引擎代码等到真要走棋才下载（ADR-010）。
     - 放进 setTimeout 让浏览器先把玩家那一手画出来再进搜索，否则 450ms 预算看起来像掉帧。 */
  useEffect(() => {
    if (over || game.turn === playerColor) return;

    let cancelled = false;
    setThinking(true);

    const timer = setTimeout(() => {
      void import('@/lib/engine/ai').then(({ chooseMove }) => {
        if (cancelled) return;
        const result = chooseMove(game.board, game.turn, difficulty);
        setThinking(false);
        if (!result) return;
        setThinkMs(result.elapsedMs);
        setGame((prev) =>
          prev === game ? (applyMove(prev, result.point.x, result.point.y) ?? prev) : prev,
        );
      });
    }, 70);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [game, playerColor, difficulty, over]);

  /* 对局结束后把结果送回服务端，写进战绩。人机不动 ELO（Spec §9 AC-07）。 */
  useEffect(() => {
    if (game.status === 'playing' || reported.current) return;
    reported.current = true;

    void fetch('/api/games', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        mode: 'ai',
        difficulty,
        playerColor: playerColor === BLACK ? 'black' : 'white',
        result: game.status === 'draw' ? 'draw' : game.winner === BLACK ? 'black' : 'white',
        moves: serializeMoves(game.moves),
        durationMs: Date.now() - (startedAt.current ?? Date.now()),
      }),
    }).catch(() => {
      /* 战绩上报失败不该打断对局 */
    });
  }, [game, difficulty, playerColor]);

  const reset = useCallback(
    (color: Player = playerColor) => {
      setGame(createGame(BLACK));
      setPlayerColor(color);
      setThinkMs(null);
      setResigned(false);
      setShareUrl(null);
      setCopied(false);
      startedAt.current = Date.now();
      reported.current = false;
    },
    [playerColor],
  );

  const play = useCallback(
    (x: number, y: number) => {
      if (over || thinking || game.turn !== playerColor) return;
      setGame((prev) => applyMove(prev, x, y) ?? prev);
    },
    [over, thinking, game.turn, playerColor],
  );

  const takeBack = useCallback(() => {
    if (thinking) return;
    // 退两手：把自己那一手和引擎的应手一起收回
    setGame((prev) => undo(prev, prev.moves.length >= 2 ? 2 : 1));
    setResigned(false);
    reported.current = false;
  }, [thinking]);

  const share = useCallback(async () => {
    const response = await fetch('/api/share', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        result: game.status === 'draw' ? 'draw' : game.winner === BLACK ? 'black' : 'white',
        playerColor: playerColor === BLACK ? 'black' : 'white',
        moves: serializeMoves(game.moves),
        difficulty,
      }),
    });
    if (!response.ok) return;
    const data = (await response.json()) as { url?: string };
    if (!data.url) return;
    const absolute = new URL(data.url, window.location.origin).toString();
    setShareUrl(absolute);
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* 剪贴板被拒就把链接摆出来让用户自己复制 */
    }
  }, [game, difficulty, playerColor]);

  const status = (() => {
    if (resigned) return t('resigned');
    if (game.status === 'draw') return t('draw');
    if (game.status === 'won') {
      return game.winner === playerColor
        ? t('wonByYou', { count: game.moves.length })
        : t('wonByEngine', { count: game.moves.length });
    }
    return enginesTurn ? t('turnTheirs') : t('turnYours');
  })();

  const boardEl = (
    <Board
      cells={cells}
      lastMove={game.lastMove}
      winningLine={game.winningLine}
      onPlay={play}
      disabled={over || thinking || enginesTurn}
      ariaLabel={t('title')}
    />
  );

  if (variant === 'hero') {
    return (
      <div style={{ display: 'grid', gap: 'var(--space-3)', justifyItems: 'center' }}>
        {boardEl}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <StatusDot active={!over} accent={over} />
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-emphasis)' }}>
            {status}
          </span>
          {game.moves.length > 0 ? (
            <button type="button" className="yb-btn yb-btn-ghost yb-btn-sm" onClick={() => reset()}>
              <ArrowsClockwise size={14} aria-hidden />
              {t('newGame')}
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="yb-play-layout">
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--space-3)' }}>
        {boardEl}
        <p className="yb-meta" style={{ textAlign: 'center' }}>
          {game.lastMove
            ? t('lastMove', {
                notation: toNotation(game.lastMove.x, game.lastMove.y),
              })
            : null}
        </p>
      </div>

      <aside className="yb-card" style={{ padding: 'var(--card-pad)', display: 'grid', gap: 'var(--space-5)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <StatusDot active={!over} accent={over} />
            <strong style={{ fontSize: 'var(--text-base)' }}>{status}</strong>
          </div>
          <p className="yb-meta" style={{ marginTop: 6 }}>
            {t('moveCount', { count: game.moves.length })}
            {thinkMs !== null ? ` · ${t('thinkingTime', { ms: Math.round(thinkMs) })}` : ''}
          </p>
        </div>

        <hr className="yb-rule" />

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="yb-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            {t('difficulty')}
          </legend>
          <div style={{ display: 'grid', gap: 6 }}>
            {DIFFICULTIES.map((item) => {
              const active = difficulty === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDifficulty(item.value)}
                  style={{
                    display: 'grid',
                    gap: 2,
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                    background: active ? 'var(--accent-soft)' : 'transparent',
                    cursor: 'pointer',
                    color: 'var(--fg)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-emphasis)' }}>
                    {t(item.label)}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--meta)' }}>
                    {t(item.note)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="yb-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            {t('yourColour')}
          </legend>
          <div style={{ display: 'flex', gap: 6 }}>
            {([BLACK, WHITE] as const).map((color) => (
              <button
                key={color}
                type="button"
                aria-pressed={playerColor === color}
                onClick={() => reset(color)}
                className={playerColor === color ? 'yb-btn yb-btn-outline yb-btn-sm' : 'yb-btn yb-btn-ghost yb-btn-sm'}
                style={{ flex: 1 }}
              >
                <StoneDot black={color === BLACK} />
                {color === BLACK ? t('black') : t('white')}
              </button>
            ))}
          </div>
        </fieldset>

        <hr className="yb-rule" />

        <div style={{ display: 'grid', gap: 6 }}>
          <button type="button" className="yb-btn yb-btn-primary" onClick={() => reset()}>
            <ArrowsClockwise size={16} aria-hidden />
            {t('newGame')}
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              className="yb-btn yb-btn-outline yb-btn-sm"
              style={{ flex: 1 }}
              onClick={takeBack}
              disabled={game.moves.length === 0 || thinking}
            >
              <ArrowCounterClockwise size={15} aria-hidden />
              {t('undo')}
            </button>
            <button
              type="button"
              className="yb-btn yb-btn-ghost yb-btn-sm"
              style={{ flex: 1 }}
              onClick={() => setResigned(true)}
              disabled={over || game.moves.length === 0}
            >
              <Flag size={15} aria-hidden />
              {t('resign')}
            </button>
          </div>
          {game.status !== 'playing' ? (
            <button type="button" className="yb-btn yb-btn-outline yb-btn-sm" onClick={() => void share()}>
              <ShareNetwork size={15} aria-hidden />
              {copied ? t('copied') : t('shareGame')}
            </button>
          ) : null}
          {shareUrl ? (
            <output
              className="yb-num"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--meta)',
                wordBreak: 'break-all',
              }}
            >
              {shareUrl}
            </output>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function StatusDot({ active, accent }: { active: boolean; accent: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        width: 8,
        height: 8,
        borderRadius: 'var(--radius-pill)',
        flexShrink: 0,
        background: accent ? 'var(--accent)' : active ? 'var(--success)' : 'var(--meta)',
      }}
    />
  );
}

function StoneDot({ black }: { black: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        width: 12,
        height: 12,
        borderRadius: 'var(--radius-pill)',
        background: black ? 'var(--stone-black)' : 'var(--stone-white)',
        border: `1px solid ${black ? 'var(--stone-black-edge)' : 'var(--stone-white-edge)'}`,
      }}
    />
  );
}
