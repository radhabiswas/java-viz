import { useSyncExternalStore } from 'react';

function subscribe(onStoreChange: () => void) {
  const el = document.documentElement;
  const mo = new MutationObserver(onStoreChange);
  mo.observe(el, { attributes: true, attributeFilter: ['class'] });
  return () => mo.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

/** Matches `<html class="dark">` from the day/night toggle (see `src/lib/theme.ts`). */
export function useDarkMode(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
