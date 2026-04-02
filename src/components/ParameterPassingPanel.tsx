import React from 'react';
import { ParameterPassing } from '../types';
import { cn } from '../lib/utils';

export default function ParameterPassingPanel({
  data,
  /** Fill parent (e.g. tab panel); omit fixed max-height. */
  embedded = false,
}: {
  data: ParameterPassing;
  embedded?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900',
        embedded ? 'min-h-0 h-full flex-1' : 'max-h-[min(38vh,20rem)] shrink-0',
      )}
    >
      <div className="shrink-0 border-b border-slate-200/80 px-4 py-3.5 dark:border-slate-800">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          Parameter passing
        </h3>
        {data.subtitle && (
          <p className="mt-1.5 text-xs font-medium leading-snug text-slate-600 dark:text-slate-400">
            {data.subtitle}
          </p>
        )}
        {data.calleeSignature !== 'Not applicable' && data.calleeSignature !== '—' ? (
          <p className="mt-2 font-mono text-[11px] font-semibold leading-snug text-teal-700 dark:text-teal-300 sm:text-xs">
            {data.calleeSignature}
          </p>
        ) : null}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {data.mappings.length === 0 ? (
          <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
            {data.implicitDefaultConstructor ? (
              <>
                This call uses a constructor with <strong>no explicit parameters</strong>. There is nothing to copy
                from the call site into a parameter slot; the object is still allocated on the heap and the constructor
                body runs (here, an empty implicit body unless the lesson adds one).
              </>
            ) : (
              <>
                No actual → formal rows for this step. Step into a method body that has parameters on the stack, or use a
                lesson step with an explicit parameter diagram.
              </>
            )}
          </p>
        ) : null}
        <ul className="list-none space-y-2">
          {data.mappings.map((row, i) => (
            <li
              key={`${row.formalName}-${i}`}
              className="rounded-lg border border-slate-200/90 bg-white px-3 py-2 font-mono text-sm font-medium leading-snug text-slate-800 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100"
            >
              <span className="text-violet-600 dark:text-violet-400">{row.formalType}</span>{' '}
              <span className="font-bold text-slate-900 dark:text-white">{row.formalName}</span>
              <span className="text-slate-500 dark:text-slate-400"> = </span>
              <span className="text-amber-700 dark:text-amber-300">{row.actual}</span>
            </li>
          ))}
        </ul>
        {data.footnote ? (
          <p className="mt-3 border-t border-slate-200/80 pt-3 text-[11px] leading-relaxed text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:text-xs">
            {data.footnote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
