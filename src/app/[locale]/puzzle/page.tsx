import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/i18n/metadata';
import { DailyPuzzle } from '@/components/DailyPuzzle';

const LOC = (locale: string): 'zh' | 'en' => (locale === 'zh' ? 'zh' : 'en');

const META: Record<'en' | 'zh', { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Daily Gomoku Puzzle — Find the Winning Move',
    description:
      'A new Gomoku puzzle every day: a position where black has four in a row and you find the one move that completes five. Train your eye for live fours and double threats.',
    keywords: ['gomoku puzzle', 'daily gomoku', 'gomoku training', 'find the win gomoku', 'gomoku tactic'],
  },
  zh: {
    title: '每日五子棋残局 — 找出制胜一手',
    description:
      '每天一道五子棋残局：黑棋已有四子连线，找出连成五子的那一手。练就识别活四与双威胁的棋感。',
    keywords: ['五子棋残局', '每日五子棋', '五子棋训练', '五子棋制胜', '五子棋战术'],
  },
};

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const m = META[LOC(locale)];
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: { title: m.title, description: m.description, images: [{ url: '/og.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: ['/og.png'] },
    alternates: localeAlternates('puzzle', locale),
  };
}

export const revalidate = 86400;

export default async function PuzzlePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const l = LOC(locale);

  const puzzleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: META[l].title,
    description: META[l].description,
    datePublished: '2026-08-12',
    dateModified: '2026-08-12',
    inLanguage: l,
    author: { '@type': 'Organization', name: 'YiBoard' },
    publisher: { '@type': 'Organization', name: 'YiBoard' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://yiboardgame.com/puzzle' },
  };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-12)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(puzzleJsonLd) }}
      />
      <header style={{ maxWidth: '56ch' }}>
        <h1 className="yb-h2">{META[l].title}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-3)' }}>
          {META[l].description}
        </p>
      </header>

      <section className="yb-section" style={{ maxWidth: 560 }}>
        <DailyPuzzle />
      </section>

      <section style={{ maxWidth: 760, marginTop: 'var(--space-10)' }}>
        <Link href="/play" className="yb-btn yb-btn-primary">
          {l === 'zh' ? '去下完整一局' : 'Play a full game'}
        </Link>
      </section>
    </div>
  );
}
