import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localeAlternates } from '@/i18n/metadata'
import { XIANGQI_OPENINGS, localized, type XiangqiLocale } from '@/lib/xiangqi/openings'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  return {
    title: isZh ? '象棋入门完全指南：规则、战术与开局' : 'Learn Xiangqi: Rules, Tactics & Openings — Complete Guide',
    description: isZh
      ? '从零学会中国象棋：棋盘与七种棋子、走法规则、基本杀法、开局体系（当头炮、屏风马等），并可直接在线对战 AI。'
      : 'Learn Xiangqi (Chinese Chess) from scratch: the board and seven pieces, movement rules, basic checkmate patterns, and opening systems like Central Cannon and Screen Horses. Play free vs AI.',
    alternates: localeAlternates('learn-xiangqi', locale),
    openGraph: {
      title: isZh ? '象棋入门完全指南' : 'Learn Xiangqi — Complete Guide',
      description: isZh ? '规则、战术、开局体系，一篇讲透中国象棋。' : 'Rules, tactics, and opening systems — everything about Chinese Chess.',
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '象棋入门完全指南' : 'Learn Xiangqi — Complete Guide',
      description: isZh ? '规则、战术、开局体系，一篇讲透中国象棋。' : 'Rules, tactics, and opening systems — everything about Chinese Chess.',
      images: ['/og.png'],
    },
  }
}

export const revalidate = 3600

export default async function LearnXiangqiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const isZh = locale === 'zh'
  const loc = locale as XiangqiLocale

  const faqItems = isZh
    ? [
        { q: '象棋难学吗？', a: '不难。棋子走法都有规律：车走直线、马走日、炮隔子吃、兵过河可横走。半小时就能学会基本规则，之后靠练习提高。' },
        { q: '象棋和国际象棋哪个更难？', a: '各有难点。象棋的炮（隔子吃）和将帅不能对面是独特规则；国际象棋的后攻击力更强。多数人觉得两者难度相当。' },
        { q: '新手该学哪种开局？', a: '建议先学当头炮（炮二平五）——直观、攻守兼顾；对手常用屏风马应对。掌握这两套后，再学仙人指路、飞相局等。' },
        { q: '在哪里可以免费下象棋？', a: '在 YiBoard 打开 /xiangqi 即可免费与 AI 对战，无需注册、无需下载，支持多种难度。' },
      ]
    : [
        { q: 'Is Xiangqi hard to learn?', a: 'Not at all. Each piece moves by a clear rule: the chariot moves in straight lines, the horse in an L, the cannon captures by jumping a screen, and the soldier moves sideways after crossing the river. You can learn the basics in half an hour.' },
        { q: 'Is Xiangqi harder than international chess?', a: 'They are different. Xiangqi\'s cannon (which captures by jumping) and the rule that the two generals may not face each other are unique; international chess has a stronger queen. Most players find the difficulty comparable.' },
        { q: 'Which opening should a beginner learn first?', a: 'Start with the Central Cannon (炮二平五) — it is intuitive and balanced. The usual reply is Screen Horses. Once you know both, explore Adjacent Soldier and Flying Elephant.' },
        { q: 'Where can I play Xiangqi for free?', a: 'On YiBoard, open /xiangqi to play free against AI — no signup, no download, with several difficulty levels.' },
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

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isZh ? '如何下中国象棋' : 'How to Play Xiangqi',
    description: isZh
      ? '从摆棋到将死对方将帅的完整步骤。'
      : 'Complete steps from setting up the board to checkmating the enemy general.',
    totalTime: 'PT10M',
    supply: [
      { '@type': 'HowToSupply', name: isZh ? '象棋棋盘（9×10 格线）' : 'Xiangqi board (9×10 grid)' },
      { '@type': 'HowToSupply', name: isZh ? '红黑棋子各 16 枚' : '16 red and 16 black pieces' },
    ],
    step: [
      { '@type': 'HowToStep', name: isZh ? '摆好棋子' : 'Set up the pieces', text: isZh ? '将、士、象、马、车、炮、兵按九宫与河界摆放到初始位置。' : 'Place the general, advisors, elephants, horses, chariots, cannons, and soldiers on their starting points.' },
      { '@type': 'HowToStep', name: isZh ? '红方先走' : 'Red moves first', text: isZh ? '每回合走一枚棋子，红方先行。' : 'Each turn move one piece; Red always moves first.' },
      { '@type': 'HowToStep', name: isZh ? '按规则走子' : 'Move by the rules', text: isZh ? '车走直线、马走日、炮隔一子吃、兵过河后可横走。' : 'Chariots move straight, horses in an L, cannons capture by jumping one screen, soldiers move sideways after crossing the river.' },
      { '@type': 'HowToStep', name: isZh ? '将死对方' : 'Checkmate', text: isZh ? '当对方将帅被将军且无法逃脱（不能走、不能挡、不能吃），即获胜。' : 'Win by checkmating the enemy general — putting it in check with no legal escape.' },
    ],
  }

  const pieces = isZh
    ? [
        { name: '将 / 帅', role: '统帅，在九宫内一步一格，不能出宫，也不能与对方将帅在同一直线上无子相对。' },
        { name: '士 / 仕', role: '卫士，在九宫内斜走一格，护将。' },
        { name: '象 / 相', role: '防守，走田字对角两格，不过河，中心被塞则不能走。' },
        { name: '马', role: '骑兵，走日字，相邻点有子（蹩马腿）则不能走。' },
        { name: '车', role: '战车，横竖任意格数，不能越子，威力最大。' },
        { name: '炮', role: '远程火力，移动同车，吃子必须隔一个棋子（炮架）。' },
        { name: '兵 / 卒', role: '步兵，未过河只能前进，过河后可横走，永不后退。' },
      ]
    : [
        { name: 'General (將/帥)', role: 'The commander. Moves one step orthogonally inside the palace and may never face the enemy general on an open file.' },
        { name: 'Advisor (士/仕)', role: 'The guard. Moves one step diagonally inside the palace.' },
        { name: 'Elephant (象/相)', role: 'Defence. Moves two squares diagonally (the "田"), cannot cross the river, blocked if the centre is occupied.' },
        { name: 'Horse (馬)', role: 'Cavalry. Moves in an L; blocked if the adjacent orthogonal point is occupied ("hobbled leg").' },
        { name: 'Chariot (車)', role: 'The rook. Moves any number of squares orthogonally, cannot jump — the most powerful piece.' },
        { name: 'Cannon (炮/砲)', role: 'Ranged attacker. Moves like a chariot but captures by jumping exactly one screen piece.' },
        { name: 'Soldier (兵/卒)', role: 'Infantry. Moves one step forward; after crossing the river may also move sideways; never backward.' },
      ]

  const tactics = isZh
    ? [
        { name: '马后炮', desc: '马控制将的 escape，炮在马后一线将死。最经典的杀法之一。' },
        { name: '重炮', desc: '双炮在同一直线上重叠，前炮作"炮架"、后炮将死。' },
        { name: '双车错', desc: '两辆车交替在纵/横线上叫将，对方将帅无处可逃。' },
        { name: '闷宫', desc: '利用对方士（仕）自塞将门，以炮将死，称为"闷杀"。' },
      ]
    : [
        { name: 'Horse-and-Cannon (马后炮)', desc: 'The horse controls the general\'s escape squares while the cannon behind it delivers checkmate. A classic pattern.' },
        { name: 'Double Cannons (重炮)', desc: 'Two cannons line up on the same file; the front cannon acts as the screen for the rear cannon\'s mate.' },
        { name: 'Twin Chariots (双车错)', desc: 'Two chariots alternate checks along ranks and files until the general has no escape.' },
        { name: 'Smothered Palace (闷宫)', desc: 'The enemy advisor blocks its own general\'s gate, allowing a cannon to deliver a "smothered" mate.' },
      ]

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />

      <header style={{ maxWidth: '64ch' }}>
        <h1 className="yb-h2">{isZh ? '象棋入门完全指南' : 'Learn Xiangqi (Chinese Chess)'}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {isZh
            ? '一条楚河汉界把棋盘分成两半。炮要隔子吃、马走日、象走田、将帅不能对面。本指南带你从认棋子到学会基本杀法，再了解主流开局体系——然后直接去 /xiangqi 和 AI 对一局。'
            : 'A river splits the board in two. Cannons capture by jumping a screen, horses move in an L, elephants in a diagonal, and the two generals may never face each other. This guide takes you from the pieces to basic checkmates and the main opening systems — then play a game at /xiangqi.'}
        </p>
      </header>

      {/* ---------------- 棋盘与棋子 ---------------- */}
      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '棋盘与七种棋子' : 'The Board and Seven Pieces'}</h2>
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--fg-2)', lineHeight: 1.8 }}>
          {isZh
            ? '象棋在 9×10 的格线上进行，中间一道"楚河汉界"把棋盘分为红黑两方。每方 16 枚棋子，共有七种。'
            : 'Xiangqi is played on a 9×10 grid divided by a "river". Each side has 16 pieces of seven kinds.'}
        </p>
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          {pieces.map((p) => (
            <article key={p.name} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)', margin: 0 }}>{p.name}</h3>
              <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: 0 }}>{p.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- 开局体系（聚类 hub） ---------------- */}
      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '主流开局体系' : 'Main Opening Systems'}</h2>
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--fg-2)', lineHeight: 1.8 }}>
          {isZh
            ? '开局决定中局走向。下面每个开局都有独立的详解页，包含记谱、战略思路与常见应手。'
            : 'The opening shapes the middlegame. Each system below has its own page with notation, strategic ideas, and common replies.'}
        </p>
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          {XIANGQI_OPENINGS.map((o) => (
            <Link
              key={o.slug}
              href={`/xiangqi/openings/${o.slug}`}
              className="yb-card"
              style={{
                padding: 'var(--card-pad)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'var(--fg)',
              }}
            >
              <span>
                <strong style={{ fontSize: 'var(--text-base)' }}>{localized(o.name, loc)}</strong>
                <span style={{ display: 'block', marginTop: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
                  {o.movesZh}
                </span>
              </span>
              <span aria-hidden style={{ color: 'var(--accent)' }}>→</span>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
          <Link href="/xiangqi/openings" style={{ color: 'var(--accent)' }}>
            {isZh ? '查看全部开局总览 →' : 'See the full openings index →'}
          </Link>
        </p>
      </section>

      {/* ---------------- 基本杀法 ---------------- */}
      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '基本杀法' : 'Basic Checkmate Patterns' }</h2>
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          {tactics.map((t) => (
            <article key={t.name} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)', margin: 0 }}>{t.name}</h3>
              <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: 0 }}>{t.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- 与国际象棋对比 ---------------- */}
      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <h2 className="yb-h3">{isZh ? '象棋与国际象棋' : 'Xiangqi vs International Chess' }</h2>
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--fg-2)', lineHeight: 1.8 }}>
          {isZh
            ? '两者都是两人对弈的皇家棋类，但差别明显：象棋用 9×10 棋盘和七种棋子，炮必须隔子吃，马有蹩腿，将帅不能对面，且没有"后"这种超强子力。想直接对战，打开 /xiangqi 即可。'
            : 'Both are two-player royal games, but the differences are clear: Xiangqi uses a 9×10 board and seven piece types, the cannon captures by jumping a screen, the horse can be blocked, and the generals may not face each other — and there is no queen-like super-piece. To play right away, open /xiangqi.'}
        </p>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
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

      {/* ---------------- CTA ---------------- */}
      <section style={{ marginTop: 'var(--space-12)', maxWidth: 820 }}>
        <Link href="/xiangqi" className="yb-btn yb-btn-primary">{isZh ? '免费在线下象棋 →' : 'Play Xiangqi Free →'}</Link>
        <Link href="/xiangqi/openings" className="yb-btn yb-btn-outline" style={{ marginLeft: 'var(--space-3)' }}>
          {isZh ? '开局库' : 'Openings'}
        </Link>
      </section>
    </div>
  )
}
