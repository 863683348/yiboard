import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localeAlternates } from '@/i18n/metadata'
import { XIANGQI_OPENINGS, getXiangqiOpening } from '@/lib/xiangqi/openings'

export const revalidate = 3600

export function generateStaticParams() {
  return XIANGQI_OPENINGS.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const opening = getXiangqiOpening(slug)
  if (!opening) return {}
  const isZh = locale === 'zh'
  return {
    title: isZh ? `${opening.nameZh}：象棋开局详解` : `${opening.nameEn}: Xiangqi Opening Explained`,
    description: isZh ? opening.summaryZh : opening.summaryEn,
    alternates: localeAlternates(`xiangqi/openings/${slug}`, locale),
    openGraph: {
      title: isZh ? `${opening.nameZh}（象棋开局）` : `${opening.nameEn} (Xiangqi Opening)`,
      description: isZh ? opening.summaryZh : opening.summaryEn,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? `${opening.nameZh}（象棋开局）` : `${opening.nameEn} (Xiangqi Opening)`,
      description: isZh ? opening.summaryZh : opening.summaryEn,
      images: ['/og.png'],
    },
  }
}

export default async function XiangqiOpeningDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const opening = getXiangqiOpening(slug)
  if (!opening) notFound()
  const isZh = locale === 'zh'

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opening.faq.map((f) => ({
      '@type': 'Question',
      name: isZh ? f.qZh : f.qEn,
      acceptedAnswer: { '@type': 'Answer', text: isZh ? f.aZh : f.aEn },
    })),
  }

  const gameLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: isZh ? opening.nameZh : opening.nameEn,
    description: isZh ? opening.summaryZh : opening.summaryEn,
    genre: 'Board game',
    numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 2 },
    gameBoard: 'Xiangqi (9×10 grid)',
  }

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isZh ? `如何走出${opening.nameZh}` : `How to play the ${opening.nameEn}`,
    description: isZh ? opening.strategyZh : opening.strategyEn,
    totalTime: 'PT3M',
    step: [
      { '@type': 'HowToStep', name: isZh ? '摆好棋盘' : 'Set up the board', text: isZh ? '双方按初始位置摆好棋子，红方先走。' : 'Set up both armies on their start points; Red moves first.' },
      { '@type': 'HowToStep', name: isZh ? '红方起手' : 'Red\'s first move', text: isZh ? `红方走 ${opening.movesZh}。` : opening.movesEn },
      { '@type': 'HowToStep', name: isZh ? '黑方应对' : 'Black\'s reply', text: isZh ? `黑方常见应法：${opening.replies[0]?.nameZh ?? ''}。` : `Black often answers with ${opening.replies[0]?.nameEn ?? ''}.` },
      { '@type': 'HowToStep', name: isZh ? '继续出动大子' : 'Develop the major pieces', text: isZh ? '随后出车、跳马，按战略思路争夺局面。' : 'Then develop chariots and horses, contesting the position per the strategic plan.' },
    ],
  }

  const sameCat = XIANGQI_OPENINGS.filter((o) => o.category === opening.category && o.slug !== opening.slug)
  const otherCat = XIANGQI_OPENINGS.filter((o) => o.category !== opening.category && o.slug !== opening.slug)
  const related = [...sameCat, ...otherCat].slice(0, 4)

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />

      <header style={{ maxWidth: '64ch' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          <Link href="/xiangqi/openings" style={{ color: 'inherit', textDecoration: 'none' }}>← {isZh ? '开局库' : 'Openings'}</Link>
        </p>
        <h1 className="yb-h2">{isZh ? opening.nameZh : opening.nameEn}</h1>
        <p className="yb-num" style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-lg)', letterSpacing: '0.08em' }}>
          {opening.movesZh}
        </p>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>{isZh ? opening.summaryZh : opening.summaryEn}</p>
      </header>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '战略思路' : 'Strategic Ideas' }</h2>
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--fg-2)', lineHeight: 1.8 }}>{isZh ? opening.strategyZh : opening.strategyEn}</p>
      </section>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '常见应手' : 'Common Replies' }</h2>
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          {opening.replies.map((r) => (
            <article key={r.nameEn} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)', margin: 0 }}>{isZh ? r.nameZh : r.nameEn}</h3>
              <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: 0 }}>{isZh ? r.noteZh : r.noteEn}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '常见问题' : 'FAQ' }</h2>
        <dl style={{ marginTop: 'var(--space-3)', lineHeight: 1.8 }}>
          {opening.faq.map((f) => (
            <div key={f.qEn} style={{ marginBottom: 'var(--space-4)' }}>
              <dt style={{ fontWeight: 600 }}>{isZh ? f.qZh : f.qEn}</dt>
              <dd style={{ marginTop: 'var(--space-1)' }}>{isZh ? f.aZh : f.aEn}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '相关开局' : 'Related Openings' }</h2>
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          {related.map((o) => (
            <Link
              key={o.slug}
              href={`/xiangqi/openings/${o.slug}`}
              className="yb-card"
              style={{ padding: 'var(--card-pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--fg)' }}
            >
              <span><strong style={{ fontSize: 'var(--text-base)' }}>{isZh ? o.nameZh : o.nameEn}</strong> <span style={{ marginLeft: 'var(--space-2)', fontFamily: 'var(--font-display)' }}>{o.movesZh}</span></span>
              <span aria-hidden style={{ color: 'var(--accent)' }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <Link href="/learn-xiangqi" className="yb-btn yb-btn-outline">{isZh ? '← 学习指南' : '← Learn Xiangqi'}</Link>
        <Link href="/xiangqi" className="yb-btn yb-btn-primary" style={{ marginLeft: 'var(--space-3)' }}>
          {isZh ? '免费下象棋 →' : 'Play Xiangqi Free →'}
        </Link>
      </section>
    </div>
  )
}
