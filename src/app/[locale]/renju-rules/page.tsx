import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Prohibit, Scales, Flag, Question } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Meta = { title: string; description: string; keywords: string };
type Faq = { q: string; a: string };
type ListSection = { head: string; items: string[] };
type Content = {
  meta: Meta;
  h1: string;
  lead: string;
  what: ListSection;
  forbidden: ListSection;
  judged: ListSection;
  white: ListSection;
  vs: ListSection;
  cta: string;
  faqHead: string;
  faq: Faq[];
};

const EN: Content = {
  meta: {
    title: 'Renju Rules — Black’s Forbidden Moves Explained',
    description:
      'Renju is the competitive variant of gomoku. Learn Black’s forbidden moves — double-three, double-four, and overline — how they are judged, and how Renju differs from free gomoku.',
    keywords: 'renju rules, renju forbidden moves, renju forbidden point, gomoku renju, renju vs gomoku',
  },
  h1: 'Renju Rules',
  lead: 'Renju is the standardized competitive ruleset of gomoku, developed in Japan to balance Black’s first-move advantage. The only difference from free gomoku is a set of forbidden moves that apply to Black alone.',
  what: {
    head: 'What Is Renju',
    items: [
      'Renju keeps the same 15×15 board and the same goal — five in a row — but adds restrictions for Black so the first player cannot force a win with perfect play.',
      'White plays under the normal gomoku rules, so the two sides face deliberately unequal constraints.',
    ],
  },
  forbidden: {
    head: 'Black’s Forbidden Moves',
    items: [
      'Double-three (三三): Black may not create two open threes with a single stone.',
      'Double-four (四四): Black may not create two fours — open or straight — with a single stone.',
      'Overline (长连): Black may not make a line of six or more stones. Exactly five wins; six or more is a loss.',
      'White has no forbidden moves at all.',
    ],
  },
  judged: {
    head: 'How Forbidden Moves Are Judged',
    items: [
      'If Black’s stone forms a forbidden shape, Black loses immediately — unless the same stone also makes a five-in-a-row, in which case the win takes priority.',
      'A stone that simultaneously creates a five and a forbidden shape counts as a win, never a loss.',
    ],
  },
  white: {
    head: 'How White Wins',
    items: [
      'White wins exactly like in gomoku: make an unbroken five in any direction.',
      'White also wins if Black commits a forbidden move, so reading Black’s threats is a core part of Renju strategy.',
    ],
  },
  vs: {
    head: 'Renju vs Free Gomoku',
    items: [
      'Free gomoku has no forbidden moves, and a six-in-a-row is usually counted as a win.',
      'Renju restricts Black and turns overlines into losses, which keeps the game fair and competitive for both sides.',
    ],
  },
  cta: 'Play Renju-Style Gomoku Free',
  faqHead: 'Frequently Asked Questions',
  faq: [
    {
      q: 'What is the Renju forbidden point?',
      a: 'A forbidden point is an intersection where Black’s stone would create a double-three, double-four, or overline. Playing there is an immediate loss for Black.',
    },
    {
      q: 'Does White have forbidden moves?',
      a: 'No. Only Black is restricted under Renju. White may play any legal five-in-a-row, including lines longer than five.',
    },
    {
      q: 'Why does Renju have forbidden moves?',
      a: 'Without them, the first player (Black) can force a win through perfect play. The restrictions remove that forced win and keep Renju balanced.',
    },
  ],
};

const ZH: Content = {
  meta: {
    title: '连珠规则 — 黑棋禁手详解',
    description:
      '连珠是五子棋的竞技变体。了解黑棋禁手——三三、四四、长连——如何判定，以及连珠与自由五子棋的区别。',
    keywords: '连珠规则, 连珠禁手, 连珠禁点, 五子棋连珠, 连珠与五子棋',
  },
  h1: '连珠规则',
  lead: '连珠（Renju）是五子棋的竞技标准规则，源于日本，用以平衡黑棋的先手优势。它与自由五子棋唯一的区别在于：仅对黑棋设立一组禁手。',
  what: {
    head: '什么是连珠',
    items: [
      '连珠沿用同样的 15×15 棋盘与「五子连珠」的获胜目标，但额外对黑棋设限，使先手方无法凭借完美走法必胜。',
      '白棋按普通五子棋规则行棋，因此双方面对的是刻意不相等的条件。',
    ],
  },
  forbidden: {
    head: '黑棋禁手',
    items: [
      '三三禁手：黑棋一子同时形成两个活三，判负。',
      '四四禁手：黑棋一子同时形成两个四（活四或冲四），判负。',
      '长连禁手：黑棋连成六子及以上，判负；刚好五子获胜，六子及以上为负。',
      '白棋没有任何禁手。',
    ],
  },
  judged: {
    head: '禁手如何判定',
    items: [
      '若黑棋落子形成了禁手棋形，则黑棋立即判负——除非该子同时连成五子，此时「成五优先」判胜。',
      '一子同时形成五连与禁手时算胜，不算负。',
    ],
  },
  white: {
    head: '白棋如何取胜',
    items: [
      '白棋取胜方式与普通五子棋相同：在任意方向连成不间断的五子。',
      '若黑棋走出禁手，白棋同样获胜，因此读黑棋的威胁是连珠策略的核心。',
    ],
  },
  vs: {
    head: '连珠与自由五子棋',
    items: [
      '自由五子棋没有禁手，且六子连珠通常算胜。',
      '连珠限制黑棋并把长连判为负，使双方对局更加公平、具竞技性。',
    ],
  },
  cta: '免费玩连珠风格五子棋',
  faqHead: '常见问题',
  faq: [
    {
      q: '什么是连珠禁点？',
      a: '禁点是指黑棋落子后会形成三三、四四或长连的交叉点。走在禁点上黑棋立即判负。',
    },
    {
      q: '白棋有禁手吗？',
      a: '没有。连珠规则只对黑棋设限。白棋可以连成任意合法五子，包括超过五子的长连。',
    },
    {
      q: '连珠为什么要有禁手？',
      a: '若没有禁手，先手方（黑棋）可通过完美走法强制获胜。禁手消除了这种必胜，使连珠保持平衡。',
    },
  ],
};

const PATH = '/renju-rules';

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
    alternates: localeAlternates('renju-rules', locale),
  };
}

export const revalidate = 86400;

export default async function RenjuRulesPage(props: { params: Promise<{ locale: string }> }) {
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

  const sections: Array<{ icon: ReactNode; data: ListSection }> = [
    { icon: <Flag size={18} weight="bold" aria-hidden />, data: c.what },
    { icon: <Prohibit size={18} weight="bold" aria-hidden />, data: c.forbidden },
    { icon: <Scales size={18} weight="bold" aria-hidden />, data: c.judged },
    { icon: <Flag size={18} weight="bold" aria-hidden />, data: c.white },
    { icon: <Scales size={18} weight="bold" aria-hidden />, data: c.vs },
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

      {sections.map((s) => (
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
