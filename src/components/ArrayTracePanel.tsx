import React, { type ReactNode } from 'react';
import type { ArrayTraceMarker, ArrayTraceMarkerKind, ArrayTraceView } from '../types';
import { cn } from '../lib/utils';

/** Default text above a cell when the lesson step did not set a custom label. */
const KIND_TAG: Record<ArrayTraceMarkerKind, string> = {
  lo: 'Low',
  hi: 'High',
  mid: 'Mid',
  i: 'i',
  j: 'j',
  minIdx: 'Min index',
  key: 'Key',
  swap: 'Swap',
  compare: 'Compare',
  sortedThrough: 'In order',
};

const KIND_CELL: Record<ArrayTraceMarkerKind, string> = {
  lo: 'ring-2 ring-blue-500/90 bg-blue-50 dark:bg-blue-950/45 shadow-sm',
  hi: 'ring-2 ring-violet-500/90 bg-violet-50 dark:bg-violet-950/45 shadow-sm',
  mid: 'ring-2 ring-amber-500/90 bg-amber-50 dark:bg-amber-950/45 shadow-sm',
  i: 'ring-2 ring-cyan-500/85 bg-cyan-50 dark:bg-cyan-950/40 shadow-sm',
  j: 'ring-2 ring-fuchsia-500/85 bg-fuchsia-50 dark:bg-fuchsia-950/40 shadow-sm',
  minIdx: 'ring-2 ring-orange-500/90 bg-orange-50 dark:bg-orange-950/40 shadow-sm',
  key: 'ring-2 ring-rose-500/90 bg-rose-50 dark:bg-rose-950/45 shadow-sm',
  swap: 'ring-2 ring-red-500/90 bg-red-50 dark:bg-red-950/35 shadow-sm',
  compare: 'ring-2 ring-slate-400 bg-slate-100 dark:bg-slate-800/80 shadow-sm',
  sortedThrough: 'bg-emerald-100/90 dark:bg-emerald-950/35',
};

function markersForCell(
  bandId: string,
  index: number,
  markers: ArrayTraceMarker[],
): { kind: ArrayTraceMarkerKind; label?: string }[] {
  const m = markers.filter((x) => {
    if (x.index !== index) return false;
    if (x.bandId != null) return x.bandId === bandId;
    return true;
  });
  return m.map((x) => ({ kind: x.kind, label: x.label }));
}

function sortedThroughMax(markers: ArrayTraceMarker[]): number | null {
  const s = markers.filter((m) => m.kind === 'sortedThrough');
  if (s.length === 0) return null;
  return Math.max(...s.map((m) => m.index));
}

/** One dominant ring so overlapping markers (e.g. mid on lo) don’t stack conflicting classes. */
function primaryMarkerKind(markers: { kind: ArrayTraceMarkerKind }[]): ArrayTraceMarkerKind | null {
  const order: ArrayTraceMarkerKind[] = [
    'swap',
    'compare',
    'mid',
    'minIdx',
    'key',
    'j',
    'i',
    'hi',
    'lo',
  ];
  for (const k of order) {
    if (markers.some((m) => m.kind === k)) return k;
  }
  return null;
}

function markerKindsInTrace(markers: ArrayTraceMarker[]): Set<ArrayTraceMarkerKind> {
  return new Set(markers.map((m) => m.kind));
}

function arrayViewLegend(kinds: Set<ArrayTraceMarkerKind>, layout: ArrayTraceView['layout']): ReactNode {
  const hasSearch = ['lo', 'hi', 'mid'].some((k) => kinds.has(k as ArrayTraceMarkerKind));
  const hasLoopMarkers = kinds.has('i') || kinds.has('j') || kinds.has('minIdx') || kinds.has('key');
  const hasSortedPrefix = kinds.has('sortedThrough');
  const hasSwap = kinds.has('swap');
  const hasCompare = kinds.has('compare');

  const rows: { key: string; node: ReactNode }[] = [];

  if (layout === 'grid2d') {
    rows.push({
      key: 'grid',
      node: (
        <>
          Values are laid out by <strong>row</strong> and <strong>column</strong>, the same way{' '}
          <code className="rounded bg-slate-200/80 px-0.5 font-mono text-[10px] dark:bg-slate-700/80">grid[r][c]</code>{' '}
          is indexed in the code. Header <strong>r</strong> is row, <strong>c</strong> is column.
        </>
      ),
    });
    if (hasSortedPrefix) {
      rows.push({
        key: 'grid-green',
        node: (
          <>
            <strong className="text-emerald-800 dark:text-emerald-200">Green</strong> cells are already part of the
            traversal in this step.
          </>
        ),
      });
    }
  }

  if (hasSearch) {
    rows.push({
      key: 'search',
      node: (
        <>
          <strong>Binary search:</strong> colored cells show which part of the array is still in play — the{' '}
          <strong>low</strong> and <strong>high</strong> ends of the range and the <strong>middle</strong> slot being
          tested.
        </>
      ),
    });
  }

  if (hasLoopMarkers && layout !== 'grid2d') {
    rows.push({
      key: 'loops',
      node: (
        <>
          <strong>Variable tags</strong> match names from the code so you can see which index or value the current line
          is using — often <strong>i</strong> or <strong>j</strong> for positions, sometimes <strong>min index</strong> or{' '}
          <strong>key</strong> when the lesson defines them.
        </>
      ),
    });
  }

  if (hasSwap) {
    rows.push({
      key: 'swap',
      node: (
        <>
          <strong>Red outline</strong> marks the two positions that trade values in this step.
        </>
      ),
    });
  }

  if (hasCompare) {
    rows.push({
      key: 'compare',
      node: (
        <>
          Small text above a cell is a <strong>hint</strong> for that step (for example “less than target” or which side
          wins a comparison).
        </>
      ),
    });
  }

  if (rows.length === 0) {
    rows.push({
      key: 'default',
      node: (
        <>
          Highlights show which indices matter for the <strong>current</strong> line of the walkthrough.
        </>
      ),
    });
  }

  if (layout !== 'grid2d' && hasSortedPrefix) {
    rows.push({
      key: '1d-green',
      node: (
        <>
          <strong className="text-emerald-800 dark:text-emerald-200">Green background</strong> means that part of the
          array is already in sorted order for this algorithm.
        </>
      ),
    });
  }

  return (
    <span className="flex flex-col gap-1.5">
      {rows.map(({ key, node }) => (
        <span key={key} className="block">
          {node}
        </span>
      ))}
    </span>
  );
}

function grid2dVisitedKeys(markers: ArrayTraceMarker[]): Set<string> {
  const keys = new Set<string>();
  for (const m of markers) {
    if (m.kind !== 'sortedThrough' || m.bandId == null) continue;
    keys.add(`${m.bandId}:${m.index}`);
  }
  return keys;
}

function Grid2DTraceView({ trace }: { trace: ArrayTraceView }) {
  const bands = trace.bands;
  const maxCols = Math.max(1, ...bands.map((b) => b.values.length));
  const visited = grid2dVisitedKeys(trace.markers);

  return (
    <div className="inline-block min-w-0 max-w-full">
      <div
        className="grid gap-x-1.5 gap-y-2 sm:gap-x-2"
        style={{
          gridTemplateColumns: `minmax(2.75rem,auto) repeat(${maxCols}, minmax(2.75rem, 1fr))`,
        }}
      >
        <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500" aria-hidden />
        {Array.from({ length: maxCols }, (_, c) => (
          <div
            key={`hc-${c}`}
            className="text-center font-mono text-[10px] font-bold tabular-nums text-slate-500 dark:text-slate-400"
          >
            c={c}
          </div>
        ))}
        {bands.map((band, ri) => (
          <React.Fragment key={band.id}>
            <div className="flex items-center font-mono text-[10px] font-bold tabular-nums text-slate-600 dark:text-slate-300">
              r={ri}
            </div>
            {Array.from({ length: maxCols }, (_, ci) => {
              const val = band.values[ci];
              const hasVal = ci < band.values.length;
              const cellMarkers = hasVal ? markersForCell(band.id, ci, trace.markers) : [];
              const nonSortedMarkers = cellMarkers.filter((m) => m.kind !== 'sortedThrough');
              const primaryKind = primaryMarkerKind(nonSortedMarkers);
              const primaryClass = primaryKind ? KIND_CELL[primaryKind] : '';
              const isVisited = hasVal && visited.has(`${band.id}:${ci}`);

              if (!hasVal) {
                return (
                  <div
                    key={`${band.id}-pad-${ci}`}
                    className="min-h-[3.25rem] rounded-lg border border-dashed border-slate-200/60 bg-slate-50/30 dark:border-slate-700/50 dark:bg-slate-900/20"
                  />
                );
              }

              return (
                <div key={`${band.id}-${ci}`} className="flex flex-col items-center gap-1">
                  <div className="flex min-h-[1.25rem] items-center justify-center">
                    {nonSortedMarkers.length > 0 ? (
                      <span className="max-w-[8rem] text-center font-mono text-[9px] font-semibold leading-tight tracking-tight text-slate-600 normal-case dark:text-slate-300">
                        {nonSortedMarkers
                          .map((m) => (m.label != null && m.label !== '' ? m.label : KIND_TAG[m.kind]))
                          .join(' · ')}
                      </span>
                    ) : null}
                  </div>
                  <div
                    className={cn(
                      'flex w-full min-w-[2.5rem] max-w-[4.5rem] flex-col items-center rounded-lg border border-slate-200/90 bg-slate-50 px-1.5 py-2 dark:border-slate-700 dark:bg-slate-800/80',
                      isVisited && primaryKind !== 'swap' ? KIND_CELL.sortedThrough : '',
                      primaryClass,
                    )}
                  >
                    <span className="font-mono text-base font-bold tabular-nums text-slate-900 dark:text-slate-50">
                      {String(val)}
                    </span>
                    <span className="mt-0.5 text-center font-mono text-[9px] font-semibold leading-tight text-slate-500 dark:text-slate-400">
                      ({ri},{ci})
                    </span>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function ArrayTracePanel({
  trace,
  compact = false,
}: {
  trace: ArrayTraceView | undefined;
  /** Tighter chrome for design phase when the diagram should use most of the column. */
  compact?: boolean;
}) {
  if (!trace || trace.bands.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div
          className={cn(
            'border-b border-slate-200 dark:border-slate-800',
            compact ? 'px-3 py-2' : 'px-4 py-3',
          )}
        >
          <h3
            className={cn(
              'font-extrabold tracking-tight text-slate-800 dark:text-slate-100',
              compact ? 'text-base' : 'text-lg',
            )}
          >
            Array view
          </h3>
        </div>
        <div
          className={cn(
            'flex flex-1 items-center justify-center text-center text-slate-500 dark:text-slate-400',
            compact ? 'px-3 py-4 text-xs' : 'px-4 py-8 text-sm',
          )}
        >
          No array diagram for this step yet — step forward or back.
        </div>
      </div>
    );
  }

  const sortedMax = sortedThroughMax(trace.markers);
  const layout = trace.layout ?? 'bands';

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div
        className={cn(
          'shrink-0 border-b border-slate-200 dark:border-slate-800',
          compact ? 'px-3 py-2' : 'px-4 py-3',
        )}
      >
        <h3
          className={cn(
            'font-extrabold tracking-tight text-slate-800 dark:text-slate-100',
            compact ? 'text-base' : 'text-lg',
          )}
        >
          Array view
        </h3>
        {trace.caption ? (
          <p
            className={cn(
              'font-medium leading-snug text-slate-600 dark:text-slate-400',
              compact ? 'mt-0.5 text-[11px]' : 'mt-1 text-xs leading-relaxed',
            )}
          >
            {trace.caption}
          </p>
        ) : null}
      </div>
      <div className={cn('min-h-0 flex-1 overflow-auto', compact ? 'p-3' : 'p-4')}>
        {layout === 'grid2d' ? (
          <Grid2DTraceView trace={trace} />
        ) : (
        <div className={cn('flex flex-col', compact ? 'gap-4' : 'gap-6')}>
          {trace.bands.map((band) => (
            <div key={band.id}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {band.label}
              </p>
              <div className="flex flex-wrap items-start gap-1 sm:gap-1.5">
                {band.values.map((val, idx) => {
                  const cellMarkers = markersForCell(band.id, idx, trace.markers);
                  const isSortedPrefix = sortedMax !== null && idx <= sortedMax && band.id === trace.bands[0]?.id;
                  const nonSortedMarkers = cellMarkers.filter((m) => m.kind !== 'sortedThrough');
                  const primaryKind = primaryMarkerKind(nonSortedMarkers);
                  const primaryClass = primaryKind ? KIND_CELL[primaryKind] : '';
                  return (
                    <div key={`${band.id}-${idx}`} className="flex flex-col items-center gap-1">
                      <div className="flex min-h-[1.25rem] items-center justify-center">
                        {nonSortedMarkers.length > 0 ? (
                          <span className="max-w-[8rem] text-center font-mono text-[9px] font-semibold leading-tight tracking-tight text-slate-600 normal-case dark:text-slate-300">
                            {nonSortedMarkers
                              .map((m) =>
                                m.label != null && m.label !== '' ? m.label : KIND_TAG[m.kind],
                              )
                              .join(' · ')}
                          </span>
                        ) : null}
                      </div>
                      <div
                        className={cn(
                          'flex min-w-[2.5rem] flex-col items-center rounded-lg border border-slate-200/90 bg-slate-50 px-2 py-2 dark:border-slate-700 dark:bg-slate-800/80',
                          isSortedPrefix && primaryKind !== 'swap' ? KIND_CELL.sortedThrough : '',
                          primaryClass,
                        )}
                      >
                        <span className="font-mono text-base font-bold tabular-nums text-slate-900 dark:text-slate-50">
                          {String(val)}
                        </span>
                        <span className="mt-0.5 font-mono text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          [{idx}]
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        )}
        <div
          className={cn(
            'leading-relaxed text-slate-500 dark:text-slate-400',
            compact ? 'mt-2 text-[10px]' : 'mt-4 text-[11px]',
          )}
          role="note"
        >
          {arrayViewLegend(markerKindsInTrace(trace.markers), layout)}
        </div>
      </div>
    </div>
  );
}
