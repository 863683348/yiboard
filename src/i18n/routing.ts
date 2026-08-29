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

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ja: '日本語',
  'pt-BR': 'Português (BR)',
  'ko': '한국어',
};
