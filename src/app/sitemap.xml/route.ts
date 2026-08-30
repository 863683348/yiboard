import { NextResponse } from 'next/server';

import { routing, BLOG_LOCALES } from '@/i18n/routing';
import { getPostSlugs, getAllTags, POSTS, getPostBySlug } from '@/lib/blog/posts';
import { XIANGQI_OPENING_SLUGS, getMatchups } from '@/lib/xiangqi/openings';

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

function href(base: string, locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${base}${prefix}${path}`;
}

/**
 * 真实 lastmod：
 * - 博客文章：用文章自身的发布日期（post.date），反映真实更新时间。
 * - 其余页面（静态页、开局库、开局应手、标签归档）：无独立内容日期，用全站最近一次内容更新
 *   作代理——取最新一篇博文的日期。这样 lastmod 是稳定真实日期，而非每天请求的 now()，
 *   避免 Google 误以为每页天天变动而无效重抓。
 */
const SITE_LASTMOD = (POSTS.map((p) => p.date).sort().at(-1) ?? '2026-08-30');

type Entry = {
  url: string;
  path: string;
  lastmod: string;
  languages: Record<string, string>;
};

/** 生成某 path 的 hreflang 映射：含 x-default（指向默认语言版本）。 */
function langMap(base: string, path: string, locales: readonly string[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = href(base, l, path);
  map['x-default'] = href(base, routing.defaultLocale, path);
  return map;
}

export function GET() {
  const base = SITE_URL;

  // 静态页：博客索引 /blog 只取 BLOG_LOCALES（en/zh）；其余页面全量 locales。
  const staticEntries: Entry[] = PATHS.flatMap((path) => {
    const locales = path === '/blog' ? BLOG_LOCALES : routing.locales;
    return locales.map((locale) => ({
      url: href(base, locale, path),
      path,
      lastmod: SITE_LASTMOD,
      languages: langMap(base, path, locales),
    }));
  });

  // 博客文章：仅 en/zh 有真实内容，故只输出这两语 + x-default；lastmod 用文章发布日期。
  const blogEntries: Entry[] = getPostSlugs().flatMap((slug) => {
    const post = getPostBySlug(slug);
    const lastmod = post?.date ?? SITE_LASTMOD;
    const path = `/blog/${slug}`;
    return BLOG_LOCALES.map((locale) => ({
      url: href(base, locale, path),
      path,
      lastmod,
      languages: langMap(base, path, BLOG_LOCALES),
    }));
  });

  // 象棋开局详情页：各语言有真实本地化内容，全量 locales。
  const openingEntries: Entry[] = XIANGQI_OPENING_SLUGS.flatMap((slug) => {
    const path = `/xiangqi/openings/${slug}`;
    return routing.locales.map((locale) => ({
      url: href(base, locale, path),
      path,
      lastmod: SITE_LASTMOD,
      languages: langMap(base, path, routing.locales),
    }));
  });

  // 博客标签归档：同博客，仅 en/zh。
  const tagEntries: Entry[] = getAllTags().flatMap((tag) => {
    const path = `/blog/tag/${tag}`;
    return BLOG_LOCALES.map((locale) => ({
      url: href(base, locale, path),
      path,
      lastmod: SITE_LASTMOD,
      languages: langMap(base, path, BLOG_LOCALES),
    }));
  });

  // 开局应手页：各语言有真实本地化内容，全量 locales。
  const matchupEntries: Entry[] = getMatchups().flatMap((m) => {
    const path = `/xiangqi/openings/${m.openingSlug}/matchup/${m.replySlug}`;
    return routing.locales.map((locale) => ({
      url: href(base, locale, path),
      path,
      lastmod: SITE_LASTMOD,
      languages: langMap(base, path, routing.locales),
    }));
  });

  const entries: Entry[] = [
    ...staticEntries,
    ...blogEntries,
    ...openingEntries,
    ...tagEntries,
    ...matchupEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map((e) => {
    const alternates = Object.entries(e.languages)
      .map(([l, url]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${url}"/>`)
      .join('\n');
    return `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
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
