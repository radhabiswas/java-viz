import type { Lesson } from '../types';
import {
  ap2017FrqDigits,
  ap2017FrqMultPractice,
  ap2017FrqPhrase,
  ap2017FrqSuccessors,
  FRQ_2017_Q1_DIGITS_PRINTED,
  FRQ_2017_Q1_REFERENCE_COMPLETE,
  FRQ_2017_Q1_REF_DIGITS_CONSTRUCTOR,
  FRQ_2017_Q1_REF_IS_STRICTLY_INCREASING,
  FRQ_2017_Q2_MULT_PRACTICE_PRINTED,
  FRQ_2017_Q2_REFERENCE_COMPLETE,
  FRQ_2017_Q3_PHRASE_PRINTED,
  FRQ_2017_Q3_REF_FIND_LAST,
  FRQ_2017_Q3_REFERENCE_COMPLETE,
  FRQ_2017_Q3_REF_REPLACE_NTH,
  FRQ_2017_Q4_REFERENCE_COMPLETE,
  FRQ_2017_Q4_REF_FIND_POSITION,
  FRQ_2017_Q4_REF_GET_SUCCESSOR_ARRAY,
  FRQ_2017_Q4_SUCCESSORS_PRINTED,
} from './ap2017FrqSheets';

/** Full 2017 FRQ set — orders 128–131 (parallel wave before PDF-stub hubs at 152+). */
export const ap2017FrqLessons: Lesson[] = [
  {
    id: 'ps-2017-1-digits',
    order: 128,
    chapter: '9 · AP CS A Problems',
    title: 'Digits — list of digits & strictly increasing',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2017',
    algorithmSubsection: 'ArrayList & loops',
    apExamFrqSheet: ap2017FrqDigits,
    algorithmDesign: {
      implementationStartStepIndex: 7,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2017_Q1_DIGITS_PRINTED,
    implementationWorkspaceCode: FRQ_2017_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps17-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — constructor**\n\n• Build **`digitList`** from **`num`** (**≥ 0**)\n• **`new Digits(0)`** → list **`[0]`**\n• **`new Digits(15704)`** → **`[1,5,7,0,4]`** — **left-to-right** order',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Create empty **`ArrayList`**\n• **`num == 0`** → **`add(0)`** and done\n• Else **`while (num > 0)`**: **`add(0, num % 10)`** then **`num /= 10`** to **prepend** each digit',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2017_Q1_REF_DIGITS_CONSTRUCTOR,
      },
      {
        id: 'ps17-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `isStrictlyIncreasing`**\n\n• **Strictly** increasing: each digit **>** the previous (**not** **≥**)\n• **`7`**, **`1356`** → **true**; **`1336`**, **`1536`**, **`65310`** → **false**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Loop **`i`** from **1** to **`size-1`**\n• If **`get(i) <= get(i-1)`** → **false**\n• All pairs pass → **true**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2017_Q1_REF_IS_STRICTLY_INCREASING,
      },
      {
        id: 'ps17-1-s7',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is **digit extraction** with a **special case** for zero. Part (b) is a **single pass** over adjacent **`Integer`**s.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-1-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [{ id: 'nm', name: 'num', type: 'primitive', value: 15704 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** uses **`ArrayList<Integer>`**; the exam may show a **raw** `ArrayList`.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps17-1-ctor',
        name: 'Part (a): constructor',
        description: 'Special-case 0; otherwise prepend digits with % 10 and /= 10.',
        lines: [15, 16],
        implementationLines: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        memory: {
          stack: [{ id: 'n', name: 'num', type: 'primitive', value: 7 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'After construction, **`digitList`** matches **`num`** left-to-right.',
      },
      {
        id: 'c-ps17-1-inc',
        name: 'Part (b): isStrictlyIncreasing',
        description: 'Return false on first non-increasing adjacent pair.',
        lines: [23, 24],
        implementationLines: [18, 19, 20, 21, 22, 23, 24, 25],
        memory: {
          stack: [{ id: 'i', name: 'i', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Compare **`get(i)`** with **`get(i-1)`** using **strict** inequality.',
      },
    ],
  },
  {
    id: 'ps-2017-2-mult-practice',
    order: 129,
    chapter: '9 · AP CS A Problems',
    title: 'MultPractice — StudyPractice & TIMES strings',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2017',
    algorithmSubsection: 'Interfaces & class design',
    apExamFrqSheet: ap2017FrqMultPractice,
    algorithmDesign: {
      implementationStartStepIndex: 3,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 2, label: 'Solution' },
      ],
    },
    code: FRQ_2017_Q2_MULT_PRACTICE_PRINTED,
    implementationWorkspaceCode: FRQ_2017_Q2_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps17-2-s1',
        codeLine: -1,
        description:
          '**Behavior**\n\n• **`first`** stays fixed; **`second`** starts at the constructor’s second argument\n• **`getProblem()`** → **`"first TIMES second"`** (spaces around **TIMES**)\n• **`nextProblem()`** → **`second++`**; **`getProblem`** unchanged until then',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-2-s2',
        codeLine: -1,
        description:
          '**Examples**\n\n• **`new MultPractice(7,3)`** → **`7 TIMES 3`**, then **`7 TIMES 4`**, …\n• **`new MultPractice(4,12)`** then **`nextProblem`** once → **`4 TIMES 13`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-2-s3',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below (interface + class).',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2017_Q2_REFERENCE_COMPLETE,
      },
      {
        id: 'ps17-2-s4',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'mp',
              className: 'MultPractice',
              fields: [
                { name: 'first', value: '7' },
                { name: 'second', value: '5' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** after several **`nextProblem`** calls — **`first`** unchanged.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps17-2-prob',
        name: 'getProblem',
        description: 'Build string with first, literal TIMES, and second.',
        lines: [16, 17, 18],
        implementationLines: [19, 20, 21],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Use **`+`** with **`" TIMES "`** exactly.',
      },
      {
        id: 'c-ps17-2-next',
        name: 'nextProblem',
        description: 'Increment second only.',
        lines: [20, 21, 22],
        implementationLines: [23, 24, 25],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**first** never changes after construction.',
      },
    ],
  },
  {
    id: 'ps-2017-3-phrase',
    order: 130,
    chapter: '9 · AP CS A Problems',
    title: 'Phrase — replace nth & last occurrence',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2017',
    algorithmSubsection: 'String methods',
    apExamFrqSheet: ap2017FrqPhrase,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2017_Q3_PHRASE_PRINTED,
    implementationWorkspaceCode: FRQ_2017_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps17-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `replaceNthOccurrence`**\n\n• Use **`findNthOccurrence(str, n)`** (given)\n• If **no** n-th occurrence → **leave** **`currentPhrase`**\n• Else **splice** **`repl`** at that index (**`substring`** triple)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — examples**\n\n• **`"A cat ate late."`** replace **`"at"`** **1** with **`"rane"`** → **`"A crane ate late."`**\n• Overlapping **`"aa"`** in **`"aaaa"`** — nth occurrence matters for which span you replace',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2017_Q3_REF_REPLACE_NTH,
      },
      {
        id: 'ps17-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `findLastOccurrence`**\n\n• Return **index** of **last** **`str`** in **`currentPhrase`**, or **-1**\n• Must use **`findNthOccurrence`** appropriately',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-3-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Try **`n = 1, 2, …`**\n• While **`findNthOccurrence`** **≥ 0**, remember index; when **-1**, return last remembered (or **-1** if none)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-3-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2017_Q3_REF_FIND_LAST,
      },
      {
        id: 'ps17-3-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [{ id: 'ph', className: 'Phrase', fields: [{ name: 'currentPhrase', value: '"A cat ate late."' }] }],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** includes a working **`findNthOccurrence`** for tracing.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps17-3-rep',
        name: 'replaceNthOccurrence',
        description: 'findNthOccurrence then substring concat if found.',
        lines: [25, 26, 27],
        implementationLines: [22, 23, 24, 25, 26, 27, 28],
        memory: {
          stack: [{ id: 'ix', name: 'idx', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Replace exactly **one** occurrence at **`idx`**.',
      },
      {
        id: 'c-ps17-3-last',
        name: 'findLastOccurrence',
        description: 'Advance n until findNthOccurrence returns -1.',
        lines: [35, 36, 37],
        implementationLines: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
        memory: {
          stack: [{ id: 'ls', name: 'last', type: 'primitive', value: 11 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Walk through successive **n** until the helper fails.',
      },
    ],
  },
  {
    id: 'ps-2017-4-successors',
    order: 131,
    chapter: '9 · AP CS A Problems',
    title: 'Successors — findPosition & successor grid',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2017',
    algorithmSubsection: '2D array & objects',
    apExamFrqSheet: ap2017FrqSuccessors,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2017_Q4_SUCCESSORS_PRINTED,
    implementationWorkspaceCode: FRQ_2017_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps17-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `findPosition`**\n\n• Search **`intArr`** for **`num`**\n• Return **`new Position(r,c)`** when **`intArr[r][c] == num`**\n• If **never** found → **`null`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — example**\n\n• Value **8** at row **2** column **1** → **`(2,1)`**\n• **17** not in array → **`null`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2017_Q4_REF_FIND_POSITION,
      },
      {
        id: 'ps17-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — `getSuccessorArray`**\n\n• **Successor** of **`v`** is **`v+1`**\n• Each output cell = **`Position`** where **`v+1`** lives, or **`null`** if **`v`** is the **maximum** in the grid\n• **Must** call **`findPosition`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-4-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Scan once for **`maxVal`**\n• Allocate **`Position[rows][cols]`**\n• For each **`v`**: **`v == maxVal`** → **`null`**; else **`findPosition(v+1, intArr)`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps17-4-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2017_Q4_REF_GET_SUCCESSOR_ARRAY,
      },
      {
        id: 'ps17-4-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** includes **`Position`** with **`getRow`** / **`getCol`** for clarity.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps17-4-find',
        name: 'findPosition',
        description: 'Nested for loops over r and c; compare to num.',
        lines: [18, 19, 20],
        implementationLines: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        memory: {
          stack: [
            { id: 'rr', name: 'r', type: 'primitive', value: 2 },
            { id: 'cc', name: 'c', type: 'primitive', value: 1 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Return as soon as a match is found.',
      },
      {
        id: 'c-ps17-4-succ',
        name: 'getSuccessorArray',
        description: 'Max value maps to null; others map to findPosition(v+1, intArr).',
        lines: [27, 28, 29],
        implementationLines: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
        memory: {
          stack: [{ id: 'mv', name: 'maxVal', type: 'primitive', value: 16 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Consecutive values ⇒ exactly one cell has no successor.',
      },
    ],
  },
];
