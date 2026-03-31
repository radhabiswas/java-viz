import { describe, expect, it } from 'vitest';
import { simulateJavaMemoryUpTo } from './javaMemorySimulator';

describe('simulateJavaMemoryUpTo', () => {
  it('returns empty memory for upToInclusive < 0', () => {
    const lines = ['int x = 1;'];
    expect(simulateJavaMemoryUpTo(lines, -1)).toEqual({
      stack: [],
      heap: [],
      staticArea: [],
    });
  });

  it('tracks primitive locals and double arithmetic', () => {
    const code = `int items = 7;
double price = 2.5;
double total = items * price;
int rounded = (int) total;`;
    const lines = code.split('\n');
    expect(simulateJavaMemoryUpTo(lines, 0).stack).toEqual([
      { id: 'items', name: 'items', type: 'primitive', value: 7 },
    ]);
    const at3 = simulateJavaMemoryUpTo(lines, 3);
    expect(at3.stack.find((v) => v.name === 'total')?.value).toBe(17.5);
    expect(at3.stack.find((v) => v.name === 'rounded')?.value).toBe(17);
  });

  it('allocates int[] on heap and assigns elements', () => {
    const code = `int[] scores = new int[3];
scores[0] = 95;
scores[1] = 88;`;
    const lines = code.split('\n');
    const after0 = simulateJavaMemoryUpTo(lines, 0);
    expect(after0.stack.some((v) => v.name === 'scores' && v.type === 'reference')).toBe(true);
    expect(after0.heap).toHaveLength(1);
    expect(after0.heap[0].className).toBe('int[]');
    expect(after0.heap[0].fields).toHaveLength(3);
    const after1 = simulateJavaMemoryUpTo(lines, 1);
    const arr = after1.heap[0];
    expect(arr.fields.find((f) => f.name === '[0]')?.value).toBe(95);
    const after2 = simulateJavaMemoryUpTo(lines, 2);
    expect(after2.heap[0].fields.find((f) => f.name === '[1]')?.value).toBe(88);
  });

  it('handles new Type(...) heap allocation', () => {
    const code = `Fraction f = new Fraction(1, 2);`;
    const lines = code.split('\n');
    const m = simulateJavaMemoryUpTo(lines, 0);
    expect(m.heap).toHaveLength(1);
    expect(m.heap[0].className).toBe('Fraction');
    expect(m.stack[0].name).toBe('f');
    expect(m.stack[0].type).toBe('reference');
  });

  it('simulates ArrayList<String> declaration, add, set, and remove', () => {
    const code = `ArrayList<String> names = new ArrayList<>();
names.add("Ava");
names.add("Ben");
names.set(1, "Bo");
names.remove(0);`;
    const lines = code.split('\n');
    const al0 = simulateJavaMemoryUpTo(lines, 0).heap.find((h) => h.className === 'ArrayList');
    expect(al0?.fields.find((f) => f.name === 'size')?.value).toBe(0);

    const m1 = simulateJavaMemoryUpTo(lines, 1);
    const al1 = m1.heap.find((h) => h.className === 'ArrayList');
    expect(al1?.fields.find((f) => f.name === 'size')?.value).toBe(1);
    expect(al1?.fields.find((f) => f.name === '[0]')?.value).toBe('"Ava"');

    const m2 = simulateJavaMemoryUpTo(lines, 2);
    const al2 = m2.heap.find((h) => h.className === 'ArrayList');
    expect(al2?.fields.find((f) => f.name === 'size')?.value).toBe(2);
    expect(al2?.fields.find((f) => f.name === '[1]')?.value).toBe('"Ben"');

    const m3 = simulateJavaMemoryUpTo(lines, 3);
    const al3 = m3.heap.find((h) => h.className === 'ArrayList');
    expect(al3?.fields.find((f) => f.name === '[1]')?.value).toBe('"Bo"');

    const m4 = simulateJavaMemoryUpTo(lines, 4);
    const al4 = m4.heap.find((h) => h.className === 'ArrayList');
    expect(al4?.fields.find((f) => f.name === 'size')?.value).toBe(1);
    expect(al4?.fields.find((f) => f.name === '[0]')?.value).toBe('"Bo"');
  });
});
