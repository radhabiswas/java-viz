import React, { useMemo } from 'react';
import type { Lesson, MemoryState } from '../types';
import { cn } from '../lib/utils';
import {
  buildRecursionDiagramState,
  inferLessonRecursionTrace,
  inferRecursionUnwindStyle,
  inferMaxUniformNumericRecursionFromLesson,
} from '../lib/controlFlowInference';
import RecursionCallStackColumn from './RecursionCallStackColumn';
import RecursionFlowDiagram from './RecursionFlowDiagram';
import { Repeat } from 'lucide-react';

/** Labels for stack + diagram: prefer explicit Step.recursionCallStack, else memory frame rows, else numeric peak prefix. */
function callSignaturesForStep(
  lesson: Lesson,
  stepIndex: number,
  trace: NonNullable<ReturnType<typeof inferLessonRecursionTrace>>,
): string[] {
  const step = lesson.steps[stepIndex];
  if (!step) return [];
  if (trace.traceKind === 'generic') {
    if (step.recursionCallStack?.length) return step.recursionCallStack;
    const frames = step.memory.stack
      .map((v) => v.name?.trim() ?? '')
      .filter((name) => /^[A-Za-z_]\w*\([^)]*\)$/.test(name));
    if (frames.length >= 2) return frames;
    return trace.peakSignatures;
  }
  return trace.nValues.map((n) => `${trace.methodName}(${n})`);
}

export default function RecursionPanel({
  lesson,
  currentStepIndex,
  memoryState: _memoryState,
  embedded = false,
}: {
  lesson: Lesson;
  currentStepIndex: number;
  /** Present for API consistency; recursion labels come from lesson step data. */
  memoryState: MemoryState;
  embedded?: boolean;
}) {
  const diagramTrace = useMemo(() => inferLessonRecursionTrace(lesson), [lesson]);

  const diagramState = useMemo(() => {
    if (!diagramTrace) return null;
    return buildRecursionDiagramState(lesson, currentStepIndex, diagramTrace);
  }, [lesson, currentStepIndex, diagramTrace]);

  const allSignatures = useMemo(() => {
    if (!diagramTrace || !diagramState) return [];
    return callSignaturesForStep(lesson, currentStepIndex, diagramTrace);
  }, [lesson, currentStepIndex, diagramTrace, diagramState]);

  const stackColumnSignatures = useMemo(() => {
    if (!diagramTrace) return [];
    if (diagramTrace.traceKind === 'generic') {
      return diagramTrace.peakSignatures;
    }
    return diagramTrace.nValues.map((n) => `${diagramTrace.methodName}(${n})`);
  }, [diagramTrace]);

  const nValuesForDiagram = useMemo(() => {
    if (!diagramTrace) return [];
    return diagramTrace.traceKind === 'numeric'
      ? diagramTrace.nValues
      : diagramTrace.peakSignatures.map((_, i) => i);
  }, [diagramTrace]);

  const circleLabels = useMemo(() => {
    if (!diagramState) return [];
    const d = diagramState.stackDepth;
    return allSignatures.slice(0, d);
  }, [allSignatures, diagramState]);

  const unwindStyle = useMemo(() => {
    if (!diagramTrace) return null;
    if (diagramTrace.traceKind === 'numeric') {
      const src = inferMaxUniformNumericRecursionFromLesson(lesson);
      return src ? inferRecursionUnwindStyle(src.nValues) : null;
    }
    const lab = lesson.recursionUnwindReturnLabels;
    const L = diagramTrace.peakSignatures.length;
    if (lab && lab.length === L - 1 && L >= 2) {
      return { kind: 'returns' as const, labels: lab };
    }
    return null;
  }, [lesson, diagramTrace]);

  const idPrefix = useMemo(() => `rc-${lesson.id.replace(/[^a-zA-Z0-9_-]/g, '')}`, [lesson.id]);

  const activeHighlightIndex =
    diagramState && diagramState.stackDepth > 0 ? diagramState.stackDepth - 1 : null;

  const variant = diagramTrace?.traceKind === 'generic' ? 'generic' : 'numeric';

  if (!diagramTrace || !diagramState) {
    return (
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900',
          embedded ? 'min-h-0 h-full flex-1' : 'max-h-[min(38vh,20rem)] shrink-0',
        )}
      >
        <div className="border-b border-slate-200/80 px-4 py-3.5 dark:border-slate-800">
          <h3 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            <Repeat className="h-6 w-6 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
            Recursion
          </h3>
        </div>
        <p className="p-4 text-sm text-slate-600 dark:text-slate-400">
          No recursive call chain in this lesson.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900',
        embedded ? 'min-h-0 h-full flex-1' : 'max-h-[min(38vh,20rem)] shrink-0',
      )}
    >
      <div className="shrink-0 border-b border-slate-200/80 px-4 py-3.5 dark:border-slate-800">
        <h3 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          <Repeat className="h-6 w-6 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
          Recursion
        </h3>
        <p className="mt-1.5 text-xs font-medium leading-snug text-slate-600 dark:text-slate-400">
          Amber ring = innermost active call. One frame per step down; one return arc per step up (when unwind labels
          apply). Stack list: top = stack top; Memory: outer-first.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
        <div className="flex min-h-[min(12rem,32vh)] min-w-0 flex-col gap-3 rounded-xl border border-slate-200/90 bg-white px-2 py-2 sm:min-h-[min(14rem,40vh)] sm:flex-row sm:items-stretch sm:gap-3 dark:border-slate-700 dark:bg-slate-800/40">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center sm:max-w-[58%]">
            <RecursionFlowDiagram
              methodName={diagramTrace.methodName}
              variant={variant}
              nValues={nValuesForDiagram}
              circleLabels={circleLabels}
              activeHighlightIndex={activeHighlightIndex}
              idPrefix={idPrefix}
              forwardEdgeCount={diagramState.forwardEdgeCount}
              returnEdgeCount={diagramState.returnEdgeCount}
              unwindStyle={unwindStyle}
              showFinalReturn={diagramState.showFinalReturn}
              finalReturnValue={diagramState.finalReturnValue}
            />
          </div>
          <RecursionCallStackColumn
            signatures={stackColumnSignatures}
            stackDepth={diagramState.stackDepth}
            compact={false}
            className="w-full shrink-0 border-t border-slate-200/80 pt-3 dark:border-slate-600/60 sm:w-[min(42%,13.5rem)] sm:min-w-[11.5rem] sm:border-l sm:border-t-0 sm:border-slate-200/80 sm:pl-3 sm:pt-0 dark:sm:border-slate-600/60"
          />
        </div>
      </div>
    </div>
  );
}
