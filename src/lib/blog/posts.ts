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
    slug: "connect-5-omok-vs-gomoku",
    date: "2026-08-17",
    title: {
      zh: "Connect 5 Omok 与 Gomoku 是同一个游戏吗？三个变体的规则差异",
      en: "Connect 5 Omok vs Gomoku: How the Three Names Compare",
    },
    description: {
      zh: "Connect 5、Omok、Gomoku 都指同一种五子棋类游戏，但规则细节（盘大小、禁手、开局）有差异。这篇讲清三者关系，并教你五分钟开始下一局。",
      en: "Connect 5, Omok and Gomoku are three names for the same five-in-a-row family. The rules overlap on 99 percent, but board size, opening move, and forbidden-move variations do differ. Here is the clearest side-by-side, plus you.",
    },
    keywords: ["connect 5 omok vs gomoku", "connect 5 omok", "omok vs gomoku", "gomoku vs connect 5", "five in a row game", "gomoku for beginners"],
    content: {
      zh: [
        "如果搜索“五子棋”相关的游戏，你会撞到至少三个名字：Gomoku（欧美主流叫法）、Omok（韩国与日本“五目並べ”的罗马字）、Connect 5（iOS/移动端常见），甚至还能看到 Caro Five、Wuziqi、5-in-a-row。本篇用一张表把它们讲清。",
        { type: 'h2', text: '三者本质是同一个游戏' },
        "三者规则的核心完全相同：15×15（或 13×13）棋盘，黑白双方轮流落子，先在横、竖、斜任一方向连成五子者获胜。所谓“Gomoku”这个词来自日语“五目並べ”(gomoku narabe)，“Omok”是它在韩语里的简称；Connect 5 是西方对这类游戏的商业命名。本质规则无差异。",
        { type: 'h2', text: '真正的差异：盘大小与开局' },
        "Gomoku 历史上使用 15×15 标准盘，但 13×13、19×19 也都能玩。Connect 5 多见于手机端 App，盘大小常被压到 13×13 或更小，匹配快速对战节奏。开局方面，三者都是黑先，但 Renju（连珠）规则下黑棋有禁手限制，这是后续演化，与本篇对比项无关。",
        {
          type: 'ul',
          items: [
            'Gomoku：15×15 为主，国际通行的竞赛标准',
            'Connect 5：13×13 或 11×11，移动端典型尺寸',
            'Omok：通常 15×15，与 Gomoku 同盘但叫法不同',
            'Renju：15×15 但有禁手（专业玩法，不属于本篇讨论范围）',
          ],
        },
        { type: 'h2', text: '玩法层面没有差异' },
        "无论是哪种叫法，落子规则都是：黑先、白后，每次落一子，先连五者赢。这意味着你在 Gomoku 上练就的“活三”“冲四”战术在 Connect 5、Omok 上同样可用，跨平台切换零成本。",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Connect 5 Omok 和 Gomoku 是同一款游戏吗？', a: '本质规则相同：连五子获胜。差异在盘大小与商业命名（Connect 5 是 iOS 端常用名）。' },
            { q: 'Omok 是五子棋吗？', a: '是。Omok 是 Gomoku（韩语版）的简称，在韩国与日本的休闲玩家中通用。' },
            { q: 'Connect 5 和 Gomoku 哪个更难？', a: '难度取决于对手与盘大小，不取决于名字。规则本质相同。' },
          ],
        },
        { type: 'cta', text: '五分钟免费开局 YiBoard 五子棋', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        "Search for five-in-a-row games and you will hit three names: Gomoku (the default in the West), Omok (Korean and Japanese five-in-a-row romanization), and Connect 5 (the mobile-app branding). This post lines them up and gets you playing in five minutes, plus you.",
        { type: 'h2', text: 'They are the same game at the core' },
        "All three share the same rule: take turns placing stones on a grid, first to align five in a row, column, or diagonal wins. The word Gomoku comes from the Japanese gomoku narabe. Omok is the Korean romanization of the same word. Connect 5 is a Western commercial label for the same family. Rule overlap is about 99 percent.",
        { type: 'h2', text: 'The real differences: board size and openings' },
        "Gomoku historically uses a 15 by 15 board, though 13 by 13 and 19 by 19 work fine. Connect 5 is usually a mobile-app name where 13 by 13 or smaller boards speed up matches. Omok typically uses 15 by 15. All three are black-first, but professional Renju adds forbidden-move rules that are out of scope here.",
        {
          type: 'ul',
          items: [
            'Gomoku: 15 by 15, the international default',
            'Connect 5: 13 by 13 or 11 by 11, typical mobile sizes',
            'Omok: usually 15 by 15, same board as Gomoku',
            'Renju: 15 by 15 with forbidden moves (not in this comparison)',
          ],
        },
        { type: 'h2', text: 'No rule differences at the play level' },
        "Whichever name you search for, the placement and winning rule is identical. That means the open-three and open-four tactics you learn on a Gomoku board transfer 100 percent to Omok or Connect 5, with zero adjustment. The only skill that varies is the opponent.",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Are Connect 5 Omok and Gomoku the same game?', a: 'Same core rule: first to five in a row wins. Differences are mainly board size and commercial branding.' },
            { q: 'Is Omok a kind of Gomoku?', a: 'Yes. Omok is the Korean romanization of Gomoku (the same Japanese-origin word), popular in Korea and Japan.' },
            { q: 'Is Connect 5 harder than Gomoku?', a: 'Difficulty depends on the opponent and board size, not the name. The rules are essentially identical.' },
          ],
        },
        { type: 'cta', text: 'Try Gomoku on YiBoard in your browser', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
{
    slug: "gomoku-vs-omok",
    date: "2026-08-17",
    title: {
      zh: "Gomoku vs Omok：欧美叫法与日韩叫法的同与不同",
      en: "Gomoku vs Omok: Same Game, Different Names",
    },
    description: {
      zh: "Gomoku 在欧美通用，Omok 在日韩通用，但本质规则完全相同。本篇讲清两个叫法的来源、各自的圈层，以及如何在浏览器里直接开局。",
      en: "Gomoku is the Western default. Omok is the Korean and Japanese default. Same game, same rules, different names. Where each name is used, why, and how to start playing today, plus you.",
    },
    keywords: ["gomoku vs omok", "how to play omok", "omok rules", "gomoku omok difference", "five in a row game", "learn omok"],
    content: {
      zh: [
        "Gomoku 是欧美玩家最常用的五子棋名称，Omok 则是日韩玩家的默认叫法。两者其实指同一种游戏，规则没有差异，差异在棋盘叫法、文化圈层与平台覆盖。本篇用一篇文章讲清。",
        { type: 'h2', text: 'Gomoku 与 Omok 的来源' },
        "Gomoku 来自日语“五目並べ”(gomoku narabe)，“五目”意为五个棋子，“並べ”意为排列。它是日本江户时代的家庭棋类游戏，后来随日本文化的国际传播被欧美接受，固定写法为 Gomoku。Omok 是同一个词在韩语中的标准罗马字写法，由汉字词“五目”派生而来，在韩国及部分日本地区与 Gomoku 完全等价使用。",
        { type: 'h2', text: '圈层与平台差异' },
        "名字不同的最大原因不是规则，而是玩家社区。Gomoku 在欧美 AI 引擎讨论、五子棋 Facebook 群组、Gomoku.com（全球最大五子棋独立站）里使用；Omok 在韩国围棋频道、日本“五目並べ”App、韩国棋盘游戏社区里使用。YiBoard 与两者都覆盖，你搜任一关键词都能进入。",
        { type: 'ul', items: [
          '欧美搜索多见 Gomoku、Five in a Row、Five in Line',
          '日韩搜索多见 Omok、オモック、五目並べ',
          '商业 App 命名（Connect 5）偏向移动端',
          '中韩日母语者更可能搜五子棋、오목、五目並べ',
        ] },
        { type: 'h2', text: '规则完全相同' },
        "无论是 Gomoku 还是 Omok，落子规则、胜负判定、棋盘大小都一致。YiBoard 的游戏引擎对所有玩家都是同一套，你在 YiBoard 上练就的战术可直接在任何平台复用。",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Omok 和 Gomoku 哪个先有的？', a: 'Gomoku 来自日语五目並べ，历史可追溯到江户时代；Omok 是韩语对同一词的派生，约 20 世纪通行。两者无先后差异。' },
            { q: 'Omok 和 Gomoku 的 AI 引擎互通吗？', a: '理论上互通，任何 15×15 五子棋 AI 引擎对两种叫法的输入输出都有效，差别在用户界面文字。' },
            { q: '在中国玩五子棋该搜哪个？', a: '中文用户直接搜五子棋或五子连珠。YiBoard 支持中文界面与五子棋内容。' },
          ],
        },
        { type: 'cta', text: '现在就在浏览器里免费开局五子棋', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        "Gomoku is the default name in the West. Omok is the default name in Korea and Japan. Same game, same rules, same board. The difference is cultural naming, not play. Here is where each name comes from, where each is used, and how to play today, plus you.",
        { type: 'h2', text: 'Where the two names come from' },
        "Gomoku comes from the Japanese gomoku narabe, where gomoku means five stones and narabe means line them up. The game spread to the West via Japanese cultural exports and stuck as Gomoku. Omok is the standard Korean romanization of the same Japanese word and is used interchangeably in Korea and parts of Japan.",
        { type: 'h2', text: 'Where each name shows up' },
        "The split is mostly about community, not rule. Gomoku dominates English-language AI engine discussions, Facebook groups, and Gomoku.com. Omok dominates Korean board game channels, Japanese five-in-a-row apps, and Korean go communities. YiBoard covers both, so searching either term gets you to the same game.",
        {
          type: 'ul',
          items: [
            'English search: Gomoku, Five in a Row, Five in Line',
            'Korean and Japanese search: Omok, オモック, 五目並べ',
            'Mobile app branding: Connect 5 (mostly iOS and Android)',
            'Chinese search: 五子棋, 五子连珠',
          ],
        },
        { type: 'h2', text: 'Zero rule differences' },
        "Placements, win conditions, and board size are identical. The YiBoard game engine treats every player the same regardless of which search term brought them in.",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Did Omok or Gomoku come first?', a: 'Gomoku narabe dates to Edo-period Japan (17th-19th century). Omok is the Korean romanization that became standard in the 20th century. No earlier or later, same word, two spellings.' },
            { q: 'Are Omok and Gomoku AI engines interchangeable?', a: 'Yes. Any 15 by 15 five-in-a-row engine handles both. The user interface is the only thing that differs.' },
            { q: 'Which search term should I use in China?', a: 'Chinese players search 五子棋 or 五子连珠. YiBoard supports Chinese UI natively.' },
          ],
        },
        { type: 'cta', text: 'Open the YiBoard Gomoku board and play in 30 seconds', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
{
    slug: "gomoku-vs-connect-4",
    date: "2026-08-17",
    title: {
      zh: "Gomoku vs Connect 4：规则、胜负判定与策略差异",
      en: "Gomoku vs Connect 4: Rules, Win Conditions, and Strategy Compared",
    },
    description: {
      zh: "Gomoku（五子棋）与 Connect 4（四连棋）是两款常被新手搞混的“连子游戏”。本篇对比规则、棋盘、玩法与策略，附 YiBoard 快速开局链接。",
      en: "Gomoku and Connect 4 are the two games new players confuse most. Both involve lining up pieces, but the rules differ on board size, gravity, win length, and strategy. Side by side here, plus a link to try Gomoku now.",
    },
    keywords: ["gomoku vs connect 4", "connect 4 vs gomoku", "five in a row vs four in a row", "connect four game rules", "board game comparison", "gomoku for beginners"],
    content: {
      zh: [
        "Gomoku（五子棋）与 Connect 4（四连棋）都是“把棋子连成一条线获胜”的游戏，但胜负线长度、棋盘大小、是否受重力影响都不同。本篇把核心差异一列列出来。",
        { type: 'h2', text: '核心差异一览' },
        "Gomoku 在 15×15 棋盘上，黑白双方在任意空格落子（不受重力），先连成五子获胜。Connect 4 在 7×6 立式棋盘上，受重力影响（棋子必须从上方落入，落到最低空格），先连成四子获胜。两者听起来相似，但策略空间差别巨大：重力机制让 Connect 4 的走法空间远比 Gomoku 小，AI 引擎能在毫秒内算完所有变化。",
        {
          type: 'ul',
          items: [
            'Gomoku：15×15 棋盘，连五获胜，无重力',
            'Connect 4：7×6 立式棋盘，连四获胜，有重力',
            'Gomoku AI：α-β 剪枝 + 置换表，专业级很强',
            'Connect 4 AI：1988 年已被数学家 Allis 完全破解',
          ],
        },
        { type: 'h2', text: '规则详解' },
        "Gomoku：黑先白后，双方轮流在任意空格落子，先在横、竖、斜任一方向连成五子者获胜（无禁手版本）。Connect 4：红先黄后（或黑先白后，因厂商而异），从棋盘顶部空格放入棋子（重力使其落到最低），先在横、竖、斜任一方向连成四子者获胜。",
        { type: 'h2', text: '策略差异：开放 vs 重力' },
        "Gomoku 的棋盘是平的，每一步都有 225 个落子点（15×15），策略围绕“形”（活三、冲四、活四）展开。Connect 4 因为重力限制，每列最多 6 个棋子，且只能从底部向上叠，AI 几乎能完全算清。Gomoku 更开放、变化更多，因此职业玩家群远大于 Connect 4。",
        { type: 'h2', text: '新手该从哪个开始？' },
        "Gomoku 规则简单（连五获胜）、上手即玩，YiBoard 浏览器直接开局；Connect 4 在 Hasbro 实体产品中更常见。如果你想要“开放可玩、随时上线对战”的体验，Gomoku 是更好的选择。如果你喜欢“快速决策、看 AI 怎么算”的体验，Connect 4 也有乐趣。",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Gomoku 和 Connect 4 哪个更难？', a: 'Gomoku 因开放棋盘（225 个落子点）比 Connect 4 复杂得多，Connect 4 已被数学证明 AI 必胜。' },
            { q: 'Connect 4 是五子棋吗？', a: '不是。Connect 4 是连四获胜，Gomoku 是连五获胜，规则本质不同。' },
            { q: '新手玩 Gomoku 还是 Connect 4？', a: '两者规则都简单。Gomoku 策略深度大，适合长期投入；Connect 4 一局短（5 分钟内），适合碎片时间。' },
          ],
        },
        { type: 'cta', text: '现在就在 YiBoard 免费开局 Gomoku', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        "Gomoku and Connect 4 are the two games new players mix up most often. Both reward lining up pieces, but the rules differ on board size, gravity, win length, and strategy. Here is the cleanest side-by-side, plus a fast path to play Gomoku right now.",
        { type: 'h2', text: 'The five core differences' },
        "Gomoku plays on a 15 by 15 board with no gravity: any empty intersection is legal. First to align five stones in a row, column, or diagonal wins. Connect 4 plays on a 7 by 6 vertical board with gravity: pieces fall to the lowest empty cell in the chosen column. First to align four pieces wins. The gravity rule shrinks the branching factor so dramatically that Connect 4 was solved by computer scientists in 1988, while Gomoku (without forbidden-move rules) remains open.",
        {
          type: 'ul',
          items: [
            'Gomoku: 15 by 15, five in a row, no gravity',
            'Connect 4: 7 by 6 vertical, four in a row, with gravity',
            'Gomoku AI: alpha-beta with transposition tables, very strong',
            'Connect 4 AI: solved since 1988 (first player wins with perfect play)',
          ],
        },
        { type: 'h2', text: 'Rule detail' },
        "Gomoku: black moves first, then white. Each turn a player places one stone on any empty intersection. First to align five in any row, column, or diagonal wins (assuming no Renju forbidden moves). Connect 4: red (or black, by manufacturer) moves first, the other color follows. Each turn a player drops a piece into one of the seven columns; the piece falls to the lowest empty row. First to align four in any row, column, or diagonal wins.",
        { type: 'h2', text: 'Strategy difference: open vs gravity' },
        "Gomoku has 225 open intersections per turn and a branching factor that makes full search intractable. Strategy lives in shapes (open three, open four, blocked four). Connect 4 collapses the branching factor because of gravity, which is why it was solved decades ago. If you want open-ended play with deep strategy, Gomoku is the better choice. If you want short, sharp decision-making, Connect 4 is satisfying too.",
        { type: 'h2', text: 'Which one to start with' },
        "Gomoku rules take 30 seconds to learn, no installation needed, and YiBoard lets you play in your browser immediately. Connect 4 is most familiar as a Hasbro tabletop product. Both are beginner-friendly. Gomoku is the right pick if you want a long-running skill curve and online opponents. Connect 4 is the right pick if you want a five-minute decision puzzle.",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Is Gomoku harder than Connect 4?', a: 'Yes. Gomoku has 225 open intersections per turn and unsolved endgame; Connect 4 was solved by Allis in 1988 with first-player-win proof.' },
            { q: 'Is Connect 4 a kind of Gomoku?', a: 'No. Connect 4 wins on four in a row. Gomoku wins on five in a row. The win condition is the defining difference.' },
            { q: 'Which is better for a beginner?', a: 'Both have trivial rules. Pick Gomoku if you want online play and a long skill curve. Pick Connect 4 if you want short matches and an AI you can fully solve.' },
          ],
        },
        { type: 'cta', text: 'Open the YiBoard Gomoku board and play in 30 seconds', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
{
    slug: "gomoku-vs-tic-tac-toe",
    date: "2026-08-17",
    title: {
      zh: "Gomoku vs Tic-Tac-Toe：五子棋与井字棋的规则和策略对比",
      en: "Gomoku vs Tic-Tac-Toe: Rules and Strategy Compared",
    },
    description: {
      zh: "五子棋与井字棋都要求连成一条线获胜，但棋盘大小、连线长度与策略深度完全不同。本文对比两者规则与玩法，带你快速上手五子棋。",
      en: "Gomoku and Tic-Tac-Toe both reward lining up pieces, but the board size, win length, and strategic depth could not be more different. Compare the rules side by side and start playing gomoku today.",
    },
    keywords: ["gomoku vs tic tac toe", "tic tac toe vs gomoku", "five in a row vs tic tac toe", "gomoku strategy", "tic tac toe rules", "gomoku for beginners"],
    content: {
      zh: [
        "Tic-Tac-Toe（井字棋/圈叉棋）和 Gomoku（五子棋）都是“先连成一线者胜”的抽象策略游戏，但两者在棋盘规模、获胜线长度和策略深度上差异巨大。本篇讲清它们的关系，并教你用五分钟学会更有深度的五子棋。",
        { type: 'h2', text: '核心差异一览' },
        "井字棋用 3×3 棋盘，双方轮流在格子里画 X/O，先横向、竖向或斜向连成三子者胜。因为棋盘极小、变化有限，井字棋已被完全解出，只要双方不犯错，结果必然是平局。五子棋用 15×15 棋盘，轮流落子，先连成五子者胜，变化数以百万计，远未解出。",
        {
          type: 'ul',
          items: [
            'Tic-Tac-Toe：3×3 棋盘，连三获胜，已被完全解出',
            'Gomoku：15×15 棋盘，连五获胜，仍未被解出',
            'Tic-Tac-Toe：约 2.5 万种可能对局',
            'Gomoku：分支因子极大，AI 仍需启发式搜索',
          ],
        },
        { type: 'h2', text: '为什么五子棋比井字棋难得多' },
        "井字棋第一步只有 9 个选择，且很快进入强制平局线。五子棋第一步有 225 个落子点，棋形（活三、冲四、活四、双活三等）构成无限组合。井字棋是“学会即精通”的游戏，五子棋则是“学会五分钟、精通一生”的游戏，这正是 YiBoard 选它做入口棋种的原因。",
        { type: 'h2', text: '新手从哪个开始' },
        "如果你从未玩过连子游戏，井字棋是零成本的概念入门；但如果你想体验真正的策略深度、在线对战和段位成长，五子棋是更好的选择，规则 30 秒学会，策略足够吃一辈子。",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Tic-Tac-Toe 和 Gomoku 是同一个游戏吗？', a: '不是。井字棋 3×3 连三胜，五子棋 15×15 连五胜。只是同属“连子”家族。' },
            { q: 'Tic-Tac-Toe 为什么总是平局？', a: '因为棋盘只有 3×3，双方只要不犯错，先手无法强制获胜，最优对局必然是平局。' },
            { q: 'Gomoku 有平局吗？', a: '理论上有（棋盘填满无人连五），但实际几乎不会发生，因为 15×15 棋盘极大。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 免费开始你的第一局五子棋', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        "Tic-Tac-Toe and Gomoku belong to the same family of alignment games, yet they could not be more different in scale. Tic-Tac-Toe is solved, tiny, and always a draw between perfect players. Gomoku is open, deep, and still unsolved. Here is the comparison, plus a fast path to playing gomoku.",
        { type: 'h2', text: 'The core differences' },
        "Tic-Tac-Toe plays on a 3 by 3 grid. Players mark X and O in empty cells, and the first to align three in a row, column, or diagonal wins. The game is solved: perfect play always ends in a draw. Gomoku plays on a 15 by 15 board, first to align five stones wins, and the game is far from solved, the branching factor is enormous and engines still rely on heuristic search.",
        {
          type: 'ul',
          items: [
            'Tic-Tac-Toe: 3 by 3 grid, three in a row wins, fully solved',
            'Gomoku: 15 by 15 board, five in a row wins, unsolved',
            'Tic-Tac-Toe: about 255,000 possible games',
            'Gomoku: enormous branching factor, deep search required',
          ],
        },
        { type: 'h2', text: 'Why Gomoku is far deeper' },
        "Tic-Tac-Toe has at most 9 opening moves and quickly converges to the forced-draw line. Gomoku has 225 opening points, and shapes like open threes, open fours, and double threats create unbounded combinations. Tic-Tac-Toe is a learn-in-a-minute, master-in-a-minute game. Gomoku takes five minutes to learn and a lifetime to master, exactly why YiBoard chose it as the entry game.",
        { type: 'h2', text: 'Which to start with' },
        "If you have never played an alignment game, Tic-Tac-Toe is a zero-cost conceptual primer. If you want real strategic depth, online opponents, and a rank ladder, Gomoku wins outright: rules in 30 seconds, depth for life.",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Are Tic-Tac-Toe and Gomoku the same game?', a: 'No. Tic-Tac-Toe is 3 by 3 with three in a row winning. Gomoku is 15 by 15 with five in a row winning. They only share the alignment family.' },
            { q: 'Why does Tic-Tac-Toe always end in a draw?', a: 'The 3 by 3 grid is too small for the first player to force a win; with perfect play the best outcome is always a draw.' },
            { q: 'Can Gomoku end in a draw?', a: 'Theoretically yes, if the board fills with no five in a row, but with a 15 by 15 board this almost never happens in practice.' },
          ],
        },
        { type: 'cta', text: 'Start your first Gomoku game on YiBoard free', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
{
    slug: "gomoku-vs-othello",
    date: "2026-08-17",
    title: {
      zh: "Gomoku vs Othello：五子棋与黑白棋，哪个更适合你",
      en: "Gomoku vs Othello: Which Alignment Game Fits You",
    },
    description: {
      zh: "五子棋与黑白棋（Reversi/Othello）是两种风格迥异的经典策略游戏。本篇对比规则、学习曲线与策略深度，帮你决定先玩哪个。",
      en: "Gomoku and Othello (Reversi) are two classic strategy games with very different feels. Compare rules, learning curve, and depth here, and decide which to try first, with a link to play gomoku free now.",
    },
    keywords: ["gomoku vs othello", "othello vs gomoku", "reversi vs gomoku", "gomoku or othello", "board game comparison", "gomoku strategy"],
    content: {
      zh: [
        "Othello（黑白棋/奥赛罗，经典桌游版称 Reversi 翻转棋）和 Gomoku（五子棋）常被放在一起比较，因为两者都有黑白色棋子、都在方盘上玩。但它们的核心机制完全不同：五子棋是“连子”，黑白棋是“翻子”。本篇讲清差异。",
        { type: 'h2', text: '核心机制完全不同' },
        "五子棋的目标是让自己的棋子先连成五子；黑白棋的目标是终局时自己颜色的棋子更多。黑白棋的关键动作是“夹住”，落子在一条直线上夹住对方棋子，把被夹的棋子翻成自己的颜色。规则 2 分钟学会，但“争先、翻子、控制角”的策略非常深。",
        {
          type: 'ul',
          items: [
            'Gomoku：连五获胜，落子即定，棋子不动',
            'Othello：终局比数量，落子可翻转对方棋子',
            'Gomoku：15×15 棋盘，225 个落子点',
            'Othello：8×8 棋盘，64 格，开局四子交叉',
          ],
        },
        { type: 'h2', text: '学习曲线与受众' },
        "五子棋规则 30 秒学会，战术（活三、冲四）直观，适合休闲玩家和家庭对战，也适合作为入门棋种。黑白棋规则同样简单，但“翻转”机制让新手常陷入“吃子越多反而越被动”的陷阱，需要更深的局面判断。两者都值得玩，如果你想要在线对战和段位系统，YiBoard 的五子棋是最好的起点。",
        { type: 'h2', text: '哪个更适合你' },
        "想快速上手、直观进攻、边玩边聊，选五子棋。喜欢“计算终局、把控全局、翻转翻盘”的智斗感，选黑白棋。两者互补，不冲突。",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Othello 和 Gomoku 哪个更难？', a: '都易学难精。黑白棋的“翻转”机制需要更深的终局计算；五子棋的连五策略更直观。难度取决于你想投入多深。' },
            { q: 'Othello 的“翻转”是什么意思？', a: '当你在一条直线上用自己的棋子夹住对方棋子时，被夹的对方棋子翻转为你的颜色，这是黑白棋最独特的机制。' },
            { q: '新手该玩 Gomoku 还是 Othello？', a: '想快速上手和在线对战选 Gomoku（YiBoard 免费开局）；喜欢终局智斗选 Othello。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 免费开始你的第一局五子棋', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        "Othello (marketed as Reversi in classic board-game editions) and Gomoku are often compared because both use black and white stones on a square board. The mechanics, however, are completely different: Gomoku is about alignment, Othello is about flipping. Here is the side-by-side.",
        { type: 'h2', text: 'Completely different core mechanics' },
        "Gomoku: the goal is to be the first to align five stones in a row. Stones never move once placed. Othello: the goal is to have more stones of your color when the board is full. The key action is outflanking, you place a stone that sandwiches the stones of the opponent on a line, flipping them to your color. Rules take two minutes to learn, but corner control and endgame counting run deep.",
        {
          type: 'ul',
          items: [
            'Gomoku: five in a row wins, stones are fixed',
            'Othello: majority at the end wins, stones flip',
            'Gomoku: 15 by 15 board, 225 intersections',
            'Othello: 8 by 8 board, 64 squares, four stones to start',
          ],
        },
        { type: 'h2', text: 'Learning curve and audience' },
        "Gomoku rules take 30 seconds to learn and tactics like open threes and open fours are intuitive, great for casual and family play, and as an entry game. Othello rules are equally simple, but the flipping mechanic tempts beginners into the classic trap of eating stones while losing position. Both are worth playing. If you want online opponents and a rank system, the Gomoku of YiBoard is the best on-ramp.",
        { type: 'h2', text: 'Which fits you' },
        "Want to learn fast, attack intuitively, and chat while you play? Pick Gomoku. Love endgame counting, global control, and comeback flips? Pick Othello. They complement each other, so you do not have to choose one forever.",
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Which is harder, Othello or Gomoku?', a: 'Both are easy to learn and hard to master. Othello demands deeper endgame calculation because of flipping. The alignment tactics of Gomoku are more intuitive. It depends how deep you want to go.' },
            { q: 'What does flipping mean in Othello?', a: 'When you place a stone that sandwiches the stones of the opponent on a line, those stones flip to your color, the signature mechanic of Othello.' },
            { q: 'Should a beginner play Gomoku or Othello?', a: 'Pick Gomoku for instant play and online matches (free on YiBoard). Pick Othello if you love endgame mind games.' },
          ],
        },
        { type: 'cta', text: 'Start your first Gomoku game on YiBoard free', href: 'https://yiboardgame.com/play' },
      ],
    },
  }
];

(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
