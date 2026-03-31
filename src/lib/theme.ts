export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'javaviz-theme';

export function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {
    /* ignore */
  }
  return null;
}

/** Theme for first paint / React init: saved choice, else light (app default). */
export function getInitialTheme(): Theme {
  const stored = readStoredTheme();
  if (stored) return stored;
  return 'light';
}

export function applyThemeClass(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function persistThemeChoice(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}
