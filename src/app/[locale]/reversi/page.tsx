import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/i18n/metadata';
import ReversiGame from '@/components/ReversiGame';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '免费在线黑白棋 – 对战 AI' : 'Play Reversi (Othello) Online Free – vs AI',
    description: isZh
      ? '免费在线黑白棋（Reversi / Othello）。在 8×8 棋盘上夹住并翻转对方棋子，终局子多者胜。无需注册，即刻开局。'
      : 'Play Reversi (Othello) online for free. Trap and flip your opponent\'s discs on the 8×8 board — most discs wins. No signup required.',
    alternates: localeAlternates('reversi', locale),
    openGraph: {
      title: isZh ? '免费在线黑白棋 – 对战 AI' : 'Play Reversi Online Free',
      description: isZh ? '免费在线黑白棋，对战 AI，学习规则。' : 'Play Reversi online free vs AI.',
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '免费在线黑白棋' : 'Play Reversi Online Free',
      description: isZh ? '黑白棋对战 AI，免费玩。' : 'Free Reversi vs AI.',
      images: ['/og.png'],
    },
  };
}

export const revalidate = 3600;

export default async function ReversiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const faqItems = isZh
    ? [
        { q: '黑白棋（Reversi / Othello）怎么玩？', a: '双方在 8×8 棋盘上轮流落子，棋子落在能"夹住"对方一排棋子的空位上，被夹住的棋子会被翻成自己的颜色。无子可下的一方必须停一手。' },
        { q: '黑白棋怎么算赢？', a: '当双方都无法落子时终局，棋盘上自己颜色的棋子多者获胜。角上的棋子最稳，因为不会被翻。' },
        { q: '为什么角很重要？', a: '占据角落后，该角上的棋子永远不会被对方翻转，还能沿边线不断扩展。高手会抢角、避免落在角旁的"坏点"。' },
        { q: '可以免费在线玩黑白棋吗？', a: '可以。在 YiBoard 打开 /reversi 即可免费与 AI 对弈，提供多档难度，无需注册。' },
      ]
    : [
        { q: 'How do you play Reversi (Othello)?', a: 'Players take turns placing discs so they flank a straight line of the opponent\'s discs; the flanked discs flip to your colour. If you have no legal move, you must pass.' },
        { q: 'How do you win at Reversi?', a: 'The game ends when neither side can move. Whoever has more discs of their colour on the board wins. Corners are the strongest squares because they can never be flipped.' },
        { q: 'Why are the corners important?', a: 'Once you hold a corner, that disc can never be flipped, and it lets you expand along the edge. Strong players grab corners and avoid the weak squares next to them.' },
        { q: 'Can I play Reversi online for free?', a: 'Yes. On YiBoard, open /reversi to play free against AI with several difficulty levels — no signup required.' },
      ];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isZh ? '黑白棋 – 弈界 YiBoard' : 'Reversi – YiBoard',
    description: isZh ? '免费在线黑白棋对战，含多档难度 AI。' : 'Free online Reversi with AI opponents at several difficulty levels.',
    url: `/${locale}/reversi`,
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-8)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="yb-h2">{isZh ? '黑白棋（Reversi / Othello）' : 'Reversi (Othello)'}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-2)', maxWidth: '60ch' }}>
          {isZh
            ? '夹住对方的棋子，把它们翻成你的颜色。占据角落，控制边线，终局子多者胜。'
            : 'Trap your opponent\'s discs and flip them to your colour. Hold the corners, control the edges, and finish with the most discs.'}
        </p>
      </header>

      <ReversiGame locale={locale} variant="full" />

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 720 }}>
        <h2 className="yb-h3">{isZh ? '黑白棋基本规则' : 'Basic Rules'}</h2>
        <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-5)', lineHeight: 1.8 }}>
          {isZh ? (
            <>
              <li><strong>轮流落子</strong>：黑棋先行，每次落子必须能夹住至少一枚对方棋子。</li>
              <li><strong>翻转</strong>：夹在中间的所有对方棋子会变成你的颜色——横、竖、斜八个方向都算。</li>
              <li><strong>停一手</strong>：当你无子可下时必须 pass；双方连续 pass 则终局。</li>
              <li><strong>胜负</strong>：终局时棋盘上自己颜色的棋子更多者获胜。角上的棋子永远不会被翻。</li>
            </>
          ) : (
            <>
              <li><strong>Alternate turns</strong>: Black moves first. Each move must flank at least one opponent disc.</li>
              <li><strong>Flipping</strong>: Every opponent disc caught between your new disc and another of yours — in any of the eight directions — flips to your colour.</li>
              <li><strong>Pass</strong>: When you have no legal move you must pass; two consecutive passes end the game.</li>
              <li><strong>Winning</strong>: At the end, whoever has more discs of their colour on the board wins. Corner discs can never be flipped.</li>
            </>
          )}
        </ul>
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
          <Link href="/reversi-rules" style={{ color: 'var(--accent)' }}>{isZh ? '查看完整规则与术语 →' : 'Read the full rules & terms →'}</Link>
        </p>
      </section>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 720 }}>
        <h2 className="yb-h3">{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>
        <dl style={{ marginTop: 'var(--space-3)', lineHeight: 1.8 }}>
          {faqItems.map((item) => (
            <div key={item.q} style={{ marginBottom: 'var(--space-4)' }}>
              <dt style={{ fontWeight: 600 }}>{item.q}</dt>
              <dd style={{ marginTop: 'var(--space-1)' }}>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
