import type { Lesson, ParameterPassing, Step, StackVariable } from '../types';

function stripTrailingComment(line: string): string {
  return line.replace(/\/\/.*$/, '').trim();
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getPrimarySource(lesson: Lesson, activeFile?: string): { fileName: string; code: string } | null {
  if (lesson.files?.length) {
    const name = activeFile ?? lesson.files[0]?.name;
    const f = lesson.files.find((x) => x.name === name) ?? lesson.files[0];
    return f ? { fileName: f.name, code: f.code } : null;
  }
  if (lesson.code) return { fileName: 'Main.java', code: lesson.code };
  return null;
}

function getClassName(code: string): string | null {
  const m = code.match(/\bclass\s+(\w+)\b/);
  return m?.[1] ?? null;
}

function findOpenBraceLine(lines: string[], headerLine: number): number {
  for (let k = headerLine; k < Math.min(headerLine + 8, lines.length); k++) {
    if (lines[k].includes('{')) return k;
  }
  return headerLine;
}

/** Brace depth from first `{` on openLine through closing `}` that balances it (strings ignored in lessons). */
function findBodyEndLine(lines: string[], openLine: number): number {
  let depth = 0;
  let started = false;
  for (let i = openLine; i < lines.length; i++) {
    const line = lines[i];
    let inS = false;
    let inD = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      const prev = j > 0 ? line[j - 1] : '';
      if (!inD && c === "'" && prev !== '\\') inS = !inS;
      else if (!inS && c === '"' && prev !== '\\') inD = !inD;
      else if (!inS && !inD) {
        if (c === '{') {
          depth++;
          started = true;
        } else if (c === '}') {
          depth--;
          if (started && depth === 0) return i;
        }
      }
    }
  }
  return lines.length - 1;
}

const METHOD_HEADER_WITH_PARAMS =
  /^\s*(?:@\w+(?:\([^)]*\))?\s+)*(?:(?:public|private|protected)\s+)?(?:(?:abstract|static|final|synchronized|native|strictfp)\s+)*(?:<[^>]+>\s+)?([\w.<>,?\[\]]+)\s+(\w+)\s*\(([^)]*)\)\s*(?:throws\s+[\w.,\s]+)?\s*\{?\s*$/;

function ctorParamsLine(trimmed: string, className: string): string | null {
  const re = new RegExp(
    `^\\s*(?:@\\w+(?:\\([^)]*\\))?\\s+)*(?:(?:public|private|protected)\\s+)?${escapeRe(className)}\\s*\\(([^)]*)\\)\\s*(?:throws\\s+[\\w.,\\s]+)?\\s*\\{?\\s*$`,
  );
  const m = trimmed.match(re);
  return m?.[1] ?? null;
}

export type ParsedFormal = { type: string; name: string };

function splitParametersList(inner: string): ParsedFormal[] {
  const t = inner.trim();
  if (!t) return [];
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i <= t.length; i++) {
    const c = t[i];
    if (c === '<') depth++;
    else if (c === '>') depth--;
    else if (c === ',' && depth === 0) {
      parts.push(t.slice(start, i).trim());
      start = i + 1;
    } else if (i === t.length) {
      parts.push(t.slice(start).trim());
    }
  }
  const out: ParsedFormal[] = [];
  for (const p of parts) {
    const m = p.match(/^([\w.<>,?\[\]\s]+?)\s+(\w+)\s*$/);
    if (!m) continue;
    out.push({ type: m[1].replace(/\s+/g, ' ').trim(), name: m[2] });
  }
  return out;
}

type MethodInfo = {
  headerLine: number;
  openBraceLine: number;
  endLine: number;
  name: string;
  isStatic: boolean;
  isConstructor: boolean;
  returnType: string;
  formals: ParsedFormal[];
};

function listMethods(lines: string[], className: string): MethodInfo[] {
  const out: MethodInfo[] = [];
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = stripTrailingComment(raw);
    const cp = ctorParamsLine(trimmed, className);
    const mh = trimmed.match(METHOD_HEADER_WITH_PARAMS);
    if (cp !== null) {
      const openBraceLine = findOpenBraceLine(lines, i);
      const endLine = findBodyEndLine(lines, openBraceLine);
      out.push({
        headerLine: i,
        openBraceLine,
        endLine,
        name: className,
        isStatic: false,
        isConstructor: true,
        returnType: '',
        formals: splitParametersList(cp),
      });
      i = endLine;
      continue;
    }
    if (mh) {
      const returnType = mh[1].replace(/\s+/g, ' ').trim();
      const name = mh[2];
      if (name === className) continue;
      const openBraceLine = findOpenBraceLine(lines, i);
      const endLine = findBodyEndLine(lines, openBraceLine);
      out.push({
        headerLine: i,
        openBraceLine,
        endLine,
        name,
        isStatic: /\bstatic\b/.test(trimmed),
        isConstructor: false,
        returnType,
        formals: splitParametersList(mh[3]),
      });
      i = endLine;
      continue;
    }
  }
  return out;
}

function lineInMethod(codeLine: number, m: MethodInfo): boolean {
  return codeLine >= m.openBraceLine && codeLine <= m.endLine;
}

function splitArgsTopLevel(inner: string): string[] {
  const t = inner.trim();
  if (!t) return [];
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (c === ',' && depth === 0) {
      parts.push(t.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(t.slice(start).trim());
  return parts.filter(Boolean);
}

function findCallActualLiterals(
  lesson: Lesson,
  calleeClass: string,
  methodName: string,
  isStatic: boolean,
  isConstructor: boolean,
): string[] | null {
  const files = lesson.files?.length ? lesson.files : [{ name: 'Main.java', code: lesson.code }];
  for (const f of files) {
    const lines = f.code.split('\n');
    for (const line of lines) {
      let m: RegExpMatchArray | null;
      if (isConstructor) {
        m = line.match(new RegExp(`new\\s+${escapeRe(calleeClass)}\\s*\\(\\s*([^)]*)\\s*\\)`));
      } else if (isStatic) {
        m = line.match(
          new RegExp(
            `\\b${escapeRe(calleeClass)}\\.${escapeRe(methodName)}\\s*\\(\\s*([^)]*)\\s*\\)`,
          ),
        );
      } else {
        m = line.match(new RegExp(`\\.${escapeRe(methodName)}\\s*\\(\\s*([^)]*)\\s*\\)`));
      }
      if (m) {
        return splitArgsTopLevel(m[1]);
      }
    }
  }
  return null;
}

function findInstanceReceiverName(lesson: Lesson, calleeClass: string, methodName: string): string | null {
  const files = lesson.files?.length ? lesson.files : [{ name: 'Main.java', code: lesson.code }];
  for (const f of files) {
    const lines = f.code.split('\n');
    for (const line of lines) {
      const m = line.match(new RegExp(`(\\w+)\\.${escapeRe(methodName)}\\s*\\(\\s*([^)]*)\\s*\\)`));
      if (m) return m[1];
    }
  }
  return null;
}

function formatActualFromStack(sv: StackVariable): string {
  if (sv.type === 'primitive') return String(sv.value ?? '');
  if (sv.type === 'reference') {
    if (sv.refId) return `@${sv.refId}`;
    return sv.name;
  }
  return sv.name;
}

function buildSignature(m: MethodInfo, className: string): string {
  const params = m.formals.map((p) => `${p.type} ${p.name}`).join(', ');
  if (m.isConstructor) return `${className}(${params})`;
  const ret = m.returnType || 'void';
  const qual = m.isStatic ? 'static ' : '';
  return `${ret} ${qual}${m.name}(${params})`.replace(/\s+/g, ' ').trim();
}

/**
 * When a step has no authored `parameterPassing`, infer a panel from the enclosing method
 * and stack (and call sites in lesson files).
 */
export function inferParameterPassing(lesson: Lesson, step: Step): ParameterPassing | null {
  if (step.codeLine < 0) return null;
  const src = getPrimarySource(lesson, step.activeFile);
  if (!src) return null;
  const lines = src.code.split('\n');
  const className = getClassName(src.code);
  if (!className) return null;

  const methods = listMethods(lines, className);
  const method = methods.find((mm) => lineInMethod(step.codeLine, mm));
  if (!method) return null;

  const actuals = findCallActualLiterals(
    lesson,
    className,
    method.name,
    method.isStatic,
    method.isConstructor,
  );
  const stackByName = new Map(step.memory.stack.map((s) => [s.name, s]));

  const mappings: ParameterPassing['mappings'] = [];

  if (method.formals.length > 0) {
    for (let i = 0; i < method.formals.length; i++) {
      const f = method.formals[i];
      const sv = stackByName.get(f.name);
      if (!sv) continue;
      let actual: string;
      if (actuals && actuals[i] !== undefined) {
        actual = actuals[i].trim();
      } else {
        actual = formatActualFromStack(sv);
      }
      mappings.push({
        formalType: f.type,
        formalName: f.name,
        actual,
      });
    }
  }

  if (!method.isStatic && !method.isConstructor) {
    const recv = findInstanceReceiverName(lesson, className, method.name);
    if (recv) {
      const recvStack = stackByName.get(recv);
      mappings.unshift({
        formalType: className,
        formalName: 'this',
        actual: recv,
        detail:
          'Teaching layout: the receiver (left of the dot) is passed like any argument; the callee sees it as this.',
      });
    }
  }

  if (mappings.length === 0) return null;

  return {
    subtitle: 'Call site → callee: each argument is copied into its parameter (pass-by-value).',
    calleeSignature: buildSignature(method, className),
    mappings,
    footnote: 'When an explicit panel is not authored for this step, this view is inferred from source and the stack.',
  };
}

/** Merge authored data with inference; used whenever the Parameters panel is visible. */
export function getEffectiveParameterPassing(lesson: Lesson, step: Step): ParameterPassing {
  if (step.parameterPassing) return step.parameterPassing;
  const inferred = inferParameterPassing(lesson, step);
  if (inferred) return inferred;
  return {
    subtitle: 'No parameter mapping is available for this step.',
    calleeSignature: 'Not applicable',
    mappings: [],
    footnote:
      'Open a step inside a method with parameters, or after a call, to see actual → formal mappings. Curricula with explicit panels always use those first.',
  };
}

