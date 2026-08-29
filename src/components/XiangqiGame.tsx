/** 弈界 YiBoard — 象棋对局组件（MVP V1：人机对战） */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowCounterClockwise, Flag, Lightbulb, ShareNetwork } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

import { XiangqiBoard } from '@/components/XiangqiBoard'
import {
  createBoard,
  legalMoves,
  gameStatus,
  applyMove,
  undoTargetIndex,
  cloneBoard,
  type XQBoard,
  type XQColor,
  type XQMove,
  type XQDifficulty,
} from '@/lib/engine/xiangqi'
import { bestMove } from '@/lib/engine/xiangqi/ai'
import type { GameStatus } from '@/lib/engine/xiangqi'

const DIFFICULTIES: ReadonlyArray<{ value: XQDifficulty; label: string }> = [
  { value: 'novice', label: 'difficultyNovice' },
  { value: 'gentle', label: 'difficultyGentle' },
  { value: 'steady', label: 'difficultySteady' },
  { value: 'sharp', label: 'difficultySharp' },
]

/** 历史快照：每次落子后记录完整局面，用于悔棋还原 */
interface XQSnapshot {
  board: XQBoard
  turn: XQColor
  status: 'playing' | 'check' | 'checkmate' | 'stalemate'
  winner: XQColor | null
  lastMove: XQMove | null
}

export interface XiangqiGameProps {
  variant?: 'hero' | 'full'
  initialDifficulty?: XQDifficulty
}

export default function XiangqiGame({
  variant = 'full',
  initialDifficulty = 'steady',
}: XiangqiGameProps) {
  const t = useTranslations('play')
  const [difficulty, setDifficulty] = useState<XQDifficulty>(initialDifficulty)
  const [board, setBoard] = useState<XQBoard>(createBoard)
  const [turn, setTurn] = useState<XQColor>('red')
  const [status, setStatus] = useState<'playing' | 'check' | 'checkmate' | 'stalemate'>('playing')
  const [winner, setWinner] = useState<XQColor | null>(null)
  const [lastMove, setLastMove] = useState<XQMove | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [legalTargets, setLegalTargets] = useState<number[] | null>(null)
  const [thinking, setThinking] = useState(false)
  const [history, setHistory] = useState<XQSnapshot[]>(() => [
    { board: createBoard(), turn: 'red', status: 'playing', winner: null, lastMove: null },
  ])
  const moveCount = history.length - 1
  const [copied, setCopied] = useState(false)
  const aiTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSelect = useCallback((i: number) => {
    const cell = board[i]
    if (!cell || cell.color !== 'red') return
    if (selected === i) {
      setSelected(null)
      setLegalTargets(null)
      return
    }
    setSelected(i)
    const moves = legalMoves(board, 'red').filter(m => m.from === i)
    setLegalTargets(moves.map(m => m.to))
  }, [board, selected])

  const handlePlay = useCallback((to: number) => {
    if (selected === null) return
    const move = legalMoves(board, 'red').find(m => m.from === selected && m.to === to)
    if (!move) return

    const result = applyMove({ board, turn: 'red' }, move)
    const { status: s, winner: w } = gameStatus(result.board, 'black')
    setBoard(result.board)
    setLastMove(move)
    setSelected(null)
    setLegalTargets(null)
    setTurn(result.turn)
    setStatus(s as 'playing' | 'check' | 'checkmate' | 'stalemate')
    if (w) setWinner(w)
    setHistory(h => [...h, { board: result.board, turn: result.turn, status: s as 'playing' | 'check' | 'checkmate' | 'stalemate', winner: w ?? null, lastMove: move }])
  }, [board, selected])

  // AI responds to black's turn
  useEffect(() => {
    if (turn !== 'black' || status === 'checkmate' || status === 'stalemate' || variant !== 'full') return
    setThinking(true)
    aiTimer.current = setTimeout(() => {
      const move = bestMove(board, 'black', difficulty)
      if (move) {
        const result = applyMove({ board, turn: 'black' }, move)
        const { status: s, winner: w } = gameStatus(result.board, 'red')
        setBoard(result.board)
        setLastMove(move)
        setTurn(result.turn)
        setStatus(s as 'playing' | 'check' | 'checkmate' | 'stalemate')
        if (w) setWinner(w)
        setHistory(h => [...h, { board: result.board, turn: result.turn, status: s as 'playing' | 'check' | 'checkmate' | 'stalemate', winner: w ?? null, lastMove: move }])
      }
      setThinking(false)
    }, 400)
    return () => { if (aiTimer.current) clearTimeout(aiTimer.current) }
  }, [turn, status, board, difficulty, variant])

  const handleNewGame = () => {
    const b = createBoard()
    setBoard(b); setTurn('red'); setStatus('playing')
    setWinner(null); setLastMove(null); setSelected(null)
    setLegalTargets(null)
    setHistory([{ board: b, turn: 'red', status: 'playing', winner: null, lastMove: null }])
  }

  const handleUndo = () => {
    if (history.length <= 1) return
    // 撤回到上一个玩家行棋点：同时撤销玩家上一步 + AI 的应手（若 AI 还没应手则连这一步一起撤）
    const next = history.slice(0, undoTargetIndex(history.map(h => h.turn)))
    const snap = next[next.length - 1]!
    setHistory(next)
    setBoard(snap.board)
    setTurn(snap.turn)
    setStatus(snap.status)
    setWinner(snap.winner)
    setLastMove(snap.lastMove)
    setSelected(null)
    setLegalTargets(null)
  }

  const handleResign = () => {
    setStatus('checkmate')
    setWinner('black')
  }

  const handleHint = () => {
    const move = bestMove(board, 'red', difficulty)
    if (move) setLegalTargets([move.to])
  }

  const handleShare = () => {
    const text = `I just played Xiangqi on YiBoard! Move ${moveCount}.`
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const disabled = thinking || (status !== 'playing' && status !== 'check')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <XiangqiBoard
        board={board}
        lastMove={lastMove}
        selected={selected}
        legalTargets={legalTargets}
        onPlay={selected !== null ? handlePlay : handleSelect}
        disabled={disabled}
        ariaLabel="Chinese chess board"
        className="yb-board"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {status === 'check' && (
            <span style={{ color: 'var(--danger)', fontWeight: 'var(--weight-emphasis)' }}>
              {turn === 'red' ? 'Red is in check!' : 'Black is in check!'}
            </span>
          )}
          {status === 'checkmate' && (
            <span style={{ color: 'var(--accent)', fontWeight: 'var(--weight-emphasis)' }}>
              {winner === 'red' ? 'Red wins by checkmate!' : 'Black wins by checkmate!'}
            </span>
          )}
          {status === 'stalemate' && (
            <span style={{ color: 'var(--fg-2)', fontWeight: 'var(--weight-emphasis)' }}>
              Stalemate — draw!
            </span>
          )}
          {(status === 'playing' || status === 'check') && (
            <span style={{ fontWeight: 'var(--weight-emphasis)' }}>
              {turn === 'red' ? 'Red to move' : 'Black is thinking...'}
            </span>
          )}
          {thinking && <span style={{ color: 'var(--fg-2)', fontSize: 'var(--text-sm)' }}>⏳</span>}
        </div>
        <span className="yb-meta">{t('moveCount', { count: moveCount })}</span>
      </div>

      {variant === 'full' ? (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button className="yb-btn yb-btn-primary yb-btn-sm" onClick={handleNewGame}>
            {t('newGame')}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleUndo} disabled={history.length <= 1}>
            <ArrowCounterClockwise size={14} />
            {t('undo')}
          </button>
          <button className="yb-btn yb-btn-ghost yb-btn-sm" onClick={handleHint}>
            <Lightbulb size={14} />
            {t('hint')}
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
            onChange={e => setDifficulty(e.target.value as XQDifficulty)}
            disabled={history.length > 1}
            aria-label={t('difficulty')}
          >
            {DIFFICULTIES.map(d => (
              <option key={d.value} value={d.value}>{t(d.label)}</option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  )
}
