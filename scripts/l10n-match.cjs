/** 随机匹配 + 个人中心增强的五语文案补丁（一次性脚本，可重复执行） */
const fs = require('fs');
const path = require('path');

const L = {
  en: {
    play: {
      vsRandom: 'Random match',
      match: {
        title: 'Find an opponent',
        body: 'No link, no sign-up. We pair you with whoever is waiting — the one who waited longest plays black.',
        start: 'Find opponent',
        starting: 'Connecting…',
        searching: 'Looking for an opponent',
        cancel: 'Cancel',
        queueCount: '{count} waiting right now',
        error: 'Could not reach the queue. Try again.',
      },
    },
    profile: {
      winRateLabel: 'Win rate',
      lost: 'Lost',
      drawn: 'Drawn',
      streak: 'Current streak',
      streakWin: '{count} in a row',
      streakLoss: '{count} losses',
      streakNone: 'None yet',
      recentForm: 'Last {count} games',
      vsRandomPlayer: 'Random match',
    },
  },
  zh: {
    play: {
      vsRandom: '随机匹配',
      match: {
        title: '找个对手',
        body: '不用发链接，也不用注册。系统直接给你配一个正在等的人——等得最久的执黑先手。',
        start: '开始匹配',
        starting: '连接中…',
        searching: '正在寻找对手',
        cancel: '取消匹配',
        queueCount: '当前 {count} 人在排队',
        error: '连不上匹配队列，再试一次。',
      },
    },
    profile: {
      winRateLabel: '胜率',
      lost: '负',
      drawn: '和',
      streak: '当前连势',
      streakWin: '{count} 连胜',
      streakLoss: '{count} 连败',
      streakNone: '暂无',
      recentForm: '最近 {count} 局',
      vsRandomPlayer: '随机匹配',
    },
  },
  es: {
    play: {
      vsRandom: 'Partida aleatoria',
      match: {
        title: 'Buscar rival',
        body: 'Sin enlace ni registro. Te emparejamos con quien esté esperando: quien lleve más tiempo juega con negras.',
        start: 'Buscar rival',
        starting: 'Conectando…',
        searching: 'Buscando rival',
        cancel: 'Cancelar',
        queueCount: '{count} esperando ahora',
        error: 'No se pudo conectar con la cola. Inténtalo de nuevo.',
      },
    },
    profile: {
      winRateLabel: 'Victorias',
      lost: 'Derrotas',
      drawn: 'Tablas',
      streak: 'Racha actual',
      streakWin: '{count} seguidas',
      streakLoss: '{count} derrotas',
      streakNone: 'Ninguna',
      recentForm: 'Últimas {count} partidas',
      vsRandomPlayer: 'Partida aleatoria',
    },
  },
  ja: {
    play: {
      vsRandom: 'ランダム対戦',
      match: {
        title: '対戦相手を探す',
        body: 'リンクも登録も不要。待っている人とすぐマッチングします——待ち時間が長い方が黒番です。',
        start: '相手を探す',
        starting: '接続中…',
        searching: '対戦相手を探しています',
        cancel: 'キャンセル',
        queueCount: '現在 {count} 人が待機中',
        error: 'マッチングに接続できません。もう一度お試しください。',
      },
    },
    profile: {
      winRateLabel: '勝率',
      lost: '敗',
      drawn: '引き分け',
      streak: '現在の連勝',
      streakWin: '{count} 連勝',
      streakLoss: '{count} 連敗',
      streakNone: 'なし',
      recentForm: '直近 {count} 局',
      vsRandomPlayer: 'ランダム対戦',
    },
  },
  'pt-BR': {
    play: {
      vsRandom: 'Partida aleatória',
      match: {
        title: 'Encontrar adversário',
        body: 'Sem link, sem cadastro. Pareamos você com quem estiver esperando — quem esperou mais joga de pretas.',
        start: 'Buscar adversário',
        starting: 'Conectando…',
        searching: 'Procurando adversário',
        cancel: 'Cancelar',
        queueCount: '{count} na fila agora',
        error: 'Não foi possível acessar a fila. Tente novamente.',
      },
    },
    profile: {
      winRateLabel: 'Aproveitamento',
      lost: 'Derrotas',
      drawn: 'Empates',
      streak: 'Sequência atual',
      streakWin: '{count} seguidas',
      streakLoss: '{count} derrotas',
      streakNone: 'Nenhuma',
      recentForm: 'Últimas {count} partidas',
      vsRandomPlayer: 'Partida aleatória',
    },
  },
};

for (const [locale, namespaces] of Object.entries(L)) {
  const file = path.join('src', 'messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [ns, keys] of Object.entries(namespaces)) {
    data[ns] = { ...(data[ns] ?? {}), ...keys };
  }
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`${locale}: play.match + profile keys merged`);
}
