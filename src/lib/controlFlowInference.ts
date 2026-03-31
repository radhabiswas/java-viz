import type { Lesson, StackVariable } from '../types';

export type ExecutionPathStep = {
  stepIndex: number;
  codeLine: number;
  shortDescription: string;
};

export type ParsedCallFrame = {
  id: string;
  signature: string;
  methodName: string;
};

const FRAME_RE = /^([A-Za-z_]\w*)\(([^)]*)\)$/;

export function parseCallFrameFromStackVar(v: StackVariable): ParsedCallFrame | null {
  const name = (v.name || '').trim();
  const m = name.match(FRAME_RE);
  if (!m) return null;
  return {
    id: v.id || name,
    signature: name,
    methodName: m[1],
  };
}

export function parseCallFrames(stack: StackVariable[]): ParsedCallFrame[] {
  const out: ParsedCallFrame[] = [];
  for (const v of stack) {
    const p = parseCallFrameFromStackVar(v);
    if (p) out.push(p);
  }
  return out;
}

/** Outer caller first (stack array order), innermost last — matches Memory stack list top-to-bottom. */
export function buildExecutionPath(lesson: Lesson, currentStepIndex: number): ExecutionPathStep[] {
  const steps = lesson.steps;
  if (!steps.length) return [];
  const last = Math.min(Math.max(0, currentStepIndex), steps.length - 1);
  const path: ExecutionPathStep[] = [];
  for (let i = 0; i <= last; i++) {
    const st = steps[i];
    const desc = (st.description || '').trim();
    path.push({
      stepIndex: i,
      codeLine: st.codeLine,
      shortDescription: desc.length > 56 ? `${desc.slice(0, 53)}…` : desc,
    });
  }
  return path;
}

export function isUniformRecursionChain(frames: ParsedCallFrame[]): boolean {
  if (frames.length < 2) return false;
  const first = frames[0].methodName;
  return frames.every((f) => f.methodName === first);
}

/** Same method name on every frame (length ≥ 1). */
export function isUniformMethodFrames(frames: ParsedCallFrame[]): boolean {
  if (frames.length === 0) return false;
  const first = frames[0].methodName;
  return frames.every((f) => f.methodName === first);
}

export function numericArgsFromSignatures(frames: ParsedCallFrame[]): number[] | null {
  const nums = frames.map((f) => {
    const m = f.signature.trim().match(FRAME_RE);
    if (!m) return NaN;
    const n = parseInt(m[2].trim(), 10);
    return Number.isFinite(n) ? n : NaN;
  });
  if (nums.some((x) => Number.isNaN(x))) return null;
  return nums;
}

/** Each value is exactly one less than the previous (typical n, n-1, … recursion). */
export function isDescendByOne(nums: number[]): boolean {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] - nums[i + 1] !== 1) return false;
  }
  return nums.length >= 2;
}

export type UniformNumericRecursionTrace = {
  methodName: string;
  nValues: number[];
};

/**
 * Longest uniform recursion chain with integer arguments (e.g. fact(3)…fact(0)) found in any step.
 * Lets the Flow panel show the full diagram even on intro steps with an empty stack.
 */
export function inferMaxUniformNumericRecursionFromLesson(lesson: Lesson): UniformNumericRecursionTrace | null {
  let best: ParsedCallFrame[] | null = null;
  for (const step of lesson.steps) {
    const frames = parseCallFrames(step.memory.stack);
    if (frames.length < 2 || !isUniformRecursionChain(frames)) continue;
    const nums = numericArgsFromSignatures(frames);
    if (!nums) continue;
    if (best === null || frames.length > best.length) best = frames;
  }
  if (!best) return null;
  const nValues = numericArgsFromSignatures(best);
  if (!nValues) return null;
  return { methodName: best[0].methodName, nValues };
}

/**
 * Labels on return edges from base toward the original caller, for n·(n-1)!-style recursion with base n=0.
 * nValues run outer → inner, last element is 0 (base). Returns length nValues.length - 1 (innermost pair first).
 */
export function computeFactorialUnwindLabels(nValues: number[]): number[] {
  if (nValues.length < 2) return [];
  let acc = 1;
  const out: number[] = [];
  for (let k = nValues.length - 1; k >= 1; k--) {
    acc = nValues[k - 1] * acc;
    out.push(acc);
  }
  return out;
}

/**
 * Same shape as factorial unwind labels but for `n + sumTo(n-1)` with base n == 1 (innermost returns 1).
 * nValues outer → inner ending in 1.
 */
export function computeSumToUnwindLabels(nValues: number[]): number[] {
  const L = nValues.length;
  if (L < 2 || nValues[L - 1] !== 1 || !isDescendByOne(nValues)) return [];
  let acc = 1;
  const out: number[] = [];
  for (let k = L - 2; k >= 0; k--) {
    acc = nValues[k] + acc;
    out.push(acc);
  }
  return out;
}

export type RecursionUnwindStyle =
  | { kind: 'factorial'; labels: number[]; combineOp: '×' }
  | { kind: 'sumTo'; labels: number[]; combineOp: '+' };

/** Factorial (base 0) or sumTo-like (base 1), each step n−1. */
export function inferRecursionUnwindStyle(nValues: number[]): RecursionUnwindStyle | null {
  if (nValues.length < 2 || !isDescendByOne(nValues)) return null;
  const last = nValues[nValues.length - 1];
  if (last === 0) {
    const labels = computeFactorialUnwindLabels(nValues);
    return labels.length ? { kind: 'factorial', labels, combineOp: '×' } : null;
  }
  if (last === 1) {
    const labels = computeSumToUnwindLabels(nValues);
    return labels.length ? { kind: 'sumTo', labels, combineOp: '+' } : null;
  }
  return null;
}

export function traceFromCurrentFrames(frames: ParsedCallFrame[]): UniformNumericRecursionTrace | null {
  if (frames.length < 2 || !isUniformRecursionChain(frames)) return null;
  const nValues = numericArgsFromSignatures(frames);
  if (!nValues) return null;
  return { methodName: frames[0].methodName, nValues };
}

/** Frames for `methodName` only (same method every row). */
export function recursionFrameDepth(stack: StackVariable[], methodName: string): number {
  const frames = parseCallFrames(stack);
  if (!frames.length || frames[0].methodName !== methodName) return 0;
  if (!frames.every((f) => f.methodName === methodName)) return 0;
  return frames.length;
}

/** Result returned from the outermost call once the full factorial-style chain unwinds. */
export function computeFactorialFinalReturnValue(nValues: number[]): number | null {
  const L = nValues.length;
  if (L < 2 || nValues[L - 1] !== 0 || !isDescendByOne(nValues)) return null;
  const lab = computeFactorialUnwindLabels(nValues);
  return lab.length ? lab[lab.length - 1] : null;
}

export function computeSumToFinalReturnValue(nValues: number[]): number | null {
  const lab = computeSumToUnwindLabels(nValues);
  return lab.length ? lab[lab.length - 1] : null;
}

export function computeRecursiveChainFinalReturnValue(nValues: number[]): number | null {
  return computeFactorialFinalReturnValue(nValues) ?? computeSumToFinalReturnValue(nValues);
}

export type RecursionDiagramStepState = {
  stackDepth: number;
  forwardEdgeCount: number;
  returnEdgeCount: number;
  showFinalReturn: boolean;
  finalReturnValue: number | null;
};

export function buildRecursionDiagramState(
  lesson: Lesson,
  stepIndex: number,
  trace: UniformNumericRecursionTrace,
): RecursionDiagramStepState {
  const method = trace.methodName;
  const L = trace.nValues.length;
  let peakDepth = 0;
  let peakStepIdx = -1;
  lesson.steps.forEach((st, i) => {
    const d = recursionFrameDepth(st.memory.stack, method);
    if (d >= peakDepth) {
      peakDepth = d;
      peakStepIdx = i;
    }
  });

  const stackDepth = recursionFrameDepth(lesson.steps[stepIndex]?.memory.stack ?? [], method);
  const forwardEdgeCount = Math.max(0, stackDepth - 1);

  /** Pops since peak (from memory). */
  const popsSincePeak =
    peakDepth > 0 && stepIndex > peakStepIdx ? Math.max(0, peakDepth - stackDepth) : 0;
  /** Lesson steps advanced past the deepest step — caps return arcs so one “Next” reveals at most one unwind. */
  const unwindStepsElapsed =
    peakDepth > 0 && stepIndex > peakStepIdx ? stepIndex - peakStepIdx : 0;
  let returnEdgeCount = 0;
  if (peakDepth > 0 && stepIndex > peakStepIdx) {
    returnEdgeCount = Math.min(L - 1, popsSincePeak, unwindStepsElapsed);
  }

  const finalVal = computeRecursiveChainFinalReturnValue(trace.nValues);
  const showFinalReturn =
    finalVal !== null &&
    stackDepth === 1 &&
    stepIndex > peakStepIdx &&
    returnEdgeCount >= L - 1 &&
    L >= 2;

  return {
    stackDepth,
    forwardEdgeCount,
    returnEdgeCount,
    showFinalReturn,
    finalReturnValue: showFinalReturn ? finalVal : null,
  };
}
