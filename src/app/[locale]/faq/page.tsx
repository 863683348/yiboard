import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Bilingual = { en: string; zh: string };

const META: Record<'en' | 'zh', { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Gomoku FAQ — Free, No Signup, Browser & Mobile',
    description:
      'Answers to the questions players actually ask: is YiBoard free, do you need an account, how the AI and friend rooms work, what renju forbidden moves are, and whether your data stays private.',
    keywords: ['gomoku faq', 'is gomoku free', 'gomoku no signup', 'gomoku app', 'gomoku vs go', 'renju rules'],
  },
  zh: {
    title: '五子棋常见问题 — 免费、免注册、网页与手机都能玩',
    description:
      '玩家真正会问的问题：YiBoard 免费吗、需要注册吗、AI 和好友房怎么玩、什么是 Renju 禁手、数据是否私密。',
    keywords: ['五子棋常见问题', '五子棋免费吗', '五子棋免注册', '五子棋 app', '五子棋和围棋', 'renju 规则'],
  },
};

const FAQ: { q: Bilingual; a: Bilingual }[] = [
  {
    q: { en: 'Is YiBoard really free?', zh: 'YiBoard 真的免费吗？' },
    a: {
      en: 'Yes. The core game is free forever: no ads, no paywall, no energy bars. An optional account only syncs your record across devices.',
      zh: '免费。核心对局永远免费：无广告、无付费墙、无体力限制。可选的账号只用来跨设备同步战绩。',
    },
  },
  {
    q: { en: 'Do I need to register to play?', zh: '玩需要注册吗？' },
    a: {
      en: 'No. You can open a board and play against the AI or a friend instantly, no account required. Register only if you want ranked play and a saved record.',
      zh: '不需要。打开棋盘就能和 AI 或好友立刻开玩，无需账号。只有想打排位、保存战绩时才需注册。',
    },
  },
  {
    q: { en: 'Is there an app, or is it browser only?', zh: '有 App 吗，还是只能在浏览器玩？' },
    a: {
      en: 'It runs in the browser and works on desktop and mobile with no install. You can add it to your home screen for an app-like shortcut.',
      zh: '网页即可运行，桌面和手机都不用安装。可把它加到主屏，像 App 一样快捷打开。',
    },
  },
  {
    q: { en: 'What are the rules of Gomoku?', zh: '五子棋的规则是什么？' },
    a: {
      en: 'Black and white alternate placing stones; the first to line up five in a row, horizontally, vertically or diagonally, wins. No captures. Full detail on the how-to page.',
      zh: '黑先白后轮流落子，先把五子连成一线（横、竖、斜皆可）者胜，没有吃子。完整规则见玩法页。',
    },
  },
  {
    q: { en: 'Is Gomoku the same as Go?', zh: '五子棋和围棋一样吗？' },
    a: {
      en: 'No. Gomoku is about five in a row; Go is about surrounding territory, has captures and a 19x19 board. They share cultural roots but different rules.',
      zh: '不一样。五子棋比连线，围棋比围地，有提子、棋盘 19×19。两者文化同源但规则不同。',
    },
  },
  {
    q: { en: 'What is Renju and what are forbidden moves?', zh: '什么是 Renju？禁手是什么？' },
    a: {
      en: 'Renju is the competitive variant that forbids black from double-three, double-four and overline, to balance the first-move edge. White has no forbidden moves.',
      zh: 'Renju 是竞技变体，禁止黑棋下出双三、双四、长连以抵消先手优势；白棋无禁手。详见 Renju 规则页。',
    },
  },
  {
    q: { en: 'Can I play against the AI?', zh: '能和 AI 对战吗？' },
    a: {
      en: 'Yes. The built-in engine runs locally in your browser with alpha-beta search, so it is strong and never queues. No server round trip.',
      zh: '可以。内置引擎在浏览器本地运行 alpha-beta 搜索，既强又不用排队，没有服务器往返。',
    },
  },
  {
    q: { en: 'Can I play with a friend?', zh: '能和朋友一起玩吗？' },
    a: {
      en: 'Yes. Open a friend room and share the link, or use random match to face a real player instantly. Both are free and need no account.',
      zh: '可以。开一个好友房把链接发给朋友，或点随机匹配立刻遇到真人。两者都免费、无需账号。',
    },
  },
  {
    q: { en: 'How does random match work?', zh: '随机匹配是怎么运作的？' },
    a: {
      en: 'When you hit random match, the server pairs you with another waiting player. If none is waiting, you get matched with the AI so you never sit idle.',
      zh: '点随机匹配后，服务器把你和正在等待的玩家配对；若无人等待，则匹配 AI，绝不让你干等。',
    },
  },
  {
    q: { en: 'What are grades and dans?', zh: '级位和段位是什么？' },
    a: {
      en: 'Everyone starts at 1200, Sixth Grade. Wins raise your score, losses lower it, and the score maps onto the traditional Ninth Grade to Ninth Dan ladder.',
      zh: '所有人从 1200 分、六级起步。赢加分、输减分，分数映射到传统的九级到九段阶梯。',
    },
  },
  {
    q: { en: 'Is the AI too hard to beat?', zh: 'AI 是不是太难赢了？' },
    a: {
      en: 'It searches deeply and misses no threats, but it is beatable by managing your own threats and keeping the initiative. Our winning checklist explains how.',
      zh: '它会深算、不漏威胁，但只要管理好自己的威胁、保持先手就能赢。我们的实战清单讲具体做法。',
    },
  },
  {
    q: { en: 'Is my data private?', zh: '我的数据私密吗？' },
    a: {
      en: 'An optional account stores only what is needed for ranked play and record sync. We do not sell data, and matches run without tracking your moves.',
      zh: '可选的账号只为排位和战绩同步存储必要信息。我们不卖数据，对局过程不追踪你的每一步。',
    },
  },
  {
    q: { en: 'Does it work on mobile?', zh: '手机上能用吗？' },
    a: {
      en: 'Yes. The board is responsive and touch-friendly, so you can play a full game on a phone without an app.',
      zh: '可以。棋盘自适应、支持触控，手机上不装 App 也能下完整一局。',
    },
  },
  {
    q: { en: 'What board size does Gomoku use?', zh: '五子棋棋盘多大？' },
    a: {
      en: 'The standard board is 15x15. Some variants use 13x13 or 19x19, but the five-in-a-row win condition is the same.',
      zh: '标准棋盘 15×15。部分变体用 13×13 或 19×19，但五子连珠的胜负条件不变。',
    },
  },
  {
    q: { en: 'Will Xiangqi or Go be added?', zh: '会加入象棋或围棋吗？' },
    a: {
      en: 'Xiangqi is in development and Go is on the roadmap. They will reuse the same rank system and match sharing once shipped.',
      zh: '象棋在开发中，围棋在路线图上。上线后会复用同一套段位系统和对局分享框架。',
    },
  },
  {
    q: { en: 'How do I report a bug or ask a question?', zh: '怎么反馈问题或提问？' },
    a: {
      en: 'Use the contact page to reach the team. Bugs and suggestions both go there and are read by a human.',
      zh: '通过联系页联系团队。Bug 和建议都发到这里，由真人查看。',
    },
  },
  {
    q: { en: 'Is Gomoku solved by computers?', zh: '五子棋被电脑破解了吗？' },
    a: {
      en: 'Without forbidden moves, first player has a proven win; Renju forbids moves to balance that. For humans the edge is small, so games stay close.',
      zh: '无禁手下先手已被证明必胜；Renju 用禁手平衡。对人类来说优势很小，对局依旧胶着。',
    },
  },
];

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
    alternates: localeAlternates('faq', locale),
  };
}

export const revalidate = 86400;

export default async function FaqPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const l = LOC(locale);
  const items = FAQ.map((f) => ({ q: f.q[l], a: f.a[l] }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{META[l].title}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {META[l].description}
        </p>
      </header>

      <div style={{ maxWidth: 760, marginTop: 'var(--space-8)', display: 'grid', gap: 'var(--space-3)' }}>
        {items.map((it, i) => (
          <details key={i} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <summary
              style={{
                cursor: 'pointer',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--weight-emphasis)',
                color: 'var(--fg)',
                listStyle: 'none',
              }}
            >
              {it.q}
            </summary>
            <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
              {it.a}
            </p>
          </details>
        ))}
      </div>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/contact" className="yb-btn yb-btn-outline">
          {l === 'zh' ? '联系我们' : 'Contact us'}
        </Link>
      </section>
    </div>
  );
}
