import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import enMessages from '../messages/en.json';

type Messages = typeof enMessages;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** 按点分路径在消息对象里取值（支持 'home.games.reversi.name' 这类嵌套键）。 */
function lookup(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), obj);
}

/**
 * 以英文消息为基底，把活动语言的同名键覆盖上去。
 * 保证任何 locale（含 es/ja/ko/pt-BR）都包含全部英文键——
 * 这样客户端 Provider 拿到的消息始终完整，不会触发缺键报错。
 */
function mergeBase(base: Messages, override: unknown): Messages {
  const out: Record<string, unknown> = { ...base };
  if (!isPlainObject(override)) return out as Messages;
  for (const [k, v] of Object.entries(override)) {
    if (v === undefined) continue;
    if (isPlainObject(v) && isPlainObject(out[k])) {
      out[k] = mergeBase(out[k] as Messages, v);
    } else {
      out[k] = v;
    }
  }
  return out as Messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const localeMessages = (await import(`../messages/${locale}.json`)).default;
  const messages = locale === 'en' ? enMessages : mergeBase(enMessages, localeMessages);

  return {
    locale,
    messages,
    /**
     * 兜底：万一某键在英文基底里也不存在，回退到键名本身而非报错
     * （es/ja/ko/pt-BR 的缺键已由上面的 mergeBase 用英文补齐）。
     */
    getMessageFallback: ({ key, namespace }) => {
      const full = namespace ? `${namespace}.${key}` : key;
      const value = lookup(enMessages, full);
      return typeof value === 'string' ? value : key;
    },
  };
});
