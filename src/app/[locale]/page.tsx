import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  Cpu,
  LockKeyOpen,
  ShieldCheck,
  Translate,
} from '@phosphor-icons/react/dist/ssr';

import { GomokuGame } from '@/components/GomokuGame';
import { GlobalStats } from '@/components/GlobalStats';
import { RankBadge } from '@/components/RankBadge';
import { Link } from '@/i18n/navigation';
import { RANKS, STARTING_ELO } from '@/lib/rank';

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });
  const meta = await getTranslations({ locale, namespace: 'meta' });

  const grades = RANKS.filter((rank) => rank.tier !== 'dan');
  const dans = RANKS.filter((rank) => rank.tier === 'dan');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'YiBoard',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any modern browser',
    description: meta('description'),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: ['en', 'es', 'ja', 'pt-BR'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------------- Hero：棋盘直接摆在首屏，不放插画 ---------------- */}
      <section className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
        <div className="yb-hero-layout">
          <div>
            <span className="yb-chip yb-chip-accent">{t('eyebrow')}</span>

            <h1 className="yb-display" style={{ marginTop: 'var(--space-4)' }}>
              {t('headline')}
              <br />
              <span style={{ color: 'var(--accent)' }}>{t('headlineAccent')}</span>
            </h1>

            <p className="yb-lead" style={{ marginTop: 'var(--space-5)', maxWidth: '52ch' }}>
              {t('sub')}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-6)',
              }}
            >
              <Link href="/play" className="yb-btn yb-btn-primary">
                {t('ctaPrimary')}
                <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
              <Link href="/play?mode=friend" className="yb-btn yb-btn-outline">
                {t('ctaSecondary')}
              </Link>
            </div>

            <p className="yb-meta" style={{ marginTop: 'var(--space-4)', maxWidth: '46ch' }}>
              {t('reassurance')}
            </p>
          </div>

          <div style={{ display: 'grid', gap: 'var(--space-3)', justifyItems: 'center' }}>
            <GomokuGame variant="hero" initialDifficulty="gentle" />
            <p
              className="yb-meta"
              style={{ textAlign: 'center', maxWidth: '44ch', marginTop: 'var(--space-1)' }}
            >
              {t('boardCaption')}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 全球玩家统计（实时聚合，30s 缓存） ---------------- */}
      <section className="yb-container">
        <GlobalStats />
      </section>

      <hr className="yb-rule" />

      {/* ---------------- 三种棋 ---------------- */}
      <section className="yb-container yb-section">
        <header style={{ maxWidth: '58ch' }}>
          <h2 className="yb-h2">{t('games.title')}</h2>
          <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
            {t('games.sub')}
          </p>
        </header>

        <div className="yb-grid yb-grid-3" style={{ marginTop: 'var(--space-8)' }}>
          <GameCard
            name={t('games.gomoku.name')}
            native={t('games.gomoku.native')}
            blurb={t('games.gomoku.blurb')}
            status={t('games.statusLive')}
            live
            action={t('ctaPrimary')}
          />
          <GameCard
            name={t('games.xiangqi.name')}
            native={t('games.xiangqi.native')}
            blurb={t('games.xiangqi.blurb')}
            status={t('games.statusNext')}
          />
          <GameCard
            name={t('games.go.name')}
            native={t('games.go.native')}
            blurb={t('games.go.blurb')}
            status={t('games.statusPlanned')}
          />
        </div>
      </section>

      <hr className="yb-rule" />

      {/* ---------------- 十八级阶梯 ---------------- */}
      <section className="yb-container yb-section">
        <header style={{ maxWidth: '58ch' }}>
          <h2 className="yb-h2">{t('ladder.title')}</h2>
          <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
            {t('ladder.sub')}
          </p>
        </header>

        <div className="yb-grid yb-grid-2" style={{ marginTop: 'var(--space-8)' }}>
          <LadderColumn
            label={t('ladder.gradeLabel')}
            note={t('ladder.gradeNote')}
            ranks={grades}
            highlight={STARTING_ELO}
          />
          <LadderColumn label={t('ladder.danLabel')} note={t('ladder.danNote')} ranks={dans} />
        </div>

        <p className="yb-meta" style={{ marginTop: 'var(--space-5)' }}>
          {t('ladder.startNote')}
        </p>
      </section>

      <hr className="yb-rule" />

      {/* ---------------- 我们到底造了什么 ---------------- */}
      <section className="yb-container yb-section">
        <h2 className="yb-h2" style={{ maxWidth: '48ch' }}>
          {t('why.title')}
        </h2>

        <div className="yb-grid yb-grid-2" style={{ marginTop: 'var(--space-8)' }}>
          <WhyItem
            icon={<ShieldCheck size={20} weight="regular" aria-hidden />}
            title={t('why.refereed.title')}
            body={t('why.refereed.body')}
          />
          <WhyItem
            icon={<Cpu size={20} weight="regular" aria-hidden />}
            title={t('why.engine.title')}
            body={t('why.engine.body')}
          />
          <WhyItem
            icon={<Translate size={20} weight="regular" aria-hidden />}
            title={t('why.language.title')}
            body={t('why.language.body')}
          />
          <WhyItem
            icon={<LockKeyOpen size={20} weight="regular" aria-hidden />}
            title={t('why.noWall.title')}
            body={t('why.noWall.body')}
          />
        </div>
      </section>

      {/* ---------------- 收尾 CTA ---------------- */}
      <section className="yb-container" style={{ paddingBlock: 'var(--space-16)' }}>
        <div
          className="yb-card"
          style={{
            padding: 'var(--space-10)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-6)',
          }}
        >
          <div style={{ maxWidth: '46ch' }}>
            <h2 className="yb-h3">{t('finalCta.title')}</h2>
            <p className="yb-meta" style={{ marginTop: 'var(--space-2)' }}>
              {t('finalCta.sub')}
            </p>
          </div>
          <Link href="/play" className="yb-btn yb-btn-primary">
            {t('finalCta.action')}
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}

function GameCard({
  name,
  native,
  blurb,
  status,
  live = false,
  action,
}: {
  name: string;
  native: string;
  blurb: string;
  status: string;
  live?: boolean;
  action?: string;
}) {
  return (
    <article
      className="yb-card"
      style={{
        padding: 'var(--card-pad)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        opacity: live ? 1 : 0.82,
      }}
    >
      <span className={live ? 'yb-chip yb-chip-accent' : 'yb-chip'}>{status}</span>
      <div>
        <h3 className="yb-h3">{name}</h3>
        <p className="yb-meta" style={{ marginTop: 2 }}>
          {native}
        </p>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-2)', flexGrow: 1 }}>{blurb}</p>
      {live && action ? (
        <Link
          href="/play"
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-emphasis)',
            color: 'var(--accent)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {action}
          <ArrowRight size={14} weight="bold" aria-hidden />
        </Link>
      ) : null}
    </article>
  );
}

function LadderColumn({
  label,
  note,
  ranks,
  highlight,
}: {
  label: string;
  note: string;
  ranks: typeof RANKS;
  highlight?: number;
}) {
  return (
    <div className="yb-card" style={{ padding: 'var(--card-pad)' }}>
      <h3 className="yb-eyebrow">{label}</h3>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          listStyle: 'none',
          padding: 0,
          marginTop: 'var(--space-4)',
        }}
      >
        {ranks.map((rank) => {
          const isStart =
            highlight !== undefined && highlight >= rank.floor && highlight <= rank.ceiling;
          return (
            <li
              key={rank.index}
              style={{
                padding: '4px 8px 4px 4px',
                borderRadius: 'var(--radius-pill)',
                border: `1px solid ${isStart ? 'var(--accent)' : 'transparent'}`,
                background: isStart ? 'var(--accent-soft)' : 'transparent',
              }}
            >
              <RankBadge rank={rank} size="sm" />
            </li>
          );
        })}
      </ul>
      <p className="yb-meta" style={{ marginTop: 'var(--space-4)' }}>
        {note}
      </p>
    </div>
  );
}

function WhyItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          color: 'var(--accent)',
        }}
      >
        {icon}
      </span>
      <div>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)' }}>
          {title}
        </h3>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--fg-2)',
            marginTop: 6,
            maxWidth: '52ch',
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
