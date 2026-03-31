import React from 'react';
import { cn } from '../lib/utils';
import type { RecursionUnwindStyle } from '../lib/controlFlowInference';

const FWD = '#0d9488';
const FWD_DIM = 'rgba(13,148,136,0.35)';
const BACK = '#7c3aed';

type Props = {
  /** Used for accessibility only. */
  methodName: string;
  nValues: number[];
  activeArgs: Set<number>;
  idPrefix: string;
  stackDepth: number;
  forwardEdgeCount: number;
  returnEdgeCount: number;
  /** Violet return arcs + labels; null = no labeled unwind. */
  unwindStyle: RecursionUnwindStyle | null;
  showFinalReturn: boolean;
  finalReturnValue: number | null;
};

function forwardEdgeCaption(
  nValues: number[],
  edgeFromIndex: number,
  methodName: string,
): string {
  const L = nValues.length;
  const baseN = L > 0 ? nValues[L - 1] : null;
  const nextN = nValues[edgeFromIndex + 1];
  if (baseN === 0 && nextN === 0) return `n ≠ 0 → ${methodName}(0)`;
  if (baseN === 1 && nextN === 1) return `n > 1 → ${methodName}(1)`;
  if (baseN === 1) return 'n > 1 → recurse';
  if (baseN === 0) return 'n ≠ 0 → recurse';
  return 'recurse';
}

/** Arrow tip at local (sx,0); ref aligns tip to path end. userSpaceOnUse avoids strokeWidth scaling bugs. */
function markerDefs(idPrefix: string) {
  const fwd = `${idPrefix}-fwd-head`;
  const back = `${idPrefix}-back-head`;
  return (
    <defs>
      <marker
        id={fwd}
        markerUnits="userSpaceOnUse"
        markerWidth="9"
        markerHeight="9"
        refX="8"
        refY="4.5"
        orient="auto"
      >
        <path d="M0,0.5 L8,4.5 L0,8.5 Z" fill={FWD} />
      </marker>
      <marker
        id={back}
        markerUnits="userSpaceOnUse"
        markerWidth="9"
        markerHeight="9"
        refX="8"
        refY="4.5"
        orient="auto"
      >
        <path d="M0,0.5 L8,4.5 L0,8.5 Z" fill={BACK} />
      </marker>
    </defs>
  );
}

/**
 * Vertical chain: only nodes for frames currently on stack (grows on descent, shrinks on unwind).
 * Teal ↓ forward calls; violet ↑ returns (one arc per unwind step when labels are known).
 */
export default function RecursionFlowDiagram({
  methodName,
  nValues,
  activeArgs,
  idPrefix,
  stackDepth,
  forwardEdgeCount,
  returnEdgeCount,
  unwindStyle,
  showFinalReturn,
  finalReturnValue,
}: Props) {
  const fullL = nValues.length;
  const V = Math.max(0, stackDepth);
  const visible = V > 0 ? nValues.slice(0, V) : [];

  const r = 16;
  const cx = 84;
  /** Gap between circle edges ≈ vStep − 2r so teal shafts stay visible (not just arrowheads). */
  const vStep = 52;
  const leftCurve = 46;
  const labelPadRight = 96;

  const topPad = showFinalReturn && finalReturnValue != null && V > 0 ? 40 : 12;
  const cy = (i: number) => topPad + r + i * vStep;

  const bottomPad = 44;
  const bodyBottom =
    V > 0 ? cy(V - 1) + r : topPad + 2 * r;
  const h = bodyBottom + bottomPad;
  const w = leftCurve + cx + labelPadRight;

  const returnLabels = unwindStyle?.labels ?? [];
  const combineOp = unwindStyle?.combineOp ?? '×';
  const baseN = fullL > 0 ? nValues[fullL - 1] : null;
  const fwdMarker = `${idPrefix}-fwd-head`;
  const backMarker = `${idPrefix}-back-head`;

  if (V === 0) {
    return (
      <div className="flex min-h-[5.5rem] w-full min-w-0 items-center justify-center rounded-lg border border-dashed border-slate-300/90 bg-slate-50/50 px-3 py-4 dark:border-slate-600 dark:bg-slate-900/30">
        <p className="text-center text-[11px] font-medium leading-snug text-slate-600 dark:text-slate-400">
          Diagram builds as frames appear on the stack — step forward to start{' '}
          <span className="font-mono text-slate-800 dark:text-slate-200">{methodName}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full max-h-[min(52vh,22rem)] max-w-full"
        role="img"
        aria-label={`Recursion flow for ${methodName}`}
      >
        {markerDefs(idPrefix)}

        {Array.from({ length: V - 1 }, (_, i) => {
          const y1 = cy(i) + r;
          const y2 = cy(i + 1) - r;
          const len = Math.max(y2 - y1, 6);
          const y2a = y1 + len;
          const isActive = i < forwardEdgeCount;
          return (
            <line
              key={`fwd-${i}`}
              x1={cx}
              y1={y1}
              x2={cx}
              y2={y2a}
              stroke={isActive ? FWD : FWD_DIM}
              strokeWidth={isActive ? 2.25 : 1.25}
              strokeDasharray={isActive ? undefined : '4 5'}
              markerEnd={isActive ? `url(#${fwdMarker})` : undefined}
            />
          );
        })}

        {Array.from({ length: V - 1 }, (_, i) => {
          const midY = (cy(i) + cy(i + 1)) / 2;
          const isActive = i < forwardEdgeCount;
          return (
            <text
              key={`fcap-${i}`}
              x={cx + r + 6}
              y={midY + 3}
              className={cn(
                'text-[8px] font-semibold leading-tight',
                isActive ? 'fill-teal-800 dark:fill-teal-200' : 'fill-slate-500 dark:fill-slate-500',
              )}
            >
              {forwardEdgeCaption(nValues, i, methodName)}
            </text>
          );
        })}

        {unwindStyle &&
          returnLabels.map((label, b) => {
            if (b >= returnEdgeCount) return null;
            const iDeep = fullL - 1 - b;
            const iShallow = fullL - 2 - b;
            if (iShallow < 0 || iShallow >= V) return null;

            const xC = cx - leftCurve;
            const xAttach = cx + r * 0.32;
            let pathD: string;
            let tx: number;
            let ty: number;

            if (iDeep < V) {
              const xR = xAttach;
              const yR = cy(iDeep) - r * 0.32;
              const yL = cy(iShallow) + r * 0.32;
              const midY = (yR + yL) / 2;
              pathD = `M ${xR} ${yR} Q ${xC} ${midY} ${xAttach} ${yL}`;
              tx = xC - 4;
              ty = midY;
            } else {
              const bot = V - 1;
              const yBelow = cy(bot) + r + 14;
              const yL = cy(iShallow) + r * 0.32;
              const midY = (yBelow + yL) / 2;
              const xM = cx - leftCurve * 0.55;
              pathD = `M ${xM} ${yBelow} Q ${xC} ${midY} ${xAttach} ${yL}`;
              tx = xC - 4;
              ty = midY;
            }

            const prevN = nValues[iShallow];
            const opChar = combineOp === '+' ? '+' : '×';
            const labelW = combineOp === '+' ? 92 : 80;
            return (
              <g key={`ret-${b}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={BACK}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd={`url(#${backMarker})`}
                />
                <rect
                  x={tx - labelW / 2}
                  y={ty - 9}
                  width={labelW}
                  height={18}
                  rx={4}
                  className="fill-white/95 dark:fill-slate-900/95"
                  stroke={BACK}
                  strokeOpacity={0.4}
                  strokeWidth={0.75}
                />
                <text
                  x={tx}
                  y={ty + 4}
                  textAnchor="middle"
                  className="fill-violet-800 text-[8px] font-mono font-bold tabular-nums dark:fill-violet-200"
                >
                  {prevN} {opChar} ret = {label}
                </text>
              </g>
            );
          })}

        {visible.map((n, i) => {
          const active = activeArgs.has(n);
          return (
            <g key={`n-${i}-${n}`}>
              <circle
                cx={cx}
                cy={cy(i)}
                r={r}
                className={cn(
                  'transition-[stroke,fill] duration-200',
                  active
                    ? 'fill-teal-100 stroke-amber-500 dark:fill-teal-950/70 dark:stroke-amber-400'
                    : 'fill-white stroke-slate-300 dark:fill-slate-800/90 dark:stroke-slate-500',
                )}
                strokeWidth={active ? 2.5 : 1.65}
              >
                {active ? (
                  <title>
                    Active call: innermost frame on the stack (matches Memory bottom entry)
                  </title>
                ) : null}
              </circle>
              <text
                x={cx}
                y={cy(i) + 4}
                textAnchor="middle"
                className="fill-slate-900 text-[12px] font-mono font-bold tabular-nums dark:fill-slate-100"
              >
                {n}
              </text>
              {baseN !== null && n === baseN ? (
                <text
                  x={cx + r + 6}
                  y={cy(i) + 3}
                  className="fill-slate-600 text-[8px] font-semibold dark:text-slate-400"
                >
                  {baseN === 1 ? 'base (n = 1)' : 'base'}
                </text>
              ) : null}
            </g>
          );
        })}

        {showFinalReturn && finalReturnValue != null && V > 0 && (
          <g>
            <line
              x1={cx}
              y1={cy(0) - r - 2}
              x2={cx}
              y2={16}
              stroke={BACK}
              strokeWidth={2}
              strokeLinecap="round"
              markerEnd={`url(#${backMarker})`}
            />
            <rect
              x={cx - 44}
              y={2}
              width={88}
              height={18}
              rx={6}
              className="fill-white dark:fill-slate-900"
              stroke={BACK}
              strokeOpacity={0.45}
              strokeWidth={0.75}
            />
            <text
              x={cx}
              y={15}
              textAnchor="middle"
              className="fill-violet-900 text-[9px] font-mono font-bold tabular-nums dark:fill-violet-100"
            >
              to caller: {finalReturnValue}
            </text>
          </g>
        )}

        <text x={10} y={h - 6} className="fill-slate-500 text-[8px] font-medium dark:fill-slate-400">
          Teal ↓ calls · violet ↑ returns (+ or × from base)
        </text>
      </svg>
    </div>
  );
}
