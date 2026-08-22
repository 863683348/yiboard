import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import { ShareReplay } from '@/components/ShareReplay';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

/** 低于该手数的 AI 对局没有信息量，noindex 防薄内容。 */
const MIN_INDEX_MOVES = 12;

export async function generateMetadata(props: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await props.params;
  const t = await getTranslations({ locale, namespace: 'replays' });
  const card = await getStore().getShareCard(id);
  const payload = card?.payload;
  const isReplay = payload?.kind === 'replay';

  if (!payload || !isReplay) {
    return {
      title: t('title'),
      description: t('meta'),
      alternates: localeAlternates(`replays/${id}`, locale),
      robots: { index: false, follow: false },
    };
  }

  const resultTitle =
    payload.result === 'draw'
      ? t('resultDraw')
      : payload.result === 'black'
        ? t('resultBlack', { count: payload.moveCount })
        : t('resultWhite', { count: payload.moveCount });

  return {
    title: `${resultTitle} — ${t('title')}`,
    description: t('meta'),
    alternates: localeAlternates(`replays/${id}`, locale),
    robots:
      payload.moveCount >= MIN_INDEX_MOVES
        ? { index: true, follow: true }
        : { index: false, follow: true },
  };
}

export default async function ReplayPage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'replays' });
  const card = await getStore().getShareCard(id);
  const payload = card?.payload;
  const isReplay = payload?.kind === 'replay';

  if (!payload || !isReplay) {
    return (
      <div className="yb-container" style={{ paddingBlock: 'var(--space-16)', textAlign: 'center' }}>
        <div className="yb-card" style={{ padding: 'var(--space-10)', maxWidth: 460, margin: '0 auto' }}>
          <h1 className="yb-h3">{t('notFound')}</h1>
          <Link
            href="/play"
            className="yb-btn yb-btn-primary"
            style={{ marginTop: 'var(--space-5)' }}
          >
            {t('notFoundCta')}
          </Link>
        </div>
      </div>
    );
  }

  const resultText =
    payload.result === 'draw'
      ? t('resultDraw')
      : payload.result === 'black'
        ? t('resultBlack', { count: payload.moveCount })
        : t('resultWhite', { count: payload.moveCount });

  const accent =
    payload.result === 'draw' ? 'var(--meta)' : payload.result === 'black' ? 'var(--stone-black)' : 'var(--stone-white)';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${resultText} — ${t('title')}`,
    description: t('meta'),
    datePublished: card.createdAt,
    about: {
      '@type': 'Game',
      name: 'Gomoku',
      description: 'Freestyle Gomoku (no forbidden moves), AI vs AI.',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', display: 'grid', gap: 'var(--space-6)' }}>
          <header style={{ textAlign: 'center' }}>
            <span className="yb-chip yb-chip-accent">{t('title')}</span>
            <h1 className="yb-h2" style={{ marginTop: 'var(--space-3)' }}>
              {resultText}
            </h1>
            <p className="yb-meta">
              {payload.difficulty ?? ''}
              {payload.blackDifficulty ? ` · ${payload.blackDifficulty} vs ${payload.whiteDifficulty ?? ''}` : ''}
            </p>
          </header>

          <ShareReplay moves={payload.moves} result={payload.result} ariaLabel={t('title')} />

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/play" className="yb-btn yb-btn-primary">
              {t('cta')}
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
