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

/** drizzle 的 execute 在不同驱动下返回 rows 数组或 { rows }，统一拆出来 */
function rowsOf<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[];
  const maybe = result as { rows?: T[] } | null;
  return maybe?.rows ?? [];
}

/** 心跳超时：超过这个秒数没轮询就当掉线 */
const QUEUE_TTL_SECONDS = 45;

/**
 * site_visits 惰性建表：固定 id=1 的单行计数器。
 * 不跑 drizzle push，用 IF NOT EXISTS 幂等建表。
 */
let siteVisitsReady: Promise<void> | null = null;
function ensureSiteVisits(db: NeonDatabase): Promise<void> {
  siteVisitsReady ??= (async () => {
    await db.execute(sql`
      create table if not exists site_visits (
        id integer primary key check (id = 1),
        count integer not null default 0,
        updated_at timestamptz not null default now()
      )
    `);
  })().catch((error) => {
    siteVisitsReady = null;
    throw error;
  });
  return siteVisitsReady;
}

/**
 * match_queue 惰性建表。
 * 匹配是后加的功能，线上库已有数据，跑 drizzle push 有误删风险；
 * 这里用 IF NOT EXISTS 幂等建表，进程内只执行一次（Promise 缓存）。
 */
let matchQueueReady: Promise<void> | null = null;
function ensureMatchQueue(db: NeonDatabase): Promise<void> {
  matchQueueReady ??= (async () => {
    await db.execute(sql`
      create table if not exists match_queue (
        user_id uuid primary key references users(id) on delete cascade,
        elo integer not null default 1200,
        locale varchar(8) not null default 'zh',
        room_code varchar(8),
        created_at timestamptz not null default now(),
        last_seen_at timestamptz not null default now()
      )
    `);
    await db.execute(
      sql`create index if not exists match_queue_waiting_idx on match_queue (created_at)`,
    );
  })().catch((error) => {
    matchQueueReady = null; // 建表失败允许下次重试，别把错误永久缓存住
    throw error;
  });
  return matchQueueReady;
}

/** 剔除心跳超时的僵尸条目 */
async function pruneMatchQueue(db: NeonDatabase): Promise<void> {
  await db.execute(sql`
    delete from match_queue
    where last_seen_at < now() - make_interval(secs => ${QUEUE_TTL_SECONDS})
  `);
}

/** 当前真正在等待（未配对）的人数 */
async function countWaiting(db: NeonDatabase): Promise<number> {
  const result = await db.execute<{ count: number }>(sql`
    select count(*)::int as count from match_queue
    where room_code is null
      and last_seen_at > now() - make_interval(secs => ${QUEUE_TTL_SECONDS})
  `);
  return rowsOf<{ count: number }>(result)[0]?.count ?? 0;
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

    async getStats() {
      const [usersRow, aiRow, friendRow] = await Promise.all([
        db.select({ count: sql<number>`count(*)::int` }).from(users),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(games)
          .where(eq(games.mode, 'ai')),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(games)
          .where(eq(games.mode, 'friend')),
      ]);
      return {
        totalUsers: usersRow[0]?.count ?? 0,
        aiGames: aiRow[0]?.count ?? 0,
        friendGames: friendRow[0]?.count ?? 0,
      };
    },

    // ---------------- 随机匹配队列 ----------------

    async joinMatchQueue({ userId, elo, locale }) {
      await ensureMatchQueue(db);
      await pruneMatchQueue(db);
      // 重复点「开始匹配」先清掉自己的旧条目，避免自己跟自己配对
      await db.execute(sql`delete from match_queue where user_id = ${userId}::uuid`);

      // 等最久的优先出队 —— 先到先得
      const candidate = await db.execute<{ user_id: string }>(sql`
        select user_id from match_queue
        where room_code is null
        order by created_at asc
        limit 1
      `);
      const opponentId = rowsOf<{ user_id: string }>(candidate)[0]?.user_id ?? null;

      if (opponentId) {
        // 等得久的执黑（先手）—— 对耐心的一点补偿
        const room = await this.createRoom({ hostId: opponentId });
        // 单条 UPDATE 原子占坑：并发下只有一个请求能抢到这个对手
        const claimed = await db.execute<{ user_id: string }>(sql`
          update match_queue set room_code = ${room.code}
          where user_id = ${opponentId}::uuid and room_code is null
          returning user_id
        `);
        if (rowsOf<{ user_id: string }>(claimed).length > 0) {
          await this.joinRoom(room.code, userId);
          return { status: 'matched', code: room.code, waitingCount: await countWaiting(db) };
        }
        // 被别人抢先了：关掉刚开的空房，自己转入排队
        await db.execute(sql`update rooms set status = 'closed' where code = ${room.code}`);
      }

      const inserted = await db.execute<{ created_at: string }>(sql`
        insert into match_queue (user_id, elo, locale)
        values (${userId}::uuid, ${elo}, ${locale})
        on conflict (user_id) do update
          set elo = excluded.elo, locale = excluded.locale,
              room_code = null, created_at = now(), last_seen_at = now()
        returning created_at
      `);
      const since = rowsOf<{ created_at: string }>(inserted)[0]?.created_at;
      return {
        status: 'waiting',
        since: since ? new Date(since).toISOString() : new Date().toISOString(),
        waitingCount: await countWaiting(db),
      };
    },

    async pollMatchQueue(userId) {
      await ensureMatchQueue(db);
      // 一条语句同时做心跳续命 + 读状态
      const mine = await db.execute<{ room_code: string | null; created_at: string }>(sql`
        update match_queue set last_seen_at = now()
        where user_id = ${userId}::uuid
        returning room_code, created_at
      `);
      const row = rowsOf<{ room_code: string | null; created_at: string }>(mine)[0];
      if (!row) return { status: 'idle', waitingCount: await countWaiting(db) };

      if (row.room_code) {
        await db.execute(sql`delete from match_queue where user_id = ${userId}::uuid`);
        return { status: 'matched', code: row.room_code, waitingCount: await countWaiting(db) };
      }
      return {
        status: 'waiting',
        since: new Date(row.created_at).toISOString(),
        waitingCount: await countWaiting(db),
      };
    },

    async leaveMatchQueue(userId) {
      await ensureMatchQueue(db);
      await db.execute(sql`delete from match_queue where user_id = ${userId}::uuid`);
    },

    async countMatchQueue() {
      await ensureMatchQueue(db);
      await pruneMatchQueue(db);
      return countWaiting(db);
    },

    async incrementVisit() {
      await ensureSiteVisits(db);
      const result = await db.execute<{ count: number }>(sql`
        insert into site_visits (id, count) values (1, 1)
        on conflict (id) do update
          set count = site_visits.count + 1, updated_at = now()
        returning count
      `);
      return rowsOf<{ count: number }>(result)[0]?.count ?? 1;
    },
  };
}
