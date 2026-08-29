import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Flag, Circle, SquaresFour, WarningCircle, Question, BookOpen } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Meta = { title: string; description: string; keywords: string };
type Faq = { q: string; a: string };
type Content = {
  meta: Meta;
  h1: string;
  lead: string;
  objective: { head: string; items: string[] };
  board: { head: string; items: string[] };
  turns: { head: string; items: string[] };
  capture: { head: string; items: string[] };
  ko: { head: string; items: string[] };
  scoring: { head: string; items: string[] };
  cta: string;
  faqHead: string;
  faq: Faq[];
};

const EN: Content = {
  meta: {
    title: 'Go Rules — How to Play Weiqi',
    description:
      'Learn the official Go rules: place stones, capture by removing liberties, understand the ko rule, and score by area. Play free Go at YiBoard.',
    keywords: 'go rules, weiqi rules, baduk rules, how to play go, go board size, go scoring, ko rule',
  },
  h1: 'Go Rules',
  lead: 'Go — also called Weiqi (Chinese) and Baduk (Korean) — is a two-player strategy game played on a grid of intersecting lines. The rules are simple; the strategy is famously deep.',
  objective: {
    head: 'Objective',
    items: [
      'Surround more territory than your opponent.',
      'You claim territory by enclosing empty points with your stones, and by capturing opponent stones to remove them from the board.',
    ],
  },
  board: {
    head: 'Board',
    items: [
      'The standard board is 19×19 intersections.',
      'Beginners often start on 9×9 or 13×13 boards, where games are shorter and tactics are easier to see. The rules are the same on every size.',
    ],
  },
  turns: {
    head: 'Turn Order',
    items: [
      'Black plays first, then players alternate, placing exactly one stone per turn on an empty intersection.',
      'Once placed, a stone does not move. You may pass your turn if you see no useful move.',
    ],
  },
  capture: {
    head: 'Capturing',
    items: [
      'A stone or connected group must have at least one empty point touching it horizontally or vertically. These empty points are called liberties.',
      'If a group has zero liberties, it is captured and removed from the board.',
      'You may not place a stone that would have zero liberties immediately — unless the move captures opponent stones first and therefore creates liberties.',
    ],
  },
  ko: {
    head: 'Ko',
    items: [
      'Ko prevents an endless loop of immediate recapture.',
      'You cannot play a stone that would recreate the exact board position that existed immediately before your opponent\'s last move.',
      'To recapture, you must play elsewhere first — this is called "playing a ko threat".',
    ],
  },
  scoring: {
    head: 'Scoring',
    items: [
      'The game ends when both players pass consecutively.',
      'Under area scoring (used on YiBoard), your score is your stones on the board plus the empty points completely surrounded by your stones.',
      'White receives komi — bonus points for moving second. Standard komi is 5.5 on 9×9, 6.5 on 13×13, and 7.5 on 19×19.',
    ],
  },
  cta: 'Play Go Free',
  faqHead: 'Frequently Asked Questions',
  faq: [
    {
      q: 'Is Go the same as Gomoku?',
      a: 'No. Gomoku is five-in-a-row on a 15×15 board with no captures. Go is about surrounding territory on a 19×19 board with captures, ko, and scoring.',
    },
    {
      q: 'What does "ko" mean in Go?',
      a: 'Ko is a rule that forbids instantly recreating the previous board position. It stops infinite capture-recapture loops. To retake a ko you must first play a "ko threat" elsewhere.',
    },
    {
      q: 'How does scoring work in Go?',
      a: 'After two consecutive passes, each player scores the stones on the board plus the empty territory they surround (area scoring). White adds komi points. The higher total wins.',
    },
    {
      q: 'Which board size should a beginner use?',
      a: 'Start on 9×9. Games finish in minutes and tactics are visible. Move up to 13×13, then 19×19 as you get comfortable.',
    },
  ],
};

const ZH: Content = {
  meta: {
    title: '围棋规则 — 围棋怎么玩',
    description:
      '学习围棋（Weiqi/Go）的正式规则：落子、提子、打劫、数子法计分。来 YiBoard 免费在线对弈围棋。',
    keywords: '围棋规则, 围棋怎么玩, weiqi rules, go rules, 打劫规则, 数子法, 围棋棋盘',
  },
  h1: '围棋规则',
  lead: '围棋又称「弈」，英文称 Go，日文称囲碁，韩文称바둑。规则简单，策略极深，是世界上最古老的棋类之一。',
  objective: {
    head: '胜负目标',
    items: [
      '围出比对手更多的领地。',
      '领地来自两处：用自己的棋子围住的空点，以及提掉对方棋子后空出的位置。',
    ],
  },
  board: {
    head: '棋盘',
    items: [
      '标准棋盘为 19×19 路交叉点。',
      '初学者常用 9×9 或 13×13 小棋盘，对局更短、战术更直观。所有尺寸规则一致。',
    ],
  },
  turns: {
    head: '落子顺序',
    items: [
      '黑棋先行，双方轮流在空交叉点各落一子。',
      '棋子落下后不能移动。若找不到有价值的一手，可以选择停一手（pass）。',
    ],
  },
  capture: {
    head: '提子',
    items: [
      '一枚棋子或连通的棋块，必须在横竖方向上至少有一个相邻空点，称为「气」。',
      '若棋块的气全部被占，整块被提掉并从棋盘上移除。',
      '落子后如果自己棋块没有任何气，属于自杀，禁止——除非这手棋先提掉了对方的子、从而产生气。',
    ],
  },
  ko: {
    head: '打劫',
    items: [
      '打劫规则防止双方无限互提。',
      '你不能下一手让棋盘回到对方上一手之前的完全相同局面。',
      '想立即反提，必须先在别处下一手——这叫「找劫材」。',
    ],
  },
  scoring: {
    head: '数子法计分',
    items: [
      '双方连续停一手后对局结束，进入数子。',
      '本站采用数子法：你的得分 = 盘上你的棋子数 + 完全被你围住的空点数。',
      '白棋获得贴目作为先行补偿。标准贴目：9×9 为 5.5 子，13×13 为 6.5 子，19×19 为 7.5 子。',
    ],
  },
  cta: '免费玩围棋',
  faqHead: '常见问题',
  faq: [
    {
      q: '围棋和五子棋是一种棋吗？',
      a: '不是。五子棋是 15×15 棋盘上连五子，没有提子；围棋在 19×19 棋盘上围地、提子、打劫并数子计分。',
    },
    {
      q: '围棋里的「打劫」是什么？',
      a: '打劫规则禁止立即重现上一手之前的棋盘局面，防止无限互提。想反提必须先在别处找劫材。',
    },
    {
      q: '围棋怎么算输赢？',
      a: '双方连续停一手后数子：盘上己方棋子数 + 围住的空点数（数子法），白棋另加贴目，总分高者胜。',
    },
    {
      q: '初学者该用多大的棋盘？',
      a: '从 9×9 开始，几分钟一局、战术直观，再过渡到 13×13 和 19×19。',
    },
  ],
};

const PATH = '/go-rules';

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
    alternates: localeAlternates('go-rules', locale),
  };
}

export const revalidate = 86400;

export default async function GoRulesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const c = LOC(locale) === 'zh' ? ZH : EN;
  const lang = LOC(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.meta.title,
    description: c.meta.description,
    datePublished: '2026-08-29',
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
    { icon: <Circle size={18} weight="bold" aria-hidden />, data: c.turns },
    { icon: <Circle size={18} weight="bold" aria-hidden />, data: c.capture },
    { icon: <WarningCircle size={18} weight="bold" aria-hidden />, data: c.ko },
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.scoring },
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
          <RelatedLink href="/gomoku-vs-go" label={lang === 'zh' ? '五子棋 vs 围棋' : 'Gomoku vs Go'} />
          <RelatedLink href="/gomoku-rules" label={lang === 'zh' ? '五子棋规则' : 'Gomoku rules'} />
          <RelatedLink href="/learn-xiangqi" label={lang === 'zh' ? '象棋学习指南' : 'Learn Xiangqi'} />
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/go" className="yb-btn yb-btn-primary">
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
