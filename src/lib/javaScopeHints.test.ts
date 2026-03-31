import { describe, expect, it } from 'vitest';
import { filterScopeLanesForFocus, type ScopeLane } from './javaScopeHints';

describe('filterScopeLanesForFocus', () => {
  const lanes: ScopeLane[] = [
    { name: 'a', declLine: 1, scopeEndLine: 10, laneIndex: 0 },
    { name: 'b', declLine: 2, scopeEndLine: 10, laneIndex: 1 },
  ];

  it('returns all lanes when focus is all', () => {
    expect(filterScopeLanesForFocus(lanes, 'all')).toEqual(lanes);
  });

  it('returns one lane at index 0 when focusing a name', () => {
    const out = filterScopeLanesForFocus(lanes, 'b');
    expect(out).toHaveLength(1);
    expect(out[0].name).toBe('b');
    expect(out[0].laneIndex).toBe(0);
  });

  it('falls back to all lanes for unknown name', () => {
    expect(filterScopeLanesForFocus(lanes, 'missing')).toEqual(lanes);
  });
});
