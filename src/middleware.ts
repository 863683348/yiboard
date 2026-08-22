import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 跳过 API、静态资源、带扩展名的文件、ads.txt（AdSense 审核需要）
  matcher: '/((?!api|_next|_vercel|.*\..*|ads\.txt).*)',
};
