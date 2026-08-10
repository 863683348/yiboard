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
      zh: '五子棋 30 秒入门',
      en: 'How to Play Gomoku in 30 Seconds',
    },
    description: {
      zh: '黑白交替落子，五子连线即胜。五子棋规则一句话讲完，但胜负之间全是讲究。这篇带你 30 秒学会，再给你几个立刻能用的开局思路。',
      en: 'Black and white alternate, five in a row wins. The rules of Gomoku fit in one sentence, but the gap between winning and losing is all judgment. Learn it in 30 seconds, then grab a few openings that work now.',
    },
    keywords: ['how to play gomoku', 'gomoku rules', 'five in a row rules', 'gomoku for beginners', 'gomoku openings'],
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
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
