# YiBoard 竞品 SEO 对比与改进参考点

> 生成日期：2026-08-29 ｜ 站点：yiboardgame.com ｜ 当前版本：象棋 MVP V1 已上线（commit `e43b8d5`）
> 视角：技术 SEO + 内容战略 + 权威建设（白帽，长期主义）

---

## 0. 结论先行（TL;DR）

YiBoard 的**技术底座已经优于 90% 的同类小站**：Next.js App Router、next-intl 多语、hreflang 实现正确、JSON-LD 已铺（Organization/WebSite/WebApplication）、SearchAction 真实可用、next/font 零 CLS。

但对比真正的流量巨头（chess.com / lichess / 象棋百科 xqbase），差距集中在三点：
1. **内容规模与深度不足**（无开局库/棋谱库、博客单薄且偏 Gomoku）
2. **两个已修复的排名隐患**：① 象棋页曾自报 `aggregateRating 4.6/128` 无任何真实评价（结构化数据垃圾邮件风险，易被 manual action）→ 已删除；② 新上线 `/xiangqi` 漏进 sitemap → 已补。
   - ⚠️ **勘误**：初版本报告称"缺少 sitemap.xml / robots.txt"，系 glob 漏掉 `sitemap.xml/route.ts` 嵌套路径所致；核对真实文件后两者均已实现且专业（多语 × 5、hreflang 含 x-default、博客/AI 对局全覆盖、robots 已 Disallow `/api/*`）。
3. **权威与社区信号空白**（无作者署名、无 sameAs、无 UGC 粘性）

下面给出维度评分、代码级审计发现、以及按参考站打法拆解的优先级清单。

---

## 1. 参考站选取与各自强项

| 参考站 | 类型 | 最值得抄的打法 |
|---|---|---|
| **chess.com** | 国际象棋巨头 | 巨型内容枢纽（课程/谜题/开局浏览器/文章/视频）+ 社区 UGC + 品牌权威；长尾词覆盖极广 |
| **lichess.org** | 开源免费棋类 | **开局树（Opening Explorer，百万级局面）= 程序化 SEO 典范**；极速、强技术 SEO；研究/训练体系 |
| **xqbase.com（象棋百科）** | 中国象棋垂直权威 | 开局库、棋谱库、残局、大师文章——垂直领域的**主题权威（Topical Authority）** |
| **BoardGameArena / 联众 / 弈城** | 多人对战平台 | 实时对战、排行榜、赛事 → 用户粘性 → 自然外链与社媒传播 |
| **Wikipedia（Xiangqi / Gomoku）** | 知识源 | 常驻"如何下"类特征片段（Featured Snippet）引用源 |

**核心洞察**：棋类站的 SEO 胜负手不是"能不能玩"，而是**"教程 + 开局/棋谱数据库 + 社区"三件套**。纯对战页面只能吃品牌词，只有内容+数据库才能吃海量非品牌长尾（"how to play xiangqi"、"xiangqi opening"、"gomoku strategy" 等）。

---

## 2. 维度评分对比（满分 5）

| 维度 | YiBoard 现状 | chess.com | lichess | xqbase | 主要差距 |
|---|:--:|:--:|:--:|:--:|---|
| 技术 SEO（ crawl/index/CWV） | **4** | 5 | 5 | 3 | 缺 sitemap/robots；blog 误用 force-dynamic |
| 结构化数据 | **3.5** | 5 | 5 | 3 | 有 WebApp/Org，但假 rating 埋雷；缺 FAQ/HowTo/Breadcrumb |
| 内容深度与覆盖 | **2** | 5 | 5 | 4 | 无开局库/棋谱库；博客个位数且偏 Gomoku |
| 主题权威（E-E-A-T） | **1.5** | 5 | 4 | 4 | 无作者/专家背书；sameAs 空 |
| 社区/用户信号 | **2.5** | 5 | 5 | 3 | 有 rankings/replays 但缺 UGC 与分享闭环 |
| SERP 特性占位 | **2** | 5 | 5 | 3 | 未占 Featured Snippet / PAA / 知识面板 |
| 多语/国际覆盖 | **3.5** | 4 | 4 | 1 | 架构就绪，但 es/ja/pt-BR 内容覆盖存疑 |

> 评分基于代码审计 + 公开认知，非精确爬取（本环境无可用浏览器额度，建议用 GSC + Ahrefs/Semrush 校准）。

---

## 3. 当前站点 SEO 审计发现（已读代码，证据级）

### ✅ 已做对的（保留，不要动）
- **hreflang 正确**：`layout.tsx:56-59` canonical + `languages` + `x-default:'/'`；子页用 `localeAlternates()`（`i18n/metadata.ts`）独立输出每语 canonical，避免全指向英文。这是多数多语站翻车的地方，YiBoard 做对了。
- **JSON-LD 已铺**：`layout.tsx:101-104` 含 Organization + WebSite + **真实可用的 SearchAction**（target `/blog?q=`）；象棋页 `xiangqi/page.tsx:36-46` 有 WebApplication + Offer(price 0)。
- **SearchAction 真实可用**：`blog/page.tsx:20-28` 确实有 `?q=` 站内搜索逻辑 → Sitelinks Searchbox 富媒体成立（不是假声明）。
- **性能基础好**：`next/font`（Archivo/Inter，`display:swap`）→ 无布局抖动；`layout.tsx:82-85` 内联主题 bootstrap 防 FOUC。
- **象棋页有实质内容**：`xiangqi/page.tsx:67-92` 七种棋子走法规则（中英双语），满足"用户意图 + 内容深度"门槛。
- **页面骨架完整**：blog / faq / glossary / gomoku-rules / renju-rules / gomoku-vs-go / how-to / rankings / replays / share / puzzle 均已存在 → 内容矩阵雏形在。

### ⚠️ 必须修的硬伤

#### P0-1 · sitemap/robots 已存在，但 `/xiangqi` 漏进 sitemap（✅ 已修复）
- **勘误**：初版称"缺少 sitemap.xml / robots.txt"，系 glob 漏掉 `sitemap.xml/route.ts` 嵌套路径所致。核对真实文件后两者**均已实现且专业**：
  - `sitemap.xml/route.ts`：静态路由 × 5 语言 + 博客文章 + AI 对局（≥12 手）+ 完整 hreflang（含 x-default），canonical 基准固定。
  - `robots.txt/route.ts`：Allow `/`、Disallow `/api/*`（全语言）、Sitemap 指向规范域名。
- **真实遗漏**：刚上线的 `/xiangqi`（commit `e43b8d5`）未加入 `sitemap.xml/route.ts` 的 `PATHS` 常量 → 该主推页面不在 sitemap 中，只能靠内链被发现。
- **处置（✅ 已落地）**：`PATHS` 已补 `'/xiangqi'`。后续新增页面务必同步更新此清单，或改为从路由表自动枚举避免人工漏项。
- **对标**：chess.com / lichess 的 sitemap 按内容类型分片且随路由自动生成，避免人工漏项。

#### P0-2 · 象棋页自报 `aggregateRating`（结构化数据违规风险）— ✅ 已修复
- `xiangqi/page.tsx:45` 原代码：
  ```ts
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', ratingCount: '128' }
  ```
- 全站**无任何真实评价/评分系统** → 这是 Google 明确的"self-serving rating without real reviews"垃圾邮件信号，**可能触发 manual action（富媒体被剥夺甚至整站降级）**。
- **前车之鉴**：本会话 08-28 在 awesomecodexskin 刚移除过完全同款的假 `aggregateRating`（ratingValue:0 + 自评 review），当时明确判定"有 manual action 风险"。YiBoard 现在踩了同一个坑。
- **处置（✅ 已落地）**：**已删除**整段 `aggregateRating`，保留 `Offer(price 0)` + `WebApplication`，合规且零风险。后续若要做评分，先上线真实用户评分组件再标记真实数据。

### 🟡 应优化（P1）

#### P1-1 · `blog/page.tsx` 误用 `export const dynamic = 'force-dynamic'` — ✅ 已修复
- 博客索引每次请求都重渲染 → ① 浪费 Vercel FOT（Fast Origin Transfer）预算；② 不利于 CWV 稳定；③ 失去静态缓存红利。
- **处置（✅ 已落地）**：改为 `export const revalidate = 3600`（ISR），与 `xiangqi/page.tsx:29` 一致。搜索结果本身仍是动态的（searchParams 驱动），但列表骨架走缓存。

#### P1-2 · 象棋页缺 FAQPage schema / PAA 覆盖
- "how to play xiangqi"、"can xiangqi generals face each other"、"xiangqi vs chess" 是高频 PAA → 参考站常驻特征片段。
- **改法**：在 `xiangqi/page.tsx` 加 `<section>` FAQ（5–8 条）+ `FAQPage` JSON-LD。复用本站 faq 页已有模式。

#### P1-3 · 内容深度：博客单薄且偏 Gomoku
- 已发布内容以 Gomoku 为主（如 Dev.to 的 "Five beginner mistakes in Gomoku"）；**Xiangqi / Go 长文、开局、战术、残局几乎空白**。
- **对标 chess.com lessons / xqbase 文章**：每棋种建"支柱页 + 簇页"集群（见 §4）。

#### P1-4 · E-E-A-T 信号空白
- `layout.tsx:103` 的 Organization `sameAs: []` 为空；全站无作者署名、无专家背书、无"关于我们/编辑政策"。
- **对标 xqbase（大师署名）**：补作者页、专家简介、引用权威来源（如世界象棋联合会规则）。

### 🟢 长期（P2）
- **知识面板信号**：填 `sameAs`（社媒/维基）、加 `BreadcrumbList` schema。
- **多语内容真实覆盖**：`routing.ts` 已含 es/ja/pt-BR，但需确认这些 locale 的消息文件与内容已就绪；未翻译页回退英文会稀释地区相关性。
- **PWA / 离线**：参考 lichess 的强离线体验（可后续做）。

---

## 4. 改进参考点（按参考站打法拆解）

### A. 程序化 SEO：开局库 / 棋谱库（对标 lichess Opening Explorer + xqbase）
- **机会**：YiBoard 已有完整 `xiangqi` 引擎（`src/lib/engine/xiangqi/`），可程序化生成"开局 → 合法变化 → 后续局面"页面矩阵。
- **打法**：建 `xiangqi/openings/[slug]` 模板页（Programmatic SEO），每页含：名称、走法序列（PGN 风格）、引擎评估、常见应对、FAQ。成千上万长尾页（"炮二平五 怎么应对"、"xiangqi central cannon"）。
- **同理**可扩展到 Gomoku/Renju 定石库。

### B. 内容枢纽：每棋种"支柱 + 簇"（对标 chess.com Lessons）
- 支柱页：`/how-to-play-xiangqi`、`/xiangqi-strategy`、`/xiangqi-openings`
- 簇页：开局解析 / 战术（抽将、闷宫）/ 残局（马擒单士）/ 常见错误 / 历史与文化
- 内部链接：簇 → 支柱 → 对战页（`/xiangqi`、`/play`），形成主题权威闭环。

### C. FAQ + PAA 占位（对标 Wikipedia 特征片段）
- 为每个棋种规则页加 FAQPage schema，覆盖 PAA 高频问句；用表格/列表结构化以便抢 Featured Snippet。

### D. 谜题 / 训练（对标 chess.com Puzzles / lichess Puzzles）
- 已有 `/puzzle` 路由 → 包装成"每日象棋谜题""Gomoku 必胜形"系列内容页 + JSON-LD（`Game`/`HowTo`），吃"xiangqi puzzle"类词。

### E. 社区 / 对战 / 排行榜粘性（对标 BoardGameArena）
- 已有 rankings / replays / share → 加**一键分享到社媒 + 嵌入代码**（`share/[id]` 已存在），刺激自然外链与回流。
- UGC：用户棋谱、公开对局库 → 持续产出可被索引的新鲜内容。

### F. 权威背书 / E-E-A-T（对标 xqbase 大师内容）
- 作者页 + 专家署名（可邀请业余棋手/教练供稿）+ 引用权威规则来源 + 填 `sameAs`。

---

## 5. 优先级清单（落地动作）

### P0（本周，影响排名安全）— ✅ 已落地
- [x] **勘误**：sitemap/robots 早已实现（`sitemap.xml/route.ts` + `robots.txt/route.ts`），无需新建；初版"缺失"为 glob 误判。
- [x] **`sitemap.xml/route.ts` 补 `/xiangqi`** 入 `PATHS`（原漏项，新主推页不在 sitemap）。
- [x] **删除 `xiangqi/page.tsx` 的 `aggregateRating`**（假评分，manual action 风险）。

### P1（本月，吃长尾）— 部分已落地
- [x] `blog/page.tsx`：`force-dynamic` → `revalidate = 3600`。
- [ ] 象棋页加 FAQPage schema + 5–8 条 PAA 问答。
- [ ] 象棋页加 FAQPage schema + 5–8 条 PAA 问答。
- [ ] 发布 3–5 篇 Xiangqi/Go 长文（支柱+簇），补齐博客失衡。
- [ ] 补 Organization `sameAs` + 作者/关于页。

### P2（下季度，建壁垒）
- [ ] 程序化开局库（`xiangqi/openings/[slug]`）。
- [ ] 谜题系列内容页 + JSON-LD。
- [ ] 社媒分享闭环 + UGC 棋谱库。
- [ ] 多语（es/ja/pt-BR）内容真实覆盖校验。

---

## 6. 90 天路线图（呼应参考站）

| 阶段 | 重点 | 对标 |
|---|---|---|
| 0–2 周 | P0 修复（sitemap/robots/假 rating）+ blog ISR | 技术地基 |
| 3–6 周 | 象棋/围棋内容枢纽（支柱+簇）+ FAQ schema | chess.com lessons |
| 7–10 周 | 开局库程序化页面矩阵 + 谜题内容 | lichess explorer |
| 11–12 周 | 社区分享闭环 + E-E-A-T 补全 + 多语校验 | xqbase / BGA |

---

## 7. 衡量指标（ honest，非一夜暴富）

- **技术健康**：sitemap 覆盖 100% 已上线页；0 结构化数据错误（Rich Results Test）；CWV 全绿。
- **索引**：GSC "已编入索引的页面" 随内容上线线性增长；新页收录 < 1 周。
- **流量**：非品牌 organic 会话 6 个月 +50%（保守，参考 haoweirecipes 经验：内容竞争力先被验证，0 点击期靠域名权重积累）。
- **SERP 占位**：目标 6 个月内抢下 10–20 个 Xiangqi/Gomoku PAA / Featured Snippet。
- **权威**：referring domains 月增（数字 PR + 开局库可链接资产）。

> 注：SEO 是复利，不是脉冲。chess.com/lichess 的体量来自 10+ 年内容与数据库积累；YiBoard 用"程序化开局库 + 内容集群"可在 12 个月内用自动化追上内容规模差距（参考本站 100 天内容流水线打法）。

---

*审计依据文件：`src/app/[locale]/layout.tsx`、`src/app/[locale]/xiangqi/page.tsx`、`src/app/[locale]/blog/page.tsx`、`src/app/[locale]/page.tsx`、`src/i18n/routing.ts`、`src/i18n/metadata.ts`。未做线上爬取（环境无浏览器额度），建议用 GSC + 第三方工具校准评分。*
