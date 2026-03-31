import type { Lesson, Step } from '../types';

export type ExecutionTransition = {
  stepTo: number;
  fromLine: number;
  toLine: number;
  edgeKind: 'intro' | 'sequential' | 'loop-back' | 'condition' | 'enter-branch' | 'skip-forward';
  shortLabel: string;
};

export function getPrimaryLessonCode(lesson: Lesson): string {
  if (lesson.files?.length) return lesson.files[0].code;
  return lesson.code;
}

/** Whether the source likely uses if / else / while / for (Flow panel is relevant). */
export function lessonUsesControlConstructs(code: string): boolean {
  const s = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  return (
    /\bif\s*\(/.test(s) ||
    /\belse\b/.test(s) ||
    /\bwhile\s*\(/.test(s) ||
    /\bfor\s*\(/.test(s)
  );
}

function lineSnippet(codeLines: string[], lineIdx: number): string {
  if (lineIdx < 0 || lineIdx >= codeLines.length) return '(intro)';
  const t = codeLines[lineIdx].trim();
  if (!t) return `L${lineIdx + 1}`;
  return t.length > 56 ? `${t.slice(0, 53)}…` : t;
}

function classifyEdge(
  codeLines: string[],
  fromLine: number,
  toLine: number,
): Pick<ExecutionTransition, 'edgeKind' | 'shortLabel'> {
  if (fromLine < 0) {
    return { edgeKind: 'intro', shortLabel: 'Start lesson trace' };
  }
  if (toLine < fromLine) {
    return { edgeKind: 'loop-back', shortLabel: 'Jump back (loop / again)' };
  }
  if (toLine > fromLine + 1) {
    return { edgeKind: 'skip-forward', shortLabel: 'Skip ahead (branch not taken or block exit)' };
  }

  const fromText = codeLines[fromLine]?.trim() ?? '';
  const toText = codeLines[toLine]?.trim() ?? '';

  if (/^if\s*\(/.test(toText)) {
    return { edgeKind: 'condition', shortLabel: 'Evaluate if / loop condition' };
  }
  if (
    (/^if\s*\(/.test(fromText) ||
      /^while\s*\(/.test(fromText) ||
      /^for\s*\(/.test(fromText)) &&
    toLine === fromLine + 1
  ) {
    return { edgeKind: 'enter-branch', shortLabel: 'Enter guarded body (condition was true)' };
  }
  if (/\bwhile\s*\(/.test(toText) || /\bfor\s*\(/.test(toText)) {
    return { edgeKind: 'condition', shortLabel: 'Loop header' };
  }

  return { edgeKind: 'sequential', shortLabel: 'Next statement' };
}

/**
 * Transitions between consecutive execution points up to the current step (for Flow panel).
 */
export function buildExecutionTransitions(
  lesson: Lesson,
  currentStepIndex: number,
): ExecutionTransition[] {
  const code = getPrimaryLessonCode(lesson);
  const codeLines = code.split('\n');
  const steps = lesson.steps;
  if (!steps.length || currentStepIndex < 0) return [];

  const out: ExecutionTransition[] = [];
  const end = Math.min(currentStepIndex, steps.length - 1);

  out.push({
    stepTo: 0,
    fromLine: -1,
    toLine: steps[0].codeLine,
    edgeKind: 'intro',
    shortLabel: 'Start lesson trace',
  });

  for (let i = 1; i <= end; i++) {
    const fromLine = steps[i - 1].codeLine;
    const toLine = steps[i].codeLine;
    const { edgeKind, shortLabel } = classifyEdge(codeLines, fromLine, toLine);
    out.push({
      stepTo: i,
      fromLine,
      toLine,
      edgeKind,
      shortLabel,
    });
  }

  return out;
}

export function transitionLineHint(lesson: Lesson, t: ExecutionTransition): { from: string; to: string } {
  const codeLines = getPrimaryLessonCode(lesson).split('\n');
  return {
    from: t.fromLine < 0 ? '—' : lineSnippet(codeLines, t.fromLine),
    to: lineSnippet(codeLines, t.toLine),
  };
}

/** Truth value described in a lesson step narrative (e.g. "… is true, so …"). */
export function parseConditionOutcomeFromDescription(description: string): boolean | null {
  const d = description.trim().toLowerCase();
  if (!d) return null;
  if (
    /\bis false\b/.test(d) ||
    /\bfalse,\s*so\b/.test(d) ||
    /\bevaluates to false\b/.test(d) ||
    /\bcondition\b.*\bfalse\b/.test(d)
  ) {
    return false;
  }
  if (
    /\bis true\b/.test(d) ||
    /\btrue,\s*so\b/.test(d) ||
    /\btrue so\b/.test(d) ||
    /\bevaluates to true\b/.test(d) ||
    /\bcondition\b.*\btrue\b/.test(d)
  ) {
    return true;
  }
  return null;
}

/** Middle clause of `for (init; cond; update)` when the line is a classic for header. */
export function extractForConditionExpr(forLine: string): string | null {
  const line = forLine.trim();
  const m = line.match(/^for\s*\(\s*[^;]+;\s*([^;]+?)\s*;\s*[^)]+\)\s*(?:\{)?\s*$/);
  return m ? m[1].trim() : null;
}

/** Predicate inside `if ( … )`, `while ( … )`, or the condition clause of `for ( … )` on this line. */
export function extractHeaderConditionExpr(codeLines: string[], lineIdx: number): string {
  const line = codeLines[lineIdx]?.trim() ?? '';
  const forCond = extractForConditionExpr(line);
  if (forCond) return forCond;
  const ifM = line.match(/^if\s*\(\s*(.+?)\s*\)\s*(?:\{)?\s*$/);
  if (ifM) return ifM[1].trim();
  const whileM = line.match(/^while\s*\(\s*(.+?)\s*\)\s*(?:\{)?\s*$/);
  if (whileM) return whileM[1].trim();
  return line.length > 48 ? `${line.slice(0, 45)}…` : line;
}

export function primitiveVariablesFromStep(step: Step): { name: string; value: string }[] {
  return step.memory.stack
    .filter((v) => v.type === 'primitive' && v.name)
    .map((v) => ({ name: v.name, value: formatPrimitiveForFlow(v.value) }));
}

function formatPrimitiveForFlow(value: string | number | boolean | undefined): string {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (value === undefined || value === null) return '';
  return String(value);
}

function primitiveVarMap(step: Step): Record<string, string | number | boolean> {
  const m: Record<string, string | number | boolean> = {};
  for (const v of step.memory.stack) {
    if (v.type !== 'primitive' || !v.name || v.value === undefined || v.value === null) continue;
    const val = v.value;
    if (typeof val === 'boolean' || typeof val === 'number') m[v.name] = val;
    else if (typeof val === 'string') {
      const n = parseInt(val.trim(), 10);
      if (/^-?\d+$/.test(val.trim())) m[v.name] = n;
      else if (val.toLowerCase() === 'true') m[v.name] = true;
      else if (val.toLowerCase() === 'false') m[v.name] = false;
    }
  }
  return m;
}

function evalSimpleOperand(
  expr: string,
  vars: Record<string, string | number | boolean>,
): { result: boolean; detail?: string } | null {
  const e = expr.trim();
  const cmp = e.match(/^(\w+)\s*(<=|>=|==|!=|<|>)\s*(-?\d+)$/);
  if (cmp) {
    const name = cmp[1];
    const op = cmp[2];
    const right = parseInt(cmp[3], 10);
    const left = vars[name];
    if (typeof left !== 'number' || Number.isNaN(left)) return null;
    let ok = false;
    switch (op) {
      case '<':
        ok = left < right;
        break;
      case '<=':
        ok = left <= right;
        break;
      case '>':
        ok = left > right;
        break;
      case '>=':
        ok = left >= right;
        break;
      case '==':
        ok = left === right;
        break;
      case '!=':
        ok = left !== right;
        break;
      default:
        return null;
    }
    return { result: ok, detail: `${left} ${op} ${right}` };
  }
  const id = e.match(/^(\w+)$/);
  if (id) {
    const v = vars[id[1]];
    if (typeof v === 'boolean') return { result: v, detail: v ? 'true' : 'false' };
  }
  return null;
}

/**
 * For `a && b && …` in an if-condition, evaluate each operand using primitive stack values (e.g. passed, score).
 */
export function compoundAndBreakdownFromStep(
  conditionText: string,
  step: Step,
): { operands: { expr: string; result: boolean; detail?: string }[] } | null {
  if (!/\s&&\s/.test(conditionText)) return null;
  const parts = conditionText
    .split(/\s*&&\s*/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;
  const vars = primitiveVarMap(step);
  const operands: { expr: string; result: boolean; detail?: string }[] = [];
  for (const part of parts) {
    const ev = evalSimpleOperand(part, vars);
    if (!ev) return null;
    operands.push({ expr: part, result: ev.result, detail: ev.detail });
  }
  return { operands };
}

function isIfLine(codeLines: string[], lineIdx: number): boolean {
  return /^if\s*\(/.test(codeLines[lineIdx]?.trim() ?? '');
}

function breakdownForIfDecision(
  codeLines: string[],
  line: number,
  conditionText: string,
  step: Step | undefined,
): { operands: { expr: string; result: boolean; detail?: string }[] } | undefined {
  if (!step || !isIfLine(codeLines, line)) return undefined;
  const b = compoundAndBreakdownFromStep(conditionText, step);
  return b ?? undefined;
}

export type FlowDisplayItem =
  | {
      kind: 'decision';
      stepCondition: number;
      stepBranch: number;
      line: number;
      conditionText: string;
      outcome: boolean | null;
      branch: 'then' | 'else' | 'unknown';
      /** Per-&& operand results when stack values suffice (if only). */
      conditionBreakdown?: { operands: { expr: string; result: boolean; detail?: string }[] };
    }
  | {
      kind: 'step';
      stepTo: number;
      line: number;
      caption: string;
      variables: { name: string; value: string }[];
    };

/**
 * Compact flow list: decisions show condition outcome + branch; other steps stay one short line.
 */
export function buildFlowDisplayItems(lesson: Lesson, currentStepIndex: number): FlowDisplayItem[] {
  const transitions = buildExecutionTransitions(lesson, currentStepIndex);
  const steps = lesson.steps;
  const codeLines = getPrimaryLessonCode(lesson).split('\n');
  const items: FlowDisplayItem[] = [];

  let idx = 0;
  while (idx < transitions.length) {
    const t = transitions[idx];
    const next = transitions[idx + 1];

    if (t.edgeKind === 'condition' && next?.edgeKind === 'enter-branch') {
      const conditionText = extractHeaderConditionExpr(codeLines, t.toLine);
      const outcome = parseConditionOutcomeFromDescription(steps[t.stepTo]?.description ?? '');
      const conditionBreakdown = breakdownForIfDecision(
        codeLines,
        t.toLine,
        conditionText,
        steps[t.stepTo],
      );
      items.push({
        kind: 'decision',
        stepCondition: t.stepTo,
        stepBranch: next.stepTo,
        line: t.toLine,
        conditionText,
        outcome,
        branch: 'then',
        ...(conditionBreakdown ? { conditionBreakdown } : {}),
      });
      idx += 2;
      continue;
    }

    if (t.edgeKind === 'condition' && next?.edgeKind === 'skip-forward') {
      const conditionText = extractHeaderConditionExpr(codeLines, t.toLine);
      let outcome = parseConditionOutcomeFromDescription(steps[t.stepTo]?.description ?? '');
      if (outcome === null) outcome = false;
      const conditionBreakdown = breakdownForIfDecision(
        codeLines,
        t.toLine,
        conditionText,
        steps[t.stepTo],
      );
      items.push({
        kind: 'decision',
        stepCondition: t.stepTo,
        stepBranch: next.stepTo,
        line: t.toLine,
        conditionText,
        outcome,
        branch: 'else',
        ...(conditionBreakdown ? { conditionBreakdown } : {}),
      });
      idx += 2;
      continue;
    }

    if (t.edgeKind === 'enter-branch') {
      const headerLine = t.fromLine >= 0 ? t.fromLine : t.toLine;
      const conditionText = extractHeaderConditionExpr(codeLines, headerLine);
      const conditionBreakdown = breakdownForIfDecision(
        codeLines,
        headerLine,
        conditionText,
        steps[t.stepTo],
      );
      items.push({
        kind: 'decision',
        stepCondition: t.stepTo,
        stepBranch: t.stepTo,
        line: headerLine,
        conditionText,
        outcome: parseConditionOutcomeFromDescription(steps[t.stepTo]?.description ?? ''),
        branch: 'then',
        ...(conditionBreakdown ? { conditionBreakdown } : {}),
      });
      idx += 1;
      continue;
    }

    if (t.edgeKind === 'loop-back') {
      const toText = codeLines[t.toLine]?.trim() ?? '';
      if (/^for\s*\(/.test(toText) || /^while\s*\(/.test(toText)) {
        const conditionText = extractHeaderConditionExpr(codeLines, t.toLine);
        const outcome = parseConditionOutcomeFromDescription(steps[t.stepTo]?.description ?? '');
        const branch: 'then' | 'else' | 'unknown' =
          outcome === false ? 'else' : outcome === true ? 'then' : 'unknown';
        items.push({
          kind: 'decision',
          stepCondition: t.stepTo,
          stepBranch: t.stepTo,
          line: t.toLine,
          conditionText,
          outcome,
          branch,
        });
        idx += 1;
        continue;
      }
    }

    if (t.edgeKind === 'condition') {
      const conditionText = extractHeaderConditionExpr(codeLines, t.toLine);
      const outcome = parseConditionOutcomeFromDescription(steps[t.stepTo]?.description ?? '');
      const conditionBreakdown = breakdownForIfDecision(
        codeLines,
        t.toLine,
        conditionText,
        steps[t.stepTo],
      );
      items.push({
        kind: 'decision',
        stepCondition: t.stepTo,
        stepBranch: t.stepTo,
        line: t.toLine,
        conditionText,
        outcome,
        branch: outcome === false ? 'else' : outcome === true ? 'then' : 'unknown',
        ...(conditionBreakdown ? { conditionBreakdown } : {}),
      });
      idx += 1;
      continue;
    }

    const step = steps[t.stepTo];
    if (step && step.codeLine < 0) {
      idx += 1;
      continue;
    }
    const desc = step?.description?.trim() ?? t.shortLabel;
    const variables = step ? primitiveVariablesFromStep(step) : [];
    const caption = desc.length > 80 ? `${desc.slice(0, 77)}…` : desc;
    items.push({
      kind: 'step',
      stepTo: t.stepTo,
      line: t.toLine,
      caption,
      variables,
    });
    idx += 1;
  }

  return items;
}
