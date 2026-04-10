import type { Lesson } from '../types';
import {
  ap2015FrqDiverseArray,
  ap2015FrqHiddenWord,
  ap2015FrqNumberGroup,
  ap2015FrqSparseArray,
  FRQ_2015_Q1_DIVERSE_ARRAY_PRINTED,
  FRQ_2015_Q1_REF_ARRAY_SUM,
  FRQ_2015_Q1_REF_IS_DIVERSE,
  FRQ_2015_Q1_REF_ROW_SUMS,
  FRQ_2015_Q1_REFERENCE_COMPLETE,
  FRQ_2015_Q2_HIDDEN_WORD_PRINTED,
  FRQ_2015_Q2_REF_GET_HINT,
  FRQ_2015_Q2_REFERENCE_CLASS,
  FRQ_2015_Q3_REF_GET_VALUE_AT,
  FRQ_2015_Q3_REF_REMOVE_COLUMN,
  FRQ_2015_Q3_REFERENCE_COMPLETE,
  FRQ_2015_Q3_SPARSE_ARRAY_PRINTED,
  FRQ_2015_Q4_NUMBER_GROUP_PRINTED,
  FRQ_2015_Q4_REF_MULTI_CONTAINS,
  FRQ_2015_Q4_REF_RANGE_CONTAINS,
  FRQ_2015_Q4_REFERENCE_COMPLETE,
} from './ap2015FrqSheets';

/** Full 2015 FRQ set — orders 136–139 (parallel wave; before PDF-stub hubs at 152+). */
export const ap2015FrqLessons: Lesson[] = [
  {
    id: 'ps-2015-1-diverse-array',
    order: 136,
    chapter: '9 · AP CS A Problems',
    title: 'DiverseArray — row sums & diversity',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2015',
    algorithmSubsection: '1D & 2D arrays',
    apExamFrqSheet: ap2015FrqDiverseArray,
    algorithmDesign: {
      implementationStartStepIndex: 10,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
        { at: 6, label: 'Part (c)' },
      ],
    },
    code: FRQ_2015_Q1_DIVERSE_ARRAY_PRINTED,
    implementationWorkspaceCode: FRQ_2015_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps15-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — `arraySum(arr)`**\n\n• Return the **sum** of every element in the **1D** array\n• Example: **`{1,3,2,7,3}`** → **16**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Accumulator **`sum`**, enhanced **`for`** over **`arr`**, or indexed loop\n• **O(n)** over **`arr.length`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q1_REF_ARRAY_SUM,
      },
      {
        id: 'ps15-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `rowSums(arr2D)`**\n\n• Return a **new** **`int[]`** of length **`arr2D.length`**\n• Entry **`k`** = sum of row **`k`** (each row is a **1D** array)\n• Example **`mat1`** → **`{16, 32, 28, 20}`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Allocate **`sums`**\n• For **`r`**, set **`sums[r]`** using a row loop **or** call **`arraySum(arr2D[r])`** for credit reuse',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q1_REF_ROW_SUMS,
      },
      {
        id: 'ps15-1-s7',
        codeLine: -1,
        description:
          '**Part (c) — `isDiverse(arr2D)`**\n\n• **Diverse** ⇔ **all row sums distinct**\n• Use **`rowSums`** as required; then compare pairs of sums',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-1-s8',
        codeLine: -1,
        description:
          '**Part (c) — design**\n\n• **`int[] sums = rowSums(arr2D)`**\n• Nested loop: **`0 ≤ i < j < sums.length`** — if **`sums[i] == sums[j]`** → **false**\n• If no collision → **true**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-1-s9',
        codeLine: -1,
        description: '**Solution — Part (c)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q1_REF_IS_DIVERSE,
      },
      {
        id: 'ps15-1-s10',
        codeLine: -1,
        description:
          '**Before you code**\n\n**(b)** reuses **(a)**; **(c)** reuses **(b)**. Check **empty** array edge cases: **0×0** is vacuously diverse.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-1-s11',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'r', name: 'r', type: 'primitive', value: 1 },
            { id: 's', name: 'sums[r]', type: 'primitive', value: 32 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: static helpers on **`DiverseArray`** — **Concepts** map to each part.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps15-1-a',
        name: 'Part (a): arraySum',
        description: 'Accumulate all entries in the 1D array.',
        lines: [20, 21],
        implementationLines: [3, 4, 5, 6, 7, 8, 9],
        memory: {
          stack: [{ id: 'sm', name: 'sum', type: 'primitive', value: 16 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Enhanced **`for`** or index loop over **`arr`**.',
      },
      {
        id: 'c-ps15-1-b',
        name: 'Part (b): rowSums',
        description: 'One sum per row; may delegate each row to arraySum.',
        lines: [28, 29],
        implementationLines: [11, 12, 13, 14, 15, 16, 17],
        memory: {
          stack: [{ id: 'rr', name: 'r', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`sums[r]`** holds the total for **`arr2D[r]`**.',
      },
      {
        id: 'c-ps15-1-c',
        name: 'Part (c): isDiverse',
        description: 'Compare all pairs of row sums from rowSums.',
        lines: [36, 37],
        implementationLines: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        memory: {
          stack: [
            { id: 'ii', name: 'i', type: 'primitive', value: 0 },
            { id: 'jj', name: 'j', type: 'primitive', value: 3 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Duplicate row sum → return **false** immediately.',
      },
    ],
  },
  {
    id: 'ps-2015-2-hidden-word',
    order: 137,
    chapter: '9 · AP CS A Problems',
    title: 'HiddenWord — getHint',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2015',
    algorithmSubsection: 'String & class design',
    apExamFrqSheet: ap2015FrqHiddenWord,
    algorithmDesign: {
      implementationStartStepIndex: 3,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 2, label: 'Solution' },
      ],
    },
    code: FRQ_2015_Q2_HIDDEN_WORD_PRINTED,
    implementationWorkspaceCode: FRQ_2015_Q2_REFERENCE_CLASS,
    steps: [
      {
        id: 'ps15-2-s1',
        codeLine: -1,
        description:
          '**Rules**\n\n• Same index **match** → append that **letter**\n• Else letter **appears** somewhere in **hidden** → append **`+`**\n• Else append **`*`**\n• **`HARPS`** / **`"HEART"`** → **`"H*++*"`**; **`"HARPS"`** → **`"HARPS"`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-2-s2',
        codeLine: -1,
        description:
          '**Design**\n\n• Store **`hidden`** (constructor)\n• **`StringBuilder`** for the hint\n• Loop **`i`**; **`char g = guess.charAt(i)`** — compare to **`hidden.charAt(i)`**, then **`hidden.indexOf(g)`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-2-s3',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q2_REFERENCE_CLASS,
      },
      {
        id: 'ps15-2-s4',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [{ id: 'gs', name: 'guess', type: 'reference', refId: 'strGuess' }],
          heap: [{ id: 'strGuess', className: 'String', fields: [{ name: 'value', value: '"HEART"' }] }],
          staticArea: [],
        },
        memoryCaption: 'Walk **`getHint`** position by position against **`hidden`**.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps15-2-field',
        name: 'Field & constructor',
        description: 'Remember the hidden word for getHint.',
        lines: [3, 4, 5],
        implementationLines: [2, 3, 4, 5, 6],
        memory: {
          stack: [],
          heap: [{ id: 'hw', className: 'HiddenWord', fields: [{ name: 'hidden', value: '"HARPS"' }] }],
          staticArea: [],
        },
        memoryCaption: '**`final String hidden`** assigned once in the constructor.',
      },
      {
        id: 'c-ps15-2-hint',
        name: 'getHint',
        description: 'Exact → letter; else in-word → +; else *.',
        lines: [7, 8],
        implementationLines: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        memory: {
          stack: [{ id: 'ix', name: 'i', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`indexOf`** treats any occurrence as “in the word.”',
      },
    ],
  },
  {
    id: 'ps-2015-3-sparse-array',
    order: 138,
    chapter: '9 · AP CS A Problems',
    title: 'SparseArray — lookup & remove column',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2015',
    algorithmSubsection: 'ArrayList & encapsulation',
    apExamFrqSheet: ap2015FrqSparseArray,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2015_Q3_SPARSE_ARRAY_PRINTED,
    implementationWorkspaceCode: FRQ_2015_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps15-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `getValueAt(row, col)`**\n\n• Scan **`entries`** for **`SparseArrayEntry`** with matching **`getRow()`** / **`getCol()`**\n• Found → **`getValue()`**; else **0**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — example**\n\n• **`getValueAt(3, 1)`** → **-9** if an entry sits there\n• **`getValueAt(3, 3)`** → **0** when no entry',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q3_REF_GET_VALUE_AT,
      },
      {
        id: 'ps15-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `removeColumn(col)`**\n\n• Remove entries in column **`col`**\n• For **`getCol() > col`**, replace with **`new SparseArrayEntry(row, col-1, value)`**\n• **`numCols--`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-3-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• **Immutable** entries — build a **new** **`ArrayList`**\n• **`continue`** on removed column; shift or copy unchanged entries',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-3-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q3_REF_REMOVE_COLUMN,
      },
      {
        id: 'ps15-3-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'cr', name: 'col', type: 'primitive', value: 1 },
            { id: 'nc', name: 'numCols', type: 'primitive', value: 5 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**SparseArrayEntry** is read-only — replace or rebuild lists when mutating.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps15-3-get',
        name: 'getValueAt',
        description: 'Linear scan of entries for matching coordinates.',
        lines: [45, 46, 47],
        implementationLines: [45, 46, 47, 48, 49, 50, 51, 52],
        memory: {
          stack: [
            { id: 'rw', name: 'row', type: 'primitive', value: 3 },
            { id: 'cl', name: 'col', type: 'primitive', value: 1 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Miss → **0** (implicit zero in sparse storage).',
      },
      {
        id: 'c-ps15-3-remove',
        name: 'removeColumn',
        description: 'Rebuild list; decrement column index for entries past the removed column.',
        lines: [49, 50, 51],
        implementationLines: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Assign **`entries = next`** then **`numCols--`**.',
      },
    ],
  },
  {
    id: 'ps-2015-4-number-group',
    order: 139,
    chapter: '9 · AP CS A Problems',
    title: 'NumberGroup — Range & MultipleGroups',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2015',
    algorithmSubsection: 'Interfaces & collections',
    apExamFrqSheet: ap2015FrqNumberGroup,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 1, label: 'Part (b)' },
        { at: 3, label: 'Part (c)' },
      ],
    },
    code: FRQ_2015_Q4_NUMBER_GROUP_PRINTED,
    implementationWorkspaceCode: FRQ_2015_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps15-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `NumberGroup`**\n\n• **Interface** with **exactly one** method: **`boolean contains(int num)`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-4-s2',
        codeLine: -1,
        description:
          '**Part (b) — `Range`**\n\n• **`implements NumberGroup`**\n• Constructor **`(min, max)`** with **`min ≤ max`**\n• **`contains`** — **inclusive** bounds: **`num >= min && num <= max`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-4-s3',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q4_REF_RANGE_CONTAINS,
      },
      {
        id: 'ps15-4-s4',
        codeLine: -1,
        description:
          '**Part (c) — `MultipleGroups.contains`**\n\n• **`groupList`** holds **`NumberGroup`** references\n• Return **true** if **any** group’s **`contains(num)`** is **true**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps15-4-s5',
        codeLine: -1,
        description: '**Solution — Part (c)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2015_Q4_REF_MULTI_CONTAINS,
      },
      {
        id: 'ps15-4-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [{ id: 'nm', name: 'num', type: 'primitive', value: 6 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Polymorphism**: call **`contains`** on each **`NumberGroup`** in the list.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps15-4-ifc',
        name: 'NumberGroup interface',
        description: 'Single contains contract for every group type.',
        lines: [3, 4, 5],
        implementationLines: [3, 4, 5],
        memory: { stack: [], heap: [], staticArea: [] },
        memoryCaption: '**Range** and **MultipleGroups** both satisfy **`contains`**.',
      },
      {
        id: 'c-ps15-4-range',
        name: 'Range.contains',
        description: 'Inclusive min..max test.',
        lines: [16, 17, 18],
        implementationLines: [16, 17, 18],
        memory: {
          stack: [
            { id: 'mn', name: 'min', type: 'primitive', value: 5 },
            { id: 'mx', name: 'max', type: 'primitive', value: 8 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`num`** in range iff **`min ≤ num ≤ max`**.',
      },
      {
        id: 'c-ps15-4-multi',
        name: 'MultipleGroups.contains',
        description: 'OR over each group in groupList.',
        lines: [28, 29, 30],
        implementationLines: [28, 29, 30, 31, 32, 33, 34, 35],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Short-circuit: return **true** on first **`g.contains(num)`**.',
      },
    ],
  },
];
