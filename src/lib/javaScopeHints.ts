import type { CSSProperties } from 'react';

/** Inclusive 0-based line indices of statements inside main's `{` … `}` (between braces). */
export type MainBodyInnerRange = { startLine: number; endLine: number };

const JAVA_STMT_KEYWORD = new Set([
  'if',
  'for',
  'while',
  'return',
  'else',
  'try',
  'catch',
  'throw',
  'switch',
  'case',
  'default',
  'do',
  'break',
  'continue',
  'synchronized',
  'assert',
]);

/** Matches `void main( … String … args … )` even when split across lines (Prettier / wrapped params). */
const MAIN_SIG =
  /void\s+main\s*\(\s*String\s*(?:\[\s*\]|\.\.\.)\s*args\s*\)/m;

/**
 * Locates `main(String[] args)` and returns inner body line range.
 * Brace matching starts from the first `{` after the signature (nested blocks inside main are handled).
 */
export function findMainBodyInnerRange(lines: string[]): MainBodyInnerRange | null {
  const text = lines.join('\n');
  const m = text.match(MAIN_SIG);
  if (!m || m.index === undefined) return null;

  const matchStartLine = text.slice(0, m.index).split('\n').length - 1;

  let depth = 0;
  let started = false;
  let openBraceLine = -1;

  for (let i = matchStartLine; i < lines.length; i++) {
    const line = lines[i];
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '{') {
        depth++;
        if (depth === 1) openBraceLine = i;
        started = true;
      } else if (ch === '}') {
        depth--;
        if (started && depth === 0 && openBraceLine >= 0) {
          const closeLine = i;
          const startLine = openBraceLine + 1;
          const endLine = closeLine - 1;
          if (startLine > endLine) return null;
          return { startLine, endLine };
        }
      }
    }
  }
  return null;
}

const DECL_LINE =
  /^\s*(?:final\s+)?((?:byte|short|int|long|float|double|boolean|char)\b(?:\[\])?|String|\w+(?:<[^>]+>)?)\s+([a-zA-Z_][\w]*)\s*(?:=|\(|;)/;

/** First declaration line per local name inside the main body (best-effort for lesson-style Java). */
export function localDeclarationsInRange(lines: string[], range: MainBodyInnerRange): Map<string, number> {
  const map = new Map<string, number>();
  for (let i = range.startLine; i <= range.endLine; i++) {
    const m = lines[i].match(DECL_LINE);
    if (!m) continue;
    const typeRaw = m[1].replace(/\s+/g, ' ').trim();
    const typeHead = typeRaw.split(/[<\s]/)[0] ?? typeRaw;
    if (JAVA_STMT_KEYWORD.has(typeHead)) continue;
    const name = m[2];
    if (!map.has(name)) map.set(name, i);
  }
  return map;
}

const SCOPE_LANE_COLORS = [
  'rgba(45, 212, 191, 0.92)',
  'rgba(129, 140, 248, 0.9)',
  'rgba(244, 114, 182, 0.88)',
  'rgba(251, 191, 36, 0.88)',
  'rgba(52, 211, 153, 0.88)',
  'rgba(96, 165, 250, 0.9)',
] as const;

const SCOPE_LANE_FAINT = [
  'rgba(45, 212, 191, 0.35)',
  'rgba(129, 140, 248, 0.34)',
  'rgba(244, 114, 182, 0.32)',
  'rgba(251, 191, 36, 0.3)',
  'rgba(52, 211, 153, 0.32)',
  'rgba(96, 165, 250, 0.34)',
] as const;

export const METHOD_SCOPE_TINT = 'rgba(139, 92, 246, 0.16)';
export const METHOD_SCOPE_TINT_GUTTER = 'rgba(139, 92, 246, 0.22)';

export type ScopeLane = {
  name: string;
  declLine: number;
  scopeEndLine: number;
  laneIndex: number;
};

function lineInMainBody(lineIndex: number, inner: MainBodyInnerRange | null): boolean {
  if (!inner) return false;
  return lineIndex >= inner.startLine && lineIndex <= inner.endLine;
}

function laneStops(
  lineIndex: number,
  lanes: ScopeLane[],
  codeLine: number,
): { stops: string[]; totalW: number } {
  const stripW = 5;
  const gap = 1;
  const active: { x: number; color: string }[] = [];
  const faint: { x: number; color: string }[] = [];

  for (const lane of lanes) {
    if (lineIndex < lane.declLine || lineIndex > lane.scopeEndLine) continue;
    const x = lane.laneIndex * (stripW + gap);
    if (codeLine < 0) {
      faint.push({ x, color: SCOPE_LANE_FAINT[lane.laneIndex % SCOPE_LANE_FAINT.length] });
    } else if (lineIndex <= codeLine) {
      active.push({ x, color: SCOPE_LANE_COLORS[lane.laneIndex % SCOPE_LANE_COLORS.length] });
    } else {
      faint.push({ x, color: SCOPE_LANE_FAINT[lane.laneIndex % SCOPE_LANE_FAINT.length] });
    }
  }

  const maxLane = lanes.length ? Math.max(...lanes.map((l) => l.laneIndex)) : -1;
  const totalW = maxLane >= 0 ? (maxLane + 1) * (stripW + gap) + 6 : 0;

  const stops: string[] = [];
  const addStrip = (x: number, color: string) => {
    const a = x;
    const b = x + stripW;
    stops.push(`${color} ${a}px`, `${color} ${b}px`, `transparent ${b}px`);
  };
  for (const s of active) addStrip(s.x, s.color);
  for (const s of faint) addStrip(s.x, s.color);

  return { stops, totalW };
}

/**
 * Full-line background (often partially covered by Prism token backgrounds).
 */
export function scopeLineStyle(
  lineIndex: number,
  inner: MainBodyInnerRange | null,
  lanes: ScopeLane[],
  codeLine: number,
): CSSProperties | undefined {
  const inMethod = lineInMainBody(lineIndex, inner);
  const { stops, totalW } = laneStops(lineIndex, lanes, codeLine);

  const laneGradient =
    stops.length > 0
      ? `linear-gradient(to right, ${stops.join(', ')}, transparent ${totalW}px)`
      : null;

  if (inMethod && laneGradient) {
    return {
      backgroundImage: `${laneGradient}, linear-gradient(to right, ${METHOD_SCOPE_TINT}, ${METHOD_SCOPE_TINT})`,
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundSize: `${totalW}px 100%, 100% 100%`,
    };
  }
  if (laneGradient) {
    return {
      backgroundImage: laneGradient,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${totalW}px 100%`,
    };
  }
  if (inMethod) {
    return { backgroundColor: METHOD_SCOPE_TINT };
  }
  return undefined;
}

/**
 * Line-number column: stripes stay visible even when token spans hide the code line background.
 */
export function scopeGutterStyle(
  lineIndex: number,
  inner: MainBodyInnerRange | null,
  lanes: ScopeLane[],
  codeLine: number,
): CSSProperties | undefined {
  const inMethod = lineInMainBody(lineIndex, inner);
  const { stops, totalW } = laneStops(lineIndex, lanes, codeLine);

  const laneGradient =
    stops.length > 0
      ? `linear-gradient(to right, ${stops.join(', ')}, transparent ${totalW}px)`
      : null;

  if (inMethod && laneGradient) {
    return {
      backgroundImage: `${laneGradient}, linear-gradient(to right, ${METHOD_SCOPE_TINT_GUTTER}, ${METHOD_SCOPE_TINT_GUTTER})`,
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundSize: `${totalW}px 100%, 100% 100%`,
      borderRadius: '4px',
    };
  }
  if (laneGradient) {
    return {
      backgroundImage: laneGradient,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${totalW}px 100%`,
      borderRadius: '4px',
    };
  }
  if (inMethod) {
    return { backgroundColor: METHOD_SCOPE_TINT_GUTTER, borderRadius: '4px' };
  }
  return undefined;
}

/**
 * Lifetime lanes for locals declared in main: every variable declared at or before the current step line.
 * (Stack names alone missed variables or broke when the diagram used different labels.)
 */
/** When focusing one local, collapse to a single gutter strip (laneIndex 0). */
export function filterScopeLanesForFocus(lanes: ScopeLane[], focus: 'all' | string): ScopeLane[] {
  if (focus === 'all' || focus === '') return lanes;
  const hit = lanes.filter((l) => l.name === focus);
  if (hit.length === 0) return lanes;
  return hit.map((l) => ({ ...l, laneIndex: 0 }));
}

export function buildScopeLanes(
  lines: string[],
  codeLine: number,
): { inner: MainBodyInnerRange | null; lanes: ScopeLane[] } {
  const inner = findMainBodyInnerRange(lines);
  if (!inner) return { inner: null, lanes: [] };

  const decls = localDeclarationsInRange(lines, inner);
  const sorted = [...decls.entries()].sort((a, b) => a[1] - b[1]);
  const lanes: ScopeLane[] = [];
  let laneIndex = 0;

  for (const [name, declLine] of sorted) {
    if (codeLine >= 0 && codeLine < declLine) continue;
    lanes.push({
      name,
      declLine,
      scopeEndLine: inner.endLine,
      laneIndex: laneIndex++,
    });
  }

  return { inner, lanes };
}
