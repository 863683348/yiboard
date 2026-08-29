import json

# 1. Create ko.json from en.json with Korean meta + UI
en_path = r'C:\Users\l\x\WorkBuddy\2026-08-04-13-14-21\yiboard\src\messages\en.json'
ko_path = r'C:\Users\l\x\WorkBuddy\2026-08-04-13-14-21\yiboard\src\messages\ko.json'

with open(en_path, encoding='utf-8') as f:
    en = json.load(f)

ko = {}

# Meta - Korean SEO-optimized
ko['meta'] = {
    'ogAlt': '15x15 오목 판에 검은 돌과 흰 돌',
    'home': {
        'title': '오목 온라인 무료 — 인공지능 또는 실시간 플레이어와 5목!',
        'description': '브라우저에서 오목을 무료로 플레이하세요. 계정 없음, 다운로드 없음. AI와 대결하거나 친구를 초대하거나 실시간 매칭으로 즉시 시작. 9단에서 9단에 이르는 18단계 사다리 오름.',
        'keywords': '오목 온라인 무료, 오목 플레이, 오목 인공지능, 오목 친구와, 오목 멀티플레이어, 5목 게임'
    },
    'play': {
        'title': '오목 온라인 플레이 — AI, 친구 또는 랜덤 플레이어',
        'description': '오목을 무료로 플레이하는 세 가지 방법: 내장 AI 도전, 친구 방 만들기, 실시간 플레이어와 랜덤 매칭. 회원가입 불필요.',
        'keywords': '오목 온라인, 오목 AI, 오목 2인용, 오목 랜덤 매칭, 오목 친구 방'
    },
    'rankings': {
        'title': '오목 랭킹 & Elo 점수 — 글로벌 리더보드',
        'description': '글로벌 오목 사다리에서 내 위치를 확인하세요. 9단에서 9단까지 18단계 실시간 Elo 랭킹.',
        'keywords': '오목 랭킹, 오목 elo, 오목 리더보드, 오목 단계, 5목 순위'
    },
    'howTo': {
        'title': '오목 규칙 — 5분 만에 배우기',
        'description': '오목 규칙 빠르게 배우기: 5개를 일렬로 놓으면 승리, 검은돌 선수, 오픈포와 더블스리 등 기본 전술. 지금 첫 게임을 시작하세요.',
        'keywords': '오목 규칙, 오목 배우기, 오목 입문, 오목 전략, 5목 방법'
    },
    'about': {
        'title': 'YiBoard 소개 — 무료 브라우저 오목',
        'description': 'YiBoard는 무료 브라우저 오목: 방해를 주는 광고 없음, 정직하게 플레이, 모든 게임이 랭킹에 반영.',
        'keywords': 'yiboard, 무료 오목, 브라우저 오목, 오목 앱, 광고 없는 오목'
    },
    'pricing': {
        'title': 'YiBoard 가격 — 영원히 무료, 광고 없음, 계정 없음',
        'description': 'YiBoard는 100% 무료입니다. 구독 없음, 광고 없음, 계정 불필요.',
        'keywords': '오목 무료, 오목 광고 없음, 오목 계정 없음, 무료 브라우저 게임'
    },
    'blog': {
        'title': '오목 전략 & 팁 — YiBoard 블로그',
        'description': '오목 전략 가이드, 개구 이론, YiBoard 팀의 제품 업데이트.',
        'keywords': '오목 전략, 오목 팁, 오목 개구, 5목 가이드, 오목 이론'
    }
}

# Brand
ko['brand'] = {
    'name': 'YiBoard',
    'hanzi': '弈界',
    'tagline': '중국 전략 게임, 모두를 위해'
}

# Nav - Korean
ko['nav'] = {
    'play': '플레이',
    'rankings': '랭킹',
    'howTo': '규칙 배우기',
    'blog': '블로그',
    'about': '소개',
    'profile': '프로필',
    'pricing': '가격',
    'openMenu': '메뉴 열기',
    'closeMenu': '메뉴 닫기',
    'language': '언어',
    'theme': '테마',
    'themeLight': '라이트',
    'themeDark': '다크',
    'boardStyle': '판',
    'boardInk': '먹석',
    'boardKaya': '카야 우드',
    'boardSlate': '청록',
    'signIn': '로그인 / 회원가입',
    'signOut': '로그아웃',
    'glossary': '용어집',
    'gomokuRules': '오목 규칙',
    'renjuRules': '렌주 규칙',
    'gomokuVsGo': '오목 vs 바둑',
    'games': '게임'
}

# Home - Korean
ko['home'] = {
    'eyebrow': '무료 · 계정 불필요',
    'visitCount': '글로벌 방문: {count}',
    'headline': '5개의 돌을 한 줄에.',
    'headlineAccent': '3000년 동안 논쟁 중인 게임.',
    'sub': '5분 만에 오목 시작. 1000년의 중국 전략에 머물러. 아래판을 열고 돌을 놓으세요 — 설치도 가입도 필요 없음.iangqi와 바둑은 곧 공개.',
    'ctaPrimary': '게임 시작',
    'ctaSecondary': '친구와 플레이',
    'reassurance': '진행사항은 이 브라우저에 180일 동안 저장됩니다. 이메일을 연결하면 계속 유지.',
    'boardCaption': '검은돌이 선공. 가로, 세로, 대각선으로 끊김 없이 5개를 만드세요.',
    'boardHint': '어느 교차점이든 탭하여 시작',
    'games': {
        'title': '세 게임, 하나의 판 문화',
        'sub': '각각 다른 사고방식을 배웁니다. 가장 빠르게 플레이할 수 있는 순서로 출시합니다.',
        'statusLive': '지금 플레이 가능',
        'statusNext': '개발 중',
        'statusPlanned': '예정',
        'gomoku': {
            'name': '오목',
            'native': '五子棋 · Wǔzǐqí',
            'blurb': '두 색깔, 하나의 격자, 5개 일렬. 규칙은 한 문장에; 전술은 그렇지 않습니다. 중국 판게임이 처음이라면 가장 좋은 진입점.'
        },
        'xiangqi': {
            'name': '장기',
            'native': '象棋 · Xiàngqí',
            'blurb': '강이 판을 절반으로 가르습니다. 대포는only 건너뛰어 포획. 두 장수는 열린 파일로 서로를 바라볼 수 없습니다.',
            'status': '지금 플레이 가능'
        },
        'go': {
            'name': '바둑',
            'native': '圍碁 · Wéiqí',
            'blurb': '왕을 포획하는 대신 영토를 포위합니다. 2000년 전과 동일한 규칙으로 여전히 플레이됩니다.'
        }
    },
    'ladder': {
        'title': '현실로부터 빌려온 18단',
        'sub': '중국 판게임 문화는 동전과 플래티넘이 아닌 급과 단으로 플레이어를 랭크합니다. 그걸 유지했고, 실제로 승률에 움직이는 점수로 매핑했습니다.',
        'startNote': '모두 1200점에서 시작 — 6급.',
        'gradeLabel': '급',
        'danLabel': '단',
        'gradeNote': '9급에서 1급까지. 모양을 배우는 중.',
        'danNote': '1단에서 9단까지. 4수를 읽는 중.'
    },
    'why': {
        'title': '우리가 실제로 만든 것',
        'refereed': {
            'title': '온라인 게임은 서버에서 심판',
            'body': '친구 매치의 모든 수는 서버에서 검증된 후 두 보드에 표시됩니다. 수정된 클라이언트는 승리를 발명할 수 없습니다.'
        },
        'engine': {
            'title': '엔진은 브라우저에서 실행',
            'body': '우리의 오목 상대는 alpha-beta 가지치기로 500ms 제한 내에 검색합니다. 당신의 기기에서. 라운드 트립 없음, 대기열 없음, 속도 제한 없음.'
        },
        'language': {
            'title': '번역기로 돌리지 않고 네 언어로 작성',
            'body': '영어, Español, 日本語, 포르투갈어(브라질). 규칙, 도구 설명, 오류 메시지 포함 — 마케팅 페이지만은 아닙니다.'
        },
        'noWall': {
            'title': '가입벽 뒤에 아무것도 없음',
            'body': '플레이, 순위 오르기, 게임 공유. 이메일 연결은 선택사항이며 다른 기기에서 기록을 가지고 싶을 때만 존재.'
        }
    },
    'finalCta': {
        'title': '판은 이미 열려 있습니다.',
        'sub': '난이도를 선택하고 가세요. 이 문장을 읽는 게 더 오래 걸립니다.',
        'action': '오목 플레이'
    },
    'statsHeading': '온라인 플레이어',
    'statsTotal': '총계',
    'statsAi': '엔진 vs',
    'statsFriend': '플레이어 vs',
    'ctaXiangqi': '장기 플레이'
}

# Copy remaining from en (play, rankings, howTo, etc.)
for k in ['play', 'rankings', 'howTo', 'about', 'profile', 'share', 'footer', 'pricing', 'privacy', 'terms', 'faq', 'blog', 'contact', 'common', 'auth']:
    if k in en:
        ko[k] = en[k]

with open(ko_path, 'w', encoding='utf-8') as f:
    json.dump(ko, f, ensure_ascii=False, indent=2)

print('Created ko.json')

# 2. Update pt-BR meta.howTo for better CTR
pt_path = r'C:\Users\l\x\WorkBuddy\2026-08-04-13-14-21\yiboard\src\messages\pt-BR.json'
with open(pt_path, encoding='utf-8') as f:
    pt = json.load(f)

pt['meta']['howTo'] = {
    'title': 'Como Jogar Gomoku: Regras e Estratégia em 5 Min',
    'description': 'Aprenda gomoku grátis: 5 em linha vence, pretas começam, táticas básicas (quatro abertos, ameaças duplas). Jogue online agora — sem download.',
    'keywords': 'como jogar gomoku, regras gomoku, gomoku para iniciantes, jogo gomoku online grátis, cinco em linha, gomoku estrategia'
}

with open(pt_path, 'w', encoding='utf-8') as f:
    json.dump(pt, f, ensure_ascii=False, indent=2)

print('Updated pt-BR meta.howTo')

# 3. Update routing.ts to add 'ko'
routing_path = r'C:\Users\l\x\WorkBuddy\2026-08-04-13-14-21\yiboard\src\i18n\routing.ts'
with open(routing_path, encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "locales: ['en', 'zh', 'es', 'ja', 'pt-BR']",
    "locales: ['en', 'zh', 'es', 'ja', 'pt-BR', 'ko']"
)

# Update LOCALE_LABELS to include ko
content = content.replace(
    "'pt-BR': 'Português (BR)',",
    "'pt-BR': 'Português (BR)',\n  'ko': '한국어',"
)

with open(routing_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated routing.ts to add ko locale')

print('\nDone!')
