import React, { Fragment } from 'react';
import type { ClassHierarchyEntry } from '../types';
import { buildHierarchyRows } from '../lib/classHierarchy';
import { cn } from '../lib/utils';

type Props = {
  classHierarchy?: ClassHierarchyEntry[];
  files?: { name: string; code: string }[];
  /** When there are no multi-file `files`, parse this (e.g. `lesson.code`) for a single-class FRQ. */
  sourceCodeFallback?: string;
  /** Fill parent (e.g. tab panel) with internal scroll. */
  embedded?: boolean;
};

/** UML-style generalization: hollow triangle on the superclass (parent) side. */
function GeneralizationArrow() {
  return (
    <div
      className="flex w-full flex-col items-center text-slate-600 dark:text-slate-400"
      aria-hidden
    >
      <svg width="100" height="28" viewBox="0 0 100 28" className="shrink-0 overflow-visible">
        <line x1="50" y1="26" x2="50" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polygon
          points="50,2 42,10 58,10"
          className="fill-white stroke-current dark:fill-slate-800"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500">
        is-a
      </span>
    </div>
  );
}

export default function ClassHierarchyPanel({
  classHierarchy,
  files,
  sourceCodeFallback,
  embedded = false,
}: Props) {
  const rows = buildHierarchyRows(classHierarchy, files, sourceCodeFallback);
  if (rows.length === 0) return null;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900',
        embedded ? 'flex min-h-0 h-full flex-1 flex-col' : 'shrink-0',
      )}
    >
      <div className="shrink-0 border-b border-slate-200 px-4 py-3.5 dark:border-slate-800">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          Class hierarchy
        </h3>
        <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
          Generalization (inheritance): each subclass is-a superclass.
        </p>
      </div>
      <div
        className={cn(
          'flex flex-col items-center gap-0 px-4 py-4',
          embedded && 'min-h-0 flex-1 overflow-y-auto',
        )}
      >
        {rows.map((row, i) => (
          <Fragment key={`${row.name}-${i}`}>
            {i > 0 && <GeneralizationArrow />}
            <div
              className={`relative z-10 w-full max-w-[16rem] rounded-lg border-2 border-slate-400 bg-white px-4 py-2.5 text-center shadow-sm dark:border-slate-500 dark:bg-slate-800 ${
                row.implicit ? 'border-dashed opacity-95' : ''
              }`}
            >
              <div className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">{row.name}</div>
              {row.implicit && (
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  (implicit extends)
                </div>
              )}
              {row.file && !row.implicit && (
                <div className="mt-1 font-mono text-[10px] text-slate-500 dark:text-slate-400">{row.file}</div>
              )}
              {row.implements && row.implements.length > 0 && (
                <p className="mt-2 border-t border-slate-200 pt-2 text-[11px] leading-snug text-slate-600 dark:border-slate-600 dark:text-slate-400">
                  <span className="font-semibold">implements</span>{' '}
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {row.implements.join(', ')}
                  </span>
                </p>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
