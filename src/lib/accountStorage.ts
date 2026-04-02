/**
 * Minimal local accounts: progress lives in localStorage for this browser only.
 * Passwords are stored as SHA-256 hex (not suitable for real security; fine for a learning tracker).
 */

const ACCOUNTS_KEY = 'javaviz.accounts.v1';
const SESSION_KEY = 'javaviz.session.v1';

export type StoredAccount = {
  passwordHash: string;
  score: number;
  completedQuizIds: string[];
  completedSectionQuizIds?: string[];
};

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

function readStore(): Record<string, StoredAccount> {
  try {
    const s = localStorage.getItem(ACCOUNTS_KEY);
    if (!s) return {};
    const o = JSON.parse(s) as unknown;
    if (!o || typeof o !== 'object') return {};
    return o as Record<string, StoredAccount>;
  } catch {
    return {};
  }
}

function writeStore(map: Record<string, StoredAccount>) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(map));
}

export async function hashPassword(password: string): Promise<string> {
  if (typeof crypto?.subtle?.digest !== 'function') {
    throw new Error('Secure hashing is not available in this context.');
  }
  const enc = new TextEncoder().encode(password);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function getSessionUsername(): string | null {
  try {
    const u = localStorage.getItem(SESSION_KEY);
    return u && u.length > 0 ? u : null;
  } catch {
    return null;
  }
}

export function setSessionUsername(usernameNorm: string) {
  localStorage.setItem(SESSION_KEY, usernameNorm);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function loadProgress(
  usernameNorm: string,
): { score: number; completedQuizIds: Set<string>; completedSectionQuizIds: Set<string> } | null {
  const map = readStore();
  const acc = map[usernameNorm];
  if (!acc) return null;
  return {
    score: acc.score,
    completedQuizIds: new Set(acc.completedQuizIds),
    completedSectionQuizIds: new Set(acc.completedSectionQuizIds ?? []),
  };
}

export function saveProgress(
  usernameNorm: string,
  score: number,
  completedQuizIds: string[],
  completedSectionQuizIds?: string[],
) {
  const map = readStore();
  const acc = map[usernameNorm];
  if (!acc) return;
  map[usernameNorm] = {
    ...acc,
    score,
    completedQuizIds,
    ...(completedSectionQuizIds ? { completedSectionQuizIds } : {}),
  };
  writeStore(map);
}

export async function signUp(usernameRaw: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const usernameNorm = normalizeUsername(usernameRaw);
  if (usernameNorm.length < 2 || usernameNorm.length > 32) {
    return { ok: false, error: 'Use 2–32 characters for your name.' };
  }
  if (!/^[a-z0-9_]+$/.test(usernameNorm)) {
    return { ok: false, error: 'Use letters, numbers, and underscores only.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }
  const map = readStore();
  if (map[usernameNorm]) {
    return { ok: false, error: 'That name is already taken.' };
  }
  const passwordHash = await hashPassword(password);
  map[usernameNorm] = {
    passwordHash,
    score: 0,
    completedQuizIds: [],
    completedSectionQuizIds: [],
  };
  writeStore(map);
  setSessionUsername(usernameNorm);
  return { ok: true };
}

export async function signIn(
  usernameRaw: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const usernameNorm = normalizeUsername(usernameRaw);
  if (!usernameNorm || !password) {
    return { ok: false, error: 'Enter your name and password.' };
  }
  const map = readStore();
  const acc = map[usernameNorm];
  if (!acc) {
    return { ok: false, error: 'No account found for that name.' };
  }
  const h = await hashPassword(password);
  if (h !== acc.passwordHash) {
    return { ok: false, error: 'Wrong password.' };
  }
  setSessionUsername(usernameNorm);
  return { ok: true };
}

export function signOut() {
  clearSession();
}
