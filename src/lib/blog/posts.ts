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
  {
    slug: 'gomoku-openings',
    date: '2026-08-12',
    title: {
      zh: '五子棋开局：决定胜负的前三手',
      en: 'Gomoku Openings: The First Three Stones That Decide the Game',
    },
    description: {
      zh: '五子棋前三手基本定调。本文讲清直指/斜指两大开局族、花月浦月等经典定式，以及为什么先手要抢中心。',
      en: 'The first three moves set the tone in Gomoku. This guide covers the direct and oblique opening families, classic joseki like Pomegranate and Po, and why first move takes the center.',
    },
    keywords: ['gomoku openings', 'gomoku opening theory', 'pomegranate opening', 'gomoku joseki', 'five in a row strategy'],
    content: {
      zh: [
        '很多人以为五子棋随便下就行，但高水平对局里，前三手几乎就决定了走向。先手（黑棋）如果开局就抢到好形，后手要花很多步才能扳回来。这篇带你过一遍开局的基本逻辑。打开[yiboardgame.com 的对战页](/play)边读边试最好。',
        { type: 'h2', text: '先手为什么要抢中心' },
        '棋盘中心的点辐射范围最大，一个中心子能参与横、竖、两条斜线共四条连线，而角落的点只能参与两条。所以黑棋第一手几乎总是落在天元（正中心）附近。抢到中心，等于抢到更多"潜在的五连"。',
        { type: 'h2', text: '两大开局族：直指与斜指' },
        '以黑棋第一手为基准，白棋的应法分成两大族：straight（直指，白棋落在与第一手同一条横/竖线）和 oblique（斜指，白棋落在斜线方向）。这两族各自发展出一套定式。',
        {
          type: 'ul',
          items: [
            '花月（Pomegranate）：黑棋强势开局，先手优势极大',
            '浦月（Poseidon）：同样偏向黑棋的进攻型定式',
            '其他如云月、雨月，偏向更均衡的变化',
          ],
        },
        { type: 'h2', text: '新手怎么练开局' },
        '不用背完所有定式。先从"抢中心、保持活二以上的发展点、别让自己的形被白棋轻易堵死"三件事做起。想系统学，我们的[棋型详解](/blog/gomoku-shapes)讲清活三冲四这些基础语言。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '五子棋第一手一定要下中心吗？', a: '高水平几乎都下中心，因为辐射最广。休闲对局下别处也能玩，只是先手优势会变小。' },
            { q: '花月和浦月有什么区别？', a: '两者都是黑棋进攻型开局，分支点不同，但共同点是都给黑棋很大先手优势。' },
            { q: '需要背定式才能赢吗？', a: '不需要。理解"活二、活三、冲四"这些基础棋型，比死背定式更实用。' },
          ],
        },
        { type: 'cta', text: '去 YiBoard 用开局试试手感', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Many players think Gomoku is just placing stones anywhere, but at high level the first three moves decide almost everything. If black grabs a good shape early, white spends many moves clawing back. This guide walks the basic logic of openings. Best read while playing on the [YiBoard play page](/play).',
        { type: 'h2', text: 'Why first move takes the center' },
        'A center stone touches the most lines: it can join four potential fives, horizontal, vertical and both diagonals, while a corner stone only joins two. That is why black almost always opens near tengen, the exact middle. The center means more possible winning lines.',
        { type: 'h2', text: 'Two opening families: direct and oblique' },
        'From black\u2019s first stone, white\u2019s reply splits into two families: straight (white answers on the same row or column) and oblique (white answers on a diagonal). Each family grows its own set of joseki.',
        {
          type: 'ul',
          items: [
            'Pomegranate (Huayue): an aggressive black opening with a huge first-move edge',
            'Poseidon (Puyue): another attack-minded shape favoring black',
            'Others like Yunyue and Yuyue lean toward more balanced play',
          ],
        },
        { type: 'h2', text: 'How a beginner should practice openings' },
        'You do not need every joseki memorized. Start with three habits: take the center, keep at least a live two developing, and do not let white block your shape for free. For the building blocks, our [shapes guide](/blog/gomoku-shapes) explains live threes and fours.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Must the first move be the center?', a: 'At serious level yes, because it reaches the most lines. Casual games elsewhere still work, just with a smaller first-move edge.' },
            { q: 'What is the difference between Pomegranate and Poseidon?', a: 'Both are attack openings for black with different branch points, but both give black a large advantage.' },
            { q: 'Do I need joseki to win?', a: 'No. Understanding live twos, live threes and fours beats rote memorization.' },
          ],
        },
        { type: 'cta', text: 'Try openings on YiBoard right now', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'gomoku-shapes',
    date: '2026-08-12',
    title: {
      zh: '五子棋棋型详解：活三、冲四、双三',
      en: 'Gomoku Shapes Explained: Live Three, Four, Double Three',
    },
    description: {
      zh: '活三、冲四、活四、双三、双四——这些是五子棋的"攻防语言"。看懂棋型，你才看得懂自己和对手在威胁什么。',
      en: 'Live three, four, open four, double three, double four: this is the attacking and defending language of Gomoku. Read shapes and you can see what both sides are threatening.',
    },
    keywords: ['gomoku shapes', 'live three gomoku', 'open four gomoku', 'double three gomoku', 'gomoku tactics'],
    content: {
      zh: [
        '规则一句话就说完，但为什么有人总能赢？差别在于"棋型"——双方棋子的几何关系。一旦你学会用棋型的眼睛看棋盘，五子棋就从连连看变成了一场攻防对话。先在[yiboardgame.com 免费来一局](/play)感受一下。',
        { type: 'h2', text: '什么是活三' },
        '活三是指再落一子就能变成活四的三（两端都空、对方无法同时堵住两个方向）。活三是进攻的核心，因为它逼对手必须回应。相对的"眠三"只有一端能发展，威胁小很多。',
        { type: 'h2', text: '冲四与活四' },
        '冲四是再落一子成五、但只有一端空的四（对手必须堵那一个口，否则就输）。活四是两端都空的四，对手堵不住，必胜。所以"做出活四"是赢棋的最直接路径；"连续冲四"（VCF）是用一连串冲四逼对手走向失败的高级手段。',
        {
          type: 'ul',
          items: [
            '活三：两头空，逼对手回应',
            '冲四：一头空，对手必须堵',
            '活四：两头空，必胜',
            '双三 / 双四：同时两个威胁，对手一次只能堵一个',
          ],
        },
        { type: 'h2', text: '防守也是棋型' },
        '防守时你要找的不只是"堵哪里"，而是"堵了之后对手还能不能做出活三"。好的防守会同时削弱对方的形、保住自己的发展点。更多开局思路看[开局篇](/blog/gomoku-openings)。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '活三和眠三有什么不同？', a: '活三两端都空，下一手能成活四；眠三只有一端能发展，威胁小。' },
            { q: '为什么活四必胜？', a: '活四两头都能成五，对手一次只能落一子，堵一头另一头就成五。' },
            { q: 'VCF 是什么？', a: '连续冲四胜（Victory by Continuous Fours）：用一串冲四一步步逼对手，最后成五。' },
          ],
        },
        { type: 'cta', text: '在 YiBoard 练习读棋型', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'The rules take one sentence, so why does someone always win? The difference is shapes, the geometry between the stones. Once you learn to read the board in shapes, Gomoku stops being a connect-the-dots game and becomes a conversation of attack and defense. Feel it on a [free match at yiboardgame.com](/play).',
        { type: 'h2', text: 'What a live three is' },
        'A live three is a line of three with both ends open, so one more stone makes a live four the opponent cannot block on both sides. The live three is the core of attack because it forces a reply. A broken three has only one open end and is far less threatening.',
        { type: 'h2', text: 'Four and open four' },
        'A four is a line of four that becomes five with one stone but has only one open end; the opponent must block that one gap or lose. An open four has both ends open and is unstoppable. So making an open four is the most direct path to a win, and a chain of fours, VCF, is the advanced way to drive the opponent to defeat.',
        {
          type: 'ul',
          items: [
            'Live three: both ends open, forces a reply',
            'Four: one open end, opponent must block',
            'Open four: both ends open, wins',
            'Double three or double four: two threats at once, opponent blocks only one',
          ],
        },
        { type: 'h2', text: 'Defense is shapes too' },
        'On defense you are not just picking where to block, but whether your block still lets the opponent build a live three. Good defense weakens their shape while keeping your own options. For opening ideas see the [openings guide](/blog/gomoku-openings).',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'What is the difference between a live and broken three?', a: 'A live three has both ends open and becomes a live four next move; a broken three develops on one end only and is weaker.' },
            { q: 'Why is an open four unstoppable?', a: 'Both ends can become five, and the opponent places only one stone, so blocking one end leaves the other.' },
            { q: 'What is VCF?', a: 'Victory by Continuous Fours: a run of fours that pushes the opponent step by step until five connects.' },
          ],
        },
        { type: 'cta', text: 'Practice reading shapes on YiBoard', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'gomoku-attack-defense',
    date: '2026-08-12',
    title: {
      zh: '五子棋攻防：高手到底在想什么',
      en: 'Gomoku Attack and Defense: How Strong Players Actually Think',
    },
    description: {
      zh: '高手不是算得比你远，而是每一步都在管理"威胁"。本文讲清进攻节奏、防守选择，以及先手（sente）的重要性。',
      en: 'Strong players do not calculate farther than you, they manage threats every move. This piece covers attacking tempo, defensive choices, and why sente matters.',
    },
    keywords: ['gomoku attack defense', 'gomoku defense', 'gomoku strategy', 'how to win gomoku'],
    content: {
      zh: [
        '新手看五子棋想的是"我下哪能连五"；高手想的是"我这手制造了几个威胁、对手能化解几个"。这篇把攻防的底层思维拆开。直接在[yiboardgame.com 对战](/play)里体会最直观。',
        { type: 'h2', text: '威胁管理' },
        '每一手棋的价值，取决于它制造了多少"对手必须回应"的威胁。一个活三是一个威胁，双三就是两个同时的威胁——对手一次只能堵一个，所以双三常常直接通向胜利。进攻的本质，就是不断叠加威胁。',
        { type: 'h2', text: '先手 sente' },
        '先手（sente）是指"轮到对方必须防守"的状态。你打出活三，对方被迫堵，你就拿着先手。高手的标志是尽量别把先手交出去：能用进攻逼对手防守，就不要自己先去防守。',
        {
          type: 'ul',
          items: [
            '进攻时优先做活三、冲四，保持先手',
            '防守时选"堵了还能反将一军"的点，而不是随便堵',
            '别为了堵一个眠三，放弃自己的活二发展',
          ],
        },
        { type: 'h2', text: '防守的层次' },
        '最差的防守是"哪里有子堵哪里"。好防守会预判对手下一步要做什么活三，提前占住那个发展点。想系统练，先搞懂[棋型语言](/blog/gomoku-shapes)。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '为什么我总是被动防守？', a: '因为你多在"堵已有威胁"，而不是"主动制造威胁"。试着每手都做一个活三或冲四。' },
            { q: 'sente 是什么？', a: '先手：轮到对方必须应对你制造威胁的状态。保持先手是高手的核心能力。' },
            { q: '防守应该堵哪？', a: '堵"对手下一步能做成活三"的点，而不是离你最近的子。' },
          ],
        },
        { type: 'cta', text: '去 YiBoard 练攻防节奏', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Beginners wonder where they can make five; strong players wonder how many threats a move creates and how many the opponent can answer. This breaks the底层 thinking of attack and defense. The most direct feel comes from a [match at yiboardgame.com](/play).',
        { type: 'h2', text: 'Threat management' },
        'The value of a move is how many must-answer threats it creates. A live three is one threat; a double three is two at once, and the opponent blocks only one, so a double three often wins outright. Attack is simply stacking threats.',
        { type: 'h2', text: 'Sente, the initiative' },
        'Sente is the state where it is the opponent\u2019s turn to defend. You play a live three, they must block, you hold sente. The mark of a strong player is not giving it away: attack to force defense rather than defending first.',
        {
          type: 'ul',
          items: [
            'On attack, prefer live threes and fours to keep sente',
            'On defense, pick the point that still counter-attacks, not just any block',
            'Do not abandon your own live two to block a weak broken three',
          ],
        },
        { type: 'h2', text: 'Layers of defense' },
        'The worst defense blocks wherever a stone is. Good defense predicts the opponent\u2019s next live three and takes that development point early. To train systematically, learn the [shape language](/blog/gomoku-shapes) first.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Why am I always defending?', a: 'Because you block existing threats instead of making your own. Try creating a live three or four every move.' },
            { q: 'What is sente?', a: 'The initiative: the opponent must answer your threat. Holding sente is a core strong-player skill.' },
            { q: 'Where should I block?', a: 'Block the point where the opponent would make a live three next, not the stone nearest you.' },
          ],
        },
        { type: 'cta', text: 'Train attack and defense on YiBoard', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'how-to-win-gomoku',
    date: '2026-08-12',
    title: {
      zh: '怎么赢五子棋：一份实战清单',
      en: 'How to Win at Gomoku: A Practical Checklist',
    },
    description: {
      zh: '从抢中心到做活四，七个能立刻用上的动作。附"为什么你总输给 AI"的诊断。',
      en: 'Seven moves you can use right now, from taking the center to building an open four, plus a diagnosis of why you keep losing to the AI.',
    },
    keywords: ['how to win gomoku', 'gomoku winning strategy', 'gomoku tips', 'beat gomoku ai'],
    content: {
      zh: [
        '想赢五子棋，不需要天才，需要纪律。下面七条都是立刻能用、而且和段位高低无关的动作。边看边在[yiboardgame.com 对战](/play)试最有效。',
        {
          type: 'ul',
          items: [
            '第一手抢中心，辐射最多连线',
            '每手尽量做一个活三或冲四，保持先手',
            '优先做活四（必胜），而不是急着连五',
            '看到对手活三，立刻堵它的发展点',
            '用双三、双四同时制造两个威胁',
            '别为了堵一个弱形，放弃自己的发展',
            '残局算清"连续冲四"（VCF）能不能成五',
          ],
        },
        { type: 'h2', text: '为什么你总输给 AI' },
        'YiBoard 的 AI 在浏览器里跑 alpha-beta 剪枝，500ms 内搜很多层。它不会漏看你的活三，也不会随便交出先手。你输，往往是因为某一手把先手交出去了，或者堵错了点。放慢一拍，先问"我这手制造了几个威胁"。',
        { type: 'h2', text: '一个常见错误' },
        '很多人急着"连五"，结果下出冲四被轻松堵住，还把先手送了。记住：冲四只是逼对手堵，真正赢靠活四或双威胁。更多攻防思路看[攻防篇](/blog/gomoku-attack-defense)。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '新手最快的提升是什么？', a: '每手都做一个活三或冲四，保持先手。这一条比记定式管用。' },
            { q: 'AI 为什么这么难赢？', a: '它不漏看威胁、不送先手。你要把自己当成也在管理威胁，而不是只想连五。' },
            { q: '双三一定赢吗？', a: '不一定，但两个同时威胁对手一次只能堵一个，胜率很高。注意 Renju 规则下黑棋双三是禁手。' },
          ],
        },
        { type: 'cta', text: '用这份清单去赢一局', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'Winning Gomoku takes discipline, not genius. The seven moves below work immediately and do not depend on your rank. Best tried while playing a [match at yiboardgame.com](/play).',
        {
          type: 'ul',
          items: [
            'Take the center first move for the most lines',
            'Make a live three or four each move to keep sente',
            'Build an open four (winning) instead of rushing five',
            'Block the opponent\u2019s live three at its development point',
            'Use double three or double four for two threats at once',
            'Do not abandon your own development to block a weak shape',
            'In the endgame, check if VCF can reach five',
          ],
        },
        { type: 'h2', text: 'Why you keep losing to the AI' },
        'YiBoard\u2019s AI runs alpha-beta pruning in the browser, searching many layers within 500ms. It will not miss your live three and will not give up sente. You usually lose because one move hands over the initiative or blocks the wrong point. Pause a beat and ask how many threats your move makes.',
        { type: 'h2', text: 'One common mistake' },
        'Many players rush to five, play a four that is easily blocked, and hand over sente. Remember: a four only forces a block; the win comes from an open four or a double threat. More on this in the [attack and defense guide](/blog/gomoku-attack-defense).',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'What is the fastest beginner gain?', a: 'Make a live three or four every move to hold sente. More useful than memorizing joseki.' },
            { q: 'Why is the AI so hard to beat?', a: 'It misses no threats and gives no sente. Treat yourself as managing threats, not just making five.' },
            { q: 'Does a double three always win?', a: 'Not always, but two simultaneous threats beat one block, so the win rate is high. Note black\u2019s double three is forbidden under Renju rules.' },
          ],
        },
        { type: 'cta', text: 'Use this checklist and win a game', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
    slug: 'is-gomoku-solved',
    date: '2026-08-12',
    title: {
      zh: '"五子棋被破解了吗"：已解决到底是什么意思',
      en: 'Is Gomoku Solved? What "Solved" Really Means',
    },
    description: {
      zh: '无禁手五子棋在数学上已被证明先手必胜；Renju 用禁手把先手优势压下去。本文讲清"破解"二字背后的真相。',
      en: 'Standard Gomoku without forbidden moves is mathematically proven a first-player win; Renju uses forbidden moves to tame that edge. This piece explains what "solved" actually means.',
    },
    keywords: ['is gomoku solved', 'gomoku solved', 'gomoku first player win', 'renju rules'],
    content: {
      zh: [
        '常有人问"五子棋是不是已经被电脑下透了"。答案是：看规则。这篇把"破解"二字背后的真相讲清楚，也顺带解释为什么竞技五子棋要加禁手。',
        { type: 'h2', text: '无禁手：先手必胜已被证明' },
        '在没有任何禁手、标准 15×15 棋盘上，数学家已经证明：先手（黑棋）有必胜策略。也就是说，只要黑棋每一步都按最优走，白棋无论如何都赢不了。这就是为什么休闲五子棋先手很占优。',
        { type: 'h2', text: 'Renju 怎么把先手压下去' },
        '为了让对局公平，竞技规则 Renju 给黑棋加了禁手：三三、四四、长连都判黑负。这样先手优势被大幅削弱，黑白更均衡。想了解具体禁手，看我们的[Renju 规则页](/renju-rules)。',
        {
          type: 'ul',
          items: [
            '无禁手五子棋：黑棋有数学必胜策略',
            'Renju：禁手限制黑棋，趋于公平',
            '棋盘大小（13/15/19）不改变"先手占优"的根本',
          ],
        },
        { type: 'h2', text: '那我还能愉快玩吗' },
        '能。对真人来说，"必胜策略"意味着每一步都要绝对精确，稍有偏差优势就消失——所以休闲对局照样精彩。YiBoard 默认无禁手、免费、[打开就能玩](/play)，先手优势只是让游戏更刺激，不影响乐趣。',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: '五子棋真的被破解了吗？', a: '无禁手规则下，先手必胜已被数学证明。但 Renju 等带禁手规则没有被先手一方完全破解。' },
            { q: '既然先手必胜，后手还有必要玩吗？', a: '对人类而言，先手优势极小，稍错一步就消失，所以后手照样有得玩。' },
            { q: '为什么竞技五子棋要禁手？', a: '为了抵消先手的数学优势，让黑白更公平。' },
          ],
        },
        { type: 'cta', text: '去 YiBoard 下一局（无禁手，免费）', href: 'https://yiboardgame.com/play' },
      ],
      en: [
        'People often ask whether Gomoku has been "solved" by computers. The answer is: it depends on the rules. This explains what "solved" really means and why competitive Gomoku adds forbidden moves.',
        { type: 'h2', text: 'No forbidden moves: first player proven to win' },
        'On a standard 15 by 15 board with no forbidden moves, mathematicians have proven that the first player, black, has a winning strategy. That means if black plays perfectly every move, white can never win. This is why first move is such an edge in casual Gomoku.',
        { type: 'h2', text: 'How Renju tames the first move' },
        'To make play fair, the competitive rules of Renju add forbidden moves for black: double three, double four and overline all lose for black. This sharply cuts the first-move edge and balances the colors. For the exact moves see our [Renju rules page](/renju-rules).',
        {
          type: 'ul',
          items: [
            'Gomoku without forbidden moves: black has a proven win',
            'Renju: forbidden moves limit black toward fairness',
            'Board size, 13, 15 or 19, does not change first-move advantage',
          ],
        },
        { type: 'h2', text: 'Can I still just enjoy it' },
        'Yes. For a human, a "winning strategy" means playing perfectly every single move; one slip and the edge vanishes, so casual games stay exciting. YiBoard defaults to no forbidden moves, free, and [playable instantly](/play); the first-move edge just makes it livelier, not less fun.',
        { type: 'h2', text: 'FAQ' },
        {
          type: 'faq',
          items: [
            { q: 'Is Gomoku really solved?', a: 'Without forbidden moves, first-player win is proven. With forbidden-move rules like Renju, it is not fully solved for the first player.' },
            { q: 'If first move wins, why play second?', a: 'For humans the edge is tiny and vanishes with one mistake, so second player still has a game.' },
            { q: 'Why do competitive rules forbid moves?', a: 'To offset the proven first-move advantage and balance black and white.' },
          ],
        },
        { type: 'cta', text: 'Play a game on YiBoard, free, no forbidden moves', href: 'https://yiboardgame.com/play' },
      ],
    },
  },
  {
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
  }

];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
