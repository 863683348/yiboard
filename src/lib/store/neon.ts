/**
 * 弈界 YiBoard — Neon + Drizzle 持久化 Store 实现。
 * 路由层只依赖 Store 接口；有 DATABASE_URL 时由 index.ts 切到这个实现。
 * 与内存版行为对齐：ELO 只在 friend 对局结算、share 卡 views 自增、rankings 只列下过棋的用户。
 */

import { Pool } from '@neondatabase/serverless';
import { desc, eq, or, sql } from 'drizzle-orm';
import { drizzle, type NeonDatabase } from 'drizzle-orm/neon-serverless';

import { newRoomCode } from '../auth';
import { rankFromElo, updateElo } from '../rank';
import { games, shareCards, users, rooms as roomsTable } from '../db/schema';
import type {
  GameRecord,
  GameResult,
  RankEntry,
  RecordGameInput,
  RoomRecord,
  ShareCardRecord,
  Store,
  UserRecord,
} from './types';

/** WebSocket 连接（@neondatabase/serverless Pool）——HTTP 驱动不支持事务，ELO 结算必须用事务。 */
function connect(url: string): NeonDatabase {
  const pool = new Pool({ connectionString: url });
  return drizzle(pool);
}

/** RoomRow → RoomRecord（DB 用 snake_case + Date，接口用 camelCase + ISO 字符串） */
function rowToRoom(row: typeof roomsTable.$inferSelect): RoomRecord {
  return {
    id: row.id,
    code: row.code,
    game: 'gomoku',
    hostId: row.hostId,
    guestId: row.guestId,
    status: row.status as RoomRecord['status'],
    moves: row.moves ?? '',
    result: (row.result ?? null) as GameResult | null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function createNeonStore(connectionString: string): Store {
  const db = connect(connectionString);

  return {
    async createGuestUser({ id, displayName, locale }) {
      const row = (await db
        .insert(users)
        .values({ id, displayName, locale, isGuest: true, elo: 1200 })
        .returning())[0]!;
      const user: UserRecord = {
        id: row.id,
        displayName: row.displayName,
        username: row.username ?? null,
        email: row.email ?? null,
        locale: row.locale,
        elo: row.elo,
        gamesPlayed: row.gamesPlayed,
        gamesWon: row.gamesWon,
        isGuest: row.isGuest,
        createdAt: row.createdAt.toISOString(),
      };
      return user;
    },

    async getUser(id) {
      const row = (await db.select().from(users).where(eq(users.id, id)).limit(1))[0];
      if (!row) return null;
      return {
        id: row.id,
        displayName: row.displayName,
        username: row.username ?? null,
        email: row.email ?? null,
        locale: row.locale,
        elo: row.elo,
        gamesPlayed: row.gamesPlayed,
        gamesWon: row.gamesWon,
        isGuest: row.isGuest,
        createdAt: row.createdAt.toISOString(),
      };
    },

    async findUserByEmail(email) {
      const row = (await db
        .select()
        .from(users)
        .where(sql`lower(${users.email}) = ${email.toLowerCase()}`)
        .limit(1))[0];
      if (!row) return null;
      return {
        id: row.id,
        displayName: row.displayName,
        username: row.username ?? null,
        email: row.email ?? null,
        locale: row.locale,
        elo: row.elo,
        gamesPlayed: row.gamesPlayed,
        gamesWon: row.gamesWon,
        isGuest: row.isGuest,
        createdAt: row.createdAt.toISOString(),
      };
    },

    async findUserByUsername(username) {
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);
      const row = rows[0];
      if (!row) return null;
      return {
        id: row.id,
        displayName: row.displayName,
        username: row.username ?? null,
        email: row.email ?? null,
        locale: row.locale,
        elo: row.elo,
        gamesPlayed: row.gamesPlayed,
        gamesWon: row.gamesWon,
        isGuest: row.isGuest,
        createdAt: row.createdAt.toISOString(),
      };
    },

    async getPasswordHash(userId) {
      const rows = await db
        .select({ passwordHash: users.passwordHash })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
      return rows[0]?.passwordHash ?? null;
    },
    async upgradeGuest({ userId, username, email, passwordHash, displayName }) {
      const row = (await db
        .update(users)
        .set({
          username: username ?? undefined,
          email,
          passwordHash,
          displayName: displayName?.trim() || undefined,
          isGuest: false,
        })
        .where(eq(users.id, userId))
        .returning())[0]!;
      if (!row) throw new Error('USER_NOT_FOUND');
      return {
        id: row.id,
        displayName: row.displayName,
        username: row.username ?? null,
        email: row.email ?? null,
        locale: row.locale,
        elo: row.elo,
        gamesPlayed: row.gamesPlayed,
        gamesWon: row.gamesWon,
        isGuest: row.isGuest,
        createdAt: row.createdAt.toISOString(),
      };
    },

    async recordGame(input: RecordGameInput) {
      const { blackId, whiteId, result } = input;
      let eloDelta = 0;

      // 只有真人对真人（friend）才结算 ELO；人机只累计战绩
      if (input.mode === 'friend' && blackId && whiteId) {
        await db.transaction(async (tx) => {
          const [black, white] = await Promise.all([
            tx.select().from(users).where(eq(users.id, blackId)).limit(1),
            tx.select().from(users).where(eq(users.id, whiteId)).limit(1),
          ]);
          if (!black[0] || !white[0]) return;

          const blackOutcome = result === 'draw' ? 'draw' : result === 'black' ? 'win' : 'loss';
          const whiteOutcome = result === 'draw' ? 'draw' : result === 'white' ? 'win' : 'loss';
          const nextBlack = updateElo(black[0].elo, white[0].elo, blackOutcome);
          const nextWhite = updateElo(white[0].elo, black[0].elo, whiteOutcome);
          eloDelta = nextBlack - black[0].elo;

          await tx
            .update(users)
            .set({ elo: nextBlack, gamesPlayed: sql`${users.gamesPlayed} + 1`, gamesWon: sql`${users.gamesWon} + ${result === 'black' ? 1 : 0}` })
            .where(eq(users.id, blackId));
          await tx
            .update(users)
            .set({ elo: nextWhite, gamesPlayed: sql`${users.gamesPlayed} + 1`, gamesWon: sql`${users.gamesWon} + ${result === 'white' ? 1 : 0}` })
            .where(eq(users.id, whiteId));
        });
      } else {
        // 人机局：只 +场次，不 +胜场（人机不动段位，Spec §9 AC-07）
        for (const [id, side] of [
          [blackId, 'black'],
          [whiteId, 'white'],
        ] as const) {
          if (!id) continue;
          await db
            .update(users)
            .set({ gamesPlayed: sql`${users.gamesPlayed} + 1`, gamesWon: sql`${users.gamesWon} + ${result === side ? 1 : 0}` })
            .where(eq(users.id, id));
        }
      }

      const moveCount = input.moves ? input.moves.split(',').filter(Boolean).length : 0;
      const gameRow = (await db
        .insert(games)
        .values({
          game: 'gomoku',
          mode: input.mode,
          blackId: blackId ?? null,
          whiteId: whiteId ?? null,
          difficulty: input.difficulty ?? null,
          result,
          moves: input.moves,
          moveCount,
          durationMs: input.durationMs,
          eloDelta,
        })
        .returning())[0]!;

      const game: GameRecord = {
        id: gameRow.id,
        mode: gameRow.mode as GameRecord['mode'],
        blackId: gameRow.blackId ?? null,
        whiteId: gameRow.whiteId ?? null,
        difficulty: gameRow.difficulty ?? null,
        result: gameRow.result as GameResult,
        moves: gameRow.moves,
        moveCount: gameRow.moveCount,
        durationMs: gameRow.durationMs,
        eloDelta: gameRow.eloDelta,
        createdAt: gameRow.createdAt.toISOString(),
      };
      return { game, eloDelta };
    },

    async listGamesForUser(userId, limit = 20) {
      const rows = await db
        .select()
        .from(games)
        .where(or(eq(games.blackId, userId), eq(games.whiteId, userId)))
        .orderBy(desc(games.createdAt))
        .limit(limit);
      return rows.map((row): GameRecord => ({
        id: row.id,
        mode: row.mode as GameRecord['mode'],
        blackId: row.blackId ?? null,
        whiteId: row.whiteId ?? null,
        difficulty: row.difficulty ?? null,
        result: row.result as GameResult,
        moves: row.moves,
        moveCount: row.moveCount,
        durationMs: row.durationMs,
        eloDelta: row.eloDelta,
        createdAt: row.createdAt.toISOString(),
      }));
    },

    async listRankings(limit = 100) {
      const rows = await db
        .select()
        .from(users)
        .where(sql`${users.gamesPlayed} > 0`)
        .orderBy(desc(users.elo), desc(users.gamesWon))
        .limit(limit);
      return rows.map(
        (row, offset): RankEntry => ({
          userId: row.id,
          displayName: row.displayName,
          elo: row.elo,
          rankIndex: rankFromElo(row.elo).index,
          rankName: rankFromElo(row.elo).name,
          gamesPlayed: row.gamesPlayed,
          gamesWon: row.gamesWon,
          position: offset + 1,
        }),
      );
    },

    async createRoom({ hostId }) {
      let code = newRoomCode();
      // 碰撞重试：唯一索引兜底，极小概率
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const existing = await db.select().from(roomsTable).where(eq(roomsTable.code, code)).limit(1);
        if (existing.length === 0) break;
        code = newRoomCode();
      }
      const row = (await db
        .insert(roomsTable)
        .values({ code, hostId, status: 'waiting', moves: '' })
        .returning())[0]!;
      return rowToRoom(row);
    },

    async getRoomByCode(code) {
      const row = (await db
        .select()
        .from(roomsTable)
        .where(eq(roomsTable.code, code.toUpperCase()))
        .limit(1))[0];
      return row ? rowToRoom(row) : null;
    },

    async joinRoom(code, guestId) {
      const row = (await db
        .select()
        .from(roomsTable)
        .where(eq(roomsTable.code, code.toUpperCase()))
        .limit(1))[0];
      if (!row) return null;
      // 房主自己点进来不算占位；已有客人且不是本人 → 原样返回（路由层判满员）
      if (guestId === row.hostId) return rowToRoom(row);
      if (row.guestId && row.guestId !== guestId) return rowToRoom(row);

      const updated = (await db
        .update(roomsTable)
        .set({ guestId, status: 'playing', updatedAt: new Date() })
        .where(eq(roomsTable.code, code.toUpperCase()))
        .returning())[0]!;
      return rowToRoom(updated);
    },

    async saveRoom(room) {
      const row = (await db
        .update(roomsTable)
        .set({
          moves: room.moves,
          result: room.result,
          status: room.status,
          updatedAt: new Date(),
          closedAt: room.result ? new Date() : null,
        })
        .where(eq(roomsTable.code, room.code))
        .returning())[0]!;
      return rowToRoom(row);
    },

    async createShareCard({ gameId, ownerId, locale, payload }) {
      const row = (await db
        .insert(shareCards)
        .values({
          id: crypto.randomUUID().replace(/-/g, '').slice(0, 10),
          gameId: gameId ?? null,
          ownerId: ownerId ?? null,
          locale,
          payload,
          views: 0,
        })
        .returning())[0]!;
      return {
        id: row.id,
        gameId: row.gameId ?? null,
        ownerId: row.ownerId ?? null,
        locale: row.locale,
        payload: row.payload as ShareCardRecord['payload'],
        views: row.views,
        createdAt: row.createdAt.toISOString(),
      };
    },

    async getShareCard(id) {
      const row = (await db.select().from(shareCards).where(eq(shareCards.id, id)).limit(1))[0];
      if (!row) return null;
      await db
        .update(shareCards)
        .set({ views: sql`${shareCards.views} + 1` })
        .where(eq(shareCards.id, id));
      return {
        id: row.id,
        gameId: row.gameId ?? null,
        ownerId: row.ownerId ?? null,
        locale: row.locale,
        payload: row.payload as ShareCardRecord['payload'],
        views: row.views + 1,
        createdAt: row.createdAt.toISOString(),
      };
    },
  };
}
