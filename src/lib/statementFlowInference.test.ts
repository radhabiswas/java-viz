import { describe, expect, it } from 'vitest';
import type { Lesson } from '../types';
import {
  buildExecutionTransitions,
  buildFlowDisplayItems,
  compoundAndBreakdownFromStep,
  extractForConditionExpr,
  lessonUsesControlConstructs,
  parseConditionOutcomeFromDescription,
} from './statementFlowInference';

describe('statementFlowInference', () => {
  it('lessonUsesControlConstructs', () => {
    expect(lessonUsesControlConstructs('int x = 1;')).toBe(false);
    expect(lessonUsesControlConstructs('if (x > 0) { x++; }')).toBe(true);
    expect(lessonUsesControlConstructs('while (true) { }')).toBe(true);
    expect(lessonUsesControlConstructs('for (int i = 0; i < 3; i++) { }')).toBe(true);
  });

  it('buildExecutionTransitions classifies if-else lesson', () => {
    const lesson: Lesson = {
      id: 'ifel',
      title: 'T',
      chapter: 'c',
      code: `int score = 82;
boolean passed = score >= 70;
if (passed && score < 90) {
  score += 5;
}`,
      steps: [
        { id: 's0', codeLine: -1, description: 'Intro', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's1', codeLine: 0, description: 'a', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's2', codeLine: 1, description: 'b', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's3', codeLine: 2, description: 'c', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's4', codeLine: 3, description: 'd', memory: { stack: [], heap: [], staticArea: [] } },
      ],
    };
    const t = buildExecutionTransitions(lesson, 4);
    expect(t[0].edgeKind).toBe('intro');
    expect(t.find((x) => x.stepTo === 3)?.edgeKind).toBe('condition');
    expect(t.find((x) => x.stepTo === 4)?.edgeKind).toBe('enter-branch');
  });

  it('parseConditionOutcomeFromDescription', () => {
    expect(
      parseConditionOutcomeFromDescription(
        'The compound condition passed && score < 90 is true, so the if-block executes.',
      ),
    ).toBe(true);
    expect(parseConditionOutcomeFromDescription("The condition is false, so we skip.")).toBe(false);
    expect(
      parseConditionOutcomeFromDescription('Condition i <= 3 is FALSE. Loop terminates.'),
    ).toBe(false);
  });

  it('extractForConditionExpr', () => {
    expect(extractForConditionExpr('for (int i = 1; i <= 3; i++) {')).toBe('i <= 3');
    expect(extractForConditionExpr('for (int i = 0; i < n; i++)')).toBe('i < n');
  });

  it('classifies for header to body as enter-branch', () => {
    const lesson: Lesson = {
      id: 'for1',
      title: 'T',
      chapter: 'c',
      code: `int sum = 0;
for (int i = 1; i <= 3; i++) {
  sum += i;
}`,
      steps: [
        { id: 's0', codeLine: -1, description: 'Intro', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's1', codeLine: 0, description: 'init', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's2', codeLine: 1, description: 'cond true', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's3', codeLine: 2, description: 'body', memory: { stack: [], heap: [], staticArea: [] } },
      ],
    };
    const t = buildExecutionTransitions(lesson, 3);
    expect(t.find((x) => x.stepTo === 2)?.edgeKind).toBe('condition');
    expect(t.find((x) => x.stepTo === 3)?.edgeKind).toBe('enter-branch');
  });

  it('buildFlowDisplayItems: for loop uses decisions on each header visit', () => {
    const lesson: Lesson = {
      id: 'for2',
      title: 'T',
      chapter: 'c',
      code: `int sum = 0;
for (int i = 1; i <= 3; i++) {
  sum += i;
}`,
      steps: [
        { id: 's0', codeLine: -1, description: 'Intro', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's1', codeLine: 0, description: 'Init sum', memory: { stack: [], heap: [], staticArea: [] } },
        {
          id: 's2',
          codeLine: 1,
          description: 'Loop init. Condition i <= 3 is true.',
          memory: { stack: [], heap: [], staticArea: [] },
        },
        {
          id: 's3',
          codeLine: 2,
          description: 'Iteration 1: body.',
          memory: { stack: [], heap: [], staticArea: [] },
        },
        {
          id: 's4',
          codeLine: 1,
          description: 'i++. Condition i <= 3 is true.',
          memory: { stack: [], heap: [], staticArea: [] },
        },
        {
          id: 's5',
          codeLine: 1,
          description: 'i++. Condition i <= 3 is FALSE.',
          memory: { stack: [], heap: [], staticArea: [] },
        },
      ],
    };
    const items = buildFlowDisplayItems(lesson, 5);
    const decisions = items.filter((x) => x.kind === 'decision');
    expect(decisions.length).toBeGreaterThanOrEqual(3);
    const onHeader = decisions.filter((d) => d.kind === 'decision' && d.line === 1);
    expect(onHeader.length).toBe(3);
    expect(onHeader.every((d) => d.kind === 'decision' && d.conditionText.includes('<='))).toBe(true);
    const last = onHeader[onHeader.length - 1];
    expect(last.kind).toBe('decision');
    if (last.kind === 'decision') expect(last.outcome).toBe(false);
  });

  it('compoundAndBreakdownFromStep for passed && score < 90', () => {
    const step = {
      id: 's',
      codeLine: 2,
      description: 'if',
      memory: {
        stack: [
          { id: 'a', name: 'score', type: 'primitive' as const, value: 82 },
          { id: 'b', name: 'passed', type: 'primitive' as const, value: true },
        ],
        heap: [],
        staticArea: [],
      },
    };
    const b = compoundAndBreakdownFromStep('passed && score < 90', step);
    expect(b).not.toBeNull();
    expect(b!.operands).toEqual([
      { expr: 'passed', result: true, detail: 'true' },
      { expr: 'score < 90', result: true, detail: '82 < 90' },
    ]);
  });

  it('buildFlowDisplayItems if decision includes compound breakdown and stack values', () => {
    const lesson: Lesson = {
      id: 'ifscore',
      title: 'T',
      chapter: 'c',
      code: `int score = 82;
boolean passed = score >= 70;
if (passed && score < 90) {
  score += 5;
}`,
      steps: [
        { id: 's0', codeLine: -1, description: 'Intro', memory: { stack: [], heap: [], staticArea: [] } },
        {
          id: 's1',
          codeLine: 0,
          description: 'score',
          memory: {
            stack: [{ id: 'x', name: 'score', type: 'primitive', value: 82 }],
            heap: [],
            staticArea: [],
          },
        },
        {
          id: 's2',
          codeLine: 1,
          description: 'passed',
          memory: {
            stack: [
              { id: 'x', name: 'score', type: 'primitive', value: 82 },
              { id: 'y', name: 'passed', type: 'primitive', value: true },
            ],
            heap: [],
            staticArea: [],
          },
        },
        {
          id: 's3',
          codeLine: 2,
          description:
            'The compound condition passed && score < 90 is true, so the if-block executes.',
          memory: {
            stack: [
              { id: 'x', name: 'score', type: 'primitive', value: 82 },
              { id: 'y', name: 'passed', type: 'primitive', value: true },
            ],
            heap: [],
            staticArea: [],
          },
        },
        { id: 's4', codeLine: 3, description: 'body', memory: { stack: [], heap: [], staticArea: [] } },
      ],
    };
    const items = buildFlowDisplayItems(lesson, 4);
    const decision = items.find((x) => x.kind === 'decision');
    expect(decision?.kind).toBe('decision');
    if (decision?.kind === 'decision') {
      expect(decision.conditionText).toContain('passed');
      expect(decision.outcome).toBe(true);
      expect(decision.branch).toBe('then');
      expect(decision.conditionBreakdown?.operands).toHaveLength(2);
      expect(decision.conditionBreakdown?.operands[0].expr).toBe('passed');
      expect(decision.conditionBreakdown?.operands[1].detail).toBe('82 < 90');
    }
  });

  it('buildFlowDisplayItems merges if condition with then branch', () => {
    const lesson: Lesson = {
      id: 'ifel',
      title: 'T',
      chapter: 'c',
      code: `int score = 82;
boolean passed = score >= 70;
if (passed && score < 90) {
  score += 5;
}`,
      steps: [
        { id: 's0', codeLine: -1, description: 'Intro', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's1', codeLine: 0, description: 'score', memory: { stack: [], heap: [], staticArea: [] } },
        { id: 's2', codeLine: 1, description: 'passed true', memory: { stack: [], heap: [], staticArea: [] } },
        {
          id: 's3',
          codeLine: 2,
          description: 'The compound condition passed && score < 90 is true, so the if-block executes.',
          memory: { stack: [], heap: [], staticArea: [] },
        },
        { id: 's4', codeLine: 3, description: 'body', memory: { stack: [], heap: [], staticArea: [] } },
      ],
    };
    const items = buildFlowDisplayItems(lesson, 4);
    const decision = items.find((x) => x.kind === 'decision');
    expect(decision?.kind).toBe('decision');
    if (decision?.kind === 'decision') {
      expect(decision.conditionText).toContain('passed');
      expect(decision.outcome).toBe(true);
      expect(decision.branch).toBe('then');
    }
  });
});
