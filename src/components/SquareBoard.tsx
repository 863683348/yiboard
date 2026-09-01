/** 弈界 YiBoard — 方形格棋盘（SVG），黑白棋 / 国际象棋复用 */

import type { ReactNode } from 'react';

interface SquareBoardProps {
  size: number;
  onPlay?: (index: number) => void;
  disabled?: boolean;
  lastMove?: number | null;
  validMoves?: ReadonlySet<number>;
  ariaLabel: string;
  className?: string;
  /** 返回落在第 i 格中心的 SVG 内容（棋子图形），坐标为格中心 (cx, cy) 与格子边长 cell */
  renderCell?: (i: number, cx: number, cy: number, cell: number) => ReactNode;
}

const PADDING = 14;
const GAP = 3;
const CELL = 46;

export function SquareBoard({
  size,
  onPlay,
  disabled = false,
  lastMove = null,
  validMoves,
  ariaLabel,
  className,
  renderCell,
}: SquareBoardProps) {
  const interactive = Boolean(onPlay) && !disabled;
  const boardPx = PADDING * 2 + size * CELL + (size - 1) * GAP;

  return (
    <div
      data-board="square"
      className={className}
      style={{
        width: '100%',
        maxWidth: 'var(--board-max)',
        aspectRatio: '1 / 1',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--board-frame)',
        background: 'var(--board-surface)',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={`0 0 ${boardPx} ${boardPx}`}
        width="100%"
        height="100%"
        role="img"
        aria-label={ariaLabel}
        style={{ display: 'block', touchAction: 'manipulation' }}
      >
        {Array.from({ length: size * size }, (_, i) => {
          const x = i % size;
          const y = Math.floor(i / size);
          const px = PADDING + x * (CELL + GAP);
          const py = PADDING + y * (CELL + GAP);
          const cx = px + CELL / 2;
          const cy = py + CELL / 2;
          const isLast = lastMove === i;
          const isValid = validMoves?.has(i);
          return (
            <g key={i}>
              <rect
                x={px}
                y={py}
                width={CELL}
                height={CELL}
                rx={4}
                fill="var(--board-square, #2f6b46)"
                stroke="var(--board-line)"
                strokeWidth={1}
              />
              {isValid && (
                <circle cx={cx} cy={cy} r={6} fill="var(--accent)" opacity={0.45} />
              )}
              {isLast && (
                <rect x={px} y={py} width={CELL} height={CELL} rx={4} fill="none" stroke="var(--move-last)" strokeWidth={3} />
              )}
              {renderCell?.(i, cx, cy, CELL)}
              {interactive && (
                <rect
                  x={px}
                  y={py}
                  width={CELL}
                  height={CELL}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onPlay?.(i)}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
