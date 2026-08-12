# 弈界 YiBoard 技术架构文档（规划层 v0.4）

> 文档性质：**架构规划层**，非最终 Spec。用于锁定技术方向、暴露关键约束、标出待决策项。
> 上游依据：`中国战略游戏出海独立站调研与PRD.md`（第二部分 PRD，第 10–21 章）
> 作者：高见远（首席架构师） | 初稿 2026-08-07 | v0.4 收口 2026-08-07 | 状态：**规划层定稿（D7 语种锁定 / D5 游客开放 / Q3 器物摄影管线 / 九品+段位双轨 已落位；Phosphor / Hero 静态 / waffo=MoR 三项对齐点维持）**
> 下游产出：Phase 1.5 Spec 阶段由 team-lead 统一生成 `openapi.yaml` + `ADR-001..N`

### v0.2 变更摘要（相对 v0.1）

| 项 | v0.1 状态 | v0.2 结论 | 影响章节 |
|---|---|---|---|
| 实时层是否引入 Cloudflare | 待决策（阻塞） | **RESOLVED：批准引入 Durable Objects 作为第 4 个平台依赖** | 0 / 1 / 2 / 10 / 11 / 12 / 13 / 14 |
| waffo 接入时机 | 待决策（阻塞） | **RESOLVED：MVP 不接 waffo，不启动 KYB，整体推到 P1** | 0 / 1 / 8 / 12 / 13 / 14 |
| 游客账号 | advisory 建议 | **已采纳，纳入 MVP 范围** | 4.3（新增）/ 6.3（新增） |

四层职责最终落位：**Vercel 扛 App/SSR/控制面 API，Cloudflare DO 扛实时对局房间，Neon 扛持久化数据，waffo 扛计费（P1 启用）。**

### v0.3 变更摘要（相对 v0.2，对齐设计师 / PM / waffo 性质确认）

| 项 | v0.2 状态 | v0.3 结论 | 影响章节 |
|---|---|---|---|
| 图标库 | 锁 lucide-react 1.26.0 | **改为 @phosphor-icons/react 2.x（设计师定稿，P0 禁止混用）** | 0 / 1.3 / 11.1 / 14 |
| 可玩 Hero 的 SEO 策略 | 仅 Core Web Vitals 防线提及懒加载 | **明确：首屏静态 SVG 棋盘保 SEO≥95，wasm 引擎懒加载（新增 9.2）** | 9.2 |
| waffo 性质 | MoR，MVP 不接 | **确认 MoR（Waffo Pancake），无需我方境外主体 / 4-8 周实体注册，无 Phase 0 并行 KYB** | 8 / 12 / 13 |
| i18n 首批语种 | en/es/ja/zh-Hans | **PM 提议 EN/ES/JA/PT-BR（待用户确认），locale 架构预留** | 1.3 / 7.2 / 13 |

### v0.4 变更摘要（相对 v0.3，D7 / D5 / Q3 / 段位 四项决策落位）

| 项 | v0.3 状态 | v0.4 结论 | 影响章节 |
|---|---|---|---|
| D7 i18n 首批语种 | PM 提议 EN/ES/JA/PT-BR（待确认） | **已锁定 EN / ES / JA / PT-BR**（用户拍板；locale 路由与 `messages/` 目录就绪，增删语种零改路由） | 7.1 / 7.2 / 13(Q4) |
| D5 免注册即玩 | advisory 建议 + §6.2 已放定位块 | **开放**：好友房链接免注册直开；注册仅用于存档/段位/订阅；guest 用匿名 token，过期可绑定邮箱升级 | 4.3 / 6.2 / 13(Q7) |
| Q3 文化叙事带摄影 | 未登记 | **批准真实器物摄影预算**；新增 §10.5 媒体资源管线（R2 对象存储 + `next/image` 优化），MVP 首屏用 1–2 张真实器物图 | 9 / 10.5 |
| 段位体系 | Elo 单轨（ADR-009） | **九品 + 段位双轨（Elo 分档映射 + 英文译名）**；ranking API 返回 ELO 数值 + 段位字段，段位读取时派生、无新增列 | 4.2 / 5.4 / 14(ADR-013) |
| 前三项对齐点 | v0.3 已对齐 | **维持生效**：Phosphor 图标库 / Hero 首屏静态 SVG / waffo=MoR 且 MVP 不集成 | 0 / 9.2 / 8 |

---

## 0. 阅读须知与本文档的三条硬约束

| 约束 | 内容 |
|---|---|
| A. 用户已锁定的技术栈 | Next.js（App Router）/ Neon（serverless Postgres）/ Vercel / waffo。本文档**不做替换性论证**，只做落位与补齐。其中 waffo 经批准**推迟到 P1 接入**，MVP 只留空壳。 |
| B. 已批准新增的第四个平台依赖 | **Cloudflare Workers + Durable Objects**，承载实时对弈房间与匹配。理由见 2.2（Vercel Functions 无跨实例广播，结构性无法承载双人房间）。**此项已于 v0.2 获批，不再是待决策项。** |
| C. 版本锚定 | 所有依赖在第 11 章给出精确版本号，脚手架当日写入 lockfile，不使用 `latest`。 |

**P0 团队规则在本文档的落地**：
- 全文不使用 emoji。图标一律走 SVG 图标库。
- **图标库锁定：`@phosphor-icons/react` 2.x**（设计师定稿，全项目唯一 SVG 图标库；安装时锁定当前稳定版，Spec 阶段锚定精确补丁号）。同家族 regular + fill 两套风格（TabBar 不引第二套），tree-shaking 友好、RSC 可直接渲染。**全项目唯一图标来源，禁止混用** Heroicons / Tabler / lucide / Font Awesome / emoji。棋子图形不属于图标范畴，走独立的 `packages/pieces` 自绘 SVG 资产集。
- 不采用紫→粉渐变类视觉方案（设计侧约束，此处仅登记不违反）。

### 0.1 MVP 与 P1 的平台依赖边界（一图看清）

```
MVP（0–1 月）实际启用：
  Vercel        App / SSR / 控制面 API              启用
  Cloudflare    Workers + DO（对弈房间 + 匹配）      启用
  Neon          Postgres 主库                       启用
  Upstash       Redis（限流 / 活跃态）               启用
  R2            对象存储（棋谱归档 / 头像）           启用
  waffo         支付 / 订阅 / MoR                    不启用（表与接口留空壳，不签 KYB）

P1（1–3 月）追加：
  waffo         KYB 签约 → 沙箱联调 → 会员上线       启用
  KataGo 推理    AI 复盘（P2 再议）                   规划
```

---

## 1. 系统架构总览

### 1.1 分层图

```
                                   全球用户（Browser / PWA）
                                             |
        +------------------------------------+------------------------------------+
        |                                    |                                    |
        v                                    v                                    v
+-------------------+          +---------------------------+        +---------------------------+
|  L1 表现层         |          |  L1' PWA 离线层            |        |  L1'' 静态资产层           |
|  Next.js 16.3      |          |  Service Worker           |        |  Vercel Edge CDN          |
|  App Router / RSC  |          |  (Serwist) + IndexedDB    |        |  棋盘图 / 字体 / OG 卡片   |
|  React 19          |          |  单机 AI 对弈可离线        |        |                           |
+---------+---------+          +---------------------------+        +---------------------------+
          |
          | (a) HTTP  /api/v1/**              (b) WSS  wss://rt.yiboard.com/**
          v                                             v
+-----------------------------------+     +--------------------------------------------------+
|  L2 API 层（Vercel Functions）     |     |  L3 实时通信层（Cloudflare Workers + DO）[已批准]  |
|  Route Handlers, Node runtime      |     |  Gateway Worker（鉴权 / 路由 / 限流）              |
|  - auth / profile / leaderboard    |<--->|  MatchmakerDO（每 gameType+mode 一个匹配队列）     |
|  - game history / replay           | HMAC|  GameRoomDO（每局一个，权威棋局状态 + WS 广播）     |
|  - billing 空壳（P1 才通电）        |内部 |  WebSocket Hibernation API（空闲不计费）           |
|  - 内部端点 /internal/**           | 调用|  Alarms API（回合倒计时 / 超时判负）               |
|                                    |     |  DO 内嵌 SQLite（活局临时态）                      |
+-----------------+-----------------+     +---------------------+----------------------------+
                  |                                             |
                  |         +-----------------------------------+
                  v         v
        +-------------------------------------------------------------+
        |  L4 业务逻辑层（共享 TS 包，Monorepo，前后端/Worker 三方复用） |
        |  @yiboard/rules   规则与胜负判定（纯函数，客户端+DO 双跑）     |
        |  @yiboard/engine  AI 引擎（Gomoku TS/WASM、Xiangqi WASM）     |
        |  @yiboard/rating  Elo 计算                                    |
        |  @yiboard/contract  OpenAPI 生成的类型 + Zod schema           |
        +-----------------------------+-------------------------------+
                                      |
                                      v
        +-------------------------------------------------------------+
        |  L5 数据层                                                    |
        |  Neon Postgres（主库，users/matches/games/ratings/...）        |
        |    - HTTP 驱动用于单查询；WS 驱动用于事务                       |
        |    - 分支数据库：main / preview-per-PR / dev                   |
        |  Upstash Redis（限流计数、匹配临时索引、排行榜缓存）             |
        |  Cloudflare R2（棋谱 SGF/JSON 归档、复盘大对象、头像）           |
        +-----------------------------+-------------------------------+
                                      |
                                      v
        +-------------------------------------------------------------+
        |  L6 外部服务                                                  |
        |  waffo（MoR：支付/订阅/税务/风控）【P1 启用，MVP 只留空壳】      |
        |  Resend（事务邮件）  Sentry（错误）  Crowdin（译制协作）        |
        |  KataGo 推理服务（P2，GPU，规划中）                             |
        +-------------------------------------------------------------+
```

### 1.2 请求路径分工（关键：为什么是两条路）

| 路径 | 走向 | 承载 | 延迟目标 |
|---|---|---|---|
| **控制面** | Browser → Vercel Function → Neon | 注册登录、资料、历史棋谱、排行榜、订阅 | p95 < 400ms |
| **数据面** | Browser → CF Worker → GameRoomDO | 落子、悔棋、认输、聊天、心跳、观战 | **p95 < 200ms（PRD 硬指标）** |
| **落库面** | GameRoomDO → Vercel `/internal/matches/finalize` → Neon | 终局结算、Elo 更新、棋谱归档 | 异步，允许 < 3s |

控制面与数据面**不共享连接**。数据面绝不直连 Neon 写业务表（避免两处 Elo 计算逻辑），只在终局时通过一次带 HMAC 签名 + 幂等键的内部调用回写。

### 1.3 Monorepo 目录结构（可执行约束）

遵循「单文件 ≤ 300 行、单一职责、入口只装配、按资源分包」：

```
yiboard/
├─ apps/
│  ├─ web/                          # Next.js 16.3 App Router（部署到 Vercel）
│  │  ├─ app/
│  │  │  ├─ [locale]/               # i18n 路由段
│  │  │  │  ├─ (marketing)/         # 首页/落地页，SSG+ISR，重 SEO
│  │  │  │  ├─ (play)/              # 对弈中心，客户端重
│  │  │  │  ├─ (compete)/           # 排行榜/段位/赛事
│  │  │  │  └─ (account)/           # 账户/订阅
│  │  │  ├─ api/v1/                 # Route Handlers，按资源分目录
│  │  │  │  ├─ auth/ matchmaking/ games/ leaderboard/ profile/
│  │  │  │  └─ internal/            # 仅 HMAC 内部调用
│  │  │  └─ og/                     # 动态 OG 图（next/og）
│  │  ├─ src/
│  │  │  ├─ features/<domain>/      # 按业务域分包（api/ui/model 三件套）
│  │  │  ├─ server/                 # service 层，Route Handler 只做装配
│  │  │  └─ db/                     # drizzle schema + 查询，一表一文件
│  │  └─ messages/                  # i18n 文案 en.json / es.json / ja.json / pt-br.json / ...
│  └─ realtime/                     # Cloudflare Worker + Durable Objects
│     ├─ src/gateway.ts             # 入口，只做鉴权与路由
│     ├─ src/rooms/game-room.ts     # GameRoomDO
│     └─ src/rooms/matchmaker.ts    # MatchmakerDO
├─ packages/
│  ├─ rules/                        # 各棋种规则，纯函数无副作用
│  ├─ engine/                       # AI，含 wasm/ 产物
│  ├─ rating/                       # Elo
│  ├─ contract/                     # openapi.yaml + 生成的 TS 类型 + Zod
│  ├─ pieces/                       # 棋子/棋盘 SVG 资产
│  └─ ui/                           # 共享组件（图标统一 re-export @phosphor-icons/react）
└─ docs/decisions/                  # ADR-001..N
```

**分层依赖方向（禁止逆向 import）**：
`app/api` → `src/server` → `src/db`；`app/[locale]` → `src/features` → `packages/*`。
`packages/rules` 与 `packages/rating` 不得 import 任何运行时特定 API（无 `next/*`、无 `cloudflare:workers`、无 `node:*`），保证三端同构。

---

## 2. 实时对弈技术方案

### 2.1 WebSocket vs WebRTC：选型结论

**结论：采用 WebSocket（服务端权威），不采用 WebRTC。**

竞品 Gomoku.com 使用 WebRTC，但那是「单一棋种、弱竞技」形态下的合理选择。本产品的 PRD 明确要求 ELO / 段位 / 排行榜 / 周赛（第 13.1、19 章），一旦引入天梯，**防作弊即是刚需**，架构必须服务端权威。

| 维度 | WebSocket（服务端权威） | WebRTC DataChannel（P2P） |
|---|---|---|
| 落子合法性校验 | 服务端唯一判定，客户端只做乐观 UI | 无第三方仲裁，双方各说各话 |
| 作弊防护 | 可拦非法落子、超时、快照对账 | 篡改客户端即可作弊，ELO 系统直接失效 |
| 棋谱可信度 | 服务端记录，可用于复盘/排行榜/申诉 | 需双方签名互证，工程量远大于 WS |
| 观战 / 多人 | 天然支持（房间广播 N 个 socket） | 需 SFU，等于自建服务器 |
| 断线重连续局 | DO 持有权威状态，重连即恢复 | 一方断开对局态即丢失 |
| NAT 穿透 | 无需 | 需 STUN + TURN（TURN 中继要付费带宽） |
| 首连延迟 | 一次 WS 握手 | ICE 收集 + 信令交换，往往更慢 |
| 实际 RTT | 玩家 → 边缘 → 玩家（两跳） | 玩家 → 玩家（一跳，理论更低） |

WebRTC 唯一优势是理论 RTT 更低。但**回合制棋类不是动作游戏**：落子间隔以秒计，200ms 的目标对 WebSocket 完全可达（见 2.4）。为了几十毫秒放弃服务端权威，是拿护城河换一个用户感知不到的指标。

**WebRTC 的保留位**：P2 阶段的「好友对弈语音/视频」可单独引入 WebRTC Media（不承载棋步），届时另立 ADR。

### 2.2 为什么不能只用 Vercel（关键约束，必须周知）

Vercel 于 **2026-06-22** 上线原生 WebSocket 公测（基于 Fluid Compute），但存在硬限制：

1. 连接建立后被**钉在单个函数实例**上，其余连接不保证落到同一实例；
2. **没有跨实例广播机制**——玩家 A 与玩家 B 极可能落在不同实例，无法互相推送；
3. 无 presence（在线态）、无投递保证；
4. 时长上限 Hobby 5 分钟 / Pro 30 分钟，超时无自动重连；一盘象棋轻松超过 30 分钟。

结论：**Vercel 原生 WS 无法承载双人对弈房间**。同理，SSE 只有服务端→客户端单向，也不适用。这不是配置问题，是 serverless 执行模型的固有属性。必须外挂实时层。

### 2.3 实时层四方案对比与选型结论【RESOLVED 2026-08-07】

> **决策已落定：批准引入 Cloudflare Workers + Durable Objects 作为第 4 个平台依赖。**
> 以下对比表保留原始论证过程，供后续复盘与 ADR-006 引用。方案 B/C/D 已淘汰，不再作为备选路径维护。

| 方案 | 房间权威状态 | 全球延迟 | 运维成本 | MVP 月成本 | 评分 |
|---|---|---|---|---|---|
| **A. Cloudflare Durable Objects**（**已采纳**） | 原生：一房一 DO，单线程串行，天然无锁 | 边缘就近，可用 `locationHint` 定向 | 无服务器可运维，`wrangler deploy` | $0–5（免费额度 10 万请求/日 + 13000 GB-s/日；WS 入站消息按 20:1 计请求） | 5/5 采纳 |
| B. Ably / Pusher 托管 pub/sub | 无。需另建权威服务持有棋局态 | 好 | 低 | 免费档连接数很快见顶，$29+/月起 | 3/5 备选 |
| C. 自建 ws 服务（Fly.io / Railway） | 需自己实现房间路由 + 多实例间 Redis pub/sub | 需多区域部署才好 | 高（扩缩容、补丁、监控、二次故障点） | $10–30/月起，且常驻 | 2/5 不推荐 |
| D. Vercel 原生 WS 公测 | 不可行（见 2.2） | — | — | — | 淘汰 |

**采纳 A：Cloudflare Durable Objects。** 理由：

- **一房一对象**是回合制棋牌的教科书模型：单个 DO 串行处理该房所有消息，消除了竞态、锁、消息乱序这一整类问题，而不同房间天然水平分布。
- **WebSocket Hibernation API**：空闲期 DO 从内存驱逐但客户端连接保持，不计 GB-s 时长费。棋手思考 3 分钟不落子的场景下，成本近乎为零——这对棋类产品的成本模型是决定性的。
- DO 内嵌 SQLite 可存活局态；配合 **Alarms API 实现回合倒计时与超时判负**，不需要额外定时器服务，也不需要在 Vercel 侧跑 Cron 轮询活局。
- 与已锁定的 Vercel/Neon 不冲突：Vercel 管控制面与 SEO，CF 管数据面，Neon 是共同的持久层（Neon HTTP 驱动在 Workers 中可用）。

**四层职责边界（本次决策的最终形态，写入 Spec 时逐字引用）**：

| 平台 | 职责 | 明确不做 |
|---|---|---|
| **Vercel** | Next.js App、SSR/ISR/SEO、控制面 REST API、OG 图渲染、Cron 聚合 | 不持有任何 WebSocket 长连接；不做落子校验 |
| **Cloudflare Workers + DO** | 对弈房间权威状态、匹配队列、WS 广播、回合计时与超时判负 | 不直连 Neon 写业务表；不计算 Elo；不做 SEO 渲染 |
| **Neon Postgres** | 用户、对局、棋谱、评分、订阅的唯一持久化真源 | 不承载活局临时态（活局在 DO SQLite） |
| **waffo** | 支付、订阅、发票、税务、风控（**P1 启用**） | MVP 期不参与任何请求链路 |

跨层唯一写路径仍是终局 finalize（见 2.6），保持不变。

**残留风险（已接受，登记为 R2'）**：引入 CF 后系统有两个部署平台，发布需两条流水线，且 WS 协议变更需考虑前端与 Worker 的版本兼容（处理方案见 10.2）。这是获得边缘实时能力的必要代价，团队已知悉并接受。

### 2.4 延迟预算（<200ms 如何达成）

以「玩家落子 → 对手屏幕更新」端到端拆解（跨洲最坏情况，US-East 玩家 vs JP 玩家，DO 置于 US-East）：

```
玩家A 客户端处理与发送           ~5ms
A → 最近 CF 边缘节点             ~15ms
边缘 → DO 所在 colo（跨洲回程）   ~70ms   <-- 最大项
DO 内规则校验 + 状态写入          ~3ms    （纯函数 + DO 本地 SQLite）
DO → B 的边缘节点（跨洲）         ~70ms   <-- 与上一项非叠加，是同一路径的另一半？否，独立
边缘 → 玩家B                     ~15ms
B 客户端渲染                     ~8ms
------------------------------------------
同区对局（A/B 同洲）             ≈ 45–70ms   达标
跨洲对局（A/B 异洲）             ≈ 160–190ms 达标但无余量
```

**保障措施**：
1. **DO 位置策略**：房间创建时按「先入队玩家的 CF 边缘区域」传 `locationHint`；匹配器优先在同一大区（AMER / EMEA / APAC）内配对，跨区配对仅在等待超过阈值后放开。
2. **乐观 UI**：客户端用 `@yiboard/rules` 本地先行落子渲染，服务端 `move:ack` 回来后对账；若服务端拒绝则回滚并提示。用户主观延迟感知≈0。
3. **消息体极小**：落子消息为 `{t:"mv",s:12,p:180}`（约 20 字节），不传整盘。整盘快照仅在 `join`/`resync` 时下发。
4. **心跳**：客户端 25s ping，服务端 Alarm 检测 60s 无活动判定掉线（进入 120s 重连宽限期）。

**观测口径**：客户端上报 `move_rtt`（自发出到收到 ack），在 Vercel Analytics 自定义事件中打点，p50/p95/p99 三档看板。**p95 > 200ms 连续 24h 即触发架构复盘**。

### 2.5 匹配（Matchmaking）服务设计

```
MatchmakerDO  id = `mm:${gameType}:${mode}:${region}`     例：mm:gomoku:ranked:AMER
状态：waiting[] = [{userId, elo, joinedAt, ws, region}]
```

流程：

1. 客户端 `POST /api/v1/matchmaking/queue` → Vercel 校验登录态与是否已有进行中对局，签发**短时效 join token**（JWT，60s，含 userId/elo/gameType/mode）。
2. 客户端携 token 连 `wss://rt.yiboard.com/mm?token=...`；Gateway Worker 验签后转发到对应 MatchmakerDO。
3. DO 内配对算法（每 1s Alarm tick 一次）：
   - 初始 Elo 窗口 ±100；每等待 5s 扩大 ±100，上限 ±500。
   - 等待 > 20s 且本区无对手 → 允许跨区（改投 `mm:*:GLOBAL`）。
   - 等待 > 45s → 提示「转为人机对弈 / 继续等待」。
4. 配对成功：DO 生成 `roomId = uuidv7()`，同时向双方推 `{t:"matched", roomId, color, opponent:{...}}`，并把 `locationHint` 定为先入队方区域。
5. 双方各自连 `wss://rt.yiboard.com/room/{roomId}`，GameRoomDO 初始化。**双方 8s 内未到齐则房间作废，未到者记一次「弃局」**（防挂机刷匹配）。

**反滥用**：同一 userId 同时只允许一个匹配队列 + 一个进行中对局，状态记在 Upstash Redis（`user:{id}:active`，TTL 保护），Vercel 侧入队时校验。

### 2.6 房间（GameRoom）服务设计

`GameRoomDO` 职责边界：**只负责一局棋从开始到结束的权威状态与实时广播**，不负责 Elo 计算、不负责持久化排行榜。

内部状态（DO SQLite）：

```ts
// apps/realtime/src/rooms/game-room.ts —— 状态定义节选
interface RoomState {
  roomId: string;
  gameType: 'gomoku' | 'renju' | 'xiangqi';
  mode: 'ranked' | 'casual' | 'friend';
  players: { black: PlayerRef; white: PlayerRef };
  moves: number[];              // 紧凑编码，gomoku 为格子序号
  turn: 'black' | 'white';
  clock: { blackMs: number; whiteMs: number; lastTickAt: number };
  status: 'waiting' | 'playing' | 'finished';
  result?: { winner: 'black' | 'white' | 'draw'; reason: ResultReason };
  spectators: number;
}
```

消息协议（客户端 → 服务端）：

| type | 载荷 | 说明 |
|---|---|---|
| `join` | `{token}` | 首次进入或重连，服务端回 `sync` 全量快照 |
| `mv` | `{s: number}` | 落子，`s` 为格子序号 |
| `resign` | `{}` | 认输 |
| `draw:offer` / `draw:reply` | `{accept}` | 和棋协商 |
| `undo:offer` / `undo:reply` | `{accept}` | 悔棋（仅 casual/friend 模式开放） |
| `chat` | `{text}` | 房内聊天，服务端过滤 |
| `ping` | `{}` | 心跳 |

服务端 → 客户端：`sync` / `mv:ack` / `mv` / `clock` / `end` / `err` / `spectators`。

**落子处理流程（服务端权威）**：

```
收到 mv →
  1. 校验 ws 归属玩家 == 当前 turn，否则 err:NOT_YOUR_TURN
  2. rules.isLegalMove(state, s)，否则 err:ILLEGAL_MOVE（连续 3 次非法即断开）
  3. 扣减该方时钟；若 <= 0 → end(timeout)
  4. 追加 moves，切换 turn，写 DO SQLite
  5. rules.checkResult(state) → 若终局，进入终局流程
  6. 广播 mv 给房内所有连接；给落子方额外回 mv:ack（含服务端序号，用于客户端对账）
  7. 重设 Alarm = 当前方剩余时间（超时自动判负，无需外部定时器）
```

**终局流程（唯一落库入口）**：

```
GameRoomDO 生成 finalize payload（含 roomId 作幂等键、完整 moves、result、耗时）
  → POST https://yiboard.com/api/v1/internal/matches/finalize
     Header: X-YB-Signature: HMAC-SHA256(body, INTERNAL_SECRET)
             X-YB-Idempotency-Key: {roomId}
  → Vercel 侧：校验签名 → Neon 事务内 { 写 matches + games + 更新 ratings + 写 rating_history }
  → 返回 { eloDelta: {black, white}, newRating: {...} }
  → DO 广播 end 消息（含 Elo 变化）
失败重试：DO Alarm 退避重试 3 次（5s/30s/120s），仍失败则落 R2 死信队列 + Sentry 告警
```

幂等由 `matches.room_id UNIQUE` 兜底，重复 finalize 直接返回既有结果。

**规则同构的关键约束**：`@yiboard/rules` 被客户端（乐观 UI）与 DO（权威判定）**同一份代码**引用。禁止在任一端重写规则——这是本架构最容易被 AI 生成代码破坏的地方，必须在 Spec 中写成硬规则，并加一条 CI 检查：`packages/rules` 的测试用例必须在 Node 与 workerd 两个运行时下各跑一遍。

---

## 3. 对弈引擎集成策略

### 3.1 总原则：MVP 的 AI 跑在客户端，不跑在服务器

单人 AI 对弈是 PRD 的 P0 功能，也是流量最大的功能。若放服务端，每步一次函数调用，成本与延迟双输；放客户端（Web Worker + WASM）则：

- 单步 < 500ms 的 PRD 指标本地即可达成，无网络往返；
- **PWA 可离线对弈**（PRD 第 12.5 条「轻量可达」的实质兑现）；
- 服务器成本为零，扩量不涨钱。

代价：引擎代码可被逆向。但单机 AI 不涉及 Elo，不构成作弊风险，可接受。

### 3.2 分棋种策略

| 棋种 | MVP 范围 | 实现路径 | 许可 | 状态 |
|---|---|---|---|---|
| **五子棋 Gomoku** | **P0 必做** | 自研 minimax + α-β 剪枝 + 置换表 + 启发式排序；先出纯 TypeScript 版（Web Worker），性能不足再用 Rust → `wasm-pack` 编译 | 自有 | MVP 内 |
| **连珠 Renju（禁手）** | P1 | 在 `@yiboard/rules` 上叠加三三/四四/长连禁手判定；引擎复用 Gomoku，评估函数加禁手惩罚项 | 自有 | MVP 后 |
| **中国象棋 Xiangqi** | **下阶段**（主理人 2026-08-12 拍板：放入下阶段实现） | 集成 **ElephantEye（LGPL-2.1）** → Emscripten 编译 WASM 独立模块（嵌入闭源前端合规）。~~XQWLight（GPL-2.0）已否决：强 Copyleft，WASM 嵌入触发传染，前端须整体开源~~ | **已审查（LIC-2026-001）**：ElephantEye = LGPL-2.1 ✅；XQWLight = GPL-2.0 ❌ | 规划（下阶段） |
| **围棋 Go** | **P2，MVP 明确不做** | KataGo 需 GPU 推理，无法客户端跑。路径：① 接入外部 GPU 推理服务（Replicate / 自建 GPU 实例）做 AI 复盘，非实时对弈；② 或直接接 OGS API 做「跳转/联合登录」而非自建 | KataGo 为 MIT，权重另有许可 | **规划占位，不进 MVP** |
| 六子棋 Connect6 / 黑白棋 Othello | P2 | 规则简单，复用 Gomoku 引擎框架换评估函数 | 自有 | 规划 |

### 3.3 五子棋引擎设计要点（MVP 唯一需要自研的引擎）

```
packages/engine/src/gomoku/
├─ evaluate.ts      # 棋型识别（成五/活四/冲四/活三/眠三/活二），加权打分
├─ search.ts        # 迭代加深 + α-β + 置换表(Zobrist) + 杀棋搜索(VCF/VCT)
├─ candidates.ts    # 候选点生成：只搜已有棋子 2 格邻域，把分支因子从 225 压到 ~30
├─ book.ts          # 开局库（前 4 手查表，避免开局慢且弱）
└─ worker.ts        # Web Worker 入口，postMessage 协议
```

难度分级（PRD 要求「多难度」）：

| 难度 | 搜索深度 | 随机扰动 | 目标单步耗时 |
|---|---|---|---|
| Beginner | 2 | 30% 概率选次优点 | < 50ms |
| Easy | 4 | 10% | < 120ms |
| Normal | 6 | 0 | < 300ms |
| Hard | 8 + VCF | 0 | < 500ms |
| Master | 迭代加深至 480ms 时间片 | 0 | < 500ms（硬时限） |

**硬时限实现**：搜索循环每 2048 节点检查一次 `performance.now()`，超时立即返回当前最佳着法（迭代加深保证任何时刻都有可用解）。

**引擎必须有的测试**：`packages/engine/__tests__/tactics.spec.ts` 收录 50 个已知战术局面（必胜活四、必防冲四、双三），每个断言引擎给出唯一正解。这是防止 AI 生成的评估函数「看起来对但其实是随机数」的唯一有效手段。

---

## 4. 数据模型

### 4.1 ER 概览

```
users 1---1 profiles
users 1---N ratings          (每 game_type 一行)
users 1---N rating_history
users N---N users  via friends
users 1---N match_players
matches 1---N match_players  (对局参与方，2 行)
matches 1---1 games          (棋谱，热冷分离)
users 1---1 subscriptions    (waffo)
users 1---N payment_events   (waffo webhook 审计)
leaderboard_snapshots        (物化排行榜，定时刷新)
feature_flags                (灰度)
```

`matches` 与 `games` 拆开的理由：`matches` 是高频查询的元数据（列表、统计、排行榜关联），行小；`games` 存棋谱数组，行大且只在复盘时读。拆表避免大字段拖慢列表查询。

### 4.2 核心表定义

```sql
-- 扩展
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 枚举
CREATE TYPE game_type   AS ENUM ('gomoku','renju','xiangqi','connect6','othello','go');
CREATE TYPE match_mode  AS ENUM ('ranked','casual','friend','ai');
CREATE TYPE match_result AS ENUM ('black_win','white_win','draw','aborted');
CREATE TYPE result_reason AS ENUM ('five_in_row','checkmate','resign','timeout','draw_agreed','disconnect','forbidden_move','abort');

-- users：认证主体，只放认证相关字段
CREATE TABLE users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          CITEXT UNIQUE,                   -- 游客账号可为 NULL
  email_verified_at TIMESTAMPTZ,
  password_hash  TEXT,                            -- OAuth-only 用户为 NULL
  is_guest       BOOLEAN NOT NULL DEFAULT FALSE,
  status         TEXT NOT NULL DEFAULT 'active',  -- active | suspended | deleted
  last_login_at  TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at     TIMESTAMPTZ                       -- 软删除，GDPR 删除请求走硬删流程
);
CREATE UNIQUE INDEX idx_users_email_active ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- profiles：展示层资料，与 users 1:1 拆开（读写热度不同）
CREATE TABLE profiles (
  user_id       UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  username      CITEXT NOT NULL UNIQUE,            -- 3-20 字符，全站唯一
  display_name  TEXT,
  avatar_url    TEXT,
  country_code  CHAR(2),                           -- ISO 3166-1，用于国家榜
  locale        TEXT NOT NULL DEFAULT 'en',
  bio           TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_profiles_country ON profiles(country_code);

-- ratings：每用户每棋种一行，当前分值（热更新）
CREATE TABLE ratings (
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_type   game_type NOT NULL,
  elo         INTEGER NOT NULL DEFAULT 1200,
  rd          INTEGER NOT NULL DEFAULT 350,        -- 预留 Glicko-2 迁移
  games_played INTEGER NOT NULL DEFAULT 0,
  wins        INTEGER NOT NULL DEFAULT 0,
  losses      INTEGER NOT NULL DEFAULT 0,
  draws       INTEGER NOT NULL DEFAULT 0,
  peak_elo    INTEGER NOT NULL DEFAULT 1200,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, game_type)
);
-- 全球榜/国家榜核心索引
CREATE INDEX idx_ratings_leaderboard ON ratings(game_type, elo DESC)
  WHERE games_played >= 10;                        -- 不足 10 局不上榜，索引直接过滤

-- matches：对局元数据（不含棋谱）
CREATE TABLE matches (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id       UUID NOT NULL UNIQUE,              -- 幂等键，来自 GameRoomDO
  game_type     game_type NOT NULL,
  mode          match_mode NOT NULL,
  result        match_result NOT NULL,
  reason        result_reason NOT NULL,
  move_count    SMALLINT NOT NULL,
  duration_ms   INTEGER NOT NULL,
  is_rated      BOOLEAN NOT NULL DEFAULT FALSE,
  started_at    TIMESTAMPTZ NOT NULL,
  finished_at   TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_matches_type_time ON matches(game_type, finished_at DESC);
-- 北极星指标「高质量对局」专用索引
CREATE INDEX idx_matches_quality ON matches(finished_at DESC)
  WHERE reason NOT IN ('abort','disconnect') AND move_count >= 10;

-- match_players：每局 2 行，承载「我的对局」查询
CREATE TABLE match_players (
  match_id    UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,   -- AI 对手为 NULL
  side        TEXT NOT NULL,                                   -- 'black' | 'white'
  is_ai       BOOLEAN NOT NULL DEFAULT FALSE,
  ai_level    SMALLINT,
  elo_before  INTEGER,
  elo_after   INTEGER,
  elo_delta   INTEGER,
  PRIMARY KEY (match_id, side)
);
-- 个人对局历史的主查询路径
CREATE INDEX idx_match_players_user ON match_players(user_id, match_id DESC);

-- games：棋谱本体（冷数据）
CREATE TABLE games (
  match_id    UUID PRIMARY KEY REFERENCES matches(id) ON DELETE CASCADE,
  moves       JSONB NOT NULL,          -- 紧凑数组 [112,113,97,...]
  clock_log   JSONB,                   -- 每步剩余时间，用于复盘节奏分析
  initial_fen TEXT,                    -- 象棋/围棋让子局用
  sgf_url     TEXT,                    -- 大局面归档到 R2 后回填
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- friends：好友关系（单向存储 + 双向查询）
CREATE TABLE friends (
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'pending',   -- pending | accepted | blocked
  requested_by UUID NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, friend_id),
  CONSTRAINT no_self_friend CHECK (user_id <> friend_id)
);
CREATE INDEX idx_friends_reverse ON friends(friend_id, status);

-- rating_history：Elo 变化时间线（画曲线 + 申诉举证）
CREATE TABLE rating_history (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_type   game_type NOT NULL,
  match_id    UUID REFERENCES matches(id) ON DELETE SET NULL,
  elo_before  INTEGER NOT NULL,
  elo_after   INTEGER NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_rating_history_user ON rating_history(user_id, game_type, created_at DESC);

-- leaderboard_snapshots：排行榜物化，避免高频扫 ratings
CREATE TABLE leaderboard_snapshots (
  id            BIGSERIAL PRIMARY KEY,
  game_type     game_type NOT NULL,
  scope         TEXT NOT NULL,          -- 'global' | 'country:US' | ...
  period        TEXT NOT NULL,          -- 'all_time' | 'weekly'
  rank          INTEGER NOT NULL,
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  elo           INTEGER NOT NULL,
  generated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX idx_lb_unique ON leaderboard_snapshots(game_type, scope, period, rank, generated_at);
CREATE INDEX idx_lb_lookup ON leaderboard_snapshots(game_type, scope, period, generated_at DESC, rank);

-- subscriptions：waffo 订阅态镜像（本地判权限，不每次回查 waffo）
CREATE TABLE subscriptions (
  user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  provider            TEXT NOT NULL DEFAULT 'waffo',
  provider_customer_id TEXT,
  provider_sub_id     TEXT UNIQUE,
  plan                TEXT NOT NULL DEFAULT 'free',      -- free | pro_monthly | pro_yearly
  status              TEXT NOT NULL DEFAULT 'inactive',  -- active | past_due | canceled | inactive
  current_period_end  TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_subs_status ON subscriptions(status, current_period_end);

-- payment_events：所有 waffo webhook 原样落盘（对账 + 幂等 + 审计）
CREATE TABLE payment_events (
  id             BIGSERIAL PRIMARY KEY,
  provider       TEXT NOT NULL DEFAULT 'waffo',
  provider_event_id TEXT NOT NULL,
  event_type     TEXT NOT NULL,
  user_id        UUID REFERENCES users(id) ON DELETE SET NULL,
  payload        JSONB NOT NULL,
  processed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_event_id)             -- webhook 幂等的唯一保证
);

-- feature_flags：灰度发布
CREATE TABLE feature_flags (
  key         TEXT PRIMARY KEY,
  enabled     BOOLEAN NOT NULL DEFAULT FALSE,
  rollouts    JSONB NOT NULL DEFAULT '{}',          -- {user_ids:[], percentage:0}
  description TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

> **waffo 相关表的 MVP 状态**：`subscriptions` 与 `payment_events` 两表**在 MVP 首次迁移中即建好**，但 MVP 期间不会有任何写入（无支付流量）。这是有意为之——表结构先落地，P1 接 waffo 时不需要动数据模型，避免生产环境改表。所有用户在 MVP 期视同 `plan='free'`，权限判定读不到行时按 free 处理（见 6.4 降级规则）。

### 4.3 游客账号数据设计【MVP 范围，D5 开放】

PRD 15.2 要求「朋友打开链接无需注册即可对弈」，这是好友裂变链路的前提。但 PRD 未定义这个账号形态，工程上必须补齐——否则「无需注册」与「对局要记 user_id」直接矛盾。

**设计原则：游客是 `users` 表里的一等公民，不另建表。** 这样对局、好友房、棋谱等所有关联关系无需写两套逻辑，转正时也不必做跨表数据搬迁。

```sql
-- 复用 4.2 的 users 表，游客态由 is_guest 标识：
--   is_guest = TRUE  → email / password_hash 均为 NULL
--   转正时 UPDATE users SET is_guest=FALSE, email=..., password_hash=...
--   user_id 全程不变，历史对局自动继承，无需数据迁移

-- 游客的展示名：注册用户在 profiles.username 唯一占位；
-- 游客同样占一行 profiles，username 由系统生成，加保留前缀防冒充
--   格式：guest_<8位base32>   例：guest_k7m2x9qd
-- 注册用户禁止使用 guest_ 前缀（在应用层校验 + 下面的 CHECK 兜底）
ALTER TABLE profiles
  ADD CONSTRAINT chk_guest_username_prefix
  CHECK (
    username NOT ILIKE 'guest\_%' ESCAPE '\'
    OR user_id IN (SELECT id FROM users WHERE is_guest)
  );
-- 注：上述 CHECK 含子查询，Postgres 不支持；实际以 BEFORE INSERT/UPDATE 触发器实现，
--     此处仅表达约束语义。Spec 阶段落为 trigger fn_check_guest_username()。

-- 游客清理：90 天无活动且从未完成对局的游客账号硬删
CREATE INDEX idx_users_guest_gc ON users(last_login_at)
  WHERE is_guest AND deleted_at IS NULL;
```

**游客的能力边界（防刷设计）**：

| 能力 | 游客 | 注册用户 |
|---|---|---|
| 好友房对弈（凭邀请码进房） | 允许 | 允许 |
| 人机对弈 | 允许 | 允许 |
| 全球快速匹配 | **仅 casual 模式** | casual + ranked |
| 计 Elo / 上排行榜 | **禁止** | 允许 |
| 保存棋谱并回看 | 允许（绑定在游客 id 上） | 允许 |
| 加好友 / 私信 | 禁止 | 允许 |
| 修改头像 / 自定义用户名 | 禁止 | 允许 |
| 跨设备访问 | 禁止（仅本设备 cookie） | 允许 |

**为什么游客不计 Elo**：游客账号创建成本为零（一次 POST），若计分则可无限刷小号送分。这条是天梯系统能否成立的前提，不可放宽。

**为什么游客仍然记棋谱**：这是转正的最强钩子——「你已经下了 7 盘棋，注册即可永久保存并跨设备查看」，比空洞的「注册解锁更多功能」有效得多。

**数据生命周期**：

```
游客创建（POST /api/v1/auth/guest）
  → users(is_guest=TRUE) + profiles(username='guest_xxxx')
  → 下发 180 天 httpOnly cookie（唯一识别凭据）
        |
        +--> 转正（POST /api/v1/auth/guest/upgrade）
        |      UPDATE users SET is_guest=FALSE, email=?, password_hash=?
        |      UPDATE profiles SET username=? （用户自选，查重）
        |      user_id 不变 → match_players / games / ratings 全部自动继承
        |      转正后补发正式 session，游客 cookie 失效
        |
        +--> 自然消亡（Vercel Cron 每日跑一次 GC）
               条件：is_guest AND last_login_at < now()-90d
                     AND NOT EXISTS(该用户任何 match_players 行)
               动作：硬删 users 行（级联删 profiles）
               说明：有对局记录的游客不删——删了会让对手的历史对局出现空白对手
                     此类账号改为 180 天后匿名化（profiles 置空，保留 user_id）
```

**GDPR 关联**：游客账号本身只含一个 cookie 标识 + 可选国家码，属最小化收集。但仍需在 Cookie 同意横幅中把「游客身份 cookie」列为必要 cookie 并说明用途与保留期。

### 4.4 索引策略说明

遵循「MVP 不建复合索引、慢了再加」的原则，但以下四条是**从第一天就必须有的**，因为它们对应的是必然发生的高频查询：

| 索引 | 支撑查询 | 不建的后果 |
|---|---|---|
| `idx_ratings_leaderboard` (game_type, elo DESC) partial | 排行榜 Top N | 全表排序，用户过万即超时 |
| `idx_match_players_user` (user_id, match_id DESC) | 「我的对局」列表 | 每次翻页全表扫 |
| `idx_matches_quality` partial | 北极星指标日报 | 分析查询拖垮生产库 |
| `payment_events UNIQUE(provider, event_id)` | webhook 幂等 | 重复扣费/重复开通会员，属于资损级事故 |

**明确不建**：`games.moves` 的 GIN 索引（MVP 无棋谱内容检索需求）、任何三列以上复合索引。

**MVP 明确不做**：分区表、读写分离、物化视图自动刷新（`leaderboard_snapshots` 先用 Vercel Cron 每 10 分钟全量重算，用户量到十万级再优化）。

---

## 5. MVP API 端点清单

统一响应格式：

```json
{ "code": 0, "data": {}, "message": "" }
```

`code` 非 0 时 `data` 为 `null`，`message` 为面向用户的可读文案（已 i18n）。HTTP 状态码与 `code` 并存：4xx/5xx 用于机器识别，`code` 用于业务细分。

认证列含义：`公开` = 无需登录；`可选` = 登录与否行为不同；`必需` = 需有效 access token；`内部` = 仅 HMAC 签名调用。

### 5.1 Auth

| Method | Path | 用途 | 认证 |
|---|---|---|---|
| POST | `/api/v1/auth/register` | 邮箱密码注册，发验证邮件 | 公开 |
| POST | `/api/v1/auth/login` | 登录，签发 access + refresh | 公开 |
| POST | `/api/v1/auth/logout` | 注销，吊销 refresh token | 必需 |
| POST | `/api/v1/auth/refresh` | 用 refresh 换新 access（滚动刷新） | 公开（凭 cookie） |
| POST | `/api/v1/auth/guest` | 创建游客账号（无需注册即可对弈，对应 PRD 15.2「朋友打开链接无需注册」） | 公开 |
| POST | `/api/v1/auth/guest/upgrade` | 游客转正式账号，继承棋局历史 | 必需（游客态） |
| GET | `/api/v1/auth/oauth/:provider` | OAuth 跳转（google / apple / discord） | 公开 |
| GET | `/api/v1/auth/oauth/:provider/callback` | OAuth 回调 | 公开 |
| POST | `/api/v1/auth/verify-email` | 校验邮箱验证码 | 公开 |
| POST | `/api/v1/auth/password/forgot` | 发送重置邮件 | 公开 |
| POST | `/api/v1/auth/password/reset` | 用 token 重置密码 | 公开 |
| GET | `/api/v1/auth/session` | 取当前会话（含订阅态与 feature flags） | 可选 |

### 5.2 Matchmaking

| Method | Path | 用途 | 认证 |
|---|---|---|---|
| POST | `/api/v1/matchmaking/queue` | 入队，返回 realtime join token + WS 地址 | 必需（含游客） |
| DELETE | `/api/v1/matchmaking/queue` | 退出队列 | 必需 |
| GET | `/api/v1/matchmaking/status` | 查询排队状态与预计等待（降级轮询用） | 必需 |
| POST | `/api/v1/matchmaking/rooms` | 创建好友房，返回可分享短链 + 邀请码 | 必需（含游客） |
| POST | `/api/v1/matchmaking/rooms/:code/join` | 凭邀请码入房，返回 join token | 可选（游客可入） |
| GET | `/api/v1/matchmaking/rooms/:code` | 查房间元信息（供分享页 SSR 渲染 OG 卡） | 公开 |

### 5.3 Game

| Method | Path | 用途 | 认证 |
|---|---|---|---|
| GET | `/api/v1/games` | 对局列表，支持 `?userId=&gameType=&mode=&page=&limit=` | 可选 |
| GET | `/api/v1/games/:matchId` | 单局详情（元数据 + 双方 + 结果） | 公开 |
| GET | `/api/v1/games/:matchId/moves` | 完整棋谱，供复盘播放器 | 公开 |
| GET | `/api/v1/games/:matchId/sgf` | 导出 SGF/PGN 文本 | 公开 |
| GET | `/api/v1/games/active` | 我当前进行中的对局（断线重连恢复入口） | 必需 |
| POST | `/api/v1/games/ai` | 开一局人机（记录用，实际计算在客户端） | 可选 |
| POST | `/api/v1/games/ai/:matchId/finish` | 人机局结算（不计 Elo，只记统计） | 可选 |
| POST | `/api/v1/internal/matches/finalize` | GameRoomDO 终局回写（幂等） | **内部** |

### 5.4 Leaderboard

| Method | Path | 用途 | 认证 |
|---|---|---|---|
| GET | `/api/v1/leaderboard` | 排行榜，`?gameType=&scope=global\|country:XX&period=all_time\|weekly&page=&limit=` | 公开 |
| GET | `/api/v1/leaderboard/me` | 我的名次与前后各 5 名 | 必需 |
| GET | `/api/v1/leaderboard/countries` | 国家分布榜（对应 KPI「Top 5 国家」） | 公开 |

**段位返回字段（九品 + 段位双轨，team-lead 裁定）**：ranking / leaderboard 接口除返回精确 `elo` 数值外，必须返回派生**段位（rank title）**字段。段位由 `ratings.elo` 在读取时按分档映射得出，**不新增数据库列**（沿用 ADR-009 的 Elo 单表，段位为纯派生展示层）：

- 双轨：先「九品」（九品最低 → 一品最高），再晋「段位」（初段 → 九段），呼应东亚棋类文化传统与产品文化叙事。
- 英文译名随字段一并返回（i18n），避免非中文用户看不懂「品 / 段」。

```ts
// 段位分档（ELO → 段位，具体边界为 Spec 调参项）
interface RankTitle {
  elo: number;          // 精确 ELO 数值（ranking API 原样返回）
  tier: 'pin' | 'dan';  // 品 | 段
  level: 1..9;          // 品级 / 段级
  name_zh: string;      // 例：九品 / 一品 / 初段 / 九段
  name_en: string;      // 例：Novice / Master / 1st Dan / 9th Dan
}
// 代表分档（ELO 边界供 Phase 1.5 openapi.yaml 校准）：
//   九品 Novice         1000–1149    六品 Adept         1350–1449
//   八品 Apprentice     1150–1249    五品 Skilled       1450–1549
//   七品 Disciple       1250–1349    四品 Proficient    1550–1649
//                              三品 Expert        1650–1749
//                              二品 Master Cand.  1750–1849
//                              一品 Master        1850–1949
//   初段 1st Dan        1950–2049  …  九段 9th Dan  2750+
```

ranking API（`GET /api/v1/leaderboard/me` 与 `GET /api/v1/leaderboard`）响应 `data` 每项含 `{ elo: number, rank: RankTitle }`，前端展示段位徽章 + ELO 数值。完整 schema 在 Phase 1.5 的 `openapi.yaml` 落定（见 ADR-013）。

### 5.5 Profile

| Method | Path | 用途 | 认证 |
|---|---|---|---|
| GET | `/api/v1/profile/:username` | 公开主页（战绩、Elo 曲线、近期对局） | 公开 |
| GET | `/api/v1/profile/me` | 我的完整资料 | 必需 |
| PATCH | `/api/v1/profile/me` | 改昵称/头像/国家/语言/简介 | 必需 |
| GET | `/api/v1/profile/me/stats` | 分棋种统计（胜率、平均步数、最长连胜） | 必需 |
| GET | `/api/v1/profile/me/rating-history` | Elo 时间序列 | 必需 |
| GET | `/api/v1/profile/username-available` | 用户名查重（注册时防抖调用） | 公开 |
| GET | `/api/v1/friends` | 好友列表（含在线态） | 必需 |
| POST | `/api/v1/friends/requests` | 发起好友请求 | 必需 |
| PATCH | `/api/v1/friends/requests/:id` | 接受/拒绝 | 必需 |
| DELETE | `/api/v1/friends/:userId` | 删除好友 | 必需 |

### 5.6 辅助端点（非五大类，但 MVP 必需）

| Method | Path | 用途 | 认证 |
|---|---|---|---|
| GET | `/api/v1/features` | 当前用户可见的 feature flags | 可选 |
| GET | `/api/v1/health` | 健康检查（DB + Redis + Realtime 连通性） | 公开 |
| POST | `/api/v1/billing/checkout` | 创建 waffo 支付会话 | 必需 |
| GET | `/api/v1/billing/subscription` | 我的订阅态 | 必需 |
| POST | `/api/v1/billing/portal` | 跳转 waffo 自助管理页 | 必需 |
| POST | `/api/v1/webhooks/waffo` | 接收 waffo 事件 | 签名校验 |
| POST | `/api/v1/account/export` | GDPR 数据导出请求 | 必需 |
| DELETE | `/api/v1/account` | GDPR 账号删除请求 | 必需 |

### 5.7 错误码规范

| code | HTTP | 含义 |
|---|---|---|
| 0 | 200/201 | 成功 |
| 1000 | 400 | 参数校验失败（`data.fields` 给字段级错误） |
| 1001 | 401 | 未登录或 access token 失效 |
| 1002 | 403 | 无权限（含会员功能未订阅） |
| 1003 | 404 | 资源不存在 |
| 1004 | 409 | 冲突（用户名已占用、已在队列中、重复 finalize） |
| 1005 | 429 | 触发限流（`data.retryAfter` 秒） |
| 2000 | 400 | 对局态错误（非你回合、非法着法、对局已结束） |
| 2001 | 409 | 已有进行中对局，需先结束 |
| 3000 | 402 | 支付相关失败（waffo 返回） |
| 5000 | 500 | 服务端内部错误（`data.traceId` 供工单排查） |
| 5001 | 503 | 依赖不可用（Neon / Realtime 降级中） |

---

## 6. 认证方案

### 6.1 选型：Auth.js（NextAuth v5）作为骨架 + 自管 JWT 用于实时层

MVP 需要邮箱密码 + OAuth（Google / Apple / Discord）+ **游客账号**三条路径。Auth.js v5 与 App Router 集成度最高，OAuth provider 现成，不必重写。但 Auth.js 的 session 不适合直接给 Cloudflare Worker 验签，因此分两套凭证：

```
浏览器 ←→ Vercel（控制面）
  凭证：httpOnly + Secure + SameSite=Lax 的 session cookie（Auth.js 管理，JWT 策略）
  access  有效期 15 分钟
  refresh 有效期 7 天，滚动刷新（每次刷新签发新 refresh，旧的立即失效）

浏览器 ←→ Cloudflare（数据面）
  凭证：短时效 join token（独立 JWT，60 秒，一次性）
  由 /api/v1/matchmaking/queue 或 /rooms/:code/join 签发
  payload: { sub: userId, un: username, elo, gt: gameType, mode, roomId?, exp, jti }
  签名算法：EdDSA（Ed25519）
  Worker 侧只需持有公钥即可离线验签，无需回调 Vercel
```

**为什么 join token 用 Ed25519 而非 HS256**：Worker 侧只放公钥，即使 Worker 代码或环境变量泄露，也无法伪造 token。HS256 需要共享密钥，泄露即全线沦陷。

**refresh token 存储**：`sessions` 表（本文档 4.2 未列，Auth.js adapter 自动建），字段含 `token_hash`（不存明文）、`user_agent`、`ip_hash`、`expires_at`。用户可在「设备管理」页逐个吊销。

**密码哈希**：Argon2id（`@node-rs/argon2`，Rust 实现，Vercel Node runtime 可用），参数 m=19456, t=2, p=1。不用 bcrypt。

### 6.2 游客账号认证设计【MVP 范围，D5 开放】

> **guest 账户体系（MVP 关键设定）**：好友房链接免注册即可直开对弈；注册仅用于存档 / 段位 / 订阅等持久化能力。guest 会话用匿名 token（`__Host-yb_guest` cookie，JWT HS256，180 天过期），过期后可绑定邮箱升级为正式账号（`POST /api/v1/auth/guest/upgrade`），`user_id` 全程不变、历史对局零成本继承。

数据侧设计见 4.3，此处只讲凭证与流转。

**核心难点**：游客没有密码，凭证只能是 cookie 本身。这意味着 cookie 一旦泄露即等同账号被盗。缓解方式是**限制游客账号的价值**——不计 Elo、不能加好友、不能改资料，被盗也损失有限。这是刻意的安全与体验的权衡。

```
游客凭证
  cookie 名：__Host-yb_guest
  属性：httpOnly + Secure + SameSite=Lax + Path=/ + Max-Age=15552000（180 天）
  内容：JWT（HS256，服务端密钥），payload = { sub: userId, g: true, iat, exp }
  不做滚动刷新（游客无 refresh 概念）；过期即重新生成新游客身份，但服务端 users 行保留，用户随后可用「绑定邮箱升级」继承历史对局转为正式账号
```

**三条进入路径**：

```
路径 1：朋友房链接直入（PRD 15.2 的主链路，转化率最高）
  访客点开 /join/{code}
    → SSR 渲染邀请页（含 OG 卡：谁邀请你、什么棋种）
    → 点「立即对弈」
    → POST /api/v1/auth/guest（无需任何输入，零摩擦）
    → 种 __Host-yb_guest cookie
    → POST /api/v1/matchmaking/rooms/{code}/join 拿 join token
    → 连 WS 进房开局
  全程零表单、零跳转，从点开链接到落第一子目标 < 5 秒

路径 2：首页直接玩人机
  点「Play Gomoku」→ 若无任何会话则静默创建游客 → 进入单机对弈

路径 3：全球匹配（仅 casual）
  游客可排队 casual，不可排 ranked（4.3 能力边界表）
```

**转正时机与实现**（不做强制弹窗，只在有说服力的节点提示）：

| 触发时机 | 提示文案方向 |
|---|---|
| 首局结束且获胜 | 保存这场胜利到你的战绩 |
| 累计 3 局后 | 你已下了 3 盘，注册即可永久保存棋谱 |
| 尝试排 ranked / 加好友 | 该功能需要注册账号 |
| 尝试换设备（无法做到，仅在设置页提示） | 注册后可在手机上继续 |

```
POST /api/v1/auth/guest/upgrade  { email, password, username }
  在单个 Neon 事务内：
    1. 校验 email 未被占用、username 未被占用且不带 guest_ 前缀
    2. UPDATE users SET is_guest=FALSE, email=?, password_hash=?, email_verified_at=NULL
       WHERE id = <当前游客 id> AND is_guest = TRUE   -- 条件防并发重复转正
    3. UPDATE profiles SET username=? WHERE user_id = <同一 id>
    4. INSERT INTO ratings（若此前无行，按 1200 初始化；游客期对局不追溯计分）
    5. 签发正式 Auth.js session，清除 __Host-yb_guest cookie
  user_id 全程不变 → match_players / games 历史零成本继承
  发送邮箱验证邮件（未验证不影响对弈，只限制找回密码）
```

**必须守住的三条安全约束**：

1. **游客创建要限流**：`POST /api/v1/auth/guest` 限 10 次/小时/IP。否则可被脚本批量刷账号，污染统计并撑大 users 表。
2. **游客不得进入 ranked 队列**：在 `/api/v1/matchmaking/queue` 入口硬校验 `is_guest === false`，不能只靠前端隐藏按钮。
3. **游客期对局不追溯计分**：转正后 Elo 从 1200 起算，此前游客期的对局记录保留在历史里但不参与评分计算。否则可以「游客期刷一堆胜局再转正」绕过防刷。

### 6.3 waffo 在认证链路中的位置

**结论：waffo 不参与认证。** 见第 8 章调研结论——waffo 是 Merchant of Record 支付/变现平台，不是身份提供商。它只在链路末端消费 `userId`：

```
用户身份（Auth.js / 我方 users 表，唯一真源）
        |
        | userId 作为 waffo 的 external customer reference
        v
waffo（支付/订阅/发票/税务/风控）        【P1 启用，MVP 期整条链路不通电】
        |
        | webhook 回传订阅状态
        v
subscriptions 表（本地镜像，鉴权时只读本地，不回查 waffo）
```

权限判定一律读本地 `subscriptions`，不在请求路径上同步调 waffo（否则 waffo 抖动 = 全站会员功能不可用）。

### 6.4 MVP 期的权限判定降级规则

因 MVP 不接支付，`subscriptions` 表将始终为空。权限判定必须能优雅处理「查不到行」：

```ts
// src/server/auth/entitlement.ts
export async function getEntitlement(userId: string): Promise<Entitlement> {
  if (!flags.billing_enabled) return FREE_TIER;      // MVP：一律 free，不查库
  const sub = await db.query.subscriptions.findFirst({ where: eq(...) });
  if (!sub) return FREE_TIER;                        // 查不到 = free，不是错误
  return mapPlanToEntitlement(sub);
}
```

`billing_enabled` 是 `feature_flags` 表里的一条，MVP 期为 `false`。P1 接通 waffo 后翻为 `true`，无需改任何调用方代码。所有会员限定功能（AI Hard/Master、深度复盘、专属主题）在 MVP 期的表现由 PM 决定：**建议全部开放**，用完整体验换早期口碑与留存数据，P1 上会员时再按数据划线。

---

## 7. 多语言 i18n 方案

### 7.1 技术方案

> **i18n 架构锁定**：路由 `app/[locale]/...`（next-intl 4.x，默认语言 `en` 无前缀），文案目录 `apps/web/messages/{locale}.json` 已预留；首批 4 语种 **EN / ES / JA / PT-BR**，增删语种零改路由（locale 架构已按 `[locale]` 预留）。

- 库：**`next-intl` 4.x**（App Router 原生支持、Server Component 可直接取文案、支持 ICU MessageFormat 复数/性别/日期）。
- 路由：`app/[locale]/...`，`localePrefix: 'as-needed'`（默认语言 `en` 无前缀，其余为 `/es/`、`/ja/`、`/pt-br/`）。
  - 决策依据：`en` 无前缀让主站 URL 最干净、外链权重不分散；其余语言带前缀便于 hreflang 与 GSC 分区统计。
- 语言协商顺序：URL 前缀 > 用户 profile.locale > `NEXT_LOCALE` cookie > `Accept-Language` > `en`。
  - **绝不做静默重定向**：用 IP/Header 猜到的语言只作为顶栏「切换到 español ?」的软提示，不强制跳转。强制跳转会破坏 Google 爬虫抓取（爬虫多来自美国 IP），是多语言站最常见的 SEO 自伤。
- 文案组织：`apps/web/messages/{locale}.json`，按功能域分顶层 key（`common` / `play` / `compete` / `account` / `seo`），单文件不超过 300 行则拆为 `messages/{locale}/{domain}.json`。

### 7.2 MVP 语言范围

PRD 第 13.1 要求 MVP 上 2–4 语言。**D7 已锁定 4 种：EN / ES / JA / PT-BR**（用户拍板，locale 架构与 `messages/` 文案目录已就绪）：

| locale | 语言 | 选择理由 |
|---|---|---|
| `en` | English（默认） | 全球默认，SEO 主战场 |
| `es` | Español | 调研显示围棋/棋类西语用户是 OGS 最大群体，且西语 SEO 竞争度低 |
| `ja` | 日本語 | 五子棋在日本为「五目並べ」，认知度极高，且日本是棋类付费意愿最强市场 |
| `pt-BR` | Português（Brasil） | **D7 已锁定**；巴西为葡语最大市场，棋类增长快 |

P1 扩至 de / fr / zh-Hans / ru / ko / th（对标 Gomoku.com 的 15+ 语言；zh-Hans 由 MVP 候选移至 P1）。

**故意不在 MVP 上繁体中文**：与 zh-Hans 高度重叠，投入产出比低于 es/ja，P1 再补。

### 7.3 译制流程（工程化，不靠人肉）

```
1. 开发只写 en.json（唯一源语言）。PR 中新增 key 必须同时写 en 文案。
2. CI 检查：i18n-lint
   - 所有 locale 文件 key 集合必须与 en.json 一致（缺失 = 构建失败）
   - 禁止 JSX 中出现硬编码可见字符串（ESLint 规则 react/jsx-no-literals + 白名单）
3. en.json 变更 → GitHub Action 推送到 Crowdin
4. Crowdin 机器预翻译（DeepL/GPT）→ 母语者校对
   - 参考 Xiangqi.com 打法：招募非华人志愿者校对，给「贡献者徽章 + 终身会员」而非现金
5. Crowdin 回推 PR → 人工 review 合并
6. 棋类术语表（glossary）先行锁定：Gomoku/Renju/Xiangqi/forbidden move/Elo/rank 等
   术语表在 Crowdin 中强制生效，防止同一术语在不同页面译法不一
```

**必须本地化的非文案部分**（最易漏）：
- 日期/时间/数字格式（用 `Intl` API，不手写）
- 棋子标注：象棋棋子对非中文用户需图形化（PRD 12.1 明确要求），准备「汉字版 / 西式符号版」两套 `packages/pieces` 资产，用户可切换
- OG 图片与 meta description（每语言一套）
- 邮件模板（Resend 按 locale 选模板）

---

## 8. 支付与会员（waffo）【MVP 不接入，P1 启用 — RESOLVED】

> **决策已落定（2026-08-07）**：
> - **MVP 不接 waffo，不启动 KYB。** MVP 期只建 `subscriptions` / `payment_events` 两张表，以及 checkout / portal / webhook 三个接口的**空壳实现**（返回 `501 NOT_IMPLEMENTED`，`code=5002`）。
> - **waffo 集成与 KYB 签约整体推到 P1**（1–3 月，与会员订阅功能同期上线）。
> - 原「waffo KYB 时序」阻塞项状态：**RESOLVED**。KYB 不再是 MVP 上线时间线的外部依赖，风险 R1 降级。waffo 已确认为 **MoR（Merchant of Record，非纯网关）**：由平台作为记录商户承担税务与合规，**无需我方注册境外主体、无 4-8 周实体注册**；MVP 不集成，P1 接入 MoR 亦无此负担，PM 关于「纯网关需境外主体、Phase 0 必须并行 KYB」的担忧不成立。
>
> **这么定的价值**：waffo 的 KYB 审核周期不可控（官网流程为 KYB 审核 → 签合同 → 集成 → 发布）。把它从 MVP 关键路径上摘掉，意味着 MVP 上线时间只取决于我们自己的开发进度。同时 PRD 路线图 0–1 月本来就只验证「五子棋钩子」，此时没有任何定价数据支撑会员设计，早接也是白接。

### 8.0 MVP 期空壳的具体范围（本节为 MVP 唯一需要实现的部分）

**建但不用**：

| 项 | MVP 状态 | 说明 |
|---|---|---|
| `subscriptions` 表 | 建表，无写入 | 首次迁移即建好，P1 不再改表 |
| `payment_events` 表 | 建表，无写入 | 同上，`UNIQUE(provider, event_id)` 幂等约束先就位 |
| `BillingProvider` 接口 | 定义完整（见 8.3） | 类型先定死，P1 只填实现 |
| `POST /api/v1/billing/checkout` | 空壳，返回 501 | 路由与鉴权中间件先跑通 |
| `GET /api/v1/billing/subscription` | 返回固定 `{plan:'free',status:'inactive'}` | 前端可正常渲染，不需要 P1 改前端 |
| `POST /api/v1/billing/portal` | 空壳，返回 501 | |
| `POST /api/v1/webhooks/waffo` | 空壳，返回 501 | 端点先占位，避免 P1 改路由结构 |
| `feature_flags.billing_enabled` | 值为 `false` | P1 翻 true 即通电 |
| 前端会员入口 UI | **完全不渲染**（由 flag 控制） | 用户看不到任何付费相关元素 |

**MVP 明确不做**：waffo KYB 申请、合同签署、沙箱联调、SDK 引入、定价页、结算对账、税务配置、PPP 分区定价。

**P1 启用清单（按序执行，供 PM 排期）**：

```
P1-1  提交 waffo KYB 材料（外部依赖，周期不可控，建议 P1 一开始就启动）
P1-2  拿到沙箱账号与 API 文档 → 校正 8.3 的接口假设（当前基于通用 MoR 形态推演）
P1-3  实现 src/server/billing/waffo/index.ts（唯一与 waffo SDK 耦合的文件）
P1-4  webhook 幂等流水线联调（8.3 六步）
P1-5  沙箱全链路走查：订阅 / 续费失败 / 主动取消 / 退款 / 拒付
P1-6  feature_flags.billing_enabled 灰度开启（5% → 50% → 100%，见 10.x 灰度策略）
```

### 8.1 waffo 角色调研结论

**已联网核实（waffo.com / dev.waffo.com / waffo.com/about，访问日期 2026-08-07）：**

- waffo 是**全球支付基础设施 + Merchant of Record（MoR）平台**，定位为「digital native business 的全球变现层」。
- 能力：一套 API 覆盖 430+ 支付方式 / 70+ 币种 / 50+ 地区；订阅计费（固定/用量/混合）；自动开票与催缴；**代收代缴税务与合规**；欺诈与拒付管理；KYC/KYB 自动化；沙箱环境；Webhook 事件体系；PCI DSS 认证。
- 明确面向的行业含 **Gaming**（应用内购买、虚拟货币、全球支付、反欺诈）与 AI/SaaS。
- 团队背景：由蚂蚁集团及全球支付/电商公司资深团队创立，办公室在东京、香港、新加坡。

**结论：waffo = 支付/会员/变现层，不是鉴权层。** 已按此落位到第 1 章 L6 外部服务，以及 4.2 的 `subscriptions` / `payment_events` 表、5.6 的 billing 端点。认证链路不经过 waffo（见 6.3）。

> **待确认项状态更新（2026-08-07）**
>
> | 原待确认项 | 状态 | 结论 |
> |---|---|---|
> | waffo 角色是否为「支付 + 订阅 + MoR」 | **RESOLVED** | 是。已联网核实官网三个页面，按支付层落位 |
> | KYB 是否已签约、是否阻塞 MVP | **RESOLVED** | MVP 不启动 KYB，整体推 P1，**不再阻塞 MVP 上线** |
> | waffo 是否需我方注册境外主体 / 4-8 周实体注册 | **RESOLVED** | 否。waffo 为 MoR，由平台作为记录商户承担税务合规，无需我方境外实体；与「纯支付网关需境外主体」模式不同，故无 Phase 0 并行 KYB 的必要 |
> | 是否已有 API 文档 / SDK / 沙箱 | 推迟到 P1-2 | 本章 8.3 的集成骨架基于通用 MoR 形态推演，P1 拿到真实文档后必须逐条校正，届时本节重写 |

### 8.2 waffo vs Stripe / Paddle：为什么 MoR 对本项目是加分项

PRD 第 8 章风险表已点出：「支付/结汇：Stripe 需香港/境外主体」。这正是 MoR 模式解决的问题。

| 维度 | waffo（MoR） | Stripe（PSP） | Paddle（MoR） |
|---|---|---|---|
| 是否需海外公司主体 | 否（waffo 作为记录商户） | 需要（美/港/新等） | 否 |
| 全球数字商品税（VAT/GST/US sales tax） | 平台代缴 | 需自行处理或接 Stripe Tax（另付费） | 平台代缴 |
| 亚洲本地支付（GCash / DANA / Touch'n Go / PIX / QR） | 强项，明确覆盖 | 覆盖有限 | 覆盖有限 |
| 拒付/欺诈 | 平台承担并处理 | 商户承担 | 平台承担 |
| 费率 | 按成功交易收费（具体费率待谈） | 2.9% + $0.30 起 | 5% + $0.50 起（较高） |
| 生态成熟度/文档质量 | 未知（新平台，需实测） | 业界最好 | 好 |
| 供应商风险 | 高（新平台，无长期公开案例） | 极低 | 低 |

**架构判断**：waffo 在「中国团队 + 无海外主体 + 面向亚洲及新兴市场」这个具体处境下，比 Stripe 更契合。但它是**新平台，缺乏公开的长期可靠性证据**，因此架构上必须做**可替换设计**（见 8.3），避免锁死。

### 8.3 集成骨架（面向接口，不面向 waffo）

> **BillingProvider 锁定（MVP 阶段）**：waffo = **MoR（Merchant of Record，非纯网关）**，由平台作为记录商户承担税务与合规，**无需我方注册海外实体**；MVP 不集成 SDK、不触发任何计费，仅保留 `subscriptions` 表与 webhook 端点空壳，P1 接入 MoR 时填实现 + 打开 `billing_enabled` 即可通电。

在 `apps/web/src/server/billing/` 定义供应商无关接口，waffo 只是其中一个实现：

```ts
// src/server/billing/provider.ts —— 抽象层，业务代码只依赖这个
export interface BillingProvider {
  readonly name: 'waffo' | 'stripe' | 'paddle';
  createCheckout(input: {
    userId: string; plan: PlanId; locale: string;
    successUrl: string; cancelUrl: string;
  }): Promise<{ checkoutUrl: string; sessionId: string }>;
  createPortalSession(input: { userId: string; returnUrl: string }): Promise<{ url: string }>;
  verifyWebhook(rawBody: string, headers: Headers): Promise<VerifiedEvent>;
  cancelSubscription(subId: string, atPeriodEnd: boolean): Promise<void>;
}

// src/server/billing/waffo/index.ts —— 唯一与 waffo SDK 耦合的文件
export const waffoProvider: BillingProvider = { /* ... */ };

// src/server/billing/index.ts —— 入口只做装配
export const billing: BillingProvider = waffoProvider;
```

**Webhook 处理流水线（幂等三步走，资损防线）**：

```
POST /api/v1/webhooks/waffo
  1. 读原始 body（禁止先 JSON.parse，签名校验必须对原文做）
  2. provider.verifyWebhook(rawBody, headers) → 验签失败立即 401，不落库
  3. INSERT INTO payment_events (provider, provider_event_id, ...) 
     ON CONFLICT (provider, provider_event_id) DO NOTHING
     → 影响行数为 0 表示重复投递，直接返回 200（幂等）
  4. 在同一事务内根据 event_type 更新 subscriptions
  5. UPDATE payment_events SET processed_at = now()
  6. 返回 200（任何内部异常都要返回 5xx 让 waffo 重投，绝不吞错返 200）
```

**订阅态与权限的关系**：

| plan | status | 能力 |
|---|---|---|
| free | — | 无限对弈、排行榜、基础复盘、AI 至 Normal 难度 |
| pro | active | 去广告位、AI Hard/Master、深度复盘、专属棋盘主题、周赛资格 |
| pro | past_due | **宽限 7 天保留 pro 权限**（支付失败常见于卡过期，直接降级会误伤付费用户） |
| pro | canceled | 到 `current_period_end` 前保留权限，之后降级 |

定价按 PRD 第 16 章：$4.99/月 或 $39.99/年。**分区定价（PPP）** 在 P1 引入——waffo 支持 local pricing，这是它相对 Stripe 的另一个优势，对巴西/印度/东南亚转化率影响很大。

**MVP 范围收敛**：MVP 阶段**只做免费对弈，不上线支付**（对应 PRD 路线图「0–1 月只验证五子棋钩子」）。但表结构、Provider 接口、webhook 端点在 MVP 就建好并留空实现，1–3 月开启会员时只需填 waffo 实现 + 打开 feature flag `billing_enabled`。这样避免后期改数据模型。

---

## 9. SEO / SSR 方案

SEO 是本项目的主要获客渠道（PRD 第 7 章：竞争度 < 0.3 的长尾词）。架构上按页面类型分渲染策略：

| 页面 | 渲染策略 | 理由 |
|---|---|---|
| 首页 `/[locale]` | SSG + ISR（revalidate 3600） | 最高权重页，必须秒开 |
| 棋种落地页 `/[locale]/play/gomoku` 等 | **SSG，每语言每棋种一页** | 承接 `play gomoku online`、`jugar gomoku en línea` 等核心词 |
| 规则教程 `/[locale]/learn/gomoku-rules` | SSG | 长尾词主力，内容型页面 |
| 对弈页 `/[locale]/play/gomoku/live/[roomId]` | SSR 外壳 + 客户端接管，`noindex` | 动态房间不该被索引，但外壳要 SSR 以便分享链接有正确 OG |
| **棋谱复盘页** `/[locale]/games/[matchId]` | **SSR + ISR（永久缓存，终局后内容不变）** | 这是 SEO 的隐藏金矿：每一盘棋是一个可索引 URL，UGC 自然增长索引量 |
| 用户主页 `/[locale]/@[username]` | SSR + ISR（revalidate 300） | 可索引，形成用户自发外链 |
| 排行榜 `/[locale]/leaderboard` | ISR（revalidate 600） | |
| 好友房分享页 `/[locale]/join/[code]` | SSR，`noindex` | 需 SSR 出 OG 卡，但不索引 |

### 9.1 关键实现点

**动态 OG 卡片（社媒分享的转化决定项）**：用 Next.js 内置 `next/og` 的 `ImageResponse`，在 Edge Runtime 生成 1200x630 PNG：

```
/api/og/game/[matchId]     → 渲染终局棋盘 + 双方用户名 + 比分 + Elo 变化
/api/og/profile/[username] → 渲染头像 + 段位 + 战绩
/api/og/join/[code]        → 渲染 "{昵称} 邀请你下一盘五子棋"（按 locale 出对应语言）
```

棋盘图直接用 SVG→PNG 渲染，不依赖外部截图服务。这让「分享棋局到社媒」（PRD 15.4）真正具备传播力——一张能看见棋局的卡片，点击率远高于纯文字链接。

**结构化数据（JSON-LD）**：
- 全站：`Organization` + `WebSite`（含 `SearchAction`）
- 棋种落地页：`VideoGame` / `Game`（`gamePlatform: "Web Browser"`, `playMode: "MultiPlayer"`）
- 教程页：`HowTo`（规则步骤）+ `FAQPage`
- 复盘页：`CreativeWork` + `SportsEvent`（对局作为赛事实体）

**hreflang**：每页输出全部 MVP 语言的 `<link rel="alternate" hreflang>` + `x-default` 指向 `en`。用 `generateMetadata` 中的 `alternates.languages` 统一生成，禁止手写。

**sitemap**：`app/sitemap.ts` 动态生成，分片输出（静态页一个 sitemap，复盘页按月分片，单文件 < 50000 条），`robots.ts` 中声明 sitemap index。

**Core Web Vitals 防线**：
- 棋盘组件必须 SSR 出静态首帧（避免 CLS），交互逻辑用 `next/dynamic` 懒加载
- AI 引擎 WASM 与 Web Worker 只在用户点击「开始对弈」后加载，不进首屏 bundle
- 字体用 `next/font` 自托管，`display: swap`
- **CI 门禁**：Lighthouse CI 对首页 + 一个棋种落地页跑分，Performance < 90 或 LCP > 2.5s 阻断合并

**PWA**：`Serwist`（Workbox 的 Next.js 友好封装）。预缓存：应用外壳 + 五子棋引擎 WASM + 棋子资产 + en/当前语言文案。离线可用范围：单机 AI 对弈 + 查看已缓存棋谱。在线功能显示离线提示条。

### 9.2 可玩 Hero 首屏策略（SEO 与可玩性的平衡）【v0.3 对齐设计师】

首页 Hero 既要「可玩」（用户进来即可落子），又要保住 SEO 抓取与 Lighthouse 评分。策略如下：

- **加载时序（关键路径）**：① SSR 首屏直接输出静态 SVG 棋盘，无 JS 依赖，目标 **Lighthouse SEO ≥ 95、LCP < 2.5s**；② 用户点击棋盘或「开始对弈」后，才通过 `next/dynamic` 动态 `import()` 实例化 `@yiboard/engine`（Gomoku WASM）+ Web Worker；③ 引擎就绪前由静态 SVG 棋盘承接点击，无白屏、无 CLS。
- **首屏先出静态 SVG 棋盘**：Hero 棋盘由 SSG/ISR 产出纯静态 SVG（复用复盘页同一套 `@yiboard/pieces` 自绘资产），服务端即渲染完整 DOM，爬虫与真实用户首屏都拿到可绘制、可索引的完整内容。目标 **Lighthouse SEO ≥ 95、LCP < 2.5s**。
- **wasm 引擎懒加载**：`@yiboard/engine`（Gomoku TS/WASM）与 Web Worker **不进首屏 bundle**，通过 `next/dynamic` 动态 `import()` 在用户首次交互（点击棋盘 / 「开始对弈」）后才实例化。静态棋盘先承接点击，引擎随后接管，无白屏、无 CLS。
- **降级兜底**：若引擎加载失败（弱网），静态 SVG 棋盘 + 「人机对弈需加载引擎」提示仍可展示，不影响 SEO 与分享卡片。
- **CI 门禁**：Lighthouse CI 对首页跑分，SEO < 95 或 LCP > 2.5s 阻断合并（与 9.1 Core Web Vitals 防线共用同一门禁）。

---

## 10. 部署、CI/CD、可观测性、安全

### 10.1 环境与分支

| 环境 | 前端 | 数据库（Neon 分支） | 实时层（CF） |
|---|---|---|---|
| Production | Vercel Production（`main` 分支） | Neon `main` | Worker `production` 环境，`rt.yiboard.com` |
| Preview | Vercel Preview（每 PR 一个） | **Neon 自动分支（每 PR 一个，PR 合并后自动删除）** | Worker `preview` 环境（共用，房间 ID 加前缀隔离） |
| Development | 本地 `next dev` | Neon `dev` 分支 或 本地 Docker Postgres | `wrangler dev`（本地 Miniflare，DO 与 Hibernation 均可本地跑） |

Neon 分支是本架构里被低估的能力：**每个 PR 拿到一份带 production schema 的隔离库**，schema 变更可以在 PR 里真实验证，不再有「preview 环境共用一个 staging 库互相污染」的经典问题。通过官方 Neon Vercel Integration 自动完成，`DATABASE_URL` 由集成注入。

### 10.2 CI/CD 流水线

```
PR 打开
  ├─ lint（ESLint + Prettier）
  ├─ typecheck（tsc，TypeScript 7 原生版，约 10x 加速）
  ├─ i18n-lint（各语言 key 集合一致性 + 无硬编码字符串）
  ├─ 单元测试（Vitest）
  │    ├─ packages/rules      —— Node 与 workerd 双运行时各跑一遍（同构保证）
  │    ├─ packages/engine     —— 50 个战术局面必须全通过
  │    └─ packages/rating     —— Elo 计算边界用例
  ├─ 契约检查：openapi.yaml 变更时，重新生成类型并断言无 diff
  ├─ Neon 自动创建 PR 分支库 → 跑 drizzle migrate → 跑集成测试
  ├─ Vercel Preview 部署
  ├─ E2E（Playwright，跑在 Preview 上）
  │    └─ 关键路径：注册 → 创建好友房 → 双端对弈 → 终局落库 → Elo 更新
  └─ Lighthouse CI 门禁

合并到 main
  ├─ 顺序强制：先跑数据库迁移，后部署应用代码
  │    （反过来会让新代码引用尚不存在的列，直接 500）
  ├─ drizzle migrate（用 DATABASE_URL_UNPOOLED 直连，非 pooler）
  ├─ Vercel Production 部署
  ├─ wrangler deploy（实时层，独立流水线，可单独发布）
  └─ Sentry release 打标 + source map 上传
```

**迁移的向后兼容硬规则**（因为 Vercel 部署期间新旧代码并存）：
- 加列必须有默认值或允许 NULL
- 删列分两次发布：先发不再读写该列的代码，下个版本再删列
- 改列名等于「加新列 + 双写 + 回填 + 切读 + 删旧列」五步，不允许一步到位

**实时层与前端的版本兼容**：WS 协议消息带 `v` 字段；Worker 至少兼容前一个前端版本（用户可能开着旧页面）。协议破坏性变更需 Worker 双版本并行一周。

### 10.3 可观测性

| 层 | 工具 | 关键指标 |
|---|---|---|
| 前端 | Vercel Speed Insights + Web Analytics | LCP / INP / CLS，分 locale 分国家 |
| 错误 | Sentry（browser + Vercel + Workers 三端同 project，用 trace id 串联） | 错误率、影响用户数 |
| API | Vercel Functions Logs（结构化 JSON） | p50/p95/p99 时延、5xx 率、冷启动比例 |
| 实时层 | Cloudflare Workers Analytics + Tail Worker → Sentry | DO 数量、WS 连接数、消息速率、**move_rtt p95** |
| 数据库 | Neon Monitoring | 连接数、慢查询（> 200ms 全部告警）、存储、计算用量 |
| 业务 | 自建看板（Vercel Cron 每小时聚合写 `metrics_daily` 表） | **北极星：高质量对局数/日**；匹配成功率、平均等待时长、弃局率、D1/D7 留存 |

**必须建的 4 条告警**（少而准，避免告警疲劳）：
1. `move_rtt p95 > 200ms` 持续 15 分钟 → PRD 硬指标破线
2. `/api/v1/*` 5xx 率 > 1% 持续 5 分钟
3. `payment_events` 存在 `processed_at IS NULL` 且创建超过 10 分钟的记录 → 资损风险
4. finalize 死信队列非空 → 有对局结果丢失

### 10.4 安全 Checklist

**认证与会话**
- [ ] access token 15min / refresh 7d 滚动刷新，refresh 只存哈希
- [ ] cookie：`httpOnly` + `Secure` + `SameSite=Lax` + `__Host-` 前缀
- [ ] 密码 Argon2id；登录失败 5 次锁 15 分钟（按 email + IP 双维度）
- [ ] OAuth state + PKCE 强制
- [ ] join token Ed25519 签名、60s 有效、`jti` 一次性（Worker 侧用 DO 记录已用 jti）

**接口与滥用**
- [ ] 全局限流（Upstash Ratelimit）：匿名 60 req/min/IP，登录用户 300 req/min/user
- [ ] 敏感端点单独收紧：register 5/h/IP，login 10/10min/IP，password/forgot 3/h/email
- [ ] WS 层：单连接 30 msg/s 上限，超限断开；单 IP 并发连接数上限 10
- [ ] 所有输入用 Zod 校验（schema 由 openapi.yaml 生成，前后端同源）
- [ ] Drizzle 参数化查询，禁止字符串拼 SQL；Neon 驱动 v1.0+ 强制 tagged-template，天然防注入

**对局公平性（棋类产品特有）**
- [ ] 落子合法性只信服务端；客户端结果一律不采信
- [ ] 连续 3 次非法落子 → 断连并记录，短时间内多次触发进入观察名单
- [ ] 引擎作弊检测（P1）：统计玩家着法与引擎最优解的吻合率，异常高者标记人工复核
- [ ] 弃局/掉线惩罚：Elo 按判负计算，防止劣势方拔网线
- [ ] 排行榜要求 `games_played >= 10`，并排除游客账号
- [ ] 同 IP 两账号对弈标记（刷分识别，P1）

**内容与合规**
- [ ] CSP（`default-src 'self'`，明确白名单 waffo checkout / Sentry / CF WS），不用 `unsafe-inline`
- [ ] HSTS、`X-Content-Type-Options`、`Referrer-Policy: strict-origin-when-cross-origin`、`Permissions-Policy`
- [ ] 房内聊天与用户名过滤（多语言敏感词表 + 举报入口），用户名禁止冒充官方
- [ ] 严禁任何赌博化表述（不用 "bet" / "wager" / "stake"），成就与货币化文案避开博彩暗示，防应用商店与广告平台判定风险
- [ ] 上传头像走 R2 + 图片格式白名单 + 尺寸限制 + 内容审核（P1）

**GDPR / CCPA / 未成年人**
- [ ] Cookie 同意横幅：分「必要 / 分析」两类，**分析类默认关闭**，未同意前不加载 Analytics
- [ ] 隐私政策与服务条款按 locale 提供，明示数据类别、用途、保留期、第三方（waffo / CF / Neon / Sentry）
- [ ] 数据导出：`POST /api/v1/account/export` → 异步生成 JSON 包 → 邮件下载链接（7 天有效），30 日内完成
- [ ] 账号删除：软删即时生效（下线所有可见内容）+ 30 天后硬删 PII；**棋谱做匿名化保留而非删除**（对手方的对局记录与排行榜完整性属于合法利益，需在隐私政策中明确写出这一处理方式）
- [ ] 年龄门槛：注册声明 13+（EU 区 16+，或家长同意）；不向未成年人定向营销
- [ ] 数据处理地：Neon 选区（建议 `aws-us-east-1` + 后续 EU 副本评估）、CF 数据本地化选项（EU 用户可考虑 Regional Services），**EU 用户数据跨境需在隐私政策披露并具备 SCC 依据**
- [ ] IP 地址只存哈希（用于风控），不存明文
- [ ] 无卡数据接触面：支付页由 waffo 托管（hosted checkout），我方系统永不接触卡号，PCI 责任由 MoR 承担——这一条必须在架构上守住，**禁止任何自建收银台**

**密钥管理**
- [ ] 全部走 Vercel Environment Variables / CF Secrets，禁止入库入仓
- [ ] `INTERNAL_SECRET`（HMAC）、`JOIN_TOKEN_PRIVATE_KEY`、waffo API Key 每 90 天轮换，轮换期双密钥并行
- [ ] CI 中启用 secret scanning（GitHub Advanced Security 或 gitleaks）

### 10.5 媒体资源管线（真实器物摄影，Q3 批准）【v0.4 新增】

PRD 文化叙事需真实器物摄影（棋具、古籍、场景），**Q3 已批准真实器物摄影预算**。架构侧须预留图片资源管线，避免散落、不走 `next/image` 优化、拖慢 LCP。

**存储**：图片资产统一存 **Cloudflare R2**（与棋谱归档同桶，分区 `media/`），不落 Neon、不走第三方图床。结构：`r2://yiboard-media/{locale}/{usage}/{hash}.{ext}`。

**优化**：全站图片一律经 `next/image`（`sizes` 必填、`priority` 仅首屏用），由 Vercel Image Optimization 即时转 WebP/AVIF 并按 DPR 出多分辨率；R2 作为 `next.config` 的 `remotePatterns` 源。禁止 `<img>` 直链原图。

**MVP 首屏约束（与 9.2 Hero 静态策略一致）**：
- 首页首屏只放 **1–2 张真实器物图**（文化叙事主视觉），`priority` 预加载、`sizes="100vw"`，目标 LCP < 2.5s。
- 其余器物图走懒加载（`loading="lazy"`），不进首屏关键路径。
- 图片须有 `alt`（i18n，含棋种/器物名），既是无障碍也是 SEO（Google 图片流量）。

**内容治理**：摄影原图入库前过审核（器物版权/授权书面确认）；`alt` 与 `title` 由 `messages/{locale}.json` 提供，遵循 7.3 译制流程。R2 生命周期策略：热图 30 天缓存、冷图归档层。

**预处理**：首页 OG 卡（9.1）与器物主视觉缩略图由 Vercel Cron 周期性用 `next/og` + R2 原图预处理，避免请求期实时缩放。

---

## 11. 依赖版本锚定

原则：**全部写死到次版本，lockfile 提交，禁止 `latest` / `*` / `^` 越界**。下表为脚手架当日（2026-08-07）的锚定值。

### 11.1 前端与框架

| 依赖 | 锚定版本 | 说明 |
|---|---|---|
| `next` | `16.3.0` | 2026-08-03 发布，当前 stable。16.x 为 Active LTS（至 2027-10-21） |
| `react` / `react-dom` | `19.2.x` | 随 Next 16.3 同步 |
| `typescript` | `7.x` | Next 16.3 支持 TS7 原生编译器做 typecheck，约 10x 加速 |
| `tailwindcss` | `4.x` | 与 Next 16 集成成熟 |
| **`@phosphor-icons/react`** | **`2.x`** | **全项目唯一图标库，禁止混用**（P0 规则，设计师定稿）；安装时锁当前稳定版，Spec 阶段锚定精确补丁号 |
| `next-intl` | `4.x` | i18n |
| `zod` | `4.3.x` | 运行时校验，与 openapi 生成器配套 |
| `@tanstack/react-query` | `5.x` | 控制面数据获取与缓存 |
| `zustand` | `5.x` | 对弈页客户端状态（棋盘/时钟/连接态） |
| `serwist` / `@serwist/next` | `9.x` | PWA Service Worker |
| `framer-motion` | `12.x` | 落子动画（可选，若 bundle 压力大则用 CSS 动画替代） |

> Next.js 15.x 处于 Maintenance LTS，2026-10-21 EOL。**新项目直接起 16.3，不要起 15**。

### 11.2 数据层

| 依赖 | 锚定版本 | 说明 |
|---|---|---|
| `@neondatabase/serverless` | `1.0.2`（或 1.0.x 最新 patch） | **v1.0+ 强制 tagged-template 语法**，`sql("...", [params])` 会运行时报错，AI 生成代码极易踩此坑，须写入 Spec |
| `drizzle-orm` | `0.44.x` | 与 Neon 驱动兼容（若引入 better-auth 需 ≥ 0.40.1） |
| `drizzle-kit` | `0.31.x` | 迁移生成 |
| `neonctl` | `2.16.x` | CLI |
| `@upstash/redis` / `@upstash/ratelimit` | `1.x` / `2.x` | 限流与缓存 |
| Postgres 版本 | Neon 默认（PG 17） | |

**驱动使用规则（写入 Spec）**：
- 单条查询（绝大多数 Route Handler）→ `neon()` HTTP 驱动，Edge/Node 均可，无连接开销
- 需要交互式事务（finalize 结算）→ `Pool` WebSocket 驱动 + Node runtime
- 迁移脚本 → `DATABASE_URL_UNPOOLED`（直连，非 pooler）

### 11.3 实时层

| 依赖 | 锚定版本 | 说明 |
|---|---|---|
| `wrangler` | `4.x` | CF 部署 CLI |
| `@cloudflare/workers-types` | 与 compatibility_date 对应 | |
| `compatibility_date` | `2026-07-01` | 写死在 `wrangler.toml`，升级需单独 PR |
| Durable Objects | SQLite-backed（新建默认） | Free plan 可用 |
| WS API | Hibernation API（`ctx.acceptWebSocket`） | **不用 `ws.accept()`**，否则 DO 常驻内存持续计费 |

### 11.4 认证 / 支付 / 工具

| 依赖 | 锚定版本 | 说明 |
|---|---|---|
| `next-auth` (Auth.js) | `5.x` | App Router 集成 |
| `@node-rs/argon2` | `2.x` | 密码哈希 |
| `jose` | `6.x` | join token 的 Ed25519 签发与验签（Worker 侧兼容） |
| waffo SDK | **P1 启用（MVP 不接）** | MVP 不引入 SDK，规避 KYB 风险；P1 拿到官方 SDK 后锚定，未拿到前用裸 `fetch` + 自封装隔离在单文件（见第 8 章） |
| `@sentry/nextjs` / `@sentry/cloudflare` | `10.x` | |
| `resend` | `6.x` | 事务邮件 |

### 11.5 工程工具

| 依赖 | 锚定版本 |
|---|---|
| Node.js | `22.x LTS`（Neon 驱动 v1.0+ 要求 ≥ 19） |
| pnpm | `10.x`（workspace 管理 monorepo） |
| Vitest | `3.x` |
| Playwright | `1.5x` |
| ESLint | `9.x`（flat config） |

---

## 12. 风险与技术债

### 12.1 架构级风险

| # | 风险 | 影响 | 概率 | 缓解 | 负责阶段 |
|---|---|---|---|---|---|
| R1 | **waffo 角色判断错误或 KYB 未过** | 变现路径全废，第 8 章需重写 | 低（已降级） | 已抽象 `BillingProvider` 接口，切 Stripe/Paddle 只改一个文件；waffo **已确认为 MoR（非纯网关），无需我方境外主体、MVP 不接、不启动 KYB**，风险敞口已关闭 | **RESOLVED 2026-08-07：降级** |
| R2 | **用户否决引入 Cloudflare**（原风险） | 实时层需退回 Ably 方案，延迟劣化、成本上升 | — | 2.3 已备好方案 B 仅作历史备选；WS 协议层与 `@yiboard/rules` 与传输无关，可换底座 | **RESOLVED 2026-08-07：已批准引入，原风险不成立** |
| R3 | 跨洲对局延迟无余量（160–190ms） | PRD 硬指标可能在极端链路破线 | 中 | 同区优先匹配 + 乐观 UI；建立 move_rtt p95 看板，破线即触发复盘 | MVP 上线后 |
| R4 | 自研五子棋引擎强度不足，被玩家嘲笑 | 口碑受损，首局体验崩塌 | 中高 | 50 局面战术测试集做门禁；Hard 难度上线前必须与开源引擎对战 100 局胜率 ≥ 40% | MVP 内 |
| R5 | Neon 免费额度（计算时长/存储）在流量起来后突然超限 | 服务中断 | 中 | 用量告警设在 70%；复盘页 ISR 缓存降低 DB 压力；棋谱冷数据归档 R2 | MVP 上线前 |
| R6 | Vercel Function 冷启动影响首屏 API | 首次访问慢，跳出率高 | 中 | 关键 GET 端点尽量 ISR/静态化；Fluid Compute 已大幅缓解；必要时开 Vercel Cron 保活 | MVP 内 |
| R7 | 开源象棋引擎许可不明 | 象棋上线被迫下架或重写 | 中 | **RESOLVED 2026-08-12（LIC-2026-001）**：已确认 ElephantEye=LGPL-2.1（✅ 兼容闭源，选定）；XQWLight=GPL-2.0（❌ 已否决）。采用 ElephantEye WASM 方案即消除该风险 | 已闭环 |
| R8 | 棋谱页大量生成低质页面被 Google 判为 thin content | 全站 SEO 权重受损 | 中 | 只索引 `move_count >= 20 且非弃局` 的对局；其余 `noindex`；复盘页补充自动生成的局面解说文字 | P1 |
| R9 | GDPR 删除请求与棋谱保留冲突 | 合规争议 | 低中 | 采用匿名化保留而非删除，并在隐私政策显式说明法律依据；建议上线前做一次外部法务审阅 | MVP 上线前 |
| R10 | 多语言译制质量差（机翻味）导致本地用户不信任 | 出海核心竞争力失效 | 中高 | 术语表先行 + 母语者校对（志愿者激励）；上线前每语言至少 1 名母语者通读全站 | MVP 内 |

### 12.2 有意承担的技术债（登记，非疏漏）

| # | 技术债 | 为什么现在这么做 | 偿还触发条件 |
|---|---|---|---|
| D1 | 用 Elo 而非 Glicko-2 | Elo 实现 30 行代码，Glicko-2 需要 rating period 批处理，MVP 用户量下无差别 | 月活对局玩家 > 5 万，或出现明显的分数膨胀/通缩 |
| D2 | 排行榜用 Cron 全量重算写 snapshot 表 | 增量维护需要额外一致性设计，MVP 数据量下全量重算 < 1s | `ratings` 行数 > 50 万 |
| D3 | 五子棋 AI 先出纯 TypeScript 版 | 省掉 Rust 工具链与 WASM 构建流水线，先验证棋力评估函数是否正确 | Hard 难度单步 > 500ms，或需要更深搜索 |
| D4 | 无独立 API Gateway，Route Handler 内联鉴权中间件 | MVP 只有一个后端，加网关是纯开销 | 拆出第二个后端服务时 |
| D5 | 观战功能只支持「已在房内」，无观战列表与延迟播放 | 观战列表需要全局房间索引（额外 DO），MVP 无需求 | 上线周赛时 |
| D6 | `games.moves` 存 JSONB 而非专用二进制格式 | JSONB 可读可查，调试成本低；单局棋谱 < 2KB | 单表 > 1000 万行或存储成本显著 |
| D7 | 无多区域数据库副本，Neon 单区 | 读写都在美东，亚洲用户控制面延迟约 200ms（可接受，因为数据面走 CF 边缘） | 亚洲用户占比 > 40% 且控制面延迟成为投诉项 |
| D8 | 前端无微前端/模块联邦拆分 | 单体 Next.js 应用在 MVP 阶段是正确选择 | 团队 > 15 人且发布互相阻塞 |

### 12.3 明确不做（避免过度设计）

以下项在 MVP 阶段**主动放弃**，写在这里是为了防止后续被「顺手加上」：

- 微服务拆分、消息队列（Kafka/RabbitMQ）、服务网格
- Kubernetes / Docker 编排（Vercel + CF 全托管，不需要）
- GraphQL（REST + OpenAPI 已足够，且 SSR 场景 RSC 直连数据库更优）
- 自建 CDN、自建对象存储、自建监控栈
- 多写库 / 读写分离 / 分库分表
- 独立的推荐系统、A/B 测试平台（用 feature_flags 表 + 百分比灰度即可）
- 原生 App（PRD 已明确 PWA 起步，App 后置）
- 围棋 KataGo 集成（P2，本文档仅登记路径）

---

## 13. 待决策清单（阻塞项已解除）

> 原阻塞 Spec 冻结的两项 **Q1、Q2** 已于 2026-08-07 RESOLVED（见各自状态列）。**Q4（D7 语种）、Q7（D5 游客）亦于 2026-08-07 拍板 RESOLVED**。剩余 Q3（支付）/ Q5 / Q6 仍待拍板，但**均不阻塞 Phase 1.5 Spec 生成**。

| # | 待决项 | 需要谁拍板 | 阻塞程度 | 我的推荐 |
|---|---|---|---|---|
| Q1 | **waffo 的确切角色与接入方式** | 用户 | 原阻塞（已解除） | **RESOLVED 2026-08-07**：判定为支付/订阅/MoR 层（Waffo Pancake，已确认为 MoR，无需我方境外主体），MVP 不接入（仅留空壳），P1 启用；API 文档/沙箱/KYB 在 P1 补齐 |
| Q2 | **是否允许引入 Cloudflare Workers + Durable Objects 作为实时层** | 用户 / team-lead | 原阻塞（已解除） | **RESOLVED 2026-08-07**：已批准引入，作为第 4 个平台依赖（见 2.3） |
| Q3 | MVP 是否包含支付 | 用户 | 中 | 不包含。按 PRD 路线图，0–1 月只验证钩子；表与接口先建好留空 |
| Q4 | MVP 语言范围确认 | 用户 / PM | **RESOLVED 2026-08-07（D7 锁定 EN/ES/JA/PT-BR）** | 已锁定 **EN / ES / JA / PT-BR** 四种；locale 架构按 `[locale]` 预留，增删语种零改路由 |
| Q5 | 域名与实时层子域（`rt.yiboard.com`）归属与 DNS 托管方 | 用户 | 中 | DNS 托管在 Cloudflare（若采纳 Q2），Vercel 用 CNAME |
| Q6 | 法务审阅预算（隐私政策 / ToS / 棋谱保留条款） | 用户 | 中 | 上线前必须做一次，海外 SaaS 模板不足以覆盖棋谱这类特殊数据 |
| Q7 | 是否接受「游客无需注册即可对弈」的产品设定 | PM | **RESOLVED 2026-08-07（D5 开放）** | 已开放：好友房链接免注册直开，注册仅用于存档/段位/订阅（见 4.3 / 6.2） |

---

## 14. ADR 索引（评审通过后逐条落盘到 `docs/decisions/`）

| 编号 | 标题 | 状态 |
|---|---|---|
| ADR-001 | 采用 Next.js 16.3 App Router 作为前端与控制面框架 | Accepted（用户锁定） |
| ADR-002 | 采用 Neon serverless Postgres 作为主数据库 | Accepted（用户锁定） |
| ADR-003 | 采用 Vercel 作为控制面部署平台 | Accepted（用户锁定） |
| ADR-004 | 采用 waffo 作为支付与会员变现层（MoR） | **Accepted（RESOLVED 2026-08-07；MVP 不接，P1 启用）** |
| ADR-005 | 实时对弈采用 WebSocket 服务端权威，不采用 WebRTC | Proposed |
| ADR-006 | 实时层采用 Cloudflare Durable Objects，一房一对象 | **Accepted（RESOLVED 2026-08-07）** |
| ADR-007 | MVP 阶段 AI 引擎运行在客户端（Web Worker/WASM），不上服务端 | Proposed |
| ADR-008 | 认证采用 Auth.js v5 + 独立 Ed25519 join token 双凭证体系 | Proposed |
| ADR-009 | 评分系统 MVP 采用 Elo，预留 Glicko-2 迁移字段 | Proposed |
| ADR-010 | i18n 采用 next-intl，默认语言 `en` 无路由前缀 | Proposed |
| ADR-011 | 图标库唯一锁定 @phosphor-icons/react 2.x（设计师定稿，P0 禁止混用） | **Accepted（设计师已锁定）** |
| ADR-012 | 棋谱页作为可索引 SEO 资产，设置质量门槛避免 thin content | Proposed |
| ADR-013 | 段位体系采用九品 + 段位双轨（Elo 分档映射 + 英文译名），ranking API 返回 ELO 数值与段位字段 | **Accepted（team-lead 裁定，2026-08-07）** |

---

**文档结束。** 本文档为规划层输出，评审通过后我将产出 `openapi.yaml`（第 5 章全部端点的完整 request/response schema）与 ADR-001..013 正式文本，作为前后端 Spec 的唯一契约。
