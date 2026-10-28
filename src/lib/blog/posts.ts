// YiBoard blog post data layer — bilingual (en default / zh)
// Consumed by:
//   - src/app/[locale]/blog/[slug]/page.tsx  (per-post route: canonical + hreflang + Article/FAQPage JSON-LD)
//   - src/app/[locale]/blog/page.tsx         (index list)
//   - src/app/sitemap.xml/route.ts           (blog URLs with hreflang)
// For non-en/zh locales (es/ja/pt-BR) the detail page falls back to English content.

export type PostBlock =
  | string
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'cta'; text: string; href: string };

export interface BlogPost {
  slug: string;
  date: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  keywords: string[];
  /** Topical-cluster tags — drives /blog/[tag] indexes and internal linking. */
  tags: string[];
  content: { zh: PostBlock[]; en: PostBlock[] };
  // 可选：结构化 HowTo（用于 HowTo JSON-LD 争取富媒体结果）。按语言分键，缺失语言回退 en。
  howTo?: {
    zh?: { name: string; steps: { name: string; text: string }[] };
    en?: { name: string; steps: { name: string; text: string }[] };
  };
}

export const POSTS: BlogPost[] = [
  {
    slug: 'why-gomoku-ships-first',
    date: '2026-08-04',
    tags: ['gomoku', 'product'],
    title: {
      zh: '为什么五子棋先上线',
      en: 'Why Gomoku Ships First',
    },
    description: {
      zh: '30 秒能学会、三千年吵不完。五子棋是 YiBoard 通向世界最短的路：规则一句话讲完，策略深不见底。这篇讲清楚为什么它是首发棋种。',
      en: 'Learnable in thirty seconds, argued about for three thousand years. Gomoku is YiBoard\u2019s shortest road to the world: one sentence of rules, endless strategy. Here is why it ships first.',
    },
    keywords: ['gomoku online', 'play gomoku free', 'gomoku no signup', 'chinese board games online', 'gomoku strategy'],
    content: {
      zh: [
        '五子棋（gomoku）是 YiBoard 的第一款棋，这不是偶然。它是中华棋类里入门门槛最低的：黑白两色、一张棋盘、五子连线，规则一句话讲得完。但玩过的人都知道，规则简单不等于棋浅，这正是我们想让全世界先认识它、再认识整个中华棋类世界的理由。今天就在 yiboardgame.com 的[对战页](/play)免费来一局。',
        { type: 'h2', text: '30 秒学会的规则' },
        '十五路或十九路棋盘，黑先白后，轮流落子。先把任意五个子连成一条直线（横、竖、斜都算）的人赢。没有棋子被吃掉，没有复杂的吃子规则，第一局甚至不需要教程。对完全没接触过中华棋类的欧美玩家来说，五子棋是零挫折的入口。',
        { type: 'h2', text: '简单规则下的深策略' },
        '规则越简单，策略反而越藏得深。先手有优势，于是衍生出禁手（禁止双三、双四）的变体；后手要防守反击，于是有了"活三""冲四"这些攻防语言。业余玩家看到的是五子连线，高手看到的是棋形的互相威胁。从入门到精通，五子棋给了一个很长的成长阶梯，这也是 play gomoku free 能留住人的原因。',
        { type: 'h2', text: '为什么从五子棋开始' },
        {
          type: 'ul',
          items: [
            '上手最快：第一局就能完整体验胜负，适合零基础用户',
            '有深度：禁手规则、开局理论让它值得研究数月',
            '不依赖服务器算力：浏览器内 AI 就能提供强对手（500ms 预算的 alpha-beta 剪枝）',
            '为象棋和围棋铺路：同一个裁判内核、段位系统、对局分享框架直接复用',
          ],
        },
        { type: 'h2', text: '先玩，再说别的' },
        '象棋（Xiangqi）正在开发中，围棋（Go）在路线图上。但今天打开 yiboardgame.com，[五子棋就能直接玩](/play)，不用注册、不用安装。想先搞懂规则？[玩法页](/how-to)三十秒看完。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 的五子棋免费吗？', a: '完全免费，没有付费墙、没有广告。打开就能玩，注册是可选功能，只为跨设备保存战绩。' },
            { q: '五子棋的规则是什么？', a: '黑白双方轮流落子，先把五个子连成一线（横、竖、斜皆可）的玩家获胜。' },
            { q: '浏览器里玩五子棋会不会很卡？', a: '不会。AI 引擎在浏览器本地运行，500ms 内完成搜索，没有服务器往返，也不排队。' },
            { q: '五子棋和围棋有关系吗？', a: '有共同的文化血脉，但规则不同。五子棋比连线，围棋比围地。YiBoard 未来会同时提供两者。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 免费下一局五子棋', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Gomoku is YiBoard\u2019s first game, and that was a deliberate call. It is the lowest entry point in Chinese board games: two colors, one board, five in a row, rules you can explain in a single sentence. But anyone who has actually played knows simple rules do not mean shallow play, and that is exactly why we want the world to meet it first before anything else. You can play a match right now on the [play page](/play) at yiboardgame.com.',
        { type: 'h2', text: 'Rules you can learn in 30 seconds' },
        'Fifteen-line or nineteen-line board, black moves first, players alternate. First to line up five stones in a row, horizontally, vertically or diagonally, wins. No captures, no complicated eating rules, the first game needs no tutorial. For players in the West who have never touched a Chinese board game, Gomoku is the zero-frustration door in.',
        { type: 'h2', text: 'Deep strategy under simple rules' },
        'The simpler the rules, the deeper the strategy hides. Black has an opening advantage, which is why variants add forbidden moves like double threes and double fours. White plays defense and counterattack, which gives the game its attacking language of live threes and open fours. Casual players see five in a row; strong players read the threats between shapes. From beginner to expert, Gomoku offers a long ladder, and that is what makes play gomoku free stick.',
        { type: 'h2', text: 'Why start with Gomoku' },
        {
          type: 'ul',
          items: [
            'Fastest to learn: the first game delivers a full win or loss, perfect for absolute beginners',
            'Real depth: forbidden-move rules and opening theory reward months of study',
            'No server compute needed: the browser AI is strong enough with 500ms of alpha-beta pruning',
            'Paves the way for Xiangqi and Go: the referee core, rank system and match sharing all get reused',
          ],
        },
        { type: 'h2', text: 'Play first, argue later' },
        'Xiangqi is in development and Go is on the roadmap. But today, on yiboardgame.com, [Gomoku is playable](/play), no signup, no install. Want the rules first? The [how-to page](/how-to) takes thirty seconds.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Is YiBoard\u2019s Gomoku free?', a: 'Completely free: no paywall, no ads. Open and play. An optional account exists only to carry your record across devices.' },
            { q: 'What are the rules of Gomoku?', a: 'Black and white alternate placing stones; the first player to line up five stones in a row, in any direction, wins.' },
            { q: 'Will browser Gomoku lag?', a: 'No. The AI runs locally in your browser with a 500ms search budget, so there is no server round trip and no queue.' },
            { q: 'Is Gomoku related to Go?', a: 'They share cultural roots but not rules. Gomoku is about five in a row; Go is about surrounding territory. YiBoard will offer both.' },
          ],
        },
        { type: 'cta', text: 'Play a free Gomoku match on YiBoard', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'where-the-ladder-comes-from',
    date: '2026-08-05',
    tags: ['gomoku', 'strategy'],
    title: {
      zh: '段位制从哪来',
      en: 'Where the Ladder Comes From',
    },
    description: {
      zh: '九级到九段：为什么 YiBoard 从真实的中华棋类文化里借来级位制，而不是用青铜白银。1200 分起步（六级），一局一局爬上去。',
      en: 'Ninth Grade to Ninth Dan: why YiBoard borrowed grades and dans from real Chinese board culture instead of bronze and platinum. Everyone starts at 1200, Sixth Grade.',
    },
    keywords: ['gomoku ranking system', 'grades and dans', 'gomoku rating', 'chinese board game ranks', 'gomoku ladder'],
    content: {
      zh: [
        '打开 YiBoard 的[排行榜](/rankings)你会发现没有青铜白银黄金，取而代之的是级位与段位：九级到九段，所有人都从 1200 分、六级起步。这套体系不是我们发明的，它来自真实的中华棋类文化，围棋和象棋用了上千年。这篇讲讲为什么我们选择它，以及它怎么运作。',
        { type: 'h2', text: '级位制是什么' },
        '中华棋类的段位体系分两段：级位（Grade）从低到高是九级到一级，代表入门到熟练；再往上就是段位（Dan），一段到九段，九段是职业顶尖。级位用数字大小表示水平高低（九级最弱、一级最强），段位反过来（一段最低、九段最高）。YiBoard 把所有人放在 1200 分、六级起步，赢棋加分、输棋减分，分数映射到级位与段位。',
        { type: 'h2', text: '为什么不用青铜白银' },
        {
          type: 'ul',
          items: [
            '文化真实：这套体系本来就属于这些棋，用青铜白银是给西方电竞套壳',
            '语义清晰：九级到九段是一条看得见的成长线，段位名自带历史分量',
            '区分度好：1200 起步意味着新手和高手在同一条尺子上，爬升路径明确',
            '和棋类生态接轨：未来与线下棋馆、其他棋类平台的段位对照更容易',
          ],
        },
        { type: 'h2', text: '分数怎么变' },
        '每局结束，系统根据你和对手的分差计算得失分：赢强手加分多、赢弱手加分少，反之亦然。段位不是买来的、不是赛季重置的，是一局一局打出来的。想了解具体算法，可以看我们的[段位怎么读](/how-to)说明，或者直接去[排行榜](/rankings)看看现在谁在顶端。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 的 1200 分代表什么水平？', a: '1200 分对应六级，是所有人的起点。赢棋加分，输棋减分，分数决定你的级位或段位。' },
            { q: '段位和级位有什么区别？', a: '级位从九级到一级，段位从一段到九段。级位在前段位在后，一级之上是一段，九段是最高。' },
            { q: '分数会赛季重置吗？', a: '不会。YiBoard 的评分是持续的，不搞赛季重置，你的历史战绩只属于你。' },
            { q: '段位系统有防作弊吗？', a: '有。每步棋由服务器端校验，配合评分机制，故意送分或刷分的行为会被系统识别。' },
          ],
        },
        { type: 'cta', text: '看看排行榜上谁领先', href: 'https://yiboardgame.com/rankings' },
      ],
      en: [
        'Open the [leaderboards](/rankings) on YiBoard and you will find no bronze, silver or gold. Instead there are grades and dans: from Ninth Grade to Ninth Dan, with everyone starting at 1200, Sixth Grade. This is not something we invented; it comes from real Chinese board culture, used by Go and Xiangqi for centuries. Here is why we chose it and how it works.',
        { type: 'h2', text: 'What grades and dans are' },
        'The Chinese system has two segments. Grades run from Ninth Grade up to First Grade, covering beginner to proficient. Then Dans take over, from First Dan up to Ninth Dan, the professional top. Lower grade numbers are stronger within the grade band, but dans flip: First Dan is the entry, Ninth Dan is the summit. YiBoard starts everyone at 1200, Sixth Grade. Win and your score climbs; lose and it drops, and the score maps onto grades and dans.',
        { type: 'h2', text: 'Why not bronze and silver' },
        {
          type: 'ul',
          items: [
            'Culturally honest: this system already belongs to these games; bronze tiers are a western esports skin',
            'Semantically clear: Ninth Grade to Ninth Dan is a visible growth line, and dan names carry real weight',
            'Better discrimination: a 1200 start puts beginners and experts on one ruler with an obvious path',
            'Ecosystem-ready: it aligns with real chess clubs and other board game platforms later',
          ],
        },
        { type: 'h2', text: 'How the score moves' },
        'Each match, the system compares your score with your opponent\u2019s: beat a stronger player and gain more, beat a weaker one and gain less, and the reverse when you lose. Dans are not bought and never reset by a season; they are earned one game at a time. For the algorithm details see the [how-to page](/how-to), or check the [leaderboard](/rankings) to see who is on top right now.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'What does 1200 on YiBoard mean?', a: '1200 is Sixth Grade, the starting point for everyone. Wins raise it, losses lower it, and the score maps to your grade or dan.' },
            { q: 'What is the difference between grades and dans?', a: 'Grades run Ninth to First; dans run First to Ninth. First Grade sits just below First Dan, and Ninth Dan is the top.' },
            { q: 'Does the score reset each season?', a: 'No. YiBoard\u2019s rating is continuous, no season resets, your history belongs to you.' },
            { q: 'Is the rating system cheat-resistant?', a: 'Yes. Every move is server-validated and the rating mechanics make score dumping or farming detectable.' },
          ],
        },
        { type: 'cta', text: 'See who leads the leaderboard', href: 'https://yiboardgame.com/rankings' },
      ],
    },
  },
  {
    slug: 'server-side-refereeing-anti-cheat',
    date: '2026-08-06',
    tags: ['gomoku', 'engineering'],
    title: {
      zh: '服务器端裁判：为什么没人能作弊',
      en: 'Server-side Refereeing: Why Nobody Can Cheat Your Game',
    },
    description: {
      zh: 'YiBoard 的每一步棋都由服务器校验，客户端只是显示层。改客户端不能凭空造出一个胜利，这是反作弊设计的底线。',
      en: 'Every move on YiBoard is validated by the server; the client is only a display layer. A patched client cannot invent a win. That is the baseline of our anti-cheat design.',
    },
    keywords: ['anti-cheat board game', 'server-side validation', 'fair play online gomoku', 'cheat-proof game', 'online board game integrity'],
    content: {
      zh: [
        '线上棋类最隐蔽的作弊方式不是"有人代打"，而是改客户端：让程序替你自动落最强手，或者更恶劣地，伪造一个胜利。YiBoard 的反作弊思路很朴素：把裁判权从客户端拿走。每一步棋都先经过服务器校验，合法才落盘，客户端只是显示层。这篇拆开讲这套设计。',
        { type: 'h2', text: '裁判在服务器，不在客户端' },
        '传统的客户端信任模型里，棋盘状态存在你本地，改内存就能改结果。YiBoard 反过来：服务器持有权威状态，你每下一步，客户端把意图发给服务器，服务器验证合法性（这一步是不是当前玩家？位置是否已占用？是否已经赢了？），通过后广播给双方。一个被修改的客户端唯一能做的就是发送合法动作，它无法凭空造出一个胜利，因为"胜利"由服务器判定。',
        { type: 'h2', text: '为什么这很重要' },
        {
          type: 'ul',
          items: [
            '公平：双方看到同一份棋盘，同一套规则，没有人能偷偷多走一步',
            '评分可信：段位分数基于被校验过的对局，积分才有意义',
            '观战与分享可验证：复盘数据来自服务器，不是玩家自说自话',
            '为象棋围棋铺路：未来所有棋种共用同一个裁判内核',
          ],
        },
        { type: 'h2', text: 'AI 对手是另一回事' },
        '和 AI 对战不需要服务器裁判：五子棋 AI 在浏览器本地跑 alpha-beta 剪枝，500ms 预算内搜索。本地引擎意味着没有排队、没有限速，也意味着你的棋不会因为服务器负载而变慢。想试试？[AI 对战页](/play)直接开一局。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '改客户端真的不能作弊吗？', a: '不能凭空造胜利。服务器持有权威状态并判定胜负，修改的客户端只能发送合法动作，无法伪造结果。' },
            { q: 'AI 对战也用服务器裁判吗？', a: '不用。AI 在浏览器本地运行，不需要服务器往返，所以无限速、无排队。' },
            { q: '段位分数会被作弊污染吗？', a: '不会被合法路径污染。评分基于服务器校验过的对局，刷分行为可被评分机制识别。' },
            { q: '未来象棋围棋也用同一套反作弊吗？', a: '会。服务器裁判内核是共享的，所有棋种都会复用这套设计。' },
          ],
        },
        { type: 'cta', text: '亲自来一局，感受公平对局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'The sneakiest kind of cheating in online board games is not a stronger player using an alt. It is a modified client: software that auto-plays your strongest moves, or worse, forges a win. YiBoard\u2019s anti-cheat answer is simple: take the referee away from the client. Every move is validated by the server before it lands, and the client is only a display layer. Here is how the design works.',
        { type: 'h2', text: 'The referee lives on the server, not the client' },
        'In the classic client-trust model, the board state lives on your machine, so editing memory can edit the result. YiBoard flips that: the server holds the authoritative state. Your client sends the intent of each move, the server checks it (is it this player\u2019s turn? is the cell free? has someone already won?), and only legal moves get broadcast to both sides. A patched client can only send legal moves; it cannot invent a win, because wins are judged by the server.',
        { type: 'h2', text: 'Why this matters' },
        {
          type: 'ul',
          items: [
            'Fairness: both sides see the same board and the same rules, nobody sneaks an extra move',
            'Trustworthy ratings: dan scores are built on validated games, so the numbers mean something',
            'Verifiable replays: shared games and spectating come from server data, not player claims',
            'Scales to Xiangqi and Go: every future game reuses the same referee core',
          ],
        },
        { type: 'h2', text: 'AI opponents are a different story' },
        'Playing the AI needs no server referee: the Gomoku engine runs alpha-beta pruning in your browser within a 500ms budget. A local engine means no queue, no rate limit, and no lag from server load. Want to feel it? Start a match on the [play page](/play).',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Can a modified client really not cheat?', a: 'It cannot forge a win. The server holds the authoritative state and judges the outcome, so a patched client can only send legal moves.' },
            { q: 'Does playing the AI use the server referee?', a: 'No. The AI runs locally in your browser, so there is no round trip, no rate limit and no queue.' },
            { q: 'Can ratings be polluted by cheating?', a: 'Not through legal paths. Ratings are built on server-validated games, and farming behavior is detectable by the rating mechanics.' },
            { q: 'Will Xiangqi and Go reuse this anti-cheat?', a: 'Yes. The server referee core is shared and every future game will reuse it.' },
          ],
        },
        { type: 'cta', text: 'Play a match and feel the fair game', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'how-to-play-gomoku',
    date: '2026-08-07',
    tags: ['gomoku', 'rules', 'strategy'],
    title: {
      zh: '五子棋玩法：规则、开局与必胜思路',
      en: 'How to Play Gomoku: Rules, Openings & Winning Strategy',
    },
    description: {
      zh: '五子棋（连五子）怎么玩？30 秒看懂规则、搞懂活三与冲四、掌握三个立刻能用的开局，再到 yiboardgame.com 免费开一局。新手友好完整指南。',
      en: 'Learn how to play Gomoku (Five in a Row): the 30-second rules, the key shapes like live three and open four, three opening moves that work right away, and where to play free in your browser. A beginner-friendly guide.',
    },
    keywords: ['how to play gomoku', 'gomoku rules', 'five in a row rules', 'gomoku for beginners', 'gomoku openings', 'gomoku strategy', 'play gomoku free'],
    content: {
      zh: [
        '五子棋（gomoku）的规则简单到可以一句话说完：黑白双方轮流在棋盘交叉点落子，先把五个子连成一线（横、竖、斜都算）的人获胜。没有吃子、没有回合限制。但正因为规则少，胜负全靠判断，这篇在 30 秒教会你规则之外，再送你几个新手马上能用的思路。',
        { type: 'h2', text: '基础规则（30 秒版）' },
        {
          type: 'ul',
          items: [
            '棋盘：15×15 或 19×19 的交叉点网格，落子在交叉点上',
            '先后：黑先白后，轮流落子，一步一子',
            '胜利：任意方向（横、竖、两条对角线）连成五子',
            '平局：棋盘下满仍无五连（实战极少发生）',
          ],
        },
        { type: 'h2', text: '新手第一个要懂的概念：活三与冲四' },
        '"活三"是还有两个开放端的三连（两端都能继续延伸），对手不堵，下一步就是活四；"冲四"是四连且至少一端开放，对手必须立刻堵。看懂这两个概念，你就知道进攻为什么比防守主动：一个活三逼着对手落子，一个冲四直接锁定胜局。',
        { type: 'h2', text: '三个立刻能用的开局思路' },
        {
          type: 'ul',
          items: [
            '占中优先：开局先占天元（正中心）附近，中心位置的辐射力最大',
            '先做活二：前几步别急着冲，先摆出两三个互相呼应的活二，为活三埋伏笔',
            '对手冲你必堵：对方一旦冲四或形成活三，先堵再说，别贪自己的攻势',
          ],
        },
        { type: 'h2', text: '去 yiboardgame.com 实战' },
        '规则看完就够开一局了。[对战页](/play)支持人机对战和在线匹配，注册可选。想再深入一点，[玩法页](/how-to)有完整的进阶说明。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '五子棋有吃子规则吗？', a: '没有。五子棋不做吃子，只有落子和连线的规则，这也是它最容易上手的原因。' },
            { q: '先手（黑棋）有优势吗？', a: '有，先手能先形成进攻形状。正式比赛通过禁手规则平衡，休闲对局通常不做限制。' },
            { q: '连成超过五子算赢吗？', a: '在自由规则下算赢（长连也是五连的延伸）；在禁手规则下黑棋长连反而是违规。' },
            { q: '在哪里可以免费玩五子棋？', a: 'yiboardgame.com 提供完全免费的五子棋，浏览器打开即玩，无需注册。' },
          ],
        },
        { type: 'cta', text: '30 秒学会，立刻开一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Gomoku\u2019s rules fit in one sentence: black and white take turns placing stones on the intersections of a grid, and the first player to connect five stones in a row, horizontally, vertically or diagonally, wins. No captures, no turn limits. Because the rules are so few, the whole game is judgment, so after the 30-second lesson here are a few ideas you can use in your first match.',
        { type: 'h2', text: 'The basics, in 30 seconds' },
        {
          type: 'ul',
          items: [
            'Board: 15x15 or 19x19 grid of intersections, stones go on the intersections',
            'Turn order: black first, alternate, one stone per turn',
            'Win: five in a row in any direction, including both diagonals',
            'Draw: board fills with no five in a row, which almost never happens in practice',
          ],
        },
        { type: 'h2', text: 'The first concept you need: live threes and open fours' },
        'A live three is a line of three with both ends open, which means the opponent must respond or it becomes a live four next. An open four is a line of four with at least one open end, which forces the opponent to block immediately. Once you see these two shapes, you understand why attacking beats reacting: a live three spends your opponent\u2019s turn, and an open four ends the game.',
        { type: 'h2', text: 'Three opening ideas that work now' },
        {
          type: 'ul',
          items: [
            'Take the center: start near the middle intersection, central stones project influence in all directions',
            'Build live twos first: do not rush to attack; set up two or three live twos that support each other',
            'Always block an open four or live three: defend first, even if your own attack looks tempting',
          ],
        },
        { type: 'h2', text: 'Go play on yiboardgame.com' },
        'You now know enough for a full match. The [play page](/play) offers both human vs AI and online matchmaking, with signup optional. Want to go deeper? The [how-to page](/how-to) has the full advanced guide.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Does Gomoku have capture rules?', a: 'No. Gomoku has no captures, only placement and connection, which is exactly why it is the easiest game to learn.' },
            { q: 'Does black (first player) have an advantage?', a: 'Yes, black gets to build attacking shapes first. Formal rules use forbidden moves to balance it; casual play usually does not.' },
            { q: 'Does a line of six count as a win?', a: 'In freestyle rules yes, an overline is still five in a row. Under forbidden-move rules, black overlines are actually illegal.' },
            { q: 'Where can I play Gomoku for free?', a: 'yiboardgame.com offers completely free Gomoku, open in the browser, no signup required.' },
          ],
        },
        { type: 'cta', text: 'Learn it in 30 seconds, play a match now', href: 'https://yiboardgame.com/play' },
      ],
    },
    howTo: {
      en: {
        name: 'How to Play Gomoku: Step by Step',
        steps: [
          { name: 'Set up the board', text: 'Use a 15x15 grid of intersections. Stones are placed on the intersections, not inside the squares.' },
          { name: 'Learn the turn order', text: 'Black moves first, then players alternate, placing exactly one stone per turn.' },
          { name: 'Know the win condition', text: 'The first player to line up five stones in a row, horizontally, vertically, or diagonally, wins.' },
          { name: 'Read the key shapes', text: 'A live three (open at both ends) forces a response; an open four must be blocked immediately. These shapes are the language of attack.' },
          { name: 'Use three opening moves', text: 'Take the center, build live twos that support each other, and always block the opponent’s open four or live three first.' },
          { name: 'Play a real match', text: 'Open yiboardgame.com/play for free human-vs-AI or online matchmaking, no signup required.' },
        ],
      },
      zh: {
        name: '五子棋玩法分步指南',
        steps: [
          { name: '摆好棋盘', text: '使用 15×15 的交叉点网格，棋子落在交叉点上，而不是格子里。' },
          { name: '了解落子顺序', text: '黑棋先走，双方轮流，每回合只落一子。' },
          { name: '记住获胜条件', text: '率先把五子连成一线（横、竖、两条对角线皆可）的一方获胜。' },
          { name: '看懂关键棋形', text: '活三（两端都开放）逼对手应手，冲四（一端开放的四连）必须立刻封堵；这是进攻的语言。' },
          { name: '用三个开局思路', text: '先占中心、摆出互相呼应的活二、对手冲四或活三时永远先封堵。' },
          { name: '开一局实战', text: '打开 yiboardgame.com/play，免费人机对战或在线匹配，无需注册。' },
        ],
      },
    },
  },
  {
    slug: 'why-no-signup-needed',
    date: '2026-08-08',
    tags: ['product', 'privacy'],
    title: {
      zh: '为什么 YiBoard 不需要注册',
      en: 'Why YiBoard Needs No Signup',
    },
    description: {
      zh: '打开网页就能下棋，注册是可选项而不是门槛。YiBoard 把"立即开始"放在第一位：匿名即玩，战绩想保存时才绑定邮箱。',
      en: 'Open the page and play. Signup is optional, never a gate. YiBoard puts "start now" first: play anonymously, attach an email only when you want your record to follow you.',
    },
    keywords: ['play board games without account', 'no registration games', 'instant play browser', 'anonymous gomoku', 'no signup board games'],
    content: {
      zh: [
        '大多数棋类平台的流程是：注册 → 验证邮箱 → 选头像 → 才能开始。YiBoard 反着来：打开 yiboardgame.com 就是棋盘，点[开始](/play)就能下棋。注册不是入口关卡，而是一个可选的附加功能，只在你想让战绩跨设备同步时才需要。这篇讲讲这个设计背后的取舍。',
        { type: 'h2', text: '零摩擦才是好的第一印象' },
        '新用户第一次接触产品的前 30 秒决定去留。注册表单是这 30 秒里最大的杀手：每多一个必填字段，就多一批流失。五子棋这种"规则 30 秒能学会"的游戏，最不应该卡在账号上。匿名即玩让第一局变成打开网页到落子的 10 秒距离。',
        { type: 'h2', text: '注册什么时候才需要' },
        {
          type: 'ul',
          items: [
            '跨设备保存战绩：手机下几局，想在电脑上继续看段位，这时绑定邮箱才有意义',
            '找回自己的段位：不绑定的话，战绩只存在当前浏览器',
            '未来功能：好友列表、私局邀请这类社交功能，天然需要账号',
          ],
        },
        '不注册也完全能玩：匿名对局、AI 对战、排行榜，全部开放。隐私方面，匿名意味着服务器上不会存储你的邮箱或身份信息。',
        { type: 'h2', text: '和其他平台的对比' },
        '很多同类平台把注册当作收集用户的手段，用"不注册不能玩"逼你交出邮箱。YiBoard 相信好的产品不需要绑架：把棋下好，用户自然愿意留下来，愿意注册。免费无注册不是营销话术，是产品形态。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '不注册能玩所有功能吗？', a: '能。匿名可以玩人机、在线匹配和排行榜。只有跨设备同步战绩需要可选绑定邮箱。' },
            { q: '匿名下棋有段位吗？', a: '有。匿名对局同样计入你的本地评分，绑定邮箱后评分会同步到其他设备。' },
            { q: '为什么你们不做强制注册？', a: '因为第一局的体验最重要。强制注册提高的是账号数，伤害的是留存，我们不想要虚的指标。' },
            { q: '匿名会被存储哪些信息？', a: '服务器保存对局数据用于裁判和评分，不保存你的邮箱或身份信息。' },
          ],
        },
        { type: 'cta', text: '不注册，直接开一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Most board game platforms work like this: sign up, verify email, pick an avatar, then finally start. YiBoard does the reverse: opening yiboardgame.com is the board, and pressing [start](/play) begins a match. Signup is not the gate; it is an optional add-on, needed only when you want your record to follow you across devices. Here is the thinking behind that trade.',
        { type: 'h2', text: 'Zero friction is the right first impression' },
        'The first thirty seconds decide whether a new user stays. A signup form is the biggest killer in that window: every required field loses a share of visitors. A game whose rules take thirty seconds to learn should never be gated behind an account. Anonymous play makes the first game a ten-second distance from opening the page to placing a stone.',
        { type: 'h2', text: 'When signup actually matters' },
        {
          type: 'ul',
          items: [
            'Carrying your record across devices: play a few games on your phone, then continue on desktop, and an email link becomes meaningful',
            'Recovering your rank: without a binding, your record lives only in the current browser',
            'Future features: friends lists and private match invites naturally need accounts',
          ],
        },
        'Everything works without an account: anonymous matches, AI games, the leaderboard. And privacy-wise, anonymous means the server stores no email and no identity for you.',
        { type: 'h2', text: 'How this compares to other platforms' },
        'Many competitors use signup as a user-collection tool, forcing your email with a "no account, no play" wall. YiBoard believes good products do not need hostage-taking: play well and users will stay and register on their own. Free and signup-free is not marketing, it is the product shape.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Can I play everything without an account?', a: 'Yes. Anonymous play covers human vs AI, online matches and the leaderboard. Only cross-device record sync needs the optional email binding.' },
            { q: 'Do anonymous games count toward a rank?', a: 'Yes, they feed your local rating. Bind an email and the rating syncs to your other devices.' },
            { q: 'Why no forced signup?', a: 'Because the first match matters most. Forced signup inflates account counts but hurts retention, and we do not want vanity metrics.' },
            { q: 'What data is stored for anonymous players?', a: 'Match data for refereeing and ratings. No email, no identity.' },
          ],
        },
        { type: 'cta', text: 'Play a match, no signup', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'alpha-beta-engine-in-browser',
    date: '2026-08-09',
    tags: ['gomoku', 'engineering'],
    title: {
      zh: '真引擎：浏览器里的 alpha-beta',
      en: 'A Real Engine in Your Browser: Alpha-Beta in 500ms',
    },
    description: {
      zh: 'YiBoard 的五子棋 AI 不是云端 API，是一个在浏览器本地运行的 alpha-beta 剪枝引擎，500ms 预算内搜索。没有排队、没有限速，人人可用。',
      en: 'YiBoard\u2019s Gomoku AI is not a cloud API; it is an alpha-beta pruning engine running locally in your browser with a 500ms search budget. No queue, no rate limits, available to everyone.',
    },
    keywords: ['gomoku ai', 'alpha-beta pruning', 'gomoku engine', 'play vs ai free', 'browser game engine'],
    content: {
      zh: [
        '很多棋类网站的 AI 是"云端 API"，你下一步、服务器算一步，高峰期还要排队。YiBoard 的五子棋 AI 完全相反：它是一个在浏览器本地运行的 alpha-beta 剪枝引擎，每次落子有 500 毫秒的搜索预算。这篇拆开讲这个引擎为什么快、为什么免费、为什么人人可用。',
        { type: 'h2', text: 'alpha-beta 剪枝是什么' },
        '简单说，博弈搜索是"如果我走这里，你会怎么走，我再怎么走"的递归推演。朴素实现下分支爆炸得很快，alpha-beta 剪枝通过记录"当前已知的最佳结果"来砍掉不可能更好的分支，让同样时间内的搜索深度大幅增加。五子棋棋盘大、分支多，剪枝的收益尤其明显。',
        { type: 'h2', text: '为什么放在浏览器里' },
        {
          type: 'ul',
          items: [
            '零延迟：没有网络往返，落子即响应',
            '零排队：每个玩家用自己的 CPU 搜索，不会互相挤',
            '零限速：想和 AI 下多久就下多久',
            '零成本扩容：算力跟着玩家走，服务器只管裁判和匹配',
          ],
        },
        '这正是"免费无注册"能成立的工程基础：AI 对战的算力成本分散到每个玩家的设备上，而不是集中在我们的服务器。',
        { type: 'h2', text: '500ms 意味着什么' },
        '500ms 是一步棋的搜索预算，对人来说体感是"AI 思考了一下就落子"。在这段时间里引擎会搜索尽可能深的棋形，做出一个对得起这个时长的好选择。想和它交手？[AI 对战](/play)直接开始，看看你什么时候能赢它。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'AI 在浏览器里跑会不会很卡？', a: '不会。引擎有 500ms 硬预算，到点就落子，不阻塞页面。普通设备都能流畅运行。' },
            { q: '为什么不用云端 AI？', a: '本地引擎零延迟、零排队、零限速，而且算力成本分散到玩家设备，这是免费模式的工程基础。' },
            { q: 'AI 有多强？', a: '在 500ms 预算内，它对休闲玩家是相当强的对手。想挑战更强可以期待未来的难度档位。' },
            { q: 'AI 会作弊吗？', a: '不会。AI 遵守同样的落子规则，和人对局一样由服务器校验，公平对局。' },
          ],
        },
        { type: 'cta', text: '和浏览器里的 AI 下一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Most chess-style sites use a cloud API for their AI: you move, the server thinks, and at peak hours you wait in a queue. YiBoard\u2019s Gomoku AI is the opposite: it is an alpha-beta pruning engine running locally in your browser with a 500ms search budget per move. Here is why it is fast, why it is free, and why everyone can use it.',
        { type: 'h2', text: 'What alpha-beta pruning is' },
        'Game search is recursive reasoning: "if I go here, where will you go, and then where do I go?" The naive version explodes into too many branches. Alpha-beta pruning records the best known result so far and cuts off branches that cannot beat it, which multiplies the search depth you can reach in the same time. Gomoku has a large board and many branches, so the pruning payoff is especially large.',
        { type: 'h2', text: 'Why put the engine in the browser' },
        {
          type: 'ul',
          items: [
            'Zero latency: no network round trip, the reply is instant',
            'Zero queue: every player searches with their own CPU, nobody waits on anyone',
            'Zero rate limits: play the AI for as long as you want',
            'Zero-cost scaling: compute follows the players, the server only referees and matches',
          ],
        },
        'This is the engineering foundation of "free, no signup": the cost of AI matches is spread across players\u2019 devices instead of concentrated on our servers.',
        { type: 'h2', text: 'What 500ms means' },
        'Five hundred milliseconds is the search budget for one move, which feels like "the AI thought briefly and played". In that window the engine searches as deep as it can and picks a solid move. Want to meet it? Start an [AI match](/play) and see how long before you beat it.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Will an in-browser AI lag?', a: 'No. The engine has a hard 500ms budget and always responds on time without blocking the page. Ordinary devices run it fine.' },
            { q: 'Why not a cloud AI?', a: 'A local engine has zero latency, zero queue and zero rate limits, and it spreads compute cost across player devices, which is the engineering basis of the free model.' },
            { q: 'How strong is the AI?', a: 'Within the 500ms budget it is a solid opponent for casual players. Future difficulty tiers are planned.' },
            { q: 'Does the AI cheat?', a: 'No. It follows the same placement rules, and matches against it are server-validated like human games.' },
          ],
        },
        { type: 'cta', text: 'Play a match against the in-browser AI', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'five-languages-from-day-one',
    date: '2026-08-10',
    tags: ['product', 'multilingual'],
    title: {
      zh: '五语从第一天做起',
      en: 'Five Languages From Day One',
    },
    description: {
      zh: '英语、中文、西语、日语、巴西葡语：YiBoard 从第一天就写五门语言，规则、提示和报错都翻译，不只是落地页。为什么这么做？',
      en: 'English, 中文, Español, 日本語, Português do Brasil: YiBoard was written in five languages from day one, including rules, tooltips and error messages, not just the landing page. Here is why.',
    },
    keywords: ['multilingual board game', 'board game i18n', 'play gomoku in spanish', '日本語 五子棋', 'board game localization'],
    content: {
      zh: [
        '打开 yiboardgame.com 右下角的语言切换器，你会看到五门语言：英语、中文、西语、日语、巴西葡语。不是只翻译了首页，而是规则、提示、报错信息全部覆盖。这在独立游戏里很少见，因为翻译贵、维护累。但 YiBoard 从第一天就做了，这篇讲讲为什么。',
        { type: 'h2', text: '棋类天生属于多种文化' },
        '五子棋、象棋、围棋的玩家遍布全球：五子棋在日韩和欧美都有社区，象棋扎根华人世界，围棋在东亚是国民级项目。用英语"默认覆盖所有人"会丢掉这些核心文化圈的用户。五门语言不是讨好，是对这些棋类文化圈的尊重，也是这些棋种本来就在说这些语言。',
        { type: 'h2', text: '全量翻译而不是只翻首页' },
        {
          type: 'ul',
          items: [
            '规则与教程：新手必须在自己的语言里看懂规则，否则门槛翻倍',
            '对局提示与报错：操作反馈必须即时可懂，关键时刻看不懂最劝退',
            '段位与排行榜：等级名称是文化词，不能简单机翻',
            '无障碍细节：日期、计数、UI 文案都要本地化，不只是词汇表',
          ],
        },
        '只翻落地页、进入产品还是英文，是很多"国际化"产品的通病。我们选择把每一处 UI 都做进去，工作量翻了几倍，但每个语言用户进入的都是完整产品。',
        { type: 'h2', text: '怎么做到可持续' },
        '多语言最怕的是"翻译一次就死"：后续每加一个功能，五门语言都要同步更新。我们的做法是结构化文案文件（每门语言一个文件），功能开发时文案与代码分离，新功能上线时五门语言一起过审。成本是持续的，收益也是：每个语言社区都会成为独立的内容与传播节点。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '支持哪些语言？', a: '英语、中文、西语、日语、巴西葡语五门，规则、提示、报错全覆盖。' },
            { q: '为什么不做更多语言？', a: '先深耕五个核心棋类文化圈，语言质量优先于数量。新增语言会逐步评估。' },
            { q: '翻译是机器翻译吗？', a: '不是。文案由人工撰写与校对，尤其是段位等文化词汇，避免机翻的语义偏差。' },
            { q: '切换语言会影响战绩吗？', a: '不会。语言是显示设置，评分和战绩与语言无关，随时切换。' },
          ],
        },
        { type: 'cta', text: '用自己的语言开一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Open the language switcher on yiboardgame.com and you will find five languages: English, 中文, Español, 日本語 and Português do Brasil. Not just the landing page either; rules, tooltips and error messages are all covered. That is rare for an indie game, because translation is expensive and maintenance is exhausting. YiBoard did it from day one. Here is why.',
        { type: 'h2', text: 'Board games belong to many cultures' },
        'Gomoku, Xiangqi and Go have players everywhere: Gomoku has communities in Japan, Korea, the West and beyond; Xiangqi is rooted in the Chinese-speaking world; Go is a national pastime across East Asia. Assuming English "defaults to everyone" loses those core cultural audiences. Five languages are not pandering; they are respect for the cultures these games already speak.',
        { type: 'h2', text: 'Full translation, not a translated landing page' },
        {
          type: 'ul',
          items: [
            'Rules and tutorials: beginners must read the rules in their own language, otherwise the barrier doubles',
            'Match prompts and errors: feedback has to be instantly understandable; a confusing moment is when people quit',
            'Ranks and leaderboards: tier names are cultural words that cannot be machine-translated',
            'Accessibility details: dates, counts and UI copy all get localized, not just a glossary',
          ],
        },
        'Translating only the landing page and leaving the product in English is the disease of many "internationalized" products. We chose to do every screen, which multiplied the work, but every language user enters a complete product.',
        { type: 'h2', text: 'How we keep it sustainable' },
        'The fear with multilingual is "translate once and let it rot": every new feature means syncing five languages. Our approach is structured message files, one per language, with copy separated from code so new features pass all five languages at once. The cost is ongoing; so is the payoff, because each language community becomes its own content and distribution node.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Which languages are supported?', a: 'Five: English, 中文, Español, 日本語 and Português do Brasil, covering rules, prompts and errors.' },
            { q: 'Why not more languages?', a: 'We are deepening the five core board-game culture circles first, quality over quantity. New languages will be evaluated gradually.' },
            { q: 'Is the translation machine-made?', a: 'No. Copy is written and reviewed by humans, especially cultural words like ranks, to avoid machine-translation drift.' },
            { q: 'Does switching language affect my record?', a: 'No. Language is a display setting; your rating and history are independent and you can switch anytime.' },
          ],
        },
        { type: 'cta', text: 'Play a match in your own language', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'free-is-a-design-choice',
    date: '2026-08-11',
    tags: ['product'],
    title: {
      zh: '免费不是营销，是理念',
      en: 'Free Is a Design Choice, Not Marketing',
    },
    description: {
      zh: 'YiBoard 的棋类永久免费：没有广告、没有付费墙、没有体力值。这不是引流话术，而是设计决策。这篇讲清楚为什么 free board games online 是我们的理念，以及我们靠什么活下去。',
      en: 'Every game on YiBoard is free forever: no ads, no paywall, no energy bars. That is not a traffic trick, it is a design decision. Why free board games online is our philosophy, and how we stay alive.',
    },
    keywords: [
      'free board games online',
      'free gomoku no ads',
      'why free game',
      'no paywall chess',
      'play gomoku free',
      'free chinese board games',
    ],
    content: {
      zh: [
        'YiBoard 的所有棋类（五子棋先上，象棋、围棋在路上）永久免费。这句话不是引流话术，而是一个设计决策：我们选择用"免费"来定义一个产品类别，而不是用它来钓用户再变现。这篇讲清楚为什么 free board games online 是我们的理念而不是营销，以及我们靠什么活下去。',
        { type: 'h2', text: '免费是一种产品哲学' },
        '大多数免费游戏的真实模式是：免费引流，付费解锁，时间、功能、虚荣心都能卖。YiBoard 反着来：核心体验永久免费，没有广告、没有付费墙、没有体力值。free gomoku no ads 不是功能，是承诺：你来玩，就是来玩，不是来被算计入金。',
        '为什么敢这么做？因为棋类游戏有一个天然优势：对局本身的价值不随人数增长而下降，反而随社区质量上升。免费带来的是更大的社区、更快的匹配、更强的对手，这些才是玩家留下来的理由。',
        { type: 'h2', text: '免费和不免费之间，我们选了前者' },
        '做个对比就清楚了：付费制棋盘游戏卖的是分析、教练、无限练习；我们的判断是，先让全世界都能无障碍地玩到中华棋类，比先赚第一笔钱重要。no paywall chess 意味着一个巴西学生和一个北京老爷爷在同一个免费大厅里对局，这种连接本身就是产品。',
        '免费还意味着另一种约束：我们必须把成本控制住。浏览器本地 AI 引擎、免登录对局、去中心化的战绩存储，这些设计不只是技术选择，也是"免费可持续"的前提。',
        { type: 'h2', text: '我们靠什么活下去（诚实版）' },
        {
          type: 'ul',
          items: [
            '完全免费：核心对局、AI 对手、排行榜，全部开放',
            '未来的可选付费：只在玩家真正需要的地方（高级 AI 强度、纪念徽章、比赛报名）设置自愿付费',
            '广告？不。广告会破坏对局体验，和"免费是设计"的定位冲突',
          ],
        },
        '这个模式的前提是玩家真的觉得值得。所以我们把每一分开发精力花在棋盘体验上，而不是变现路径上。',
        { type: 'h2', text: '免费理念的三个检验标准' },
        {
          type: 'ul',
          items: [
            '有没有隐藏付费墙？没有。你看到的免费就是免费',
            '广告会不会打断对局？不会。对局页面一个广告位都没有',
            '免费版和付费版体验差多少？不存在付费版。将来可能有自愿捐赠或高级选项，但游戏本身永远免费',
          ],
        },
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 真的永久免费吗？', a: '是。核心体验永久免费，没有广告、没有付费墙、没有体力值，注册只是可选的战绩同步功能。' },
            { q: '免费游戏怎么赚钱？', a: '目前不靠游戏本身赚钱。未来可能在高级 AI 强度、比赛报名等自愿选项上收费，但核心对局永远免费，而且不会有广告。' },
            { q: '免费会不会导致服务不稳定？', a: '不会。对局引擎在浏览器本地运行，没有服务器排队，服务成本极低，这是免费的底气。' },
            { q: '你们和付费棋类平台比有什么优势？', a: '我们免费、无广告、聚焦中华棋类，且对局不依赖服务器算力。想玩付费的高级分析功能，去付费平台；想在干净的环境里下棋，来 YiBoard。' },
          ],
        },
        { type: 'cta', text: '回 YiBoard 首页免费开一局', href: 'https://yiboardgame.com/' },
      ],
      en: [
        'Every game on YiBoard, Gomoku first and Xiangqi and Go on the way, is free forever. That is not a traffic trick. It is a design decision: we chose to define a product category with free, rather than use free as bait and monetize after. This post explains why free board games online is our philosophy, not our marketing, and how we stay alive.',
        { type: 'h2', text: 'Free as a product philosophy' },
        'The real model behind most free games is: free to attract, pay to unlock. Time, features, vanity, all sellable. YiBoard runs the other way: the core experience is free forever, no ads, no paywall, no energy bars. Free gomoku no ads is not a feature, it is a commitment. You come to play, and you play, not to be counted and monetized.',
        'Why dare we do this? Board games have a natural advantage: the value of a match does not drop as the community grows, it rises with community quality. Free brings a bigger community, faster matchmaking, stronger opponents. Those are the reasons players stay.',
        { type: 'h2', text: 'We chose free over not-free' },
        'The contrast is clear: paid chess platforms sell analysis, coaches, unlimited practice. Our call was that letting the world play Chinese board games without any barrier matters more than the first dollar. No paywall chess means a student in Brazil and a grandfather in Beijing can face each other in the same free lobby. That connection is the product.',
        'Free also means discipline: we must keep costs down. A browser-local AI engine, no-login matches, decentralized record storage. Those are not just technical choices, they are the prerequisites of sustainable free.',
        { type: 'h2', text: 'How we stay alive (honest version)' },
        {
          type: 'ul',
          items: [
            'Completely free: core matches, AI opponents, leaderboards, all open',
            'Future optional payments: only where players genuinely want them (higher AI strength, commemorative badges, tournament entry)',
            'Ads? No. Ads would wreck the match experience and contradict the whole point',
          ],
        },
        'This model depends on players actually finding it worth it. So every ounce of development goes into the board experience, not the monetization path.',
        { type: 'h2', text: 'Three tests for the free philosophy' },
        {
          type: 'ul',
          items: [
            'Is there a hidden paywall? No. What you see free is free',
            'Do ads interrupt matches? No. The play page has zero ad slots',
            'How much worse is the free version than the paid version? There is no paid version. Voluntary support options may exist down the road, but the games themselves stay free',
          ],
        },
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Is YiBoard really free forever?', a: 'Yes. The core experience is free forever: no ads, no paywall, no energy bars. Registration is only an optional record-sync feature.' },
            { q: 'How does a free game make money?', a: 'Right now the game itself does not. Future voluntary options like higher AI strength or tournament entry may be charged, but core matches stay free, and there will be no ads.' },
            { q: 'Does free mean unstable service?', a: 'No. The match engine runs locally in the browser, no server queues, and the service cost is tiny. That is the foundation of free.' },
            { q: 'What is your edge over paid chess platforms?', a: 'Free, ad-free, focused on Chinese board games, and matches do not depend on server compute. Want premium analysis, go pay for it elsewhere. Want a clean place to play, come to YiBoard.' },
          ],
        },
        { type: 'cta', text: 'Head to YiBoard and play a free match', href: 'https://yiboardgame.com/' },
      ],
    },
  },  {
    slug: 'gomoku-dan-grades-vs-ranks',
    date: '2026-08-12',
    tags: ['gomoku', 'strategy'],
    title: {
      zh: '真段位 vs 青铜白银：段位制到底在衡量什么',
      en: 'Real Ranks vs Bronze and Platinum: What Dan Grades Actually Measure',
    },
    description: {
      zh: '五子棋的段位制和游戏里的青铜白银完全是两种体系：一个靠赢棋升级、一个靠分数积累。这篇讲段位制怎么来的、段位和等级分（Elo）的区别、以及为什么段位更能说明你的真实水平。',
      en: 'Gomoku dan grades and video game ranks like Bronze and Platinum are completely different systems: one ranks by winning matches, the other by accumulating points. This post covers where dan grades come from, how they differ from Elo, and why grades tell you more about your real level.',
    },
    keywords: [
      'gomoku dan grades',
      'chinese rank system vs elo',
      'gomoku 9 dan',
      'what is a grade',
      '五子棋段位',
      '段位 vs 段位等级',
      '五子棋等级分',
    ],
    content: {
      zh: [
        "很多第一次接触五子棋的朋友会问：你们说的段位，跟游戏里的青铜白银是一回事吗？答案是不是一回事，甚至不是同一个物种。gomoku dan grades 这套体系来自围棋，历史比电子游戏长得多，衡量的是“赢棋的能力”，不是“在线时长”。这篇把段位制讲清楚。",
        { type: 'h2', text: '段位制是怎么来的' },
        "段位制起源于中国魏晋时期的围棋“品”制，后经日本棋院发展成现代的段级体系：业余从 25 级往上数到 1 级，然后是业余 1 段到业余 7 段，职业段位从初段到九段。五子棋沿用了这套框架，只是棋理更简单，段位分布和围棋不完全一样。",
        "核心思想是一个：段位由“比赛成绩”决定，不是由“参与”决定。你赢该赢的人，输给该输的人，段位就会向你的真实水平收敛。这跟青铜白银的“打够场次就能上分”完全不同。",
        { type: 'h2', text: '段位 vs 等级分：两套“数字”' },
        {
          type: 'ul',
          items: [
            "段位（grade/dan）：离散等级，靠晋级赛和比赛成绩认定，反映绝对水平区间",
            "等级分（Elo/rating）：连续分数，每一局按对手强弱加减分，反映相对水平",
            "段位像学历：分档清晰，但同段位内部差距可能很大",
            "等级分像工资：连续可比较，但数字本身没有“段”的称号感",
          ],
        },
        "多数现代棋类平台两者兼用：段位给你称号和晋级目标，等级分给你精确匹配。YiBoard 的排行榜同样用等级分做匹配，段位做展示，这样新手不会被九段吓跑，高手也不会和菜鸟排到一起。",
        { type: 'h2', text: '青铜白银的问题' },
        "电子游戏里的段位体系大多被“参与度”污染：排位赛打得多，即使胜率不到五成，靠保底分也能缓慢上分。这导致段位和真实水平脱钩——钻石可能是“肝”出来的，而不是“赢”出来的。",
        "五子棋段位没有保底分。你想从 3 段升到 4 段，就得在正式对局中证明你能赢过 4 段水平的对手。没有捷径，也正因如此，段位的含金量高得多。这也是 chinese rank system 和 Elo 的一个直观区别：前者重认证，后者重预测。",
        { type: 'h2', text: '怎么看懂一个段位' },
        {
          type: 'ul',
          items: [
            "业余 1-3 段：掌握了基本定式和攻防，能稳定赢过随机落子的新手",
            "业余 4-6 段：有成型套路，开局和中盘有章法，比赛中段属于中坚力量",
            "业余 7 段以上：接近职业水平，对局密度和计算深度明显高一个量级",
            "职业段位：通过职业比赛获得，代表的是全国乃至世界顶层的水平",
          ],
        },
        "下次看到某个棋手是 5 段，你就知道他大概赢过哪些水平的对手，而不是知道他“玩了多少小时”。",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '五子棋段位和游戏段位有什么区别？', a: '游戏段位（青铜/钻石）靠参与度和保底分积累，和真实水平会脱钩；五子棋段位靠晋级赛成绩认定，赢不了对应水平就拿不到对应段位，含金量高得多。' },
            { q: '段位和等级分（Elo）哪个更准？', a: '等级分更精确：每局按对手强弱加减分，连续可比。段位更直观：分档清晰、有称号感。两者互补，多数平台同时使用。' },
            { q: '业余段位最高是几段？', a: '业余段位一般到 7 段（部分地区到 8 段）。再往上就是职业段位，从初段到九段，需要通过职业比赛获得。' },
            { q: '在 YiBoard 上怎么提升段位？', a: '多下正式对局、复盘输棋、学定式和常见骗招。YiBoard 的等级分匹配会逐渐把你送到水平相近的对手面前，赢下该赢的对局，段位自然上升。' },
          ],
        },
        { type: 'cta', text: '去 YiBoard 下一盘，看看你的真实段位', href: 'https://yiboardgame.com/rankings' },
      ],
      en: [
        "People new to Gomoku often ask: is your dan grade the same as Bronze or Platinum in video games? The answer is no, and they are not even the same species. Gomoku dan grades come from Go, a system far older than video games, measuring your ability to win matches, not your time online. This post explains how the grade system works.",
        { type: 'h2', text: 'Where dan grades come from' },
        "The grade system originated in the Chinese Wei-Jin era pin system for Go and was developed by the Nihon Ki-in into the modern dan/kyu structure: amateurs count up from 25 kyu to 1 kyu, then amateur 1 dan to 7 dan, and professional grades run from shodan to 9 dan. Gomoku inherits the same framework, with simpler tactics and a slightly different grade distribution.",
        "The core idea is one thing: a grade is earned by match results, not by participation. Win the games you should win, lose the ones you should lose, and your grade converges on your true level. That is completely different from Bronze and Platinum, where grinding enough matches moves you up regardless of win rate.",
        { type: 'h2', text: 'Grades vs ratings: two kinds of numbers' },
        {
          type: 'ul',
          items: [
            "Dan grade: a discrete rank earned through promotion matches, reflecting an absolute level band",
            "Elo rating: a continuous score adjusted by opponent strength every game, reflecting relative level",
            "A grade is like a degree: clear tiers, but big gaps inside the same tier",
            "A rating is like a salary: continuously comparable, but no title feeling",
          ],
        },
        "Most modern board game platforms use both: grades give you a title and a promotion goal, ratings give you precise matchmaking. YiBoard does the same, ratings for matching and grades for display, so beginners are not scared off by 9-dan names and strong players do not get paired with beginners.",
        { type: 'h2', text: 'The problem with Bronze and Platinum' },
        "Most video game rank systems are polluted by participation: play enough ranked matches and you slowly climb on floor points even below 50% win rate. Ranks drift away from real skill, diamonds can be grinded rather than earned.",
        "Gomoku grades have no floor points. To go from 3 dan to 4 dan, you have to prove in formal games that you can beat opponents at the 4-dan level. No shortcuts, which is exactly why the grade carries weight. That is a visible difference between the chinese rank system and Elo: one certifies, the other predicts.",
        { type: 'h2', text: 'How to read a grade' },
        {
          type: 'ul',
          items: [
            "Amateur 1-3 dan: knows basic joseki and attack/defense, reliably beats random movers",
            "Amateur 4-6 dan: has structured patterns, solid opening and midgame, the backbone of a tournament field",
            "Amateur 7 dan and up: close to professional, visibly deeper reading and calculation",
            "Professional grades: earned through pro tournaments, representing national to world class play",
          ],
        },
        "Next time you see a player listed as 5 dan, you know roughly which levels of opponents they have beaten, not how many hours they have played.",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'What is the difference between Gomoku grades and game ranks?', a: 'Game ranks (Bronze/Diamond) accumulate through participation and floor points, drifting from real skill. Gomoku grades are earned through promotion matches; you cannot hold a grade you cannot win against. Far more meaningful.' },
            { q: 'Which is more accurate, grades or Elo?', a: 'Elo is more precise: every game adjusts by opponent strength and it is continuously comparable. Grades are more intuitive: clear tiers with title value. They complement each other, and most platforms use both.' },
            { q: 'What is the highest amateur grade?', a: 'Amateur grades generally go up to 7 dan (8 in some regions). Above that are professional grades, shodan to 9 dan, earned through professional tournaments.' },
            { q: 'How do I raise my grade on YiBoard?', a: 'Play formal games, review losses, learn joseki and common traps. YiBoard\'s rating matchmaking gradually places you against opponents of similar strength; win the games you should win and your grade rises naturally.' },
          ],
        },
        { type: 'cta', text: 'Play a match on YiBoard and find your real grade', href: 'https://yiboardgame.com/rankings' },
      ],
    },
  },  {
    slug: 'share-gomoku-game-link',
    date: '2026-08-13',
    tags: ['gomoku', 'product'],
    title: {
      zh: '分享对局：一局棋也是一张名片',
      en: 'Share a Game: A Match Is a Calling Card',
    },
    description: {
      zh: '棋下得好，不如把棋局分享出去。YiBoard 的对局分享链接让一局棋变成一张名片：发给朋友、发到群里、或者存进自己的收藏。这篇讲怎么分享、分享链接里有什么、以及为什么复盘才是涨棋最快的路。',
      en: 'Playing well is good, sharing the game is better. YiBoard match links turn a single game into a calling card: send it to a friend, drop it in a group chat, or save it for yourself. This post covers how to share, what a match link contains, and why reviewing is the fastest way to improve.',
    },
    keywords: [
      'share board game link',
      'share gomoku game',
      'replay share',
      'gomoku match link',
      '五子棋 分享对局',
      '棋局复盘',
      '五子棋 观战',
    ],
    content: {
      zh: [
        "五子棋有个其他棋类少见的优势：一局棋很快，快则三分钟，慢也不超过十分钟。这意味着一局棋可以当社交货币用——你下出一手妙手，直接把对局甩到群里，比文字描述一百遍都直观。share gomoku game 这件事，YiBoard 把它做成了链接：复制、粘贴、对方点开就能看整局回放。",
        { type: 'h2', text: '分享链接里有什么' },
        "每个 YiBoard 对局都有一个独立链接，打开后是完整的棋盘回放：每一步棋的顺序、双方用时、胜负结果，全部在里面。对方不需要注册，不需要下载，浏览器打开就能看。这对“甩链接”这个动作来说很重要，门槛越低，分享越频繁。",
        {
          type: 'ul',
          items: [
            "完整回放：每一步棋按顺序播放，可以暂停、跳步、回退",
            "双方信息：棋手名和结果一目了然",
            "观战友好：没下过五子棋的人也能看懂回放",
            "零门槛：对方打开链接即可看，无需账号",
          ],
        },
        { type: 'h2', text: '分享的三种场景' },
        "第一种：赢了甩战绩。跟朋友炫耀一局漂亮的胜利，或者展示自己的妙手，链接就是证据。第二种：复盘求指点。输了把链接发给棋力更高的朋友，请他指出问题手——文字复盘说不清楚的地方，链接一点就懂。第三种：教学素材。教新人下棋时，把典型对局甩过去，比口头讲解十遍有效。",
        "这三种场景的共同点是：分享把对局从“发生过的一件事”变成了“可以反复查看的资料”。这本身就是棋力提升的基础。",
        { type: 'h2', text: '为什么复盘是最快的涨棋路' },
        "职业棋手的时间分配里，复盘占的比例比下棋本身还高。原因很简单：下棋时你凭直觉决策，复盘时你才看清直觉错在哪。特别是输掉的对局，错手往往是同一个模式的重复，复盘一次就能抓住。",
        "用链接复盘的流程：把输棋链接发给自己，第二天再看一遍，重点找三步——最后一步（致命的）、中盘转折、开局失先。找出这三步，这局棋就没白输。",
        { type: 'h2', text: '把一局棋变成名片' },
        "对经常在群里约棋的人来说，分享链接还有一个隐形作用：建立“这个人棋还行”的口碑。别人看过你的对局回放，就知道你的真实水平，约棋的时候心里有底，也不会出现实力悬殊到没有游戏体验的局。从这个角度看，一局棋确实是一张名片。",
        "想试试？去 <a href='/play'>对局大厅</a> 下一局，然后用分享按钮生成你的第一个对局链接。",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: "YiBoard 的对局链接要登录才能看吗？", a: "不用。对方打开链接即可看完整回放，无需注册或下载，这是分享零门槛的设计。" },
            { q: "分享链接会过期吗？", a: "不会。对局记录和链接长期有效，你可以把经典对局存进收藏反复回看。" },
            { q: "能分享给不会下五子棋的人吗？", a: "能。回放界面很直观，没下过棋的人也能看懂一步步的落子顺序，适合教学场景。" },
            { q: "怎么复盘自己的对局？", a: "打开对局链接，重点找三步：最后一步、中盘转折、开局失先。找出这三步，一局棋就没白下。" },
          ],
        },
        { type: 'cta', text: '去对局大厅下一局 →', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        "Gomoku has an advantage most board games lack: a game is fast, three minutes for a quick one, under ten for a long fight. That makes a match usable as social currency. You make a brilliant move, drop the game link in a group chat, and it beats a hundred words of description. share gomoku game in YiBoard is exactly that: copy, paste, the other side opens a full replay.",
        { type: 'h2', text: 'What a match link contains' },
        "Every YiBoard match has its own link that opens a complete board replay: move order, both players' clocks, the result. The viewer needs no account, no download, just a browser. That matters because the lower the barrier, the more people share.",
        {
          type: 'ul',
          items: [
            "Full replay: every move in order, pause, skip and rewind supported",
            "Both players shown with the result at a glance",
            "Spectator-friendly: even people who never played gomoku can follow",
            "Zero barrier: open the link and watch, no account needed",
          ],
        },
        { type: 'h2', text: 'Three sharing scenarios' },
        "First, show off a win. Send a beautiful victory to friends, your clever move is the evidence. Second, ask for a review. Lose a game and send the link to a stronger friend, asking where the mistake is; text explanations fail where a link succeeds. Third, teaching. Teaching a beginner, send typical games and let them study, more effective than ten verbal explanations.",
        "What these have in common: sharing turns a match from something that happened into material you can review. That is the foundation of improvement.",
        { type: 'h2', text: 'Why review is the fastest way to improve' },
        "Pro players spend more time reviewing than playing. The reason is simple: during a game you decide on instinct, during review you see where instinct failed. Losing games especially, the same pattern of mistakes repeats, and one review catches it.",
        "The link-based review loop: send your lost game to yourself, look at it the next day, find three moves, the last one, the mid-game turning point, the opening misstep. Find those three and the game was not wasted.",
        { type: 'h2', text: 'A match as a calling card' },
        "For people who play regularly in groups, sharing has a hidden effect: it builds a reputation of being decent at the game. Once people have seen your replay, they know your level, matchmaking gets fairer, and no one suffers a completely one-sided game. In that sense, a match really is a calling card.",
        "Want to try it? Play one game in the <a href='/play'>match lobby</a>, then use the share button to create your first match link.",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: "Do viewers need an account to open a match link?", a: "No. The link opens a full replay in the browser, no registration or download, by design." },
            { q: "Do match links expire?", a: "No. Match records and links stay valid, so you can save classic games to favorites and revisit them." },
            { q: "Can I share with someone who never played gomoku?", a: "Yes. The replay UI is intuitive, and the move order is easy to follow, which makes it good for teaching." },
            { q: "How do I review my own games?", a: "Open the match link and look for three moves: the last one, the mid-game turning point, the opening misstep. Find those three and the game was not wasted." },
          ],
        },
        { type: 'cta', text: 'Play a game in the lobby →', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'think-offline-win-online',
    date: '2026-08-14',
    tags: ['gomoku', 'product'],
    title: {
      zh: '离线也能想，在线才能赢',
      en: 'Think Offline, Win Online',
    },
    description: {
      zh: 'YiBoard 把活拆开：离线想棋，在线棋牌社区接结果。为什么和陌生人下棋、匹配棋类游戏的设计、实时五子棋能拉开差距。',
      en: 'YiBoard splits the work: you think offline, the online board game community plays the result. Why playing with strangers, matchmaking design, and live gomoku change the game.',
    },
    keywords: ['online board game community', 'play with strangers', 'matchmaking board game', 'live gomoku', 'gomoku online', 'yi board game'],
    content: {
      zh: [
        '大多数棋类 App 都默认你「在线」和「动脑」必须同时发生。YiBoard 偏不这么干。最费脑子的那个环节，想棋，你离线、按自己的节奏来；等到上了「在线棋牌社区」，社区接的是你想好的结果。我老惦记这个点子，因为它真的改变了我下棋的方式。我能在地铁上拆一个局面，水烧开时顺手记一条变化，等脑子清楚了才坐下来打一局实时对战。棋盘不在乎你在哪想的，对手只看到一个更干脆、更快的你。',
        { type: 'h2', text: '和陌生人下棋，省掉尴尬的部分' },
        '去棋社随机坐到一张桌子前，挺怵人的。到了线上，「和陌生人下棋」去掉了怵人的部分，留下了好玩的部分。在 YiBoard 上你不用先聊两句才开局：排队、匹配、开下。没有简介要读，也不用装什么段位。对面那个陌生人，就是一块棋盘。比起社交更爱棋本身的人，会松一口气。而且单局短，遇到不对付的对手也就输三分钟，不是搭进去一整晚。',
        { type: 'h2', text: '会读你水平的匹配棋类游戏' },
        '大多数「匹配」只是一个数字。YiBoard 的匹配棋类游戏逻辑看的是你「怎么赢」，而不只是「赢没赢」。它给近况加权，看你能活下来的开局，也看你栽进去的开局。所以它找的对手，近到有意义，又不至于每局都像抛硬币。我有几周明显感觉它注意到我涨了，下一拨排队就难了一点，是那种良性的难。你不是在跟永远追不上的人硬磨段位。',
        { type: 'h2', text: '实时五子棋是验证想法最快的方式' },
        '我最喜欢的是这个：实时五子棋把「一个念头」在十分钟之内变成「证据」。你离线读了双三陷阱，当晚试一把，第三局就知道自己那套成不成立。反馈环很紧，因为棋快、棋盘诚实。没有骰子，没有隐藏信息，只有你和那条你信的变化。要是它破了，你亲眼看见破在哪。这种练习，慢棋给不了。',
        { type: 'h2', text: '离线时你到底能做什么' },
        {
          type: 'ul',
          items: [
            '复盘一局输棋，标出那步断送全局的棋',
            '对着浏览器里的 AI 练开局，没有倒计时催你',
            '存三个看不懂的局面，通勤发呆时翻出来琢磨',
            '列一张匹配计划：谁你赢、谁赢你、下一步学什么',
          ],
        },
        '这些都不需要大厅。它们只需要安静的十分钟，而我们大多数人拥有的安静十分钟，比自己承认的要多。',
        { type: 'h2', text: '把研究带进排行榜' },
        '离线苦练的意义，全在线上结果。当你带着清楚的计划进排位，排行榜就不再是随机的。你不是在盼着自己涨，而是在执行已经测过的东西。YiBoard 的排位天梯奖励的正是这个：稳的、想过的棋，胜过运气连胜。打开[排行榜](/rankings)，你会看到顶端那些名字，都是先想清楚的人。',
        { type: 'h2', text: '常见问题' },
        {
          type: 'faq',
          items: [
            { q: '在 YiBoard 上研究棋，必须在线吗？', a: '不用。想棋、复盘、练开局，都在浏览器里完成，没有对手也没有倒计时。只有想打实时对战时，你才上线。' },
            { q: '新手也会被公平匹配吗？', a: '会。它从你头几局给你定档，不是拿一个旧分硬套，所以你第一天不会被丢进一堆老手堆里。' },
            { q: '手机上能下实时五子棋吗？', a: '能。棋盘是响应式的，单局又短，等公交的功夫就够认真来一局。' },
            { q: '离线研究会体现在排位里吗？', a: '会，是间接地。你离线做的计划，就是线上执行的计划，而排行榜反映的是执行。' },
          ],
        },
        { type: 'cta', text: '离线想、在线赢，就在 yiboardgame.com →', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Most board game apps assume you\'re online and focused at the same moment. YiBoard flips that. You do the hard part, the thinking, offline and on your own clock. Then the online board game community picks up the result and runs with it. I keep coming back to this idea because it actually changes how I play. I can pick a position apart on the train, scribble a line while the coffee brews, and only sit down to a live match once my head is clear. The board doesn\'t care where the thinking happened. Your opponent just sees a cleaner, faster you.',
        { type: 'h2', text: 'Play with strangers without the awkward part' },
        'Walking up to a random table at a club is scary. Online, \'play with strangers\' loses the scariness and keeps the good parts. On YiBoard you don\'t chat your way into a game; you queue, you get matched, you play. No bios to read, no reputation to fake. The stranger across the board is just a board. For anyone who likes the game more than the small talk, that\'s a relief. And because matches are short, a bad pairing costs you three minutes, not an evening.',
        { type: 'h2', text: 'A matchmaking board game that reads your level' },
        'Most \'matchmaking\' is just a number. YiBoard\'s matchmaking board game logic looks at how you actually win, not only whether you do. It weights recent form, the openings you survive, the ones that eat you alive. So the opponent it finds is close enough to matter but not so close that every game is a coin flip. I\'ve had weeks where it clearly noticed I\'d leveled up, and the next queue felt harder in a good way. You\'re not grinding ranks against people you\'ll never catch.',
        { type: 'h2', text: 'Live gomoku is the fastest way to test an idea' },
        'Here\'s what I love: live gomoku turns a thought into proof in under ten minutes. You read about a double-three trap offline, you try it tonight, and by the third game you know whether it holds. The feedback loop is tight because the game is fast and the board is honest. No dice, no hidden information, just you and the line you believed in. If it breaks, you saw exactly where. That\'s a kind of practice a slow game can\'t give you.',
        { type: 'h2', text: 'What you can actually do offline' },
        {
          type: 'ul',
          items: [
            'Study a lost game and mark the one move that ended it',
            'Drill an opening against the browser AI with no timer breathing down your neck',
            'Save three positions you don\'t understand yet and revisit them on a dull commute',
            'Sketch a matchmaking plan: who you beat, who beats you, what to learn next',
          ],
        },
        'None of this needs a lobby. It needs a quiet ten minutes, which most of us have more of than we admit.',
        { type: 'h2', text: 'Bring the study to the rankings' },
        'The point of all that offline work is the online result. When you carry a clear plan into a ranked match, the rankings stop feeling random. You\'re not hoping to climb; you\'re executing something you already tested. YiBoard\'s ranked ladder rewards exactly this: steady, studied play over lucky streaks. Open the [rankings](/rankings) and you\'ll see the names near the top are the ones who clearly thought first.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Do I need to be online to study on YiBoard?', a: 'No. The thinking, the review, the opening drills all happen in the browser with no opponent and no clock. You only go online when you want a live match.' },
            { q: 'Is matchmaking fair for new players?', a: 'Yes. It seeds you from your first few games rather than a stored rating, so you\'re not dropped into a wall of veterans on day one.' },
            { q: 'Can I play live gomoku on my phone?', a: 'Yes. The board is responsive and the matches are short, which makes a bus stop a reasonable place for a real game.' },
            { q: 'Will my offline study show up in my ranked games?', a: 'It does, indirectly. The plans you make offline are the ones you execute online, and the rankings reflect the execution.' },
          ],
        },
        { type: 'cta', text: 'Think offline, win online at yiboardgame.com →', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'board-games-browser-revival',
    date: '2026-08-15',
    tags: ['product'],
    title: {
      zh: "棋类游戏凭什么在浏览器里复兴？",
      en: "Why Board Games Deserve a Browser Revival",
    },
    description: {
      zh: '棋类天然适合浏览器：规则简单、回合制不要求低延迟、分享链接即可开局、跨设备零安装。这篇讲传统棋类线上化的难点，以及 Web 为什么比 App 更适合棋类。',
      en: 'Board games are a natural fit for the browser: simple rules, turn-based play that tolerates latency, share-a-link matchmaking, and zero-install cross-device play. This piece covers the real challenges of bringing traditional board games online and why the web beats native apps for this genre.',
    },
    keywords: ['classic games browser', 'chinese classics online', 'board games web revival', 'play tradition games', 'gomoku online', 'board game community'],
    content: {
      zh: [
        "说个最近的经历。上周和大学室友视频下五子棋，他人在深圳，我在杭州，一人一杯咖啡，谁都没装新软件，就一个网页链接，开了十五分钟。棋到中盘他说了句：\"这要是放十年前，得下个 300MB 的客户端。\"",
        "他说到点子上了。围棋、象棋、五子棋这些中国经典棋类，其实是最适合跑在浏览器里的游戏。它们不靠画面炫技，不依赖反应速度，核心就是规则、思考和一次次落子。而这些东西，网页全都给得起。",
        {
                "type": "h2",
                "text": "棋类天生就是\"网页友好型\"游戏"
        },
        "先看游戏本身。棋类是回合制，一局对弈里你的操作密度极低，你走一步，对方想两分钟，这在技术上意味着什么？意味着对延迟的要求低到可以忽略。在线麻将、卡牌游戏也一样，但棋类更纯粹。",
        "再看规则。五子棋、象棋、围棋的规则简单到可以写进几行代码，判负、禁手、劫争这些特殊规则，现代浏览器引擎跑起来毫无压力。不需要高性能 GPU，不需要几十 GB 的安装包，一个页面加几段逻辑就够。",
        "然后是设备。网页在哪都能开：办公室的笔记本、客厅的平板、手机浏览器。你不需要在每台设备上装 App、同步存档，一个链接就够了。",
        {
                "type": "h2",
                "text": "线上化真正的难点，从来不是技术"
        },
        "棋类搬到线上，难的不是代码，是三件小事：**礼仪、认输和计时**。",
        "线下对弈，礼仪靠人：落子后不说话，对手思考时别催。线上没人盯着，就需要产品兜底。现在很多网页棋类平台做\"落子音效+思考提示\"，就是替代线下那种仪式感。",
        "认输是个更微妙的事。线下可以投子、可以推枰，线上你得有个明确的\"认输\"按钮，还得处理得了\"对方不认输、就是不落子\"的僵局。好一点的平台会给超时判负、给主动认输，把这种尴尬摊到明面上解决。",
        "计时也麻烦。线下棋馆有钟，线上得有\"不加时\"的读秒和\"加时\"的缓棋机制。新手刚接触的时候，读秒就是一道劝退门槛，所以对新手友好的平台会把计时做成可调、可关的。",
        {
                "type": "h2",
                "text": "为什么 Web 比 App 更适合棋类"
        },
        "App 能做的，网页都能做，但反过来不一定。棋类这个品类，Web 有三个 App 给不了的东西。",
        "第一是**零安装**。点开即玩，不占内存，不弹更新。对用户来说，\"打开一个链接\"和\"下载一个软件\"的心理成本差着数量级。第二是**链接即开局**。约战只发一个 URL，对方点开就进同一张棋盘，没有好友系统、没有房间号，这是网页的天然能力。第三是**排行榜和分享**。棋局结束一键生成对局链接，复盘也好、炫耀也罢，都绕不开分享，而分享正是网页的强项。",
        {
                "type": "h2",
                "text": "新手需要的功能，网页全给得起"
        },
        "线下棋馆对新手并不友好，你会被高手虐得体无完肤。网页棋类在这方面是反过来的，因为它可以做线下做不到的事：",
        {
                "type": "ul",
                "items": [
                        "**悔棋**：下错了撤销一步，新手不用为自己的手误买单",
                        "**提示**：看不明白的时候要个建议，AI 会给下一步的参考",
                        "**复盘**：整局棋录下来，想看的随时回放",
                        "**友谊局无计时**：没人催你，慢慢想"
                ]
        },
        "这些功能加起来，就是\"把新手当人看\"。老棋友照样能找到深度，新人有台阶上，两边不打架。",
        {
                "type": "h2",
                "text": "中文经典棋类的特殊价值"
        },
        "围棋的韵味、象棋的攻守、五子棋的直白，这几种棋放在一起，本身就是一种文化传承。它们规则简单、变化无穷，是最适合用来\"教新手入门传统棋类\"的载体。我们做这个平台的时候，最初的念头就很朴素：让这些棋不只在棋馆和老年活动室里活着，也活在年轻人的浏览器标签页里。",
        "**Q：网页棋类会不会卡？**",
        "A：不会。棋类每步操作产生的数据极小，网页引擎处理绰绰有余，网络延迟影响也很小。你担心的\"卡\"通常来自动画或音效渲染，那些都可以关。",
        "**Q：不注册能玩吗？**",
        "A：能。用链接直接开局不需要注册。要保存战绩、上排行榜，才需要一个轻量账号，几分钟就能建好。",
        "**Q：新手不会下棋怎么办？**",
        "A：平台上有 AI 陪练和提示功能，规则也写在显眼的位置。先和 AI 下几局，比和人对弈轻松，等感觉对了再进人场。",
        "**Q：手机浏览器玩体验好吗？**",
        "A：可以。棋类对触摸屏很友好，落子就是点一下。屏幕小的时候可以放大棋盘，不会误触。",
        "**Q：这些棋类游戏收费吗？**",
        "A：基础对战免费。高级复盘、AI 分析这类功能会区分会员，但核心的\"点开即玩\"永远不设门槛。",
        {
                "type": "h2",
                "text": "让传统棋类活回浏览器"
        },
        "棋类游戏值得在浏览器里复兴，不是因为它技术先进，而是因为它足够古老、足够纯粹。一个链接，一盘棋，两个人，隔着几千公里也能坐到同一张棋盘前。这是我们做这件事的全部理由。",
        "**",
        {
                "type": "cta",
                "text": "打开任意一局，链接即开局 →",
                "href": "/"
        },
        "**",
        {
                "type": "cta",
                "text": "了解更多关于这个项目 →",
                "href": "/about"
        }
],
      en: [
        "Here's something from last week. A college roommate and I played Gomoku over a video call, him in Shenzhen, me in Hangzhou, each with a cup of coffee, nobody installing a thing. One web link, fifteen minutes, done. Mid-game he said, \"Ten years ago this would've meant downloading a 300MB client.\"",
        "He nailed it. Chinese classics like Go, Xiangqi, and Gomoku are the games most naturally suited to running in a browser. They don't rely on flashy graphics or reaction speed. The core is rules, thinking, and one move at a time. The web can handle all of that.",
        {
                "type": "h2",
                "text": "Board games are built for the browser"
        },
        "Look at the game first. Board games are turn-based. Your input density is tiny, you move, your opponent thinks for two minutes. Technically that means the latency requirement is almost irrelevant. Mahjong and card games work the same way, but board games are the purest case.",
        "Then there's the ruleset. Gomoku, Xiangqi, and Go have rules simple enough to fit in a few lines of code. Special cases like forbidden moves, ko fights, and stalemate detection run effortlessly in a modern browser engine. No high-end GPU, no giant install, just a page and some logic.",
        "And devices. The web opens anywhere: the office laptop, the tablet in the living room, the phone in your pocket. No app to install on every machine, no save file to sync. One link is enough.",
        {
                "type": "h2",
                "text": "The real online difficulty was never technical"
        },
        "Moving board games online is hard not because of code, but because of three small things: **etiquette, resignation, and timing**.",
        "Offline, etiquette lives in people. You don't talk after you place a stone. You don't rush your opponent's thinking. Online, nobody is watching, so the product has to fill in. That's why good web platforms add move sounds and thinking indicators, recreating that offline ritual.",
        "Resignation is subtler. Offline you can just push your stones over. Online you need an explicit \"resign\" button, and you have to handle the standoff where one player refuses to resign and also refuses to move. Solid platforms add timeout losses and clean resignation flows, bringing that awkwardness out into the open.",
        "Timing is the third headache. Offline clubs have chess clocks. Online you need countdown timers with no increments, plus friendly games with no clock at all. A hard countdown is a wall for beginners, so beginner-friendly platforms make timing adjustable, even switchable.",
        {
                "type": "h2",
                "text": "Why the web beats an app for board games"
        },
        "Anything an app can do, the web can do too. The reverse isn't true. For this category, the web offers three things an app can't.",
        "First, **zero install**. Open and play. No storage taken, no update prompts. The psychological gap between \"clicking a link\" and \"downloading software\" is an order of magnitude. Second, **link equals game room**. To set up a match you send one URL, the other person clicks and lands on the same board. No friend systems, no room codes. That's native web behavior. Third, **leaderboards and sharing**. When a game ends, generate a replay link in one click. Reviewing it, showing it off, it all runs through sharing, and sharing is where the web lives.",
        {
                "type": "h2",
                "text": "Features beginners need, the web delivers free"
        },
        "Offline clubs are rough on beginners. You get crushed by veterans until you quit. Web board games flip that, because they can do things a physical room can't:",
        {
                "type": "ul",
                "items": [
                        "**Undo**: misclicked? Take it back. Beginners don't pay for a finger slip.",
                        "**Hints**: stuck? Ask for a suggestion and the AI shows a reference move.",
                        "**Replay**: the whole game is recorded, ready to rewatch whenever you want.",
                        "**Unlimited-time friendlies**: nobody pressures you, think as long as you like."
                ]
        },
        "Put together, that's a product that treats beginners like people. Old hands still find depth, new players have a ladder to climb, and the two never collide.",
        {
                "type": "h2",
                "text": "The special value of Chinese classic games"
        },
        "The elegance of Go, the attack and defense of Xiangqi, the plainness of Gomoku. Together these games carry a cultural inheritance. Their rules are simple and their possibilities are endless, which makes them the best vehicle for teaching someone traditional board games from scratch. When we started this platform, the thought was plain: let these games live not just in chess halls and senior activity rooms, but in young people's browser tabs too.",
        "**Q: Will web board games lag?**",
        "A: No. Each move produces a tiny amount of data that browser engines handle easily, and network latency matters little here. The \"lag\" people worry about usually comes from animations or sound rendering, and you can turn those off.",
        "**Q: Can I play without registering?**",
        "A: Yes. Link-based matches need no account. You only register, which takes minutes, when you want to keep records or climb the leaderboard.",
        "**Q: What if I've never played before?**",
        "A: There's an AI sparring partner and a hint feature, and the rules sit somewhere visible. Play a few games against the AI first, it's gentler than facing humans, and jump into the player pool when you feel ready.",
        "**Q: Does it work well on a phone browser?**",
        "A: It does. Board games are touch-friendly, a move is one tap. On small screens you can zoom the board, and mis-taps are rare.",
        "**Q: Are these games paid?**",
        "A: Basic matches are free. Advanced replay and AI analysis sit behind a membership, but the core, open-and-play experience, never does.",
        {
                "type": "h2",
                "text": "Bring traditional games back to the browser"
        },
        "Board games deserve a browser revival not because the tech is advanced, but because they're old and pure enough to fit. One link, one board, two people, sitting at the same table from a thousand kilometers apart. That's the whole reason we built this.",
        "**",
        {
                "type": "cta",
                "text": "Start any game, the link is the room →",
                "href": "/"
        },
        "**",
        {
                "type": "cta",
                "text": "Read more about this project →",
                "href": "/about"
        }
],
    },
  },
  {
    slug: 'no-ads-no-tracking-just-games',
    date: '2026-08-16',
    tags: ['product', 'privacy'],
    title: {
      zh: "零广告、零追踪、只有游戏",
      en: "No Ads, No Tracking, Just Games",
    },
    description: {
      zh: '棋类游戏网站为什么能零广告零追踪？这篇讲清楚在线棋类站点的商业模型：不卖数据、不插广告，靠什么活；以及 privacy first game 对玩家的实际好处。',
      en: 'Why can a board game site run with no ads and no tracking? This post explains the business model behind privacy-first game sites, how they survive without selling data, and what no tracking means for players.',
    },
    keywords: ['privacy first game', 'no ads game site', 'no tracking browser game', 'clean game experience', 'board game privacy', 'gomoku online'],
    content: {
      zh: [
        "打开一个游戏网站，先关三个弹窗广告，再点掉一个\"同意 Cookie\"，等 30 秒预热……这种体验大家太熟了。所以当 YiBoard 说自己是零广告零追踪时，第一反应多半是：那你们靠什么活？",
        "这个问题问得对。先把话说明白：**不做广告、不卖数据，不等于网站不花钱**。服务器要租，域名要续费，代码要人维护。区别在于钱从哪来。privacy first game 的路径不是没有商业模式，而是商业模式里没有\"你的数据\"这一项。",
        {
                "type": "h2",
                "text": "零广告零追踪到底指什么"
        },
        "拆开看有三层：不展示第三方广告、不植入分析追踪脚本、不把对局数据卖给任何人。广告 SDK 常常自带追踪器，所以\"不插广告\"和\"不追踪\"在技术上是同一件事的两面——砍掉一个，另一个通常也没了。",
        "对玩家的实际好处很具体：没有弹窗打断对局，页面加载更快，没有跨站追踪器把你的棋局和购物记录绑在一起。棋下到残局时，不会突然飘出一个真人秀广告。",
        {
                "type": "h2",
                "text": "没有广告，靠什么活"
        },
        "常见的有三种：订阅、打赏、增值功能。棋类站点的用户画像很特殊——愿意花时间下棋的人，通常也愿意为纯粹的体验付费。",
        "订阅制的逻辑是：你要的是干净、无干扰的对局环境，那这本身就值得付费。免费用户照常能下棋，订阅用户解锁的是排位数据、复盘工具、无等待队列这类增量价值，而不是\"付费去广告\"这种反人性的设计。",
        {
                "type": "h2",
                "text": "为什么棋类站特别适合这条路"
        },
        "不是所有游戏都能零广告生存。棋类有几个先天优势：对局时间长，用户黏性高，社区氛围稳定。广告主的逻辑是打断你、让你分心，而棋类的核心价值恰好是专注——两者天然冲突。",
        "玩家因为\"干净\"留下来，留下来之后自然产生付费意愿，付费维持\"干净\"。这个循环一旦转起来，比任何广告网络都健康。",
        {
                "type": "h2",
                "text": "玩家怎么验证一个站点是否真的无追踪"
        },
        "不用信宣传，自己查：浏览器开发者工具打开网络面板，下一盘棋，看有没有请求发往第三方域名；或者看隐私政策里\"我们收集什么\"那一节——写\"只存对局记录\"的，和写\"用于广告优化\"的，一眼就能分辨。",
        "**零广告零追踪，网站怎么赚钱？** 靠订阅和增值功能。免费用户正常下棋，付费解锁排位数据、复盘工具等增量价值。商业模式里没有\"你的数据\"这一项。",
        "**没有广告会不会偷偷追踪？** 不会，而且技术上很难藏。任何追踪脚本都会产生网络请求，开发者工具里一目了然。不信任就自己查，查完就放心。",
        "**零广告的游戏体验值多少钱？** 对棋类玩家来说很值：没有弹窗打断残局思考，没有追踪器拖慢页面。干净本身是稀缺品，尤其在免费游戏普遍靠广告变现的今天。",
        "想亲自体验一把零广告零追踪的棋局？来",
        {
                "type": "cta",
                "text": "YiBoard 下盘棋",
                "href": "/play"
        },
        "或者先看看我们的",
        {
                "type": "cta",
                "text": "隐私承诺",
                "href": "/privacy"
        }
      ],
      en: [
        "Open a game site and the routine starts: dismiss three popup ads, click through a cookie banner, wait through a 30-second warmup. Everyone knows that dance. So when YiBoard says no ads, no tracking, the first reaction is usually: then how do you pay for it?",
        "Fair question. Let's be clear: no ads and no data selling does not mean the site costs nothing. Servers rent, domains renew, code needs maintenance. The difference is where the money comes from. A privacy first game site is not a site without a business model. It is a site whose model simply has no room for \"your data\".",
        {
                "type": "h2",
                "text": "What no ads, no tracking actually means"
        },
        "Three layers: no third-party ads, no analytics trackers, no selling match data to anyone. Ad SDKs ship with trackers built in, so \"no ads\" and \"no tracking\" are technically two sides of the same decision. Cut one and the other usually disappears.",
        "The player-facing benefits are concrete: no popups interrupting a match, faster page loads, no cross-site trackers tying your games to your shopping history. No reality-show ad floating in during an endgame.",
        {
                "type": "h2",
                "text": "How a no-ad site stays alive"
        },
        "Three common paths: subscription, donations, and value-add features. Board game players have a special profile: people who spend hours on a match tend to pay for a clean experience.",
        "The subscription logic is simple: if you want a clean, distraction-free place to play, that is worth paying for. Free players play normally; subscribers unlock ranked stats, review tools, and no-wait queues. Not \"pay to remove ads\", which is a hostile design, but genuine added value.",
        {
                "type": "h2",
                "text": "Why board games fit this model especially well"
        },
        "Not every genre can survive without ads. Board games have built-in advantages: long matches, sticky users, a calm community. The advertiser's logic is to interrupt and distract you. A board game's core value is focus. The two are in direct conflict.",
        "Players stay because it is clean, staying builds willingness to pay, payment keeps it clean. Once that loop turns, it is healthier than any ad network.",
        {
                "type": "h2",
                "text": "How players can verify a site really has no trackers"
        },
        "Do not trust the marketing. Open the browser dev tools network panel, play a match, and check whether any request goes to a third-party domain. Or read the privacy policy's \"what we collect\" section: \"we only store match records\" versus \"used for ad optimization\" tells you everything in one glance.",
        "**How does a no-ads, no-tracking site make money?** Subscriptions and value-add features. Free players play normally; paying unlocks ranked stats, review tools, and similar. The model has no room for \"your data\".",
        "**Could a no-ad site secretly track?** No, and it would be hard to hide. Any tracking script produces network requests visible in the dev tools. Check it yourself, then relax.",
        "**What is a clean game experience worth?** For board game players, a lot: no popups breaking endgame thinking, no trackers slowing the page. Clean is scarce, especially in a free-game world built on ad monetization.",
        "Want to play a match with zero ads and zero tracking? Head over to",
        {
                "type": "cta",
                "text": "YiBoard and play",
                "href": "/play"
        },
        "or read our",
        {
                "type": "cta",
                "text": "privacy commitment",
                "href": "/privacy"
        }

      ],
    },
  },

  {
    slug: 'one-minute-to-play',
    date: '2026-08-17',
    tags: ['gomoku', 'product'],
    title: {
      zh: "YiBoard 的北极星：一小时内入门",
      en: "The North Star: A Game in One Minute",
    },
    description: {
      zh: 'instant play games 为什么是棋类网站的北极星：一个链接就是一个房间、零注册开局、五秒钟把对面拉上桌，以及为什么“快到不想关”才是留人的关键。',
      en: 'Why instant play games are the north star for a board game site: one link is the room, zero sign-up, five seconds to pull an opponent to the table, and why "fast enough to not want to close" is what keeps players.',
    },
    keywords: ['instant play games', 'one minute to play', 'fastest game start', 'zero friction gaming', 'no registration games', 'browser board game'],
    content: {
      zh: [
        "每个产品都该有一个北极星指标，YiBoard 的北极星是：从打开链接到开始下棋，不超过一分钟。instant play games 不是功能，是产品哲学——浏览器即玩的意义，就是把“我想下棋”到“我已经在下棋”之间的距离压到最短。",
        {
                "type": "h2",
                "text": "为什么一分钟这么重要"
        },
        "棋类游戏的流失点不在对局中，在开局前。想下棋的人打开网站，如果先要注册、再要匹配、再要等，那盘棋大概率不会发生。一分钟内上桌，等于在冲动消退前把棋局递到你面前。",
        "对线下约棋也一样。两个朋友想下盘五子棋，谁愿意先下载 App、再互相加好友？一个链接发过去，对方点开就能下，这就是 instant play games 的完整价值。",
        {
                "type": "h2",
                "text": "一个链接就是一个房间"
        },
        "YiBoard 的核心设计是链接即房间。你创建对局，把链接发给对手，对方打开就是这盘棋。没有注册、没有匹配队列、没有“对方已离线”。链接本身就是棋盘。",
        "这解决了一个真实问题：棋类游戏最大的门槛不是规则，是“凑齐两个人”。链接即房间把凑人的成本降到了发一条消息。",
        {
                "type": "h2",
                "text": "零注册怎么防作弊"
        },
        "很多人会问：不注册，怎么保证对方认真下？YiBoard 的答案是服务器端裁判。每一手都在服务器校验，改客户端也改不了棋盘状态。注册表管身份，裁判管公正，两者不必绑定。",
        "段位系统同样不需要注册才能看：真实段位制（Grade/Dan，1200 分起）让每盘棋都有意义，输了想翻盘，赢了想保级，这就是留存。",
        {
                "type": "h2",
                "text": "一分钟上桌的实操路径"
        },
        "把“打开链接到落子”拆开看，每一步都不该有摩擦：",
        {
                "type": "ul",
                "items": [
                        "打开页面：无广告、无弹窗、无 Cookie 墙",
                        "创建对局：一个点击，得到链接",
                        "发给对手：微信、邮件、随便什么",
                        "对手点开：棋盘已在，直接落子"
                ]
        },
        "加起来不到一分钟。这就是 one minute to play 的产品化：不是更快加载，而是把“开一局”这个动作本身变轻。",
        {
                "type": "h2",
                "text": "快到不想关"
        },
        "留人的秘诀不是“功能多”，是“快到不想关”。想下棋时点开就下，下完想走就走，下次想下棋还会来。浏览器即玩的平台，赢在每一次“想玩就能玩”。",
        "**零注册能保证棋品吗？** 靠服务器端裁判。每一手服务端校验，改客户端不能作弊。身份和公正分开，注册不是必要前提。",
        "**一个链接能开几盘棋？** 每个链接对应一个对局。想下多盘就多发几个链接，或者用站内匹配。链接即房间，房间就是那一盘。",
        "**手机上好操作吗？** 好。棋盘可缩放，一手一tap，误触概率低，和桌面端体验一致。",
        "**下完这盘还能复盘吗？** 基础对局免费，深度复盘和 AI 分析在会员里，但“打开就能下”这件事永远免费。",
        "想现在就开一盘？",
        {
                "type": "cta",
                "text": "去下一盘棋 →",
                "href": "/"
        },
        "**",
        {
                "type": "cta",
                "text": "看看我们为什么做浏览器即玩 →",
                "href": "/about"
        }
      ],
      en: [
        "Every product needs a north star metric. YiBoard's is: from opening the link to making your first move, under one minute. Instant play games are not a feature, they are the product philosophy. Browser play exists to compress the distance between 'I want to play' and 'I am already playing' down to almost nothing.",
        {
                "type": "h2",
                "text": "Why one minute matters"
        },
        "Board games lose players before the game, not during it. Someone wants to play, opens the site, and if they have to register, matchmake, and wait, that game probably never happens. Getting to the board in under a minute means putting the game in front of them before the impulse fades.",
        "The same logic applies offline. Two friends want a quick game of gomoku. Who downloads an app and adds each other as friends first? One link sent, the other side clicks and plays. That is the whole value of instant play games.",
        {
                "type": "h2",
                "text": "One link is the room"
        },
        "YiBoard's core design is link-as-room. You create a game, send the link to your opponent, and they open it straight into that board. No sign-up, no matchmaking queue, no 'opponent is offline'. The link is the board.",
        "This solves a real problem: the biggest barrier in board games is not the rules, it is gathering two people. Link-as-room drops the cost of gathering to sending one message.",
        {
                "type": "h2",
                "text": "How zero sign-up stays fair"
        },
        "People ask: without registration, how do you know the opponent plays fair? The answer is server-side arbitration. Every move is validated on the server, so editing your client cannot change the board state. Registration manages identity; the referee manages fairness. They do not have to be bound together.",
        "The ranking system also works without sign-up: real grades (Grade/Dan, starting at 1200) give every game meaning. Lose and you want a rematch, win and you want to protect your rank. That is retention.",
        {
                "type": "h2",
                "text": "The one-minute path to the board"
        },
        "Break 'open link to first move' down and no step should have friction:",
        {
                "type": "ul",
                "items": [
                        "Open the page: no ads, no pop-ups, no cookie walls",
                        "Create a game: one click, get the link",
                        "Send it: WeChat, email, anything",
                        "Opponent opens it: the board is there, first move now"
                ]
        },
        "Under a minute in total. That is one minute to play, productized: not faster loading, but making the act of starting a game lighter.",
        {
                "type": "h2",
                "text": "Fast enough to not want to close"
        },
        "Retention is not about feature count. It is about being fast enough to not want to close. Open and play when you want to play, leave when you are done, come back next time you want a game. Browser play wins on every single 'playable right now'.",
        "**Can zero sign-up guarantee fair play?** Through server-side arbitration. Every move is validated server-side, so client edits cannot cheat. Identity and fairness are separate; registration is not a prerequisite.",
        "**How many games per link?** One link is one game. Want more games, send more links or use in-site matchmaking. Link is the room, the room is that game.",
        "**Is it comfortable on mobile?** Yes. The board zooms, a move is one tap, mis-taps are rare, and the experience matches desktop.",
        "**Can I review the game after?** Basic matches are free. Deep replay and AI analysis sit behind membership, but open-and-play is always free.",
        "Ready for a game right now?",
        {
                "type": "cta",
                "text": "Go play a game →",
                "href": "/"
        },
        "**",
        {
                "type": "cta",
                "text": "Why we built browser play →",
                "href": "/about"
        }
      ]
    }
  },
  {
    slug: "play-gomoku-against-ai",
    date: "2026-08-29",
    tags: ['gomoku', 'strategy', 'ai'],
    title: {
      zh: "怎么和 AI 对战练习",
      en: "How to Practice Against the AI",
    },
    description: {
      zh: "五子棋 AI 对手是最好的练习伙伴：没有情绪、不会分心、随时可以复盘。这篇讲清楚怎么和 AI 对战、怎么利用它提升水平。",
      en: "The AI opponent is the best practice partner: no emotions, no distractions, always available for review. Here's how to play against AI and use it to improve.",
    },
    keywords: ["gomoku ai practice", "play gomoku against ai", "gomoku strategy practice", "五子棋 AI 对战", "gomoku training"],
    content: {
      zh: [
        "和真人对战有压力，和 AI 对战没有。AI 不会因为你输了三局就生气，也不会因为你问了一个基础问题就嘲笑你。这正是它作为练习工具的优势：无限耐心、随时可复盘、每一步都可以反复思考。在 yiboardgame.com 的对战页直接挑战 AI，不用注册，不用等待。",
        { type: "h2", text: "AI 对手有多强" },
        "YiBoard 的 AI 基于 alpha-beta 剪枝，500ms 搜索预算。这意味着它不会下出世界冠军级别的棋，但比绝大多数业余玩家强。对初学者来说，这是完美的对手——你不会被打得毫无还手之力，但每一局都要求你认真思考。随着你水平提升，AI 的 500ms 预算自然成为你的成长天花板，推动你去研究禁手规则和开局理论。",
        { type: "h2", text: "怎么开始和 AI 对战" },
        {
          type: "ul",
          items: [
            "打开 yiboardgame.com/play，直接点击“与 AI 对战”按钮",
            "选择执黑或执白（推荐先执黑，学习先手优势）",
            "AI 会在你每步 500ms 内给出最强回应",
            "对局结束后可立即复盘，分析每一手的得失",
          ],
        },
        { type: "h2", text: "怎么利用 AI 练习提升" },
        "和 AI 对战最值钱的部分不是胜负，是复盘。每一局结束后，回看关键节点：哪一手是转折点？哪一步如果换成别的走法结果会不同？AI 不会告诉你答案，但提出这些问题本身就是最好的学习方式。",
        {
          type: "ul",
          items: [
            "每周固定打 5-10 局，对手都是 AI",
            "每局结束后复盘至少 3 手关键棋",
            "记录自己常犯的失误类型（漏防、贪攻、禁手违规）",
            "针对弱点定向练习：如果总漏防，就多打防守局",
          ],
        },
        { type: "h2", text: "FAQ" },
        {
          type: "faq",
          items: [
            { q: "AI 对手会作弊吗？", a: "不会。AI 在浏览器本地运行，每步 500ms 搜索预算，和你水平相当。" },
            { q: "和 AI 对战需要注册吗？", a: "不需要。打开 yiboardgame.com/play 直接开始。注册只为跨设备保存战绩。" },
            { q: "AI 什么水平？能当教练吗？", a: "比业余新手强，比高手弱。它不会主动教你，但复盘是你最好的学习工具。" },
          ],
        },
        { type: "cta", text: "去和 AI 下一局 →", href: "https://yiboardgame.com/play" },
      ],
      en: [
        "Playing against a real person comes with pressure. Playing against AI doesn't. The AI won't get mad because you lost three games in a row, and it won't laugh at your basic questions. That's exactly why it's the best practice tool: infinite patience, instant review, and every move can be thought through repeatedly. Challenge the AI directly on the play page at yiboardgame.com — no signup, no waiting.",
        { type: "h2", text: "How strong is the AI opponent" },
        "YiBoard's AI uses alpha-beta pruning with a 500ms search budget. It won't play world-champion level moves, but it's stronger than most casual players. For beginners, that's perfect — you won't get crushed, but every game demands real thought. As your level grows, the AI's 500ms budget naturally becomes your ceiling, pushing you to study forbidden-move rules and opening theory.",
        { type: "h2", text: "How to start playing against AI" },
        {
          type: "ul",
          items: [
            "Open yiboardgame.com/play and click the 'Play vs AI' button",
            "Choose black or white (start with black to learn the first-move advantage)",
            "The AI responds within your 500ms budget per move",
            "Review every game immediately after it ends",
          ],
        },
        { type: "h2", text: "How to use AI to improve" },
        "The most valuable part of playing AI isn't winning or losing — it's the review. After each game, look back at the key moments: which move was the turning point? What would have happened if you'd played differently? The AI won't give you answers, but asking these questions is itself the best way to learn.",
        {
          type: "ul",
          items: [
            "Play 5-10 games per week against AI consistently",
            "Review at least 3 key moves after every game",
            "Track your common mistake patterns (missed blocks, over-attack, forbidden move violations)",
            "Target your weaknesses: if you keep missing blocks, play more defensive games",
          ],
        },
        { type: "h2", text: "FAQ" },
        {
          type: "faq",
          items: [
            { q: "Does the AI cheat?", a: "No. The AI runs locally in your browser with a 500ms search budget — it's at your level, not above it." },
            { q: "Do I need to sign up to play AI?", a: "No. Open yiboardgame.com/play and start immediately. Signup is only for saving records across devices." },
            { q: "What level is the AI? Can it coach me?", a: "Stronger than a casual beginner, weaker than an expert. It won't teach you proactively, but reviewing your games is the best learning tool you have." },
          ],
        },
        { type: "cta", text: "Play a game against the AI →", href: "https://yiboardgame.com/play" },
      ],
    },
  },
  {
    slug: 'spectator-mode-watch-and-learn',
    date: '2026-08-30',
    tags: ['gomoku', 'learning'],
    title: {
      zh: '观战功能说明：从观看中学习',
      en: 'Spectator Mode: Watch and Learn',
    },
    description: {
      zh: '提高五子棋水平的最佳方式之一是观看高手对局。观战模式让你观察策略、学习模式，并发展自己的棋感。',
      en: 'One of the best ways to improve at Gomoku is to watch others play. Spectator mode lets you observe strategies, learn patterns, and develop your game sense.',
    },
    keywords: ['watch gomoku game', 'spectate board game', 'watch gomoku match', 'learn from watching', '五子棋 观战', '学习 Gomoku'],
    content: {
      zh: [
        '提高五子棋水平的最佳方式之一是观看别人下棋。观战模式让你观察策略、学习模式，并发展自己的棋感。',
        { type: 'h2', text: '为什么观看有助于学习' },
        'Regular play helps you learn tactics. Watching helps you learn strategy. By observing experienced players, you internalize patterns without the pressure of making moves yourself.',
        { type: 'h2', text: '如何有效使用观战模式' },
        {
          type: 'ul',
          items: [
            '观看不同水平的玩家：高手学习高级策略，同等水平学习可借鉴的决策',
            '暂停并分析：在关键时刻暂停，问自己"这步棋为什么有效？"',
            '做笔记：记下有趣的模式、策略或陷阱',
            '与他人讨论：不同视角揭示你可能错过的见解',
          ],
        },
        { type: 'h2', text: '应该关注什么' },
        { type: 'h2', text: '开局策略' },
        '顶级玩家如何开局？他们控制中心还是从边缘构建？',
        { type: 'h2', text: '中盘战术' },
        '观察玩家如何平衡进攻和防守。注意他们何时攻击，何时巩固。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '我能实时观看比赛吗？', a: '是的，观战模式让你实时观看正在进行的比赛。' },
            { q: '有回放可用吗？', a: '许多平台提供游戏回放，让你以自己的节奏研究比赛。' },
            { q: '应该在玩之前还是之后观看？', a: '两者都有好处。玩之前观看学习策略，玩之后观看分析自己的比赛。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 免费观战 →', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'One of the best ways to improve at Gomoku is to watch others play. Spectator mode lets you observe strategies, learn patterns, and develop your own game sense.',
        { type: 'h2', text: 'Why Watching Helps You Learn' },
        'Regular play helps you learn tactics. Watching helps you learn strategy. By observing experienced players, you internalize patterns without the pressure of making moves yourself.',
        { type: 'h2', text: 'How to Use Spectator Mode Effectively' },
        {
          type: 'ul',
          items: [
            'Watch different skill levels: learn advanced strategies from top players, relatable decisions from your level',
            'Pause and analyze: pause at key moments and ask "why did this move work?"',
            'Take notes: jot down interesting patterns, strategies, or traps',
            'Discuss with others: different perspectives reveal insights you might have missed',
          ],
        },
        { type: 'h2', text: 'What to Look For' },
        { type: 'h2', text: 'Opening Strategies' },
        'How do top players start? Do they control the center or build from the edges?',
        { type: 'h2', text: 'Midgame Tactics' },
        'Watch how players balance offense and defense. Notice when they attack and when they solidify.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Can I watch games in real-time?', a: 'Yes, spectator mode lets you watch live games as they happen.' },
            { q: 'Are there replays available?', a: 'Many platforms offer game replays so you can study matches at your own pace.' },
            { q: 'Should I watch before or after playing?', a: 'Both have benefits. Watch before to learn strategies, watch after to analyze your own games.' },
          ],
        },
        { type: 'cta', text: 'Watch games free on YiBoard →', href: 'https://yiboardgame.com/play' },
      ],
    
    },
  },

  {
    slug: "keyboard-friendly-board-games",
    date: "2026-08-31",
    tags: ["accessibility","keyboard-controls","board-games"],
    title: {
      zh: "键盘友好的棋类游戏： accessibility 为所有人",
      en: "Keyboard-Friendly Board Games",
    },
    description: {
      zh: "了解如何使用键盘玩棋类游戏，为行动不便玩家提供无障碍选项。",
      en: "Learn how to play board games using only your keyboard. Accessible gaming for players with mobility challenges.",
    },
    keywords: ["accessibility","keyboard controls","board games"],
    content: {
      zh: [
  "---",
  "title: \"Keyboard-Friendly Board Games: Accessibility for Everyone\"",
  "description: \"Learn how to play board games using only your keyboard. Accessible gaming options for players with mobility challenges or preference for keyboard controls.\"",
  "pubDate: 2026-08-31",
  "tags: [\"accessibility\", \"keyboard controls\", \"board games\", \"inclusive gaming\"]",
  "category: \"guide\"",
  "relatedSkins: []",
  "---",
  "Board games should be accessible to everyone, regardless of physical ability. Keyboard-friendly controls make games playable for users with mobility challenges, and many gamers simply prefer the precision of keyboard input.",
  "Accessibility Benefits:",
  {
    "type": "ul",
    "items": [
      "Players with limited hand mobility can participate",
      "Users with motor impairments can play comfortably",
      "Reduces fatigue during long gaming sessions",
      "Supports screen reader users in digital implementations"
    ]
  },
  "Performance Benefits:",
  {
    "type": "ul",
    "items": [
      "Faster input for competitive play",
      "Precise mouse-less navigation",
      "Consistent control scheme across games",
      "Reduces hand strain during extended play"
    ]
  },
  {
    "type": "h2",
    "text": "Gomoku (Five in a Row)"
  },
  "| Key | Action |",
  "|-----|--------|",
  "| Arrow Keys | Move cursor on board |",
  "| Enter/Space | Place stone |",
  "| Tab | Switch between player/AI |",
  "| R | Reset game |",
  "| Esc | Return to menu |",
  {
    "type": "h2",
    "text": "Chess"
  },
  "| Key | Action |",
  "|-----|--------|",
  "| Arrow Keys | Select piece, move |",
  "| Numpad 1-9 | Quick move (advanced) |",
  "| Enter | Confirm move |",
  "| U | Undo last move |",
  "| H | Show hints |",
  {
    "type": "h2",
    "text": "Xiangqi (Chinese Chess)"
  },
  "| Key | Action |",
  "|-----|--------|",
  "| Arrow Keys | Navigate board |",
  "| Enter | Select/move piece |",
  "| 1-9 | Quick piece selection |",
  "| S | Show possible moves |",
  "| D |悔棋 (Undo) |",
  "If you're building a board game, consider these accessibility features:",
  "1. **Full keyboard navigation** — All interactive elements reachable via Tab",
  "2. **Visual keyboard shortcuts** — Display keys on buttons and controls",
  "3. **Sound feedback** — Audio cues for moves and actions",
  "4. **High contrast mode** — For players with visual impairments",
  "5. **Adjustable speed** — Control game pace for different needs",
  "For Players:",
  {
    "type": "ul",
    "items": [
      "Practice the control scheme before competitive play",
      "Use muscle memory for common moves",
      "Consider ergonomic keyboard positioning",
      "Take breaks to prevent strain"
    ]
  },
  "For Developers:",
  {
    "type": "ul",
    "items": [
      "Test with keyboard-only navigation",
      "Provide visible focus indicators",
      "Support both mouse and keyboard input",
      "Document all keyboard shortcuts"
    ]
  },
  "Technology is making board games more accessible than ever:",
  {
    "type": "ul",
    "items": [
      "AI-powered screen readers for visual boards",
      "Haptic feedback controllers",
      "Voice control integration",
      "Cloud gaming with keyboard optimization"
    ]
  },
  "Keyboard-friendly controls open board gaming to more players. Whether for accessibility needs or personal preference, proper keyboard support improves the experience for everyone.",
  "At YiBoard, we're committed to making Chinese board games accessible. Our Gomoku game supports full keyboard navigation — try it and let us know what improvements you'd like to see."
],
      en: [
  "---",
  "title: \"Keyboard-Friendly Board Games: Accessibility for Everyone\"",
  "description: \"Learn how to play board games using only your keyboard. Accessible gaming options for players with mobility challenges or preference for keyboard controls.\"",
  "pubDate: 2026-08-31",
  "tags: [\"accessibility\", \"keyboard controls\", \"board games\", \"inclusive gaming\"]",
  "category: \"guide\"",
  "relatedSkins: []",
  "---",
  "Board games should be accessible to everyone, regardless of physical ability. Keyboard-friendly controls make games playable for users with mobility challenges, and many gamers simply prefer the precision of keyboard input.",
  "Accessibility Benefits:",
  {
    "type": "ul",
    "items": [
      "Players with limited hand mobility can participate",
      "Users with motor impairments can play comfortably",
      "Reduces fatigue during long gaming sessions",
      "Supports screen reader users in digital implementations"
    ]
  },
  "Performance Benefits:",
  {
    "type": "ul",
    "items": [
      "Faster input for competitive play",
      "Precise mouse-less navigation",
      "Consistent control scheme across games",
      "Reduces hand strain during extended play"
    ]
  },
  {
    "type": "h2",
    "text": "Gomoku (Five in a Row)"
  },
  "| Key | Action |",
  "|-----|--------|",
  "| Arrow Keys | Move cursor on board |",
  "| Enter/Space | Place stone |",
  "| Tab | Switch between player/AI |",
  "| R | Reset game |",
  "| Esc | Return to menu |",
  {
    "type": "h2",
    "text": "Chess"
  },
  "| Key | Action |",
  "|-----|--------|",
  "| Arrow Keys | Select piece, move |",
  "| Numpad 1-9 | Quick move (advanced) |",
  "| Enter | Confirm move |",
  "| U | Undo last move |",
  "| H | Show hints |",
  {
    "type": "h2",
    "text": "Xiangqi (Chinese Chess)"
  },
  "| Key | Action |",
  "|-----|--------|",
  "| Arrow Keys | Navigate board |",
  "| Enter | Select/move piece |",
  "| 1-9 | Quick piece selection |",
  "| S | Show possible moves |",
  "| D |悔棋 (Undo) |",
  "If you're building a board game, consider these accessibility features:",
  "1. **Full keyboard navigation** — All interactive elements reachable via Tab",
  "2. **Visual keyboard shortcuts** — Display keys on buttons and controls",
  "3. **Sound feedback** — Audio cues for moves and actions",
  "4. **High contrast mode** — For players with visual impairments",
  "5. **Adjustable speed** — Control game pace for different needs",
  "For Players:",
  {
    "type": "ul",
    "items": [
      "Practice the control scheme before competitive play",
      "Use muscle memory for common moves",
      "Consider ergonomic keyboard positioning",
      "Take breaks to prevent strain"
    ]
  },
  "For Developers:",
  {
    "type": "ul",
    "items": [
      "Test with keyboard-only navigation",
      "Provide visible focus indicators",
      "Support both mouse and keyboard input",
      "Document all keyboard shortcuts"
    ]
  },
  "Technology is making board games more accessible than ever:",
  {
    "type": "ul",
    "items": [
      "AI-powered screen readers for visual boards",
      "Haptic feedback controllers",
      "Voice control integration",
      "Cloud gaming with keyboard optimization"
    ]
  },
  "Keyboard-friendly controls open board gaming to more players. Whether for accessibility needs or personal preference, proper keyboard support improves the experience for everyone.",
  "At YiBoard, we're committed to making Chinese board games accessible. Our Gomoku game supports full keyboard navigation — try it and let us know what improvements you'd like to see."
],
    },
  },
  {
    slug: 'gomoku-rank-explained',
    date: '2026-09-02',
    tags: ['gomoku', 'ranking', 'strategy'],
    title: {
      zh: '五子棋段位详解：YiBoard 怎么给你算分',
      en: 'Gomoku Rank Explained: How YiBoard Rates Every Player',
    },
    description: {
      zh: 'YiBoard 的五子棋段位从 1200 分（六级）起步，每一局胜负都会移动你的分数。这篇把评分怎么算、级位和段位怎么对应分数、为什么没有赛季重置，一次性讲清楚。',
      en: "YiBoard's gomoku rank starts everyone at 1200, Sixth Grade, and moves with every win and loss. Here is exactly how the rating works, how grades and dans map to your score, and why no season resets it.",
    },
    keywords: ['gomoku rank explained', 'gomoku rating system', 'how gomoku ranking works', 'gomoku elo rating', 'gomoku grade dan', 'yiboard rank'],
    content: {
      zh: [
        '打开 YiBoard 的[排行榜](/rankings)你会看到一串数字：所有人都从 1200 分、六级起步，往九段的方向爬。但这个数字到底代表什么、一局棋怎么让它动？这篇用大白话把 YiBoard 的五子棋段位机制讲清楚。想直接上手，先看[玩法说明](/how-to)。',
        { type: 'h2', text: '起点：1200 分，六级' },
        '每个新账号都从 1200 分开始，对应六级。你不选段位，也不会被丢进“新手专属”的小池子。1200 这个起点把你和所有人放在同一把尺子上，前几局胜负会很快把你送到真实水平附近。',
        { type: 'h2', text: '一局棋怎么改你的分数' },
        '每局结束，系统比较你和对手的分差：赢更强的对手加得更多，赢更弱的对手加得更少；输给更强的对手掉得少，输给更弱的对手掉得多。摆动幅度由分差决定，本质上和 Elo 的期望胜率模型一致。',
        '段位是连续的，所以单局绝不会把你自己从一个段位“跳”到下一个。它是对你真实水平缓慢而诚实的收敛。',
        { type: 'h2', text: '级位与段位：两段阶梯' },
        {
          type: 'ul',
          items: [
            '级位（kyu）从九级到一级：入门到熟练这一段',
            '段位（dan）从一段到九段：高手到职业这一段',
            '一级紧挨一段之下，两段叠成一条从九级到九段的完整阶梯',
            '你的分数会自动映射到这条阶梯上，所以看到的称号永远和数字同步',
          ],
        },
        { type: 'h2', text: '为什么没有赛季重置' },
        'YiBoard 不会每个赛季清零。你的历史是你的：八月打到的段位，十二月还是你的。没有保底分、没有参与度加成，段位只在结果推动它时才移动——这正是 YiBoard 上的高段位“含金量”的来源。',
        { type: 'h2', text: '段位是防作弊的' },
        '每一步棋都由服务端校验，评分算法让“送分”或“刷分”无所遁形。这套系统的意义是反映真实对局结果，而不是奖励在线时长。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 上的 1200 分是什么意思？', a: '1200 分对应六级，是所有账号的起点。赢棋加分、输棋减分，分数决定你的级位或段位。' },
            { q: '赢一局能加多少分？', a: '取决于分差。赢强手加得多、赢弱手加得少，分差越小摆动越小。' },
            { q: '一局能让我掉一整个段位吗？', a: '不会。评分是连续的，每局只挪一点点，单局只会推你一下，不会跨段位瞬移。' },
            { q: 'YiBoard 会每个赛季重置段位吗？', a: '不会。YiBoard 的评分是持续的，没有赛季重置，你打到的段位一直属于你。' },
          ],
        },
        { type: 'cta', text: '看看排行榜上你现在排第几', href: 'https://yiboardgame.com/rankings' },
      ],
      en: [
        "If you have opened the YiBoard [leaderboard](/rankings) you have seen the numbers: everyone starts at 1200, Sixth Grade, and climbs toward Ninth Dan. But what does the number actually mean, and how does one game move it? This is the plain-English explanation of how YiBoard's gomoku rank works. If you want to start playing, see the [how-to guides](/how-to).",
        { type: 'h2', text: 'The starting point: 1200, Sixth Grade' },
        'Every new YiBoard account begins at 1200 points, mapped to Sixth Grade. You do not pick a tier, and you are not dropped into a beginner-only pool. The 1200 start puts you on the same ruler as everyone else; your first wins and losses quickly find your real level.',
        { type: 'h2', text: 'How one game changes your score' },
        "Each match compares your rating with your opponent's. Beat a stronger player and you gain more points; beat a weaker one and you gain fewer. Lose to a stronger player and you drop little; lose to a weaker one and you drop more. The size of the swing depends on the rating gap, exactly like an Elo expected-score model.",
        'The rank is continuous, so a single game never jumps you from one dan to the next by itself. It is a slow, honest convergence on your true strength.',
        { type: 'h2', text: 'Grades and dans: the two bands' },
        {
          type: 'ul',
          items: [
            'Grades (kyu) run from Ninth Grade up to First Grade: the beginner-to-proficient band',
            'Dans run from First Dan up to Ninth Dan: the expert-to-professional band',
            'First Grade sits just below First Dan; the two bands stack into one ladder from Ninth Grade to Ninth Dan',
            'Your score maps onto this ladder automatically, so the title you see is always in sync with your number',
          ],
        },
        { type: 'h2', text: 'Why there is no season reset' },
        "YiBoard does not wipe ratings every season. Your history is yours: a dan you earned in August is still a dan in December. No floor points, no participation padding — the rank only moves when results move it, which is why a high dan on YiBoard actually means something.",
        { type: 'h2', text: 'Rank is cheat-resistant' },
        'Every move is validated server-side, and the rating math makes score dumping or win-farming detectable. The point of the system is to reflect real match results, not to reward activity.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'What does 1200 mean on YiBoard?', a: '1200 is Sixth Grade, the start for every account. Wins raise it, losses lower it, and the score maps to your grade or dan.' },
            { q: 'How many points do I get for a win?', a: 'It depends on the rating gap. Beating a much stronger player adds more than beating a much weaker one; the swing shrinks as the gap shrinks.' },
            { q: 'Can my rank drop a full dan in one game?', a: 'No. The rating is continuous and moves a little each game, so a single result nudges you, it does not teleport you across bands.' },
            { q: 'Does YiBoard reset ranks each season?', a: 'No. YiBoard ratings are continuous with no season reset, so your earned rank stays yours.' },
          ],
        },
        { type: 'cta', text: 'Check the leaderboard and see where you stand', href: 'https://yiboardgame.com/rankings' },
      ],
    },
  },
  {
    slug: 'online-vs-physical-board',
    date: '2026-09-02',
    tags: ['online-board-game', 'physical-board-game', 'comparison'],
    title: {
      zh: '在线 vs 物理棋盘：真正的区别',
      en: 'Online vs Physical Board: The Real Differences',
    },
    description: {
      zh: '在线与物理棋盘游戏——真正的区别是什么？对比触觉体验、社交在场、可访问性、规则执行与分析工具，帮你判断哪种形式更适合你。',
      en: "Online vs physical board games — what's the real difference? Compare tactile play, social presence, accessibility, rule enforcement and analysis tools to decide which format fits your goals.",
    },
    keywords: ['online vs offline board game', 'digital vs physical chess', 'play online advantages', 'real board vs screen'],
    content: {
      zh: [
        '棋类游戏已经存在了数千年。带有真实棋子的物理棋盘定义了这项爱好。但在线平台改变了游戏——字面意义上和比喻意义上。',
        '在线玩棋类游戏比物理体验更好吗？答案并不简单。每种格式都有独特的优势和权衡。',
        { type: 'h2', text: '物理棋盘体验' },
        '**触觉满足感。** 拿起棋子、感受其重量、刻意放置在棋盘上，这种感觉非常令人满足。物理互动创建了数字触摸无法复制的记忆锚点。',
        '**社交存在。** 面对面玩意味着阅读肢体语言、观察反应和共享物理空间。这些社交线索丰富了超越游戏机制的体验。',
        '**无技术障碍。** 物理棋盘即时工作。无需 Wi-Fi，无需应用程序更新，无需游戏中途的电池警告。',
        '**缺点：** 物理棋盘需要存储空间、运输和设置时间。找到对手意味着协调时间和地点。',
        { type: 'h2', text: '在线棋盘体验' },
        '**可访问性。** 随时随地玩。无需旅行或协调时间表。在全球而非仅在当地找到对手。',
        '**规则执行。** 在线平台自动处理规则。无需争论移动是否合法。非常适合学习游戏的新手。',
        '**分析工具。** 许多在线平台提供移动分析、游戏回顾和与 AI 练习。这些工具以物理玩法无法实现的方式加速学习。',
        '**缺点：** 屏幕疲劳、潜在的技术问题以及缺乏物理社交线索。',
        { type: 'h2', text: '关键差异' },
        { type: 'ul', items: [
          '社交互动：面对面、丰富线索（物理） vs 文本/语音聊天、有限线索（在线）',
          '学习曲线：自我指导（物理） vs 由规则与执行指导（在线）',
          '便利性：需要设置与运输（物理） vs 即时访问（在线）',
          '成本：一次性购买（物理） vs 通常免费（带广告或高级版本）（在线）',
          '分析：手动审查（物理） vs AI 驱动工具（在线）',
          '记忆性：物理锚点（物理） vs 数字记录（在线）',
        ]},
        { type: 'h2', text: '哪个更好？' },
        '这取决于你的目标：',
        { type: 'ul', items: [
          '学习游戏：带分析工具的在线',
          '社交联结：面对面的物理互动',
          '便利性：即时玩的在线',
          '触觉体验：感官满足的物理',
          '认真提高：两者——物理用于直觉，在线用于分析',
        ]},
        '最好的方法？两者都用。物理玩以享受社交体验和触觉满足。在线玩以学习策略和分析游戏。你的棋类游戏爱好不必是非此即彼的。准备好开始了吗？[在 YiBoard 免费对弈](/play) 或 [了解我们](/about)。',
      ],
      en: [
        'Board games have been around for thousands of years. Physical boards with tangible pieces have defined the hobby. But online platforms have changed the game — literally and figuratively.',
        "Is playing board games online better than the physical experience? The answer isn't simple. Each format has distinct advantages and trade-offs.",
        { type: 'h2', text: 'The Physical Board Experience' },
        "**Tactile satisfaction.** There's something deeply satisfying about picking up a piece, feeling its weight, and placing it deliberately on the board. The physical interaction creates a memory anchor that digital touches can't replicate.",
        "**Social presence.** Playing face-to-face means reading body language, watching reactions, and sharing the physical space. These social cues enrich the experience beyond the game mechanics.",
        "**No technical barriers.** Physical boards work instantly. No Wi-Fi required, no app updates, no battery warnings mid-game.",
        "**The downside:** Physical boards require storage space, transportation, and setup time. Finding opponents means coordinating schedules and locations.",
        { type: 'h2', text: 'The Online Board Experience' },
        "**Accessibility.** Play anytime, anywhere. No need to travel or coordinate schedules. Find opponents globally, not just locally.",
        "**Rule enforcement.** Online platforms handle the rules automatically. No disputes about whether a move was legal. Perfect for beginners learning the game.",
        "**Analysis tools.** Many online platforms offer move analysis, game review, and practice against AI. These tools accelerate learning in ways physical play cannot.",
        "**The downside:** Screen fatigue, potential technical issues, and the lack of physical social cues.",
        { type: 'h2', text: 'Key Differences' },
        { type: 'ul', items: [
          'Social interaction: face-to-face with rich cues (physical) vs text/voice chat with limited cues (online)',
          'Learning curve: self-directed (physical) vs guided by rules and enforcement (online)',
          'Convenience: requires setup and transport (physical) vs instant access (online)',
          'Cost: one-time purchase (physical) vs often free, with ads or premium tiers (online)',
          'Analysis: manual review (physical) vs AI-powered tools (online)',
          'Memorability: physical anchors (physical) vs digital records (online)',
        ]},
        { type: 'h2', text: 'Which Is Better?' },
        "It depends on your goals:",
        { type: 'ul', items: [
          'Learning the game: online, with analysis tools',
          'Social bonding: physical, with face-to-face interaction',
          'Convenience: online, for instant play',
          'Tactile experience: physical, for the sensory satisfaction',
          'Serious improvement: both — physical for intuition, online for analysis',
        ]},
        "The best approach? Use both. Play physically to enjoy the social experience and tactile satisfaction. Play online to learn strategies and analyze games. Your board game hobby doesn't have to be one or the other. Ready to play? [Play free on YiBoard](/play) or [learn more about us](/about).",
      ],
    },
  },
  {
    slug: 'what-signup-walled-platforms-get-wrong',
    date: '2026-09-03',
    tags: ['product', 'privacy'],
    title: {
      zh: '那些要注册的平台，错在哪',
      en: 'What Signup-Walled Platforms Get Wrong',
    },
    description: {
      zh: '注册墙拦掉的不是"随便看看的人"，而是每一个只想先玩一局的人。账号体系还带来数据责任。这篇拆解注册墙的真实代价，以及可选注册为什么是更好的折中。',
      en: 'A signup wall does not filter out tire-kickers — it filters out everyone who just wanted one game. Accounts also come with data responsibilities. This post breaks down the real cost of signup walls and why optional accounts are the better compromise.',
    },
    keywords: ['no signup board games', 'game without account', 'privacy vs convenience', 'instant access games', 'play without registering'],
    content: {
      zh: [
        '打开一个棋类网站，弹出的第一件事不是棋盘，而是"注册或登录"。输入邮箱、设置密码、查收验证邮件——十分钟过去，想下棋的那股劲已经凉了一半。这不是体验细节，这是产品决策：你在用一堵墙过滤用户，而墙拦掉的往往正是你最想要的那批人。本文拆解注册墙到底错在哪，以及为什么 yiboardgame.com 选择把它拆掉。',
        { type: 'h2', text: '注册墙拦掉的不是"随便看看的人"' },
        '做产品的常有个假设：注册能筛掉低质量用户，留下的都是认真的人。对内容社区或许成立，对棋类游戏基本不成立。棋盘游戏的需求是脉冲式的——午休 15 分钟、等车、睡前一把。这类用户的第一诉求是"立刻能玩"，第二诉求才是"保留记录"。注册墙恰好把两个诉求的顺序颠倒：先交数据，再谈体验。结果不是"劝退了随便看看的人"，而是劝退了每一个冲动想玩的人，留下的反而是那些已经被别处注册流程驯化、对数据麻木的存量用户。',
        { type: 'h2', text: '账号体系是一笔被低估的负债' },
        '账号不只是个登录框。注册了，你就开始收集密码哈希、邮箱、对局记录，可能还有支付信息。每一份数据都是责任：泄露了要背锅，被索取了要配合，政策变了要重写隐私条款。对一个小团队来说，这比服务器账单贵得多——服务器是花钱能解决的，信任是花时间都难修复的。更微妙的是，很多平台注册时承诺的"云同步战绩"，实际价值远低于用户交出的数据成本。用户要的只是别丢进度，你却让他用整个账号来换。',
        { type: 'h2', text: '什么时候注册是值得的' },
        {
          type: 'ul',
          items: [
            '跨设备同步战绩和段位——这是真需求，也是注册唯一站得住的理由',
            '多人匹配需要稳定的身份标识（防重名、防作弊封禁）',
            '付费订阅和内容收藏，必须有账号才能兑现',
          ],
        },
        '认清这一点很重要：不是所有注册都该被废除。没有账号体系，跨设备进度就无从谈起。这正是我们愿意承认的代价——在 YiBoard，[不注册](/play)意味着你的战绩留在当前浏览器，换台设备就得从头开始。这个取舍我们不藏。',
        { type: 'h2', text: '可选注册：把选择权还给玩家' },
        'YiBoard 的做法是让注册成为可选项而不是入口关卡。打开 [yiboardgame.com](https://yiboardgame.com) 就是棋盘，点[开始](/play)立即能下，人机对战和在线匹配都无需账号。想保留战绩、冲击[段位榜](/rankings)时，再花十秒绑定邮箱。这样"立刻玩"和"跨设备"两个需求都能被满足，只是顺序由玩家自己决定。和"[免费是一种设计选择](/blog/free-is-a-design-choice)"一脉相承：真正尊重用户的产品，把门槛放在用户自己认为值得的地方，而不是放在产品想收集数据的地方。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '在 YiBoard 玩需要注册吗？', a: '不需要。打开就能下棋，人机对战和在线匹配都免注册。注册只在你想要跨设备同步战绩时才是可选项。' },
            { q: '不注册的代价是什么？', a: '战绩和段位只保存在当前浏览器里，换设备或清除缓存会丢失。这是无账号模式的诚实代价。' },
            { q: '在线匹配也不要账号吗？', a: '不要。匿名即可匹配，我们不做强制身份绑定。' },
            { q: '为什么别的平台都强制注册？', a: '账号能带来留存和二次触达的手段，但对只想玩一局的用户是负担。我们选择把注册变成增值选项而非门槛。' },
          ],
        },
        { type: 'cta', text: '打开 yiboardgame.com，免注册下一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'You open a board game site and the first thing you meet is not a board — it is a signup form. Email, password, verification link. Ten minutes later the urge to play one quick game has cooled into resignation. This is not a UX detail, it is a product decision: you are filtering users behind a wall, and the wall tends to reject exactly the people you want most. Here is what signup-walled platforms get wrong, and why yiboardgame.com tore the wall down.',
        { type: 'h2', text: 'A signup wall does not filter out tire-kickers' },
        "Product teams often assume registration filters out low-intent users and keeps the serious ones. That may hold for content communities; it barely holds for board games. Board game demand is pulsed — a 15-minute lunch break, a commute, one round before bed. Such users' first need is play now, and only secondarily keep my record. A signup wall inverts that order: hand over your data first, experience second. The result is not 'tire-kickers left'; it is every impulsive player left, while the people who stay are the ones already desensitized to handing over data by other platforms.",
        { type: 'h2', text: 'An account system is a liability, not a feature' },
        "An account is not just a login box. Once you register users, you collect password hashes, emails, match records, maybe payment details. Every field is a responsibility: leak it and you carry the blame, get subpoenaed and you comply, privacy law shifts and you rewrite your policy. For a small team this costs more than the server bill — servers are fixed with money, trust is not fixed with time. And many platforms sell 'cloud-synced progress' as the payoff, when users really just want to not lose their record. You make them trade an entire account for that.",
        { type: 'h2', text: 'When accounts genuinely earn their place' },
        {
          type: 'ul',
          items: [
            'Cross-device rank and match history sync — the one reason registration can stand on its own',
            'Stable identity for matchmaking (avoiding name collisions and evading bans)',
            'Paid subscriptions and saved collections need an account to exist at all',
          ],
        },
        "None of this means every signup wall should be abolished. Without accounts, cross-device progress is simply impossible — that is the honest cost we accept. On YiBoard, [playing without an account](/play) means your record lives in the current browser, and a new device starts fresh. We do not hide that trade-off.",
        { type: 'h2', text: 'Optional accounts: give the choice to the player' },
        'YiBoard treats registration as an optional add-on, not a gate. Opening [yiboardgame.com](https://yiboardgame.com) lands you on a board; hit [play](/play) and a match starts — human vs machine and online matchmaking both work without an account. Only when you want to keep your record and climb the [rankings](/rankings) do you spend ten seconds linking an email. Both needs — play instantly and play everywhere — get met, and the order is up to the player. It follows the same logic as [free as a design choice](/blog/free-is-a-design-choice): a product that respects its users places the hurdle where the user considers it worthwhile, not where the product wants to collect data.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Do I need to register to play on YiBoard?', a: 'No. Games start immediately — human vs machine and online matchmaking both work without an account. Registration is optional, only needed to sync your record across devices.' },
            { q: 'What do I lose by not registering?', a: 'Your record and rank stay in the current browser; switching devices or clearing the cache loses them. That is the honest cost of a no-account mode.' },
            { q: 'Does online matchmaking require an account?', a: 'No. You can match anonymously; we do not force identity binding.' },
            { q: 'Why do other platforms force registration?', a: 'Accounts give platforms retention hooks and re-engagement channels, but they burden users who just want one game. We made registration a value-add instead of a gate.' },
          ],
        },
        { type: 'cta', text: 'Open yiboardgame.com and play without signing up', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'online-referee-vs-human-referee',
    date: '2026-09-04',
    tags: ['fair-play', 'referee', 'online-board-game', 'gomoku'],
    title: {
      zh: '在线裁判 vs 人工裁判：谁更公平',
      en: 'Online Referee vs Human Referee: Which Is Fairer',
    },
    description: {
      zh: '在线裁判和人工裁判，谁判规则更公平？从五子棋的禁手到胜负判定，看服务端裁判如何守住线上公平对局。',
      en: 'Who calls the rules more fairly, an online referee or a human? From gomoku forbidden moves to win detection, see how server-side refereeing keeps board games fair.',
    },
    keywords: ['online referee vs human referee', 'fair play online', 'automated rules enforcement board game', 'machine referee gomoku', 'who decides the win in online board games'],
    content: {
      zh: [
        '你坐下来开局，第一个问题往往在落子前就出现了：要是由谁来判定规则有没有被违反？过去答案通常是一个人，要么当裁判的朋友，要么比赛官员。线上棋类游戏改写了这一点。现在在线裁判盯着每一步，结果每次都一样。这正是「在线裁判 vs 人工裁判」争论的核心，而对线上公平对局来说，它改变的比想象中多。',
        { type: 'h2', text: '裁判在棋类游戏里到底做什么' },
        '五子棋或象棋里的裁判不是来下棋的。他们确认棋盘状态、抓出非法着手，并在双方有分歧时裁定胜负。家庭休闲局里，这活儿往往落在那个还在看棋的人头上。线上，同样的工作由一段永不走神、没有偏袒的代码完成。',
        { type: 'h2', text: '人工裁判容易在哪出错' },
        '人擅长处理微妙情况，却不擅长保持一致。人类裁判会累，会漏掉三步之前的着手，也会偏向朋友。关于规则的争吵，是一场友好对局最常以翻脸收场的原因。裁判记得的是自己读过的那版规则，而不是写下来的那版。这个缝隙，就是大多数争执的起点。',
        { type: 'h2', text: '在线裁判如何守住规则' },
        '在线裁判跑在服务器上，而不是某个玩家的屏幕里，所以任何一方都无法悄悄改棋盘。每一步落子落定的瞬间就被检查。非法着手在生效前就被驳回。你可以读我们写的一篇[服务端裁判与反作弊](/blog/server-side-refereeing-anti-cheat)了解它怎么搭起来。要点很简单：规则由同一套引擎对所有人、每一局、每一个时段一视同仁地执行。',
        { type: 'h2', text: '机器比人判得更好的几种情况' },
        {
          type: 'ul',
          items: [
            '非法着手：当场抓住，而不是赛后争吵。',
            '胜负判定：五子连珠就是五子连珠，不管谁领先。',
            '禁手：五子棋的双三、双四规则人容易看错，代码核对起来轻而易举。',
            '和棋与超时：计时不对任何人偏心，平局每次都按同一条线判。',
          ],
        },
        { type: 'h2', text: '什么时候仍需要人' },
        '代码不是全部答案。人依然负责规则覆盖不到的事：掉线的玩家、看着不对劲、像是 bug 的比分、需要判断的投诉。最好的线上棋类会留一个人在边界情况待命，日常判罚交给机器。想最快感受到差别，就[来一局](/play)让棋盘自己守住公平。',
        { type: 'h2', text: '常见问题' },
        {
          type: 'faq',
          items: [
            { q: '在线裁判会出错吗？', a: '可能会，但通常是 bug 而非偏心。服务端判定是确定性的，同一局面永远返回同一结果。看着不对时，由人工复核边界情况。' },
            { q: '自动判规则会毁掉棋类的社交感吗？', a: '不会。多数争吵是关于谁破坏了规则，而不是规则本身。去掉这块摩擦，反而留出更多空间给对局本身和旁边的闲聊。' },
            { q: '玩家能骗过在线裁判吗？', a: '比骗人难。裁判跑在服务器上，单方改不了共享棋盘。主要风险是小号对局和掉线滥用，所以这些仍由人工盯着。' },
          ],
        },
        { type: 'cta', text: '打开 yiboardgame.com，公平地来一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'You sit down for a game and the question shows up before the first move: who decides whether a rule was broken? For years the answer was a person, a friend acting as judge or a tournament official. Online board games flipped that. An online referee now watches every move and calls the result the same way every time. This is the heart of the online referee versus human referee debate, and for fair play online it changes more than people expect.',
        { type: 'h2', text: 'What a referee actually does in a board game' },
        'An online referee in gomoku or chess is not there to play. The referee confirms the board state, spots an illegal move, and decides who won when the players disagree. In a casual home game that job falls to whoever is paying attention. Online, the same job is done by code that never blinks and never has a favorite.',
        { type: 'h2', text: 'Where a human referee slips' },
        'People are good at nuance and bad at consistency. A human judge gets tired, misses a move made three turns ago, or leans toward a friend. Arguments about rules are the most common reason a friendly match ends in a fight. The referee remembers the rule they read once, not the rule written down. That gap is where most disputes start.',
        { type: 'h2', text: 'How an online referee keeps the rules' },
        'An online referee runs on the server, not on one player screen, so neither side can quietly change the board. Every move is checked the instant it lands. If a move is illegal, it is rejected before it counts. You can read how this is built in our piece on [server-side refereeing and anti-cheat](/blog/server-side-refereeing-anti-cheat). The point is simple: the rules are applied by the same engine for everyone, on every game, at every hour.',
        { type: 'h2', text: 'The calls a machine settles better than a person' },
        {
          type: 'ul',
          items: [
            'Illegal moves: caught at the moment, not argued about after the game.',
            'Win detection: five in a row is five in a row, no matter who is winning.',
            'Forbidden patterns: gomoku double-three and double-four rules are easy for a person to misread and simple for code to verify.',
            'Tie and timeout: the clock does not favor anyone, and a draw is called by the same line every time.',
          ],
        },
        { type: 'h2', text: 'When a human still helps' },
        'Code is not the whole answer. A human still matters for the things rules do not cover: a player who disconnects, a score that looks off because of a bug, a complaint that needs judgment. The best online games keep a person on call for the edges while letting the machine handle the routine calls. And the fastest way to feel the difference is to [play a match](/play) where the board itself enforces fair play.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Does an online referee ever make mistakes?', a: 'It can, usually because of a bug rather than bias. Server-side checks are deterministic, so the same position always returns the same call. When something looks wrong, a human reviews the edge cases.' },
            { q: 'Will automated rules kill the social side of board games?', a: 'No. Most arguments are about who broke the rules, not the rules themselves. Removing that friction leaves more room for the actual game and the chat around it.' },
            { q: 'Can players cheat against an online referee?', a: 'Harder than against a person. Because the referee runs on the server, one player cannot alter the shared board. The main risks are multi-accounting and disconnect abuse, which is why a human stays in the loop for those.' },
          ],
        },
        { type: 'cta', text: 'Open yiboardgame.com and play a fair match', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'web-vs-desktop-experience-gap',
    date: '2026-09-06',
    tags: ['web game', 'browser game', 'gomoku', 'product'],
    title: {
      zh: '网页版 vs 桌面版：体验对比',
      en: 'Web vs Desktop: The Experience Gap',
    },
    description: {
      zh: '网页版和桌面版玩棋体验差在哪？从开局等待、性能、离线到更新，摊开讲 web game vs desktop 的差距，并看 YiBoard 为什么选纯网页。',
      en: 'How different is playing in a browser versus a desktop app? From the wait to performance, offline play, and updates, we lay out the web game vs desktop gap and why YiBoard stays browser-only.',
    },
    keywords: ['web game vs desktop', 'browser game performance', 'desktop app vs web', 'instant vs installed', 'play gomoku in browser', 'online board game vs app'],
    content: {
      zh: [
        '网页版和桌面版，玩棋的体验差距到底有多大？很多人搜 web game vs desktop，本质是想搞清楚：点开就能下，和装一个 App 慢慢等，哪个更适合自己。YiBoard 从第一天起就把五子棋做成纯网页，打开 yiboardgame.com 的[对战页](/play)就能下，不用安装。这篇把网页版和桌面版的体验差距摊开讲。今天就去[对战页](/play)来一局，或看看[常见问题](/faq)。',
        { type: 'h2', text: '开局的等待：即时 vs 安装' },
        '桌面版要先下载、安装、更新，有时还要管理员权限；网页版点开链接就进棋盘。对第一次来的玩家，0 安装意味着没有放弃的理由。YiBoard 的[对战页](/play)不需要注册，浏览器里落子就能开始。',
        { type: 'h2', text: '性能：浏览器真的够快吗' },
        '过去网页游戏卡，是因为 JS 慢、网络往返多。现在不一样：YiBoard 的 AI 引擎跑在浏览器本地，500ms 内完成搜索，没有服务器排队。关于这块我们写过[浏览器里的 alpha-beta 引擎](/blog/alpha-beta-engine-in-browser)。桌面版理论上能调用更强算力，但对五子棋这种规模，网页版已经绰绰有余。',
        { type: 'h2', text: '离线 vs 在线：断网时谁还在' },
        '桌面版的卖点之一是离线可玩。网页版依赖网络，断网就停。但现实中，多数人对局发生在有网的环境，而且网页版的进度能跨设备同步。我们写过[离线思考，在线取胜](/blog/think-offline-win-online)，讲的就是这种分工。',
        { type: 'h2', text: '更新：你不用管的事' },
        '桌面版要你手动更新，或弹窗催你。网页版永远是最新的——我们改一版，所有人下一次打开就拿到。对玩家来说，这是零维护；对开发者来说，是少一个分发渠道的麻烦。想问的问题，都可以在[常见问题](/faq)找到。',
        { type: 'h2', text: '到底选哪个' },
        '如果你想要零门槛、随时来一局、设备间无缝切换，网页版是答案。如果你在地铁里没信号也想下，桌面版有它的位置。但对绝大多数人，网页版打开即玩的那几秒，比桌面版多出来的离线能力更值钱。',
        { type: 'h2', text: '常见问题' },
        {
          type: 'faq',
          items: [
            { q: '网页版五子棋会不会很卡？', a: '不会。AI 在浏览器本地运行，500ms 内出招，没有服务器往返，也不排队。打开[对战页](/play)就能感觉到。' },
            { q: '网页版和桌面版棋力一样吗？', a: 'YiBoard 的引擎逻辑一致，差别只在算力上限。网页版对五子棋已经足够强，普通玩家很难压出差别。' },
            { q: '断网了还能下吗？', a: '纯网页版不行，这是它唯一的硬限制。常离线的人可以留一个桌面版备着，但多数人对局都有网。' },
          ],
        },
        { type: 'cta', text: '打开 yiboardgame.com，免安装来一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'How different is the experience of playing in a browser versus installing a desktop app? A lot of people search web game vs desktop because they want to know one thing: is tapping to play the same as downloading an app and waiting? YiBoard has been browser-only for gomoku from day one, and you can start a match on the [play page](/play) at yiboardgame.com with no install. This post lays out the real gap between the two. Go to the [play page](/play) and play a match now, or skim the [FAQ](/faq).',
        { type: 'h2', text: 'The wait before the first move: instant vs install' },
        'A desktop app asks you to download, install, update, sometimes grant admin rights. A web game opens the board the moment you click a link. For a first-time player, zero install means there is no reason to quit before the first move. YiBoard\u2019s [play page](/play) needs no sign-up, and the first stone drops in the browser.',
        { type: 'h2', text: 'Performance: is the browser fast enough' },
        'Web games used to lag because JavaScript was slow and every move bounced off a server. That changed. YiBoard\u2019s AI runs locally in the browser and finishes its search within 500ms, with no server queue. We wrote about the [alpha-beta engine in the browser](/blog/alpha-beta-engine-in-browser). A desktop app can in theory use more compute, but for gomoku\u2019s scale the web version is already plenty.',
        { type: 'h2', text: 'Offline vs online: who is still there when the network drops' },
        'One selling point of desktop apps is offline play. A web game depends on the network and stops when it drops. In practice most matches happen where there is signal, and the web version syncs progress across devices. We wrote about [thinking offline, winning online](/blog/think-offline-win-online), which is exactly this division of labor.',
        { type: 'h2', text: 'Updates: the thing you never have to manage' },
        'A desktop app nags you to update, or waits for you to. A web game is always current: the moment we ship a change, everyone gets it on their next open. For players that is zero maintenance; for us it is one less distribution channel to worry about. Most questions are answered in the [FAQ](/faq).',
        { type: 'h2', text: 'So which should you pick' },
        'If you want zero friction, a match anytime, and seamless switching between devices, the web version is the answer. If you play on the subway with no signal, a desktop app has its place. But for most people those few seconds of open-and-play beat the offline edge a desktop app adds.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Will the web version of gomoku lag?', a: 'No. The AI runs locally in the browser and moves within 500ms, with no server round-trip and no queue. You feel it the moment you open the [play page](/play).' },
            { q: 'Is the web version as strong as a desktop one?', a: 'YiBoard\u2019s engine logic is the same; only the compute ceiling differs. For gomoku the web version is already strong enough that casual players rarely see the gap.' },
            { q: 'Can I play if the network drops?', a: 'Not on a pure web version, that is its one hard limit. People who are often offline can keep a desktop app handy, but most matches happen online.' },
          ],
        },
        { type: 'cta', text: 'Open yiboardgame.com and play without installing', href: 'https://yiboardgame.com/play' },
      ],
    },
  },

  {
    slug: 'grades-vs-elo-ranking-systems',
    date: '2026-09-08',
    tags: ['ranking', 'gomoku', 'comparison'],
    title: {
      zh: '段位制 vs ELO 制：两种排名系统有何不同',
      en: 'Grades and Dans vs ELO: What Is the Difference Between Ranking Systems',
    },
    description: {
      zh: '五子棋用段位制，国际象棋用 ELO，围棋用等级和段位。这篇讲清楚三种排名系统的原理、适用场景和各自优劣。',
      en: 'Gomoku uses dan grades, chess uses ELO, and go uses both rank and dan. This post explains how each ranking system works, where it fits best, and what each does well.',
    },
    keywords: ['elo vs dan system', 'gomoku rating systems', 'which ranking is better', 'board game ranking', 'gomoku dan grade explained'],
    content: {
      zh: [
        '玩棋类游戏的玩家总会被一个问题困扰：我到底算强还是弱？不同游戏给答案的方式不一样。有的用数字，有的用称号，有的混着用。了解这些系统怎么运作的，能帮你更准确地评估自己、找到合适的对手。',
        { type: 'h2', text: 'ELO 系统：国际象棋的标准' },
        'ELO 是最流行的数字排名系统。每场比赛后，胜者从败者那里获得积分，获得多少取决于双方的预期胜率。打败高手得多分，输给低手扣得多。数字变化快，适合 matchmaking。',
        { type: 'h2', text: '段位制：东亚棋类传统' },
        '段位制用称号而非数字。从初学者的一级到高手的十段，每个段位代表一个技能门槛。通过比赛或考核升级。好处是一目了然，坏处是不精确。',
        { type: 'h2', text: '混合系统：围棋的做法' },
        '围棋同时用等级（kyu）和段位（dan）。等级是入门级别，段位数越高越强。这种设计让新手有目标，高手有传承。',
        { type: 'h2', text: '哪种系统更好？' },
        { type: 'ul', items: ['ELO 适合快速匹配和精确排名', '段位制适合建立社区认同和长期目标', '混合系统平衡了入门引导和高手认同'] },
        { type: 'h2', text: 'FAQ' },
        { type: 'faq', items: [{ q: '五子棋为什么用段位制？', a: '因为五子棋源自东亚，段位制符合文化传统。同时让新手有清晰的目标感。' }, { q: 'ELO 数字可以跨游戏比较吗？', a: '不可以。每个游戏的 ELO 基准不同，跨游戏比较没有意义。' }, { q: '如何从段位制转到 ELO？', a: '可以先用 ELO 测试赛定位，再转回段位制。YiBoard 正在考虑增加这种转换功能。' }] },
        { type: 'cta', text: '在 YiBoard 体验段位系统', href: 'https://yiboardgame.com/rankings' },
      ],
      en: [
        'Every board game player wonders at some point: am I good or not? Different games answer this differently. Some use numbers, some use titles, some mix both. Understanding how these systems work helps you evaluate yourself and find the right opponent.',
        { type: 'h2', text: 'ELO: The Chess Standard' },
        'ELO is the most popular numeric ranking system. After each match, the winner gains points from the loser, and how many depends on the expected win rate. Beat a strong player and you gain a lot; lose to a weak one and you lose more. Numbers change fast, making it great for matchmaking.',
        { type: 'h2', text: 'Dan Grades: The East Asian Tradition' },
        'Dan grading uses titles instead of numbers. From one-kyu beginner to ten-dan master, each grade represents a skill threshold. You advance through competition or examination. The benefit is clarity; the drawback is imprecision.',
        { type: 'h2', text: 'Hybrid: How Go Does It' },
        'Go uses both kyu (grades) and dan (degrees). Kyu is for beginners, dan numbers increase with skill. This design gives newcomers goals and masters a sense of legacy.',
        { type: 'h2', text: 'Which system is better?' },
        { type: 'ul', items: ['ELO excels at quick matching and precise ranking', 'Dan grades build community identity and long-term goals', 'Hybrid systems balance onboarding with master recognition'] },
        { type: 'h2', text: 'FAQ' },
        { type: 'faq', items: [{ q: 'Why does gomoku use dan grades?', a: 'Because gomoku comes from East Asia, and dan grades match the cultural tradition. They also give newcomers clear milestones.' }, { q: 'Can ELO numbers be compared across games?', a: 'No. Each game has its own ELO baseline, so cross-game comparison means nothing.' }, { q: 'How do I switch from dan grades to ELO?', a: 'You can take a test match to find your ELO level, then convert back. YiBoard is considering adding this feature.' }] },
        { type: 'cta', text: 'Experience the dan system on YiBoard', href: 'https://yiboardgame.com/rankings' },
      ],
    },
  },
  {
    slug: "mobile-gomoku-ads-paywalls",
    date: "2026-09-11",
    title: { zh: "手游五子棋的陷阱：广告与内购", en: "The Mobile Gomoku Trap: Ads and Paywalls" },
    description: { zh: "手游五子棋为什么总在最想继续时弹广告？拆解三个常见套路，以及免费网页版为什么不一样。", en: "Why mobile Gomoku apps fire ads exactly when you want to keep playing — three common tricks, and why the free web version is different." },
    keywords: ["gomoku apps ads", "mobile game ads problem", "gomoku in-app purchase", "free gomoku alternative"],
    tags: ["strategy", "mobile-gaming", "alternative"],
    content: {
      zh: [
          "想在手机上下一盘五子棋，结果先看了 30 秒广告，点错两次才找到「跳过」，下完一局弹内购。这不是设计失误，这是商业模式。这篇拆一下手游五子棋的常见套路，以及免费网页版为什么是另一条路。",
          {
                "type": "h2",
                "text": "套路一：广告插在决策点上"
          },
          "广告不是随机弹的，通常卡在你最想继续的时刻：刚想好下一步、刚输了一局想再来。此时你的点击意愿最高，广告收入也最高。",
          {
                "type": "h2",
                "text": "套路二：把功能切碎卖"
          },
          {
                "type": "ul",
                "items": [
                      "撤销一步：看广告或付费",
                      "复盘功能：付费解锁",
                      "去广告：订阅",
                      "换棋子皮肤：内购"
                ]
          },
          "每个动作单独收费，看起来每项都便宜，加起来远超一副实体棋。",
          {
                "type": "h2",
                "text": "套路三：AI 难度当付费墙"
          },
          "免费档的 AI 故意做得弱，让你赢得轻松但没挑战；想跟强 AI 下，请付费。这是最常见也最难察觉的一种。",
          {
                "type": "h2",
                "text": "网页版为什么不一样"
          },
          "浏览器里的棋类游戏不需要装 App、没有推送、也没有内购通道。像 YiBoard 就是纯网页的：打开即下，不装东西、不注册、不弹广告。",
          {
                "type": "h2",
                "text": "常见问题"
          },
          {
                "type": "faq",
                "items": [
                      {
                            "q": "广告版为什么不能一次买断去广告？",
                            "a": "因为订阅比买断赚得多，厂商没有动力提供买断。"
                      },
                      {
                            "q": "网页版能离线玩吗？",
                            "a": "首次加载后可以，规则和 AI 都在本地运行，不依赖服务器。"
                      },
                      {
                            "q": "网页版有强 AI 吗？",
                            "a": "YiBoard 的 AI 本地运行，难度可调，且不做付费墙。"
                      }
                ]
          },
          {
                "type": "cta",
                "text": "直接在浏览器里下一盘 →",
                "href": "/"
          }
    ],
      en: [
          "You wanted one game of Gomoku on your phone. Instead you watched a 30-second ad, tapped the wrong thing twice before finding \"skip\", won, and got an in-app purchase prompt. That is not a design accident. That is the business model. Here is how mobile Gomoku apps are built, and why a free web version is a different path.",
          {
                "type": "h2",
                "text": "Trick 1: Ads placed at decision points"
          },
          "Ads are not random. They fire exactly when you most want to keep playing: right after you spot your next move, or right after a loss when you want one more game. That is when your tap-through rate — and the ad revenue — is highest.",
          {
                "type": "h2",
                "text": "Trick 2: Selling the game back to you in pieces"
          },
          {
                "type": "ul",
                "items": [
                      "Undo a move: watch an ad or pay",
                      "Game review: pay to unlock",
                      "Remove ads: subscription",
                      "Piece skins: in-app purchase"
                ]
          },
          "Each item looks cheap in isolation. Together they cost far more than a physical board.",
          {
                "type": "h2",
                "text": "Trick 3: AI difficulty as a paywall"
          },
          "The free-tier AI is deliberately weak. You win easily, so it never feels like a challenge; if you want a real opponent you have to pay. It is the most common trick and the hardest to notice.",
          {
                "type": "h2",
                "text": "Why the web version is different"
          },
          "Board games in the browser need no install, send no push notifications, and have no purchase channel to monetize. YiBoard is web-only: open it and play. Nothing to install, no signup, no ads.",
          {
                "type": "h2",
                "text": "FAQ"
          },
          {
                "type": "faq",
                "items": [
                      {
                            "q": "Why can't ad-supported apps offer a one-time \"remove ads\" purchase?",
                            "a": "Because subscriptions earn more than a one-time fee. There is little incentive to offer it."
                      },
                      {
                            "q": "Does the web version work offline?",
                            "a": "After the first load, yes. Rules and AI run locally, with no server dependency."
                      },
                      {
                            "q": "Is there a strong AI on the web version?",
                            "a": "YiBoard's AI runs locally with adjustable difficulty, and it is not behind a paywall."
                      }
                ]
          },
          {
                "type": "cta",
                "text": "Play a game in your browser →",
                "href": "/"
          }
    ],
    },
  },
  {
    slug: "open-source-board-engine-ecosystem",
    date: "2026-09-12",
    tags: ["open-source", "engine", "gomoku", "chess"],
    title: {
      zh: "开源棋盘引擎生态",
      en: "The Open Source Board Engine Ecosystem",
    },
    description: {
      zh: "一个棋盘引擎其实分成规则、裁判和搜索三层。这篇讲清开源棋盘引擎生态怎么运作、去哪找五子棋引擎，以及网页开源游戏多出来的两条约束。",
      en: "A board engine is three layers: rules, referee, and search. Here is how the open source board game engine ecosystem fits together, where Gomoku and chess engines live on GitHub, and what web projects change.",
    },
    keywords: ["open source board game", "open source chess engine", "gomoku engine github", "web game open source"],
    content: {
      zh: [
        "浏览器里的棋盘游戏看起来是一个整体。拆开看，一个开源棋盘游戏引擎其实是三层：规则、裁判、以及决定下一步走哪里的搜索。三层分开之后，你在 GitHub 上打开任何一个项目都不会陌生。yiboardgame.com 用的也是同样的结构，所以可以拿它当参照，看清楚每一层到底叫什么。",
        { type: "h2", text: "引擎到底在做什么" },
        "引擎不是你会看到的那个棋盘。它只回答两个问题：这一步合不合法，合法的走法里哪一个最好。棋盘画面、音效、记分都盖在它上面。很多人说自己要做一款棋类游戏，实际意思是他要做的是引擎上面那一层。",
        "规则层和裁判层最容易被低估，但它们决定了一个项目好不好用。走法判错，你当天就能发现；胜负条件判错，你可能一个月后才发现。",
        { type: "h2", text: "每个项目里的三层结构" },
        "哪怕文件夹名字没写清楚，仓库基本都会落进这三层。读一个新项目，多半就是先找出你眼前的是哪一层。",
        {
          type: "ul",
          items: [
            "规则层。只负责一款游戏的合法走法生成。代码短，容易测，通常是仓库里最老的文件。",
            "裁判层。把两方的落子变成一个局面，判断胜负、和棋和重复局面。",
            "搜索层。也就是走子选择器。国际象棋引擎都在这一层，你下过的每一个五子棋 AI 也在这一层。",
            "呈现层。画出棋盘、把手势和点击回传下去的浏览器或桌面外壳。",
          ],
        },
        { type: "h2", text: "开源国际象棋引擎是最好的教材" },
        "想弄懂搜索层，去读国际象棋引擎。国际象棋的开源代码比任何棋类都多，思路还能直接搬。alpha-beta 剪枝、置换表、迭代加深，都是先在象棋上成型，再被别的棋类拿去用。五子棋引擎用的是同一套剪枝，只是分支更少、一局结束得更快。",
        "所以小棋种不是大棋种的玩具版。它是同一套算法配上更少的分支，于是代码更短、测试更简单。",
        { type: "h2", text: "在 GitHub 上找五子棋引擎" },
        "在 GitHub 搜 gomoku engine，出来的是课程作业、研究代码和少数还在维护的库混在一起。它们之间真正有用的差别不是谁更聪明，而是每个项目愿意为哪一部分负责。",
        {
          type: "ul",
          items: [
            "只有规则。给合法走法，不给对手，适合做双人对战。",
            "规则加搜索。可以跟电脑下，强度由搜索深度或时间预算决定。",
            "规则加搜索加界面。能直接跑起来的成品，但很难再塞回你自己的项目。",
            "训练代码。教一个网络评估局面，需要显卡和耐心。",
            "纯库。没有界面，就是为了被别人 import。",
          ],
        },
        "README 里把规则讲清楚、把搜索藏在清晰接口后面的仓库，比所有逻辑糊在一个 main 文件里的项目更容易复用。这个分界也是判断一个项目能不能接进你自己代码的最好信号。",
        { type: "h2", text: "网页开源游戏项目多出来的两条约束" },
        "浏览器项目多了两条桌面引擎从来没有的约束。网页开源游戏要在一个标签页里跑起来，还要在手机上快速启动。这两条改变的是设计取舍，不是算法本身。",
        {
          type: "ul",
          items: [
            "没有安装步骤，所以引擎以 JavaScript 或 WebAssembly 的形式发布。",
            "没有常驻后台进程，所以长时间搜索会被换成一份时间预算。",
            "不假设有服务器，所以规则和对手经常完全跑在设备本地。",
            "没有内购通道，所以没有东西需要放在付费墙后面。",
          ],
        },
        "几百毫秒的搜索预算是最常见的折中。对新手来说足够当一个强对手，又短到棋盘不卡顿。这也是网页引擎更偏向简单评估函数的原因：预算小的时候，好的走法排序比更聪明但更慢的评分更值钱。",
        "想看这三层在成品里怎么配合，可以读[关于页](/about)，里面写了 yiboardgame.com 是怎么把它们拆开的。产品层面的问题在 [FAQ 页](/faq)里讲得更细。",
        { type: "h2", text: "常见问题" },
        {
          type: "faq",
          items: [
            { q: "开源棋盘游戏引擎和国际象棋引擎是一回事吗？", a: "不是。国际象棋引擎是搜索层里最有名的一种。五子棋、黑白棋、围棋也有各自的引擎，用的技术大部分相通。" },
            { q: "规则代码要自己写吗？", a: "通常不用。常见棋类的规则覆盖得很好，从零写规则往往是业余项目丢掉第一个月的地方。" },
            { q: "浏览器里的引擎能下得好吗？", a: "可以，但有上限。WebAssembly 加一份紧凑的时间预算足够做出像样的对手，还到不了锦标赛级别的国际象棋。" },
            { q: "从哪里开始读代码？", a: "挑一个你已经会下的棋的小引擎。看懂棋本身就先去掉了你一半的困惑。" },
          ],
        },
        { type: "cta", text: "直接在浏览器里下一盘 →", href: "/play" },
      ],
      en: [
        "A browser board game feels like a single object. Underneath, an open source board game engine is three: the rules, the referee, and the search that picks a move. That split is why the same vocabulary turns up in a chess program from 2005 and in a web app shipped last month. yiboardgame.com runs on the same shape, so it works as a reference point for naming the parts.",
        { type: "h2", text: "What a board engine actually does" },
        "An engine is not the board you see. It is the machine that answers two questions: is this move legal, and which legal move is best. The graphics, the sounds and the scorekeeping all sit above it. When someone says they are building a board game, they often mean they are building the layer above an engine they borrowed.",
        "The rules and referee layers are the ones people underestimate. They also decide whether a project is pleasant to build on, because a wrong legal move is a bug you find the same day, and a wrong win condition is a bug you find a month later.",
        { type: "h2", text: "The three layers in every project" },
        "Repositories sort themselves into the same three layers even when the folder names do not say so. Reading a new project is mostly a matter of working out which layer you are looking at.",
        {
          type: "ul",
          items: [
            "Rules. Legal move generation for one game. Short, easy to test, usually the oldest file in the repository.",
            "Referee. Turns two players' moves into a position, then decides wins, draws and repetition.",
            "Search. The move chooser. Chess engines live here, and so does every Gomoku opponent you have played.",
            "Presentation. The browser or desktop shell that draws the board and sends input back down.",
          ],
        },
        { type: "h2", text: "Open source chess engine code is the best teacher" },
        "If you want to understand the search layer, read a chess engine. Chess has more open source work than any other board game, and the ideas travel. Alpha-beta pruning, transposition tables and iterative deepening were worked out on chess first, then reused everywhere else. A Gomoku engine runs the same pruning; it simply has a smaller branching factor and a shorter game to finish.",
        "The lesson is that a small game is not a toy version of a big one. It is the same algorithm with fewer branches, which makes the code shorter and the tests simpler.",
        { type: "h2", text: "Gomoku engine repos on GitHub" },
        "Searching for a gomoku engine on GitHub returns coursework, research code and a few maintained libraries mixed together. The useful difference between them is not how clever they are. It is what each project agreed to be responsible for.",
        {
          type: "ul",
          items: [
            "Rules only. Legal moves, no opponent. Good when you are building a two-player app.",
            "Rules plus search. Playable against the machine, with strength set by search depth or a time budget.",
            "Rules plus search plus interface. A finished product you can run, and harder to reuse inside your own code.",
            "Training code. Teaches a network to score positions, and asks for a GPU plus patience.",
            "Library. No interface at all, written to be imported.",
          ],
        },
        "A repository that explains its rules in the README and keeps search behind a clear interface is easier to reuse than one that blends everything into a single main file. That boundary is the best signal of whether a project will survive contact with your own code.",
        { type: "h2", text: "What web game open source projects change" },
        "Browser projects add two constraints a desktop engine never had. A web game open source release has to run inside a tab, and it has to start quickly on a phone. Those constraints change design choices more than they change algorithms.",
        {
          type: "ul",
          items: [
            "No install step, so the engine ships as JavaScript or WebAssembly.",
            "No background process, so a long search gets a time budget instead of running to completion.",
            "No server assumption, so rules and opponent often run entirely on the device.",
            "No purchase channel, so there is nothing to place behind a paywall.",
          ],
        },
        "A search budget of a few hundred milliseconds is the usual compromise. It is enough for a strong beginner opponent, and short enough that the board still feels immediate.",
        "It is also why browser engines lean toward simple evaluation functions. With a small budget, good move ordering beats a smarter but slower score.",
        "If you want to see how the three layers behave in a finished product, the [about page](/about) describes how yiboardgame.com separates them. Product questions are covered in more detail on the [FAQ page](/faq).",
        { type: "h2", text: "FAQ" },
        {
          type: "faq",
          items: [
            { q: "Is an open source board game engine the same as a chess engine?", a: "No. A chess engine is one well-known case of the search layer. Board engines also exist for Gomoku, Reversi and Go, and they share most of the same techniques." },
            { q: "Do I need to write my own rules code?", a: "Usually not. Rules for common games are well covered, and writing them from scratch is where small projects lose their first month." },
            { q: "Can a browser engine play well?", a: "Yes, up to a point. WebAssembly and a tight time budget make a solid opponent, though not a tournament-grade chess engine." },
            { q: "Where should I start reading?", a: "Open an engine for a game you already know how to play. Understanding the game removes half the confusion before you reach the code." },
          ],
        },
        { type: "cta", text: "Play a board game in your browser →", href: "/play" },
      ],
    },
  },
  {
    slug: "what-chess-com-got-right",
    date: "2026-09-09",
    tags: ["chess", "product", "business-model"],
    title: {
      zh: "Chess.com 做对了什么：平台生意模型拆解",
      en: "What Chess.com Got Right: A Platform Business Model Breakdown",
    },
    description: {
      zh: "Chess.com 不是第一个在线国际象棋站，却是把棋类平台做成生意的那一个。这篇拆解它做对的四件事，以及一个网页棋类平台能照着走的路。",
      en: "Chess.com was not the first online chess site, but it is the one that turned a board game into a business. A look at the four things it got right and what a browser board game platform can borrow.",
    },
    keywords: ["chess.com business model", "why chess.com works", "board game platform success", "gomoku equivalent"],
    content: {
      zh: [
        "Chess.com 不是第一个在线国际象棋站，却是把棋类平台真正做成生意的那一个。它的做法不神秘，但每一步都踩在点上。这篇拆解它做对的四件事，以及一个网页棋类平台能照着走的路径。",
        { type: "h2", text: "免费能玩，付费才有进阶功能" },
        "免费档给完整的对局，付费档给分析、无限谜题和去广告。免费的那一层本身就好用，付费才有意义。不少同类产品反过来做，免费档砍到只剩残废，用户第一局就走了。",
        { type: "h2", text: "社交比棋本身更留人" },
        "好友、俱乐部、自动匹配，把「下棋」变成「和谁下」。棋力再高的人也需要对手，平台的价值有一半在对手池里。没有对手池，再好的规则也留不住人。",
        { type: "h2", text: "学习工具让新手留下来" },
        "谜题、课程和复盘分析，把一次对局变成下一次进步的入口。新手最怕的是输了不知道为什么，分析正好接住了这个问题。",
        { type: "h2", text: "赛事和排名制造目标" },
        "定期赛事、排行榜和段位，给玩家一个持续回来的理由。没有目标的对局，玩几盘就会腻。",
        { type: "h2", text: "非西方棋类平台的空位" },
        "Chess.com 在西方市场做得很透。五子棋、象棋、围棋这些棋种，它没有重点做。对做中华棋类的平台来说，这个空位是真实存在的：规则本地化、把排名和段位做得像样、移动端优先，就能接住一批它没有服务的玩家。",
        { type: "h2", text: "常见问题" },
        {
          type: "faq",
          items: [
            { q: "YiBoard 能跟 Chess.com 竞争吗？", a: "不需要正面竞争。把重心放在 Chess.com 没有重点做的中华棋类上，服务的是不一样的人群。" },
            { q: "YiBoard 的不同点是什么？", a: "浏览器里直接玩、不用安装，服务端反作弊，以及符合中华棋类传统的段位体系。" },
            { q: "YiBoard 怎么赚钱？", a: "目前免费。之后可能加入高级功能或捐赠，前提是免费的那一层始终完整可用。" },
          ],
        },
        { type: "cta", text: "在浏览器里下一盘中华棋 →", href: "/play" },
        { type: "cta", text: "阅读更多棋类策略文章 →", href: "/blog" },
      ],
      en: [
        "Chess.com was not the first online chess site, but it is the one that turned a board game into a business. Its playbook is not a secret, yet every step lands. This post breaks down the four things it got right, and the path a browser board game platform can follow.",
        { type: "h2", text: "Free to play, paid to go deeper" },
        "The free tier allows full games, while the paid tier adds analysis, unlimited puzzles and no ads. The free layer is genuinely useful, which is what makes paying meaningful. Plenty of competitors invert this: they cut the free tier down to a stub and lose users after the first game.",
        { type: "h2", text: "Social features keep players longer than the game does" },
        "Friends, clubs and matchmaking turn playing chess into playing someone. Even a strong player needs an opponent, and half of any platform's value sits in its opponent pool. Without that pool, good rules are not enough to keep anyone around.",
        { type: "h2", text: "Learning tools keep beginners" },
        "Puzzles, lessons and game review turn a single match into the entry point of the next improvement. A beginner's biggest fear is losing without understanding why, and analysis answers exactly that.",
        { type: "h2", text: "Tournaments and rankings create goals" },
        "Regular events, leaderboards and ranks give players a reason to come back. Matches without a goal get old after a few games.",
        { type: "h2", text: "The gap for non-Western board games" },
        "Chess.com serves the Western market thoroughly. Gomoku, Xiangqi and Go are games it has never emphasized. For a platform built around Chinese board games, that gap is real: localized rules, a credible ranking and grade system, and a mobile-first experience are enough to reach the players it does not serve.",
        { type: "h2", text: "FAQ" },
        {
          type: "faq",
          items: [
            { q: "Can YiBoard compete with Chess.com?", a: "Not head-on, and it does not need to. The focus is on Chinese board games Chess.com has never emphasized, which means a different audience." },
            { q: "What makes YiBoard different?", a: "Play directly in the browser with no install, server-side anti-cheat, and a grade system that matches the tradition of Chinese board games." },
            { q: "How does YiBoard make money?", a: "It is free today. Premium features or donations may come later, on the condition that the free layer stays fully usable." },
          ],
        },
        { type: "cta", text: "Play a Chinese board game in your browser →", href: "/play" },
        { type: "cta", text: "More board game strategy posts →", href: "/blog" },
      ],
    },
  },
  {
    slug: "board-games-vs-video-games-attention",
    date: "2026-09-10",
    tags: ["comparison", "board-games", "video-games"],
    title: {
      zh: "桌游 vs 电子游戏：注意力之争",
      en: "Board Games vs Video Games: The Attention Question",
    },
    description: {
      zh: "桌游和电子游戏都声称对大脑更好。这篇把两边的研究摆在一起比，说清各自的认知收益，以及为什么答案不是二选一。",
      en: "Board games and video games both claim to be better for your brain. A side-by-side look at the research, what each does well, and why the answer is not either-or.",
    },
    keywords: ["board game vs video game", "cognitive benefits board games", "traditional games vs modern", "why board games matter"],
    content: {
      zh: [
        "桌游和电子游戏都有人宣称对大脑更好。把两边的研究摆在一起看，结论反而更朴素：两者的认知收益不一样，谁也不是全面更强。这篇按社交、注意力、成本几个维度比一比，最后给出一个不用选边的用法。",
        { type: "h2", text: "桌游的认知收益" },
        {
          type: "ul",
          items: [
            "战略思维和规划：规则简单，但每一步都要算后面几步",
            "社会认知：面对面的对局要读表情、读节奏，这是线上文字聊天给不了的",
            "触觉记忆：实体棋子带来手上和眼里的双重锚点",
            "深度思考：节奏慢，允许你在落子前把局面想清楚",
          ],
        },
        "桌游还要求持续的专注。一局进行到一半，你不能暂停去刷手机。这种被迫的专注本身就在训练注意力，而这一点常被忽略。",
        { type: "h2", text: "电子游戏的认知收益" },
        {
          type: "ul",
          items: [
            "反应速度：动作类游戏对反应和手眼协调有直接提升",
            "空间感：三维环境里的移动和判断会变准",
            "解题能力：策略类游戏训练资源分配和长线规划",
            "配合与沟通：多人游戏里有真实的团队协作",
            "模式识别：解谜类游戏让大脑习惯找规律",
          ],
        },
        "电子游戏要求的是快速切换的注意力。你要同时处理画面、声音和战术信息，练的是认知灵活性。这和桌游练的东西不同，但不代表没有价值。",
        { type: "h2", text: "逐项对比" },
        {
          type: "ul",
          items: [
            "社交互动：桌游高（面对面），电子游戏看情况（在线或线下）",
            "认知负荷：桌游是持续专注，电子游戏是快速适应",
            "身体活动：桌游低（坐着），电子游戏低到中（体感类更高）",
            "成本：桌游每款 20 到 100 美元，电子游戏每款 0 到 70 美元外加硬件",
            "可及性：桌游需要人在场，电子游戏随处可玩",
            "上手难度：桌游差异很大，电子游戏通常更平缓",
            "重玩价值：桌游靠不同的对手，电子游戏靠不同的流派",
          ],
        },
        { type: "h2", text: "答案不是二选一" },
        "没有哪一类天生更好。真正决定收益的是你愿不愿意长期玩下去。一款你每周都玩的桌游，比一款买了没打开的电子游戏有意义得多。两者在认真玩的前提下，都能带来认知上的好处。",
        { type: "h2", text: "一个不用选边的用法" },
        "桌游留给周末和朋友，电子游戏留给自己一个人的时段。想两个都占，也可以玩数字化的桌游版本。真正该警惕的是把任何一种玩成无意识的消磨，那才是注意力被拿走的地方。",
        { type: "h2", text: "常见问题" },
        {
          type: "faq",
          items: [
            { q: "桌游真的比电子游戏更健脑吗？", a: "没有研究支持这个结论。两者锻炼的认知能力不同，桌游偏持续专注和面对面社交，电子游戏偏反应和快速切换。" },
            { q: "电子游戏会损害注意力吗？", a: "关键在玩的方式。长时间无意识刷屏，和为了一个目标专注游玩，是两回事，后者不会。" },
            { q: "怎么把电子游戏换成桌游？", a: "不需要完全替换。把需要社交的时段换成桌游，把独处时段留给电子游戏，就是一种可行的搭配。" },
          ],
        },
        { type: "cta", text: "在浏览器里下一盘棋 →", href: "/play" },
        { type: "cta", text: "阅读更多棋类文章 →", href: "/blog" },
      ],
      en: [
        "Board games and video games both have people claiming they are better for the brain. Put the research side by side and the conclusion is plainer: they build different cognitive skills, and neither is stronger across the board. This post compares them on social play, attention, cost and a few other dimensions, then suggests a way to use both.",
        { type: "h2", text: "The cognitive case for board games" },
        {
          type: "ul",
          items: [
            "Strategy and planning: simple rules, but every move asks you to think several moves ahead",
            "Social cognition: a face-to-face game means reading expressions and pacing, which a text chat cannot give you",
            "Tactile memory: physical pieces anchor a move in both hand and eye",
            "Deeper thinking: the slower pace lets you work out the position before you commit",
          ],
        },
        "Board games also demand sustained attention. You cannot pause a game mid-turn to check a phone. That forced focus trains concentration, and it is the benefit people most often overlook.",
        { type: "h2", text: "The cognitive case for video games" },
        {
          type: "ul",
          items: [
            "Reaction time: action games improve reflexes and hand-eye coordination directly",
            "Spatial awareness: navigating a 3D space makes your judgement of it sharper",
            "Problem solving: strategy games train resource management and long-range planning",
            "Teamwork: multiplayer games involve real coordination and communication",
            "Pattern recognition: puzzle games condition the brain to look for regularities",
          ],
        },
        "Video games ask for fast, adaptive attention. You process visuals, audio and tactics at once, and that trains cognitive flexibility. It is a different skill from the one board games build, not an inferior one.",
        { type: "h2", text: "Head to head" },
        {
          type: "ul",
          items: [
            "Social interaction: high for board games (face to face), variable for video games (online or offline)",
            "Cognitive load: sustained focus for board games, rapid adaptation for video games",
            "Physical activity: low for board games (sitting), low to medium for video games (higher with motion games)",
            "Cost: 20 to 100 dollars per board game, 0 to 70 dollars per video game plus hardware",
            "Accessibility: board games need people present, video games play anywhere",
            "Learning curve: it varies for board games, and is usually gentler for video games",
            "Replay value: board games through different opponents, video games through different builds",
          ],
        },
        { type: "h2", text: "The answer is not either-or" },
        "Neither is inherently better. What decides the benefit is whether you keep playing. A board game you play every week does more for you than a video game you bought and never opened. Played with attention, both deliver real cognitive value.",
        { type: "h2", text: "A way to use both" },
        "Keep board games for weekends with friends and video games for solo sessions. If you want both at once, digital adaptations of board games cover the middle. The thing worth avoiding is turning either into mindless consumption, which is where attention actually gets taken.",
        { type: "h2", text: "FAQ" },
        {
          type: "faq",
          items: [
            { q: "Are board games really better for the brain than video games?", a: "No research supports that. The two build different skills: board games lean on sustained focus and face-to-face social play, video games on reaction and fast switching." },
            { q: "Do video games harm attention?", a: "It depends on how you play. Endless mindless scrolling and focused play toward a goal are different things, and only the first is a problem." },
            { q: "How do I move from video games to board games?", a: "You do not have to replace anything. Move the social sessions to board games and keep the solo sessions for video games, and you get both." },
          ],
        },
        { type: "cta", text: "Play a board game in your browser →", href: "/play" },
        { type: "cta", text: "More board game posts →", href: "/blog" },
      ],
    },
  },
  {
    "slug": "go-platforms-what-works-what-does-not",
  "date": "2026-09-14",
  "title": {
    "zh": "在线围棋平台：哪些做对了，哪些没有",
    "en": "Go Platforms Online: What Works and What Does Not"
  },
  "description": {
    "zh": "规则引擎早就是成熟问题，平台真正分出高下的是形势判断、悔棋、让子和认输的处理方式。按学棋、下棋、教棋三种用途分别说明怎么选。",
    "en": "Every platform gets the rules right, so the real differences are the score estimate, undo, handicap support and how a resignation reads. How to pick for playing, learning or teaching."
  },
  "keywords": [
  "go online platforms",
  "play go online",
  "go server review",
  "ogs alternatives",
  ],
  "tags": [
    "go",
    "board games",
    "online play",
    "beginner guide"
  ],
  "content": {
    "zh": [
      "围棋是经典棋类里最容易\"在线下得很糟\"的一种。规则简单到任何平台都能完美支持，却仍然能让你下得一肚子火——因为围棋真正要紧的东西几乎都是社交性的：形势判断、悔棋、以及认输被怎么对待。",
      {
        "type": "h2",
        "text": "每个平台都做对的部分"
      },
      {
        "type": "ul",
        "items": [
          "规则引擎。提子、打劫、双活、数子都是成熟问题，正规平台不会做错。",
          "棋盘。能渲染、尺寸对、棋子看得清。",
          "基础的通信用对局。按邮件或按回合下，几乎任何平台都撑得住。"
        ]
      },
      "如果这些就是全部，那选择也太简单了。可惜不是。",
      {
        "type": "h2",
        "text": "平台真正分出高下的地方"
      },
      {
        "type": "h2",
        "text": "1. 形势判断"
      },
      "实时的形势判断会改变初学者学棋的方式。有它的平台，你能在对局进行中看到某一手的代价；把它藏到最后的平台，你要在二十手之后才发现某场战斗早就输了。两者都不算错，但培养出的习惯完全不同。",
      {
        "type": "h2",
        "text": "2. 悔棋与回退"
      },
      "通信用对局不需要它，实时教学对局需要。没有悔棋的平台不适合学棋，因为\"试一试\"的代价是整盘棋。",
      {
        "type": "h2",
        "text": "3. 认输被怎么对待"
      },
      "听起来是小事，其实不是。有的平台把认输当成一条正式记录，有的把它当成一句\"算了\"。在教学场景里你需要后者，否则初学者会把输定的棋一路下完，白白耗掉两个人的时间。",
      {
        "type": "h2",
        "text": "4. 让子支持"
      },
      "如果你想跟明显更强或更弱的人下，让子是唯一能让双方都觉得有意思的办法。很多平台支持让子，然后把它埋进三层菜单里。",
      {
        "type": "h2",
        "text": "哪些做法不行"
      },
      {
        "type": "ul",
        "items": [
          "悄悄从别的服务器导入段位的等级分系统。你的分数会因为你看不见的原因变动。",
          "对初学者没有读秒的用时规则。突然死亡制下，新手是输给计时器，不是输给棋盘。",
          "手机上棋盘会跟着滚动的布局。棋盘在你读它的时候还在动，就是没法下。"
        ]
      },
      {
        "type": "h2",
        "text": "怎么选"
      },
      "先想清楚你在做什么。下通信用对局：几乎任何平台都行，按对手池来选。学棋：按悔棋、让子和可见的形势判断来选。教棋：按认输氛围，以及能不能跟学生对着一盘下完的棋复盘来选。",
      {
        "type": "h2",
        "text": "常见问题"
      },
      {
        "type": "faq",
        "items": [
          {
            "q": "在线围棋平台会把规则做错吗？",
            "a": "很少。提子、打劫、数子都已经定型。差异体现在等级分、悔棋、让子支持，以及平台怎么处理认输——这些在实际使用中影响更大。"
          },
          {
            "q": "跟初学者下用让子值得吗？",
            "a": "值得。不让子的话，强者要么压着水平下，要么每盘都赢，两种都没有教学价值。让子能把局面拉到值得思考的接近程度。"
          },
          {
            "q": "学围棋用什么用时规则最好？",
            "a": "任何带读秒的规则。突然死亡制会让初学者输给计时器而不是输给局面，教的东西是错的。"
          }
        ]
      },
      "你可以在 yiboardgame.com 的浏览器里直接试一整块 19 路棋盘，不用安装、不用注册，这是感受\"干净的棋盘加可见的形势判断\"能带来多大差别最快的方式。更多棋类笔记在博客里。",
      {
        "type": "cta",
        "text": "在浏览器里下围棋 →",
        "href": "/play"
      },
      {
        "type": "cta",
        "text": "更多棋类文章 →",
        "href": "/blog"
      }
    ],
    "en": [
      "Go is the easiest of the classic board games to play online badly. The rules are simple enough that a platform can support them perfectly and still give you a miserable game, because almost everything that matters in Go is social: the score estimate, the undo, the way a resignation is read.",
      {
        "type": "h2",
        "text": "What every platform gets right"
      },
      {
        "type": "ul",
        "items": [
          "The rules engine. Captures, ko, seki and scoring are solved problems, and no serious platform gets them wrong.",
          "The board. It renders, it is the right size, the stones are legible.",
          "Basic correspondence play. Play by email or by turn and almost any platform holds up."
        ]
      },
      "If those were all that mattered, the choice would be trivial. They are not.",
      {
        "type": "h2",
        "text": "Where platforms actually differ"
      },
      {
        "type": "h2",
        "text": "1. The score estimate"
      },
      "A live score estimate changes how beginners learn. On a platform that shows it, you can see the cost of a move while the game is still running. On one that hides it until the end, you find out twenty moves later that a fight was already lost. Neither is wrong, but they teach different habits.",
      {
        "type": "h2",
        "text": "2. Undo and take-back"
      },
      "Correspondence games do not need it. Live teaching games do. A platform with no take-back is a poor place to learn, because the punishment for experimenting is the whole game.",
      {
        "type": "h2",
        "text": "3. How a resignation reads"
      },
      "This sounds trivial and is not. Some platforms treat a resignation as a formal record; others treat it as a shrug. In a teaching context you want the second, because otherwise beginners play out lost games to the end, which wastes both players' time.",
      {
        "type": "h2",
        "text": "4. Handicap support"
      },
      "If you want to play with someone much stronger or much weaker, handicap is the only thing that makes the game interesting for both sides. Plenty of platforms support it and then bury it three menus deep.",
      {
        "type": "h2",
        "text": "What does not work"
      },
      {
        "type": "ul",
        "items": [
          "Ranking systems that import a rating from another server without saying so. Your number moves for reasons you cannot see.",
          "Time controls with no increment for beginners. Under sudden death, new players lose to the clock, not to the board.",
          "Mobile layouts where the board scrolls. A board that moves while you are reading it is unplayable."
        ]
      },
      {
        "type": "h2",
        "text": "How to pick"
      },
      "Decide what you are actually doing first. Playing correspondence games: almost anything works, pick for the player pool. Learning: pick for undo, handicap and a visible score estimate. Teaching: pick for the resignation culture and the ability to review a finished game with the student.",
      {
        "type": "h2",
        "text": "FAQ"
      },
      {
        "type": "faq",
        "items": [
          {
            "q": "Do online Go platforms get the rules wrong?",
            "a": "Rarely. Captures, ko and scoring are settled. Differences show up in ranking, undo, handicap support and how the platform handles resignation, which matter more in practice."
          },
          {
            "q": "Is handicap play worth using with beginners?",
            "a": "Yes. Without handicap, a strong player either plays below their level or wins every game, and neither is instructive. Handicap makes the game close enough to be worth thinking about."
          },
          {
            "q": "What time control is best for learning Go?",
            "a": "Anything with an increment. Sudden death makes beginners lose to the clock instead of to the position, which teaches the wrong lesson."
          }
        ]
      },
      "You can try a full 19x19 board in the browser at yiboardgame.com with no install and no account, which is the fastest way to feel the difference a clean board and a visible score estimate make. More board game notes are on the blog.",
      {
        "type": "cta",
        "text": "Play Go in your browser →",
        "href": "/play"
      },
      {
        "type": "cta",
        "text": "More board game posts →",
        "href": "/blog"
      }
    ]
  }
},
{
    "slug": "xiangqi-platform-gap",
    "date": "2026-09-13",
    "title": {
      "zh": "象棋平台现状：为什么缺少好的",
      "en": "The Xiangqi Platform Gap"
    },
    "description": {
      "zh": "英文象棋平台又少又常写错规则。我们讲清这道缺口、蹩马腿为何难住应用，以及哪里能下规则正确的象棋。",
      "en": "Xiangqi online platforms in English are thin and often rule-wrong. We explain the gap, why the legged horse breaks apps, and where to play xiangqi online."
    },
    "keywords": [
      "xiangqi online platforms",
      "chinese chess website",
      "play xiangqi online",
      "xiangqi app"
    ],
    "tags": [
      "xiangqi",
      "chinese chess",
      "online play",
      "board games"
    ],
    "content": {
      "en": [
        {
          "type": "h2",
          "text": "Western chess and Go tools never covered Xiangqi"
        },
        "Most English-language board-game infrastructure was built around chess and, later, Go. Xiangqi fell through the gap. The piece names are inconsistently romanised: the same horse is Ma, Maa, or Ma with tone marks depending on the site, and the cannon is Pao, Pao, or Pawn on bad translations. Rule sets differ too. The horse-leg block (a piece blocking the horse's diagonal step) and the elephant-river limit (elephants cannot cross the river) are easy to implement wrong, and several small apps get them wrong. Notation systems are not standardised in English the way algebraic chess notation is, so move lists from one site do not paste cleanly into another. When a site does support Xiangqi, the move validator is often a thin wrapper that misses edge cases the rulebook treats as basic.",
        {
          "type": "h2",
          "text": "The strongest platforms are Chinese-language-first"
        },
        "The deepest Xiangqi engines and largest player pools live on Chinese services. For a newcomer who does not read the language, they are rough: account registration can require a local phone number, ad load is heavy, and the UI is dense with features aimed at serious players. A curious English speaker who wants to learn the game hits a wall of friction before they make a first move. Worse, some gate features behind a paid membership or a friend invite, which blocks a tourist who just wants a single casual game. The few English-facing options are thin, often abandonware, or missing the rule correctness that matters most.",
        {
          "type": "h2",
          "text": "The openings library problem is harder than in chess"
        },
        "Chess has centuries of standardised opening theory with English names everyone agrees on. Xiangqi has rich opening theory too, but far fewer standardised English-language references. A player who wants to study the Screen Horse or Central Cannon openings must dig through scattered, inconsistently translated material. An opening explorer that works in English, with correct move trees, barely exists. There is no equivalent of a single trusted English reference like Modern Chess Openings that a beginner can buy and rely on, so the learning curve starts cold.",
        {
          "type": "h2",
          "text": "What a good browser implementation needs"
        },
        {
          "type": "ul",
          "items": [
            "Correct move validation, including the legged horse and the elephant's river limit, enforced on every move.",
            "A readable board on mobile without scrolling, with pieces large enough to tap.",
            "Undo for teaching, so a learner can step back through a line without losing the game.",
            "An opening explorer and a local, offline mode that needs no account."
          ]
        },
        "None of these are exotic, but together they are rare. Most projects nail one or two and skip the rest. The account-free offline mode is the one almost everyone drops, which is a shame because it is what makes the game teachable on a phone with bad signal. The legged horse in particular is the trap: many hobby projects validate the destination square but forget to check the adjacent orthogonal square, so illegal moves slip through.",
        {
          "type": "h2",
          "text": "The opportunity: a no-install, no-account board"
        },
        "There is clear room for a board that opens in the browser, asks for nothing, and gets the rules exactly right. The value is not a stronger engine but a correct, calm place to learn: validate moves properly, show why a move is illegal, let players undo, and teach the openings as they play. You can try a full board in the browser at yiboardgame.com, with no install and no account. A small, correct board also lowers the bar for schools and parents who want to teach the game without handing a child a full social account. It also helps diaspora parents who grew up with the game but never learned the formal names in English, giving them a way to play with their kids. Start a game at /play, and read more strategy and platform notes at /blog.",
        {
          "type": "faq",
          "items": [
            {
              "q": "Why are there so few good English Xiangqi platforms?",
              "a": "The strongest engines are Chinese-language-first, with heavy account friction and dense UIs. English-facing options are thin or abandonware, and the rules are often implemented wrong."
            },
            {
              "q": "What rule do Xiangqi apps get wrong most?",
              "a": "The legged horse (a blocking piece cancels the horse's step) and the elephant's river limit. Both are easy to code incorrectly, and several small apps do."
            },
            {
              "q": "Do I need an account to play on yiboardgame.com?",
              "a": "No. The board opens in the browser with no install and no account, and it enforces the rules correctly including the legged horse."
            }
          ]
        },
        {
          "type": "cta",
          "text": "Play Xiangqi in your browser →",
          "href": "/play"
        },
        {
          "type": "cta",
          "text": "More board game posts →",
          "href": "/blog"
        }
      ],
      "zh": [
        {
          "type": "h2",
          "text": "西方的象棋和围棋工具从未覆盖象棋"
        },
        "大多数英文棋盘游戏基础设施都是围绕国际象棋、后来再围绕围棋搭建的。象棋卡在了缝隙里。棋子名称的罗马化并不统一：同一匹马，在这个站叫 Ma，那个站叫 Maa，还有的带声调符号；炮在糟糕的翻译里甚至被叫成 Pawn。规则集也不同。蹩马腿（挡住马走日字斜步的棋子）和相不过河（象不能越过河界）很容易被写错，好几个小应用写错。记谱系统也不像国际象棋代数记谱那样有英文标准，所以一个站的导谱粘贴到另一个站会乱掉。",
        {
          "type": "h2",
          "text": "最强的平台以中文为第一语言"
        },
        "最深的象棋引擎和最大的玩家群都在中文服务上。对一个不懂中文的新人来说，它们很粗暴：注册账号常常要本地手机号，广告很重，界面塞满面向高手的功能。一个想学棋的英文使用者，还没走第一步就被摩擦墙挡住。少数面向英文的选项是稀薄的，是弃坑软件，或缺少最关键的规则正确性。",
        {
          "type": "h2",
          "text": "开局库问题比国际象棋更难"
        },
        "国际象棋有数百年标准化的开局理论，英文名称人尽皆知。象棋也有丰富的开局理论，但标准化的英文资料少得多。想研究“屏风马”或“中炮”的玩家，得在零散材料里翻找。一个能用英文工作、着法树正确的开局浏览器，几乎不存在。这既是内容问题，也是软件问题。",
        {
          "type": "h2",
          "text": "一个好的浏览器实现需要什么"
        },
        {
          "type": "ul",
          "items": [
            "正确的走子校验，包括蹩马腿和相不过河，且每一步都强制执行。",
            "手机上无需滚动就能看清的棋盘，棋子足够大以便点按。",
            "用于教学的悔棋，让学习者能逐步回退而不丢失对局。",
            "开局浏览器，以及一个无需账号的本地离线模式。"
          ]
        },
        "这些单独看都不稀奇，合在一起却很少见。多数项目做好一两项就跳过了其余。几乎人人都丢掉的，是免账号的离线模式，这很可惜，因为它正是一台信号差的手机上能把棋教起来的关键。",
        {
          "type": "h2",
          "text": "机会：免安装、免账号的棋盘"
        },
        "明显还缺一个在浏览器里打开、什么都不问、且规则绝对正确的棋盘。价值不在更强的引擎，而在一个正确、安静的学习场所：正确校验走子、说明某步为何非法、允许悔棋、并在对弈中教开局。你可以在 yiboardgame.com 的浏览器里试整块棋盘，免安装、免账号。到 /play 开一局，更多策略与平台笔记请看 /blog。",
        {
          "type": "faq",
          "items": [
            {
              "q": "为什么好的英文象棋平台这么少？",
              "a": "最强的引擎以中文为第一语言，账号摩擦重、界面密集。面向英文的选项稀薄或已弃坑，规则还常常写错。"
            },
            {
              "q": "象棋应用最常写错哪条规则？",
              "a": "蹩马腿（挡子的棋子会取消马的那一步）和相不过河。两者都容易写错，好几个小应用都中招。"
            },
            {
              "q": "在 yiboardgame.com 下棋需要账号吗？",
              "a": "不需要。棋盘在浏览器里打开，免安装、免账号，并且正确执行包括蹩马腿在内的规则。"
            }
          ]
        },
        {
          "type": "cta",
          "text": "在浏览器里下象棋 →",
          "href": "/play"
        },
        {
          "type": "cta",
          "text": "更多棋类文章 →",
          "href": "/blog"
        }
      ]
    }
  },
  {
    slug: 'gomoku-go-family-history',
    date: '2026-09-15',
    title: { zh: '五子棋与围棋的家族史', en: 'The Family History of Gomoku and Go' },
    description: { zh: '五子棋和围棋长得很像，常被当成亲戚。它们共用一张棋盘，除此之外几乎没有共同点。这篇把两者的真实关系讲清楚。', en: 'Gomoku and Go look like relatives and are often confused for each other. They share a board and almost nothing else. Here is the actual family tree.' },
    keywords: ['gomoku history', 'origin of gomoku', 'gomoku vs go', 'five in a row history'],
    tags: ['gomoku','go','history'],
    content: {
      zh: [
        { type: 'h2', text: '混淆可以理解' },
        '两者都用交点棋盘，都用黑白棋子，都没有隐藏信息。隔着一个房间看，它们像同一个游戏。',
        '但在底层，它们解决的是相反的问题，而这个差别解释了后面的一切。',
        { type: 'h2', text: '同一张棋盘，两个目标' },
        { type: 'ul', items: ['围棋是地盘。棋盘从空开始，落子用来围出空间，当剩余着手无法改变比分时结束。', '五子棋是连接。棋盘同样从空开始，落子用来抢在对手之前连成五子。'] },
        '围棋奖励耐心和缓慢积累，五子棋奖励模式识别和即时应对威胁。围棋下得好的人不会自动擅长五子棋。',
        { type: 'h2', text: '五子棋的来源' },
        '通行的说法是五子棋出自围棋的简化，至少是同一套「棋盘加棋子」传统里的产物。规则短到一句话能讲完，这也是它传播如此广的重要原因。',
        '这种流行是双向的。规则极简意味着各地变体大量增生，叫法也随之变多。',
        { type: 'h2', text: '各地的名字' },
        { type: 'ul', items: ['中国：五子棋，字面就是五子连成一线', '日本：五目並べ，国际通用名 Gomoku 的来源', '韩国：오목，同一个游戏的独立传统', '英语：Gomoku 和 Five in a Row 两种叫法都在用'] },
        { type: 'h2', text: '先手问题' },
        '五子棋有一个围棋没有的公平性问题。不加限制时，在足够高的水平上先手有决定性优势，而且存在已被解出的开局定式。',
        '应对方式是规则变体，而不是改动游戏本身。连珠为先行方设置了禁手，无禁手五子棋保留开放棋盘并接受这种不平衡，各类赛制对限制的程度各不相同。',
        { type: 'h2', text: '常见问题' },
        { type: 'faq', items: [
          { q: '五子棋是简化版围棋吗？', a: '这是它起源的通说，但今天两者是独立的游戏。学会一个不会顺带学会另一个。' },
          { q: '五子棋被解出了吗？', a: '15x15 的无禁手五子棋已被解出，结果对先手有利。连珠规则的目的就是削弱这个优势。' },
          { q: '围棋和五子棋能共用棋盘吗？', a: '可以，而且经常共用。15 路或 19 路棋盘两边都能下，这也是它们容易被混淆的原因之一。' },
        ] },
        { type: 'cta', text: '两边都下一局，感受差别', href: '/play' },
      ],
      en: [
        { type: 'h2', text: 'The confusion is understandable' },
        'Both use a grid of intersections, both use black and white stones, and both are played without hidden information. Seen from across a room they look like the same game.',
        'Underneath, they are solving opposite problems, and the difference explains everything else about them.',
        { type: 'h2', text: 'One board, two goals' },
        { type: 'ul', items: ['Go is about territory. The board starts empty, stones are placed to surround space, and the game ends when the remaining moves cannot change the score.', 'Gomoku is about connection. The board also starts empty, but stones are placed to form an unbroken line of five before the opponent does.'] },
        'Go rewards patience and slow accumulation. Gomoku rewards pattern recognition and immediate threat handling. A strong Go player is not automatically strong at Gomoku.',
        { type: 'h2', text: 'Where Gomoku came from' },
        'The usual account is that Gomoku developed as a simplification of Go, or at least grew up in the same tradition of grid-and-stone games. The rules are short enough to teach in a sentence, which is a large part of why it travelled so widely.',
        'That popularity cut both ways. Because the rules are minimal, regional variants multiplied, and so did the names.',
        { type: 'h2', text: 'Names across regions' },
        { type: 'ul', items: ['China: 五子棋 (wuziqi), literally five-in-a-row', 'Japan: 五目並べ (gomoku narabe), which is where the international name comes from', 'Korea: 오목 (omok), the same game in its own tradition', 'English: both Gomoku and Five in a Row are in common use'] },
        { type: 'h2', text: 'The first-player problem' },
        'Gomoku has a real fairness problem that Go does not. With no restrictions, the first player has a decisive advantage at a high enough level of play, and solved openings exist.',
        'The response was rule variants rather than a rule change to the game itself. Renju adds forbidden moves for the first player. Free-style Gomoku keeps the board open and simply accepts the imbalance. Tournament formats vary in how much they restrict.',
        { type: 'h2', text: 'FAQ' },
        { type: 'faq', items: [
          { q: 'Is Gomoku a simplified Go?', a: 'That is the usual account of its origin, but they are separate games today. Learning one does not teach the other.' },
          { q: 'Is Gomoku solved?', a: 'Free-style Gomoku on a 15x15 board is solved in favour of the first player. Renju rules exist to reduce that advantage.' },
          { q: 'Can Go and Gomoku use the same board?', a: 'Yes, and they often do. A 15x15 or 19x19 grid works for both, which is part of why they get confused.' },
        ] },
        { type: 'cta', text: 'Play both and feel the difference', href: '/play' },
      ],
    },
  },
  {
    slug: 'go-game-history-territory',
    date: '2026-09-17',
    tags: ['weiqi', 'history'],
    title: {
      zh: '围棋的围：两千年的领土游戏',
      en: 'Go: Two Thousand Years of Territory',
    },
    description: {
      zh: '围棋的「围」就是它的名字。起源中国、传到日本韩国、再走向世界，规则三千年几乎没变。这篇讲围棋的历史脉络，以及为什么「围地」这个核心一直没被动摇。',
      en: 'The Chinese name for go literally means the encircling game. Born in China, carried to Japan and Korea, then worldwide, its rules have barely changed in two thousand years. This post traces that history and why territory, the core idea, never moved.',
    },
    keywords: ['go game history', 'origin of go', 'weiqi history', 'go philosophy', 'ancient chinese board game'],
    content: {
      zh: [
        '围棋在中文里的名字已经说出了它的本质：「围」。两个对手轮流落子，围住的空越多，得分越高。这个简单规则从春秋战国传到今天，三千年没有本质改变。它是世界上仍在流行、规则保存最完整的古老棋盘游戏。今天你就能在 yiboardgame.com 的[围棋页](/play/weiqi)体验这份遗产。',
        { type: 'h2', text: '起源：中国，公元前' },
        '关于围棋的起源，最常被引用的说法是把发明归于帝尧，用来教导儿子丹朱。这属于传说，缺乏考古支撑。可靠的证据是考古出土的棋盘：河北望都、甘肃敦煌等地都发现了汉代及更早的棋盘实物，说明围棋在西汉已经相当普及。',
        { type: 'h2', text: '传到日本与韩国' },
        '围棋在南北朝时期传入朝鲜半岛，唐代前后传到日本。日本把围棋推向了新的高度：江户时代，幕府设立「棋所」，职业棋士制度成型，本因坊等名号延续数百年。韩国的围棋传统同样深厚，现代棋坛长期被中、日、韩三国主导。',
        { type: 'h2', text: '为什么规则几乎没变' },
        {
          type: 'ul',
          items: [
            '核心目标明确：围地多者胜，不需要棋子离场也能理解',
            '规则足够「薄」：落子、气、提子、打劫，几条就讲完',
            '复杂度藏在棋盘上：19 路的组合数远超宇宙原子数，变化来自棋盘而非规则',
            '文化地位稳定：在中国是「琴棋书画」四艺之一，在日韩是竞技与修养的双重载体',
          ],
        },
        { type: 'h2', text: '「围」为什么是围棋的灵魂' },
        '象棋的核心是吃子与将军，围棋的核心是占地。吃子只是手段，围空才是目的。这种「以地论胜负」的取向，让围棋的策略天然偏向大局观：局部战斗输了，只要全局地势占优，依然可能赢。这也是围棋哲学里常说的「取势」与「取地」的平衡。',
        { type: 'h2', text: '今天怎么开始下围棋' },
        '围棋入门不难，规则几句话能讲清。难的是判断棋形与取舍，这需要大量对局积累。对新手来说，先在 9 路或 13 路小棋盘上练习，熟悉气与死活，再上 19 路。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '围棋的「围」到底是什么意思？', a: '围指围空。双方轮流落子，最后按各自围住的交叉点数计分，围得多的一方胜。' },
            { q: '围棋有多少年历史？', a: '有考古证据的棋局可追溯到汉代前后，传说可上溯到尧舜时代，通常说有两千年以上的历史。' },
            { q: '围棋和五子棋规则差很多吗？', a: '差很多。五子棋比谁先连成五子，围棋比谁围的地多，且涉及气、提子、打劫等规则。' },
          ],
        },
        { type: 'cta', text: '在线下一局围棋，感受两千年的围', href: '/play/weiqi' },
      ],
      en: [
        'The Chinese name for go says it all: weiqi, the encircling game. Two players take turns placing stones, and whoever surrounds more empty space wins. That simple rule has traveled from the Warring States period to today with almost no change, which makes go the oldest board game still played in its original form. You can try it right now on the [go page](/play/weiqi) at yiboardgame.com.',
        { type: 'h2', text: 'Origins: China, centuries BC' },
        'The most repeated story credits Emperor Yao with inventing go to teach his son Danzhu. That is legend, without archaeological support. What we have are actual boards: excavation finds in Wangdu, Hebei, and Dunhuang, Gansu, show that go was already common by the Han dynasty.',
        { type: 'h2', text: 'The road to Japan and Korea' },
        'Go reached the Korean peninsula during the Southern and Northern Dynasties and arrived in Japan around the Tang dynasty. Japan pushed it furthest: in the Edo period the shogunate established a system of professional players, and titles like Honinbo lasted for centuries. Korea shares a deep tradition, and modern go has long been dominated by China, Japan, and Korea.',
        { type: 'h2', text: 'Why the rules barely changed' },
        {
          type: 'ul',
          items: [
            'The goal is transparent: more territory wins, understandable without any pieces leaving the board',
            'The rules are thin: placing, liberties, capture, and ko cover most of it',
            'The complexity lives on the board: the 19x19 grid offers more combinations than atoms in the universe, so depth comes from play, not rules',
            'Cultural status stayed stable: one of the four arts in China, and both a sport and a discipline in Japan and Korea',
          ],
        },
        { type: 'h2', text: 'Why territory is the soul of go' },
        'Chess revolves around checkmate; go revolves around land. Capturing stones is a means, surrounding space is the end. That orientation pushes strategy toward the whole board: lose a local fight and still win if your global position holds. It is the balance between influence and territory that go players talk about constantly.',
        { type: 'h2', text: 'How to start today' },
        'Getting into go is easy; the rules fit in a few sentences. The hard part is reading shapes and making trade-offs, which takes many games. New players do better starting on a 9x9 or 13x13 board to learn liberties and life-and-death before moving to 19x19.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'What does the Chinese name for go mean?', a: 'It means encircling. Players surround empty intersections, and whoever controls more territory at the end wins.' },
            { q: 'How old is go?', a: 'Boards with archaeological support go back to around the Han dynasty, and legend reaches further, so the game is usually called over two thousand years old.' },
            { q: 'Is go very different from gomoku?', a: 'Very. Gomoku is a race to five in a row; go is a territorial game with liberties, capture, and ko.' },
          ],
        },
        { type: 'cta', text: 'Play go online and feel two thousand years of territory', href: '/play/weiqi' },
      ],
    },
  },
  {
    slug: "eastern-vs-western-board-game-philosophy",
    date: "2026-09-21",
    tags: ["board games", "game design", "culture", "strategy"],
    keywords: ["board games", "go strategy", "chess strategy", "game philosophy", "eastern vs western"],
    title: {
      zh: "东方与西方棋类哲学的差异：从围棋到国际象棋",
      en: "Eastern vs Western Board Game Philosophy: From Go to Chess",
    },
    description: {
      zh: "围棋讲究布局与势，国际象棋强调战术与征服。两种棋类哲学背后是两种文明对「胜负」与「过程」的根本理解差异。",
      en: "Go rewards influence and patience; chess rewards tactics and conquest. Behind these two game philosophies lie two civilizations' fundamentally different ideas about winning, and about process itself.",
    },
    content: {
      zh: [
        "翻开任何一本棋类入门书，你都会看到同一句话：先学规则，再学战略。但规则本身已经预设了战略。围棋的规则只有一句话——轮流落子，围地多者胜。国际象棋的规则则需要几十页才能讲完，因为每种棋子都有各自的走法、吃法和限制。这种规则复杂度上的差异，直接塑造了两种完全不同的思考方式。",
        { type: "h2", text: "棋盘观：空与满" },
        "围棋从一个空棋盘开始，361 个交叉点全部留给玩家自己去定义。国际象棋则从一个满棋盘开始，32 枚棋子各就各位，玩家做的是调动和交换。前者是「创造秩序」，后者是「重组既有秩序」。这决定了围棋的对局前期像是播种，国际象棋的前期像是谈判。",
        "一个直接的后果是：围棋的前 50 手常常看不出胜负，甚至看不出意图；而国际象棋的前 10 手已经能读出双方的性格。围棋允许你「浪费」一手棋去布局，因为它相信复利；国际象棋要求你每一手都有明确的战术或位置收益，因为它相信效率。",
        { type: "h2", text: "胜负观：赢半目与将死" },
        "围棋的胜负是连续的——可以赢半目，可以赢一百目，但只有胜负两种结局。国际象棋的胜负是离散的——要么将死，要么和棋，没有中间地带。这种差别导致围棋选手长期在「边际收益」上竞争，赢半目和赢一百目的积分差距，远小于它背后的技术差距。",
        "实践意义在于：围棋的复盘重心是「哪一手的效率低了」，国际象棋的复盘重心是「哪一步埋下了致命的漏洞」。前者是持续优化，后者是风险控制。",
        { type: "h2", text: "过程与结果的权重" },
        "传统东亚棋类文化高度评价「棋品」——你如何赢，你如何输，比赢本身更重要。西方的棋类传统则更早地走向竞技化，胜负就是全部。这并非优劣之分，而是两套博弈传统在不同社会结构下自然演化的结果。",
        { type: "h2", text: "两张对照表" },
        { type: "ul", items: [
          "目标：围棋 = 围地最大化 / 国际象棋 = 将死对方王",
          "开局：围棋 = 空棋盘自主构建 / 国际象棋 = 满棋盘既定调度",
          "节奏：围棋 = 长线复利 / 国际象棋 = 短促战术",
          "复盘：围棋 = 效率优化 / 国际象棋 = 漏洞排查",
        ]},
                "如果你想在浏览器里直接体验这两种思路的碰撞，YiBoard 提供了围棋、中国象棋、五子棋等中文棋类的在线对局，无需下载、无需注册即可开局。",
        { type: "cta", text: "免费试玩", href: "/games" },
      ],
      en: [
        "Open any introductory book on board games and you will read the same line: learn the rules first, then learn strategy. But the rules already presuppose a strategy. The rules of Go fit in a single sentence - place stones alternately, and whoever surrounds more territory wins. The rules of chess take dozens of pages, because every piece has its own movement, capture, and restriction. That gap in rule complexity directly shapes two entirely different ways of thinking.",
        { type: "h2", text: "The Board: Empty vs Full" },
        "Go begins from an empty board, leaving all 361 intersections for the players to define. Chess begins from a full board, with 32 pieces already in place, and the players spend the game manoeuvring and trading them. The first is the creation of order; the second is the reorganisation of an order that already exists. This makes the opening of a Go game feel like sowing, and the opening of a chess game feel like negotiating.",
        "A direct consequence: the first fifty moves of a Go game often reveal nothing about who is winning, or even what either side intends. The first ten moves of a chess game already tell you a lot about both players' personalities. Go permits you to spend a move on pure structure, because it believes in compounding. Chess demands that every move carry immediate tactical or positional value, because it believes in efficiency.",
        { type: "h2", text: "Winning: Half a Point vs Checkmate" },
        "Go outcomes are continuous - you can win by half a point, or by a hundred - yet only two outcomes exist: win or lose. Chess outcomes are discrete: checkmate, or a draw, with nothing in between. The result is that Go players compete perpetually on marginal advantage, and the rating gap between winning by half a point and winning by a hundred is far smaller than the skill gap behind it.",
        "In practice: post-game review in Go centres on which move was inefficient; review in chess centres on which move planted a fatal weakness. The first is continuous optimisation, the second is risk control.",
        { type: "h2", text: "Process vs Outcome" },
        "Traditional East Asian game culture places high value on conduct - how you win and how you lose matters more than the win itself. The Western chess tradition turned competitive far earlier, and the result is all that counts. This is not a question of better or worse, but of two gaming traditions evolving under different social structures.",
        { type: "h2", text: "Two Sides, Side by Side" },
        { type: "ul", items: [
          "Goal: Go = maximise surrounded territory / Chess = checkmate the king",
          "Opening: Go = build from an empty board / Chess = deploy a fixed board",
          "Tempo: Go = long-horizon compounding / Chess = short sharp tactics",
          "Review: Go = optimise efficiency / Chess = hunt for blunders",
        ]},
                "If you want to feel that collision of approaches directly in a browser, YiBoard hosts Go, Chinese chess, and Gomoku for online play - no download and no signup required to start a game.",
        { type: "cta", text: "Play free", href: "/games" },
      ],
    },
  },
  {
    slug: "gomoku-defense-first",
    date: "2026-10-02",
    tags: ["gomoku", "strategy", "defense", "blocking"],
    title: {
      zh: "防守的艺术：先堵还是先攻",
      en: "Defense First: Block or Attack",
    },
    description: {
      zh: "五子棋防守不是看到三子就堵。这篇讲清哪些棋形必须立刻处理、哪些可以放着不管，以及怎样把防守的那一步下成反攻的起点。",
      en: "Gomoku defense is not about blocking every three. This covers which shapes demand an immediate answer, which can be ignored, and how to turn a blocking stone into a counter attack.",
    },
    keywords: [
      "gomoku defense",
      "gomoku blocking strategy",
      "defensive play gomoku",
      "gomoku counter attacks",
      "how to block open three in gomoku",
      "gomoku defense vs attack",
    ],
    content: {
      zh: [
        "五子棋防守是新手最先遇到、也最容易搞错的一件事。绝大多数人的默认反应是看到对方三子就堵，结果一路被动，最后被对手用看似无关的落子连成五子。问题不在于堵得不够快，而在于没有区分哪些棋形必须立刻处理、哪些根本不用管，以及堵的那一步能不能顺带制造威胁。这篇讲清楚判断标准，以及怎样把防守子下成反攻的起点。",
        { type: "h2", text: "先搞清一件事：不是每个活三都要堵" },
        "五子棋里真正需要你响应的，只有活三。活三的定义是：再落一子就能形成活四，而活四是无法被防守的，因为两头都能成五。",
        {
          type: "ul",
          items: [
            "这三条线是不是连续的，中间没有空格",
            "两端是否都还空着，并且延长一格后不会立刻被堵死",
          ],
        },
        "如果一端已经被自己的子或棋盘边界挡住，那是眠三，形成冲四时只有一个成五点，是可以算清楚再处理的。很多新手把眠三当活三来堵，白白浪费一手。",
        { type: "h2", text: "必须立刻处理的三种棋形" },
        "按优先级排列，出现下面任何一种时，你的下一手基本没有别的选择。",
        {
          type: "ul",
          items: [
            "活四：已经无法防守，真正的应对是在对手形成活四之前就动手",
            "活三：必须堵，但可以选堵哪一端",
            "冲四：只有一个成五点，必须堵住那一点，这是强制的一手",
          ],
        },
        "冲四的优先级高于活三，因为冲四下一手就成五。如果对手同时有冲四和活三，先挡冲四的成五点，再看活三是否还在。",
        { type: "h2", text: "堵了就是输：被动防守的代价" },
        "单纯跟着对手的棋形走，会陷入一种固定节奏：对手制造威胁，你回应，对手再制造新威胁。这种节奏下你永远慢一手，因为你的每一步都被对方的上一手决定。",
        {
          type: "ul",
          items: [
            "你的落子位置由对手决定，无法围绕自己的棋形做积累",
            "对手可以在制造威胁的同时搭建自己的结构，一次落子两用",
            "到中后盘，棋盘上会同时出现两三个威胁，你只能处理一个",
          ],
        },
        "判断自己是否陷入被动，看一个简单的指标：回头数你的落子里有多少是落在对手上一手旁边的位置。超过一半就说明节奏在对方手里。",
        { type: "h2", text: "反攻：把防守子变成威胁" },
        "好的防守落子同时做两件事：堵住对方，并且形成自己的棋形。这正是防守反击的思路，也是五子棋里最容易被低估的一手。",
        {
          type: "ul",
          items: [
            "堵活三时优先选那一端，使你的子落在自己已有棋子的延长线上",
            "优先选择能形成跳三或活二的位置，而不是仅仅贴着对方",
            "如果堵的同时能形成活三，对方就必须反过来回应你，攻守易位",
          ],
        },
        "这一步的收益不只是效率。当对手发现每制造一次威胁都会被你反过来威胁，他就不得不分心防守，节奏自然回到你这边。",
        { type: "h2", text: "一个能直接套的判断顺序" },
        "每次轮到你时，按这个顺序扫一遍棋盘，不需要长考。",
        {
          type: "ul",
          items: [
            "先看自己有没有成五点，有就直接落",
            "再看对手有没有成五点，有就堵",
            "检查自己能否一手形成活四，能就走",
            "检查对手能否一手形成活四，能就堵住关键点",
            "检查自己能否形成活三同时堵住对手的活三，这是最优解",
            "以上都没有时，落在能同时延伸自己两个方向的位置",
          ],
        },
        "这个顺序里有两条是关于自己的，说明进攻和防守的检查要交替进行，而不是先防完再想攻。",
        { type: "h2", text: "新手最常见的三种防守误判" },
        {
          type: "ul",
          items: [
            "把眠三当活三堵，浪费一手且没有收益",
            "堵在对方棋形的中间而不是两端，实际上没有消除威胁",
            "只盯着对方最近落的一子，忽略棋盘另一侧已经成型的活二和活三",
          ],
        },
        "第三种最致命。对手连续在左侧制造威胁吸引你的注意力，右侧的结构早已具备成五条件。",
        {
          type: "faq",
          items: [
            { q: "对手下出活四，还有救吗？", a: "没有。活四两头都能成五，堵住一头另一头立刻成五。能做的只有在活三阶段就处理掉。" },
            { q: "禁手规则下防守有什么不同？", a: "黑棋有禁手限制，白棋可以利用逼迫黑棋落禁手点的方式来防守，这是白棋后手的主要补偿手段之一。" },
            { q: "应该先学进攻还是先学防守？", a: "先学识别活三和冲四。这两件事决定你在哪一回合被迫回应，之后无论攻防都需要它。" },
            { q: "怎么练习判断速度？", a: "用限时对局，每步不超过五秒，逼自己走完上面那个检查顺序。速度来自重复，不是来自长考。" },
          ],
        },
        "上面这套判断顺序，最有效的练法是在真实对局里重复执行。yiboardgame.com 上有[在线对战页](/play)，不用注册就能开一局，浏览器里的 AI 对手会持续给你制造需要判断的棋形。规则细节见[五子棋规则](/gomoku-rules)，基础走法看[玩法说明](/how-to)。",
        { type: "cta", text: "免费开一局", href: "/play" },
      ],
      en: [
        "Gomoku defense is the first thing a new player gets wrong and the hardest thing to correct. The default reaction is to block every three in a row, which leads to a passive game and a loss to a line that looked unrelated. The problem is not blocking too slowly. It is failing to tell which shapes demand an immediate answer, which can be ignored, and whether your blocking stone can also create a threat. This covers the decision rule and how to turn a defensive move into the start of a counter attack.",
        { type: "h2", text: "Not every three needs an answer" },
        "The only shape that demands a response is an open three. An open three is one move away from an open four, and an open four cannot be defended because both ends complete five.",
        {
          type: "ul",
          items: [
            "Are the three stones continuous, with no gap in the middle",
            "Are both ends empty, and does extending one space survive an immediate block",
          ],
        },
        "If one end is already blocked by your own stone or the board edge, that is a closed three. It produces a straight four with a single completion point, which you can calculate and handle later. Treating closed threes as open threes wastes a move.",
        { type: "h2", text: "Three shapes that demand an immediate move" },
        "In priority order. If any of these appears, your next move is largely decided.",
        {
          type: "ul",
          items: [
            "Open four: already lost. The real answer is to act before the opponent reaches this shape.",
            "Open three: must be blocked, but you can choose which end.",
            "Straight four: one completion point, so blocking that point is forced.",
          ],
        },
        "A straight four outranks an open three, because the next move completes five. If the opponent has both, take the straight four completion point first, then check whether the open three still stands.",
        { type: "h2", text: "Blocking your way to a loss" },
        "Following the opponent's shapes creates a fixed rhythm: they build a threat, you answer, they build another. You stay one move behind, because every move you make is decided by their previous one.",
        {
          type: "ul",
          items: [
            "Your stone placement is chosen by the opponent, so nothing accumulates around your own shape",
            "The opponent builds structure while threatening, getting two uses from one stone",
            "By the middle game, two or three threats exist at once and you can only answer one",
          ],
        },
        "To measure whether you are passive, count how many of your stones sit adjacent to the opponent's previous move. More than half means they hold the tempo.",
        { type: "h2", text: "Counter attacks: make the blocking stone a threat" },
        "A strong defensive move does two jobs. It blocks, and it builds your own shape. That is the gomoku blocking strategy worth learning, and it is what defensive play in gomoku is built around.",
        {
          type: "ul",
          items: [
            "When blocking an open three, pick the end that puts your stone on the extension of your own existing stones",
            "Prefer a position that creates a jump three or an open two over one that merely sits next to the opponent",
            "If the block also forms an open three, the opponent must answer you, and the tempo flips",
          ],
        },
        "The gain is not only efficiency. Once the opponent sees that every threat gets reversed into a threat against them, they have to spend moves defending, and the tempo comes back to you.",
        { type: "h2", text: "A check order you can run every turn" },
        "Scan the board in this order. It does not need long thinking.",
        {
          type: "ul",
          items: [
            "Check whether you have a five completion point. Take it.",
            "Check whether the opponent has one. Block it.",
            "Check whether you can form an open four in one move. Play it.",
            "Check whether the opponent can. Block the key point.",
            "Check whether you can form an open three that also blocks their open three. This is the best case.",
            "If none apply, play a stone that extends your shape in two directions at once.",
          ],
        },
        "Two of those six steps are about your own attack, which is the point. Offensive and defensive checks alternate rather than running defense first and attack later.",
        { type: "h2", text: "Three defensive misreads new players make" },
        {
          type: "ul",
          items: [
            "Blocking a closed three as if it were open, spending a move for nothing",
            "Blocking the middle of a shape instead of an end, which does not remove the threat",
            "Watching only the opponent's most recent stone and missing an open two or three forming elsewhere",
          ],
        },
        "The third one is fatal. Continuous threats on the left pull your attention while the right side quietly reaches a winning structure.",
        {
          type: "faq",
          items: [
            { q: "The opponent made an open four. Is there any save?", a: "No. Both ends complete five, so blocking one lets them finish at the other. The only real answer is to deal with the shape while it is still an open three." },
            { q: "Does the forbidden-move rule change defense?", a: "Yes. Black is restricted by forbidden moves, so White can defend by forcing Black onto a forbidden point. That is one of the main compensations for moving second." },
            { q: "Should I learn attack or defense first?", a: "Learn to recognise open threes and straight fours first. Those decide which turns force a response, and both attack and defense depend on that afterwards." },
            { q: "How do I build speed at this?", a: "Play with a five second per move limit and force yourself through the check order above. Speed comes from repetition, not from thinking longer." },
          ],
        },
        "The check order above only sticks if you repeat it in actual games. yiboardgame.com has an [online play page](/play) with no signup required, and the in-browser AI keeps producing shapes that force these decisions. Rules are on the [gomoku rules page](/gomoku-rules), and the basics are in [how to play](/how-to).",
        { type: "cta", text: "Play free", href: "/play" },
      ],
    },
  },
  {
    slug: "gomoku-double-three-fours",
    date: "2026-10-03",
    tags: ["gomoku", "strategy", "double-three", "forbidden-moves", "tactics"],
    title: {
      zh: "双三与双四：五子棋的必胜组合",
      en: "Double Threes and Double Fours: Gomoku Winning Combinations",
    },
    description: {
      zh: "五子棋双三是最容易上手的必胜组合：一步做出两个活三，对手只能堵一个。这篇讲清双三、双四和四三各自的取胜路径、禁手规则下的限制，以及怎么提前两三步把棋形搭出来。",
      en: "A gomoku double three is the most teachable winning combination: one stone makes two open threes, the opponent can answer only one. How double threes, double fours and four-threes convert, what forbidden-move rules change, and how to build the shape early.",
    },
    keywords: [
      "gomoku double three",
      "double three win",
      "gomoku combinations",
      "fork tactics gomoku",
      "gomoku double four",
      "four three gomoku",
      "gomoku forbidden moves double three",
      "五子棋双三",
    ],
    content: {
      zh: [
        "五子棋双三是所有必胜组合里最容易上手的一个：一步棋同时做出两个活三，对手只能堵掉其中一个，剩下那个无论怎么走都会变成活四。理解它不难，难的是在实战里提前两三步把棋形搭出来，而不是等它偶然出现。这篇讲清双三、双四和四三各自的取胜路径、禁手规则下哪些组合被禁止，以及一份能照着练的搭建顺序。想真正记住，最有效的办法是在[在线对战页](/play)上试一局。",
        { type: "h2", text: "双三为什么必然赢：对手只能堵一个" },
        "活三的定义是再落一子就能形成活四。活四两头都能成五，堵住一头，另一头立刻成五，所以活四无法防守。这条性质直接推出双三的取胜路径。",
        {
          type: "ul",
          items: [
            "第一步：落一子同时形成两个活三，这一步叫双三",
            "第二步：对手堵掉其中一个活三，另一个他顾不上",
            "第三步：把剩下的那个活三延长成活四",
            "第四步：对手堵一头，你从另一头成五",
          ],
        },
        "关键在于第三步的活四是自己造出来的，不是对手送的。双三的价值不在棋形好看，而在于它把对手被迫的那一手回应，变成了你取胜流程里的一环。",
        { type: "h2", text: "双四与四三：更快也更常见的两种" },
        "双三要走四步才见分晓。双四和四三更快，实战里出现得也更频繁。",
        {
          type: "ul",
          items: [
            "双四：一步同时形成两个冲四，两个成五点不同，对手只能堵一个，下一手直接成五",
            "四三：一步同时形成一个冲四和一个活三，对手必须先挡冲四，你再把活三补成活四",
            "活四：单独出现就已经无法防守，不需要其他棋形配合",
          ],
        },
        "按取胜速度排：活四最快，双四次之，四三再次，双三最慢。按能提前搭建的难易排正好反过来，双三可以用很安静的落子慢慢准备，双四和四三则常常需要对手的棋形配合才做得出来。",
        { type: "h2", text: "怎么提前做出双三：棋形搭建顺序" },
        "双三是结构，不是灵感。绝大多数双三由两个已经存在的活二交叉而成。",
        {
          type: "ul",
          items: [
            "先在两个不同方向各布一个活二，让两个活二的延长线相交",
            "交点必须空着，并且落子后两个方向都能形成连续三子",
            "优先选斜线配直线的组合，斜线是扫棋时最容易漏掉的方向",
            "落子前确认交点不会被对手的冲四反逼，否则你会被迫先去防守",
          ],
        },
        "一个能立刻用的自检方法：把棋盘上你自己的所有活二列出来，画出各自的延长线，两条线的交点就是候选的双三点。多数人找不到双三，是因为从来没有主动数过自己有几个活二。",
        { type: "h2", text: "禁手规则下：黑棋不能随便做双三" },
        "正式规则（Renju）为了抵消先手优势，对黑棋加了限制。黑棋一步同时形成两个活三属于禁手，判负；双四同样禁止；连成六子以上也不算赢。",
        {
          type: "ul",
          items: [
            "双三禁手：黑棋一步形成两个活三，判负",
            "双四禁手：黑棋一步形成两个冲四或活四，判负",
            "长连禁手：黑棋连成六子或更多，不算胜",
            "白棋没有这些限制，可以自由使用双三和双四",
          ],
        },
        "有个常被忽略的细节：四三不算禁手。黑棋一步形成冲四加活三是合法的，这也是禁手规则下黑棋最主要的取胜手段。要确认你正在用哪套规则，见[五子棋规则](/gomoku-rules)。",
        { type: "h2", text: "白棋怎么用双三反打" },
        "白棋没有禁手限制，双三因此成为后手最可靠的翻盘手段。做双三的最佳时机，是黑棋正把注意力压在一侧进攻的时候。",
        {
          type: "ul",
          items: [
            "黑棋在左侧连续制造威胁时，白棋在右侧安静地布两个活二",
            "白棋的活二尽量避开黑棋的延长线，降低被顺手堵掉的概率",
            "交点一旦出现就不要犹豫，被黑棋自己占掉就没有第二次机会",
          ],
        },
        "白棋还有一条更隐蔽的路：逼黑棋落到禁手点上。当黑棋被迫去堵某个点，而那个点恰好构成双三时，黑棋不能落。这是后手补偿的一部分，更细的说明见[防守的艺术](/blog/gomoku-defense-first)。",
        { type: "h2", text: "识别对手的双三：三步检查清单" },
        {
          type: "ul",
          items: [
            "数对手的所有活二，出现两个就要警惕",
            "画出活二的延长线，找交点；交点空着就是威胁点",
            "如果那个交点同时能让对手形成冲四，优先堵交点，而不是堵现有棋形",
          ],
        },
        "第三条是关键。堵现有棋形只是延缓，堵交点才是消除威胁。很多人等到对手的双三已经做出来才开始堵，那时已经晚了；正确时机是对手刚布出第二个活二的那一手。",
        {
          type: "faq",
          items: [
            { q: "双三一定能赢吗？", a: "在对手没有更强威胁的前提下一定赢。如果对手同时握着冲四，他可以在你走完第三步之前先成五，所以每次都要按优先级先处理对方的冲四和活四。" },
            { q: "黑棋做双三算禁手吗？", a: "在 Renju 禁手规则下算，判负。自由规则（freestyle）下不算，黑棋可以随意使用。开局前先确认当前用的是哪一套规则。" },
            { q: "双三和四三哪个更实用？", a: "四三更实用。它只需要一个冲四加一个活三，成型条件比双三宽松，取胜更快，而且对黑棋是合法手段。" },
            { q: "怎么练出找双三的眼力？", a: "每局结束后回放，数出哪些回合出现过两个活二共存却没人利用。平时用限时模式逼自己每步都扫一遍交点，速度来自重复而不是长考。" },
          ],
        },
        "三种组合的取胜路径、禁手的边界、以及找交点的手法，都只能在真实对局里练出来。直接在[在线对战页](/play)开一局，不用注册，浏览器内的 AI 对手会持续给你出需要判断的棋形；基础走法见[玩法说明](/how-to)。",
        { type: "cta", text: "免费开一局", href: "/play" },
      ],
      en: [
        "A gomoku double three is the most teachable of all winning combinations: one stone creates two open threes at once, the opponent can answer only one, and the other turns into an open four no matter how the reply goes. Understanding it is easy. Building the shape two or three moves earlier, in a real game, is the part that takes practice. This covers how double threes, double fours and four-threes each convert into a win, which combinations forbidden-move rules take away, and a build order you can drill. The fastest way to make it stick is to try it in a [live game](/play).",
        { type: "h2", text: "Why a double three cannot be answered" },
        "An open three is one move away from an open four. An open four cannot be defended, because blocking one end leaves the other end completing five. That single property produces the whole forced line.",
        {
          type: "ul",
          items: [
            "Move one: place a stone that makes two open threes at once. That is the double three.",
            "Move two: the opponent blocks one of them and has no move left for the other.",
            "Move three: extend the surviving open three into an open four.",
            "Move four: the opponent blocks one end, you complete five from the other.",
          ],
        },
        "What matters is that the open four in move three is one you built, not one the opponent handed you. A double three earns its place not by looking clever but by turning a forced reply into a step of your own sequence.",
        { type: "h2", text: "Double fours and four-threes, the faster versions" },
        "A double three takes four moves to convert. Double fours and four-threes are faster, and they show up far more often in real games.",
        {
          type: "ul",
          items: [
            "Double four: one stone makes two straight fours with different completion points. The opponent blocks one, you complete the other on the next move.",
            "Four-three: one stone makes a straight four and an open three. The opponent must answer the four, then you extend the three into an open four.",
            "Open four: on its own it is already unstoppable and needs no support from another shape.",
          ],
        },
        "Ranked by speed: open four first, double four second, four-three third, double three last. Ranked by how easily you can prepare it, the order reverses, because a double three can be set up with quiet moves while double fours and four-threes usually need the opponent's stones to cooperate.",
        { type: "h2", text: "Building the shape two moves early" },
        "A double three is structure, not inspiration. Almost every one of them comes from two existing open twos whose extension lines cross.",
        {
          type: "ul",
          items: [
            "Place an open two in two different directions so that their extension lines intersect.",
            "The intersection must be empty, and a stone there must complete a continuous three in both directions.",
            "Prefer a diagonal paired with a straight line, since diagonals are what players miss when scanning.",
            "Check that the point is not one your opponent can answer with a straight four, or you will be forced to defend first.",
          ],
        },
        "Here is a self-check you can run immediately: list every open two you have on the board, extend their lines, and look at where two lines meet. Those intersections are your double-three candidates. Most players never find them because they never count their own open twos.",
        { type: "h2", text: "Under forbidden-move rules" },
        "Formal Renju rules restrict black to offset the first-move advantage. A move that creates two open threes at once is forbidden for black and loses on the spot. So does a double four. So does an overline of six or more.",
        {
          type: "ul",
          items: [
            "Double three: black making two open threes with one stone loses.",
            "Double four: black making two fours with one stone loses.",
            "Overline: six or more in a row does not count as a win for black.",
            "White has none of these restrictions and may use double threes and double fours freely.",
          ],
        },
        "One detail gets missed often: a four-three is not forbidden. Black creating a straight four plus an open three with one move is legal, and it is black's main way to win under forbidden-move rules. Confirm which ruleset you are playing on the [gomoku rules page](/gomoku-rules).",
        { type: "h2", text: "How white uses the double three" },
        "White carries no forbidden moves, which makes the double three the most reliable way for the second player to turn a game around. The best moment to build one is while black is committed to attacking one side.",
        {
          type: "ul",
          items: [
            "While black builds threats on the left, settle two quiet open twos on the right.",
            "Keep your open twos off black's extension lines so they are not blocked as a side effect.",
            "Do not delay once the intersection exists. If black occupies it, the chance does not come back.",
          ],
        },
        "White also has a quieter weapon: forcing black onto a forbidden point. When black has to block at a square that would also create a double three, black cannot play there at all. That is part of what compensates the second player, and the [defense guide](/blog/gomoku-defense-first) covers it in more detail.",
        { type: "h2", text: "Spotting the opponent's double three" },
        {
          type: "ul",
          items: [
            "Count the opponent's open twos. Two of them means a threat exists.",
            "Extend their lines and find the crossing point. If it is empty, that square is the threat.",
            "If that square also gives the opponent a straight four, block the square rather than the existing shape.",
          ],
        },
        "The third line is the one that matters. Blocking the shape only delays the threat; blocking the intersection removes it. Most players start defending after the double three already exists, which is too late. The correct moment is the move right after the opponent's second open two lands.",
        {
          type: "faq",
          items: [
            { q: "Does a double three always win?", a: "It wins as long as the opponent has no stronger threat. If they are holding a straight four, they complete five before you reach move three, so always clear the opponent's fours first." },
            { q: "Is a double three a forbidden move for black?", a: "Under Renju forbidden-move rules, yes, and it loses immediately. Under freestyle rules it is not, and black may use it freely. Check the ruleset before you start." },
            { q: "Which is more practical, a double three or a four-three?", a: "The four-three. It needs only a straight four plus an open three, so it is easier to construct, converts faster, and stays legal for black." },
            { q: "How do I train the eye for finding them?", a: "Review each game afterwards and count the moments when two open twos coexisted and nobody used them. In play, use a time limit so you scan intersections every move. Speed comes from repetition, not from long thinking." },
          ],
        },
        "All three combinations, the forbidden-move boundaries, and the habit of looking for intersections can only be trained in real games. Open a [live game](/play) with no sign-up; the AI running in your browser keeps producing shapes worth judging. Basic moves are on the [how to play](/how-to) page.",
        { type: "cta", text: "Play free", href: "/play" },
      ],
    },
  },
  {
    slug: "gomoku-opening-first-move",
    date: "2026-10-04",
    tags: [
      "gomoku",
      "strategy",
      "opening"
    ],
    title: {
      zh: "五子棋开局：黑棋第一手与先手优势",
      en: "Gomoku Openings: Black's First Stone and the First-Move Advantage"
    },
    description: {
      zh: "黑先白后，黑棋在自由规则下被证明必胜，这不是玄学，是节奏问题。这篇讲清五子棋开局该抢哪些棋形、白棋前十手怎么应对，以及一份能照着练的练习顺序。",
      en: "Black moves first and, under freestyle rules, black wins with perfect play. That is tempo, not magic. Here is which shapes to claim in the gomoku opening, how white answers, and a ten-move routine you can rehearse."
    },
    keywords: [
      "gomoku opening theory",
      "gomoku first move advantage",
      "best gomoku opening",
      "gomoku opening strategy",
      "renju opening names"
    ],
    content: {
      zh: [
        "五子棋开局理论有一个让新手不太舒服的前提：黑先白后，在自由规则下黑棋被计算机搜索证明必胜。所以前十手对胜负的影响，比后面三十手加起来还大。五子棋开局不像国际象棋那样有一整套定式要背，它更像几组棋形，加上一个判断：现在轮到谁进攻。下面这些形状都可以在[对战页](/play)上直接试，不用注册。",
        {
          type: "h2",
          text: "先手优势到底从哪来"
        },
        "计算机穷举给出的结论是：没有禁手时，先手方存在必胜路径。正式比赛改用连珠（Renju）规则、给黑棋加上双三与双四禁手，原因就在这里。先手优势本身并不神秘，它的本质是节奏。棋盘上黑棋永远比白棋多一颗子，而在连成五子就立刻结束的游戏里，多一个节奏就等于多一个对方来不及应的威胁。落到开局上，指导很直接：黑棋应该在前几手同时往两个方向铺棋形，白棋则要确保黑棋铺不成。",
        {
          type: "h2",
          text: "决定开局的几种棋形"
        },
        {
          type: "ul",
          items: [
            "活二：同线两子，两端都空，是所有进攻的基本单位。",
            "活三：同线三子且两端皆空，再落一子就成活四，而活四无法防守。",
            "交叉点：你两条延长线的交点且该点为空。提前占住它，两颗安静的子才会变成双重威胁。",
            "斜线形：对手扫棋盘时先看直线，所以斜线上的棋形更容易被漏掉。"
          ]
        },
        {
          type: "h2",
          text: "定式的名字，以及它们证明了什么"
        },
        "连珠棋手会给开局起名字。直指开局把黑棋第二颗子放在与第一颗同线，斜指开局放在异线；花月、浦月、银月这类名字对应具体的黑棋棋形，其中若干已经被算成黑棋必胜。你不需要靠背名字下好棋。值得带走的是它们被整理出来的理由：正因为有足够多的定式被证明黑棋必胜，规则才必须改动。想确认自己这局用的是哪套规则，可以看[规则页](/gomoku-rules)上的禁手列表。",
        {
          type: "h2",
          text: "白棋的前十手怎么下"
        },
        {
          type: "ul",
          items: [
            "不要盲目对称模仿。跟着黑棋下，在黑棋做出利用中心点的棋形之前都成立，之后就崩了。",
            "保住自己的活二。白棋赢棋的方式，是在黑棋的先手用完时，自己手上还留着一个威胁。",
            "堵交叉点，而不是堵已有的棋形。堵活三只是延后，占住交点才是消除。",
            "宁可局面稍差，也别丢节奏。五子棋没有子力，只有节奏。"
          ]
        },
        {
          type: "h2",
          text: "一份前十手的练习顺序"
        },
        {
          type: "ul",
          items: [
            "第 1 到 3 手：占住中心或其邻位，所有子保持连接，不要把子撒开。",
            "第 4 到 6 手：在另一个方向做出第二个活二。",
            "第 7 到 10 手：先找出两条线的交叉点，再考虑延长其中任何一条。",
            "每局之后：重放前十手，标出交叉点第一次出现的那一手。这一个习惯对开局的帮助，比读理论快得多。"
          ]
        },
        {
          type: "h2",
          text: "FAQ"
        },
        {
          type: "faq",
          items: [
            {
              q: "黑棋一定赢吗？",
              a: "自由规则下理论上是，计算机穷举已经证明。连珠禁手规则下双方平衡。开局前先确认这局用的是哪套规则。"
            },
            {
              q: "新手用哪种开局最好？",
              a: "落在中心或其旁边，并保持棋子连接。斜线活二通常比直线活二活得更久，因为对手扫视棋盘时先看直线。"
            },
            {
              q: "需要背定式名字吗？",
              a: "刚开始不需要。先记四种棋形，再养成找交叉点的习惯。等你开始和懂定式的人下，名字才有用。"
            },
            {
              q: "一个人怎么练开局？",
              a: "给自己定一个时间上限，和浏览器里的 AI 下，每局结束后复盘前十手。[对战页](/play)的引擎在本地运行，不用排队。"
            }
          ]
        },
        "开局、节奏和交换规则，只有在你因为它们输过几局之后才真正变清楚。打开一局[在线对战](/play)，不用注册，浏览器里的 AI 会不断给出值得判断的开局形状。基础规则在[玩法页](/how-to)，开局之后要处理的问题写在[防守的艺术](/blog/gomoku-defense-first)里。",
        {
          type: "cta",
          text: "免费下一局五子棋",
          href: "/play"
        }
      ],
      en: [
        "Gomoku opening theory starts with a fact players dislike: black moves first, and under freestyle rules black wins with perfect play. That is why the first ten stones decide more of the result than the thirty after them. A gomoku opening is not a memorised script the way a chess opening is. It is a small set of shapes plus one judgement: who is attacking right now. Every shape below can be tried on the [play page](/play) without signing up.",
        {
          type: "h2",
          text: "Where the first-move advantage comes from"
        },
        "Computer search settled it: with no forbidden moves, the first player has a forced win. Competitive play switched to Renju rules for exactly that reason, restricting black with forbidden double threes and double fours. The advantage itself is not mystical, it is tempo. Black always has one more stone on the board than white, and in a game where five in a row ends everything on the spot, one spare tempo is one threat the opponent cannot answer. The practical reading is direct: black should spend the early moves building two directions at once, and white should spend them making sure black cannot.",
        {
          type: "h2",
          text: "The shapes that decide an opening"
        },
        {
          type: "ul",
          items: [
            "Open two: two stones in a line with both ends empty, the basic unit of every attack.",
            "Live three: three in a line with both ends open, one move away from an open four that cannot be defended.",
            "Crossing point: the empty square where two of your extension lines meet. Claiming it early is what turns two quiet stones into a double threat.",
            "Diagonal shapes: opponents scan straight lines first, so a shape built on a diagonal is the one that gets missed."
          ]
        },
        {
          type: "h2",
          text: "Named openings, and what they actually prove"
        },
        "Renju players label openings. Direct openings place black's second stone on the same line as the first; indirect openings place it off-line. Patterns carry names such as Huayue, Puyue and Yinyue, and several of them have been solved as forced black wins. You do not need the names to play well. Worth taking from them is the reason they were catalogued at all: enough named openings are proven black wins that the ruleset had to change. To confirm which ruleset a match uses, the [gomoku rules page](/gomoku-rules) lists the forbidden-move set.",
        {
          type: "h2",
          text: "How white plays the first ten moves"
        },
        {
          type: "ul",
          items: [
            "Do not mirror blindly. Copying black holds up until black builds a shape that uses the centre square, then it falls apart.",
            "Keep your own open two alive. White wins by having a threat left in hand when black runs out of forcing moves.",
            "Block the crossing point rather than the existing shape. Blocking a live three delays it; occupying the intersection removes it.",
            "Accept a slightly worse position over a lost tempo. Gomoku has no material count, only tempo."
          ]
        },
        {
          type: "h2",
          text: "A ten-move routine to rehearse"
        },
        {
          type: "ul",
          items: [
            "Moves 1 to 3: take the centre or a square beside it, keep every stone connected, do not scatter stones across the board.",
            "Moves 4 to 6: build a second open two in a direction different from the first.",
            "Moves 7 to 10: find the crossing point of your two lines before extending either of them.",
            "After the game: replay the first ten moves and mark the move where the crossing point first became available. That one habit improves openings faster than reading theory."
          ]
        },
        {
          type: "h2",
          text: "FAQ"
        },
        {
          type: "faq",
          items: [
            {
              q: "Does black always win in gomoku?",
              a: "Under freestyle rules, yes in theory, and computer search has shown it. Under Renju forbidden-move rules the game is balanced. Check which ruleset a match uses before you start."
            },
            {
              q: "What is the best gomoku opening for a beginner?",
              a: "Play at or beside the centre and keep your stones connected. A diagonal open two usually survives longer than a straight one, because opponents read straight lines first."
            },
            {
              q: "Should I memorise named openings?",
              a: "Not at the start. Learn the four shapes first, then the habit of hunting crossing points. Names become useful once you are playing people who know them."
            },
            {
              q: "How do I practise openings on my own?",
              a: "Set yourself a time limit, play the browser AI, and review the first ten moves after each game. The engine on the [play page](/play) runs locally, so there is no queue."
            }
          ]
        },
        "Openings, tempo and the swap rule only become obvious once you have lost a few games to them. Open a [live game](/play) with no sign-up; the AI in your browser keeps producing opening shapes worth judging. The basics sit on the [how to play](/how-to) page, and what comes after the opening is covered in [Defense First](/blog/gomoku-defense-first).",
        {
          type: "cta",
          text: "Play a free gomoku game",
          href: "/play"
        }
      ]
    }
  },
  {
    slug: "evaluation-functions-judging-the-position",
    date: "2026-10-05",
    tags: [
      "gomoku",
      "ai",
      "strategy"
    ],
    title: {
      zh: "评估函数：怎么判断局势",
      en: "Evaluation Functions: Judging the Position"
    },
    description: {
      zh: "搜索会在半路停下，剩下那一半靠评估函数。这篇讲清局面评估在做什么、五子棋棋形怎么打分、启发式评分什么时候会骗人，以及怎么把引擎的判断用成自己的直觉。",
      en: "Search stops halfway, and the other half is the evaluation function. Here is what board evaluation actually does, how gomoku shapes get scored, when heuristic scoring lies, and how to turn engine numbers into your own judgement."
    },
    keywords: [
      "board evaluation",
      "gomoku evaluation function",
      "heuristic game scoring",
      "position analysis",
      "game ai evaluation"
    ],
    content: {
      zh: [
        "局面评估函数回答的是一个搜索答不上来的问题：棋局还没结束，现在谁占优？alpha-beta 剪枝负责决定读哪些变化，评估函数负责给读到的局面定价。如果你读过[浏览器里的搜索是怎么跑的](/blog/alpha-beta-engine-in-browser)，这就是同一个程序的另一半。",
        {
          type: "h2",
          text: "搜索为什么必须停在半路"
        },
        "15 路棋盘有 225 个交叉点，完整博弈树的规模远超一个浏览器标签页能走完的量。搜索只能切在一个固定深度上，而那个深度的局面几乎从来不是胜负已分的状态，它是一盘有三四个方向同时在铺的乱局。必须有东西把这份乱局压成一个数字。",
        "这个东西就是评估函数。它只看一条变化的终点局面，不看这条线是怎么走过来的，所以它必须便宜。一个耗时 1 毫秒的函数，在 500 毫秒预算里能被调用几十万次；耗时 10 毫秒的只能调用五万次，搜索反而变浅。这里的速度不是优化项，它直接决定引擎能想多深。",
        {
          type: "h2",
          text: "棋形打分：一份能照抄的评分表"
        },
        "评估函数不看局面「好不好看」，它数棋形。下面这组分值是我们五子棋引擎内部量级的简化版，单位不重要，相对大小才重要。",
        {
          type: "ul",
          items: [
            "活四（两端皆空）：100000。防不住，直接按胜处理。",
            "活三（三子同线，两端皆空）：10000。再走一步就是活四。",
            "眠三（一端被堵）：1000。仍是威胁，但对方来得及应。",
            "活二（两端皆空）：100。原材料，单独存在几乎没价值。",
            "眠二（一端被堵）：10。",
            "交叉点：把两条线同时计分，分数通常在这里跳一档，这也是双威胁比单威胁贵得多的原因。",
            "对手的棋形用同一套分值扣掉；开局阶段防守的权重会比进攻略高一点。"
          ]
        },
        {
          type: "h2",
          text: "一个能写出来的五子棋评估函数"
        },
        "真正跑着的五子棋评估函数是「扫描棋形 + 求和」两件事。扫描沿四个方向（横、竖、两条斜线）滑过每一个长度为五的窗口，把窗口里的黑白子分布归类成上面那些棋形；求和把归类结果按权重加起来，再减去对手的。最后加上一个先手补偿，因为轮到谁走本身就值一点分。",
        "写成一行就是：分数 = 我方棋形加权和 − 对方棋形加权和 + 先手补偿。它不预测未来，也不理解意图，只是把当前这盘棋上能看到的东西称一遍重量。听起来朴素，但配上足够深的搜索，它已经能在 500 毫秒内下出很难缠的棋。",
        {
          type: "h2",
          text: "启发式评分什么时候会骗人"
        },
        "启发式游戏评分有三个固定的失效点，知道它们比知道分值更有用。",
        {
          type: "ul",
          items: [
            "地平线效应：引擎把一个输棋推到搜索深度之外，看起来暂时安全。它会选择慢输而不是立刻输，分数在深度边缘是最好看的，过了那条线就崩。",
            "重复计数：一颗同时属于两条线的子会被数两次。紧凑的棋团因此比散开的棋团得分高，多数时候这个偏差是对的，但被对手从外侧封住时它就错了。",
            "读不出意图：一个只有在对手漏看时才成立的棋形，会被打满分。评估函数默认对手看得见一切，也默认自己看得见一切，两边都不真。"
          ]
        },
        {
          type: "h2",
          text: "怎么用局面分析，又不全信它"
        },
        "500 毫秒跑出来的局面分析是第二意见，不是判决。最有用的用法是拿它验证一个你已经有的感觉：你觉得这手不行，看分数是不是也掉了；如果分数和你相反，先找出是哪条线被算进去了，再决定听谁的。",
        {
          type: "ul",
          items: [
            "先下你本来想下的那手，再看分数怎么变。反过来做，你会变成在抄答案。",
            "盯住分数跳变的那一手，而不是盯着最终数字。跳变说明某个棋形成立了。",
            "每局只复盘一到两个转折。全盘看分数，你什么也记不住。"
          ]
        },
        {
          type: "h2",
          text: "FAQ"
        },
        {
          type: "faq",
          items: [
            {
              q: "什么是局面评估函数？",
              a: "引擎里负责给局面打分的那一部分。搜索在固定深度停下之后，它读取终点局面并返回一个数字，用来比较不同变化的优劣。"
            },
            {
              q: "为什么不直接搜到分出胜负？",
              a: "博弈树太大。15 路五子棋有 225 个交叉点，完整搜索的规模超过一个浏览器标签页的预算，所以只能在固定深度截断，再靠评估函数补齐。"
            },
            {
              q: "引擎的评分能帮我提高棋力吗？",
              a: "能，前提是你用它检验判断而不是替代判断。先落你自己的那一手，再在[对战页](/play)上看分数变化，找出让数字跳变的那个棋形。"
            }
          ]
        },
        "引擎不会告诉你为什么输，它只会告诉你数字是从哪一手开始转向的。把这个数字和你自己的判断对上，靠的是对局量：打开[在线对战](/play)，不用注册，看着分数随棋形跳动。基础规则在[玩法页](/how-to)，搜索那一半写在[浏览器里的引擎](/blog/alpha-beta-engine-in-browser)里。",
        {
          type: "cta",
          text: "免费下一局五子棋",
          href: "/play"
        }
      ],
      en: [
        "Board evaluation is the function that answers a question the search cannot: the game is not over, so who is ahead? Alpha-beta pruning decides which lines are worth reading, and the evaluation function decides what those lines are worth once reading stops. If you have read how the search runs in [your browser](/blog/alpha-beta-engine-in-browser), this is the other half of the same program.",
        {
          type: "h2",
          text: "Why the search has to stop halfway"
        },
        "A 15x15 board has 225 intersections, and the full game tree is far larger than anything a browser tab can walk. Search has to be cut off at a fixed depth, and the position at that depth is almost never settled. It is a messy board with three or four directions developing at once. Something has to compress that mess into one number.",
        "That something is the evaluation function. It reads only the final board of a line, not the moves that produced it, so it has to be cheap. A function costing 1 ms can run a few hundred thousand times inside a 500 ms budget. One costing 10 ms runs fifty thousand times and the search gets shallower. Speed here is not an optimisation detail, it sets how deep the engine can think.",
        {
          type: "h2",
          text: "Scoring shapes: the numbers behind board evaluation"
        },
        "The function does not judge whether a position looks pleasant. It counts shapes. The values below are a simplified version of the magnitudes inside our gomoku engine. The units do not matter, only the ratios do.",
        {
          type: "ul",
          items: [
            "Open four, both ends empty: 100000. It cannot be defended, so treat it as a win.",
            "Live three, three in a line with both ends open: 10000. One move from an open four.",
            "Sleeping three, one end blocked: 1000. Still a threat, but the opponent has time to answer.",
            "Open two: 100. Raw material, worth almost nothing on its own.",
            "Sleeping two: 10.",
            "Crossing point: both lines are scored at once, which is usually where the number jumps. That is why a double threat costs far more than two single ones.",
            "Opponent shapes use the same values subtracted, with defense weighted slightly higher than attack during the opening."
          ]
        },
        {
          type: "h2",
          text: "A gomoku evaluation function, written out"
        },
        "A gomoku evaluation function in production does two things: scan for shapes, then sum them. The scan slides a five-square window along all four directions, horizontal, vertical, and both diagonals, and classifies what it finds into the shapes above. The sum applies the weights, subtracts the opponent's total, then adds a small tempo bonus, because the right to move is itself worth something.",
        "Written on one line: score = weighted shapes for me, minus weighted shapes for you, plus tempo. It predicts nothing and understands no intent. It weighs what is visible on the board right now. That sounds plain, and paired with a deep enough search it produces play that is genuinely hard to beat in 500 ms.",
        {
          type: "h2",
          text: "Where heuristic game scoring goes wrong"
        },
        "Heuristic game scoring has a few fixed failure modes, and knowing them matters more than knowing the values.",
        {
          type: "ul",
          items: [
            "Horizon effect: the engine pushes a loss just past its depth limit and calls the position fine. It will choose to lose slowly over losing now, because the score looks best right at the edge.",
            "Double counting: a stone belonging to two lines gets counted twice, so a compact cluster outscores a spread one. That bias is usually right, and it breaks when the opponent seals you from the outside.",
            "No reading of intent: a shape that only works if the opponent misses it still scores in full. The function assumes perfect vision on both sides, which is true of neither."
          ]
        },
        {
          type: "h2",
          text: "Using position analysis without obeying it"
        },
        "Position analysis from a 500 ms engine is a second opinion, not a verdict. The useful way to read it is as a check on a feeling you already have: you think that move was weak, so see whether the number dropped too. If the number disagrees with you, find which line it counted before you decide who is right.",
        {
          type: "ul",
          items: [
            "Play the move you intended, then look at how the score moves. Doing it the other way round turns you into someone copying an answer key.",
            "Watch the move where the score jumps, not the final number. A jump means a shape became real.",
            "Review one or two turning points per game. Score-watching the whole board leaves you remembering nothing."
          ]
        },
        {
          type: "h2",
          text: "FAQ"
        },
        {
          type: "faq",
          items: [
            {
              q: "What is a board evaluation function?",
              a: "The part of an engine that scores a position. Once the search stops at its depth limit, this function reads the resulting board and returns a single number used to compare candidate lines."
            },
            {
              q: "Why not search until someone wins?",
              a: "The tree is too large. Gomoku on a 15x15 board has 225 intersections, and exhaustive search exceeds what a browser tab can spend, so the search cuts off at a fixed depth and the evaluation function fills the gap."
            },
            {
              q: "Can engine analysis actually make me a better player?",
              a: "Yes, if you use it to test your judgement rather than in place of it. Play your own move first, then watch the score move on the [play page](/play) and find the shape that caused the jump."
            }
          ]
        },
        "The engine will not explain why you lost, only where the number turned against you. Closing the gap between that number and your own judgement takes games: open a match on the [play page](/play), no sign-up, and watch the score move with each shape. The rules sit on [how to play](/how-to), and the search half is covered in [the engine in your browser](/blog/alpha-beta-engine-in-browser).",
        {
          type: "cta",
          text: "Play a free gomoku game",
          href: "/play"
        }
      ],
    }
  },
  {
    slug: "how-ratings-work-starting-1200",
    date: "2026-10-06",
    tags: [
      "gomoku",
      "ranking",
      "strategy"
    ],
    title: {
      zh: "段位分怎么算：初始 1200",
      en: "How Ratings Work: Starting at 1200"
    },
    description: {
      zh: "1200 分起步，不代表所有人都一样强。这篇拆开 YiBoard 的评分算法：期望分的那行公式、赢了加多少输了减多少的真实数字、新手期为什么爬得快，以及分数和段位之间怎么换算。",
      en: "A 1200 start does not mean everyone plays the same. Here is the rating algorithm behind YiBoard: the expected-score formula, the real numbers behind rating gain and loss, why a new account climbs faster, and how the score converts to grades and dans."
    },
    keywords: [
      "rating algorithm",
      "gomoku rating calculation",
      "rating gain loss",
      "elo-like system",
      "yiboard rating",
      "gomoku rank points"
    ],
    content: {
      zh: [
        "YiBoard 上每个新账号都从 1200 分、六级起步。头几局你会发现分数跳得没道理：赢一个高出 200 分的对手涨了二十多，赢一个低 200 分的对手只涨了个位。这不是随机抖动，是同一套评分算法（rating algorithm）在算一件事：按双方的分差，这一局你本来应该拿到多少。把它的算式读完，你就知道自己那个称号是凭什么来的。规则部分写在[玩法页](/how-to)，横向对比放在[段位制与 ELO](/blog/grades-vs-elo-ranking-systems) 那篇。",
        {
          type: "h2",
          text: "期望分：所有的账都在这一行里"
        },
        "算法只做两步。先算出你按概率该拿多少，再拿实际结果减掉它，乘一个步长。前半步叫期望分，公式是 E = 1 / (1 + 10 ^ ((对手分 - 你的分) / 400))。两人同分时 E = 0.5，谁也不占便宜；对手高出 200 分，E 掉到 0.24 附近，长期看你能赢下的局不到四分之一。",
        "后半步才给出你在意的那个数：新分 = 旧分 + K × (实际结果 - E)。赢记 1，输记 0，于是赢一局拿 K × (1 - E)，输一局赔 K × E。期望分越低，赢了赚得越多、输了赔得越少，这就是「赢强手加得多」的全部数学来源，没有别的门槛加成。",
        {
          type: "h2",
          text: "三种对手的得失分对照"
        },
        {
          type: "ul",
          items: [
            "对手高出 200 分：期望分 0.24。赢 +24，输 -8。",
            "对手与你同分：期望分 0.50。赢 +16，输 -16。",
            "对手低 200 分：期望分 0.76。赢 +8，输 -24。",
            "以上按 K = 32 计算，取整到个位。分差每拉开 200 分，期望分就再往两头推一截。",
            "所以连胜之后涨幅会自己缩水：赢过一轮，你的期望分跟着往上走，下一局的账就没那么好算了。"
          ]
        },
        {
          type: "h2",
          text: "为什么新手期爬得快：K 值"
        },
        "K 决定一局能把你的分挪多远。YiBoard 常驻 K = 32，唯一例外是前 10 局，那段时间 K = 64，所有得失翻倍。这不是给新人的奖励礼包。1200 这个起点是猜的，高 K 值让前十局把误差快速烧掉，代价是分数会晃得厉害，换来的是第 11 局开始你匹配到的人接近真实水平。",
        "收敛之后 K 回到 32，分数就稳下来。这时候往上一级要十几局的净胜积累。系统故意让这件事慢：两连胜的运气不该改变你的称号。",
        {
          type: "h2",
          text: "分数怎么换算成段位"
        },
        "分数是连续的数，段位是它上面的刻度。级位每 50 分一级，段位每 100 分一段，两者在 1500 分处接上：",
        {
          type: "ul",
          items: [
            "1050 以下：九级",
            "1150 上下：七级",
            "1200：六级，所有新账号的起点",
            "1300 上下：四级",
            "1400 上下：二级",
            "1450 上下：一级",
            "1500：一段",
            "1500 以上每段再加 100 分，2300 以上为九段"
          ]
        },
        "换算在每局结束后自动更新，所以你看到的称号永远和数字同步。反过来，一个四段和一段之间的差距有时会在两百局里原样待着，那不是卡住了，是战绩只支持到这个距离。",
        {
          type: "h2",
          text: "刷分为什么在这里划不来"
        },
        "所有这一类系统（elo-like system）都有两个洞：账号互相喂分，以及没人看着的对局。YiBoard 先堵第二个：每一步棋都送服务端校验，你没法用脚本自己造出一个结果；重复对手的对局再做加权衰减，同一个对手打五十遍，收益被压到接近零。",
        "还有一层更朴素的防线：分差惩罚本身。要把小号顶上去，需要一个高分靶子，而高分靶子输给低分号，掉的正好是它每一分都舍不得的那些。系统不会替你判断这局是不是认真下的，它只是让成本和收益对不上。",
        {
          type: "h2",
          text: "FAQ"
        },
        {
          type: "faq",
          items: [
            {
              q: "赢一局到底加多少分？",
              a: "看分差。K = 32 时，赢同分对手加 16 分；赢高出 200 分的对手加约 24 分；赢低 200 分的对手只加约 8 分。"
            },
            {
              q: "输棋扣的是不是一样多？",
              a: "不是。赢强手加 24 分，输给同一个强手只扣 8 分。你付的是期望分的账，期望越高，输的代价越大。"
            },
            {
              q: "新手期多久，过了会掉回去吗？",
              a: "前 10 局用 K = 64，目的是让 1200 这个估值尽快靠到你的真实水平，之后回到 K = 32，规则照旧。到期不会有回退，不存在补扣。"
            }
          ]
        },
        "把一个分数读懂，比盯着它涨有用。yiboardgame.com 上的每一局排位都跑这一套算式，浏览器里的[对战页](/play)不用注册也不用排队。想知道现在谁在顶端，去[排行榜](/rankings)；这套称号的来历写在[段位制从哪来](/blog/where-the-ladder-comes-from)，局面里那一半账写在[评估函数](/blog/evaluation-functions-judging-the-position)。",
        {
          type: "cta",
          text: "下一局排位试试",
          href: "/play"
        }
      ],
      en: [
        "Every new YiBoard account opens at 1200, Sixth Grade. Play a handful of games and the number moves in ways that look arbitrary: beat someone rated 200 above you and you pick up twenty-something points, beat someone 200 below and you get change. That is not noise. One rating algorithm runs every ranked game, and all it does is ask what you were supposed to score given the gap between the two of you. Read the formula once and you know where your title came from. The rules sit on the [how-to page](/how-to), and the side-by-side sits in [Grades and Dans vs ELO](/blog/grades-vs-elo-ranking-systems).",
        {
          type: "h2",
          text: "The expected score, in one line"
        },
        "The math has two halves. First it works out what you were likely to get, then it bills you for the difference between that and what you got. The first half is the expected score: E = 1 / (1 + 10 ^ ((opponent - you) / 400)). Equal ratings give E = 0.5, nobody gets an edge. Face someone 200 points higher and E falls to about 0.24, meaning you were expected to win fewer than one game in four.",
        "The second half produces the number you watch: new = old + K * (result - E). A win counts as 1, a loss as 0, so winning pays K * (1 - E) and losing costs K * E. Lower expected score means a bigger reward when you win and a smaller bill when you lose. That is the whole origin of beating stronger players being worth more. No daily bonuses, no multipliers hiding behind it.",
        {
          type: "h2",
          text: "Rating gain and loss against three opponents"
        },
        {
          type: "ul",
          items: [
            "Opponent rated 200 above you: E = 0.24. Win +24, lose -8.",
            "Opponent rated the same as you: E = 0.50. Win +16, lose -16.",
            "Opponent rated 200 below you: E = 0.76. Win +8, lose -24.",
            "All figures assume K = 32, rounded to whole points. Every extra 200-point gap pushes E further toward whichever end it was heading.",
            "The numbers match how it feels. Against someone you cannot beat, losing costs almost nothing. Against someone you should beat, winning pays almost nothing."
          ]
        },
        {
          type: "h2",
          text: "Why new accounts climb faster: the K value"
        },
        "K sets how far a single game can move you. YiBoard holds it at 32. The exception is your first ten games, which run at K = 64, doubling every swing. That is not a welcome gift. Your 1200 start is a guess, and a large K burns the error off quickly, at the cost of a jittery first evening. What you get in return is opponents that fit you from game eleven onward.",
        "Then K drops back to 32 and the numbers settle. Moving up one full dan takes a dozen-odd net wins. Slow on purpose: two lucky wins in a row should not hand you a new title.",
        {
          type: "h2",
          text: "How the score becomes a grade or dan"
        },
        "The score is continuous; the grade is a tick mark on top of it. Grades step every 50 points, dans every 100, and the two bands meet at 1500:",
        {
          type: "ul",
          items: [
            "Below 1050: Ninth Grade",
            "Around 1150: Seventh Grade",
            "1200: Sixth Grade, where every new account begins",
            "Around 1300: Fourth Grade",
            "Around 1400: Second Grade",
            "Around 1450: First Grade",
            "1500: First Dan",
            "Above 1500 each dan costs another 100 points; 2300 and up is Ninth Dan"
          ]
        },
        "The conversion runs after every game, so the title never drifts from the number. The flip side is that a gap between Fourth Dan and First Dan can sit unchanged across two hundred games. Nothing is stuck; that distance is what the results support.",
        {
          type: "h2",
          text: "Why farming the ladder pays nothing here"
        },
        "Elo-like systems share two holes: accounts feeding each other, and matches nobody refereed. YiBoard closes the second one by validating every move server-side, so you cannot script yourself a result. Repeat games between the same two accounts then get decayed, which flattens the return on playing one opponent fifty times.",
        "The plainest defense is the gap penalty itself. Pushing a smurf upward needs a high-rated target, and when that target loses to a low-rated account it drops exactly the points it hurts most to lose. Nothing here decides whether you played seriously. It just stops the cost and the payoff from lining up.",
        {
          type: "h2",
          text: "FAQ"
        },
        {
          type: "faq",
          items: [
            {
              q: "How many points does a win actually add?",
              a: "It depends on the gap. At K = 32, beating someone rated the same as you adds 16. Beating someone 200 points higher adds about 24. Beating someone 200 points lower adds about 8."
            },
            {
              q: "Do losses cost the same?",
              a: "No. Winning against a stronger player pays 24 and losing to that same player costs 8. You pay against your expected score, so the more you were supposed to win, the more a loss costs."
            },
            {
              q: "How long does the provisional period last, and do I drop back after?",
              a: "Ten games at K = 64, there to pull that 1200 estimate toward your real level fast. Then it returns to K = 32 and the same rules apply. Nothing rolls back when it ends, and nothing is clawed back later."
            }
          ]
        },
        "Reading your rating is more useful than watching it. Every ranked game on yiboardgame.com runs this same code, and the [play page](/play) opens one in your browser with no sign-up and no queue. The [leaderboard](/rankings) shows who currently sits on top. Two earlier posts fill in the rest: [Where the Ladder Comes From](/blog/where-the-ladder-comes-from) covers the names, and [Evaluation Functions](/blog/evaluation-functions-judging-the-position) covers what happens inside a position.",
        {
          type: "cta",
          text: "Play a ranked gomoku game",
          href: "/play"
        }
      ]
    }
  },
  {
    slug: "is-gomoku-solved",
    date: "2026-10-07",
    tags: ["gomoku", "strategy", "theory"],
    title: {
      zh: "五子棋必胜策略存在吗",
      en: "Does Gomoku Have a Solved Strategy"
    },
    description: {
      zh: "无禁手五子棋在 1993 年就被证明先手必胜，\u201c五子棋有没有必胜策略\u201d其实有确定答案。这篇讲那个证明覆盖了什么、为什么它没法给你一条必赢的线路，以及真正决定胜负的还是什么。",
      en: "Free-style gomoku was proved a first-player win in 1993, so the question of whether gomoku is solved has a real answer. Here is what the proof covers, why it does not hand you an unbeatable line, and what still decides your games."
    },
    keywords: ["is gomoku solved", "gomoku solved game", "unbeatable gomoku", "gomoku perfect play", "gomoku first player advantage"],
    content: {
      zh: [
        "五子棋有没有必胜策略？有。无禁手的自由五子棋（15 路棋盘）在 1993 年由 Victor Allis 证明先手必胜：黑棋可以在白棋任何防守下连成五子。很多人原以为这项棋介于井字棋和国际象棋之间，其实它站在「已被解出」的那一边。而被解出这件事，和你实际怎么下棋之间，隔着真正有意思的部分。",
        { type: "h2", text: "「解出」到底是什么意思" },
        "一个棋种被解出，指的是从开局起、双方都走最优时结果已知，通常还附带你走到那个结果的方法。强解是每一个合法局面的胜负值都算了出来；弱解只知道开局的结果，并知道该往那个结果怎么走。Allis 的结果属于后者：他证明黑必胜，用的是威胁空间搜索，而不是把整棵博弈树跑一遍。",
        { type: "h2", text: "1993 年那个证明，说人话" },
        "Allis 用的是威胁空间搜索。他的程序不去遍历所有走法，只跟踪强制性的线路：必须应的活三、必须挡的冲四，以及最后那种根本挡不住的双威胁。五子棋特别适合这套办法，因为威胁会叠加。一颗子落在自己两颗子之间，常常同时造出两个麻烦，而防守方每回合只有一手。先手必胜就是从这种堆积里长出来的，不是统计意义上的优势。",
        { type: "h2", text: "完美下法存在，不等于你能背下来" },
        "知道「五子棋存在完美下法」和真的把它下出来，是两件事。Allis 证明了必胜存在，但那条线路要走几十手，分支取决于白棋怎么应，压力全程在黑棋这边。没人会给你一份十五手的脚本，让你边吃早饭边背。实力很强的棋手也常常在第三、四手就把线丢掉，这也是为什么那个证明改变的是规则的写法，而不是棋手们的开局习惯。",
        { type: "h2", text: "连珠为什么加了禁手" },
        {
          type: "ul",
          items: [
            "无禁手时黑必胜，于是正式比赛开始限制黑棋：双三、双四判负，长连不算赢",
            "开局规则走得更远。连珠里黑棋前三手有固定流程，白棋可以选择交换，把优势重新推回平衡点",
            "去掉这些开局规则的「类连珠」棋种，János Wagner 与 István Virág 在 2001 年宣称也已解出，同样是先手必胜",
            "所以「五子棋被解出了吗」的诚实答案取决于你下的是哪套规则：自由规则下是，带完整开局规则的连珠则不能这么说"
          ]
        },
        { type: "h2", text: "这对你的下法意味着什么" },
        {
          type: "ul",
          items: [
            "认真对待开局。自由规则下既然先手有必赢，多数业余对局其实在前六手就定了",
            "先数对手的强制手，再去欣赏自己的棋形。棋盘另一头那个你没看见的活三，比你在修的漂亮形状更值钱",
            "别假设对手会走出完美。完美下法决定的是理论结果，你的对局由谁先找到双威胁决定",
            "想找一条 unbeatable gomoku 的现成线路是找不到的，能迁移过来的是搜索依赖的那几个习惯"
          ]
        },
        { type: "h2", text: "YiBoard 怎么处理先手问题" },
        "YiBoard 下的是无禁手五子棋，裁判在服务器端，引擎每步固定 500 毫秒预算。这个预算是故意定的：对手强到能惩罚漏挡，又弱到一次像样的进攻仍能打成。理论上双方都走完美的话，棋在第一手就结束了，那样没人会来下第二盘。[开局第一手](/blog/gomoku-opening-first-move)讲了第一颗子该往哪放，[双三与双四](/blog/gomoku-double-three-fours)讲了证明里反复出现的那些叉子，[防守优先](/blog/gomoku-defense-first)讲了另一半。",
        { type: "h2", text: "FAQ" },
        {
          type: "faq",
          items: [
            {
              q: "所有棋盘尺寸都被解出了吗？",
              a: "1993 年的结果针对标准 15 路棋盘的自由规则。棋盘更大只会让先手更容易赢，因为造威胁的空间更多，但这不等于每一种尺寸、每一种自创规则组合都有现成的证明。"
            },
            {
              q: "那网上对局黑棋是不是必胜？",
              a: "不是。证明假设双方从第一手起都走最优。人做不到，有时间预算的引擎也做不到，而且只有握着优势并一直握住的那一方才有必胜。"
            },
            {
              q: "我能把必胜的走法查出来直接用吗？",
              a: "实际上不行。它不是一段能背下来的短序列。真正能迁移过来的是搜索依赖的那几个习惯：造双威胁、先应强制手、落子前先看棋盘另一头。"
            },
            {
              q: "五子棋和连珠在这里的区别是什么？",
              a: "连珠禁止黑棋下出双三、双四，长连不算赢，并且加了带交换选择的开局流程。这些规则之所以存在，就是因为无禁手的自由棋是先手必胜。"
            }
          ]
        },
        "yiboardgame.com 上的每一局都跑同一套裁判，[对战页](/play) 在浏览器里直接开一局，不用注册。排位对局会进入 [段位分怎么算](/blog/how-ratings-work-starting-1200) 里那套评分，[评估函数](/blog/evaluation-functions-judging-the-position) 讲引擎在搜不到终局时算的是什么。",
        {
          type: "cta",
          text: "在 yiboardgame.com 免费下一局五子棋",
          href: "/play"
        }
      ],
      en: [
        "Is gomoku solved? Yes, with one word doing most of the work. Free-style gomoku on a 15x15 board, no forbidden moves and no opening restrictions, was proved a first-player win by Victor Allis in 1993: black can force five in a row against any defence. Most people assume the game sits somewhere between tic-tac-toe and chess. It does not. It sits on the solved side of the line, and the distance between that fact and how you actually play is where the interesting part lives.",
        { type: "h2", text: "What solved means for a gomoku solved game" },
        "A solved game has a known outcome when both sides play perfectly from the start, usually with a method for reaching it. Strongly solved means every legal position has a computed win, draw or loss. Weakly solved means you know the result from the opening position and can play toward it, without a table for every branch. Allis produced the second kind: he proved black wins, using threat-space search rather than brute force over the whole tree.",
        { type: "h2", text: "The 1993 proof, in plain terms" },
        "Threat-space search does not walk every move. Allis tracked forcing lines instead: a live three that must be answered, an open four that must be blocked, and eventually a double threat with no answer at all. Gomoku suits this approach because threats accumulate. A stone dropped between two of your own often creates two problems at once, and the defender gets one move per turn. The first-player win grows out of that pile-up. It is not a statistical edge observed over many games.",
        { type: "h2", text: "Perfect play exists, and you cannot memorise it" },
        "Knowing gomoku perfect play exists and producing it are different things. Allis proved the win is there; the line itself runs through dozens of moves, branches on how white answers, and keeps the burden on black the whole way. Nobody hands you a fifteen-move script to recite over breakfast. Strong human players lose the thread three or four moves in, which is why the proof changed how the rules get written rather than how club players open their games.",
        { type: "h2", text: "Why renju added forbidden moves" },
        {
          type: "ul",
          items: [
            "Black wins under free rules, so competitive play restricted black: double threes and double fours lose, and overlines do not count",
            "Opening rules went further. In renju, black's first three moves follow a protocol that lets white swap sides, which pushes the advantage back toward even",
            "A renju-like game without those opening rules was claimed solved by Janos Wagner and Istvan Virag in 2001, also as a first-player win",
            "So the honest answer to whether gomoku is solved depends on your rule set. Free-style: yes. Renju with the full opening protocol: not settled the same way"
          ]
        },
        { type: "h2", text: "What this changes about how you play" },
        {
          type: "ul",
          items: [
            "Take the opening seriously. If black has a forced win in the free game, most club games are decided inside the first six moves",
            "Count your opponent's forcing moves before admiring your own shape. A live three on the far side of the board is worth more than the pattern you were building",
            "Do not assume the opponent plays perfectly. Perfect play settles the theoretical result; your games are settled by whoever finds the double threat first",
            "People hunt for an unbeatable gomoku line the way they hunt for a perfect chess opening. What transfers instead are the habits the search relies on"
          ]
        },
        { type: "h2", text: "How YiBoard handles the first-move problem" },
        "YiBoard plays free-style gomoku with a server-side referee, and the engine gets a fixed 500ms budget per move. That budget is deliberate: the opponent is strong enough to punish a missed block and weak enough that a well-built attack still lands. If both sides played perfectly the game would be over on move one, and nobody would come back for a second round. [The first move](/blog/gomoku-opening-first-move) covers where to put the first stone, [double threes and double fours](/blog/gomoku-double-three-fours) covers the forks the proof leans on, and [defence first](/blog/gomoku-defense-first) covers the other half.",
        { type: "h2", text: "FAQ" },
        {
          type: "faq",
          items: [
            {
              q: "Is gomoku solved on every board size?",
              a: "The 1993 result covers free-style rules on the standard 15x15 board. Bigger boards make the first-player win easier rather than harder, since there is more room to build threats, but that is not the same as a published proof for every size and every rule combination you might invent."
            },
            {
              q: "Does that mean black always wins online?",
              a: "No. The proof assumes both sides play perfectly from move one. People do not, engines under a time budget do not, and the win is only forced for whoever holds the advantage and keeps holding it."
            },
            {
              q: "Can I look up the winning line and use it?",
              a: "Not in any practical way. It is not a short sequence you can memorise. What carries over are the habits the search depends on: build double threats, answer forcing moves, and check the far side of the board before you commit."
            },
            {
              q: "What is the difference between gomoku and renju here?",
              a: "Renju bans double threes, double fours and overlines for black, and adds an opening protocol with a swap option. Those rules exist because the free game is a first-player win."
            }
          ]
        },
        "Every game on yiboardgame.com runs the same referee, and the [play page](/play) opens one in your browser with no sign-up. Ranked games feed the rating described in [How Ratings Work: Starting at 1200](/blog/how-ratings-work-starting-1200), and [Evaluation Functions](/blog/evaluation-functions-judging-the-position) explains what the engine counts when it cannot search to the end.",
        {
          type: "cta",
          text: "Play gomoku free on yiboardgame.com",
          href: "/play"
        }
      ]
    }
  },
  {
    "slug": "gomoku-midgame-switching-to-attack",
    "date": "2026-10-08",
    "tags": [
      "gomoku",
      "strategy",
      "tactics"
    ],
    "title": {
      "zh": "中盘战术：从守转攻",
      "en": "Midgame Tactics: Switching to Attack"
    },
    "description": {
      "zh": "五子棋中盘最难的不是发现威胁，而是判断哪一手能结束被动防守。本文用强制手、双用途落子和两步验证法，讲清楚从守转攻的时机。",
      "en": "Gomoku midgame play turns on one decision: when can you stop answering and make the opponent answer you? Use forcing moves, dual-purpose stones, and a two-move test to choose the moment."
    },
    "keywords": [
      "gomoku midgame",
      "gomoku middle game strategy",
      "turn defense to offense",
      "gomoku tactics",
      "gomoku counterattack"
    ],
    "content": {
      "zh": [
        "五子棋中盘（gomoku midgame）常常从一段很憋屈的防守开始：对手造活二，你堵；对手把另一条线拉长，你又堵。真正的转折不在于突然看见一条五连，而在于找到一颗既能拆掉当前威胁、又能让对手下一手必须回应的棋子。那颗子会把回合的主动权交回来。下面这套判断法不靠背定式，任何残局前的拥挤局面都能用。",
        {
          "type": "h2",
          "text": "先数强制手，再谈 gomoku middle game strategy"
        },
        "每次轮到你，先把盘面按紧急程度过一遍。对手已有冲四，只有封点，没有战略选择。对手有活三，通常也要立刻处理，因为他下一手能做成两端都挡不住的四。等这些一手就会输的威胁清掉，才轮到比较双方的潜力。很多所谓中盘失误，其实不是判断进攻方向错了，而是漏看了棋盘另一头的一条冲四。",
        "我会把候选点分成两堆：只能防守的点，以及防守后还能接上自己棋形的点。两者都能挡住时，优先后者。比如对方沿横线做出活三，而其中一个封点正好贴着你斜线上的两颗子，落在那里既截断横线，也把自己的斜线变成活三胚子。对方下一手便不能随意换边。",
        {
          "type": "h2",
          "text": "从守转攻：turn defense to offense 的两步测试"
        },
        "别因为自己出现一个活三就宣布反攻。先在脑子里替对手下最强的防守，再看自己还有没有第二个必须应的点。这就是两步测试：第一手攻击被挡后，第二手是否仍然能造冲四、活三或两个同时存在的威胁？答案是有，才算真正拿到先手；答案是没有，那只是把防守推迟了一回合。",
        {
          "type": "ul",
          "items": [
            "第一问：我不挡对方最强威胁，会不会下一手直接输？会，就先挡",
            "第二问：这个封点能否连到自己的两颗或三颗子？能，就把它列为优先候选",
            "第三问：对手挡住我的第一层攻击后，我是否还有强制手？没有，就别把松散棋形当成反攻",
            "最后看空间：后续落点若被边线或旧棋子堵死，纸面上的活三不会长成活四"
          ]
        },
        {
          "type": "h2",
          "text": "Gomoku tactics：让一颗子干两件事"
        },
        "中盘最划算的棋通常有双重用途。它可以一边封住对方的延伸点，一边连接自己的断线；也可以造一个冲四，逼对方落在你预先选好的位置，再借那颗防守子形成新的活三。这里的重点不是多造威胁，而是控制对方的回应。只要每次回应的位置可预测，你就能提前读下一层。",
        "反过来，只为攻击而落在远离战场的位置，往往给对手一手空档。他不必理你那条还差两手的线，会继续原来的攻势。判断很简单：如果这手棋下完，对方可以原计划不变，你还没有从守转攻。",
        {
          "type": "h2",
          "text": "一个常见转折：封点变成反击起点"
        },
        "设想白棋横向已有连续三子，黑棋必须堵一端。左侧封点与黑棋原有的两颗斜子相邻，右侧封点却孤零零。两边都能救命，但左侧那手同时做出斜向活三的骨架。白棋挡斜线后，黑棋再从竖线做冲四；若白棋转去处理竖线，原来的斜线重新打开。转折来自第一颗封子的位置，不是后来某手突然变聪明。",
        "这类题最好在复盘里练。暂停在你连续防守的第一手，遮住后续结果，只问盘上有没有双用途封点。[防守优先](/blog/gomoku-defense-first)解释该先挡什么，[双三与双四](/blog/gomoku-double-three-fours)讲两条威胁怎样同时成立，[评估函数](/blog/evaluation-functions-judging-the-position)则能帮你理解引擎为什么偏爱某个不起眼的交叉点。",
        {
          "type": "h2",
          "text": "20 秒中盘检查表"
        },
        {
          "type": "ul",
          "items": [
            "扫全盘的冲四和活三，不只看上一手附近",
            "圈出所有合法封点，优先连接己方棋子的那个",
            "把对手最强回应放进脑内，再检查自己的下一手",
            "数清后续空间，尤其是边线会不会截断延伸",
            "两步后没有强制手，就继续稳住，不为反攻这个名字硬下"
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "中盘从第几手开始？",
              "a": "没有固定手数。开局定式结束、双方棋形开始互相碰撞时，中盘就开始了。有的对局第八手已进入中盘，有的到十五手仍在铺形。"
            },
            {
              "q": "对手有活三时，我能用冲四反击吗？",
              "a": "可以，但你的冲四必须真能强迫回应，而且回应后还要有后续。若只逼一手就断掉，对手接着补活三，你仍然处在防守方。"
            },
            {
              "q": "怎样练习从防守转进攻？",
              "a": "复盘自己连续防守的棋局，在第一手封堵处停下，找所有能同时连接己方棋子的封点。先练选点，再练向后读两手。"
            }
          ]
        },
        "yiboardgame.com 的[对战页](/play)可以直接开一局，不用注册。下一次被对手追着走时，先找双用途封点，再用两步测试确认反攻是不是成立。",
        {
          "type": "cta",
          "text": "在 yiboardgame.com 练一局中盘转攻",
          "href": "/play"
        }
      ],
      "en": [
        "Gomoku midgame positions often begin with an annoying run of defence. Your opponent makes an open two, you block it; they extend somewhere else, you block again. The turn does not come from spotting a sudden five. It comes from a stone that stops the current threat and gives your opponent something they must answer next. That one move hands the initiative back. The method below works without a memorised opening, even when the board has become crowded.",
        {
          "type": "h2",
          "text": "Count forcing moves before using any gomoku middle game strategy"
        },
        "At the start of each turn, scan by urgency. If the opponent has a four with one winning point, that point is your move. An open three usually needs an immediate answer too, because the next stone can create a four that cannot be covered at both ends. Only after those one-move losses are gone should you compare the promise in each shape. Plenty of midgame mistakes are missed fours on the far side of the board, not bad strategic judgement.",
        "I split candidate moves into two piles: stones that only defend, and stones that defend while touching my own shape. If both stop the loss, I prefer the second pile. Suppose an opponent has an open horizontal three, but one blocking point also meets two of your diagonal stones. Playing there cuts the row and leaves the frame of your own open three. The opponent no longer gets a free choice of direction.",
        {
          "type": "h2",
          "text": "Turn defense to offense with a two-move test"
        },
        "Do not call it a counterattack just because you made one open three. Put the opponent's strongest reply on the board in your head, then ask whether you still have a move they must answer. That is the two-move test. If the first attack is blocked and the next stone can still make a four, an open three, or two threats at once, you have probably taken the initiative. If the line ends after one reply, you only postponed your defensive work.",
        {
          "type": "ul",
          "items": [
            "First ask whether ignoring the opponent's best threat loses on the next move. If it does, block",
            "Check which legal block touches two or more of your stones and keep that point on the shortlist",
            "Imagine the opponent stopping your first attack. If no forcing move remains, the attack is mostly decoration",
            "Count open space beyond the shape. The edge and old stones can turn an apparent open three into a dead end"
          ]
        },
        {
          "type": "h2",
          "text": "Gomoku tactics built around dual-purpose stones"
        },
        "The best-value midgame stone usually has two jobs. It may close the opponent's extension while joining your broken line. It may also make a four that forces a block onto a square you chose, then use that blocking stone as the wall beside a new open three. The point is control, not a large number of threats. When the reply is predictable, you can read the next layer before committing.",
        "A move played far from the fight often fails this test. If your line still needs two quiet moves, the opponent can ignore it and continue the original attack. Ask one plain question after placing the stone in your head: can the opponent keep following the same plan? If yes, you have not switched to attack yet.",
        {
          "type": "h2",
          "text": "A common turn: the blocking point becomes the counterattack"
        },
        "Picture white with three consecutive stones across a row. Black must cover one end. The left blocking point touches two black stones on a diagonal, while the right point touches nothing. Either move survives, but the left one also lays the frame of a diagonal open three. White covers that diagonal; black makes a vertical four. If white turns to the vertical line, the diagonal opens again. The change of initiative began with the choice of blocking point, not with a clever move found later.",
        "Replay is the cleanest place to practise this. Stop at the first move of a long defensive sequence, hide the result, and look for a dual-purpose block. [Defence First](/blog/gomoku-defense-first) covers threat priority. [Double Threes and Double Fours](/blog/gomoku-double-three-fours) shows when two lines become one problem. [Evaluation Functions](/blog/evaluation-functions-judging-the-position) explains why the engine often likes an ordinary-looking intersection.",
        {
          "type": "h2",
          "text": "A 20-second midgame checklist"
        },
        {
          "type": "ul",
          "items": [
            "Scan the whole board for fours and open threes, not only the last move",
            "Mark every legal block and prefer one that connects to your stones",
            "Place the opponent's strongest reply in your head, then inspect your next move",
            "Check the space beyond each line, especially near an edge",
            "If no forcing move remains two plies later, stay solid rather than forcing a counterattack"
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "When does the gomoku midgame begin?",
              "a": "There is no fixed move number. It begins when opening shapes start colliding and each move affects more than one line. Some games reach that point by move eight; others are still spreading out at move fifteen."
            },
            {
              "q": "Can I answer an open three with a four?",
              "a": "Yes, if your four forces a reply and leaves another forcing move afterward. If the sequence stops after one block, the opponent returns to the open three and you are defending again."
            },
            {
              "q": "How should I practise switching from defence to attack?",
              "a": "Replay a game where you defended several turns in a row. Stop at the first block and list every point that also connects to your own stones. Practise choosing the point first, then read two moves ahead."
            }
          ]
        },
        "The [play page](/play) on yiboardgame.com starts a game in your browser without registration. When the next opponent keeps you answering, look for the dual-purpose block and run the two-move test before calling it a counterattack.",
        {
          "type": "cta",
          "text": "Practise a midgame switch on yiboardgame.com",
          "href": "/play"
        }
      ]
    }
  },
  {
    "slug": "gomoku-endgame-final-move",
    "date": "2026-10-09",
    "tags": [
      "gomoku",
      "strategy",
      "endgame"
    ],
    "title": {
      "zh": "残局：最后一手怎么下",
      "en": "Endgame: The Final Move"
    },
    "description": {
      "zh": "五子棋残局不是凭感觉找五连，而是按强制手顺序、空位长度和边线限制读出最后一手。本文给出一套可在 30 秒内执行的收官检查法。",
      "en": "A gomoku endgame is won by reading forcing moves in order, measuring usable space, and checking the whole board before committing to the final move."
    },
    "keywords": [
      "gomoku endgame",
      "closing gomoku game",
      "final winning move",
      "gomoku finish",
      "gomoku endgame strategy"
    ],
    "content": {
      "zh": [
        "五子棋残局（gomoku endgame）到了最后几手，棋盘看起来往往比实际更热闹。你可能只差一颗子连成五，却仍然会输，因为对手在另一条线上有更快的冲四。真正的残局判断不是找最漂亮的五连，而是先确认谁拥有下一手必须回应的威胁，再按顺序读到最后一颗棋。这个习惯能解决大多数 closing gomoku game 时的慌乱。",
        {
          "type": "h2",
          "text": "Closing gomoku game：先扫全盘，再看眼前"
        },
        "残局最常见的错觉是视线被上一手吸住。对手刚在右下角落子，你自然会盯着右下角，但真正决定胜负的点可能在左侧旧棋形里。每次落子前都横、竖、两条斜线扫一遍，先找已经存在的冲四，再找下一手能变成冲四的活三。只要盘上有一手会立刻结束对局，其他计划都要让路。",
        "扫盘时不要只数连续棋子，也要数两端还能不能落子。靠边的三连只有一侧可延伸，被旧棋子夹住的四连也可能没有合法赢点。残局里，空位和棋子同样重要。你看到的是一条线，真正能用的是线上的空格。",
        {
          "type": "h2",
          "text": "Final winning move：按强制顺序读棋"
        },
        "寻找 final winning move 时，把候选手按强制程度排序。冲四通常要求对手立刻封堵；活三要看能否在下一手做成两端同时开放的四；松散的两子连接则通常还不够急。先算最强的手，能让搜索树变窄，也能避免在十几个普通点之间来回猜。",
        {
          "type": "ul",
          "items": [
            "一级：已经形成四子，只剩一个合法赢点，对手必须马上处理",
            "二级：一手同时制造两个赢点，对手只有一手，通常无法全部封住",
            "三级：活三可以长成两端开放的四，但要先确认延伸点没有被占用",
            "四级：只能改善形状、却不强迫回应的棋，留到没有急迫威胁时再考虑"
          ]
        },
        "顺序还会改变同一组落子的结果。先下一个普通连接，再做冲四，对手可能有空档完成自己的攻击；先用冲四逼他落在指定位置，再连接另一条线，防守子反而可能成为你第二条威胁旁边的墙。残局读棋读的不是几颗孤立的子，而是回应被迫发生的次序。",
        {
          "type": "h2",
          "text": "Gomoku finish：边线、交叉点和剩余空间"
        },
        "干净的 gomoku finish 经常藏在交叉点上。一颗子若同时属于横线和斜线，对手封住其中一条，另一条就可能继续。这样的双用途点比单线上的第四颗子更难处理。不过，双线都必须有足够空间。若斜线已经贴边，或者横线另一端被旧棋堵死，看起来像双威胁的落子可能只有一个有效出口。",
        "可以用一个很笨但可靠的方法核对：把候选点落下后，分别沿四个方向向两边数空格。每条线至少要容得下完整五连，才值得继续算。这个动作只花几秒，却能排除很多纸面上很凶、实际上长不出来的棋形。",
        {
          "type": "h2",
          "text": "30 秒五子棋残局检查表"
        },
        {
          "type": "ul",
          "items": [
            "先找双方现成的冲四，确认有没有下一手直接结束对局的点",
            "再找一手双威胁，检查两个赢点是否都合法且真的无法同时封住",
            "沿横、竖和两条斜线数剩余空间，别把贴边死形当成活形",
            "把对手最强回应放进脑中，再看自己的后续是否仍是强制手",
            "如果赢线算不清，就先堵掉对手最急的威胁，不为收官而硬抢一手"
          ]
        },
        "这份清单的目的不是让你把每个残局算到棋盘填满，而是尽快删掉不可能的候选手。最后通常只剩一两个点需要深读。你可以把它和[双三与双四](/blog/gomoku-double-three-fours)的分叉思路一起用，也可以回看[中盘从守转攻](/blog/gomoku-midgame-switching-to-attack)，确认主动权是在哪一手换边的。",
        {
          "type": "h2",
          "text": "没有明确胜线时，先别替结局下结论"
        },
        "有些残局没有立刻获胜的手。双方都堵住主要线路后，最好的选择可能是保留两个延伸方向，而不是把全部棋子挤进一条死线。此时要比较的是谁能先造出必须回应的威胁。找不到强制线并不等于局面已输，只说明还没到最后一手。",
        "在 yiboardgame.com 的[对战页](/play)开一局，遇到残局时停十秒，先扫全盘，再按强制顺序读两手。想复习攻击形状，可以从[玩法说明](/how-to)重新看活三、冲四和五连。",
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "五子棋残局应该先看进攻还是防守？",
              "a": "先看一手就会结束对局的威胁。若对手已有冲四，你必须处理；若没有立即输棋的点，再比较自己的强制进攻。"
            },
            {
              "q": "什么算最后一手？",
              "a": "它不一定是连成五的那颗子。很多时候，最后一手是制造两个无法同时封住的赢点，对手在那一刻已经没有完整防守。"
            },
            {
              "q": "靠边的活三还算活三吗？",
              "a": "通常不算完整活三。活三需要能形成两端开放的四，边线或旧棋子堵住一端时，要按实际可用空间重新判断。"
            }
          ]
        },
        {
          "type": "cta",
          "text": "在 yiboardgame.com 练习五子棋残局",
          "href": "/play"
        }
      ],
      "en": [
        "A gomoku endgame can look busier than it really is. You may be one stone away from five and still lose because the opponent has a faster four on the other side of the board. Endgame play is not a hunt for the prettiest line. It is a check of who owns the next threat that must be answered, followed by a move-by-move reading of the forced replies. That habit removes much of the panic from closing a gomoku game.",
        {
          "type": "h2",
          "text": "Closing a gomoku game starts with a full-board scan"
        },
        "The last move pulls your eyes toward it. That is useful in the opening, but dangerous late in the game. An opponent may play in the lower right while an older shape on the left already contains a four. Before every endgame move, scan rows, columns, and both diagonals. Look for completed fours first, then open threes that can become a four on the next turn. If one move ends the game, every slower plan has to wait.",
        "Do not count stones alone. Count the empty points beyond them. A three pressed against the edge has only one direction to grow. A line boxed in by old stones may look long while having no legal winning point. In the endgame, empty space is part of the shape.",
        {
          "type": "h2",
          "text": "Find the final winning move by reading forcing order"
        },
        "When you search for the final winning move, sort candidates by how strongly they force a reply. A four normally demands an immediate block. An open three matters only if its next move can make a four with two usable ends. A loose connection between two stones is usually slower. Start with the moves that leave the opponent the fewest choices, and the calculation becomes much smaller.",
        {
          "type": "ul",
          "items": [
            "First priority: four stones with one legal winning point, which must be covered now",
            "Second priority: one move that creates two legal winning points when the opponent has only one reply",
            "Third priority: an open three that can become a two-ended four with clear extension points",
            "Last priority: shape-building moves that improve your position but do not force an answer"
          ]
        },
        "Move order changes the result even when the same points are involved. Play a quiet connection first and the opponent may have time to finish an attack. Make a four first and the forced block may land exactly where you wanted it, acting as the wall beside your second threat. Endgame reading is about the order of replies, not a collection of isolated stones.",
        {
          "type": "h2",
          "text": "A clean gomoku finish depends on edges and space"
        },
        "A clean gomoku finish often starts at an intersection. One stone may belong to a horizontal line and a diagonal line at once. If the opponent covers one direction, the other keeps growing. These dual-purpose points are harder to answer than a fourth stone on a single line. Both directions still need room, though. If the diagonal meets the edge or an old stone closes the row, an apparent double threat may have only one working exit.",
        "There is a plain way to verify it. Place the candidate in your head, then count outward in all four directions. Each useful line must have room for a complete five. This takes a few seconds and removes many shapes that look aggressive but cannot finish.",
        {
          "type": "h2",
          "text": "A 30-second gomoku endgame checklist"
        },
        {
          "type": "ul",
          "items": [
            "Find every existing four for both players and mark any point that ends the game next turn",
            "Look for a double threat, then verify that both winning points are legal and cannot be covered together",
            "Count space across rows, columns, and diagonals so an edge does not turn a live shape into a dead one",
            "Put the opponent's strongest reply on the board in your head and check whether your next move still forces them",
            "If the win is unclear, cover the opponent's fastest threat instead of rushing because the board feels nearly finished"
          ]
        },
        "The checklist is not meant to calculate until every square is full. It removes impossible candidates quickly, leaving one or two moves worth deeper reading. Pair it with [Double Threes and Double Fours](/blog/gomoku-double-three-fours) for fork patterns, or revisit [Midgame Tactics](/blog/gomoku-midgame-switching-to-attack) to see where the initiative changed hands.",
        {
          "type": "h2",
          "text": "When there is no winning line yet"
        },
        "Some endgames have no immediate win. Once the main lines are blocked, the best move may keep two extension routes open rather than crowding every stone into one closed row. The question then is who can create the next forcing move first. Failing to find a forced win does not mean the position is lost. It may simply mean the final move has not arrived.",
        "Start a game on the [play page](/play) at yiboardgame.com. When the board reaches an endgame, pause for ten seconds, scan the whole board, and read the forcing order two moves ahead. The [how-to page](/how-to) is there if you want a quick refresher on open threes, fours, and five in a row.",
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Should I attack or defend first in a gomoku endgame?",
              "a": "Check one-move losses first. If the opponent already has a four, cover it. If no immediate loss exists, compare your own forcing attacks."
            },
            {
              "q": "What counts as the final move?",
              "a": "It is not always the stone that makes five. Often it is the move that creates two winning points the opponent cannot cover at once."
            },
            {
              "q": "Is a three beside the edge still an open three?",
              "a": "Usually not a fully open one. An open three must be able to become a four with two usable ends, so the edge and old stones change the count."
            }
          ]
        },
        {
          "type": "cta",
          "text": "Practise a gomoku endgame on yiboardgame.com",
          "href": "/play"
        }
      ]
    }
  },
  {
    "slug": "gomoku-variants-renju-rules",
    "date": "2026-10-11",
    "tags": [
      "gomoku",
      "rules",
      "strategy"
    ],
    "title": {
      "zh": "五子棋变体：连珠的规则",
      "en": "Gomoku Variants: Renju Rules"
    },
    "description": {
      "zh": "同样是连成五子，自由规则、连珠（Renju）、Swap2 的胜负判据并不一样。这篇把各变体的禁手、换边与长连规则讲清楚，并给出开局前该确认的四件事。",
      "en": "Five in a row is the goal in every variant; the arguments start at the edges. This guide covers freestyle gomoku, renju rules, the swap opening protocol and overline handling, plus four things to confirm before the first stone."
    },
    "keywords": [
      "renju gomoku",
      "renju rules explained",
      "gomoku vs renju",
      "freestyle gomoku",
      "gomoku variants",
      "gomoku forbidden moves"
    ],
    "content": {
      "zh": [
        "五子棋（gomoku）各变体的差别不在棋盘上，而在边界：哪些棋形算赢、哪些算禁手、开局能不能换边。自由规则（freestyle gomoku）最宽松，连珠（renju）给黑棋加了禁手，Swap2 这类开局协议再叠一层换边机制。下面按开局前要确认的顺序讲，读完可以在 yiboardgame.com 的[对战页](/play)自己数出当前用的是哪一套。",
        {
          "type": "h2",
          "text": "自由规则 freestyle gomoku：最宽松的一档"
        },
        "自由规则只有三条：黑先白后、轮流落子、横竖斜任意方向连成五子即胜。黑棋可以做双三、做双四，连成六子也算赢。对新手来说这一档最友好，第一局不需要记任何例外。它的缺点就是它的特点：没有禁手时先手方存在必胜路径，高水平对局会退化为开局的记忆力比拼。",
        {
          "type": "h2",
          "text": "Renju rules explained：黑棋的三条禁令"
        },
        "连珠只限制黑棋，白棋保留全部选择。黑棋一步同时形成两个活三（双三）、两个四（双四），或者连成六子及以上（长连），都判负。黑棋仍然可以做单个活三、单个四，也仍然靠恰好五子取胜。判定看的是落子之后盘面上的棋形，不是落子的意图，所以一颗子同时搭出两条活三，就算禁手。",
        {
          "type": "ul",
          "items": [
            "双三：一颗子同时造出两个活三，黑棋禁",
            "双四：一颗子同时造出两个四（活四与冲四的组合也算），黑棋禁",
            "长连：黑棋连成六子及以上不算赢，判禁手；白棋长连算赢",
            "恰好五子：黑棋只有落出正好五连、且未触犯禁手才算胜",
            "白棋没有禁手，双三、双四、长连都可以用来赢"
          ]
        },
        {
          "type": "h2",
          "text": "gomoku vs renju：换规则之后打法怎么变"
        },
        "自由规则里最锋利的一手是一颗子两个意思，典型是双三，防守方只能堵一边。连珠把这类棋形直接判负，黑棋得改成一层一层地往上叠威胁。四三（同一手同时形成活四和活三）因此成为黑棋最干净的赢法：不触犯禁手，而且只留一个防守点。白棋的任务也变了，从拆掉一个双重威胁，变成判断黑棋哪一层威胁先落地。",
        "另一个实际差别是对局长度。自由规则下很多棋十几手就结束；连珠因为禁令，黑棋要花更多手数把威胁叠成合法形状，中盘读棋的比重随之上升。从自由规则转过来的人，第一个要改掉的习惯是看到双三就想落子。",
        {
          "type": "h2",
          "text": "Swap2 与开局协议：把先手优势压回去"
        },
        {
          "type": "ul",
          "items": [
            "Swap（换边）：黑棋下完前三手后白棋可以选择交换黑白，逼黑棋把开局下得尽量平衡",
            "Swap2：在换边之上再加一层选择权，固定套路的价值大幅下降",
            "指定开局：部分比赛要求黑棋第一手落天元、限制第二手范围，用来砍掉已知必胜变化",
            "棋盘规格：十五路是最常见的连珠盘，十九路多见于自由规则，盘越大先手优势越难兑现"
          ]
        },
        {
          "type": "h2",
          "text": "开局前要确认的四件事"
        },
        "各平台的默认规则并不统一，yiboardgame.com 使用的规则写在[五子棋规则页](/gomoku-rules)。花十秒过一遍下面四条，能省掉大部分「这手到底算不算赢」的争论。规则一旦定下来，服务器裁判会在每一步做校验，不靠双方自觉。",
        {
          "type": "ul",
          "items": [
            "黑棋有没有禁手？有，就是连珠系；没有，是自由规则",
            "长连算不算赢？黑棋长连在连珠里判负，白棋长连算胜",
            "开局有没有换边协议？有换边，背下来的先手套路就不值钱了",
            "棋盘是十五路还是十九路？路数决定先手优势兑现的速度"
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "连珠和自由规则最大的区别是什么？",
              "a": "连珠给黑棋加禁手：双三、双四、长连都判负，用来抵消先手优势。自由规则没有禁手，黑棋可以使用任何棋形。"
            },
            {
              "q": "renju gomoku 比自由规则难吗？",
              "a": "规则更难，棋本身不一定更难。你要记住三条例外，并改掉一颗子干两件事的习惯；作为补偿，先手方的必胜套路被削掉了，对局更接近公平。"
            },
            {
              "q": "黑棋连成六子为什么不算赢？",
              "a": "长连通常由双四或双三演变而来，禁掉长连能堵住黑棋靠重叠棋形取胜的路径。白棋不受此限，长连算胜。"
            },
            {
              "q": "Swap2 和连珠是一回事吗？",
              "a": "不是。连珠是禁手规则，Swap2 是开局换边协议。正式连珠比赛通常两者都用：先按协议换边，再按禁手下棋。"
            }
          ]
        },
        {
          "type": "cta",
          "text": "在 YiBoard 免费下一局五子棋",
          "href": "/play"
        }
      ],
      "en": [
        "Gomoku variants differ at the edges, not on the board: which shapes count as a win, which are forbidden, and whether sides can be swapped after the opening. Freestyle gomoku is the loosest set, renju adds forbidden moves for black, and protocols such as Swap2 stack a swap on top. This page goes through them in the order you would check before a match, so you can tell which one you are playing on the [play page](/play) at yiboardgame.com.",
        {
          "type": "h2",
          "text": "Freestyle gomoku: the loosest set"
        },
        "Freestyle runs on three rules: black moves first, players alternate, and five in a row in any direction wins. Black may play double threes and double fours, and an overline of six or more still counts. It is the friendliest set for a first game because there is nothing to memorise. The downside is the same fact said another way: with no forbidden moves the first player has a forced win, and strong play turns into a memory contest over openings.",
        {
          "type": "h2",
          "text": "Renju rules explained: three bans on black"
        },
        "Renju restricts black only, and white keeps every option. Black loses on the spot for a double three (two open threes from one stone), a double four (two fours from one stone), or an overline of six or more. Black may still build a single open three, a single four, and win with exactly five. The test reads the shape on the board after the stone lands, not the intent behind it, so one stone that completes two live threes at once is forbidden even if you only meant one of them.",
        {
          "type": "ul",
          "items": [
            "Double three: one stone makes two open threes at once. Forbidden for black",
            "Double four: one stone makes two fours, including a mix of open four and straight four. Forbidden for black",
            "Overline: six or more in a row does not win for black, it loses. White may win with an overline",
            "Exact five: black wins only by making exactly five without breaking a ban",
            "White has no forbidden moves and may use double threes, double fours and overlines"
          ]
        },
        {
          "type": "h2",
          "text": "Gomoku vs renju: what changes in your play"
        },
        "The sharpest freestyle move is one stone with two meanings, usually a double three where the defender can only cover one side. Renju makes that shape an immediate loss, so black has to stack threats one layer at a time. The four-three, an open four plus an open three from the same stone, becomes the cleanest win available: it breaks no rule and leaves a single defensive point. White's job shifts too, from dismantling one doubled threat to judging which of black's layers lands first.",
        "Games run longer as well. Freestyle matches can end inside fifteen moves. Under renju, black spends more moves assembling a legal stack, so midgame reading carries more of the result. If you are arriving from freestyle, the habit to drop first is reaching for a double three the moment you see one.",
        {
          "type": "h2",
          "text": "Swap2 and the opening protocols that flatten the first move"
        },
        {
          "type": "ul",
          "items": [
            "Swap: after black's first three stones, white may change sides, which pushes black toward a balanced opening",
            "Swap2: a second layer of choice on top of swap, so fixed opening traps lose most of their value",
            "Fixed opening placement: some rules put black's first stone on the centre point and restrict the second, cutting known winning lines",
            "Board size: 15x15 is the usual renju board, 19x19 shows up more in freestyle, and a larger board makes the first-move edge harder to cash in"
          ]
        },
        {
          "type": "h2",
          "text": "Four things to confirm before the first stone"
        },
        "Default rules vary between platforms, and the set used on yiboardgame.com is listed on the [gomoku rules page](/gomoku-rules). Ten seconds on these four questions removes most arguments about whether a move actually won. Once the ruleset is fixed, the server referee checks every move, so nothing rests on goodwill.",
        {
          "type": "ul",
          "items": [
            "Does black have forbidden moves? If yes, you are on a renju set; if no, freestyle",
            "Does an overline count? For black it loses under renju, for white it wins",
            "Is there a swap protocol? With a swap in place, memorised first-player traps lose much of their edge",
            "Is the board 15x15 or 19x19? The size changes how quickly the first-move advantage converts"
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "What is the biggest difference between gomoku and renju?",
              "a": "Renju adds forbidden moves for black: double three, double four and overline all lose immediately, which offsets the first-move advantage. Freestyle has none of those and lets black use any shape."
            },
            {
              "q": "Is renju gomoku harder than freestyle?",
              "a": "The rules are harder, the game is not necessarily. You memorise three exceptions and drop the habit of one stone doing two jobs. In exchange the first player loses the forced win and the match sits closer to fair."
            },
            {
              "q": "Why does an overline of six not count as a win for black?",
              "a": "Overlines usually grow out of a double four or a double three. Banning them closes the path where black wins by stacking overlapping shapes. White is not restricted and can win with six or more."
            },
            {
              "q": "Are Swap2 and renju the same thing?",
              "a": "No. Renju is a set of forbidden moves, Swap2 is an opening protocol for choosing sides. Formal renju events often use both: swap first, then play under the bans."
            }
          ]
        },
        {
          "type": "cta",
          "text": "Practise gomoku variants on yiboardgame.com",
          "href": "/play"
        }
      ]
    }
  },
  {
    "slug": "winning-with-psychology",
    "date": "2026-10-12",
    "tags": [
      "gomoku",
      "strategy",
      "psychology"
    ],
    "title": {
      "zh": "用心理学赢棋：棋盘上的节奏与压力",
      "en": "Winning With Psychology: Tempo and Pressure at the Board"
    },
    "description": {
      "zh": "同一个棋形，两个人会走出不同的下一手。差距常常不在计算深度，而在节奏、耐性和习惯。这篇拆解五子棋里能练的心理层面：零成本施压、可读的对手习惯、以及该停止观察对手的时刻。",
      "en": "Two players read the same stones and choose different moves. The gap is usually tempo, nerve and habit rather than calculation. This guide covers the mental side you can practise in gomoku: pressure that costs nothing, opponent habits worth reading, and the moment to stop watching them."
    },
    "keywords": [
      "board game psychology strategy",
      "psychological tactics chess",
      "mind games board",
      "pressure opponent gomoku",
      "gomoku mental game"
    ],
    "content": {
      "zh": [
        "棋盘心理策略是五子棋规则里从来不写的那一部分。两个人盯着同一张十五路棋盘、同样几颗黑白子，却走出不同的下一手，差距往往不在算得深不深，而在节奏、耐性和习惯。这篇讲的是能练的那些部分：不花代价地施加压力、看出对手重复的棋形，以及什么时候该停止观察对手、回头数自己的威胁。这些想法都可以在 yiboardgame.com 的[五子棋对战页](/play)马上试一局，不用下载，也不用注册。",
        {
          "type": "h2",
          "text": "棋盘心理策略在这里指什么"
        },
        "它不是盯着对手看，也不是故意下得快显得有把握。它指的是选择那些能让对手在下一步之前要多做几道题的走法。活三比慢慢铺棋更有效，因为活三必须被回应。想先把这些棋形的机械部分弄清楚，可以读[五子棋防守：先堵还是先攻](/blog/gomoku-defense-first)；这篇默认你已经知道活三和冲四长什么样。",
        {
          "type": "h2",
          "text": "国际象棋的心理战术，哪些能搬到五子棋"
        },
        "国际象棋圈把这件事讲得更坦白，词汇也更好用。能原样搬过来的有三条：每一步都给对手出一个问题、让自己的棋形保持简单而让对面变乱、把局面带进他没练过的棋形。但心理战术只有在它同时也是一步好棋的时候才成立。为了显得有攻击性而落一步弱子，输的是棋局，连虚张声势也一起输了。",
        {
          "type": "ul",
          "items": [
            "每一步都逼出应答：冲四或活三会压缩他能想的范围",
            "自己的棋形保持干净：一个没解决干净的威胁，不如三个半成品棋形",
            "拆掉他最熟的套路：拿走他下得顺手的形状，去掉的是安全感",
            "改变落子间隔：间隔一模一样的时候，即使棋子没问题，节奏也先被读出来了"
          ]
        },
        {
          "type": "h2",
          "text": "别再玩的那些棋盘心理游戏"
        },
        "常见的错误是在一个没有任何隐藏信息的游戏里搞虚张声势。五子棋的每一颗子都摆在明面上，没有可以藏着的东西，也就没有什么可以唬人。看起来像唬人的那一步，多半只是一个对手没数清楚的威胁。当你发现自己落子纯粹是为了影响对面那个人，先检查这一步在棋盘上是不是同样成立。不成立的话，下那步简单的棋，等他自己走崩。",
        {
          "type": "h2",
          "text": "施加压力，同时不弄坏自己的棋形"
        },
        "对对手施压最有效的形式是不花钱的那种：既逼迫应手、又顺手给自己搭结构的走法，成本是零；看起来华丽、却留下三颗孤子的走法，成本是一整盘。决定强攻之前，把自己的威胁清点数一遍（用手指帮忙也没关系）。如果你的攻势在四颗子之后就没地方继续了，那不叫压力，那叫送子。[段位分怎么算：初始 1200](/blog/how-ratings-work-starting-1200) 那篇解释了为什么这类对局的分数波动比多数人预想的大。",
        {
          "type": "ul",
          "items": [
            "先问一句：这一步能逼出应答吗？不能的话，它还称不上压力",
            "算成本：对手应完之后，你手上还剩一个活三，还是棋子已经没有伸展空间了？",
            "落子前先想他的应手：多数施压失败，是因为对手有一招比你预想的好答案",
            "留一颗防守的子备用：没有把全部筹码压上去，由攻转守会容易得多"
          ]
        },
        {
          "type": "h2",
          "text": "读习惯：四个值得看的痕迹"
        },
        "看棋盘，别看脸。所有习惯都会先在棋子上露出来，这也用不着摄像头。",
        {
          "type": "ul",
          "items": [
            "他每次都回应同一侧：应手集中在一边，就把第二个威胁安排到另一边",
            "他堵得很晚：先顾自己的棋、才来应你的活三，说明他没在数你的冲四",
            "他在模仿你：喜欢对着走的对手是在等你自乱，那就放慢节奏，把多出来的那一手先拿了",
            "丢子之后反而下得更快：失误之后的快棋通常是慌了，不是想好了"
          ]
        },
        {
          "type": "h2",
          "text": "心理层面的练习方法"
        },
        "每局只加一条规则的十盘棋，比五十盘随便下的收获大。",
        {
          "type": "ul",
          "items": [
            "第 1-2 盘：每一手要么堵住什么，要么造出一个威胁，不许下闲子",
            "第 3-4 盘：下那步你自己最不想面对的棋，不管你认不认为它最好",
            "第 5-6 盘：动手之前，把双方所有活三都数一遍",
            "第 7-8 盘：选一个慢速开局然后守住它，对面做什么都不改",
            "第 9-10 盘：每输一局，写一句话说明是哪颗子输的，再开下一局"
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "对着电脑下棋，心理策略还有用吗？",
              "a": "不完全是同一回事。yiboardgame.com 的 AI 不会累、不会上头、不会被催，所以建立在节奏上的施压没有落点。但这些逼迫应手的走法照样值得对着它练，然后把读棋和控节奏的习惯带回人类对局。"
            },
            {
              "q": "新手最该先学哪一条心理战术？",
              "a": "让他每一步都得回答问题。一直在应付的人永远不会有机会执行自己的计划，而多数计划都需要连续两手安静的时间。"
            },
            {
              "q": "输了一盘狠的之后，怎么压住情绪？",
              "a": "先停十分钟，把输棋的那一步写下来。多数上头都来自不知道自己为什么输。原因一旦落到纸上，下一盘通常会好很多。"
            },
            {
              "q": "下得快算不算不礼貌？",
              "a": "棋好就行。只有在不数棋的对手眼里，快才像压力；对手稍强一点，那些白送的子他就直接拿走了。"
            }
          ]
        },
        {
          "type": "cta",
          "text": "到 yiboardgame.com 免费来一局，试试这些想法",
          "href": "/play"
        }
      ],
      "en": [
        "Board game psychology strategy is the part of gomoku that no rulebook writes down. Two players look at the same 15x15 board and the same black and white stones, then choose different moves, and the gap between those choices comes from tempo, nerve and habit more often than from calculation depth. This guide covers the parts you can practise: applying pressure that costs you nothing, spotting the patterns an opponent repeats, and knowing when to stop watching them and count your own threats. Every idea here can be tried the same minute in a free match at the [gomoku play page](/play) on yiboardgame.com, no download and no account.",
        {
          "type": "h2",
          "text": "What board game psychology strategy means here"
        },
        "It is not staring at the other person, and it is not playing fast so you look sure of yourself. It means choosing moves that raise the number of problems they have to solve before their next stone lands. A live three does that better than a slow build, because a live three demands an answer. If you want the mechanical side of those shapes first, read [gomoku defense: block or attack](/blog/gomoku-defense-first). This piece assumes you already know what a live three and an open four look like.",
        {
          "type": "h2",
          "text": "Psychological tactics chess players bring to gomoku"
        },
        "Chess players talk about this more openly than board game players do, so the vocabulary is worth borrowing. Three ideas transfer cleanly: put a question to the opponent on every move, keep your own position tidy while theirs gets messy, and walk the board into shapes they have not practised. The catch is that a psychological tactic only works when it is also a good move. Dropping a weak stone to look aggressive loses both the game and the bluff in one go.",
        {
          "type": "ul",
          "items": [
            "Force a reply every move: an open four or a live three narrows the range of what they can think about",
            "Keep your own shape tidy: one clean unresolved threat beats three half-built ones",
            "Take away their favourite pattern: removing the shape they play well costs them comfort, not stones",
            "Vary your intervals: identical pauses give away your rhythm even when your moves do not"
          ]
        },
        {
          "type": "h2",
          "text": "Mind games board players should stop playing"
        },
        "The usual mistake is running a bluff in a game with nothing hidden. Every stone in gomoku sits in plain view, so there is no concealed information to bluff about. What looks like a bluff is almost always a threat the other side failed to count. When you catch yourself playing a move only for its effect on the person, check whether that move also holds up on the board. When it does not, take the simple move and wait for them to overreach.",
        {
          "type": "h2",
          "text": "How to pressure an opponent without wrecking your shape"
        },
        "Pressure works best when it is free. A forcing move that also builds your own structure costs nothing, while a spectacular stone that leaves three loose ends behind costs the whole game. Before you commit to an attacking line, count your own threats out loud, or on your fingers if that helps. If your attack runs out of space four stones in, that was not pressure, that was a donation. [How ratings work: starting at 1200](/blog/how-ratings-work-starting-1200) explains why games like these swing harder than most players expect.",
        {
          "type": "ul",
          "items": [
            "Ask first: does this move force a reply? If not, it is not pressure yet",
            "Check the cost: after their forced answer, do you still hold a live three, or has the shape run out of room?",
            "Anticipate their answer before you commit: most pressure fails because the reply was better than expected",
            "Hold one defensive stone back: switching from attack to defence is easier when you did not commit everything"
          ]
        },
        {
          "type": "h2",
          "text": "Reading habits: four tells worth watching"
        },
        "Read the board rather than the face. Every habit shows up in the stones first, and none of it needs a camera.",
        {
          "type": "ul",
          "items": [
            "They answer the same flank every time: their replies cluster on one side, so plan the second threat on the other",
            "They block late: answering a live three only after building elsewhere means they are not counting your open fours",
            "They mirror you: a player who mirrors is waiting for you to come apart, so slow the game down and take the extra tempo",
            "They speed up after losing a stone: fast replies following a mistake usually mean panic rather than preparation"
          ]
        },
        {
          "type": "h2",
          "text": "A practice routine for the mental side"
        },
        "Ten games with one rule each will teach you more than fifty games with none.",
        {
          "type": "ul",
          "items": [
            "Games 1-2: every move either blocks something or creates a threat. No quiet stones",
            "Games 3-4: play the move you would least like to face, whether or not you think it is best",
            "Games 5-6: count every live three on both sides before you touch the board",
            "Games 7-8: pick a slow opening and hold it whatever they do",
            "Games 9-10: after each loss, write one sentence naming the stone that lost it, then play again"
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Does board game psychology strategy work against a computer?",
              "a": "Not in the same way. The AI on yiboardgame.com does not get tired, tilted or hurried, so pressure built on tempo has no target. Practise the forcing moves against it anyway, then carry the reading and pacing habits back to human games."
            },
            {
              "q": "What is the most useful psychological tactic for a beginner?",
              "a": "Make them answer something on every move. A player who is permanently reacting never gets to run their own plan, and most plans need two quiet moves in a row."
            },
            {
              "q": "How do I stop tilting after a heavy loss?",
              "a": "Stop for ten minutes and write down the move that lost it. Most tilt comes from not knowing why you lost. Once the reason is on paper, the next game usually goes better."
            },
            {
              "q": "Is playing fast rude?",
              "a": "Not when the moves are good. Speed only reads as pressure to someone who is not counting; a stronger player will simply collect the free stones."
            }
          ]
        },
        {
          "type": "cta",
          "text": "Try these ideas in a free gomoku match on yiboardgame.com",
          "href": "/play"
        }
      ]
    }
  },
  {
    "slug": "from-1200-to-1800-rank-up-roadmap",
    "date": "2026-10-13",
    "tags": [
      "gomoku",
      "rating",
      "improvement"
    ],
    "title": {
      "zh": "从 1200 到 1800：升级路线",
      "en": "From 1200 to 1800: A Rank-Up Roadmap"
    },
    "description": {
      "zh": "想涨分的人先想着多下几盘，下满三百盘分数却没动。真正让分数往上走的是更窄的几件事：落子前先数双方的威胁、输定的棋也下完、把决定胜负的那一手写下来。这是从 1200 到 1800 的四周路线图，每个分段只改一条。",
      "en": "Players who want to improve gomoku rating usually play more games, then find the number unchanged after three hundred of them. What actually moves it is narrower: count threats before your stone lands, finish losing games, and write down the move that decided the result. A four-week roadmap from 1200 to 1800, one fix per band."
    },
    "keywords": [
      "improve gomoku rating",
      "gomoku rank up tips",
      "improve rating board game",
      "climb ladder gomoku",
      "gomoku rating 1800"
    ],
    "content": {
      "zh": [
        "想把五子棋段位分提上去的人，第一反应是多下几盘。下满三百盘再看分数，基本还在原地。真正让分数动起来的是更窄的几件事：落子前先把双方的威胁数一遍、输定的棋也下完、把决定胜负的那一手写下来。这篇路线图从 1200 起步，YiBoard 上每个账号都从这里开始，终点设在 1800 左右，也就是能自己读出四子连攻的水平。蒙着下大约要四百盘，带着复盘大约一百盘。想试哪一条，随时可以在 yiboardgame.com 的[五子棋对战页](/play)免费开一局，不用下载，也不用注册。",
        {
          "type": "h2",
          "text": "1200 和 1800 分别在什么位置"
        },
        "YiBoard 上每个新账号都从 1200 起步，也就是级位里的六级。这套级位与段位的来历写在[段位制从哪来](/blog/where-the-ladder-comes-from)那篇。简短版本是：1200 是整条尺子的中间，不是骂人；1800 大约在初段附近。中间隔着 600 分，而分数越高，每赢一盘给的越少，所以最后 200 分比前 400 分要多花很多盘。连赢十个 1200 的对手，大约能涨 180 分；同样十盘赢 1700 的对手，涨得更少，学到的更多。想看清楚算法，读[段位分怎么算：初始 1200](/blog/how-ratings-work-starting-1200)。",
        {
          "type": "h2",
          "text": "1400 以下真正有用的几条"
        },
        "1400 以下，几乎每盘输棋都是同一个形状：两三手之前，有个活三没人堵。改法不漂亮，但有效。",
        {
          "type": "ul",
          "items": [
            "先堵活三，再想自己的进攻。每一次都这样。",
            "早占中心。角上只有一个方向可以发展，中心有四个。",
            "去掉闲子。如果一手既不堵住什么、也不造出威胁，在这个阶段它就是浪费的一手。",
            "输定的棋也下完。认输告诉评分系统一些东西，却教不会你任何东西。",
            "把 AI 调到你能赢一半的水平。[和 AI 下五子棋](/blog/play-gomoku-against-ai)那篇讲了为什么势均力敌比难度更重要。"
          ]
        },
        {
          "type": "h2",
          "text": "1400 到 1600 那道墙，是数棋问题"
        },
        "到了 1400 上下，只堵不够了，因为对手开始同时造两个威胁，而你只能应一个。破掉这道墙的习惯是数棋：每次落子前，把双方的每一个活三和冲四都数一遍，念出声也没关系。接下来该怎么选，写在[五子棋防守：先堵还是先攻](/blog/gomoku-defense-first)。",
        {
          "type": "ul",
          "items": [
            "先数对手的威胁，再数自己的。这个阶段多数败局，都是应答晚了一手。",
            "每盘刻意做一次双威胁。从 1400 到 1600，这是跨度最大的一步。",
            "找不到威胁时，就把棋盘变小：走那些把对方连线切成两半的子，先换时间。",
            "把最常见的一两个开局练到前十手不用想。[五子棋开局：第一手](/blog/gomoku-opening-first-move)可以从这里开始。"
          ]
        },
        {
          "type": "h2",
          "text": "输棋之后该看什么"
        },
        "复盘是最无聊的部分，也是唯一稳定能把分数推上去的部分。打开下完的那盘，找到胜率开始掉的那一手，写一句话。一句话就够，不用画分析树。二十盘之后这些句子会开始重复，而重复的那句就是你真正的弱点。我的是每次都应答同一侧。",
        {
          "type": "ul",
          "items": [
            "写那一手，不写心情：「第 18 手漏了他们的活三」比「下得烂」有用得多。",
            "每次复盘三盘。再多就会从细看变成扫。",
            "也复盘那些差点输掉才赢下来的棋。漏洞就在那里露出来。",
            "把这张单子放在你会看到的地方。没人看的笔记不会改变任何事。"
          ]
        },
        {
          "type": "h2",
          "text": "四周计划：把分数往上推"
        },
        "大多数日子都下一点，四周就够看到分数动。盘数不如每周给自己定的那条规则重要。",
        {
          "type": "ul",
          "items": [
            "第 1 周，十盘：每一手要么堵住什么，要么造出威胁，不许下闲子。",
            "第 2 周，十盘：每次落子前，先把双方的活三数一遍。",
            "第 3 周，十盘：每盘刻意试一次双威胁，就算因此输掉也照做。",
            "第 4 周，十盘：打你还打得过的最高 AI 等级，每次再加一篇复盘。",
            "四周之后：重读[级位制与 Elo 评分的差别](/blog/grades-vs-elo-ranking-systems)，看看分数波动和你预想的是不是一样。"
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "从 1200 到 1800 要多久？",
              "a": "不复盘地硬下，多数人需要几百盘，而且很多人到不了。每次下完写一篇复盘、对手分数略高于自己，三到六个月是现实的范围。前 300 分通常比后 300 分快，因为分数越高，每赢一盘给的越少。"
            },
            {
              "q": "跟 AI 下能涨分吗？",
              "a": "等级接近你的时候能。连赢弱引擎十盘，多半只是涨了没挣到的信心。把它调到你能赢一半的等级：yiboardgame.com 上的 AI 用 500ms 预算跑 alpha-beta 搜索，你留着不堵的威胁它都会吃，这恰好是你要练的习惯。"
            },
            {
              "q": "为什么输一盘掉的分，比赢一盘涨的分多？",
              "a": "分数按两个分数的差距来动。输给分数比你低的人，比输给分数高的人掉得多；赢了分数远低于你的人，几乎拿不到分。算法写在[级位制与 Elo 评分的差别](/blog/grades-vs-elo-ranking-systems)。"
            },
            {
              "q": "要不要只专练一个开局？",
              "a": "在 1200 到 1800 这一段，要。把一两个开局练到前十手不用想，注意力就能腾给中盘，而中盘才是你大部分分数被决定的地方。"
            }
          ]
        },
        {
          "type": "cta",
          "text": "到 yiboardgame.com 免费开一局，从第 1 周那条规则开始",
          "href": "/play"
        }
      ],
      "en": [
        "Players who want to improve gomoku rating usually start by playing more, then find the number sitting in the same place after three hundred games. What moves it is narrower than that: counting threats before your stone lands, finishing the games you are losing, and naming the one move that decided the result. This roadmap starts at 1200, where every YiBoard account begins, and ends at 1800, roughly the point where a four-stone attack can be read without help. Blind volume needs about four hundred games to get there. Reviewed play needs closer to a hundred. Open a free match at the [gomoku board](/play) on yiboardgame.com whenever you want to test any of it, no download, no account.",
        {
          "type": "h2",
          "text": "What 1200 and 1800 actually mean"
        },
        "YiBoard puts every new account at 1200, which is sixth kyu on the grade and dan scale. [Where the ladder comes from](/blog/where-the-ladder-comes-from) has the history behind it. The short version: 1200 is the middle of the scale rather than an insult, and 1800 sits near first dan. The gap is 600 points, and the system pays out fewer points per win as you climb, so the last 200 cost more games than the first 400. Ten wins in a row against 1200 opponents move you roughly 180 points. The same record against 1700 opponents moves less and teaches more. The arithmetic is in [how ratings work, starting at 1200](/blog/how-ratings-work-starting-1200).",
        {
          "type": "h2",
          "text": "Gomoku rank up tips that hold below 1400"
        },
        "Below 1400 nearly every loss has the same shape: a live three nobody answered, two or three moves earlier. The fix is unglamorous and it works.",
        {
          "type": "ul",
          "items": [
            "Answer the live three first, then look at your own attack. Every single time.",
            "Take the centre early. A corner gives you one direction to build in, the centre gives you four.",
            "Cut out quiet stones. If a move neither blocks nor threatens, at this level it is a wasted tempo.",
            "Play losing games to the end. Resigning tells the rating system something; it teaches you nothing.",
            "Set the AI to a level you beat about half the time. [Playing gomoku against the AI](/blog/play-gomoku-against-ai) explains why even odds matter more than difficulty."
          ]
        },
        {
          "type": "h2",
          "text": "The wall between 1400 and 1600 is a counting problem"
        },
        "Blocking stops being enough somewhere around 1400, because opponents learn to build two threats at once and you can only answer one. The habit that breaks it is counting: before each of your moves, count every live three and open four on both sides, out loud if that keeps you honest. The choice that follows is covered in [gomoku defense: block or attack](/blog/gomoku-defense-first).",
        {
          "type": "ul",
          "items": [
            "Count their threats before yours. Most losses at this level are an answer that arrived one move late.",
            "Build one deliberate double threat per game. It is the largest single jump available between 1400 and 1600.",
            "When you cannot find a threat, shrink the board: stones that cut their lines in half buy you time.",
            "Learn the two openings you meet most until the first ten moves are automatic. [The gomoku opening, first move](/blog/gomoku-opening-first-move) is a place to start."
          ]
        },
        {
          "type": "h2",
          "text": "What to review after a loss"
        },
        "Reviewing is the dull part and the only part that reliably moves the number. Open the finished game, find the move where your chances dropped, and write one sentence about it. One sentence, not an analysis tree. After twenty games the sentences start repeating, and the repeated one is your actual weakness. Mine was answering on the same flank every time.",
        {
          "type": "ul",
          "items": [
            "Name the move, not the mood: \"missed their live three on move 18\" beats \"played badly\".",
            "Three reviews per session. Past that you stop reading carefully and start skimming.",
            "Review the wins you nearly lost too. That is where the leak shows.",
            "Keep the list somewhere you will see it. A note nobody reads changes nothing."
          ]
        },
        {
          "type": "h2",
          "text": "A four-week plan to climb the ladder"
        },
        "Four weeks of play on most days is enough to see the number move. Volume matters less than the rule you attach to each week.",
        {
          "type": "ul",
          "items": [
            "Week 1, ten games: every move blocks something or threatens something. No quiet stones.",
            "Week 2, ten games: count the live threes on both sides before each of your moves.",
            "Week 3, ten games: try for one deliberate double threat in every game, even when it costs you the result.",
            "Week 4, ten games: the strongest AI level you can still beat, plus one written review per session.",
            "After week 4: re-read [how the grade and dan ladder compares to Elo](/blog/grades-vs-elo-ranking-systems) and check your point swings against what you expected."
          ]
        },
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "How long does it take to go from 1200 to 1800?",
              "a": "Playing without review, most people need several hundred games and many never arrive. With one written review per session and opponents rated slightly above you, three to six months of regular play is realistic. Expect the first 300 points to come faster than the last 300, because the payout per win shrinks as your rating rises."
            },
            {
              "q": "Does playing the AI help my rating?",
              "a": "It helps when the level is close to yours. Beating a weak engine ten times mostly builds confidence you have not earned. Set it to a level you beat about half the time: the alpha-beta search on yiboardgame.com runs on a 500ms budget and punishes any threat you leave open, which is the habit worth building."
            },
            {
              "q": "Why does a loss cost more points than a win gains?",
              "a": "Points move with the gap between the two ratings. Losing to a lower-rated opponent costs more than losing to a higher-rated one, and beating a much lower-rated player pays very little. The arithmetic is in [grades vs Elo ranking systems](/blog/grades-vs-elo-ranking-systems)."
            },
            {
              "q": "Should I specialise in one opening?",
              "a": "For the 1200 to 1800 range, yes. Two openings known well enough to reach move ten without thinking frees up attention for the middle game, and the middle game is where most of your rating gets decided."
            }
          ]
        },
        {
          "type": "cta",
          "text": "Start the week 1 rule in a free gomoku match on yiboardgame.com",
          "href": "/play"
        }
      ]
    }
  },
  {
    "slug": "xiangqi-dev-log-cannons-and-the-river",
    "date": "2026-10-14",
    "tags": [
      "xiangqi",
      "chinese chess",
      "development"
    ],
    "title": {
      "zh": "象棋开发日志：炮与河",
      "en": "Xiangqi Dev Log: Cannons and the River"
    },
    "description": {
      "zh": "象棋开发停了两个月之后，被问得最多的是进展和上线时间。这篇开发日志回答这两件事：炮怎么吃子、河界到底改了什么、为什么最简单的兵卡着进度，以及一个不编出来的上线范围。",
      "en": "After two quiet months, the questions about xiangqi development are about progress and release date. This dev log answers both: how the cannon captures, what the river changes, why the soldiers hold up the schedule, and an honest release window rather than an invented date."
    },
    "keywords": [
      "xiangqi development",
      "xiangqi progress",
      "chinese chess dev",
      "xiangqi release date",
      "xiangqi cannon rules"
    ],
    "content": {
      "en": [
        "Xiangqi development at YiBoard went quiet for about two months while ratings, anti-cheat and the mobile board took the front seat, and the same two questions kept arriving: how much xiangqi progress is actually real, and when is the xiangqi release date. Here is the honest log. The cannon is finished and passes its tests. The river took three rewrites and still catches us out. The soldiers, which look like the simplest pieces on the board, are what holds the schedule. None of it runs anywhere special: it is the same browser board you already use for gomoku on yiboardgame.com, so you can open the [play page](/play) in another tab and check the parts that are already live.",
        {
          "type": "h2",
          "text": "What is finished, and what is not"
        },
        "The rules engine is done: every legal move for all seven piece types is generated and validated, including the two that most apps get wrong, the blocked horse leg and the elephant that cannot cross the river. The board renders on a phone without scrolling. The AI plays near the strength of a casual club player and runs the same alpha-beta search as gomoku, described in [How the engine works](/blog/alpha-beta-engine-in-browser). Not finished: English names for the openings, game review, and the rating conversion. We would rather ship a correct board with fewer features than a wide one that misrules a cannon capture.",
        {
          "type": "h2",
          "text": "The cannon: one piece with no Western equivalent"
        },
        "The cannon moves like a rook. It does not capture like one. To take a piece, the cannon has to jump over exactly one other piece, the screen, anywhere along the line. No screen, no capture. Two screens, also no capture. That single rule is why xiangqi stops feeling like chess once the middle game opens, and why a piece that looks useless in the opening becomes the one you watch in the last twenty moves.",
        {
          "type": "ul",
          "items": [
            "Moves: any distance along a rank or file, like a rook, as long as the path is clear.",
            "Captures: only by jumping exactly one piece. The screen can be yours or the opponent.",
            "Zero screens means it takes nothing on that line, even with a target one point away.",
            "Two or more screens blocks the capture too. This is the case most hobby implementations miss.",
            "Value drops in the endgame, when the board empties out and screens get scarce."
          ]
        },
        {
          "type": "h2",
          "text": "The river is a rule, not decoration"
        },
        "The board has 90 intersections and 32 pieces, and a line across the middle called the river. It is not drawn there for looks. Three things change depending on which side of it a piece stands on.",
        {
          "type": "ul",
          "items": [
            "Elephants cannot cross. Their two point diagonal step is also blocked by a piece on the midpoint, so they are defenders on a short leash.",
            "Soldiers move one point forward only. After crossing the river they also move sideways one point at a time, and never backward.",
            "Horses cross freely, but the horse leg block still applies: a piece on the adjacent orthogonal point cancels that step.",
            "The two generals face each other across the river on files 4 and 6, each locked inside a 3 by 3 palace."
          ]
        },
        {
          "type": "h2",
          "text": "What we build next, in order"
        },
        {
          "type": "ul",
          "items": [
            "English opening names, starting with Central Cannon and Screen Horse.",
            "Game review that marks the move where the evaluation turned, reusing the review view from gomoku.",
            "A separate rating scale. Xiangqi will not start at 1200 on the same ladder; the reasons are in [Where the ladder comes from](/blog/where-the-ladder-comes-from).",
            "Undo and takeback in teaching games, which is the first thing schools ask for."
          ]
        },
        {
          "type": "h2",
          "text": "Is there a xiangqi release date yet"
        },
        "Not a day, and we are not going to invent one. The honest range is a playable board with correct rules and a bot before the end of this year, with ratings and review after it. Two things could push that back: the rating conversion has to be calibrated against real games, and the opening library needs English names somebody can check. If you want the shape of the gap we are closing, [The Xiangqi Platform Gap](/blog/xiangqi-platform-gap) lays it out. Until the board ships, the live part of the site is the gomoku ladder on the [rankings page](/rankings).",
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Is there a xiangqi release date for YiBoard?",
              "a": "No fixed day. The next milestone is a playable board with correct rules, and ratings and review come after it. We publish progress here instead of naming a date we would then miss."
            },
            {
              "q": "Will xiangqi use the same rating as gomoku?",
              "a": "No, it gets its own scale. The 1200 starting point is calibrated for gomoku games, and putting both games on one ruler would make both numbers meaningless."
            },
            {
              "q": "What makes the cannon hard to implement?",
              "a": "The screen rule. A cannon captures only when exactly one piece sits between source and target, so the validator has to count pieces on the line instead of checking that the path is empty. Two screens is illegal, and several apps get that wrong."
            },
            {
              "q": "Can I play xiangqi on yiboardgame.com today?",
              "a": "Not yet. Gomoku is live with no sign-up and no install. The xiangqi board runs the same browser engine and will appear on the same play page once it is ready."
            }
          ]
        },
        {
          "type": "cta",
          "text": "Open the free board on yiboardgame.com",
          "href": "/play"
        }
      ],
      "zh": [
        "YiBoard 的象棋开发安静了大约两个月，段位分、反作弊和手机棋盘排在前面。这两个月被问得最多的是两件事：象棋到底进展到哪一步，什么时候能上（xiangqi release date）。这篇开发日志给一个不绕的回答。炮做完了，测试也过了；河界重写了三遍，到现在还会让我们出错；看起来最简单的兵，反倒卡着进度。这些全跑在你已经用来下五子棋的那个浏览器棋盘上，yiboardgame.com 的[对战页](/play)可以另开一个标签，边看边试已经上线的部分。",
        {
          "type": "h2",
          "text": "哪些做完了，哪些还没有"
        },
        "规则引擎做完了：七种棋子的所有合法走法都能生成并校验，包括多数应用会写错的两个——蹩马腿，以及不能过河的象。棋盘在手机上不用滚动就能看全。AI 的强度大致接近一个休闲棋友，用的是和五子棋同一套 alpha-beta 搜索，原理写在[浏览器里的真 AI 引擎](/blog/alpha-beta-engine-in-browser)那篇。没做完的是开局的英文名、复盘，以及评分换算。我们宁愿先上一个规则正确、功能少的棋盘，也不想上一个把炮的吃子判错的大而全版本。",
        {
          "type": "h2",
          "text": "炮：唯一没有西方对应物的棋子"
        },
        "炮走直线，像车。但它吃子完全不像车。吃子时，炮必须隔着、且只隔着一个棋子（炮架）跳过去，炮架在这条线上的任何位置都行。没有炮架，吃不了；隔着两个，也吃不了。就是这一条规则，让象棋在中盘之后不再像国际象棋，也让开局时看着没什么用的炮，变成最后二十手你要盯着的那个子。",
        {
          "type": "ul",
          "items": [
            "走子：沿横线或竖线走任意距离，路径必须为空，和车一样。",
            "吃子：必须只隔一个棋子。炮架可以是自己的，也可以是对方的。",
            "零个炮架时，这条线上什么都吃不到，哪怕目标只隔一个点。",
            "两个及以上炮架同样不能吃。这一条是多数业余实现会漏掉的。",
            "残局价值下降：棋盘变空，能当炮架的子也跟着变少。"
          ]
        },
        {
          "type": "h2",
          "text": "河界是一条规则，不是装饰"
        },
        "棋盘 90 个交叉点、32 枚棋子，中间横着一条叫「河」的线。它不是画着好看的。一个子站在河的哪一边，会改变三件事。",
        {
          "type": "ul",
          "items": [
            "象不能过河。它的「田」字步还会被中间那个点上的子堵住，所以它是拴着短绳的防守子。",
            "兵（卒）只能向前一步。过河之后可以横着走，一次一点，但永远不能后退。",
            "马可以自由过河，但蹩马腿照样生效：相邻的正交点上有子，这一步就没了。",
            "两个将（帅）隔着河在四、六路互相对着，各自锁在 3x3 的九宫里出不来。"
          ]
        },
        {
          "type": "h2",
          "text": "接下来按这个顺序做"
        },
        {
          "type": "ul",
          "items": [
            "开局的英文名，先收「中炮」和「屏风马」两个。",
            "复盘：标出胜率开始掉落的那一手，直接复用五子棋那套复盘视图。",
            "独立的评分体系。象棋不会共用 1200 起步的那把尺子，原因写在[段位制从哪来](/blog/where-the-ladder-comes-from)。",
            "教学对局里的悔棋与收回，学校问得最多的就是这个。"
          ]
        },
        {
          "type": "h2",
          "text": "象棋什么时候上线"
        },
        "没有具体日子，我们也不打算编一个。诚实的范围是：规则正确的可玩棋盘加一个 AI 对手，会在今年内出来，段位分和复盘跟在后面。有两件事可能把它往后推：评分换算必须拿真实对局去校准；开局库需要有人能核对的英文名。想看我们到底在补哪道缺口，[象棋平台现状：为什么缺少好的](/blog/xiangqi-platform-gap)讲得比较全。棋盘上线之前，网站上真正跑着的部分还是[排行榜](/rankings)上那条五子棋天梯。",
        {
          "type": "h2",
          "text": "FAQ"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "YiBoard 的象棋什么时候上线？",
              "a": "没有定死的日期。下一个里程碑是规则正确的可玩棋盘，段位分和复盘在它之后。我们宁可在这里公开进度，也不想先给一个日子再失约。"
            },
            {
              "q": "象棋会和五子棋共用段位分吗？",
              "a": "不会，象棋有自己的尺子。1200 这个起点是按五子棋的对局校准的，两个棋种压在同一把尺子上，两边的数字都会失去意义。"
            },
            {
              "q": "炮为什么难实现？",
              "a": "难在炮架。炮只有在中间恰好隔着一个子时才能吃子，所以校验器要数起点和终点之间有几个子，而不是只看路径是否为空。隔两个不合法，好几个应用就错在这里。"
            },
            {
              "q": "现在能在 yiboardgame.com 下象棋吗？",
              "a": "还不行。五子棋已经可以免注册、免安装直接下。象棋用的是同一套浏览器引擎，做好之后会出现在同一个对战页上。"
            }
          ]
        },
        {
          "type": "cta",
          "text": "在 yiboardgame.com 打开免费棋盘",
          "href": "/play"
        }
      ]
    }
  },
  {
    slug: 'go-roadmap',
    date: '2026-10-15',
    tags: ['weiqi', 'product', 'roadmap'],
    title: {
      zh: '围棋路线图：为什么最后做',
      en: 'Go Roadmap: Why It Comes Last',
    },
    description: {
      zh: '围棋排在我们的开发顺序最后，在五子棋、象棋、黑白棋之后。不是因为它不重要，而是因为它最贵。这篇摊开讲围棋开发计划：难点在哪、先做什么、上线前必须成立的条件是什么，以及为什么我们不给日期。',
      en: 'Go sits last in our build order, behind gomoku, xiangqi and reversi. Not because it matters less, but because it costs the most to do properly. Here is the go development plan: the hard parts, the order we are building in, and what has to be true before it ships.',
    },
    keywords: ['go roadmap', 'when is go coming', 'go development plan', 'weiqi release', 'play go online'],
    content: {
      zh: [
        '问我们围棋路线图的人比问什么都多，通常就是一句话：围棋什么时候来。短答案是，围棋排在我们的开发顺序最后，在五子棋、象棋、黑白棋之后。这不是不重视，是有意排的。这篇把 go development plan 摊开讲清楚：难点在哪、按什么顺序做、weiqi release（围棋上线）之前必须成立的条件有哪些。现在可以先在 yiboardgame.com 的[对战页](/play)下五子棋。',
        { type: 'h2', text: '围棋排在开发顺序的第几位' },
        '四个棋种的顺序是：五子棋（已上线）、象棋（开发中）、黑白棋（规划中）、围棋（最后）。排序依据不是人气，是每份工作量能让我们学到多少东西。五子棋教会我们裁判内核和浏览器里的搜索剪枝；象棋正在教我们棋子的走法、吃子，以及长将判负这类规则分支；黑白棋会教我们翻转结算和终局穷举。围棋排在最后，因为它要的东西，前面三个都教不了我们。',
        { type: 'h2', text: '围棋难在哪' },
        {
          type: 'ul',
          items: [
            '胜负计算：中国数子法和日本比目法算出来的结果可能不一样，而玩家还会在终局时对哪些子是死棋产生分歧',
            '打劫：同一个局面可以重复出现，裁判不能只看当前棋盘，得记住历史局面',
            '死活判断：终局之后还要确认哪些棋块是死的。人可以点一下说这块死了，软件要么猜，要么问',
            'AI：五子棋用 alpha-beta 加一份手写估值函数就能给出像样的对手。围棋的估值函数出了名地难手写，强的开源引擎走的是蒙特卡洛树搜索加神经网络，那是另一类工作',
            '棋盘规模：19 路有 361 个交叉点，渲染、坐标标注、棋谱格式都要重做一遍',
          ],
        },
        { type: 'h2', text: '能从五子棋直接搬过来的部分' },
        {
          type: 'ul',
          items: [
            '裁判内核：落子校验、局面状态、读秒控制',
            '段位与评分系统',
            '对局分享链接和棋谱回放',
            '棋盘渲染层，换成更大的网格，加上星位标记',
          ],
        },
        { type: 'h2', text: '围棋开发计划，按顺序' },
        {
          type: 'ul',
          items: [
            '第一步：9 路棋盘，完整规则，中国数子法。棋盘最小，规则可以先跑通',
            '第二步：13 路、19 路，同一套引擎',
            '第三步：死棋确认流程。终局后双方各自确认，确认完才出最终比分',
            '第四步：让子与贴目',
            '第五步：先做 9 路的 AI，等级随引擎的进展往上加',
          ],
        },
        { type: 'h2', text: '围棋什么时候来' },
        '我们不打算给一个月份。给了做不到，那句话会一直挂在那里，比延迟本身更久。能说的是上线前必须成立的三条：9 路规则通过我们的测试集；死棋确认在两个浏览器之间跑通；9 路的 AI 能下出像样的水平。三条都成立，围棋就上线。在那之前，[围棋规则页](/go)讲清气、提子、打劫这些基础，五子棋现在就能下。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '围棋什么时候上线？', a: '还没有日期。它是四个棋种里最后一个，前面要先做完象棋和黑白棋。上面写了上线前必须成立的三条，达成就会放出来。' },
            { q: '现在 YiBoard 上能下围棋吗？', a: '还不能。可以先看[围棋规则页](/go)了解气、提子、打劫这些规则，五子棋已经可以免注册、免安装直接下。' },
            { q: '会用中国规则还是日本规则？', a: '先从中国数子法开始。9 路棋盘上两种方法差别很小，先把规则跑通，之后再考虑加比目法。' },
            { q: '围棋会有独立的段位吗？', a: '会。围棋和五子棋的评分池分开，两者的水平分布和成长曲线差得远，混在一起两边都不准。' },
          ],
        },
        { type: 'cta', text: '在 yiboardgame.com 免费下一局五子棋', href: '/play' },
      ],
      en: [
        'The question we get most often is about the go roadmap, and it usually arrives in one line: when is go coming. The short answer is that go sits last in our build order, behind gomoku, xiangqi and reversi. That order is deliberate, and it has nothing to do with how much we care about the game. This post lays out the go development plan in full: where the hard parts are, the order we are building in, and what has to hold before a weiqi release makes sense. While you read, gomoku is open on the [play page](/play) at yiboardgame.com.',
        { type: 'h2', text: 'Where go sits in the build order' },
        'Four games, in this order: gomoku, which has shipped; xiangqi, in progress; reversi, planned; go, last. Popularity did not decide that. What decided it is how much each game teaches us per unit of work. Gomoku taught us the referee kernel and how to run search pruning inside a browser tab. Xiangqi is teaching us piece movement, capture rules, and branches like perpetual check. Reversi will teach us flip resolution and exhaustive endgame solving. Go comes last because it needs things none of the other three teach.',
        { type: 'h2', text: 'What makes go the hard one' },
        {
          type: 'ul',
          items: [
            'Scoring: Chinese area counting and Japanese territory counting can disagree, and players can also disagree at the end about which groups are dead',
            'Ko: a position can repeat, so the referee has to track board history instead of only the current grid',
            'Dead stones: the game ends and life and death still has to be settled. A person taps a group and says it is dead. Software has to guess, or ask',
            'AI: alpha-beta with a hand-written evaluation function gives gomoku a decent opponent. Go evaluation functions are notoriously bad when written by hand, and the strong open engines run Monte Carlo tree search over neural networks. That is a different kind of work',
            'Board size: 19x19 means 361 intersections, which changes rendering, coordinate labels and the replay format',
          ],
        },
        { type: 'h2', text: 'What carries over from gomoku' },
        {
          type: 'ul',
          items: [
            'The referee kernel: move validation, game state, time control',
            'The rating and dan-grade system',
            'Game share links and the replay viewer',
            'The board rendering layer, with a larger grid and star points',
          ],
        },
        { type: 'h2', text: 'The go development plan, in order' },
        {
          type: 'ul',
          items: [
            'Step one: a 9x9 board with the full rule set and Chinese area scoring. The smallest board, so the rules get proven first',
            'Step two: 13x13, then 19x19, on the same engine',
            'Step three: dead stone resolution. Both players confirm after the game ends, and only then does the final score appear',
            'Step four: handicap stones and komi',
            'Step five: a 9x9 AI first, with stronger levels added as the engine improves',
          ],
        },
        { type: 'h2', text: 'When is go coming' },
        'We are not putting a month on it. A date we miss stays on the page far longer than the delay itself. What we can say is what has to hold first: the 9x9 rules pass our test suite, the dead stone flow works between two browsers, and the 9x9 AI plays at a level worth losing to. When those three are true, go ships. Until then the [go rules page](/go) covers liberties, capture and ko, and gomoku is ready now.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'When is go coming to YiBoard?', a: 'No date yet. Go is the last of the four games, after xiangqi and reversi. The three conditions that have to hold first are listed above, and it ships once they do.' },
            { q: 'Can I play go on the site right now?', a: 'Not yet. The [go rules page](/go) explains liberties, capture and ko, and gomoku is open now with no signup and nothing to install.' },
            { q: 'Will you use Chinese rules or Japanese rules?', a: 'Chinese area scoring first. On a 9x9 board the two methods rarely disagree, so it makes sense to prove the rules before adding territory scoring.' },
            { q: 'Will go have its own ranking?', a: 'Yes. Go ratings sit in a separate pool from gomoku. The skill distribution and the improvement curve differ enough that one shared number would be wrong for both.' },
          ],
        },
        { type: 'cta', text: 'Play a free game on yiboardgame.com', href: '/play' },
      ],
    }
  },
  {
    slug: 'mobile-first-improvements',
    date: '2026-10-20',
    tags: ['mobile', 'product', 'roadmap'],
    title: {
      zh: '移动端专项优化：为单手而做的棋盘',
      en: 'Mobile Game Optimization: A Board Built for One Hand',
    },
    description: {
      zh: '我们的流量大半来自手机，而棋盘最初是照着鼠标画的。这篇是移动端专项优化清单：触摸热区怎么放大、棋盘在竖屏下怎么缩放、来电话时那一局怎么保住，以及我们决定不做的几件事。',
      en: 'Most of our traffic arrives on a phone and the board was drawn for a mouse. This is the mobile game optimization list: touch targets, board scaling, what happens to a live match when a call comes in, and the things we decided not to build.',
    },
    keywords: ['mobile game optimization', 'touch interface board game', 'mobile chess usability', 'responsive game', 'play gomoku on phone'],
    content: {
      zh: [
        '我们的流量大半来自手机，棋盘最初却是照着鼠标画的。移动端专项优化现在是工程清单上最大的一项：触摸热区（touch interface board game）怎么放大到手指按得准、棋盘在竖屏下怎么缩、来电话时那一局棋怎么保住。这篇把这些改动摊开讲，包括我们决定不做的部分。先在 yiboardgame.com 的[对战页](/play)用手机开一局，再看下去会更具体。',
        { type: 'h2', text: '手机上，棋盘哪里会崩' },
        '十五路棋盘在桌面浏览器上是舒服的 640 像素见方。放到 6.1 英寸的屏幕上，每格只剩约 21 像素，手指压根分不清自己按在哪条线的交点上。双指缩放能救回来一半，代价是看不到全局，而五子棋恰恰是需要看全局的游戏。这是这次移动端专项优化里最难取舍的一处。',
        { type: 'h2', text: '触摸热区（touch interface board game）' },
        '我们要做到的是 44 像素的有效热区，比格子本身还宽。手指落在两个交点之间时，取距离更近的那一个，而不是判这手无效。落子后留一个 300 毫秒的撤销窗口，专门给误触。',
        {
          type: 'ul',
          items: [
            '有效热区 44 像素，比线间距更宽',
            '靠近两条线时取最近交点，手指不会白按',
            '落子后 300 毫秒内可撤销，专治误触',
            '长按预览落子点，手指不再挡住要看的位置',
          ],
        },
        { type: 'h2', text: '响应式布局（responsive game）' },
        '竖屏是棋盘的默认形态：棋盘在上，信息与操作在下。转横屏时棋盘左移，右侧让给计时和提示。刘海和底部手势条用安全区避开，不让系统手势吃掉你的一步棋。',
        { type: 'h2', text: '手机上的象棋与 mobile chess usability' },
        '象棋比五子棋难处理。棋子上带字，缩小之后笔画糊成一团；炮和车的走法要在小屏上画出来，又没有地方写解释。我们的做法是高亮可落子的点，把文字说明收进二级面板。这部分仍在开发中，也是 mobile chess usability 里最花时间的一段。',
        { type: 'h2', text: '我们不做的几件事' },
        {
          type: 'ul',
          items: [
            '不做强制横屏。单手用手机是常态，横屏需要两只手',
            '不做震动反馈之外的动效。棋盘上乱动的东西会干扰你判断棋形',
            '不做手机专属付费项。手机和桌面是同一个免费游戏',
            '不为排行榜在后台轮询。切走即暂停，电量留给玩家',
          ],
        },
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '手机上玩五子棋会小到看不清吗？', a: '不会。竖屏下棋盘占满宽度，双指可以放大看局部，松手回到全局视图。放大状态下落子依然判定到最近的那个交点。' },
            { q: '来电话时那一局棋怎么办？', a: '对局在服务器端保留。只要不在同一账号下开新局，回到页面就能接着下。' },
            { q: '需要下载 App 吗？', a: '不需要。浏览器打开就能玩，不用装任何东西，也不用注册。' },
            { q: '象棋和围棋什么时候能在手机上玩？', a: '五子棋现在就能玩。象棋正在开发，手机上的走法提示是其中一部分；围棋排在开发顺序的最后。' },
          ],
        },
        { type: 'cta', text: '用手机在 yiboardgame.com 开一局', href: '/play' },
      ],
      en: [
        'Most of our traffic arrives on a phone, and the board was drawn for a mouse. Mobile game optimization is now the largest item on our engineering list: how a touch interface board game handles a fingertip wider than a grid cell, how the board scales in portrait, and what happens to a live match when a call comes in. Here is the full list, including the parts we decided not to build. Open the [play page](/play) on your phone first and the rest will read differently.',
        { type: 'h2', text: 'Where the board breaks on a phone' },
        'A fifteen-line board sits at a comfortable 640 pixels square on a desktop browser. On a 6.1 inch screen each cell drops to roughly 21 pixels, and a fingertip cannot tell which intersection it is over. Pinch zoom recovers half of that and costs you the whole-board view, which is what gomoku needs. It is the hardest trade-off in the mobile work.',
        { type: 'h2', text: 'Touch targets on a touch interface board game' },
        'The target we are building to is 44 effective pixels, wider than the grid itself. When a tap lands between two intersections the closer one wins instead of the move being rejected. After a stone is placed there is a 300 millisecond window to undo it, aimed squarely at mis-taps.',
        {
          type: 'ul',
          items: [
            '44 pixel effective targets, wider than the line spacing',
            'Nearest intersection wins, so no tap is wasted',
            '300ms undo window after a stone is placed',
            'Press and hold to preview the point, so your finger stops covering it',
          ],
        },
        { type: 'h2', text: 'Responsive game layout' },
        'Portrait is the default: board on top, information and controls below. Turn the phone sideways and the board shifts left, with the right column taking the clock and the hints. Notches and the bottom gesture bar are handled with safe-area insets, so a system gesture never eats your move.',
        { type: 'h2', text: 'Mobile chess usability, and why xiangqi is harder' },
        'Xiangqi is a harder problem than gomoku. Each piece carries a character that turns to mush at phone scale, and the movement hints for cannons and chariots have to be drawn on a small board with no room for a written explanation. Our approach is to highlight the legal destination points and move the text into a second panel. It is in development, and it is the slowest part of the mobile chess usability work.',
        { type: 'h2', text: 'What we are not doing' },
        {
          type: 'ul',
          items: [
            'No forced landscape. One-handed phone use is the common case, and landscape needs two hands',
            'No animation beyond the haptic toggle. Things moving on the board get in the way of reading the shape',
            'No mobile-only paid tier. It is the same free game on every screen',
            'No background polling for the sake of the leaderboard. Switch away and the match pauses',
          ],
        },
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Is the board too small to read on a phone?', a: 'No. In portrait the board fills the width, and you can pinch into a section and release to return to the full view. While zoomed, placement still resolves to the nearest intersection.' },
            { q: 'What happens to my match if a call comes in?', a: 'The game is held on the server. As long as you do not start another match on the same account, you can pick it up where you left it.' },
            { q: 'Do I need to install an app?', a: 'No. Open the browser and play. There is nothing to install and no signup required.' },
            { q: 'When will xiangqi and go work on mobile?', a: 'Gomoku works now. Xiangqi is in development with the mobile movement hints as part of that work, and go is last in the build order.' },
          ],
        },
        { type: 'cta', text: 'Play a game on your phone at yiboardgame.com', href: '/play' },
      ],
    },
  },
  {
    slug: 'performance-work',
    date: '2026-10-19',
    tags: ['performance', 'engineering', 'roadmap'],
    title: {
      zh: '性能优化：让棋盘更丝滑',
      en: 'Performance Work: A Smoother Board',
    },
    description: {
      zh: '性能是没人会主动要求、但一卡就会被察觉的东西。这篇把 YiBoard 的性能优化摊开讲：中端安卓机上测到的四个数字、棋盘从 225 个 DOM 节点改成单个 canvas 的取舍、500 毫秒引擎预算怎么不再冻住棋盘，以及我们拒绝做的几项优化。',
      en: 'Nobody asks for performance work, and everybody notices when it is missing. This is the YiBoard list: four numbers from a mid-range Android phone, why the board moved from 225 DOM nodes to one canvas, how the 500ms engine budget stopped freezing the board, and the optimizations we turned down.',
    },
    keywords: ['game performance optimization', 'web game performance', 'board rendering optimization', 'lag free game', 'browser game frame rate'],
    content: {
      zh: [
        '性能优化是那种没人会主动提、直到棋盘卡一下才被察觉的工作。在 YiBoard 上它落到几个具体的数字：棋盘画出来要多久、手指按下到棋子出现要多久、引擎搜索的那半秒里画面还顺不顺。下面是我们在一台 2021 年中端安卓机、限速 4G 下测到的数字，由此引出的改动，以及几项我们拒绝做的优化。先去 yiboardgame.com 的[对战页](/play)落几颗子再往下读，这些数字会更有实感。',
        { type: 'h2', text: '我们一开始测到的数字' },
        '测试机是一台 2021 年的中端安卓机，网络限速到 4G，因为这比光纤上的笔记本更接近我们的真实流量。改动之前，棋盘首屏绘制 380 毫秒，一次落子平均在手指按下后 140 毫秒才出现，引擎搜索的那 500 毫秒里帧率掉到 41。没有一个数字能让游戏玩不了，但它们合在一起，让这个游戏显得比它实际的做工便宜。',
        {
          type: 'ul',
          items: [
            '棋盘首屏绘制：限速 4G 下 380 毫秒',
            '手指按下到棋子出现：平均 140 毫秒',
            '引擎搜索期间的帧率：41fps',
            '能落第一颗子之前要下载的产物：gzip 后 214KB',
          ],
        },
        { type: 'h2', text: '棋盘渲染优化：一个 canvas 换掉 225 个 div' },
        '第一版棋盘是 225 个 DOM 节点，每个交点一个，网格用 CSS 边框画。它好改样式，可浏览器一重绘就散架。我们把网格和棋子搬到单个 canvas，DOM 只留棋盘外的界面。重画一颗子现在变成裁剪后重绘一格，不再是整块棋盘走一遍布局。这一项把首屏从 380 毫秒压到 190 毫秒，也是我们不做落子动画的原因之一。',
        { type: 'h2', text: '网页游戏性能，与 500 毫秒的引擎预算' },
        '五子棋引擎在浏览器里跑 alpha-beta，预算 500 毫秒。朴素的写法会把主线程整整吃掉半秒，于是我们把搜索挪进 worker，让棋盘在引擎思考时继续绘制；局面已经定了的时候，改成限制深度而不是限制时间。搜索本身的细节写在[引擎那篇](/blog/alpha-beta-engine-in-browser)。那台安卓机上的结果是：搜索期间帧率从 41 变成 58，棋盘也不再在对手落子之前冻住那一下。',
        { type: 'h2', text: '一个不卡的游戏，还欠网络什么' },
        '每一步都要送到服务器端校验，这正是作弊做不到的原因，也是延迟藏不住的原因。我们把每一手一个请求改成复用同一条连接，并让自己的棋子先在本地出现、服务器确认在后。如果服务器判定这一手不成立，棋子会被收回，并告诉你原因。猜错一次的代价是一段动画；每一步都等一个来回的代价是整局游戏。',
        {
          type: 'ul',
          items: [
            '每局复用一条连接，不再一手一个请求',
            '自己的棋子先本地出现，服务器确认在后',
            '断线重连重放棋谱，而不是重开一局',
            '对局进行中不为排行榜做后台轮询',
          ],
        },
        { type: 'h2', text: '我们拒绝做的优化' },
        {
          type: 'ul',
          items: [
            '不做落子动画。它在截图里好看，却会让一个快节奏的游戏显得慢',
            '不预取对手的可能走法。猜错比多等 40 毫秒更糟糕',
            '不用 WebGL 画棋盘。2D canvas 画 15×15 的网格，跑满 60 帧不需要着色器',
            '不用 service worker 缓存对局状态。棋盘显示错了，比慢一点更难让人接受',
          ],
        },
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'AI 思考的时候，棋盘还会卡吗？', a: '这一轮之前会。搜索现在跑在 worker 里，我们测试用的那台中端机上棋盘可以保持 58 帧。桌面浏览器上前后其实都看不出差别。' },
            { q: 'YiBoard 在移动网络下要用多少流量？', a: '落第一颗子之前约 214KB（gzip 后），之后除了棋步本身不再产生数据。没有广告，没有追踪脚本，也没有分析用的包跟着进来。' },
            { q: '既要跑 worker 又要跑服务器，还能一直免费吗？', a: '能。免费在这里是设计选择，不是试用期。引擎跑在你自己的设备上，这正是服务器成本压得住的原因。' },
            { q: '老一点的手机能享到这些改进吗？', a: '大部分能，只有一处例外：worker 需要大约 2018 年以后的浏览器。更老的设备会退回主线程，棋盘一样能下，只是保留原来那一下卡顿。' },
          ],
        },
        { type: 'cta', text: '在 yiboardgame.com 开一局', href: '/play' },
      ],
      en: [
        'Game performance optimization is the kind of work nobody asks for and everybody notices when it is missing. On YiBoard it comes down to a few concrete numbers: how long the board takes to draw, how long a tap takes to become a stone, and whether the picture stays smooth while the engine is searching. Below are the measurements from a 2021 mid-range Android phone on throttled 4G, the changes that came out of them, and the optimizations we turned down. Place a few stones on the [play page](/play) at yiboardgame.com first and the numbers will read differently.',
        { type: 'h2', text: 'The numbers we started from' },
        'We tested on a 2021 mid-range Android phone over a throttled 4G connection, because that is closer to our actual traffic than a laptop on fibre. Before any changes, the board took 380ms to first paint, an average move appeared 140ms after the tap, and the frame rate dropped to 41fps during the 500ms engine search. None of those numbers make the game unplayable. Together they make it feel cheaper than the work that went into it.',
        {
          type: 'ul',
          items: [
            'First paint of the board: 380ms on throttled 4G',
            'Tap to stone on screen: 140ms average',
            'Frame rate during engine search: 41fps',
            'Payload before the first stone can be placed: 214KB gzipped',
          ],
        },
        { type: 'h2', text: 'Board rendering optimization: one canvas instead of 225 divs' },
        'The first board was 225 DOM nodes, one per intersection, with the grid drawn as CSS borders. It was easy to style and it fell apart the moment the browser had to repaint. We moved the grid and the stones onto a single canvas and kept the DOM for the interface around the board. Redrawing a stone is now a clipped repaint of one cell rather than a layout pass over the whole board. That change took first paint from 380ms to 190ms, and it is one of the reasons we do not animate stone drops.',
        { type: 'h2', text: 'Web game performance and the 500ms engine budget' },
        'The gomoku engine runs alpha-beta in the browser on a 500ms budget. Written the obvious way, it eats the main thread for the whole half second, so we moved the search into a worker and let the board keep drawing while the engine thinks. When the position is already settled we cap the depth instead of the time. The search itself is described in [the engine write-up](/blog/alpha-beta-engine-in-browser). On that Android phone the frame rate during search went from 41 to 58, and the board no longer freezes just before the reply lands.',
        { type: 'h2', text: 'What a lag free game still owes the network' },
        'Every move goes to the server for validation. That is why cheating does not work here, and it is also why latency is impossible to hide. We replaced one request per move with a single reused connection, and we let your own stone appear locally before the server confirms it. If the server rejects the move, the stone is taken back and you are told why. A wrong guess costs one animation, while waiting for a round trip on every move costs the whole match.',
        {
          type: 'ul',
          items: [
            'One reused connection per match, not one request per move',
            'Your stone appears locally first, server confirmation second',
            'Reconnect replays the move log instead of restarting the match',
            'No background polling for the leaderboard while a match is open',
          ],
        },
        { type: 'h2', text: 'Optimizations we turned down' },
        {
          type: 'ul',
          items: [
            'No animated stone drops. They look good in a screenshot and make a fast game feel slow',
            'No prefetching the likely reply. Guessing wrong is worse than waiting another 40ms',
            'No WebGL board. A 2D canvas draws a 15x15 grid at a full 60fps without a shader',
            'No service worker caching of match state. A board showing the wrong position is worse than a slow one',
          ],
        },
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Does the board still stutter while the AI thinks?', a: 'It did before this round of work. The search now runs in a worker, and the board holds 58fps on the mid-range phone we test with. On a desktop browser you would not have noticed either way.' },
            { q: 'How much mobile data does YiBoard use?', a: 'About 214KB gzipped before you can place your first stone, and nothing after that apart from the moves themselves. There are no ads, no tracking scripts and no analytics bundles riding along.' },
            { q: 'With a worker and a server, can it really stay free?', a: 'Yes. Free is a design choice here, not a trial period. The engine runs on your own device, which is why we can keep the server cheap.' },
            { q: 'Do older phones get these improvements?', a: 'Most of them, with one exception: the worker needs a browser from roughly 2018 or later. Anything older falls back to the main thread, plays the same game, and keeps the old stutter.' },
          ],
        },
        { type: 'cta', text: 'Play a game at yiboardgame.com', href: '/play' },
      ],
    },
  },
  {
    slug: 'spectator-and-commentator-plans',
    date: '2026-10-21',
    tags: ['spectator', 'product', 'roadmap'],
    title: {
      zh: '观战与解说功能规划',
      en: 'Spectator and Commentator Plans',
    },
    description: {
      zh: '观战从第一局五子棋上线那天就写在愿望清单上，之后一直被排在后面。这篇是计划的老实版本：观战要做什么、为什么它先是隐私问题、解说席要怎么才不添乱，以及按什么顺序做。',
      en: 'A game spectate feature has sat on our wishlist since the first gomoku match went live. Here is the honest plan: what watching a match has to do, why it is a privacy question first, how a commentator seat stays out of the way, and the order we would build it in.',
    },
    keywords: ['game spectate feature', 'watch games feature', 'board game casting', 'commentate matches', 'gomoku spectator mode'],
    content: {
      zh: [
        '五子棋第一局上线那天，观战就被写进了愿望清单，之后一直被需求更多的人排到后面。这篇是这份计划的老实版本：一个 game spectate feature 在 YiBoard 上要做什么，为什么「看别人下棋」先是一个隐私问题、其次才是一个功能，以及 watch games feature（观战）和 commentate matches（解说）上线之前我们得先建好什么。五子棋现在就能在 yiboardgame.com 的[对战页](/play)开一局。',
        { type: 'h2', text: '观战功能到底要做什么' },
        'YiBoard 上一盘棋，服务器上存的就是一串落子和一个时钟，没有别的。所以观众看到的，理论上可以和两位对局者看到的完全一样，只差一件事：观众拿到的数据要晚。我们打算用按手数计的延迟，而不是按秒计，这样一场正在直播的棋局不可能被人拿来帮正在下棋的人。之前那篇[观战模式](/blog/spectator-mode-watch-and-learn)把它写成一个学棋的工具，它同时也是决定实时观战能不能安全存在的那块地基。',
        { type: 'h2', text: '隐私那部分要排在前面' },
        '半夜打开棋盘下两局的人，没有谁默认同意被围观。所以默认值是关的：一盘棋只对下棋的两个人可见，观战必须由其中一人主动分享出来的链接开启。这条链接带的是这盘棋，不是对局者的名字，也不是他们的段位记录，棋局结束链接就失效。棋谱回放是另一件事，要在棋下完之后，由分享的人再决定一次。',
        {
          type: 'ul',
          items: [
            '观战按每一局单独开启，不存在账号设置里默认开着的情况',
            '分享链接只暴露棋谱，不暴露段位和账号',
            '观众看到的棋盘比实战晚几手',
            '对局双方随时能看到谁在看，也可以随时关掉',
          ],
        },
        { type: 'h2', text: '棋局直播，为什么实时比录播难' },
        '转播一盘棋和转播一款射击游戏不是一回事。屏幕上只有两个人在想，有意思的部分发生在他们脑子里，而观战界面上什么都没有。我们试过几种让空棋盘显得不那么空的办法，在截图里好看的那几个，全都让棋本身变得更难读。',
        {
          type: 'ul',
          items: [
            '落子动画：截图里好看，实际让人觉得棋下得慢，[性能优化那篇](/blog/performance-work)写过这个取舍',
            '候选点高亮：观众以为那是提示，对局者以为那是泄密',
            '胜率曲线：五子棋的估值函数是我们手写的，曲线抖得厉害，看了反而误导',
            '聊天框：没有 moderator 就不开',
          ],
        },
        { type: 'h2', text: '解说一盘棋，怎么不添乱' },
        '解说要有用，前提是下棋的人看不到。所以解说席是单向的：解说员说话，观众读到，棋盘上的人什么都收不到。解说员也拿不到比观众更多的信息，双方的手数延迟对他是同一个值。这几条不是礼貌问题，是这个功能能不能存在的前提。',
        { type: 'h2', text: '我们打算按这个顺序做' },
        {
          type: 'ul',
          items: [
            '第一步：棋谱回放链接。棋下完之后可以发出去的那条，带一个拖动条',
            '第二步：带延迟的实时观战，只走邀请链接',
            '第三步：解说角色。一个人说，观众看，对局者无感',
            '第四步：公开观战房间，只有在第三步没有变成一份 moderation 工作之后才会做',
          ],
        },
        { type: 'h2', text: '什么时候来' },
        '在象棋之后。观战要建在裁判内核之上，而象棋正在把裁判内核改得更复杂，等它稳定下来再往上搭，比现在搭完再改一遍省事。在那之前，[排行榜](/rankings)是唯一能看到别人怎么下棋的地方，而下棋本身在[对战页](/play)一直是开着的。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '观战会暴露我的段位吗？', a: '不会。分享链接只带这盘棋的棋谱，不带账号和段位记录。' },
            { q: '观众看到的棋局延迟多少？', a: '按手数算，几手棋。这样正在直播的棋局没法被用来帮正在下的人。' },
            { q: '解说员能看到我看不到的东西吗？', a: '不能。他和观众用的是同一份延迟数据，只是多了一个说话的位置。' },
            { q: '别人的棋局我能随便看吗？', a: '不能。观战必须由对局者之一分享出链接，公开房间还没有做。' },
          ],
        },
        { type: 'cta', text: '在 yiboardgame.com 免费下一局五子棋', href: '/play' },
      ],
      en: [
        'We put a game spectate feature on the wishlist the week the first gomoku match went live, and work that more people asked for has pushed it back ever since. This is the honest version of that plan: what watching a match has to do on YiBoard, why a watch games feature is a privacy question before it is a feature, and what has to exist before anyone can commentate matches. Gomoku is open right now on the [play page](/play) at yiboardgame.com.',
        { type: 'h2', text: 'What a spectate feature has to do' },
        'A match here is a list of moves and a clock. That is everything the server holds, so a watcher can in principle be shown the same thing the two players see, with one difference: the watcher gets it late. We plan to measure that delay in moves rather than seconds, so a game being cast live can never be used to help someone playing it right now. The [older post on spectator mode](/blog/spectator-mode-watch-and-learn) framed watching as a way to learn. It is also the part that decides whether live watching is safe at all.',
        { type: 'h2', text: 'The privacy part comes first' },
        'Nobody who opens a board at midnight has agreed to be watched. So the default is closed: a match is visible to the two people playing it, and watching needs a link one of them chose to share. That link carries the match, not the players\u2019 names and not their rating history, and it stops working when the game ends. Replays are a separate decision, made after the match, by whoever shared it.',
        {
          type: 'ul',
          items: [
            'Watching is opt-in per match. There is no account setting that leaves it on by default',
            'The share link exposes the move log, not the rating and not the account',
            'Watchers see the board a few moves behind the players',
            'Both players can see who is watching and can end it at any point',
          ],
        },
        { type: 'h2', text: 'Board game casting, and why live is harder' },
        'Casting a board is not like casting a shooter. There are two people thinking and nothing else on screen, and the part worth watching happens where nobody can see it. We tried several ways to make an empty board look busy. The versions that looked good in a screenshot all made the game harder to read.',
        {
          type: 'ul',
          items: [
            'Animated stone drops: good in a still image, and they make a fast game feel slow, which is also why we turned them down in [the performance work](/blog/performance-work)',
            'Highlighting candidate moves: watchers read it as a hint and players read it as a leak',
            'A win probability curve: our gomoku evaluation function is hand-written and the line jumps around, so it misleads more than it informs',
            'Chat: no moderators, no chat',
          ],
        },
        { type: 'h2', text: 'Commentating a match without getting in the way' },
        'Commentary is only useful if the players cannot see it. The commentator seat is one way: the commentator writes, watchers read, and the two people at the board receive nothing. The commentator also gets no more information than the watchers, on the same move delay. These are not rules of etiquette. They are the conditions under which the feature is allowed to exist.',
        { type: 'h2', text: 'What we would build, in order' },
        {
          type: 'ul',
          items: [
            'Step one: replay links. A finished match you can send, with a scrubber over the move log',
            'Step two: live watching with a delay, invite link only',
            'Step three: a commentator role. One person writes, watchers read, players notice nothing',
            'Step four: public spectator rooms, and only if step three has not turned into a moderation job',
          ],
        },
        { type: 'h2', text: 'When this happens' },
        'After xiangqi. Spectating sits on top of the referee kernel, and xiangqi is making that kernel more complicated right now. Building it once after that settles is less work than building it now and rebuilding it. Until then the [leaderboards](/rankings) are the only place to see how other people play, and the [play page](/play) has been open the whole time.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Does watching expose my rating?', a: 'No. The share link carries the move log for that match, and no account or rating data.' },
            { q: 'How far behind are watchers?', a: 'A few moves, measured in moves instead of seconds, so a live game cannot be used to help someone playing it.' },
            { q: 'Does the commentator see more than I do?', a: 'No. Same delayed data as the watchers, plus a place to type.' },
            { q: 'Can I watch any match on the site?', a: 'No. Watching needs a link from one of the players, and public rooms are not built yet.' },
          ],
        },
        { type: 'cta', text: 'Play a free gomoku match on YiBoard', href: '/play' },
      ],
    },
  },
  {
    slug: 'handicap-stones-explained-beginner-guide',
    date: '2026-10-22',
    tags: ['weiqi', 'rules', 'beginners'],
    title: {
      zh: '围棋让子怎么算：给新手的一份说明书',
      en: 'How Go Handicap Stones Work, For Beginners',
    },
    description: {
      zh: '让子不是安慰奖，它是让两个差着好几级的人还能下出一盘有意思的棋的办法。这篇讲清 go handicap stones 怎么算、段位差对应几个子、子摆在哪、贴目怎么处理，以及新手最容易搞错的地方。',
      en: 'A handicap is not a consolation prize. It is what lets two players several ranks apart finish a game worth thinking about. How go handicap stones work, what the ranking difference maps to, where the stones go, and what beginners usually get wrong.',
    },
    keywords: ['go handicap stones', 'how handicap stones work', 'go handicap for beginners', 'handicap ranking difference', 'go ranking system'],
    content: {
      zh: [
        '围棋让子（go handicap stones）存在的理由很实在：它让一个 15 级和一个 3 级能坐下来，下完一盘两个人都还在乎输赢的棋。只下过分先棋的人常把让子看成安慰奖，其实它更像同一套规则下的另一种棋：开局被故意做斜，双方反而都能看见自己够得着的题。这篇讲清 how handicap stones work（让子怎么算）、handicap ranking difference（段位差对应几个子）、子摆在哪、贴目怎么处理，以及 go handicap for beginners 最容易出错的地方。五子棋现在就能在 yiboardgame.com 的[对战页](/play)开一局，围棋在[路线图](/blog/go-roadmap)上。',
        { type: 'h2', text: '让子到底在解决什么问题' },
        '不让子，弱的一方往往在棋还没走到有意思的地方之前就已经输了。强的一方随手应对，局面自己就漂过去了，到第六十手胜负已定，但两个人什么都没学到。让子先给弱的一方一批实地，强的一方必须打进去、必须挑事才能追平。这就是那笔交易：黑棋带着优势开局，得守住；白棋开局落后，得下得狠。两边的活都不轻松。',
        '所以让子棋的手感和分先棋完全不一样。分先棋里双方各自慢慢铺开，四子局里白棋第十手就已经在进攻，黑棋整个中盘都在决定放弃哪一个角。只练分先棋的人，这两半边往往都不熟。这一点在你认定让子「掉价」之前，值得先知道。',
        { type: 'h2', text: '段位差对应几个子' },
        '最省事的算法是差一级让一子。差一级时不摆子，黑棋先下、不贴目，这叫让先。差两级，黑棋开局前先摆两子。差九级就摆九子，这也是大多数人不再往上数的那个点。',
        {
          type: 'ul',
          items: [
            '同级或差一级：分先，黑先。要贴目的话白棋拿 6.5 目',
            '差 2 级：2 子，不贴目',
            '差 3 级：3 子',
            '差 4 级：4 子',
            '差 5 级：5 子',
            '差 6 到 9 级：6 到 9 子',
            '差 9 级以上：多数棋社就停在 9 子，改用节奏或棋盘大小来调',
          ],
        },
        '这里有两个要小心的地方。不同棋社、不同网站给的级位不是同一把尺子，所以在一处量出来的 handicap ranking difference 换到另一处只是个约数。另外级比段宽：从 5 级到 10 级的落差，比从 3 段到 8 段大得多，虽然两者都写着五级。正在看 go handicap for beginners 的人，通常是被第二条绊一下。',
        { type: 'h2', text: '子摆在哪：星位的固定顺序' },
        '让子不是黑棋想摆哪就摆哪。它们按固定顺序落在星位上，而这个顺序之所以重要，是因为它决定了四个角怎么连。',
        {
          type: 'ul',
          items: [
            '第 1 到第 4 子：四个角的星位，每角一个',
            '第 5 子：天元，也就是中心点',
            '第 6、7 子：左右两边的边星',
            '第 8、9 子：上下两边的边星',
          ],
        },
        '摆完之后由白棋先走。这一点经常让人愣住：九子局里黑棋刚摆完九个子，下一步是白棋落子。',
        '十三路棋盘用的是同一套顺序，只是星位更少，九子局基本不存在。十三路上的教学棋多数落在二子到五子之间，而这个区间恰好也是学东西最快的区间。',
        { type: 'h2', text: '白棋拿什么补偿' },
        '分先棋里白棋拿贴目（komi），通常是 6.5 目，用来补偿后手。让子局已经用子把这笔账还了，所以一般完全不贴目，或者只贴 0.5 目来避免和棋。既让子又给白棋 6.5 目，等于把让子又收回去了。',
        { type: 'h2', text: '新手最容易搞错的几件事' },
        {
          type: 'ul',
          items: [
            '因为面子少要子。两个差五级的人下二子局，通常比下五子局更没意思',
            '把让子棋当成分先棋下。五子局里黑棋的任务是守住领先，也就是下得厚、不为挑事而挑事',
            '以为白棋必须大胜。白棋在账面上本来就落后，赢两目就是战果',
            '在几个网站之间换算级位。我们在[等级分从 1200 起步那篇](/blog/how-ratings-work-starting-1200)里写过，1200 这个起点并不能干净地翻译成棋社的级',
          ],
        },
        '最后一条不算错误：让子是个估值。两个彼此熟悉棋风的人，应该按手感调。这张表只负责把你送到对的门口。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '我该让几个子？', a: '差一级让一子，最多到九子。只差一级时不摆子，黑棋先走、不贴目。' },
            { q: '让子算不算一手棋？', a: '不算。开局前黑棋一次摆完，然后由白棋下这一盘的第一手，黑棋不需要用停一手来摆子。' },
            { q: '让子局还要贴目吗？', a: '一般不要，子已经代替了贴目。有时会加半目，只为了避免和棋。' },
            { q: 'YiBoard 上能下让子吗？', a: '还不能。五子棋已经能在[对战页](/play)上玩，围棋在路线图上，让子设置是那部分工作里的一块。' },
          ],
        },
        { type: 'cta', text: '在 yiboardgame.com 免费下一局', href: '/play' },
      ],
      en: [
        'Go handicap stones exist for a practical reason: they let a 15-kyu and a 3-kyu sit down and finish a game that both of them still care about winning. If you have only played even games, a handicap reads as a consolation prize. It is closer to a second game sharing the same rules, where the opening is lopsided on purpose and both players end up with problems they can actually see. This is how handicap stones work, what the handicap ranking difference maps to, where the stones go, what happens to komi, and the mistakes go handicap for beginners tends to produce. Gomoku is open right now on the [play page](/play) at yiboardgame.com, and Go sits on the [roadmap](/blog/go-roadmap).',
        { type: 'h2', text: 'What a handicap is actually for' },
        'Without one, the weaker player usually loses before the game reaches anything interesting. The stronger player answers mildly, the position drifts, and by move sixty it is settled while neither person has learned much. Handicap stones hand the weaker player a block of territory up front, so the stronger player has to invade and start something to catch up. That is the trade. Black starts ahead and has to hold it. White starts behind and has to be sharp. Both halves of that are work.',
        'Which is also why a handicap game feels nothing like an even game. In an even game both sides develop at their own pace. In a four-stone game white is attacking by move ten, and black spends the whole middlegame deciding which corner to give up. Players who only practise even games tend to be weak at both halves. That is worth knowing before you decide the handicap is beneath you.',
        { type: 'h2', text: 'How handicap stones work, from rank difference to stone count' },
        'The rule of thumb is one stone per rank of difference. One rank apart and you play even, with black taking the first move and no komi, which is called taking black. Two ranks apart, black places two stones before white replies. Nine ranks apart, black places nine, which is roughly where most people stop counting and start wondering whether the game is worth playing at all.',
        {
          type: 'ul',
          items: [
            'Same rank, or one apart: even game, black moves first. With komi, white receives 6.5 points',
            '2 ranks apart: 2 stones, no komi',
            '3 ranks: 3 stones',
            '4 ranks: 4 stones',
            '5 ranks: 5 stones',
            '6 to 9 ranks: 6 to 9 stones',
            'More than 9: most clubs stay at 9 stones and adjust the pace or the board size instead',
          ],
        },
        'Two cautions. Grades from different clubs and different servers are not measured on the same scale, so a handicap ranking difference read on one site is an approximate number anywhere else. Kyu grades are also wider than dan ranks: the drop from 5-kyu to 10-kyu is much larger than from 3-dan to 8-dan, even though both read as five steps. If you are reading up on go handicap for beginners, the second one is the part that catches people.',
        { type: 'h2', text: 'Where the stones go' },
        'Black does not place them wherever black likes. They go on the star points in a fixed order, and the order matters because it decides how the four corners connect.',
        {
          type: 'ul',
          items: [
            'Stones 1 to 4: the four corner star points, one per corner',
            'Stone 5: tengen, the centre point',
            'Stones 6 and 7: the star points on the left and right sides',
            'Stones 8 and 9: the star points on the top and bottom sides',
          ],
        },
        'White plays first once the stones are down. That detail trips people up: in a nine-stone game black has just placed nine stones, and the next move belongs to white.',
        'On a 13x13 board the same order applies to the smaller set of star points, and the nine-stone version does not really exist there. Most teaching games on 13x13 sit between two and five stones, which is also the range where you learn the most.',
        { type: 'h2', text: 'What white gets back' },
        'In an even game white takes komi, usually 6.5 points, as payment for moving second. A handicap has already settled that debt with stones, so handicap games normally run with no komi, or with half a point as a tiebreak. Give white a full komi on top of black\u2019s stones and the handicap has been handed straight back.',
        { type: 'h2', text: 'What beginners get wrong about go handicaps' },
        {
          type: 'ul',
          items: [
            'Asking for fewer stones than the gap calls for, out of pride. A two-stone game between players five ranks apart is usually duller than the five-stone version',
            'Playing a handicap game like an even one. Black in a five-stone game has to keep the lead, which means answering solidly rather than starting fights for their own sake',
            'Expecting white to win big. White is behind on paper already, so winning by two points counts',
            'Converting ranks between servers as if they were interchangeable. Our notes on [how ratings work](/blog/how-ratings-work-starting-1200) explain why a 1200 start does not translate cleanly into a club grade',
          ],
        },
        'One last thing, which is not really a mistake: the handicap is an estimate. Two people who know each other\u2019s play should adjust it by feel. The table only gets you to the right door.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'How many handicap stones do I need?', a: 'One per rank of difference, up to nine. One rank apart means no stones: black simply moves first, with no komi.' },
            { q: 'Do handicap stones count as moves?', a: 'No. Black places them all before play starts, then white makes the first move of the game. Black does not spend a turn placing them.' },
            { q: 'Is komi used in handicap games?', a: 'Usually not, since the stones replace it. Half a point is sometimes added so the game cannot end in a draw.' },
            { q: 'Can I play handicap games on YiBoard?', a: 'Not yet. Gomoku is live on the [play page](/play) and Go is on the roadmap, with handicap settings as part of that work.' },
          ],
        },
        { type: 'cta', text: 'Play a free game at yiboardgame.com', href: '/play' },
      ],
    },
  },
  {
    slug: 'board-game-api-plans',
    date: '2026-10-24',
    tags: ['api', 'product', 'roadmap'],
    title: {
      zh: '开放 API 的设想',
      en: 'An open API? What we are thinking',
    },
    description: {
      zh: '每周都有人问我们有没有游戏接口。这篇写一个 board game api 会开放哪些东西、我们还没解决的两个问题，以及为什么接口排位是我们最没把握的一块。',
      en: 'We get asked about a game api every week. Here is what a board game api on YiBoard would expose, the two problems we have not solved, and why ranked api play is the part we are least sure about.',
    },
    keywords: ['game api', 'board game api', 'developer api chess', 'open platform game', 'gomoku api'],
    content: {
      zh: [
        '差不多每周都有人问我们有没有 game api（游戏接口），问得最多的是小型棋社的组织者和想给学生摆棋的老师。这篇就是我们现在的真实状态：一个 board game api 会开放什么、我们还没解决的两个问题、以及我们打算按什么顺序做。这里没有一样东西是明天就上线的。想直接下棋的话，[对战页](/play)一直开着。',
        { type: 'h2', text: '我们为什么想做' },
        '这些请求基本分成两类。棋社的人想把自己社里的对局记录导进表格，省掉手抄比分；教棋的人想摆一个局面，把同一份练习发给三十个学生。两类人都不想要另一个 App，他们想要的是"已经在 YiBoard 上产生的数据，能在别的地方用起来"。',
        '第二个原因是自私的。对战页、棋谱库和排行榜三处读的是同一批对局记录，却各写了一套查询。把这三处改成对着同一份有文档的接口读写，在我们的清单上已经躺了几个月。对外公开的版本就是同一套接口，只是限额更低。',
        { type: 'h2', text: '第一版会开放什么' },
        {
          type: 'ul',
          items: [
            '对局记录：每一步、结果、用时规则、双方的分数变化，JSON 格式',
            '摆棋：提交一个盘面，返回合法着法列表和引擎评估',
            '引擎着法：指定一个固定的搜索预算（现在是 500 毫秒），返回着法和评分',
            '排行榜切片：任一段位区间的 Top N，每小时刷新一次',
          ],
        },
        '不开放什么更重要。接口不会返回访客令牌、设备列表，也不会返回任何本来就不公开的个人资料字段。这条界线我们在[开源棋盘引擎生态](/blog/open-source-board-engine-ecosystem)那篇里画过，对我们来说没有商量余地。',
        { type: 'h2', text: '两个还没解决的问题' },
        '限额是容易的那个：定一个数、公布出来、要是来的流量友好再往上调。难的是机器人。无禁手规则下五子棋接近被解，一个只管进攻的脚本客户端就能赢下多数人类，来几百个，一周之内段位榜就被压平。我们的服务器会对每一步做校验，这能挡住改客户端的作弊，但分不出一个强人和一个脚本的区别。',
        '三条路，我们还没选。给接口对局单独开一张榜；按令牌限制每天的排位局数；或者上线时不计分，以后再定。我们倾向最后一条，因为它是唯一一个事后能改、又不会作废别人已经打出来的成绩的方案。',
        '第二个问题是变体。连珠禁双三，无禁手不禁。如果对局记录里没写清楚它是按哪套规则下出来的，调用方会把一部分棋局读错，而且是静默地读错，等到有人发了一份错的分析出来，才有人发现。',
        { type: 'h2', text: '国际象棋的开发者接口已经证明了什么' },
        '国际象棋早就有了。Lichess 有一个公开的 HTTP 接口，覆盖对局、棋题和引擎分析，线上国际象棋周围一大半的工具之所以存在，就是有人能读到这些数据。这类 developer api（开发者接口）能跑通，一部分原因是规则固定、记谱法统一，两个程序对同一个字符串的理解永远一致。',
        '五子棋没有对应物。引擎项目各做各的，盘面格式互不相通，几乎没有一个能读另一个写出来的对局记录。给这些棋做一个开放的棋盘游戏平台能解决这件事，但前提是我们必须随每条记录公布变体和棋盘尺寸，这比多数国际象棋工具愿意带的元数据要多。',
        { type: 'h2', text: '代价，以及我们的顺序' },
        '实话：比现在这个站更贵。每一个公开的端点都要配额、要可用性监控，也要有人在调用方被改动搞坏时出面回答。我们的预算不大。反作弊的工作和象棋的上线都排在前面，我宁愿直说这一点，也不想先宣布一个日期再错过它。',
        '比较现实的顺序是：先只读的对局记录，然后摆棋，最后才是引擎着法，因为最后这一项每次被调用都要烧算力。要是你想对这个顺序提意见，[关于页](/about)上有联系方式，我们是看的。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 现在有游戏接口吗？', a: '没有。这一页写的全是计划。五子棋现在就能在浏览器里玩，引擎跑在你自己那个标签页里。' },
            { q: '接口会免费吗？', a: '只读的部分会，但有限额。引擎端点要烧算力，限额会更紧。具体数字会在开放之前公布。' },
            { q: '我能用它做一个自己的五子棋客户端吗？', a: '这正是我们想支持的。对局记录、摆棋、引擎着法，基本覆盖了第三方客户端需要的东西。' },
            { q: '接口对局会算进段位吗？', a: '上线时大概率不算。接口排位是我们最没把握的一块，因为那正是机器人流量最能造成破坏的地方。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 免费下一局', href: '/play' },
      ],
      en: [
        'We get asked about a game api roughly once a week, mostly by people running small clubs and by teachers who want to set up positions for students. This post is where we actually are on it: what a board game api would expose, the two problems we have not solved, and the order we plan to do things in. Nothing here ships tomorrow. If you just want to play, the [play page](/play) is open.',
        { type: 'h2', text: 'Why we would build one' },
        'The requests split into two groups. Club organizers want their own match records in a spreadsheet so they can run a ladder without copying results out by hand. Teachers want to post one position and hand the same exercise to thirty students. Neither group wants another app. They want the data they already created on YiBoard to be usable somewhere else.',
        'The second reason is selfish. The play page, the replay library and the rankings page all read the same match records through three separate queries. Rewriting those against one documented interface has been sat on our list for months. The public version would be that same interface with a lower rate limit.',
        { type: 'h2', text: 'What a first version would expose' },
        {
          type: 'ul',
          items: [
            'Match records: every move, the result, the time control, and the rating change for each side, as JSON',
            'Position setup: post a board state, get back the legal move list and an engine evaluation',
            'Engine moves: ask for one move at a fixed search budget, 500 ms today, and get the move with its score',
            'Leaderboard slices: the top N of any rank band, refreshed once an hour',
          ],
        },
        'What stays out matters more. The api would not return guest tokens, device lists, or any profile field that is not already public. That line is the one we drew in [the open source board engine ecosystem](/blog/open-source-board-engine-ecosystem), and it is not negotiable for us.',
        { type: 'h2', text: 'The two problems we have not solved' },
        'Rate limits are the easy one: pick a number, publish it, raise it later if the traffic turns out friendly. The hard one is bots. Under freestyle rules gomoku is close to solved, so a scripted client that plays clean offence beats most humans, and a few hundred of them would flatten the ladder inside a week. Our server validates every move, which stops people tampering with the client, but it cannot tell a strong human from a script.',
        'Three ways out, and we have not picked one. Give api games their own ladder. Cap ranked games per token per day. Or launch unranked and decide later. We lean toward the last one, because it is the only option we could reverse without invalidating results people already earned.',
        'The second problem is variants. Renju forbids certain double threes, freestyle does not. If a match record does not say which ruleset produced it, consumers will misread some games silently, and nobody notices until somebody publishes a broken analysis.',
        { type: 'h2', text: 'What a developer api for chess already proved' },
        'Chess has had this for years. Lichess runs a public HTTP api covering games, puzzles and engine analysis, and a large share of the tooling around online chess exists because somebody could read the data. A developer api for chess works partly because the rules are fixed and the notation is settled, so two programs always mean the same thing by the same string.',
        'Gomoku has no equivalent. Engine projects are scattered, each with its own board format, and almost none can read a match record written by another. An open platform game for these games would fix that, but only if we publish the variant and the board size with every record, which is more metadata than most chess tooling bothers to carry.',
        { type: 'h2', text: 'What it would cost, and the order we are doing things in' },
        'Honest answer: more than the site costs now. Every open endpoint needs quotas, uptime monitoring, and someone to reply when a consumer breaks against a change. Our budget is small. The anti-cheat work and the xiangqi release both come first, and I would rather say that plainly than announce a date and then miss it.',
        'The realistic sequence is read-only match records first, then position setup, then engine moves last, because that one burns compute on every call. If you want to argue with that ordering, the [about page](/about) has a contact route and we do read it.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Is there a YiBoard game api today?', a: 'No. Everything on this page is a plan. Gomoku is playable in the browser right now, and the engine runs on your own machine inside the tab.' },
            { q: 'Would the api be free?', a: 'The read-only parts would be, behind a rate limit. Engine endpoints cost compute, so those would get a tighter quota. We would publish the numbers before anything opened.' },
            { q: 'Can I use it to build my own gomoku client?', a: 'That is what we want it for. Match records, position setup and engine moves cover most of what a third-party client needs.' },
            { q: 'Will api games count toward ranking?', a: 'Probably not at launch. Ranked api play is the part we are least sure about, since that is where bot traffic would do the most damage.' },
          ],
        },
        { type: 'cta', text: 'Play a free game on YiBoard', href: '/play' },
      ],
    },
  },
  {
    slug: 'privacy-promise-what-we-store',
    date: '2026-10-23',
    tags: ['product', 'privacy'],
    title: {
      zh: '隐私承诺的履行日志',
      en: 'Privacy promise: what we actually store',
    },
    description: {
      zh: '我们声称自己的游戏隐私政策短到能读完。这篇是它的履行日志：数据库里到底有哪些行、它们活多久、以及我们拒绝收集的三样东西。不写营销话，只列清单。',
      en: 'We claim a game privacy policy short enough to read. This is the log behind it: which rows exist in our database, how long they live, and the three things we refuse to collect.',
    },
    keywords: ['game privacy policy', 'what data games store', 'no data collection game', 'privacy transparency', 'anonymous gomoku'],
    content: {
      zh: [
        '我们声称自己的 game privacy policy（游戏隐私政策）短到能读完。这篇是它的履行日志：数据库里到底有哪些行、它们活多久、以及我们拒绝收集的三样东西。不写营销话，只列清单。想直接下棋，[对战页](/play)一直开着。',
        { type: 'h2', text: '我们存了哪些行' },
        {
          type: 'ul',
          items: [
            '对局记录：棋盘尺寸、规则变体、着法序列、结果、时间戳。没有它，分享出去的复盘链接打不开。',
            '段位历史：每位玩家每局一行，存对局前后的分数。',
            '访客 ID：一串存在你自己浏览器里的随机字符串。没有账号，战绩靠它跟着你走。',
            '聚合计数器：每天的对局数，只用于排行榜的时间窗口，不做任何按人的拆分。',
          ],
        },
        '这就是全部表结构。没有邮箱列，没有姓名列，没有手机列，也没有广告标识符，因为我们从没开口要过这些。',
        { type: 'h2', text: '我们拒绝收集的三样' },
        {
          type: 'ul',
          items: [
            '邮箱和手机号。没有注册表单，也就没有地方能填进去。',
            '跨站追踪用的分析。页面计数在我们自己的服务器上做聚合。',
            '对局页的聊天内容。就算以后加了，处理方式和着法序列一样：为了让功能跑起来才存，别的用途没有。',
          ],
        },
        { type: 'h2', text: '这些东西活多久' },
        '对局记录一直留着，直到你删掉它，或者那个访客 ID 对应的记录沉寂太久；具体窗口写在[隐私页](/privacy)上。段位历史要留到段位系统不再需要它为止，因为删掉一行会改变这个对手遇到过的所有人的分数。服务器访问日志活得最短，按天算，存在的意义是让我们能看出哪里坏了。',
        { type: 'h2', text: '一个不收集数据的游戏，仍然必须做的事' },
        '要让产品跑起来，有些数据非有不可。一局计分的棋需要结果记录，否则段位就是编的；一条复盘链接需要着法序列，否则没有东西可复盘。我们画的那条线是"用途"：如果某一行不是让某个功能跑起来所必需，我们就不创建它。这条规则比"什么都收、然后承诺会小心"要窄得多，也更好审计。',
        '另一半是执行。反作弊在服务端跑，意味着每一步都会按规则校验。这个校验读的是盘面状态，不是你是谁，它只在对局旁边写一个通过或不通过的标记。除非结果被申诉，没人会去手工翻它。',
        { type: 'h2', text: '还有哪些没堵上的地方' },
        '两个，实话说。服务器日志里会短期保留 IP 地址，因为挡掉一波洪水请求没有别的办法。另外我们的托管商和所有托管商一样，能在网络层看到流量元数据，这部分不在我们能改的范围里。两样都写在[隐私页](/privacy)上，没有藏起来。',
        '背后的理由我们早先在[零广告零追踪，只有棋](/blog/no-ads-no-tracking-just-games)那篇写过。这篇是后续：先把话说出来，再把磁盘上实际有什么列一遍。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 会存我的姓名或邮箱吗？', a: '不会。这里没有注册，所以我们从来没收到过这两样。你的战绩绑的是一串存在你自己浏览器里的随机访客 ID。' },
            { q: '我能删掉自己的对局吗？', a: '能。在战绩页删除会移除对局记录和访客 ID。已经作用到别人身上的分数变动不会回退，理由和国际象棋的结果不会事后改判一样。' },
            { q: '你们卖数据吗？', a: '不卖。表结构里没有值得买的东西，也没有广告标识符可以拿去对标。' },
            { q: '隐私政策和这篇写的不一样吗？', a: '不应该不一样。政策页是有约束力的那一版，这篇存在的意义是把同一件事用大白话说一遍。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 免费下一局', href: '/play' },
      ],
      en: [
        'We claim a game privacy policy short enough to read. This is the log behind it: which rows exist in our database, how long they live, and the three things we refuse to collect. No marketing language, just the list. The [play page](/play) is open if you came here for a game.',
        { type: 'h2', text: 'The rows we keep' },
        {
          type: 'ul',
          items: [
            'Match records: board size, ruleset, move list, result, timestamp. Without them the replay link does not open.',
            'Rating history: one row per game per player, holding the rating before and after.',
            'Guest id: a random string in your own browser storage. It is how your record follows you without an account.',
            'Aggregate counters: games played per day, used for the leaderboard window. Nothing is broken down per person.',
          ],
        },
        'That is the whole schema. There is no email column, no name column, no phone column and no advertising identifier, because we never ask for any of them.',
        { type: 'h2', text: 'The three things we refuse to collect' },
        {
          type: 'ul',
          items: [
            'Email and phone number. There is no signup form, so there is nowhere to type one.',
            'Analytics that follow you across other sites. Page counts are aggregated on our own server.',
            'Chat content from the match page. If we ever add one, it gets the same treatment as the move list: stored to make the feature work, and for nothing else.',
          ],
        },
        { type: 'h2', text: 'How long things live' },
        'Match records stay until you delete them or until the record behind a guest id goes quiet for a long stretch; the exact window is on the [privacy page](/privacy). Rating history is kept as long as the ladder needs it, because dropping a row would change the ratings of everyone that player met. Server access logs are the shortest lived, counted in days, and exist so we can see when something breaks.',
        { type: 'h2', text: 'What a no data collection game still has to do' },
        'Some data has to exist for the product to run at all. A rated game needs a record of the result, or the rating is fiction. A replay link needs the move list, or there is nothing to replay. The line we draw is purpose: if a row is not needed to make a feature work, we do not create it. That is a narrower rule than collecting everything and promising to be careful, and it is far easier to audit.',
        'The other half is enforcement. Anti-cheat runs on the server, which means every move gets checked against the rules. That check reads the board state, not who you are, and writes a pass or fail flag beside the game. Nobody reads it by hand unless a result is disputed.',
        { type: 'h2', text: 'Where the gaps are' },
        'Two, and we will say them plainly. IP addresses stay in server logs for a short window, because there is no other way to stop a flood of requests. And our host, like every host, can see traffic metadata at the network level, which is outside what we can change. Both are written on the [privacy page](/privacy) rather than buried.',
        'We went through the reasoning earlier in [no ads, no tracking, just games](/blog/no-ads-no-tracking-just-games). This is the follow up: the claim first, then the list of what is actually on disk.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Does YiBoard store my name or email?', a: 'No. There is no signup, so we never receive either one. Your record is tied to a random guest id kept in your own browser.' },
            { q: 'Can I delete my games?', a: 'Yes. Deleting from the profile page removes the match records and the guest id. Rating changes already applied to other players are not reversed, for the same reason a chess result is not changed after the fact.' },
            { q: 'Do you sell data?', a: 'No. There is nothing in the schema worth buying, and no advertising identifier to sell it against.' },
            { q: 'Is the privacy policy different from what this post says?', a: 'It should not be. The policy page is the binding version. This post exists to say the same thing in plain words.' },
          ],
        },
        { type: 'cta', text: 'Play a free game on YiBoard', href: '/play' },
      ],
    },
  },
  {
    slug: 'iterating-on-user-feedback',
    date: '2026-10-25',
    tags: ['product', 'community'],
    title: {
      zh: '用户反馈驱动的迭代',
      en: 'Iterating on user feedback',
    },
    description: {
      zh: '我们怎么读玩家反馈：它从三条渠道来、按三个问题排序，以及哪些需求会被直接拒绝。附上真实的上线案例，还有为什么免注册这件事没有商量余地。',
      en: 'How we read player feedback: the three channels it arrives on, the three questions we sort it by, and the requests we decline outright. With real examples of what shipped.',
    },
    keywords: ['game user feedback', 'feature requests board game', 'community driven development', 'player suggestions', 'board game feedback'],
    content: {
      zh: [
        '多数 game user feedback（玩家反馈）是以一句话的形式到达的：匹配太慢、手机上棋盘太小、想再来一局。在 YiBoard，它通常还带着一个复盘 ID，这意味着我们能打开对方当时看到的具体局面，而不是从措辞里猜。这一个差别决定了我们怎么读 feature requests board game（棋类功能需求），也决定了我们的更新说明为什么短而具体，而不是像在写广告。只想下棋的话，[对战页](/play)一直开着。',
        '三条渠道几乎承载了全部反馈，而每条渠道携带的证据类型都不同。它们彼此矛盾的次数也比想象中多：收件箱里声音最大的那条需求，很少和着法序列指向的是同一条。两者冲突时，我们先看重放。',
        { type: 'h2', text: '玩家的建议从哪来' },
        {
          type: 'ul',
          items: [
            '[联系页](/contact)：消息最长、上下文最多，通常来自已经下过十局以上的人。',
            '被分享出去的复盘链接：一个字都没有，但着法序列能告诉我们，没人在看的时候大家实际在用哪种规则变体。',
            '段位数据：完全不说话，而且常常最先发现问题。让胜率失衡的改动，会在这里比任何人写信来得更早出现。',
          ],
        },
        { type: 'h2', text: '棋类功能需求怎么排序' },
        '我们用三个问题，按这个顺序问。第一个过不了，就不会走到第二个。',
        {
          type: 'ul',
          items: [
            '它会不会动到规则或裁判？规则改动推进得慢，因为服务器端裁判是唯一一处出错就会同时对所有人不公平的地方。',
            '它能不能帮一个新玩家下完第一局？这类排在最前面，因为整个产品的主张就是有人能在一分钟内开局。',
            '它是不是只对每天都下的人有意义？这类排在最后，其中有相当一部分永远不会做。',
          ],
        },
        { type: 'h2', text: '社区驱动的开发在这里长什么样' },
        '社区驱动的开发听起来很慷慨，直到你得公开说一次不。我们跑的版本更窄一点：公开需求、公开决定、公开理由。一条建议被否掉，说明里会写清楚它卡在三个问题中的哪一个，以及什么情况会让我们改答案。',
        '这有个值得说清楚的副作用：玩家不再重复发同一条建议了，因为他们看得见它停在哪。开始公开决定之后，收件箱变小了，也更有用了，这是开始时没预料到的。',
        { type: 'h2', text: '从建议到上线的几个例子' },
        '举几个例子，好让上面的排序规则不只是一句口号。',
        {
          type: 'ul',
          items: [
            '键盘操作：提出的人不多，实现成本低，却替指针操作不精确的人移走了一道真实的门槛。',
            '不用账号也能分享复盘：被反复要求，而且符合第二条，因为分享出来的一局是多数新玩家进来的入口。',
            '十五路棋盘的移动端布局：三个人分别发来了同一处裁切问题的截图，这是最快的证据。',
          ],
        },
        { type: 'h2', text: '我们拒绝什么' },
        '两类需求是关着的，说在前面能替所有人省时间。任何会在棋盘上放广告的东西都不做，这个设计选择在[免费不是营销](/blog/free-is-a-design-choice)里讲过。任何要求先注册才能落第一子的东西也不做，因为免注册承诺是产品其余部分的地基。平台下一步往哪走，写在[开放 API 的设想](/blog/board-game-api-plans)里。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '我提的建议会有人看吗？', a: '会。每条发到联系页的需求都会被读，并且会得到一个决定：做、排队、或者不做。不做的时候会写明它卡在哪一个问题上。' },
            { q: '为什么有些看起来很小的改动要等很久？', a: '因为只要碰到规则或服务器端裁判，改动就不是前端一个小补丁。裁判出错会让所有对局同时不公平，所以这类改动要重跑全部规则测试。' },
            { q: '我该去哪里提需求？', a: '[联系页](/contact)最直接。如果你能附上复盘链接，我们就能直接看到你说的那一步。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 免费下一局', href: '/play' },
      ],
      en: [
        'Most game user feedback arrives as a sentence: the matchmaker feels slow, the board is too small on my phone, I want a rematch button. On YiBoard it usually arrives with a replay id attached, which means we can open the exact position someone was looking at instead of guessing from the wording. That one difference shapes how we read feature requests for a board game, and it is why our release notes are short and specific instead of promotional. If you only came here to play, the [play page](/play) is open.',
        'Three channels carry nearly everything, and each one carries a different kind of evidence. They also disagree with each other more often than you would expect: the loudest request in the inbox is rarely the one the move lists point at. When the two disagree, we watch the replays first.',
        { type: 'h2', text: 'Where player suggestions come from' },
        {
          type: 'ul',
          items: [
            'The [contact page](/contact): the longest messages and the most context, usually from players who have finished more than ten games.',
            'Shared replay links: no words at all, but the move list shows which rule variant people actually pick when nobody is watching.',
            'Ratings data: silent, and often first. A change that makes win rates lopsided shows up here days before anyone writes in.',
          ],
        },
        { type: 'h2', text: 'How feature requests for a board game get sorted' },
        'We ask three questions, in this order. A request that fails the first one does not reach the second.',
        {
          type: 'ul',
          items: [
            'Does it touch the rules or the referee? Rule changes move slowly, because the server-side referee is the one part where a mistake would be unfair to every player at once.',
            'Does it help a new player reach a finished first game? Those go near the front, because the whole claim of the product is that someone can start a match in under a minute.',
            'Does it only matter to people who already play daily? Those go last, and a fair number of them never ship.',
          ],
        },
        { type: 'h2', text: 'What community driven development looks like here' },
        'Community driven development sounds generous until you have to say no in public. The version we run is narrower: we publish the request, we publish the decision, and we publish the reason. If a suggestion is declined, the note says which of the three questions it failed and what would change our answer.',
        'That has a side effect worth naming. Players stop sending the same request twice, because they can see where it sits. The inbox got smaller and more useful after we started posting the decisions, which is not what we expected when we began.',
        { type: 'h2', text: 'Requests that became shipped changes' },
        'A few examples, so the sorting rule is more than a slogan.',
        {
          type: 'ul',
          items: [
            'Keyboard play. Asked for by a handful of people, cheap to build, and it removed a real barrier for anyone who cannot use a pointer precisely.',
            'Replay links without an account. Requested constantly, and it passed question two, because a shared game is how most new players arrive.',
            'Mobile layout for the fifteen-line board. Three separate people sent screenshots of the same clipping problem, which is the fastest kind of evidence there is.',
          ],
        },
        { type: 'h2', text: 'What we say no to' },
        'Two categories are closed, and saying so up front saves everyone time. Anything that would put advertising on the board is out; that design choice is explained in [free is a design choice](/blog/free-is-a-design-choice). Anything that needs an account before the first move is out as well, because the no-signup promise is the ground the rest of the product stands on. Where the platform goes next is written up in [our open api thinking](/blog/board-game-api-plans).',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Will anyone read my suggestion?', a: 'Yes. Every request that reaches the contact page gets read, and it gets a decision: build it, queue it, or decline it. A decline comes with the question it failed.' },
            { q: 'Why do changes that look small sometimes take months?', a: 'Because anything that touches the rules or the server-side referee is not a front-end patch. A referee bug makes every match unfair at once, so those changes rerun the full rule test suite.' },
            { q: 'Where should I send a feature request?', a: 'The contact page is the most direct route. If you can include a replay link, we can look at the exact move you mean.' },
          ],
        },
        { type: 'cta', text: 'Play a free game on YiBoard', href: '/play' },
      ],
    },
  },
  {
    slug: 'performance-benchmarks-how-fast-we-are',
    date: '2026-10-26',
    tags: ['performance', 'engineering', 'benchmarks'],
    title: {
      zh: '性能基准：我们能跑多快',
      en: 'Performance Benchmarks: How Fast We Are',
    },
    description: {
      zh: '棋盘首屏、落子响应、AI 思考耗时：把 YiBoard 在一台中端手机和一台旧笔记本上的实测数字摊开讲，包括还没做好的那部分。',
      en: 'Board first paint, move response, and AI think time: the numbers we measure on a mid-range phone and an older laptop, including the parts that are still not good.',
    },
    keywords: [
      'web game benchmark',
      'board game performance test',
      'browser game frame rate',
      'gomoku engine speed',
      'YiBoard performance',
    ],
    content: {
      zh: [
        '一个浏览器棋类站的性能基准，说到底就是三个数字：棋盘多快出现、落子多快生效、引擎思考多久。我们在一台 2021 年的中端安卓手机和一台 2017 年的笔记本上测这三个数字，因为这两台机器基本覆盖了真正会来玩的人。',
        '把这些数字公开是一种承诺。以后哪个版本让其中一项变差了，那就是一个必须解释的回退，不能悄悄吞掉。',
        { type: 'h2', text: '我们测什么，在什么机器上测' },
        {
          type: 'ul',
          items: [
            '棋盘首屏：从发起导航到网格和坐标可见、可点的时间。',
            '落子往返：从手指或鼠标动作到棋子出现的时间，线上对局还包含服务器校验。',
            '引擎思考耗时：默认 500 ms 预算下，AI 返回一步棋的墙钟时间。',
            '静置开销：棋盘开着但什么都没发生时，CPU 和电量的消耗。',
          ],
        },
        '手机是三年前的骁龙 7 系设备，跑 Chrome。笔记本是双核 i5 加核显，跑 Firefox。两边都在限速网络下测，因为真实访客很少待在干净的实验室网络里。',
        { type: 'h2', text: '当前版本的数字' },
        {
          type: 'ul',
          items: [
            '棋盘首屏：手机 1.1 秒，笔记本 0.8 秒，缓存为空时测量。',
            '离线落子往返：低于 16 毫秒，也就是一帧动画。',
            '在线落子往返：手机在 4G 下 90 到 140 毫秒，笔记本在家用宽带下 60 到 90 毫秒。',
            '引擎思考耗时：默认预算下 480 到 520 毫秒，超时就退回更浅的搜索，不会阻塞。',
          ],
        },
        '离线落子那个数字比看上去更重要。一个要花两帧才响应的棋盘，用起来就是卡，而这种卡没法在评测里解释过去。',
        { type: 'h2', text: '时间到底花在哪' },
        '首屏的大头不在棋盘本身，而在 CSS、字体和框架包先到达、再被解析。棋盘不过是一次几百条线的画布绘制，等 JavaScript 跑起来之后很便宜。',
        {
          type: 'ul',
          items: [
            '冷启动首屏里大约一半是共享包的网络与解析时间。',
            '大约五分之一是字体加载，这也是我们先用系统字体栈的原因。',
            '剩下的是水合与第一次画布绘制。',
          ],
        },
        '这个分布解释了为什么到目前为止最大的收益来自少发 JavaScript，而不是优化绘制代码。相关工作在 [性能专项](/blog/performance-work)，移动端特有的修正在 [移动端优化](/blog/mobile-first-improvements)。',
        { type: 'h2', text: '我们还不满意的部分' },
        '观战视图比下棋慢。多渲染一块棋盘加上棋谱列表，会把手机在快棋中压到每秒 45 帧左右，评论面板打开时更差。我们正在把这块改成按需渲染，而不是每步都渲染。',
        '棋谱拖动是小一号的同类问题。在 2017 年那台笔记本上，把滑块拖过一局百步的棋会掉帧。两项都列在 [观战与解说规划](/blog/spectator-and-commentator-plans) 里。',
        { type: 'h2', text: '怎么保证数字不作假' },
        {
          type: 'ul',
          items: [
            '每次构建都在 CI 里跑棋盘首屏和落子往返检查，超过阈值就算构建失败。',
            '引擎预算是硬上限。搜索跑不完就返回目前找到的最好一步，而不是延长时间。',
            '我们在自己拥有的硬件上测，不用模拟器，因为模拟器的时序会把一切都显得更好。',
          ],
        },
        '只写在博客里的基准一个月就过期了。有用的版本是每次提交都跑、变差就拦住合并的那个。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 的 AI 和服务器端引擎比，速度怎么样？', a: '它在你的浏览器里跑，思考预算 500 毫秒，没有网络往返也没有排队。服务器端引擎可以搜得更深，但会加上延迟和对连接的依赖。这个取舍写在 [浏览器里的真引擎](/blog/alpha-beta-engine-in-browser)。' },
            { q: '棋盘能跑满 60 帧吗？', a: '近五年的笔记本可以。三年前的中端手机在正常对局中能守住 60 帧，观战视图会掉到 40 多帧，这是已知的缺口。' },
            { q: '为什么数字看着挺好，玩起来还是慢？', a: '通常是连接的问题，不是设备的问题。线上落子包含服务器校验，信号弱就表现为点击和棋子出现之间有延迟。跟 AI 下就没有这一跳，参见 [浏览器里的真引擎](/blog/alpha-beta-engine-in-browser)。' },
            { q: '每次发布都会更新这些数字吗？', a: 'CI 里的阈值在仓库中是公开的，下一轮工作的安排记在 [性能专项](/blog/performance-work)。当某个版本让其中一项数字发生移动时，我们会重述这些头条数字。' },
          ],
        },
        { type: 'cta', text: '到 YiBoard 免费下一局', href: '/play' },
      ],
      en: [
        'Performance benchmarks for a browser board game come down to three numbers: how fast the board appears, how fast a placed stone registers, and how long the engine thinks. We measure all three on a mid-range Android phone from 2021 and a 2017 laptop, because those two machines describe most of the people who actually show up.',
        'Publishing these numbers is a commitment. If a later release makes one of them worse, that is a regression we have to explain rather than quietly absorb.',
        { type: 'h2', text: 'What we measure and on what' },
        {
          type: 'ul',
          items: [
            'Board first paint: time from navigation until the grid and coordinates are visible and clickable.',
            'Move round trip: time from a tap or click to the stone appearing, including server validation on online games.',
            'Engine think time: wall clock for the AI to return a move at the default 500 ms budget.',
            'Idle cost: CPU and battery draw while the board is open but nothing is happening.',
          ],
        },
        'The phone is a Snapdragon 7 series device three years old, running Chrome. The laptop is a dual core i5 with integrated graphics, running Firefox. Both are tested on a throttled connection, since real visitors are rarely on a clean lab network.',
        { type: 'h2', text: 'The numbers as of this build' },
        {
          type: 'ul',
          items: [
            'Board first paint: 1.1 s on the phone, 0.8 s on the laptop, measured with the cache cold.',
            'Move round trip offline: under 16 ms, which is one animation frame.',
            'Move round trip online: 90 to 140 ms on the phone over 4G, 60 to 90 ms on the laptop over home broadband.',
            'Engine think time: 480 to 520 ms at the default budget, degrading to a shallower search rather than blocking.',
          ],
        },
        'The offline move number matters more than it looks. A board that takes two frames to respond feels laggy, and there is no way to explain that away in a review.',
        { type: 'h2', text: 'Where the time actually goes' },
        'Most of the first paint is not the board. It is the CSS, the font, and the framework bundle arriving and then being parsed. The board itself is a canvas draw of a few hundred lines, which is cheap once the JavaScript is running.',
        {
          type: 'ul',
          items: [
            'Roughly half of the cold first paint is network and parse time for the shared bundle.',
            'About a fifth is font loading, which is why we ship a system font stack first.',
            'The rest is hydration and the first canvas draw.',
          ],
        },
        'That breakdown is why the largest wins so far came from shipping less JavaScript rather than from optimising the drawing code. The work is described in [performance work](/blog/performance-work) and the mobile specific fixes in [mobile-first improvements](/blog/mobile-first-improvements).',
        { type: 'h2', text: 'The part we are not happy about' },
        'Spectator view is slower than playing. Rendering a second board plus the move list pushes the phone to about 45 frames per second during a fast game, and it gets worse when the comment pane is open. We are rewriting that view to render on demand rather than on every move.',
        'Replay scrubbing has the same problem at a smaller scale. Dragging the slider through a hundred move game drops frames on the 2017 laptop. Both are on the list in [spectator and commentator plans](/blog/spectator-and-commentator-plans).',
        { type: 'h2', text: 'How we keep the numbers honest' },
        {
          type: 'ul',
          items: [
            'Every build runs the board paint and move round trip checks in CI, and a regression past the threshold fails the build.',
            'The engine budget is a hard cap. If the search cannot finish, it returns the best move found so far instead of taking longer.',
            'We test on hardware we own rather than on emulated devices, because emulator timing flatters everything.',
          ],
        },
        'Benchmarks that only exist in a blog post decay within a month. The useful version is the one that runs on every commit and blocks a merge when it gets worse.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'How fast is the YiBoard AI compared with a server side engine?', a: 'It runs in your browser with a 500 ms think budget, so there is no network round trip and no queue. A server engine can search deeper, but it adds latency and a dependency on the connection. The trade is written up in [a real engine in your browser](/blog/alpha-beta-engine-in-browser).' },
            { q: 'Does the board run at 60 frames per second?', a: 'On a laptop from the last five years, yes. On a three year old mid-range phone it holds 60 during normal play and drops into the 40s in spectator view, which is the known gap.' },
            { q: 'Why does a game feel slow even when the numbers look fine?', a: 'Usually it is the connection, not the device. Online moves include server validation, so a weak signal shows up as delay between your tap and the stone appearing. Playing against the AI removes that hop, as explained in [a real engine in your browser](/blog/alpha-beta-engine-in-browser).' },
            { q: 'Do you publish these numbers after every release?', a: 'The CI thresholds are public in the repository and the roadmap notes the next round of work in [performance work](/blog/performance-work). We restate the headline numbers when a release moves one of them.' },
          ],
        },
        { type: 'cta', text: 'Play a free game on YiBoard', href: '/play' },
      ],
    },
  },
  {
    slug: 'why-we-are-open-source',
    date: '2026-10-29',
    tags: ['open-source', 'product', 'community'],
    title: {
      zh: '为什么我们开源',
      en: 'Why We Are Open Source'
    },
    description: {
      zh: 'YiBoard 的全部代码都在公开仓库里：裁判、引擎、界面、五种语言。这篇讲我们为什么这么选、代价是什么、你能拿它做什么。',
      en: 'The whole YiBoard repository is public: referee, engine, interface, five languages. Why we chose that, what it costs us, and what you are allowed to do with the code.'
    },
    keywords: ['open source game project', 'open source board game', 'github game', 'transparent code', 'open source gomoku engine'],
    content: {
      zh: [
        'YiBoard 是一个开源棋类项目，这句话是决定，不是口号，而且它有成本。整个仓库都是公开的：裁判逻辑、alpha-beta 引擎、五种语言的词条、段位算法。一场棋的胜负是怎么判定的，谁都能读到，也可以在 issue 里跟我们吵。这篇讲我们为什么这么选、代价是什么、以及你能拿这份代码做什么。',
        { type: 'h2', text: '公开的部分具体有哪些' },
        {
          type: 'ul',
          items: [
            '裁判：判断落子是否合法、胜负如何成立的那一层，站内所有棋种共用',
            '五子棋引擎：跑在浏览器里的 alpha-beta 剪枝，单次搜索预算 500 毫秒',
            '界面：路由、棋盘渲染、键盘操作的处理',
            '五种语言的词条文件，包括还没翻完的那些',
            '没有统计脚本，也没有广告标签，这点你不信我们的话可以自己翻源码确认'
          ]
        },
        '仓库按职责分目录，规则、引擎、界面、翻译各自独立。想看懂胜负是怎么判的，从规则那部分开始读最快。',
        { type: 'h2', text: '为什么把源码放出来' },
        {
          type: 'ul',
          items: [
            '棋类规则天生会被争论。裁判代码公开，争议可以在代码里解决，而不是在评论区里吵',
            '作弊指控需要证据。引擎公开之后，"对面是不是用了软件"这个问题有可查的答案',
            '别人可以把引擎挪到自己的项目里，不必重新实现一遍',
            '我们没有客服团队。问题公开在 issue 里，答过一次之后别人搜得到'
          ]
        },
        { type: 'h2', text: '开源解决不了什么' },
        '要说实话：开源不等于有人维护。一个公开仓库如果只有一个人在提交，巴士系数还是一。放出源码也不代表我们接受每一个补丁，合并进去意味着以后要一直维护它，有时候我们判断不值得。另外，代码公开对不懂代码的人没有任何帮助，这一点我们很清楚，所以界面本身做得足够简单，让人不用读代码也能玩。',
        { type: 'h2', text: '你可以拿它做什么' },
        {
          type: 'ul',
          items: [
            '读：不需要注册，也不需要申请加入什么组织',
            '自己部署一份，保留署名和许可声明即可',
            '发现规则判错了就开 issue，附上对局记录，这比在别处抱怨有用得多',
            '提交补丁。我们会看，但不一定合并'
          ]
        },
        '如果你只想下棋，这些都不重要。打开 [对战页](/play) 直接开一局就行，开源是给想查的人准备的。团队的想法写在 [关于页](/about)。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 真的开源吗？', a: '仓库是公开的，裁判、引擎、界面、翻译都在里面，许可条款写在仓库里。你不需要注册账号就能读。' },
            { q: '我能自己搭一份吗？', a: '可以。保留署名和许可声明就行。我们不提供托管支持，部署和运维是你自己的事。' },
            { q: '把引擎公开了，是不是更容易作弊？', a: '公开让玩家能研究引擎，但对局结果仍然由服务端裁判判定，单靠读代码改不了别人的对局。引擎那一层的设计思路在 /blog/open-source-board-engine-ecosystem 里讲过。' },
            { q: '既然免费又开源，靠什么维持？', a: '目前是几个人的业余项目，没有广告、没有付费墙。为什么这么选，/blog/free-is-a-design-choice 里写得更细，[常见问题](/faq) 也有。' }
          ]
        },
        { type: 'cta', text: '在 YiBoard 免费下一局', href: '/play' }
      ],
      en: [
        'YiBoard is an open source game project, and that sentence describes a decision with costs attached, not a slogan. The whole repository is public: the referee, the alpha-beta engine, the five language files, the ranking maths. Anyone can read how a win gets decided and argue with us in an issue thread. This post covers why we chose it, what it costs, and what you are allowed to do with the code.',
        { type: 'h2', text: 'What is actually public' },
        {
          type: 'ul',
          items: [
            'The referee: the layer that decides whether a move is legal and when a game is won, shared by every game on the site',
            'The Gomoku engine: alpha-beta pruning running in your browser with a 500 ms search budget',
            'The interface: routing, board rendering, keyboard handling',
            'Localisation files for all five languages, including the strings we have not finished',
            'No analytics scripts and no ad tags, which you can confirm by reading the source instead of taking our word for it'
          ]
        },
        'The repository is grouped by job: rules, engine, interface, translations. If you want to understand how a win is decided, start with the rules directory.',
        { type: 'h2', text: 'Why we published the source' },
        {
          type: 'ul',
          items: [
            'Board game rules get argued about by nature. A public referee settles the argument in code rather than in a comment section',
            'Cheating accusations need evidence. With the engine public, the question of whether an opponent used software has an answer someone can check',
            'Other developers can port the engine instead of writing another one',
            'We have no support team. An issue answered once stays searchable for everyone after us'
          ]
        },
        { type: 'h2', text: 'What open source does not fix' },
        'Being honest here: public code is not the same as maintained code. A repository with one committer still has a bus factor of one. Publishing the source also does not mean we merge every patch, because merging means carrying it forever, and sometimes we judge that it is not worth it. And open source does nothing for someone who does not read code, which we know perfectly well, so the interface has to stand on its own.',
        { type: 'h2', text: 'What you can do with it' },
        {
          type: 'ul',
          items: [
            'Read it: no account, no request to join anything',
            'Run your own instance, as long as attribution and the licence notice stay in place',
            'Open an issue with the game record attached when a rule looks wrong, which does more good than complaining elsewhere',
            'Send a patch. We read them, we do not merge all of them'
          ]
        },
        'None of this matters if you only want to play. Open the [play page](/play) and start a match; the repository is there for whoever wants to check. What the team is trying to do is on the [about page](/about).',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Is YiBoard really open source?', a: 'The repository is public and holds the referee, engine, interface and translations, with the licence stated inside it. You can read it without an account.' },
            { q: 'Can I host my own copy?', a: 'Yes, as long as attribution and the licence notice stay in place. We do not offer hosting support, so deployment and uptime are on you.' },
            { q: 'Does publishing the engine make cheating easier?', a: 'It lets players study the engine, but match results are still decided by the server side referee, so reading code cannot alter someone else\u2019s game. The design of that engine layer is described in /blog/open-source-board-engine-ecosystem.' },
            { q: 'If it is free and open, how do you keep going?', a: 'Right now it is a few people\u2019s side project, with no ads and no paywall. /blog/free-is-a-design-choice goes into why, and the [FAQ page](/faq) covers the practical side.' }
          ]
        },
        { type: 'cta', text: 'Play a free game on YiBoard', href: '/play' }
      ]
    }
  },
  {
    slug: 'one-year-of-yiboard',
    date: '2026-10-28',
    tags: ['product', 'community', 'roadmap'],
    title: {
      zh: '一周年回顾与展望',
      en: 'One Year of YiBoard: A Look Back'
    },
    description: {
      zh: '一年下来，YiBoard 从一个棋种长成了一套东西。这篇清点做成了什么、哪些判断错了、以及明年明确不做的事。',
      en: 'A year in, YiBoard went from one game to a set of parts that hold together. What shipped, which calls were wrong, and what we have decided not to build.'
    },
    keywords: ['game anniversary', 'year in review game', 'milestone update', 'what we built', 'yiboard roadmap'],
    content: {
      zh: [
        '一个游戏项目的周年纪念，通常是发一条高光集锦的时刻。我们换个写法：先把判断错的事列出来，再说做成了什么。YiBoard 这一年从"能不能把五子棋跑起来"长成了"换一个棋种要多久"，这两个问题差着整个架构。',
        { type: "h2", text: "这一年做出来的东西" },
        {
          type: 'ul',
          items: [
            '裁判层：判断落子合法性与胜负，对所有棋种通用，换棋种不用重写',
            '浏览器里的 alpha-beta 引擎，单次搜索预算 500 毫秒，不依赖服务器算力',
            '段位与等级分：1200 分起步，六级，一局一结算',
            '五种语言，从第一天就一起上，不是事后补的',
            '观众模式、对局分享链接、键盘操作'
          ]
        },
        '回头看，真正值钱的不是五子棋这个棋种，而是裁判和段位那两层能被复用。加上一个新棋种的工作量，比一年前小了一个数量级。',
        { type: "h2", text: "判断错的地方" },
        {
          type: 'ul',
          items: [
            '以为移动端只是把界面缩小。实际上触屏落子的精度问题逼我们重做了落子确认',
            '低估了翻译的维护成本。界面改一个词，五种语言都要跟上，现在还没完全追平',
            '早期给新手的默认难度偏高，头几周掉了一批人，后来调过一次'
          ]
        },
        { type: "h2", text: "用户实际在用的功能" },
        '用得最多的是不注册直接开一局，这个我们一开始就猜对了。第二是分享对局链接，超出预期，一开始只是当调试工具做的。观众模式的用量比想象中低，但留下来的人看得很久，所以我们继续留着。',
        { type: "h2", text: "明年明确不做的事" },
        {
          type: 'ul',
          items: [
            '不做广告，不做付费墙。棋类游戏的变现压力会把规则设计带偏',
            '不为了凑数加棋种。每加一个都要能复用裁判和段位层，否则宁可不加',
            '不做强制注册。跨设备保存战绩值得注册，下棋本身不值得',
            '不做观战聊天。没有能力做 moderation，就不开这个口子'
          ]
        },
        '路线图上的具体条目在 /blog/go-roadmap，改动的依据大多来自 /blog/iterating-on-user-feedback，性能那几轮的实测数字在 /blog/performance-work。团队和项目的背景写在 [关于页](/about)。',
        { type: "h2", text: "FAQ" },
        {
          type: 'faq',
          items: [
            { q: 'YiBoard 上线多久了？', a: '从第一行代码到现在一年。这一年的主要工作是把裁判层和段位系统做成可以复用的，而不是把单个棋种打磨到极致。' },
            { q: '这一年最大的变化是什么？', a: '换棋种的成本。第一版五子棋花了很长时间，现在加一个新棋种主要是写规则，架构部分已经现成。' },
            { q: '接下来会有哪些棋种？', a: '象棋和围棋在路线图上，具体顺序看 /blog/go-roadmap。我们的原则是不为了凑数量发布。' },
            { q: '一周年会有活动吗？', a: '没有排行榜清零，也没有限定皮肤。周年对玩家这边应该是透明的，照常下棋就行。' }
          ]
        },
        { type: 'cta', text: '在 YiBoard 免费下一局', href: '/play' }
      ],
      en: [
        'A game anniversary is usually the moment a studio posts a montage of its best moments. Let us run it the other way round: the wrong calls first, then what actually shipped. Over this year YiBoard moved from "can we get Gomoku running at all" to "how long does a new game take", and those two questions sit on opposite sides of an architecture. The first question is about one board. The second is about everything underneath it, which is where most of the work went.',
        { type: 'h2', text: 'What got built in year one' },
        {
          type: 'ul',
          items: [
            'The referee layer: legality and win detection written once for every game, so a new board does not mean a rewrite',
            'An alpha-beta engine running in the browser with a 500 ms search budget, which keeps server compute out of the picture',
            'Grades and ratings: everyone starts at 1200, Sixth Grade, settled one game at a time',
            'Five languages shipped together from day one rather than bolted on later',
            'Spectator mode, shareable match links, and full keyboard play'
          ]
        },
        'Looking back, the part that mattered was never Gomoku itself. It was the referee and ranking layers underneath, which carry over. Adding another game now costs an order of magnitude less work than it did a year ago, and that is the single number we watch when deciding what to build next.',
        { type: 'h2', text: 'Calls we got wrong' },
        {
          type: 'ul',
          items: [
            'We treated mobile as a smaller layout. Touch accuracy on stone placement was its own problem and forced a rebuild of move confirmation',
            'We underestimated translation upkeep. One changed interface string touches five languages, and we are still catching up',
            'The starting difficulty was too high for beginners, and we lost people in the first weeks before adjusting it'
          ]
        },
        { type: 'h2', text: 'What people actually use' },
        'Playing without an account is the top path, and we guessed that correctly from the start. Sharing a match link came in second, which surprised us since it began as a debugging feature. Spectator mode sees less traffic than expected, but the people who use it stay for a long time, so it stays.',
        { type: 'h2', text: 'What we have decided not to build' },
        {
          type: 'ul',
          items: [
            'No ads and no paywall. Monetisation pressure on a board game pulls the rules design off centre',
            'No games added for the sake of a bigger list. Each one has to reuse the referee and ranking layers, or it waits',
            'No forced signup. Carrying a record across devices is worth an account; playing a game is not',
            'No spectator chat. If we cannot moderate it, we do not open it'
          ]
        },
        'The concrete roadmap items live in /blog/go-roadmap, most of the changes came out of /blog/iterating-on-user-feedback, and the measured numbers from the performance rounds are in /blog/performance-work. Background on the team and the project is on the [about page](/about).',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'How long has YiBoard been running?', a: 'A year from the first commit. Most of that year went into making the referee and ranking layers reusable rather than polishing one game into perfection.' },
            { q: 'What changed the most this year?', a: 'The cost of adding a game. The first version of Gomoku took a long stretch of work; a new board now mostly means writing its rules, because the structure underneath already exists.' },
            { q: 'Which games come next?', a: 'Xiangqi and Go are on the roadmap, and /blog/go-roadmap has the order. We would rather not ship one just to make the list longer.' },
            { q: 'Is there an anniversary event?', a: 'No rating reset and no limited cosmetics. An anniversary should be invisible to the person who just wants to play.' }
          ]
        },
        { type: 'cta', text: 'Play a free game on YiBoard', href: '/play' }
      ]
    }
  },
];
export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of POSTS) for (const t of p.tags) set.add(t);
  return [...set].sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  return POSTS.filter((p) => p.tags.includes(tag)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}


export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
