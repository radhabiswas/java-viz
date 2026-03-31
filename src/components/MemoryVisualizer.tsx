import React, { useEffect, useRef, useState } from 'react';
import { MemoryState } from '../types';
import { motion } from 'motion/react';

/** Line = legend blue; head = white fill + blue rim (previous look) */
const REFERENCE_ARROW = {
  stroke: '#3b82f6',
  glow: 'rgba(59,130,246,0.22)',
  tipFill: '#eff6ff',
  tipEdge: '#1d4ed8',
} as const;

/** Snap to device pixels to align with the blue dots and box border */
function px(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Heap-internal refs: dot on the right of a row → target’s left edge, so x2 < x1.
 * A forward “bulge right” curve would swing into the Static column; instead pull left first,
 * drop with the vertical gap, then approach the target from the left (tighter “wrap”).
 */
function bezierBackwardWrapLink(x1: number, y1: number, x2: number, y2: number, fanY: number): string {
  const dy = y2 - y1;
  const spanX = x1 - x2;
  const pullLeft = Math.min(96, Math.max(22, spanX * 0.38 + 16));
  const c1x = x1 - pullLeft + fanY * 0.35;
  const vertStep = Math.sign(dy || 1) * Math.max(Math.min(Math.abs(dy) * 0.52, 200), 18);
  const c1y = y1 + vertStep;
  const leadIn = Math.min(40, Math.max(12, pullLeft * 0.5));
  const c2x = x2 - leadIn;
  const c2y = y2 + fanY * 0.85;
  return `M ${px(x1)} ${px(y1)} C ${px(c1x)} ${px(c1y)}, ${px(c2x)} ${px(c2y)}, ${px(x2)} ${px(y2)}`;
}

/**
 * Cubic Bézier for reference links. Default: near-horizontal arrival at the heap edge.
 * For large vertical offset (source far above/below target), extend lead-in and slightly
 * tilt the end handle so the terminal tangent matches the visible stroke (marker orient="auto").
 */
function bezierReferenceLink(x1: number, y1: number, x2: number, y2: number, fanY: number): string {
  // Right-side source → left-side target (typical heap→heap): wrap inside the heap column.
  if (x2 < x1 - 0.5) {
    return bezierBackwardWrapLink(x1, y1, x2, y2, fanY);
  }

  const dx = Math.max(x2 - x1, 8);
  const dy = y2 - y1;
  const dyAbs = Math.abs(dy);
  const steep = dyAbs > dx * 0.42;
  const leadOut = Math.min(92, Math.max(28, dx * 0.36));
  let leadIn = Math.min(84, Math.max(24, dx * 0.32));
  if (steep) {
    leadIn = Math.max(leadIn, Math.min(24 + dyAbs * 0.4, 118));
    leadIn = Math.min(leadIn, Math.max(dx - 8, 28));
  }
  const c1x = x1 + leadOut;
  const c1y = y1 + fanY * 0.62;
  const c2x = x2 - leadIn;
  let c2y = y2;
  if (steep) {
    const blend = Math.min(0.16, dyAbs / (dyAbs + dx));
    const nudge = (y1 - y2) * blend;
    const cap = 16;
    c2y = y2 + Math.max(-cap, Math.min(cap, nudge));
  }
  return `M ${px(x1)} ${px(y1)} C ${px(c1x)} ${px(c1y)}, ${px(c2x)} ${px(c2y)}, ${px(x2)} ${px(y2)}`;
}

/**
 * Heap→heap when a gutter lane exists: one wide cubic that bulges left (toward the gutter) instead of sharp elbows.
 * Both control points share a similar x so the stroke sweeps smoothly vertically, like stack→heap curves.
 */
function heapGutterSmoothPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  fanY: number,
  laneX: number,
): string {
  const dy = y2 - y1;
  const ady = Math.abs(dy);
  const gx = Math.min(laneX + 10 + fanY * 2.2, x2 - 12, x1 - 18);
  const spread = Math.min(0.48, Math.max(0.26, ady / (ady + 96)));
  const c1y = y1 + dy * spread + fanY * 14;
  const c2y = y2 - dy * spread + fanY * 11;
  return `M ${px(x1)} ${px(y1)} C ${px(gx)} ${px(c1y)}, ${px(gx)} ${px(c2y)}, ${px(x2)} ${px(y2)}`;
}

type ConnectionLine = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kind: 'stackToHeap' | 'heapToHeap';
  /** Precomputed SVG path (cubic Bézier). */
  pathD: string;
  /** heap: field row index; stack: among reference vars, 0..n-1 for curve fan-out */
  offsetIndex?: number;
  /** Same-target stack→heap arrows get staggered Y on the heap so paths do not merge */
  sameTargetIndex?: number;
  sameTargetCount?: number;
};

/**
 * Shared header: fixed block height so the border under Stack / Heap / Static lines up
 * when shown side-by-side.
 */
/** Target width for static cards from longest text segment (monospace `ch`). */
function staticCardWidthCh(stat: { className: string; name: string; value: string | number | boolean }): number {
  const v = String(stat.value);
  const longest = Math.max(stat.className.length, stat.name.length, v.length);
  return Math.min(36, Math.max(10, longest + 7));
}

function MemorySectionHeader({ title, tag, titleHint }: { title: string; tag: string; titleHint?: string }) {
  return (
    <div className="relative z-20 flex h-16 shrink-0 flex-col justify-end gap-1.5 border-b border-slate-200 bg-slate-50 pb-2.5 dark:border-slate-700 dark:bg-slate-900">
      <h4
        className="text-xs font-bold uppercase leading-tight tracking-[0.12em] text-slate-700 dark:text-slate-200"
        title={titleHint ?? title}
      >
        {title}
      </h4>
      <span
        className="inline-flex w-fit max-w-full items-center whitespace-normal rounded-full bg-slate-200/90 px-2.5 py-1 text-center text-[11px] font-medium leading-snug text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        title={tag.length > 20 ? tag : undefined}
      >
        {tag}
      </span>
    </div>
  );
}

export default function MemoryVisualizer({ state }: { state: MemoryState }) {
  /** Scrollport (padding, overflow) */
  const diagramRef = useRef<HTMLDivElement>(null);
  /** Intrinsic row: in-flow columns only — never use scrollWidth for SVG size (causes blank scroll) */
  const diagramContentRef = useRef<HTMLDivElement>(null);
  /** Line endpoints are drawn in this SVG’s user space — use its bbox as origin. */
  const diagramSvgRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<ConnectionLine[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const updateLines = () => {
      const parent = diagramRef.current;
      const contentBox = diagramContentRef.current;
      if (!parent || !contentBox) return;

      const newLines: ConnectionLine[] = [];
      const svgEl = diagramSvgRef.current;
      const svgB = svgEl?.getBoundingClientRect();
      const origin =
        svgB && svgB.width > 1 && svgB.height > 1 ? svgB : contentBox.getBoundingClientRect();
      const relX = (r: DOMRect) => r.left - origin.left;
      const relY = (r: DOMRect) => r.top - origin.top;

      const gutterEl = contentBox.querySelector<HTMLElement>('[data-memory-diagram-gutter]');
      const gutterLaneX = (() => {
        if (!gutterEl) return null;
        const gr = gutterEl.getBoundingClientRect();
        return px(relX(gr) + gr.width - 2);
      })();

      const stackRefs = state.stack.filter((v) => v.type === 'reference' && v.refId);
      const targetArity = new Map<string, number>();
      stackRefs.forEach((v) => {
        const id = v.refId as string;
        targetArity.set(id, (targetArity.get(id) ?? 0) + 1);
      });
      const targetSlot = new Map<string, number>();

      let stackRefIdx = 0;

      /** Outermost heap card — arrowheads meet the object box border, not the header strip */
      const heapCardEl = (refId: string) => document.getElementById(`heap-${refId}`);

      state.stack.forEach((variable) => {
        if (variable.type === 'reference' && variable.refId) {
          const sourceEl =
            contentBox.querySelector<HTMLElement>(`[data-memory-stack-dot="${variable.id}"]`) ??
            document.getElementById(`stack-${variable.id}`);
          const targetCard = heapCardEl(variable.refId);

          if (sourceEl && targetCard) {
            const sourceRect = sourceEl.getBoundingClientRect();
            const cardRect = targetCard.getBoundingClientRect();
            // Exact center of the reference dot (matches legend chip)
            const sx = relX(sourceRect) + sourceRect.width / 2;
            const sy = relY(sourceRect) + sourceRect.height / 2;
            const nSame = targetArity.get(variable.refId) ?? 1;
            const iSame = targetSlot.get(variable.refId) ?? 0;
            targetSlot.set(variable.refId, iSame + 1);
            const norm = nSame <= 1 ? 0 : iSame - (nSame - 1) / 2;
            const yStagger = norm * 6;
            // Outer left edge + vertical midline of heap card (border box from getBoundingClientRect)
            const tx = px(relX(cardRect));
            const ty = px(relY(cardRect) + cardRect.height / 2 + yStagger);
            const fanY = norm * 12;

            newLines.push({
              id: `${variable.id}-${variable.refId}`,
              x1: px(sx),
              y1: px(sy),
              x2: tx,
              y2: ty,
              kind: 'stackToHeap',
              pathD: bezierReferenceLink(px(sx), px(sy), tx, ty, fanY),
              offsetIndex: stackRefIdx++,
              sameTargetIndex: iSame,
              sameTargetCount: nSame,
            });
          }
        }
      });

      const heapTargetArity = new Map<string, number>();
      state.heap.forEach((obj) => {
        obj.fields.forEach((field) => {
          if (typeof field.value === 'string' && field.value.startsWith('@')) {
            const refId = field.value.substring(1);
            heapTargetArity.set(refId, (heapTargetArity.get(refId) ?? 0) + 1);
          }
        });
      });
      const heapTargetSlot = new Map<string, number>();

      state.heap.forEach((obj) => {
        obj.fields.forEach((field, idx) => {
          if (typeof field.value === 'string' && field.value.startsWith('@')) {
            const refId = field.value.substring(1);
            const sourceEl = document.getElementById(`heap-field-${obj.id}-${idx}`);
            const targetCard = heapCardEl(refId);

            if (sourceEl && targetCard) {
              const sourceRect = sourceEl.getBoundingClientRect();
              const cardRect = targetCard.getBoundingClientRect();
              const startX = relX(sourceRect) + sourceRect.width / 2;
              const startY = relY(sourceRect) + sourceRect.height / 2;
              const nSame = heapTargetArity.get(refId) ?? 1;
              const iSame = heapTargetSlot.get(refId) ?? 0;
              heapTargetSlot.set(refId, iSame + 1);
              const norm = nSame <= 1 ? 0 : iSame - (nSame - 1) / 2;
              const yStagger = norm * 6;
              const endX = px(relX(cardRect));
              const endY = px(relY(cardRect) + cardRect.height / 2 + yStagger);
              const sx0 = px(startX);
              const sy0 = px(startY);
              const fanY = norm * 12;
              const useGutterLane =
                gutterLaneX !== null && gutterLaneX + 0.5 < Math.min(sx0, endX);
              const pathD = useGutterLane
                ? heapGutterSmoothPath(sx0, sy0, endX, endY, fanY, gutterLaneX)
                : bezierBackwardWrapLink(sx0, sy0, endX, endY, fanY);

              newLines.push({
                id: `${obj.id}-${idx}-${refId}`,
                x1: sx0,
                y1: sy0,
                x2: endX,
                y2: endY,
                kind: 'heapToHeap',
                pathD,
                offsetIndex: idx,
                sameTargetIndex: iSame,
                sameTargetCount: nSame,
              });
            }
          }
        });
      });

      setLines(newLines);
      setSvgSize({
        w: contentBox.offsetWidth,
        h: Math.max(1, contentBox.offsetHeight),
      });
    };

    const timeout = setTimeout(() => {
      updateLines();
      requestAnimationFrame(() => updateLines());
    }, 72);
    window.addEventListener('resize', updateLines);
    const parent = diagramRef.current;
    const contentBox = diagramContentRef.current;
    parent?.addEventListener('scroll', updateLines, { passive: true });
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            requestAnimationFrame(updateLines);
          })
        : null;
    if (parent) ro?.observe(parent);
    if (contentBox) ro?.observe(contentBox);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateLines);
      parent?.removeEventListener('scroll', updateLines);
      ro?.disconnect();
    };
  }, [state]);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 [&_.memory-diagram-scroll]:[scrollbar-width:thin]">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-slate-200/80 px-4 py-3.5 dark:border-slate-800">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          Memory State
        </h3>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500 shadow-sm ring-2 ring-blue-500/25"
              aria-hidden
            />
            <span className="font-medium">
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">reference</span>{' '}
              <span className="text-slate-500 dark:text-slate-400">type</span>
            </span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 shadow-sm ring-2 ring-green-500/25"
              aria-hidden
            />
            <span className="font-medium">
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">primitive</span>{' '}
              <span className="text-slate-500 dark:text-slate-400">type</span>
            </span>
          </div>
        </div>
      </div>

      {/*
        Columns first (z-10), then SVG (z-18) so arrow markers sit on top of cards.
        Content row uses w-full so Stack / Heap / Static share panel width; overflow-x-auto remains for very narrow viewports.
      */}
      <div
        ref={diagramRef}
        className="memory-diagram-scroll relative min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto overscroll-x-contain px-3 py-3 pb-5 pr-4"
      >
        <div ref={diagramContentRef} className="relative w-full min-w-0">
          {/*
            Fill the panel width: fractional stack/heap + narrow gutter for curves + auto static from content.
            Avoid w-max + wide minmax caps so Static stays on-screen without horizontal scroll on typical widths.
          */}
          <div className="relative z-10 grid w-full min-w-0 grid-cols-[minmax(0,1.1fr)_minmax(2.25rem,2.75rem)_minmax(0,1fr)_auto] items-stretch gap-x-2">
        <section className="flex min-w-0 flex-col gap-2">
          <MemorySectionHeader title="Stack" tag="Variables" />
          <div className="flex min-h-0 flex-1 flex-col items-start gap-1.5">
            {state.stack.map((variable) => (
              <motion.div
                key={variable.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-20 flex w-full min-w-0 max-w-full items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm transition-colors hover:border-teal-400/80 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-teal-500/60"
              >
                <div
                  className="min-w-0 max-w-[45%] shrink truncate font-mono text-xs font-semibold leading-snug text-slate-800 dark:text-slate-100 sm:max-w-[55%]"
                  title={variable.name || variable.id}
                >
                  {variable.name || variable.id || '—'}
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-end border-l border-slate-200/90 pl-2 dark:border-slate-600">
                  {variable.type === 'primitive' ? (
                    <span
                      className="min-w-0 max-w-[min(100%,6.5rem)] truncate rounded-md bg-emerald-50 px-1.5 py-0.5 text-right font-mono text-xs font-bold tabular-nums leading-none text-emerald-800 dark:bg-emerald-900/45 dark:text-emerald-300"
                      title={String(variable.value ?? '')}
                    >
                      {variable.value?.toString()}
                    </span>
                  ) : (
                    <div className="flex justify-end pr-0.5">
                      {variable.refId === null ? (
                        <span className="font-mono text-xs italic text-slate-500 dark:text-slate-400">
                          null
                        </span>
                      ) : (
                        <div
                          id={`stack-${variable.id}`}
                          data-memory-stack-dot={variable.id}
                          className="relative z-30 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500 shadow-sm ring-2 ring-blue-500/25 dark:bg-blue-500"
                          aria-hidden
                        />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {state.stack.length === 0 && (
              <div className="relative z-20 flex min-h-[5.5rem] items-center justify-center whitespace-normal rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs italic leading-relaxed text-slate-500 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-400">
                Stack is empty
              </div>
            )}
          </div>
        </section>

        {/* Lane for orthogonal heap→heap routes (left of heap column, avoids crossing cards) */}
        <div className="min-h-0 min-w-0" aria-hidden data-memory-diagram-gutter />

        <section className="flex min-h-0 min-w-0 flex-col gap-2" data-memory-heap-column>
          <MemorySectionHeader title="Heap" tag="Objects" />
          <div className="flex min-h-0 flex-1 flex-col gap-2">
            {state.heap.map((obj) => (
              <motion.div
                key={obj.id}
                id={`heap-${obj.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-20 rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-600 dark:bg-slate-800"
              >
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/50">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                    <span className="truncate font-mono text-sm font-bold text-slate-800 dark:text-slate-100">
                      {obj.className}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-md bg-slate-200 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    @{obj.id}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-3">
                  {obj.fields.map((field, idx) => {
                    const isRef = typeof field.value === 'string' && field.value.startsWith('@');
                    return (
                      <div
                        key={idx}
                        className="flex min-h-0 flex-row items-start justify-between gap-2 rounded-md border border-slate-100 bg-slate-50/50 p-2 text-xs dark:border-slate-800/50 dark:bg-slate-900/20"
                      >
                        <span className="shrink-0 font-mono font-medium text-slate-600 dark:text-slate-400">
                          {field.name}
                        </span>
                        {isRef ? (
                          <div
                            id={`heap-field-${obj.id}-${idx}`}
                            className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.45)] ring-2 ring-blue-500/25"
                          />
                        ) : (
                          <span className="min-w-0 max-w-[68%] text-right font-mono text-xs font-bold leading-snug text-slate-800 break-words [overflow-wrap:anywhere] dark:text-slate-200">
                            {field.value === null ? (
                              <span className="font-normal italic text-slate-400">null</span>
                            ) : (
                              field.value.toString()
                            )}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
            {state.heap.length === 0 && (
              <div className="relative z-20 flex min-h-[5.5rem] items-center justify-center whitespace-normal rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs italic leading-relaxed text-slate-500 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-400">
                Heap is empty
              </div>
            )}
          </div>
        </section>

        <section className="flex min-w-0 max-w-full flex-col gap-2">
          <MemorySectionHeader
            title="Static"
            tag="Class-level"
            titleHint="Static area — class-level variables"
          />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col items-stretch gap-2">
            {state.staticArea.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ width: `${staticCardWidthCh(stat)}ch`, maxWidth: '100%' }}
                className="relative z-20 flex min-w-0 max-w-full items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-600 dark:bg-slate-800"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.className}
                  </span>
                  <span className="truncate font-mono text-xs font-bold text-slate-800 dark:text-slate-100">
                    {stat.name}
                  </span>
                </div>
                <div className="h-7 w-px shrink-0 bg-slate-200 dark:bg-slate-700" />
                <div className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 font-mono text-xs font-bold tabular-nums text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {stat.value.toString()}
                </div>
              </motion.div>
            ))}
            {state.staticArea.length === 0 && (
              <div className="relative z-20 flex min-h-[4.25rem] items-center justify-center whitespace-normal rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-2 py-2.5 text-center text-[11px] italic leading-snug text-slate-500 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-400">
                No static variables
              </div>
            )}
          </div>
        </section>
          </div>

          {/* Above column panels so stroke markers (arrowheads) are not covered by heap/stack cards */}
          <svg
            ref={diagramSvgRef}
            className="pointer-events-none absolute left-0 top-0 z-[18] block overflow-visible"
            style={{ shapeRendering: 'geometricPrecision' }}
            width={Math.max(svgSize.w, 1)}
            height={Math.max(svgSize.h, 1)}
            aria-hidden
          >
            <defs>
              <marker
                id="mem-arrow-ref"
                markerUnits="userSpaceOnUse"
                markerWidth="16"
                markerHeight="16"
                refX="15"
                refY="8"
                orient="auto"
                overflow="visible"
              >
                <path
                  d="M1 1.8 L15 8 L1 14.2 Z"
                  fill={REFERENCE_ARROW.tipFill}
                  stroke={REFERENCE_ARROW.tipEdge}
                  strokeWidth="1.15"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            {lines.map((line) => {
              const pathD = line.pathD;

              return (
                <g key={line.id}>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    d={pathD}
                    fill="none"
                    stroke={REFERENCE_ARROW.glow}
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* No pathLength here — animated dash trims break markerEnd in several browsers */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    d={pathD}
                    fill="none"
                    stroke={REFERENCE_ARROW.stroke}
                    strokeWidth="2.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd="url(#mem-arrow-ref)"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
