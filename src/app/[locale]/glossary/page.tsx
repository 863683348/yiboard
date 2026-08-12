import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { BookOpen } from '@phosphor-icons/react/dist/ssr';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

type Meta = { title: string; description: string; keywords: string };
type Term = { en: string; zh: string; desc: string };
type Content = {
  meta: Meta;
  h1: string;
  lead: string;
  terms: Term[];
  cta: string;
};

const EN: Content = {
  meta: {
    title: 'Gomoku Glossary — Five in a Row Terminology',
    description:
      'A glossary of gomoku and renju terminology: five in a row, open four, broken three, double three, VCF, joseki, and more. Learn the language of five-in-a-row.',
    keywords: 'gomoku terms, five in a row terminology, renju glossary, gomoku glossary, gomoku vocabulary',
  },
  h1: 'Gomoku Glossary',
  lead: 'The vocabulary of five-in-a-row, from the winning shapes to the opening theory. Use it as a quick reference while you read our rules pages or study your own games.',
  terms: [
    { en: 'Five in a Row', zh: '五连', desc: 'A line of five stones — the winning shape in gomoku.' },
    { en: 'Open Four', zh: '活四', desc: 'Four stones with both ends open; unstoppable, wins on the next move.' },
    { en: 'Straight Four (Four)', zh: '冲四', desc: 'Four in a row with one open end; the opponent must block it immediately.' },
    { en: 'Open Three', zh: '活三', desc: 'A three that can become an open four on the next move.' },
    { en: 'Broken Three', zh: '眠三', desc: 'A three that needs a specific point to extend; lower priority than an open three.' },
    { en: 'Double Three', zh: '双三', desc: 'Two threes made at once — forbidden for Black under Renju.' },
    { en: 'Double Four', zh: '四四', desc: 'Two fours made at once — forbidden for Black under Renju.' },
    { en: 'Overline', zh: '长连', desc: 'Six or more stones in a row — forbidden for Black under Renju.' },
    { en: 'Forbidden Move', zh: '禁手', desc: 'A Renju move that Black is not allowed to play.' },
    { en: 'Sente', zh: '先手', desc: 'The initiative — the side forcing the opponent to reply.' },
    { en: 'Gote', zh: '后手', desc: 'Lack of initiative; being forced to respond to threats.' },
    { en: 'Opening', zh: '开局', desc: 'The first several moves that set the character of a game.' },
    { en: 'Pomegranate', zh: '花月', desc: 'A standard Renju direct opening (one of the balanced starts).' },
    { en: 'Paulownia', zh: '浦月', desc: 'A standard Renju direct opening, considered strong for Black.' },
    { en: 'Straight / Oblique', zh: '直指 / 斜指', desc: 'The two families of Renju openings: central vs diagonal starts.' },
    { en: 'Invasion', zh: '打', desc: 'A challenging point played against an opponent’s opening setup.' },
    { en: 'Guess the Stone', zh: '猜先', desc: 'A ritual to decide who plays Black by guessing the hidden stone count.' },
    { en: 'Komi', zh: '贴目', desc: 'A compensation point for the second player (mainly a Go concept, sometimes discussed for balance).' },
    { en: 'Renju', zh: '连珠', desc: 'The competitive five-in-a-row ruleset with forbidden moves for Black.' },
    { en: 'Three-Three Forbidden', zh: '三三禁手', desc: 'Black’s double-three forbidden move.' },
    { en: 'Four-Four Forbidden', zh: '四四禁手', desc: 'Black’s double-four forbidden move.' },
    { en: 'VCF', zh: '连续冲四胜', desc: 'Victory by Continuous Four — a forcing sequence of straight fours.' },
    { en: 'VCT', zh: '连续冲四活三胜', desc: 'Victory by Continuous Threats — a sequence of fours and threes.' },
    { en: 'Joseki', zh: '定石', desc: 'Established opening theory; standard, well-studied move sequences.' },
    { en: 'Thickness', zh: '厚势', desc: 'A solid, flexible formation with few weaknesses.' },
    { en: 'Building a Shape', zh: '做棋', desc: 'A quiet move that creates multiple hidden threats at once.' },
    { en: 'Trap', zh: '骗着', desc: 'A deceptive move that aims to provoke an opponent error.' },
    { en: 'Semeai', zh: '对杀', desc: 'A mutual life-and-death race (a Go term borrowed loosely in discussions).' },
  ],
  cta: 'Play Gomoku Free',
};

const ZH: Content = {
  meta: {
    title: '五子棋术语表 — 五子连珠专业词汇',
    description:
      '五子棋与连珠术语表：五连、活四、眠三、双三、VCF、定石等。掌握五子连珠的语言，边读规则边查。',
    keywords: '五子棋术语, 五子连珠术语, 连珠术语表, 五子棋词汇, 五子棋名词',
  },
  h1: '五子棋术语表',
  lead: '从获胜棋形到开局定式，这里是五子连珠的全部常用词汇。阅读规则页或复盘时，可当作速查手册。',
  terms: [
    { en: 'Five in a Row', zh: '五连', desc: '五子连成一线——五子棋的获胜棋形。' },
    { en: 'Open Four', zh: '活四', desc: '两端都敞开的四子，无法阻挡，下一步必胜。' },
    { en: 'Straight Four (Four)', zh: '冲四', desc: '只有一端敞开的四子，对手必须立即封堵。' },
    { en: 'Open Three', zh: '活三', desc: '下一步能变成活四的三子。' },
    { en: 'Broken Three', zh: '眠三', desc: '需特定一点才能延伸的三子，优先级低于活三。' },
    { en: 'Double Three', zh: '双三', desc: '一子同时形成两个三，连珠规则中黑棋禁手。' },
    { en: 'Double Four', zh: '四四', desc: '一子同时形成两个四，连珠规则中黑棋禁手。' },
    { en: 'Overline', zh: '长连', desc: '六子及以上连成一线，连珠规则中黑棋禁手。' },
    { en: 'Forbidden Move', zh: '禁手', desc: '连珠规则中黑棋不得落子之处。' },
    { en: 'Sente', zh: '先手', desc: '主动权——迫使对手应招的一方。' },
    { en: 'Gote', zh: '后手', desc: '失去主动，被迫应对威胁。' },
    { en: 'Opening', zh: '开局', desc: '决定整局走向的前几手。' },
    { en: 'Pomegranate', zh: '花月', desc: '连珠标准直指开局之一（均衡的起手）。' },
    { en: 'Paulownia', zh: '浦月', desc: '连珠标准直指开局，被认为对黑棋有利。' },
    { en: 'Straight / Oblique', zh: '直指 / 斜指', desc: '连珠开局的两大家族：中央起手与斜向起手。' },
    { en: 'Invasion', zh: '打', desc: '针对对手开局布局落下的挑点。' },
    { en: 'Guess the Stone', zh: '猜先', desc: '通过猜手中棋子数决定谁执黑的仪式。' },
    { en: 'Komi', zh: '贴目', desc: '给后手的补偿点（主要为围棋概念，有时用于平衡讨论）。' },
    { en: 'Renju', zh: '连珠', desc: '设有黑棋禁手的竞技五子棋规则。' },
    { en: 'Three-Three Forbidden', zh: '三三禁手', desc: '黑棋的双三禁手。' },
    { en: 'Four-Four Forbidden', zh: '四四禁手', desc: '黑棋的双四禁手。' },
    { en: 'VCF', zh: '连续冲四胜', desc: '通过连续冲四的强制手段取胜。' },
    { en: 'VCT', zh: '连续冲四活三胜', desc: '通过连续冲四与活三的威胁取胜。' },
    { en: 'Joseki', zh: '定石', desc: '已成定论的开局理论，即标准且深入研究过的走法序列。' },
    { en: 'Thickness', zh: '厚势', desc: '坚实、灵活、漏洞少的棋形。' },
    { en: 'Building a Shape', zh: '做棋', desc: '看似平淡、实则同时埋下多重威胁的一手。' },
    { en: 'Trap', zh: '骗着', desc: '意在诱使对手出错的欺着。' },
    { en: 'Semeai', zh: '对杀', desc: '双方对彼此生死的攻杀竞速（源自围棋，常用于讨论）。' },
  ],
  cta: '免费玩五子棋',
};

const PATH = '/glossary';

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
    alternates: localeAlternates('glossary', locale),
  };
}

export const revalidate = 86400;

export default async function GlossaryPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const c = LOC(locale) === 'zh' ? ZH : EN;
  const lang = LOC(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.meta.title,
    description: c.meta.description,
    datePublished: '2026-08-12',
    inLanguage: lang,
    author: { '@type': 'Organization', name: 'YiBoard' },
    publisher: { '@type': 'Organization', name: 'YiBoard' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://yiboardgame.com${PATH}` },
  };

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

      <section className="yb-section" style={{ maxWidth: 760 }}>
        <SectionHead
          icon={<BookOpen size={18} weight="bold" aria-hidden />}
          title={lang === 'zh' ? `共 ${c.terms.length} 条术语` : `${c.terms.length} Terms`}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {c.terms.map((term) => (
            <article key={term.en} className="yb-card" style={{ padding: 'var(--card-pad)' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'var(--weight-emphasis)', color: 'var(--fg)' }}>
                {term.en}
              </h3>
              <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 'var(--weight-medium)' }}>
                {term.zh}
              </p>
              <p style={{ marginTop: 'var(--space-2)', marginBottom: 0, fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>
                {term.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {c.cta}
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
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
