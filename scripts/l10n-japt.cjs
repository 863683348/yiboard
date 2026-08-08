// 一次性脚本：把新页面翻译注入 ja.json / pt-BR.json
const fs = require('fs');

// ───────────── 日本語 ─────────────
const ja = JSON.parse(fs.readFileSync('src/messages/ja.json', 'utf8'));
ja.nav.pricing = '料金';
ja.footer.legal = '法的情報';
ja.footer.privacy = 'プライバシーポリシー';
ja.footer.terms = '利用規約';
ja.footer.faq = 'よくある質問';
ja.footer.blog = 'ブログ';
ja.footer.contact = 'お問い合わせ';
ja.pricing = {
  title: '料金',
  sub: '無料でプレイできます。有料プランは準備中です。サブスク開始まではすべて無料。',
  monthly: '月額',
  yearly: '年額',
  free: { name: '無料', price: '0', note: '今すぐプレイ可能', features: ['五目並べ：エンジンまたは友人と対戦', '十八段階の品・段ラダー', 'ゲスト記録を180日保存', '対局の共有とリプレイ'] },
  plus: { name: 'Plus', price: '4.99', note: '毎日遊ぶ人向け', features: ['無料プランの全機能', '広告なし', '詳細な対局統計とレート推移', '棋譜ライブラリ：名局の研究'] },
  pro: { name: 'Pro', price: '7.99', note: '本気のプレイヤー向け', features: ['Plusの全機能', '象棋・囲碁の先行アクセス', '棋譜の無制限保存', '実物セットの会員割引'] },
  comingSoon: '決済を接続中です（次フェーズ）。それまで全機能無料。',
  cta: '無料で始める',
  faqTitle: '料金についての質問',
  faqQ1: '今すぐ支払う必要がありますか？',
  faqA1: 'いいえ。サブスクは後のフェーズで開始します。それまで全機能無料です。',
  faqQ2: 'なぜ有料プランがあるのですか？',
  faqA2: '広告なし・データ販売なしで運営を支えるためです。サーバー、エンジン開発、実物セット事業に使います。',
  faqQ3: 'いつでも解約できますか？',
  faqA3: 'はい。開始後はいつでも解約でき、残りの期間はそのまま利用できます。'
};
ja.privacy = {
  title: 'プライバシーポリシー',
  updated: '最終更新：2026年8月',
  lead: '私たちは最小限しか収集しません。この方針で何をなぜ収集するかを説明します。',
  s1Title: '収集する情報',
  s1Body: '初回アクセス時に、記録とレートを保持するため匿名のゲスト識別子（JWT、180日有効）をブラウザに書き込みます。メールを登録しない限り、氏名・所在地・端末情報は収集しません。',
  s2Title: 'メールの登録',
  s2Body: 'メール登録は任意で、端末間の記録同期のみに使います。パスワードはargon2でハッシュ化され、平文を読むことはできません。',
  s3Title: '私たちがしないこと',
  s3Body: 'データを販売せず、個人向け広告を表示せず、Web上で追跡しません。',
  s4Title: 'データの削除',
  s4Body: 'アカウントと対局履歴の削除は ahmedlzany423@gmail.com まで。30日以内に処理します。',
  s5Title: 'Cookie',
  s5Body: 'ゲスト識別子と言語設定のCookieのみ。第三者分析はありません。',
  contact: 'プライバシーに関する質問はこちらへ'
};
ja.terms = {
  title: '利用規約',
  updated: '最終更新：2026年8月',
  lead: 'YiBoardを利用することで本規約に同意したものとみなされます。',
  s1Title: 'サービス内容',
  s1Body: 'YiBoardはオンライン盤上ゲームを提供します。五目並べは現在利用可能、象棋と囲碁は準備中です。サービスは現状のまま提供されます。',
  s2Title: 'アカウントとゲスト',
  s2Body: '登録なしでゲストとしてプレイできます。ゲスト記録は端末に保存されます。メール登録で複数端末に同期できます。',
  s3Title: 'フェアプレイ',
  s3Body: '自動スクリプト、チート、結果改ざんの試みは禁止です。友人対局はすべてサーバー側で審判され、チートは拒否され、アカウント停止の可能性があります。',
  s4Title: '知的財産',
  s4Body: 'YiBoardのコード、デザイン、文面、ブランドは開発者に帰属します。対局データは対局者に帰属します。',
  s5Title: '免責事項',
  s5Body: '法律で認められる最大限の範囲で、YiBoardは本サービス利用による間接損害について責任を負いません。',
  s6Title: '規約の変更',
  s6Body: '本規約は更新されることがあります。変更後の利用をもって同意とみなされます。'
};
ja.faq = {
  title: 'よくある質問',
  sub: '答えが見つからない場合は ahmedlzany423@gmail.com まで。',
  q1: 'プレイにアカウントは必要ですか？',
  a1: 'いいえ。ボードを開いてそのままプレイできます。進捗はこのブラウザに180日保存されます。別の端末で使いたいときだけメールを登録してください。',
  q2: 'エンジンの強さは？',
  a2: '3段階：かんたん（2手読み）、ふつう（4手）、つよさ（6手）。500msの制限内でアルファベータ探索をブラウザ内で実行します。',
  q3: '友人とどう対戦しますか？',
  a3: '「友人と対戦」を選び、ルームを作成してコードかリンクを送ってください。相手はアカウント不要でボードに直接入室できます。',
  q4: 'ラダーはどう機能しますか？',
  a4: '友人対戦の結果がELOに反映され、九級から九段までの十八段階にマッピングされます。全員1200（六級）からスタート。エンジン戦はレートに影響しません。',
  q5: 'データはどのくらい保持されますか？',
  a5: 'ゲスト記録は180日。メール登録後は削除を依頼するまで保持されます。',
  q6: 'メンバーシップはいつ始まりますか？',
  a6: '決済を統合中です。開始までは全機能無料。開始前にアナウンスします。',
  q7: 'モバイルアプリはありますか？',
  a7: 'YiBoardはレスポンシブWeb（PWA予定）です。ダウンロード不要でモバイルブラウザからプレイできます。'
};
ja.blog = {
  title: 'ブログ',
  sub: '開発ノート、盤上ゲーム文化、YiBoardからの更新。',
  p1Title: 'なぜ五目並べが最初か',
  p1Excerpt: '30秒で学べて、3000年議論されてきた。五目並べはこのゲームの良さを世界に伝える最短ルートです。',
  p1Date: '2026年8月',
  p2Title: 'ラダーの由来',
  p2Excerpt: '九級から九段へ：なぜブロンズやプラチナではなく、中国の品・段文化から借りたのか。',
  p2Date: '2026年7月',
  p3Title: 'サーバー側審判：なぜ誰も不正できないか',
  p3Excerpt: 'すべての手はサーバーが検証します。クライアントは表示層にすぎません。これがアンチチートの基盤です。',
  p3Date: '2026年6月'
};
ja.contact = {
  title: 'お問い合わせ',
  sub: '質問、フィードバック、パートナーシップ、または語りたい対局があればお返事します。',
  emailLabel: 'メール',
  emailNote: '通常1〜2営業日以内に返信します。',
  privacyNote: 'データ削除やアカウントの問題は、ゲストID（プロフィールに表示）を添えてください。'
};
fs.writeFileSync('src/messages/ja.json', JSON.stringify(ja, null, 2) + '\n');
console.log('ja.json updated:', Object.keys(ja).length);

// ───────────── Português (BR) ─────────────
const pt = JSON.parse(fs.readFileSync('src/messages/pt-BR.json', 'utf8'));
pt.nav.pricing = 'Preços';
pt.footer.legal = 'Jurídico';
pt.footer.privacy = 'Política de Privacidade';
pt.footer.terms = 'Termos de Serviço';
pt.footer.faq = 'Perguntas frequentes';
pt.footer.blog = 'Blog';
pt.footer.contact = 'Fale conosco';
pt.pricing = {
  title: 'Preços',
  sub: 'Jogar é grátis. Os planos pagos estão a caminho: tudo é gratuito até o lançamento das assinaturas.',
  monthly: 'por mês',
  yearly: 'por ano',
  free: { name: 'Grátis', price: '0', note: 'Jogável agora', features: ['Gomoku contra o motor ou um amigo', 'Escada de dezoito níveis (graus e dans)', 'Histórico de convidado por 180 dias', 'Compartilhe e revise suas partidas'] },
  plus: { name: 'Plus', price: '4.99', note: 'Para quem joga todo dia', features: ['Tudo do Grátis', 'Sem anúncios', 'Estatísticas detalhadas de partidas', 'Biblioteca de partidas clássicas'] },
  pro: { name: 'Pro', price: '7.99', note: 'Para jogadores sérios', features: ['Tudo do Plus', 'Acesso antecipado a Xiangqi e Go', 'Partidas salvas ilimitadas', 'Desconto em tabuleiros físicos'] },
  comingSoon: 'Os pagamentos estão em integração (próxima fase). Até lá, tudo é gratuito.',
  cta: 'Comece a jogar grátis',
  faqTitle: 'Perguntas sobre preços',
  faqQ1: 'Preciso pagar agora?',
  faqA1: 'Não. As assinaturas entram em uma fase posterior; até lá tudo é gratuito.',
  faqQ2: 'Por que um plano pago?',
  faqA2: 'Para manter o serviço de pé sem anúncios nem venda de dados: servidores, o motor e a linha de tabuleiros físicos.',
  faqQ3: 'Posso cancelar quando quiser?',
  faqA3: 'Sim. Quando as assinaturas lançarem, cancele a qualquer momento e mantenha o restante do seu período.'
};
pt.privacy = {
  title: 'Política de Privacidade',
  updated: 'Última atualização: agosto de 2026',
  lead: 'Coletamos o mínimo possível. Esta política explica o que coletamos e por quê.',
  s1Title: 'O que coletamos',
  s1Body: 'Na primeira visita gravamos um identificador anônimo de convidado (um JWT válido por 180 dias) para manter seu histórico e pontuação. Não coletamos nome, localização ou dados do dispositivo, a menos que você vincule um e-mail.',
  s2Title: 'Vincular um e-mail',
  s2Body: 'É opcional e serve apenas para sincronizar seu histórico entre dispositivos. Senhas são armazenadas com hash argon2; não conseguimos ler sua senha em texto puro.',
  s3Title: 'O que não fazemos',
  s3Body: 'Não vendemos seus dados, não exibimos anúncios personalizados e não rastreamos você pela web.',
  s4Title: 'Exclusão de dados',
  s4Body: 'Para excluir sua conta e histórico, envie e-mail para ahmedlzany423@gmail.com e processaremos em 30 dias.',
  s5Title: 'Cookies',
  s5Body: 'Apenas o identificador de convidado e um cookie de idioma. Sem análise de terceiros.',
  contact: 'Para dúvidas de privacidade, escreva para'
};
pt.terms = {
  title: 'Termos de Serviço',
  updated: 'Última atualização: agosto de 2026',
  lead: 'Ao usar o YiBoard você concorda com estes termos.',
  s1Title: 'O serviço',
  s1Body: 'O YiBoard oferece jogos de tabuleiro online: Gomoku já disponível, com Xiangqi e Go a caminho. O serviço é fornecido como está.',
  s2Title: 'Contas e convidados',
  s2Body: 'Você pode jogar como convidado sem se registrar. O histórico de convidado fica no seu dispositivo; vincule um e-mail para sincronizar.',
  s3Title: 'Jogo limpo',
  s3Body: 'Scripts automatizados, trapaças e qualquer tentativa de alterar resultados são proibidos. Todas as partidas entre amigos são arbitradas no servidor; trapaceiros serão rejeitados e possivelmente banidos.',
  s4Title: 'Propriedade intelectual',
  s4Body: 'O código, design, textos e marca do YiBoard pertencem ao desenvolvedor. Seus dados de partida pertencem a você.',
  s5Title: 'Aviso legal',
  s5Body: 'Na máxima extensão permitida por lei, o YiBoard não se responsabiliza por danos indiretos decorrentes do uso do serviço.',
  s6Title: 'Alterações',
  s6Body: 'Podemos atualizar estes termos; continuar usando o serviço após alterações significa aceitá-los.'
};
pt.faq = {
  title: 'Perguntas frequentes',
  sub: 'Não achou a resposta? Envie e-mail para ahmedlzany423@gmail.com.',
  q1: 'Preciso de conta para jogar?',
  a1: 'Não. Abra o tabuleiro e jogue: seu progresso fica salvo neste navegador por 180 dias. Vincule um e-mail só quando quiser usar em outro dispositivo.',
  q2: 'Qual a força do motor?',
  a2: 'Três níveis: Suave (2 jogadas), Constante (4) e Afiado (6). Usa busca alfa-beta com orçamento de 500 ms, no seu navegador.',
  q3: 'Como jogar com um amigo?',
  a3: 'Na página de jogo escolha "Contra um amigo", crie uma sala e envie o código ou link. Eles entram direto no tabuleiro, sem conta.',
  q4: 'Como funciona a escada?',
  a4: 'Partidas entre amigos liquidam ELO, mapeado para os dezoito graus e dans, de Nono Grau a Nono Dan. Todos começam em 1200 (Sexto Grau). Jogos contra o motor não mudam sua pontuação.',
  q5: 'Por quanto tempo meus dados ficam salvos?',
  a5: 'O histórico de convidado dura 180 dias. Com e-mail vinculado, fica salvo até você pedir exclusão.',
  q6: 'Quando a assinatura lança?',
  a6: 'Os pagamentos estão em integração. Tudo é gratuito até lá e avisaremos antes do lançamento.',
  q7: 'Tem app móvel?',
  a7: 'O YiBoard é uma web responsiva (PWA planejada): jogue em qualquer navegador móvel sem downloads.'
};
pt.blog = {
  title: 'Blog',
  sub: 'Notas de desenvolvimento, cultura de jogos de tabuleiro e novidades do YiBoard.',
  p1Title: 'Por que o Gomoku sai primeiro',
  p1Excerpt: 'Aprende-se em trinta segundos e discute-se há três mil anos. Gomoku é o caminho mais curto para mostrar ao mundo por que esses jogos são bons.',
  p1Date: 'Agosto de 2026',
  p2Title: 'De onde vem a escada',
  p2Excerpt: 'Do Nono Grau ao Nono Dan: por que pegamos emprestados graus e dans da cultura chinesa em vez de bronze e platina.',
  p2Date: 'Julho de 2026',
  p3Title: 'Árbitro no servidor: por que ninguém trapaceia',
  p3Excerpt: 'Cada jogada é validada pelo servidor; o cliente é só uma camada de exibição. Essa é a base do nosso design anti-trapaça.',
  p3Date: 'Junho de 2026'
};
pt.contact = {
  title: 'Fale conosco',
  sub: 'Dúvidas, feedback, parcerias ou uma partida que você quer comentar: respondemos.',
  emailLabel: 'E-mail',
  emailNote: 'Costumamos responder em 1-2 dias úteis.',
  privacyNote: 'Para exclusão de dados ou problemas de conta, inclua seu ID de convidado (visível no seu perfil).'
};
fs.writeFileSync('src/messages/pt-BR.json', JSON.stringify(pt, null, 2) + '\n');
console.log('pt-BR.json updated:', Object.keys(pt).length);
