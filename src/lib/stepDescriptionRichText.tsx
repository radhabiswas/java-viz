import { Fragment, createElement, type ReactNode } from 'react';
import { cn } from './utils';

const CODE_CLASS =
  'rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] font-normal text-slate-800 dark:bg-slate-800 dark:text-slate-200';

/** Inline emphasis — medium weight so lists are not “all bold”. */
const STRONG_CLASS = 'font-medium text-slate-800 dark:text-slate-200';

function splitByCode(s: string): { type: 'text' | 'code'; value: string }[] {
  const out: { type: 'text' | 'code'; value: string }[] = [];
  const re = /`([^`\n]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push({ type: 'text', value: s.slice(last, m.index) });
    out.push({ type: 'code', value: m[1] });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ type: 'text', value: s.slice(last) });
  if (out.length === 0) out.push({ type: 'text', value: s });
  return out;
}

function parseBoldInText(s: string, keyBase: number): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /\*\*([\s\S]*?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = keyBase;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) nodes.push(s.slice(last, m.index));
    nodes.push(
      createElement('strong', { key: `b-${k++}`, className: STRONG_CLASS }, m[1]),
    );
    last = m.index + m[0].length;
  }
  if (last < s.length) nodes.push(s.slice(last));
  return nodes;
}

/**
 * Renders trusted curriculum text: `` `code` `` (monospace, light panel) and `**emphasis**` (medium weight).
 */
export function stepDescriptionToReactNodes(text: string): ReactNode {
  const segs = splitByCode(text);
  const nodes: ReactNode[] = [];
  let k = 0;
  for (const seg of segs) {
    if (seg.type === 'code') {
      nodes.push(createElement('code', { key: `c-${k++}`, className: CODE_CLASS }, seg.value));
    } else if (seg.value) {
      nodes.push(...parseBoldInText(seg.value, k));
      k += 32;
    }
  }
  if (nodes.length === 0) return text;
  if (nodes.length === 1) return nodes[0];
  return createElement(Fragment, null, ...nodes);
}

const BULLET_PREFIX = /^\s*[•\u2022\-–]\s+/;

function blockIsBulletList(lines: string[]): boolean {
  const content = lines.map((l) => l.trim()).filter(Boolean);
  return content.length >= 1 && content.every((l) => BULLET_PREFIX.test(l));
}

/** Single-line `**Title**` → section label (no double-bold wrapping). */
function blockIsFencedTitle(block: string): string | null {
  const t = block.trim();
  if (t.includes('\n')) return null;
  const m = t.match(/^\*\*(.+)\*\*$/);
  return m ? m[1] : null;
}

/**
 * Step / sheet copy: splits on blank lines into paragraphs; consecutive `•` / `-` lines become a list.
 * Single-line `**...**` blocks render as a left-accent heading.
 */
export function StepDescription({
  text,
  className,
}: {
  text: string;
  className?: string;
}): ReactNode {
  const blocks = text.trim().split(/\n\n+/).filter(Boolean);
  return (
    <div className={cn('space-y-2.5', className)}>
      {blocks.map((block, bi) => {
        const rawLines = block.split('\n');
        const lines = rawLines.map((l) => l.trimEnd());
        const contentLines = lines.map((l) => l.trim()).filter(Boolean);

        const titleOnly = blockIsFencedTitle(block);
        if (titleOnly != null) {
          return (
            <p
              key={bi}
              className="border-l-[3px] border-sky-500 pl-2.5 text-sm font-semibold tracking-tight text-sky-950 dark:border-sky-400 dark:text-sky-50"
            >
              {titleOnly}
            </p>
          );
        }

        if (blockIsBulletList(lines)) {
          return (
            <ul
              key={bi}
              className="list-disc space-y-1.5 pl-5 text-[inherit] marker:text-slate-400 dark:marker:text-slate-500"
            >
              {contentLines.map((ln, li) => {
                const stripped = ln.replace(BULLET_PREFIX, '').trim();
                return (
                  <li
                    key={li}
                    className="leading-snug text-slate-700 dark:text-slate-300 [&_code]:text-[11px] [&_strong]:text-slate-900 dark:[&_strong]:text-slate-100"
                  >
                    {stepDescriptionToReactNodes(stripped)}
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={bi} className="whitespace-pre-line leading-snug text-slate-700 first:mt-0 dark:text-slate-300">
            {stepDescriptionToReactNodes(block.trim())}
          </p>
        );
      })}
    </div>
  );
}
