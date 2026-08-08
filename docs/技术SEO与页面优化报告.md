# 弈界 YiBoard · 技术 SEO 与页面优化报告

> 版本：v1.0（2026-08-08）｜审计方式：代码级静态核验（未跑 Lighthouse/PageSpeed）
> 前置状态：代码已上线 Vercel（Neon 持久化已接入），5 语（EN/中文/ES/JA/PT-BR）

---

## 一、执行摘要

**结论：基础盘（sitemap / robots / hreflang / OG / JSON-LD 首页 / 自托管字体 / SSG 骨架）已到位，属于"能上线"水平；但存在 1 个 canonical 正确性缺陷、1 个社交分享无图缺口，以及一批结构化数据与站点级优化待补。**

| 优先级 | 项数 | 性质 |
|--------|------|------|
| 🔴 P0（上线前必修） | 3 | canonical 修复、OG 分享图、正式域名 |
| 🟡 P1（上线后 1-2 周） | 5 | GA4、自定义 404、theme-color、站点级 JSON-LD、FAQPage |
| 🟢 P2（持续优化） | 6 | Lighthouse 目标、页面级 JSON-LD、性能、内容质量等 |

---

## 二、现状审计（✅ 已达标）

### 2.1 索引与爬取
| 项 | 状态 | 说明 |
|----|------|------|
| `sitemap.xml` | ✅ | 5 语全路由 + 每 URL 的 hreflang alternates（x-default 指向 `/`） |
| `robots.txt` | ✅ | Allow all + sitemap 引用；`SITE_URL` 可覆盖 |
| robots meta | ✅ | 页面级 `index, follow`；share 页显式 `robots: { index: true }` |
| HTTPS 强制 | ✅ | Vercel 平台默认 |

### 2.2 页面元数据
| 项 | 状态 | 说明 |
|----|------|------|
| Title 模板 | ✅ | `'%s — YiBoard'`（每个页面都有独立 title） |
| Description | ✅ | 每页有独立 description（含子页面） |
| canonical | ⚠️ 有缺陷 | layout 层设了 `/${locale}`，但**子页面未覆盖** → 子页面 canonical 指向错误 URL（见 P0-1） |
| Open Graph | ✅ 基础 | `type=website, siteName, title, description, locale` |
| Twitter Card | ✅ 基础 | `summary_large_image`（缺图片，见 P0-2） |

### 2.3 结构化数据
| 项 | 状态 | 说明 |
|----|------|------|
| 首页 WebApplication | ✅ | `applicationCategory: GameApplication` + Offer（免费） |
| 其他页面 JSON-LD | ❌ | 仅首页有（见 P1-4/P1-5） |

### 2.4 性能基础
| 项 | 状态 | 说明 |
|----|------|------|
| 字体加载 | ✅ | `next/font` 自托管（Archivo + Inter），零外部请求 |
| 首屏 LCP | ✅ | Hero 直接渲染棋盘 SVG（服务端直出，ADR-010），引擎代码动态 import 懒加载 |
| 静态化 | ✅ | build 67/67 页面：大部分 SSG/预渲染；play/rankings/profile/share 为 dynamic（数据依赖） |
| 资源缓存 | ✅ | Next 静态资源 immutable 缓存 + Vercel CDN |

---

## 三、P0 缺口（上线前必修）

### P0-1 🔴 子页面 canonical 错误
- **问题**：`layout.tsx` 设 `alternates.canonical = /${locale}`，页面级 `generateMetadata` 只返回 `alternates.languages`（不覆盖 canonical）。Next 的 metadata 合并规则是**嵌套浅合并** → 所有子页面（如 `/zh/play`）的 canonical 实际是 `/zh`（layout 的值），自相矛盾。
- **影响**：Google 可能合并/降权子页面；hreflang 信号被削弱。
- **修复**：给 12 个子页面 `generateMetadata` 统一加 `canonical: localeAlternates('...')` 同路径。文件：about / auth / blog / contact / faq / how-to / play / pricing / privacy / profile / rankings / terms / share/[id]。
- **验收**：`curl -sI https://yiboard.vercel.app/zh/play | grep -i canonical` 应返回 `/zh/play`（而非 `/zh`）。

### P0-2 🔴 社交分享无预览图
- **问题**：OG 与 Twitter Card 均未配置 `image`。分享链接在微信/Telegram/X 上无卡片图，点击率明显受损；**用户核心功能"分享对局"的传播力直接打折**。
- **修复**：
  1. 生成一张 **1200×630 PNG 品牌分享图**（深色棋盘 + 弈界 YiBoard + 标语"Gomoku today. Xiangqi and Go next."）→ 放 `public/og.png`（需新建 public/ 目录）。
  2. layout.tsx 的 `openGraph.images` 与 `twitter.images` 引用 `/og.png`。
  3. **分享卡页面单独覆盖**：`share/[id]/page.tsx` 的 OG 图可动态带 `?game=<id>`（P2 可做动态 OG 服务）。
- **验收**：`curl -s https://yiboard.vercel.app/ | grep -o 'og:image[^>]*'` 返回图 URL；分享到任意 IM 有卡片。

### P0-3 🔴 正式域名（SITE_URL）
- **问题**：`SITE_URL` 未配置 → sitemap/robots/canonical 都输出 `http://localhost:3000` 或 Vercel 默认域名。域名 = 品牌资产，也是索引信号。
- **修复**：购买域名（如 `yiboard.com`）→ Vercel 绑定 → 环境变量 `SITE_URL=https://yiboard.com` → Redeploy。
- **验收**：`curl -s https://yiboard.com/sitemap.xml` 首行 URL 域名正确。

---

## 四、P1 优化（上线后 1-2 周）

### P1-1 站点级 JSON-LD（Organization + WebSite）
在 layout 加 `Organization`（name/url/logo/sameAs 社交链接）+ `WebSite`（searchAction 可选）。让 Google 认识品牌实体。
- 文件：`src/app/[locale]/layout.tsx`（或独立 `src/lib/seo.ts`）。

### P1-2 FAQPage 结构化数据（faq 页）
FAQ 页加 `FAQPage` JSON-LD（7 问 7 答），有机会拿富结果（FAQ rich results）。
- 文件：`src/app/[locale]/faq/page.tsx`（复用现有翻译 key，零新文案）。

### P1-3 GA4 埋点
- `NEXT_PUBLIC_GA_ID` 已有占位；加官方 `@next/third-parties/google` 的 `<GoogleAnalytics />`（lazy，不阻塞渲染），配 `_ga` 事件：落子、开房、分享、注册、登录。
- 注意隐私政策需同步更新（"第三方分析"一节当前写着 no third-party analytics）。

### P1-4 自定义 404 页
默认 404 是 Next 白板。加品牌化 404（中文/英文，含"开一局新的"CTA + 回首页），5 语。
- 文件：`src/app/[locale]/not-found.tsx`。

### P1-5 theme-color + viewport
移动端浏览器地址栏颜色：`themeColor` 用品牌色（明/暗分别配置）。
- 文件：layout 的 `export const viewport`。

---

## 五、P2 持续优化

| 项 | 说明 |
|----|------|
| 性能目标 | Lighthouse 目标：LCP < 2.5s / CLS < 0.1 / INP < 200ms。目前 Hero 无大图 + 字体自托管，潜力大；待真机跑一次 PageSpeed 定位 |
| 页面级 JSON-LD | `Game`（play 页：游戏名/规则/玩法链接）、`BreadcrumbList`（排行榜/FAQ 等层级页）、分享卡 `CreativeWork` |
| 动态 OG 图 | share 卡按棋谱动态生成 OG 图（`vercel/og` 或 `/api/og`）→ 分享到 IM 直接看到棋局 |
| 多语言内容质量 | zh/es/ja/pt-BR 正文是人工翻译 ✅，但要补各语种独立 meta description 的本地化关键词（当前是统一翻译） |
| 关键词覆盖 | "五子棋 online / Gomoku online free / play gomoku" 等落地页文案锚点（首页 headline 已含"五子连珠"，可再加 H2 关键词变体） |
| 链接资产 | 博客 3 篇可扩展为常态内容计划；外部高质量回链（棋类社区/目录站） |

---

## 六、验收清单（上线前跑一遍）

```bash
# 1. canonical 全对
curl -sI https://<域名>/zh/play | grep -i canonical        # 应含 /zh/play
curl -sI https://<域名>/en/pricing | grep -i canonical     # 应含 /en/pricing

# 2. OG 图存在
curl -sI https://<域名>/og.png | head -1                   # 200

# 3. sitemap 域名正确 + 含 5 语
curl -s https://<域名>/sitemap.xml | grep -o "<loc>[^<]*" | head -5

# 4. robots 引用 sitemap
curl -s https://<域名>/robots.txt

# 5. 首页 JSON-LD 可解析（Google Rich Results 测试或 JSON 校验）

# 6. PageSpeed（https://pagespeed.web.dev）移动端 ≥ 90 分基线
```

---

## 七、建议执行顺序

1. **当天**：P0-1 canonical 修复（12 个文件，30 分钟）+ P0-2 OG 图（生成一张图 + layout 引用）
2. **本周**：P0-3 域名 + P1-1/P1-2 JSON-LD + P1-4 404
3. **两周内**：P1-3 GA4 + P1-5 theme-color + P2 性能跑分
4. 每次改动后跑第六节验收清单

---

*报告由 MVP 开发专家团（大湾区靓仔 · SEO 审计）产出。*
