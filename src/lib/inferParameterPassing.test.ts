import { describe, expect, it } from 'vitest';
import type { Lesson } from '../types';
import { lessons } from '../data/lessons';
import {
  getEffectiveParameterPassing,
  inferParameterPassing,
  lessonHasParameterPassingOpportunity,
} from './inferParameterPassing';

describe('inferParameterPassing', () => {
  const staticVsInstance = lessons.find((l) => l.id === '5-2')!;
  const studentCtor = lessons.find((l) => l.id === '4-2')!;
  const socialNull = lessons.find((l) => l.id === '1-4')!;
  const musicTracks = lessons.find((l) => l.id === '1-3')!;

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
    expect(eff.calleeSignature).toBe('Student(String studentName, int initialGrade)');
    expect(eff.footnote).not.toMatch(/inferred/i);
  });

  it('infers instance call from client line when main() formal mapping is empty (addLike)', () => {
    const step = socialNull.steps.find((s) => s.id === 's4')!;
    expect(step.parameterPassing).toBeUndefined();
    const p = inferParameterPassing(socialNull, step);
    expect(p).not.toBeNull();
    expect(p!.calleeSignature).toMatch(/void\s+addLike/);
    const names = p!.mappings.map((m) => m.formalName);
    expect(names).toEqual(['this']);
    expect(p!.mappings[0].actual).toBe('post2');
  });

  it('infers constructor actuals from client line when formal mapping is empty (new Song)', () => {
    const step = musicTracks.steps.find((s) => s.id === 's1')!;
    expect(step.parameterPassing).toBeUndefined();
    const p = inferParameterPassing(musicTracks, step);
    expect(p).not.toBeNull();
    expect(p!.calleeSignature).toBe('Song(String title, String artist)');
    expect(p!.mappings.map((m) => [m.formalName, m.actual])).toEqual([
      ['title', '"Blinding Lights"'],
      ['artist', '"The Weeknd"'],
    ]);
  });

  it('infers implicit default constructor for new Subclass() when class declares no constructors (Vehicle/Car)', () => {
    const poly = lessons.find((l) => l.id === 'ap-9-1')!;
    const step = poly.steps.find((s) => s.id === 's1')!;
    expect(step.parameterPassing).toBeUndefined();
    const p = inferParameterPassing(poly, step);
    expect(p).not.toBeNull();
    expect(p!.calleeSignature).toBe('Car()');
    expect(p!.mappings).toEqual([]);
    expect(p!.implicitDefaultConstructor).toBe(true);
    expect(p!.footnote).toMatch(/no-argument constructor/i);
  });

  it('picks ctor overload by argument count when multiple constructors exist', () => {
    const overloadLesson: Lesson = {
      id: 't-ctor-overload',
      title: 'overload',
      chapter: 'test',
      code: '',
      files: [
        {
          name: 'Box.java',
          code: `public class Box {
  public Box() { }
  public Box(int x) { }
}`,
        },
        {
          name: 'Main.java',
          code: `public class Main {
  public static void main(String[] args) {
    Box a = new Box();
    Box b = new Box(7);
  }
}`,
        },
      ],
      steps: [
        {
          id: 's0',
          codeLine: 2,
          activeFile: 'Main.java',
          description: 'new Box()',
          memory: { stack: [], heap: [], staticArea: [] },
        },
        {
          id: 's1',
          codeLine: 3,
          activeFile: 'Main.java',
          description: 'new Box(7)',
          memory: { stack: [], heap: [], staticArea: [] },
        },
      ],
    };
    const p0 = inferParameterPassing(overloadLesson, overloadLesson.steps[0]);
    expect(p0?.calleeSignature).toBe('Box()');
    expect(p0?.implicitDefaultConstructor).toBeFalsy();
    const p1 = inferParameterPassing(overloadLesson, overloadLesson.steps[1]);
    expect(p1?.calleeSignature).toBe('Box(int x)');
    expect(p1?.mappings).toEqual([{ formalType: 'int', formalName: 'x', actual: '7' }]);
  });

  it('infers formals for method-only snippet (no class wrapper) using stack names', () => {
    const mergeSnippet: Lesson = {
      id: 't-merge-snippet',
      title: 'merge snippet',
      chapter: 'test',
      code: `public int[] merge(int[] left, int[] right) {
  int[] out = new int[1];
  return out;
}`,
      steps: [
        {
          id: 's1',
          codeLine: 1,
          description: 'inside merge',
          memory: {
            stack: [
              { id: 'l', name: 'left', type: 'reference', refId: 'arrL' },
              { id: 'r', name: 'right', type: 'reference', refId: 'arrR' },
            ],
            heap: [],
            staticArea: [],
          },
        },
      ],
    };
    const p = inferParameterPassing(mergeSnippet, mergeSnippet.steps[0]);
    expect(p).not.toBeNull();
    expect(p!.mappings.map((m) => m.formalName).sort()).toEqual(['left', 'right'].sort());
    expect(lessonHasParameterPassingOpportunity(mergeSnippet)).toBe(true);
  });

  it('lessonHasParameterPassingOpportunity is false for top-level iterative code without calls', () => {
    const iterativeBs = lessons.find((l) => l.id === '4-5')!;
    expect(lessonHasParameterPassingOpportunity(iterativeBs)).toBe(false);
  });
});
