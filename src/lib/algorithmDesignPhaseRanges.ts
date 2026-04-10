import type { AlgorithmDesignMeta } from '../types';

export type DesignPhaseRange = {
  label: string;
  start: number;
  endExclusive: number;
};

/** Phase rows for steps with index `< implStart` (design / walkthrough before implementation). */
export function buildDesignPhaseRanges(
  meta: AlgorithmDesignMeta | undefined,
  implStart: number,
): DesignPhaseRange[] | null {
  if (meta == null || meta.phaseStarts.length === 0) return null;
  const designPhases = [...meta.phaseStarts].filter((p) => p.at < implStart).sort((a, b) => a.at - b.at);
  if (designPhases.length === 0) return null;
  return designPhases.map((ph, i) => ({
    label: ph.label,
    start: ph.at,
    endExclusive: i + 1 < designPhases.length ? designPhases[i + 1].at : implStart,
  }));
}

export function phaseContextForStep(
  phaseRanges: DesignPhaseRange[],
  stepIndex: number,
): {
  phaseIndex: number;
  range: DesignPhaseRange;
  withinPhaseDisplay: number;
  withinPhaseTotal: number;
} {
  let phaseIndex = 0;
  for (let i = 0; i < phaseRanges.length; i++) {
    const r = phaseRanges[i];
    if (stepIndex >= r.start && stepIndex < r.endExclusive) {
      phaseIndex = i;
      break;
    }
  }
  const range = phaseRanges[phaseIndex] ?? phaseRanges[0];
  const withinPhaseTotal = Math.max(1, range.endExclusive - range.start);
  const withinPhaseDisplay = stepIndex - range.start + 1;
  return { phaseIndex, range, withinPhaseDisplay, withinPhaseTotal };
}
