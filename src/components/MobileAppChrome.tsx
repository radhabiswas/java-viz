import React from 'react';
import { Code2, Menu, Search } from 'lucide-react';

/**
 * Compact header for viewports below `lg` (1024px). Desktop uses the full sidebar only.
 */
export default function MobileAppChrome({
  onOpenNav,
  onOpenSearch,
  score,
}: {
  onOpenNav: () => void;
  onOpenSearch: () => void;
  score: number;
}) {
  return (
    <header className="mobile-chrome-pad-x mobile-chrome-pad-t flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-50 py-2.5 pl-3 pr-2 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
      <button
        type="button"
        onClick={onOpenNav}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition-colors hover:bg-slate-50 active:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        aria-label="Open lesson menu"
      >
        <Menu size={22} strokeWidth={2} aria-hidden />
      </button>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white shadow-md shadow-teal-900/25">
          <Code2 size={18} aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">JavaViz</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
            Code visualizer
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span
          className="rounded-lg border border-amber-200/90 bg-amber-50 px-2 py-1 text-[11px] font-bold tabular-nums text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-200"
          title="Score"
        >
          {score}
        </span>
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 active:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label="Find lesson or help"
        >
          <Search size={20} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </header>
  );
}
