import type { Lesson } from '../types';
import {
  ap2021FrqArrayResizer,
  ap2021FrqClubMembers,
  ap2021FrqCombinedTable,
  ap2021FrqWordMatch,
  FRQ_2021_Q1_REFERENCE_COMPLETE,
  FRQ_2021_Q1_REF_FIND_BETTER,
  FRQ_2021_Q1_REF_SCORE_GUESS,
  FRQ_2021_Q1_WORD_MATCH_PRINTED,
  FRQ_2021_Q2_REFERENCE_CLASS,
  FRQ_2021_Q2_SINGLE_TABLE_PRINTED,
  FRQ_2021_Q3_CLUB_MEMBERS_PRINTED,
  FRQ_2021_Q3_REFERENCE_COMPLETE,
  FRQ_2021_Q3_REF_ADD_MEMBERS,
  FRQ_2021_Q3_REF_REMOVE_MEMBERS,
  FRQ_2021_Q4_ARRAY_RESIZER_PRINTED,
  FRQ_2021_Q4_REFERENCE_COMPLETE,
  FRQ_2021_Q4_REF_IS_NON_ZERO_ROW,
  FRQ_2021_Q4_REF_RESIZE,
} from './ap2021FrqSheets';

/** Full 2021 FRQ set — reserved orders 120–123 (parallel wave); after 2024 (108–111). */
export const ap2021FrqLessons: Lesson[] = [
  {
    id: 'ps-2021-1-word-match',
    order: 120,
    chapter: '9 · AP CS A Problems',
    title: 'WordMatch — substring score & better guess',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2021',
    algorithmSubsection: 'String & counting',
    apExamFrqSheet: ap2021FrqWordMatch,
    algorithmDesign: {
      implementationStartStepIndex: 8,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2021_Q1_WORD_MATCH_PRINTED,
    implementationWorkspaceCode: FRQ_2021_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps21-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — `scoreGuess`**\n\n• Count **every** occurrence of **`guess`** as a **substring** of **`secret`** (**overlapping** counts separately)\n• Return **(count) × (guess.length())²**\n• Example: **`"iss"`** in **`"mississippi"`** → **2** occurrences × **3²** → **18**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• For each start index **`i`** from **0** to **`secret.length() - guess.length()`** inclusive\n• If **`secret.substring(i, i + len)`** equals **`guess`**, increment **count**\n• Return **`count * len * len`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2021_Q1_REF_SCORE_GUESS,
      },
      {
        id: 'ps21-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `findBetterGuess`**\n\n• Compare **`scoreGuess(guess1)`** and **`scoreGuess(guess2)`**\n• **Higher score** wins\n• **Same score** → return the **lexicographically greater** string (**`compareTo`**) — exam uses all **lowercase** letters',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — tie example**\n\n• **`"concatenation"`** — **`scoreGuess("ten")`** and **`scoreGuess("cat")`** can tie; the greater **`String`** by **`compareTo`** wins',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below — must call **`scoreGuess`**.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2021_Q1_REF_FIND_BETTER,
      },
      {
        id: 'ps21-1-s7',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is a **sliding window** / **substring** scan with **overlap**. Part (b) is **branching** on ints then **`String`** comparison.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-1-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'gs', name: 'guess', type: 'reference', refId: 'strIss' },
            { id: 'sc', name: 'secret field', type: 'reference', refId: 'strMiss' },
          ],
          heap: [
            { id: 'strIss', className: 'String', fields: [{ name: 'value', value: '"iss"' }] },
            { id: 'strMiss', className: 'String', fields: [{ name: 'value', value: '"mississippi"' }] },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: **`scoreGuess`** / **`findBetterGuess`** on **`WordMatch`** — use **Concepts** for Part (a) vs Part (b).',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps21-1-a',
        name: 'Part (a): scoreGuess',
        description: 'Count overlapping substring matches; multiply count by length squared.',
        lines: [17, 18, 19],
        implementationLines: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        memory: {
          stack: [
            { id: 'ct', name: 'count', type: 'primitive', value: 2 },
            { id: 'ln', name: 'len', type: 'primitive', value: 3 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'After scanning **`"iss"`** in **`"mississippi"`**: **count = 2**, score **2×3×3 = 18**.',
      },
      {
        id: 'c-ps21-1-b',
        name: 'Part (b): findBetterGuess',
        description: 'Higher score wins; on equal scores use String compareTo.',
        lines: [26, 27, 28],
        implementationLines: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        memory: {
          stack: [
            { id: 's1', name: 's1', type: 'primitive', value: 9 },
            { id: 's2', name: 's2', type: 'primitive', value: 9 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Tied scores → lexicographic tie-break.',
      },
    ],
  },
  {
    id: 'ps-2021-2-combined-table',
    order: 121,
    chapter: '9 · AP CS A Problems',
    title: 'CombinedTable — seats, height & desirability',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2021',
    algorithmSubsection: 'Class design & composition',
    apExamFrqSheet: ap2021FrqCombinedTable,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2021_Q2_SINGLE_TABLE_PRINTED,
    implementationWorkspaceCode: FRQ_2021_Q2_REFERENCE_CLASS,
    steps: [
      {
        id: 'ps21-2-s1',
        codeLine: -1,
        description:
          '**Fields & constructor**\n\n• Store **two** **`SingleTable`** references passed to **`CombinedTable(t1, t2)`**\n• **`setViewQuality`** on either table must affect **`getDesirability()`** — keep **aliases**, do not copy view values once',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-2-s2',
        codeLine: -1,
        description:
          '**`canSeat(n)`**\n\n• Combined capacity = **`t1.getNumSeats() + t2.getNumSeats() - 2`** (two seats lost where tables meet)\n• Return **true** iff **`n`** ≤ that capacity',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-2-s3',
        codeLine: -1,
        description:
          '**`getDesirability()`**\n\n• Start with **average** of **`getViewQuality()`** from both tables\n• If **`getHeight()`** values **differ**, subtract **10** from that average\n• Same height → **no** penalty',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-2-s4',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2021_Q2_REFERENCE_CLASS,
      },
      {
        id: 'ps21-2-s4b',
        codeLine: -1,
        description:
          '**Before you code**\n\nKeep **two** **`SingleTable`** references; **`canSeat`** is arithmetic on **seat counts**; **`getDesirability`** reads **live** view quality from those objects.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-2-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'ct',
              className: 'CombinedTable',
              fields: [
                { name: 'first', value: '→ SingleTable' },
                { name: 'second', value: '→ SingleTable' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: **`CombinedTable`** holds **two** table references for live view updates.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps21-2-seat',
        name: 'canSeat',
        description: 'Total seats minus two for the join; compare to n.',
        lines: [32, 33, 34],
        implementationLines: [10, 11, 12],
        memory: {
          stack: [{ id: 'nn', name: 'n', type: 'primitive', value: 9 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**4 + 8 − 2 = 10** seats for **`t1`+`t2`** example.',
      },
      {
        id: 'c-ps21-2-view',
        name: 'getDesirability',
        description: 'Average view qualities; subtract 10 if heights differ.',
        lines: [36, 37, 38],
        implementationLines: [14, 15, 16, 17, 18, 19, 20],
        memory: {
          stack: [{ id: 'av', name: 'avg', type: 'primitive', value: 65.0 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Same height → pure average; different → average **− 10**.',
      },
    ],
  },
  {
    id: 'ps-2021-3-club-members',
    order: 122,
    chapter: '9 · AP CS A Problems',
    title: 'ClubMembers — add roster & graduate purge',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2021',
    algorithmSubsection: 'ArrayList & objects',
    apExamFrqSheet: ap2021FrqClubMembers,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2021_Q3_CLUB_MEMBERS_PRINTED,
    implementationWorkspaceCode: FRQ_2021_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps21-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `addMembers`**\n\n• For each name in **`names`**, add a **`MemberInfo`** with **`gradYear`** and **good standing `true`**\n• Order of insertion is **unspecified**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Loop over **`names`**\n• **`memberList.add(new MemberInfo(name, gradYear, true))`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2021_Q3_REF_ADD_MEMBERS,
      },
      {
        id: 'ps21-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `removeMembers(year)`**\n\n• **Return** a **new list** of members with **`getGradYear() <= year`** **and** **`inGoodStanding()`**\n• **Remove** from **`memberList`** **every** member with **`getGradYear() <= year`** (including **not** in good standing)\n• Example: remove **`2018`** and **`2017`** entries; return only **good-standing** graduates',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-3-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below — consider **backward** removal or a second list.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2021_Q3_REF_REMOVE_MEMBERS,
      },
      {
        id: 'ps21-3-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** uses **`ArrayList<MemberInfo>`**; the exam may show a **raw** `ArrayList` — your answer should still type the elements logically.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps21-3-add',
        name: 'addMembers',
        description: 'New MemberInfo per name with gradYear and good standing true.',
        lines: [32, 33, 34, 35],
        implementationLines: [30, 31, 32, 33, 34],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Bulk enroll with shared graduation year.',
      },
      {
        id: 'c-ps21-3-remove',
        name: 'removeMembers',
        description: 'Collect good-standing graduates; remove all who have graduated.',
        lines: [41, 42, 43, 44],
        implementationLines: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
        memory: {
          stack: [{ id: 'yr', name: 'year', type: 'primitive', value: 2018 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Two-pass: build return list, then purge **`gradYear <= year`**.',
      },
    ],
  },
  {
    id: 'ps-2021-4-array-resizer',
    order: 123,
    chapter: '9 · AP CS A Problems',
    title: 'ArrayResizer — non-zero rows & resize',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2021',
    algorithmSubsection: '2D array',
    apExamFrqSheet: ap2021FrqArrayResizer,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2021_Q4_ARRAY_RESIZER_PRINTED,
    implementationWorkspaceCode: FRQ_2021_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps21-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `isNonZeroRow`**\n\n• Return **true** iff **every** entry in row **`r`** is **non-zero**\n• Return **false** immediately if any **`array2D[r][c] == 0`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — examples**\n\n• Row **`{2,1,0}`** → **false**; **`{1,3,2}`** → **true**; **`{0,0,0}`** → **false**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2021_Q4_REF_IS_NON_ZERO_ROW,
      },
      {
        id: 'ps21-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — `resize`**\n\n• Build a **new** 2D array with **`numNonZeroRows(array2D)`** rows and **`array2D[0].length`** columns\n• Copy **each** all-non-zero row **in original order**\n• Must use **`numNonZeroRows`** and **`isNonZeroRow`** as specified',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps21-4-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2021_Q4_REF_RESIZE,
      },
      {
        id: 'ps21-4-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'rr', name: 'r', type: 'primitive', value: 1 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: row tests then **packed** copy into **`smaller`**.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps21-4-row',
        name: 'isNonZeroRow',
        description: 'Scan row r for any zero.',
        lines: [8, 9, 10],
        implementationLines: [3, 4, 5, 6, 7, 8, 9, 10],
        memory: {
          stack: [{ id: 'cc', name: 'c', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Short-circuit on first **0**.',
      },
      {
        id: 'c-ps21-4-resize',
        name: 'resize',
        description: 'Allocate using numNonZeroRows; copy qualifying rows in order.',
        lines: [24, 25, 26],
        implementationLines: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
        memory: {
          stack: [{ id: 'ds', name: 'dest', type: 'primitive', value: 1 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**dest** tracks the next free row in the result.',
      },
    ],
  },
];
