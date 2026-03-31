import { describe, expect, it } from 'vitest';
import type { Lesson } from '../types';
import {
  buildExecutionPath,
  buildRecursionDiagramState,
  computeFactorialUnwindLabels,
  computeRecursiveChainFinalReturnValue,
  computeSumToUnwindLabels,
  inferMaxUniformNumericRecursionFromLesson,
  inferRecursionUnwindStyle,
  isUniformRecursionChain,
  parseCallFrames,
  parseCallFrameFromStackVar,
} from './controlFlowInference';

describe('controlFlowInference', () => {
  it('parses method-like stack frame names', () => {
    expect(
      parseCallFrameFromStackVar({
        id: 'f1',
        name: 'fact(3)',
        type: 'primitive',
        value: 'n = 3',
      }),
    ).toEqual({ id: 'f1', signature: 'fact(3)', methodName: 'fact' });
    expect(parseCallFrameFromStackVar({ id: 'x', name: 'n', type: 'primitive', value: 1 })).toBeNull();
  });

  it('parseCallFrames keeps stack order', () => {
    const stack = [
      { id: 'a', name: 'fact(3)', type: 'primitive' as const, value: 0 },
      { id: 'b', name: 'fact(2)', type: 'primitive' as const, value: 0 },
    ];
    expect(parseCallFrames(stack).map((f) => f.signature)).toEqual(['fact(3)', 'fact(2)']);
  });

  it('isUniformRecursionChain', () => {
    const fs = [
      { id: '1', signature: 'fact(3)', methodName: 'fact' },
      { id: '2', signature: 'fact(2)', methodName: 'fact' },
    ];
    expect(isUniformRecursionChain(fs)).toBe(true);
    expect(
      isUniformRecursionChain([
        ...fs,
        { id: '3', signature: 'other()', methodName: 'other' },
      ]),
    ).toBe(false);
  });

  it('buildExecutionPath', () => {
    const lesson: Lesson = {
      id: 't',
      title: 'T',
      chapter: 'c',
      code: '',
      steps: [
        { id: 's0', codeLine: -1, description: 'Intro', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's1', codeLine: 2, description: 'Line two', memory: { stack: [], heap: [], staticArea: [] } },
      ],
    };
    expect(buildExecutionPath(lesson, 1)).toEqual([
      { stepIndex: 0, codeLine: -1, shortDescription: 'Intro' },
      { stepIndex: 1, codeLine: 2, shortDescription: 'Line two' },
    ]);
  });

  it('computeFactorialUnwindLabels', () => {
    expect(computeFactorialUnwindLabels([3, 2, 1, 0])).toEqual([1, 2, 6]);
    expect(computeFactorialUnwindLabels([5, 4, 3, 2, 1, 0])).toEqual([1, 2, 6, 24, 120]);
  });

  it('computeSumToUnwindLabels and inferRecursionUnwindStyle', () => {
    expect(computeSumToUnwindLabels([4, 3, 2, 1])).toEqual([3, 6, 10]);
    expect(inferRecursionUnwindStyle([4, 3, 2, 1])).toEqual({
      kind: 'sumTo',
      labels: [3, 6, 10],
      combineOp: '+',
    });
    expect(inferRecursionUnwindStyle([3, 2, 1, 0])?.kind).toBe('factorial');
    expect(computeRecursiveChainFinalReturnValue([4, 3, 2, 1])).toBe(10);
  });

  it('inferMaxUniformNumericRecursionFromLesson finds deepest chain', () => {
    const lesson: Lesson = {
      id: 'fact',
      title: 'F',
      chapter: 'c',
      code: '',
      steps: [
        { id: 'a', codeLine: -1, description: 'Intro', memory: { stack: [], heap: [], staticArea: [] } },
        {
          id: 'b',
          codeLine: 0,
          description: 'One frame',
          memory: {
            stack: [{ id: '1', name: 'fact(3)', type: 'primitive', value: 0 }],
            heap: [],
            staticArea: [],
          },
        },
        {
          id: 'c',
          codeLine: 0,
          description: 'Deep',
          memory: {
            stack: [
              { id: '1', name: 'fact(3)', type: 'primitive', value: 0 },
              { id: '2', name: 'fact(2)', type: 'primitive', value: 0 },
              { id: '3', name: 'fact(1)', type: 'primitive', value: 0 },
              { id: '4', name: 'fact(0)', type: 'primitive', value: 0 },
            ],
            heap: [],
            staticArea: [],
          },
        },
      ],
    };
    expect(inferMaxUniformNumericRecursionFromLesson(lesson)).toEqual({
      methodName: 'fact',
      nValues: [3, 2, 1, 0],
    });
  });

  it('buildRecursionDiagramState tracks unwind and final return', () => {
    const lesson: Lesson = {
      id: 'f',
      title: 'F',
      chapter: 'c',
      code: '',
      steps: [
        { id: 'a', codeLine: -1, description: '', memory: { stack: [], heap: [], staticArea: [] } },
        {
          id: 'b',
          codeLine: 0,
          description: '',
          memory: {
            stack: [{ id: '1', name: 'fact(2)', type: 'primitive', value: 0 }],
            heap: [],
            staticArea: [],
          },
        },
        {
          id: 'c',
          codeLine: 0,
          description: '',
          memory: {
            stack: [
              { id: '1', name: 'fact(2)', type: 'primitive', value: 0 },
              { id: '2', name: 'fact(1)', type: 'primitive', value: 0 },
              { id: '3', name: 'fact(0)', type: 'primitive', value: 0 },
            ],
            heap: [],
            staticArea: [],
          },
        },
        {
          id: 'd',
          codeLine: 0,
          description: '',
          memory: {
            stack: [{ id: '1', name: 'fact(2)', type: 'primitive', value: 0 }],
            heap: [],
            staticArea: [],
          },
        },
      ],
    };
    const trace = { methodName: 'fact', nValues: [2, 1, 0] };
    expect(buildRecursionDiagramState(lesson, 1, trace).forwardEdgeCount).toBe(0);
    expect(buildRecursionDiagramState(lesson, 2, trace).forwardEdgeCount).toBe(2);
    const mid = buildRecursionDiagramState(lesson, 3, trace);
    expect(mid.returnEdgeCount).toBe(1);
    expect(mid.stackDepth).toBe(1);
  });
});
