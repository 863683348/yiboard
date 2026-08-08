# 弈界 YiBoard — 架构决策记录 (ADR-001..012)

> 基于 Spec v0.4 / 技术架构 v0.3。MADR 格式：Status / Background / Decision / Consequences。
> 未决项已关闭的可升格为 ADR；本文件为 MVP 阶段全部已采纳决策。

---

## ADR-001: 采用 Next.js 16 App Router 作为前端框架
- **Status**: Accepted (2026-08-07)
- **Background**: 需要 SSR（SEO 落地页 Lighthouse SEO ≥95）+ i18n（4 语种）+ Vercel 原生部署 + PWA 离线能力。
- **Decision**: Next.js 16.3.0 App Router，锁定版本 16.3.0。
- **Consequences**: + SSR/SSG 友好、Vercel 一键部署、next-intl 生态成熟；- server/client 边界需严守，避免客户端包体膨胀。

## ADR-002: 采用 Neon serverless Postgres 作为数据库
- **Status**: Accepted (2026-08-07)
- **Background**: Vercel 无状态函数需无服务器数据库，避免常驻连接。
- **Decision**: Neon serverless Postgres 16，配合 drizzle 0.44.x ORM。
- **Consequences**: + 按需扩缩、Vercel 原生集成、分支数据库便于预览；- 冷启动延迟需连接池（drizzle + Neon pooler）缓解。

## ADR-003: 采用 Cloudflare Durable Objects 作实时对弈层（否决 Vercel 原生 WS）
- **Status**: Accepted (2026-08-07)
- **Background**: 双人对弈需低延迟状态广播、房间隔离、超时判负；Vercel 原生 WebSocket 受限于单实例钉扎、跨实例无广播、Pro 30 分钟上限。
- **Decision**: Cloudflare Durable Objects 为第 4 平台依赖。一房一对象 + Hibernation + Alarms 超时判负，MVP 近乎 $0。
- **Consequences**: + 状态强一致、跨实例广播、断线恢复；- 引入第二平台（Cloudflare），需独立部署与鉴权桥接。

## ADR-004: 实时对弈采用 WebSocket 服务端权威（否决客户端权威）
- **Status**: Accepted (2026-08-07)
- **Background**: 竞技段位（ELO）需防作弊，客户端不可信。
- **Decision**: DO 内校验每一步合法性、判定胜负、触发 ELO 更新；客户端仅渲染与发指令。
- **Consequences**: + 防作弊、裁决一致；- WS 链路比纯客户端重，需 Hibernation 控成本。

## ADR-005: AI 对手跑客户端 Web Worker/WASM（否决服务端 AI）
- **Status**: Accepted (2026-08-07)
- **Background**: 单人 vs AI 无需联网，降低服务端算力成本，支持离线 PWA。
- **Decision**: @yiboard/engine（自研 minimax + α-β 剪枝，WASM 编译），sub-500ms/手，懒加载。
- **Consequences**: + 零服务端成本、离线可用；- 客户端算力差异导致低端设备略慢，需难度档位调节搜索深度。

## ADR-006: Phosphor 为全项目唯一图标库（否决 lucide，P0 禁混用）
- **Status**: Accepted (2026-08-07)
- **Background**: 架构师原写 lucide-react，设计师锁 Phosphor，违反「禁止混用多套图标库」P0 规则。
- **Decision**: 统一 @phosphor-icons/react 2.x（regular/fill/bold 同族），16/20/24px 三档；denylist 禁 lucide/tabler/heroicons 及 emoji 作图标。
- **Consequences**: + 风格统一、可矢量缩放；- 需全仓检索替换任何遗留 lucide 引用。

## ADR-007: 采用 next-intl / app/[locale] 国际化，首批 4 语种
- **Status**: Accepted (2026-08-07)
- **Background**: 出海需多语言；增删语种不应改动路由。
- **Decision**: next-intl 4.x，路由 app/[locale]/...，默认 en 无前缀；首批 EN / ES / JA / PT-BR，文案目录 messages/{locale}.json。
- **Consequences**: + 增删语种零改路由；- 需维护 4 套文案，SEO 需 per-locale sitemap + hreflang。

## ADR-008: 采用 Waffo 作 MoR（否决 Stripe 直连，MVP 不集成）
- **Status**: Accepted (2026-08-07)
- **Background**: Stripe 需海外主体；独立站早期无实体，合规与 KYB 周期长。
- **Decision**: Waffo Pancake（MoR）承担税务与合规，无需我方海外实体；MVP 不集成 SDK，仅保留 subscriptions 表 + webhook 桩，P1 填实现并打开 billing_enabled。
- **Consequences**: + 173 国合规、无实体、AI-native SDK；- P1 才通电，MVP 无任何变现。

## ADR-009: guest 免注册账号体系
- **Status**: Accepted (2026-08-07)
- **Background**: 前 3 月唯一增长引擎是「分享棋谱卡片」病毒循环，注册墙会杀死转化。
- **Decision**: 好友房链接免注册直开；匿名 token（__Host-yb_guest，JWT HS256，180 天）；绑定邮箱升级为正式账号（POST /api/v1/auth/guest/upgrade），user_id 全程不变、历史对局零成本继承。
- **Consequences**: + 极简转化漏斗；- 匿名数据归属需在升级时安全映射。

## ADR-010: SEO 首屏静态 SVG 棋盘 + wasm 懒加载（解决 DS4 可玩 Hero vs Lighthouse）
- **Status**: Accepted (2026-08-07)
- **Background**: 可玩 Hero（免注册即玩）与 Lighthouse SEO ≥95 表面冲突——交互引擎会拖慢首屏。
- **Decision**: SSR 直接输出静态 SVG 棋盘（无 JS 依赖，LCP < 2.5s）；用户点击「开始对弈」后才 next/dynamic 实例化 @yiboard/engine（WASM + Web Worker）。引擎就绪前由静态 SVG 承接点击，无白屏、无 CLS。
- **Consequences**: + 兼顾 SEO 与可玩性；- 首屏棋盘为静态图，点击后才变交互。

## ADR-011: 设计语言「格律 Lattice」朱砂主色 + 双主题
- **Status**: Accepted (2026-08-07)
- **Background**: 需有文化辨识度、非 AI 模板味的视觉；同时避免紫粉渐变套路。
- **Decision**: 主色朱砂 #BE4A2F（象棋「红先」）；格（1px 线分隔）/子（圆形落子）/朱（强调 ≤2）三原则；双主题 + 棋盘主题（墨石/榧木/青石）；Archivo+Inter+Noto Sans SC/TC。
- **Consequences**: + 强辨识度、Token 化可维护；- 需严控强调色数量，防止视觉噪音。

## ADR-012: 段位体系 18 级（9 品 + 9 段）ELO 双轨
- **Status**: Accepted (2026-08-07)
- **Background**: 需文化共鸣（品级）与国际可读（段位）兼得，且可机器计算。
- **Decision**: 18 级阶梯（9 品 + 9 段），ELO 100 分等距分档、1200 = 六品，含英文译名（Ninth Grade … First Dan）；rank_grade / rank_dan 双字段，用户_id 关联。
- **Consequences**: + 文化叙事 + 国际可读；- 需维护 ELO→段位映射表与英文本地化。
