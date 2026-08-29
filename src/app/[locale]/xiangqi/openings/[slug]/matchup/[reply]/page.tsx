import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localeAlternates } from '@/i18n/metadata'
import {
  XIANGQI_OPENINGS,
  getMatchup,
  localized,
  slugify,
  type XiangqiLocale,
} from '@/lib/xiangqi/openings'

export const revalidate = 3600

export function generateStaticParams() {
  const out: { slug: string; reply: string }[] = []
  for (const o of XIANGQI_OPENINGS) {
    for (const r of o.replies) {
      out.push({ slug: o.slug, reply: slugify(r.name.en ?? '') })
    }
  }
  return out
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; reply: string }>
}): Promise<Metadata> {
  const { locale, slug, reply } = await params
  const m = getMatchup(slug, reply)
  if (!m) return {}
  const loc = locale as XiangqiLocale
  const oName = localized(m.opening.name, loc)
  const rName = localized(m.reply.name, loc)
  const title = `${oName} vs ${rName}`
  const description = localized(m.reply.note, loc)
  const path = `xiangqi/openings/${slug}/matchup/${reply}`
  return {
    title: `${title} — Xiangqi Opening Matchup`,
    description,
    alternates: localeAlternates(path, locale),
    openGraph: { title: `${title} — Xiangqi Opening Matchup`, description, images: [{ url: '/og.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${title} — Xiangqi Opening Matchup`, description, images: ['/og.png'] },
  }
}

export default async function XiangqiMatchupPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; reply: string }>
}) {
  const { locale, slug, reply } = await params
  setRequestLocale(locale)
  const m = getMatchup(slug, reply)
  if (!m) notFound()
  const isZh = locale === 'zh'
  const loc = locale as XiangqiLocale
  const opening = m.opening
  const replyName = localized(m.reply.name, loc)
  const openingName = localized(opening.name, loc)
  const matchupPath = `/xiangqi/openings/${slug}/matchup/${reply}`

  // Other replies of the same opening → other matchup pages (internal hub).
  const otherReplies = opening.replies
    .filter((r) => slugify(r.name.en ?? '') !== reply)
    .map((r) => ({ name: localized(r.name, loc), slug: slugify(r.name.en ?? '') }))

  // Same-category openings for related links.
  const sameCat = XIANGQI_OPENINGS.filter((o) => o.category === opening.category && o.slug !== opening.slug).slice(0, 4)

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opening.faq.map((f) => ({
      '@type': 'Question',
      name: localized(f.q, loc),
      acceptedAnswer: { '@type': 'Answer', text: localized(f.a, loc) },
    })),
  }

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-xs)', color: 'var(--fg-2)' }}>
        <Link href="/" style={{ textDecoration: 'underline' }}>YiBoard</Link>
        {' › '}
        <Link href="/xiangqi/openings" style={{ textDecoration: 'underline' }}>{isZh ? '开局库' : 'Openings'}</Link>
        {' › '}
        <Link href={`/xiangqi/openings/${slug}`} style={{ textDecoration: 'underline' }}>{openingName}</Link>
        {' › '}
        <span>{replyName}</span>
      </nav>

      <header style={{ maxWidth: '64ch' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          <Link href={`/xiangqi/openings/${slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>← {openingName}</Link>
        </p>
        <h1 className="yb-h2">{isZh ? `${openingName} 对 ${replyName}` : `${openingName} vs ${replyName}`}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>{localized(opening.summary, loc)}</p>
      </header>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? `${replyName}：黑方的应法` : `${replyName}: Black's Reply`}</h2>
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--fg-2)', lineHeight: 1.8 }}>{localized(m.reply.note, loc)}</p>
      </section>

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '战略背景' : 'Strategic Context'}</h2>
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--fg-2)', lineHeight: 1.8 }}>{localized(opening.strategy, loc)}</p>
      </section>

      {otherReplies.length > 0 && (
        <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
          <h2 className="yb-h3">{isZh ? `${openingName}的其他应法` : `Other replies to ${openingName}`}</h2>
          <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
            {otherReplies.map((r) => (
              <Link
                key={r.slug}
                href={`/xiangqi/openings/${slug}/matchup/${r.slug}`}
                className="yb-card"
                style={{ padding: 'var(--card-pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--fg)' }}
              >
                <span><strong style={{ fontSize: 'var(--text-base)' }}>{isZh ? `${openingName} 对 ${r.name}` : `${openingName} vs ${r.name}`}</strong></span>
                <span aria-hidden style={{ color: 'var(--accent)' }}>→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {sameCat.length > 0 && (
        <section style={{ marginTop: 'var(--space-10)', maxWidth: 820 }}>
          <h2 className="yb-h3">{isZh ? '同类开局' : 'Related Openings'}</h2>
          <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
            {sameCat.map((o) => (
              <Link
                key={o.slug}
                href={`/xiangqi/openings/${o.slug}`}
                className="yb-card"
                style={{ padding: 'var(--card-pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--fg)' }}
              >
                <span><strong style={{ fontSize: 'var(--text-base)' }}>{localized(o.name, loc)}</strong> <span style={{ marginLeft: 'var(--space-2)', fontFamily: 'var(--font-display)' }}>{o.movesZh}</span></span>
                <span aria-hidden style={{ color: 'var(--accent)' }}>→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <Link href="/learn-xiangqi" className="yb-btn yb-btn-outline">{isZh ? '← 学习指南' : '← Learn Xiangqi'}</Link>
        <Link href="/xiangqi" className="yb-btn yb-btn-primary" style={{ marginLeft: 'var(--space-3)' }}>
          {isZh ? '免费下象棋 →' : 'Play Xiangqi Free →'}
        </Link>
      </section>
    </div>
  )
}
