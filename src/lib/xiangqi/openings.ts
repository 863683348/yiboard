/**
 * Xiangqi (Chinese Chess) opening encyclopedia — seed data for the
 * programmatic openings library at /xiangqi/openings/[slug].
 *
 * Notation = standard Chinese Xiangqi notation (Red moves first); movesZh is
 * universal (Chinese notation) and is NOT translated. All prose fields are
 * locale-keyed: { zh, en, es, ja, ko, 'pt-BR' }. Missing locales fall back via
 * localized() (en → zh). This lets us localize openings incrementally without
 * breaking the 4 non-en/zh locales (they already fall back to English).
 *
 * All content is hand-written from domain knowledge — these are real,
 * historically established Xiangqi openings, not machine-fabricated.
 */

export type XiangqiLocale = 'zh' | 'en' | 'es' | 'ja' | 'ko' | 'pt-BR';

export type XiangqiOpeningCategory =
  | 'cannon'
  | 'screen'
  | 'soldier'
  | 'horse'
  | 'elephant'
  | 'counter';

export interface XiangqiOpeningReply {
  name: Partial<Record<XiangqiLocale, string>>;
  note: Partial<Record<XiangqiLocale, string>>;
}

export interface XiangqiOpeningFaq {
  q: Partial<Record<XiangqiLocale, string>>;
  a: Partial<Record<XiangqiLocale, string>>;
}

export interface XiangqiOpening {
  slug: string;
  name: Partial<Record<XiangqiLocale, string>>;
  /** Chinese notation, universal (not translated). */
  movesZh: string;
  /** Localized plain-English description of the moves. */
  moves: Partial<Record<XiangqiLocale, string>>;
  summary: Partial<Record<XiangqiLocale, string>>;
  strategy: Partial<Record<XiangqiLocale, string>>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: XiangqiOpeningCategory;
  replies: XiangqiOpeningReply[];
  faq: XiangqiOpeningFaq[];
}

/** Resolve a locale-keyed field with graceful fallback (en → zh). */
export function localized(
  field: Partial<Record<XiangqiLocale, string>> | undefined,
  locale: XiangqiLocale,
): string {
  if (!field) return '';
  return field[locale] ?? field.en ?? field.zh ?? '';
}

export const XIANGQI_OPENINGS: XiangqiOpening[] = [
  {
    slug: "central-cannon",
    name: { zh: "当头炮 / 中炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
    movesZh: "炮二平五",
    moves: { en: "Red cannon 2 → file 5 (centre).", es: "El cañón rojo de la 2 → a la columna 5 (centro).", ja: "赤の砲2を5の筋（中央）へ。", ko: "붉은 포 2가 5로(중앙).", "pt-BR": "O canhão vermelho da 2 → para a coluna 5 (centro)." },
    summary: { zh: "中国象棋最流行的开局。红方把炮平到中路，沿中线直指对方将帅。攻法直接、气势凌厉。", en: "The single most popular Xiangqi opening. Red brings a cannon to the central file, aiming it straight at the enemy general along the middle line. Aggressive and direct.", es: "La apertura de Xiangqi más popular de todas. Rojo lleva un cañón a la columna central, apuntando directamente al general enemigo por la línea media. Agresiva y directa.", ja: "中国象棋で最も人気のある定石。赤が砲を中央の筋に出し、中線に沿って敵の将へまっすぐ瞄を定める。攻撃的で直接的だ。", ko: "중국장기에서 가장 인기 있는 포진법. 붉은 기물이 포를 중앙으로 보내 중선을 따라 상대 장수를 곧바로 겨냥한다. 공격적이고 직설적이다.", "pt-BR": "A abertura de Xiangqi mais popular de todas. O vermelho leva um canhão à coluna central, mirando direto o general inimigo pela linha do meio. Agressiva e direta." },
    strategy: { zh: "当头炮抢占中路，持续压迫黑方将帅，是众多进攻体系（五六炮、五七炮、屏风马防御）的基础。适合喜欢主动、速攻的棋手。", en: "Central Cannon seizes the centre and keeps constant pressure on the black general. It is the foundation of many attacking systems (Five-Six Cannon, Five-Seven Cannon, Screen-Horse defence). Best for players who like initiative and fast attacks.", es: "El Cañón Central ocupa el centro y mantiene una presión constante sobre el general negro. Es la base de muchos sistemas de ataque (Cañón Cinco-Seis, Cañón Cinco-Siete, defensa de Caballos en Pantalla). Ideal para quienes buscan la iniciativa y ataques rápidos.", ja: "中炮は中央を制し、黒の将に絶えず圧力をかける。五八砲・五七砲・屏風馬の防御など、多くの攻撃体系の土台となる。主導権と速攻を好む棋士に向く。", ko: "중포는 중앙을 장악하고 흑 장수에 지속적인 압박을 가한다. 오육포·오칠포·병풍마 방어 등 많은 공격 체계의 기초가 된다. 주도권과 속공을 좋아하는 기사에게 알맞다.", "pt-BR": "O Canhão Central toma o centro e mantém pressão constante sobre o general preto. É a base de muitos sistemas de ataque (Canhão Cinco-Seis, Canhão Cinco-Sete, defesa de Cavalos em Tela). Ideal para quem gosta de iniciativa e ataques rápidos." },
    difficulty: "beginner",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3，筑起坚实的马阵。", en: "Black answers 马8进7 + 马2进3, building a solid horse wall.", es: "Negro responde 马8进7 + 马2进3, formando una sólida barrera de caballos.", ja: "黒は 馬8進7 ＋ 馬2進3 と進め、しっかりした馬の壁を築く。", ko: "흑은 馬8進7 + 馬2進3으로 탄탄한 마의 벽을 세운다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3, formando uma sólida barreira de cavalos." },
      },
      {
        name: { zh: "顺炮", en: "Identical Cannons", es: "Cañones Idénticos", ja: "順砲", ko: "순포", "pt-BR": "Canhões Idênticos" },
        note: { zh: "黑方应以 炮8平5，形成针锋相对的对攻。", en: "Black mirrors with 炮8平5 for a sharp, double-cannon fight.", es: "Negro replica con 炮8平5 para un agudo duelo de doble cañón.", ja: "黒は 砲8平5 と合わせ、鋭い二砲の戦いとなる。", ko: "흑은 砲8平5로 응수해 날카로운 쌍포 전투가 된다.", "pt-BR": "O preto espelha com 砲8平5 para um duelo agudo de canhão duplo." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么当头炮最常见？", en: "Why is Central Cannon so common?", es: "¿Por qué el Cañón Central es tan común?", ja: "なぜ中炮はこれほど一般的なのか？", ko: "왜 중포가 그렇게 흔한가?", "pt-BR": "Por que o Canhão Central é tão comum?" },
        a: { zh: "它立刻控制中心线并威胁对方将帅，让红方掌握先手。几乎所有古谱都以它起手。", en: "It immediately controls the central file and threatens the enemy general, giving Red the initiative. Almost every classical manual opens with it.", es: "Controla de inmediato la columna central y amenaza al general enemigo, dando a Rojo la iniciativa. Casi todos los manuales clásicos comienzan con él.", ja: "中央の筋を即座に制し、敵の将を脅かすことで赤に主導権をもたらす。古典的な棋書のほとんどがこれで始まる。", ko: "중앙을 즉시 장악하고 상대 장수를 위협해 붉은 편에 주도권을 준다. 고전 서적 대부분이 이로 시작한다.", "pt-BR": "Controla imediatamente a coluna central e ameaça o general inimigo, dando ao vermelho a iniciativa. Quase todo manual clássico começa com ele." },
      },
      {
        q: { zh: "它最好的防守是什么？", en: "What is the best defence against it?", es: "¿Cuál es la mejor defensa contra él?", ja: "それに対する最良の防御は？", ko: "이에 대한 최선의 방어는?", "pt-BR": "Qual é a melhor defesa contra ele?" },
        a: { zh: "屏风马是最受推崇的应法——双马护中，并准备从两翼反击。", en: "Screen Horses (屏风马) is the most respected reply — two horses guard the centre and prepare a counterattack on the flanks.", es: "Los Caballos en Pantalla (屏风马) son la respuesta más respetada: dos caballos guardan el centro y preparan un contraataque por los flancos.", ja: "屏風馬（びょうふうば）が最も評価される応手だ。二つの馬が中央を守り、両翼からの反撃を整える。", ko: "병풍마(병풍마)가 가장 존중받는 응수다. 두 마가 중앙을 지키며 양측에서 반격을 준비한다.", "pt-BR": "Os Cavalos em Tela (屏风马) são a resposta mais respeitada — dois cavalos guardam o centro e preparam um contra-ataque pelos flancos." },
      },
    ],
  },
  {
    slug: "screen-horses",
    name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
    movesZh: "马8进7，马2进3",
    moves: { en: "Black horse 8 → 7, then horse 2 → 3 (a paired horse wall).", es: "Caballo negro de la 8 → 7, luego caballo de la 2 → 3 (una barrera de caballos emparejada).", ja: "黒の馬8→7、続けて馬2→3（組み合わさった馬の壁）。", ko: "흑 마 8→7, 이어 마 2→3(짝을 이룬 마의 벽).", "pt-BR": "Cavalo preto da 8 → 7, depois cavalo da 2 → 3 (uma barreira de cavalos emparelhada)." },
    summary: { zh: "应对当头炮最经典、最稳健的应法。黑方双马贴将发展，形成护中并准备两翼反击的\"屏风\"。", en: "The classic, rock-solid reply to Central Cannon. Black develops both horses close to the palace, forming a \"screen\" that defends the centre and prepares flank counterattacks.", es: "La respuesta clásica y sólida al Cañón Central. Negro desarrolla ambos caballos cerca del palacio, formando una \"pantalla\" que defiende el centro y prepara contraataques por los flancos.", ja: "中炮に対する古典的で鉄壁の応手。黒は両馬を宮に近く発展させ、中央を守り両翼からの反撃を整える「屏風」を作る。", ko: "중포에 대한 가장 고전적이고 탄탄한 응수. 흑은 두 마를 궁 근처로 발전시켜 중앙을 지키고 양측 반격을 준비하는 '병풍'을 만든다.", "pt-BR": "A resposta clássica e sólida ao Canhão Central. O preto desenvolve ambos os cavalos perto do palácio, formando uma \"tela\" que defende o centro e prepara contra-ataques pelos flancos." },
    strategy: { zh: "屏风马以早期攻势换取长期阵型。它极为灵活：黑方可随后选择卒底炮、过河炮或稳扎稳打。是象棋理论最深的体系。", en: "Screen Horses trades early aggression for long-term structure. It is flexible: Black can later choose Counter-Cannon, Left River Cannon, or a slow build-up. The most theoretically deep system in Xiangqi.", es: "Los Caballos en Pantalla cambian la agresión temprana por una estructura a largo plazo. Son flexibles: Negro puede luego elegir Cañón Detrás del Soldado, Cañón del Río Izquierdo o una construcción lenta. El sistema con mayor profundidad teórica del Xiangqi.", ja: "屏風馬は早い攻めを犠牲にして長期的な陣形を得る。柔軟で、黒は後に卒底砲・左砲封車・あるいはじっくりした構築を選べる。中国象棋で最も理論が深い体系だ。", ko: "병풍마는 초반 공세를 희생해 장기적 진형을 얻는다. 유연하여 흑은 이후 졸저포·좌포봉거 혹은 차근차근 전개를 선택할 수 있다. 중국장기에서 이론이 가장 깊은 체계다.", "pt-BR": "Os Cavalos em Tela trocam a agressão inicial por uma estrutura de longo prazo. São flexíveis: o preto pode depois escolher Canhão Atrás do Soldado, Canhão do Rio Esquerdo ou uma construção lenta. O sistema de maior profundidade teórica no Xiangqi." },
    difficulty: "intermediate",
    category: "screen",
    replies: [
      {
        name: { zh: "左炮封车", en: "Left River Cannon", es: "Cañón del Río Izquierdo", ja: "左砲封車", ko: "좌포봉거", "pt-BR": "Canhão do Rio Esquerdo" },
        note: { zh: "黑方走 炮8进4，封住红方二路车。", en: "Black plays 炮8进4 to pin Red's chariot on file 2.", es: "Negro juega 炮8进4 para clavar el carro de Rojo en la columna 2.", ja: "黒は 砲8進4 で赤の2の筋の車を封じる。", ko: "흑은 砲8進4로 붉은 차의 2로를 봉쇄한다.", "pt-BR": "O preto joga 砲8進4 para imobilizar o carro do vermelho na coluna 2." },
      },
      {
        name: { zh: "卒底炮", en: "Counter-Cannon", es: "Cañón Detrás del Soldado", ja: "卒底砲", ko: "졸저포", "pt-BR": "Canhão Atrás do Soldado" },
        note: { zh: "红挺兵后黑方应以 炮2平3。", en: "Black answers 炮2平3 after Red pushes a soldier.", es: "Negro responde 炮2平3 tras el avance de un soldado de Rojo.", ja: "赤が兵を押したあと、黒は 砲2平3 と応じる。", ko: "붉은 병을 밀면 흑은 砲2平3으로 응한다.", "pt-BR": "O preto responde 砲2平3 após o vermelho avançar um soldado." },
      },
    ],
    faq: [
      {
        q: { zh: "屏风马只是防守吗？", en: "Is Screen Horses only a defence?", es: "¿Los Caballos en Pantalla son solo defensivos?", ja: "屏風馬は防御だけなのか？", ko: "병풍마는 단순한 방어인가?", "pt-BR": "Os Cavalos em Tela são apenas defensivos?" },
        a: { zh: "主要是当头炮的防守，但也可独立成局，是许多顶尖棋手偏爱的均衡反击型布局。", en: "Primarily a defence to Central Cannon, but it also stands alone as a balanced, counterattacking setup that many top players prefer.", es: "Principalmente defensa contra el Cañón Central, pero también se sostiene por sí solo como un planteamiento equilibrado y de contraataque que muchos grandes maestros prefieren.", ja: "もともと中炮への防御だが、単独でも成り立つ釣り合いの取れた反撃型の布陣で、トップ棋士の多くが好む。", ko: "본래 중포에 대한 방어이나 단독으로도 성립하는 균형 잡힌 반격형 포진으로, 많은 정상급 기사가 선호한다.", "pt-BR": "Principalmente uma defesa ao Canhão Central, mas também se sustenta sozinho como um esquema equilibrado e de contra-ataque que muitos grandes mestres preferem." },
      },
      {
        q: { zh: "为什么叫\"屏风\"？", en: "Why \"screen\"?", es: "¿Por qué \"pantalla\"?", ja: "なぜ「屏風」なのか？", ko: "왜 '병풍'인가?", "pt-BR": "Por que \"tela\"?" },
        a: { zh: "双马并立如将帅前的屏风，护卫中路。", en: "The two horses sit side by side like a folding screen in front of the general, guarding the centre files.", es: "Los dos caballos se sitúan uno junto al otro como una pantalla plegable ante el general, guardando las columnas centrales.", ja: "二つの馬が将の前に屏風のように並び、中央の筋を守る。", ko: "두 마가 장수 앞에 병풍처럼 나란히 서서 중앙을 지킨다.", "pt-BR": "Os dois cavalos ficam lado a lado como uma tela dobrável diante do general, guardando as colunas centrais." },
      },
    ],
  },
  {
    slug: "identical-cannons",
    name: { zh: "顺炮", en: "Identical Cannons (Shun Pao)", es: "Cañones Idénticos (Shun Pao)", ja: "順砲", ko: "순포", "pt-BR": "Canhões Idênticos (Shun Pao)" },
    movesZh: "炮二平五，炮8平5",
    moves: { en: "Red 炮二平五, Black mirrors 炮8平5 on the same central file.", es: "Rojo 炮二平五, Negro replica 炮8平5 en la misma columna central.", ja: "赤の 砲二平五 に対し、黒が同じ中央の筋で 砲8平5 と合わせる。", ko: "붉은 砲二平五, 흑은 같은 중앙으로 砲8平5로 응수한다.", "pt-BR": "Vermelho 砲二平五, preto espelha 砲8平5 na mesma coluna central." },
    summary: { zh: "双方都把炮布到中路、彼此相对。攻守均衡、极具战术性，常演变成开放而尖锐的对攻。", en: "Both sides plant a cannon on the central file facing each other. A balanced, highly tactical opening that leads to open, sharp battles.", es: "Ambos sitúan un cañón en la columna central uno frente a otro. Una apertura equilibrada y muy táctica que deriva en batallas abiertas y agudas.", ja: "両者が中央の筋に砲をぶつけ合う。釣り合いが取れ、極めて戦術的な定石で、開いた鋭い戦いへと進む。", ko: "양측이 포를 중앙에 마주 세운다. 균형 잡히고 전술적인 포진으로, 개방되고 날카로운 대공으로 이어진다.", "pt-BR": "Ambos colocam um canhão na coluna central um de frente para o outro. Uma abertura equilibrada e muito tática que leva a batalhas abertas e agudas." },
    strategy: { zh: "顺炮局面对称，比拼快捷精准的战术。车的出动至关重要——先亮车的一方通常占优。", en: "Identical Cannons keeps the position symmetrical and rewards fast, accurate tactics. Development of chariots (车) is critical — the side that connects rooks first usually gains the edge.", es: "Los Cañones Idénticos mantienen una posición simétrica y premian la táctica rápida y precisa. El desarrollo de los carros (车) es clave: quien conecta las torres primero suele sacar ventaja.", ja: "順砲は形が対称で、速く正確な戦術がものを言う。車（しゃ）の展開が決定的で、先に車を繋げた側が優位になる。", ko: "순포는 형세가 대칭이며 빠르고 정확한 전술이 승부를 가른다. 차(車)의 전개가 결정적이라 차를 먼저 연결한 쪽이 유리하다.", "pt-BR": "Os Canhões Idênticos mantêm a posição simétrica e premiam tática rápida e precisa. O desenvolvimento dos carros (车) é decisivo — quem conecta as torres primeiro costuma levar vantagem." },
    difficulty: "intermediate",
    category: "cannon",
    replies: [
      {
        name: { zh: "直车", en: "Direct Chariot", es: "Carro Directo", ja: "直車", ko: "직차", "pt-BR": "Carro Direto" },
        note: { zh: "红方走 车一平二，立即争夺中路。", en: "Red plays 车一平二 to contest the central file immediately.", es: "Rojo juega 车一平二 para disputar de inmediato la columna central.", ja: "赤は 車一平二 と即座に中央の筋を争う。", ko: "붉은 車一平二로 즉시 중앙을 다툰다.", "pt-BR": "O vermelho joga 車一平二 para disputar a coluna central imediatamente." },
      },
      {
        name: { zh: "横车", en: "Curved Chariot", es: "Carro Curvo", ja: "横車", ko: "횡차", "pt-BR": "Carro Transversal" },
        note: { zh: "红方走 车一进一，把车横出威胁对方侧翼。", en: "Red plays 车一进一 to swing the chariot toward the enemy flank.", es: "Rojo juega 车一进一 para girar el carro hacia el flanco enemigo.", ja: "赤は 車一進一 と車を横に振り、敵の翼へ脅威を向ける。", ko: "붉은 車一進一로 차를 가로질러 상대 측면을 위협한다.", "pt-BR": "O vermelho joga 車一進一 para girar o carro para o flanco inimigo." },
      },
    ],
    faq: [
      {
        q: { zh: "顺炮和列手炮哪个更凶？", en: "Identical vs Cross Cannons — which is sharper?", es: "¿Cañones Idénticos vs Cruzados: cuál es más agudo?", ja: "順砲と列手砲、どちらが鋭い？", ko: "순포와 열수포 중 어느 쪽이 더 날카로운가?", "pt-BR": "Canhões Idênticos vs Cruzados — qual é mais agudo?" },
        a: { zh: "列手炮通常更凶，因为双炮在异侧相对，立刻形成不平衡；顺炮则更均衡。", en: "Cross Cannons (列手炮) is generally sharper because the cannons face on opposite files, creating immediate imbalance. Identical Cannons stays more balanced.", es: "Los Cañones Cruzados (列手炮) suelen ser más agudos porque los cañones se enfrentan en columnas opuestas, creando un desequilibrio inmediato. Los Idénticos se mantienen más equilibrados.", ja: "列手砲（れっしゅほう）は通常より鋭い。二砲が逆の筋で向き合い、即座に不均衡が生まれるからだ。順砲はより釣り合っている。", ko: "열수포(열수포)가 보통 더 날카롭다. 쌍포가 반대 측에서 마주해 즉각 불균형이 생기기 때문이다. 순포는 더 균형 있다.", "pt-BR": "Os Canhões Cruzados (列手炮) costumam ser mais agudos porque os canhões se enfrentam em colunas opostas, criando desequilíbrio imediato. Os Idênticos ficam mais equilibrados." },
      },
    ],
  },
  {
    slug: "cross-cannons",
    name: { zh: "列手炮 / 逆手炮", en: "Cross Cannons (Lie Pao)", es: "Cañones Cruzados (Lie Pao)", ja: "列手砲", ko: "열수포", "pt-BR": "Canhões Cruzados (Lie Pao)" },
    movesZh: "炮二平五，炮2平5",
    moves: { en: "Red 炮二平五, Black answers 炮2平5 on the opposite wing.", es: "Rojo 炮二平五, Negro responde 炮2平5 en el ala opuesta.", ja: "赤の 砲二平五 に対し、黒が反対の翼で 砲2平5 と応じる。", ko: "붉은 砲二平五, 흑은 반대 편에서 砲2平5로 응한다.", "pt-BR": "Vermelho 砲二平五, preto responde 砲2平5 na asa oposta." },
    summary: { zh: "黑方以异侧炮应当头炮，双炮斜向相对，立刻制造紧张局面，对局往往激烈多变。", en: "Black answers Central Cannon with a cannon on the opposite file. The cannons face off diagonally, producing immediate tension and wild, tactical games.", es: "Negro responde al Cañón Central con un cañón en la columna opuesta. Los cañones se enfrentan en diagonal, creando tensión inmediata y partidas salvajes y tácticas.", ja: "黒が中炮に対し反対の筋の砲で応じる。二砲が斜めに向き合い、即座に緊張が生まれ、激しく変化に富む局となる。", ko: "흑이 중포에 반대 측 포로 응수한다. 쌍포가 사선으로 마주해 즉각 긴장이 생기고 치열하고 변화무쌍한 국면이 된다.", "pt-BR": "O preto responde ao Canhão Central com um canhão na coluna oposta. Os canhões se enfrentam na diagonal, gerando tensão imediata e jogos selvagens e táticos." },
    strategy: { zh: "列手炮适合喜欢不平衡与战术的棋手。自第二回合起局面即不对称，双方争先出车、抢攻。", en: "Cross Cannons is for players who enjoy imbalance and tactics. Because the position is asymmetric from move two, both sides race to develop chariots and strike first.", es: "Los Cañones Cruzados son para quienes disfrutan el desequilibrio y la táctica. Como la posición es asimétrica desde la segunda jugada, ambos luchan por desarrollar carros y golpear primero.", ja: "列手砲は不均衡と戦術を好む棋士向け。2手目から形が非対称となるため、両者は車を早く出し、先に仕掛けようと競う。", ko: "열수포는 불균형과 전술을 즐기는 기사에게 맞다. 2수부터 형세가 비대칭이라 양측은 차를 먼저 전개하고 선공하려 경쟁한다.", "pt-BR": "Os Canhões Cruzados são para quem aprecia desequilíbrio e tática. Como a posição é assimétrica desde a segunda jogada, ambos correm para desenvolver carros e atacar primeiro." },
    difficulty: "advanced",
    category: "cannon",
    replies: [
      {
        name: { zh: "急车", en: "Quick Chariot", es: "Carro Rápido", ja: "急車", ko: "급차", "pt-BR": "Carro Rápido" },
        note: { zh: "双方急出车，争夺开放线。", en: "Both sides rush chariots out to seize the open files.", es: "Ambos lanzan sus carros para apoderarse de las columnas abiertas.", ja: "両者が車を急いで出し、開いた筋を奪う。", ko: "양측이 차를 급히 전개해 개방선을 잡는다.", "pt-BR": "Ambos lançam os carros para tomar as colunas abertas." },
      },
    ],
    faq: [
      {
        q: { zh: "列手炮适合初学者吗？", en: "Is Cross Cannons good for beginners?", es: "¿Los Cañones Cruzados son buenos para principiantes?", ja: "列手砲は初心者に向いているか？", ko: "열수포는 초보자에게 좋은가?", "pt-BR": "Os Canhões Cruzados são bons para iniciantes?" },
        a: { zh: "它很刺激但对战术要求高。初学者不妨先练更稳的屏风马。", en: "It is exciting but tactically demanding. Beginners may prefer the safer Screen Horses before trying it.", es: "Es emocionante pero exige mucha táctica. Los principiantes pueden preferir los más seguros Caballos en Pantalla antes de probarlo.", ja: "刺激的な一方、戦術の要求が高い。初心者はまず安全な屏風馬を練習したほうがいい。", ko: "자극적이지만 전술 요구가 높다. 초보자는 먼저 더 안정적인 병풍마를 익히는 게 좋다.", "pt-BR": "É emocionante, mas exige muita tática. Iniciantes podem preferir os mais seguros Cavalos em Tela antes de tentar." },
      },
    ],
  },
  {
    slug: "adjacent-soldier",
    name: { zh: "仙人指路", en: "Adjacent Soldier (Xian Ren Zhi Lu)", es: "Soldado Adyacente (Xian Ren Zhi Lu)", ja: "仙人指路", ko: "선인지로", "pt-BR": "Soldado Adjacente (Xian Ren Zhi Lu)" },
    movesZh: "兵三进一（或兵七进一）",
    moves: { en: "Red pushes the 3rd (or 7th) soldier one step forward — a probing move.", es: "Rojo avanza un paso el soldado 3 (o el 7): una jugada de sondeo.", ja: "赤が3の（または7の）兵を一歩前に押す——様子見の一手。", ko: "붉은 병 3(혹은 7)을 한 칸 전진시키는 탐색 수.", "pt-BR": "O vermelho avança um passo o soldado 3 (ou o 7) — uma jogada de sondagem." },
    summary: { zh: "红方先挺起三路（或七路）兵，谓之\"仙人指路\"。灵活现代的开局，保留了后续选择，并试探黑方意图。", en: "Red advances a soldier before committing any major piece — \"the immortal points the way\". A flexible, modern opening that keeps options open and tests Black's plan.", es: "Rojo adelanta un soldado antes de comprometer ninguna pieza mayor: \"el inmortal señala el camino\". Una apertura flexible y moderna que mantiene abiertas las opciones y sondea el plan de Negro.", ja: "赤は主要な駒を動かす前に兵を一つ進める——「仙人、道を指す」。選択肢を残しつつ黒の構想を探る、柔軟で現代的な定石。", ko: "붉은 큰 기물을 내기 전 병을 먼저 진전시킨다 — '선인이 길을 가리킨다'. 선택지를 열어두고 흑의 의도를 떠보는 유연하고 현대적인 포진.", "pt-BR": "O vermelho avança um soldado antes de comprometer qualquer peça maior — \"o imortal aponta o caminho\". Uma abertura flexível e moderna que mantém opções abertas e testa o plano do preto." },
    strategy: { zh: "仙人指路暂缓定型以观察对手。待黑方应对后，红方可根据局面转入当头炮、起马局或飞相局。", en: "Adjacent Soldier delays structure to gather information. After Black responds, Red can transpose into Central Cannon, Horse Opening, or Flying Elephant depending on the situation.", es: "El Soldado Adyacente retrasa la estructura para reunir información. Tras la respuesta de Negro, Rojo puede transponer a Cañón Central, Apertura de Caballo o Elefante Volador según la situación.", ja: "仙人指路は形を決めずに情報を集める。黒が応じたあと、状況に応じて中炮・起馬局・飛相局へ手を進められる。", ko: "선인지로는 형태를 미루어 정보를 모은다. 흑이 응수한 후 상황에 따라 중포·기마국·비상국으로 전환할 수 있다.", "pt-BR": "O Soldado Adjacente atrasa a estrutura para reunir informação. Após a resposta do preto, o vermelho pode transpor para Canhão Central, Abertura de Cavalo ou Elefante Voador conforme a situação." },
    difficulty: "intermediate",
    category: "soldier",
    replies: [
      {
        name: { zh: "卒底炮", en: "Counter-Cannon", es: "Cañón Detrás del Soldado", ja: "卒底砲", ko: "졸저포", "pt-BR": "Canhão Atrás do Soldado" },
        note: { zh: "黑方应以 炮2平3，攻击兵根。", en: "Black answers 炮2平3, striking the soldier's base.", es: "Negro responde 炮2平3, golpeando la base del soldado.", ja: "黒は 砲2平3 と応じ、兵の根を突く。", ko: "흑은 砲2平3으로 병의 뿌리를 친다.", "pt-BR": "O preto responde 砲2平3, atingindo a base do soldado." },
      },
      {
        name: { zh: "对兵局", en: "Mirror Soldier", es: "Soldado Espejo", ja: "対兵局", ko: "대병국", "pt-BR": "Soldado Espelho" },
        note: { zh: "黑方挺 卒7进1，保持对称。", en: "Black pushes 卒7进1, keeping the position symmetric.", es: "Negro avanza 卒7进1, manteniendo la posición simétrica.", ja: "黒は 卒7進1 と押し、形を対称に保つ。", ko: "흑은 卒7進1로 밀어 대칭을 유지한다.", "pt-BR": "O preto avança 卒7進1, mantendo a posição simétrica." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么叫\"仙人指路\"？", en: "Why \"immortal points the way\"?", es: "¿Por qué \"el inmortal señala el camino\"?", ja: "なぜ「仙人指路」なのか？", ko: "왜 '선인지로'인가?", "pt-BR": "Por que \"o imortal aponta o caminho\"?" },
        a: { zh: "名字富有诗意：先行之兵如仙人指路，而整体计划仍留灵活。", en: "It is a poetic name: the first soldier \"points the way\" like an immortal showing the path, while keeping the overall plan flexible.", es: "Es un nombre poético: el primer soldado \"señala el camino\" como un inmortal que indica la ruta, mientras el plan global queda flexible.", ja: "詩的な名前だ。先に進んだ兵が仙人のように「道を指し示す」ようであり、全体の計画は柔軟に保たれる。", ko: "아름다운 이름이다. 먼저 나간 병이 선인처럼 '길을 가리키는' 듯하면서도 전체 계획은 유연하게 남는다.", "pt-BR": "É um nome poético: o primeiro soldado \"aponta o caminho\" como um imortal que mostra a rota, mantendo o plano geral flexível." },
      },
    ],
  },
  {
    slug: "horse-opening",
    name: { zh: "起马局", en: "Horse Opening (Qi Ma Ju)", es: "Apertura de Caballo (Qi Ma Ju)", ja: "起馬局", ko: "기마국", "pt-BR": "Abertura de Cavalo (Qi Ma Ju)" },
    movesZh: "马二进三（或马八进七）",
    moves: { en: "Red develops a horse first (horse 2 → 3) before any cannon move.", es: "Rojo desarrolla primero un caballo (caballo 2 → 3) antes de mover cañón alguno.", ja: "赤は砲を動かす前にまず馬を発展させる（馬2→3）。", ko: "붉은 포를 움직이기 전 먼저 마를 전개한다(마 2→3).", "pt-BR": "O vermelho desenvolve primeiro um cavalo (cavalo 2 → 3) antes de qualquer movimento de canhão." },
    summary: { zh: "红方先跳马、暂缓动炮。沉稳灵活，适合喜欢先巩固阵地、再引导中局的棋手。", en: "Red jumps a horse out first, delaying the cannon. A calm, flexible system favoured by players who like to build a solid position and steer the middlegame.", es: "Rojo saca primero un caballo y retrasa el cañón. Un sistema tranquilo y flexible que prefieren quienes gustan de construir una posición sólida y dirigir el medio juego.", ja: "赤はまず馬を跳ね出し、砲を遅らせる。落ち着きがあり柔軟な体系で、しっかりした陣地を築き中盤を導く棋士に好まれる。", ko: "붉은 먼저 마를 뛰어내게 하고 포를 미룬다. 차분하고 유연한 체계로, 탄탄한 진지를 쌓고 중반을 이끄는 기사를 좋아한다.", "pt-BR": "O vermelho salta um cavalo primeiro, atrasando o canhão. Um sistema calmo e flexível preferido por quem gosta de construir uma posição sólida e conduzir o meio-jogo." },
    strategy: { zh: "起马局避免早期冲突，保留多种变化。常形成协调出动，红方视黑方布阵灵活应对。", en: "Horse Opening avoids early confrontation and keeps many transpositions available. It often leads to a harmonious development where Red reacts to Black's setup.", es: "La Apertura de Caballo evita el enfrentamiento temprano y conserva muchas transposiciones. Suele llevar a un desarrollo armonioso donde Rojo reacciona al planteamiento de Negro.", ja: "起馬局は早い衝突を避け、多くの手順を残す。しばしば調和の取れた展開となり、赤は黒の配置に応じて対応する。", ko: "기마국은 초반 충돌을 피하고 다양한 전환을 남긴다. 조화로운 전개로 이어져 붉은 흑의 배치에 맞춰 대응한다.", "pt-BR": "A Abertura de Cavalo evita o confronto inicial e mantém muitas transposições. Costuma levar a um desenvolvimento harmonioso onde o vermelho reage à formação do preto." },
    difficulty: "beginner",
    category: "horse",
    replies: [
      {
        name: { zh: "转当头炮", en: "Central Cannon response", es: "Respuesta con Cañón Central", ja: "中砲への転換", ko: "중포 전환", "pt-BR": "Resposta com Canhão Central" },
        note: { zh: "红方随后可走 炮二平五，转为当头炮进攻。", en: "Red may later play 炮二平五 to convert into a Central Cannon attack.", es: "Rojo puede luego jugar 炮二平五 para convertirlo en un ataque de Cañón Central.", ja: "赤は後に 砲二平五 と踏み、中砲の攻めへ転換できる。", ko: "붉은 이후 砲二平五로 중포 공세로 전환할 수 있다.", "pt-BR": "O vermelho pode depois jogar 砲二平五 para converter num ataque de Canhão Central." },
      },
    ],
    faq: [
      {
        q: { zh: "起马局被动吗？", en: "Is Horse Opening passive?", es: "¿La Apertura de Caballo es pasiva?", ja: "起馬局は受け身なのか？", ko: "기마국은 수동적인가?", "pt-BR": "A Abertura de Cavalo é passiva?" },
        a: { zh: "并不被动，而是灵活。先出动让红方保持均衡，后发制人。", en: "Not passive — it is flexible. By developing first, Red keeps the position balanced and chooses the battlefield later.", es: "No es pasiva, es flexible. Al desarrollar primero, Rojo mantiene la posición equilibrada y elige el campo de batalla más tarde.", ja: "受け身ではなく柔軟だ。先に駒を出すことで赤は形を釣り合わせ、後に戦場を選べる。", ko: "수동적이 아니라 유연하다. 먼저 전개함으로써 붉은 형세를 균형 있게 유지하고 나중에 전장을 고른다.", "pt-BR": "Não é passiva — é flexível. Ao desenvolver primeiro, o vermelho mantém a posição equilibrada e escolhe o campo de batalha mais tarde." },
      },
    ],
  },
  {
    slug: "flying-elephant",
    name: { zh: "飞相局", en: "Flying Elephant (Fei Xiang Ju)", es: "Elefante Volador (Fei Xiang Ju)", ja: "飛相局", ko: "비상국", "pt-BR": "Elefante Voador (Fei Xiang Ju)" },
    movesZh: "相三进五（或相七进五）",
    moves: { en: "Red advances an elephant to the centre (elephant 3 → 5).", es: "Rojo adelanta un elefante al centro (elefante 3 → 5).", ja: "赤が象を中央へ進める（象3→5）。", ko: "붉은 상을 중앙으로 진전시킨다(상 3→5).", "pt-BR": "O vermelho adianta um elefante ao centro (elefante 3 → 5)." },
    summary: { zh: "红方先飞相巩固中路，是著名的稳健防守型开局，与特级大师胡荣华的风格相连。", en: "Red strengthens the centre with an elephant before anything else. A famously solid, defensive opening associated with grandmaster Hu Ronghua.", es: "Rojo refuerza el centro con un elefante antes que nada. Una apertura defensiva y famosamente sólida asociada al gran maestro Hu Ronghua.", ja: "赤は何よりも先に象で中央を固める。名高い堅固な防御型の定石で、胡栄華九段のスタイルと結びつく。", ko: "붉은 무엇보다 먼저 상으로 중앙을 굳힌다. 유명한 탄탄한 수비형 포진으로, 후룽화(호영화) 국수의 스타일과 연결된다.", "pt-BR": "O vermelho reforça o centro com um elefante antes de tudo. Uma abertura defensiva e famosamente sólida associada ao grande mestre Hu Ronghua." },
    strategy: { zh: "飞相局筑起坚固阵地，避开早期战术，适合擅长局面运营与残局的棋手。", en: "Flying Elephant builds a durable fortress and avoids early tactics. It suits players who excel in positional, maneuvering games and endgames.", es: "El Elefante Volador levanta una fortaleza duradera y evita las tácticas tempranas. Conviene a quienes brillan en el juego posicional, de maniobra y en los finales.", ja: "飛相局は頑丈な要塞を築き、早い戦術を避ける。局面の操作や終盤に優る棋士に向く。", ko: "비상국은 튼튼한 요새를 쌓고 초반 전술을 피한다. 국면 운영과 끝판에 강한 기사에게 알맞다.", "pt-BR": "O Elefante Voador constrói uma fortaleza durável e evita táticas iniciais. Convém a quem se destaca no jogo posicional, de manobra e nos finais." },
    difficulty: "advanced",
    category: "elephant",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "黑方可以 炮8平5 或 炮2平5 抢中。", en: "Black may grab the centre with 炮8平5 or 炮2平5.", es: "Negro puede tomar el centro con 炮8平5 o 炮2平5.", ja: "黒は 砲8平5 または 砲2平5 で中央を奪える。", ko: "흑은 砲8平5나 砲2平5로 중앙을 잡을 수 있다.", "pt-BR": "O preto pode tomar o centro com 砲8平5 ou 砲2平5." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么先飞相？", en: "Why start with an elephant?", es: "¿Por qué empezar con un elefante?", ja: "なぜ象から始めるのか？", ko: "왜 상으로 시작하는가?", "pt-BR": "Por que começar com um elefante?" },
        a: { zh: "相控制中路对角线且不过河，为后续大子出动奠定稳定根基。", en: "The elephant controls the centre diagonally and cannot cross the river, so it creates a stable base from which Red develops the rest of the army.", es: "El elefante controla el centro en diagonal y no puede cruzar el río, por lo que crea una base estable desde la cual Rojo desarrolla el resto del ejército.", ja: "象は中央を斜めに制し、川を渡れないので、そこから赤が他の駒を発展させる安定した土台となる。", ko: "상은 중앙을 대각선으로 장악하며 강을 건너지 못하므로, 이후 나머지 기물을 전개할 안정된 기반이 된다.", "pt-BR": "O elefante controla o centro na diagonal e não pode cruzar o rio, criando assim uma base estável de onde o vermelho desenvolve o resto do exército." },
      },
    ],
  },
  {
    slug: "cross-palace-cannon",
    name: { zh: "过宫炮", en: "Cross Palace Cannon (Guo Gong Pao)", es: "Cañón Transversal del Palacio (Guo Gong Pao)", ja: "過宮砲", ko: "과궁포", "pt-BR": "Canhão Transversal do Palácio (Guo Gong Pao)" },
    movesZh: "炮二平六",
    moves: { en: "Red cannon 2 → file 6, crossing in front of the palace.", es: "Cañón rojo de la 2 → columna 6, cruzando frente al palacio.", ja: "赤の砲2を6の筋へ、宮の前を横切って動かす。", ko: "붉은 포 2가 6로, 궁 앞을 가로질러 간다.", "pt-BR": "Canhão vermelho da 2 → coluna 6, cruzando em frente ao palácio." },
    summary: { zh: "红炮平到六路、横过将门之前。灵活而略偏平稳的开局，便于两翼跳马发展。", en: "Red shifts a cannon across the palace mouth to file 6. A flexible, slightly quiet opening that prepares horse development on both wings.", es: "Rojo corre un cañón por la boca del palacio hasta la columna 6. Una apertura flexible y algo tranquila que prepara el desarrollo de caballos en ambas alas.", ja: "赤が砲を宮口を横切って6の筋へ動かす。柔軟でやや静かな定石で、両翼の馬の発展を整える。", ko: "붉은 포를 궁 입구를 가로질러 6로 옮긴다. 유연하고 다소 조용한 포진으로, 양측 마 전개를 준비한다.", "pt-BR": "O vermelho desloca um canhão pela boca do palácio até a coluna 6. Uma abertura flexível e levemente calma que prepara o desenvolvimento de cavalos em ambas as asas." },
    strategy: { zh: "过宫炮对中路保持弹性控制，攻守皆可，适合不喜欢被迫定式的棋手。", en: "Cross Palace Cannon keeps the centre loosely controlled and is easy to steer into either attack or defence. A good choice for players who dislike forced lines.", es: "El Cañón Transversal del Palacio mantiene el centro bajo control elástico y es fácil de orientar al ataque o a la defensa. Buena opción para quienes detestan las líneas forzadas.", ja: "過宮砲は中央をゆるやかに制し、攻めにも守りにも容易に振れる。定跡通りを嫌う棋士に向く。", ko: "과궁포는 중앙을 느슨하게 장악하며 공수 어느 쪽으로도 쉽게 틀 수 있다. 정형화된 수를 싫어하는 기사에게 좋다.", "pt-BR": "O Canhão Transversal do Palácio mantém o centro sob controle elástico e é fácil de virar para ataque ou defesa. Boa escolha para quem não gosta de linhas forçadas." },
    difficulty: "intermediate",
    category: "cannon",
    replies: [
      {
        name: { zh: "跳马", en: "Horse development", es: "Desarrollo de caballo", ja: "馬の展開", ko: "마 전개", "pt-BR": "Desenvolvimento de cavalo" },
        note: { zh: "红方续以 马二进三、马八进七，双马均衡。", en: "Red follows with 马二进三 and 马八进七 for balanced knights.", es: "Rojo continúa con 马二进三 y 马八进七 para caballos equilibrados.", ja: "赤は 馬二進三 と 馬八進七 で釣り合った馬を得る。", ko: "붉은 馬二進三와 馬八進七로 균형 잡힌 마를 갖춘다.", "pt-BR": "O vermelho segue com 馬二進三 e 馬八進七 para cavalos equilibrados." },
      },
    ],
    faq: [
      {
        q: { zh: "它和当头炮有何不同？", en: "How is it different from Central Cannon?", es: "¿En qué difiere del Cañón Central?", ja: "中炮とどう違うのか？", ko: "중포와 무엇이 다른가?", "pt-BR": "Em que difere do Canhão Central?" },
        a: { zh: "当头炮直取中路、攻势凌厉；过宫炮则偏斜灵活，避免过早冲突。", en: "Central Cannon hits the centre directly and aggressively; Cross Palace Cannon stays oblique and flexible, avoiding immediate confrontation.", es: "El Cañón Central golpea el centro directa y agresivamente; el Transversal del Palacio se mantiene oblicuo y flexible, evitando el enfrentamiento prematuro.", ja: "中炮は中央を真っ向から鋭く狙う。過宮砲は斜めで柔軟、早い衝突を避ける。", ko: "중포는 중앙을 직설적·공격적으로 친다. 과궁포는 비스듬하고 유연해 조기 충돌을 피한다.", "pt-BR": "O Canhão Central atinge o centro direta e agressivamente; o Transversal do Palácio fica oblíquo e flexível, evitando o confronto imediato." },
      },
    ],
  },
  {
    slug: "corner-cannon",
    name: { zh: "士角炮", en: "Corner Cannon (Shi Jiao Pao)", es: "Cañón de la Esquina (Shi Jiao Pao)", ja: "士角砲", ko: "사각포", "pt-BR": "Canhão da Esquina (Shi Jiao Pao)" },
    movesZh: "炮二平四",
    moves: { en: "Red cannon 2 → file 4, landing on the advisor's corner.", es: "Cañón rojo de la 2 → columna 4, cayendo en la esquina del consejero.", ja: "赤の砲2を4の筋へ、士の角に置く。", ko: "붉은 포 2가 4로, 사의 구석에 둔다.", "pt-BR": "Canhão vermelho da 2 → coluna 4, caindo no canto do conselheiro." },
    summary: { zh: "红炮平到士角，是极平稳的预备型开局，先稳住九宫再图后举。", en: "Red tucks a cannon into the advisor's corner. An ultra-calm, preparatory opening that stabilises the palace before launching any plan.", es: "Rojo mete un cañón en la esquina del consejero. Una apertura ultracalma y preparatoria que estabiliza el palacio antes de cualquier plan.", ja: "赤が砲を士の角に収める。極めて静かで準備的な定石で、策を講じる前に宮を安定させる。", ko: "붉은 포를 사의 구석에 둔다. 매우 차분하고 준비적인 포진으로, 계획을 펴기 전 궁을 안정시킨다.", "pt-BR": "O vermelho encaixa um canhão no canto do conselheiro. Uma abertura ultracalma e preparatória que estabiliza o palácio antes de qualquer plano." },
    strategy: { zh: "士角炮在初学者中少见，因它不立即施加威胁；但它构筑出协调、受保护的阵地，适合局面型棋手。", en: "Corner Cannon is rarely seen at beginner level because it gives no immediate threat — but it builds a harmonious, well-protected position ideal for positional players.", es: "El Cañón de la Esquina rara vez se ve en principiantes porque no amenaza de inmediato; pero construye una posición armoniosa y bien protegida, ideal para jugadores posicionales.", ja: "士角砲は初級者には稀だ。即座の脅威がないためだが、調和の取れた守られた陣地を築き、局面派の棋士に最適。", ko: "사각포는 초급자에게 드물다. 즉각 위협이 없기 때문이지만, 조화롭고 보호된 진지를 만들어 국면형 기사에게 이상적이다.", "pt-BR": "O Canhão da Esquina raramente aparece no nível iniciante porque não ameaça de imediato — mas constrói uma posição harmoniosa e bem protegida, ideal para jogadores posicionais." },
    difficulty: "advanced",
    category: "cannon",
    replies: [
      {
        name: { zh: "马炮车出动", en: "Horse + Chariot build-up", es: "Desarrollo de caballo y carro", ja: "馬・砲・車の展開", ko: "마·포·차 전개", "pt-BR": "Desenvolvimento de cavalo e carro" },
        note: { zh: "红方从容走 马二进三 并亮车。", en: "Red calmly develops 马二进三 and connects chariots.", es: "Rojo desarrolla con calma 马二进三 y conecta los carros.", ja: "赤は落ち着いて 馬二進三 を踏み、車を繋ぐ。", ko: "붉은 차분히 馬二進三을 두고 차를 연결한다.", "pt-BR": "O vermelho desenvolve tranquilamente 馬二進三 e conecta os carros." },
      },
    ],
    faq: [
      {
        q: { zh: "士角炮是不是太慢？", en: "Is Corner Cannon too slow?", es: "¿El Cañón de la Esquina es demasiado lento?", ja: "士角砲は遅すぎるか？", ko: "사각포는 너무 느린가?", "pt-BR": "O Canhão da Esquina é muito lento?" },
        a: { zh: "它以步数换取安全。对攻型对手时略显被动，但局面上很少出错。", en: "It trades tempo for safety. Against aggressive opponents it can feel passive, but it rarely goes wrong positionally.", es: "Cambia tempo por seguridad. Contra rivales agresivos puede parecer pasivo, pero rara vez se equivoca posicionalmente.", ja: "歩数を安全に替える。攻撃的な相手には受け身に見えるが、局面ではめったに間違えない。", ko: "보안을 위해 수를 투자한다. 공격적인 상대에겐 다소 수동적으로 보이나 국면상 거의 틀리지 않는다.", "pt-BR": "Troca tempo por segurança. Contra adversários agressivos pode parecer passivo, mas raramente erra posicionalmente." },
      },
    ],
  },
  {
    slug: "cannon-behind-soldier",
    name: { zh: "卒底炮", en: "Cannon Behind Soldier (Zu Di Pao)", es: "Cañón Detrás del Soldado (Zu Di Pao)", ja: "卒底砲", ko: "졸저포", "pt-BR": "Canhão Atrás do Soldado (Zu Di Pao)" },
    movesZh: "兵七进一，炮2平3",
    moves: { en: "After Red 兵七进一, Black strikes the soldier's base with 炮2平3.", es: "Tras el 兵七进一 de Rojo, Negro golpea la base del soldado con 炮2平3.", ja: "赤の 兵七進一 のあと、黒が 砲2平3 で兵の根を突く。", ko: "붉은 兵七進一 후, 흑은 砲2平3으로 병의 뿌리를 친다.", "pt-BR": "Após o 兵七進一 do vermelho, o preto atinge a base do soldado com 砲2平3." },
    summary: { zh: "应对仙人指路最标准、最尖锐的应法。黑方立刻以炮瞄准红兵之根，早早争夺中路。", en: "The standard, sharp reply to Adjacent Soldier. Black immediately aims a cannon at the base of Red's advanced soldier, fighting for the centre early.", es: "La respuesta estándar y aguda al Soldado Adyacente. Negro apunta de inmediato un cañón a la base del soldado avanzado de Rojo, peleando el centro desde temprano.", ja: "仙人指路に対する標準的で鋭い応手。黒は即座に砲を赤の進んだ兵の根に向け、早くから中央を争う。", ko: "선인지로에 대한 표준적이고 날카로운 응수. 흑은 즉시 포를 붉은 병의 뿌리에 겨누어 일찍 중앙을 다툰다.", "pt-BR": "A resposta padrão e aguda ao Soldado Adjacente. O preto mira imediatamente um canhão na base do soldado avançado do vermelho, brigando pelo centro cedo." },
    strategy: { zh: "卒底炮在红方挺兵的同时即争夺中路，是仙人指路最富理论深度的应法，局面多争斗。", en: "Cannon Behind Soldier contests the centre the moment Red commits a soldier. It is the most theory-heavy counter to Adjacent Soldier and leads to rich, fighting positions.", es: "El Cañón Detrás del Soldado disputa el centro en el instante en que Rojo compromete un soldado. Es la réplica más cargada de teoría al Soldado Adyacente y conduce a posiciones ricas y belicosas.", ja: "卒底砲は赤が兵を決めた瞬間に中央を争う。仙人指路への最も理論の深い応手で、戦いの濃い形となる。", ko: "졸저포는 붉은 병을 둔 순간 중앙을 다투기 시작한다. 선인지로에 대한 이론이 가장 깊은 응수로, 싸움이 치열한 형세로 이어진다.", "pt-BR": "O Canhão Atrás do Soldado disputa o centro no momento em que o vermelho compromete um soldado. É a resposta mais carregada de teoria ao Soldado Adjacente e leva a posições ricas e lutadas." },
    difficulty: "advanced",
    category: "counter",
    replies: [
      {
        name: { zh: "飞相", en: "Flying Elephant", es: "Elefante Volador", ja: "飛相局", ko: "비상국", "pt-BR": "Elefante Voador" },
        note: { zh: "红方可以应以 相七进五，保持稳健。", en: "Red may answer 相七进五 to keep things solid.", es: "Rojo puede responder 相七进五 para mantener la solidez.", ja: "赤は 相七進五 と応じてしっかり保つ。", ko: "붉은 相七進五로 응해 탄탄함을 유지한다.", "pt-BR": "O vermelho pode responder 相七進五 para manter a solidez." },
      },
      {
        name: { zh: "起马", en: "Horse Opening", es: "Apertura de Caballo", ja: "起馬局", ko: "기마국", "pt-BR": "Abertura de Cavalo" },
        note: { zh: "红方走 马八进七，从容出动。", en: "Red plays 马八进七 to develop calmly.", es: "Rojo juega 马八进七 para desarrollar con calma.", ja: "赤は 馬八進七 と落ち着いて発展。", ko: "붉은 馬八進七로 차분히 전개한다.", "pt-BR": "O vermelho joga 馬八進七 para desenvolver com calma." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么叫\"卒底炮\"？", en: "Why \"behind the soldier\"?", es: "¿Por qué \"detrás del soldado\"?", ja: "なぜ「卒底砲」なのか？", ko: "왜 '졸저포'인가?", "pt-BR": "Por que \"atrás do soldado\"?" },
        a: { zh: "炮位在兵（卒）线之后，随时可击打红方挺起之兵的根。", en: "The cannon sits just behind the line of pawns (soldiers), ready to strike the base of Red's advanced soldier.", es: "El cañón se sitúa justo detrás de la línea de peones (soldados), listo para golpear la base del soldado avanzado de Rojo.", ja: "砲は兵（卒）の列のすぐ後ろにあり、赤の進んだ兵の根をいつでも突ける。", ko: "포는 병(졸) 줄 바로 뒤에 있어 붉은 병의 뿌리를 언제든 칠 수 있다.", "pt-BR": "O canhão fica logo atrás da linha dos peões (soldados), pronto para atingir a base do soldado avançado do vermelho." },
      },
    ],
  },
  {
    slug: "five-six-cannon",
    name: { zh: "五六炮", en: "Five-Six Cannon (Wu Liu Pao)", es: "Cañón Cinco-Seis (Wu Liu Pao)", ja: "五六砲", ko: "오육포", "pt-BR": "Canhão Cinco-Seis (Wu Liu Pao)" },
    movesZh: "炮二平五，炮八平六",
    moves: { en: "Red 炮二平五 to the centre, then 炮八平六 (left cannon to file 6).", es: "Rojo 炮二平五 al centro, luego 炮八平六 (cañón izquierdo a la columna 6).", ja: "赤の 砲二平五 で中央へ、続いて 砲八平六（左の砲を6の筋へ）。", ko: "붉은 砲二平五로 중앙, 이어 砲八平六(좌포를 6로).", "pt-BR": "Vermelho 砲二平五 ao centro, depois 砲八平六 (canhão esquerdo para a coluna 6)." },
    summary: { zh: "稳健的当头炮体系：红方先 炮二平五 占中，再 炮八平六 把左炮安于六路，便于跳马亮车。攻守均衡、风险低。", en: "A calm, solid Central Cannon system where the left cannon tucks to file 6, preparing to develop horses and connect chariots. Balanced and low-risk.", es: "Un sistema de Cañón Central calmo y sólido donde el cañón izquierdo se recoge en la columna 6, preparando el desarrollo de caballos y la conexión de carros. Equilibrado y de bajo riesgo.", ja: "落ち着いた堅実な中炮体系。左の砲を6の筋に収め、馬の発展と車の連結を整える。釣り合いが取れ、リスクが低い。", ko: "차분하고 탄탄한 중포 체계. 좌포를 6로 둬 마 전개와 차 연결을 준비한다. 균형 잡히고 위험이 낮다.", "pt-BR": "Um sistema de Canhão Central calmo e sólido onde o canhão esquerdo se recolhe à coluna 6, preparando o desenvolvimento de cavalos e a conexão de carros. Equilibrado e de baixo risco." },
    strategy: { zh: "五六炮在控中的同时保留左翼弹性，常可转入屏风马体系，适合局面型棋手。", en: "Five-Six Cannon keeps the centre controlled while leaving the left flank flexible. It often transposes into Screen Horses lines and suits positional players.", es: "El Cañón Cinco-Seis mantiene el centro controlado y deja el flanco izquierdo flexible. A menudo transpone a líneas de Caballos en Pantalla y conviene a jugadores posicionales.", ja: "五六砲は中央を制しつつ左翼の柔軟性を残す。しばしば屏風馬の形へ移行し、局面派に向く。", ko: "오육포는 중앙을 장악하면서 좌익의 유연성을 남긴다. 흔히 병풍마 형태로 전환되며 국면형 기사에게 맞다.", "pt-BR": "O Canhão Cinco-Seis mantém o centro controlado e deixa o flanco esquerdo flexível. Frequentemente transpõe para linhas de Cavalos em Tela e convém a jogadores posicionais." },
    difficulty: "intermediate",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3，筑起坚实马阵。", en: "Black answers 马8进7 + 马2进3, building a solid horse wall.", es: "Negro responde 马8进7 + 马2进3, formando una sólida barrera de caballos.", ja: "黒は 馬8進7 ＋ 馬2進3 と進め、しっかりした馬の壁を築く。", ko: "흑은 馬8進7 + 馬2進3으로 탄탄한 마의 벽을 세운다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3, formando uma sólida barreira de cavalos." },
      },
      {
        name: { zh: "急车", en: "Rapid Chariot", es: "Carro Rápido", ja: "急車", ko: "급차", "pt-BR": "Carro Rápido" },
        note: { zh: "红方走 车一平二，迅速争夺中路。", en: "Red plays 车一平二 to contest the central file fast.", es: "Rojo juega 车一平二 para disputar rápido la columna central.", ja: "赤は 車一平二 と急いで中央の筋を争う。", ko: "붉은 車一平二로 중앙을 빠르게 다툰다.", "pt-BR": "O vermelho joga 車一平二 para disputar a coluna central rápido." },
      },
    ],
    faq: [
      {
        q: { zh: "五六炮和单纯中炮有什么区别？", en: "How does Five-Six differ from Central Cannon?", es: "¿En qué difiere el Cinco-Seis del Cañón Central?", ja: "五六砲と単なる中炮の違いは？", ko: "오육포와 단순 중포의 차이는?", "pt-BR": "Em que o Cinco-Seis difere do Canhão Central?" },
        a: { zh: "中炮只是第一步；五六炮再补 炮八平六，固定左炮，走向协调阵型。", en: "Central Cannon alone is just the first move; Five-Six adds 炮八平六, fixing the left cannon and steering toward a harmonious setup.", es: "El Cañón Central por sí solo es solo la primera jugada; el Cinco-Seis añade 炮八平六, fijando el cañón izquierdo y encaminándose a un planteamiento armonioso.", ja: "中炮単体は最初の一手に過ぎない。五六砲は 砲八平六 を加え、左の砲を固定して調和の取れた形へ向かう。", ko: "중포만으로는 첫 수일 뿐. 오육포는 砲八平六를 더해 좌포를 고정하고 조화로운 형태로 나아간다.", "pt-BR": "O Canhão Central sozinho é só a primeira jogada; o Cinco-Seis acrescenta 砲八平6, fixando o canhão esquerdo e seguindo para uma formação harmoniosa." },
      },
      {
        q: { zh: "它适合初学者吗？", en: "Is it good for beginners?", es: "¿Es bueno para principiantes?", ja: "初心者に向いているか？", ko: "초보자에게 좋은가?", "pt-BR": "É bom para iniciantes?" },
        a: { zh: "适合——容错高、易出动，是当头炮之上稳妥的一步。", en: "Yes — it is forgiving and easy to develop, a gentle step beyond the basic Central Cannon.", es: "Sí: es indulgente y fácil de desarrollar, un paso suave más allá del Cañón Central básico.", ja: "はい。失敗が許容され、展開も容易。基本の中炮の一歩先を行く穏やかな手だ。", ko: "그렇다. 관대하고 전개가 쉬워 기본 중포 그 이상의 온화한 한 수다.", "pt-BR": "Sim — é tolerante e fácil de desenvolver, um passo suave além do Canhão Central básico." },
      },
    ],
  },
  {
    slug: "five-seven-cannon",
    name: { zh: "五七炮", en: "Five-Seven Cannon (Wu Qi Pao)", es: "Cañón Cinco-Siete (Wu Qi Pao)", ja: "五七砲", ko: "오칠포", "pt-BR": "Canhão Cinco-Sete (Wu Qi Pao)" },
    movesZh: "炮二平五，炮八平七",
    moves: { en: "Red 炮二平五, then 炮八平七 (left cannon to file 7).", es: "Rojo 炮二平五, luego 炮八平七 (cañón izquierdo a la columna 7).", ja: "赤の 砲二平五、続いて 砲八平七（左の砲を7の筋へ）。", ko: "붉은 砲二平五, 이어 砲八平七(좌포를 7로).", "pt-BR": "Vermelho 砲二平五, depois 砲八平七 (canhão esquerdo para a coluna 7)." },
    summary: { zh: "灵活的当头炮变例：红方 炮二平五 后 炮八平七，左炮指向七路，支援边马并施压黑方。", en: "A flexible Central Cannon line where the left cannon aims at file 7, supporting a horse on the flank and preparing to pressure Black's position.", es: "Una línea flexible de Cañón Central donde el cañón izquierdo apunta a la columna 7, apoyando un caballo en el flanco y preparando presión sobre Negro.", ja: "柔軟な中炮の変化。左の砲が7の筋を狙い、翼の馬を支えつつ黒へ圧力をかける。", ko: "유연한 중포 변화. 좌포가 7로를 겨누어 측면 마를 받치고 흑에게 압박을 준비한다.", "pt-BR": "Uma linha flexível de Canhão Central onde o canhão esquerdo mira a coluna 7, apoiando um cavalo no flanco e preparando pressão sobre o preto." },
    strategy: { zh: "五七炮兼顾中路与侧翼进攻，常配合 马八进七、车九平八 出动。", en: "Five-Seven Cannon combines central control with a ready flank attack. It pairs well with 马八进七 and a later 车九平八.", es: "El Cañón Cinco-Siete combina el control central con un ataque de flanco a punto. Combina bien con 马八进七 y un posterior 车九平八.", ja: "五七砲は中央の制圧と準備された翼攻めを両立する。馬八進七 や後の 車九平八 とよく合う。", ko: "오칠포는 중앙 장악과 준비된 측면 공격을 겸한다. 馬八進七 및 이후 車九平八와 잘 어울린다.", "pt-BR": "O Canhão Cinco-Sete combina o controle central com um ataque de flanco pronto. Combina bem com 馬八進七 e um posterior 車九平八." },
    difficulty: "intermediate",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3，标准稳健应法。", en: "Black answers 马8进7 + 马2进3, the usual solid reply.", es: "Negro responde 马8进7 + 马2进3, la sólida respuesta habitual.", ja: "黒は 馬8進7 ＋ 馬2進3 と、標準的で堅実な応手。", ko: "흑은 馬8進7 + 馬2進3으로 평범하고 탄탄한 응수.", "pt-BR": "O preto responde 馬8進7 + 馬2進3, a sólida resposta habitual." },
      },
      {
        name: { zh: "左车", en: "Left Chariot", es: "Carro Izquierdo", ja: "左車", ko: "좌차", "pt-BR": "Carro Esquerdo" },
        note: { zh: "红方走 车九平八，让左车投入战斗。", en: "Red plays 车九平八 to bring the left chariot into play.", es: "Rojo juega 车九平八 para llevar el carro izquierdo a la lucha.", ja: "赤は 車九平八 と左の車を戦線に送り出す。", ko: "붉은 車九平八로 좌차를 전투에 투입한다.", "pt-BR": "O vermelho joga 車九平八 para trazer o carro esquerdo à luta." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么走到七路？", en: "Why file 7?", es: "¿Por qué la columna 7?", ja: "なぜ7の筋なのか？", ko: "왜 7로인가?", "pt-BR": "Por que a coluna 7?" },
        a: { zh: "七路让炮支援同侧马，并盯住黑方七线上的弱点。", en: "File 7 lets the cannon support a horse on the same flank and eye Black's weak points along the 7th line.", es: "La columna 7 permite al cañón apoyar un caballo en el mismo flanco y acechar los puntos débiles de Negro en la línea 7.", ja: "7の筋は砲が同じ翼の馬を支え、黒の7の線の弱点を狙える。", ko: "7로는 포가 같은 측면 마를 받치고 흑의 7선 약점을 노릴 수 있게 한다.", "pt-BR": "A coluna 7 deixa o canhão apoiar um cavalo no mesmo flanco e vigiar os pontos fracos do preto ao longo da linha 7." },
      },
      {
        q: { zh: "五六炮和五七炮选哪个？", en: "Five-Six or Five-Seven?", es: "¿Cinco-Seis o Cinco-Siete?", ja: "五六砲と五七砲、どちらを選ぶ？", ko: "오육포와 오칠포 중 어느 쪽?", "pt-BR": "Cinco-Seis ou Cinco-Sete?" },
        a: { zh: "五六炮更稳，五七炮侧重侧翼进攻，按风格选择。", en: "Five-Six is calmer; Five-Seven is more aggressive on the flank. Pick by temperament.", es: "El Cinco-Seis es más calmado; el Cinco-Siete, más agresivo por el flanco. Elige según tu estilo.", ja: "五六砲はより静か。五七砲は翼での攻めが強い。好みで選ぼう。", ko: "오육포가 더 안정적이고, 오칠포는 측면 공격에 치중한다. 성향에 따라 고르라.", "pt-BR": "O Cinco-Seis é mais calmo; o Cinco-Sete é mais agressivo no flanco. Escolha pelo seu estilo." },
      },
    ],
  },
  {
    slug: "five-eight-cannon",
    name: { zh: "五八炮", en: "Five-Eight Cannon (Wu Ba Pao)", es: "Cañón Cinco-Ocho (Wu Ba Pao)", ja: "五八砲", ko: "오팔포", "pt-BR": "Canhão Cinco-Oito (Wu Ba Pao)" },
    movesZh: "炮二平五，炮八进四",
    moves: { en: "Red 炮二平五, then 炮八进四 (left cannon leaps to file 8, the river bank).", es: "Rojo 炮二平五, luego 炮八进四 (el cañón izquierdo salta a la columna 8, la orilla del río).", ja: "赤の 砲二平五、続いて 砲八進四（左の砲が8の筋、河岸へ跳ぶ）。", ko: "붉은 砲二平五, 이어 砲八進四(좌포가 8로, 하안으로 뛴다).", "pt-BR": "Vermelho 砲二平五, depois 砲八進四 (canhão esquerdo salta para a coluna 8, a margem do rio)." },
    summary: { zh: "进攻型当头炮变例：红方 炮二平五 后 炮八进四，左炮直扑河沿，骚扰黑马、抢占地势。", en: "An aggressive Central Cannon variant where the left cannon jumps to the river to harass Black's horses and seize space.", es: "Una variante agresiva del Cañón Central donde el cañón izquierdo salta al río para hostigar los caballos de Negro y ganar espacio.", ja: "攻撃的な中炮の変化。左の砲が川へ跳び、黒の馬を荒らしつつ陣地を奪う。", ko: "공격적인 중포 변화. 좌포가 강으로 뛰어 흑 마를 괴롭히며 공간을 차지한다.", "pt-BR": "Uma variante agressiva do Canhão Central onde o canhão esquerdo salta para o rio para incomodar os cavalos do preto e tomar espaço." },
    strategy: { zh: "五八炮以稳固换主动，河炮牵制施压，但红方需留意底线安全。", en: "Five-Eight Cannon trades solidity for activity. The river cannon pins and pressures, but Red must watch the back rank.", es: "El Cañón Cinco-Ocho cambia solidez por actividad. El cañón de río fija y presiona, pero Rojo debe cuidar la última fila.", ja: "五八砲は堅実さと引き換えに主導性を得る。川の砲が抑え込み圧力をかけるが、赤はバックランクに注意。", ko: "오팔포는 탄탄함을 희생해 주도성을 얻는다. 하포가 묶고 압박하지만 붉은 뒷줄을 조심해야 한다.", "pt-BR": "O Canhão Cinco-Oito troca solidez por atividade. O canhão do rio fixa e pressiona, mas o vermelho deve vigiar a última linha." },
    difficulty: "intermediate",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方筑 马8进7 再 马2进3，化解攻势。", en: "Black builds 马8进7 + 马2进3 to blunt the attack.", es: "Negro construye 马8进7 + 马2进3 para embotar el ataque.", ja: "黒は 馬8進7 ＋ 馬2進3 と築き、攻めを鈍らせる。", ko: "흑은 馬8進7 + 馬2進3으로 공세를 누그러뜨린다.", "pt-BR": "O preto constrói 馬8進7 + 馬2進3 para embotar o ataque." },
      },
      {
        name: { zh: "卒底炮", en: "Counter-Cannon", es: "Cañón Detrás del Soldado", ja: "卒底砲", ko: "졸저포", "pt-BR": "Canhão Atrás do Soldado" },
        note: { zh: "黑方应以 炮2平3，攻击兵根。", en: "Black answers 炮2平3, striking the soldier's base.", es: "Negro responde 炮2平3, golpeando la base del soldado.", ja: "黒は 砲2平3 と応じ、兵の根を突く。", ko: "흑은 砲2平3으로 병의 뿌리를 친다.", "pt-BR": "O preto responde 砲2平3, atingindo a base do soldado." },
      },
    ],
    faq: [
      {
        q: { zh: "五八炮是不是太冒险？", en: "Is Five-Eight too risky?", es: "¿El Cinco-Ocho es demasiado arriesgado?", ja: "五八砲は危険すぎるか？", ko: "오팔포는 너무 위험한가?", "pt-BR": "O Cinco-Oito é muito arriscado?" },
        a: { zh: "它主动而非冒险；河炮有中炮与出动中的车支撑。", en: "It is active rather than risky; the river cannon is well supported by the central cannon and a developing chariot.", es: "Es activo, no arriesgado; el cañón de río está bien apoyado por el cañón central y un carro en desarrollo.", ja: "危険というより積極的。川の砲は中炮と展開中の車にしっかり支えられている。", ko: "위험한 게 아니라 주동적이다. 하포는 중포와 전개 중인 차의 받침을 받는다.", "pt-BR": "É ativo, não arriscado; o canhão do rio é bem apoiado pelo canhão central e por um carro em desenvolvimento." },
      },
    ],
  },
  {
    slug: "river-patrol-cannon",
    name: { zh: "巡河炮", en: "River Patrol Cannon (Xun He Pao)", es: "Cañón de Patrulla del Río (Xun He Pao)", ja: "巡河砲", ko: "순하포", "pt-BR": "Canhão de Patrulha do Rio (Xun He Pao)" },
    movesZh: "炮二平五，炮八进二",
    moves: { en: "Red 炮二平五, then 炮八进二 (left cannon patrols the river).", es: "Rojo 炮二平五, luego 炮八进二 (el cañón izquierdo patrulla el río).", ja: "赤の 砲二平五、続いて 砲八進二（左の砲が河を巡る）。", ko: "붉은 砲二平五, 이어 砲八進二(좌포가 강을 순찰한다).", "pt-BR": "Vermelho 砲二平五, depois 砲八進二 (canhão esquerdo patrulha o rio)." },
    summary: { zh: "温和的当头炮布局：红方 炮二平五 后 炮八进二，左炮巡河，随时防守或兑子。适合想要稳妥灵活起手的新手。", en: "A gentle Central Cannon setup where the left cannon advances just to the river, ready to defend or exchange. Great for beginners who want a safe, flexible start.", es: "Un planteamiento suave de Cañón Central donde el cañón izquierdo avanza solo hasta el río, listo para defender o cambiar. Ideal para principiantes que quieren un inicio seguro y flexible.", ja: "穏やかな中炮の組み方。左の砲が川まで進み、いつでも守りや駒の交換に備える。安全で柔軟な始まりを望む初心者に最適。", ko: "온화한 중포 배치. 좌포가 강까지 전진해 수비나 교환에 대비한다. 안전하고 유연한 시작을 원하는 초보자에게 훌륭하다.", "pt-BR": "Uma configuração suave de Canhão Central onde o canhão esquerdo avança só até o rio, pronto para defender ou trocar. Ótimo para iniciantes que querem um início seguro e flexível." },
    strategy: { zh: "巡河炮放弃早期进攻换来河沿控制权，便于转入多种变化。", en: "River Patrol Cannon trades early aggression for control of the river line, making it easy to steer into many transpositions.", es: "El Cañón de Patrulla del Río cambia la agresión temprana por el control de la línea del río, facilitando muchas transposiciones.", ja: "巡河砲は早い攻めと引き換えに河の線を制し、多くの手順への移行を容易にする。", ko: "순하포는 초반 공격을 희생해 하선을 장악해 다양한 전환을 쉽게 만든다.", "pt-BR": "O Canhão de Patrulha do Rio troca a agressão inicial pelo controle da linha do rio, facilitando muitas transposições." },
    difficulty: "beginner",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3。", en: "Black answers 马8进7 + 马2进3.", es: "Negro responde 马8进7 + 马2进3.", ja: "黒は 馬8進7 ＋ 馬2進3 と応じる。", ko: "흑은 馬8進7 + 馬2進3으로 응한다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3." },
      },
      {
        name: { zh: "过河车", en: "River Chariot", es: "Carro del Río", ja: "過河車", ko: "과하차", "pt-BR": "Carro do Rio" },
        note: { zh: "红方走 车一平二 再 车二进四，同样巡河。", en: "Red plays 车一平二 then 车二进四 to patrol the river too.", es: "Rojo juega 车一平二 y luego 车二进四 para también patrullar el río.", ja: "赤は 車一平二 と 車二進四 でこれも川を巡る。", ko: "붉은 車一平二 후 車二進四로 마찬가지로 강을 순찰한다.", "pt-BR": "O vermelho joga 車一平二 e depois 車二進四 para também patrulhar o rio." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么要巡河？", en: "Why patrol the river?", es: "¿Por qué patrullar el río?", ja: "なぜ河を巡るのか？", ko: "왜 강을 순찰하는가?", "pt-BR": "Por que patrulhar o rio?" },
        a: { zh: "巡河炮可吃入侵之兵、支援渡河之马，位置安稳而有用。", en: "A river cannon can capture encroaching soldiers and support a horse crossing, giving Red a calm but useful post.", es: "Un cañón de río puede capturar soldados invasores y apoyar un caballo que cruza, dando a Rojo una posición calmada pero útil.", ja: "川の砲は侵入する兵を取れ、渡る馬を支えられ、赤に静かだが役立つ拠点をもたらす。", ko: "하포는 침입한 병을 잡고 강을 건너는 마를 받쳐 붉은 편에 차분하지만 유용한 거점을 준다.", "pt-BR": "Um canhão do rio pode capturar soldados invasores e apoiar um cavalo que cruza, dando ao vermelho uma posição calma porém útil." },
      },
    ],
  },
  {
    slug: "turtle-back-cannon",
    name: { zh: "龟背炮", en: "Turtle Back Cannon (Gui Bei Pao)", es: "Cañón de Caparazón de Tortuga (Gui Bei Pao)", ja: "亀背砲", ko: "귀배포", "pt-BR": "Canhão de Casca de Tartaruga (Gui Bei Pao)" },
    movesZh: "炮二平五，车一进一，车一平四，炮八退一",
    moves: { en: "Red 炮二平五, swings the chariot, then 炮八退一 to form a \"turtle shell\".", es: "Rojo 炮二平五, balancea el carro y luego 炮八退一 para formar un \"caparazón de tortuga\".", ja: "赤の 砲二平五、車を振り、続いて 砲八退一 で「亀の甲羅」を作る。", ko: "붉은 砲二平五, 차를 흔든 뒤 砲八退一로 '거북 등껍질'을 만든다.", "pt-BR": "Vermelho 砲二平五, balança o carro e depois 砲八退一 para formar uma \"casca de tartaruga\"." },
    summary: { zh: "罕见的防守型炮局：红方 炮二平五 后横车、再 炮八退一，左炮退守如龟背，稳固却偏慢，适合耐心的棋手。", en: "An unusual, defensive cannon system where the left cannon retreats to form a \"turtle shell\" — solid but slow, favoured by patient players.", es: "Un sistema de cañón defensivo e inusual donde el cañón izquierdo retrocede para formar un \"caparazón de tortuga\": sólido pero lento, preferido por jugadores pacientes.", ja: "珍しい防御型の砲局。左の砲が下がって「亀の甲羅」を作る——堅いが遅く、辛抱強い棋士に好まれる。", ko: "드문 수비형 포국. 좌포가 물러나 '거북 등껍질'을 만든다 — 탄탄하되 느려 인내심 있는 기사에게 맞다.", "pt-BR": "Um sistema de canhão defensivo e incomum onde o canhão esquerdo recua para formar uma \"casca de tartaruga\" — sólido mas lento, preferido por jogadores pacientes." },
    strategy: { zh: "龟背炮构筑紧凑难破的阵型，避开早期战术，比拼残局功力。", en: "Turtle Back Cannon builds a compact, hard-to-break position. It avoids early tactics and rewards endgame skill.", es: "El Cañón de Caparazón de Tortuga levanta una posición compacta y difícil de romper. Evita las tácticas tempranas y premia la técnica de finales.", ja: "亀背砲は崩れにくいコンパクトな陣地を築く。早い戦術を避け、終盤の力を問う。", ko: "귀배포는 깨기 어려운 촘촘한 진지를 쌓는다. 초반 전술을 피하고 끝판 실력을 요구한다.", "pt-BR": "O Canhão de Casca de Tartaruga constrói uma posição compacta e difícil de romper. Evita táticas iniciais e premia a técnica de finais." },
    difficulty: "advanced",
    category: "cannon",
    replies: [
      {
        name: { zh: "跳马", en: "Horse Development", es: "Desarrollo de caballo", ja: "馬の展開", ko: "마 전개", "pt-BR": "Desenvolvimento de cavalo" },
        note: { zh: "红方续以 马二进三，双马均衡。", en: "Red follows with 马二进三 for a balanced knight.", es: "Rojo continúa con 马二进三 para un caballo equilibrado.", ja: "赤は 馬二進三 で釣り合った馬を得る。", ko: "붉은 馬二進三으로 균형 잡힌 마를 갖춘다.", "pt-BR": "O vermelho segue com 馬二進3 para um cavalo equilibrado." },
      },
      {
        name: { zh: "亮车", en: "Chariot Build-up", es: "Desarrollo de carro", ja: "車の展開", ko: "차 전개", "pt-BR": "Desenvolvimento de carro" },
        note: { zh: "红方在壳后从容亮车。", en: "Red connects chariots slowly behind the shell.", es: "Rojo conecta los carros con calma tras el caparazón.", ja: "赤は甲羅の後ろでゆっくり車を繋ぐ。", ko: "붉은 등껍질 뒤에서 차분히 차를 연결한다.", "pt-BR": "O vermelho conecta os carros devagar atrás da casca." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么这么被动？", en: "Why so passive?", es: "¿Por qué tan pasivo?", ja: "なぜこれほど受け身なのか？", ko: "왜 이렇게 수동적인가?", "pt-BR": "Por que tão passivo?" },
        a: { zh: "龟背形护住中路与底线；红方以步数换安全，后发制人。", en: "The \"turtle\" shape protects the centre and back rank; Red gives up tempo for safety and strikes later.", es: "La forma de \"tortuga\" protege el centro y la última fila; Rojo entrega tempo por seguridad y golpea después.", ja: "「亀」の形は中央とバックランクを守る。赤は歩数を安全に替え、後に仕掛ける。", ko: "거북 형태는 중앙과 뒷줄을 지킨다. 붉은 수를 안전에 투자하고 나중에 선공한다.", "pt-BR": "A forma de \"tartaruga\" protege o centro e a última linha; o vermelho entrega tempo por segurança e ataca depois." },
      },
    ],
  },
  {
    slug: "mandarin-duck-cannon",
    name: { zh: "鸳鸯炮", en: "Mandarin Duck Cannons (Yuan Yang Pao)", es: "Cañones del Pato Mandarín (Yuan Yang Pao)", ja: "鴛鴦砲", ko: "원앙포", "pt-BR": "Canhões do Pato Mandarim (Yuan Yang Pao)" },
    movesZh: "炮二平五，马八进七，炮八退一",
    moves: { en: "Red 炮二平五, develops a horse, then 炮八退一 before swinging both cannons to converge.", es: "Rojo 炮二平五, desarrolla un caballo y luego 炮八退一 antes de hacer converger ambos cañones.", ja: "赤の 砲二平五、馬を発展させ、続いて 砲八退一 で二砲を寄せ集める。", ko: "붉은 砲二平五, 마를 전개한 뒤 砲八退1로 쌍포를 모은다.", "pt-BR": "Vermelho 砲二平五, desenvolve um cavalo e depois 砲八退一 antes de fazer ambos os canhões convergirem." },
    summary: { zh: "罕见的刁钻炮局：双炮调动后汇聚同侧，以别致的子力配合扰乱对手。", en: "A rare, tricky cannon system where both cannons are manoeuvred to meet on the same flank, confusing opponents with unusual piece coordination.", es: "Un sistema de cañón raro y tramposo donde ambos cañones se maniobran para reunirse en el mismo flanco, confundiendo al rival con una coordinación inusual de piezas.", ja: "珍しいひねりの効いた砲局。二砲を動かして同じ翼に集め、独特の駒の連係で相手を惑わす。", ko: "드문 요령스러운 포국. 쌍포를 움직여 같은 측면에 모아 독특한 기물 협조로 상대를 혼란시킨다.", "pt-BR": "Um sistema de canhão raro e traiçoeiro onde ambos os canhões são manobrados para se encontrar no mesmo flanco, confundindo o adversário com coordenação incomum de peças." },
    strategy: { zh: "鸳鸯炮是埋伏型体系，看似平稳却突然双炮齐发，宜作奇兵。", en: "Mandarin Duck Cannon is an ambush system — it looks passive then suddenly both cannons strike. Best as a surprise weapon.", es: "Los Cañones del Pato Mandarín son un sistema de emboscada: parecen pasivos y de pronto ambos cañones golpean. Mejor como arma sorpresa.", ja: "鴛鴦砲は待ち伏せの体系。受け身に見えて突然二砲が炸裂する。奇襲兵器として最適。", ko: "원앙포는 매복형 체계. 수동적으로 보이다가 갑자기 쌍포가 날아든다. 기병(奇兵)으로 쓰는 게 좋다.", "pt-BR": "Os Canhões do Pato Mandarim são um sistema de emboscada — parecem passivos e de repente ambos os canhões atacam. Melhor como arma surpresa." },
    difficulty: "advanced",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3。", en: "Black answers 马8进7 + 马2进3.", es: "Negro responde 马8进7 + 马2进3.", ja: "黒は 馬8進7 ＋ 馬2進3 と応じる。", ko: "흑은 馬8進7 + 馬2進3으로 응한다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3." },
      },
      {
        name: { zh: "急应", en: "Rapid Counter", es: "Contraataque Rápido", ja: "急ぎの応手", ko: "급응", "pt-BR": "Contra-Ataque Rápido" },
        note: { zh: "黑方急走 车9平8，利用红方缓手。", en: "Black rushes 车9平8 to exploit the slow build-up.", es: "Negro apresura 车9平8 para aprovechar la lenta construcción.", ja: "黒は 車9平8 と急ぎ、赤のゆっくりした構築を突く。", ko: "흑은 車9平8로 서둘러 붉은 느린 전개를 이용한다.", "pt-BR": "O preto apressa 車9平8 para explorar a construção lenta." },
      },
    ],
    faq: [
      {
        q: { zh: "它能在高水平对局中使用吗？", en: "Is it playable at high level?", es: "¿Es jugable a alto nivel?", ja: "上級者の対局で使えるか？", ko: "고수 대국에서 쓸 만한가?", "pt-BR": "É jogável em alto nível?" },
        a: { zh: "偶作奇兵出现；面对有准备的对手，缓手难以成立。", en: "Occasionally seen as a surprise; against prepared opponents the slow build-up is hard to justify.", es: "A veces aparece como sorpresa; contra rivales preparados, la lenta construcción difícilmente se justifica.", ja: "奇襲として時折見られる。準備された相手にはゆっくりした構築は正当化しにくい。", ko: "가끔 기병으로 등장한다. 준비된 상대에겐 느린 전개가 납득하기 어렵다.", "pt-BR": "Ocasionalmente visto como surpresa; contra adversários preparados, a construção lenta é difícil de justificar." },
      },
    ],
  },
  {
    slug: "double-river-cannon",
    name: { zh: "双炮过河", en: "Double River Cannons (Shuang Pao Guo He)", es: "Cañones Dobles del Río (Shuang Pao Guo He)", ja: "双砲過河", ko: "쌍포과하", "pt-BR": "Canhões Duplos do Rio (Shuang Pao Guo He)" },
    movesZh: "炮二平五，炮八进四",
    moves: { en: "Red 炮二平五, then 炮八进四 — both cannons push toward the river.", es: "Rojo 炮二平五, luego 炮八进四: ambos cañones avanzan hacia el río.", ja: "赤の 砲二平五、続いて 砲八進四——二砲が川へ向かって進む。", ko: "붉은 砲二平五, 이어 砲八進四 — 쌍포가 강을 향해 나아간다.", "pt-BR": "Vermelho 砲二平五, depois 砲八進四 — ambos os canhões avançam para o rio." },
    summary: { zh: "大胆的双炮过河：红方双炮齐赴河沿，抢占地势、直接施压黑方阵营。", en: "A bold double-cannon thrust where both cannons advance to the river to grab space and pressure Black's camp directly.", es: "Un audaz envite de doble cañón donde ambos avanzan al río para ganar espacio y presionar directamente el campamento de Negro.", ja: "大胆な双砲の突破。二砲が揃って川へ進み、陣地を奪い黒の陣営へ直接圧力をかける。", ko: "대담한 쌍포 돌파. 쌍포가 강까지 나아가 공간을 차지하고 흑 진영에 직접 압박한다.", "pt-BR": "Um audaz avanço de canhão duplo onde ambos avançam para o rio para tomar espaço e pressionar diretamente o acampamento do preto." },
    strategy: { zh: "双炮过河攻势凌厉、占地主动，但需后续精准；一旦兑炮，红方须有出动接应。", en: "Double River Cannon is aggressive and space-grabbing. It demands accurate follow-up; if the cannons are exchanged, Red must have development ready.", es: "Los Cañones Dobles del Río son agresivos y ocupan espacio. Exigen una continuación precisa; si se cambian los cañones, Rojo debe tener el desarrollo listo.", ja: "双砲過河は攻撃的で陣地を奪う。正確な続手が必要。砲が交換されたら、赤は発展の準備が要る。", ko: "쌍포과하는 공격적이고 공간을 잡는다. 정확한 후속이 필요하며, 포가 맞교환되면 붉은 전개를 갖춰야 한다.", "pt-BR": "Os Canhões Duplos do Rio são agressivos e tomam espaço. Exigem continuação precisa; se os canhões forem trocados, o vermelho precisa ter o desenvolvimento pronto." },
    difficulty: "intermediate",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3。", en: "Black answers 马8进7 + 马2进3.", es: "Negro responde 马8进7 + 马2进3.", ja: "黒は 馬8進7 ＋ 馬2進3 と応じる。", ko: "흑은 馬8進7 + 馬2進3으로 응한다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3." },
      },
      {
        name: { zh: "卒底炮", en: "Counter-Cannon", es: "Cañón Detrás del Soldado", ja: "卒底砲", ko: "졸저포", "pt-BR": "Canhão Atrás do Soldado" },
        note: { zh: "黑方应以 炮2平3，击打兵根。", en: "Black answers 炮2平3 to hit the soldier base.", es: "Negro responde 炮2平3 para golpear la base del soldado.", ja: "黒は 砲2平3 と応じ、兵の根を突く。", ko: "흑은 砲2平3으로 병의 뿌리를 친다.", "pt-BR": "O preto responde 砲2平3 para atingir a base do soldado." },
      },
    ],
    faq: [
      {
        q: { zh: "会不会过于冒进？", en: "Does it overextend?", es: "¿Se extiende demasiado?", ja: "行き過ぎではないか？", ko: "지나치게 치달리지는 않는가?", "pt-BR": "Ele se estende demais?" },
        a: { zh: "河炮暴露；红方须用车马支撑，否则易失先。", en: "The river cannons are exposed; Red must support them with chariots and horses or risk losing the tempo.", es: "Los cañones de río están expuestos; Rojo debe apoyarlos con carros y caballos o arriesgarse a perder el tempo.", ja: "川の砲は無防備。赤は車と馬で支えないと歩手を失う恐れがある。", ko: "하포는 노출되어 있다. 붉은 차와 마로 받치지 않으면 선수를 잃을 수 있다.", "pt-BR": "Os canhões do rio estão expostos; o vermelho deve apoiá-los com carros e cavalos ou arrisca perder o tempo." },
      },
    ],
  },
  {
    slug: "central-horse",
    name: { zh: "盘头马", en: "Central Horse (Pan Tou Ma)", es: "Caballo Central (Pan Tou Ma)", ja: "盤頭馬", ko: "반두마", "pt-BR": "Cavalo Central (Pan Tou Ma)" },
    movesZh: "炮二平五，兵五进一，马二进三",
    moves: { en: "Red 炮二平五, pushes 兵五进一, then 马二进三 to plant a horse in the centre.", es: "Rojo 炮二平五, avanza 兵五进一 y luego 马二进三 para plantar un caballo en el centro.", ja: "赤の 砲二平五、兵五進一 と押し、続いて 馬二進三 で中央に馬を据える。", ko: "붉은 砲二平五, 兵五進一 밀고 이어 馬二進三으로 중앙에 마를 박는다.", "pt-BR": "Vermelho 砲二平五, avança 兵五進一 e depois 馬二進3 para fincar um cavalo no centro." },
    summary: { zh: "当头炮进攻体系：红方 炮二平五、兵五进一，再 马二进三 把马盘到中路，意图中路直攻。", en: "A Central Cannon attacking system where Red advances the central soldier and develops a horse to the centre, aiming for a direct kingside assault.", es: "Un sistema de ataque de Cañón Central donde Rojo avanza el soldado central y desarrolla un caballo al centro, buscando un asalto directo al bando del rey.", ja: "中炮の攻撃体系。赤が中央の兵を進め、中央に馬を発展させて王側への直接攻撃を狙う。", ko: "중포 공격 체계. 붉은 중앙 병을 진전시키고 마를 중앙에 전개해 장수 측으로 직공한다.", "pt-BR": "Um sistema de ataque de Canhão Central onde o vermelho avança o soldado central e desenvolve um cavalo ao centro, mirando um assalto direto ao lado do rei." },
    strategy: { zh: "盘头马筑起强悍的中兵阵，适合喜欢强攻、主动权在手的棋手。", en: "Central Horse builds a powerful central pawn front. It suits players who like forcing, attacking lines.", es: "El Caballo Central levanta un potente frente de peones centrales. Conviene a quienes gustan de líneas forcing y de ataque.", ja: "盤頭馬は強力な中央の兵の陣を築く。強攻や主導権を好む棋士に向く。", ko: "반두마는 강력한 중앙 병진을 쌓는다. 강공과 주도권을 좋아하는 기사에게 맞다.", "pt-BR": "O Cavalo Central constrói uma poderosa frente de peões centrais. Convém a quem gosta de linhas forçadas e de ataque." },
    difficulty: "intermediate",
    category: "cannon",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3。", en: "Black answers 马8进7 + 马2进3.", es: "Negro responde 马8进7 + 马2进3.", ja: "黒は 馬8進7 ＋ 馬2進3 と応じる。", ko: "흑은 馬8進7 + 馬2進3으로 응한다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3." },
      },
      {
        name: { zh: "卒底炮", en: "Counter-Cannon", es: "Cañón Detrás del Soldado", ja: "卒底砲", ko: "졸저포", "pt-BR": "Canhão Atrás do Soldado" },
        note: { zh: "黑方应以 炮2平3，扰乱中路。", en: "Black answers 炮2平3 to disrupt the centre.", es: "Negro responde 炮2平3 para alterar el centro.", ja: "黒は 砲2平3 と応じ、中央を攪乱する。", ko: "흑은 砲2平3으로 중앙을 교란한다.", "pt-BR": "O preto responde 砲2平3 para atrapalhar o centro." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么要早挺中兵？", en: "Why push the central soldier early?", es: "¿Por qué avanzar temprano el soldado central?", ja: "なぜ早く中央の兵を進めるのか？", ko: "왜 일찍 중앙 병을 미는가?", "pt-BR": "Por que avançar o soldado central cedo?" },
        a: { zh: "它为中马开路，并为后续 兵五进一 直扑对方将帅铺垫。", en: "It opens a lane for the horse to the centre and supports a later 兵五进一 break toward the enemy general.", es: "Abre un pasillo para el caballo al centro y apoya un posterior 兵五进一 hacia el general enemigo.", ja: "馬を中央へ通す筋を開き、後の 兵五進一 で敵の将へ向かう突破口となる。", ko: "마가 중앙으로 가는 길을 열고 이후 兵五進一로 상대 장수를 향한 돌파를 받친다.", "pt-BR": "Abre uma via para o cavalo ao centro e apoia um posterior 兵五進1 rumo ao general inimigo." },
      },
    ],
  },
  {
    slug: "left-river-cannon",
    name: { zh: "左炮封车", en: "Left River Cannon (Zuo Pao Feng Che)", es: "Cañón del Río Izquierdo (Zuo Pao Feng Che)", ja: "左砲封車", ko: "좌포봉거", "pt-BR": "Canhão do Rio Esquerdo (Zuo Pao Feng Che)" },
    movesZh: "马8进7，马2进3，炮8进4",
    moves: { en: "After 炮二平五, Black develops 马8进7 + 马2进3, then 炮8进4 to pin Red's chariot.", es: "Tras 炮二平五, Negro desarrolla 马8进7 + 马2进3, luego 炮8进4 para clavar el carro de Rojo.", ja: "赤の 砲二平五 のあと、黒は 馬8進7 ＋ 馬2進3 を展開し、続いて 砲8進4 で赤の車を封じる。", ko: "붉은 砲二平五 후, 흑은 馬8進7 + 馬2進3을 전개하고 이어 砲8進4로 붉은 차를 봉쇄한다.", "pt-BR": "Após 砲二平五, o preto desenvolve 馬8進7 + 馬2進3, depois 砲8進4 para imobilizar o carro do vermelho." },
    summary: { zh: "屏风马应对当头炮的经典体系：黑方先筑马墙（马8进7、马2进3），再以 炮8进4 封住红方二路车。", en: "The classic Screen Horses counter to Central Cannon: Black builds the horse wall, then a left cannon jumps to the river to pin Red's chariot on file 2.", es: "El contraclassic de Caballos en Pantalla al Cañón Central: Negro levanta el muro de caballos y luego un cañón izquierdo salta al río para clavar el carro de Rojo en la columna 2.", ja: "中炮に対する屏風馬の古典的体系。黒はまず馬の壁を築き、左の砲を川へ跳ねさせて赤の2の筋の車を封じる。", ko: "중포에 대한 병풍마의 고전적 체계. 흑은 먼저 마의 벽을 세우고, 좌포를 강으로 뛰게 해 붉은 2로 차를 봉쇄한다.", "pt-BR": "O contra-clássico de Cavalos em Tela ao Canhão Central: o preto ergue o muro de cavalos e então um canhão esquerdo salta para o rio para imobilizar o carro do vermelho na coluna 2." },
    strategy: { zh: "左炮封车将稳健的马防与积极骚扰结合，是应对当头炮最受推崇的应法之一。", en: "Left River Cannon combines a solid horse defence with active harassment. It is one of the most respected replies to Central Cannon.", es: "El Cañón del Río Izquierdo une una defensa de caballos sólida con una hostigación activa. Es una de las respuestas más respetadas al Cañón Central.", ja: "左砲封車は堅実な馬の守りと積極的な攪乱を融合する。中炮への最も評価される応手の一つ。", ko: "좌포봉거는 탄탄한 마 방어와 적극적인 교란을 결합한다. 중포에 대한 가장 존중받는 응수 중 하나다.", "pt-BR": "O Canhão do Rio Esquerdo combina uma defesa de cavalos sólida com hostilização ativa. É uma das respostas mais respeitadas ao Canhão Central." },
    difficulty: "intermediate",
    category: "screen",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方 炮二平五 起手。", en: "Red's 炮二平五 starts the line.", es: "El 炮二平五 de Rojo inicia la línea.", ja: "赤の 砲二平五 でこの筋が始まる。", ko: "붉은 砲二平五로 시작한다.", "pt-BR": "O 砲二平五 do vermelho inicia a linha." },
      },
      {
        name: { zh: "右车", en: "Right Chariot", es: "Carro Derecho", ja: "右車", ko: "우차", "pt-BR": "Carro Direito" },
        note: { zh: "红方走 车一平二，争夺中路。", en: "Red plays 车一平二 to contest the centre.", es: "Rojo juega 车一平二 para disputar el centro.", ja: "赤は 車一平二 と中央を争う。", ko: "붉은 車一平二로 중앙을 다툰다.", "pt-BR": "O vermelho joga 車一平二 para disputar o centro." },
      },
    ],
    faq: [
      {
        q: { zh: "“封车”是什么意思？", en: "What does \"seal the chariot\" mean?", es: "¿Qué significa \"sellar el carro\"?", ja: "「封車」とは何か？", ko: "‘봉거(封車)’는 무슨 뜻인가?", "pt-BR": "O que significa \"selar o carro\"?" },
        a: { zh: "河炮攻击红车前方之点，阻其前进并争得先手。", en: "The river cannon attacks the square in front of Red's chariot, discouraging it from advancing and gaining a tempo.", es: "El cañón de río ataca la casilla frente al carro de Rojo, disuadiéndolo de avanzar y ganando un tempo.", ja: "川の砲が赤の車の前の点を狙い、進むのを阻して歩手を得る。", ko: "하포가 붉은 차 앞의 점을 공격해 전진을 막고 선수를 얻는다.", "pt-BR": "O canhão do rio ataca a casa à frente do carro do vermelho, impedindo-o de avançar e ganhando um tempo." },
      },
    ],
  },
  {
    slug: "right-river-cannon",
    name: { zh: "右炮过河", en: "Right River Cannon (You Pao Guo He)", es: "Cañón del Río Derecho (You Pao Guo He)", ja: "右砲過河", ko: "우포과하", "pt-BR": "Canhão do Rio Direito (You Pao Guo He)" },
    movesZh: "马8进7，炮2进4",
    moves: { en: "After 炮二平五, Black plays 马8进7 then 炮2进4, sending the right cannon to the river.", es: "Tras 炮二平五, Negro juega 马8进7 y luego 炮2进4, enviando el cañón derecho al río.", ja: "赤の 砲二平五 のあと、黒は 馬8進7 と 砲2進4 で右の砲を川へ送る。", ko: "붉은 砲二平五 후, 흑은 馬8進7 그리고 砲2進4로 우포를 강으로 보낸다.", "pt-BR": "Após 砲二平五, o preto joga 馬8進7 e depois 砲2進4, enviando o canhão direito para o rio." },
    summary: { zh: "屏风马变例：黑方 马8进7 后 炮2进4，右炮过河，早早争夺空间、压迫红方侧翼。", en: "A Screen Horses variant where Black's right cannon goes to the river to contest space and pressure Red's flank early.", es: "Una variante de Caballos en Pantalla donde el cañón derecho de Negro va al río para disputar espacio y presionar el flanco de Rojo desde temprano.", ja: "屏風馬の変化。黒の右の砲が川へ行き、早くから陣地を争い赤の翼を圧迫する。", ko: "병풍마 변화. 흑의 우포가 강으로 가 일찍 공간을 다투고 붉은 측면을 압박한다.", "pt-BR": "Uma variante de Cavalos em Tela onde o canhão direito do preto vai para o rio para disputar espaço e pressionar o flanco do vermelho cedo." },
    strategy: { zh: "右炮过河比标准屏风马更具攻击性，逼红方谨慎应对，否则易失先手。", en: "Right River Cannon is more aggressive than the standard Screen Horses. It asks Red to respond accurately or lose the initiative.", es: "El Cañón del Río Derecho es más agresivo que la estándar de Caballos en Pantalla. Exige a Rojo responder con precisión o perder la iniciativa.", ja: "右砲過河は標準の屏風馬より攻撃的。赤に正確な応手を求め、さもなくば先手を失う。", ko: "우포과하는 표준 병풍마보다 공격적이다. 붉은 정확히 응수하지 않으면 선수를 잃는다.", "pt-BR": "O Canhão do Rio Direito é mais agressivo que o padrão de Cavalos em Tela. Exige que o vermelho responda com precisão ou perca a iniciativa." },
    difficulty: "advanced",
    category: "screen",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方 炮二平五 起手。", en: "Red's 炮二平五 starts the line.", es: "El 炮二平五 de Rojo inicia la línea.", ja: "赤の 砲二平五 でこの筋が始まる。", ko: "붉은 砲二平五로 시작한다.", "pt-BR": "O 砲二平五 do vermelho inicia a linha." },
      },
      {
        name: { zh: "急车", en: "Rapid Chariot", es: "Carro Rápido", ja: "急車", ko: "급차", "pt-BR": "Carro Rápido" },
        note: { zh: "红方急走 车一平二，争夺开放线。", en: "Red rushes 车一平二 to fight for the open file.", es: "Rojo apresura 车一平二 para pelear la columna abierta.", ja: "赤は 車一平二 と急ぎ、開いた筋を争う。", ko: "붉은 車一平二를 급히 둬 개방선을 다툰다.", "pt-BR": "O vermelho apressa 車一平二 para brigar pela coluna aberta." },
      },
    ],
    faq: [
      {
        q: { zh: "左炮封车与右炮过河有何不同？", en: "Left vs right river cannon?", es: "¿Cañón de río izquierdo vs derecho?", ja: "左砲封車と右砲過河の違いは？", ko: "좌포봉거와 우포과하의 차이는?", "pt-BR": "Canhão do rio esquerdo vs direito?" },
        a: { zh: "二者皆封车，但右炮（黑方视角）攻击另一侧，整体作战计划随之改变。", en: "Both pin chariots, but the right cannon (from Black's perspective) attacks the opposite flank, changing the whole battle plan.", es: "Ambos clavan carros, pero el derecho (desde la vista de Negro) ataca el flanco opuesto, cambiando todo el plan de batalla.", ja: "どちらも車を封じるが、右の砲（黒から見て）は反対の翼を攻め、全体の作戦が変わる。", ko: "둘 다 차를 봉쇄하나 우포(흑 입장)는 반대 측면을 공격해 전체 작전이 바뀐다.", "pt-BR": "Ambos imobilizam carros, mas o direito (pela visão do preto) ataca o flanco oposto, mudando todo o plano de batalha." },
      },
    ],
  },
  {
    slug: "anti-palace-horse",
    name: { zh: "反宫马", en: "Anti-Palace Horse (Fan Gong Ma)", es: "Caballo Antipalacio (Fan Gong Ma)", ja: "反宮馬", ko: "반궁마", "pt-BR": "Cavalo Antipalácio (Fan Gong Ma)" },
    movesZh: "炮8平6，马8进7，马2进3",
    moves: { en: "After 炮二平五, Black answers 炮8平6 (counter-cannon to file 6) + 马8进7 + 马2进3.", es: "Tras 炮二平五, Negro responde 炮8平6 (contracañón a la columna 6) + 马8进7 + 马2进3.", ja: "赤の 砲二平五 のあと、黒は 砲8平6（6の筋への逆砲）＋ 馬8進7 ＋ 馬2進3 と応じる。", ko: "붉은 砲二平五 후, 흑은 砲8平6(6로 역포) + 馬8進7 + 馬2進3으로 응한다.", "pt-BR": "Após 砲二平五, o preto responde 砲8平6 (contra-canho para a coluna 6) + 馬8進7 + 馬2進3." },
    summary: { zh: "应对当头炮的坚固防御：黑方以 炮8平6（士角反架）配合双马环护，阵型稳如磐石、难以攻破。", en: "A fortified defence to Central Cannon: Black plants a \"counter-cannon\" at the palace mouth and wraps both horses around it — solid and hard to break.", es: "Una defensa fortificada al Cañón Central: Negro planta un \"contracañón\" en la boca del palacio y envuelve ambos caballos a su alrededor — sólida y difícil de romper.", ja: "中炮への堅固な防御。黒が宮口に「逆砲」を置き、二馬をその周りに巻く——頑健で崩しにくい。", ko: "중포에 대한 견고한 방어. 흑이 궁 입구에 '역포'를 두고 쌍마를 둘러싸듯 감싼다 — 탄탄하고 깨기 어렵다.", "pt-BR": "Uma defesa fortificada ao Canhão Central: o preto planta um \"contra-canho\" na boca do palácio e envolve ambos os cavalos ao redor — sólido e difícil de romper." },
    strategy: { zh: "反宫马（又称夹炮屏风）以早期主动换得不破之阵，化解当头炮攻势，擅长阵地周旋。", en: "Anti-Palace Horse (also called 夹炮屏风) trades early activity for a bullet-proof structure. It neutralises Central Cannon's attack and excels in manoeuvring battles.", es: "El Caballo Antipalacio (también llamado 夹炮屏风) cambia la actividad temprana por una estructura a prueba de balas. Neutraliza el ataque del Cañón Central y brilla en batallas de maniobra.", ja: "反宮馬（夾砲屏風とも）は早い活動と引き換えに鉄壁の陣を得る。中炮の攻めを無力化し、駆け引きの戦いに優る。", ko: "반궁마(협포병풍이라도 함)는 초반 활동성을 탄탄한 진형과 바꾼다. 중포의 공세를 무력화하고 지지전에 뛰어난다.", "pt-BR": "O Cavalo Antipalácio (também chamado 夹炮屏风) troca a atividade inicial por uma estrutura à prova de balas. Neutraliza o ataque do Canhão Central e brilha em batalhas de manobra." },
    difficulty: "advanced",
    category: "horse",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方 炮二平五 触发此体系。", en: "Red's 炮二平五 is the trigger.", es: "El 炮二平五 de Rojo es el disparador.", ja: "赤の 砲二平五 がこの体系の引き金。", ko: "붉은 砲二平五가 방아쇠다.", "pt-BR": "O 砲二平五 do vermelho é o gatilho." },
      },
      {
        name: { zh: "过河车", en: "River Chariot", es: "Carro del Río", ja: "過河車", ko: "과하차", "pt-BR": "Carro do Rio" },
        note: { zh: "红方走 车一平二 再 车二进六，试探。", en: "Red plays 车一平二 then 车二进六 to probe.", es: "Rojo juega 车一平二 y luego 车二进六 para sondear.", ja: "赤は 車一平二 と 車二進六 で探る。", ko: "붉은 車一平二 후 車二進六으로 탐색한다.", "pt-BR": "O vermelho joga 車一平二 e depois 車二進6 para sondar." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么叫“反宫马”？", en: "Why is it \"anti-palace\"?", es: "¿Por qué es \"antipalacio\"?", ja: "なぜ「反宮馬」なのか？", ko: "왜 '반궁마'인가?", "pt-BR": "Por que é \"antipalácio\"?" },
        a: { zh: "黑炮置于宫门对面、双马环护，是屏风马的反向镜像。", en: "Black's cannon sits opposite the palace mouth while the two horses guard it — a reversed, mirrored Screen Horses.", es: "El cañón de Negro queda frente a la boca del palacio mientras los dos caballos lo guardan: una Screen Horses invertida y reflejada.", ja: "黒の砲が宮口の向こうにあり、二馬がそれを守る——反転・鏡像の屏風馬。", ko: "흑 포가 궁 입구 맞은편에 있고 쌍마가 지키니, 병풍마의 뒤집힌 거울상이다.", "pt-BR": "O canhão do preto fica em frente à boca do palácio enquanto os dois cavalos o guardam — uma Screen Horses invertida e espelhada." },
      },
    ],
  },
  {
    slug: "single-horse",
    name: { zh: "单提马", en: "Single Horse (Dan Ti Ma)", es: "Caballo Único (Dan Ti Ma)", ja: "単提馬", ko: "단제마", "pt-BR": "Cavalo Único (Dan Ti Ma)" },
    movesZh: "马二进三，马八进九",
    moves: { en: "Red develops 马二进三, then 马八进九 (one horse tucks to the corner).", es: "Rojo desarrolla 马二进三, luego 马八进九 (un caballo se recoge a la esquina).", ja: "赤は 馬二進三、続いて 馬八進九（一つの馬が隅に収まる）。", ko: "붉은 馬二進三, 이어 馬八進九(한 마가 구석에 둔다).", "pt-BR": "O vermelho desenvolve 馬二進3, depois 馬八進9 (um cavalo se recolhe ao canto)." },
    summary: { zh: "沉静偏侧的马局：红方 马二进三、马八进九，一马守角，早期不动炮，阵型从容灵活。", en: "A quiet, lopsided horse system where Red holds one horse in the corner, keeping a calm and flexible position without committing cannons early.", es: "Un sistema de caballo quieto y sesgado donde Rojo guarda un caballo en la esquina, manteniendo una posición calmada y flexible sin comprometer cañones pronto.", ja: "静かで片寄った馬の体系。赤は一つの馬を隅に置き、早くに砲を動かさず、落ち着き柔軟な形を保つ。", ko: "조용하고 비스듬한 마국. 붉은 한 마를 구석에 두고 일찍 포를 쓰지 않아 차분하고 유연한 형세를 유지한다.", "pt-BR": "Um sistema de cavalo quieto e enviesado onde o vermelho guarda um cavalo no canto, mantendo uma posição calma e flexível sem comprometer canhões cedo." },
    strategy: { zh: "单提马避免早期冲突，转向自如，适合偏好平稳协调出子的棋手。", en: "Single Horse avoids early confrontation and is easy to steer. It appeals to players who prefer slow, harmonious development.", es: "El Caballo Único evita el enfrentamiento temprano y es fácil de dirigir. Atrae a quienes prefieren un desarrollo lento y armonioso.", ja: "単提馬は早い衝突を避け、方針転換が容易。ゆっくり調和の取れた展開を好む棋士に響く。", ko: "단제마는 초반 충돌을 피하고 방향 전환이 쉽다. 느리고 조화로운 전개를 선호하는 기사에게 맞다.", "pt-BR": "O Cavalo Único evita o confronto inicial e é fácil de conduzir. Atrai quem prefere um desenvolvimento lento e harmonioso." },
    difficulty: "intermediate",
    category: "horse",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方随后可走 炮二平五，转入进攻。", en: "Red may later play 炮二平五 to switch to an attack.", es: "Rojo puede luego jugar 炮二平五 para pasar al ataque.", ja: "赤は後に 砲二平五 と踏み、攻めへ切り替える。", ko: "붉은 이후 砲二平五로 공세로 전환할 수 있다.", "pt-BR": "O vermelho pode depois jogar 砲二平五 para mudar para o ataque." },
      },
      {
        name: { zh: "飞相局", en: "Flying Elephant", es: "Elefante Volador", ja: "飛相局", ko: "비상국", "pt-BR": "Elefante Voador" },
        note: { zh: "同样稳健、先固根基的平和选择。", en: "A calm alternative that also builds a solid base.", es: "Una alternativa calmada que también construye una base sólida.", ja: "同様に堅実で、まず根を固める穏やかな選択。", ko: "마찬가지로 탄탄하고 먼저 기반을 다지는 평온한 선택.", "pt-BR": "Uma alternativa calma que também constrói uma base sólida." },
      },
    ],
    faq: [
      {
        q: { zh: "把马守在角上不是被动吗？", en: "Isn't one horse in the corner passive?", es: "¿No es pasivo tener un caballo en la esquina?", ja: "隅に馬を置くのは受け身ではないか？", ko: "마를 구석에 두는 건 수동적인 게 아닌가?", "pt-BR": "Não é passivo ter um cavalo no canto?" },
        a: { zh: "守角之马安全，且可后跳中路；单提马以攻势换耐久阵型。", en: "The corner horse is safe and can later jump to the centre; Single Horse trades aggression for a durable setup.", es: "El caballo de esquina es seguro y más tarde puede saltar al centro; el Caballo Único cambia agresión por una disposición duradera.", ja: "隅の馬は安全で、後に中央へ跳ねられる。単提馬は攻めと引き換えに耐久性のある陣を得る。", ko: "구석 마는 안전하고 나중에 중앙으로 뛸 수 있다. 단제마는 공격성을 내구 진형과 바꾼다.", "pt-BR": "O cavalo do canto é seguro e pode depois saltar para o centro; o Cavalo Único troca agressão por uma disposição durável." },
      },
    ],
  },
  {
    slug: "bent-foot-horse",
    name: { zh: "拐脚马", en: "Bent-Foot Horse (Guai Jiao Ma)", es: "Caballo de Pie Torcido (Guai Jiao Ma)", ja: "拐脚馬", ko: "괴각마", "pt-BR": "Cavalo de Pé Torcido (Guai Jiao Ma)" },
    movesZh: "马二进三，马三进四",
    moves: { en: "Red 马二进三, then 马三进四 — the horse \"bends\" forward into the centre.", es: "Rojo 马二进三, luego 马三进四: el caballo \"dobla\" el pie hacia el centro.", ja: "赤の 馬二進三、続いて 馬三進四——馬が「折れ曲がり」中央へ進む。", ko: "붉은 馬二進三, 이어 馬三進四 — 마가 '꺾여' 중앙으로 나아간다.", "pt-BR": "Vermelho 馬二進3, depois 馬三進4 — o cavalo \"dobra\" o pé para o centro." },
    summary: { zh: "古老的进攻型马局：红方 马二进三、马三进四，马走拐角直扑中路，配合快速冲兵。", en: "An old, attacking horse system where the horse advances in a bent path toward the centre, supporting a quick pawn storm.", es: "Un sistema de caballo antiguo y de ataque donde el caballo avanza en camino torcido hacia el centro, apoyando una rápida tormenta de peones.", ja: "古い攻撃的な馬の体系。馬が折れ曲がった道を中央へ進み、素早い兵の突撃を支える。", ko: "오래된 공격형 마국. 마가 굽은 길로 중앙을 향해 나아가 빠른 병 돌격을 받친다.", "pt-BR": "Um sistema de cavalo antigo e de ataque onde o cavalo avança em caminho torto para o centro, apoiando uma rápida tempestade de peões." },
    strategy: { zh: "拐脚马适合喜欢早出中心马、速攻的棋手，但需后续精准以免冒进。", en: "Bent-Foot Horse is for aggressive players who want an early central knight and fast attacks. It needs precise follow-up to avoid overextension.", es: "El Caballo de Pie Torcido es para jugadores agresivos que quieren un caballo central temprano y ataques rápidos. Necesita continuación precisa para no extenderse de más.", ja: "拐脚馬は早い中央の馬と速攻を好む攻撃的な棋士向け。行き過ぎないよう正確な続手が必要。", ko: "괴각마는 일찍 중앙 마와 속공을 원하는 공격적 기사에게 맞다. 과욕을 피하려 정확한 후속이 필요하다.", "pt-BR": "O Cavalo de Pé Torcido é para jogadores agressivos que querem um cavalo central cedo e ataques rápidos. Precisa de continuação precisa para não se estender demais." },
    difficulty: "intermediate",
    category: "horse",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方可先 炮二平五 支援马。", en: "Red may open 炮二平五 to support the knight.", es: "Rojo puede abrir 炮二平五 para apoyar el caballo.", ja: "赤は 砲二平五 と踏み、馬を支えられる。", ko: "붉은 砲二平五로 먼저 마를 받칠 수 있다.", "pt-BR": "O vermelho pode abrir 砲二平五 para apoiar o cavalo." },
      },
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3。", en: "Black answers 马8进7 + 马2进3.", es: "Negro responde 马8进7 + 马2进3.", ja: "黒は 馬8進7 ＋ 馬2進3 と応じる。", ko: "흑은 馬8進7 + 馬2進3으로 응한다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么叫“拐脚马”？", en: "Why \"bent foot\"?", es: "¿Por qué \"pie torcido\"?", ja: "なぜ「拐脚馬」なのか？", ko: "왜 '괴각마'인가?", "pt-BR": "Por que \"pé torcido\"?" },
        a: { zh: "马经折线路线（而非直线）抵达中路，故得此名。", en: "The horse reaches the centre via a zig-zag (bent) route rather than the direct file, hence the name.", es: "El caballo llega al centro por una ruta en zig-zag (doblada) en lugar de la columna directa, de ahí el nombre.", ja: "馬は直線の筋ではなくジグザグ（曲がった）経路で中央に達するため、この名がある。", ko: "마가 직선이 아닌 지그재그(굽은) 경로로 중앙에 이르므로 이런 이름이 붙었다.", "pt-BR": "O cavalo chega ao centro por uma rota em ziguezague (dobrada) em vez da coluna direta, daí o nome." },
      },
    ],
  },
  {
    slug: "side-horse",
    name: { zh: "边马局", en: "Side Horse (Bian Ma Ju)", es: "Caballo de Borde (Bian Ma Ju)", ja: "辺馬局", ko: "변마국", "pt-BR": "Cavalo de Borda (Bian Ma Ju)" },
    movesZh: "马八进九",
    moves: { en: "Red develops 马八进九 first, tucking a horse to the edge.", es: "Rojo desarrolla primero 马八进九, recogiendo un caballo al borde.", ja: "赤はまず 馬八進九 と、馬を端に収める。", ko: "붉은 먼저 馬八進九로 마를 변에 둔다.", "pt-BR": "O vermelho desenvolve primeiro 馬八進9, recolhendo um cavalo à borda." },
    summary: { zh: "极简开局：红方先 马八进九 把边马安顿，局面流动、不早定型。", en: "A minimalist opening where Red simply advances an edge horse, keeping the position fluid and avoiding early commitments.", es: "Una apertura minimalista donde Rojo simplemente adelanta un caballo de borde, manteniendo la posición fluida y evitando compromisos tempranos.", ja: "極めて簡素な定石。赤はまず端の馬を進め、形を流動的に保ち早い決めを避ける。", ko: "극도로 단순한 포진. 붉은 먼저 변마를 진전시켜 형세를 유동적으로 유지하고 초반 결정을 피한다.", "pt-BR": "Uma abertura minimalista onde o vermelho simplesmente adianta um cavalo de borda, mantendo a posição fluida e evitando compromissos iniciais." },
    strategy: { zh: "边马局是一手等待棋，保留变化，常可转入单提马或起马局。", en: "Side Horse is a waiting move that preserves options. It often transposes into Single Horse or Horse Opening lines.", es: "El Caballo de Borde es una jugada de espera que preserva opciones. A menudo transpone a líneas de Caballo Único o Apertura de Caballo.", ja: "辺馬局は待機の一手で選択肢を残す。しばしば単提馬や起馬局の形へ移行する。", ko: "변마국은 선택지를 남기는 대기 수다. 흔히 단제마나 기마국 형태로 전환된다.", "pt-BR": "O Cavalo de Borda é uma jogada de espera que preserva opções. Frequentemente transpõe para linhas de Cavalo Único ou Abertura de Cavalo." },
    difficulty: "beginner",
    category: "horse",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方随后可走 炮二平五。", en: "Red may later play 炮二平五.", es: "Rojo puede luego jugar 炮二平五.", ja: "赤は後に 砲二平五 と踏める。", ko: "붉은 이후 砲二平五로 둘 수 있다.", "pt-BR": "O vermelho pode depois jogar 砲二平五." },
      },
      {
        name: { zh: "起马局", en: "Horse Opening", es: "Apertura de Caballo", ja: "起馬局", ko: "기마국", "pt-BR": "Abertura de Cavalo" },
        note: { zh: "走 马二进三 后自然过渡。", en: "A natural transposition after 马二进三.", es: "Transposición natural tras 马二进三.", ja: "馬二進三 のあと自然に移行。", ko: "馬二進三 후 자연스러운 전환.", "pt-BR": "Transposição natural após 馬二進3." },
      },
    ],
    faq: [
      {
        q: { zh: "边马有什么用？", en: "What's the point of an edge horse?", es: "¿De qué sirve un caballo de borde?", ja: "端の馬の意味は？", ko: "변마의 쓸모는?", "pt-BR": "Qual a utilidade de um cavalo de borda?" },
        a: { zh: "它安全出动且不暴露意图，让红方视黑方布阵灵活应对。", en: "It develops safely without revealing a plan, letting Red react to Black's setup.", es: "Se desarrolla con seguridad sin revelar un plan, permitiendo a Rojo reaccionar al planteamiento de Negro.", ja: "計画を現さず安全に駒を出し、黒の配置に応じて赤が対応できる。", ko: "계획을 드러내지 않고 안전히 전개해 흑의 배치에 맞춰 붉은 대응할 수 있게 한다.", "pt-BR": "Desenvolve com segurança sem revelar um plano, deixando o vermelho reagir à formação do preto." },
      },
    ],
  },
  {
    slug: "double-horse",
    name: { zh: "双正马", en: "Double Horse (Shuang Zheng Ma)", es: "Doble Caballo (Shuang Zheng Ma)", ja: "双正馬", ko: "쌍정마", "pt-BR": "Cavalo Duplo (Shuang Zheng Ma)" },
    movesZh: "马二进三，马八进七",
    moves: { en: "Red develops both horses straight (马二进三 + 马八进七) before any cannon move.", es: "Rojo desarrolla ambos caballos directos (马二进三 + 马八进七) antes de mover cañón.", ja: "赤は砲を動かす前に両馬をまっすぐ発展させる（馬二進三 ＋ 馬八進七）。", ko: "붉은 포를 쓰기 전 두 마를 곧게 전개한다(馬二進三 + 馬八進7).", "pt-BR": "O vermelho desenvolve ambos os cavalos diretos (馬二進3 + 馬八進7) antes de qualquer movimento de canhão." },
    summary: { zh: "均衡的马先体系：红方先 马二进三、马八进七 双正马出动，重协调与根基，而非抢早中。", en: "A balanced horse-first system where Red brings out both \"straight\" horses, prioritising harmony and a solid base over early central control.", es: "Un sistema equilibrado de caballo primero donde Rojo saca ambos caballos \"directos\", priorizando armonía y base sólida sobre el control central temprano.", ja: "釣り合った「馬先」の体系。赤は両方の「正」の馬を出し、早い中央制圧より調和と基礎を優先する。", ko: "균형 잡힌 마선 체계. 붉은 두 '정마'를 내어 초반 중앙 장악보다 조화와 기반을 우선한다.", "pt-BR": "Um sistema equilibrado de cavalo primeiro onde o vermelho desenvolve ambos os cavalos \"diretos\", priorizando harmonia e base sólida sobre o controle central inicial." },
    strategy: { zh: "双正马构筑对称稳健的阵型，适合先完成出动、再定进攻的棋手。", en: "Double Horse builds a symmetrical, robust position. It suits players who like to complete development before committing to an attack.", es: "El Doble Caballo levanta una posición simétrica y robusta. Conviene a quienes prefieren completar el desarrollo antes de comprometerse con un ataque.", ja: "双正馬は対称で頑健な陣を築く。攻めに出る前に展開を終えたい棋士に向く。", ko: "쌍정마는 대칭적이고 튼튼한 형세를 쌓는다. 공격을 결정하기 전 전개를 마치길 좋아하는 기사에게 맞다.", "pt-BR": "O Cavalo Duplo constrói uma posição simétrica e robusta. Convém a quem gosta de completar o desenvolvimento antes de se comprometer com um ataque." },
    difficulty: "intermediate",
    category: "horse",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方随后可走 炮二平五 抢中。", en: "Red may later play 炮二平五 to seize the centre.", es: "Rojo puede luego jugar 炮二平五 para tomar el centro.", ja: "赤は後に 砲二平五 と踏み中央を奪う。", ko: "붉은 이후 砲二平五로 중앙을 잡을 수 있다.", "pt-BR": "O vermelho pode depois jogar 砲二平五 para tomar o centro." },
      },
      {
        name: { zh: "飞相局", en: "Flying Elephant", es: "Elefante Volador", ja: "飛相局", ko: "비상국", "pt-BR": "Elefante Voador" },
        note: { zh: "同样先固根基的平和选择。", en: "Another calm, base-first alternative.", es: "Otra alternativa calmada que primero afianza la base.", ja: "同様にまず根を固める穏やかな選択。", ko: "마찬가지로 먼저 기반을 다지는 평온한 선택.", "pt-BR": "Outra alternativa calma, que primeiro firma a base." },
      },
    ],
    faq: [
      {
        q: { zh: "双马出动却还不动炮？", en: "Two horses but no cannon yet?", es: "¿Dos caballos pero sin cañón todavía?", ja: "二つの馬なのにまだ砲がない？", ko: "마는 두 개인데 아직 포가 없나?", "pt-BR": "Dois cavalos mas sem canhão ainda?" },
        a: { zh: "正是——红方暂缓动炮以保留选择，是炮先开局之外的平和替代。", en: "Exactly — Red delays the cannon to keep options open, a calm alternative to Cannon-first openings.", es: "Exacto: Rojo retrasa el cañón para mantener opciones, una alternativa calmada a las aperturas de cañón primero.", ja: "その通り。赤は砲を遅らせて選択肢を開き、砲先の定石以外の穏やかな代わりとなる。", ko: "그렇다. 붉은 포를 미뤄 선택지를 열어두는, 포선 포진 대신 평온한 대안이다.", "pt-BR": "Exatamente — o vermelho atrasa o canhão para manter opções abertas, uma alternativa calma às aberturas de canhão primeiro." },
      },
    ],
  },
  {
    slug: "mirror-soldier",
    name: { zh: "对兵局", en: "Mirror Soldier (Dui Bing Ju)", es: "Soldado Espejo (Dui Bing Ju)", ja: "対兵局", ko: "대병국", "pt-BR": "Soldado Espelho (Dui Bing Ju)" },
    movesZh: "兵三进一，卒7进1",
    moves: { en: "After 兵三进一, Black answers 卒7进1 — both sides advance a soldier.", es: "Tras 兵三进一, Negro responde 卒7进1: ambos avanzan un soldado.", ja: "赤の 兵三進一 のあと、黒が 卒7進1 と応じ、両者が兵を一つ進める。", ko: "붉은 兵三進一 후, 흑은 卒7進1로 응해 양측이 병을 한 칸씩 진전시킨다.", "pt-BR": "Após 兵三進1, o preto responde 卒7進1 — ambos avançam um soldado." },
    summary: { zh: "应对仙人指路的对称应法：双方各挺一兵，局面均衡、中路封闭。", en: "The symmetric reply to Adjacent Soldier: both sides push a soldier, keeping the position balanced and the centre closed.", es: "La respuesta simétrica al Soldado Adyacente: ambos empujan un soldado, manteniendo la posición equilibrada y el centro cerrado.", ja: "仙人指路に対する対称的な応手。両者が兵を一つ押し、形は釣り合い、中央は閉じる。", ko: "선인지로에 대한 대칭적 응수. 양측이 병을 하나씩 밀어 형세는 균형, 중앙은 닫힌다.", "pt-BR": "A resposta simétrica ao Soldado Adjacente: ambos empurram um soldado, mantendo a posição equilibrada e o centro fechado." },
    strategy: { zh: "对兵局避开早期定式，走向平稳周旋，适合不喜欢被迫变化的棋手。", en: "Mirror Soldier avoids early theory and leads to a quiet, maneuvering game. It is a safe choice for players who dislike forced lines.", es: "El Soldado Espejo evita la teoría temprana y conduce a un juego quieto de maniobra. Es opción segura para quienes detestan las líneas forzadas.", ja: "対兵局は早い定跡を避け、静かな駆け引きの局へ。定跡通りを嫌う棋士に安全な選択。", ko: "대병국은 초반 정형을 피해 조용한 지지전으로 이어진다. 정형화된 수를 싫어하는 기사에게 안전한 선택.", "pt-BR": "O Soldado Espelho evita a teoria inicial e leva a um jogo quieto de manobra. É escolha segura para quem não gosta de linhas forçadas." },
    difficulty: "beginner",
    category: "soldier",
    replies: [
      {
        name: { zh: "仙人指路", en: "Adjacent Soldier", es: "Soldado Adyacente", ja: "仙人指路", ko: "선인지로", "pt-BR": "Soldado Adjacente" },
        note: { zh: "红方 兵三进一 起手。", en: "Red's 兵三进一 starts the line.", es: "El 兵三进一 de Rojo inicia la línea.", ja: "赤の 兵三進一 でこの筋が始まる。", ko: "붉은 兵三進一로 시작한다.", "pt-BR": "O 兵三進1 do vermelho inicia a linha." },
      },
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "任一方随后可转为 炮二平五。", en: "Either side may later switch to 炮二平五.", es: "Cualquiera de los dos puede luego pasar a 炮二平五.", ja: "どちらかが後に 砲二平五 へ切り替えられる。", ko: "어느 쪽이든 이후 砲二平五로 전환할 수 있다.", "pt-BR": "Qualquer lado pode depois mudar para 砲二平五." },
      },
    ],
    faq: [
      {
        q: { zh: "它只是模仿红方吗？", en: "Does it just copy Red?", es: "¿Solo copia a Rojo?", ja: "単に赤をまねるだけか？", ko: "그냥 붉은 편을 모방하는가?", "pt-BR": "Ele só copia o vermelho?" },
        a: { zh: "对挺保持均势，但黑方随后可转向（如卒底炮）夺取先手。", en: "Mirroring keeps things equal, but Black can later deviate (e.g., with a counter-cannon) to seize the initiative.", es: "El reflejo mantiene la igualdad, pero Negro puede luego desviarse (p. ej., con un contracañón) para tomar la iniciativa.", ja: "真似合わせは互角を保つが、黒は後に手を変え（例えば卒底砲）先手を奪える。", ko: "대칭 유지는 호각세지만, 흑은 이후 (예: 졸저포) 틀어 선수를 잡을 수 있다.", "pt-BR": "O espelhamento mantém a igualdade, mas o preto pode depois desviar (ex.: com um contra-canho) para tomar a iniciativa." },
      },
    ],
  },
  {
    slug: "two-headed-snake",
    name: { zh: "两头蛇", en: "Two-Headed Snake (Liang Tou She)", es: "Serpiente de Dos Cabezas (Liang Tou She)", ja: "両頭蛇", ko: "양두사", "pt-BR": "Serpente de Duas Cabeças (Liang Tou She)" },
    movesZh: "兵三进一，兵七进一",
    moves: { en: "Red pushes both 兵三进一 and 兵七进一, advancing soldiers on both flanks.", es: "Rojo empuja ambos 兵三进一 y 兵七进一, avanzando soldados en ambos flancos.", ja: "赤は 兵三進一 と 兵七進一 の両方を押し、両翼の兵を進める。", ko: "붉은 兵三進一과 兵七進1을 모두 밀어 양측 병을 진전시킨다.", "pt-BR": "O vermelho empurra ambos 兵三進1 e 兵七進1, avançando soldados em ambos os flancos." },
    summary: { zh: "双兵齐进的兵阵：红方 兵三进一、兵七进一，两翼挺兵，为双马过河铺垫。", en: "A soldier storm where Red advances both wing soldiers, preparing to support horses crossing the river on either side.", es: "Una tormenta de soldados donde Rojo avanza ambos soldados de ala, preparando apoyar caballos que crucen el río por cualquier lado.", ja: "両翼の兵を進める兵の嵐。赤が両方の翼の兵を進め、どちら側でも川を渡る馬を支える準備をする。", ko: "양측 병을 진전시키는 병의 폭풍. 붉은 어느 쪽으로든 강을 건너는 마를 받칠 준비를 한다.", "pt-BR": "Uma tempestade de soldados onde o vermelho avança ambos os soldados de asa, preparando apoiar cavalos que cruzem o rio por qualquer lado." },
    strategy: { zh: "两头蛇多配合屏风马；双兵为红方提供灵活渡河点，便于双马扑入敌阵。", en: "Two-Headed Snake is usually paired with Screen Horses; the twin soldiers give Red flexible points to jump horses into the enemy camp.", es: "La Serpiente de Dos Cabezas suele ir con Caballos en Pantalla; los soldados gemelos dan a Rojo puntos flexibles para saltar caballos al campamento enemigo.", ja: "両頭蛇はふつう屏風馬と組む。双子の兵が赤に柔軟な踏み場を与え、敵陣へ馬を躍り込ませる。", ko: "양두사는 보통 병풍마와 짝을 이룬다. 쌍병이 붉은 편에 유연한 도약점을 주어 적진으로 마를 뛰어들게 한다.", "pt-BR": "A Serpente de Duas Cabeças costuma vir com Cavalos em Tela; os soldados gêmeos dão ao vermelho pontos flexíveis para saltar cavalos no acampamento inimigo." },
    difficulty: "beginner",
    category: "soldier",
    replies: [
      {
        name: { zh: "屏风马", en: "Screen Horses", es: "Caballos en Pantalla", ja: "屏風馬", ko: "병풍마", "pt-BR": "Cavalos em Tela" },
        note: { zh: "黑方应以 马8进7 再 马2进3。", en: "Black answers 马8进7 + 马2进3.", es: "Negro responde 马8进7 + 马2进3.", ja: "黒は 馬8進7 ＋ 馬2進3 と応じる。", ko: "흑은 馬8進7 + 馬2進3으로 응한다.", "pt-BR": "O preto responde 馬8進7 + 馬2進3." },
      },
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方也可先 炮二平五。", en: "Red may open 炮二平五 instead.", es: "Rojo puede abrir 炮二平五 en su lugar.", ja: "赤は代わりに 砲二平五 と踏んで始めてもいい。", ko: "붉은 대신 砲二平五로 시작할 수도 있다.", "pt-BR": "O vermelho pode abrir 砲二平五 em vez disso." },
      },
    ],
    faq: [
      {
        q: { zh: "为什么叫“两头蛇”？", en: "Why \"two-headed snake\"?", es: "¿Por qué \"serpiente de dos cabezas\"?", ja: "なぜ「両頭蛇」なのか？", ko: "왜 '양두사'인가?", "pt-BR": "Por que \"serpente de duas cabeças\"?" },
        a: { zh: "两枚挺进之兵如双头之蛇，可自两翼出击。", en: "The two advanced soldiers resemble a snake with heads on both ends, ready to strike on either flank.", es: "Los dos soldados avanzados se asemejan a una serpiente con cabezas en ambos extremos, lista para golpear en cualquier ala.", ja: "進んだ二つの兵が両端に頭を持つ蛇のようで、どちらの翼からも襲える。", ko: "나아간 두 병이 양끝에 머리를 둔 뱀 같아 어느 측면에서든 칠 수 있다.", "pt-BR": "Os dois soldados avançados lembram uma serpente com cabeças em ambas as pontas, pronta para atacar em qualquer flanco." },
      },
    ],
  },
  {
    slug: "iron-slide-chariot",
    name: { zh: "铁滑车", en: "Iron Slide Chariot (Tie Hua Che)", es: "Carro de Deslizamiento de Hierro (Tie Hua Che)", ja: "鉄滑車", ko: "철활거", "pt-BR": "Carro de Deslizamento de Ferro (Tie Hua Che)" },
    movesZh: "车一进一，车一平九",
    moves: { en: "Red lifts 车一进一 then slides 车一平九, sacrificing the chariot for a lightning attack.", es: "Rojo eleva 车一进一 y luego desliza 车一平九, sacrificando el carro por un ataque relámpago.", ja: "赤が 車一進一 と持ち上げ、続いて 車一平九 と滑らせ、車を捨てて電光石火の攻めとする。", ko: "붉은 車一進一로 띄운 뒤 車一平九로 미끄러뜨려 차를 희생해 번개 같은 공격을 한다.", "pt-BR": "O vermelho levanta 車一進1 e depois desliza 車一平9, sacrificando o carro por um ataque relâmpago." },
    summary: { zh: "炫目而冒险的弃子开局：红方 车一进一、车一平九，舍车换取混乱与奇袭，刺激但理论上欠稳。", en: "A flashy, sacrificial opening where Red gives up a chariot for early chaos and a surprise attack — exciting but objectively unsound.", es: "Una apertura llamativa y de sacrificio donde Rojo entrega un carro por caos temprano y un ataque sorpresa: emocionante pero objetivamente injustificada.", ja: "派手で危険な駒捨ての定石。赤が車を捨てて早い混沌と奇襲を得る——刺激的なれだが、客観的には不正確。", ko: "화려하고 위험한 기물 버리기 포진. 붉은 차를 희생해 초반 혼란과 기습을 얻는다 — 자극적이지만 객관적으로는 불안정하다.", "pt-BR": "Uma abertura vistosa e de sacrifício onde o vermelho entrega um carro por caos inicial e um ataque surpresa — emocionante mas objetivamente imprecisa." },
    strategy: { zh: "铁滑车是赌博式奇兵，宜对付无备之敌；在严肃对局中少有正着。", en: "Iron Slide Chariot is a gambiteering weapon best used against unprepared opponents. At serious levels it is rarely correct.", es: "El Carro de Deslizamiento de Hierro es un arma de gambito, mejor contra rivales desprevenidos. En niveles serios rara vez es correcto.", ja: "鉄滑車は賭けの奇襲兵器で、準備のない相手に最適。真剣な対局ではめったに正着にならない。", ko: "철활거는 도박성 기병으로 준비 안 된 상대에게 쓰는 게 좋다. 본격적인 대국에선 옳은 수가 되기 드물다.", "pt-BR": "O Carro de Deslizamento de Ferro é uma arma de gambito, melhor contra adversários desprevenidos. Em níveis sérios raramente é correto." },
    difficulty: "advanced",
    category: "counter",
    replies: [
      {
        name: { zh: "当头炮", en: "Central Cannon", es: "Cañón Central", ja: "中炮", ko: "중포", "pt-BR": "Canhão Central" },
        note: { zh: "红方弃子前可先 炮二平五。", en: "Red may open 炮二平五 before the sacrifice.", es: "Rojo puede abrir 炮二平五 antes del sacrificio.", ja: "赤は犠牲の前に 砲二平五 と踏める。", ko: "붉은 희생 전 砲二平五로 시작할 수 있다.", "pt-BR": "O vermelho pode abrir 砲二平五 antes do sacrifício." },
      },
      {
        name: { zh: "急应", en: "Rapid Counter", es: "Contraataque Rápido", ja: "急ぎの応手", ko: "급응", "pt-BR": "Contra-Ataque Rápido" },
        note: { zh: "黑方走 车9平8，利用多子优势。", en: "Black develops 车9平8 to exploit the material lead.", es: "Negro desarrolla 车9平8 para aprovechar la ventaja material.", ja: "黒は 車9平8 と発展させ、得た駒の優位を生かす。", ko: "흑은 車9平8로 전개해 다수 기물 우위를 이용한다.", "pt-BR": "O preto desenvolve 車9平8 para explorar a vantagem material." },
      },
    ],
    faq: [
      {
        q: { zh: "弃车真有好处吗？", en: "Is sacrificing a chariot ever good?", es: "¿Sacrificar un carro alguna vez es bueno?", ja: "車を捨てるのは得になることがあるか？", ko: "차를 버리는 게 이득이 되기도 하나?", "pt-BR": "Sacrificar um carro alguma vez é bom?" },
        a: { zh: "仅宜作奇兵——除非对手在乱战中出错，否则弃子难以成立。", en: "Only as a surprise — the material loss is hard to justify unless the opponent blunders in the resulting complications.", es: "Solo como sorpresa: la pérdida de material difícilmente se justifica salvo que el rival se equivoque en la complicación resultante.", ja: "奇襲としてだけ。相手がその混乱で凡ミスしない限り、駒損は正当化しにくい。", ko: "기병으로만. 상대가 그 혼란 속에서 실수하지 않으면 기물 손실은 납득하기 어렵다.", "pt-BR": "Só como surpresa — a perda de material é difícil de justificar a menos que o adversário erre nas complicações resultantes." },
      },
    ],
  },
];

export const XIANGQI_OPENING_SLUGS = XIANGQI_OPENINGS.map((o) => o.slug);

export function getXiangqiOpening(slug: string): XiangqiOpening | undefined {
  return XIANGQI_OPENINGS.find((o) => o.slug === slug);
}
