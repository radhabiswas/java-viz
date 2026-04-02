import React from 'react';
import { cn } from '../lib/utils';

/**
 * Frames on the stack only, **Java stack order**: innermost (current) at the top of the list,
 * outer caller at the bottom — opposite of Memory’s array top-to-bottom order.
 */
export default function RecursionCallStackColumn({
  signatures,
  stackDepth,
  compact = false,
  className,
}: {
  /** Outer caller first → innermost last (same order as recursion diagram & lesson data). */
  signatures: string[];
  stackDepth: number;
  compact?: boolean;
  className?: string;
}) {
  const onStack = stackDepth > 0 ? signatures.slice(0, stackDepth) : [];
  const displayStack = [...onStack].reverse();

  return (
    <div
      className={cn(
        'flex min-h-0 flex-col rounded-lg border border-slate-200/80 bg-slate-50/80 dark:border-slate-600 dark:bg-slate-800/40',
        compact ? 'px-2 py-1.5' : 'px-3 py-2.5',
        className,
      )}
    >
      <h4
        className={cn(
          'shrink-0 font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400',
          compact ? 'text-[9px]' : 'text-[10px]',
        )}
      >
        Call stack
      </h4>
      {!compact && (
        <p className="mt-1 shrink-0 text-[10px] leading-snug text-slate-500 dark:text-slate-500">
          Top = stack top (active) · bottom = outer caller · Memory lists outer-first
        </p>
      )}
      {onStack.length === 0 ? (
        <p className="mt-2 text-[10px] italic leading-snug text-slate-500 dark:text-slate-500">
          Empty — matches Memory at this step.
        </p>
      ) : (
        <ul
          className={cn(
            'mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto [scrollbar-width:thin]',
            compact ? 'max-h-28' : 'max-h-none sm:max-h-[min(52vh,22rem)]',
          )}
          aria-label="Recursive call stack frames"
        >
          {displayStack.map((sig, i) => {
            const innermost = i === 0;
            return (
              <li
                key={`${stackDepth - 1 - i}-${sig}`}
                title={innermost ? 'Stack top / active frame' : undefined}
                className={cn(
                  'rounded-md border font-mono font-semibold tabular-nums transition-colors',
                  compact ? 'px-1.5 py-0.5 text-[9px]' : 'px-2.5 py-1.5 text-[10px] leading-snug',
                  !innermost &&
                    'border-slate-300 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
                  innermost &&
                    'border-amber-500/60 bg-amber-50 text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/30 dark:text-amber-100',
                )}
              >
                {sig}
                {innermost && !compact ? (
                  <span className="mt-0.5 block text-[9px] font-sans font-medium normal-case text-amber-800/85 dark:text-amber-200/85">
                    active
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
