import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Checkerboard, ShareNetwork, Trophy, Eye } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { getStore } from '@/lib/store';
import type { ShareCardPayload } from '@/lib/store/types';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

const META: Record<'en' | 'zh', { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Gomoku Game Library — Shared Games & Best Plays',
    description:
      'Browse Gomoku games shared by the YiBoard community: sharp tactical wins, comebacks, and puzzling endgames. Play gomoku game free in your browser — open any board to replay the full move sequence.',
    keywords: ['gomoku game', 'gomoku games', 'shared gomoku', 'gomoku replays', 'five in a row games', 'gomoku community', 'play gomoku online'],
  },
  zh: {
    title: '五子棋棋谱库 — 玩家分享的精彩对局',
    description:
      '浏览 YiBoard 社区分享的五子棋对局：犀利的战术杀招、翻盘好戏与烧脑残局。免费在线玩五子棋——点开任意棋谱即可逐步复盘完整走法。',
    keywords: ['五子棋游戏', '五子棋棋谱', '五子棋分享', '五子棋复盘', '五子棋对局', '五子棋社区', '在线五子棋'],
  },
};

type Outcome = 'win' | 'loss' | 'draw';

type FaqItem = { q: string; a: string };

const FAQ: Record<'en' | 'zh', { head: string; items: FaqItem[] }> = {
  en: {
    head: 'Frequently Asked Questions',
    items: [
      { q: 'What is the Gomoku game library?', a: 'It is a public feed of gomoku games finished on YiBoard and shared by their players. Open any card to replay the full move sequence on a live board.' },
      { q: 'Do I need an account to replay a shared game?', a: 'No. Every shared game opens straight in the browser with no sign-up, no download, and no install.' },
      { q: 'Can I share my own gomoku game?', a: 'Yes. After a game ends, tap Share and it appears here with your name, rank and move count so others can study it.' },
    ],
  },
  zh: {
    head: '常见问题',
    items: [
      { q: '五子棋棋谱库是什么？', a: '它是 YiBoard 玩家在对局结束后公开分享的五子棋对局集合。点开任意棋谱，即可在棋盘上逐步复盘完整走法。' },
      { q: '复盘分享的棋谱需要账号吗？', a: '不需要。每个分享对局都可直接在浏览器打开，无需注册、下载或安装。' },
      { q: '我可以分享自己的五子棋对局吗？', a: '可以。对局结束后点击「分享」，它就会出现在这里，并带上你的昵称、段位与手数，供他人研习。' },
    ],
  },
};

function playerOutcome(payload: ShareCardPayload): Outcome {
  if (payload.result === 'draw') return 'draw';
  if (payload.playerColor === 'black') return payload.result === 'black' ? 'win' : 'loss';
  if (payload.playerColor === 'white') return payload.result === 'white' ? 'win' : 'loss';
  return payload.result === 'black' ? 'win' : 'loss';
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const m = META[LOC(locale)];
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: { title: m.title, description: m.description, images: [{ url: '/og.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: ['/og.png'] },
    alternates: localeAlternates('games', locale),
  };
}

export const revalidate = 300;

export default async function GamesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const l = LOC(locale);

  const cards = await getStore().listPublicShareCards(24);

  const gamesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: META[l].title,
    description: META[l].description,
    datePublished: '2026-08-12',
    dateModified: '2026-08-12',
    inLanguage: l,
    author: { '@type': 'Organization', name: 'YiBoard' },
    publisher: { '@type': 'Organization', name: 'YiBoard' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://yiboardgame.com/games' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.en.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const outcomeLabel: Record<Outcome, string> = l === 'zh'
    ? { win: '胜', loss: '负', draw: '和' }
    : { win: 'Won', loss: 'Lost', draw: 'Draw' };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gamesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header style={{ maxWidth: '58ch' }}>
        <h1 className="yb-h2">{META[l].title}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {META[l].description}
        </p>
      </header>

      {cards.length === 0 ? (
        <div className="yb-card" style={{ padding: 'var(--space-10)', marginTop: 'var(--space-8)', maxWidth: 520 }}>
          <p style={{ color: 'var(--fg-2)', margin: 0 }}>
            {l === 'zh'
              ? '还没有人分享棋谱。下一局结束后点「分享」，就会出现在这里。'
              : 'No shared games yet. Share your next finished game and it will show up here.'}
          </p>
          <Link
            href="/play"
            className="yb-btn yb-btn-primary"
            style={{ marginTop: 'var(--space-5)' }}
          >
            {l === 'zh' ? '去下一局' : 'Play a game'}
          </Link>
        </div>
      ) : (
        <div
          className="yb-grid"
          style={{
            marginTop: 'var(--space-8)',
            gap: 'var(--space-4)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          }}
        >
          {cards.map((card) => {
            const outcome = playerOutcome(card.payload);
            return (
              <Link
                key={card.id}
                href={`/share/${card.id}`}
                className="yb-card"
                style={{
                  padding: 'var(--card-pad)',
                  textDecoration: 'none',
                  color: 'var(--fg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span
                    aria-hidden
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Checkerboard size={18} weight="bold" />
                  </span>
                  <span style={{ fontWeight: 'var(--weight-emphasis)', fontSize: 'var(--text-base)' }}>
                    {card.payload.playerName}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <span
                    className="yb-chip"
                    style={{
                      borderColor:
                        outcome === 'win'
                          ? 'var(--accent)'
                          : outcome === 'draw'
                            ? 'var(--border-strong)'
                            : 'var(--danger, #d9534f)',
                      color:
                        outcome === 'win'
                          ? 'var(--accent)'
                          : outcome === 'draw'
                            ? 'var(--fg-2)'
                            : 'var(--danger, #d9534f)',
                    }}
                  >
                    {outcomeLabel[outcome]}
                  </span>
                  {card.payload.rankName ? (
                    <span className="yb-chip">{card.payload.rankName}</span>
                  ) : null}
                </div>

                <div
                  className="yb-meta"
                  style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--fg-2)' }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Trophy size={14} aria-hidden />
                    {card.payload.moveCount} {l === 'zh' ? '手' : 'moves'}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Eye size={14} aria-hidden />
                    {card.views}
                  </span>
                </div>

                <span
                  className="yb-meta"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--accent)' }}
                >
                  <ShareNetwork size={14} aria-hidden />
                  {l === 'zh' ? '查看棋谱' : 'View game'}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <section className="yb-section" style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <h2 className="yb-h3" style={{ marginBottom: 'var(--space-4)' }}>{FAQ[l].head}</h2>
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {FAQ[l].items.map((f) => (
            <details
              key={f.q}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                background: 'var(--surface-2)',
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 'var(--weight-emphasis)', fontSize: 'var(--text-base)', color: 'var(--fg)' }}>
                {f.q}
              </summary>
              <p style={{ marginTop: 'var(--space-3)', marginBottom: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {l === 'zh' ? '开一局并分享' : 'Play & share a game'}
        </Link>
      </section>
    </div>
  );
}
