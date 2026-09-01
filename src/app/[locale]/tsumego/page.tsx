import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/i18n/metadata';
import TsumegoGame from '@/components/TsumegoGame';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '免费在线围棋死活题 – 提子练习' : 'Go Tsumego (Life & Death) Online Free',
    description: isZh
      ? '免费在线围棋死活题（Tsumego）。在 9×9 棋盘上练习提子与做活，点出正解即提吃对方。无需注册，即刻开练。'
      : 'Practice Go life-and-death problems (tsumego) online for free. On the 9×9 board, find the move that captures the opponent. No signup required.',
    alternates: localeAlternates('tsumego', locale),
    openGraph: {
      title: isZh ? '免费在线围棋死活题' : 'Go Tsumego Online Free',
      description: isZh ? '围棋死活题练习，免费玩。' : 'Free Go tsumego practice.',
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '免费在线围棋死活题' : 'Go Tsumego Online Free',
      description: isZh ? '围棋死活题练习，免费玩。' : 'Free Go tsumego practice.',
      images: ['/og.png'],
    },
  };
}

export const revalidate = 3600;

export default async function TsumegoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const faqItems = isZh
    ? [
        { q: '什么是死活题（Tsumego）？', a: '死活题是围棋中专门训练"提子与做活"的习题：给定局部局面，找出那手能吃掉对方、或让自己两块眼活下来的关键着法。' },
        { q: '这套死活题怎么玩？', a: '轮到你走时（黑或白），在棋盘上点出你认为正确的那一手。点中正解会立即演示提子过程；点错会有提示，也可以直接"揭示答案"。' },
        { q: '为什么死活题重要？', a: '对杀、做活、破眼都建立在死活计算上。每天做几道，能显著提升在中盘战斗里"看清一块棋死活"的能力。' },
        { q: '可以免费在线练死活题吗？', a: '可以。在 YiBoard 打开 /tsumego 即可免费练习，无需注册。' },
      ]
    : [
        { q: 'What is a tsumego?', a: 'A tsumego is a Go life-and-death problem: given a local position, find the move that captures the opponent or makes your own group live with two eyes.' },
        { q: 'How do these problems work?', a: 'When it is your turn (black or white), click the point you think is correct. A correct answer plays out the capture; a wrong one gives a hint, and you can also reveal the solution directly.' },
        { q: 'Why are tsumego important?', a: 'Capturing races, making life and breaking eyes all rest on life-and-death reading. A few problems a day sharpens your ability to see whether a group is alive or dead in the middle game.' },
        { q: 'Can I practice tsumego online for free?', a: 'Yes. On YiBoard, open /tsumego to practice free — no signup required.' },
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
    name: isZh ? '死活题 – 弈界 YiBoard' : 'Tsumego – YiBoard',
    description: isZh ? '免费在线围棋死活题练习。' : 'Free online Go life-and-death problem practice.',
    url: `/${locale}/tsumego`,
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="yb-container" style={{ paddingBlock: 'var(--space-8)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="yb-h2">{isZh ? '围棋死活题（Tsumego）' : 'Go Tsumego (Life & Death)'}</h1>
        <p className="yb-lead" style={{ marginTop: 'var(--space-2)', maxWidth: '60ch' }}>
          {isZh
            ? '死活是围棋的算路核心。给定局部局面，找出那手能提子、能活棋的关键着法——看清一块棋的生死，中盘战斗就赢了一半。'
            : 'Life and death is the heart of Go reading. Given a local shape, find the move that captures or makes life — see a group\'s fate clearly and you win half the fighting.'}
        </p>
      </header>

      <TsumegoGame locale={locale} />

      <section style={{ marginTop: 'var(--space-10)', maxWidth: 720 }}>
        <h2 className="yb-h3">{isZh ? '怎么练' : 'How to practice'}</h2>
        <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-5)', lineHeight: 1.8 }}>
          {isZh ? (
            <>
              <li><strong>看清气</strong>：先数对方棋块还剩几口气，正解通常是"收紧最后一口气"。</li>
              <li><strong>落子即提</strong>：点中正解会立即演示提子过程，帮你建立"为什么这手成立"的直观。</li>
              <li><strong>允许试错</strong>：点错有提示，卡住可以"揭示答案"，再回看自己漏算了哪一气。</li>
            </>
          ) : (
            <>
              <li><strong>Count liberties</strong>: First count how many liberties the opponent's group has — the solution is usually the move that removes the last one.</li>
              <li><strong>Capture on click</strong>: A correct answer plays out the capture so you can see why the move works.</li>
              <li><strong>Learn by trying</strong>: Wrong clicks give a hint, and you can reveal the solution if stuck, then review what you missed.</li>
            </>
          )}
        </ul>
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
          <Link href="/tsumego-rules" style={{ color: 'var(--accent)' }}>{isZh ? '查看完整死活题讲解与术语 →' : 'Read the full tsumego guide & terms →'}</Link>
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
