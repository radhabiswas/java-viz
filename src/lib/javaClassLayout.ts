import type { CSSProperties } from 'react';

export type ClassSectionKind =
  | 'instanceFields'
  | 'staticFields'
  | 'constructors'
  | 'staticMethods'
  | 'accessors'
  | 'mutators'
  | 'instanceMethods';

export const CLASS_SECTION_LABEL: Record<ClassSectionKind, string> = {
  instanceFields: 'Instance variables',
  staticFields: 'Static variables',
  constructors: 'Constructors',
  staticMethods: 'Static methods',
  accessors: 'Accessor methods',
  mutators: 'Mutator methods',
  instanceMethods: 'Other instance methods',
};

const SECTION_TINT: Record<ClassSectionKind, string> = {
  instanceFields: 'rgba(148, 163, 184, 0.085)',
  staticFields: 'rgba(129, 140, 248, 0.09)',
  constructors: 'rgba(251, 191, 36, 0.08)',
  staticMethods: 'rgba(167, 139, 250, 0.09)',
  accessors: 'rgba(52, 211, 153, 0.08)',
  mutators: 'rgba(251, 113, 133, 0.08)',
  instanceMethods: 'rgba(34, 211, 238, 0.07)',
};

export type AccessLevel = 'public' | 'private' | 'protected' | 'package';

export type ClassLineLayout = {
  section: ClassSectionKind;
  sectionStart: boolean;
  ribbonLabel: string;
  access: AccessLevel;
  showAccessBadge: boolean;
};

function stripTrailingComment(line: string): string {
  return line.replace(/\/\/.*$/, '').trim();
}

function braceDelta(line: string): number {
  let d = 0;
  for (const ch of line) {
    if (ch === '{') d++;
    else if (ch === '}') d--;
  }
  return d;
}

function parseAccess(t: string): AccessLevel {
  if (/\bpublic\b/.test(t)) return 'public';
  if (/\bprivate\b/.test(t)) return 'private';
  if (/\bprotected\b/.test(t)) return 'protected';
  return 'package';
}

/** Instance/static method: explicit return type (or void) before name; requires space before `(`. */
const METHOD_HEADER =
  /^\s*(?:@\w+(?:\([^)]*\))?\s+)*(?:(?:public|private|protected)\s+)?(?:(?:abstract|static|final|synchronized|native|strictfp)\s+)*(?:<[^>]+>\s+)?([\w.<>,?\[\]]+)\s+(\w+)\s*\([^)]*\)\s*(?:throws\s+[\w.,\s]+)?\s*\{?\s*$/;

const FIELD_LIKE =
  /^\s*(?:@\w+(?:\([^)]*\))?\s+)*(?:(?:public|private|protected)\s+)?(?:(?:static|final|volatile)\s+)*([\w.<>,?\[\]\s]+?)\s+(\w+)\s*(=[^;]*)?;\s*$/;

function classifyMember(
  trimmed: string,
  className: string,
): { kind: ClassSectionKind; showAccessBadge: boolean } | null {
  if (!trimmed || trimmed === '}' || trimmed.startsWith('}')) return null;
  if (/^\s*\{\s*$/.test(trimmed)) return null;

  const ctorRe = new RegExp(
    `^\\s*(?:@\\w+(?:\\([^)]*\\))?\\s+)*(?:(?:public|private|protected)\\s+)?${className}\\s*\\([^)]*\\)\\s*(?:throws\\s+[\\w.,\\s]+)?\\s*\\{?\\s*$`,
  );
  if (ctorRe.test(trimmed)) {
    return { kind: 'constructors', showAccessBadge: true };
  }

  const mh = trimmed.match(METHOD_HEADER);
  if (mh) {
    const ret = mh[1].replace(/\s+/g, ' ').trim();
    const name = mh[2];
    const isStatic = /\bstatic\b/.test(trimmed);
    if (name === className) {
      return { kind: 'constructors', showAccessBadge: true };
    }
    if (isStatic) {
      return { kind: 'staticMethods', showAccessBadge: true };
    }
    if (/^get[A-Z]\w*/.test(name) && ret !== 'void') {
      return { kind: 'accessors', showAccessBadge: true };
    }
    if (/^is[A-Z]\w*/.test(name) && /\bboolean\b/.test(ret)) {
      return { kind: 'accessors', showAccessBadge: true };
    }
    if (/^set[A-Z]\w*/.test(name) && ret === 'void') {
      return { kind: 'mutators', showAccessBadge: true };
    }
    return { kind: 'instanceMethods', showAccessBadge: true };
  }

  const fh = trimmed.match(FIELD_LIKE);
  if (fh) {
    const isStatic = /\bstatic\b/.test(trimmed);
    return {
      kind: isStatic ? 'staticFields' : 'instanceFields',
      showAccessBadge: true,
    };
  }

  return null;
}

export type ClassLayoutParseResult = {
  className: string;
  byLine: Map<number, ClassLineLayout>;
};

export function parseJavaClassLayout(source: string): ClassLayoutParseResult | null {
  const lines = source.split('\n');
  const classLineIdx = lines.findIndex((l) => /\bclass\s+(\w+)\b/.test(l));
  if (classLineIdx < 0) return null;
  const cn = lines[classLineIdx].match(/\bclass\s+(\w+)\b/)?.[1];
  if (!cn) return null;
  const className = cn;

  let depth = 0;
  for (let k = 0; k < classLineIdx; k++) {
    depth += braceDelta(lines[k]);
  }

  let innerMemberDepth: number | null = null;
  const byLine = new Map<number, ClassLineLayout>();
  let lastKind: ClassSectionKind | null = null;

  for (let i = classLineIdx; i < lines.length; i++) {
    const line = lines[i];
    const d0 = depth;

    if (innerMemberDepth === null && line.includes('{')) {
      innerMemberDepth = d0 + 1;
    }

    if (innerMemberDepth !== null && d0 === innerMemberDepth) {
      const trimmed = stripTrailingComment(line);
      const classified = classifyMember(trimmed, className);
      if (classified) {
        const sectionStart = classified.kind !== lastKind;
        lastKind = classified.kind;
        const access = parseAccess(trimmed);
        byLine.set(i, {
          section: classified.kind,
          sectionStart,
          ribbonLabel: CLASS_SECTION_LABEL[classified.kind],
          access,
          showAccessBadge: classified.showAccessBadge,
        });
      }
    }

    depth += braceDelta(line);

    if (innerMemberDepth !== null && depth < innerMemberDepth) {
      break;
    }
  }

  if (byLine.size === 0) return null;
  return { className, byLine };
}

const ACCESS_GLYPH: Record<AccessLevel, string> = {
  public: '+',
  private: '−',
  protected: '#',
  package: '~',
};

export function classLayoutLineStyle(
  lineIndex: number,
  layout: ClassLayoutParseResult | null,
): CSSProperties | undefined {
  if (!layout) return undefined;
  const meta = layout.byLine.get(lineIndex);
  if (!meta) return undefined;
  return { backgroundColor: SECTION_TINT[meta.section] };
}

export function classLayoutLineTitle(layout: ClassLayoutParseResult | null, lineIndex: number): string | undefined {
  if (!layout) return undefined;
  const meta = layout.byLine.get(lineIndex);
  if (!meta || !meta.showAccessBadge) return undefined;
  const g = ACCESS_GLYPH[meta.access];
  const accLabel = meta.access === 'package' ? 'package-private' : meta.access;
  return `${meta.ribbonLabel} · ${accLabel} (${g})`;
}

export function classLayoutDataAttrs(
  layout: ClassLayoutParseResult | null,
  lineIndex: number,
): Record<string, string> {
  if (!layout) return {};
  const meta = layout.byLine.get(lineIndex);
  if (!meta?.sectionStart) return {};
  return { 'data-section-ribbon': meta.ribbonLabel };
}

export function classLayoutLineClassNames(layout: ClassLayoutParseResult | null, lineIndex: number): string {
  if (!layout) return '';
  const meta = layout.byLine.get(lineIndex);
  if (!meta) return '';
  const acc =
    meta.access === 'public'
      ? 'cv-access-pub'
      : meta.access === 'private'
        ? 'cv-access-priv'
        : meta.access === 'protected'
          ? 'cv-access-prot'
          : 'cv-access-pkg';
  const ribbon = meta.sectionStart ? 'cv-section-ribbon' : '';
  return ['relative', acc, ribbon].filter(Boolean).join(' ');
}
