/** 弈界 YiBoard — 象棋棋盘（SVG，带河界和九宫格） */

import type { Cell, XQBoard, XQColor } from '@/lib/engine/xiangqi/types'
import { PIECE_UNICODE, XQ_ROWS, XQ_COLS, XQ_SIZE, idx } from '@/lib/engine/xiangqi/types'

const STEP = 56
const PAD = 36

function cx(i: number): number { return PAD + i * STEP }
function cy(i: number): number { return PAD + i * STEP }

function isPalace(x: number, y: number, color: XQColor): boolean {
  const minY = color === 'red' ? 7 : 0
  return x >= 3 && x <= 5 && y >= minY && y <= minY + 2
}

function isRiver(x: number, y: number): boolean {
  return y === 4 || y === 5
}

export interface XiangqiBoardProps {
  board: XQBoard
  lastMove?: { from: number; to: number } | null
  selected?: number | null
  legalTargets?: number[] | null
  onPlay?: (i: number) => void
  disabled?: boolean
  ariaLabel: string
  className?: string
}

export function XiangqiBoard({
  board,
  lastMove = null,
  selected = null,
  legalTargets = null,
  onPlay,
  disabled = false,
  ariaLabel,
  className,
}: XiangqiBoardProps) {
  const interactive = Boolean(onPlay) && !disabled
  const viewW = (XQ_COLS - 1) * STEP + PAD * 2
  const viewH = (XQ_ROWS - 1) * STEP + PAD * 2

  const lastFrom = lastMove?.from ?? -1
  const lastTo = lastMove?.to ?? -1
  const isLast = (i: number) => i === lastFrom || i === lastTo

  return (
    <div
      data-board="xiangqi"
      className={className}
      style={{
        width: '100%',
        maxWidth: 'var(--board-max)',
        aspectRatio: `${XQ_COLS} / ${XQ_ROWS}`,
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--board-frame)',
        background: 'var(--board-surface)',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        width="100%"
        height="100%"
        role="img"
        aria-label={ariaLabel}
        style={{ display: 'block', touchAction: 'manipulation' }}
      >
        {/* 河界文字 */}
        <text
          x={viewW / 2}
          y={(cy(4) + cy(5)) / 2 + 6}
          textAnchor="middle"
          fill="var(--board-line)"
          fontSize={14}
          fontFamily="serif"
          style={{ userSelect: 'none' }}
        >
          楚河 漢界
        </text>

        {/* 横线 */}
        <g stroke="var(--board-line)" strokeWidth={1.2} shapeRendering="crispEdges">
          {Array.from({ length: XQ_ROWS }, (_, y) => (
            <line key={`h${y}`} x1={cx(0)} y1={cy(y)} x2={cx(XQ_COLS - 1)} y2={cy(y)} />
          ))}
        </g>

        {/* 竖线（河界断开） */}
        <g stroke="var(--board-line)" strokeWidth={1.2} shapeRendering="crispEdges">
          {Array.from({ length: XQ_COLS }, (_, x) => (
            <g key={`v${x}`}>
              <line x1={cx(x)} y1={cy(0)} x2={cx(x)} y2={cy(4)} />
              <line x1={cx(x)} y1={cy(5)} x2={cx(x)} y2={cy(9)} />
            </g>
          ))}
        </g>

        {/* 外框略粗 */}
        <rect
          x={cx(0)} y={cy(0)}
          width={(XQ_COLS - 1) * STEP} height={(XQ_ROWS - 1) * STEP}
          fill="none" stroke="var(--board-edge)" strokeWidth={2} shapeRendering="crispEdges"
        />

        {/* 九宫格斜线 */}
        <g stroke="var(--board-line)" strokeWidth={1} shapeRendering="crispEdges">
          {/* 红方（下） */}
          <line x1={cx(3)} y1={cy(7)} x2={cx(5)} y2={cy(9)} />
          <line x1={cx(5)} y1={cy(7)} x2={cx(3)} y2={cy(9)} />
          {/* 黑方（上） */}
          <line x1={cx(3)} y1={cy(0)} x2={cx(5)} y2={cy(2)} />
          <line x1={cx(5)} y1={cy(0)} x2={cx(3)} y2={cy(2)} />
        </g>

        {/* 边角标记（马腿/象眼提示） */}
        <g fill="var(--board-star)" opacity={0.5}>
          {([2,6] as number[]).flatMap(y =>
            ([1,3,5,7] as number[]).flatMap(x =>
              <circle key={`m${x}-${y}`} cx={cx(x)} cy={cy(y)} r={2} />
            )
          )}
        </g>

        {/* 棋子 */}
        {board.map((cell, i) => {
          if (cell === null) return null
          const x = i % XQ_COLS
          const y = Math.floor(i / XQ_COLS)
          const isSel = selected === i
          const isSelected = isSel
          const isLegal = legalTargets?.includes(i) ?? false
          const isLastPos = isLast(i)
          const { red, black } = PIECE_UNICODE[cell.type as keyof typeof PIECE_UNICODE]
          const symbol = cell.color === 'red' ? red : black
          const pieceColor = cell.color === 'red' ? 'var(--piece-red)' : 'var(--piece-black)'
          const pieceBg = cell.color === 'red' ? 'var(--piece-red-bg)' : 'var(--piece-black-bg)'
          const pieceBorder = cell.color === 'red' ? 'var(--piece-red-border)' : 'var(--piece-black-border)'

          return (
            <g
              key={`p${i}`}
              className={isLastPos ? 'yb-stone-enter' : undefined}
              style={{ cursor: interactive && cell.color === 'red' ? 'pointer' : 'default' }}
              onClick={() => {
                if (!interactive || disabled) return
                if (cell.color !== 'red') return
                if (isLegal || selected === i) onPlay?.(i)
                else if (cell) { /* select this piece */ }
              }}
            >
              {/* 棋子底色圆 */}
              <circle
                cx={cx(x)} cy={cy(y)} r={STEP * 0.42}
                fill={pieceBg}
                stroke={pieceBorder}
                strokeWidth={1.5}
              />
              {/* 棋子文字 */}
              <text
                x={cx(x)} y={cy(y)}
                textAnchor="middle"
                dominantBaseline="central"
                fill={pieceColor}
                fontSize={STEP * 0.38}
                fontFamily="serif"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {symbol}
              </text>
              {/* 选中高亮环 */}
              {isSelected ? (
                <circle
                  cx={cx(x)} cy={cy(y)} r={STEP * 0.46}
                  fill="none"
                  stroke="var(--move-last)"
                  strokeWidth={2.8}
                />
              ) : null}
              {/* 合法目标点提示 */}
              {isLegal ? (
                <circle
                  cx={cx(x)} cy={cy(y)} r={STEP * 0.18}
                  fill="var(--move-hint)"
                  opacity={0.7}
                />
              ) : null}
            </g>
          )
        })}

        {/* 交互热区（仅红方可点击） */}
        {interactive ? (
          <g>
            {board.map((cell, i) => {
              if (!cell || cell.color !== 'red') return null
              const x = i % XQ_COLS
              const y = Math.floor(i / XQ_COLS)
              return (
                <circle
                  key={`t${i}`}
                  cx={cx(x)} cy={cy(y)}
                  r={STEP * 0.44}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onPlay?.(i)}
                />
              )
            })}
          </g>
        ) : null}
      </svg>
    </div>
  )
}
