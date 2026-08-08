// 一次性：5 语注入 auth namespace
const fs = require('fs');

const add = {
  en: {
    title: 'Account', sub: 'Keep your record across devices. Playing as a guest works too.',
    tabRegister: 'Register', tabLogin: 'Sign in',
    username: 'Username', email: 'Email', password: 'Password', confirmPassword: 'Confirm password', identifier: 'Username or email',
    register: 'Create account', login: 'Sign in', submitting: 'Please wait…',
    switchToLogin: 'Already have an account? Sign in', switchToRegister: 'No account yet? Register',
    divider: 'or', google: 'Continue with Google',
    passwordMismatch: 'Passwords do not match.',
    errInvalidUsername: 'Username must be 3-20 letters, numbers or underscores, starting with a letter.',
    errInvalidEmail: 'Please enter a valid email address.',
    errWeakPassword: 'Password must be at least 8 characters.',
    errEmailTaken: 'An account with this email already exists. Sign in instead.',
    errUsernameTaken: 'This username is already taken.',
    errInvalidCredentials: 'Wrong username/email or password.',
    errGeneric: 'Something went wrong. Please try again.',
  },
  zh: {
    title: '账号', sub: '登录后可在任意设备同步战绩。访客也能直接玩。',
    tabRegister: '注册', tabLogin: '登录',
    username: '用户名', email: '邮箱', password: '密码', confirmPassword: '确认密码', identifier: '用户名或邮箱',
    register: '创建账号', login: '登录', submitting: '请稍候…',
    switchToLogin: '已有账号？去登录', switchToRegister: '还没有账号？去注册',
    divider: '或', google: '使用 Google 登录',
    passwordMismatch: '两次输入的密码不一致。',
    errInvalidUsername: '用户名需为 3-20 位字母、数字或下划线，且以字母开头。',
    errInvalidEmail: '请输入有效的邮箱地址。',
    errWeakPassword: '密码至少需要 8 位。',
    errEmailTaken: '该邮箱已注册，请直接登录。',
    errUsernameTaken: '该用户名已被占用。',
    errInvalidCredentials: '用户名/邮箱或密码错误。',
    errGeneric: '出了点问题，请重试。',
  },
  es: {
    title: 'Cuenta', sub: 'Guarda tu historial en cualquier dispositivo. También puedes jugar como invitado.',
    tabRegister: 'Registrarse', tabLogin: 'Iniciar sesión',
    username: 'Nombre de usuario', email: 'Correo', password: 'Contraseña', confirmPassword: 'Confirmar contraseña', identifier: 'Usuario o correo',
    register: 'Crear cuenta', login: 'Iniciar sesión', submitting: 'Espera…',
    switchToLogin: '¿Ya tienes cuenta? Inicia sesión', switchToRegister: '¿Sin cuenta? Regístrate',
    divider: 'o', google: 'Continuar con Google',
    passwordMismatch: 'Las contraseñas no coinciden.',
    errInvalidUsername: 'El usuario debe tener 3-20 letras, números o guiones bajos, empezando por una letra.',
    errInvalidEmail: 'Introduce un correo válido.',
    errWeakPassword: 'La contraseña debe tener al menos 8 caracteres.',
    errEmailTaken: 'Ya existe una cuenta con este correo. Inicia sesión.',
    errUsernameTaken: 'Este nombre de usuario ya está en uso.',
    errInvalidCredentials: 'Usuario/correo o contraseña incorrectos.',
    errGeneric: 'Algo salió mal. Inténtalo de nuevo.',
  },
  ja: {
    title: 'アカウント', sub: 'ログインすると記録をどの端末でも同期できます。ゲストでも遊べます。',
    tabRegister: '登録', tabLogin: 'ログイン',
    username: 'ユーザー名', email: 'メール', password: 'パスワード', confirmPassword: '確認用パスワード', identifier: 'ユーザー名またはメール',
    register: 'アカウント作成', login: 'ログイン', submitting: 'お待ちください…',
    switchToLogin: 'アカウントをお持ちですか？ログイン', switchToRegister: 'アカウントがありませんか？登録',
    divider: 'または', google: 'Googleでログイン',
    passwordMismatch: 'パスワードが一致しません。',
    errInvalidUsername: 'ユーザー名は3〜20文字の英数字・アンダースコアで、英字で始めてください。',
    errInvalidEmail: '有効なメールアドレスを入力してください。',
    errWeakPassword: 'パスワードは8文字以上必要です。',
    errEmailTaken: 'このメールは既に登録されています。ログインしてください。',
    errUsernameTaken: 'このユーザー名は既に使われています。',
    errInvalidCredentials: 'ユーザー名/メールまたはパスワードが違います。',
    errGeneric: 'エラーが発生しました。もう一度お試しください。',
  },
  'pt-BR': {
    title: 'Conta', sub: 'Mantenha seu histórico em qualquer dispositivo. Jogar como convidado também funciona.',
    tabRegister: 'Cadastrar', tabLogin: 'Entrar',
    username: 'Nome de usuário', email: 'E-mail', password: 'Senha', confirmPassword: 'Confirmar senha', identifier: 'Usuário ou e-mail',
    register: 'Criar conta', login: 'Entrar', submitting: 'Aguarde…',
    switchToLogin: 'Já tem conta? Entre', switchToRegister: 'Não tem conta? Cadastre-se',
    divider: 'ou', google: 'Continuar com Google',
    passwordMismatch: 'As senhas não coincidem.',
    errInvalidUsername: 'O usuário deve ter 3-20 letras, números ou sublinhados, começando com letra.',
    errInvalidEmail: 'Digite um e-mail válido.',
    errWeakPassword: 'A senha deve ter pelo menos 8 caracteres.',
    errEmailTaken: 'Já existe uma conta com este e-mail. Entre.',
    errUsernameTaken: 'Este nome de usuário já está em uso.',
    errInvalidCredentials: 'Usuário/e-mail ou senha incorretos.',
    errGeneric: 'Algo deu errado. Tente novamente.',
  },
};

for (const [f, keys] of Object.entries(add)) {
  const p = `src/messages/${f}.json`;
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  d.auth = keys;
  fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
  console.log(f, 'auth added');
}
