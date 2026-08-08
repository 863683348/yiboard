import { NextResponse } from 'next/server';

/** 错误码 -> HTTP 状态。路由层只管把领域错误丢过来。 */
const STATUS: Record<string, number> = {
  ROOM_NOT_FOUND: 404,
  SHARE_NOT_FOUND: 404,
  ROOM_FULL: 409,
  GAME_OVER: 409,
  NOT_A_PLAYER: 403,
  NOT_YOUR_TURN: 409,
  WAITING_FOR_OPPONENT: 409,
  ILLEGAL_MOVE: 422,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
};

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function fail(code: string, message?: string) {
  return NextResponse.json({ error: code, message: message ?? code }, { status: STATUS[code] ?? 400 });
}

export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
