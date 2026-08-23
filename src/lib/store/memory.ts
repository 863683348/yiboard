/**
 * 内存实现 —— 让仓库 clone 下来不配任何环境变量就能跑通全流程。
 * 进程重启即清空；生产环境由 Neon 实现接管（见 ./index.ts）。
 */

import { newRoomCode } from '../auth';
import { STARTING_ELO, rankFromElo, updateElo } from '../rank';
import type {
  GameRecord,
  PeriodRankEntry,
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
let visitCount = 0;

interface QueueEntry {
  userId: string;
  elo: number;
  locale: string;
  roomCode: string | null;
  createdAt: number;
  lastSeenAt: number;
}
const queue = new Map<string, QueueEntry>();
/** 心跳超时：超过这个时间没轮询就当掉线剔除 */
const QUEUE_TTL_MS = 45_000;

/** 剔除心跳超时的条目，返回仍在等待（未配对）的人数 */
function pruneQueue(): number {
  const cutoff = Date.now() - QUEUE_TTL_MS;
  let waiting = 0;
  for (const [id, entry] of queue) {
    if (entry.lastSeenAt < cutoff) {
      queue.delete(id);
      continue;
    }
    if (!entry.roomCode) waiting += 1;
  }
  return waiting;
}

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

  async listPeriodLeaders(period, limit = 50) {
    const days = period === 'week' ? 7 : 30;
    const cutoff = Date.now() - days * 86400_000;
    const recent = games.filter(
      (g) => g.mode === 'friend' && new Date(g.createdAt).getTime() >= cutoff,
    );
    const agg = new Map<string, { wins: number; games: number; displayName: string; elo: number }>();
    for (const g of recent) {
      for (const [id, side] of [
        [g.blackId, 'black'],
        [g.whiteId, 'white'],
      ] as const) {
        if (!id) continue;
        const user = users.get(id);
        if (!user) continue;
        const a = agg.get(id) ?? {
          wins: 0,
          games: 0,
          displayName: user.displayName,
          elo: user.elo,
        };
        a.games += 1;
        if (g.result === side) a.wins += 1;
        agg.set(id, a);
      }
    }
    return [...agg.entries()]
      .map(([userId, v]): PeriodRankEntry => ({
        userId,
        displayName: v.displayName,
        elo: v.elo,
        wins: v.wins,
        gamesPlayed: v.games,
        position: 0,
      }))
      .sort((a, b) => b.wins - a.wins || b.elo - a.elo)
      .slice(0, limit)
      .map((entry, offset) => ({ ...entry, position: offset + 1 }));
  },

  async listPublicShareCards(limit = 24) {
    return [...shareCards.values()]
      .sort(
        (a, b) =>
          b.views - a.views ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, limit);
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

  async listShareCards(limit = 100) {
    return [...shareCards.values()]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, limit);
  },

  async getStats() {
    let aiGames = 0;
    let friendGames = 0;
    for (const g of games.values()) {
      if (g.mode === 'ai') aiGames += 1;
      else if (g.mode === 'friend') friendGames += 1;
    }
    return { totalUsers: users.size, aiGames, friendGames };
  },

  async joinMatchQueue({ userId, elo, locale }) {
    pruneQueue();
    queue.delete(userId); // 重复点「开始匹配」时先清掉自己的旧条目

    // 找等最久的那个人配对 —— 先到先得，等待时间越长优先级越高
    let opponent: QueueEntry | null = null;
    for (const entry of queue.values()) {
      if (entry.roomCode) continue;
      if (!opponent || entry.createdAt < opponent.createdAt) opponent = entry;
    }

    if (opponent) {
      // 等得久的执黑（先手），算是对耐心的一点补偿
      const room = await this.createRoom({ hostId: opponent.userId });
      await this.joinRoom(room.code, userId);
      queue.set(opponent.userId, { ...opponent, roomCode: room.code });
      return { status: 'matched', code: room.code, waitingCount: pruneQueue() };
    }

    const stamp = Date.now();
    queue.set(userId, {
      userId,
      elo,
      locale,
      roomCode: null,
      createdAt: stamp,
      lastSeenAt: stamp,
    });
    return {
      status: 'waiting',
      since: new Date(stamp).toISOString(),
      waitingCount: pruneQueue(),
    };
  },

  async pollMatchQueue(userId) {
    pruneQueue();
    const mine = queue.get(userId);
    if (!mine) return { status: 'idle', waitingCount: pruneQueue() };

    if (mine.roomCode) {
      queue.delete(userId); // 已配对，出队
      return { status: 'matched', code: mine.roomCode, waitingCount: pruneQueue() };
    }

    queue.set(userId, { ...mine, lastSeenAt: Date.now() }); // 心跳续命
    return {
      status: 'waiting',
      since: new Date(mine.createdAt).toISOString(),
      waitingCount: pruneQueue(),
    };
  },

  async leaveMatchQueue(userId) {
    queue.delete(userId);
    pruneQueue();
  },

  async countMatchQueue() {
    return pruneQueue();
  },

  async incrementVisit() {
    visitCount += 1;
    return visitCount;
  },

  async getVisitCount() {
    return visitCount;
  },
};
