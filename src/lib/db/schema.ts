/**
 * 弈界 YiBoard — 数据库 Schema（Spec §6 锁定）
 * Drizzle + Postgres 16 (Neon serverless)。
 * subscriptions / payment_events 在 MVP 建表但不写入（Waffo 接入见 ADR-008，P1）。
 */

import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    displayName: varchar('display_name', { length: 48 }).notNull(),
    /** 注册用户名（唯一，可空——访客没有；登录可用 username 或 email） */
    username: varchar('username', { length: 32 }),
    email: varchar('email', { length: 254 }),
    passwordHash: text('password_hash'),
    locale: varchar('locale', { length: 8 }).notNull().default('en'),
    elo: integer('elo').notNull().default(1200),
    gamesPlayed: integer('games_played').notNull().default(0),
    gamesWon: integer('games_won').notNull().default(0),
    isGuest: boolean('is_guest').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('users_email_key').on(table.email),
    uniqueIndex('users_username_key').on(table.username),
    index('users_elo_idx').on(table.elo),
  ],
);

export const guestSessions = pgTable(
  'guest_sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    tokenHash: varchar('token_hash', { length: 64 }).notNull(),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
  (table) => [
    index('guest_sessions_user_idx').on(table.userId),
    uniqueIndex('guest_sessions_token_key').on(table.tokenHash),
  ],
);

export const rooms = pgTable(
  'rooms',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    code: varchar('code', { length: 8 }).notNull(),
    game: varchar('game', { length: 16 }).notNull().default('gomoku'),
    hostId: uuid('host_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    guestId: uuid('guest_id').references(() => users.id, { onDelete: 'set null' }),
    status: varchar('status', { length: 16 }).notNull().default('waiting'),
    /** 服务端权威棋谱：逗号分隔坐标记号（H8,I9,…），客户端只是显示层 */
    moves: text('moves').notNull().default(''),
    /** 终局结果：black / white / draw / null（未结束） */
    result: varchar('result', { length: 8 }),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    closedAt: timestamp('closed_at', { withTimezone: true }),
  },
  (table) => [
    uniqueIndex('rooms_code_key').on(table.code),
    index('rooms_status_idx').on(table.status),
  ],
);

/**
 * 随机匹配队列 —— 一人一行（user_id 主键）。
 * room_code 为空 = 还在等；被配对方原子写入房间号后，等待方轮询即可取到房间。
 * last_seen_at 是心跳：超过 45s 没轮询视为掉线，由下一次入队/计数顺手清理。
 */
export const matchQueue = pgTable(
  'match_queue',
  {
    userId: uuid('user_id')
      .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    elo: integer('elo').notNull().default(1200),
    locale: varchar('locale', { length: 8 }).notNull().default('en'),
    roomCode: varchar('room_code', { length: 8 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('match_queue_waiting_idx').on(table.createdAt)],
);

export const games = pgTable(
  'games',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    roomId: uuid('room_id').references(() => rooms.id, { onDelete: 'set null' }),
    game: varchar('game', { length: 16 }).notNull().default('gomoku'),
    mode: varchar('mode', { length: 16 }).notNull(),
    blackId: uuid('black_id').references(() => users.id, { onDelete: 'set null' }),
    whiteId: uuid('white_id').references(() => users.id, { onDelete: 'set null' }),
    difficulty: varchar('difficulty', { length: 16 }),
    result: varchar('result', { length: 16 }).notNull(),
    moves: text('moves').notNull(),
    moveCount: integer('move_count').notNull().default(0),
    durationMs: integer('duration_ms').notNull().default(0),
    eloDelta: integer('elo_delta').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('games_black_idx').on(table.blackId),
    index('games_white_idx').on(table.whiteId),
    index('games_created_idx').on(table.createdAt),
  ],
);

export const shareCards = pgTable(
  'share_cards',
  {
    id: varchar('id', { length: 12 }).primaryKey(),
    gameId: uuid('game_id').references(() => games.id, { onDelete: 'cascade' }),
    ownerId: uuid('owner_id').references(() => users.id, { onDelete: 'set null' }),
    locale: varchar('locale', { length: 8 }).notNull().default('en'),
    payload: jsonb('payload').notNull(),
    views: integer('views').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('share_cards_owner_idx').on(table.ownerId)],
);

/** MVP 建表不写入 —— Waffo（MoR）在 P1 接入 */
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  provider: varchar('provider', { length: 24 }).notNull().default('waffo'),
  externalId: varchar('external_id', { length: 128 }),
  plan: varchar('plan', { length: 32 }).notNull(),
  status: varchar('status', { length: 24 }).notNull(),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

/** MVP 建表不写入 —— webhook 落库审计位 */
export const paymentEvents = pgTable('payment_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  provider: varchar('provider', { length: 24 }).notNull().default('waffo'),
  eventType: varchar('event_type', { length: 64 }).notNull(),
  externalId: varchar('external_id', { length: 128 }),
  payload: jsonb('payload').notNull(),
  receivedAt: timestamp('received_at', { withTimezone: true }).notNull().defaultNow(),
});

export type UserRow = typeof users.$inferSelect;
export type GameRow = typeof games.$inferSelect;
export type RoomRow = typeof rooms.$inferSelect;
export type ShareCardRow = typeof shareCards.$inferSelect;
