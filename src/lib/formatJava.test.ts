import { describe, expect, it } from 'vitest';
import { formatJavaCode } from './formatJava';

describe('formatJavaCode', () => {
  it('formats valid Java and collapses extra blank lines from the Java printer', async () => {
    const ugly = `public class T{void m(){int x=1;int y=2;}}`;
    const out = await formatJavaCode(ugly);
    expect(out).toContain('class T');
    expect(out).toContain('int x');
    expect(/\n{3,}/.test(out)).toBe(false);
  });

  it('throws on unparseable fragment', async () => {
    await expect(formatJavaCode('not java at all {{{')).rejects.toThrow(/Could not format Java/i);
  });
});
