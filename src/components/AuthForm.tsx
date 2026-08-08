'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

type Mode = 'register' | 'login';

const EMPTY = { username: '', email: '', password: '', confirm: '', identifier: '' };

interface FormErrors {
  field?: string;
  message: string;
}

export function AuthForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('register');
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<FormErrors | null>(null);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setError(null);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setForm(EMPTY);
    setError(null);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    if (mode === 'register') {
      if (form.password !== form.confirm) {
        setError({ field: 'confirm', message: t('passwordMismatch') });
        return;
      }
    }

    setBusy(true);
    setError(null);
    try {
      const path = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const body =
        mode === 'register'
          ? { username: form.username, email: form.email, password: form.password }
          : { identifier: form.identifier, password: form.password };

      const res = await fetch(path, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        setError({ message: t(messageKey(data?.message)) });
        return;
      }

      const data = (await res.json()) as { redirect?: string };
      router.push(data.redirect ?? '/profile');
    } catch {
      setError({ message: t('errGeneric') });
    } finally {
      setBusy(false);
    }
  }

  function messageKey(code?: string): Parameters<typeof t>[0] {
    switch (code) {
      case 'INVALID_USERNAME':
        return 'errInvalidUsername';
      case 'INVALID_EMAIL':
        return 'errInvalidEmail';
      case 'WEAK_PASSWORD':
        return 'errWeakPassword';
      case 'EMAIL_TAKEN':
        return 'errEmailTaken';
      case 'USERNAME_TAKEN':
        return 'errUsernameTaken';
      case 'INVALID_CREDENTIALS':
        return 'errInvalidCredentials';
      default:
        return 'errGeneric';
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 44,
    paddingInline: 'var(--space-4)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-strong)',
    background: 'var(--surface)',
    color: 'var(--fg)',
    fontSize: 'var(--text-sm)',
  };

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      {/* 模式切换 */}
      <div role="tablist" aria-label={t('title')} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {(['register', 'login'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => switchMode(m)}
            className="yb-btn yb-btn-sm"
            style={{
              flex: 1,
              background: mode === m ? 'var(--accent)' : 'transparent',
              color: mode === m ? 'var(--accent-on)' : 'var(--fg-2)',
              border: mode === m ? '1px solid var(--accent)' : '1px solid var(--border)',
            }}
          >
            {m === 'register' ? t('tabRegister') : t('tabLogin')}
          </button>
        ))}
      </div>

      <form onSubmit={submit} style={{ display: 'grid', gap: 'var(--space-4)' }} noValidate>
        {mode === 'register' ? (
          <>
            <Field label={t('username')} error={error?.field === 'username' ? error.message : null}>
              <input style={inputStyle} value={form.username} onChange={set('username')} autoComplete="username" minLength={3} maxLength={20} required />
            </Field>
            <Field label={t('email')} error={error?.field === 'email' ? error.message : null}>
              <input style={inputStyle} type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
            </Field>
            <Field label={t('password')}>
              <input style={inputStyle} type="password" value={form.password} onChange={set('password')} autoComplete="new-password" minLength={8} required />
            </Field>
            <Field label={t('confirmPassword')} error={error?.field === 'confirm' ? error.message : null}>
              <input style={inputStyle} type="password" value={form.confirm} onChange={set('confirm')} autoComplete="new-password" required />
            </Field>
          </>
        ) : (
          <>
            <Field label={t('identifier')}>
              <input style={inputStyle} value={form.identifier} onChange={set('identifier')} autoComplete="username" required />
            </Field>
            <Field label={t('password')}>
              <input style={inputStyle} type="password" value={form.password} onChange={set('password')} autoComplete="current-password" required />
            </Field>
          </>
        )}

        {error && !error.field ? (
          <p role="alert" style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>
            {error.message}
          </p>
        ) : null}

        <button type="submit" className="yb-btn yb-btn-primary" disabled={busy} style={{ justifyContent: 'center' }}>
          {busy ? t('submitting') : mode === 'register' ? t('register') : t('login')}
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBlock: 'var(--space-5)' }}>
        <hr className="yb-rule" style={{ flex: 1 }} />
        <span className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>{t('divider')}</span>
        <hr className="yb-rule" style={{ flex: 1 }} />
      </div>

      {/* Google（原生 <a>：OAuth 302 跳转） */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/auth/google" className="yb-btn yb-btn-outline" style={{ justifyContent: 'center', textDecoration: 'none' }}>
        {t('google')}
      </a>

      <p className="yb-meta" style={{ marginTop: 'var(--space-5)', textAlign: 'center' }}>
        {mode === 'register' ? (
          <button type="button" className="yb-btn yb-btn-ghost yb-btn-sm" onClick={() => switchMode('login')}>
            {t('switchToLogin')}
          </button>
        ) : (
          <button type="button" className="yb-btn yb-btn-ghost yb-btn-sm" onClick={() => switchMode('register')}>
            {t('switchToRegister')}
          </button>
        )}
      </p>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: 'grid', gap: 'var(--space-2)' }}>
      <span className="yb-meta" style={{ fontSize: 'var(--text-xs)' }}>{label}</span>
      {children}
      {error ? (
        <span role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)' }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
