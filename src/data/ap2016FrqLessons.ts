import type { Lesson } from '../types';
import {
  ap2016FrqCrossword,
  ap2016FrqLogMessage,
  ap2016FrqRandomChooser,
  ap2016FrqStringFormatter,
  FRQ_2016_Q1_RANDOM_CHOOSER_PRINTED,
  FRQ_2016_Q1_REFERENCE_COMPLETE,
  FRQ_2016_Q1_REF_LETTER_CONSTRUCTOR,
  FRQ_2016_Q1_REF_RANDOM_STRING_CLASS,
  FRQ_2016_Q2_LOG_MESSAGE_PRINTED,
  FRQ_2016_Q2_REFERENCE_COMPLETE,
  FRQ_2016_Q2_REF_CONSTRUCTOR,
  FRQ_2016_Q2_REF_CONTAINS_WORD,
  FRQ_2016_Q2_REF_REMOVE_MESSAGES,
  FRQ_2016_Q3_CROSSWORD_PRINTED,
  FRQ_2016_Q3_REFERENCE_COMPLETE,
  FRQ_2016_Q3_REF_CONSTRUCTOR,
  FRQ_2016_Q3_REF_TO_BE_LABELED,
  FRQ_2016_Q4_REFERENCE_COMPLETE,
  FRQ_2016_Q4_REF_BASIC_GAP,
  FRQ_2016_Q4_REF_FORMAT,
  FRQ_2016_Q4_REF_TOTAL_LETTERS,
  FRQ_2016_Q4_STRING_FORMATTER_PRINTED,
} from './ap2016FrqSheets';

/** Full 2016 FRQ set — orders 132–135 (parallel wave); after 2017 block when present, before stub hubs ≥ 152. */
export const ap2016FrqLessons: Lesson[] = [
  {
    id: 'ps-2016-1-random-chooser',
    order: 132,
    chapter: '9 · AP CS A Problems',
    title: 'RandomStringChooser — draw without replacement; RandomLetterChooser',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2016',
    algorithmSubsection: 'ArrayList & random',
    apExamFrqSheet: ap2016FrqRandomChooser,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2016_Q1_RANDOM_CHOOSER_PRINTED,
    implementationWorkspaceCode: FRQ_2016_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps16-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — what you implement**\n\n• **Copy** the **`String[]`** into private storage (**`ArrayList`**) — **do not** change the **parameter** array\n• **`getNext()`** — uniform random among **remaining** strings; **remove** the chosen one\n• If **none** left → return **`"NONE"`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Constructor: loop **`words.add(s)`** for each **`s`** in the array\n• **`getNext`**: **`if (words.size() == 0)`** → **`"NONE"`**; else **`remove((int)(Math.random() * words.size()))`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q1_REF_RANDOM_STRING_CLASS,
      },
      {
        id: 'ps16-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `RandomLetterChooser(String str)`**\n\n• **`super(getSingleLetters(str));`** — required for full credit\n• **`getSingleLetters`** is **provided** (implementation not shown on the exam)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-1-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference includes a sample **`getSingleLetters`** for the editor.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q1_REF_LETTER_CONSTRUCTOR,
      },
      {
        id: 'ps16-1-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'al',
              className: 'ArrayList',
              fields: [
                { name: 'size', value: '2' },
                { name: '…', value: '"bus", "wheels"' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: shrinking list models “no longer available” after each **`getNext`**.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps16-1-a',
        name: 'Part (a): RandomStringChooser',
        description: 'Copy to ArrayList; random index remove; empty → NONE.',
        lines: [5, 6, 7, 9, 10, 11],
        implementationLines: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        memory: {
          stack: [{ id: 'n', name: 'n', type: 'primitive', value: 1 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**remove(n)** both returns the string and shrinks the pool.',
      },
      {
        id: 'c-ps16-1-b',
        name: 'Part (b): RandomLetterChooser',
        description: 'Delegate to superclass via getSingleLetters(str).',
        lines: [16, 17, 18],
        implementationLines: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'One-line constructor if **`super(...)`** is first.',
      },
    ],
  },
  {
    id: 'ps-2016-2-log-messages',
    order: 133,
    chapter: '9 · AP CS A Problems',
    title: 'LogMessage — parse log lines; proper keyword; removeMessages',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2016',
    algorithmSubsection: 'String & List',
    apExamFrqSheet: ap2016FrqLogMessage,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 2, label: 'Part (b)' },
        { at: 4, label: 'Part (c)' },
      ],
    },
    code: FRQ_2016_Q2_LOG_MESSAGE_PRINTED,
    implementationWorkspaceCode: FRQ_2016_Q2_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps16-2-s1',
        codeLine: -1,
        description:
          '**Part (a) — constructor**\n\n• Valid message: **`machineId:description`** with exactly one **`:`**\n• **`indexOf(":")`** splits **`machineId`** (before) and **`description`** (after)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-2-s2',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q2_REF_CONSTRUCTOR,
      },
      {
        id: 'ps16-2-s3',
        codeLine: -1,
        description:
          '**Part (b) — `containsWord`**\n\n• Keyword must appear as a **whole token**: **space** or **start** before, **space** or **end** after\n• **`"disk"`** in **`"diskette"`** → **false**; **`"error on disk DSK1"`** → **true**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-2-s4',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Loop **`indexOf(keyword, from)`**; at each hit check **`idx == 0`** or space before, and **`idx + len == length()`** or space after\n• Advance **`from`** to **`idx + 1`** when no match',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-2-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q2_REF_CONTAINS_WORD,
      },
      {
        id: 'ps16-2-s6',
        codeLine: -1,
        description:
          '**Part (c) — `removeMessages`**\n\n• Walk **`messageList`**; use **`containsWord`**\n• **Remove** matches **in place**; **append** to returned list in **encounter order**\n• When you **`remove(i)`**, **do not** increment **`i`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-2-s7',
        codeLine: -1,
        description: '**Solution — Part (c)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q2_REF_REMOVE_MESSAGES,
      },
      {
        id: 'ps16-2-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'lm',
              className: 'LogMessage',
              fields: [
                { name: 'machineId', value: '"Webserver"' },
                { name: 'description', value: '"disk offline"' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: 'Sample **`LogMessage`** after parsing **`Webserver:disk offline`**.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps16-2-constructor',
        name: 'Part (a): parse message',
        description: 'indexOf colon; two substring calls.',
        lines: [9, 10, 11],
        implementationLines: [8, 9, 10, 11, 12],
        memory: {
          stack: [{ id: 'c', name: 'colon', type: 'primitive', value: 9 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Colon index splits **id** vs **description**.',
      },
      {
        id: 'c-ps16-2-contains',
        name: 'Part (b): containsWord',
        description: 'Scan indexOf; verify word boundaries.',
        lines: [16, 17, 18],
        implementationLines: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Reject **`disk`** inside **`diskette`** via neighbor checks.',
      },
      {
        id: 'c-ps16-2-remove',
        name: 'Part (c): removeMessages',
        description: 'While loop; remove without i++ when list shrinks.',
        lines: [45, 46, 47],
        implementationLines: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
        memory: {
          stack: [{ id: 'i', name: 'i', type: 'primitive', value: 0 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Stable order: collect removed entries left-to-right.',
      },
    ],
  },
  {
    id: 'ps-2016-3-crossword',
    order: 134,
    chapter: '9 · AP CS A Problems',
    title: 'Crossword — label rule & constructor',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2016',
    algorithmSubsection: '2D array',
    apExamFrqSheet: ap2016FrqCrossword,
    algorithmDesign: {
      implementationStartStepIndex: 4,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 2, label: 'Part (b)' },
      ],
    },
    code: FRQ_2016_Q3_CROSSWORD_PRINTED,
    implementationWorkspaceCode: FRQ_2016_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps16-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `toBeLabeled`**\n\n• **Black** squares → **false**\n• **White** square: label iff **no** white **above** OR **no** white **left** (or both)\n• Equivalently: **false** only when **both** up and left are **white** (and not out of bounds)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`upWhite = r > 0 && !blackSquares[r-1][c]`**\n• **`leftWhite = c > 0 && !blackSquares[r][c-1]`**\n• Return **`!upWhite || !leftWhite`** for a **white** cell',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q3_REF_TO_BE_LABELED,
      },
      {
        id: 'ps16-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — constructor**\n\n• Allocate **`puzzle`** same size as **`blackSquares`**\n• **Row-major** scan; running **`num`** starting at **1**\n• **Black** → **`Square(true, 0)`**; **white** labeled → **`Square(false, num++)`**; **white** unlabeled → **`Square(false, 0)`**\n• Must call **`toBeLabeled`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-3-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q3_REF_CONSTRUCTOR,
      },
      {
        id: 'ps16-3-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'r', name: 'r', type: 'primitive', value: 0 },
            { id: 'c', name: 'c', type: 'primitive', value: 0 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Walk **`blackSquares`** in row-major order to assign **`Square`** cells.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps16-3-label',
        name: 'Part (a): toBeLabeled',
        description: 'White start of across/down entries; boundary-aware neighbors.',
        lines: [38, 39, 40],
        implementationLines: [14, 15, 16, 17, 18, 19, 20, 21],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Top/left **black** or **edge** ⇒ new word start.',
      },
      {
        id: 'c-ps16-3-build',
        name: 'Part (b): constructor',
        description: 'Nested loops; counter for labeled white cells only.',
        lines: [29, 30, 31],
        implementationLines: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        memory: {
          stack: [{ id: 'nm', name: 'num', type: 'primitive', value: 4 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`num`** increments only on **toBeLabeled** white cells.',
      },
    ],
  },
  {
    id: 'ps-2016-4-string-formatter',
    order: 135,
    chapter: '9 · AP CS A Problems',
    title: 'StringFormatter — letters, gap width, justify',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2016',
    algorithmSubsection: 'String & List',
    apExamFrqSheet: ap2016FrqStringFormatter,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 2, label: 'Part (b)' },
        { at: 4, label: 'Part (c)' },
      ],
    },
    code: FRQ_2016_Q4_STRING_FORMATTER_PRINTED,
    implementationWorkspaceCode: FRQ_2016_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps16-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `totalLetters`**\n\n• Sum **`length()`** of every string in **`wordList`**\n• Example: **`["A","frog","is"]`** → **7**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-4-s2',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q4_REF_TOTAL_LETTERS,
      },
      {
        id: 'ps16-4-s3',
        codeLine: -1,
        description:
          '**Part (b) — `basicGapWidth`**\n\n• **Gaps** = **`wordList.size() - 1`**\n• **Space to fill** = **`formattedLen - totalLetters(wordList)`**\n• **Basic gap** = **integer division** **`space / gaps`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-4-s4',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nMust call **`totalLetters`**.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q4_REF_BASIC_GAP,
      },
      {
        id: 'ps16-4-s5',
        codeLine: -1,
        description:
          '**Part (c) — `format`**\n\n• **`leftoverSpaces`** (given) = **`space % gaps`** — extra spaces go to the **leftmost** gaps **one each**\n• Between word **`i-1`** and **`i`**, insert **`basic + (extra > 0 ? 1 : 0)`** spaces, then **`extra--`** when you use a bonus',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps16-4-s6',
        codeLine: -1,
        description: '**Solution — Part (c)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2016_Q4_REF_FORMAT,
      },
      {
        id: 'ps16-4-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** uses **`List<String>`**; match raw **`List`** on the answer sheet if required.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps16-4-letters',
        name: 'Part (a): totalLetters',
        description: 'Accumulate word lengths.',
        lines: [8, 9, 10],
        implementationLines: [5, 6, 7, 8, 9, 10, 11],
        memory: {
          stack: [{ id: 'sm', name: 'sum', type: 'primitive', value: 14 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Example **AP COMP SCI ROCKS** → **14** letters.',
      },
      {
        id: 'c-ps16-4-gap',
        name: 'Part (b): basicGapWidth',
        description: '(formattedLen - letters) / (size - 1).',
        lines: [16, 17, 18],
        implementationLines: [13, 14, 15, 16],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Integer division drops remainder → **leftover** handled in **`format`**.',
      },
      {
        id: 'c-ps16-4-format',
        name: 'Part (c): format',
        description: 'First extra gaps get basic+1 spaces.',
        lines: [32, 33, 34],
        implementationLines: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Decrement **`extra`** each time you add the bonus space.',
      },
    ],
  },
];
