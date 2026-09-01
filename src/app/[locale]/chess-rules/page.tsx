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
  pieces: { head: string; items: string[] };
  turn: { head: string; items: string[] };
  special: { head: string; items: string[] };
  end: { head: string; items: string[] };
  terms: { head: string; intro: string; items: Term[] };
  cta: string;
  faqHead: string;
  faq: Faq[];
};

const EN: Content = {
  meta: {
    title: 'Chess Rules — How to Play Chess',
    description:
      'Learn the official chess rules: how each piece moves, castling, en passant, promotion, and how to deliver checkmate. Play free vs AI at YiBoard.',
    keywords: 'chess rules, how to play chess, chess piece moves, castling, en passant, checkmate',
  },
  h1: 'Chess Rules',
  lead: 'Chess is a two-player strategy game on an 8×8 board with 16 pieces per side. The rules are centuries old but still the global standard for competitive mind sport. Here is everything you need to set up a legal game and finish with checkmate.',
  objective: {
    head: 'Objective',
    items: [
      'Checkmate the enemy king — put it in check (under attack) with no legal way to escape, capture the attacker, or block the line.',
      'If the king is in check but can escape, the game continues. If you have no legal move and your king is NOT in check, that is stalemate and a draw.',
    ],
  },
  board: {
    head: 'Board & Setup',
    items: [
      'The board is 8×8 with alternating light and dark squares; a white square always sits on the right-hand corner from each player\'s view.',
      'Each side starts with 16 pieces in the same fixed order: one king, one queen, two rooks, two bishops, two knights, and eight pawns.',
    ],
  },
  pieces: {
    head: 'How the Pieces Move',
    items: [
      'Pawn: moves forward one square (two on its first move) and captures diagonally.',
      'Knight: jumps in an L shape (two then one) — the only piece that can leap over others.',
      'Bishop: slides any distance along diagonals.',
      'Rook: slides any distance along ranks and files.',
      'Queen: slides any distance in any direction — the most powerful piece.',
      'King: moves one square in any direction; it may never move into check.',
    ],
  },
  turn: {
    head: 'Turn Order',
    items: [
      'White always moves first, then players alternate, moving exactly one piece per turn.',
      'You may not skip a turn, and if your king is in check you must address it immediately.',
    ],
  },
  special: {
    head: 'Special Moves',
    items: [
      'Castling: move the king two squares toward a rook and hop the rook to the square beside it — the only move that moves two pieces, used to tuck the king into safety (conditions apply).',
      'En passant: if an enemy pawn rushes two squares forward and lands beside your pawn, you may capture it as if it had moved only one square.',
      'Promotion: when a pawn reaches the far rank it must become a queen, rook, bishop, or knight — almost always a queen.',
    ],
  },
  end: {
    head: 'End of the Game',
    items: [
      'Checkmate ends the game in a win for the side that delivered it.',
      'Draws occur by stalemate, threefold repetition, the fifty-move rule, or insufficient material (for example king versus king).',
    ],
  },
  terms: {
    head: 'The Six Pieces',
    intro: 'The piece types you will meet on the board:',
    items: [
      { en: 'King', zh: '王', desc: 'The piece you must protect; losing it by checkmate loses the game.' },
      { en: 'Queen', zh: '后', desc: 'Moves in every direction — the strongest piece on the board.' },
      { en: 'Rook', zh: '车', desc: 'Slides along ranks and files; powerful in the endgame.' },
      { en: 'Bishop', zh: '象', desc: 'Slides diagonally; each bishop stays on one colour of squares.' },
      { en: 'Knight', zh: '马', desc: 'Jumps in an L; the only piece that leaps over others.' },
      { en: 'Pawn', zh: '兵', desc: 'Marches forward, captures diagonally, and can promote at the far rank.' },
    ],
  },
  cta: 'Play Chess Free',
  faqHead: 'Frequently Asked Questions',
  faq: [
    {
      q: 'How do you play Chess?',
      a: 'Each side has 16 pieces and takes turns moving on the 8×8 board. The goal is checkmate — trapping the opponent\'s king so it is attacked and cannot escape. White moves first.',
    },
    {
      q: 'What is castling?',
      a: 'Under the right conditions the king and a rook move together: the king slides two squares toward the rook and the rook jumps to the square beside the king. It is the only move that moves two pieces at once, and it tucks the king into safety.',
    },
    {
      q: 'What is en passant?',
      a: 'When an enemy pawn rushes two squares forward and lands beside your pawn, you may capture it as if it had moved only one square. It is the only rule where you capture a piece on a square it did not land on.',
    },
    {
      q: 'How does promotion work?',
      a: 'When a pawn reaches the far rank it must be promoted to a queen, rook, bishop, or knight — almost always a queen. YiBoard auto-promotes to queen.',
    },
    {
      q: 'Can I play Chess online for free?',
      a: 'Yes. On YiBoard, open /chess to play free against AI with several difficulty levels — no signup required.',
    },
  ],
};

const ZH: Content = {
  meta: {
    title: '国际象棋规则 — 国际象棋怎么玩',
    description:
      '学习国际象棋（Chess）的正式规则：各棋子走法、王车易位、吃过路兵、升变，以及如何将死对方。来 YiBoard 免费在线对战 AI。',
    keywords: '国际象棋规则, 国际象棋怎么玩, 棋子走法, 王车易位, 吃过路兵, 将死',
  },
  h1: '国际象棋规则',
  lead: '国际象棋（Chess）是在 8×8 棋盘上、每方 16 枚棋子的双人策略棋类。规则传承数百年，至今仍是全球竞技棋类的最高标准。下面把开局所需的全部规则讲清楚，帮你走上将死对方之路。',
  objective: {
    head: '胜负目标',
    items: [
      '将死对方的王——让它处于被将军状态，且无法逃脱、吃不掉攻击者、也挡不住攻击线。',
      '若王被将军但能化解，对局继续。若你无子可走且王并未被将军，则是逼和（stalemate），判为和棋。',
    ],
  },
  board: {
    head: '棋盘与摆子',
    items: [
      '棋盘为 8×8 深浅相间的方格，从双方视角看，右下角永远是浅色格。',
      '每方 16 枚棋子按固定顺序摆放：一王、一后、两车、两象、两马、八兵。',
    ],
  },
  pieces: {
    head: '棋子走法',
    items: [
      '兵：向前走一格（首步可走两格），斜向吃子。',
      '马：走「日」字（先两格再一格），唯一能跳过其他棋子的子。',
      '象：沿斜线任意格数滑动。',
      '车：沿横线与竖线任意格数滑动。',
      '后：沿任意方向任意格数滑动——最强的子。',
      '王：向任意方向走一格，且绝不能走入被将军的位置。',
    ],
  },
  turn: {
    head: '走子顺序',
    items: [
      '白方永远先行，之后双方轮流，每回合只走一枚棋子。',
      '不能跳过回合；若自己的王被将军，必须立即应对。',
    ],
  },
  special: {
    head: '特殊走法',
    items: [
      '王车易位：在符合条件时，王向车方向走两格、车跳到王另一侧——唯一「两子同动」的着法，用来把王转移到安全角落（有前提条件）。',
      '吃过路兵：对方兵一步冲两格、恰好掠过你相邻的兵时，你可像它只走一格那样把它吃掉。',
      '升变：兵走到对方底线必须升变为后、车、象或马——绝大多数情况升变为后。',
    ],
  },
  end: {
    head: '对局结束',
    items: [
      '将死即定胜负，由完成将死的一方获胜。',
      '和棋情形包括：逼和、三次重复局面、五十回合规则，或子力不足（例如王对王）。',
    ],
  },
  terms: {
    head: '六种棋子',
    intro: '棋盘上你会遇到的棋子类型：',
    items: [
      { en: 'King', zh: '王', desc: '你必须保护的核心；被将死就输掉对局。' },
      { en: 'Queen', zh: '后', desc: '向任意方向走子——盘上最强的子。' },
      { en: 'Rook', zh: '车', desc: '沿横线与竖线滑动，残局威力大。' },
      { en: 'Bishop', zh: '象', desc: '沿斜线滑动，每个象固定停留在一种颜色的格子上。' },
      { en: 'Knight', zh: '马', desc: '走日字，唯一能越过其他棋子的子。' },
      { en: 'Pawn', zh: '兵', desc: '向前挺进、斜向吃子，冲到底线可升变。' },
    ],
  },
  cta: '免费玩国际象棋',
  faqHead: '常见问题',
  faq: [
    {
      q: '国际象棋（Chess）怎么玩？',
      a: '双方各 16 枚棋子，在 8×8 棋盘上轮流走子，目标是将死对方的王——让对方的王被攻击且无法化解。白方先行。',
    },
    {
      q: '什么是王车易位（castling）？',
      a: '在符合条件下，王与车可一次走完：王向车方向走两格、车跳到王另一侧。它是唯一的「两子同动」，用来把王转移到安全角落。',
    },
    {
      q: '吃过路兵（en passant）是什么？',
      a: '当对方兵一步冲两格、恰好掠过你相邻的兵时，你可以像它只走一格那样把它吃掉。这是国际象棋中唯一「吃一个看不见的格子」的规则。',
    },
    {
      q: '兵怎么升变（promotion）？',
      a: '兵走到对方底线时，必须升变为后、车、象或马——绝大多数情况升变为后。本作自动升变为后。',
    },
    {
      q: '可以免费在线玩国际象棋吗？',
      a: '可以。在 YiBoard 打开 /chess 即可免费与 AI 对弈，提供多档难度，无需注册。',
    },
  ],
};

const PATH = '/chess-rules';

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
    alternates: localeAlternates('chess-rules', locale),
  };
}

export const revalidate = 86400;

export default async function ChessRulesPage(props: { params: Promise<{ locale: string }> }) {
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
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.pieces },
    { icon: <Circle size={18} weight="bold" aria-hidden />, data: c.turn },
    { icon: <WarningCircle size={18} weight="bold" aria-hidden />, data: c.special },
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.end },
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
          <RelatedLink href="/reversi-rules" label={lang === 'zh' ? '黑白棋规则' : 'Reversi rules'} />
          <RelatedLink href="/learn-xiangqi" label={lang === 'zh' ? '象棋学习指南' : 'Learn Xiangqi'} />
          <RelatedLink href="/chess" label={lang === 'zh' ? '免费玩国际象棋' : 'Play Chess'} />
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/chess" className="yb-btn yb-btn-primary">
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
