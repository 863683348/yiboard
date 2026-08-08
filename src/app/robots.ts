import type { MetadataRoute } from 'next';

/** robots.txt：屏蔽 API 与访客会话相关路径，其余全开放。分享卡是公开页，允许收录。 */
export default function robots(): MetadataRoute.Robots {
  const base = (process.env.SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/en/api/', '/es/api/', '/ja/api/', '/pt-BR/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
