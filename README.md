# 弈界 YiBoard

面向全球华人的战略棋类独立站（Web/PWA）：**五子棋**作流量钩子，**象棋 / 围棋**作留存，会员 + DTC 棋具作变现（P1 起）。免注册即玩，180 天访客会话，好友房服务端权威裁决，人机引擎跑在浏览器（alpha-beta 剪枝，500ms 预算）。

## 快速开始

```bash
# 要求 Node >= 22
npm install
npm run dev        # http://localhost:3000（无 DATABASE_URL 时用内存 store）
npm test           # node --test 直跑核心逻辑（段位 / 棋盘判定），16 用例
npm run type-check # tsc --noEmit
npm run build      # 生产构建
npm run start      # 生产模式（需 YB_AUTH_SECRET）
```

环境变量见 [`.env.example`](.env.example)。本地开发（无 `YB_AUTH_SECRET`）自动使用开发密钥；**生产必须配置 `YB_AUTH_SECRET`（≥32 字符），否则拒绝启动**。

## 技术栈（Spec 锁定）

Next.js 16（App Router）+ next-intl 4（EN/ES/JA/PT-BR）+ Tailwind v4 + drizzle-orm + Neon serverless Postgres（P0 前接入）+ jose（访客 JWT）+ Phosphor 图标（全项目唯一）。

## 目录速览

```
src/
  app/[locale]/       页面（home / play / rankings / how-to / about / profile / share/[id]）
  app/api/            路由（games / share / rooms / rooms/[code] / rooms/[code]/move）
  components/         Board（纯 SVG）、GomokuGame、FriendGame、ShareReplay、Navbar…
  lib/
    engine/           棋盘原语 + AI（动态 import，ADR-010 首屏只出 SVG）
    rooms.ts          好友房服务端权威（重放棋谱裁决，防作弊）
    store/            Store 契约 + 内存实现（Neon 适配 P0 接入）
    rank.ts           十八级双轨段位（九品→九段，ELO 100 分/级）
    auth.ts / session.ts  访客 JWT（180 天）
```

## 质量门禁

- P0：零 emoji 图标（Phosphor 单一库）、无紫粉渐变、无 AI 模板文案、组件零裸 hex（全走 Token）
- 每模块：`lint` → `type-check` → `test` 自检；`npm run build` 全绿
- 安全：生产强制 `YB_AUTH_SECRET`；安全响应头（CSP/HSTS/XFO/nosniff）；API 全量 `ensureUser` 鉴权；越界/轮次/胜负全部服务端判定

## 已知边界

- 内存 store（无 `DATABASE_URL`）：进程重启即清空，仅适合本地/预览；排行榜/个人页数据依赖单进程内存，**生产必须接 Neon**（drizzle 适配层见 `lib/store/`）
- 实时对弈当前为轮询（1.4s）；Cloudflare Durable Objects 长连接为 P0 上线前替换项（ADR-006）
- 引擎为 TS 实现，WASM 化（`@yiboard/engine`）为 P0 上线前替换项
