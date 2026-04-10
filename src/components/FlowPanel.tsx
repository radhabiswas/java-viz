import React, { useMemo } from 'react';
import type { Lesson } from '../types';
import { cn } from '../lib/utils';
import {
  buildFlowDisplayItems,
  getPrimaryLessonCode,
  primitiveVariablesFromStep,
} from '../lib/statementFlowInference';
import { GitBranch } from 'lucide-react';

function lineLabel(codeLine: number): string {
  if (codeLine < 0) return 'Intro';
  return `L${codeLine + 1}`;
}

function flowHeaderKind(codeLines: string[], line: number): 'for' | 'while' | 'if' {
  const t = codeLines[line]?.trim() ?? '';
  if (/^for\s*\(/.test(t)) return 'for';
  if (/^while\s*\(/.test(t)) return 'while';
  return 'if';
}

function VariableBoxes({
  vars,
  className,
}: {
  vars: { name: string; value: string }[];
  className?: string;
}) {
  if (!vars.length) return null;
  return (
    <div className={cn('mt-1.5 flex flex-wrap gap-1.5', className)}>
      {vars.map((v) => (
        <span
          key={v.name}
          className="inline-flex items-baseline gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] tabular-nums text-slate-800 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100"
        >
          <span className="font-medium text-slate-500 dark:text-slate-400">{v.name}</span>
          <span className="text-slate-400">=</span>
          <span className="font-semibold">{v.value}</span>
        </span>
      ))}
    </div>
  );
}

export default function FlowPanel({
  lesson,
  currentStepIndex,
  embedded = false,
}: {
  lesson: Lesson;
  currentStepIndex: number;
  embedded?: boolean;
}) {
  const items = useMemo(
    () => buildFlowDisplayItems(lesson, currentStepIndex),
    [lesson, currentStepIndex],
  );
  const codeLines = useMemo(() => getPrimaryLessonCode(lesson).split('\n'), [lesson]);

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900',
        embedded ? 'min-h-0 h-full flex-1' : 'max-h-[min(38vh,20rem)] shrink-0',
      )}
    >
      <div className="shrink-0 border-b border-slate-200/80 px-4 py-3.5 dark:border-slate-800">
        <h3 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          <GitBranch className="h-6 w-6 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
          Flow
        </h3>
        <p className="mt-1.5 text-xs font-medium leading-snug text-slate-600 dark:text-slate-400">
          Fills in as you step: locals, then outcomes at each <span className="font-semibold text-slate-700 dark:text-slate-300">if</span> / loop condition (no duplicate of the step narrative).
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <section aria-label="Control flow trace">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Trace
          </h4>
          {items.length === 0 ? (
            <p className="mt-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Press Next until execution reaches a real code line — then decisions and values show up here.
            </p>
          ) : null}
          <ul className={cn('space-y-2.5', items.length > 0 && 'mt-2')}>
            {items.map((item) => {
              if (item.kind === 'decision') {
                const active =
                  currentStepIndex >= item.stepCondition && currentStepIndex <= item.stepBranch;
                const hk = flowHeaderKind(codeLines, item.line);
                const branchPhrase =
                  hk === 'for' || hk === 'while'
                    ? item.branch === 'then'
                      ? '→ run loop body'
                      : item.branch === 'else'
                        ? '→ exit loop'
                        : '→ (see trace)'
                    : item.branch === 'then'
                      ? '→ then branch (body runs)'
                      : item.branch === 'else'
                        ? '→ else / skip body'
                        : '→ follow trace';
                const isIf = hk === 'if';
                const decisionVars = primitiveVariablesFromStep(
                  lesson.steps[isIf ? item.stepCondition : item.stepBranch],
                );

                return (
                  <li
                    key={`decision-${item.stepCondition}-${item.stepBranch}-${item.line}`}
                    className={cn(
                      'rounded-xl border border-sky-200/90 bg-sky-50/90 px-3 py-2.5 dark:border-sky-800/60 dark:bg-sky-950/35',
                      active &&
                        'ring-2 ring-teal-500/45 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900',
                    )}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wide text-sky-800 dark:text-sky-200">
                      Condition · {lineLabel(item.line)}
                    </div>
                    {isIf && decisionVars.length > 0 ? (
                      <div className="mt-2">
                        <div className="text-[9px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Values before this check
                        </div>
                        <VariableBoxes vars={decisionVars} />
                      </div>
                    ) : null}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <code className="block max-w-full break-all rounded-md border border-sky-200/80 bg-white px-2 py-1 font-mono text-[12px] font-semibold text-slate-900 dark:border-sky-800/50 dark:bg-slate-900 dark:text-sky-100">
                        {item.conditionText}
                      </code>
                    </div>
                    {item.conditionBreakdown ? (
                      <div className="mt-2 border-t border-sky-200/70 pt-2 dark:border-sky-800/50">
                        <div className="text-[9px] font-bold uppercase tracking-wide text-sky-900/90 dark:text-sky-200/90">
                          Evaluate each part
                        </div>
                        <ul className="mt-1.5 space-y-1.5">
                          {item.conditionBreakdown.operands.map((op) => (
                            <li
                              key={op.expr}
                              className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-700 dark:text-slate-200"
                            >
                              <code className="rounded-md bg-white/90 px-1.5 py-0.5 font-mono text-[11px] text-slate-900 dark:bg-slate-900/90 dark:text-sky-100">
                                {op.expr}
                              </code>
                              <span className="text-slate-400">→</span>
                              <span
                                className={cn(
                                  'font-extrabold',
                                  op.result
                                    ? 'text-emerald-800 dark:text-emerald-300'
                                    : 'text-rose-800 dark:text-rose-300',
                                )}
                              >
                                {op.result ? 'TRUE' : 'FALSE'}
                              </span>
                              {op.detail ? (
                                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                  ({op.detail})
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <div
                      className={cn(
                        'mt-2 flex flex-wrap items-center gap-2',
                        item.conditionBreakdown &&
                          'border-t border-sky-200/70 pt-2 dark:border-sky-800/50',
                      )}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                        {item.conditionBreakdown ? 'Compound' : 'Result'}
                      </span>
                      {item.conditionBreakdown ? (
                        <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-800 dark:bg-slate-900/80 dark:text-slate-100">
                          {item.conditionText}
                        </code>
                      ) : null}
                      {item.outcome === null ? (
                        <span className="rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          ?
                        </span>
                      ) : (
                        <span
                          className={cn(
                            'rounded-md px-2 py-0.5 text-[11px] font-extrabold tracking-wide',
                            item.outcome
                              ? 'bg-emerald-500/25 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-50'
                              : 'bg-rose-500/25 text-rose-950 dark:bg-rose-500/20 dark:text-rose-50',
                          )}
                        >
                          {item.outcome ? 'TRUE' : 'FALSE'}
                        </span>
                      )}
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                        {branchPhrase}
                      </span>
                    </div>
                    {!isIf && decisionVars.length > 0 ? <VariableBoxes vars={decisionVars} /> : null}
                  </li>
                );
              }

              const active = item.stepTo === currentStepIndex;
              return (
                <li
                  key={`step-${item.stepTo}`}
                  className={cn(
                    'rounded-lg border border-slate-200/90 bg-white px-2.5 py-1.5 dark:border-slate-700 dark:bg-slate-800/60',
                    active &&
                      'ring-2 ring-teal-500/35 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900',
                  )}
                  aria-label={`Step ${item.stepTo + 1}, line ${lineLabel(item.line)}`}
                >
                  {item.variables.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[10px] font-bold tabular-nums text-slate-500 dark:text-slate-400">
                        {lineLabel(item.line)}
                      </span>
                      <VariableBoxes vars={item.variables} className="mt-0" />
                    </div>
                  ) : (
                    <>
                      <div className="text-[10px] font-bold tabular-nums text-slate-500 dark:text-slate-400">
                        {lineLabel(item.line)}
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-snug text-slate-700 dark:text-slate-200">
                        {item.caption}
                      </p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
