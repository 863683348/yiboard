'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CaretDown, Check, List, Moon, Sun, Translate, X } from '@phosphor-icons/react';

import { Link, usePathname } from '@/i18n/navigation';
import { LOCALE_LABELS, routing, type Locale } from '@/i18n/routing';
import { useAppearance, type BoardSkin } from '@/components/useAppearance';

const NAV_ITEMS = [
  { href: '/play', key: 'play' },
  { href: '/rankings', key: 'rankings' },
  { href: '/pricing', key: 'pricing' },
  { href: '/how-to', key: 'howTo' },
  { href: '/about', key: 'about' },
] as const;

const BOARD_SKINS: ReadonlyArray<{ value: BoardSkin; key: 'boardInk' | 'boardKaya' | 'boardSlate' }> =
  [
    { value: 'ink', key: 'boardInk' },
    { value: 'kaya', key: 'boardKaya' },
    { value: 'slate', key: 'boardSlate' },
  ];

function Dropdown({
  label,
  trigger,
  children,
}: {
  label: string;
  trigger: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} style={{ position: 'relative' }}>
      <button
        type="button"
        className="yb-btn yb-btn-ghost yb-btn-sm"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        {trigger}
        <CaretDown size={12} weight="bold" aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 6px)',
            minWidth: 176,
            padding: 4,
            background: 'var(--surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--elev-overlay)',
            zIndex: 60,
          }}
        >
          {children(() => setOpen(false))}
        </div>
      ) : null}
    </div>
  );
}

function MenuRow({
  active,
  onSelect,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        width: '100%',
        padding: '8px 10px',
        borderRadius: 'var(--radius-sm)',
        background: 'transparent',
        border: 0,
        color: active ? 'var(--fg)' : 'var(--fg-2)',
        fontSize: 'var(--text-sm)',
        fontWeight: active ? 'var(--weight-emphasis)' : 'var(--weight-body)',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <span>{children}</span>
      {active ? <Check size={14} weight="bold" color="var(--accent)" aria-hidden /> : null}
    </button>
  );
}

export function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const brand = useTranslations('brand');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, board, setTheme, setBoard, mounted } = useAppearance();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isDark = theme === 'dark';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="yb-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)',
          height: 60,
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 8,
            textDecoration: 'none',
            color: 'var(--fg)',
          }}
        >
          <span
            aria-hidden
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '0.04em',
            }}
          >
            {brand('hanzi')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-2xl)',
            }}
          >
            {brand('name')}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="yb-nav-desktop"
          style={{ alignItems: 'center', gap: 'var(--space-1)', marginRight: 'auto' }}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                style={{
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: active ? 'var(--weight-emphasis)' : 'var(--weight-body)',
                  color: active ? 'var(--fg)' : 'var(--fg-2)',
                  textDecoration: 'none',
                  boxShadow: active ? 'inset 0 -2px 0 var(--accent)' : 'none',
                }}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div
          className="yb-nav-desktop"
          style={{ alignItems: 'center', gap: 'var(--space-1)', marginLeft: 'auto' }}
        >
          <button
            type="button"
            className="yb-btn yb-btn-ghost yb-btn-sm"
            aria-label={isDark ? t('themeLight') : t('themeDark')}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            style={{ paddingInline: 10 }}
          >
            {mounted && isDark ? (
              <Sun size={16} weight="regular" aria-hidden />
            ) : (
              <Moon size={16} weight="regular" aria-hidden />
            )}
          </button>

          <Dropdown label={t('boardStyle')} trigger={<BoardGlyph skin={board} />}>
            {(close) =>
              BOARD_SKINS.map((skin) => (
                <MenuRow
                  key={skin.value}
                  active={board === skin.value}
                  onSelect={() => {
                    setBoard(skin.value);
                    close();
                  }}
                >
                  {t(skin.key)}
                </MenuRow>
              ))
            }
          </Dropdown>

          <Dropdown
            label={t('language')}
            trigger={
              <>
                <Translate size={16} weight="regular" aria-hidden />
                <span style={{ fontSize: 'var(--text-sm)' }}>{LOCALE_LABELS[locale]}</span>
              </>
            }
          >
            {(close) =>
              routing.locales.map((l) => (
                <LocaleRow key={l} locale={l} active={l === locale} onDone={close} />
              ))
            }
          </Dropdown>

          <Link href="/play" className="yb-btn yb-btn-primary yb-btn-sm" style={{ marginLeft: 6 }}>
            {t('play')}
          </Link>
        </div>

        <button
          type="button"
          className="yb-btn yb-btn-ghost yb-btn-sm yb-nav-mobile"
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          style={{ marginLeft: 'auto', paddingInline: 10 }}
        >
          {mobileOpen ? <X size={18} aria-hidden /> : <List size={18} aria-hidden />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          className="yb-nav-mobile"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <div className="yb-container" style={{ paddingBlock: 'var(--space-4)' }}>
            <nav aria-label="Primary" style={{ display: 'grid', gap: 2 }}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 'var(--radius-sm)',
                    color: pathname === item.href ? 'var(--fg)' : 'var(--fg-2)',
                    fontWeight:
                      pathname === item.href ? 'var(--weight-emphasis)' : 'var(--weight-body)',
                    textDecoration: 'none',
                  }}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            <hr className="yb-rule" style={{ marginBlock: 'var(--space-4)' }} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <button
                type="button"
                className="yb-btn yb-btn-outline yb-btn-sm"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
              >
                {mounted && isDark ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
                {isDark ? t('themeLight') : t('themeDark')}
              </button>
              {BOARD_SKINS.map((skin) => (
                <button
                  key={skin.value}
                  type="button"
                  className={board === skin.value ? 'yb-btn yb-btn-outline yb-btn-sm' : 'yb-btn yb-btn-ghost yb-btn-sm'}
                  aria-pressed={board === skin.value}
                  onClick={() => setBoard(skin.value)}
                >
                  <BoardGlyph skin={skin.value} />
                  {t(skin.key)}
                </button>
              ))}
            </div>

            <hr className="yb-rule" style={{ marginBlock: 'var(--space-4)' }} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {routing.locales.map((l) => (
                <LocaleChip key={l} locale={l} active={l === locale} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** 棋盘皮肤的小色片 —— 用 Token 取色，不写死 hex */
function BoardGlyph({ skin }: { skin: BoardSkin }) {
  return (
    <span
      data-board={skin}
      aria-hidden
      style={{
        width: 14,
        height: 14,
        borderRadius: 3,
        background: 'var(--board-surface)',
        border: '1px solid var(--board-edge)',
        display: 'inline-block',
      }}
    />
  );
}

function LocaleRow({
  locale,
  active,
  onDone,
}: {
  locale: Locale;
  active: boolean;
  onDone: () => void;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={pathname}
      locale={locale}
      role="menuitemradio"
      aria-checked={active}
      onClick={onDone}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        padding: '8px 10px',
        borderRadius: 'var(--radius-sm)',
        color: active ? 'var(--fg)' : 'var(--fg-2)',
        fontSize: 'var(--text-sm)',
        fontWeight: active ? 'var(--weight-emphasis)' : 'var(--weight-body)',
        textDecoration: 'none',
      }}
    >
      <span>{LOCALE_LABELS[locale]}</span>
      {active ? <Check size={14} weight="bold" color="var(--accent)" aria-hidden /> : null}
    </Link>
  );
}

function LocaleChip({ locale, active }: { locale: Locale; active: boolean }) {
  const pathname = usePathname();
  return (
    <Link
      href={pathname}
      locale={locale}
      aria-current={active ? 'true' : undefined}
      className={active ? 'yb-chip yb-chip-accent' : 'yb-chip'}
      style={{ height: 30, paddingInline: 'var(--space-3)', textDecoration: 'none' }}
    >
      {LOCALE_LABELS[locale]}
    </Link>
  );
}
