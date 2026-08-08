import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';

/** 部署时用 SITE_URL 覆盖；默认正式域名（本地 dev 不影响——sitemap 仅供生产爬取）。 */
const BASE = (process.env.SITE_URL ?? 'https://yiboardgame.com').replace(/\/$/, '');

const PATHS = ['', '/play', '/rankings', '/how-to', '/about', '/profile'] as const;

function href(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${BASE}${prefix}${path}`;
}

/** 每个页面输出全语种 alternates（hreflang 由 sitemap 双保险，页面 metadata 另出）。 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: href(locale, path),
      lastModified: new Date(),
      changeFrequency: (path === '' ? 'weekly' : 'monthly') as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, href(l, path)]),
        ),
      },
    })),
  );
}
