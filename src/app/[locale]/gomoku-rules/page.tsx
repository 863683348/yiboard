import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Flag, Circle, SquaresFour, WarningCircle, TextAa, Question, BookOpen } from '@phosphor-icons/react/dist/ssr';

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
  turn: { head: string; items: string[] };
  board: { head: string; items: string[] };
  forbidden: { head: string; items: string[] };
  draw: { head: string; items: string[] };
  terms: { head: string; intro: string; items: Term[] };
  cta: string;
  faqHead: string;
  faq: Faq[];
};

const EN: Content = {
  meta: {
    title: 'Gomoku Rules — How to Play Five in a Row',
    description:
      'Learn the official gomoku (five-in-a-row) rules: win with five stones in any line, standard board sizes, turn order, and key shapes like the open four and broken three. Play free at YiBoard.',
    keywords: 'gomoku rules, five in a row rules, how to play gomoku, gomoku board size, renju rules',
  },
  h1: 'Gomoku Rules',
  lead: 'Gomoku — also called Five in a Row — is a two-player abstract strategy game. The rules are short to learn but the tactics run deep. Here is everything you need to set up a legal game and recognize the basic shapes.',
  objective: {
    head: 'Objective',
    items: [
      'Win by placing five of your own stones in an unbroken line — horizontally, vertically, or diagonally.',
      'Exactly five stones win. On the free gomoku ruleset a longer line (six or more) is also a win; the competitive Renju ruleset treats a six-in-a-row as a forbidden loss for Black (see below).',
    ],
  },
  turn: {
    head: 'Turn Order',
    items: [
      'Black moves first, then the players alternate, placing exactly one stone per turn.',
      'Stones are placed on the intersections of the grid and are never moved or removed once played.',
    ],
  },
  board: {
    head: 'Board',
    items: [
      'The standard board is 15×15 intersections.',
      'Smaller 13×13 boards and larger 19×19 boards are also used as variants; the winning rule is always five in a row.',
    ],
  },
  forbidden: {
    head: 'Forbidden Moves',
    items: [
      'On the free gomoku ruleset there are no forbidden moves — either color may build any line.',
      'The competitive Renju ruleset restricts Black only: Black may not play a double-three, double-four, or overline. White has no restrictions. See the Renju rules page for the full details.',
    ],
  },
  draw: {
    head: 'Draw',
    items: [
      'If the board fills completely with no five-in-a-row made, the game ends in a draw.',
    ],
  },
  terms: {
    head: 'Basic Terms',
    intro: 'A few shapes every player should know. The full list lives in the glossary:',
    items: [
      { en: 'Open Four', zh: '活四', desc: 'Four stones with both ends open — unstoppable, wins on the next move.' },
      { en: 'Straight Four (Four)', zh: '冲四', desc: 'Four in a row with one open end; the opponent must block it.' },
      { en: 'Open Three', zh: '活三', desc: 'A three that can become an open four on the next move.' },
      { en: 'Broken Three', zh: '眠三', desc: 'A three that needs a specific point to extend; lower priority than an open three.' },
    ],
  },
  cta: 'Play Gomoku Free',
  faqHead: 'Frequently Asked Questions',
  faq: [
    {
      q: 'Is gomoku the same as Go?',
      a: 'No. Go (Weiqi) is played on a 19×19 board where you capture stones and claim territory. Gomoku is played for five-in-a-row on a 15×15 board with no captures.',
    },
    {
      q: 'Can Black win on the first move?',
      a: 'No. A single stone cannot make five in a row. Black\'s advantage shows up later, which is exactly why the Renju ruleset adds forbidden moves to keep the game balanced.',
    },
    {
      q: 'Does five in a row have to be exactly five?',
      a: 'Under standard free gomoku, exactly five wins and a line of six or more is also a win. Under Renju, six or more (an overline) is a forbidden loss for Black.',
    },
    {
      q: 'Who goes first in gomoku?',
      a: 'Black always moves first, then players alternate. Many casual games decide color by a coin flip or a "guess the stone" ritual.',
    },
  ],
};

const ZH: Content = {
  meta: {
    title: '五子棋规则 — 五子连珠怎么玩',
    description:
      '学习五子棋（五子连珠）的正式规则：横竖斜任意方向连成五子即胜、标准棋盘尺寸、落子顺序，以及活四、眠三等基础棋形。来 YiBoard 免费对弈。',
    keywords: '五子棋规则, 五子连珠规则, 五子棋怎么玩, 五子棋棋盘, 连珠规则',
  },
  h1: '五子棋规则',
  lead: '五子棋又称五子连珠，是一种两人对弈的抽象策略棋类。规则好学，门道却很深。下面把开局所需的全部规则与基础棋形讲清楚。',
  objective: {
    head: '胜负目标',
    items: [
      '在棋盘上把自己的棋子连成不间断的五子一线（横、竖、斜均可）即获胜。',
      '标准规则下「连成五子」即胜；自由规则中六子及以上也算胜，而竞技连珠（Renju）把六子及以上（长连）判为黑棋禁手负（见下文）。',
    ],
  },
  turn: {
    head: '落子顺序',
    items: [
      '黑棋先走，双方轮流，每回合只落一子。',
      '棋子落在交叉点上，一旦落下不可移动也不可吃掉。',
    ],
  },
  board: {
    head: '棋盘',
    items: [
      '标准棋盘为 15×15 路交叉点。',
      '也有 13×13 的小棋盘与 19×19 的大棋盘等变体；胜负判定始终是「五子连珠」。',
    ],
  },
  forbidden: {
    head: '禁手',
    items: [
      '在自由五子棋规则中没有任何禁手——双方都可以连成任意棋形。',
      '竞技连珠（Renju）仅对黑棋设限：黑棋不可走双三、双四或长连；白棋不受限制。完整说明见连珠规则页。',
    ],
  },
  draw: {
    head: '和棋',
    items: [
      '若棋盘下满仍无人连成五子，则判为和棋。',
    ],
  },
  terms: {
    head: '基础术语',
    intro: '几个每个棋手都该认识的棋形，完整列表见术语表：',
    items: [
      { en: 'Open Four', zh: '活四', desc: '两端都敞开的四子，无法阻挡，下一步必胜。' },
      { en: 'Straight Four (Four)', zh: '冲四', desc: '只有一端敞开的四子，对手必须封堵。' },
      { en: 'Open Three', zh: '活三', desc: '下一步能变成活三或活四的三子。' },
      { en: 'Broken Three', zh: '眠三', desc: '需要特定一点才能延伸的三子，优先级低于活三。' },
    ],
  },
  cta: '免费玩五子棋',
  faqHead: '常见问题',
  faq: [
    {
      q: '五子棋和围棋是一种棋吗？',
      a: '不是。围棋在 19×19 棋盘上进行，靠提子和围地取胜；五子棋在 15×15 棋盘上为「连成五子」而战，没有吃子。',
    },
    {
      q: '黑棋第一步能直接赢吗？',
      a: '不能。一枚棋子无法连成五子。黑棋的优势在后续才显现，这正是连珠规则引入禁手以保持平衡的原因。',
    },
    {
      q: '五子连珠必须刚好五子吗？',
      a: '标准自由五子棋中，连成五子即胜，六子及以上也算胜；而在连珠规则中，六子及以上（长连）判黑棋禁手负。',
    },
    {
      q: '五子棋谁先走？',
      a: '黑棋永远先走，之后双方轮流。许多休闲对局通过猜拳或「猜先」来决定谁执黑。',
    },
  ],
};

const PATH = '/gomoku-rules';

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
    alternates: localeAlternates('gomoku-rules', locale),
  };
}

export const revalidate = 86400;

export default async function GomokuRulesPage(props: { params: Promise<{ locale: string }> }) {
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

  const listSections: Array<{ icon: ReactNode; data: { head: string; items: string[] } }> = [
    { icon: <Flag size={18} weight="bold" aria-hidden />, data: c.objective },
    { icon: <Circle size={18} weight="bold" aria-hidden />, data: c.turn },
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.board },
    { icon: <WarningCircle size={18} weight="bold" aria-hidden />, data: c.forbidden },
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.draw },
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
        <SectionHead icon={<TextAa size={18} weight="bold" aria-hidden />} title={c.terms.head} />
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
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Link href="/glossary" className="yb-btn yb-btn-primary">
            {lang === 'zh' ? '查看完整术语表' : 'See the full glossary'}
          </Link>
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
          <RelatedLink href="/renju-rules" label={lang === 'zh' ? '连珠规则（禁手详解）' : 'Renju rules (forbidden moves)'} />
          <RelatedLink href="/gomoku-vs-go" label={lang === 'zh' ? '五子棋 vs 围棋' : 'Gomoku vs Go'} />
          <RelatedLink href="/how-to" label={lang === 'zh' ? '快速玩法说明' : 'How to play gomoku'} />
          <RelatedLink href="/glossary" label={lang === 'zh' ? '完整术语表' : 'Full glossary'} />
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
