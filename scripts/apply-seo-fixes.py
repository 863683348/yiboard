import json
import os

os.chdir(r'C:\Users\l\x\WorkBuddy\2026-08-04-13-14-21\yiboard')
base = os.getcwd()
msg_dir = os.path.join(base, 'src', 'messages')

# 1. Create ko.json from en.json with Korean meta
en_path = os.path.join(msg_dir, 'en.json')
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
ko['brand'] = en.get('brand', {})

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

# Copy remaining from en
for k in ['home', 'play', 'rankings', 'howTo', 'about', 'profile', 'share', 'footer', 'pricing', 'privacy', 'terms', 'faq', 'blog', 'contact', 'common', 'auth']:
    if k in en:
        ko[k] = en[k]

ko_path = os.path.join(msg_dir, 'ko.json')
with open(ko_path, 'w', encoding='utf-8') as f:
    json.dump(ko, f, ensure_ascii=False, indent=2)
print(f'Created {ko_path}')

# 2. Update pt-BR meta.howTo for better CTR
pt_path = os.path.join(msg_dir, 'pt-BR.json')
with open(pt_path, encoding='utf-8') as f:
    pt = json.load(f)

pt['meta']['howTo'] = {
    'title': 'Como Jogar Gomoku: Regras e Estratégia em 5 Min',
    'description': 'Aprenda gomoku grátis: 5 em linha vence, pretas começam, táticas básicas (quatro abertos, ameaças duplas). Jogue online agora — sem download.',
    'keywords': 'como jogar gomoku, regras gomoku, gomoku para iniciantes, jogo gomoku online grátis, cinco em linha, gomoku estrategia'
}

with open(pt_path, 'w', encoding='utf-8') as f:
    json.dump(pt, f, ensure_ascii=False, indent=2)
print(f'Updated pt-BR meta.howTo')

# 3. Update routing.ts to add 'ko'
routing_path = os.path.join(base, 'src', 'i18n', 'routing.ts')
with open(routing_path, encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "locales: ['en', 'zh', 'es', 'ja', 'pt-BR']",
    "locales: ['en', 'zh', 'es', 'ja', 'pt-BR', 'ko']"
)

content = content.replace(
    "'pt-BR': 'Português (BR)',",
    "'pt-BR': 'Português (BR)',\n  'ko': '한국어',"
)

with open(routing_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f'Updated routing.ts to add ko locale')

print('\nAll SEO fixes applied!')
