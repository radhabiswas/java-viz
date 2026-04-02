import type { Lesson } from '../types';

/**
 * Additional visualization lessons (CS Awesome–aligned gaps).
 * Merged into `lessons` via spread — keep orders unique and consistent with sidebar sort.
 */
export const lessonAdditions: Lesson[] = [
  {
    id: 'ap-0-1',
    order: 0,
    chapter: '1 · Variables & types',
    title: 'First program: main & println',
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
    int x = 42;
    System.out.println(x);
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'Every Java app needs an entry point: `public static void main(String[] args)`. Output goes through `System.out`.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        description:
          'println with a String literal prints text; the teaching heap can show one String object for "Hello" while the program runs.',
        memory: {
          stack: [],
          heap: [{ id: 'strHello', className: 'String', fields: [{ name: 'value', value: '"Hello"' }] }],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 3,
        description: 'Local primitive x is created on the stack with value 42.',
        memory: {
          stack: [{ id: 'x', name: 'x', type: 'primitive', value: 42 }],
          heap: [{ id: 'strHello', className: 'String', fields: [{ name: 'value', value: '"Hello"' }] }],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 4,
        description: 'println(x) prints the decimal expansion of the int — no quotes, unlike the first line.',
        memory: {
          stack: [{ id: 'x', name: 'x', type: 'primitive', value: 42 }],
          heap: [{ id: 'strHello', className: 'String', fields: [{ name: 'value', value: '"Hello"' }] }],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-ap-0-1',
      question: 'Which line is the standard entry point Java runs first?',
      options: ['class Main', 'public static void main(String[] args)', 'System.out.println', 'int x'],
      correctAnswer: 1,
      explanation: 'The JVM starts execution inside main.',
      points: 100,
    },
  },
  {
    id: 'ap-0-2',
    order: 1.5,
    chapter: '1 · Variables & types',
    title: 'Scanner & reading an int',
    code: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    int age = in.nextInt();
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'java.util.Scanner wraps a readable source (here System.in). It is a reference type: the variable on the stack points at a Scanner object on the heap.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 4,
        description: 'new Scanner(System.in) constructs a heap Scanner; in stores that reference.',
        memory: {
          stack: [{ id: 'in', name: 'in', type: 'reference', refId: 'sc1' }],
          heap: [{ id: 'sc1', className: 'Scanner', fields: [{ name: 'source', value: 'System.in' }] }],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 5,
        description:
          'nextInt() parses the next int from the stream and returns a primitive copy stored in age (teaching snapshot: user typed 16).',
        memory: {
          stack: [
            { id: 'in', name: 'in', type: 'reference', refId: 'sc1' },
            { id: 'age', name: 'age', type: 'primitive', value: 16 },
          ],
          heap: [{ id: 'sc1', className: 'Scanner', fields: [{ name: 'source', value: 'System.in' }] }],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-ap-0-2',
      question: 'Scanner in = new Scanner(...) stores on the stack:',
      options: [
        'The entire Scanner object inline',
        'A reference to a Scanner on the heap',
        'Only an int',
        'A char array',
      ],
      correctAnswer: 1,
      explanation: 'Scanner is an object; the variable holds a reference.',
      points: 125,
    },
  },
  {
    id: 'ap-3-3',
    order: 3.45,
    chapter: '2 · Control flow',
    title: 'Short-circuit && and ||',
    code: `int x = 0;
boolean leftGuard = (x != 0) && (10 / x > 1);
boolean rightOr = (x == 0) || (10 / x > 1);`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          '&& and || only evaluate the right side when needed. With x == 0, `(x != 0) && …` skips the divide; `(x == 0) || …` skips the divide.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: 'x is 0 on the stack.',
        memory: { stack: [{ id: 'x', name: 'x', type: 'primitive', value: 0 }], heap: [], staticArea: [] },
      },
      {
        id: 's2',
        codeLine: 1,
        description: 'First conjunct (x != 0) is false — && short-circuits; right side is not evaluated; leftGuard is false.',
        memory: {
          stack: [
            { id: 'x', name: 'x', type: 'primitive', value: 0 },
            { id: 'leftGuard', name: 'leftGuard', type: 'primitive', value: false },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 2,
        description: 'First disjunct (x == 0) is true — || short-circuits; right side skipped; rightOr is true.',
        memory: {
          stack: [
            { id: 'x', name: 'x', type: 'primitive', value: 0 },
            { id: 'leftGuard', name: 'leftGuard', type: 'primitive', value: false },
            { id: 'rightOr', name: 'rightOr', type: 'primitive', value: true },
          ],
          heap: [],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-ap-3-3',
      question: 'Why does (x != 0) && (10 / x > 1) avoid dividing when x is 0?',
      options: [
        'Java always skips math',
        '&& stops if the left operand is false',
        '|| forces skip',
        'Compiler removes /',
      ],
      correctAnswer: 1,
      explanation: 'Logical AND must be false if the left side is false; the right side is not evaluated.',
      points: 150,
    },
  },
  {
    id: 'ap-3-4',
    order: 3.55,
    chapter: '2 · Control flow',
    title: 'De Morgan: !(p && q) equals !p || !q',
    code: `boolean p = true;
boolean q = false;
boolean dem1 = !(p && q);
boolean dem2 = !p || !q;`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'De Morgan: negating an AND yields OR of negations. Here both dem1 and dem2 become true — same truth value, different expression shape.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 1,
        description: 'p=true, q=false on the stack.',
        memory: {
          stack: [
            { id: 'p', name: 'p', type: 'primitive', value: true },
            { id: 'q', name: 'q', type: 'primitive', value: false },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 2,
        description: '!(p && q) → !(true && false) → !false → true.',
        memory: {
          stack: [
            { id: 'p', name: 'p', type: 'primitive', value: true },
            { id: 'q', name: 'q', type: 'primitive', value: false },
            { id: 'dem1', name: 'dem1', type: 'primitive', value: true },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 3,
        description: '!p || !q → false || true → true — matches dem1.',
        memory: {
          stack: [
            { id: 'p', name: 'p', type: 'primitive', value: true },
            { id: 'q', name: 'q', type: 'primitive', value: false },
            { id: 'dem1', name: 'dem1', type: 'primitive', value: true },
            { id: 'dem2', name: 'dem2', type: 'primitive', value: true },
          ],
          heap: [],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-ap-3-4',
      question: '!(p && q) is equivalent to which expression?',
      options: ['!p && !q', '!p || !q', 'p || q', 'p && q'],
      correctAnswer: 1,
      explanation: 'That is one of De Morgan’s laws.',
      points: 150,
    },
  },
  {
    id: '2-3',
    order: 5.5,
    chapter: '2 · Control flow',
    title: 'Nested for loops',
    code: `int total = 0;
for (int i = 0; i < 2; i++) {
  for (int j = 0; j < 3; j++) {
    total++;
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Outer i runs 2 times; inner j runs 3 times per outer iteration → 6 increments.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: 'total starts at 0.',
        memory: { stack: [{ id: 'total', name: 'total', type: 'primitive', value: 0 }], heap: [], staticArea: [] },
      },
      {
        id: 's2',
        codeLine: 1,
        description: 'Outer loop begins: i=0; inner j will run 0..2.',
        memory: {
          stack: [
            { id: 'total', name: 'total', type: 'primitive', value: 0 },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'j', name: 'j', type: 'primitive', value: 0 },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 3,
        description: 'Mid-run snapshot: several body executions — total reaches 3 (halfway through all 6).',
        memory: {
          stack: [
            { id: 'total', name: 'total', type: 'primitive', value: 3 },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'j', name: 'j', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 1,
        description: 'After both outer iterations, inner complete: total = 6; loop locals discarded.',
        memory: { stack: [{ id: 'total', name: 'total', type: 'primitive', value: 6 }], heap: [], staticArea: [] },
      },
    ],
    quiz: {
      id: 'q-2-3',
      question: 'How many times does total++ run for i in {0,1} and j in {0,1,2}?',
      options: ['2', '3', '5', '6'],
      correctAnswer: 3,
      explanation: '2 × 3 = 6.',
      points: 150,
    },
  },
  {
    id: '5-3',
    order: 15.5,
    chapter: '3 · Objects & classes',
    title: 'this: field vs parameter',
    code: '',
    files: [
      {
        name: 'Counter.java',
        code: `public class Counter {
  private int value;

  public Counter(int value) {
    this.value = value;
  }

  public void setValue(int value) {
    this.value = value;
  }

  public int getValue() {
    return value;
  }
}`,
      },
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    Counter c = new Counter(5);
    c.setValue(3);
    int v = c.getValue();
  }
}`,
      },
    ],
    codeNav: [{ symbol: 'Counter', file: 'Counter.java', line: 0 }],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description:
          'When a parameter has the same name as a field, `this.field` = instance slot, `value` alone = the parameter inside that method.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java' },
          { file: 'Counter.java', label: 'Counter.java' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        activeFile: 'Main.java',
        description: 'new Counter(5): object with value 5.',
        memory: {
          stack: [{ id: 'c', name: 'c', type: 'reference', refId: 'ctr1' }],
          heap: [{ id: 'ctr1', className: 'Counter', fields: [{ name: 'value', value: 5 }] }],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 9,
        activeFile: 'Counter.java',
        description: 'Inside setValue(3): parameter `value` is 3; `this.value = value` writes 3 into the heap field.',
        parameterPassing: {
          subtitle: 'Instance method: hidden this + int parameter.',
          calleeSignature: 'void setValue(Counter this, int value)',
          mappings: [
            {
              formalType: 'Counter',
              formalName: 'this',
              actual: 'c',
              detail: 'Receives the object c points at.',
            },
            {
              formalType: 'int',
              formalName: 'value',
              actual: '3',
              detail: 'Shadows the name "value" but is only the parameter local.',
            },
          ],
          footnote: 'this.value means the instance field; unqualified value is the formal parameter here.',
        },
        memory: {
          stack: [
            { id: 'c', name: 'c', type: 'reference', refId: 'ctr1' },
            { id: 'value', name: 'value', type: 'primitive', value: 3 },
          ],
          heap: [{ id: 'ctr1', className: 'Counter', fields: [{ name: 'value', value: 5 }] }],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 10,
        activeFile: 'Counter.java',
        description: 'After assignment, instance field value is 3.',
        parameterPassing: {
          subtitle: 'Same bindings; field updated.',
          calleeSignature: 'void setValue(Counter this, int value)',
          mappings: [
            { formalType: 'Counter', formalName: 'this', actual: 'c', detail: 'Field storage lives on this object.' },
            { formalType: 'int', formalName: 'value', actual: '3', detail: 'Source of the write.' },
          ],
          footnote: 'Shadowing resolved by this.',
        },
        memory: {
          stack: [
            { id: 'c', name: 'c', type: 'reference', refId: 'ctr1' },
            { id: 'value', name: 'value', type: 'primitive', value: 3 },
          ],
          heap: [{ id: 'ctr1', className: 'Counter', fields: [{ name: 'value', value: 3 }] }],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 4,
        activeFile: 'Main.java',
        description: 'Call `c.getValue()`: receiver `c` is passed implicitly; return value will be stored in `v`.',
        parameterPassing: {
          subtitle: 'Instance call with no explicit arguments besides the receiver.',
          calleeSignature: 'int getValue(Counter this)',
          mappings: [
            {
              formalType: 'Counter',
              formalName: 'this',
              actual: 'c',
              detail: 'The Counter instance whose field is read.',
            },
          ],
          footnote: 'getValue has no parameters; only this is passed implicitly.',
        },
        memory: {
          stack: [
            { id: 'c', name: 'c', type: 'reference', refId: 'ctr1' },
            { id: 'v', name: 'v', type: 'primitive', value: 3 },
          ],
          heap: [{ id: 'ctr1', className: 'Counter', fields: [{ name: 'value', value: 3 }] }],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 12,
        activeFile: 'Counter.java',
        description:
          'Inside getValue(): unqualified `value` is the instance field (no parameter named value here), so it reads 3.',
        parameterPassing: {
          subtitle: 'Accessor: receiver only.',
          calleeSignature: 'int getValue(Counter this)',
          mappings: [
            {
              formalType: 'Counter',
              formalName: 'this',
              actual: 'c',
              detail: 'Same Counter instance as in Main.',
            },
          ],
          footnote: 'The returned int is copied into v in Main after the call completes.',
        },
        memory: {
          stack: [{ id: 'c', name: 'c', type: 'reference', refId: 'ctr1' }],
          heap: [{ id: 'ctr1', className: 'Counter', fields: [{ name: 'value', value: 3 }] }],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c-5-3-1',
        name: 'Shadowing',
        description: 'A parameter or local with the same simple name as a field hides the field unless qualified with this.',
        files: [{ name: 'Counter.java', lines: [4, 7, 8, 9, 11, 12] }],
      },
      {
        id: 'c-5-3-2',
        name: 'Implicit this',
        description: 'Open for explicit `Counter this` and `this.value = value` (teaching overlay).',
        files: [{ name: 'Counter.java', lines: [3, 4, 7, 8, 11, 12] }],
        implicitThis: { file: 'Counter.java', className: 'Counter' },
      },
    ],
    quiz: {
      id: 'q-5-3',
      question: 'In setValue(int value), which identifies the instance field?',
      options: ['value alone', 'this.value', 'static value', 'new value'],
      correctAnswer: 1,
      explanation: 'this selects the receiver object’s field when the parameter name shadows it.',
      points: 200,
    },
  },
  {
    id: '4-5',
    order: 17.41,
    chapter: '5 · Arrays & algorithms',
    title: 'Binary search (sorted array)',
    code: `int[] sorted = {1, 4, 7, 12, 20};
int target = 12;
int lo = 0;
int hi = sorted.length - 1;
int mid = (lo + hi) / 2;
while (sorted[mid] != target && lo <= hi) {
  if (sorted[mid] < target) {
    lo = mid + 1;
  } else {
    hi = mid - 1;
  }
  mid = (lo + hi) / 2;
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'Binary search halves the index range each step — requires sorted data. lo/hi bound the live interval; mid is the probe index.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          caption: 'Sorted array for the trace; indices 0 … 4.',
          bands: [{ id: 'sorted', label: 'sorted (int[])', values: [1, 4, 7, 12, 20] }],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 4,
        description: 'Initial **mid** with lo=0, hi=4: (0+4)/2 = **2** — we will read sorted[mid] inside the loop.',
        memory: {
          stack: [
            { id: 'sorted', name: 'sorted', type: 'reference', refId: 'arrS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 2 },
          ],
          heap: [{ id: 'arrS', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 4 }, { name: '[2]', value: 7 }, { name: '[3]', value: 12 }, { name: '[4]', value: 20 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Probe index mid=2 (value 7).',
          bands: [{ id: 'sorted', label: 'sorted (int[])', values: [1, 4, 7, 12, 20] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 2, kind: 'mid' },
          ],
        },
      },
      {
        id: 's1b',
        codeLine: 5,
        description:
          '**while** test: sorted[mid]=7 is not 12, and lo ≤ hi — enter the body. (The loop condition is checked again after each mid update.)',
        memory: {
          stack: [
            { id: 'sorted', name: 'sorted', type: 'reference', refId: 'arrS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 2 },
          ],
          heap: [{ id: 'arrS', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 4 }, { name: '[2]', value: 7 }, { name: '[3]', value: 12 }, { name: '[4]', value: 20 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: '7 ≠ 12 — must stay in the loop.',
          bands: [{ id: 'sorted', label: 'sorted (int[])', values: [1, 4, 7, 12, 20] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 2, kind: 'mid' },
            { index: 2, kind: 'compare', label: '7≠12' },
          ],
        },
      },
      {
        id: 's1c',
        codeLine: 7,
        description:
          '**if (sorted[mid] < target)** is true (7 < 12), so **lo = mid + 1 = 3**. Interval is now [3,4].',
        memory: {
          stack: [
            { id: 'sorted', name: 'sorted', type: 'reference', refId: 'arrS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 3 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 2 },
          ],
          heap: [{ id: 'arrS', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 4 }, { name: '[2]', value: 7 }, { name: '[3]', value: 12 }, { name: '[4]', value: 20 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Discard indices ≤ mid; new lo=3.',
          bands: [{ id: 'sorted', label: 'sorted (int[])', values: [1, 4, 7, 12, 20] }],
          markers: [
            { index: 3, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 2, kind: 'compare', label: '7<12' },
          ],
        },
      },
      {
        id: 's2',
        codeLine: 10,
        description: 'Bottom of loop: **mid = (lo+hi)/2 = (3+4)/2 = 3**. Next iteration will compare sorted[3]=12 to the target.',
        memory: {
          stack: [
            { id: 'sorted', name: 'sorted', type: 'reference', refId: 'arrS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 3 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [{ id: 'arrS', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 4 }, { name: '[2]', value: 7 }, { name: '[3]', value: 12 }, { name: '[4]', value: 20 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'New interval [lo=3, hi=4]. Probe mid=3 (value 12) — equals target.',
          bands: [{ id: 'sorted', label: 'sorted (int[])', values: [1, 4, 7, 12, 20] }],
          markers: [
            { index: 3, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 3, kind: 'mid' },
            { index: 3, kind: 'compare', label: 'hit' },
          ],
        },
      },
      {
        id: 's2b',
        codeLine: 5,
        description:
          '**while** test again: sorted[mid]=12 **equals** target — `sorted[mid] != target` is false, so the loop **exits** immediately (no further lo/hi/mid updates).',
        memory: {
          stack: [
            { id: 'sorted', name: 'sorted', type: 'reference', refId: 'arrS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 3 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [{ id: 'arrS', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 4 }, { name: '[2]', value: 7 }, { name: '[3]', value: 12 }, { name: '[4]', value: 20 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Found 12 at index mid — exit while.',
          bands: [{ id: 'sorted', label: 'sorted (int[])', values: [1, 4, 7, 12, 20] }],
          markers: [
            { index: 3, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 3, kind: 'mid' },
            { index: 3, kind: 'compare', label: 'hit' },
          ],
        },
      },
      {
        id: 's3',
        codeLine: 5,
        description: 'After the loop: **mid** still holds **3**, the index where 12 lives.',
        memory: {
          stack: [
            { id: 'sorted', name: 'sorted', type: 'reference', refId: 'arrS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 3 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [{ id: 'arrS', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 4 }, { name: '[2]', value: 7 }, { name: '[3]', value: 12 }, { name: '[4]', value: 20 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Search complete — answer index 3.',
          bands: [{ id: 'sorted', label: 'sorted (int[])', values: [1, 4, 7, 12, 20] }],
          markers: [{ index: 3, kind: 'mid', label: 'result' }],
        },
      },
    ],
    quiz: {
      id: 'q-4-5',
      question: 'Binary search requires the array to be:',
      options: ['Random order', 'Sorted ascending (usual variant)', 'All zeros', 'Exactly length 5'],
      correctAnswer: 1,
      explanation: 'Ordering enables deciding which half to discard.',
      points: 175,
    },
  },
  {
    id: '4-6',
    order: 17.5,
    chapter: '5 · Arrays & algorithms',
    title: 'Selection sort (find minimum, swap)',
    code: `int[] a = {5, 2, 9, 1, 8};
for (int i = 0; i < a.length - 1; i++) {
  int minIdx = i;
  for (int j = i + 1; j < a.length; j++) {
    if (a[j] < a[minIdx]) {
      minIdx = j;
    }
  }
  int tmp = a[i];
  a[i] = a[minIdx];
  a[minIdx] = tmp;
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'Each outer i: scan j≥i for the smallest element, then swap that slot with i. The array view tracks i, j, and the swap pair.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          caption: 'Starting array a = {5, 2, 9, 1, 8} — five elements, four outer passes.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 9, 1, 8] }],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 0,
        description: 'Reference a points at heap int[] {5, 2, 9, 1, 8}.',
        memory: {
          stack: [{ id: 'a', name: 'a', type: 'reference', refId: 'arrA' }],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Heap holds the array object; a on the stack references it.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 9, 1, 8] }],
          markers: [],
        },
      },
      {
        id: 's2a',
        codeLine: 3,
        description:
          '**i=0**, **minIdx** starts at 0. **j=1**: **2 < 5** → **minIdx = 1**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: 1 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'j=1: 2 < 5 → minIdx = 1.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 9, 1, 8] }],
          markers: [
            { index: 0, kind: 'i' },
            { index: 0, kind: 'minIdx', label: 'was 0' },
            { index: 1, kind: 'j' },
            { index: 1, kind: 'compare', label: '2<5' },
          ],
        },
      },
      {
        id: 's2b',
        codeLine: 3,
        description: '**j=2**: **9 ≮ 2** — **minIdx** stays **1**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: 2 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'j=2: still min at index 1.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 9, 1, 8] }],
          markers: [
            { index: 0, kind: 'i' },
            { index: 1, kind: 'minIdx' },
            { index: 2, kind: 'j' },
          ],
        },
      },
      {
        id: 's2c',
        codeLine: 3,
        description: '**j=3**: **1 < 2** → **minIdx = 3** (new smallest in the suffix).',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 3 },
            { id: 'j', name: 'j', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'j=3: 1 is the minimum seen so far.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 9, 1, 8] }],
          markers: [
            { index: 0, kind: 'i' },
            { index: 3, kind: 'minIdx' },
            { index: 3, kind: 'j' },
            { index: 3, kind: 'compare', label: '1<2' },
          ],
        },
      },
      {
        id: 's2d',
        codeLine: 3,
        description: '**j=4**: **8 ≮ 1** — inner pass done; **minIdx = 3**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 3 },
            { id: 'j', name: 'j', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'j=4: no update — ready to swap indices 0 and 3.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 9, 1, 8] }],
          markers: [
            { index: 0, kind: 'i' },
            { index: 3, kind: 'minIdx' },
            { index: 4, kind: 'j' },
          ],
        },
      },
      {
        id: 's3',
        codeLine: 8,
        description:
          'Swap **a[0]** with **a[3]**: **1** moves to the front; **tmp** briefly holds **5** on the stack.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 3 },
            { id: 'tmp', name: 'tmp', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 5 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'After swap: **{1, 2, 9, 5, 8}** — smallest value sits at index 0.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 9, 5, 8] }],
          markers: [
            { index: 0, kind: 'swap' },
            { index: 3, kind: 'swap' },
            { index: 0, kind: 'sortedThrough' },
          ],
        },
      },
      {
        id: 's4',
        codeLine: 1,
        description:
          '**i=1**: scan **j = 2..4** finds **minIdx = 1** (value **2**) — already in place; swap is a no-op.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 1 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 5 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Prefix **[0]** sorted; **i=1** is already the minimum of the suffix.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 9, 5, 8] }],
          markers: [
            { index: 0, kind: 'sortedThrough' },
            { index: 1, kind: 'i' },
            { index: 1, kind: 'minIdx' },
          ],
        },
      },
      {
        id: 's5a',
        codeLine: 3,
        description:
          '**i=2**: **j=3** gives **5 < 9** → **minIdx = 3**; **j=4** leaves **minIdx** at **3**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 3 },
            { id: 'j', name: 'j', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 9 },
                { name: '[3]', value: 5 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Smallest in **{9,5,8}** is **5** at index **3**.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 9, 5, 8] }],
          markers: [
            { index: 0, kind: 'sortedThrough' },
            { index: 1, kind: 'sortedThrough' },
            { index: 2, kind: 'i' },
            { index: 3, kind: 'minIdx' },
            { index: 4, kind: 'j' },
          ],
        },
      },
      {
        id: 's5b',
        codeLine: 8,
        description: 'Swap **a[2]** and **a[3]** → **{1, 2, 5, 9, 8}**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 3 },
            { id: 'tmp', name: 'tmp', type: 'primitive', value: 9 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 9 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Third position now holds **5**; prefix **0..2** sorted.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 5, 9, 8] }],
          markers: [
            { index: 2, kind: 'swap' },
            { index: 3, kind: 'swap' },
            { index: 0, kind: 'sortedThrough' },
            { index: 1, kind: 'sortedThrough' },
            { index: 2, kind: 'sortedThrough' },
          ],
        },
      },
      {
        id: 's6a',
        codeLine: 3,
        description: '**i=3**: only **j=4** remains; **8 < 9** → **minIdx = 4**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 4 },
            { id: 'j', name: 'j', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 9 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Last outer pass: swap **9** and **8**.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 5, 9, 8] }],
          markers: [
            { index: 0, kind: 'sortedThrough' },
            { index: 1, kind: 'sortedThrough' },
            { index: 2, kind: 'sortedThrough' },
            { index: 3, kind: 'i' },
            { index: 4, kind: 'minIdx' },
            { index: 4, kind: 'j' },
            { index: 4, kind: 'compare', label: '8<9' },
          ],
        },
      },
      {
        id: 's6b',
        codeLine: 8,
        description: 'Final swap yields **{1, 2, 5, 8, 9}**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrA' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'minIdx', name: 'minIdx', type: 'primitive', value: 4 },
            { id: 'tmp', name: 'tmp', type: 'primitive', value: 9 },
          ],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 8 },
                { name: '[4]', value: 9 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Entire array sorted in place on the heap.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 5, 8, 9] }],
          markers: [
            { index: 3, kind: 'swap' },
            { index: 4, kind: 'swap' },
            { index: 0, kind: 'sortedThrough' },
            { index: 1, kind: 'sortedThrough' },
            { index: 2, kind: 'sortedThrough' },
            { index: 3, kind: 'sortedThrough' },
          ],
        },
      },
      {
        id: 's7',
        codeLine: 1,
        description: '**i** reaches **4**; loop **i < length-1** stops — algorithm complete.',
        memory: {
          stack: [{ id: 'a', name: 'a', type: 'reference', refId: 'arrA' }],
          heap: [
            {
              id: 'arrA',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 8 },
                { name: '[4]', value: 9 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Final order **1, 2, 5, 8, 9**.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 5, 8, 9] }],
          markers: [{ index: 4, kind: 'sortedThrough' }],
        },
      },
    ],
    quiz: {
      id: 'q-4-6',
      question: 'Selection sort finds what in each outer pass?',
      options: ['Maximum in whole array', 'Minimum in the unsuffix starting at i, then swaps', 'Random pair', 'Median only'],
      correctAnswer: 1,
      explanation: 'Select the smallest remaining element and place it at i.',
      points: 175,
    },
  },
  {
    id: '4-7',
    order: 17.51,
    chapter: '5 · Arrays & algorithms',
    title: 'Insertion sort (shift & insert)',
    code: `int[] a = {5, 2, 8, 1, 4};
for (int i = 1; i < a.length; i++) {
  int key = a[i];
  int j = i - 1;
  while (j >= 0 && a[j] > key) {
    a[j + 1] = a[j];
    j--;
  }
  a[j + 1] = key;
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'Copy a[i] into key, walk j backward while a[j] > key, shift cells right, then write key into the hole — prefix stays sorted.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          caption: 'Five elements {5, 2, 8, 1, 4} — watch the sorted prefix grow after each **i**.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 8, 1, 4] }],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 0,
        description: '**a[0]=5** alone forms a trivial sorted prefix; **i** will run **1 … 4**.',
        memory: {
          stack: [{ id: 'a', name: 'a', type: 'reference', refId: 'arrI' }],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Sorted prefix is index **0** only.',
          bands: [{ id: 'a', label: 'a (int[])', values: [5, 2, 8, 1, 4] }],
          markers: [{ index: 0, kind: 'sortedThrough' }],
        },
      },
      {
        id: 's2',
        codeLine: 2,
        description:
          '**i=1:** **key = 2**, **j = 0**. **while**: **a[0]=5 > key** — shift incoming.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
            { id: 'key', name: 'key', type: 'primitive', value: 2 },
            { id: 'j', name: 'j', type: 'primitive', value: 0 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Compare **a[j]** to **key** before shifting.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [5, 2, 8, 1, 4] },
            { id: 'keyband', label: 'key', values: [2] },
          ],
          markers: [
            { index: 0, kind: 'j' },
            { index: 1, kind: 'key' },
          ],
        },
      },
      {
        id: 's2b',
        codeLine: 4,
        description: '**a[1] = a[0]** copies **5** right; **key** still holds **2**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
            { id: 'key', name: 'key', type: 'primitive', value: 2 },
            { id: 'j', name: 'j', type: 'primitive', value: 0 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'One shift step.',
          bands: [
            { id: 'a', label: 'a (int[]) — in flux', values: [5, 5, 8, 1, 4] },
            { id: 'keyband', label: 'key (local)', values: [2] },
          ],
          markers: [
            { index: 0, kind: 'j' },
            { index: 1, kind: 'compare', label: 'shifted' },
          ],
        },
      },
      {
        id: 's2c',
        codeLine: 5,
        description: '**j = −1** — **while** exits; hole for **key** is at index **0**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
            { id: 'key', name: 'key', type: 'primitive', value: 2 },
            { id: 'j', name: 'j', type: 'primitive', value: -1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 5 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Insert position: **j + 1 = 0**.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [5, 5, 8, 1, 4] },
            { id: 'keyband', label: 'key', values: [2] },
          ],
          markers: [{ index: 0, kind: 'compare', label: 'hole @0' }],
        },
      },
      {
        id: 's3',
        codeLine: 8,
        description: '**a[0] = key** → **{2, 5, 8, 1, 4}**; prefix **0..1** sorted.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
            { id: 'key', name: 'key', type: 'primitive', value: 2 },
            { id: 'j', name: 'j', type: 'primitive', value: -1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**2** inserted; **5** and **8** still to the right.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 1, 4] }],
          markers: [
            { index: 0, kind: 'key' },
            { index: 1, kind: 'sortedThrough' },
          ],
        },
      },
      {
        id: 's4',
        codeLine: 2,
        description:
          '**i=2:** **key = 8**. **a[1]=5** is not **> 8** — **while** never runs; **8** stays put.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
            { id: 'key', name: 'key', type: 'primitive', value: 8 },
            { id: 'j', name: 'j', type: 'primitive', value: 1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Larger **key** — no shifts this pass.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 1, 4] }],
          markers: [
            { index: 2, kind: 'i' },
            { index: 1, kind: 'sortedThrough' },
          ],
        },
      },
      {
        id: 's5',
        codeLine: 2,
        description:
          '**i=3:** **key = 1**. **j** walks left through **8, 5, 2** — three shift iterations.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'key', name: 'key', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: 2 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 1 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'About to shift **8** from slot **2** into slot **3**.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [2, 5, 8, 1, 4] },
            { id: 'keyband', label: 'key', values: [1] },
          ],
          markers: [
            { index: 2, kind: 'j' },
            { index: 3, kind: 'key' },
            { index: 2, kind: 'compare', label: '8>1' },
          ],
        },
      },
      {
        id: 's5b',
        codeLine: 4,
        description: 'After first shift and **j--**: **{2, 5, 8, 8, 4}** with **j = 1**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'key', name: 'key', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: 1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 8 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**a[1]=5 > key** — shift again.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [2, 5, 8, 8, 4] },
            { id: 'keyband', label: 'key', values: [1] },
          ],
          markers: [
            { index: 1, kind: 'j' },
            { index: 2, kind: 'compare', label: 'shift' },
          ],
        },
      },
      {
        id: 's5c',
        codeLine: 4,
        description: 'Second shift → **{2, 5, 5, 8, 4}**; **j = 0**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'key', name: 'key', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: 0 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 8 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**a[0]=2 > 1** — one more shift.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [2, 5, 5, 8, 4] },
            { id: 'keyband', label: 'key', values: [1] },
          ],
          markers: [
            { index: 0, kind: 'j' },
            { index: 1, kind: 'compare', label: 'shift' },
          ],
        },
      },
      {
        id: 's5c2',
        codeLine: 6,
        description: 'Third shift → **{2, 2, 5, 8, 4}**; **j = −1** after **j--** ends the **while**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'key', name: 'key', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: -1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 8 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Hole for **key** at **j+1 = 0**.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [2, 2, 5, 8, 4] },
            { id: 'keyband', label: 'key', values: [1] },
          ],
          markers: [{ index: 0, kind: 'compare', label: 'hole @0' }],
        },
      },
      {
        id: 's5d',
        codeLine: 8,
        description: '**a[0] = key** → **{1, 2, 5, 8, 4}**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'key', name: 'key', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: -1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 8 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Prefix **0..3** now sorted.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 5, 8, 4] }],
          markers: [
            { index: 0, kind: 'key' },
            { index: 3, kind: 'sortedThrough' },
          ],
        },
      },
      {
        id: 's6',
        codeLine: 2,
        description:
          '**i=4:** **key = 4**. **8** and **5** shift right; **2** stops the **while**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 4 },
            { id: 'key', name: 'key', type: 'primitive', value: 4 },
            { id: 'j', name: 'j', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 8 },
                { name: '[4]', value: 4 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**a[3]=8 > key** — shifting.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [1, 2, 5, 8, 4] },
            { id: 'keyband', label: 'key', values: [4] },
          ],
          markers: [
            { index: 3, kind: 'j' },
            { index: 4, kind: 'key' },
          ],
        },
      },
      {
        id: 's6b',
        codeLine: 4,
        description: 'After shifts: **{1, 2, 5, 8, 8}** then **{1, 2, 5, 5, 8}**; **j=1**, **2 ≯ 4** — exit **while**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 4 },
            { id: 'key', name: 'key', type: 'primitive', value: 4 },
            { id: 'j', name: 'j', type: 'primitive', value: 1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 5 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Hole for **key** is at **j+1 = 2**.',
          bands: [
            { id: 'a', label: 'a (int[])', values: [1, 2, 5, 5, 8] },
            { id: 'keyband', label: 'key', values: [4] },
          ],
          markers: [
            { index: 1, kind: 'j' },
            { index: 2, kind: 'compare', label: 'insert @2' },
          ],
        },
      },
      {
        id: 's7',
        codeLine: 8,
        description: '**a[2] = 4** → **{1, 2, 4, 5, 8}** — fully sorted.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrI' },
            { id: 'i', name: 'i', type: 'primitive', value: 4 },
            { id: 'key', name: 'key', type: 'primitive', value: 4 },
            { id: 'j', name: 'j', type: 'primitive', value: 1 },
          ],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 4 },
                { name: '[3]', value: 5 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Done — **1, 2, 4, 5, 8**.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 4, 5, 8] }],
          markers: [{ index: 4, kind: 'sortedThrough' }],
        },
      },
      {
        id: 's8',
        codeLine: 1,
        description: '**i** exits the outer loop; in-place sort complete.',
        memory: {
          stack: [{ id: 'a', name: 'a', type: 'reference', refId: 'arrI' }],
          heap: [
            {
              id: 'arrI',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 4 },
                { name: '[3]', value: 5 },
                { name: '[4]', value: 8 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Final array on the heap.',
          bands: [{ id: 'a', label: 'a (int[])', values: [1, 2, 4, 5, 8] }],
          markers: [
            { index: 0, kind: 'sortedThrough' },
            { index: 1, kind: 'sortedThrough' },
            { index: 2, kind: 'sortedThrough' },
            { index: 3, kind: 'sortedThrough' },
            { index: 4, kind: 'sortedThrough' },
          ],
        },
      },
    ],
    quiz: {
      id: 'q-4-7',
      question: 'Insertion sort maintains which invariant as i grows?',
      options: [
        'Entire array sorted immediately',
        'Prefix a[0..i-1] sorted before handling i',
        'Largest at front',
        'Random order preserved',
      ],
      correctAnswer: 1,
      explanation: 'Each pass inserts the next element into the sorted prefix.',
      points: 175,
    },
  },
  {
    id: '4-8',
    order: 5.6,
    chapter: '2 · Control flow',
    title: 'Enhanced for (for-each)',
    code: `int[] scores = {10, 20, 30};
int sum = 0;
for (int s : scores) {
  sum += s;
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'The enhanced for loop iterates each element of scores without exposing the index; `s` is a fresh local holding a copy of each primitive.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: '**scores** references a new heap **int[]**; array slots are **10, 20, 30**.',
        memory: {
          stack: [{ id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' }],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's1b',
        codeLine: 1,
        description: '**sum** starts at **0** before the loop runs.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 0 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 2,
        description:
          '**First** iteration: **s** is bound to **scores[0]** → **s = 10** (primitive copy). **sum** is still **0** until the body runs.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 0 },
            { id: 's', name: 's', type: 'primitive', value: 10 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 3,
        description: '**First** body line: **sum += s** → **sum = 0 + 10 = 10**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 10 },
            { id: 's', name: 's', type: 'primitive', value: 10 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 2,
        description:
          '**Second** iteration: **s = 20**. **sum** is **10** before this body pass.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 10 },
            { id: 's', name: 's', type: 'primitive', value: 20 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 3,
        description: '**Second** body pass: **sum += s** → **10 + 20 = 30**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 30 },
            { id: 's', name: 's', type: 'primitive', value: 20 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's6',
        codeLine: 2,
        description: '**Third** iteration: **s = 30**; **sum** is **30** before the last **+=**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 30 },
            { id: 's', name: 's', type: 'primitive', value: 30 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's7',
        codeLine: 3,
        description: '**Third** body pass: **sum += s** → **30 + 30 = 60**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 60 },
            { id: 's', name: 's', type: 'primitive', value: 30 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
      {
        id: 's8',
        codeLine: 2,
        description: 'No more elements — loop ends; **s** is out of scope.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrF' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 60 },
          ],
          heap: [{ id: 'arrF', className: 'int[]', fields: [{ name: '[0]', value: 10 }, { name: '[1]', value: 20 }, { name: '[2]', value: 30 }] }],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-4-8',
      question: 'Enhanced for (int s : arr) gives s as:',
      options: ['The index', 'Each element value (copy for int)', 'The array reference', 'Always null'],
      correctAnswer: 1,
      explanation: 'For primitives, s receives a copy of each slot’s value.',
      points: 175,
    },
  },
  {
    id: 'ap-9-2',
    order: 22.5,
    chapter: '6 · Inheritance & recursion',
    title: 'Overriding equals(Object)',
    code: '',
    files: [
      {
        name: 'Point.java',
        code: `public class Point {
  private final int x;
  private final int y;

  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  @Override
  public boolean equals(Object o) {
    if (!(o instanceof Point)) {
      return false;
    }
    Point p = (Point) o;
    return this.x == p.x && this.y == p.y;
  }
}
`,
      },
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    Point a = new Point(1, 2);
    Point b = new Point(1, 2);
    boolean same = a.equals(b);
    boolean refs = (a == b);
  }
}`,
      },
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description:
          '== compares references; equals can compare fields for logical equality — two distinct objects can still be “equal”.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java' },
          { file: 'Point.java', label: 'Point.java' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        activeFile: 'Main.java',
        description: 'Two Point objects on heap with same coordinates.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'ptA' },
            { id: 'b', name: 'b', type: 'reference', refId: 'ptB' },
          ],
          heap: [
            { id: 'ptA', className: 'Point', fields: [{ name: 'x', value: 1 }, { name: 'y', value: 2 }] },
            { id: 'ptB', className: 'Point', fields: [{ name: 'x', value: 1 }, { name: 'y', value: 2 }] },
          ],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 4,
        activeFile: 'Main.java',
        description: 'a.equals(b) runs Point.equals — compares x,y → same=true.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'ptA' },
            { id: 'b', name: 'b', type: 'reference', refId: 'ptB' },
            { id: 'same', name: 'same', type: 'primitive', value: true },
          ],
          heap: [
            { id: 'ptA', className: 'Point', fields: [{ name: 'x', value: 1 }, { name: 'y', value: 2 }] },
            { id: 'ptB', className: 'Point', fields: [{ name: 'x', value: 1 }, { name: 'y', value: 2 }] },
          ],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 5,
        activeFile: 'Main.java',
        description: 'a == b is false — different heap ids despite equal contents.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'ptA' },
            { id: 'b', name: 'b', type: 'reference', refId: 'ptB' },
            { id: 'same', name: 'same', type: 'primitive', value: true },
            { id: 'refs', name: 'refs', type: 'primitive', value: false },
          ],
          heap: [
            { id: 'ptA', className: 'Point', fields: [{ name: 'x', value: 1 }, { name: 'y', value: 2 }] },
            { id: 'ptB', className: 'Point', fields: [{ name: 'x', value: 1 }, { name: 'y', value: 2 }] },
          ],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'cap-9-2-this',
        name: 'Implicit this',
        description:
          'Open for explicit `Point this` and `this.` in the constructor and `equals` (teaching overlay).',
        files: [{ name: 'Point.java', lines: [4, 5, 6, 10, 11, 12, 13, 14, 15] }],
        implicitThis: { file: 'Point.java', className: 'Point' },
      },
    ],
    quiz: {
      id: 'q-ap-9-2',
      question: 'Two Point objects with identical x,y: a==b is false but a.equals(b) can be true because:',
      options: [
        'equals compares references only',
        'equals compares logical state; == compares reference identity',
        'Compiler error',
        'GC forces == true',
      ],
      correctAnswer: 1,
      explanation: 'Override equals to define value equality for your type.',
      points: 225,
    },
  },
  {
    id: 'ap-10-2',
    order: 17.42,
    chapter: '5 · Arrays & algorithms',
    title: 'Recursive binary search (not found)',
    recursionUnwindReturnLabels: ['-1', '-1', '-1'],
    recursionFinalReturnValue: -1,
    code: `// int[] sorted = {2, 5, 8, 10, 12, 15, 18}; target 11 (not present)
public int binSearch(int[] a, int target, int lo, int hi) {
  if (lo > hi) {
    return -1;
  }
  int mid = (lo + hi) / 2;
  if (a[mid] == target) {
    return mid;
  }
  if (a[mid] < target) {
    return binSearch(a, target, mid + 1, hi);
  }
  return binSearch(a, target, lo, mid - 1);
}
// binSearch(sorted, 11, 0, 6)`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'Same logic as iterative binary search, but each narrowing step is a **new stack frame**. The heap always holds the **one** shared array `a`; parameters `lo`, `hi`, `mid` are fresh locals per call. Trace: target **11** is missing from the data.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          caption: 'Shared sorted array (heap). Calls only pass lo/hi — they do not copy the array.',
          bands: [{ id: 'a', label: 'a / sorted (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 5,
        description:
          '**Call 1:** lo=0, hi=6 → mid=(0+6)/2 = **3**. Next we compare a[mid] to the target before deciding left or right.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Probe mid = 3 (value 10). Target 11 lies to the right.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 3, kind: 'mid' },
            { index: 3, kind: 'compare', label: '10<11' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)'],
      },
      {
        id: 's1b',
        codeLine: 10,
        description:
          'a[3]=10 is not the target, and **10 < 11**, so this call recurses **right**: binSearch(a, 11, 4, 6) — a new frame stacks on top of this one.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Probe mid = 3 (value 10). Target 11 lies to the right.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 3, kind: 'mid' },
            { index: 3, kind: 'compare', label: '10<11' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)'],
      },
      {
        id: 's2',
        codeLine: 5,
        description:
          '**Call 2** lo=4, hi=6 → mid=(4+6)/2 = **5**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Interval [4,6]. Probe mid = 5 (value 15) — discard right half logically.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 5, kind: 'mid' },
            { index: 5, kind: 'compare', label: '15>11' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)', 'binSearch(11,4,6)'],
      },
      {
        id: 's2b',
        codeLine: 12,
        description:
          '**15 > 11**, so this call recurses **left** — next interval [4,4] via binSearch(a, 11, 4, 4).',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Interval [4,6]. Probe mid = 5 (value 15) — discard right half logically.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 5, kind: 'mid' },
            { index: 5, kind: 'compare', label: '15>11' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)', 'binSearch(11,4,6)'],
      },
      {
        id: 's3',
        codeLine: 5,
        description:
          '**Call 3:** lo=4, hi=4 → mid=**4**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Interval collapsed to one index: lo=hi=4; mid is 4.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 4, kind: 'mid' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)', 'binSearch(11,4,6)', 'binSearch(11,4,4)'],
      },
      {
        id: 's3b',
        codeLine: 12,
        description:
          'a[4]=**12** is not the target and is **greater than** 11, so recurse **left**: binSearch(a, 11, 4, 3).',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Probe index 4 (value 12) vs 11 — discard upward in the recursion.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 4, kind: 'mid' },
            { index: 4, kind: 'compare', label: '12>11' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)', 'binSearch(11,4,6)', 'binSearch(11,4,4)'],
      },
      {
        id: 's4',
        codeLine: 2,
        description:
          'Call 4: lo=4, hi=3 — **empty range** (lo > hi). Base case: no index can hold the target; return **-1**. The array on the heap is unchanged.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Range [4,3] is invalid — visualize lo past hi (not found).',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 3, kind: 'hi', label: 'hi=3' },
            { index: 4, kind: 'lo', label: 'lo=4' },
          ],
        },
        recursionCallStack: [
          'binSearch(11,0,6)',
          'binSearch(11,4,6)',
          'binSearch(11,4,4)',
          'binSearch(11,4,3)',
        ],
      },
      {
        id: 's5',
        codeLine: 2,
        description:
          '**Unwind 1:** deepest call returned **-1**. Back in the caller with lo=4, hi=4 — that frame replaces the return value and will unwind next.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Call stack shrinks: three active binSearch frames.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'mid' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)', 'binSearch(11,4,6)', 'binSearch(11,4,4)'],
      },
      {
        id: 's6',
        codeLine: 2,
        description: '**Unwind 2:** another **-1** returns to the frame that searched [4,6].',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Two frames left — still the same heap array.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 5, kind: 'mid' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)', 'binSearch(11,4,6)'],
      },
      {
        id: 's7',
        codeLine: 2,
        description: '**Unwind 3:** only the **original** outer call remains; it also receives **-1**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 11 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Outer search concludes — target was never present.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 3, kind: 'mid' },
          ],
        },
        recursionCallStack: ['binSearch(11,0,6)'],
      },
      {
        id: 's8',
        codeLine: 2,
        description:
          'All frames popped: final outcome **-1** (not found). The heap array is unchanged.',
        memory: {
          stack: [{ id: 'ret', name: 'return to caller', type: 'primitive', value: -1 }],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Finished — same heap array as before; outcome is “missing” (-1).',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [],
        },
      },
    ],
    quiz: {
      id: 'q-ap-10-2',
      question: 'Recursive binary search base case “lo > hi” means:',
      options: ['Found target', 'Empty search range — not found', 'Infinite loop', 'Sort the array'],
      correctAnswer: 1,
      explanation: 'No indices left to examine.',
      points: 225,
    },
  },
  {
    id: 'ap-10-2-found',
    order: 17.43,
    chapter: '5 · Arrays & algorithms',
    title: 'Recursive binary search (found)',
    recursionUnwindReturnLabels: ['4', '4'],
    recursionFinalReturnValue: 4,
    code: `// int[] sorted = {2, 5, 8, 10, 12, 15, 18}; target 12 (index 4)
public int binSearch(int[] a, int target, int lo, int hi) {
  if (lo > hi) {
    return -1;
  }
  int mid = (lo + hi) / 2;
  if (a[mid] == target) {
    return mid;
  }
  if (a[mid] < target) {
    return binSearch(a, target, mid + 1, hi);
  }
  return binSearch(a, target, lo, mid - 1);
}
// binSearch(sorted, 12, 0, 6)`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'Same recursive structure as the **not found** trace: shared `a` on the heap, fresh `lo` / `hi` / `mid` per call. Here target **12** exists at index **4**.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          caption: 'Sorted array; search will narrow to index 4.',
          bands: [{ id: 'a', label: 'a / sorted (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [{ index: 4, kind: 'mid', label: '12 here' }],
        },
      },
      {
        id: 's1',
        codeLine: 5,
        description:
          '**Call 1:** lo=0, hi=6 → mid=(0+6)/2 = **3**. Compare a[mid] to target **12**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Probe mid = 3 (value 10). Target 12 lies to the right.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 3, kind: 'mid' },
            { index: 3, kind: 'compare', label: '10<12' },
          ],
        },
        recursionCallStack: ['binSearch(12,0,6)'],
      },
      {
        id: 's1b',
        codeLine: 10,
        description:
          '**10 < 12**, so recurse **right**: binSearch(a, 12, 4, 6).',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Probe mid = 3 (value 10). Target 12 lies to the right.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 3, kind: 'mid' },
            { index: 3, kind: 'compare', label: '10<12' },
          ],
        },
        recursionCallStack: ['binSearch(12,0,6)'],
      },
      {
        id: 's2',
        codeLine: 5,
        description: '**Call 2:** lo=4, hi=6 → mid=(4+6)/2 = **5**.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Interval [4,6]. Probe mid = 5 (value 15) — target is to the **left**.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 5, kind: 'mid' },
            { index: 5, kind: 'compare', label: '15>12' },
          ],
        },
        recursionCallStack: ['binSearch(12,0,6)', 'binSearch(12,4,6)'],
      },
      {
        id: 's2b',
        codeLine: 12,
        description: '**15 > 12**, so recurse **left**: binSearch(a, 12, 4, 4).',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Interval [4,6]. Probe mid = 5 (value 15) — target is to the **left**.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 5, kind: 'mid' },
            { index: 5, kind: 'compare', label: '15>12' },
          ],
        },
        recursionCallStack: ['binSearch(12,0,6)', 'binSearch(12,4,6)'],
      },
      {
        id: 's3',
        codeLine: 6,
        description:
          '**Call 3:** lo=4, hi=4 → mid=**4**. **a[4] == 12 == target** — success branch (no further recursion).',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 4 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Single index 4 — value 12 matches target.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 4, kind: 'lo' },
            { index: 4, kind: 'hi' },
            { index: 4, kind: 'mid' },
            { index: 4, kind: 'compare', label: 'hit' },
          ],
        },
        recursionCallStack: ['binSearch(12,0,6)', 'binSearch(12,4,6)', 'binSearch(12,4,4)'],
      },
      {
        id: 's4',
        codeLine: 7,
        description:
          'This frame **returns mid = 4** to its caller. Deeper calls are done; the value propagates up the stack.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 4 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Innermost call finished; two frames still active.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [{ index: 4, kind: 'mid', label: 'index 4' }],
        },
        recursionCallStack: ['binSearch(12,0,6)', 'binSearch(12,4,6)'],
      },
      {
        id: 's5',
        codeLine: 10,
        description:
          '**Unwind 1:** the middle frame’s recursive call yielded **4**; it **returns 4** to the outer call.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'arrBS' },
            { id: 'target', name: 'target', type: 'primitive', value: 12 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 6 },
            { id: 'mid', name: 'mid', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Only the original call remains; it receives **4** from the right recursion.',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [
            { index: 0, kind: 'lo' },
            { index: 6, kind: 'hi' },
            { index: 3, kind: 'mid' },
          ],
        },
        recursionCallStack: ['binSearch(12,0,6)'],
      },
      {
        id: 's6',
        codeLine: 10,
        description:
          '**Unwind 2:** outer call **returns 4** to whoever invoked binSearch — the index where **12** lives.',
        memory: {
          stack: [{ id: 'ret', name: 'return to caller', type: 'primitive', value: 4 }],
          heap: [
            {
              id: 'arrBS',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 5 },
                { name: '[2]', value: 8 },
                { name: '[3]', value: 10 },
                { name: '[4]', value: 12 },
                { name: '[5]', value: 15 },
                { name: '[6]', value: 18 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Search complete: returned index **4** (not -1).',
          bands: [{ id: 'a', label: 'a (int[])', values: [2, 5, 8, 10, 12, 15, 18] }],
          markers: [{ index: 4, kind: 'mid', label: 'found' }],
        },
      },
    ],
    concepts: [
      {
        id: 'c-ap-10-2-found-1',
        name: 'Found vs not found',
        description: 'Equality → return mid; empty range (lo > hi) → return -1.',
        lines: [2, 3, 6, 7, 9, 12],
      },
    ],
    quiz: {
      id: 'q-ap-10-2-found',
      question: 'When a[mid] == target in recursive binary search, this call returns:',
      options: ['-1 always', 'mid (the index where the match occurred)', 'lo', 'hi'],
      correctAnswer: 1,
      explanation: 'The success branch returns the probe index directly — no further recursion.',
      points: 225,
    },
  },
  {
    id: 'ap-10-3',
    order: 17.52,
    chapter: '5 · Arrays & algorithms',
    title: 'Merging two sorted arrays (the merge step)',
    code: `public int[] merge(int[] left, int[] right) {
  int[] out = new int[left.length + right.length];
  int i = 0, j = 0, k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      out[k++] = left[i++];
    } else {
      out[k++] = right[j++];
    }
  }
  while (i < left.length) {
    out[k++] = left[i++];
  }
  while (j < right.length) {
    out[k++] = right[j++];
  }
  return out;
}
// merge({1,3,6,10}, {2,4,5,12})`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          '**Merge** walks two **already sorted** inputs with pointers **i** and **j**, always copying the **smaller front** into **out[k]** and advancing that side. When one side is exhausted, the tail loops flush the rest. Full merge **sort** also **splits** and **recurses** — only this **combine** step is traced here. Open **Array view** to watch **out** fill row-by-row against **left** / **right**.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          caption:
            'Example inputs: **left** = {1,3,6,10}, **right** = {2,4,5,12} — fronts will **alternate** which side “wins”, so you can see the **two-pointer** rhythm.',
          bands: [
            { id: 'out', label: 'out (new int[8], still zeros)', values: [0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 'left', label: 'left (sorted)', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right (sorted)', values: [2, 4, 5, 12] },
          ],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 2,
        description:
          '**out** on the heap has **8** slots; stack locals **i**, **j**, **k** start at **0**. Inputs are **read-only** — only **out** changes.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
            { id: 'j', name: 'j', type: 'primitive', value: 0 },
            { id: 'k', name: 'k', type: 'primitive', value: 0 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 0 },
                { name: '[1]', value: 0 },
                { name: '[2]', value: 0 },
                { name: '[3]', value: 0 },
                { name: '[4]', value: 0 },
                { name: '[5]', value: 0 },
                { name: '[6]', value: 0 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**i** and **j** aim at the two **heads**; **k** is the next free slot in **out**.',
          bands: [
            { id: 'out', label: 'out', values: [0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'left', index: 0, kind: 'i' },
            { bandId: 'right', index: 0, kind: 'j' },
            { bandId: 'left', index: 0, kind: 'compare', label: '1' },
            { bandId: 'right', index: 0, kind: 'compare', label: '2' },
          ],
        },
      },
      {
        id: 's2',
        codeLine: 5,
        description:
          '**1 ≤ 2** → copy **left[i]** to **out[k]**; **i** and **k** advance. Smallest global value always lives at **one** of the two fronts.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: 0 },
            { id: 'k', name: 'k', type: 'primitive', value: 1 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 0 },
                { name: '[2]', value: 0 },
                { name: '[3]', value: 0 },
                { name: '[4]', value: 0 },
                { name: '[5]', value: 0 },
                { name: '[6]', value: 0 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'First pick from **left**; **out[0] = 1**.',
          bands: [
            { id: 'out', label: 'out', values: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 0, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 0, kind: 'sortedThrough' },
            { bandId: 'left', index: 1, kind: 'i' },
            { bandId: 'right', index: 0, kind: 'j' },
          ],
        },
      },
      {
        id: 's3',
        codeLine: 7,
        description:
          'Fronts are **3** vs **2** — **right** wins (**2** is smaller). The pattern **flips**: you are not “done with left”; the smaller front can be on **either** side.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
            { id: 'j', name: 'j', type: 'primitive', value: 1 },
            { id: 'k', name: 'k', type: 'primitive', value: 2 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 0 },
                { name: '[3]', value: 0 },
                { name: '[4]', value: 0 },
                { name: '[5]', value: 0 },
                { name: '[6]', value: 0 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**out[1] = 2** from **right**; watch **i** stay at **1** while **j** moves.',
          bands: [
            { id: 'out', label: 'out', values: [1, 2, 0, 0, 0, 0, 0, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 1, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 1, kind: 'sortedThrough' },
            { bandId: 'left', index: 1, kind: 'i' },
            { bandId: 'right', index: 1, kind: 'j' },
          ],
        },
      },
      {
        id: 's4',
        codeLine: 5,
        description: '**3 ≤ 4** → take **left** again; **out** grows **1, 2, 3, …** in order.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
            { id: 'j', name: 'j', type: 'primitive', value: 1 },
            { id: 'k', name: 'k', type: 'primitive', value: 3 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 3 },
                { name: '[3]', value: 0 },
                { name: '[4]', value: 0 },
                { name: '[5]', value: 0 },
                { name: '[6]', value: 0 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**out[2] = 3**.',
          bands: [
            { id: 'out', label: 'out', values: [1, 2, 3, 0, 0, 0, 0, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 2, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 2, kind: 'sortedThrough' },
            { bandId: 'left', index: 2, kind: 'i' },
            { bandId: 'right', index: 1, kind: 'j' },
          ],
        },
      },
      {
        id: 's5',
        codeLine: 7,
        description: '**6 > 4** → **right** wins; several steps in a row may favor the **same** side if its front stays smaller.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
            { id: 'j', name: 'j', type: 'primitive', value: 2 },
            { id: 'k', name: 'k', type: 'primitive', value: 4 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 3 },
                { name: '[3]', value: 4 },
                { name: '[4]', value: 0 },
                { name: '[5]', value: 0 },
                { name: '[6]', value: 0 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**out[3] = 4**.',
          bands: [
            { id: 'out', label: 'out', values: [1, 2, 3, 4, 0, 0, 0, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 3, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 3, kind: 'sortedThrough' },
            { bandId: 'left', index: 2, kind: 'i' },
            { bandId: 'right', index: 2, kind: 'j' },
          ],
        },
      },
      {
        id: 's6',
        codeLine: 7,
        description: '**6 > 5** → **right** again; **i** still **2** — the “losing” pointer waits until its front is smallest.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
            { id: 'j', name: 'j', type: 'primitive', value: 3 },
            { id: 'k', name: 'k', type: 'primitive', value: 5 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 3 },
                { name: '[3]', value: 4 },
                { name: '[4]', value: 5 },
                { name: '[5]', value: 0 },
                { name: '[6]', value: 0 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**out[4] = 5**.',
          bands: [
            { id: 'out', label: 'out', values: [1, 2, 3, 4, 5, 0, 0, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 4, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 4, kind: 'sortedThrough' },
            { bandId: 'left', index: 2, kind: 'i' },
            { bandId: 'right', index: 3, kind: 'j' },
          ],
        },
      },
      {
        id: 's7',
        codeLine: 5,
        description:
          '**6 ≤ 12** → **left** catches up. **≤** on ties (here would be equal fronts) keeps merge **stable** relative to **left**.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 3 },
            { id: 'j', name: 'j', type: 'primitive', value: 3 },
            { id: 'k', name: 'k', type: 'primitive', value: 6 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 3 },
                { name: '[3]', value: 4 },
                { name: '[4]', value: 5 },
                { name: '[5]', value: 6 },
                { name: '[6]', value: 0 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**out[5] = 6**.',
          bands: [
            { id: 'out', label: 'out', values: [1, 2, 3, 4, 5, 6, 0, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 5, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 5, kind: 'sortedThrough' },
            { bandId: 'left', index: 3, kind: 'i' },
            { bandId: 'right', index: 3, kind: 'j' },
          ],
        },
      },
      {
        id: 's8',
        codeLine: 5,
        description:
          '**10 ≤ 12** → last pick from **left**; **i** reaches **left.length** so the **main while** exits — **right** still has **12**.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 4 },
            { id: 'j', name: 'j', type: 'primitive', value: 3 },
            { id: 'k', name: 'k', type: 'primitive', value: 7 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 3 },
                { name: '[3]', value: 4 },
                { name: '[4]', value: 5 },
                { name: '[5]', value: 6 },
                { name: '[6]', value: 10 },
                { name: '[7]', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**out[6] = 10** — **left** exhausted; **right** still has one cell.',
          bands: [
            { id: 'out', label: 'out', values: [1, 2, 3, 4, 5, 6, 10, 0] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 6, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 6, kind: 'sortedThrough' },
            { bandId: 'right', index: 3, kind: 'j' },
          ],
        },
      },
      {
        id: 's9',
        codeLine: 14,
        description:
          'Second **while** copies **right**’s remainder (**j < right.length**). No comparisons — everything left is **≥** what is already in **out**.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 4 },
            { id: 'j', name: 'j', type: 'primitive', value: 4 },
            { id: 'k', name: 'k', type: 'primitive', value: 8 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 3 },
                { name: '[3]', value: 4 },
                { name: '[4]', value: 5 },
                { name: '[5]', value: 6 },
                { name: '[6]', value: 10 },
                { name: '[7]', value: 12 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: '**out[7] = 12** — **tail drain** finished; full merge **1 … 12**.',
          bands: [
            { id: 'out', label: 'out', values: [1, 2, 3, 4, 5, 6, 10, 12] },
            { id: 'left', label: 'left', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right', values: [2, 4, 5, 12] },
          ],
          markers: [
            { bandId: 'out', index: 7, kind: 'compare', label: 'written' },
            { bandId: 'out', index: 7, kind: 'sortedThrough' },
          ],
        },
      },
      {
        id: 's10',
        codeLine: 16,
        description: '**return out** — caller gets the **new** array reference; **left** and **right** are unchanged.',
        memory: {
          stack: [
            { id: 'left', name: 'left', type: 'reference', refId: 'arrL' },
            { id: 'right', name: 'right', type: 'reference', refId: 'arrR' },
            { id: 'out', name: 'out', type: 'reference', refId: 'arrOut' },
            { id: 'i', name: 'i', type: 'primitive', value: 4 },
            { id: 'j', name: 'j', type: 'primitive', value: 4 },
            { id: 'k', name: 'k', type: 'primitive', value: 8 },
          ],
          heap: [
            {
              id: 'arrL',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 3 },
                { name: '[2]', value: 6 },
                { name: '[3]', value: 10 },
              ],
            },
            {
              id: 'arrR',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 2 },
                { name: '[1]', value: 4 },
                { name: '[2]', value: 5 },
                { name: '[3]', value: 12 },
              ],
            },
            {
              id: 'arrOut',
              className: 'int[]',
              fields: [
                { name: '[0]', value: 1 },
                { name: '[1]', value: 2 },
                { name: '[2]', value: 3 },
                { name: '[3]', value: 4 },
                { name: '[4]', value: 5 },
                { name: '[5]', value: 6 },
                { name: '[6]', value: 10 },
                { name: '[7]', value: 12 },
              ],
            },
          ],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Merged result on the heap: **{1,2,3,4,5,6,10,12}**.',
          bands: [
            { id: 'out', label: 'out (returned)', values: [1, 2, 3, 4, 5, 6, 10, 12] },
            { id: 'left', label: 'left (unchanged)', values: [1, 3, 6, 10] },
            { id: 'right', label: 'right (unchanged)', values: [2, 4, 5, 12] },
          ],
          markers: [{ bandId: 'out', index: 7, kind: 'sortedThrough' }],
        },
      },
    ],
    quiz: {
      id: 'q-ap-10-3',
      question: 'The merge step requires each input array to be:',
      options: ['Unsorted', 'Individually sorted', 'Empty', 'Same length always'],
      correctAnswer: 1,
      explanation: 'Merge logic assumes sorted prefixes to pick the minimum front.',
      points: 225,
    },
  },
  {
    id: '6-lib-scanner',
    order: 29.5,
    chapter: '7 · Libraries',
    title: 'Scanner on a String',
    code: `import java.util.Scanner;

public class ScanDemo {
  public static void main(String[] args) {
    Scanner s = new Scanner("8 15 done");
    int a = s.nextInt();
    int b = s.nextInt();
    String w = s.next();
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'Scanner can read from an in-memory String as well as streams — same tokenizers: nextInt / next.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 4,
        description: 'Scanner object wraps the literal source text; s is a reference on the stack.',
        memory: {
          stack: [{ id: 's', name: 's', type: 'reference', refId: 'sc1' }],
          heap: [
            { id: 'strSrc', className: 'String', fields: [{ name: 'value', value: '"8 15 done"' }] },
            { id: 'sc1', className: 'Scanner', fields: [{ name: 'input', value: '@strSrc' }] },
          ],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 7,
        description: 'After nextInt twice and next: a=8, b=15, w references String "done".',
        memory: {
          stack: [
            { id: 's', name: 's', type: 'reference', refId: 'sc1' },
            { id: 'a', name: 'a', type: 'primitive', value: 8 },
            { id: 'b', name: 'b', type: 'primitive', value: 15 },
            { id: 'w', name: 'w', type: 'reference', refId: 'strW' },
          ],
          heap: [
            { id: 'strSrc', className: 'String', fields: [{ name: 'value', value: '"8 15 done"' }] },
            { id: 'sc1', className: 'Scanner', fields: [{ name: 'input', value: '@strSrc' }] },
            { id: 'strW', className: 'String', fields: [{ name: 'value', value: '"done"' }] },
          ],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c-lib-sc-1',
        name: 'Scanner tokens',
        description: 'nextInt reads integers; next reads next String token.',
        lines: [3, 4, 5, 6],
      },
    ],
    quiz: {
      id: 'q-6-lib-scanner',
      question: 'After two nextInt calls on "8 15 done", next() returns which token?',
      options: ['8', '15', 'done', 'whitespace'],
      correctAnswer: 2,
      explanation: 'Tokens are whitespace-separated; third token is "done".',
      points: 200,
    },
  },
];
