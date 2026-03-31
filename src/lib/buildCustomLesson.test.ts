import { describe, expect, it } from 'vitest';
import { buildDeterministicCustomLesson } from './buildCustomLesson';

describe('buildDeterministicCustomLesson', () => {
  it('creates intro step plus one step per line', () => {
    const code = 'int a = 1;\nint b = 2;';
    const lesson = buildDeterministicCustomLesson(code);
    expect(lesson.code).toBe(code);
    expect(lesson.chapter).toBe('Custom Code');
    expect(lesson.steps).toHaveLength(3);
    expect(lesson.steps[0].codeLine).toBe(-1);
    expect(lesson.steps[1].codeLine).toBe(0);
    expect(lesson.steps[2].codeLine).toBe(1);
  });

  it('uses first non-empty line for title, truncating long lines', () => {
    const long = `${'a'.repeat(60)}`;
    const lesson = buildDeterministicCustomLesson(long);
    expect(lesson.title.length).toBeLessThanOrEqual(54);
    expect(lesson.title.endsWith('…')).toBe(true);
  });

  it('simulates memory on final step for simple int', () => {
    const lesson = buildDeterministicCustomLesson('int x = 42;');
    const last = lesson.steps[lesson.steps.length - 1];
    expect(last.memory.stack.some((v) => v.name === 'x' && v.value === 42)).toBe(true);
  });
});
