import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { RankBadge } from '@/components/RankBadge';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { progressToNext } from '@/lib/rank';
import { readUser } from '@/lib/session';
import { getStore } from '@/lib/store';
import type { GameRecord } from '@/lib/store/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'profile' });
  return { title: t('title'), alternates: localeAlternates('profile', locale), robots: { index: false, follow: false } };
}

/** 把一局战绩换算成"我"的视角：胜 / 负 / 和 */
function outcomeFor(game: GameRecord, userId: string): 'win' | 'loss' | 'draw' {
  if (game.result === 'draw') return 'draw';
  const iAmBlack = game.blackId === userId;
  const iAmWhite = game.whiteId === userId;
  const iWon =
    (game.result === 'black' && iAmBlack) || (game.result === 'white' && iAmWhite);
  // 既不是黑也不是白（理论只发生在双方都 null 的异常局），判和兜底
  if (!iAmBlack && !iAmWhite) return 'draw';
  return iWon ? 'win' : 'loss';
}

export default async function ProfilePage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ google?: string }>;
}) {
  const { locale } = await props.params;
  const { google } = await props.searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'profile' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const me = await readUser();

  // 无访客身份（还没下过棋，RSC 不能种 cookie）——引导去开一局
  if (!me) {
    return (
      <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
        <header style={{ maxWidth: '54ch' }}>
          <h1 className="yb-h2">{t('title')}</h1>
          <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
            {t('guestNote')}
          </p>
        </header>
        <div className="yb-card" style={{ padding: 'var(--space-10)', marginTop: 'var(--space-8)', maxWidth: 520 }}>
          <Link href="/play" className="yb-btn yb-btn-primary">
            {nav('play')}
          </Link>
        </div>
      </div>
    );
  }

  const progress = progressToNext(me.elo);
  const games = await getStore().listGamesForUser(me.id, 20);
  const winRate =
    me.gamesPlayed > 0 ? Math.round((me.gamesWon / me.gamesPlayed) * 100) : 0;

  // 近 20 局的胜负平 —— users 表只累计 played/won，负和和局要从对局记录里数
  const recent = games.map((game) => outcomeFor(game, me.id));
  const recentDraws = recent.filter((o) => o === 'draw').length;
  // 总负场 = 总局数 - 总胜场 - 和局。和局只能从近期样本估，够用且不会算出负数
  const totalLosses = Math.max(0, me.gamesPlayed - me.gamesWon - recentDraws);

  // 当前连势：从最近一局往回数，直到结果变号（和局中断连势）
  const streakOutcome = recent[0] ?? null;
  let streakCount = 0;
  if (streakOutcome === 'win' || streakOutcome === 'loss') {
    for (const outcome of recent) {
      if (outcome !== streakOutcome) break;
      streakCount += 1;
    }
  }

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{t('title')}</h1>
      </header>

      {/* ---------------- 当前段位 + 进度 ---------------- */}
      <div className="yb-grid yb-grid-2" style={{ marginTop: 'var(--space-8)', maxWidth: 880 }}>
        <div className="yb-card" style={{ padding: 'var(--card-pad)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <RankBadge elo={me.elo} size="md" />
            <div>
              <div className="yb-meta">{t('rating')}</div>
              <div className="yb-num" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-emphasis)', color: 'var(--fg)' }}>
                {me.elo}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-5)' }}>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((progress?.ratio ?? 1) * 100)}
              style={{
                height: 6,
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-3)',
                overflow: 'hidden',
              }}
            >
              <span
                aria-hidden
                style={{
                  display: 'block',
                  height: '100%',
                  width: `${Math.round((progress?.ratio ?? 1) * 100)}%`,
                  background: 'var(--accent)',
                }}
              />
            </div>
            <p className="yb-meta" style={{ marginTop: 'var(--space-2)' }}>
              {progress
                ? t('toNext', { points: progress.remaining, rank: progress.next.name })
                : t('atCeiling')}
            </p>
          </div>
        </div>

        <div className="yb-card" style={{ padding: 'var(--card-pad)' }}>
          <div className="yb-grid yb-grid-2" style={{ gap: 'var(--space-5)' }}>
            <Stat label={t('played')} value={<span className="yb-num">{me.gamesPlayed}</span>} />
            <Stat label={t('won')} value={<span className="yb-num">{me.gamesWon}</span>} />
            <Stat label={t('lost')} value={<span className="yb-num">{totalLosses}</span>} />
            <Stat label={t('winRateLabel')} value={<span className="yb-num">{winRate}%</span>} />
          </div>

          <div
            style={{
              marginTop: 'var(--space-5)',
              paddingTop: 'var(--space-5)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            <Stat
              label={t('streak')}
              value={
                <span style={{ fontSize: 'var(--text-lg)' }}>
                  {streakCount === 0
                    ? t('streakNone')
                    : streakOutcome === 'win'
                      ? t('streakWin', { count: streakCount })
                      : t('streakLoss', { count: streakCount })}
                </span>
              }
            />
            {recent.length > 0 ? (
              <div style={{ textAlign: 'right' }}>
                <div className="yb-meta">{t('recentForm', { count: recent.length })}</div>
                <FormBar outcomes={recent} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ---------------- 账号状态（访客 → Google 登录 / 已登录 → 显示邮箱） ---------------- */}
      {me.isGuest ? (
        <div
          style={{
            marginTop: 'var(--space-5)',
            maxWidth: '56ch',
            padding: 'var(--space-4)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-2)',
          }}
        >
          <p className="yb-meta" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="yb-chip">{t('guestBadge')}</span>
            {t('guestNote')}
          </p>
          <p className="yb-meta" style={{ marginTop: 'var(--space-3)' }}>
            {t('googleSignInNote')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            <Link href="/auth" className="yb-btn yb-btn-primary" style={{ textDecoration: 'none' }}>
              {t('authLink')}
            </Link>
            {/* OAuth 发起必须是原生 <a>（302 跳 Google），不能用 Link */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/auth/google" className="yb-btn yb-btn-outline" style={{ textDecoration: 'none' }}>
              {t('googleSignIn')}
            </a>
          </div>
          {google === 'error' ? (
            <p role="alert" style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>
              {t('googleError')}
            </p>
          ) : null}
        </div>
      ) : (
        <div
          style={{
            marginTop: 'var(--space-5)',
            maxWidth: '56ch',
            padding: 'var(--space-4)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-2)',
          }}
        >
          <p className="yb-meta" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="yb-chip yb-chip-accent">{t('memberBadge')}</span>
            {me.email ? t('signedInAs', { email: me.email }) : me.displayName}
          </p>
          <form action="/api/auth/logout" method="post" style={{ marginTop: 'var(--space-3)' }}>
            <button type="submit" className="yb-btn yb-btn-ghost yb-btn-sm">
              {t('signOut')}
            </button>
          </form>
          {google === 'ok' ? (
            <p role="status" style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--success)' }}>
              {t('googleOk')}
            </p>
          ) : null}
        </div>
      )}

      {/* ---------------- 历史对局 ---------------- */}
      <section className="yb-section" style={{ maxWidth: 880 }}>
        <h2 className="yb-h3">{t('history')}</h2>
        {games.length === 0 ? (
          <p className="yb-meta" style={{ marginTop: 'var(--space-3)' }}>
            {t('historyEmpty')}
          </p>
        ) : (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 'var(--space-5) 0 0',
              display: 'grid',
              gap: 'var(--space-2)',
            }}
          >
            {games.map((game) => {
              const outcome = outcomeFor(game, me.id);
              const label =
                outcome === 'win'
                  ? t('resultWin')
                  : outcome === 'loss'
                    ? t('resultLoss')
                    : t('resultDraw');
              const opponent =
                game.mode === 'ai'
                  ? t('vsEngine', { difficulty: game.difficulty ?? '—' })
                  : t('vsPlayer');
              const date = new Date(game.createdAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              return (
                <li
                  key={game.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-2)',
                  }}
                >
                  <OutcomeTag outcome={outcome} label={label} />
                  <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--fg)' }}>
                    {opponent}
                  </span>
                  {/* 积分变化：只有人人对局结算 ELO，人机局 eloDelta 恒为 0，不显示免得误导 */}
                  {game.eloDelta !== 0 ? (
                    <span
                      className="yb-num"
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--weight-emphasis)',
                        color: outcome === 'win' ? 'var(--success)' : 'var(--accent)',
                      }}
                    >
                      {outcome === 'win' ? '+' : '−'}
                      {Math.abs(game.eloDelta)}
                    </span>
                  ) : null}
                  <span className="yb-num yb-meta" style={{ fontSize: 'var(--text-xs)' }}>
                    {game.moveCount} · {date}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section style={{ maxWidth: 880, marginTop: 'var(--space-8)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {nav('play')}
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="yb-meta">{label}</div>
      <div style={{ marginTop: 4, fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-emphasis)', color: 'var(--fg)' }}>
        {value}
      </div>
    </div>
  );
}

/** 近期战绩条：最近的在最右边，一眼看出手感是热还是冷 */
function FormBar({ outcomes }: { outcomes: Array<'win' | 'loss' | 'draw'> }) {
  const color = (o: 'win' | 'loss' | 'draw') =>
    o === 'win' ? 'var(--success)' : o === 'loss' ? 'var(--accent)' : 'var(--border-strong, var(--border))';
  return (
    <div aria-hidden style={{ display: 'flex', gap: 3, marginTop: 6, justifyContent: 'flex-end' }}>
      {[...outcomes].reverse().map((outcome, index) => (
        <span
          key={index}
          style={{
            width: 8,
            height: 16,
            borderRadius: 2,
            background: color(outcome),
            opacity: outcome === 'draw' ? 0.7 : 1,
          }}
        />
      ))}
    </div>
  );
}

function OutcomeTag({ outcome, label }: { outcome: 'win' | 'loss' | 'draw'; label: string }) {
  const color =
    outcome === 'win' ? 'var(--success)' : outcome === 'loss' ? 'var(--accent)' : 'var(--meta)';
  return (
    <span
      style={{
        flexShrink: 0,
        minWidth: 52,
        textAlign: 'center',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-emphasis)',
        color,
        border: `1px solid ${color}`,
        borderRadius: 'var(--radius-pill)',
        padding: '2px 8px',
      }}
    >
      {label}
    </span>
  );
}
