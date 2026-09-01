/** 弈界 YiBoard — 黑白棋对局组件（人机对战） */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, Flag, Lightbulb, ShareNetwork } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

import { SquareBoard } from '@/components/SquareBoard';
import {
  createGame,
  placeStone,
  pass as passMove,
  resign,
  bestMove,
  suggestedMove,
  legalMoves,
  hasLegalMove,
  countDiscs,
  type ReversiState,
  type ReversiDifficulty,
} from '@/lib/engine/reversi';

const DIFFICULTIES: ReadonlyArray<{ value: ReversiDifficulty; label: string }> = [
  { value: 'novice', label: 'difficultyNovice' },
  { value: 'gentle', label: 'difficultyGentle' },
  { value: 'steady', label: 'difficultySteady' },
  { value: 'sharp', label: 'difficultySharp' },
];

const PLAYER: 'black' = 'black';
const AI: 'white' = 'white';

export interface ReversiGameProps {
  locale: string;
  variant?: 'hero' | 'full';
  initialDifficulty?: ReversiDifficulty;
}

export default function ReversiGame({
  locale,
  variant = 'full',
  initialDifficulty = 'steady',
}: ReversiGameProps) {
  const t = useTranslations('play');
  const isZh = locale === 'zh';
  const [game, setGame] = useState<ReversiState>(() => createGame());
  const [difficulty, setDifficulty] = useState<ReversiDifficulty>(initialDifficulty);
  const [thinking, setThinking] = useState(false);
  const [copied, setCopied] = useState(false);
  /** 历史快照栈：每次落子后记录完整局面，用于悔棋还原 */
  const [history, setHistory] = useState<ReversiState[]>(() => [createGame()]);
  const aiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNewGame = useCallback(() => {
    const g = createGame();
    setGame(g);
    setHistory([g]);
    setThinking(false);
  }, []);

  useEffect(() => {
    handleNewGame();
  }, [handleNewGame]);

  const handlePlay = useCallback(
    (i: number) => {
      if (game.turn !== PLAYER || game.status !== 'playing' || thinking) return;
      if (!hasLegalMove(game, PLAYER)) return;
      const next = placeStone(game, i, PLAYER);
      if (!next) return;
      setGame(next);
      setHistory((h) => [...h, next]);
    },
    [game, thinking],
  );

  // AI 应手（白方）
  useEffect(() => {
    if (game.turn !== AI || game.status !== 'playing' || variant !== 'full') return;
    if (!hasLegalMove(game, AI)) {
      // AI 无子可下 → 自动 pass
      const next = passMove(game, AI);
      setGame(next);
      setHistory((h) => [...h, next]);
      return;
    }
    setThinking(true);
    aiTimer.current = setTimeout(() => {
      const move = bestMove(game, AI, difficulty);
      if (move === null) {
        setThinking(false);
        return;
      }
      const next = placeStone(game, move, AI);
      if (next) {
        setGame(next);
        setHistory((h) => [...h, next]);
      }
      setThinking(false);
    }, 350);
    return () => {
      if (aiTimer.current) clearTimeout(aiTimer.current);
    };
  }, [game, difficulty, variant]);

  const handlePass = () => {
    if (game.turn !== PLAYER || game.status !== 'playing' || thinking) return;
    if (hasLegalMove(game, PLAYER)) return;
    const next = passMove(game, PLAYER);
    setGame(next);
    setHistory((h) => [...h, next]);
  };

  const handleUndo = useCallback(() => {
    if (history.length <= 1) return;
    const turns = history.map((h) => h.turn);
    let j = turns.length - 2;
    while (j >= 0 && turns[j] !== PLAYER) j--;
    if (j < 0) j = 0;
    const snap = history[j + 1]!;
    setHistory(history.slice(0, j + 2));
    setGame(snap);
    setThinking(false);
  }, [history]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'z' || e.altKey) return;
      e.preventDefault();
      handleUndo();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleUndo]);

  const handleResign = () => setGame(resign(game, PLAYER));
  const handleHint = () => suggestedMove(game, PLAYER);
  const handleShare = () => {
    const text = isZh
      ? `我在 YiBoard 刚下完一局黑白棋！黑 ${countDiscs(game.board).black} · 白 ${countDiscs(game.board).white}。`
      : `I just played Reversi on YiBoard! Black ${countDiscs(game.board).black} · White ${countDiscs(game.board).white}.`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const { black, white } = countDiscs(game.board);
  const statusText = () => {
    if (game.status === 'finished') {
      if (game.winner === 'draw') return t('draw');
      return isZh
        ? game.winner === 'black'
          ? `黑棋胜 ${black} : ${white}`
          : `白棋胜 ${white} : ${black}`
        : game.winner === 'black'
          ? `Black wins ${black} : ${white}`
          : `White wins ${white} : ${black}`;
    }
    if (game.turn === PLAYER) return isZh ? '黑棋下（你）' : t('turnYours');
    return isZh ? '白棋思考中…' : t('turnTheirs');
  };

  const playerCanMove = hasLegalMove(game, PLAYER);
  const validMoves =
    game.turn === PLAYER && !thinking && game.status === 'playing' && playerCanMove
      ? new Set(legalMoves(game, PLAYER))
      : new Set<number>();

  const disabled = thinking || game.status === 'finished';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <SquareBoard
        size={game.size}
        lastMove={game.lastMove}
        validMoves={validMoves}
        onPlay={handlePlay}
        disabled={disabled}
        ariaLabel={isZh ? '黑白棋棋盘' : 'Reversi board'}
        className="yb-board"
        renderCell={(i, cx, cy, cell) => {
          const c = game.board[i];
          if (!c) return null;
          const r = cell * 0.38;
          const fill = c === 'black' ? 'var(--stone-black)' : 'var(--stone-white)';
          const stroke = c === 'black' ? 'var(--stone-black-edge)' : 'var(--stone-white-edge)';
          return (
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={fill}
              stroke={stroke}
              strokeWidth={1}
              style={{ filter: 'drop-shadow(var(--stone-shadow))' }}
            />
          );
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        <span style={{ fontWeight: 'var(--weight-emphasis)' }}>{statusText()}</span>
        {thinking && <span style={{ color: 'var(--fg-2)', fontSize: 'var(--text-sm)' }}>⏳</span>}
        <span className="yb-meta">
          {isZh ? '黑 ' : 'Black '}
          {black} · {isZh ? '白 ' : 'White '}
          {white}
        </span>
      </div>

      {variant === 'full' && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="yb-btn yb-btn-primary yb-btn-sm" onClick={handleNewGame}>
            {t('newGame')}
          </button>
          <button
            className="yb-btn yb-btn-ghost yb-btn-sm"
            onClick={handleUndo}
            disabled={history.length <= 1 || thinking}
            title={t('undoHint')}
            aria-label={t('undoHint')}
          >
            <ArrowCounterClockwise size={14} />
            {t('undo')}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handlePass} disabled={disabled || playerCanMove}>
            {isZh ? '停一手' : 'Pass'}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleHint}>
            <Lightbulb size={14} />
            {isZh ? '提示' : 'Hint'}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleResign}>
            <Flag size={14} />
            {t('resign')}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleShare}>
            <ShareNetwork size={14} />
            {copied ? t('copied') : t('shareGame')}
          </button>
          <select
            className="yb-btn yb-btn-ghost yb-btn-sm"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as ReversiDifficulty)}
            disabled={game.moveNumber > 0}
            aria-label={t('difficulty')}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>
                {t(d.label)}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
