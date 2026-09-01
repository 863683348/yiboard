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
  what: { head: string; items: string[] };
  board: { head: string; items: string[] };
  how: { head: string; items: string[] };
  reading: { head: string; items: string[] };
  terms: { head: string; intro: string; items: Term[] };
  cta: string;
  faqHead: string;
  faq: Faq[];
};

const EN: Content = {
  meta: {
    title: 'Tsumego — Go Life & Death Problems (How to Practice)',
    description:
      'What is a tsumego? Learn Go life-and-death problems: read liberties, make two eyes, and capture the opponent on the 9×9 board. Practice free at YiBoard.',
    keywords: 'tsumego, go life and death, go problems, how to play tsumego, go capture practice',
  },
  h1: 'Tsumego (Go Life & Death)',
  lead: 'A tsumego (詰碁) is a Go life-and-death problem — a small local position where you must find the one move that captures the enemy or makes your own group live. Solving them trains the reading skill that decides the middle game.',
  what: {
    head: 'What is a Tsumego?',
    items: [
      'It is a puzzle, not a full game. You are given a fixed shape and told whose turn it is.',
      'Black or white must find the vital point: either capture the opponent\'s group, or secure two eyes so your own group lives.',
    ],
  },
  board: {
    head: 'Board',
    items: [
      'Problems are usually set on a 9×9 board (occasionally smaller), which keeps the reading short and focused.',
      'The surrounding empty points are not yet decided — that is exactly what you must read out for yourself.',
    ],
  },
  how: {
    head: 'How to Solve',
    items: [
      'Count the opponent\'s liberties first — the solution is usually the move that removes the last one, or that defends your own last liberty.',
      'Click the point you think is correct. A right answer plays out the capture; a wrong one gives a hint, and you can reveal the solution to learn from it.',
    ],
  },
  reading: {
    head: 'Reading Habits',
    items: [
      'Always assume the opponent plays the best reply — a tsumego is only solved if your move works against the toughest defence.',
      'Look for two eyes: a group with two separate eyes can never be captured. Making life often matters more than capturing.',
    ],
  },
  terms: {
    head: 'Key Terms',
    intro: 'Concepts every solver meets:',
    items: [
      { en: 'Liberty', zh: '气', desc: 'An empty point adjacent to a stone or group. With zero liberties the group is captured.' },
      { en: 'Eye', zh: '眼', desc: 'An empty point surrounded by your own stones. Two eyes make a group alive.' },
      { en: 'Vital point', zh: '要点', desc: 'The single most important point of a shape — taking or defending it decides life or death.' },
    ],
  },
  cta: 'Practice Tsumego Free',
  faqHead: 'Frequently Asked Questions',
  faq: [
    {
      q: 'What is a tsumego?',
      a: 'A tsumego is a Go life-and-death problem: given a local position, find the move that captures the opponent or makes your own group live with two eyes.',
    },
    {
      q: 'How do these problems work?',
      a: 'When it is your turn (black or white), click the point you think is correct. A correct answer plays out the capture; a wrong one gives a hint, and you can also reveal the solution directly.',
    },
    {
      q: 'Why are tsumego important?',
      a: 'Capturing races, making life and breaking eyes all rest on life-and-death reading. A few problems a day sharpens your ability to see whether a group is alive or dead in the middle game.',
    },
    {
      q: 'Can I practice tsumego online for free?',
      a: 'Yes. On YiBoard, open /tsumego to practice free — no signup required.',
    },
  ],
};

const ZH: Content = {
  meta: {
    title: '死活题（Tsumego）— 围棋死活怎么练',
    description:
      '什么是死活题？学习围棋死活：在 9×9 棋盘上数气、做两眼、提掉对方。来 YiBoard 免费在线练习。',
    keywords: '死活题, tsumego, 围棋死活, 围棋习题, 死活怎么练, 围棋提子练习',
  },
  h1: '死活题（Tsumego）',
  lead: '死活题（日语 詰碁）是围棋中专门训练「提子与做活」的习题：给定一个局部局面，你要找出那手能吃掉对方、或让自己棋块两眼做活的要点。坚持做死活，练的就是中盘战斗里决定胜负的算路。',
  what: {
    head: '什么是死活题？',
    items: [
      '它是一道习题，不是完整对局。你拿到一个固定的局部形状，并被告知轮到谁走。',
      '黑或白要找出的「要点」：要么吃掉对方棋块，要么做出两只眼让自己的棋块活下来。',
    ],
  },
  board: {
    head: '棋盘',
    items: [
      '死活题通常摆在 9×9 棋盘上（偶尔更小），让算路短而集中。',
      '周围尚未确定的空点正是你需要自己算清的部分——这正是题目的关键。',
    ],
  },
  how: {
    head: '怎么练',
    items: [
      '先数对方棋块还剩几口气，正解通常是「收紧最后一口气」或「守住自己最后一口气的那一手」。',
      '点出你认为正确的点。点中正解会立即演示提子过程；点错会有提示，也可以直接「揭示答案」对照学习。',
    ],
  },
  reading: {
    head: '算路习惯',
    items: [
      '永远假设对方走最强应手——只有你的着法能顶住最顽强的防守，才算真正解出。',
      '优先找「两只眼」：一块有两个真眼的棋永远不会被吃。多数时候，做活比吃子更重要。',
    ],
  },
  terms: {
    head: '关键术语',
    intro: '每个解题者都会遇到的概念：',
    items: [
      { en: 'Liberty', zh: '气', desc: '棋子或棋块相邻的空点。气被占光，整块被提。' },
      { en: 'Eye', zh: '眼', desc: '被己方棋子围住的空点。两只眼让一块棋做活。' },
      { en: 'Vital point', zh: '要点', desc: '一个形状里最关键的那个点——抢占或守住它，决定死活。' },
    ],
  },
  cta: '免费练死活题',
  faqHead: '常见问题',
  faq: [
    {
      q: '什么是死活题（Tsumego）？',
      a: '死活题是围棋中专门训练「提子与做活」的习题：给定局部局面，找出那手能吃掉对方、或让自己两块眼活下来的关键着法。',
    },
    {
      q: '这套死活题怎么玩？',
      a: '轮到你走时（黑或白），在棋盘上点出你认为正确的那一手。点中正解会立即演示提子过程；点错会有提示，也可以直接「揭示答案」。',
    },
    {
      q: '为什么死活题重要？',
      a: '对杀、做活、破眼都建立在死活计算上。每天做几道，能显著提升在中盘战斗里「看清一块棋死活」的能力。',
    },
    {
      q: '可以免费在线练死活题吗？',
      a: '可以。在 YiBoard 打开 /tsumego 即可免费练习，无需注册。',
    },
  ],
};

const PATH = '/tsumego-rules';

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
    alternates: localeAlternates('tsumego-rules', locale),
  };
}

export const revalidate = 86400;

export default async function TsumegoRulesPage(props: { params: Promise<{ locale: string }> }) {
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
    { icon: <Flag size={18} weight="bold" aria-hidden />, data: c.what },
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.board },
    { icon: <Circle size={18} weight="bold" aria-hidden />, data: c.how },
    { icon: <WarningCircle size={18} weight="bold" aria-hidden />, data: c.reading },
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
          <RelatedLink href="/go-rules" label={lang === 'zh' ? '围棋规则' : 'Go rules'} />
          <RelatedLink href="/tsumego" label={lang === 'zh' ? '免费练死活题' : 'Practice Tsumego'} />
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/tsumego" className="yb-btn yb-btn-primary">
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
