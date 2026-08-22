/**
 * YiBoard 五子棋术语表（Glossary）数据层 —— 双语（zh / en），非中英语言回退 en。
 * 消费方：
 *   - src/app/[locale]/glossary/page.tsx  （术语表页 + FAQPage JSON-LD）
 * 术语 id 是稳定键：新增术语只追加，不要改旧 id（会影响已收录页面的锚点与 FAQ 语义）。
 *
 * 说明：术语名以"中文名"为准（五子棋术语源自中文棋类文化），英文名是给国际用户的对照译名。
 */

export interface GlossaryTerm {
  id: string;
  /** 术语 id 别名（用于 URL 锚点 / 内部链接，直接可读） */
  anchor: string;
  name: { zh: string; en: string };
  def: { zh: string; en: string };
  tip: { zh: string; en: string };
}

export const GLOSSARY: readonly GlossaryTerm[] = [
  {
    id: 'huo-er',
    anchor: 'open-two',
    name: { zh: '活二', en: 'Open Two' },
    def: {
      zh: '两个己方棋子相连（横、竖或斜），两端都还没有被对手堵住，之后仍有向两端延伸的空间。它是进攻的"种子"：单看威胁不大，但如果放任它继续发展，就会一步步变成活三、冲四。',
      en: 'Two of your stones connected in a line with both ends open, still able to grow in either direction. It is the seed of an attack: harmless alone, but if left unchecked it develops into an open three and then a four.',
    },
    tip: {
      zh: '开局阶段不要只顾自己搭活二，也要盯住对手最靠近中间的两个活二——那是"先手优势"最常生长的地方。',
      en: 'In the opening, do not only build your own twos — watch the opponent\u2019s two central open twos, the usual birthplace of initiative.',
    },
  },
  {
    id: 'huo-san',
    anchor: 'open-three',
    name: { zh: '活三', en: 'Open Three' },
    def: {
      zh: '三个己方棋子连线、且再落一子就能形成"活四"（对方必输）的三连。活三是整盘棋真正的发动机：一旦形成，对方通常只能被动应对。',
      en: 'Three of your stones in a line where one more stone creates a live four (an unstoppable win). The open three is the real engine of the game: once it appears, the opponent is usually forced onto the defensive.',
    },
    tip: {
      zh: '对方走出活三时，优先封住它能扩展成活四的那一端；两端都要封时，先堵威胁更大的一侧。',
      en: 'When the opponent plays an open three, block the end that extends toward a live four; when both ends threaten, answer the stronger side first.',
    },
  },
  {
    id: 'mian-san',
    anchor: 'sleeping-three',
    name: { zh: '眠三', en: 'Sleeping Three' },
    def: {
      zh: '三个棋子连线、但只有一端还能延伸的三连（另一端已被堵死）。它不能直接变成活四，但可以演变成"冲四"，同样是可靠的进攻手段。',
      en: 'Three stones in a line where only one end remains open (the other is blocked). It cannot become a live four, but it can turn into a forcing four — still a reliable attacking tool.',
    },
    tip: {
      zh: '眠三 + 冲四的组合（四三杀）是最常见的必胜手段：眠三提供攻击，冲四逼对方应对，二者互相掩护。',
      en: 'The sleeping-three-plus-four combination (the four-three finish) is the most common forced win: the three carries the attack while the four compels a response, covering each other.',
    },
  },
  {
    id: 'shuang-san',
    anchor: 'double-three',
    name: { zh: '双三', en: 'Double Three' },
    def: {
      zh: '一手棋同时形成两个活三。对方一次只能堵住一个，另一个必然长成活四——因此在无禁手规则下是近乎无解的进攻。',
      en: 'A single move that creates two open threes at once. The opponent can block only one, and the other is guaranteed to become a live four — making it nearly unstoppable under freestyle rules.',
    },
    tip: {
      zh: '在无禁手规则下，黑方同样可以使用双三——这也是 YiBoard 采用无禁手的原因之一：规则更简单，进攻更自由。',
      en: 'Under freestyle rules black can use double threes too — one reason YiBoard plays freestyle: simpler rules, freer attacks.',
    },
  },
  {
    id: 'chong-si',
    anchor: 'open-four',
    name: { zh: '冲四', en: 'Open Four / Four' },
    def: {
      zh: '四个棋子连线、且下一手必然连五的四连。它逼迫对方立即落子封堵，是掌握"先手"（主动权）的核心工具——对方没有选择，只能跟着你的节奏走。',
      en: 'Four stones in a line that will become five on the next move. It forces the opponent to block immediately, handing you the initiative — they have no choice but to follow your tempo.',
    },
    tip: {
      zh: '连环冲四（连续逼对方封堵）是用来抢时间、抢先手的高级技巧，计算好步数能让你在对手反击前先完成连五。',
      en: 'Chained forcing fours buy you time and initiative — if you count the plies, you can complete five before the opponent can counter.',
    },
  },
  {
    id: 'si-san',
    anchor: 'four-three',
    name: { zh: '四三', en: 'Four-Three' },
    def: {
      zh: '一手棋同时制造"冲四"与"活三"的杀形。对方必须先去封冲四，于是你的活三就自由长成了活四——这是五子棋最常见的必胜组合。',
      en: 'A move that creates both a forcing four and an open three. The opponent must answer the four, freeing your three to become a live four — the most common winning combination in gomoku.',
    },
    tip: {
      zh: '看到四三先别急着下：确认那条活三的另一端没有被提前封死，否则优势会悄悄溜走。',
      en: 'Before playing a four-three, confirm the far end of the open three is not already blocked — otherwise the advantage silently slips away.',
    },
  },
  {
    id: 'huo-si',
    anchor: 'live-four',
    name: { zh: '活四', en: 'Live Four' },
    def: {
      zh: '两端都开放的四个棋子。无论对方下一步堵哪一端，你都能在另一端连成五子——它意味着"这盘已经赢了"，除非对方立即连五抢先。',
      en: 'Four stones with both ends open. Whichever end the opponent blocks, you complete five at the other — it means the game is effectively won unless the opponent wins first.',
    },
    tip: {
      zh: '防守活四的唯一办法是在它形成之前就动手：一旦活四落地，基本无法挽回。',
      en: 'The only defense against a live four is stopping it before it forms — once it lands, there is usually no recovery.',
    },
  },
  {
    id: 'chang-lian',
    anchor: 'overline',
    name: { zh: '长连', en: 'Overline' },
    def: {
      zh: '超过五子的连续连线（六子及以上）。在无禁手规则下，五子及以上皆判胜，长连合法；在有禁手规则下，黑方的长连被禁止。',
      en: 'A line of more than five stones (six or more). Under freestyle rules any line of five or more wins, so overlines are legal; under forbidden-move rules black is barred from overlines.',
    },
    tip: {
      zh: 'YiBoard 采用无禁手：连成五子及以上即获胜，不用记禁手，规则一句话讲完。',
      en: 'YiBoard is freestyle: five or more in a row wins, no forbidden moves to remember, rules in one sentence.',
    },
  },
  {
    id: 'jin-shou',
    anchor: 'forbidden-move',
    name: { zh: '禁手', en: 'Forbidden Move' },
    def: {
      zh: '竞技五子棋为平衡"黑方先手优势"而设的规则：禁止黑方走出双三、双四或长连。违反即为输棋。YiBoard 不启用禁手，让规则更接近休闲玩家熟悉的"自由连五"。',
      en: 'A competitive rule that balances black\u2019s opening advantage: black is forbidden from making double threes, double fours, or overlines. Violating is a loss. YiBoard does not enforce forbidden moves, keeping rules close to the casual \u201cfreestyle five\u201d players already know.',
    },
    tip: {
      zh: '如果你在别的平台练过有禁手，来 YiBoard 记得放开手脚——双三双四在这里都合法。',
      en: 'If you practiced with forbidden moves elsewhere, loosen up on YiBoard — double threes and double fours are all legal here.',
    },
  },
  {
    id: 'tian-yuan',
    anchor: 'center-star',
    name: { zh: '天元', en: 'Center Star Point' },
    def: {
      zh: '棋盘正中心的交叉点（15×15 棋盘的 H8）。占据中心意味着向四个方向同时施压，是黑方最常见的开局落子点。',
      en: 'The exact center intersection of the board (H8 on a 15×15 grid). Holding the center pressures all four directions at once and is the most common opening move for black.',
    },
    tip: {
      zh: '黑方第一手占天元（中心），后续紧贴对手棋形落子，是入门最稳的开局策略。',
      en: 'Open at the center star point, then build tightly around the opponent\u2019s shape — the most solid opening strategy for beginners.',
    },
  },
  {
    id: 'xian-shou',
    anchor: 'initiative',
    name: { zh: '先手', en: 'Initiative' },
    def: {
      zh: '掌握进攻主动权的状态：你能持续用冲四、活三这类"必须回应"的棋迫使对方防守，让对手疲于堵漏、无暇组织自己的进攻。',
      en: 'The state of holding the offensive: you keep forcing replies with fours and open threes, so the opponent spends every turn blocking and never finds time to build their own attack.',
    },
    tip: {
      zh: '判断一局棋优劣，别数棋子多少，看"谁在持续出题"。维持先手的一方几乎永远领先。',
      en: 'To judge a game, do not count stones — see who keeps posing the questions. Whoever sustains the initiative is almost always ahead.',
    },
  },
];

export function getGlossaryTerms(): readonly GlossaryTerm[] {
  return GLOSSARY;
}
