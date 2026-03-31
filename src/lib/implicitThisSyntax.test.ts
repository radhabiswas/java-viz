import { describe, expect, it } from 'vitest';
import {
  applyImplicitThisSyntax,
  applyImplicitThisTeachingTransform,
  ctorShadowsInstanceField,
  extractInstanceFieldNames,
  javaLineToTeachingHtml,
} from './implicitThisSyntax';

describe('applyImplicitThisSyntax', () => {
  it('adds receiver to instance methods with and without parameters', () => {
    const src = [
      'public class Fraction {',
      '  public Fraction(int n, int d) {',
      '  }',
      '  public int getNumer() {',
      '    return 0;',
      '  }',
      '  public int add(int x, int y) {',
      '    return x + y;',
      '  }',
      '  public static void main(String[] args) {',
      '  }',
      '}',
    ].join('\n');
    const out = applyImplicitThisSyntax(src, 'Fraction');
    expect(out).toContain('public Fraction(Fraction this, int n, int d) {');
    expect(out).toContain('public int getNumer(Fraction this) {');
    expect(out).toContain('public int add(Fraction this, int x, int y) {');
    expect(out).toContain('public static void main(String[] args) {');
  });
});

describe('applyImplicitThisTeachingTransform', () => {
  it('adds receiver and prefixes bare instance fields in ctor and instance method', () => {
    const src = [
      'public class MathUtils {',
      '  private int value;',
      '',
      '  public MathUtils(int v) {',
      '    value = v;',
      '  }',
      '',
      '  public int multiply(int factor) {',
      '    return value * factor;',
      '  }',
      '',
      '  public static int square(int num) {',
      '    return num * num;',
      '  }',
      '}',
    ].join('\n');
    const out = applyImplicitThisTeachingTransform(src, 'MathUtils');
    expect(out).toContain('public MathUtils(MathUtils this, int v) {');
    expect(out).toContain('this.value = v;');
    expect(out).toContain('public int multiply(MathUtils this, int factor) {');
    expect(out).toContain('return this.value * factor;');
    expect(out).toContain('public static int square(int num) {');
    expect(out).toMatch(/return num \* num;/);
  });

  it('does not rewrite constructor body when a parameter shadows a field', () => {
    const src = [
      'public class Student {',
      '  private String name;',
      '  private int grade;',
      '',
      '  public Student(String name, int grade) {',
      '    this.name = name;',
      '    this.grade = grade;',
      '  }',
      '',
      '  public void study() {',
      '    grade += 5;',
      '  }',
      '}',
    ].join('\n');
    const out = applyImplicitThisTeachingTransform(src, 'Student');
    expect(out).toContain('this.name = name;');
    expect(out).toContain('this.grade += 5;');
  });
});

describe('extractInstanceFieldNames / ctorShadowsInstanceField', () => {
  it('extracts non-static fields only', () => {
    const src = 'private static int c;\nprivate int x;\npublic String y;';
    expect(extractInstanceFieldNames(src)).toEqual(['x', 'y']);
  });

  it('detects shadowing constructor parameters', () => {
    const lines = ['public Student(String name, int grade) {'];
    expect(ctorShadowsInstanceField(lines, 'Student', ['name', 'grade'])).toBe(true);
    expect(ctorShadowsInstanceField(lines, 'Student', ['x'])).toBe(false);
  });
});

describe('javaLineToTeachingHtml', () => {
  it('does not leak broken style fragments when highlighting keywords', () => {
    const out = javaLineToTeachingHtml('public Student(String name, int grade) {', 'Student');
    expect(out).not.toContain('color:#569cd6">');
    expect(out).not.toMatch(/"color:#/);
    expect(out).toContain('java-teach-kw');
  });

  it('wraps ClassName this in receiver span', () => {
    const out = javaLineToTeachingHtml('public Student(Student this, String name, int grade)', 'Student');
    expect(out).toContain('java-teach-receiver');
    expect(out).toContain('Student this');
  });
});
