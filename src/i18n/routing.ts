import { defineRouting } from 'next-intl/routing';

/** ADR-007：首发四语 —— 英语基本盘 + 西语/葡语（拉美棋类社区活跃）+ 日语（围棋象棋文化圈）。中文随本迭代加入（用户要求中英双语）。 */
export const routing = defineRouting({
  locales: ['en', 'zh', 'es', 'ja', 'pt-BR'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ja: '日本語',
  'pt-BR': 'Português (BR)',
};
