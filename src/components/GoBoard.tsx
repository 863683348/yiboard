/** 弈界 YiBoard — 围棋棋盘（SVG） */

import type { GoBoard as GoBoardType, GoBoardSize, GoMove } from '@/lib/engine/go';

interface GoBoardProps {
  board: GoBoardType;
  size: GoBoardSize;
  lastMove?: GoMove | null;
  onPlay?: (x: number, y: number) => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
}

const STAR_POINTS: Record<GoBoardSize, [number, number][]> = {
  9: [[2, 2], [2, 6], [4, 4], [6, 2], [6, 6]],
  13: [[3, 3], [3, 9], [6, 6], [9, 3], [9, 9]],
  19: [[3, 3], [3, 9], [3, 15], [9, 3], [9, 9], [9, 15], [15, 3], [15, 9], [15, 15]],
};

export function GoBoard({
  board,
  size,
  lastMove = null,
  onPlay,
  disabled = false,
  ariaLabel,
  className,
}: GoBoardProps) {
  const interactive = Boolean(onPlay) && !disabled;
  const padding = 24;
  const cell = 26;
  const viewBox = padding * 2 + cell * (size - 1);

  const coordLabel = (n: number) => {
    // 横坐标：A-T（跳过 I）
    const letters = 'ABCDEFGHJKLMNOPQRST';
    return letters[n] ?? '';
  };

  return (
    <div
      data-board="go"
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
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        width="100%"
        height="100%"
        role="img"
        aria-label={ariaLabel}
        style={{ display: 'block', touchAction: 'manipulation' }}
      >
        {/* 横线 */}
        <g stroke="var(--board-line)" strokeWidth={1} shapeRendering="crispEdges">
          {Array.from({ length: size }, (_, y) => (
            <line
              key={`h${y}`}
              x1={padding}
              y1={padding + y * cell}
              x2={padding + (size - 1) * cell}
              y2={padding + y * cell}
            />
          ))}
        </g>
        {/* 竖线 */}
        <g stroke="var(--board-line)" strokeWidth={1} shapeRendering="crispEdges">
          {Array.from({ length: size }, (_, x) => (
            <line
              key={`v${x}`}
              x1={padding + x * cell}
              y1={padding}
              x2={padding + x * cell}
              y2={padding + (size - 1) * cell}
            />
          ))}
        </g>
        {/* 外框 */}
        <rect
          x={padding}
          y={padding}
          width={(size - 1) * cell}
          height={(size - 1) * cell}
          fill="none"
          stroke="var(--board-edge)"
          strokeWidth={2}
          shapeRendering="crispEdges"
        />
        {/* 星位 */}
        <g fill="var(--board-star)">
          {STAR_POINTS[size].map(([x, y]) => (
            <circle
              key={`star-${x}-${y}`}
              cx={padding + x * cell}
              cy={padding + y * cell}
              r={3}
            />
          ))}
        </g>
        {/* 坐标 */}
        <g fill="var(--board-coord)" fontSize={10} fontFamily="var(--font-mono)" style={{ userSelect: 'none' }}>
          {Array.from({ length: size }, (_, i) => (
            <text key={`xc${i}`} x={padding + i * cell} y={padding - 8} textAnchor="middle">
              {coordLabel(i)}
            </text>
          ))}
          {Array.from({ length: size }, (_, i) => (
            <text key={`yc${i}`} x={padding - 10} y={padding + i * cell + 3} textAnchor="middle">
              {size - i}
            </text>
          ))}
        </g>
        {/* 棋子 */}
        {board.map((stone, i) => {
          if (stone === null) return null;
          const x = i % size;
          const y = Math.floor(i / size);
          const cx = padding + x * cell;
          const cy = padding + y * cell;
          const isLast = lastMove?.type === 'place' && lastMove.x === x && lastMove.y === y;
          const fill = stone === 'black' ? 'var(--stone-black)' : 'var(--stone-white)';
          const stroke = stone === 'black' ? 'var(--stone-black-edge)' : 'var(--stone-white-edge)';
          return (
            <g key={`s${i}`}>
              <circle
                cx={cx}
                cy={cy}
                r={cell * 0.42}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
                style={{ filter: 'drop-shadow(var(--stone-shadow))' }}
              />
              {isLast && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={cell * 0.48}
                  fill="none"
                  stroke="var(--move-last)"
                  strokeWidth={2}
                />
              )}
            </g>
          );
        })}
        {/* 交互热区 */}
        {interactive && (
          <g>
            {Array.from({ length: size }, (_, y) =>
              Array.from({ length: size }, (_, x) => {
                const cx = padding + x * cell;
                const cy = padding + y * cell;
                return (
                  <circle
                    key={`t-${x}-${y}`}
                    cx={cx}
                    cy={cy}
                    r={cell * 0.45}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onPlay?.(x, y)}
                  />
                );
              })
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
