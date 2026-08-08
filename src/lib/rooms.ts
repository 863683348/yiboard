/**
 * 好友房 —— 服务端权威。
 *
 * 客户端发来的只是"我想下在哪"，落子合法性、轮次归属、胜负判定全部在这里算。
 * 打了补丁的前端造不出一个赢局：房间棋谱只认这里写进去的那一份。
 *
 * 传输层当前是轮询（GET /api/rooms/[code]）。换成 Cloudflare Durable Objects
 * 的长连接时，这一层逻辑原样复用，只替换调用方（ADR-006）。
 */

import { BLACK, WHITE, fromNotation, toNotation, type Player, type Point } from './engine/board';
import { applyMove, createGame, type GameState } from './engine/game';
import { getStore } from './store';
import type { GameResult, RoomRecord } from './store/types';

export type Side = 'black' | 'white';

export interface RoomView {
  code: string;
  status: RoomRecord['status'];
  /** 坐标记号序列，客户端据此重放 */
  moves: string[];
  /** 请求者执什么颜色；不是这房间的人则为 null（只能旁观） */
  yourSide: Side | null;
  turn: Side;
  result: GameResult | null;
  opponentPresent: boolean;
  updatedAt: string;
}

export type RoomError =
  | 'ROOM_NOT_FOUND'
  | 'ROOM_FULL'
  | 'NOT_A_PLAYER'
  | 'NOT_YOUR_TURN'
  | 'GAME_OVER'
  | 'ILLEGAL_MOVE'
  | 'WAITING_FOR_OPPONENT';

export function parseMoves(serialized: string): Point[] {
  if (!serialized) return [];
  return serialized
    .split(',')
    .map((token) => fromNotation(token.trim()))
    .filter((point): point is Point => point !== null);
}

/** 从棋谱重放出权威盘面。房间里不缓存棋盘，只存棋谱——重放成本可以忽略。 */
function replayRoom(room: RoomRecord): GameState {
  let state = createGame(BLACK);
  for (const move of parseMoves(room.moves)) {
    state = applyMove(state, move.x, move.y) ?? state;
  }
  return state;
}

export function sideOf(room: RoomRecord, userId: string): Side | null {
  if (room.hostId === userId) return 'black';
  if (room.guestId === userId) return 'white';
  return null;
}

function playerOf(side: Side): Player {
  return side === 'black' ? BLACK : WHITE;
}

export function toView(room: RoomRecord, userId: string): RoomView {
  const moves = room.moves ? room.moves.split(',').filter(Boolean) : [];
  return {
    code: room.code,
    status: room.status,
    moves,
    yourSide: sideOf(room, userId),
    turn: moves.length % 2 === 0 ? 'black' : 'white',
    result: room.result,
    opponentPresent: Boolean(room.guestId),
    updatedAt: room.updatedAt,
  };
}

export async function readRoom(
  code: string,
  userId: string,
): Promise<{ ok: true; view: RoomView } | { ok: false; error: RoomError }> {
  const store = getStore();
  const room = await store.getRoomByCode(code);
  if (!room) return { ok: false, error: 'ROOM_NOT_FOUND' };
  return { ok: true, view: toView(room, userId) };
}

export async function enterRoom(
  code: string,
  userId: string,
): Promise<{ ok: true; view: RoomView } | { ok: false; error: RoomError }> {
  const store = getStore();
  const room = await store.joinRoom(code, userId);
  if (!room) return { ok: false, error: 'ROOM_NOT_FOUND' };
  if (!sideOf(room, userId)) return { ok: false, error: 'ROOM_FULL' };
  return { ok: true, view: toView(room, userId) };
}

export async function playRoomMove(
  code: string,
  userId: string,
  x: number,
  y: number,
): Promise<{ ok: true; view: RoomView } | { ok: false; error: RoomError }> {
  const store = getStore();
  const room = await store.getRoomByCode(code);
  if (!room) return { ok: false, error: 'ROOM_NOT_FOUND' };

  const side = sideOf(room, userId);
  if (!side) return { ok: false, error: 'NOT_A_PLAYER' };
  if (room.result) return { ok: false, error: 'GAME_OVER' };
  if (!room.guestId) return { ok: false, error: 'WAITING_FOR_OPPONENT' };

  const state = replayRoom(room);
  if (state.status !== 'playing') return { ok: false, error: 'GAME_OVER' };
  if (state.turn !== playerOf(side)) return { ok: false, error: 'NOT_YOUR_TURN' };

  const next = applyMove(state, x, y);
  if (!next) return { ok: false, error: 'ILLEGAL_MOVE' };

  const moves = room.moves ? `${room.moves},${toNotation(x, y)}` : toNotation(x, y);
  let result: GameResult | null = null;
  if (next.status === 'won') result = next.winner === BLACK ? 'black' : 'white';
  else if (next.status === 'draw') result = 'draw';

  const saved = await store.saveRoom({
    ...room,
    moves,
    result,
    status: result ? 'closed' : 'playing',
  });

  // 分出胜负才结算：好友对局计入天梯（Spec §9 AC-07）
  if (result) {
    await store.recordGame({
      mode: 'friend',
      blackId: saved.hostId,
      whiteId: saved.guestId,
      difficulty: null,
      result,
      moves,
      durationMs: Date.parse(saved.updatedAt) - Date.parse(saved.createdAt),
    });
  }

  return { ok: true, view: toView(saved, userId) };
}
