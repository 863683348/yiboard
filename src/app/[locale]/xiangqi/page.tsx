import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localeAlternates } from '@/i18n/metadata'
import XiangqiGame from '@/components/XiangqiGame'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  return {
    title: isZh ? '免费在线象棋 – 对战 AI' : 'Play Xiangqi (Chinese Chess) Online Free – vs AI',
    description: isZh
      ? '免费在线象棋（中国象棋）。选择难度与 AI 对战，学习楚河汉界、马走日象走田的走法规则。无需注册，即刻开局。'
      : 'Play Xiangqi (Chinese chess) online for free. Challenge the AI at various difficulties. Learn the rules of the river and the palace. No signup required.',
    alternates: localeAlternates('xiangqi', locale),
    openGraph: {
      title: isZh ? '免费在线象棋 – 对战 AI' : 'Play Xiangqi Online Free',
      description: isZh ? '免费在线象棋，对战 AI，学习规则。' : 'Play Chinese chess online free vs AI.',
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '免费在线象棋' : 'Play Xiangqi Online Free',
      description: isZh ? '象棋对战 AI，免费玩。' : 'Free Chinese chess vs AI.',
      images: ['/og.png'],
    },
  }
}

export const revalidate = 3600

export default async function XiangqiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const isZh = locale === 'zh'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isZh ? '象棋 – 弈界 YiBoard' : 'Xiangqi – YiBoard',
    description: isZh ? '免费在线象棋对战，支持多种难度 AI。' : 'Free online Chinese chess with AI opponents at various difficulties.',
    url: `/${locale}/xiangqi`,
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-8)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="yb-h2">
          {isZh ? '象棋（中国象棋）' : 'Xiangqi (Chinese Chess)'}
        </h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-2)', maxWidth: '60ch' }}>
          {isZh
            ? '一条楚河汉界把棋盘分成两半。炮要隔子才能吃，马走日象走田，将帅不能对面。红方先行，先把黑将将死获胜。'
            : 'A river splits the board in two. Cannons capture by jumping over a piece. Horses move in an L, elephants in a diagonal. Red moves first — checkmate the black general to win.'}
        </p>
      </header>

      <XiangqiGame variant="full" />

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 720 }}>
        <h2 className="yb-h3">{isZh ? '走法规则' : 'Rules'}</h2>
        <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-5)', lineHeight: 1.8 }}>
          {isZh ? (
            <>
              <li><strong>将/帅</strong>：在九宫内每一步横或竖走一格。两将不能在同一条竖线上中间无子相对。</li>
              <li><strong>士</strong>：在九宫内斜走一格。</li>
              <li><strong>象</strong>：走田字（对角两格），不能过河，有塞象眼时不能走。</li>
              <li><strong>马</strong>：走日字（先横或竖一格再斜走），有蹩马腿时不能走。</li>
              <li><strong>車</strong>：横竖任意格数，不能越子。</li>
              <li><strong>炮</strong>：移动同車，吃子必须隔一个棋子（炮架）。</li>
              <li><strong>兵/卒</strong>：未过河只能前进，过河后可横走，不能后退。</li>
            </>
          ) : (
            <>
              <li><strong>General (將/帥)</strong>: Moves one step orthogonally within the palace. Two generals cannot face each other on an open file.</li>
              <li><strong>Advisor (士)</strong>: Moves one step diagonally within the palace.</li>
              <li><strong>Elephant (象)</strong>: Moves two steps diagonally (the "田" character), cannot cross the river, blocked by a piece at the center.</li>
              <li><strong>Horse (馬)</strong>: Moves in an L-shape (one orthogonal then one diagonal), blocked if a piece occupies the adjacent orthogonal point.</li>
              <li><strong>Chariot (車)</strong>: Moves any number of steps orthogonally, cannot jump.</li>
              <li><strong>Cannon (炮/砲)</strong>: Moves like a chariot but captures by jumping over exactly one piece (the screen).</li>
              <li><strong>Soldier (兵/卒)</strong>: Moves one step forward. After crossing the river, can also move sideways. Never backward.</li>
            </>
          )}
        </ul>
      </section>
    </div>
  )
}
