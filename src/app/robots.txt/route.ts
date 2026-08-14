import { NextResponse } from 'next/server';

/**
 * robots.txt — Sitemap 指向固定 canonical 域名 https://yiboardgame.com（与 sitemap.xml、layout 一致）。
 * 不再取 request Host：避免 Google 用 http/www 等非规范 host 爬取后，robots 里的 Sitemap 也跟着变成非规范地址，
 * 从而把重复 host 写进索引。Vercel 若设了 NEXT_PUBLIC_SITE_URL 优先使用，否则回退 yiboardgame.com。
 */
export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yiboardgame.com';

export function GET() {
  const base = SITE_URL;
  const body = `User-Agent: *
Allow: /
Disallow: /api/
Disallow: /en/api/
Disallow: /es/api/
Disallow: /ja/api/
Disallow: /pt-BR/api/

Sitemap: ${base}/sitemap.xml
`;
  return new NextResponse(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
