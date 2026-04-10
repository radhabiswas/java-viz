import type { Lesson } from '../types';
import {
  ap2018FrqArrayTester,
  ap2018FrqCodeWordChecker,
  ap2018FrqFrogSimulation,
  ap2018FrqWordPairList,
  FRQ_2018_Q1_FROG_PRINTED,
  FRQ_2018_Q1_REFERENCE_COMPLETE,
  FRQ_2018_Q1_REF_RUN_SIMULATIONS,
  FRQ_2018_Q1_REF_SIMULATE,
  FRQ_2018_Q2_REFERENCE_COMPLETE,
  FRQ_2018_Q2_REF_CONSTRUCTOR,
  FRQ_2018_Q2_REF_NUM_MATCHES,
  FRQ_2018_Q2_WORD_PAIR_LIST_PRINTED,
  FRQ_2018_Q3_CODE_WORD_CHECKER_PRINTED,
  FRQ_2018_Q3_REFERENCE_COMPLETE,
  FRQ_2018_Q4_ARRAY_TESTER_PRINTED,
  FRQ_2018_Q4_REFERENCE_COMPLETE,
  FRQ_2018_Q4_REF_GET_COLUMN,
  FRQ_2018_Q4_REF_IS_LATIN,
} from './ap2018FrqSheets';

/** Full 2018 FRQ set — orders 124–127 (parallel wave before PDF-stub hubs at 152+). */
export const ap2018FrqLessons: Lesson[] = [
  {
    id: 'ps-2018-1-frog-simulation',
    order: 124,
    chapter: '9 · AP CS A Problems',
    title: 'FrogSimulation — hops, goal & proportion',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2018',
    algorithmSubsection: 'Simulation & loops',
    apExamFrqSheet: ap2018FrqFrogSimulation,
    algorithmDesign: {
      implementationStartStepIndex: 7,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2018_Q1_FROG_PRINTED,
    implementationWorkspaceCode: FRQ_2018_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps18-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — `simulate`**\n\n• Start at position **0**\n• At most **`maxHops`** hops; each hop adds **`hopDistance()`** (may be **negative**)\n• Return **`true`** as soon as position **≥ `goalDistance`**\n• Return **`false`** immediately if position **< 0**\n• If you use all hops without hitting the goal → **`false`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`int position = 0`** before the loop\n• **`for`** with hop count **< `maxHops`**\n• Inside: **`position += hopDistance()`** then check **goal** then **negative**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2018_Q1_REF_SIMULATE,
      },
      {
        id: 'ps18-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `runSimulations(num)`**\n\n• Call **`simulate()`** exactly **`num`** times (**assume** it works)\n• Count **`true`** results\n• Return **`(double) count / num`** (exam: **100** of **400** → **0.25**)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• **`int countSuccess = 0`** outside the loop\n• **`for`** **`num`** iterations; **`if (simulate()) countSuccess++`**\n• Cast before dividing so Java does **floating-point** proportion',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2018_Q1_REF_RUN_SIMULATIONS,
      },
      {
        id: 'ps18-1-s7',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is **early exit** inside a bounded loop. Part (b) is **Monte Carlo style** counting — no need to re-prove **`simulate`**.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-1-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'gd', name: 'goalDistance', type: 'primitive', value: 24 },
            { id: 'mh', name: 'maxHops', type: 'primitive', value: 5 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** includes a sample **`hopDistance`** for tracing; the exam leaves **`hopDistance`** unimplemented.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps18-1-sim',
        name: 'simulate',
        description: 'Accumulate hopDistance; exit on goal, negative, or hop limit.',
        lines: [29, 30, 31],
        implementationLines: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        memory: {
          stack: [
            { id: 'pos', name: 'position', type: 'primitive', value: 18 },
            { id: 'ct', name: 'count', type: 'primitive', value: 4 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Check **goal** and **negative** **inside** the hop loop.',
      },
      {
        id: 'c-ps18-1-run',
        name: 'runSimulations',
        description: 'Count true simulate() results; divide by num as double.',
        lines: [38, 39, 40],
        implementationLines: [29, 30, 31, 32, 33, 34, 35, 36, 37],
        memory: {
          stack: [{ id: 'cs', name: 'countSuccess', type: 'primitive', value: 100 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`(double) countSuccess / num`** satisfies the **0.25** example.',
      },
    ],
  },
  {
    id: 'ps-2018-2-word-pair-list',
    order: 125,
    chapter: '9 · AP CS A Problems',
    title: 'WordPairList — all i < j pairs & matches',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2018',
    algorithmSubsection: 'Nested loops & ArrayList',
    apExamFrqSheet: ap2018FrqWordPairList,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2018_Q2_WORD_PAIR_LIST_PRINTED,
    implementationWorkspaceCode: FRQ_2018_Q2_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps18-2-s1',
        codeLine: -1,
        description:
          '**Part (a) — constructor**\n\n• Build **`allPairs`** as a new **`ArrayList`**\n• For every **i** and **j** with **0 ≤ i < j < words.length**, add **`new WordPair(words[i], words[j])`**\n• Each ordered pair **(later index, earlier index)** is **excluded** — only **i < j**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-2-s2',
        codeLine: -1,
        description:
          '**Part (a) — examples**\n\n• **`{"one","two","three"}`** → **3** pairs\n• **`{"the","more","the","merrier"}`** → **6** pairs (duplicate words still produce distinct **`WordPair`** objects)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-2-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2018_Q2_REF_CONSTRUCTOR,
      },
      {
        id: 'ps18-2-s4',
        codeLine: -1,
        description:
          '**Part (b) — `numMatches`**\n\n• Count **`WordPair`** entries where **`getFirst().equals(getSecond())`**\n• Example: **`{"the","red","fox","the","red"}`** → **`numMatches()`** is **2**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-2-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2018_Q2_REF_NUM_MATCHES,
      },
      {
        id: 'ps18-2-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** uses **`ArrayList<WordPair>`**; the exam may show a **raw** `ArrayList` — both are acceptable if consistent.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps18-2-con',
        name: 'Constructor (i < j)',
        description: 'Nested loops: outer i, inner j from i+1; add WordPair for each pair.',
        lines: [30, 31, 32],
        implementationLines: [24, 25, 26, 27, 28, 29, 30, 31],
        memory: {
          stack: [
            { id: 'ii', name: 'i', type: 'primitive', value: 0 },
            { id: 'jj', name: 'j', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**j** starts at **i + 1** so each unordered pair appears once as **(i, j)**.',
      },
      {
        id: 'c-ps18-2-nm',
        name: 'numMatches',
        description: 'Traverse allPairs; count equals on first and second.',
        lines: [35, 36, 37],
        implementationLines: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
        memory: {
          stack: [{ id: 'cn', name: 'count', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Use **`.equals`** on **`String`**, not **`==`**.',
      },
    ],
  },
  {
    id: 'ps-2018-3-code-word-checker',
    order: 126,
    chapter: '9 · AP CS A Problems',
    title: 'CodeWordChecker — StringChecker & bounds',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2018',
    algorithmSubsection: 'Interfaces & String',
    apExamFrqSheet: ap2018FrqCodeWordChecker,
    algorithmDesign: {
      implementationStartStepIndex: 4,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2018_Q3_CODE_WORD_CHECKER_PRINTED,
    implementationWorkspaceCode: FRQ_2018_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps18-3-s1',
        codeLine: -1,
        description:
          '**`StringChecker`**\n\n• **`boolean isValid(String str)`** — your **`CodeWordChecker`** must implement this\n• **Three-argument** constructor: **min** length, **max** length (inclusive), and a **forbidden** substring\n• **One-argument** constructor: forbidden substring only → lengths default to **6** and **20** inclusive',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-3-s2',
        codeLine: -1,
        description:
          '**Examples**\n\n• **`CodeWordChecker(5, 8, "$")`**: **`"happy"`** valid; **`"happy$"`** invalid (contains **`"$"`**); **`"Code"`** too short\n• **`CodeWordChecker("pass")`**: **`"MyPass"`** valid; **`"Mypassport"`** invalid; length defaults **6…20**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-3-s3',
        codeLine: -1,
        description:
          '**`isValid` logic**\n\n• If **`str.length()`** is **outside** **[minLen, maxLen]** → **`false`**\n• If **`str.indexOf(forbidden) >= 0`** → **`false`**\n• Otherwise **`true`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-3-s4',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below (interface + implementation).',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2018_Q3_REFERENCE_COMPLETE,
      },
      {
        id: 'ps18-3-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [{ id: 'st', className: 'String', fields: [{ name: 'value', value: '"happy$"' }] }],
          staticArea: [],
        },
        memoryCaption: 'Trace **`isValid`** against the exam tables for both constructors.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps18-3-ctor',
        name: 'Constructors & fields',
        description: 'Store min, max, forbidden; single-arg ctor sets 6 and 20.',
        lines: [9, 10, 11, 13, 14, 15],
        implementationLines: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`forbidden`** is the string that must **not** appear as a **substring**.',
      },
      {
        id: 'c-ps18-3-val',
        name: 'isValid',
        description: 'Length window then indexOf for forbidden substring.',
        lines: [17, 18, 19],
        implementationLines: [23, 24, 25, 26, 27, 28, 29],
        memory: {
          stack: [{ id: 'ln', name: 'len', type: 'primitive', value: 6 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`indexOf` < 0** means the forbidden text does not occur.',
      },
    ],
  },
  {
    id: 'ps-2018-4-array-tester',
    order: 127,
    chapter: '9 · AP CS A Problems',
    title: 'ArrayTester — getColumn & Latin square',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2018',
    algorithmSubsection: '2D arrays & static methods',
    apExamFrqSheet: ap2018FrqArrayTester,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2018_Q4_ARRAY_TESTER_PRINTED,
    implementationWorkspaceCode: FRQ_2018_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps18-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `getColumn(arr2D, c)`**\n\n• Return a **new** **`int`** array with length **`arr2D.length`** (number of **rows**)\n• Element **`r`** of the result is **`arr2D[r][c]`**\n• **`arr2D`** must remain **unchanged**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — example**\n\nColumn **1** of the exam’s **4×3** sample is **`{1, 4, 7, 5}`** — same **top-to-bottom** order as rows.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2018_Q4_REF_GET_COLUMN,
      },
      {
        id: 'ps18-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — Latin square**\n\n• Row **0** has **no** duplicate values\n• **Every** value in row **0** appears in **each** other **row**\n• **Every** value in row **0** appears in **each** **column** (as a multiset of entries in that column)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-4-s5',
        codeLine: -1,
        description:
          '**Part (b) — use helpers**\n\n• **`containsDuplicates(square[0])`** → if **`true`**, not Latin\n• For rows **1…n-1**: **`hasAllValues(square[0], square[r])`**\n• For each column **`c`**: **`hasAllValues(square[0], getColumn(square, c))`**\n• You **must** use **`getColumn`**, **`hasAllValues`**, and **`containsDuplicates`** as specified',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps18-4-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2018_Q4_REF_IS_LATIN,
      },
      {
        id: 'ps18-4-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** includes working **`hasAllValues`** / **`containsDuplicates`** so **`isLatin`** runs end-to-end.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps18-4-col',
        name: 'getColumn',
        description: 'New int[rowCount]; fill from arr2D[r][c].',
        lines: [9, 10, 11],
        implementationLines: [3, 4, 5, 6, 7, 8, 9],
        memory: {
          stack: [{ id: 'cc', name: 'c', type: 'primitive', value: 1 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Column length follows **row count**, not **`arr2D[0].length`**.',
      },
      {
        id: 'c-ps18-4-latin',
        name: 'isLatin',
        description: 'Reject duplicate first row; hasAllValues on each row and each getColumn.',
        lines: [36, 37, 38],
        implementationLines: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Compare **row 0** against **every row** and **every extracted column**.',
      },
    ],
  },
];
