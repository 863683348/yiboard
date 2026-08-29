/** 弈界 YiBoard — 围棋对局组件（人机对战） */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, Flag, Lightbulb, ShareNetwork } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

import { GoBoard } from '@/components/GoBoard';
import {
  createGame,
  placeStone,
  pass,
  resign,
  bestMove,
  suggestedMove,
  undoTargetIndex,
  type GoState,
  type GoDifficulty,
  type GoBoardSize,
} from '@/lib/engine/go';

const DIFFICULTIES: ReadonlyArray<{ value: GoDifficulty; label: string }> = [
  { value: 'gentle', label: 'difficultyGentle' },
  { value: 'steady', label: 'difficultySteady' },
  { value: 'sharp', label: 'difficultySharp' },
];

const SIZES: ReadonlyArray<{ value: GoBoardSize; label: string }> = [
  { value: 9, label: '9×9' },
  { value: 13, label: '13×13' },
  { value: 19, label: '19×19' },
];

export interface GoGameProps {
  locale: string;
  variant?: 'hero' | 'full';
  initialDifficulty?: GoDifficulty;
  initialSize?: GoBoardSize;
}

export default function GoGame({
  locale,
  variant = 'full',
  initialDifficulty = 'steady',
  initialSize = 19,
}: GoGameProps) {
  const t = useTranslations('play');
  const isZh = locale === 'zh';
  const [size, setSize] = useState<GoBoardSize>(initialSize);
  const [game, setGame] = useState<GoState>(() => createGame(initialSize));
  const [difficulty, setDifficulty] = useState<GoDifficulty>(initialDifficulty);
  const [thinking, setThinking] = useState(false);
  const [copied, setCopied] = useState(false);
  /** 历史快照栈：每次落子后记录完整局面，用于悔棋还原（含提子数、打劫历史） */
  const [history, setHistory] = useState<GoState[]>(() => [createGame(initialSize)]);
  const aiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNewGame = useCallback(() => {
    const g = createGame(size);
    setGame(g);
    setHistory([g]);
    setThinking(false);
  }, [size]);

  useEffect(() => {
    handleNewGame();
  }, [size, handleNewGame]);

  const handlePlay = useCallback(
    (x: number, y: number) => {
      if (game.turn !== 'black' || game.status !== 'playing' || thinking) return;
      const next = placeStone(game, x, y, 'black');
      if (!next) return;
      setGame(next);
      setHistory((h) => [...h, next]);
    },
    [game, thinking]
  );

  // AI responds to white's turn
  useEffect(() => {
    if (game.turn !== 'white' || game.status !== 'playing' || variant !== 'full') return;
    setThinking(true);
    aiTimer.current = setTimeout(() => {
      const move = bestMove(game, 'white', difficulty);
      if (move) {
        if (move.type === 'place' && move.x !== undefined && move.y !== undefined) {
          const next = placeStone(game, move.x, move.y, 'white');
          if (next) {
            setGame(next);
            setHistory((h) => [...h, next]);
          }
        } else if (move.type === 'pass') {
          const next = pass(game, 'white');
          setGame(next);
          setHistory((h) => [...h, next]);
        }
      }
      setThinking(false);
    }, 400);
    return () => {
      if (aiTimer.current) clearTimeout(aiTimer.current);
    };
  }, [game, difficulty, variant]);

  const handlePass = () => {
    if (game.turn !== 'black' || game.status !== 'playing' || thinking) return;
    const next = pass(game, 'black');
    setGame(next);
    setHistory((h) => [...h, next]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    // 撤回到上一个玩家行棋点：同时撤销玩家上一步 + AI 的应手（若 AI 还没应手则连这一步一起撤）
    const next = history.slice(0, undoTargetIndex(history.map((h) => h.turn)));
    const snap = next[next.length - 1]!;
    setHistory(next);
    setGame(snap);
    setThinking(false);
  };

  const handleResign = () => {
    setGame(resign(game, 'black'));
  };

  const handleHint = () => {
    suggestedMove(game, 'black');
  };

  const handleShare = () => {
    const text = isZh
      ? `我在 YiBoard 刚下完一局围棋！第 ${game.moveNumber} 手。`
      : `I just played Go on YiBoard! Move ${game.moveNumber}.`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const statusText = () => {
    if (game.status === 'finished') {
      if (game.winner === 'draw') return t('draw');
      const margin = game.margin ?? 0;
      if (isZh) {
        return game.winner === 'black'
          ? `黑棋胜 ${margin.toFixed(1)} 子`
          : `白棋胜 ${margin.toFixed(1)} 子`;
      }
      return game.winner === 'black'
        ? `Black wins by ${margin.toFixed(1)} points`
        : `White wins by ${margin.toFixed(1)} points`;
    }
    if (game.turn === 'black') return isZh ? '黑棋下' : t('turnYours');
    return isZh ? '白棋思考中…' : t('turnTheirs');
  };

  const passLabel = isZh ? '停一手' : 'Pass';
  const hintLabel = isZh ? '提示' : 'Hint';
  const boardSizeLabel = isZh ? '棋盘大小' : 'Board size';
  const prisonersLabel = isZh ? '提子：黑 {black} / 白 {white}' : 'Prisoners: B {black} / W {white}';

  const disabled = thinking || game.status === 'finished';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <GoBoard
        board={game.board}
        size={game.size}
        lastMove={game.lastMove}
        onPlay={handlePlay}
        disabled={disabled}
        ariaLabel={isZh ? '围棋棋盘' : 'Go board'}
        className="yb-board"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontWeight: 'var(--weight-emphasis)' }}>{statusText()}</span>
          {thinking && <span style={{ color: 'var(--fg-2)', fontSize: 'var(--text-sm)' }}>⏳</span>}
        </div>
        <span className="yb-meta">
          {t('moveCount', { count: game.moveNumber })} ·{' '}
          {prisonersLabel
            .replace('{black}', String(game.blackPrisoners))
            .replace('{white}', String(game.whitePrisoners))}
        </span>
      </div>

      {variant === 'full' && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="yb-btn yb-btn-primary yb-btn-sm" onClick={handleNewGame}>
            {t('newGame')}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleUndo} disabled={history.length <= 1 || thinking}>
            <ArrowCounterClockwise size={14} />
            {t('undo')}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handlePass} disabled={disabled}>
            {passLabel}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleHint}>
            <Lightbulb size={14} />
            {hintLabel}
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
            onChange={e => setDifficulty(e.target.value as GoDifficulty)}
            disabled={game.moveNumber > 0}
            aria-label={t('difficulty')}
          >
            {DIFFICULTIES.map(d => (
              <option key={d.value} value={d.value}>
                {t(d.label)}
              </option>
            ))}
          </select>
          <select
            className="yb-btn yb-btn-ghost yb-btn-sm"
            value={size}
            onChange={e => setSize(Number(e.target.value) as GoBoardSize)}
            disabled={game.moveNumber > 0}
            aria-label={boardSizeLabel}
          >
            {SIZES.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
