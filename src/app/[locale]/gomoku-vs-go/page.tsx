import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { SquaresFour, Stack, PuzzlePiece, Target, BookOpen, Question } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Meta = { title: string; description: string; keywords: string };
type Row = { k: string; gomoku: string; other: string };
type Compare = { head: string; other: string; rows: Row[]; note: string };
type FaqItem = { q: string; a: string };
type Content = {
  meta: Meta;
  h1: string;
  lead: string;
  go: Compare;
  connect4: Compare;
  connect6: Compare;
  faq: FaqItem[];
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
  faq: [
    { q: 'Is gomoku the same as Go?', a: 'No. Gomoku is five-in-a-row on a 15×15 board; Go is territory control on a 19×19 board. They have different win conditions, and gomoku has no captures.' },
    { q: 'Which is easier to learn, gomoku or Go?', a: 'Gomoku takes minutes to learn; Go takes months to play well. Gomoku is the quicker entry point.' },
    { q: 'Is gomoku good practice before learning Go?', a: 'They build different skills, but pattern recognition and reading the lines overlap, so gomoku is a gentler on-ramp to board-game thinking.' },
    { q: 'Why is gomoku played on 15×15 but Go on 19×19?', a: 'Board size follows the goal: gomoku needs tight line tactics (smaller board), while Go needs vast territory (larger board).' },
    { q: 'Can you capture stones in gomoku?', a: 'No. Stones are never removed; you win by lining up five of your stones before your opponent does.' },
    { q: 'Is omok the same as gomoku?', a: 'Yes. Omok (오목) is the Korean name for gomoku and wuziqi (五子棋) is the Chinese name — the same five-in-a-row game on a 15×15 board. So "omok vs go" is the same comparison as gomoku vs go.' },
  ],
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
  faq: [
    { q: '五子棋和围棋是一种棋吗？', a: '不是。五子棋在 15×15 棋盘上五子连珠取胜；围棋在 19×19 棋盘上以围地多者胜。两者胜负条件不同，且五子棋不吃子。' },
    { q: '五子棋和围棋哪个好学？', a: '五子棋几分钟就能上手；围棋要数月才能下好。五子棋是更轻快的入门选择。' },
    { q: '先下五子棋对学围棋有帮助吗？', a: '两者培养的能力不同，但棋形识别和连线计算有共通之处，所以五子棋是进入棋盘思维的更平缓台阶。' },
    { q: '为什么五子棋用 15×15、围棋用 19×19？', a: '棋盘大小服务于目标：五子棋需要紧凑的连线战术（较小），围棋需要广阔的围地（较大）。' },
    { q: '五子棋能吃子吗？', a: '不能。棋子从不被移除，谁先把自己的五枚棋子连成一线谁获胜。' },
    { q: 'omok（오목）和五子棋是同一种棋吗？', a: '是。omok（오목）是韩语对五子棋的称呼，中文叫五子棋，英文常称 Gomoku；三者都是 15×15 棋盘上连成五子即胜的同一种棋。所以「omok vs go」与「gomoku vs go」是同一个对比。' },
  ],
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

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<BookOpen size={18} weight="bold" aria-hidden />} title={lang === 'zh' ? '相关指南' : 'Related guides'} />
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)' }}>
          <RelatedLink href="/gomoku-rules" label={lang === 'zh' ? '五子棋规则' : 'Gomoku rules'} />
          <RelatedLink href="/renju-rules" label={lang === 'zh' ? '连珠规则（禁手）' : 'Renju rules (forbidden moves)'} />
          <RelatedLink href="/how-to" label={lang === 'zh' ? '快速玩法说明' : 'How to play gomoku'} />
          <RelatedLink href="/go" label={lang === 'zh' ? '免费在线玩围棋' : 'Play Go online free'} />
          <RelatedLink href="/go-rules" label={lang === 'zh' ? '围棋规则' : 'Go rules'} />
          <RelatedLink href="/gomoku-vs-xiangqi" label={lang === 'zh' ? '五子棋 vs 象棋' : 'Gomoku vs Xiangqi'} />
        </div>
      </section>

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<Question size={18} weight="bold" aria-hidden />} title={lang === 'zh' ? '常见问题' : 'FAQ'} />
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {c.faq.map((f) => (
            <div key={f.q} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
              <p style={{ margin: 0, fontWeight: 'var(--weight-emphasis)', color: 'var(--fg)' }}>{f.q}</p>
              <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {c.cta}
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </div>
  );
}

function RelatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-2)',
        textDecoration: 'none',
        color: 'var(--fg)',
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--weight-emphasis)',
      }}
    >
      {label}
      <span aria-hidden style={{ color: 'var(--accent)' }}>→</span>
    </Link>
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
