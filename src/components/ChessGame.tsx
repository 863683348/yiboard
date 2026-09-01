/** 弈界 YiBoard — 国际象棋对局组件（人机对战，玩家执白） */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, Flag, Lightbulb, ShareNetwork } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

import { ChessBoard } from '@/components/ChessBoard';
import {
  createGame,
  legalMoves,
  applyMove,
  undoTargetIndex,
  legalTargetsFrom,
  type ChessState,
  type ChessColor,
  type ChessMove,
  type ChessDifficulty,
} from '@/lib/engine/chess';
import { bestMove } from '@/lib/engine/chess/ai';

const DIFFICULTIES: ReadonlyArray<{ value: ChessDifficulty; label: string }> = [
  { value: 'novice', label: 'difficultyNovice' },
  { value: 'gentle', label: 'difficultyGentle' },
  { value: 'steady', label: 'difficultySteady' },
  { value: 'sharp', label: 'difficultySharp' },
];

const PLAYER: ChessColor = 'white';
const AI: ChessColor = 'black';

export interface ChessGameProps {
  locale: string;
  variant?: 'hero' | 'full';
  initialDifficulty?: ChessDifficulty;
}

export default function ChessGame({
  locale,
  variant = 'full',
  initialDifficulty = 'steady',
}: ChessGameProps) {
  const t = useTranslations('play');
  const isZh = locale === 'zh';
  const [difficulty, setDifficulty] = useState<ChessDifficulty>(initialDifficulty);
  const [game, setGame] = useState<ChessState>(() => createGame());
  const [selected, setSelected] = useState<number | null>(null);
  const [legalTargets, setLegalTargets] = useState<number[] | null>(null);
  const [thinking, setThinking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<ChessState[]>(() => [createGame()]);
  const aiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNewGame = useCallback(() => {
    const g = createGame();
    setGame(g);
    setHistory([g]);
    setSelected(null);
    setLegalTargets(null);
    setThinking(false);
  }, []);

  useEffect(() => {
    handleNewGame();
  }, [handleNewGame]);

  const handleSelect = useCallback((i: number) => {
    if (game.turn !== PLAYER || (game.status !== 'playing' && game.status !== 'check') || thinking) return;
    const cell = game.board[i];
    if (!cell || cell.color !== PLAYER) return;
    if (selected === i) {
      setSelected(null);
      setLegalTargets(null);
      return;
    }
    setSelected(i);
    setLegalTargets(legalTargetsFrom(game, i));
  }, [game, selected, thinking]);

  const handlePlay = useCallback((to: number) => {
    if (selected === null) return;
    const move = legalMoves(game, PLAYER).find((m) => m.from === selected && m.to === to);
    if (!move) return;
    const next = applyMove(game, move);
    setGame(next);
    setHistory((h) => [...h, next]);
    setSelected(null);
    setLegalTargets(null);
  }, [game, selected]);

  useEffect(() => {
    if (game.turn !== AI || (game.status !== 'playing' && game.status !== 'check') || variant !== 'full') return;
    setThinking(true);
    aiTimer.current = setTimeout(() => {
      const move: ChessMove | null = bestMove(game, AI, difficulty);
      if (move) {
        const next = applyMove(game, move);
        setGame(next);
        setHistory((h) => [...h, next]);
      }
      setThinking(false);
    }, 400);
    return () => {
      if (aiTimer.current) clearTimeout(aiTimer.current);
    };
  }, [game, difficulty, variant]);

  const handleUndo = useCallback(() => {
    if (history.length <= 1) return;
    const next = history.slice(0, undoTargetIndex(history.map((h) => h.turn)));
    const snap = next[next.length - 1]!;
    setHistory(next);
    setGame(snap);
    setSelected(null);
    setLegalTargets(null);
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

  const handleResign = () => {
    setGame((g) => ({ ...g, status: 'checkmate', winner: AI }));
  };

  const handleHint = () => {
    const move = bestMove(game, PLAYER, difficulty);
    if (move) {
      setSelected(move.from);
      setLegalTargets([move.to]);
    }
  };

  const moveCount = history.length - 1;
  const handleShare = () => {
    const text = isZh
      ? `我在 YiBoard 刚下完一局国际象棋！第 ${moveCount} 手。`
      : `I just played Chess on YiBoard! Move ${moveCount}.`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const disabled = thinking || (game.status !== 'playing' && game.status !== 'check');

  const statusText = () => {
    if (game.status === 'checkmate') {
      return game.winner === PLAYER
        ? isZh ? '白方（你）将杀获胜！' : 'White (you) wins by checkmate!'
        : isZh ? '黑方将杀获胜！' : 'Black wins by checkmate!';
    }
    if (game.status === 'stalemate' || game.status === 'draw') {
      return isZh ? '和棋' : 'Draw';
    }
    if (game.inCheck) {
      return game.turn === PLAYER
        ? isZh ? '白方被将军！' : 'White is in check!'
        : isZh ? '黑方被将军！' : 'Black is in check!';
    }
    return game.turn === PLAYER
      ? isZh ? '该你落子（白方）' : t('turnYours')
      : isZh ? '黑方思考中…' : t('turnTheirs');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <ChessBoard
        board={game.board}
        lastMove={game.lastMove}
        selected={selected}
        legalTargets={legalTargets}
        onPlay={selected !== null ? handlePlay : handleSelect}
        disabled={disabled}
        ariaLabel={isZh ? '国际象棋棋盘' : 'Chess board'}
        className="yb-board"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontWeight: 'var(--weight-emphasis)' }}>{statusText()}</span>
          {thinking && <span style={{ color: 'var(--fg-2)', fontSize: 'var(--text-sm)' }}>⏳</span>}
        </div>
        <span className="yb-meta">{t('moveCount', { count: moveCount })}</span>
      </div>

      {variant === 'full' && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="yb-btn yb-btn-primary yb-btn-sm" onClick={handleNewGame}>
            {t('newGame')}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleUndo} disabled={history.length <= 1 || thinking} title={t('undoHint')} aria-label={t('undoHint')}>
            <ArrowCounterClockwise size={14} />
            {t('undo')}
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
            onChange={(e) => setDifficulty(e.target.value as ChessDifficulty)}
            disabled={history.length > 1}
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
