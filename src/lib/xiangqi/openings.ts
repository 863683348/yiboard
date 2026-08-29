/**
 * Xiangqi (Chinese Chess) opening encyclopedia — seed data for the
 * programmatic openings library at /xiangqi/openings/[slug].
 *
 * Notation = standard Chinese Xiangqi notation (Red moves first).
 * Files are numbered 1–9 from each player's own right edge.
 * Example: 炮二平五 = Red cannon on file 2 slides to the centre file 5
 * (this is the "Central Cannon" / 当头炮 opening).
 *
 * All content is hand-written from domain knowledge — these are real,
 * historically established Xiangqi openings, not machine-fabricated.
 */

export type XiangqiOpeningCategory =
  | 'cannon'
  | 'screen'
  | 'soldier'
  | 'horse'
  | 'elephant'
  | 'counter';

export interface XiangqiOpeningReply {
  nameEn: string;
  nameZh: string;
  noteEn: string;
  noteZh: string;
}

export interface XiangqiOpeningFaq {
  qEn: string;
  qZh: string;
  aEn: string;
  aZh: string;
}

export interface XiangqiOpening {
  slug: string;
  nameEn: string;
  nameZh: string;
  /** Characteristic opening moves, Chinese notation (Red moves first). */
  movesZh: string;
  /** Plain-English description of the same moves. */
  movesEn: string;
  summaryEn: string;
  summaryZh: string;
  strategyEn: string;
  strategyZh: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: XiangqiOpeningCategory;
  replies: XiangqiOpeningReply[];
  faq: XiangqiOpeningFaq[];
}

export const XIANGQI_OPENINGS: XiangqiOpening[] = [
  {
    slug: 'central-cannon',
    nameEn: 'Central Cannon',
    nameZh: '当头炮 / 中炮',
    movesZh: '炮二平五',
    movesEn: 'Red cannon 2 → file 5 (centre).',
    summaryEn:
      'The single most popular Xiangqi opening. Red brings a cannon to the central file, aiming it straight at the enemy general along the middle line. Aggressive and direct.',
    summaryZh:
      '中国象棋最流行的开局。红方把炮平到中路，沿中线直指对方将帅。攻法直接、气势凌厉。',
    strategyEn:
      'Central Cannon seizes the centre and keeps constant pressure on the black general. It is the foundation of many attacking systems (Five-Six Cannon, Five-Seven Cannon, Screen-Horse defence). Best for players who like initiative and fast attacks.',
    strategyZh:
      '当头炮抢占中路，持续压迫黑方将帅，是众多进攻体系（五六炮、五七炮、屏风马防御）的基础。适合喜欢主动、速攻的棋手。',
    difficulty: 'beginner',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3, building a solid horse wall.',
        noteZh: '黑方应以 马8进7 再 马2进3，筑起坚实的马阵。',
      },
      {
        nameEn: 'Identical Cannons',
        nameZh: '顺炮',
        noteEn: 'Black mirrors with 炮8平5 for a sharp, double-cannon fight.',
        noteZh: '黑方应以 炮8平5，形成针锋相对的对攻。',
      },
    ],
    faq: [
      {
        qEn: 'Why is Central Cannon so common?',
        qZh: '为什么当头炮最常见？',
        aEn: 'It immediately controls the central file and threatens the enemy general, giving Red the initiative. Almost every classical manual opens with it.',
        aZh: '它立刻控制中心线并威胁对方将帅，让红方掌握先手。几乎所有古谱都以它起手。',
      },
      {
        qEn: 'What is the best defence against it?',
        qZh: '它最好的防守是什么？',
        aEn: 'Screen Horses (屏风马) is the most respected reply — two horses guard the centre and prepare a counterattack on the flanks.',
        aZh: '屏风马是最受推崇的应法——双马护中，并准备从两翼反击。',
      },
    ],
  },
  {
    slug: 'screen-horses',
    nameEn: 'Screen Horses',
    nameZh: '屏风马',
    movesZh: '马8进7，马2进3',
    movesEn: 'Black horse 8 → 7, then horse 2 → 3 (a paired horse wall).',
    summaryEn:
      'The classic, rock-solid reply to Central Cannon. Black develops both horses close to the palace, forming a "screen" that defends the centre and prepares flank counterattacks.',
    summaryZh:
      '应对当头炮最经典、最稳健的应法。黑方双马贴将发展，形成护中并准备两翼反击的"屏风"。',
    strategyEn:
      'Screen Horses trades early aggression for long-term structure. It is flexible: Black can later choose Counter-Cannon, Left River Cannon, or a slow build-up. The most theoretically deep system in Xiangqi.',
    strategyZh:
      '屏风马以早期攻势换取长期阵型。它极为灵活：黑方可随后选择卒底炮、过河炮或稳扎稳打。是象棋理论最深的体系。',
    difficulty: 'intermediate',
    category: 'screen',
    replies: [
      {
        nameEn: 'Left River Cannon',
        nameZh: '左炮封车',
        noteEn: 'Black plays 炮8进4 to pin Red\'s chariot on file 2.',
        noteZh: '黑方走 炮8进4，封住红方二路车。',
      },
      {
        nameEn: 'Counter-Cannon',
        nameZh: '卒底炮',
        noteEn: 'Black answers 炮2平3 after Red pushes a soldier.',
        noteZh: '红挺兵后黑方应以 炮2平3。',
      },
    ],
    faq: [
      {
        qEn: 'Is Screen Horses only a defence?',
        qZh: '屏风马只是防守吗？',
        aEn: 'Primarily a defence to Central Cannon, but it also stands alone as a balanced, counterattacking setup that many top players prefer.',
        aZh: '主要是当头炮的防守，但也可独立成局，是许多顶尖棋手偏爱的均衡反击型布局。',
      },
      {
        qEn: 'Why "screen"?',
        qZh: '为什么叫"屏风"？',
        aEn: 'The two horses sit side by side like a folding screen in front of the general, guarding the centre files.',
        aZh: '双马并立如将帅前的屏风，护卫中路。',
      },
    ],
  },
  {
    slug: 'identical-cannons',
    nameEn: 'Identical Cannons (Shun Pao)',
    nameZh: '顺炮',
    movesZh: '炮二平五，炮8平5',
    movesEn: 'Red 炮二平五, Black mirrors 炮8平5 on the same central file.',
    summaryEn:
      'Both sides plant a cannon on the central file facing each other. A balanced, highly tactical opening that leads to open, sharp battles.',
    summaryZh:
      '双方都把炮布到中路、彼此相对。攻守均衡、极具战术性，常演变成开放而尖锐的对攻。',
    strategyEn:
      'Identical Cannons keeps the position symmetrical and rewards fast, accurate tactics. Development of chariots (车) is critical — the side that connects rooks first usually gains the edge.',
    strategyZh:
      '顺炮局面对称，比拼快捷精准的战术。车的出动至关重要——先亮车的一方通常占优。',
    difficulty: 'intermediate',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Direct Chariot',
        nameZh: '直车',
        noteEn: 'Red plays 车一平二 to contest the central file immediately.',
        noteZh: '红方走 车一平二，立即争夺中路。',
      },
      {
        nameEn: 'Curved Chariot',
        nameZh: '横车',
        noteEn: 'Red plays 车一进一 to swing the chariot toward the enemy flank.',
        noteZh: '红方走 车一进一，把车横出威胁对方侧翼。',
      },
    ],
    faq: [
      {
        qEn: 'Identical vs Cross Cannons — which is sharper?',
        qZh: '顺炮和列手炮哪个更凶？',
        aEn: 'Cross Cannons (列手炮) is generally sharper because the cannons face on opposite files, creating immediate imbalance. Identical Cannons stays more balanced.',
        aZh: '列手炮通常更凶，因为双炮在异侧相对，立刻形成不平衡；顺炮则更均衡。',
      },
    ],
  },
  {
    slug: 'cross-cannons',
    nameEn: 'Cross Cannons (Lie Pao)',
    nameZh: '列手炮 / 逆手炮',
    movesZh: '炮二平五，炮2平5',
    movesEn: 'Red 炮二平五, Black answers 炮2平5 on the opposite wing.',
    summaryEn:
      'Black answers Central Cannon with a cannon on the opposite file. The cannons face off diagonally, producing immediate tension and wild, tactical games.',
    summaryZh:
      '黑方以异侧炮应当头炮，双炮斜向相对，立刻制造紧张局面，对局往往激烈多变。',
    strategyEn:
      'Cross Cannons is for players who enjoy imbalance and tactics. Because the position is asymmetric from move two, both sides race to develop chariots and strike first.',
    strategyZh:
      '列手炮适合喜欢不平衡与战术的棋手。自第二回合起局面即不对称，双方争先出车、抢攻。',
    difficulty: 'advanced',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Quick Chariot',
        nameZh: '急车',
        noteEn: 'Both sides rush chariots out to seize the open files.',
        noteZh: '双方急出车，争夺开放线。',
      },
    ],
    faq: [
      {
        qEn: 'Is Cross Cannons good for beginners?',
        qZh: '列手炮适合初学者吗？',
        aEn: 'It is exciting but tactically demanding. Beginners may prefer the safer Screen Horses before trying it.',
        aZh: '它很刺激但对战术要求高。初学者不妨先练更稳的屏风马。',
      },
    ],
  },
  {
    slug: 'adjacent-soldier',
    nameEn: 'Adjacent Soldier (Xian Ren Zhi Lu)',
    nameZh: '仙人指路',
    movesZh: '兵三进一（或兵七进一）',
    movesEn: 'Red pushes the 3rd (or 7th) soldier one step forward — a probing move.',
    summaryEn:
      'Red advances a soldier before committing any major piece — "the immortal points the way". A flexible, modern opening that keeps options open and tests Black\'s plan.',
    summaryZh:
      '红方先挺起三路（或七路）兵，谓之"仙人指路"。灵活现代的开局，保留了后续选择，并试探黑方意图。',
    strategyEn:
      'Adjacent Soldier delays structure to gather information. After Black responds, Red can transpose into Central Cannon, Horse Opening, or Flying Elephant depending on the situation.',
    strategyZh:
      '仙人指路暂缓定型以观察对手。待黑方应对后，红方可根据局面转入当头炮、起马局或飞相局。',
    difficulty: 'intermediate',
    category: 'soldier',
    replies: [
      {
        nameEn: 'Counter-Cannon',
        nameZh: '卒底炮',
        noteEn: 'Black answers 炮2平3, striking the soldier\'s base.',
        noteZh: '黑方应以 炮2平3，攻击兵根。',
      },
      {
        nameEn: 'Mirror Soldier',
        nameZh: '对兵局',
        noteEn: 'Black pushes 卒7进1, keeping the position symmetric.',
        noteZh: '黑方挺 卒7进1，保持对称。',
      },
    ],
    faq: [
      {
        qEn: 'Why "immortal points the way"?',
        qZh: '为什么叫"仙人指路"？',
        aEn: 'It is a poetic name: the first soldier "points the way" like an immortal showing the path, while keeping the overall plan flexible.',
        aZh: '名字富有诗意：先行之兵如仙人指路，而整体计划仍留灵活。',
      },
    ],
  },
  {
    slug: 'horse-opening',
    nameEn: 'Horse Opening (Qi Ma Ju)',
    nameZh: '起马局',
    movesZh: '马二进三（或马八进七）',
    movesEn: 'Red develops a horse first (horse 2 → 3) before any cannon move.',
    summaryEn:
      'Red jumps a horse out first, delaying the cannon. A calm, flexible system favoured by players who like to build a solid position and steer the middlegame.',
    summaryZh:
      '红方先跳马、暂缓动炮。沉稳灵活，适合喜欢先巩固阵地、再引导中局的棋手。',
    strategyEn:
      'Horse Opening avoids early confrontation and keeps many transpositions available. It often leads to a harmonious development where Red reacts to Black\'s setup.',
    strategyZh:
      '起马局避免早期冲突，保留多种变化。常形成协调出动，红方视黑方布阵灵活应对。',
    difficulty: 'beginner',
    category: 'horse',
    replies: [
      {
        nameEn: 'Central Cannon response',
        nameZh: '转当头炮',
        noteEn: 'Red may later play 炮二平五 to convert into a Central Cannon attack.',
        noteZh: '红方随后可走 炮二平五，转为当头炮进攻。',
      },
    ],
    faq: [
      {
        qEn: 'Is Horse Opening passive?',
        qZh: '起马局被动吗？',
        aEn: 'Not passive — it is flexible. By developing first, Red keeps the position balanced and chooses the battlefield later.',
        aZh: '并不被动，而是灵活。先出动让红方保持均衡，后发制人。',
      },
    ],
  },
  {
    slug: 'flying-elephant',
    nameEn: 'Flying Elephant (Fei Xiang Ju)',
    nameZh: '飞相局',
    movesZh: '相三进五（或相七进五）',
    movesEn: 'Red advances an elephant to the centre (elephant 3 → 5).',
    summaryEn:
      'Red strengthens the centre with an elephant before anything else. A famously solid, defensive opening associated with grandmaster Hu Ronghua.',
    summaryZh:
      '红方先飞相巩固中路，是著名的稳健防守型开局，与特级大师胡荣华的风格相连。',
    strategyEn:
      'Flying Elephant builds a durable fortress and avoids early tactics. It suits players who excel in positional, maneuvering games and endgames.',
    strategyZh:
      '飞相局筑起坚固阵地，避开早期战术，适合擅长局面运营与残局的棋手。',
    difficulty: 'advanced',
    category: 'elephant',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Black may grab the centre with 炮8平5 or 炮2平5.',
        noteZh: '黑方可以 炮8平5 或 炮2平5 抢中。',
      },
    ],
    faq: [
      {
        qEn: 'Why start with an elephant?',
        qZh: '为什么先飞相？',
        aEn: 'The elephant controls the centre diagonally and cannot cross the river, so it creates a stable base from which Red develops the rest of the army.',
        aZh: '相控制中路对角线且不过河，为后续大子出动奠定稳定根基。',
      },
    ],
  },
  {
    slug: 'cross-palace-cannon',
    nameEn: 'Cross Palace Cannon (Guo Gong Pao)',
    nameZh: '过宫炮',
    movesZh: '炮二平六',
    movesEn: 'Red cannon 2 → file 6, crossing in front of the palace.',
    summaryEn:
      'Red shifts a cannon across the palace mouth to file 6. A flexible, slightly quiet opening that prepares horse development on both wings.',
    summaryZh:
      '红炮平到六路、横过将门之前。灵活而略偏平稳的开局，便于两翼跳马发展。',
    strategyEn:
      'Cross Palace Cannon keeps the centre loosely controlled and is easy to steer into either attack or defence. A good choice for players who dislike forced lines.',
    strategyZh:
      '过宫炮对中路保持弹性控制，攻守皆可，适合不喜欢被迫定式的棋手。',
    difficulty: 'intermediate',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Horse development',
        nameZh: '跳马',
        noteEn: 'Red follows with 马二进三 and 马八进七 for balanced knights.',
        noteZh: '红方续以 马二进三、马八进七，双马均衡。',
      },
    ],
    faq: [
      {
        qEn: 'How is it different from Central Cannon?',
        qZh: '它和当头炮有何不同？',
        aEn: 'Central Cannon hits the centre directly and aggressively; Cross Palace Cannon stays oblique and flexible, avoiding immediate confrontation.',
        aZh: '当头炮直取中路、攻势凌厉；过宫炮则偏斜灵活，避免过早冲突。',
      },
    ],
  },
  {
    slug: 'corner-cannon',
    nameEn: 'Corner Cannon (Shi Jiao Pao)',
    nameZh: '士角炮',
    movesZh: '炮二平四',
    movesEn: 'Red cannon 2 → file 4, landing on the advisor\'s corner.',
    summaryEn:
      'Red tucks a cannon into the advisor\'s corner. An ultra-calm, preparatory opening that stabilises the palace before launching any plan.',
    summaryZh:
      '红炮平到士角，是极平稳的预备型开局，先稳住九宫再图后举。',
    strategyEn:
      'Corner Cannon is rarely seen at beginner level because it gives no immediate threat — but it builds a harmonious, well-protected position ideal for positional players.',
    strategyZh:
      '士角炮在初学者中少见，因它不立即施加威胁；但它构筑出协调、受保护的阵地，适合局面型棋手。',
    difficulty: 'advanced',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Horse + Chariot build-up',
        nameZh: '马炮车出动',
        noteEn: 'Red calmly develops 马二进三 and connects chariots.',
        noteZh: '红方从容走 马二进三 并亮车。',
      },
    ],
    faq: [
      {
        qEn: 'Is Corner Cannon too slow?',
        qZh: '士角炮是不是太慢？',
        aEn: 'It trades tempo for safety. Against aggressive opponents it can feel passive, but it rarely goes wrong positionally.',
        aZh: '它以步数换取安全。对攻型对手时略显被动，但局面上很少出错。',
      },
    ],
  },
  {
    slug: 'cannon-behind-soldier',
    nameEn: 'Cannon Behind Soldier (Zu Di Pao)',
    nameZh: '卒底炮',
    movesZh: '兵七进一，炮2平3',
    movesEn: 'After Red 兵七进一, Black strikes the soldier\'s base with 炮2平3.',
    summaryEn:
      'The standard, sharp reply to Adjacent Soldier. Black immediately aims a cannon at the base of Red\'s advanced soldier, fighting for the centre early.',
    summaryZh:
      '应对仙人指路最标准、最尖锐的应法。黑方立刻以炮瞄准红兵之根，早早争夺中路。',
    strategyEn:
      'Cannon Behind Soldier contests the centre the moment Red commits a soldier. It is the most theory-heavy counter to Adjacent Soldier and leads to rich, fighting positions.',
    strategyZh:
      '卒底炮在红方挺兵的同时即争夺中路，是仙人指路最富理论深度的应法，局面多争斗。',
    difficulty: 'advanced',
    category: 'counter',
    replies: [
      {
        nameEn: 'Flying Elephant',
        nameZh: '飞相',
        noteEn: 'Red may answer 相七进五 to keep things solid.',
        noteZh: '红方可应以 相七进五，保持稳健。',
      },
      {
        nameEn: 'Horse Opening',
        nameZh: '起马',
        noteEn: 'Red plays 马八进七 to develop calmly.',
        noteZh: '红方走 马八进七，从容出动。',
      },
    ],
    faq: [
      {
        qEn: 'Why "behind the soldier"?',
        qZh: '为什么叫"卒底炮"？',
        aEn: 'The cannon sits just behind the line of pawns (soldiers), ready to strike the base of Red\'s advanced soldier.',
        aZh: '炮位在兵（卒）线之后，随时可击打红方挺起之兵的根。',
      },
    ],
  },
  {
    slug: 'five-six-cannon',
    nameEn: 'Five-Six Cannon (Wu Liu Pao)',
    nameZh: '五六炮',
    movesZh: '炮二平五，炮八平六',
    movesEn: 'Red 炮二平五 to the centre, then 炮八平六 (left cannon to file 6).',
    summaryEn:
      'A calm, solid Central Cannon system where the left cannon tucks to file 6, preparing to develop horses and connect chariots. Balanced and low-risk.',
    summaryZh:
      '稳健的当头炮体系：红方先 炮二平五 占中，再 炮八平六 把左炮安于六路，便于跳马亮车。攻守均衡、风险低。',
    strategyEn:
      'Five-Six Cannon keeps the centre controlled while leaving the left flank flexible. It often transposes into Screen Horses lines and suits positional players.',
    strategyZh:
      '五六炮在控中的同时保留左翼弹性，常可转入屏风马体系，适合局面型棋手。',
    difficulty: 'intermediate',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3, building a solid horse wall.',
        noteZh: '黑方应以 马8进7 再 马2进3，筑起坚实马阵。',
      },
      {
        nameEn: 'Rapid Chariot',
        nameZh: '急车',
        noteEn: 'Red plays 车一平二 to contest the central file fast.',
        noteZh: '红方走 车一平二，迅速争夺中路。',
      },
    ],
    faq: [
      {
        qEn: 'How does Five-Six differ from Central Cannon?',
        qZh: '五六炮和单纯中炮有什么区别？',
        aEn: 'Central Cannon alone is just the first move; Five-Six adds 炮八平六, fixing the left cannon and steering toward a harmonious setup.',
        aZh: '中炮只是第一步；五六炮再补 炮八平六，固定左炮，走向协调阵型。',
      },
      {
        qEn: 'Is it good for beginners?',
        qZh: '它适合初学者吗？',
        aEn: 'Yes — it is forgiving and easy to develop, a gentle step beyond the basic Central Cannon.',
        aZh: '适合——容错高、易出动，是当头炮之上稳妥的一步。',
      },
    ],
  },
  {
    slug: 'five-seven-cannon',
    nameEn: 'Five-Seven Cannon (Wu Qi Pao)',
    nameZh: '五七炮',
    movesZh: '炮二平五，炮八平七',
    movesEn: 'Red 炮二平五, then 炮八平七 (left cannon to file 7).',
    summaryEn:
      'A flexible Central Cannon line where the left cannon aims at file 7, supporting a horse on the flank and preparing to pressure Black\'s position.',
    summaryZh:
      '灵活的当头炮变例：红方 炮二平五 后 炮八平七，左炮指向七路，支援边马并施压黑方。',
    strategyEn:
      'Five-Seven Cannon combines central control with a ready flank attack. It pairs well with 马八进七 and a later 车九平八.',
    strategyZh:
      '五七炮兼顾中路与侧翼进攻，常配合 马八进七、车九平八 出动。',
    difficulty: 'intermediate',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3, the usual solid reply.',
        noteZh: '黑方应以 马8进7 再 马2进3，标准稳健应法。',
      },
      {
        nameEn: 'Left Chariot',
        nameZh: '左车',
        noteEn: 'Red plays 车九平八 to bring the left chariot into play.',
        noteZh: '红方走 车九平八，让左车投入战斗。',
      },
    ],
    faq: [
      {
        qEn: 'Why file 7?',
        qZh: '为什么走到七路？',
        aEn: 'File 7 lets the cannon support a horse on the same flank and eye Black\'s weak points along the 7th line.',
        aZh: '七路让炮支援同侧马，并盯住黑方七线上的弱点。',
      },
      {
        qEn: 'Five-Six or Five-Seven?',
        qZh: '五六炮和五七炮选哪个？',
        aEn: 'Five-Six is calmer; Five-Seven is more aggressive on the flank. Pick by temperament.',
        aZh: '五六炮更稳，五七炮侧重侧翼进攻，按风格选择。',
      },
    ],
  },
  {
    slug: 'five-eight-cannon',
    nameEn: 'Five-Eight Cannon (Wu Ba Pao)',
    nameZh: '五八炮',
    movesZh: '炮二平五，炮八进四',
    movesEn: 'Red 炮二平五, then 炮八进四 (left cannon leaps to file 8, the river bank).',
    summaryEn:
      'An aggressive Central Cannon variant where the left cannon jumps to the river to harass Black\'s horses and seize space.',
    summaryZh:
      '进攻型当头炮变例：红方 炮二平五 后 炮八进四，左炮直扑河沿，骚扰黑马、抢占地势。',
    strategyEn:
      'Five-Eight Cannon trades solidity for activity. The river cannon pins and pressures, but Red must watch the back rank.',
    strategyZh:
      '五八炮以稳固换主动，河炮牵制施压，但红方需留意底线安全。',
    difficulty: 'intermediate',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black builds 马8进7 + 马2进3 to blunt the attack.',
        noteZh: '黑方筑 马8进7 再 马2进3，化解攻势。',
      },
      {
        nameEn: 'Counter-Cannon',
        nameZh: '卒底炮',
        noteEn: 'Black answers 炮2平3, striking the soldier\'s base.',
        noteZh: '黑方应以 炮2平3，攻击兵根。',
      },
    ],
    faq: [
      {
        qEn: 'Is Five-Eight too risky?',
        qZh: '五八炮是不是太冒险？',
        aEn: 'It is active rather than risky; the river cannon is well supported by the central cannon and a developing chariot.',
        aZh: '它主动而非冒险；河炮有中炮与出动中的车支撑。',
      },
    ],
  },
  {
    slug: 'river-patrol-cannon',
    nameEn: 'River Patrol Cannon (Xun He Pao)',
    nameZh: '巡河炮',
    movesZh: '炮二平五，炮八进二',
    movesEn: 'Red 炮二平五, then 炮八进二 (left cannon patrols the river).',
    summaryEn:
      'A gentle Central Cannon setup where the left cannon advances just to the river, ready to defend or exchange. Great for beginners who want a safe, flexible start.',
    summaryZh:
      '温和的当头炮布局：红方 炮二平五 后 炮八进二，左炮巡河，随时防守或兑子。适合想要稳妥灵活起手的新手。',
    strategyEn:
      'River Patrol Cannon trades early aggression for control of the river line, making it easy to steer into many transpositions.',
    strategyZh:
      '巡河炮放弃早期进攻换来河沿控制权，便于转入多种变化。',
    difficulty: 'beginner',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3.',
        noteZh: '黑方应以 马8进7 再 马2进3。',
      },
      {
        nameEn: 'River Chariot',
        nameZh: '过河车',
        noteEn: 'Red plays 车一平二 then 车二进四 to patrol the river too.',
        noteZh: '红方走 车一平二 再 车二进四，同样巡河。',
      },
    ],
    faq: [
      {
        qEn: 'Why patrol the river?',
        qZh: '为什么要巡河？',
        aEn: 'A river cannon can capture encroaching soldiers and support a horse crossing, giving Red a calm but useful post.',
        aZh: '巡河炮可吃入侵之兵、支援渡河之马，位置安稳而有用。',
      },
    ],
  },
  {
    slug: 'turtle-back-cannon',
    nameEn: 'Turtle Back Cannon (Gui Bei Pao)',
    nameZh: '龟背炮',
    movesZh: '炮二平五，车一进一，车一平四，炮八退一',
    movesEn: 'Red 炮二平五, swings the chariot, then 炮八退一 to form a "turtle shell".',
    summaryEn:
      'An unusual, defensive cannon system where the left cannon retreats to form a "turtle shell" — solid but slow, favoured by patient players.',
    summaryZh:
      '罕见的防守型炮局：红方 炮二平五 后横车、再 炮八退一，左炮退守如龟背，稳固却偏慢，适合耐心的棋手。',
    strategyEn:
      'Turtle Back Cannon builds a compact, hard-to-break position. It avoids early tactics and rewards endgame skill.',
    strategyZh:
      '龟背炮构筑紧凑难破的阵型，避开早期战术，比拼残局功力。',
    difficulty: 'advanced',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Horse Development',
        nameZh: '跳马',
        noteEn: 'Red follows with 马二进三 for a balanced knight.',
        noteZh: '红方续以 马二进三，双马均衡。',
      },
      {
        nameEn: 'Chariot Build-up',
        nameZh: '亮车',
        noteEn: 'Red connects chariots slowly behind the shell.',
        noteZh: '红方在壳后从容亮车。',
      },
    ],
    faq: [
      {
        qEn: 'Why so passive?',
        qZh: '为什么这么被动？',
        aEn: 'The "turtle" shape protects the centre and back rank; Red gives up tempo for safety and strikes later.',
        aZh: '龟背形护住中路与底线；红方以步数换安全，后发制人。',
      },
    ],
  },
  {
    slug: 'mandarin-duck-cannon',
    nameEn: 'Mandarin Duck Cannons (Yuan Yang Pao)',
    nameZh: '鸳鸯炮',
    movesZh: '炮二平五，马八进七，炮八退一',
    movesEn: 'Red 炮二平五, develops a horse, then 炮八退一 before swinging both cannons to converge.',
    summaryEn:
      'A rare, tricky cannon system where both cannons are manoeuvred to meet on the same flank, confusing opponents with unusual piece coordination.',
    summaryZh:
      '罕见的刁钻炮局：双炮调动后汇聚同侧，以别致的子力配合扰乱对手。',
    strategyEn:
      'Mandarin Duck Cannon is an ambush system — it looks passive then suddenly both cannons strike. Best as a surprise weapon.',
    strategyZh:
      '鸳鸯炮是埋伏型体系，看似平稳却突然双炮齐发，宜作奇兵。',
    difficulty: 'advanced',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3.',
        noteZh: '黑方应以 马8进7 再 马2进3。',
      },
      {
        nameEn: 'Rapid Counter',
        nameZh: '急应',
        noteEn: 'Black rushes 车9平8 to exploit the slow build-up.',
        noteZh: '黑方急走 车9平8，利用红方缓手。',
      },
    ],
    faq: [
      {
        qEn: 'Is it playable at high level?',
        qZh: '它能在高水平对局中使用吗？',
        aEn: 'Occasionally seen as a surprise; against prepared opponents the slow build-up is hard to justify.',
        aZh: '偶作奇兵出现；面对有准备的对手，缓手难以成立。',
      },
    ],
  },
  {
    slug: 'double-river-cannon',
    nameEn: 'Double River Cannons (Shuang Pao Guo He)',
    nameZh: '双炮过河',
    movesZh: '炮二平五，炮八进四',
    movesEn: 'Red 炮二平五, then 炮八进四 — both cannons push toward the river.',
    summaryEn:
      'A bold double-cannon thrust where both cannons advance to the river to grab space and pressure Black\'s camp directly.',
    summaryZh:
      '大胆的双炮过河：红方双炮齐赴河沿，抢占地势、直接施压黑方阵营。',
    strategyEn:
      'Double River Cannon is aggressive and space-grabbing. It demands accurate follow-up; if the cannons are exchanged, Red must have development ready.',
    strategyZh:
      '双炮过河攻势凌厉、占地主动，但需后续精准；一旦兑炮，红方须有出动接应。',
    difficulty: 'intermediate',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3.',
        noteZh: '黑方应以 马8进7 再 马2进3。',
      },
      {
        nameEn: 'Counter-Cannon',
        nameZh: '卒底炮',
        noteEn: 'Black answers 炮2平3 to hit the soldier base.',
        noteZh: '黑方应以 炮2平3，击打兵根。',
      },
    ],
    faq: [
      {
        qEn: 'Does it overextend?',
        qZh: '会不会过于冒进？',
        aEn: 'The river cannons are exposed; Red must support them with chariots and horses or risk losing the tempo.',
        aZh: '河炮暴露；红方须用车马支撑，否则易失先。',
      },
    ],
  },
  {
    slug: 'central-horse',
    nameEn: 'Central Horse (Pan Tou Ma)',
    nameZh: '盘头马',
    movesZh: '炮二平五，兵五进一，马二进三',
    movesEn: 'Red 炮二平五, pushes 兵五进一, then 马二进三 to plant a horse in the centre.',
    summaryEn:
      'A Central Cannon attacking system where Red advances the central soldier and develops a horse to the centre, aiming for a direct kingside assault.',
    summaryZh:
      '当头炮进攻体系：红方 炮二平五、兵五进一，再 马二进三 把马盘到中路，意图中路直攻。',
    strategyEn:
      'Central Horse builds a powerful central pawn front. It suits players who like forcing, attacking lines.',
    strategyZh:
      '盘头马筑起强悍的中兵阵，适合喜欢强攻、主动权在手的棋手。',
    difficulty: 'intermediate',
    category: 'cannon',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3.',
        noteZh: '黑方应以 马8进7 再 马2进3。',
      },
      {
        nameEn: 'Counter-Cannon',
        nameZh: '卒底炮',
        noteEn: 'Black answers 炮2平3 to disrupt the centre.',
        noteZh: '黑方应以 炮2平3，扰乱中路。',
      },
    ],
    faq: [
      {
        qEn: 'Why push the central soldier early?',
        qZh: '为什么要早挺中兵？',
        aEn: 'It opens a lane for the horse to the centre and supports a later 兵五进一 break toward the enemy general.',
        aZh: '它为中马开路，并为后续 兵五进一 直扑对方将帅铺垫。',
      },
    ],
  },
  {
    slug: 'left-river-cannon',
    nameEn: 'Left River Cannon (Zuo Pao Feng Che)',
    nameZh: '左炮封车',
    movesZh: '马8进7，马2进3，炮8进4',
    movesEn: 'After 炮二平五, Black develops 马8进7 + 马2进3, then 炮8进4 to pin Red\'s chariot.',
    summaryEn:
      'The classic Screen Horses counter to Central Cannon: Black builds the horse wall, then a left cannon jumps to the river to pin Red\'s chariot on file 2.',
    summaryZh:
      '屏风马应对当头炮的经典体系：黑方先筑马墙（马8进7、马2进3），再以 炮8进4 封住红方二路车。',
    strategyEn:
      'Left River Cannon combines a solid horse defence with active harassment. It is one of the most respected replies to Central Cannon.',
    strategyZh:
      '左炮封车将稳健的马防与积极骚扰结合，是应对当头炮最受推崇的应法之一。',
    difficulty: 'intermediate',
    category: 'screen',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red\'s 炮二平五 starts the line.',
        noteZh: '红方 炮二平五 起手。',
      },
      {
        nameEn: 'Right Chariot',
        nameZh: '右车',
        noteEn: 'Red plays 车一平二 to contest the centre.',
        noteZh: '红方走 车一平二，争夺中路。',
      },
    ],
    faq: [
      {
        qEn: 'What does "seal the chariot" mean?',
        qZh: '“封车”是什么意思？',
        aEn: 'The river cannon attacks the square in front of Red\'s chariot, discouraging it from advancing and gaining a tempo.',
        aZh: '河炮攻击红车前方之点，阻其前进并争得先手。',
      },
    ],
  },
  {
    slug: 'right-river-cannon',
    nameEn: 'Right River Cannon (You Pao Guo He)',
    nameZh: '右炮过河',
    movesZh: '马8进7，炮2进4',
    movesEn: 'After 炮二平五, Black plays 马8进7 then 炮2进4, sending the right cannon to the river.',
    summaryEn:
      'A Screen Horses variant where Black\'s right cannon goes to the river to contest space and pressure Red\'s flank early.',
    summaryZh:
      '屏风马变例：黑方 马8进7 后 炮2进4，右炮过河，早早争夺空间、压迫红方侧翼。',
    strategyEn:
      'Right River Cannon is more aggressive than the standard Screen Horses. It asks Red to respond accurately or lose the initiative.',
    strategyZh:
      '右炮过河比标准屏风马更具攻击性，逼红方谨慎应对，否则易失先手。',
    difficulty: 'advanced',
    category: 'screen',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red\'s 炮二平五 starts the line.',
        noteZh: '红方 炮二平五 起手。',
      },
      {
        nameEn: 'Rapid Chariot',
        nameZh: '急车',
        noteEn: 'Red rushes 车一平二 to fight for the open file.',
        noteZh: '红方急走 车一平二，争夺开放线。',
      },
    ],
    faq: [
      {
        qEn: 'Left vs right river cannon?',
        qZh: '左炮封车与右炮过河有何不同？',
        aEn: 'Both pin chariots, but the right cannon (from Black\'s perspective) attacks the opposite flank, changing the whole battle plan.',
        aZh: '二者皆封车，但右炮（黑方视角）攻击另一侧，整体作战计划随之改变。',
      },
    ],
  },
  {
    slug: 'anti-palace-horse',
    nameEn: 'Anti-Palace Horse (Fan Gong Ma)',
    nameZh: '反宫马',
    movesZh: '炮8平6，马8进7，马2进3',
    movesEn: 'After 炮二平五, Black answers 炮8平6 (counter-cannon to file 6) + 马8进7 + 马2进3.',
    summaryEn:
      'A fortified defence to Central Cannon: Black plants a "counter-cannon" at the palace mouth and wraps both horses around it — solid and hard to break.',
    summaryZh:
      '应对当头炮的坚固防御：黑方以 炮8平6（士角反架）配合双马环护，阵型稳如磐石、难以攻破。',
    strategyEn:
      'Anti-Palace Horse (also called 夹炮屏风) trades early activity for a bullet-proof structure. It neutralises Central Cannon\'s attack and excels in manoeuvring battles.',
    strategyZh:
      '反宫马（又称夹炮屏风）以早期主动换得不破之阵，化解当头炮攻势，擅长阵地周旋。',
    difficulty: 'advanced',
    category: 'horse',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red\'s 炮二平五 is the trigger.',
        noteZh: '红方 炮二平五 触发此体系。',
      },
      {
        nameEn: 'River Chariot',
        nameZh: '过河车',
        noteEn: 'Red plays 车一平二 then 车二进六 to probe.',
        noteZh: '红方走 车一平二 再 车二进六，试探。',
      },
    ],
    faq: [
      {
        qEn: 'Why is it "anti-palace"?',
        qZh: '为什么叫“反宫马”？',
        aEn: 'Black\'s cannon sits opposite the palace mouth while the two horses guard it — a reversed, mirrored Screen Horses.',
        aZh: '黑炮置于宫门对面、双马环护，是屏风马的反向镜像。',
      },
    ],
  },
  {
    slug: 'single-horse',
    nameEn: 'Single Horse (Dan Ti Ma)',
    nameZh: '单提马',
    movesZh: '马二进三，马八进九',
    movesEn: 'Red develops 马二进三, then 马八进九 (one horse tucks to the corner).',
    summaryEn:
      'A quiet, lopsided horse system where Red holds one horse in the corner, keeping a calm and flexible position without committing cannons early.',
    summaryZh:
      '沉静偏侧的马局：红方 马二进三、马八进九，一马守角，早期不动炮，阵型从容灵活。',
    strategyEn:
      'Single Horse avoids early confrontation and is easy to steer. It appeals to players who prefer slow, harmonious development.',
    strategyZh:
      '单提马避免早期冲突，转向自如，适合偏好平稳协调出子的棋手。',
    difficulty: 'intermediate',
    category: 'horse',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red may later play 炮二平五 to switch to an attack.',
        noteZh: '红方随后可走 炮二平五，转入进攻。',
      },
      {
        nameEn: 'Flying Elephant',
        nameZh: '飞相局',
        noteEn: 'A calm alternative that also builds a solid base.',
        noteZh: '同样稳健、先固根基的平和选择。',
      },
    ],
    faq: [
      {
        qEn: 'Isn\'t one horse in the corner passive?',
        qZh: '把马守在角上不是被动吗？',
        aEn: 'The corner horse is safe and can later jump to the centre; Single Horse trades aggression for a durable setup.',
        aZh: '守角之马安全，且可后跳中路；单提马以攻势换耐久阵型。',
      },
    ],
  },
  {
    slug: 'bent-foot-horse',
    nameEn: 'Bent-Foot Horse (Guai Jiao Ma)',
    nameZh: '拐脚马',
    movesZh: '马二进三，马三进四',
    movesEn: 'Red 马二进三, then 马三进四 — the horse "bends" forward into the centre.',
    summaryEn:
      'An old, attacking horse system where the horse advances in a bent path toward the centre, supporting a quick pawn storm.',
    summaryZh:
      '古老的进攻型马局：红方 马二进三、马三进四，马走拐角直扑中路，配合快速冲兵。',
    strategyEn:
      'Bent-Foot Horse is for aggressive players who want an early central knight and fast attacks. It needs precise follow-up to avoid overextension.',
    strategyZh:
      '拐脚马适合喜欢早出中心马、速攻的棋手，但需后续精准以免冒进。',
    difficulty: 'intermediate',
    category: 'horse',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red may open 炮二平五 to support the knight.',
        noteZh: '红方可先 炮二平五 支援马。',
      },
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3.',
        noteZh: '黑方应以 马8进7 再 马2进3。',
      },
    ],
    faq: [
      {
        qEn: 'Why "bent foot"?',
        qZh: '为什么叫“拐脚马”？',
        aEn: 'The horse reaches the centre via a zig-zag (bent) route rather than the direct file, hence the name.',
        aZh: '马经折线路线（而非直线）抵达中路，故得此名。',
      },
    ],
  },
  {
    slug: 'side-horse',
    nameEn: 'Side Horse (Bian Ma Ju)',
    nameZh: '边马局',
    movesZh: '马八进九',
    movesEn: 'Red develops 马八进九 first, tucking a horse to the edge.',
    summaryEn:
      'A minimalist opening where Red simply advances an edge horse, keeping the position fluid and avoiding early commitments.',
    summaryZh:
      '极简开局：红方先 马八进九 把边马安顿，局面流动、不早定型。',
    strategyEn:
      'Side Horse is a waiting move that preserves options. It often transposes into Single Horse or Horse Opening lines.',
    strategyZh:
      '边马局是一手等待棋，保留变化，常可转入单提马或起马局。',
    difficulty: 'beginner',
    category: 'horse',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red may later play 炮二平五.',
        noteZh: '红方随后可走 炮二平五。',
      },
      {
        nameEn: 'Horse Opening',
        nameZh: '起马局',
        noteEn: 'A natural transposition after 马二进三.',
        noteZh: '走 马二进三 后自然过渡。',
      },
    ],
    faq: [
      {
        qEn: 'What\'s the point of an edge horse?',
        qZh: '边马有什么用？',
        aEn: 'It develops safely without revealing a plan, letting Red react to Black\'s setup.',
        aZh: '它安全出动且不暴露意图，让红方视黑方布阵灵活应对。',
      },
    ],
  },
  {
    slug: 'double-horse',
    nameEn: 'Double Horse (Shuang Zheng Ma)',
    nameZh: '双正马',
    movesZh: '马二进三，马八进七',
    movesEn: 'Red develops both horses straight (马二进三 + 马八进七) before any cannon move.',
    summaryEn:
      'A balanced horse-first system where Red brings out both "straight" horses, prioritising harmony and a solid base over early central control.',
    summaryZh:
      '均衡的马先体系：红方先 马二进三、马八进七 双正马出动，重协调与根基，而非抢早中。',
    strategyEn:
      'Double Horse builds a symmetrical, robust position. It suits players who like to complete development before committing to an attack.',
    strategyZh:
      '双正马构筑对称稳健的阵型，适合先完成出动、再定进攻的棋手。',
    difficulty: 'intermediate',
    category: 'horse',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red may later play 炮二平五 to seize the centre.',
        noteZh: '红方随后可走 炮二平五 抢中。',
      },
      {
        nameEn: 'Flying Elephant',
        nameZh: '飞相局',
        noteEn: 'Another calm, base-first alternative.',
        noteZh: '同样先固根基的平和选择。',
      },
    ],
    faq: [
      {
        qEn: 'Two horses but no cannon yet?',
        qZh: '双马出动却还不动炮？',
        aEn: 'Exactly — Red delays the cannon to keep options open, a calm alternative to Cannon-first openings.',
        aZh: '正是——红方暂缓动炮以保留选择，是炮先开局之外的平和替代。',
      },
    ],
  },
  {
    slug: 'mirror-soldier',
    nameEn: 'Mirror Soldier (Dui Bing Ju)',
    nameZh: '对兵局',
    movesZh: '兵三进一，卒7进1',
    movesEn: 'After 兵三进一, Black answers 卒7进1 — both sides advance a soldier.',
    summaryEn:
      'The symmetric reply to Adjacent Soldier: both sides push a soldier, keeping the position balanced and the centre closed.',
    summaryZh:
      '应对仙人指路的对称应法：双方各挺一兵，局面均衡、中路封闭。',
    strategyEn:
      'Mirror Soldier avoids early theory and leads to a quiet, maneuvering game. It is a safe choice for players who dislike forced lines.',
    strategyZh:
      '对兵局避开早期定式，走向平稳周旋，适合不喜欢被迫变化的棋手。',
    difficulty: 'beginner',
    category: 'soldier',
    replies: [
      {
        nameEn: 'Adjacent Soldier',
        nameZh: '仙人指路',
        noteEn: 'Red\'s 兵三进一 starts the line.',
        noteZh: '红方 兵三进一 起手。',
      },
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Either side may later switch to 炮二平五.',
        noteZh: '任一方随后可转为 炮二平五。',
      },
    ],
    faq: [
      {
        qEn: 'Does it just copy Red?',
        qZh: '它只是模仿红方吗？',
        aEn: 'Mirroring keeps things equal, but Black can later deviate (e.g., with a counter-cannon) to seize the initiative.',
        aZh: '对挺保持均势，但黑方随后可转向（如卒底炮）夺取先手。',
      },
    ],
  },
  {
    slug: 'two-headed-snake',
    nameEn: 'Two-Headed Snake (Liang Tou She)',
    nameZh: '两头蛇',
    movesZh: '兵三进一，兵七进一',
    movesEn: 'Red pushes both 兵三进一 and 兵七进一, advancing soldiers on both flanks.',
    summaryEn:
      'A soldier storm where Red advances both wing soldiers, preparing to support horses crossing the river on either side.',
    summaryZh:
      '双兵齐进的兵阵：红方 兵三进一、兵七进一，两翼挺兵，为双马过河铺垫。',
    strategyEn:
      'Two-Headed Snake is usually paired with Screen Horses; the twin soldiers give Red flexible points to jump horses into the enemy camp.',
    strategyZh:
      '两头蛇多配合屏风马；双兵为红方提供灵活渡河点，便于双马扑入敌阵。',
    difficulty: 'beginner',
    category: 'soldier',
    replies: [
      {
        nameEn: 'Screen Horses',
        nameZh: '屏风马',
        noteEn: 'Black answers 马8进7 + 马2进3.',
        noteZh: '黑方应以 马8进7 再 马2进3。',
      },
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red may open 炮二平五 instead.',
        noteZh: '红方也可先 炮二平五。',
      },
    ],
    faq: [
      {
        qEn: 'Why "two-headed snake"?',
        qZh: '为什么叫“两头蛇”？',
        aEn: 'The two advanced soldiers resemble a snake with heads on both ends, ready to strike on either flank.',
        aZh: '两枚挺进之兵如双头之蛇，可自两翼出击。',
      },
    ],
  },
  {
    slug: 'iron-slide-chariot',
    nameEn: 'Iron Slide Chariot (Tie Hua Che)',
    nameZh: '铁滑车',
    movesZh: '车一进一，车一平九',
    movesEn: 'Red lifts 车一进一 then slides 车一平九, sacrificing the chariot for a lightning attack.',
    summaryEn:
      'A flashy, sacrificial opening where Red gives up a chariot for early chaos and a surprise attack — exciting but objectively unsound.',
    summaryZh:
      '炫目而冒险的弃子开局：红方 车一进一、车一平九，舍车换取混乱与奇袭，刺激但理论上欠稳。',
    strategyEn:
      'Iron Slide Chariot is a gambiteering weapon best used against unprepared opponents. At serious levels it is rarely correct.',
    strategyZh:
      '铁滑车是赌博式奇兵，宜对付无备之敌；在严肃对局中少有正着。',
    difficulty: 'advanced',
    category: 'counter',
    replies: [
      {
        nameEn: 'Central Cannon',
        nameZh: '当头炮',
        noteEn: 'Red may open 炮二平五 before the sacrifice.',
        noteZh: '红方弃子前可先 炮二平五。',
      },
      {
        nameEn: 'Rapid Counter',
        nameZh: '急应',
        noteEn: 'Black develops 车9平8 to exploit the material lead.',
        noteZh: '黑方走 车9平8，利用多子优势。',
      },
    ],
    faq: [
      {
        qEn: 'Is sacrificing a chariot ever good?',
        qZh: '弃车真有好处吗？',
        aEn: 'Only as a surprise — the material loss is hard to justify unless the opponent blunders in the resulting complications.',
        aZh: '仅宜作奇兵——除非对手在乱战中出错，否则弃子难以成立。',
      },
    ],
  },
];

export function getXiangqiOpening(slug: string): XiangqiOpening | undefined {
  return XIANGQI_OPENINGS.find((o) => o.slug === slug);
}

export const XIANGQI_OPENING_SLUGS = XIANGQI_OPENINGS.map((o) => o.slug);
