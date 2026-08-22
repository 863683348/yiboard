/**
 * 弈界 YiBoard — 持久化契约
 * 路由层只依赖这个接口；本地跑内存实现，线上换 Neon/Drizzle 实现，路由代码零改动。
 */

export interface UserRecord {
  id: string;
  displayName: string;
  /** 注册用户名（访客为 null） */
  username: string | null;
  email: string | null;
  locale: string;
  elo: number;
  gamesPlayed: number;
  gamesWon: number;
  isGuest: boolean;
  createdAt: string;
}

export type GameMode = 'ai' | 'friend';
export type GameResult = 'black' | 'white' | 'draw';

export interface GameRecord {
  id: string;
  mode: GameMode;
  blackId: string | null;
  whiteId: string | null;
  difficulty: string | null;
  result: GameResult;
  moves: string;
  moveCount: number;
  durationMs: number;
  eloDelta: number;
  createdAt: string;
}

export interface RoomRecord {
  id: string;
  code: string;
  game: 'gomoku';
  /** 房主执黑 */
  hostId: string;
  guestId: string | null;
  status: 'waiting' | 'playing' | 'closed';
  /** 服务端权威棋谱，逗号分隔的坐标记号（H8,I9,…）。客户端只是显示层。 */
  moves: string;
  result: GameResult | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShareCardRecord {
  id: string;
  gameId: string | null;
  ownerId: string | null;
  locale: string;
  payload: ShareCardPayload;
  views: number;
  createdAt: string;
}

export interface ShareCardPayload {
  /** 棋盘层面的胜负（黑/白/和），保留原始棋局信息 */
  result: GameResult;
  /** 分享者执什么颜色——用于把棋盘胜负转成"玩家视角"的胜/负/和 */
  playerColor: 'black' | 'white' | null;
  playerName: string;
  rankName: string;
  moveCount: number;
  moves: string;
  difficulty: string | null;
  /** 卡片类型：user=用户手动分享；replay=AI vs AI 自动回放（用于 /replays 索引与 noindex 阈值） */
  kind?: 'user' | 'replay';
  /** AI vs AI 回放：双方引擎档位 */
  blackDifficulty?: string | null;
  whiteDifficulty?: string | null;
}

/**
 * 随机匹配状态机：
 * idle    —— 不在队列里（取消 / 从未入队 / 已被清理）
 * waiting —— 排队中，waitingCount 是当前同时在等的人数（含自己）
 * matched —— 已配对，code 是房间号，前端直接进房
 */
export type MatchState =
  | { status: 'idle'; waitingCount: number }
  | { status: 'waiting'; waitingCount: number; since: string }
  | { status: 'matched'; waitingCount: number; code: string };

export interface RankEntry {
  userId: string;
  displayName: string;
  elo: number;
  rankIndex: number;
  rankName: string;
  gamesPlayed: number;
  gamesWon: number;
  position: number;
}

export interface RecordGameInput {
  mode: GameMode;
  blackId: string | null;
  whiteId: string | null;
  difficulty: string | null;
  result: GameResult;
  moves: string;
  durationMs: number;
}

export interface Store {
  createGuestUser(input: { id: string; displayName: string; locale: string }): Promise<UserRecord>;
  getUser(id: string): Promise<UserRecord | null>;
  findUserByEmail(email: string): Promise<UserRecord | null>;
  findUserByUsername(username: string): Promise<UserRecord | null>;
  /** 登录校验用：拿密码哈希（UserRecord 不暴露哈希，保持最小面） */
  getPasswordHash(userId: string): Promise<string | null>;
  upgradeGuest(input: {
    userId: string;
    username?: string;
    email: string;
    /** 密码可空：Google OAuth 等外部身份没有密码 */
    passwordHash: string | null;
    displayName?: string;
  }): Promise<UserRecord>;

  recordGame(input: RecordGameInput): Promise<{ game: GameRecord; eloDelta: number }>;
  listGamesForUser(userId: string, limit?: number): Promise<GameRecord[]>;
  listRankings(limit?: number): Promise<RankEntry[]>;

  createRoom(input: { hostId: string }): Promise<RoomRecord>;
  getRoomByCode(code: string): Promise<RoomRecord | null>;
  joinRoom(code: string, guestId: string): Promise<RoomRecord | null>;
  /** 只由 lib/rooms.ts 在校验通过后调用；路由层不直接碰 */
  saveRoom(room: RoomRecord): Promise<RoomRecord>;

  createShareCard(input: {
    gameId: string | null;
    ownerId: string | null;
    locale: string;
    payload: ShareCardPayload;
  }): Promise<ShareCardRecord>;
  getShareCard(id: string): Promise<ShareCardRecord | null>;
  /** 最近分享卡（sitemap 枚举 /replays 用），按 createdAt 倒序 */
  listShareCards(limit?: number): Promise<ShareCardRecord[]>;
  /** 首页"全球玩家"统计：总用户 / 人机对局 / 好友对局 */
  getStats(): Promise<{ totalUsers: number; aiGames: number; friendGames: number }>;

  /** 随机匹配：入队；若已有人在等则当场配对并开房 */
  joinMatchQueue(input: { userId: string; elo: number; locale: string }): Promise<MatchState>;
  /** 随机匹配：轮询自己的状态（顺带心跳续命） */
  pollMatchQueue(userId: string): Promise<MatchState>;
  /** 随机匹配：主动退出队列 */
  leaveMatchQueue(userId: string): Promise<void>;
  /** 随机匹配：当前排队人数（首页热度提示用） */
  countMatchQueue(): Promise<number>;

  /** 全站访问次数：原子 +1，返回最新累计值 */
  incrementVisit(): Promise<number>;
  /** 全站访问次数：只读当前累计值（胶囊展示用，不计 +1） */
  getVisitCount(): Promise<number>;
}
