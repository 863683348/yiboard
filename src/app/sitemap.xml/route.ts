import { NextResponse, type NextRequest } from 'next/server';

import { getPostSlugs } from '@/lib/blog/posts';
import { routing } from '@/i18n/routing';

/**
 * sitemap.xml — 基准域名取请求 Host（自愈式）。
 * 不信任 SITE_URL 环境变量：域名换过但 env 没跟着换时，旧值会覆盖代码默认值
 * 导致 sitemap 输出旧域名（历史上 SITE_URL 被设成 yiboard.vercel.app 踩过坑）。
 * 直接取 request 的 origin，任何域名来访问就输出哪个域名，永远正确。
 */
export const dynamic = 'force-dynamic';

/**
 * 可索引路径（auth/profile 隐私页、share 动态卡一律 noindex，不进 sitemap）。
 * blog 列表页收录；文章详情页由 getPostSlugs() 动态追加（每篇 × 5 语 + hreflang）。
 */
const PATHS = [
  '',
  '/play',
  '/rankings',
  '/how-to',
  '/about',
  '/pricing',
  '/faq',
  '/blog',
  '/contact',
  '/gomoku-rules',
  '/renju-rules',
  '/glossary',
  '/gomoku-vs-go',
  '/puzzle',
  '/games',
] as const;

/** 所有可索引页面路径 = 固定页 + blog 文章详情页 */
const INDEXABLE_PATHS = [...PATHS, ...getPostSlugs().map((slug) => `/blog/${slug}`)] as const;

function href(base: string, locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${base}${prefix}${path}`;
}

export function GET(request: NextRequest) {
  const base = new URL(request.url).origin;
  const now = new Date().toISOString();

  const entries = INDEXABLE_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: href(base, locale, path),
      path,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, href(base, l, path)]),
      ),
    })),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map((e) => {
    const alternates = [
      `<xhtml:link rel="alternate" hreflang="x-default" href="${href(base, routing.defaultLocale, e.path)}"/>`,
      ...routing.locales.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${e.languages[l]}"/>`,
      ),
    ].join('\n');
    return `  <url>
    <loc>${e.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${e.path === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${e.path === '' ? '1.0' : '0.8'}</priority>
${alternates}
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      // route.ts 不走 next.config headers() 规则（该规则只作用于页面/metadata 路由），
      // 必须在此显式设置 Cache-Control，否则每次爬虫抓取都执行函数（FOT/调用飙升）。
      'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
