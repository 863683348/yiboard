/**
 * 页面级 SEO helper：canonical + hreflang alternates。
 * layout 的 alternates 只对首页正确；子页面必须自己输出，否则 /es/play 的
 * canonical/languages 会错误指向 '/' 或 /es。sitemap.ts 已覆盖全量，这里保证页面 <link> 也正确。
 */
import { routing } from './routing';

export function localeAlternates(path: string, locale: string) {
  const href = (l: string) => (l === routing.defaultLocale ? `/${path}` : `/${l}${path}`);
  return {
    // canonical = 当前语言版本的页面自身（hreflang 多语站每语言独立 canonical，避免全指向英文）
    canonical: href(locale),
    languages: Object.fromEntries(routing.locales.map((l) => [l, href(l)])),
    'x-default': href(routing.defaultLocale),
  };
}
