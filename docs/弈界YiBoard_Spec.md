# Spec - 弈界 YiBoard v0.4 (MVP)

> 生成日期：2026-08-07
> 基于：PRD v1.0 + 产品规划 v1.1（许清楚）+ 技术架构 v0.3（高见远）+ UI 规范 v1.0（颜好看）
> 状态：已确认（用户 2026-08-07 确认三文档）
> 性质：规格即契约（Spec-as-Contract）。后续设计细化、开发、测试均以此为准；变更须走变更流程（§13）。

---

## 1. 产品定义

- **一句话描述**：面向全球的中国战略棋类对弈独立站（Web/PWA），以五子棋为流量钩子，象棋/围棋做深度留存，会员订阅 + 棋具 DTC 溢出变现。
- **目标用户**：海外棋类爱好者（英语 / 西语 / 日语 / 葡语圈）、华裔文化认同者、休闲 + 轻竞技玩家。
- **核心问题**：海外缺少「以中国棋种为钩子、带文化叙事 + 竞技社区」的头部独立站；现有 Gomoku.com 等尚未做文化叙事与会员闭环。

## 2. MVP 范围（锁定——不在此列表的功能一律不做）

| 优先级 | 功能 | 验收标准摘要 | RICE |
|--------|------|--------------|------|
| P0 | 五子棋人人对战（好友房） | guest 免注册，链接直开房间，WS 实时落子，服务端权威 | R 高 |
| P0 | 五子棋 vs 客户端 AI | 自研 minimax+αβ WASM，sub-500ms/手，离线可用 | R 高 |
| P0 | 分享棋谱卡片 | 对局结束生成可分享卡片（OG 图），P0 增长引擎 | R 高 |
| P0 | guest 免注册 + 段位体系 | 匿名 token 即玩；18 级段位（9 品+9 段）ELO 双轨 | R 高 |
| P0 | SEO 落地页（4 语种） | 静态 SVG Hero，Lighthouse SEO ≥95，next-intl | R 中 |
| P1 | 排行榜 / 天梯 | 公开排行榜，ELO + 段位展示 | R 中 |

## 3. 明确不做（Out-of-Scope——锁定）

| 不做的功能 | 原因 | 何时考虑 |
|------------|------|----------|
| 围棋 / KataGo 对弈 | MVP 聚焦五子棋验证流量模型 | P2 |
| 象棋 / 将棋完整规则引擎 | 规则复杂度高，留待留存期 | P2 |
| 棋具 DTC 商城 | 数字平台先起盘，实物溢出 P2 | P2 |
| 会员付费墙 / 订阅 | waffo P1 才接入，MVP 不集成 | P1 |
| 社交 feed / 论坛 | 非 MVP 核心闭环 | P2 |
| 实时语音 / 聊天 | 对弈外干扰项 | P2 |
| 移动原生 App | PWA 已覆盖安装与离线 | P2 |
| 多人在线匹配大厅（除好友房） | 流量未起前匹配池为空 | P1+ |
| 棋谱数据库 / 复盘 AI 讲解 | 重内容，留待留存期 | P2 |
| 战队 / 俱乐部 | 社交裂变后期 | P2 |
| 赛事系统 | 需稳定用户基数 | P2 |
| 教练 / 教学视频 | 内容生产成本高 | P2 |
| 多棋盘主题商城（付费） | 会员体系未建 | P1+ |
| 第三方登录（Google/微信） | MVP 邮箱 + guest 足够 | P1 |
| 棋谱导入 / 导出标准格式 | 非核心 | P2 |

## 4. 技术架构（锁定——含版本锚定）

| 层 | 技术 | 实际版本 | 锁定原因 |
|----|------|----------|----------|
| 前端框架 | Next.js (App Router) | 16.3.0 | SSR + i18n + Vercel 原生部署 |
| 样式 | Tailwind CSS + design-tokens | 4.x | Token 化，禁止裸 hex |
| 国际化 | next-intl | 4.x | app/[locale] 路由，4 语种零改路由 |
| ORM | drizzle | 0.44.x | Neon serverless 适配，类型安全 |
| 数据库 | Neon serverless Postgres | 16 | 无服务器 PG，Vercel 原生 |
| 实时 | Cloudflare Durable Objects | 2026.x | 一房一对象 + Hibernation + Alarms 超时判负 |
| 引擎 | @yiboard/engine (WASM) | 0.1.0 | 客户端 minimax+αβ，离线 PWA |
| 图标 | @phosphor-icons/react | 2.x | 全项目唯一图标库，禁止混用（P0） |
| 支付 | Waffo (MoR, pancake-ts) | 0.x | P1 接入，MVP 不集成 |
| 部署 | Vercel + Cloudflare | - | 前端 Vercel，实时 Cloudflare |
| 运行时 | Node.js | 22 LTS | - |

## 5. API 端点清单（锁定——开发时以此为唯一依据）

完整定义见 `openapi.yaml`。摘要：

| Method | Path | 功能 | 认证 | 说明 |
|--------|------|------|------|------|
| POST | /api/v1/auth/guest | 创建游客会话 | 匿名 | 返回 guest_token + user_id |
| POST | /api/v1/auth/guest/upgrade | 绑定邮箱升级 | guest | user_id 不变，历史继承 |
| POST | /api/v1/auth/login | 邮箱登录 | 公开 | 返回 JWT |
| POST | /api/v1/rooms | 创建房间 | guest/用户 | 返回 room_id + invite_url |
| GET | /api/v1/rooms/:id | 房间状态 | 公开 | 玩家 / 模式 / 状态 |
| WS | /api/v1/rooms/:id/ws | 实时对弈 | guest/用户 | Cloudflare DO 服务端权威 |
| POST | /api/v1/games | 记录对局结果 | 系统(DO 回调) | 返回 elo_delta + new_rank |
| GET | /api/v1/rankings | 排行榜 | 公开 | ELO + 段位 |
| POST | /api/v1/share | 生成分享卡 | guest/用户 | 返回 card_url + OG |
| GET | /api/v1/users/me | 个人资料 | 用户 | ELO + 段位 + 统计 |
| POST | /api/v1/webhooks/waffo | 支付回调 | waffo | 空壳，P1 启用 |

## 6. 数据库表清单（锁定）

| 表名 | 核心字段 | 索引 | 关联 |
|------|----------|------|------|
| users | id, email(nullable), is_guest, elo, rank_grade, rank_dan, created_at | PK id, idx elo | guest_sessions |
| guest_sessions | token, user_id, expires_at | PK token | users |
| rooms | id, type, mode, created_by, status, created_at | PK id | games |
| games | id, room_id, player_a, player_b, winner, pgn, ended_at | PK id, idx ended_at | rooms, users |
| share_cards | id, game_id, image_url, created_at | PK id | games |
| subscriptions | id, user_id, plan, status, waffo_sub_id | PK id | users（MVP 空） |
| payment_events | id, user_id, event, payload | PK id | users（MVP 空） |

## 7. 页面清单（锁定）

| 页面 | 路由 | 核心组件 | 对应 API | 设计 Token 主题 |
|------|------|----------|----------|-----------------|
| 首页 | /[locale] | 可玩 Hero 棋盘 + SEO 落地 | /rooms, /share | 墨石 |
| 对弈 | /[locale]/play/[roomId] | 棋盘 + 落子 + 段位条 | /rooms/:id/ws, /games | 榧木 |
| 排行榜 | /[locale]/rankings | 榜单 + 段位徽章 | /rankings | 青石 |
| 个人 | /[locale]/profile | 资料 + 统计 + 段位 | /users/me | 墨石 |
| 分享卡 | /[locale]/share/[cardId] | 静态 OG 卡片 | /share | 墨石 |
| 玩法 | /[locale]/how-to | SEO 内容 | - | 墨石 |
| 关于 | /[locale]/about | 文化叙事 + 真实器物摄影 | - | 榧木 |

## 8. 设计 Token（锁定）

- **主色**：朱砂 #BE4A2F（象棋「红先」语义）
- **字体**：Archivo（显示）/ Inter（正文）/ Noto Sans SC · TC（中文）
- **图标**：Phosphor（regular/fill/bold，16/20/24px），denylist 禁 lucide/tabler/heroicons 及 emoji 作图标
- **主题**：双主题 + 棋盘主题（墨石 / 榧木 / 青石）
- **段位**：18 级阶梯（9 品 + 9 段），ELO 100 分等距，1200 = 六品，含英文译名（Ninth Grade … First Dan）
- **设计语言「格律 Lattice」**：格（1px 线分隔）/ 子（圆形落子）/ 朱（强调 ≤2）
- 完整定义见 `design-tokens.json` + `design-tokens.css`

## 9. 验收标准（锁定——EARS 格式）

| 编号 | 功能 | EARS 验收标准 | 优先级 |
|------|------|---------------|--------|
| AC-01 | 游客会话 | While 访客访问首页，系统**必须**创建匿名会话并返回 guest_token | P0 |
| AC-02 | 房间创建 | When 持 token 创建好友房，系统**必须**返回 room_id 与 invite_url | P0 |
| AC-03 | 实时落子 | While 双方连入房间 WS，系统**必须**服务端权威校验并广播每一步 | P0 |
| AC-04 | 胜负判定 | If 任一方连成五子，系统**必须**判定胜者并结束对局 | P0 |
| AC-05 | 段位更新 | When 对局结束，系统**必须**按 ELO 更新用户段位且 user_id 不变 | P0 |
| AC-06 | 访客升级 | If 游客绑定邮箱，系统**必须**保留 user_id 与历史对局 | P0 |
| AC-07 | AI 对战 | While 用户选 vs AI，系统**必须**在 500ms 内返回合法落子 | P1 |
| AC-08 | 分享卡 | When 对局结束，系统**必须**生成可分享卡片并返回 OG URL | P0 |
| AC-09 | 排行榜 | While 访问排行榜，系统**应该**按 ELO 降序展示前 100 | P1 |
| AC-10 | SEO | When 爬取首页，系统**必须**返回静态 SVG 棋盘且 Lighthouse SEO ≥95 | P0 |

## 10. 边界与约束

- 不支持 IE 浏览器；现代 evergreen 浏览器 + 移动 Safari/Chrome。
- 响应式断点：sm 640 / md 768 / lg 1024 / xl 1280。
- 性能目标：Lighthouse SEO ≥95、LCP < 2.5s、CLS < 0.1。
- 实时经 Cloudflare DO（非 Vercel WS）；MVP 不接支付。
- guest token 过期（180 天）后可绑定邮箱升级，user_id 不变。
- 文化叙事带用真实器物摄影（已批预算），MVP 首屏 1–2 张。
- 会员付费墙不在 MVP；P1 接 waffo。

## 11. 内嵌已知坑（从项目记忆拉取）

- 项目首轮，无历史 `pitfalls.jsonl`。预留坑召回机制：Phase 3 开发开始时按技术栈指纹（next.js-16 / neon / cloudflare-do / phosphor / waffo）注入。
- 高风险点（架构师标注）：Cloudflare DO WebSocket Hibernation 唤醒延迟、wasm 首包体积、next-intl 路由前缀与 SSR metadata 冲突、guest 升级时 user_id 映射一致性。

## 12. 端到端验证步骤

```bash
# 1. 构建
npm run build

# 2. 启动
npm run dev   # 等待 "Ready on http://localhost:3000"

# 3. 核心成功流：创建游客房 + 落子
curl -X POST http://localhost:3000/api/v1/auth/guest
# 断言：返回 guest_token + user_id
curl -X POST http://localhost:3000/api/v1/rooms \
  -H "Authorization: Bearer $TOKEN" -d '{"type":"friend","mode":"pvp"}'
# 断言：返回 room_id + invite_url

# 4. WS 连接房间，双方落子至五连
# 断言：对局结束 + ELO 更新（GET /api/v1/users/me 查看 elo/rank 变化）

# 5. 分享卡
curl -X POST http://localhost:3000/api/v1/share -d '{"game_id":"..."}'
# 断言：返回 card_url

# 6. 关键错误流：重复邮箱升级冲突
curl -X POST http://localhost:3000/api/v1/auth/guest/upgrade \
  -H "Authorization: Bearer $TOKEN" -d '{"email":"dup@example.com"}'
# 断言：返回 409 + 错误信息，user_id 不变
```

## 13. 变更记录

| 日期 | 变更内容 | 原因 | 影响范围 |
|------|----------|------|----------|
| 2026-08-07 | 初始 Spec v0.4 | 三文档确认后生成 | 全量 |
