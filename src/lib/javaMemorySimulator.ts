import type { HeapObject, MemoryState, StackVariable, StaticVariable } from '../types';

const PRIMITIVE_TYPES = new Set([
  'int',
  'long',
  'double',
  'float',
  'boolean',
  'char',
  'byte',
  'short',
]);

type SimState = {
  stack: StackVariable[];
  heap: HeapObject[];
  staticArea: StaticVariable[];
  heapCounter: number;
  /** Last top-level `class Name` seen (for static field ownership). */
  currentClass: string;
};

function emptyMemory(): MemoryState {
  return { stack: [], heap: [], staticArea: [] };
}

function cloneMemory(state: SimState): MemoryState {
  return {
    stack: state.stack.map((v) => ({ ...v })),
    heap: state.heap.map((h) => ({
      ...h,
      fields: h.fields.map((f) => ({ ...f })),
    })),
    staticArea: state.staticArea.map((s) => ({ ...s })),
  };
}

function stripComments(line: string): string {
  const i = line.indexOf('//');
  return (i >= 0 ? line.slice(0, i) : line).trim();
}

function braceDelta(line: string): number {
  let d = 0;
  for (const ch of line) {
    if (ch === '{') d++;
    else if (ch === '}') d--;
  }
  return d;
}

function isTypeToken(tok: string): boolean {
  return PRIMITIVE_TYPES.has(tok) || tok === 'String' || /^[A-Z]/.test(tok);
}

function splitArgs(inner: string): string[] {
  const s = inner.trim();
  if (!s) return [];
  const out: string[] = [];
  let cur = '';
  let depth = 0;
  let inString = false;
  let quote = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inString) {
      cur += c;
      if (c === quote && s[i - 1] !== '\\') inString = false;
      continue;
    }
    if (c === '"' || c === "'") {
      inString = true;
      quote = c;
      cur += c;
      continue;
    }
    if (c === '(') depth++;
    if (c === ')') depth = Math.max(0, depth - 1);
    if (c === ',' && depth === 0) {
      out.push(cur.trim());
      cur = '';
      continue;
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

type NewExpr =
  | { kind: 'ctor'; className: string; rawArgs: string }
  | { kind: 'array'; elementType: string; sizeExpr: string };

/** Constructor `new Foo(...)` or array `new int[n]`. */
function parseNewExpr(expr: string): NewExpr | null {
  const t = expr.trim();
  const am = t.match(/^new\s+(\w+)\s*\[\s*([^\]]*)\s*\]\s*$/);
  if (am) return { kind: 'array', elementType: am[1], sizeExpr: am[2].trim() };
  const cm = t.match(/^new\s+(\w+)\s*(?:<[^>]*>)?\s*\(\s*([^)]*)\s*\)\s*$/);
  if (cm) return { kind: 'ctor', className: cm[1], rawArgs: cm[2] };
  return null;
}

/** Cap element count so custom code cannot allocate huge diagrams. */
const MAX_ARRAY_LENGTH = 512;

function evalArrayLength(expr: string, state: SimState): number | null {
  const t = expr.trim();
  if (/^\d+$/.test(t)) {
    const n = parseInt(t, 10);
    return Number.isFinite(n) ? n : null;
  }
  if (/^[a-zA-Z_]\w*$/.test(t)) {
    const v = findStack(state, t);
    if (v?.type === 'primitive' && typeof v.value === 'number' && Number.isInteger(v.value)) return v.value;
  }
  return null;
}

function defaultArrayElementValue(elementType: string): string | number | boolean | null {
  if (elementType === 'boolean') return false;
  if (elementType === 'double' || elementType === 'float') return 0;
  if (PRIMITIVE_TYPES.has(elementType)) return 0;
  return null;
}

function allocateArrayHeap(state: SimState, elementType: string, length: number): string | null {
  if (!Number.isFinite(length) || length < 0) return null;
  const n = Math.min(Math.floor(length), MAX_ARRAY_LENGTH);
  const id = `obj${++state.heapCounter}`;
  const fields: HeapObject['fields'] = Array.from({ length: n }, (_, i) => ({
    name: `[${i}]`,
    value: defaultArrayElementValue(elementType),
  }));
  if (length > MAX_ARRAY_LENGTH) {
    fields.push({
      name: '…',
      value: `(+${length - MAX_ARRAY_LENGTH} slots not shown)`,
    });
  }
  state.heap.push({
    id,
    className: `${elementType}[]`,
    fields,
  });
  return id;
}

function stripQuotes(s: string): string {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))
    return t.slice(1, -1);
  return t;
}

function parseLiteral(arg: string): string | number | boolean | null {
  const t = arg.trim();
  if (t === 'null') return null;
  if (t === 'true') return true;
  if (t === 'false') return false;
  if (/^["']/.test(t)) return stripQuotes(t);
  if (/^-?\d+$/.test(t)) return parseInt(t, 10);
  if (/^-?\d+\.\d+([eE][+-]?\d+)?$/.test(t)) return parseFloat(t);
  if (/^-?\d+[lL]$/.test(t)) return parseInt(t.slice(0, -1), 10);
  return t;
}

function findStaticVar(state: SimState, className: string, field: string): StaticVariable | undefined {
  const exact = state.staticArea.find((s) => s.className === className && s.name === field);
  if (exact) return exact;
  const ci = state.staticArea.find(
    (s) => s.className.toLowerCase() === className.toLowerCase() && s.name === field,
  );
  if (ci) return ci;
  const byField = state.staticArea.filter((s) => s.name === field);
  if (byField.length === 1) return byField[0];
  return undefined;
}

function evalHeapAtom(arg: string, state: SimState): string | number | boolean | null {
  const t = arg.trim();
  const dot = t.match(/^(\w+)\.(\w+)$/);
  if (dot) {
    const stat = findStaticVar(state, dot[1], dot[2]);
    if (stat !== undefined) return stat.value as string | number | boolean;
  }
  const lit = parseLiteral(t);
  if (typeof lit === 'number' || typeof lit === 'boolean') return lit;
  if (typeof lit === 'string' && /^["']/.test(t)) return lit;
  const prim = tryEvalPrimitiveRhs(t, state);
  if (prim !== null) return prim;
  if (typeof lit === 'string') return lit;
  return null;
}

function fieldsForClass(className: string, argStrings: string[], state: SimState): HeapObject['fields'] {
  if (className === 'ArrayList') {
    return [{ name: 'size', value: 0 }];
  }
  const vals = argStrings.map((a) => evalHeapAtom(a, state));
  if (className === 'Fraction') {
    return [
      { name: 'numer', value: (vals[0] as number) ?? 0 },
      { name: 'denom', value: (vals[1] as number) ?? 0 },
    ];
  }
  if (className === 'Song') {
    return [
      { name: 'title', value: String(vals[0] ?? '') },
      { name: 'artist', value: String(vals[1] ?? '') },
    ];
  }
  if (className === 'String') {
    return [{ name: 'value', value: String(vals[0] ?? '') }];
  }
  return vals.map((v, i) => ({ name: `f${i}`, value: v as string | number | boolean | null }));
}

function allocateHeap(state: SimState, className: string, argStrings: string[]): string {
  const id = `obj${++state.heapCounter}`;
  state.heap.push({
    id,
    className,
    fields: fieldsForClass(className, argStrings, state),
  });
  return id;
}

function findStack(state: SimState, name: string): StackVariable | undefined {
  return state.stack.find((v) => v.name === name);
}

function setStackVar(state: SimState, v: StackVariable) {
  const i = state.stack.findIndex((x) => x.name === v.name);
  if (i >= 0) state.stack[i] = v;
  else state.stack.push(v);
}

/** Single literal or stack primitive (number), for binary-op operands. */
function evalPrimitiveOperand(expr: string, state: SimState): number | null {
  const t = expr.trim();
  const lit = parseLiteral(t);
  if (typeof lit === 'number') return lit;
  if (/^[a-zA-Z_]\w*$/.test(t)) {
    const v = findStack(state, t);
    if (v?.type === 'primitive' && typeof v.value === 'number') return v.value;
  }
  return null;
}

function normalizeArithmeticSource(expr: string): string {
  return expr
    .trim()
    .replace(/\u00d7/g, '*')
    .replace(/\u00f7/g, '/');
}

/** Strip a single outer `( … )` only when parentheses are balanced (so `(int) x` is unchanged). */
function stripBalancedOuterParens(s: string): string {
  let t = s.trim();
  while (t.length >= 2 && t[0] === '(' && t[t.length - 1] === ')') {
    let depth = 0;
    let closedBeforeEnd = false;
    for (let i = 0; i < t.length; i++) {
      if (t[i] === '(') depth++;
      else if (t[i] === ')') {
        depth--;
        if (depth === 0 && i < t.length - 1) closedBeforeEnd = true;
      }
    }
    if (closedBeforeEnd || depth !== 0) break;
    t = t.slice(1, -1).trim();
  }
  return t;
}

/**
 * One binary op (`a + b`, `items * price`) or a numeric cast (`(int) total`).
 * Does not handle nested expressions beyond one cast wrapping an operand.
 */
function tryEvalArithmeticExpression(expr: string, state: SimState): number | null {
  let t = stripBalancedOuterParens(normalizeArithmeticSource(expr));
  const cast = t.match(
    /^\(\s*(int|double|float|long)\s*\)\s*([a-zA-Z_]\w*|-?\d+(?:\.\d+(?:[eE][+-]?\d+)?)?)\s*$/,
  );
  if (cast) {
    const v = evalPrimitiveOperand(cast[2], state);
    if (v === null) return null;
    if (cast[1] === 'int' || cast[1] === 'long') return Math.trunc(v);
    return v;
  }

  const bin = t.match(
    /^([a-zA-Z_]\w*|-?\d+(?:\.\d+(?:[eE][+-]?\d+)?)?)\s*([+\-*/%])\s*([a-zA-Z_]\w*|-?\d+(?:\.\d+(?:[eE][+-]?\d+)?)?)$/,
  );
  if (bin) {
    const L = evalPrimitiveOperand(bin[1], state);
    const R = evalPrimitiveOperand(bin[3], state);
    if (L === null || R === null) return null;
    switch (bin[2]) {
      case '+':
        return L + R;
      case '-':
        return L - R;
      case '*':
        return L * R;
      case '/':
        return R === 0 ? null : L / R;
      case '%':
        return R === 0 ? null : L % R;
      default:
        return null;
    }
  }
  return null;
}

function evalPrimitiveRhs(expr: string, state: SimState): string | number | boolean {
  const p = tryEvalPrimitiveRhs(expr, state);
  if (p !== null) return p;
  return expr.trim();
}

function evalReferenceRhs(expr: string, state: SimState): string | null {
  const t = expr.trim();
  if (t === 'null') return null;
  const n = parseNewExpr(t);
  if (n?.kind === 'array') {
    const len = evalArrayLength(n.sizeExpr, state);
    if (len === null) return null;
    return allocateArrayHeap(state, n.elementType, len);
  }
  if (n?.kind === 'ctor') {
    const args = splitArgs(n.rawArgs);
    return allocateHeap(state, n.className, args);
  }
  if (/^["']/.test(t)) {
    const lit = stripQuotes(t);
    return allocateHeap(state, 'String', [`"${lit}"`]);
  }
  const v = findStack(state, t);
  if (v?.type === 'reference') return v.refId ?? null;
  return null;
}

function tryEvalPrimitiveRhs(expr: string, state: SimState): string | number | boolean | null {
  const t = expr.trim();
  const dot = t.match(/^(\w+)\.(\w+)$/);
  if (dot) {
    const stat = findStaticVar(state, dot[1], dot[2]);
    if (stat !== undefined) return stat.value as string | number | boolean;
  }
  if (t === 'null') return null;
  if (parseNewExpr(t)) return null;
  if (/^[a-zA-Z_]\w*$/.test(t)) {
    const v = findStack(state, t);
    if (v?.type === 'primitive' && v.value !== undefined) return v.value as string | number | boolean;
  }
  const lit = parseLiteral(t);
  if (typeof lit === 'boolean' || typeof lit === 'number') return lit;
  if (typeof lit === 'string' && /^["']/.test(t)) return lit;
  const arith = tryEvalArithmeticExpression(t, state);
  if (arith !== null) return arith;
  return null;
}

function inferPrimitiveTypeFromRhs(rhs: string, state: SimState): string | null {
  const t = rhs.trim();
  if (parseNewExpr(t)) return null;
  const dot = t.match(/^(\w+)\.(\w+)$/);
  if (dot) {
    const stat = findStaticVar(state, dot[1], dot[2]);
    if (stat !== undefined) {
      const v = stat.value;
      if (typeof v === 'number') return Number.isInteger(v) ? 'int' : 'double';
      if (typeof v === 'boolean') return 'boolean';
      if (typeof v === 'string') return 'String';
    }
  }
  const lit = parseLiteral(t);
  if (typeof lit === 'number')
    return Number.isInteger(lit) && Math.abs(lit) <= 2147483647 ? 'int' : 'double';
  if (typeof lit === 'boolean') return 'boolean';
  if (typeof lit === 'string' && /^["']/.test(t)) return 'String';
  if (/^[a-zA-Z_]\w*$/.test(t)) {
    const v = findStack(state, t);
    if (v?.type === 'primitive' && typeof v.value === 'number') return 'int';
  }
  return null;
}

function executeDeclaration(
  state: SimState,
  isStatic: boolean,
  type: string,
  name: string,
  rhs: string | undefined,
) {
  const owner = state.currentClass;

  if (isStatic) {
    if (type === 'String') {
      const val = rhs !== undefined ? String(evalPrimitiveRhs(rhs, state)) : '';
      const row: StaticVariable = {
        id: `${owner}.${name}`,
        className: owner,
        name,
        value: val,
      };
      const i = state.staticArea.findIndex((s) => s.className === owner && s.name === name);
      if (i >= 0) state.staticArea[i] = row;
      else state.staticArea.push(row);
      return;
    }
    if (!PRIMITIVE_TYPES.has(type)) return;
    const val =
      rhs !== undefined ? evalPrimitiveRhs(rhs, state) : type === 'boolean' ? false : 0;
    const row: StaticVariable = {
      id: `${owner}.${name}`,
      className: owner,
      name,
      value: val as string | number | boolean,
    };
    const i = state.staticArea.findIndex((s) => s.className === owner && s.name === name);
    if (i >= 0) state.staticArea[i] = row;
    else state.staticArea.push(row);
    return;
  }

  if (PRIMITIVE_TYPES.has(type)) {
    let value: string | number | boolean = type === 'boolean' ? false : 0;
    if (rhs !== undefined) value = evalPrimitiveRhs(rhs, state);
    setStackVar(state, { id: name, name, type: 'primitive', value });
    return;
  }

  let refId: string | null = null;
  if (rhs !== undefined) refId = evalReferenceRhs(rhs, state);
  setStackVar(state, { id: name, name, type: 'reference', refId });
}

function executeAssignment(state: SimState, name: string, rhs: string) {
  const v = findStack(state, name);
  if (!v) return;
  if (v.type === 'primitive') {
    const prim = tryEvalPrimitiveRhs(rhs, state);
    if (prim !== null) setStackVar(state, { ...v, value: prim });
    return;
  }
  const refId = evalReferenceRhs(rhs, state);
  setStackVar(state, { ...v, refId });
}

/** `Foo` or `Foo<Bar>` before the variable name (single top-level generic segment). */
function matchTypedVariable(lhs: string): { type: string; name: string } | null {
  const m = lhs.trim().match(/^(\w+)(?:<[^>]*>)?\s+(\w+)$/);
  if (!m || !isTypeToken(m[1])) return null;
  return { type: m[1], name: m[2] };
}

/**
 * `recv.method( … balanced … )` with nothing after the closing `)`.
 * Supports e.g. `add("Ben")` and `add(new Foo(1, 2))`.
 */
function parseInstanceMethod(
  inner: string,
  method: string,
): { recv: string; argsInner: string } | null {
  const key = `.${method}(`;
  const idx = inner.indexOf(key);
  if (idx < 0) return null;
  const recv = inner.slice(0, idx);
  if (!/^\w+$/.test(recv)) return null;
  const openIdx = idx + key.length - 1;
  if (inner[openIdx] !== '(') return null;
  let depth = 0;
  for (let i = openIdx; i < inner.length; i++) {
    const c = inner[i];
    if (c === '(') depth++;
    else if (c === ')') {
      depth--;
      if (depth === 0) {
        if (inner.slice(i + 1).trim() !== '') return null;
        return { recv, argsInner: inner.slice(openIdx + 1, i).trim() };
      }
    }
  }
  return null;
}

function valueForArrayListElement(arg: string, state: SimState): string | number | boolean | null {
  const t = arg.trim();
  if (t === 'null') return null;
  if (/^["']/.test(t)) {
    const lit = parseLiteral(t);
    if (typeof lit === 'string') return `"${lit}"`;
  }
  const prim = tryEvalPrimitiveRhs(t, state);
  if (prim !== null) return prim;
  const ref = evalReferenceRhs(t, state);
  if (ref !== null) return `@${ref}`;
  return null;
}

function arrayListAdd(state: SimState, varName: string, arg: string): boolean {
  const sv = findStack(state, varName);
  if (!sv?.refId) return false;
  const obj = state.heap.find((h) => h.id === sv.refId);
  if (!obj || obj.className !== 'ArrayList') return false;
  const sizeF = obj.fields.find((f) => f.name === 'size');
  if (!sizeF || typeof sizeF.value !== 'number') return false;
  const size = sizeF.value;
  const val = valueForArrayListElement(arg, state);
  sizeF.value = size + 1;
  obj.fields.push({ name: `[${size}]`, value: val as string | number | boolean | null });
  return true;
}

function arrayListSet(state: SimState, varName: string, index: number, rhs: string): boolean {
  const sv = findStack(state, varName);
  if (!sv?.refId) return false;
  const obj = state.heap.find((h) => h.id === sv.refId);
  if (!obj || obj.className !== 'ArrayList') return false;
  const sizeF = obj.fields.find((f) => f.name === 'size');
  if (!sizeF || typeof sizeF.value !== 'number' || index < 0 || index >= sizeF.value) return false;
  const field = obj.fields.find((f) => f.name === `[${index}]`);
  if (!field) return false;
  field.value = valueForArrayListElement(rhs, state) as string | number | boolean | null;
  return true;
}

function arrayListRemoveAt(state: SimState, varName: string, index: number): boolean {
  const sv = findStack(state, varName);
  if (!sv?.refId) return false;
  const obj = state.heap.find((h) => h.id === sv.refId);
  if (!obj || obj.className !== 'ArrayList') return false;
  const sizeF = obj.fields.find((f) => f.name === 'size');
  if (!sizeF || typeof sizeF.value !== 'number') return false;
  const size = sizeF.value;
  if (index < 0 || index >= size) return false;
  const slots: (string | number | boolean | null)[] = [];
  for (let i = 0; i < size; i++) {
    const f = obj.fields.find((x) => x.name === `[${i}]`);
    slots.push((f?.value ?? null) as string | number | boolean | null);
  }
  slots.splice(index, 1);
  sizeF.value = size - 1;
  obj.fields = obj.fields.filter((f) => f.name === 'size' || !/^\[\d+\]$/.test(f.name));
  slots.forEach((v, i) => {
    obj.fields.push({ name: `[${i}]`, value: v });
  });
  return true;
}

function tryExecuteMethodCall(state: SimState, inner: string): boolean {
  const addP = parseInstanceMethod(inner, 'add');
  if (addP) {
    const args = splitArgs(addP.argsInner);
    if (args.length !== 1) return false;
    return arrayListAdd(state, addP.recv, args[0]);
  }
  const setP = parseInstanceMethod(inner, 'set');
  if (setP) {
    const parts = splitArgs(setP.argsInner);
    if (parts.length !== 2) return false;
    const idxLit = parts[0].trim().match(/^\d+$/);
    if (!idxLit) return false;
    return arrayListSet(state, setP.recv, parseInt(idxLit[0], 10), parts[1].trim());
  }
  const remP = parseInstanceMethod(inner, 'remove');
  if (remP) {
    const t = remP.argsInner.trim();
    const dig = t.match(/^\d+$/);
    if (dig) return arrayListRemoveAt(state, remP.recv, parseInt(dig[0], 10));
    const idx = evalArrayLength(t, state);
    if (idx !== null && idx >= 0) return arrayListRemoveAt(state, remP.recv, idx);
    return false;
  }
  return false;
}

function executeIndexedAssignment(state: SimState, arrayName: string, indexExpr: string, rhs: string) {
  const idx = evalArrayLength(indexExpr, state);
  if (idx === null || idx < 0) return;
  const sv = findStack(state, arrayName);
  if (!sv || sv.type !== 'reference' || !sv.refId) return;
  const obj = state.heap.find((h) => h.id === sv.refId);
  if (!obj || !obj.className.endsWith('[]')) return;
  const elType = obj.className.slice(0, -2);
  const field = obj.fields.find((f) => f.name === `[${idx}]`);
  if (!field) return;

  if (PRIMITIVE_TYPES.has(elType) || elType === 'boolean') {
    const prim = tryEvalPrimitiveRhs(rhs, state);
    if (prim !== null) field.value = prim;
    return;
  }
  const refId = evalReferenceRhs(rhs, state);
  field.value = refId === null ? null : `@${refId}`;
}

const SKIP_LINE =
  /^(package|import|public|private|protected|class|interface|enum|for|while|if|else|return|switch|case|default|try|catch|finally|@)\b/;

function shouldSkipLine(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (SKIP_LINE.test(t)) return true;
  if (/^\s*(\}|\{)\s*$/.test(t)) return true;
  if (t.startsWith('System.')) return true;
  return false;
}

function normalizeLine(line: string): string {
  let s = stripComments(line).trim();
  s = s.replace(/^\s*public\s+static\s+/, 'static ');
  s = s.replace(/^\s*private\s+static\s+/, 'static ');
  s = s.replace(/^\s*protected\s+static\s+/, 'static ');
  s = s.replace(/^\s*(public|private|protected)\s+/, '');
  s = s.replace(/^\s*final\s+/, '');
  return s;
}

function tryParseDeclaration(
  inner: string,
  state: SimState,
): { isStatic: boolean; type: string; name: string; rhs?: string } | null {
  let isStatic = false;
  let rest = inner.trim();
  if (rest.startsWith('static ')) {
    isStatic = true;
    rest = rest.slice(7).trim();
  }
  while (rest.startsWith('final ')) {
    rest = rest.slice(6).trim();
  }
  const eq = rest.indexOf('=');
  if (eq < 0) {
    const arrOnly = rest.match(/^(\w+)(\[\s*\])+\s+(\w+)$/);
    if (arrOnly && isTypeToken(arrOnly[1])) {
      return { isStatic, type: `${arrOnly[1]}[]`, name: arrOnly[3] };
    }
    const arrSuffix = rest.match(/^(\w+)\s+(\w+)(\[\s*\])+$/);
    if (arrSuffix && isTypeToken(arrSuffix[1])) {
      return { isStatic, type: `${arrSuffix[1]}[]`, name: arrSuffix[2] };
    }
    const tv = matchTypedVariable(rest);
    if (tv) return { isStatic, type: tv.type, name: tv.name };
    return null;
  }
  const lhs = rest.slice(0, eq).trim();
  const rhs = rest.slice(eq + 1).trim();
  if (isStatic && !/\s/.test(lhs)) {
    const inferred = inferPrimitiveTypeFromRhs(rhs, state);
    if (inferred) return { isStatic, type: inferred, name: lhs, rhs };
    return null;
  }
  const arrDecl = lhs.match(/^(\w+)(?:<[^>]*>)?(\[\s*\])+\s+(\w+)$/);
  if (arrDecl && isTypeToken(arrDecl[1])) {
    return { isStatic, type: `${arrDecl[1]}[]`, name: arrDecl[3], rhs };
  }
  const arrDeclSuffix = lhs.match(/^(\w+)(?:<[^>]*>)?\s+(\w+)(\[\s*\])+$/);
  if (arrDeclSuffix && isTypeToken(arrDeclSuffix[1])) {
    return { isStatic, type: `${arrDeclSuffix[1]}[]`, name: arrDeclSuffix[2], rhs };
  }
  const tv = matchTypedVariable(lhs);
  if (tv) return { isStatic, type: tv.type, name: tv.name, rhs };
  return null;
}

function executeLine(raw: string, state: SimState, braceDepthAtLineStart: number) {
  const rawTrim = stripComments(raw).trim();
  /** Top-level `class Name` only (avoids nested classes changing owner for static fields). */
  const classMatch = rawTrim.match(/^(?:public|private|protected)?\s*class\s+(\w+)\b/);
  if (classMatch && braceDepthAtLineStart === 0) {
    state.currentClass = classMatch[1];
  }

  const line = normalizeLine(raw);
  if (!line || shouldSkipLine(line)) return;
  if (!line.endsWith(';')) return;

  const inner = line.slice(0, -1).trim();

  const indexedAssign = inner.match(/^(\w+)\s*\[\s*([^\]]+?)\s*\]\s*=\s*(.+)$/);
  if (indexedAssign) {
    executeIndexedAssignment(state, indexedAssign[1], indexedAssign[2].trim(), indexedAssign[3].trim());
    return;
  }

  const decl = tryParseDeclaration(inner, state);
  if (decl) {
    executeDeclaration(state, decl.isStatic, decl.type, decl.name, decl.rhs);
    return;
  }

  if (tryExecuteMethodCall(state, inner)) return;

  const assign = inner.match(/^(\w+)\s*=\s*(.+)$/);
  if (assign) {
    executeAssignment(state, assign[1], assign[2].trim());
  }
}

export function simulateJavaMemoryUpTo(sourceLines: string[], upToInclusive: number): MemoryState {
  if (upToInclusive < 0) return emptyMemory();

  const state: SimState = {
    stack: [],
    heap: [],
    staticArea: [],
    heapCounter: 0,
    currentClass: 'Main',
  };

  let braceDepth = 0;
  for (let i = 0; i <= upToInclusive && i < sourceLines.length; i++) {
    executeLine(sourceLines[i], state, braceDepth);
    braceDepth += braceDelta(sourceLines[i]);
    if (braceDepth < 0) braceDepth = 0;
  }

  return cloneMemory(state);
}
