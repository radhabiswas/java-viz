import { cn } from '../lib/utils';
import { useDarkMode } from '../lib/useDarkMode';

/**
 * `capped` — short snippets in lesson steps (limited height).
 * `expand` — use inside a flex column tab/panel so the block fills remaining height and scrolls internally.
 */
export function StepCodeExampleBlock({
  code,
  variant,
  scrollMode = 'capped',
}: {
  code: string;
  variant: 'teal' | 'violet';
  scrollMode?: 'capped' | 'expand';
}) {
  const isDark = useDarkMode();

  const light = {
    teal: 'border-slate-200 bg-slate-50 text-slate-800 shadow-sm',
    violet: 'border-violet-200/90 bg-white text-slate-800 shadow-sm',
  }[variant];

  const dark = {
    teal: 'border-slate-600 bg-slate-950 text-slate-100',
    violet: 'border-violet-800/60 bg-slate-950 text-slate-100',
  }[variant];

  return (
    <pre
      className={cn(
        'overflow-auto rounded-lg border px-3 py-2 text-left font-mono leading-relaxed',
        scrollMode === 'expand'
          ? 'mt-0 min-h-0 flex-1 text-[12px] sm:text-[11px]'
          : 'mt-2 max-h-[min(42vh,20rem)] text-[11px]',
        isDark ? dark : light,
      )}
    >
      {code.trimEnd()}
    </pre>
  );
}
