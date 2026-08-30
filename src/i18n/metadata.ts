/**
 * 页面级 SEO helper：canonical + hreflang alternates。
 * layout 的 alternates 只对首页正确；子页面必须自己输出，否则 /es/play 的
 * canonical/languages 会错误指向 '/' 或 /es。sitemap.ts 已覆盖全量，这里保证页面 <link> 也正确。
 *
 * 注意：Next.js 的 metadata.alternates.languages 只读取该对象内部的键，
 * 顶层 'x-default' 会被忽略。因此 x-default 必须作为 languages 的一个键写入。
 *
 * locales 默认取全站 routing.locales；博客相关页传入 BLOG_LOCALES（仅 en/zh），
 * 以实现"博客 4 语种收缩"——非内容语言不出现在 hreflang 中（且由页面 noindex）。
 */
import { routing, type Locale } from './routing';

export function localeAlternates(
  path: string,
  locale: string,
  locales: readonly string[] = routing.locales,
) {
  // 规范化 path：确保带前导斜杠，否则非默认语言分支会拼成 /zhhow-to（404）。
  const p = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const href = (l: string) => (l === routing.defaultLocale ? (p || '/') : `/${l}${p}`);
  return {
    // canonical = 当前语言版本的页面自身（hreflang 多语站每语言独立 canonical，避免全指向英文）
    canonical: href(locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, href(l)])),
      // x-default 必须落在 languages 内，Next.js 才会输出 <link rel="alternate" hreflang="x-default">
      'x-default': href(routing.defaultLocale),
    },
  } as const;
}
