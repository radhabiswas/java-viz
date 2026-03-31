import { describe, expect, it } from 'vitest';
import {
  parseJavaClassLayout,
  classLayoutLineClassNames,
  classLayoutLineTitle,
} from './javaClassLayout';

const sample = `public class Demo {
  private static int count;
  private int x;
  public Demo(int v) { this.x = v; }
  public int getX() { return x; }
}`;

describe('parseJavaClassLayout', () => {
  it('returns null when no class keyword', () => {
    expect(parseJavaClassLayout('int x = 1;')).toBeNull();
  });

  it('indexes members inside class body', () => {
    const r = parseJavaClassLayout(sample);
    expect(r).not.toBeNull();
    expect(r!.className).toBe('Demo');
    expect(r!.byLine.size).toBeGreaterThan(0);
  });

  it('exposes access metadata for a field line', () => {
    const r = parseJavaClassLayout(sample)!;
    const lineWithStatic = sample.split('\n').findIndex((l) => l.includes('private static'));
    expect(lineWithStatic).toBeGreaterThan(-1);
    const meta = r.byLine.get(lineWithStatic);
    expect(meta?.section).toBe('staticFields');
    expect(classLayoutLineTitle(r, lineWithStatic)).toBeDefined();
    expect(classLayoutLineClassNames(r, lineWithStatic)).toContain('cv-access-priv');
  });
});
