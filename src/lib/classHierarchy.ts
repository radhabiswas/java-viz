import type { ClassHierarchyEntry, CodeFile } from '../types';

const CLASS_RE =
  /(?:public\s+|protected\s+)?class\s+(\w+)\s*(?:extends\s+(\w+))?(?:\s+implements\s+([\w\s,.]+))?/;

function entryFromClassMatch(m: RegExpMatchArray, fileName?: string): ClassHierarchyEntry {
  const [, name, ext, implRaw] = m;
  const implementsList = implRaw
    ? implRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;
  return {
    className: name,
    ...(fileName ? { file: fileName } : {}),
    extends: ext ?? null,
    implements: implementsList?.length ? implementsList : undefined,
  };
}

/** First `class` declaration in source (works when `import` lines precede the type). */
export function inferClassHierarchyFromSource(code: string): ClassHierarchyEntry[] | null {
  const m = code.match(CLASS_RE);
  if (!m) return null;
  return [entryFromClassMatch(m)];
}

export function inferClassHierarchyFromFiles(files: CodeFile[]): ClassHierarchyEntry[] | null {
  const entries: ClassHierarchyEntry[] = [];
  for (const f of files) {
    if (!f.name.endsWith('.java')) continue;
    const m = f.code.match(CLASS_RE);
    if (!m) continue;
    entries.push(entryFromClassMatch(m, f.name));
  }
  if (entries.length === 0) return null;
  return entries;
}

export function inheritanceRelevantEntries(entries: ClassHierarchyEntry[]): ClassHierarchyEntry[] {
  const extended = new Set(entries.map((e) => e.extends).filter(Boolean) as string[]);
  const filtered = entries.filter((e) => {
    if (e.className === 'Main') return false;
    if (e.extends) return true;
    if (extended.has(e.className)) return true;
    return false;
  });
  if (filtered.length > 0) return filtered;
  /** One public class, no `extends` (typical FRQ) — still show Object → type. */
  return entries.filter((e) => e.className !== 'Main');
}

export type HierarchyDisplayRow = {
  name: string;
  file?: string;
  implements?: string[];
  /** java.lang.Object or synthetic root */
  implicit?: boolean;
  depth: number;
};

/** Single inheritance chain: Object → … → most derived (lesson-sized graphs). */
export function buildHierarchyRows(
  explicit: ClassHierarchyEntry[] | undefined,
  files: CodeFile[] | undefined,
  /** When there are no `files`, parse this (e.g. `lesson.code`) for a single-class FRQ. */
  fallbackSourceCode?: string,
): HierarchyDisplayRow[] {
  let raw: ClassHierarchyEntry[] | null = null;
  if (explicit?.length) raw = explicit;
  else {
    const fromFiles = inferClassHierarchyFromFiles(files ?? []);
    if (fromFiles?.length) raw = fromFiles;
    else if (fallbackSourceCode?.trim()) raw = inferClassHierarchyFromSource(fallbackSourceCode);
  }
  const rel = raw ? inheritanceRelevantEntries(raw) : [];
  if (rel.length === 0) return [];

  const byName = new Map(rel.map((e) => [e.className, e]));
  const appearsAsParent = new Set(rel.map((e) => e.extends).filter(Boolean) as string[]);

  const leaves = rel.filter((e) => !appearsAsParent.has(e.className));
  const start = leaves[0] ?? rel[0];
  if (!start) return [];

  const chain: ClassHierarchyEntry[] = [];
  let cur: ClassHierarchyEntry | undefined = start;
  const guard = new Set<string>();
  while (cur && !guard.has(cur.className)) {
    guard.add(cur.className);
    chain.unshift(cur);
    const p = cur.extends;
    cur = p ? byName.get(p) : undefined;
  }

  const rows: HierarchyDisplayRow[] = [
    { name: 'Object', implicit: true, depth: 0 },
  ];
  chain.forEach((e, i) => {
    rows.push({
      name: e.className,
      file: e.file,
      implements: e.implements,
      depth: i + 1,
    });
  });

  return rows;
}
