import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localeAlternates } from '@/i18n/metadata'
import { XIANGQI_OPENINGS } from '@/lib/xiangqi/openings'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  const count = XIANGQI_OPENINGS.length
  return {
    title: isZh ? `象棋开局库：${count} 种主流布局详解` : `Xiangqi Openings: ${count} Main Opening Systems Explained`,
    description: isZh
      ? `当头炮、屏风马、顺炮、列手炮、仙人指路……逐一详解 ${count} 种象棋开局的标准记谱、战略思路与常见应手。`
      : `Central Cannon, Screen Horses, Identical Cannons, Adjacent Soldier and more — each of the ${count} Xiangqi openings explained with notation, strategy, and common replies.`,
    alternates: localeAlternates('xiangqi/openings', locale),
    openGraph: {
      title: isZh ? '象棋开局库' : 'Xiangqi Openings',
      description: isZh ? `${count} 种主流象棋开局详解。` : `${count} main Xiangqi opening systems explained.`,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '象棋开局库' : 'Xiangqi Openings',
      description: isZh ? `${count} 种主流象棋开局详解。` : `${count} main Xiangqi opening systems explained.`,
      images: ['/og.png'],
    },
  }
}

export const revalidate = 3600

export default async function XiangqiOpeningsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const isZh = locale === 'zh'
  const count = XIANGQI_OPENINGS.length

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: XIANGQI_OPENINGS.length,
    itemListElement: XIANGQI_OPENINGS.map((o, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `/${locale === 'en' ? '' : locale + '/'}${'xiangqi/openings/'}${o.slug}`,
      name: isZh ? o.nameZh : o.nameEn,
    })),
  }

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <header style={{ maxWidth: '64ch' }}>
        <h1 className="yb-h2">{isZh ? '象棋开局库' : 'Xiangqi Openings' }</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {isZh
            ? `开局决定中局走向。下面汇总 ${count} 种主流象棋开局，每个都有独立详解页，包含标准记谱、战略思路与常见应手。`
            : `The opening shapes the middlegame. Here are ${count} main Xiangqi opening systems — each has its own page with notation, strategic ideas, and common replies.`}
        </p>
      </header>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)' }}>
          {XIANGQI_OPENINGS.map((o) => (
            <Link
              key={o.slug}
              href={`/xiangqi/openings/${o.slug}`}
              className="yb-card"
              style={{
                padding: 'var(--card-pad)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                textDecoration: 'none',
                color: 'var(--fg)',
              }}
            >
              <span>
                <strong style={{ fontSize: 'var(--text-base)' }}>{isZh ? o.nameZh : o.nameEn}</strong>
                <span style={{ display: 'block', marginTop: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)', fontFamily: 'var(--font-display)' }}>
                  {o.movesZh}
                </span>
                <span style={{ display: 'block', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)', lineHeight: 1.6 }}>
                  {isZh ? o.summaryZh : o.summaryEn}
                </span>
              </span>
              <span aria-hidden style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <Link href="/learn-xiangqi" className="yb-btn yb-btn-outline">{isZh ? '← 返回象棋学习指南' : '← Back to Learn Xiangqi'}</Link>
        <Link href="/xiangqi" className="yb-btn yb-btn-primary" style={{ marginLeft: 'var(--space-3)' }}>
          {isZh ? '免费下象棋 →' : 'Play Xiangqi Free →'}
        </Link>
      </section>
    </div>
  )
}
