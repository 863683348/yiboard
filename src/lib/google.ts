/**
 * Google OAuth 2.0（authorization code flow，服务端 secret 场景）。
 * 自实现、零新依赖：jose 已有，token/userinfo 走原生 fetch。
 * state 防 CSRF（回调里比对 cookie），redirect_uri 必须与 Google Cloud 控制台配置一致。
 */

export interface GoogleCredentials {
  clientId: string;
  clientSecret: string;
}

/** 未配置 GOOGLE_CLIENT_ID/SECRET 时返回 null（登录按钮应降级为不可用提示）。 */
export function googleCredentials(): GoogleCredentials | null {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function buildGoogleAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'online',
    prompt: 'select_account',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCode(
  code: string,
  creds: GoogleCredentials,
  redirectUri: string,
): Promise<{ access_token: string }> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: creds.clientId,
      client_secret: creds.clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });
  if (!res.ok) throw new Error('GOOGLE_TOKEN_EXCHANGE_FAILED');
  return (await res.json()) as { access_token: string };
}

export interface GoogleProfile {
  email?: string;
  email_verified?: boolean;
  name?: string;
}

export async function fetchGoogleProfile(accessToken: string): Promise<GoogleProfile> {
  const res = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('GOOGLE_USERINFO_FAILED');
  return (await res.json()) as GoogleProfile;
}

/** Google 账号邮箱已由 Google 验证（email_verified=true）才可用于绑定本站账号。 */
export function hasVerifiedEmail(profile: GoogleProfile): boolean {
  return typeof profile.email === 'string' && profile.email.length > 0 && profile.email_verified === true;
}
