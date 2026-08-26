'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowCounterClockwise, ArrowsClockwise, Flag, Lightbulb, Robot, ShareNetwork } from '@phosphor-icons/react';

import { Board } from '@/components/Board';
import type { Difficulty } from '@/lib/engine/ai';
import {
  BLACK,
  BOARD_SIZE,
  DEFAULT_WIN_COUNT,
  WHITE,
  toNotation,
  type Player,
} from '@/lib/engine/board';
import { applyMove, boardToArray, createGame, serializeMoves, undo, type GameState } from '@/lib/engine/game';
import { useAppearance } from '@/components/useAppearance';

const DIFFICULTIES: ReadonlyArray<{ value: Difficulty; label: string; note: string }> = [
  { value: 'novice', label: 'difficultyNovice', note: 'difficultyNoviceNote' },
  { value: 'gentle', label: 'difficultyGentle', note: 'difficultyGentleNote' },
  { value: 'steady', label: 'difficultySteady', note: 'difficultySteadyNote' },
  { value: 'sharp', label: 'difficultySharp', note: 'difficultySharpNote' },
  { value: 'master', label: 'difficultyMaster', note: 'difficultyMasterNote' },
  { value: 'grandmaster', label: 'difficultyGrandmaster', note: 'difficultyGrandmasterNote' },
];

const BOARD_SIZES = [9, 13, 15] as const;
const WIN_COUNTS = [5, 6, 7] as const;

export interface GomokuGameProps {
  /** hero 只给棋盘 + 一行状态；full 带完整控制面板 */
  variant?: 'hero' | 'full';
  initialDifficulty?: Difficulty;
  /** 双 AI 观战：引擎替双方走子，终局自动存回放（/replays/[id]） */
  autoMode?: boolean;
  /** 初始棋盘尺寸（9/13/15，默认 15） */
  initialSize?: number;
  /** 初始连珠数（5/6/7，默认 5） */
  initialWinCount?: number;
}

/** 单次引擎思考的元数据（AI 自己产出的"思考过程"：搜索深度 / 评估节点数 / 耗时） */
interface ThinkEntry {
  side: Player;
  depth: number;
  nodes: number;
  ms: number;
}

export function GomokuGame({
  variant = 'full',
  initialDifficulty = 'steady',
  autoMode = false,
  initialSize = BOARD_SIZE,
  initialWinCount = DEFAULT_WIN_COUNT,
}: GomokuGameProps) {
  const t = useTranslations('play');
  const locale = useLocale();
  const { board } = useAppearance();
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [playerColor, setPlayerColor] = useState<Player>(BLACK);
  const [size, setSize] = useState<number>(initialSize);
  const [winCount, setWinCount] = useState<number>(initialWinCount);
  const [game, setGame] = useState<GameState>(() => createGame(BLACK, initialSize, initialWinCount));
  const [thinking, setThinking] = useState(false);
  const [thinkMs, setThinkMs] = useState<number | null>(null);
  const [lastThink, setLastThink] = useState<{ depth: number; nodes: number; ms: number } | null>(null);
  const [thinkLog, setThinkLog] = useState<ThinkEntry[]>([]);
  const [resigned, setResigned] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [replayUrl, setReplayUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [hintMove, setHintMove] = useState<{ x: number; y: number } | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const startedAt = useRef<number | null>(null);
  const reported = useRef(false);
  const replaySaved = useRef(false);

  const cells = useMemo(() => boardToArray(game.board), [game]);
  const over = game.status !== 'playing' || resigned;
  const enginesTurn = !over && (autoMode ? true : game.turn !== playerColor);

  /* 引擎在自己的回合出手。
     - 搜索模块用动态 import 切出去：首屏只发棋盘 SVG，引擎代码等到真要走棋才下载（ADR-010）。
     - 放进 setTimeout 让浏览器先把玩家那一手画出来再进搜索，否则 450ms 预算看起来像掉帧。
     - autoMode（双 AI）：谁走引擎替谁走，思考元数据（深度/节点/耗时）记入 thinkLog 分侧展示。 */
  useEffect(() => {
    if (over) return;
    if (!autoMode && game.turn === playerColor) return;

    let cancelled = false;
    setThinking(true);

    const timer = setTimeout(() => {
      void import('@/lib/engine/ai').then(({ chooseMove }) => {
        if (cancelled) return;
        const side = game.turn;
        const result = chooseMove(game.board, side, difficulty, game.winCount);
        setThinking(false);
        if (!result) return;
        setThinkMs(result.elapsedMs);
        setLastThink({ depth: result.depth, nodes: result.nodes, ms: result.elapsedMs });
        setThinkLog((prev) => [...prev, { side, depth: result.depth, nodes: result.nodes, ms: result.elapsedMs }]);
        setGame((prev) =>
          prev === game ? (applyMove(prev, result.point.x, result.point.y) ?? prev) : prev,
        );
      });
    }, 70);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [game, playerColor, difficulty, over, autoMode]);

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
        moves: serializeMoves(game.moves, game.size),
        durationMs: Date.now() - (startedAt.current ?? Date.now()),
      }),
    }).catch(() => {
      /* 战绩上报失败不该打断对局 */
    });
  }, [game, difficulty, playerColor]);

  /* 双 AI 观战：终局自动存回放（/replays/[id]）。只对 autoMode 生效，失败不打断观战。 */
  useEffect(() => {
    if (!autoMode || game.status === 'playing' || replaySaved.current) return;
    replaySaved.current = true;

    void fetch('/api/replays', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        result: game.status === 'draw' ? 'draw' : game.winner === BLACK ? 'black' : 'white',
        moves: serializeMoves(game.moves, game.size),
        blackDifficulty: difficulty,
        whiteDifficulty: difficulty,
        locale,
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { url?: string } | null) => {
        if (data?.url) setReplayUrl(new URL(data.url, window.location.origin).toString());
      })
      .catch(() => {
        /* 回放保存失败不该打断观战 */
      });
  }, [autoMode, game, difficulty, locale]);

  const reset = useCallback(
    (color: Player = playerColor, boardSize: number = size, win: number = winCount) => {
      setGame(createGame(BLACK, boardSize, win));
      setPlayerColor(color);
      setThinkMs(null);
      setLastThink(null);
      setThinkLog([]);
      setResigned(false);
      setShareUrl(null);
      setReplayUrl(null);
      setCopied(false);
      setHintMove(null);
      setHintLoading(false);
      startedAt.current = Date.now();
      reported.current = false;
      replaySaved.current = false;
    },
    [playerColor, size, winCount],
  );

  /** 切换棋盘尺寸/连珠：更新配置并开新局（保留执色）。 */
  const changeVariant = useCallback(
    (newSize: number, newWin: number) => {
      if (newSize === size && newWin === winCount) return;
      setSize(newSize);
      setWinCount(newWin);
      reset(playerColor, newSize, newWin);
    },
    [size, winCount, playerColor, reset],
  );

  const play = useCallback(
    (x: number, y: number) => {
      if (over || thinking || game.turn !== playerColor) return;
      setHintMove(null);
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
    setHintMove(null);
  }, [thinking]);

  /* 提示（hint）：用与引擎相同的选择器求一步建议落子，在棋盘上画青色虚线环。
     - 只在玩家回合可用（autoMode 双 AI 观战下没有意义）。
     - 与 AI 走棋共用 chooseMove，保证"提示 = 引擎会怎么下"，不说空话。 */
  const getHint = useCallback(() => {
    if (over || thinking || enginesTurn || hintLoading) return;
    setHintLoading(true);
    void import('@/lib/engine/ai').then(({ chooseMove }) => {
      const result = chooseMove(game.board, game.turn, difficulty, game.winCount);
      setHintLoading(false);
      if (!result) return;
      setHintMove(result.point);
    });
  }, [over, thinking, enginesTurn, hintLoading, game.board, game.turn, difficulty]);

  const share = useCallback(async () => {
    const response = await fetch('/api/share', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        result: game.status === 'draw' ? 'draw' : game.winner === BLACK ? 'black' : 'white',
        playerColor: playerColor === BLACK ? 'black' : 'white',
        moves: serializeMoves(game.moves, game.size),
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
      theme={board}
      size={game.size}
      cells={cells}
      lastMove={game.lastMove}
      winningLine={game.winningLine}
      hintMove={hintMove}
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
                notation: toNotation(game.lastMove.x, game.lastMove.y, game.size),
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
            {lastThink
              ? ` · ${t('thinkingLine', {
                  depth: lastThink.depth,
                  nodes: lastThink.nodes,
                  ms: Math.round(lastThink.ms),
                })}`
              : thinkMs !== null
                ? ` · ${t('thinkingTime', { ms: Math.round(thinkMs) })}`
                : ''}
          </p>
        </div>

        <hr className="yb-rule" />

        {/* 棋盘尺寸与连珠数：切换会开新局。9/13/15 × 5/6/7 组合对标主流平台 */}
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="yb-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            {t('boardSize')}
          </legend>
          <div style={{ display: 'flex', gap: 6 }}>
            {BOARD_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => changeVariant(s, winCount)}
                className={size === s ? 'yb-btn yb-btn-outline yb-btn-sm' : 'yb-btn yb-btn-ghost yb-btn-sm'}
                style={{ flex: 1 }}
              >
                {s}×{s}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="yb-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            {t('winCount')}
          </legend>
          <div style={{ display: 'flex', gap: 6 }}>
            {WIN_COUNTS.map((w) => (
              <button
                key={w}
                type="button"
                aria-pressed={winCount === w}
                onClick={() => changeVariant(size, w)}
                className={winCount === w ? 'yb-btn yb-btn-outline yb-btn-sm' : 'yb-btn yb-btn-ghost yb-btn-sm'}
                style={{ flex: 1 }}
              >
                {w}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="yb-meta" style={{ margin: 0 }}>
          {t('variantNote')}
        </p>

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

        {autoMode ? (
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            <p className="yb-meta" style={{ margin: 0 }}>
              <Robot size={14} weight="bold" aria-hidden style={{ verticalAlign: -2, marginRight: 6 }} />
              {t('autoModeHint')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
              <ThinkColumn
                title={t('aiBlack')}
                black
                entries={thinkLog.filter((e) => e.side === BLACK)}
              />
              <ThinkColumn title={t('aiWhite')} entries={thinkLog.filter((e) => e.side === WHITE)} />
            </div>
          </div>
        ) : null}

        {!autoMode ? (
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
        ) : null}

        <hr className="yb-rule" />

        <div style={{ display: 'grid', gap: 6 }}>
          <button type="button" className="yb-btn yb-btn-primary" onClick={() => reset()}>
            <ArrowsClockwise size={16} aria-hidden />
            {t('newGame')}
          </button>
          {!autoMode ? (
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                className="yb-btn yb-btn-outline yb-btn-sm"
                style={{ flex: 1 }}
                onClick={getHint}
                disabled={over || thinking || enginesTurn || hintLoading || game.moves.length === 0}
              >
                <Lightbulb size={15} aria-hidden />
                {hintLoading ? t('hintLoading') : hintMove ? t('hintClear') : t('hint')}
              </button>
            </div>
          ) : null}
          {!autoMode ? (
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
          ) : null}
          {hintMove && game.turn === playerColor && !over ? (
            <p className="yb-meta" style={{ margin: 0 }}>
              {t('hintDone', { notation: toNotation(hintMove.x, hintMove.y, game.size) })}
            </p>
          ) : null}
          {!autoMode && game.status !== 'playing' ? (
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
          {autoMode && replayUrl ? (
            <a
              href={replayUrl}
              target="_blank"
              rel="noreferrer"
              className="yb-btn yb-btn-outline yb-btn-sm"
            >
              {t('replayReady')} — {t('watchReplay')}
            </a>
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

/** 双 AI 观战：某一侧的思考日志（最近 6 条），展示引擎每次落子的搜索深度 / 节点数 / 耗时。 */
function ThinkColumn({
  title,
  black,
  entries,
}: {
  title: string;
  black?: boolean;
  entries: ThinkEntry[];
}) {
  const total = entries.length;
  const recent = entries.slice(-6).reverse();
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: 8,
        minHeight: 88,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-emphasis)',
          color: 'var(--fg-2)',
          marginBottom: 6,
        }}
      >
        {black !== undefined ? <StoneDot black={black} /> : null}
        {title}
      </div>
      {recent.length === 0 ? (
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--meta)' }}>—</div>
      ) : (
        recent.map((e, i) => (
          <div
            key={i}
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--meta)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.7,
            }}
          >
            #{total - recent.length + i + 1} · d{e.depth} · {e.nodes} · {e.ms}ms
          </div>
        ))
      )}
    </div>
  );
}
