import { Fragment, createElement, type ReactNode } from 'react';

/**
 * Renders `**bold**` spans in lesson step copy (trusted curriculum text only).
 */
export function stepDescriptionToReactNodes(text: string): ReactNode {
  const re = /\*\*([\s\S]*?)\*\*/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      createElement(
        'strong',
        {
          key: `b-${k++}`,
          className: 'font-semibold text-slate-900 dark:text-slate-100',
        },
        m[1],
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  if (nodes.length === 0) return text;
  if (nodes.length === 1 && typeof nodes[0] === 'string') return nodes[0];
  return createElement(Fragment, null, ...nodes);
}
