function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Insert `ClassName this` as the first formal parameter on every instance method, and on
 * constructors after `public ClassName(`.
 * Skips `static` members. Constructors are detected as `public ClassName(` with no space before `(`.
 */
function injectReceiverOnInstanceMethod(line: string, className: string): string {
  const head =
    /^(\s*(?:public|private|protected)\s+(?!static\b)(?:final\s+)?[A-Za-z_][\w.<>]*\s+\w+)\s*\(\s*/;
  const m = line.match(head);
  if (!m) return line;
  const consumed = m[0].length;
  const tail = line.slice(consumed);
  const trimmed = tail.trimStart();
  if (trimmed.startsWith(')')) {
    return `${m[1]}(${className} this)${trimmed.slice(1)}`;
  }
  return `${m[1]}(${className} this, ${tail}`;
}

export function applyImplicitThisSyntax(code: string, className: string): string {
  const lines = code.split('\n');
  const cn = escapeRe(className);
  return lines
    .map((line) => {
      if (/^\s*(?:public|private|protected)\s+static\b/.test(line)) return line;

      const ctorLead = new RegExp(`^(\\s*public\\s+)${cn}(\\s*\\(\\s*)`);
      if (ctorLead.test(line)) {
        return line.replace(ctorLead, `$1${className}$2${className} this, `);
      }

      return injectReceiverOnInstanceMethod(line, className);
    })
    .join('\n');
}

function braceDeltaLine(line: string): number {
  let d = 0;
  for (const c of line) {
    if (c === '{') d++;
    if (c === '}') d--;
  }
  return d;
}

/** Non-static instance fields (simple `Type name;` declarations in teaching snippets). */
export function extractInstanceFieldNames(javaSource: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of javaSource.split('\n')) {
    const m = line.match(
      /^\s*(?:private|public|protected)\s+(?!static\b)(?:final\s+)?[\w.<>]+\s+(\w+)\s*(?:=\s*[^;]+)?;\s*$/,
    );
    if (m && !seen.has(m[1])) {
      seen.add(m[1]);
      out.push(m[1]);
    }
  }
  return out;
}

/** Parameter names in `public ClassName(Type a, Type b)` (single line, raw Java — no synthetic receiver). */
function parseCtorParameterNames(ctorLine: string, className: string): string[] {
  const cn = escapeRe(className);
  const m = ctorLine.match(new RegExp(`^\\s*public\\s+${cn}\\s*\\(\\s*([^)]*)\\)`));
  if (!m) return [];
  const inner = m[1].trim();
  if (!inner) return [];
  const names: string[] = [];
  for (const part of inner.split(',')) {
    const seg = part.trim();
    if (!seg) continue;
    const tokens = seg.split(/\s+/);
    const last = tokens[tokens.length - 1];
    if (last && /^[a-zA-Z_]\w*$/.test(last)) names.push(last);
  }
  return names;
}

/** If true, do not auto-prefix fields inside the constructor (e.g. `this.name = name` stays in source). */
export function ctorShadowsInstanceField(
  rawLines: string[],
  className: string,
  fields: string[],
): boolean {
  const cn = escapeRe(className);
  for (const line of rawLines) {
    if (new RegExp(`^\\s*public\\s+${cn}\\s*\\(`).test(line)) {
      const params = parseCtorParameterNames(line, className);
      return params.some((p) => fields.includes(p));
    }
  }
  return false;
}

/**
 * `true` on lines inside instance methods or constructors where bare field names should become `this.field`.
 * Skips static methods. Skips constructor bodies when ctorShadowSkip (parameter shadows a field).
 * Uses brace depth after the opening `{` of each member (`bodyMinDepth`); `pending` handles `{` on the next line.
 */
export function computeInstanceBodyPrefixLines(
  lines: string[],
  className: string,
  _fields: string[],
  ctorShadowSkip: boolean,
): boolean[] {
  const n = lines.length;
  const prefix = new Array(n).fill(false);
  const cn = escapeRe(className);

  type Frame = { bodyMinDepth: number; skip: boolean };
  const stack: Frame[] = [];
  let pending: { skip: boolean } | null = null;

  let depth = 0;

  for (let i = 0; i < n; i++) {
    const line = lines[i];

    if (pending && line.includes('{')) {
      const depthAfter = depth + braceDeltaLine(line);
      stack.push({ bodyMinDepth: depthAfter, skip: pending.skip });
      pending = null;
    }

    if (stack.length > 0 && depth >= stack[stack.length - 1].bodyMinDepth) {
      if (!stack[stack.length - 1].skip) prefix[i] = true;
    }

    if (stack.length === 0 && depth === 1 && !pending) {
      const isStatic = /^\s*(?:public|private|protected)\s+static\b/.test(line);
      const isCtor = new RegExp(`^\\s*public\\s+${cn}\\s*\\(`).test(line);
      const isInst =
        !isStatic &&
        /^\s*(?:public|private|protected)\s+(?!static\b)(?:final\s+)?\w+\s+\w+\s*\(/.test(line);

      if (isStatic || isCtor || isInst) {
        const skip = isStatic ? true : isCtor ? ctorShadowSkip : false;
        if (line.includes('{')) {
          const depthAfter = depth + braceDeltaLine(line);
          stack.push({ bodyMinDepth: depthAfter, skip });
        } else {
          pending = { skip };
        }
      }
    }

    depth += braceDeltaLine(line);

    while (stack.length > 0 && depth < stack[stack.length - 1].bodyMinDepth) {
      stack.pop();
    }
  }

  return prefix;
}

/** Prefix bare field names inside the first `{ ... }` block that balances on this line (one-line methods). */
function prefixFieldsInFirstBalancedBlock(line: string, fieldNames: string[]): string {
  const open = line.indexOf('{');
  if (open < 0) return line;
  let d = 0;
  for (let i = open; i < line.length; i++) {
    if (line[i] === '{') d++;
    if (line[i] === '}') {
      d--;
      if (d === 0) {
        let inner = line.slice(open + 1, i);
        for (const f of fieldNames) {
          inner = inner.replace(new RegExp(`(?<!\\.)\\b${escapeRe(f)}\\b`, 'g'), `this.${f}`);
        }
        return line.slice(0, open + 1) + inner + line.slice(i);
      }
    }
  }
  return line;
}

function maybePrefixOneLineMethodBody(
  line: string,
  className: string,
  fieldNames: string[],
  ctorShadowSkip: boolean,
): string {
  if (fieldNames.length === 0 || braceDeltaLine(line) !== 0 || !line.includes('{')) return line;
  const cn = escapeRe(className);
  const isStatic = /^\s*(?:public|private|protected)\s+static\b/.test(line);
  if (isStatic) return line;
  const isCtor = new RegExp(`^\\s*public\\s+${cn}\\s*\\(`).test(line);
  const isInst =
    /^\s*(?:public|private|protected)\s+(?!static\b)(?:final\s+)?\w+\s+\w+\s*\(/.test(line);
  if (!isCtor && !isInst) return line;
  if (isCtor && ctorShadowSkip) return line;
  return prefixFieldsInFirstBalancedBlock(line, fieldNames);
}

function isInstanceFieldDeclarationLine(line: string): boolean {
  return /^\s*(?:private|public|protected)\s+(?!static\b)(?:final\s+)?[\w.<>]+\s+\w+\s*(?:=\s*[^;]+)?;\s*$/.test(line);
}

/**
 * After `applyImplicitThisSyntax`, prefix bare instance field reads/writes with `this.` inside instance/ctor bodies.
 */
export function prefixBareInstanceFieldsInTeaching(
  codeAfterSignatures: string,
  className: string,
  fieldNames: string[],
  rawSource: string,
): string {
  if (fieldNames.length === 0) return codeAfterSignatures;
  const lines = codeAfterSignatures.split('\n');
  const ctorShadowSkip = ctorShadowsInstanceField(rawSource.split('\n'), className, fieldNames);
  const doPrefix = computeInstanceBodyPrefixLines(lines, className, fieldNames, ctorShadowSkip);

  return lines
    .map((line, i) => {
      if (isInstanceFieldDeclarationLine(line)) return line;
      if (doPrefix[i]) {
        let out = line;
        for (const f of fieldNames) {
          out = out.replace(new RegExp(`(?<!\\.)\\b${escapeRe(f)}\\b`, 'g'), `this.${f}`);
        }
        return out;
      }
      return maybePrefixOneLineMethodBody(line, className, fieldNames, ctorShadowSkip);
    })
    .join('\n');
}

/** Full teaching transform: explicit receiver parameter + `this.` on instance fields where omitted in source. */
export function applyImplicitThisTeachingTransform(rawCode: string, className: string): string {
  const fields = extractInstanceFieldNames(rawCode);
  const sigs = applyImplicitThisSyntax(rawCode, className);
  return prefixBareInstanceFieldsInTeaching(sigs, className, fields, rawCode);
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Simple keyword coloring + highlighted `ClassName this` for the teaching overlay.
 * Keyword spans use class names (no `style="..."` double quotes): a later `"…"` regex
 * was matching inside those attributes and leaking fragments like `"color:#569cd6">`.
 */
export function javaLineToTeachingHtml(line: string, className: string): string {
  const re = new RegExp(`(${escapeRe(className)} this)`, 'g');
  const bits = line.split(re);
  const kw =
    /\b(public|private|protected|void|static|final|class|int|String|return|new|if|else|for|while)\b/g;
  const kw2 = /\b(this)\b/g;

  function paintPart(part: string): string {
    let s = escapeHtml(part);
    s = s.replace(kw, "<span class='java-teach-kw'>$1</span>");
    s = s.replace(kw2, "<span class='java-teach-kw'>$1</span>");
    return s;
  }

  return bits
    .map((bit, i) =>
      i % 2 === 1
        ? `<span class='java-teach-receiver'>${escapeHtml(bit)}</span>`
        : paintPart(bit),
    )
    .join('');
}
