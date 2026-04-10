import { useState, useEffect, useMemo, useRef } from 'react';
import type { ApExamFrqSheet, Lesson } from '../types';
import ApExamFrqSheetPanel from './ApExamFrqSheetPanel';
import { StepCodeExampleBlock } from './StepCodeExampleBlock';
import { StepCodeExamples } from './StepCodeExamples';
import { StepDescription } from '../lib/stepDescriptionRichText';
import {
  buildDesignPhaseRanges,
  phaseContextForStep,
} from '../lib/algorithmDesignPhaseRanges';
import {
  frqPhaseAccentForLabel,
  frqPhaseAccentForStep,
  frqPhaseChipClass,
  frqPhaseHeadingClass,
  frqPhaseHeadingMonoClass,
  frqStepNavNumberClasses,
  frqStepNavSurfaceClass,
  frqStepPillClass,
} from '../lib/frqWalkthroughPhaseAccent';
import { cn } from '../lib/utils';
import {
  BookOpen,
  Brackets,
  Code2,
  Lightbulb,
  PanelRightOpen,
  ScrollText,
  StepBack,
  StepForward,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabId = 'intro' | 'class' | 'problem' | 'solution';

function walkthroughStepPreview(description: string): string {
  const first = description.split(/\n\n/)[0] ?? description;
  const plain = first.replace(/\*\*/g, '');
  const oneLine = plain.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= 44) return oneLine;
  return `${oneLine.slice(0, 41)}…`;
}

export default function FrqProblemSolutionFocus({
  lesson,
  sheet,
  implStart,
  boundedStepIndex,
  onStepIndexChange,
  onOpenImplementationWorkspace,
}: {
  lesson: Lesson;
  sheet: ApExamFrqSheet;
  implStart: number;
  boundedStepIndex: number;
  onStepIndexChange: (i: number) => void;
  onOpenImplementationWorkspace: () => void;
}) {
  const hasIntroText = Boolean(sheet.examIntro?.trim());
  const hasClassContext = Boolean(sheet.examClassContext?.trim());

  const [tab, setTab] = useState<TabId>('problem');
  const solutionScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hi = Boolean(sheet.examIntro?.trim());
    const hc = Boolean(sheet.examClassContext?.trim());
    setTab(hi ? 'intro' : hc ? 'class' : 'problem');
  }, [lesson.id, sheet.examIntro, sheet.examClassContext]);

  const walkthroughSteps = lesson.steps.slice(0, implStart);
  const wtMax = Math.max(0, walkthroughSteps.length - 1);
  const safeWtIndex = Math.min(Math.max(0, boundedStepIndex), wtMax);
  const activeWalkthroughStep = walkthroughSteps[safeWtIndex];

  const phaseRanges = useMemo(
    () => buildDesignPhaseRanges(lesson.algorithmDesign, implStart),
    [lesson.algorithmDesign, implStart],
  );

  const phaseCtx = useMemo(() => {
    if (!phaseRanges || phaseRanges.length === 0) return null;
    return phaseContextForStep(phaseRanges, safeWtIndex);
  }, [phaseRanges, safeWtIndex]);

  const activeStepAccent = useMemo(
    () => frqPhaseAccentForStep(phaseRanges, safeWtIndex),
    [phaseRanges, safeWtIndex],
  );

  const stepNavNums = useMemo(
    () => frqStepNavNumberClasses(activeStepAccent),
    [activeStepAccent],
  );

  useEffect(() => {
    if (tab !== 'solution') return;
    const el = solutionScrollRef.current;
    if (!el) return;
    try {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      el.scrollTop = 0;
    }
  }, [tab, safeWtIndex, lesson.id]);

  const syncStepFromTab = (nextTab: TabId) => {
    if (nextTab === 'solution' && boundedStepIndex >= implStart) {
      onStepIndexChange(implStart - 1);
    }
    if ((nextTab === 'problem' || nextTab === 'intro' || nextTab === 'class') && boundedStepIndex >= implStart) {
      onStepIndexChange(0);
    }
    setTab(nextTab);
  };

  const goWtPrev = () => onStepIndexChange(Math.max(0, safeWtIndex - 1));
  const goWtNext = () => onStepIndexChange(Math.min(wtMax, safeWtIndex + 1));

  return (
    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col gap-2 overflow-hidden max-lg:gap-1.5 lg:gap-3">
      <div className="flex shrink-0 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
        <div
          className="flex w-full min-w-0 flex-wrap rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 lg:w-auto lg:flex-nowrap"
          role="tablist"
          aria-label="AP CS A problems — reading, printed class, problem sheet, or solution"
        >
          {hasIntroText ? (
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'intro'}
              onClick={() => syncStepFromTab('intro')}
              className={cn(
                'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold transition-colors sm:min-h-0 sm:flex-initial sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs',
                tab === 'intro'
                  ? 'bg-sky-600 text-white shadow-sm dark:bg-sky-600'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
              )}
            >
              <BookOpen size={15} className="shrink-0 opacity-90 sm:size-4" aria-hidden />
              <span className="truncate">Intro</span>
            </button>
          ) : null}
          {hasClassContext ? (
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'class'}
              onClick={() => syncStepFromTab('class')}
              className={cn(
                'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold transition-colors sm:min-h-0 sm:flex-initial sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs',
                tab === 'class'
                  ? 'bg-sky-600 text-white shadow-sm dark:bg-sky-600'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
              )}
            >
              <Brackets size={15} className="shrink-0 opacity-90 sm:size-4" aria-hidden />
              <span className="truncate">Class</span>
            </button>
          ) : null}
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'problem'}
            onClick={() => syncStepFromTab('problem')}
            className={cn(
              'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold transition-colors sm:min-h-0 sm:flex-initial sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs',
              tab === 'problem'
                ? 'bg-sky-600 text-white shadow-sm dark:bg-sky-600'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
            )}
          >
            <ScrollText size={15} className="shrink-0 opacity-90 sm:size-4" aria-hidden />
            <span className="truncate">Problem</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'solution'}
            onClick={() => syncStepFromTab('solution')}
            className={cn(
              'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold transition-colors sm:min-h-0 sm:flex-initial sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs',
              tab === 'solution'
                ? 'bg-sky-600 text-white shadow-sm dark:bg-sky-600'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
            )}
          >
            <Code2 size={15} className="shrink-0 opacity-90 sm:size-4" aria-hidden />
            <span className="truncate">Solution</span>
          </button>
        </div>
        <div
          className={cn(
            'flex w-full min-w-0 flex-row flex-nowrap items-center gap-2 lg:w-auto lg:justify-end',
            tab === 'solution' && walkthroughSteps.length > 0 ? 'justify-between' : 'justify-end',
          )}
        >
          {tab === 'solution' && walkthroughSteps.length > 0 ? (
            <div
              className={cn(
                'flex items-center gap-1 rounded-xl border px-2 py-1',
                frqStepNavSurfaceClass(activeStepAccent),
              )}
              role="status"
              aria-live="polite"
              aria-label={`Solution walkthrough step ${safeWtIndex + 1} of ${walkthroughSteps.length}`}
            >
              <span className="inline-flex items-baseline gap-1 px-1 font-mono text-[11px] font-bold tabular-nums">
                <span className="font-sans text-[9px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:text-[10px]">
                  Step
                </span>
                <span className={stepNavNums.current}>{safeWtIndex + 1}</span>
                <span className={stepNavNums.total}>/{walkthroughSteps.length}</span>
              </span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={onOpenImplementationWorkspace}
            title="Open stepped reference code, memory, and diagrams"
            className="flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-teal-500/50 bg-teal-50 px-2.5 py-2 text-[11px] font-bold text-teal-900 shadow-sm transition-colors hover:bg-teal-100 sm:gap-2 sm:px-3 sm:text-xs dark:border-teal-500/40 dark:bg-teal-950/50 dark:text-teal-100 dark:hover:bg-teal-900/40"
          >
            <PanelRightOpen size={16} className="shrink-0" aria-hidden />
            <span className="hidden sm:inline">Implementation workspace</span>
            <span className="sm:hidden">Workspace</span>
          </button>
        </div>
      </div>

      <p className="hidden shrink-0 text-[11px] leading-snug text-slate-500 dark:text-slate-500 lg:block">
        <span className="font-semibold text-slate-600 dark:text-slate-400">Tip:</span>{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">Implementation workspace</span> opens stepped
        reference code with diagrams. The walkthrough stays under{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">Solution</span>.
      </p>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40">
        {tab === 'intro' && hasIntroText ? (
          <div
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-3 py-3 sm:gap-4 sm:px-5 sm:py-4"
            role="tabpanel"
            aria-label="Exam introduction"
          >
            <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
              {sheet.year} AP Computer Science A — Question {sheet.questionNumber}
            </p>
            <StepDescription
              text={sheet.examIntro!.trim()}
              className="text-[13px] text-slate-800 dark:text-slate-200 [&_strong]:text-slate-950 dark:[&_strong]:text-white"
            />
          </div>
        ) : null}
        {tab === 'class' && hasClassContext ? (
          <div
            className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3 py-3 sm:gap-3 sm:px-5 sm:py-4"
            role="tabpanel"
            aria-label="Printed class definitions from the exam"
          >
            <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
              {sheet.year} AP Computer Science A — Question {sheet.questionNumber}
            </p>
            <p className="shrink-0 text-[12px] leading-snug text-slate-600 dark:text-slate-400">
              Class stubs as printed on the exam — scroll to read in full.
            </p>
            <StepCodeExampleBlock code={sheet.examClassContext!} variant="teal" scrollMode="expand" />
          </div>
        ) : null}
        {tab === 'problem' ? (
          <ApExamFrqSheetPanel sheet={sheet} />
        ) : null}
        {tab === 'solution' ? (
          <div
            className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden px-3 py-3 sm:px-4 max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] lg:pb-3"
            role="tabpanel"
            aria-label="Solution walkthrough"
          >
            {walkthroughSteps.length === 0 ? (
              <p className="text-sm text-slate-600 dark:text-slate-400">No walkthrough steps for this lesson.</p>
            ) : activeWalkthroughStep ? (
              <div className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col gap-3 overflow-hidden">
                <div className="shrink-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sky-950 dark:text-sky-50">
                  <span className="inline-flex items-center gap-1.5">
                    <Lightbulb className="size-4 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
                    <span className="text-sm font-extrabold tracking-tight">Walkthrough</span>
                  </span>
                  {lesson.algorithmSubsection ? (
                    <>
                      <span className="text-sky-400/70 dark:text-sky-500/70" aria-hidden>
                        ·
                      </span>
                      <span className="min-w-0 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
                        {lesson.algorithmSubsection}
                      </span>
                    </>
                  ) : null}
                </div>

                <div
                  className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden rounded-xl border border-sky-200/90 bg-sky-50/60 p-2.5 shadow-sm dark:border-sky-900/50 dark:bg-sky-950/20"
                  role="region"
                  aria-label="Stages and step"
                >
                  <div
                    ref={solutionScrollRef}
                    className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col gap-2.5 overflow-y-auto overflow-x-hidden overscroll-y-contain"
                  >
                    {phaseRanges && phaseRanges.length > 0 ? (
                      <div
                        className="-mx-0.5 flex shrink-0 flex-nowrap gap-1.5 overflow-x-auto overscroll-x-contain px-0.5 pb-0.5 [scrollbar-width:thin]"
                        role="tablist"
                        aria-label="Stages — jump to start"
                      >
                        {phaseRanges.map((r, i) => {
                          const active = phaseCtx != null && i === phaseCtx.phaseIndex;
                          const stageSteps = r.endExclusive - r.start;
                          const chipAccent = frqPhaseAccentForLabel(r.label);
                          return (
                            <button
                              key={`${r.start}-${r.label}`}
                              type="button"
                              role="tab"
                              aria-selected={active}
                              title={`${stageSteps} step${stageSteps === 1 ? '' : 's'}`}
                              onClick={() => onStepIndexChange(r.start)}
                              className={cn(
                                'shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-left text-[11px] font-bold transition-colors',
                                frqPhaseChipClass(active, chipAccent),
                              )}
                            >
                              <span className="tabular-nums text-[10px] opacity-90">{i + 1}</span>
                              <span className="mx-1 opacity-40" aria-hidden>
                                ·
                              </span>
                              {r.label}
                              <span className="ml-1 tabular-nums text-[10px] font-semibold opacity-75">
                                ({stageSteps})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    <div
                      className="relative -mx-0.5 flex shrink-0 flex-nowrap gap-1 overflow-x-auto overscroll-x-contain px-0.5 [scrollbar-width:thin]"
                      role="tablist"
                      aria-label="Steps"
                    >
                      {walkthroughSteps.map((s, i) => {
                        const active = i === safeWtIndex;
                        const pillAccent = frqPhaseAccentForStep(phaseRanges, i);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            title={walkthroughStepPreview(s.description)}
                            onClick={() => onStepIndexChange(i)}
                            className={cn(
                              'flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold tabular-nums transition-colors',
                              frqStepPillClass(active, pillAccent),
                            )}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="min-h-0 max-h-[min(42vh,14rem)] shrink-0 overflow-y-auto overflow-x-hidden rounded-lg border border-sky-200/80 bg-white dark:border-sky-900/45 dark:bg-slate-900/85 max-lg:max-h-[min(62vh,30rem)] lg:max-h-none lg:overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeWalkthroughStep.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="px-3 py-2.5 sm:px-3.5 sm:py-3"
                        >
                          {phaseCtx ? (
                            <p
                              className={cn(
                                'mb-2 text-[10px] font-bold uppercase tracking-wider',
                                frqPhaseHeadingClass(activeStepAccent),
                              )}
                            >
                              {phaseCtx.range.label}
                              <span
                                className={cn(
                                  'mx-1.5 font-mono font-semibold',
                                  frqPhaseHeadingMonoClass(activeStepAccent),
                                )}
                              >
                                · {phaseCtx.withinPhaseDisplay}/{phaseCtx.withinPhaseTotal}
                              </span>
                            </p>
                          ) : (
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                              Step {safeWtIndex + 1} of {walkthroughSteps.length}
                            </p>
                          )}
                          <StepDescription
                            text={activeWalkthroughStep.description}
                            className="text-[13px] font-medium text-slate-800 dark:text-slate-200 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:text-[12px] dark:[&_code]:bg-slate-800 [&_strong]:text-sky-900 dark:[&_strong]:text-sky-200"
                          />
                          <StepCodeExamples step={activeWalkthroughStep} defaultVariant="teal" />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-sky-200/60 bg-sky-50/95 pt-2 dark:border-sky-900/40 dark:bg-sky-950/90',
                      'pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]',
                    )}
                  >
                    <p className="min-w-0 text-[10px] font-semibold leading-tight text-sky-900 dark:text-sky-100">
                      {phaseCtx ? (
                        <>
                          <span
                            className={cn(
                              frqPhaseHeadingClass(activeStepAccent),
                              'font-bold uppercase tracking-wider',
                            )}
                          >
                            {phaseCtx.range.label}
                          </span>
                          <span className="mx-1 text-slate-400 dark:text-slate-500">·</span>
                          <span className="tabular-nums text-slate-600 dark:text-slate-400">
                            {phaseCtx.withinPhaseDisplay}/{phaseCtx.withinPhaseTotal}
                          </span>
                          <span className="mx-1 text-slate-400 dark:text-slate-500">·</span>
                        </>
                      ) : null}
                      <span className="tabular-nums text-slate-600 dark:text-slate-400">
                        {safeWtIndex + 1}/{walkthroughSteps.length}
                      </span>
                    </p>
                    <div
                      className="flex shrink-0 items-center gap-0.5 rounded-lg border border-sky-400/45 bg-sky-100/80 p-0.5 dark:border-sky-500/35 dark:bg-sky-950/50"
                      role="group"
                      aria-label="Previous or next walkthrough step"
                    >
                      <button
                        type="button"
                        onClick={goWtPrev}
                        disabled={safeWtIndex <= 0}
                        className="flex min-h-9 min-w-9 items-center justify-center rounded-md text-sky-950 transition-colors hover:bg-white/90 active:bg-white disabled:cursor-not-allowed disabled:opacity-35 dark:text-sky-100 dark:hover:bg-sky-900/70"
                        title="Previous step"
                        aria-label="Previous walkthrough step"
                      >
                        <StepBack size={22} strokeWidth={2.25} className="shrink-0" />
                      </button>
                      <button
                        type="button"
                        onClick={goWtNext}
                        disabled={safeWtIndex >= wtMax}
                        className="flex min-h-9 min-w-9 items-center justify-center rounded-md bg-sky-600 text-white shadow-sm transition-colors hover:bg-sky-500 active:bg-sky-700 dark:bg-sky-600"
                        title="Next step"
                        aria-label="Next walkthrough step"
                      >
                        <StepForward size={22} strokeWidth={2.25} className="shrink-0" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
