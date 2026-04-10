import type { Lesson } from '../types';
import {
  ap2025FrqDogWalker,
  ap2025FrqRound,
  ap2025FrqSignedText,
  ap2025FrqSumOrSame,
  FRQ_2025_Q1_DOG_WALKER_PRINTED,
  FRQ_2025_Q1_REFERENCE_COMPLETE,
  FRQ_2025_Q1_REF_SHIFT,
  FRQ_2025_Q1_REF_WALK_DOGS,
  FRQ_2025_Q2_REFERENCE_CLASS,
  FRQ_2025_Q2_SIGNED_TEXT_PRINTED,
  FRQ_2025_Q3_REFERENCE_COMPLETE,
  FRQ_2025_Q3_REF_BUILD_MATCHES,
  FRQ_2025_Q3_REF_CONSTRUCTOR,
  FRQ_2025_Q3_ROUND_PRINTED,
  FRQ_2025_Q4_REFERENCE_COMPLETE,
  FRQ_2025_Q4_REF_CLEAR_PAIR,
  FRQ_2025_Q4_REF_CONSTRUCTOR,
  FRQ_2025_Q4_SUM_OR_SAME_PRINTED,
} from './ap2025FrqSheets';

/** Full 2025 FRQ set — same rigor pattern as 2019; orders 104–107 sit after Algorithmic Thinking (99) and 2019 (100–103). */
export const ap2025FrqLessons: Lesson[] = [
  {
    id: 'ps-2025-1-dog-walker',
    order: 104,
    chapter: '9 · AP CS A Problems',
    title: 'DogWalker — walks, pay & peak bonus',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2025',
    algorithmSubsection: 'Methods & company API',
    apExamFrqSheet: ap2025FrqDogWalker,
    algorithmDesign: {
      implementationStartStepIndex: 8,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2025_Q1_DOG_WALKER_PRINTED,
    implementationWorkspaceCode: FRQ_2025_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps25-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — what you implement**\n\n• **Method** — `walkDogs(int hour)`\n• **Use** — `numAvailableDogs(hour)` and `updateDogs(hour, count)`\n• **Rule** — walk as many dogs as available, **but not more than** `maxDogs`\n• **Return** — how many dogs **this** walker walks',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Read **`avail = numAvailableDogs(hour)`**\n• **`walk = min(maxDogs, avail)`** (cap the walker)\n• **`updateDogs(hour, walk)`** so the company books those dogs\n• **Return** **`walk`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below — compare with your design.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2025_Q1_REF_WALK_DOGS,
      },
      {
        id: 'ps25-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — what you implement**\n\n• **Method** — `dogWalkShift(startHour, endHour)` — **inclusive** range of hours\n• **Per hour** — call `walkDogs`; earn **`5 * dogs`** plus **`+3`** bonus if **`dogs == maxDogs`** **or** hour is **9–17** inclusive\n• **Return** — total dollars for the whole shift',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — table (exam)**\n\n| Hour | max | walked | earn |\n| 7 | 3 | 3 | 3×5+3=**18** |\n| 8 | 3 | 2 | 2×5=**10** (no peak, not full) |\n| 9 | 3 | 2 | 2×5+3=**13** (peak) |\n| 10 | 3 | 3 | 3×5+3=**18** (full capacity) |\n| **Total** | | | **59** |',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-1-s6',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Loop **`h`** from **`startHour`** to **`endHour`**\n• Each iteration: **`w = walkDogs(h)`**; **`sum += 5*w`**; if **`w == maxDogs || (h >= 9 && h <= 17)`** add **3**\n• Assume **`walkDogs`** works as specified',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-1-s7',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2025_Q1_REF_SHIFT,
      },
      {
        id: 'ps25-1-s8',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is a **capped read + book + return**. Part (b) is **composition**: trust **`walkDogs`** and layer **business rules** on each hour.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-1-s9',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'mx', name: 'maxDogs', type: 'primitive', value: 3 },
            { id: 'hr', name: 'hour', type: 'primitive', value: 9 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor**: sample locals while reasoning about **`walkDogs`** / shift pay — use **Concepts** to jump to Part (a) vs Part (b) highlights.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps25-1-a',
        name: 'Part (a): walkDogs',
        description: 'Min of availability and maxDogs; update the company; return count walked.',
        lines: [25, 26, 27, 28, 29, 30],
        implementationLines: [25, 26, 27, 28, 29, 30],
        memory: {
          stack: [
            { id: 'mx', name: 'maxDogs', type: 'primitive', value: 4 },
            { id: 'av', name: 'avail', type: 'primitive', value: 10 },
            { id: 'wk', name: 'walk', type: 'primitive', value: 4 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**walk** capped at **maxDogs** when many dogs are available.',
      },
      {
        id: 'c-ps25-1-b',
        name: 'Part (b): dogWalkShift',
        description: 'Loop each hour; add 5 per dog; +3 if full walk or peak hour 9–17.',
        lines: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
        implementationLines: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
        memory: {
          stack: [
            { id: 'tot', name: 'total', type: 'primitive', value: 28 },
            { id: 'hh', name: 'h', type: 'primitive', value: 9 },
            { id: 'wd', name: 'walked', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Mid-shift: accumulating **total** after some hours; **walked** from **`walkDogs(h)`**.',
      },
    ],
  },
  {
    id: 'ps-2025-2-signed-text',
    order: 105,
    chapter: '9 · AP CS A Problems',
    title: 'SignedText — signature & string rules',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2025',
    algorithmSubsection: 'Class design & String',
    apExamFrqSheet: ap2025FrqSignedText,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2025_Q2_SIGNED_TEXT_PRINTED,
    implementationWorkspaceCode: FRQ_2025_Q2_REFERENCE_CLASS,
    steps: [
      {
        id: 'ps25-2-s1',
        codeLine: -1,
        description:
          '**Design — fields & constructor**\n\n• Store **`first`** and **`last`** (**`String`**)\n• Constructor assigns parameters (last non-empty length guaranteed)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-2-s2',
        codeLine: -1,
        description:
          '**`getSignature`**\n\n• Empty **`first`** → return **`last`** alone\n• Else → **`first.charAt(0) + "-" + last`** (exam: **G-LOPEZ** from GRACE / LOPEZ)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-2-s3',
        codeLine: -1,
        description:
          '**`addSignature(text)`**\n\n• Signature **not** in text → **`text + sig`**\n• Signature at **end** → return **`text`** unchanged\n• Signature at **start** → strip prefix, append **`sig`** at end (**`ThanksFOX`** from **`FOXThanks`**)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-2-s4',
        codeLine: -1,
        description:
          '**Solution — full class**\n\nReference implementation below — must satisfy the table (including **`Dear` → `DearFOX`**, **`Best wishesFOX`** unchanged, **`G-LOPEZHello` → `HelloG-LOPEZ`**).',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2025_Q2_REFERENCE_CLASS,
      },
      {
        id: 'ps25-2-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'st',
              className: 'SignedText',
              fields: [
                { name: 'first', value: '""' },
                { name: 'last', value: '"FOX"' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: **`SignedText`** object with empty first name — **`getSignature()`** returns **`FOX`**.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps25-2-sig',
        name: 'getSignature',
        description: 'Empty first → last only; else first char, dash, last.',
        lines: [13, 14, 15, 16, 17, 18, 19],
        implementationLines: [13, 14, 15, 16, 17, 18, 19],
        memory: {
          stack: [{ id: 'f', name: 'first', type: 'reference', refId: 'strHen' }],
          heap: [{ id: 'strHen', className: 'String', fields: [{ name: 'value', value: '"henri"' }] }],
          staticArea: [],
        },
        memoryCaption: 'Illustrative **`first`** reference; signature uses **`charAt(0)`**.',
      },
      {
        id: 'c-ps25-2-add',
        name: 'addSignature',
        description: 'endsWith / startsWith on getSignature(); three cases per spec.',
        lines: [21, 22, 23, 24, 25, 26, 27, 28, 29],
        implementationLines: [21, 22, 23, 24, 25, 26, 27, 28, 29],
        memory: {
          stack: [{ id: 'tx', name: 'text', type: 'reference', refId: 'strT' }],
          heap: [{ id: 'strT', className: 'String', fields: [{ name: 'value', value: '"FOXThanks"' }] }],
          staticArea: [],
        },
        memoryCaption: '**startsWith(sig)** → move signature to the end.',
      },
    ],
  },
  {
    id: 'ps-2025-3-round',
    order: 106,
    chapter: '9 · AP CS A Problems',
    title: 'Round — competitors & matchups',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2025',
    algorithmSubsection: 'ArrayList & pairing',
    apExamFrqSheet: ap2025FrqRound,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2025_Q3_ROUND_PRINTED,
    implementationWorkspaceCode: FRQ_2025_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps25-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — constructor**\n\n• **`Round(String[] names)`**\n• Build **`competitorList`** in **same order** as **`names`**\n• Rank **1** for index **0**, **2** for index **1**, … **`names.length`** for last',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — example**\n\n**`{"Alex","Ben","Cara"}`** → three **`Competitor`**s with ranks **1, 2, 3** in that order.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2025_Q3_REF_CONSTRUCTOR,
      },
      {
        id: 'ps25-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `buildMatches`**\n\n• **Even** **`n`**: pair **best↔worst**, **second↔second-worst**, …\n• **Odd** **`n`**: **ignore** rank **1**; pair the rest with the **even** rule (exam: Alex skipped → **Ben vs Cara**)\n• Return **new** **`ArrayList<Match>`**; **`competitorList`** unchanged',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-3-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below (two-pointer from ends; **`lo = 1`** if odd).',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2025_Q3_REF_BUILD_MATCHES,
      },
      {
        id: 'ps25-3-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** uses **generics** (`ArrayList<Competitor>`, `ArrayList<Match>`) for clarity; the exam booklet may show **raw** `ArrayList` — both are acceptable if consistent.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps25-3-ctor',
        name: 'Round constructor',
        description: 'Loop names; add Competitor(name, i+1).',
        lines: [20, 21, 22, 23, 24, 25],
        implementationLines: [20, 21, 22, 23, 24, 25],
        memory: {
          stack: [{ id: 'i', name: 'i', type: 'primitive', value: 1 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Index **`i`** while filling **`competitorList`**.',
      },
      {
        id: 'c-ps25-3-match',
        name: 'buildMatches',
        description: 'Odd n → start lo at 1; pair lo/hi inward.',
        lines: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        implementationLines: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        memory: {
          stack: [
            { id: 'lo', name: 'lo', type: 'primitive', value: 0 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 3 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Two pointers for **even** pairing after optional skip.',
      },
    ],
  },
  {
    id: 'ps-2025-4-sum-or-same',
    order: 107,
    chapter: '9 · AP CS A Problems',
    title: 'SumOrSameGame — grid pairs',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2025',
    algorithmSubsection: '2D array & search',
    apExamFrqSheet: ap2025FrqSumOrSame,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 2, label: 'Part (b)' },
      ],
    },
    code: FRQ_2025_Q4_SUM_OR_SAME_PRINTED,
    implementationWorkspaceCode: FRQ_2025_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps25-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — constructor**\n\n• Allocate **`puzzle[numRows][numCols]`**\n• Each cell: random **1–9** inclusive, **uniform** (**`(int)(Math.random() * 9) + 1`**)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-4-s2',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2025_Q4_REF_CONSTRUCTOR,
      },
      {
        id: 'ps25-4-s3',
        codeLine: -1,
        description:
          '**Part (b) — `clearPair(row, col)`**\n\n• **`v`** = value at **`(row,col)`** (1–9)\n• Find **another** cell at row **≥** **`row`** with same value **or** values summing to **10**\n• Skip **`(row,col)`**; skip **0** cells\n• First valid pair clears **both** → **`true`**; else **`false`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — scan order**\n\nSame row: columns from **`col`** onward. Later rows: **all** columns. Exam: **7** at (0,1) pairs with **7** at (1,0); **9** at (0,2) can pair with **1** at (0,0).',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps25-4-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2025_Q4_REF_CLEAR_PAIR,
      },
      {
        id: 'ps25-4-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'r', name: 'row', type: 'primitive', value: 1 },
            { id: 'c', name: 'col', type: 'primitive', value: 1 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Sample indices for **`clearPair`**; open **Concepts** for constructor vs pair logic.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps25-4-ctor',
        name: 'Constructor',
        description: 'Nested loops fill puzzle[r][c] with 1–9.',
        lines: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        implementationLines: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        memory: {
          stack: [
            { id: 'nr', name: 'numRows', type: 'primitive', value: 3 },
            { id: 'nc', name: 'numCols', type: 'primitive', value: 4 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Dimensions while allocating **puzzle**.',
      },
      {
        id: 'c-ps25-4-clear',
        name: 'clearPair',
        description: 'Double loop from row,col; skip self; match equal or sum 10.',
        lines: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        implementationLines: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        memory: {
          stack: [{ id: 'v', name: 'v', type: 'primitive', value: 4 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**v** is the anchor cell value before scanning for a partner.',
      },
    ],
  },
];
