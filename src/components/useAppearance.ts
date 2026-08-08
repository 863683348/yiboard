'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type ThemeMode = 'light' | 'dark';
export type BoardSkin = 'ink' | 'kaya' | 'slate';

const THEME_KEY = 'yb-theme';
const BOARD_KEY = 'yb-board';
/** 本标签页内手动通知订阅者（storage 事件只跨标签页触发） */
const EVT = 'yb-appearance';

function getTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getBoard(): BoardSkin {
  if (typeof document === 'undefined') return 'ink';
  const attr = document.documentElement.getAttribute('data-board');
  return attr === 'kaya' || attr === 'slate' ? attr : 'ink';
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVT, callback);
    window.removeEventListener('storage', callback);
  };
}

function emit() {
  window.dispatchEvent(new Event(EVT));
}

/**
 * 外观偏好只存两个键，写在 <html> 上，由 layout 的内联脚本在水合前恢复。
 * 用 useSyncExternalStore 订阅外部 store（document 属性 + localStorage）：
 * - serverSnapshot 给 SSR 默认值，水合后自动切到真实值，无 hydration 警告
 * - mounted 由同一机制提供：客户端恒 true / SSR false，供图标等做 SSR 一致性判断
 */
export function useAppearance() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as ThemeMode);
  const board = useSyncExternalStore(subscribe, getBoard, () => 'ink' as BoardSkin);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const setTheme = useCallback((next: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* 隐私模式下写不进去也不该崩 */
    }
    emit();
  }, []);

  const setBoard = useCallback((next: BoardSkin) => {
    document.documentElement.setAttribute('data-board', next);
    try {
      localStorage.setItem(BOARD_KEY, next);
    } catch {
      /* 同上 */
    }
    emit();
  }, []);

  return { theme, board, setTheme, setBoard, mounted };
}
