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
];

export function getXiangqiOpening(slug: string): XiangqiOpening | undefined {
  return XIANGQI_OPENINGS.find((o) => o.slug === slug);
}

export const XIANGQI_OPENING_SLUGS = XIANGQI_OPENINGS.map((o) => o.slug);
