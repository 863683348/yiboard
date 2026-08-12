import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// #12 FOT 修复：Next.js 对动态段路由（[locale]）在 Vercel 上返回
// Cache-Control: max-age=0, must-revalidate（实测 / /zh/about /zh/how-to 均如此），
// 边缘缓存从未真正生效，每次请求都回源验证 → FOT/函数调用持续高。
// 这里用 next.config headers() 直接覆盖响应头，公开内容路由缓存 1 小时
// （s-maxage=3600，stale-while-revalidate=86400 后台刷新）。
// 动态/用户相关路由（api/play/profile/rankings/share/auth）用负向前瞻排除，
// 保持各自行为（play/rankings 修复后为 ISR，profile/share 仍动态）。
const PUBLIC_CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 棋子/棋盘为 SVG，站内无位图依赖；远程图仅用于文化横幅（P1）
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self' ws: https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      // 带前缀 locale（zh/es/ja/pt-BR）：排除动态路由，其余内容边缘缓存
      {
        source: '/:locale(zh|es|ja|pt-BR)/:path((?!api|play|profile|rankings|share|auth).*)',
        headers: [{ key: 'Cache-Control', value: PUBLIC_CACHE_CONTROL }],
      },
      // 各语言首页（单段路径 /zh /es /ja /pt-BR）
      {
        source: '/:locale(zh|es|ja|pt-BR)',
        headers: [{ key: 'Cache-Control', value: PUBLIC_CACHE_CONTROL }],
      },
      // 默认 locale（en 无前缀）：同上排除动态路由 + locale 前缀段
      {
        source: '/:path((?!api|play|profile|rankings|share|auth|zh|es|ja|pt-BR).*)',
        headers: [{ key: 'Cache-Control', value: PUBLIC_CACHE_CONTROL }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
