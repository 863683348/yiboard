/** 弈界 YiBoard — 国际象棋棋盘（SVG，双色格 + 坐标 + 高亮） */

import type { ChessBoard, ChessColor, ChessMove } from '@/lib/engine/chess/types';
import { PIECE_UNICODE, FILE_LETTERS, idx, xy } from '@/lib/engine/chess/types';

const SQUARE = 62;
const PAD = 20;

const LIGHT = '#f0d9b5';
const DARK = '#b58863';

interface ChessBoardProps {
  board: ChessBoard;
  lastMove?: ChessMove | null;
  selected?: number | null;
  legalTargets?: number[] | null;
  onPlay?: (i: number) => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
}

export function ChessBoard({
  board,
  lastMove = null,
  selected = null,
  legalTargets = null,
  onPlay,
  disabled = false,
  ariaLabel,
  className,
}: ChessBoardProps) {
  const interactive = Boolean(onPlay) && !disabled;
  const sizePx = PAD * 2 + SQUARE * 8;

  const lastFrom = lastMove?.from ?? -1;
  const lastTo = lastMove?.to ?? -1;
  const isLast = (i: number) => i === lastFrom || i === lastTo;
  const isTarget = (i: number) => legalTargets?.includes(i) ?? false;

  return (
    <div
      data-board="chess"
      className={className}
      style={{
        width: '100%',
        maxWidth: 'var(--board-max)',
        aspectRatio: '1 / 1',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--board-frame)',
        background: '#2b2b2b',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={`0 0 ${sizePx} ${sizePx}`}
        width="100%"
        height="100%"
        role="img"
        aria-label={ariaLabel}
        style={{ display: 'block', touchAction: 'manipulation' }}
      >
        {Array.from({ length: 8 }, (_, row) => {
          const y = 7 - row; // 渲染从顶行（黑方）到底行（白方）
          return Array.from({ length: 8 }, (_, x) => {
            const i = idx(x, y);
            const px = PAD + x * SQUARE;
            const py = PAD + row * SQUARE;
            const light = (x + y) % 2 === 1;
            const cell = board[i];
            const isSel = selected === i;
            const isTgt = isTarget(i);
            const isLastPos = isLast(i);
            const isCaptureTarget = isTgt && cell !== null;

            return (
              <g key={i}>
                <rect x={px} y={py} width={SQUARE} height={SQUARE} fill={light ? LIGHT : DARK} />
                {row === 7 && (
                  <text
                    x={px + SQUARE - 4}
                    y={py + SQUARE - 4}
                    textAnchor="end"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    fill={light ? DARK : LIGHT}
                    opacity={0.7}
                    style={{ userSelect: 'none' }}
                  >
                    {FILE_LETTERS[x]}
                  </text>
                )}
                {x === 0 && (
                  <text
                    x={px + 3}
                    y={py + 13}
                    textAnchor="start"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    fill={light ? DARK : LIGHT}
                    opacity={0.7}
                    style={{ userSelect: 'none' }}
                  >
                    {y + 1}
                  </text>
                )}
                {cell ? (
                  <ChessPieceGlyph x={px} y={py} color={cell.color} type={cell.type} />
                ) : null}
                {isSel && (
                  <rect x={px} y={py} width={SQUARE} height={SQUARE} fill="none" stroke="var(--move-last)" strokeWidth={3} />
                )}
                {isLastPos && !isSel && (
                  <rect x={px} y={py} width={SQUARE} height={SQUARE} fill="var(--move-last)" opacity={0.28} />
                )}
                {isTgt && !isCaptureTarget && (
                  <circle cx={px + SQUARE / 2} cy={py + SQUARE / 2} r={SQUARE * 0.16} fill="var(--move-hint)" opacity={0.7} />
                )}
                {isCaptureTarget && (
                  <circle cx={px + SQUARE / 2} cy={py + SQUARE / 2} r={SQUARE * 0.42} fill="none" stroke="var(--move-hint)" strokeWidth={3} opacity={0.8} />
                )}
                {interactive && (
                  <rect
                    x={px}
                    y={py}
                    width={SQUARE}
                    height={SQUARE}
                    fill="transparent"
                    style={{ cursor: isTgt || cell?.color === 'white' ? 'pointer' : 'default' }}
                    onClick={() => onPlay?.(i)}
                  />
                )}
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}

function ChessPieceGlyph({ x, y, color, type }: { x: number; y: number; color: ChessColor; type: string }) {
  const cx = x + SQUARE / 2;
  const cy = y + SQUARE / 2;
  const symbol = PIECE_UNICODE[type as keyof typeof PIECE_UNICODE]?.[color] ?? '';
  const bg = color === 'white' ? '#fbfbf7' : '#2b2b2b';
  const fg = color === 'white' ? '#2b2b2b' : '#fbfbf7';
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={cx} cy={cy} r={SQUARE * 0.4} fill={bg} stroke={color === 'white' ? '#9a9a8c' : '#000'} strokeWidth={1.5} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={SQUARE * 0.46}
        fontFamily="serif"
        fill={fg}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {symbol}
      </text>
    </g>
  );
}
