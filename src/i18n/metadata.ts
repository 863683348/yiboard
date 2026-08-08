/**
 * 页面级 hreflang alternates helper。
 * layout 的 alternates 只对首页正确；子页面必须自己输出，否则 /es/play 的
 * languages 会错误指向 '/'。sitemap.ts 已覆盖全量，这里保证页面 <link> 也正确。
 */
import { routing } from './routing';

export function localeAlternates(path: string) {
  const href = (l: string) => (l === routing.defaultLocale ? `/${path}` : `/${l}${path}`);
  return {
    languages: Object.fromEntries(routing.locales.map((l) => [l, href(l)])),
    'x-default': href(routing.defaultLocale),
  };
}
