import { NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';
import { getPostSlugs, getAllTags } from '@/lib/blog/posts';
import { XIANGQI_OPENING_SLUGS } from '@/lib/xiangqi/openings';

/**
 * sitemap.xml — 基准域名固定为 canonical https://yiboardgame.com（与 layout 的 metadataBase 一致）。
 * 不再取 request Host：旧逻辑会被 Google 用 http/www 等非规范 host 爬取后，把同类 host 写进 sitemap，
 * 反而制造出 GSC 里 http://、www、非 www 多版本重复的乱象。固定 canonical 基准后，无论谁爬，sitemap 只输出规范 URL。
 * 若 Vercel 设置了 NEXT_PUBLIC_SITE_URL 则优先使用，否则回退 yiboardgame.com。
 */
export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yiboardgame.com';

const PATHS = [
  '',
  '/play',
  '/rankings',
  '/how-to',
  '/glossary',
  '/about',
  '/profile',
  '/blog',
  '/faq',
  '/pricing',
  '/terms',
  '/privacy',
  '/contact',
  '/games',
  '/puzzle',
  '/gomoku-rules',
  '/renju-rules',
  '/gomoku-vs-go',
  '/xiangqi',
  '/learn-xiangqi',
  '/xiangqi/openings',
  '/go',
  '/go-rules',
] as const;

/** 与 /replays/[id] 页一致：低于该手数的 AI 对局 noindex，也不进 sitemap。 */
const MIN_INDEX_MOVES = 12;

function href(base: string, locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${base}${prefix}${path}`;
}

export function GET() {
  const base = SITE_URL;
  const now = new Date().toISOString();

  const staticEntries = PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: href(base, locale, path),
      path,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, href(base, l, path)]),
      ),
    })),
  );

  // Blog posts: each article exists for every locale (non-en/zh fall back to English content).
  const blogEntries = getPostSlugs().flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: href(base, locale, `/blog/${slug}`),
      path: `/blog/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, href(base, l, `/blog/${slug}`)]),
      ),
    })),
  );

  // Xiangqi openings: each opening detail page exists for every locale.
  const openingEntries = XIANGQI_OPENING_SLUGS.flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: href(base, locale, `/xiangqi/openings/${slug}`),
      path: `/xiangqi/openings/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, href(base, l, `/xiangqi/openings/${slug}`)]),
      ),
    })),
  );

  // Blog tag archives: /blog/tag/<tag> for each tag, every locale.
  const tagEntries = getAllTags().flatMap((tag) =>
    routing.locales.map((locale) => ({
      url: href(base, locale, `/blog/tag/${tag}`),
      path: `/blog/tag/${tag}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, href(base, l, `/blog/tag/${tag}`)]),
      ),
    })),
  );

  const entries = [...staticEntries, ...blogEntries, ...openingEntries, ...tagEntries];

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
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
}
