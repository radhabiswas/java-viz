import type { DesignPhaseRange } from './algorithmDesignPhaseRanges';
import { phaseContextForStep } from './algorithmDesignPhaseRanges';

export type FrqPhaseAccent = 'violet' | 'amber' | 'sky';

/** Maps FRQ walkthrough phase labels (e.g. Part (a) / Part (b)) to distinct accents; default sky. */
export function frqPhaseAccentForLabel(label: string): FrqPhaseAccent {
  if (/Part \(a\)/i.test(label)) return 'violet';
  if (/Part \(b\)/i.test(label)) return 'amber';
  return 'sky';
}

export function frqPhaseAccentForStep(
  phaseRanges: DesignPhaseRange[] | null,
  stepIndex: number,
): FrqPhaseAccent {
  if (phaseRanges == null || phaseRanges.length === 0) return 'sky';
  const ctx = phaseContextForStep(phaseRanges, stepIndex);
  return frqPhaseAccentForLabel(ctx.range.label);
}

const phaseChipActive: Record<FrqPhaseAccent, string> = {
  violet:
    'border-violet-700 bg-violet-600 text-white shadow-md ring-2 ring-violet-400/80 ring-offset-2 ring-offset-white dark:border-violet-400 dark:ring-violet-300 dark:ring-offset-slate-950',
  amber:
    'border-amber-700 bg-amber-600 text-white shadow-md ring-2 ring-amber-400/80 ring-offset-2 ring-offset-white dark:border-amber-400 dark:ring-amber-300 dark:ring-offset-slate-950',
  sky: 'border-sky-700 bg-sky-600 text-white shadow-md ring-2 ring-sky-400/80 ring-offset-2 ring-offset-white dark:border-sky-400 dark:ring-sky-300 dark:ring-offset-slate-950',
};

const phaseChipInactive: Record<FrqPhaseAccent, string> = {
  violet:
    'border-violet-400/80 bg-violet-100 text-violet-950 hover:border-violet-500 hover:bg-violet-200/80 dark:border-violet-700 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/55',
  amber:
    'border-amber-400/80 bg-amber-100 text-amber-950 hover:border-amber-500 hover:bg-amber-200/80 dark:border-amber-700 dark:bg-amber-950/45 dark:text-amber-50 dark:hover:bg-amber-900/50',
  sky: 'border-sky-200/90 bg-sky-50/95 text-sky-950 hover:border-sky-300 hover:bg-sky-100/90 dark:border-sky-800/70 dark:bg-slate-900/80 dark:text-sky-100 dark:hover:border-sky-600 dark:hover:bg-sky-950/55',
};

/** Inactive pills: same tinted family per part so 1–3 (or all in a phase) read as one group. */
const stepPillInactive: Record<FrqPhaseAccent, string> = {
  violet:
    'border-violet-400/80 bg-violet-100 text-violet-950 hover:border-violet-500 hover:bg-violet-200/80 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/55',
  amber:
    'border-amber-400/80 bg-amber-100 text-amber-950 hover:border-amber-500 hover:bg-amber-200/80 dark:border-amber-600 dark:bg-amber-950/45 dark:text-amber-50 dark:hover:bg-amber-900/50',
  sky: 'border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-400 hover:bg-sky-50 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:border-sky-600',
};

/** Active pill: solid fill + ring offset so the current step is obvious within its part. */
const stepPillActive: Record<FrqPhaseAccent, string> = {
  violet:
    'z-[1] border-violet-700 bg-violet-600 text-white shadow-md ring-2 ring-violet-400/90 ring-offset-2 ring-offset-white dark:border-violet-400 dark:bg-violet-600 dark:ring-violet-300 dark:ring-offset-slate-950',
  amber:
    'z-[1] border-amber-700 bg-amber-600 text-white shadow-md ring-2 ring-amber-400/90 ring-offset-2 ring-offset-white dark:border-amber-400 dark:bg-amber-600 dark:ring-amber-300 dark:ring-offset-slate-950',
  sky: 'z-[1] border-sky-700 bg-sky-600 text-white shadow-md ring-2 ring-sky-400/90 ring-offset-2 ring-offset-white dark:border-sky-400 dark:bg-sky-600 dark:ring-sky-300 dark:ring-offset-slate-950',
};

/** Surfaces for the compact step counter (e.g. 3/8) — matches current part tint. */
const stepNavSurface: Record<FrqPhaseAccent, string> = {
  violet:
    'border-violet-300/90 bg-violet-50 dark:border-violet-700 dark:bg-violet-950/40',
  amber: 'border-amber-300/90 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/35',
  sky: 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80',
};

const stepNavCurrentNum: Record<FrqPhaseAccent, string> = {
  violet: 'text-violet-800 dark:text-violet-200',
  amber: 'text-amber-900 dark:text-amber-100',
  sky: 'text-sky-800 dark:text-sky-200',
};

const stepNavTotalNum: Record<FrqPhaseAccent, string> = {
  violet: 'text-violet-600/70 dark:text-violet-400/80',
  amber: 'text-amber-800/70 dark:text-amber-300/85',
  sky: 'text-slate-500 dark:text-slate-400',
};

const phaseHeading: Record<FrqPhaseAccent, string> = {
  violet: 'text-violet-800 dark:text-violet-200',
  amber: 'text-amber-900 dark:text-amber-200',
  sky: 'text-sky-700 dark:text-sky-300',
};

const phaseHeadingMono: Record<FrqPhaseAccent, string> = {
  violet: 'text-violet-600/85 dark:text-violet-400/95',
  amber: 'text-amber-700/90 dark:text-amber-400/95',
  sky: 'text-sky-600/80 dark:text-sky-400/90',
};

export function frqPhaseChipClass(active: boolean, accent: FrqPhaseAccent): string {
  return active ? phaseChipActive[accent] : phaseChipInactive[accent];
}

export function frqStepPillClass(active: boolean, accent: FrqPhaseAccent): string {
  return active ? stepPillActive[accent] : stepPillInactive[accent];
}

export function frqStepNavSurfaceClass(accent: FrqPhaseAccent): string {
  return stepNavSurface[accent];
}

/** Classes for splitting “current” vs “/ total” inside the nav counter. */
export function frqStepNavNumberClasses(accent: FrqPhaseAccent): { current: string; total: string } {
  return { current: stepNavCurrentNum[accent], total: stepNavTotalNum[accent] };
}

export function frqPhaseHeadingClass(accent: FrqPhaseAccent): string {
  return phaseHeading[accent];
}

export function frqPhaseHeadingMonoClass(accent: FrqPhaseAccent): string {
  return phaseHeadingMono[accent];
}

/** Reference code blocks (Implementation workspace / titled snippets) — match Solution walkthrough part colors. */
const referenceBlockShell: Record<FrqPhaseAccent, string> = {
  violet:
    'rounded-xl border border-violet-200/90 bg-violet-50/50 dark:border-violet-800/55 dark:bg-violet-950/25',
  amber:
    'rounded-xl border border-amber-200/90 bg-amber-50/45 dark:border-amber-800/50 dark:bg-amber-950/22',
  sky: 'rounded-xl border border-sky-200/80 bg-white/95 dark:border-sky-800/50 dark:bg-slate-900/85',
};

const referenceBlockTitleClass: Record<FrqPhaseAccent, string> = {
  violet:
    'border-l-4 border-violet-600 py-0.5 pl-2.5 text-violet-900 dark:border-violet-400 dark:text-violet-100',
  amber:
    'border-l-4 border-amber-600 py-0.5 pl-2.5 text-amber-950 dark:border-amber-400 dark:text-amber-50',
  sky: 'border-l-4 border-sky-500 py-0.5 pl-2.5 text-sky-900 dark:border-sky-400 dark:text-sky-100',
};

export function frqReferenceBlockShellClass(accent: FrqPhaseAccent): string {
  return referenceBlockShell[accent];
}

export function frqReferenceBlockTitleClass(accent: FrqPhaseAccent): string {
  return referenceBlockTitleClass[accent];
}
