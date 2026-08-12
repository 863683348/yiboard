import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { SquaresFour, Stack, PuzzlePiece, Target } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Meta = { title: string; description: string; keywords: string };
type Row = { k: string; gomoku: string; other: string };
type Compare = { head: string; other: string; rows: Row[]; note: string };
type Content = {
  meta: Meta;
  h1: string;
  lead: string;
  go: Compare;
  connect4: Compare;
  connect6: Compare;
  conclusion: string;
  cta: string;
};

const EN: Content = {
  meta: {
    title: 'Gomoku vs Go vs Connect 4 — What’s the Difference?',
    description:
      'Compare gomoku with Go, Connect 4, and Connect 6. Boards, piece captures, win conditions, learning curve, and game length — find the right game for you.',
    keywords: 'gomoku vs go, gomoku vs connect 4, connect 6, gomoku vs connect four, five in a row vs go',
  },
  h1: 'Gomoku vs Go vs Connect 4',
  lead: 'People often mix up gomoku with Go or Connect 4 because the boards look similar. Here is a side-by-side look at how gomoku compares with three related games — and where each one shines.',
  go: {
    head: 'Gomoku vs Go',
    other: 'Go (Weiqi)',
    rows: [
      { k: 'Board', gomoku: '15×15 intersections', other: '19×19 intersections' },
      { k: 'Captures', gomoku: 'No captures — stones stay', other: 'Stones are captured and removed' },
      { k: 'Win condition', gomoku: 'Five in a row', other: 'Surround more territory' },
      { k: 'Learning curve', gomoku: 'Minutes to learn', other: 'Months to play well' },
      { k: 'Game length', gomoku: '5–20 minutes', other: '30–120+ minutes' },
    ],
    note: 'Go is a deeper, longer game of territory; gomoku is a tighter puzzle of lines.',
  },
  connect4: {
    head: 'Gomoku vs Connect 4',
    other: 'Connect 4',
    rows: [
      { k: 'Board', gomoku: '15×15 grid on paper or screen', other: '7×6 vertical plastic frame' },
      { k: 'First move', gomoku: 'Black chooses any point', other: 'Red must drop from the top' },
      { k: 'Gravity', gomoku: 'No gravity — free placement', other: 'Pieces fall to the bottom' },
      { k: 'Goal', gomoku: 'Exactly five in a row', other: 'Exactly four in a row' },
    ],
    note: 'Connect 4 borrows gomoku’s “connect the line” idea but adds gravity and a tiny board, making it a quick kids’ game.',
  },
  connect6: {
    head: 'Gomoku vs Connect 6',
    other: 'Connect 6 (六子棋)',
    rows: [
      { k: 'Goal', gomoku: 'Five in a row', other: 'Six in a row' },
      { k: 'Forbidden moves', gomoku: 'Renju restricts Black', other: 'No forbidden moves' },
      { k: 'First-move edge', gomoku: 'Moderate, balanced by Renju', other: 'Strong — first player drops two stones' },
    ],
    note: 'Connect 6 gives the first player a bigger edge by letting them place two stones per turn, which is why it skips forbidden moves.',
  },
  conclusion:
    'If you want a game you can learn in a minute yet keep studying for years, gomoku is the sweet spot: simpler than Go, deeper than Connect 4, and faster than both.',
  cta: 'Play Gomoku Free',
};

const ZH: Content = {
  meta: {
    title: '五子棋 vs 围棋 vs 四子棋 — 区别在哪？',
    description:
      '对比五子棋与围棋、四子棋（Connect 4）、六子棋。棋盘、吃子、胜负条件、学习曲线与单局时长——帮你选对游戏。',
    keywords: '五子棋 vs 围棋, 五子棋 vs 四子棋, 六子棋, 五子棋与围棋, 五子连珠对比',
  },
  h1: '五子棋 vs 围棋 vs 四子棋',
  lead: '因为棋盘长得像，很多人会把五子棋和围棋或四子棋搞混。下面把五子棋与三种相近游戏逐一对比，看看各自适合什么场景。',
  go: {
    head: '五子棋 vs 围棋',
    other: '围棋',
    rows: [
      { k: '棋盘', gomoku: '15×15 路', other: '19×19 路' },
      { k: '吃子', gomoku: '不吃子，棋子不动', other: '可提子并移除' },
      { k: '胜负', gomoku: '五子连珠', other: '围地多者胜' },
      { k: '学习曲线', gomoku: '几分钟上手', other: '数月才能下好' },
      { k: '单局时长', gomoku: '5–20 分钟', other: '30–120 分钟以上' },
    ],
    note: '围棋是更宏大、更漫长的围地游戏；五子棋则是更紧凑的连线博弈。',
  },
  connect4: {
    head: '五子棋 vs 四子棋',
    other: '四子棋（Connect 4）',
    rows: [
      { k: '棋盘', gomoku: '纸上或屏上 15×15 网格', other: '7×6 竖直塑料框' },
      { k: '先手', gomoku: '黑棋任选落点', other: '红方只能从顶部落下' },
      { k: '重力', gomoku: '无重力，自由落子', other: '棋子落到最底部' },
      { k: '目标', gomoku: '刚好五子连珠', other: '刚好四子连珠' },
    ],
    note: '四子棋借用了五子棋「连成一线」的思路，但加入重力与小棋盘，成为一款轻松的休闲游戏。',
  },
  connect6: {
    head: '五子棋 vs 六子棋',
    other: '六子棋（Connect 6）',
    rows: [
      { k: '目标', gomoku: '五子连珠', other: '六子连珠' },
      { k: '禁手', gomoku: '连珠限制黑棋', other: '无禁手' },
      { k: '先手优势', gomoku: '中等，由连珠平衡', other: '明显——先手每回合落两子' },
    ],
    note: '六子棋让先手方每回合落两子，优势更大，因此不设禁手来平衡。',
  },
  conclusion:
    '如果你想找一款「一分钟学会、却能钻研多年」的游戏，五子棋正合适：比围棋简单，比四子棋深，速度也比两者都快。',
  cta: '免费玩五子棋',
};

const PATH = '/gomoku-vs-go';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const m = LOC(locale) === 'zh' ? ZH : EN;
  return {
    title: m.meta.title,
    description: m.meta.description,
    keywords: m.meta.keywords,
    openGraph: {
      title: m.meta.title,
      description: m.meta.description,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: m.meta.title, description: m.meta.description, images: ['/og.png'] },
    alternates: localeAlternates('gomoku-vs-go', locale),
  };
}

export const revalidate = 86400;

export default async function GomokuVsGoPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const c = LOC(locale) === 'zh' ? ZH : EN;
  const lang = LOC(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.meta.title,
    description: c.meta.description,
    datePublished: '2026-08-12',
    inLanguage: lang,
    author: { '@type': 'Organization', name: 'YiBoard' },
    publisher: { '@type': 'Organization', name: 'YiBoard' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://yiboardgame.com${PATH}` },
  };

  const compares: Array<{ icon: ReactNode; data: Compare }> = [
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.go },
    { icon: <Stack size={18} weight="bold" aria-hidden />, data: c.connect4 },
    { icon: <PuzzlePiece size={18} weight="bold" aria-hidden />, data: c.connect6 },
  ];

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
        <Link href="/">{lang === 'zh' ? '首页' : 'Home'}</Link>
        <span aria-hidden style={{ marginInline: 'var(--space-2)' }}>→</span>
        <span>{c.h1}</span>
      </nav>

      <header style={{ maxWidth: '58ch' }}>
        <h1 className="yb-h2">{c.h1}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {c.lead}
        </p>
      </header>

      {compares.map((s) => (
        <section key={s.data.head} className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead icon={s.icon} title={s.data.head} />
          <article className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)', marginBottom: 'var(--space-4)' }}>
              {lang === 'zh' ? `对比对象：${s.data.other}` : `Versus ${s.data.other}`}
            </p>
            <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
              {s.data.rows.map((row) => (
                <div
                  key={row.k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-2)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--fg)',
                  }}
                >
                  <span style={{ color: 'var(--fg-2)', fontWeight: 'var(--weight-emphasis)' }}>{row.k}</span>
                  <span>
                    <strong style={{ color: 'var(--accent)' }}>{lang === 'zh' ? '五子棋' : 'Gomoku'}:</strong> {row.gomoku}
                    <br />
                    <strong>{s.data.other}:</strong> {row.other}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 'var(--space-4)', marginBottom: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
              {s.data.note}
            </p>
          </article>
        </section>
      ))}

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<Target size={18} weight="bold" aria-hidden />} title={lang === 'zh' ? '结论' : 'Bottom Line'} />
        <div className="yb-card" style={{ padding: 'var(--card-pad)' }}>
          <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--fg)' }}>{c.conclusion}</p>
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {c.cta}
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

function SectionHead({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          color: 'var(--accent)',
        }}
      >
        {icon}
      </span>
      <h2 className="yb-h3" style={{ margin: 0 }}>
        {title}
      </h2>
    </div>
  );
}
