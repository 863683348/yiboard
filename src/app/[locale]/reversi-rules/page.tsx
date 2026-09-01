import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Flag, Circle, SquaresFour, WarningCircle, Question, BookOpen } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Meta = { title: string; description: string; keywords: string };
type Term = { en: string; zh: string; desc: string };
type Faq = { q: string; a: string };
type Content = {
  meta: Meta;
  h1: string;
  lead: string;
  objective: { head: string; items: string[] };
  board: { head: string; items: string[] };
  turn: { head: string; items: string[] };
  flip: { head: string; items: string[] };
  strategy: { head: string; items: string[] };
  terms: { head: string; intro: string; items: Term[] };
  cta: string;
  faqHead: string;
  faq: Faq[];
};

const EN: Content = {
  meta: {
    title: 'Reversi Rules — How to Play Othello (Reversi)',
    description:
      'Learn the official Reversi (Othello) rules: trap and flip your opponent\'s discs on the 8×8 board, grab the corners, and win with the most discs. Play free at YiBoard.',
    keywords: 'reversi rules, othello rules, how to play reversi, reversi board, reversi strategy, othello strategy',
  },
  h1: 'Reversi Rules',
  lead: 'Reversi — also sold as Othello — is a two-player strategy game on an 8×8 board. You don\'t capture by jumping; you surround the opponent\'s discs and flip them to your colour. The rules take a minute to learn; the endgame takes a lifetime.',
  objective: {
    head: 'Objective',
    items: [
      'Finish the game with more of your own discs on the board than your opponent.',
      'The game ends when neither player can move. Whoever holds the majority of discs wins — the board does not need to be full.',
    ],
  },
  board: {
    head: 'Board & Setup',
    items: [
      'The board is 8×8 squares.',
      'Play begins with four discs in the centre: two white and two black, placed diagonally so the same colours face each other.',
    ],
  },
  turn: {
    head: 'Turn Order',
    items: [
      'Black moves first, then players alternate, placing exactly one disc per turn on an empty square.',
      'A move is legal only if it flips at least one opponent disc. If you have no legal move, you must pass.',
    ],
  },
  flip: {
    head: 'Flipping',
    items: [
      'Place your disc so it traps a straight line (horizontal, vertical, or diagonal) of one or more opponent discs between your new disc and another of your own.',
      'Every opponent disc in that line flips to your colour. A single move can flip in several directions at once.',
    ],
  },
  strategy: {
    head: 'Corners & Edges',
    items: [
      'Corner squares can never be flipped, so holding a corner is a huge advantage and lets you build safely along the edge.',
      'The squares next to a corner (the "X" and "C" squares) are weak — taking them often hands your opponent the corner. Strong players grab corners and avoid those traps.',
    ],
  },
  terms: {
    head: 'Key Squares',
    intro: 'A few board positions every player should know:',
    items: [
      { en: 'Corner', zh: '角', desc: 'The four edge corners. Once taken they can never be flipped — the most valuable squares on the board.' },
      { en: 'X-square', zh: 'X 点', desc: 'The diagonal square next to a corner. Taking it usually gives your opponent the corner — a classic trap.' },
      { en: 'C-square', zh: 'C 点', desc: 'The square beside a corner along the edge. Also dangerous; it invites the opponent to take the corner.' },
    ],
  },
  cta: 'Play Reversi Free',
  faqHead: 'Frequently Asked Questions',
  faq: [
    {
      q: 'How do you play Reversi (Othello)?',
      a: 'Players take turns placing discs so they flank a straight line of the opponent\'s discs; the flanked discs flip to your colour. If you have no legal move, you must pass.',
    },
    {
      q: 'How do you win at Reversi?',
      a: 'The game ends when neither side can move. Whoever has more discs of their colour on the board wins. Corners are the strongest squares because they can never be flipped.',
    },
    {
      q: 'Why are the corners so important?',
      a: 'Once you hold a corner, that disc can never be flipped, and it lets you expand along the edge. Strong players grab corners and avoid the weak squares next to them.',
    },
    {
      q: 'Can I play Reversi online for free?',
      a: 'Yes. On YiBoard, open /reversi to play free against AI with several difficulty levels — no signup required.',
    },
  ],
};

const ZH: Content = {
  meta: {
    title: '黑白棋规则 — 黑白棋（Reversi / Othello）怎么玩',
    description:
      '学习黑白棋（Reversi / Othello）的正式规则：在 8×8 棋盘上夹住并翻转对方棋子、抢占角、终局子多者胜。来 YiBoard 免费在线对弈。',
    keywords: '黑白棋规则, 黑白棋怎么玩, reversi rules, othello rules, 黑白棋策略, 翻转棋',
  },
  h1: '黑白棋规则',
  lead: '黑白棋（英文名 Reversi，商品名 Othello）是在 8×8 棋盘上进行的双人策略棋类。它不像跳棋那样「跳吃」，而是用己方棋子夹住对方棋子、把它们翻成自己的颜色。规则一分钟就能学会，终局算路却够钻研一生。',
  objective: {
    head: '胜负目标',
    items: [
      '终局时，棋盘上自己颜色的棋子比对方多即获胜。',
      '双方都无法落子时终局，子多者胜——不要求下满棋盘。',
    ],
  },
  board: {
    head: '棋盘与开局',
    items: [
      '棋盘为 8×8 的方格。',
      '开局时中央放 4 枚棋子：两白两黑，对角放置，使同色相对。',
    ],
  },
  turn: {
    head: '落子顺序',
    items: [
      '黑棋先行，双方轮流，每回合在空方格上落一枚棋子。',
      '落子合法的前提是至少能翻转一枚对方棋子。无子可下时必须停一手（pass）。',
    ],
  },
  flip: {
    head: '翻转',
    items: [
      '你的棋子落下去后，要在横、竖、斜任意方向上，把对方的一排棋子「夹」在你新落的子与另一枚己方子之间。',
      '被夹住的那一排对方棋子全部翻成你的颜色。一手棋可以同时向多个方向翻转。',
    ],
  },
  strategy: {
    head: '角与边',
    items: [
      '角上的棋子永远不会被翻转，因此占角是巨大优势，还能沿边线安全扩展。',
      '紧挨着角的「X 点」和「C 点」是弱点——占了往往把角送给对手。高手会抢角、避开这些陷阱。',
    ],
  },
  terms: {
    head: '关键位置',
    intro: '几个每个棋手都该认识的盘上位置：',
    items: [
      { en: 'Corner', zh: '角', desc: '棋盘四角的格子。一旦占据便永远不会被翻，是盘上最宝贵的点。' },
      { en: 'X-square', zh: 'X 点', desc: '角的对角相邻格。占它通常会把角让给对手，是经典陷阱。' },
      { en: 'C-square', zh: 'C 点', desc: '沿边紧邻角的格子。同样危险，会诱使对手占角。' },
    ],
  },
  cta: '免费玩黑白棋',
  faqHead: '常见问题',
  faq: [
    {
      q: '黑白棋（Reversi / Othello）怎么玩？',
      a: '双方轮流落子，使己方棋子夹住对方一排棋子，被夹住的棋子翻成你的颜色。无子可下时必须停一手。',
    },
    {
      q: '黑白棋怎么算赢？',
      a: '双方都无法落子时终局，棋盘上自己颜色的棋子更多者获胜。角上的棋子最稳，因为永远不会被翻。',
    },
    {
      q: '为什么角这么重要？',
      a: '占据角落后，该子永远不会被对方翻转，还能沿边线不断扩展。高手会抢角、避免落在角旁的弱点。',
    },
    {
      q: '可以免费在线玩黑白棋吗？',
      a: '可以。在 YiBoard 打开 /reversi 即可免费与 AI 对弈，提供多档难度，无需注册。',
    },
  ],
};

const PATH = '/reversi-rules';

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
    alternates: localeAlternates('reversi-rules', locale),
  };
}

export const revalidate = 86400;

export default async function ReversiRulesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const c = LOC(locale) === 'zh' ? ZH : EN;
  const lang = LOC(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.meta.title,
    description: c.meta.description,
    datePublished: '2026-09-01',
    inLanguage: lang,
    author: { '@type': 'Organization', name: 'YiBoard' },
    publisher: { '@type': 'Organization', name: 'YiBoard' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://yiboardgame.com${PATH}` },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const listSections: Array<{ icon: ReactNode; data: { head: string; items: string[] } }> = [
    { icon: <Flag size={18} weight="bold" aria-hidden />, data: c.objective },
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.board },
    { icon: <Circle size={18} weight="bold" aria-hidden />, data: c.turn },
    { icon: <Circle size={18} weight="bold" aria-hidden />, data: c.flip },
    { icon: <WarningCircle size={18} weight="bold" aria-hidden />, data: c.strategy },
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

      {listSections.map((s) => (
        <section key={s.data.head} className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead icon={s.icon} title={s.data.head} />
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: 'var(--space-3)',
            }}
          >
            {s.data.items.map((item) => (
              <li
                key={item}
                style={{
                  padding: 'var(--space-4)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-2)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--fg)',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<SquaresFour size={18} weight="bold" aria-hidden />} title={c.terms.head} />
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>{c.terms.intro}</p>
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          {c.terms.items.map((term) => (
            <article key={term.en} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)' }}>
                {term.en} <span style={{ color: 'var(--fg-2)', fontWeight: 'var(--weight-body)' }}>· {term.zh}</span>
              </h3>
              <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)', marginBottom: 0 }}>
                {term.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<Question size={18} weight="bold" aria-hidden />} title={c.faqHead} />
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {c.faq.map((item) => (
            <details
              key={item.q}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                background: 'var(--surface-2)',
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 'var(--weight-emphasis)', fontSize: 'var(--text-base)', color: 'var(--fg)' }}>
                {item.q}
              </summary>
              <p style={{ marginTop: 'var(--space-3)', marginBottom: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<BookOpen size={18} weight="bold" aria-hidden />} title={lang === 'zh' ? '相关指南' : 'Related guides'} />
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)' }}>
          <RelatedLink href="/gomoku-rules" label={lang === 'zh' ? '五子棋规则' : 'Gomoku rules'} />
          <RelatedLink href="/chess-rules" label={lang === 'zh' ? '国际象棋规则' : 'Chess rules'} />
          <RelatedLink href="/reversi" label={lang === 'zh' ? '免费玩黑白棋' : 'Play Reversi'} />
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/reversi" className="yb-btn yb-btn-primary">
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
