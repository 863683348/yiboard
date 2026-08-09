import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { readUser } from '@/lib/session';
import { routing, type Locale } from '@/i18n/routing';

import '../globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yiboardgame.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? '/' : `/${l}`]),
  );

  // 自愈式基准域名：取请求 Host，避免 SITE_URL 环境变量残留旧域名时 canonical/OG 输出错。
  const host = (await headers()).get('host');
  const siteUrl = host ? `https://${host}` : SITE_URL;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('title'),
      template: '%s — YiBoard',
    },
    description: t('description'),
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: { ...languages, 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      siteName: 'YiBoard',
      title: t('title'),
      description: t('description'),
      locale,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og.png'],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * 在水合前把主题写到 <html>，避免浅色闪一下再切深色。
 * 只读两个键，逻辑必须短到能内联。
 */
const THEME_BOOTSTRAP = `(function(){try{var d=document.documentElement;
var t=localStorage.getItem('yb-theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);
var b=localStorage.getItem('yb-board');if(b)d.setAttribute('data-board',b);else d.setAttribute('data-board','ink');
}catch(e){}})();`;

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'common' });
  const me = await readUser();

  return (
    <html lang={locale} data-board="ink" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className={`${archivo.variable} ${inter.variable}`}>
        <NextIntlClientProvider>
          <a className="yb-skip" href="#content">
            {t('skipToContent')}
          </a>
          <Navbar locale={locale as Locale} user={me} />
          <main id="content">{props.children}</main>
          <SiteFooter locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
