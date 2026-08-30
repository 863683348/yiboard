import { defineRouting } from 'next-intl/routing';

/** ADR-007：首发四语 —— 英语基本盘 + 西语/葡语（拉美棋类社区活跃）+ 日语（围棋象棋文化圈）。中文随本迭代加入（用户要求中英双语）。
 * 2026-08-09 用户要求：默认语言为英文、打开 / 恒为英文（不被浏览器语言带偏）→ defaultLocale=en + localeDetection:false；
 * 用户想换语言时通过导航栏切换器手动选择（中文在 /zh）。 */
export const routing = defineRouting({
  locales: ['en', 'zh', 'es', 'ja', 'pt-BR', 'ko'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/**
 * 博客仅 en/zh 有真实双语内容（es/ja/ko/pt-BR 回退英文，属占位无独立内容）。
 * 这些语言版本的博客 URL 统一 noindex、且不进 sitemap / hreflang，作为"收缩"策略：
 * 索引足迹只保留 en + zh，避免英文正文以 4 个外语 URL 重复出现在索引里。
 * 其余页面（规则页、玩法页、开局库等）有真实本地化内容，仍按全量 locales 处理。
 */
export const BLOG_LOCALES: Locale[] = ['en', 'zh'];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ja: '日本語',
  'pt-BR': 'Português (BR)',
  'ko': '한국어',
};
