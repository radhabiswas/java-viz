import type { Lesson } from '../types';
import {
  ap2022FrqData,
  ap2022FrqGame,
  ap2022FrqReviewAnalysis,
  ap2022FrqTextbook,
  FRQ_2022_Q1_LEVEL_GAME_PRINTED,
  FRQ_2022_Q1_REFERENCE_COMPLETE,
  FRQ_2022_Q1_REF_GET_SCORE,
  FRQ_2022_Q1_REF_PLAY_MANY_TIMES,
  FRQ_2022_Q2_REFERENCE_CLASS,
  FRQ_2022_Q2_TEXTBOOK_PRINTED,
  FRQ_2022_Q3_REFERENCE_COMPLETE,
  FRQ_2022_Q3_REF_COLLECT_COMMENTS,
  FRQ_2022_Q3_REF_GET_AVERAGE,
  FRQ_2022_Q3_REVIEW_PRINTED,
  FRQ_2022_Q4_DATA_PRINTED,
  FRQ_2022_Q4_REFERENCE_COMPLETE,
  FRQ_2022_Q4_REF_COUNT_INCREASING_COLS,
  FRQ_2022_Q4_REF_REPOPULATE,
} from './ap2022FrqSheets';

/** Full 2022 FRQ set — orders 116–119 in the parallel 2023→2012 block. */
export const ap2022FrqLessons: Lesson[] = [
  {
    id: 'ps-2022-1-game',
    order: 116,
    chapter: '9 · AP CS A Problems',
    title: 'Game / Level — cascading goals, bonus triple & playManyTimes',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2022',
    algorithmSubsection: 'Simulation & scoring',
    apExamFrqSheet: ap2022FrqGame,
    algorithmDesign: {
      implementationStartStepIndex: 8,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2022_Q1_LEVEL_GAME_PRINTED,
    implementationWorkspaceCode: FRQ_2022_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps22-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — rules**\n\n• **Level 1** points count only if **level 1 goal** reached\n• **Level 2** points only if **both** level **1** and **2** goals reached\n• **Level 3** points only if **all three** goals reached\n• **Bonus** game → **triple** the sum of earned points',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Start **`score = 0`**\n• **`if (levelOne.goalReached())`** add **`levelOne.getPoints()`**; nest checks for levels 2 and 3\n• After the sum, **`if (isBonus())`** multiply **`score`** by **3**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2022_Q1_REF_GET_SCORE,
      },
      {
        id: 'ps22-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `playManyTimes(num)`**\n\n• Simulate **`num`** games; each game: **`play()`** then read score with **`getScore()`**\n• Return the **highest** score seen (e.g. **75, 50, 90, 20** → **90**)\n• Assume **`getScore`** reflects the **most recent** **`play`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• **`int highest = 0`**\n• Loop **`i`** from **0** to **`num - 1`**: **`play()`**; **`int s = getScore()`**; if **`s > highest`**, update **`highest`**\n• Return **`highest`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-1-s6',
        codeLine: -1,
        description:
          '**Part (b) — exam note**\n\n• One **`play`** then many **`getScore`** calls return the **same** score — **`playManyTimes`** must **`play`** once per iteration',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-1-s7',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2022_Q1_REF_PLAY_MANY_TIMES,
      },
      {
        id: 'ps22-1-s8',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is **nested conditionals** over three levels. Part (b) is a **loop** that always pairs **`play`** with **`getScore`**.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-1-s9',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'sc', name: 'score (conceptual)', type: 'primitive', value: 90 },
            { id: 'nm', name: 'num', type: 'primitive', value: 4 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** includes a concrete **`Level`** for clarity; the exam shows **`Level`** methods only.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps22-1-score',
        name: 'Part (a): getScore',
        description: 'Earn points in a chain of goals; triple if bonus.',
        lines: [51, 52],
        implementationLines: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
        memory: {
          stack: [{ id: 'sc', name: 'score', type: 'primitive', value: 45 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Cumulative score before the **bonus** multiplier.',
      },
      {
        id: 'c-ps22-1-many',
        name: 'Part (b): playManyTimes',
        description: 'Each iteration: play, then getScore; track maximum.',
        lines: [60, 61],
        implementationLines: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
        memory: {
          stack: [
            { id: 'hi', name: 'highest', type: 'primitive', value: 90 },
            { id: 'ii', name: 'i', type: 'primitive', value: 3 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**highest** after several simulated games.',
      },
    ],
  },
  {
    id: 'ps-2022-2-textbook',
    order: 117,
    chapter: '9 · AP CS A Problems',
    title: 'Textbook — subclass of Book, edition & canSubstituteFor',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2022',
    algorithmSubsection: 'Class design & state',
    apExamFrqSheet: ap2022FrqTextbook,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2022_Q2_TEXTBOOK_PRINTED,
    implementationWorkspaceCode: FRQ_2022_Q2_REFERENCE_CLASS,
    steps: [
      {
        id: 'ps22-2-s1',
        codeLine: -1,
        description:
          '**Fields & constructor**\n\n• **`private int edition`**\n• **Constructor** **`(bookTitle, bookPrice, edition)`** — call **`super(bookTitle, bookPrice)`** then set **edition**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-2-s2',
        codeLine: -1,
        description:
          '**`getEdition`** and **`getBookInfo`**\n\n• **`getEdition()`** returns **edition**\n• **`getBookInfo()`** returns **`super.getBookInfo() + "-" + edition`** (hyphens as in **`"Biology-39.75-3"`**)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-2-s3',
        codeLine: -1,
        description:
          '**`canSubstituteFor(other)`**\n\n• **`true`** only if **same title** and **`this` edition ≥ `other`’s edition**\n• Use **`getTitle().equals(other.getTitle())`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-2-s4',
        codeLine: -1,
        description: '**Solution — full classes**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2022_Q2_REFERENCE_CLASS,
      },
      {
        id: 'ps22-2-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'tb',
              className: 'Textbook',
              fields: [
                { name: 'edition', value: '3' },
                { name: 'title', value: '"Biology"' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: **`Textbook`** with **`Book`** state via **`super`**.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps22-2-info',
        name: 'getBookInfo',
        description: 'Append edition after the Book title-price string.',
        lines: [37, 38],
        implementationLines: [31, 32, 33],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**super.getBookInfo()** then **-** and **edition**.',
      },
      {
        id: 'c-ps22-2-sub',
        name: 'canSubstituteFor',
        description: 'Same title and this edition at least as large as other’s.',
        lines: [41, 42],
        implementationLines: [35, 36, 37],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**bio2019** can substitute for **bio2015**; not the reverse.',
      },
    ],
  },
  {
    id: 'ps-2022-3-review-analysis',
    order: 118,
    chapter: '9 · AP CS A Problems',
    title: 'ReviewAnalysis — average rating & comments with !',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2022',
    algorithmSubsection: 'Array & ArrayList',
    apExamFrqSheet: ap2022FrqReviewAnalysis,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2022_Q3_REVIEW_PRINTED,
    implementationWorkspaceCode: FRQ_2022_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps22-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `getAverageRating`**\n\n• **Arithmetic mean** of **`getRating()`** over **`allReviews`**\n• Precondition: at least one review, no **null** elements\n• Return a **`double`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`double sum = 0`**\n• Loop: **`sum += r.getRating()`**\n• **`return sum / allReviews.length`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2022_Q3_REF_GET_AVERAGE,
      },
      {
        id: 'ps22-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `collectComments`**\n\n• Include only comments that contain **`!`**\n• Each **`String`** in the result: **`index + "-" + copyOfComment`**\n• String must end with **`.`** or **`!`**; if the original does not, **append `.`**\n• Do **not** change **`allReviews`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-3-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2022_Q3_REF_COLLECT_COMMENTS,
      },
      {
        id: 'ps22-3-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** uses **`ArrayList<String>`**; the printed stem may show a **raw** **`ArrayList`** return type.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps22-3-avg',
        name: 'getAverageRating',
        description: 'Sum ratings and divide by array length (double division).',
        lines: [43, 44],
        implementationLines: [28, 29, 30, 31, 32, 33, 34],
        memory: {
          stack: [{ id: 'sm', name: 'sum', type: 'primitive', value: 17 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Running sum over **`allReviews`**.',
      },
      {
        id: 'c-ps22-3-collect',
        name: 'collectComments',
        description: 'Filter on !; prefix index; ensure trailing . or !.',
        lines: [54, 55],
        implementationLines: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        memory: {
          stack: [{ id: 'ix', name: 'i', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Build **`i + "-" + comment`** then fix the last character if needed.',
      },
    ],
  },
  {
    id: 'ps-2022-4-data',
    order: 119,
    chapter: '9 · AP CS A Problems',
    title: 'Data — repopulate divisible-by-10 grid & increasing columns',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2022',
    algorithmSubsection: '2D array',
    apExamFrqSheet: ap2022FrqData,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2022_Q4_DATA_PRINTED,
    implementationWorkspaceCode: FRQ_2022_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps22-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `repopulate`**\n\n• Each cell gets a **new** random **`int`** in **1…MAX** inclusive\n• Must be **divisible by 10** but **not** divisible by **100**\n• Every **valid** value equally likely',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **Rejection sampling**: draw **`val`** in **1…MAX** until **`val % 10 == 0`** and **`val % 100 != 0`**\n• Assign **`grid[r][c] = val`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2022_Q4_REF_REPOPULATE,
      },
      {
        id: 'ps22-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — `countIncreasingCols`**\n\n• Count **columns** where values are **non-decreasing** down the rows\n• Single-row grids: every column counts',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps22-4-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2022_Q4_REF_COUNT_INCREASING_COLS,
      },
      {
        id: 'ps22-4-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'cc', name: 'col', type: 'primitive', value: 0 },
            { id: 'rr', name: 'row', type: 'primitive', value: 1 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** sets **`MAX`** for runnable random fills.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps22-4-repop',
        name: 'repopulate',
        description: 'Reject until multiple of 10 but not of 100.',
        lines: [12, 13],
        implementationLines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        memory: {
          stack: [{ id: 'vl', name: 'val', type: 'primitive', value: 220 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Typical accepted value: **220**; **200** and **100** are rejected.',
      },
      {
        id: 'c-ps22-4-cols',
        name: 'countIncreasingCols',
        description: 'Per column, require grid[r][c] >= grid[r-1][c] for all r > 0.',
        lines: [22, 23],
        implementationLines: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        memory: {
          stack: [{ id: 'cn', name: 'count', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Example grids: **1** then **2** non-decreasing columns.',
      },
    ],
  },
];
