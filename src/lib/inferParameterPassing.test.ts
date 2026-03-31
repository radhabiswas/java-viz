import { describe, expect, it } from 'vitest';
import { lessons } from '../data/lessons';
import { getEffectiveParameterPassing, inferParameterPassing } from './inferParameterPassing';

describe('inferParameterPassing', () => {
  const staticVsInstance = lessons.find((l) => l.id === '5-2')!;
  const studentCtor = lessons.find((l) => l.id === '4-2')!;

  it('infers static square: formal num ← actual 5', () => {
    const step = staticVsInstance.steps.find((s) => s.id === 's2')!;
    const p = inferParameterPassing(staticVsInstance, step);
    expect(p).not.toBeNull();
    expect(p!.calleeSignature).toMatch(/square/);
    expect(p!.mappings.map((m) => m.formalName)).toEqual(['num']);
    expect(p!.mappings[0].actual).toBe('5');
  });

  it('infers instance multiply: this + factor from call site', () => {
    const step = staticVsInstance.steps.find((s) => s.id === 's7')!;
    const p = inferParameterPassing(staticVsInstance, step);
    expect(p).not.toBeNull();
    const names = p!.mappings.map((m) => m.formalName);
    expect(names).toContain('this');
    expect(names).toContain('factor');
    const factor = p!.mappings.find((m) => m.formalName === 'factor');
    expect(factor?.actual).toBe('2');
    const th = p!.mappings.find((m) => m.formalName === 'this');
    expect(th?.actual).toBe('utils');
  });

  it('prefers authored parameterPassing over inference', () => {
    const step = studentCtor.steps.find((s) => s.id === 's2')!;
    expect(step.parameterPassing).toBeDefined();
    const eff = getEffectiveParameterPassing(studentCtor, step);
    expect(eff.calleeSignature).toBe('Student(String name, int grade)');
    expect(eff.footnote).not.toMatch(/inferred/i);
  });
});
