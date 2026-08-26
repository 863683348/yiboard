import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import { ShareReplay } from '@/components/ShareReplay';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await props.params;
  const t = await getTranslations({ locale, namespace: 'share' });
  return {
    title: t('title'),
    description: t('title'),
    alternates: localeAlternates(`share/${id}`, locale),
    // 分享卡是社交传播用途（用户主动发链接），动态且可无限生成，收录会稀释站点质量 → noindex
    robots: { index: false, follow: false },
  };
}

type Outcome = 'win' | 'loss' | 'draw';

export default async function SharePage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'share' });
  const card = await getStore().getShareCard(id);

  if (!card) {
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

  const { payload } = card;
  const outcome: Outcome =
    payload.result === 'draw'
      ? 'draw'
      : payload.playerColor !== null && payload.result === payload.playerColor
        ? 'win'
        : 'loss';

  const resultText =
    outcome === 'win'
      ? t('resultWin', { name: payload.playerName, count: payload.moveCount })
      : outcome === 'loss'
        ? t('resultLoss', { name: payload.playerName, count: payload.moveCount })
        : t('resultDraw', { name: payload.playerName, count: payload.moveCount });

  const accent = outcome === 'win' ? 'var(--success)' : outcome === 'loss' ? 'var(--accent)' : 'var(--meta)';

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', display: 'grid', gap: 'var(--space-6)' }}>
        <header style={{ textAlign: 'center' }}>
          <span className="yb-chip yb-chip-accent">{t('title')}</span>
          <h1
            className="yb-h2"
            style={{ marginTop: 'var(--space-3)', color: accent }}
          >
            {resultText}
          </h1>
          <p className="yb-meta">
            {payload.rankName}
            {payload.difficulty ? ` · ${payload.difficulty}` : ''}
          </p>
        </header>

        <ShareReplay
          moves={payload.moves}
          result={payload.result}
          ariaLabel={t('title')}
          size={payload.size}
          winCount={payload.winCount}
        />

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/play" className="yb-btn yb-btn-primary">
            {t('cta')}
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
