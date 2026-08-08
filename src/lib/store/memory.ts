/**
 * 内存实现 —— 让仓库 clone 下来不配任何环境变量就能跑通全流程。
 * 进程重启即清空；生产环境由 Neon 实现接管（见 ./index.ts）。
 */

import { newRoomCode } from '../auth';
import { STARTING_ELO, rankFromElo, updateElo } from '../rank';
import type {
  GameRecord,
  RankEntry,
  RecordGameInput,
  RoomRecord,
  ShareCardPayload,
  ShareCardRecord,
  Store,
  UserRecord,
} from './types';

const users = new Map<string, UserRecord>();
const passwords = new Map<string, string>();
const games: GameRecord[] = [];
const rooms = new Map<string, RoomRecord>();
const shareCards = new Map<string, ShareCardRecord>();

function now(): string {
  return new Date().toISOString();
}

function shortId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 10);
}

export const memoryStore: Store = {
  async createGuestUser({ id, displayName, locale }) {
    const record: UserRecord = {
      id,
      displayName,
      username: null,
      email: null,
      locale,
      elo: STARTING_ELO,
      gamesPlayed: 0,
      gamesWon: 0,
      isGuest: true,
      createdAt: now(),
    };
    users.set(id, record);
    return record;
  },

  async getUser(id) {
    return users.get(id) ?? null;
  },

  async findUserByEmail(email) {
    const target = email.toLowerCase();
    for (const user of users.values()) {
      if (user.email?.toLowerCase() === target) return user;
    }
    return null;
  },

  async findUserByUsername(username) {
    const target = username.toLowerCase();
    for (const user of users.values()) {
      if (user.username?.toLowerCase() === target) return user;
    }
    return null;
  },

  async getPasswordHash(userId) {
    return passwords.get(userId) ?? null;
  },

  async upgradeGuest({ userId, username, email, passwordHash, displayName }) {
    const existing = users.get(userId);
    if (!existing) throw new Error('USER_NOT_FOUND');
    const upgraded: UserRecord = {
      ...existing,
      username: username ?? existing.username,
      email,
      displayName: displayName?.trim() || existing.displayName,
      isGuest: false,
    };
    users.set(userId, upgraded);
    // Google 等外部身份没有密码：passwords map 存空串占位（登录校验走 email 归属而非密码）
    passwords.set(userId, passwordHash ?? '');
    return upgraded;
  },

  async recordGame(input: RecordGameInput) {
    const { blackId, whiteId, result } = input;
    let eloDelta = 0;

    // 只有真人对真人（friend 模式）才计入天梯；人机对局记录战绩但不动 ELO。
    if (input.mode === 'friend' && blackId && whiteId) {
      const black = users.get(blackId);
      const white = users.get(whiteId);
      if (black && white) {
        const blackOutcome = result === 'draw' ? 'draw' : result === 'black' ? 'win' : 'loss';
        const whiteOutcome = result === 'draw' ? 'draw' : result === 'white' ? 'win' : 'loss';
        const nextBlack = updateElo(black.elo, white.elo, blackOutcome);
        const nextWhite = updateElo(white.elo, black.elo, whiteOutcome);
        eloDelta = nextBlack - black.elo;
        users.set(blackId, { ...black, elo: nextBlack });
        users.set(whiteId, { ...white, elo: nextWhite });
      }
    }

    for (const [id, side] of [
      [blackId, 'black'],
      [whiteId, 'white'],
    ] as const) {
      if (!id) continue;
      const user = users.get(id);
      if (!user) continue;
      users.set(id, {
        ...user,
        gamesPlayed: user.gamesPlayed + 1,
        gamesWon: user.gamesWon + (result === side ? 1 : 0),
      });
    }

    const game: GameRecord = {
      id: crypto.randomUUID(),
      mode: input.mode,
      blackId,
      whiteId,
      difficulty: input.difficulty,
      result,
      moves: input.moves,
      moveCount: input.moves ? input.moves.split(',').filter(Boolean).length : 0,
      durationMs: input.durationMs,
      eloDelta,
      createdAt: now(),
    };
    games.unshift(game);
    return { game, eloDelta };
  },

  async listGamesForUser(userId, limit = 20) {
    return games.filter((g) => g.blackId === userId || g.whiteId === userId).slice(0, limit);
  },

  async listRankings(limit = 100) {
    return [...users.values()]
      .filter((user) => user.gamesPlayed > 0)
      .sort((a, b) => b.elo - a.elo || b.gamesWon - a.gamesWon)
      .slice(0, limit)
      .map((user, offset): RankEntry => {
        const rank = rankFromElo(user.elo);
        return {
          userId: user.id,
          displayName: user.displayName,
          elo: user.elo,
          rankIndex: rank.index,
          rankName: rank.name,
          gamesPlayed: user.gamesPlayed,
          gamesWon: user.gamesWon,
          position: offset + 1,
        };
      });
  },

  async createRoom({ hostId }) {
    let code = newRoomCode();
    while (rooms.has(code)) code = newRoomCode();
    const room: RoomRecord = {
      id: crypto.randomUUID(),
      code,
      game: 'gomoku',
      hostId,
      guestId: null,
      status: 'waiting',
      moves: '',
      result: null,
      createdAt: now(),
      updatedAt: now(),
    };
    rooms.set(code, room);
    return room;
  },

  async getRoomByCode(code) {
    return rooms.get(code.toUpperCase()) ?? null;
  },

  async joinRoom(code, guestId) {
    const room = rooms.get(code.toUpperCase());
    if (!room) return null;
    // 房主自己点进来不算占位；已经有客人且不是本人，原样返回让路由层判满员
    if (guestId === room.hostId) return room;
    if (room.guestId && room.guestId !== guestId) return room;
    const updated: RoomRecord = { ...room, guestId, status: 'playing', updatedAt: now() };
    rooms.set(updated.code, updated);
    return updated;
  },

  async saveRoom(room) {
    const updated: RoomRecord = { ...room, updatedAt: now() };
    rooms.set(updated.code, updated);
    return updated;
  },

  async createShareCard({ gameId, ownerId, locale, payload }) {
    const card: ShareCardRecord = {
      id: shortId(),
      gameId,
      ownerId,
      locale,
      payload: payload satisfies ShareCardPayload,
      views: 0,
      createdAt: now(),
    };
    shareCards.set(card.id, card);
    return card;
  },

  async getShareCard(id) {
    const card = shareCards.get(id);
    if (!card) return null;
    const bumped = { ...card, views: card.views + 1 };
    shareCards.set(id, bumped);
    return bumped;
  },
};
