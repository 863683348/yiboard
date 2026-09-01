import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/i18n/metadata';
import ChessGame from '@/components/ChessGame';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '免费在线国际象棋 – 对战 AI' : 'Play Chess Online Free – vs AI',
    description: isZh
      ? '免费在线国际象棋（Chess）。在经典 8×8 棋盘上挑战 AI，体验王车易位、吃过路兵与升变。无需注册，即刻开局。'
      : 'Play Chess online for free. Challenge the AI on the classic 8×8 board — castling, en passant and promotion included. No signup required.',
    alternates: localeAlternates('chess', locale),
    openGraph: {
      title: isZh ? '免费在线国际象棋 – 对战 AI' : 'Play Chess Online Free',
      description: isZh ? '免费在线国际象棋，对战 AI，学习规则。' : 'Play Chess online free vs AI.',
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '免费在线国际象棋' : 'Play Chess Online Free',
      description: isZh ? '国际象棋对战 AI，免费玩。' : 'Free Chess vs AI.',
      images: ['/og.png'],
    },
  };
}

export const revalidate = 3600;

export default async function ChessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const faqItems = isZh
    ? [
        { q: '国际象棋（Chess）怎么玩？', a: '双方各 16 枚棋子，在 8×8 棋盘上轮流走子，目标是将死对方的王——让对方的王被攻击且无法化解。白方先行。' },
        { q: '什么是王车易位（castling）？', a: '在符合条件下，王与车可一次走完：王向车方向走两格、车跳到王另一侧。它是唯一的"两子同动"，用来把王转移到安全角落。' },
        { q: '吃过路兵（en passant）是什么？', a: '当对方兵一步冲两格、恰好掠过你相邻的兵时，你可以像它只走一格那样把它吃掉。这是国际象棋中唯一"吃一个看不见的格子"的规则。' },
        { q: '兵怎么升变（promotion）？', a: '兵走到对方底线时，必须升变为后、车、象或马——绝大多数情况升变为后。本作自动升变为后。' },
        { q: '可以免费在线玩国际象棋吗？', a: '可以。在 YiBoard 打开 /chess 即可免费与 AI 对弈，提供多档难度，无需注册。' },
      ]
    : [
        { q: 'How do you play Chess?', a: 'Each side has 16 pieces and takes turns moving on the 8×8 board. The goal is checkmate — trapping the opponent\'s king so it is attacked and cannot escape. White moves first.' },
        { q: 'What is castling?', a: 'Under the right conditions the king and a rook move together: the king slides two squares toward the rook and the rook jumps to the square beside the king. It is the only move that moves two pieces at once, and it tucks the king into safety.' },
        { q: 'What is en passant?', a: 'When an enemy pawn rushes two squares forward and lands beside your pawn, you may capture it as if it had moved only one square. It is the only rule where you capture a piece on a square it did not land on.' },
        { q: 'How does promotion work?', a: 'When a pawn reaches the far rank it must be promoted to a queen, rook, bishop or knight — almost always a queen. YiBoard auto-promotes to queen.' },
        { q: 'Can I play Chess online for free?', a: 'Yes. On YiBoard, open /chess to play free against AI with several difficulty levels — no signup required.' },
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
    name: isZh ? '国际象棋 – 弈界 YiBoard' : 'Chess – YiBoard',
    description: isZh ? '免费在线国际象棋对战，含多档难度 AI。' : 'Free online Chess with AI opponents at several difficulty levels.',
    url: `/${locale}/chess`,
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-8)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="yb-h2">{isZh ? '国际象棋（Chess）' : 'Chess'}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-2)', maxWidth: '60ch' }}>
          {isZh
            ? '最经典的策略棋类。把对方的王逼入绝境：王车易位保平安，吃过路兵藏杀机，小兵冲到底线摇身一变成皇后。'
            : 'The classic strategy game. Corner the enemy king: castle to safety, spring an en passant capture, and watch a humble pawn become a queen at the back rank.'}
        </p>
      </header>

      <ChessGame locale={locale} variant="full" />

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 720 }}>
        <h2 className="yb-h3">{isZh ? '基本规则' : 'Basic Rules'}</h2>
        <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-5)', lineHeight: 1.8 }}>
          {isZh ? (
            <>
              <li><strong>交替走子</strong>：白方先行，每回合走一枚棋子到合法格。</li>
              <li><strong>棋子走法</strong>：兵直进斜吃、马走日、象走斜线、车走直线、后兼顾车象、王走一格。</li>
              <li><strong>王车易位</strong>：王与车在满足条件时可一次走完，把王转移到安全角落。</li>
              <li><strong>吃过路兵</strong>：对方兵冲两格掠过你相邻兵时，可立即将其吃掉。</li>
              <li><strong>升变与将死</strong>：兵到底线升变为后；让对方王被将军且无法化解即获胜。</li>
            </>
          ) : (
            <>
              <li><strong>Alternate turns</strong>: White moves first; each turn you move one piece to a legal square.</li>
              <li><strong>How pieces move</strong>: pawns advance straight and capture diagonally, knights jump in an L, bishops slide diagonally, rooks slide orthogonally, the queen does both, the king moves one square.</li>
              <li><strong>Castling</strong>: Under the right conditions the king and a rook move together, tucking the king into safety.</li>
              <li><strong>En passant</strong>: If an enemy pawn rushes two squares past your adjacent pawn, you may capture it immediately.</li>
              <li><strong>Promotion and checkmate</strong>: A pawn reaching the far rank becomes a queen; you win by checkmating the enemy king.</li>
            </>
          )}
        </ul>
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
          <Link href="/chess-rules" style={{ color: 'var(--accent)' }}>{isZh ? '查看完整规则与术语 →' : 'Read the full rules & terms →'}</Link>
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
