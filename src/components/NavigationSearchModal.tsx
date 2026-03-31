import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookMarked, ChevronRight, Search, X } from 'lucide-react';
import type { Lesson } from '../types';
import {
  HELP_LESSON_ID,
  HELP_SECTIONS,
  helpSectionMatchesQuery,
  lessonMatchesQuery,
} from '../data/helpGuide';

type ResultRow =
  | { kind: 'help'; sectionId: string; title: string; subtitle: string }
  | { kind: 'lesson'; lessonId: string; title: string; subtitle: string };

export default function NavigationSearchModal({
  open,
  onClose,
  lessons,
  onSelectLesson,
  onSelectHelpSection,
}: {
  open: boolean;
  onClose: () => void;
  lessons: Lesson[];
  onSelectLesson: (lessonId: string) => void;
  onSelectHelpSection: (sectionId: string) => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo((): ResultRow[] => {
    const q = query.trim().toLowerCase();
    if (!q) {
      const hint: ResultRow[] = HELP_SECTIONS.slice(0, 8).map((s) => ({
        kind: 'help',
        sectionId: s.id,
        title: s.title,
        subtitle: 'Help — type to filter',
      }));
      return hint;
    }
    const out: ResultRow[] = [];
    for (const s of HELP_SECTIONS) {
      if (helpSectionMatchesQuery(s, q)) {
        out.push({ kind: 'help', sectionId: s.id, title: s.title, subtitle: 'Help section' });
      }
    }
    for (const l of lessons) {
      if (l.id === HELP_LESSON_ID) continue;
      if (lessonMatchesQuery(l, q)) {
        out.push({
          kind: 'lesson',
          lessonId: l.id,
          title: l.title,
          subtitle: l.chapter,
        });
      }
    }
    return out;
  }, [query, lessons]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/40 p-4 pt-[min(12vh,6rem)] backdrop-blur-sm dark:bg-slate-950/75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-search-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
        <div className="flex items-center gap-2 border-b border-slate-200 px-3 dark:border-slate-700">
          <Search className="shrink-0 text-slate-500" size={18} aria-hidden />
          <input
            ref={inputRef}
            id="nav-search-title"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help sections and lessons…"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[min(24rem,50vh)] overflow-y-auto py-1">
          {!query.trim() && (
            <p className="px-4 py-2 text-xs text-slate-500">Popular help topics — start typing to search everything.</p>
          )}
          {query.trim() && results.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-slate-500">No matches. Try another word.</p>
          )}
          {results.map((row, idx) => (
            <button
              key={`${row.kind}-${row.kind === 'help' ? row.sectionId : row.lessonId}-${idx}`}
              type="button"
              onClick={() => {
                if (row.kind === 'help') {
                  onSelectHelpSection(row.sectionId);
                } else {
                  onSelectLesson(row.lessonId);
                }
                onClose();
              }}
              className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/90"
            >
              {row.kind === 'help' ? (
                <BookMarked className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" size={16} aria-hidden />
              ) : (
                <ChevronRight className="mt-0.5 shrink-0 text-slate-500" size={16} aria-hidden />
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-slate-900 dark:text-slate-100">{row.title}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{row.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="border-t border-slate-200 px-4 py-2 text-[10px] text-slate-500 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              onSelectHelpSection(HELP_SECTIONS[0].id);
              onClose();
            }}
            className="font-medium text-teal-700 hover:text-teal-900 dark:text-teal-400/90 dark:hover:text-teal-300"
          >
            Open full help guide
          </button>
          <span className="mx-2 text-slate-400 dark:text-slate-600">·</span>
          Esc to close
        </div>
      </div>
    </div>
  );
}
