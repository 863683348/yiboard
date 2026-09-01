# YiBoard 新页面 SEO / GSC 提交清单
**New pages:** `/reversi` · `/chess` · `/tsumego`
**Date:** 2026-09-01
**Status:** 代码已完成，待本地验证 → 上线 → 提交索引

---

## 1. 技术就绪项（已完成 ✅）

| 项目 | 状态 | 说明 |
|---|---|---|
| Sitemap | ✅ | `/sitemap.xml` 的 `PATHS` 已含 `/reversi` `/chess` `/tsumego`，并带 `localeAlternates`（en/zh + x-default） |
| 首页 GameCard | ✅ | 6 张卡（gomoku/xiangqi/go/reversi/chess/tsumego）全部 `live` |
| Meta / canonical | ✅ | 每页 `generateMetadata` + 自引用 canonical + OG/Twitter（`/og.png`） |
| 结构化数据 | ✅ | `WebApplication` + `FAQPage` JSON-LD 已注入 |
| i18n 兜底 | ✅ | en/zh 补全；es/ja/ko/pt-BR 经 `mergeBase` 深合并 en 兜底，缺键不报错 |
| 正文结构 | ✅ | 规则 `<ul>` + FAQ `<dl>`，利于 featured snippet |

---

## 2. 本地验证（沙箱 Bash 不可用，需本机跑）

```bash
cd yiboard
npx tsc --noEmit        # 类型检查（P0 三棋引擎 + 组件）
npm test               # 既有测试回归
npm run build          # 确认 3 新页产出 + /sitemap.xml 含新路径
git add -A && git commit -m "feat: 6 games live + i18n en-fallback + copy refresh" && git push
```

---

## 3. GSC / 索引提交（上线后执行）

- [ ] **站点地图**：GSC → 站点地图，重新提交 `https://metool.online/sitemap.xml`（确认含 3 新路径）
- [ ] **网址检查（URL Inspection）**：逐一「请求编入索引」
  - `https://metool.online/reversi`
  - `https://metool.online/chess`
  - `https://metool.online/tsumego`
  - 多语言变体 `/zh/reversi` 等（已用 `localeAlternates` 声明，GSC 会自动识别 hreflang）
- [ ] **Coverage 复查**：1–3 天后查覆盖率报告，确认 3 页均为「已编入索引」
- [ ] **IndexNow**：若站点已配 `INDEXNOW_KEY`，推送 3 个新 URL（密钥复用既有）

---

## 4. 关键词目标 & near-win 机会

| 页面 | 英文主目标词 | 中文目标词 | 竞争度 / 策略 |
|---|---|---|---|
| `/reversi` | reversi online, play reversi, othello game | 黑白棋在线, 翻转棋 | 中竞争 → 易进前 20 |
| `/chess` | play chess online, chess vs computer | 国际象棋在线, 象棋人机 | 高竞争 → 靠「免费 / 无注册 / 浏览器内」差异突围 |
| `/tsumego` | tsumego, go problems, life and death puzzles | 死活题, 围棋死活 | 长尾低竞争 → 易占 featured snippet |

> 建议：3 页各补 1–2 篇博客支棱（e.g. "Reversi strategy for beginners"），形成 topic cluster 内链。

---

## 5. 内部链接 & 权威传递

- 首页 6 张 GameCard 已互链到 3 新页 ✅
- **建议补充互链**：
  - `/go` 页加「想练死活？去 /tsumego」入口（Go ↔ Tsumego 强相关）
  - `/about` 文案目前仍举例「Gomoku, Xiangqi or Go」，可顺手改为「six board games」口径

---

## 6. 多语言待办（非阻断）

- es/ja/ko/pt-BR 当前新游戏 UI 文案回退英文；后续补译 `home.games.{reversi,chess,tsumego}.*` + `ctaReversi/ctaChess/ctaTsumego`
- `why.language.title` 仍写「four languages」，实际 5 个 locale（en/zh/es/ja/pt-BR）→ 建议改为「five languages」并补中文

---

## 7. 外链 / 平台（可选）

- yiboard 已上线，**非新站**，无需 `seo-once` 全平台重提
- 若发产品更新帖：Product Hunt 评论区 / 博客一笔带过「3 个新棋上线」即可
