import React, { useState } from 'react';
import { X } from 'lucide-react';
import { signIn, signUp } from '../lib/accountStorage';

type Mode = 'login' | 'signup';

export default function AccountModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const resetForm = () => {
    setPassword('');
    setConfirm('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'signup') {
        if (password !== confirm) {
          setError('Passwords do not match.');
          setBusy(false);
          return;
        }
        const r = await signUp(username, password);
        if (r.ok === false) {
          setError(r.error);
          setBusy(false);
          return;
        }
      } else {
        const r = await signIn(username, password);
        if (r.ok === false) {
          setError(r.error);
          setBusy(false);
          return;
        }
      }
      resetForm();
      setUsername('');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 dark:bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      onMouseDown={(ev) => {
        if (ev.target === ev.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 id="account-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 flex rounded-lg border border-slate-200 p-0.5 text-xs font-semibold dark:border-slate-700">
          <button
            type="button"
            className={`flex-1 rounded-md py-2 transition-colors ${
              mode === 'login' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            onClick={() => {
              setMode('login');
              resetForm();
            }}
          >
            Log in
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md py-2 transition-colors ${
              mode === 'signup' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            onClick={() => {
              setMode('signup');
              resetForm();
            }}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="acc-user" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Name
            </label>
            <input
              id="acc-user"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-teal-500/0 transition-shadow focus:ring-2 focus:ring-teal-500/40 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="e.g. alex"
            />
          </div>
          <div>
            <label htmlFor="acc-pass" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Password
            </label>
            <input
              id="acc-pass"
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-teal-500/0 transition-shadow focus:ring-2 focus:ring-teal-500/40 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          {mode === 'signup' && (
            <div>
              <label htmlFor="acc-confirm" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Confirm password
              </label>
              <input
                id="acc-confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-teal-500/0 transition-shadow focus:ring-2 focus:ring-teal-500/40 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          )}
          {error && (
            <p className="text-xs font-medium text-red-400" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="mt-1 rounded-xl bg-teal-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-500 disabled:opacity-50"
          >
            {busy ? '…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-500">
          Scores are saved only in this browser. This is not a secure vault—use a simple password you do not reuse
          elsewhere.
        </p>
      </div>
    </div>
  );
}
