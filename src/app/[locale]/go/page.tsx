import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localeAlternates } from '@/i18n/metadata'
import GoGame from '@/components/GoGame'
import { MoreGames } from '@/components/MoreGames'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  return {
    title: isZh ? '免费在线围棋 – 对战 AI' : 'Play Go (Weiqi) Online Free – vs AI',
    description: isZh
      ? '免费在线围棋（Weiqi/Go）。在 9×9、13×13 或 19×19 棋盘上挑战 AI，体验提子、打劫与围地。无需注册，即刻开局。'
      : 'Play Go (Weiqi) online for free. Challenge the AI on 9×9, 13×13 or 19×19 boards. Learn captures, ko and territory. No signup required.',
    alternates: localeAlternates('go', locale),
    openGraph: {
      title: isZh ? '免费在线围棋 – 对战 AI' : 'Play Go Online Free',
      description: isZh ? '免费在线围棋，对战 AI，学习规则。' : 'Play Go online free vs AI.',
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '免费在线围棋' : 'Play Go Online Free',
      description: isZh ? '围棋对战 AI，免费玩。' : 'Free Go vs AI.',
      images: ['/og.png'],
    },
  }
}

export const revalidate = 3600

export default async function GoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        { q: '围棋（Go/Weiqi）是什么？', a: '围棋是一种两人策略棋类，在 19×19（或 9×9/13×13）棋盘上进行。双方轮流在交叉点落子，以围住更多空地（领地）为目标。' },
        { q: '围棋和五子棋有什么区别？', a: '五子棋目标是连成五子；围棋通过围地和提子取胜，棋盘更大，策略更深，且棋子可以互吃。' },
        { q: '怎么才算赢围棋？', a: '双方连续停一手后进入数子。采用数子法：己方棋子 + 围住的空点更多者胜（标准 19×19 贴目 7.5 子）。' },
        { q: '什么是打劫（ko）？', a: '打劫是一种规则：你不能立即落子让棋盘回到刚被对方提子后的完全相同局面，必须先在别处下一手。' },
        { q: '可以免费在线玩围棋吗？', a: '可以。在 YiBoard 打开 /go 即可免费与 AI 对弈 9×9、13×13 或 19×19，无需注册。' },
      ]
    : [
        { q: 'What is Go (Weiqi)?', a: 'Go is a two-player strategy board game played on a 19×19 grid (or 9×9/13×13). Players take turns placing stones on intersections to surround more territory than the opponent.' },
        { q: 'How is Go different from Gomoku?', a: 'Gomoku aims for five in a row. Go is about surrounding territory and capturing stones on a much larger board, with deeper strategy.' },
        { q: 'How do you win at Go?', a: 'After two consecutive passes, scoring begins. Under area scoring, your score is your stones on the board plus the empty points you surround. The player with the higher score wins (7.5 komi for 19×19).' },
        { q: 'What is ko?', a: 'Ko is a rule preventing an immediate recapture that would recreate the exact previous board position. You must play elsewhere first before recapturing.' },
        { q: 'Can I play Go online for free?', a: 'Yes. On YiBoard, open /go to play free against AI on 9×9, 13×13 or 19×19 — no signup required.' },
      ]

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isZh ? '围棋 – 弈界 YiBoard' : 'Go – YiBoard',
    description: isZh ? '免费在线围棋对战，支持 9×9/13×13/19×19 与多种难度 AI。' : 'Free online Go with AI opponents on 9×9, 13×13 and 19×19 boards.',
    url: `/${locale}/go`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="yb-h2">
          {isZh ? '围棋（Go / Weiqi）' : 'Go (Weiqi / Baduk)'}
        </h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-2)', maxWidth: '60ch' }}>
          {isZh
            ? '世界上最古老的策略棋类之一。用黑白两子在棋盘上围地，提子与打劫让每一步都充满张力。'
            : 'One of the oldest strategy games in the world. Surround territory, capture stones, and master the ko rule.'}
        </p>
      </header>

      <GoGame locale={locale} variant="full" />

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 720 }}>
        <h2 className="yb-h3">{isZh ? '围棋基本规则' : 'Basic Rules'}</h2>
        <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-5)', lineHeight: 1.8 }}>
          {isZh ? (
            <>
              <li><strong>交替落子</strong>：黑棋先行，双方轮流在交叉点上放一枚棋子。</li>
              <li><strong>棋子与气</strong>：棋子通过直线相连，相邻空点就是气。没有气的棋块会被提掉。</li>
              <li><strong>打劫</strong>：被提的子不能立即在同一位置反提，需先在别处落子（找劫材）。</li>
              <li><strong>停一手</strong>：轮到你可以选择停一手（pass）。连续双方停一手后进入数子。</li>
              <li><strong>数子法</strong>：黑棋得分 = 黑子 + 黑围空地；白棋得分 = 白子 + 白围空地 + 贴目。</li>
            </>
          ) : (
            <>
              <li><strong>Alternate turns</strong>: Black moves first. Players take turns placing one stone on an empty intersection.</li>
              <li><strong>Liberties and capture</strong>: A stone or group stays alive as long as it has adjacent empty points. When it has none, it is captured and removed.</li>
              <li><strong>Ko</strong>: You cannot immediately recapture on the same point if it would recreate the exact previous board position.</li>
              <li><strong>Pass</strong>: You may pass your turn. After two consecutive passes, the game ends and scoring begins.</li>
              <li><strong>Area scoring</strong>: Your score = your stones on the board + the empty territory you surround. White gets komi (7.5 points on 19×19).</li>
            </>
          )}
        </ul>
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

      <MoreGames locale={locale} />
    </div>
  )
}
