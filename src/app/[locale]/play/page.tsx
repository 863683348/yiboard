import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import PlayGate from '@/components/PlayGate';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'play' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: meta('description'),
    alternates: localeAlternates('play', locale),
  };
}

// 注意：不要在这里读取 searchParams！读取 searchParams 会把页面标记为动态渲染，
// revalidate 失效、Vercel 上每次请求真 SSR（FOT 飙升）。模式判断已下沉到
// 客户端 PlayGate（useSearchParams），服务端输出保持静态可缓存。
export const revalidate = 3600;

export default async function PlayPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'play' });

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-8)' }}>
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <h1 className="yb-h2">{t('title')}</h1>
        <nav
          aria-label={t('title')}
          style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
        >
          <Link
            href="/play"
            className="yb-btn yb-btn-outline yb-btn-sm"
          >
            {t('vsAi')}
          </Link>
          <Link
            href="/play?mode=aivsai"
            className="yb-btn yb-btn-ghost yb-btn-sm"
          >
            {t('vsAiAi')}
          </Link>
          <Link
            href="/play?mode=match"
            className="yb-btn yb-btn-ghost yb-btn-sm"
          >
            {t('vsRandom')}
          </Link>
          <Link
            href="/play?mode=friend"
            className="yb-btn yb-btn-ghost yb-btn-sm"
          >
            {t('vsFriend')}
          </Link>
        </nav>
      </header>

      <PlayGate />
    </div>
  );
}
