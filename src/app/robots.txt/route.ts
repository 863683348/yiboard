import { NextResponse, type NextRequest } from 'next/server';

/**
 * robots.txt — Sitemap 基准域名取请求 Host（自愈式）。
 * 与 sitemap.xml 同一策略：不信任 SITE_URL 环境变量，杜绝输出旧域名。
 */
export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const base = new URL(request.url).origin;
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
