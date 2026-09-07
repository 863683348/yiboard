import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { SquaresFour, Stack, PuzzlePiece, Target, BookOpen, Question } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Meta = { title: string; description: string; keywords: string };
type Row = { k: string; gomoku: string; other: string };
type Compare = { head: string; other: string; rows: Row[]; note: string };
type FaqItem = { q: string; a: string };
type Content = {
  meta: Meta;
  h1: string;
  lead: string;
  xiangqi: Compare;
  chess: Compare;
  go: Compare;
  faq: FaqItem[];
  conclusion: string;
  cta: string;
};

const EN: Content = {
  meta: {
    title: 'Gomoku vs Xiangqi vs Chess — How Do They Compare?',
    description:
      'Compare gomoku with Xiangqi (Chinese chess) and international chess. Boards, pieces, captures, win conditions, and how long each game takes.',
    keywords: 'gomoku vs xiangqi, gomoku vs chinese chess, gomoku vs chess, five in a row vs xiangqi, gomoku vs weiqi',
  },
  h1: 'Gomoku vs Xiangqi vs Chess',
  lead: 'Gomoku, Xiangqi, and chess all use pieces on a board, but they play nothing alike. Here is how gomoku stacks up against Chinese chess and international chess.',
  xiangqi: {
    head: 'Gomoku vs Xiangqi',
    other: 'Xiangqi (Chinese Chess)',
    rows: [
      { k: 'Board', gomoku: '15×15 intersections', other: '9×10 grid with a river' },
      { k: 'Pieces', gomoku: 'One type, single color', other: 'Seven types (general, advisor, elephant, horse, chariot, cannon, soldier)' },
      { k: 'Captures', gomoku: 'No captures — stones stay', other: 'Capture by moving onto an enemy piece' },
      { k: 'Win condition', gomoku: 'Five in a row', other: 'Checkmate the general' },
      { k: 'Game length', gomoku: '5–20 minutes', other: '20–60 minutes' },
    ],
    note: 'Xiangqi is a full army simulation with distinct pieces; gomoku is a pure line-formation puzzle.',
  },
  chess: {
    head: 'Gomoku vs International Chess',
    other: 'International Chess',
    rows: [
      { k: 'Board', gomoku: '15×15 intersections', other: '8×8 squares' },
      { k: 'Pieces', gomoku: 'One type, single color', other: 'Six types (king, queen, rook, bishop, knight, pawn)' },
      { k: 'Captures', gomoku: 'No captures', other: 'Capture by replacement' },
      { k: 'Win condition', gomoku: 'Five in a row', other: 'Checkmate the king' },
      { k: 'Game length', gomoku: '5–20 minutes', other: '30–90 minutes' },
    ],
    note: 'Chess and xiangqi share the checkmate goal; gomoku replaces it with a simpler connect-five objective.',
  },
  go: {
    head: 'Gomoku vs Go (Weiqi)',
    other: 'Go (Weiqi)',
    rows: [
      { k: 'Board', gomoku: '15×15 intersections', other: '19×19 intersections' },
      { k: 'Pieces', gomoku: 'One type, single color', other: 'One type, two colors (black/white)' },
      { k: 'Captures', gomoku: 'No captures', other: 'Stones are captured and removed' },
      { k: 'Win condition', gomoku: 'Five in a row', other: 'Surround more territory' },
      { k: 'Game length', gomoku: '5–20 minutes', other: '30–120+ minutes' },
    ],
    note: 'Go is the deeper ancestor of gomoku-style line play, but scales to a far larger board and territory game.',
  },
  faq: [
    { q: 'Is gomoku similar to Xiangqi?', a: 'Only on the surface — both use boards and pieces in East Asia. But gomoku has one piece type and a five-in-a-row goal, while xiangqi has seven piece types and a checkmate goal.' },
    { q: 'Which is easier, gomoku or Xiangqi?', a: 'Gomoku is far easier: minutes to learn. Xiangqi takes longer because each piece moves differently.' },
    { q: 'Can gomoku help me learn Xiangqi or chess?', a: 'It builds line-reading and pattern habits, but the piece-specific rules of xiangqi and chess are separate skills.' },
    { q: 'Why does gomoku have no captures while xiangqi and chess do?', a: 'Gomoku is won by forming a line, not by removing enemy pieces, so captures are unnecessary.' },
    { q: 'Is gomoku related to Go?', a: 'Loosely. Both place stones on intersections, but Go is about surrounding territory and capturing, while gomoku is about a single five-in-a-row line.' },
  ],
  conclusion:
    'If you want a fast, easy-to-learn game, gomoku wins on accessibility; xiangqi and chess reward deeper study with richer piece strategy.',
  cta: 'Play Gomoku Free',
};

const ZH: Content = {
  meta: {
    title: '五子棋 vs 象棋 vs 国际象棋 — 区别在哪？',
    description:
      '对比五子棋与象棋（中国象棋）、国际象棋。棋盘、棋子、吃子、胜负条件与单局时长，一眼看清三者差异。',
    keywords: '五子棋 vs 象棋, 五子棋 vs 中国象棋, 五子棋 vs 国际象棋, 五子连珠对比象棋',
  },
  h1: '五子棋 vs 象棋 vs 国际象棋',
  lead: '五子棋、象棋、国际象棋都在棋盘上摆子，但玩法截然不同。下面看看五子棋与中国象棋、国际象棋分别怎么比。',
  xiangqi: {
    head: '五子棋 vs 象棋',
    other: '中国象棋',
    rows: [
      { k: '棋盘', gomoku: '15×15 路', other: '9×10 格带楚河汉界' },
      { k: '棋子', gomoku: '一种棋子，单色', other: '七种（将、士、象、马、車、炮、兵）' },
      { k: '吃子', gomoku: '不吃子，棋子不动', other: '走到对方棋子位置即吃子' },
      { k: '胜负', gomoku: '五子连珠', other: '将死对方将帅' },
      { k: '单局时长', gomoku: '5–20 分钟', other: '20–60 分钟' },
    ],
    note: '象棋是多种兵种的战场模拟；五子棋是纯粹的连线博弈。',
  },
  chess: {
    head: '五子棋 vs 国际象棋',
    other: '国际象棋',
    rows: [
      { k: '棋盘', gomoku: '15×15 路', other: '8×8 方格' },
      { k: '棋子', gomoku: '一种棋子，单色', other: '六种（王、后、车、象、马、兵）' },
      { k: '吃子', gomoku: '不吃子', other: '走到对方棋子位置吃子' },
      { k: '胜负', gomoku: '五子连珠', other: '将死对方王' },
      { k: '单局时长', gomoku: '5–20 分钟', other: '30–90 分钟' },
    ],
    note: '国际象棋与象棋都以将死为目标；五子棋用更简单的连五取胜。',
  },
  go: {
    head: '五子棋 vs 围棋',
    other: '围棋',
    rows: [
      { k: '棋盘', gomoku: '15×15 路', other: '19×19 路' },
      { k: '棋子', gomoku: '一种，单色', other: '一种，双色（黑/白）' },
      { k: '吃子', gomoku: '不吃子', other: '可提子并移除' },
      { k: '胜负', gomoku: '五子连珠', other: '围地多者胜' },
      { k: '单局时长', gomoku: '5–20 分钟', other: '30–120 分钟以上' },
    ],
    note: '围棋是五子棋式连线博弈的深远源头，但棋盘更大、以围地为核心。',
  },
  faq: [
    { q: '五子棋和象棋像吗？', a: '只是表面像——都来自东亚、都在棋盘上摆子。但五子棋只有一种棋子、目标是五子连珠，象棋有七种棋子、目标是将死。' },
    { q: '五子棋和象棋哪个好学？', a: '五子棋简单得多：几分钟就能上手。象棋每种棋子走法不同，需要更长时间。' },
    { q: '下五子棋有助于学象棋或国际象棋吗？', a: '能培养连线与棋形直觉，但象棋/国际象棋各自的兵种规则是独立技能。' },
    { q: '为什么五子棋不吃子，而象棋和国际象棋吃子？', a: '五子棋靠连成一线取胜，不需要移除对方棋子，因此无需吃子规则。' },
    { q: '五子棋和围棋有关系吗？', a: '有松散关联。两者都在交叉点落子，但围棋以围地和提子为核心，五子棋只求一条五子连线。' },
  ],
  conclusion: '想找一款上手快、易学习的游戏，五子棋在可达性上胜出；象棋和国际象棋则以更丰富的兵种策略回报深度钻研。',
  cta: '免费玩五子棋',
};

const PATH = '/gomoku-vs-xiangqi';

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
    alternates: localeAlternates('gomoku-vs-xiangqi', locale),
  };
}

export const revalidate = 86400;

export default async function GomokuVsXiangqiPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const c = LOC(locale) === 'zh' ? ZH : EN;
  const lang = LOC(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.meta.title,
    description: c.meta.description,
    datePublished: '2026-09-07',
    inLanguage: lang,
    author: { '@type': 'Organization', name: 'YiBoard' },
    publisher: { '@type': 'Organization', name: 'YiBoard' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://yiboardgame.com${PATH}` },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const compares: Array<{ icon: ReactNode; data: Compare }> = [
    { icon: <Stack size={18} weight="bold" aria-hidden />, data: c.xiangqi },
    { icon: <PuzzlePiece size={18} weight="bold" aria-hidden />, data: c.chess },
    { icon: <SquaresFour size={18} weight="bold" aria-hidden />, data: c.go },
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

      {compares.map((s) => (
        <section key={s.data.head} className="yb-section" style={{ maxWidth: 760 }}>
          <SectionHead icon={s.icon} title={s.data.head} />
          <article className="yb-card" style={{ padding: 'var(--card-pad)' }}>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)', marginBottom: 'var(--space-4)' }}>
              {lang === 'zh' ? `对比对象：${s.data.other}` : `Versus ${s.data.other}`}
            </p>
            <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
              {s.data.rows.map((row) => (
                <div
                  key={row.k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-2)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--fg)',
                  }}
                >
                  <span style={{ color: 'var(--fg-2)', fontWeight: 'var(--weight-emphasis)' }}>{row.k}</span>
                  <span>
                    <strong style={{ color: 'var(--accent)' }}>{lang === 'zh' ? '五子棋' : 'Gomoku'}:</strong> {row.gomoku}
                    <br />
                    <strong>{s.data.other}:</strong> {row.other}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 'var(--space-4)', marginBottom: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
              {s.data.note}
            </p>
          </article>
        </section>
      ))}

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<Target size={18} weight="bold" aria-hidden />} title={lang === 'zh' ? '结论' : 'Bottom Line'} />
        <div className="yb-card" style={{ padding: 'var(--card-pad)' }}>
          <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--fg)' }}>{c.conclusion}</p>
        </div>
      </section>

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<Question size={18} weight="bold" aria-hidden />} title={lang === 'zh' ? '常见问题' : 'FAQ'} />
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {c.faq.map((f) => (
            <div key={f.q} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
              <p style={{ margin: 0, fontWeight: 'var(--weight-emphasis)', color: 'var(--fg)' }}>{f.q}</p>
              <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead icon={<BookOpen size={18} weight="bold" aria-hidden />} title={lang === 'zh' ? '相关指南' : 'Related guides'} />
        <div className="yb-grid yb-grid-1" style={{ gap: 'var(--space-3)' }}>
          <RelatedLink href="/gomoku-rules" label={lang === 'zh' ? '五子棋规则' : 'Gomoku rules'} />
          <RelatedLink href="/xiangqi" label={lang === 'zh' ? '免费在线玩象棋' : 'Play Xiangqi online free'} />
          <RelatedLink href="/go" label={lang === 'zh' ? '免费在线玩围棋' : 'Play Go online free'} />
          <RelatedLink href="/chess" label={lang === 'zh' ? '免费在线玩国际象棋' : 'Play Chess online free'} />
          <RelatedLink href="/how-to" label={lang === 'zh' ? '快速玩法说明' : 'How to play'} />
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
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
