/**
 * 棋盘 —— 纯 SVG，服务端可直出（ADR-010：首屏静态 SVG 先出，引擎懒加载）。
 * 所有颜色走 --board-* / --stone-* Token，组件内零裸 hex。
 * 支持可变尺寸（9/13/15/19）：边长从 cells 长度反推，或由 size prop 显式指定（默认 15）。
 */

import { toNotation, type Point } from '@/lib/engine/board';

const STEP = 40;
const PAD = 30;

/** 星位 / 天元：按尺寸给标准点位，奇数边长的中心天元始终在。 */
function starIndexesFor(size: number): number[] {
  if (size === 9) return [2, 4, 6];
  if (size === 13) return [3, 6, 9];
  if (size === 15) return [3, 7, 11];
  return [Math.floor(size / 2)];
}

export type BoardTheme = 'ink' | 'kaya' | 'slate';

export interface BoardProps {
  cells: readonly number[];
  /** 棋盘边长；缺省从 cells.length 反推（空盘默认 15） */
  size?: number;
  lastMove?: Point | null;
  winningLine?: readonly Point[] | null;
  theme?: BoardTheme;
  /** 引擎建议的落子点（hint 功能）：空点位上画一圈青色虚线环 */
  hintMove?: Point | null;
  /** 传入则棋盘可交互；不传则纯展示（首屏 SEO 直出用这个） */
  onPlay?: (x: number, y: number) => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
}

function cx(i: number): number {
  return PAD + i * STEP;
}

export function Board({
  cells,
  size: sizeProp,
  lastMove = null,
  winningLine = null,
  hintMove = null,
  theme = 'ink',
  onPlay,
  disabled = false,
  ariaLabel,
  className,
}: BoardProps) {
  const size =
    sizeProp ?? (cells.length > 0 ? Math.round(Math.sqrt(cells.length)) : 15);
  const VIEW = (size - 1) * STEP + PAD * 2;
  const STONE_R = (STEP * 0.86) / 2;
  const STAR_INDEXES = starIndexesFor(size);
  const interactive = Boolean(onPlay) && !disabled;
  const lines = Array.from({ length: size }, (_, i) => i);
  const isStar = (x: number, y: number) =>
    STAR_INDEXES.includes(x) && STAR_INDEXES.includes(y);

  return (
    <div
      data-board={theme}
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
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        width="100%"
        height="100%"
        role="img"
        aria-label={ariaLabel}
        style={{ display: 'block', touchAction: 'manipulation' }}
      >
        {/* 格律：横竖各 size 条 1px 线 */}
        <g stroke="var(--board-line)" strokeWidth={1.2} shapeRendering="crispEdges">
          {lines.map((i) => (
            <line key={`h${i}`} x1={cx(0)} y1={cx(i)} x2={cx(size - 1)} y2={cx(i)} />
          ))}
          {lines.map((i) => (
            <line key={`v${i}`} x1={cx(i)} y1={cx(0)} x2={cx(i)} y2={cx(size - 1)} />
          ))}
        </g>

        {/* 盘沿：外框略粗 */}
        <rect
          x={cx(0)}
          y={cx(0)}
          width={(size - 1) * STEP}
          height={(size - 1) * STEP}
          fill="none"
          stroke="var(--board-edge)"
          strokeWidth={2}
          shapeRendering="crispEdges"
        />

        {/* 星位 / 天元 */}
        <g fill="var(--board-star)">
          {STAR_INDEXES.flatMap((x) =>
            STAR_INDEXES.map((y) =>
              isStar(x, y) ? <circle key={`s${x}-${y}`} cx={cx(x)} cy={cx(y)} r={3.4} /> : null,
            ),
          )}
        </g>

        {/* 棋子 */}
        <g>
          {cells.map((cell, i) => {
            if (cell === 0) return null;
            const x = i % size;
            const y = Math.floor(i / size);
            const black = cell === 1;
            const isLast = lastMove?.x === x && lastMove?.y === y;

            return (
              <g key={`p${i}`} className={isLast ? 'yb-stone-enter' : undefined}>
                <circle
                  cx={cx(x)}
                  cy={cx(y)}
                  r={STONE_R}
                  fill={black ? 'var(--stone-black)' : 'var(--stone-white)'}
                  stroke={black ? 'var(--stone-black-edge)' : 'var(--stone-white-edge)'}
                  strokeWidth={1}
                />
                <circle
                  cx={cx(x) - STONE_R * 0.3}
                  cy={cx(y) - STONE_R * 0.32}
                  r={STONE_R * 0.28}
                  fill={black ? 'var(--stone-black-spec)' : 'var(--stone-white-spec)'}
                />
              </g>
            );
          })}
        </g>

        {/* 最后一手：朱环（形 + 色双编码，不只靠颜色） */}
        {lastMove ? (
          <circle
            cx={cx(lastMove.x)}
            cy={cx(lastMove.y)}
            r={STONE_R * 0.42}
            fill="none"
            stroke="var(--move-last)"
            strokeWidth={2.4}
          />
        ) : null}

        {/* 引擎建议落子：青色虚线环（hint）。仅空点显示，让用户知道该下哪。 */}
        {hintMove ? (
          (() => {
            const i = hintMove.y * size + hintMove.x;
            if (cells[i] !== 0) return null;
            return (
              <circle
                cx={cx(hintMove.x)}
                cy={cx(hintMove.y)}
                r={STONE_R * 0.62}
                fill="none"
                stroke="var(--move-hint)"
                strokeWidth={2.6}
                strokeDasharray="5 4"
              />
            );
          })()
        ) : null}

        {/* 连珠线：朱砂实线贯穿 */}
        {winningLine && winningLine.length >= 2 ? (
          <line
            x1={cx(winningLine[0]!.x)}
            y1={cx(winningLine[0]!.y)}
            x2={cx(winningLine[winningLine.length - 1]!.x)}
            y2={cx(winningLine[winningLine.length - 1]!.y)}
            stroke="var(--move-win)"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.9}
          />
        ) : null}

        {/* 交互热区：只对空点生成，键盘可达 */}
        {interactive ? (
          <g>
            {cells.map((cell, i) => {
              if (cell !== 0) return null;
              const x = i % size;
              const y = Math.floor(i / size);
              return (
                <rect
                  key={`t${i}`}
                  x={cx(x) - STEP / 2}
                  y={cx(y) - STEP / 2}
                  width={STEP}
                  height={STEP}
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={toNotation(x, y, size)}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onPlay?.(x, y)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onPlay?.(x, y);
                    }
                  }}
                />
              );
            })}
          </g>
        ) : null}
      </svg>
    </div>
  );
}
