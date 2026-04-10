import type { Lesson } from '../types';
import {
  ap2014FrqDirector,
  ap2014FrqScramble,
  ap2014FrqSeatingChart,
  ap2014FrqTrio,
  FRQ_2014_Q1_REFERENCE_COMPLETE,
  FRQ_2014_Q1_REF_SCRAMBLE_OR_REMOVE,
  FRQ_2014_Q1_REF_SCRAMBLE_WORD,
  FRQ_2014_Q1_SCRAMBLE_PRINTED,
  FRQ_2014_Q2_DIRECTOR_PRINTED,
  FRQ_2014_Q2_DIRECTOR_REFERENCE,
  FRQ_2014_Q2_REF_ACT,
  FRQ_2014_Q3_REFERENCE_COMPLETE,
  FRQ_2014_Q3_REF_CONSTRUCTOR,
  FRQ_2014_Q3_REF_REMOVE_ABSENT,
  FRQ_2014_Q3_SEATING_PRINTED,
  FRQ_2014_Q4_TRIO_PRINTED,
  FRQ_2014_Q4_TRIO_REFERENCE,
} from './ap2014FrqSheets';

/** Full 2014 FRQ set — orders 140–143 (parallel wave before PDF-stub hubs). */
export const ap2014FrqLessons: Lesson[] = [
  {
    id: 'ps-2014-1-scramble',
    order: 140,
    chapter: '9 · AP CS A Problems',
    title: 'Scramble — A/non-A swaps & scrambleOrRemove',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2014',
    algorithmSubsection: 'String & List',
    apExamFrqSheet: ap2014FrqScramble,
    algorithmDesign: {
      implementationStartStepIndex: 7,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2014_Q1_SCRAMBLE_PRINTED,
    implementationWorkspaceCode: FRQ_2014_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps14-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — rules**\n\n• Scan **left → right**; at each position consider **two** adjacent letters\n• Swap only when **`\'A\'`** is immediately followed by a **non-`\'A\'`**\n• After a swap, **neither** of those two indices may swap again\n• Exam: **`TAN`→`TNA`**, **`ABRACADABRA`→`BARCADABARA`**, **`WHOA`**, **`EGGS`** unchanged',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Use **`StringBuilder`** (or build a new **`String`**)\n• Index **i**: if **`charAt(i)==\'A\'`** and **`charAt(i+1)!=\'A\'`**, swap **`i`** and **`i+1`**, then **`i += 2`**\n• Else **`i++`**\n• Stop when no pair starting at **i** remains (**`i < length-1`** for the pair check)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2014_Q1_REF_SCRAMBLE_WORD,
      },
      {
        id: 'ps14-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `scrambleOrRemove`**\n\n• Replace each **`wordList`** entry with **`scrambleWord`** of that entry\n• **Remove** any word that is **unchanged** after scrambling\n• Preserve **relative order** of survivors\n• Exam table: **`TAN`,`ABRACADABRA`,…** → **`TNA`,`BARCADABARA`,…** with **`WHOA`**, **`EGGS`**, **`APPLE`** removed',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Forward index **i**; compute **`scram = scrambleWord(get(i))`**\n• If **`scram.equals(original)`** → **`remove(i)`** and **`i--`**\n• Else **`set(i, scram)`**\n• Assume **`scrambleWord`** is correct',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2014_Q1_REF_SCRAMBLE_OR_REMOVE,
      },
      {
        id: 'ps14-1-s7',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is a **single left-to-right pass** with a **skip-2** after each swap. Part (b) is **in-place list surgery** with a **careful index** after **`remove`**.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-1-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'w', name: 'word', type: 'reference', refId: 'strTan' },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
          ],
          heap: [{ id: 'strTan', className: 'String', fields: [{ name: 'value', value: '"TAN"' }] }],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: trace **`scrambleWord`** on a short uppercase string.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps14-1-a',
        name: 'Part (a): scrambleWord',
        description: 'Swap A + non-A; advance by 2 after swap; else advance by 1.',
        lines: [14, 15, 16],
        implementationLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        memory: {
          stack: [{ id: 'i', name: 'i', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'After a swap, **i** jumps past both swapped characters.',
      },
      {
        id: 'c-ps14-1-b',
        name: 'Part (b): scrambleOrRemove',
        description: 'set scrambled word; remove unchanged entries; adjust index after remove.',
        lines: [28, 29, 30],
        implementationLines: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        memory: {
          stack: [{ id: 'ix', name: 'i', type: 'primitive', value: 1 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**remove** shifts indices — decrement **i** so you do not skip the next element.',
      },
    ],
  },
  {
    id: 'ps-2014-2-director',
    order: 141,
    chapter: '9 · AP CS A Problems',
    title: 'Director — GridWorld Rock, colors & neighbor turns',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2014',
    algorithmSubsection: 'GridWorld (legacy case study)',
    apExamFrqSheet: ap2014FrqDirector,
    algorithmDesign: {
      implementationStartStepIndex: 4,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2014_Q2_DIRECTOR_PRINTED,
    implementationWorkspaceCode: FRQ_2014_Q2_DIRECTOR_REFERENCE,
    steps: [
      {
        id: 'ps14-2-s1',
        codeLine: -1,
        description:
          '**Context — GridWorld**\n\n• **`Director`** extends **`Rock`** (**`Actor`**)\n• **`Color`** is **`java.awt.Color`** (imported on the exam)\n• You may use **`getGrid`**, **`getLocation`**, **`getColor`**, **`setColor`**, **`getDirection`**, **`setDirection`**, and **`Location.RIGHT`** (**90°**)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-2-s2',
        codeLine: -1,
        description:
          '**Constructor & color alternation**\n\n• **Zero-parameter** constructor\n• **Initial** color **`Color.RED`**\n• Each **`act`**, after handling neighbors, **toggle** **RED** ↔ **GREEN**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-2-s3',
        codeLine: -1,
        description:
          '**When GREEN at start of `act`**\n\n• Consider **occupied** **adjacent** cells (**8-neighborhood** in GridWorld)\n• For each neighboring **`Actor`**, **`setDirection(getDirection() + Location.RIGHT)`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-2-s4',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below (**`Rock`**, **`Actor`**, **`Grid`**, **`Location`** from the case study).',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2014_Q2_DIRECTOR_REFERENCE,
      },
      {
        id: 'ps14-2-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'dir',
              className: 'Director',
              fields: [
                { name: 'color', value: 'GREEN' },
                { name: 'direction', value: '0' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor**: GridWorld types are assumed from the exam appendix — focus on **order**: neighbors first when **GREEN**, then **flip** color.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps14-2-ctor',
        name: 'Constructor',
        description: 'setColor(Color.RED) in zero-arg constructor.',
        lines: [3, 4],
        implementationLines: [5, 6, 7],
        memory: { stack: [], heap: [], staticArea: [] },
        memoryCaption: '**Director** starts **RED**.',
      },
      {
        id: 'c-ps14-2-act',
        name: 'act',
        description: 'GREEN: rotate each neighbor Actor by Location.RIGHT; then toggle RED/GREEN.',
        lines: [3, 4, 5],
        implementationLines: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Check **GREEN** before toggling so rotation uses the **incoming** color.',
      },
    ],
  },
  {
    id: 'ps-2014-3-seating-chart',
    order: 142,
    chapter: '9 · AP CS A Problems',
    title: 'SeatingChart — column-major layout & absences',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2014',
    algorithmSubsection: '2D array & List',
    apExamFrqSheet: ap2014FrqSeatingChart,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2014_Q3_SEATING_PRINTED,
    implementationWorkspaceCode: FRQ_2014_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps14-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — constructor**\n\n• Allocate **`seats`** as **`new Student[rows][cols]`**\n• Copy **`studentList`** in list order into **`seats`**, starting at **`[0][0]`**\n• Fill **column by column**: for each **col**, fill **rows** **0 … rows−1**, then next column\n• Remaining cells → **`null`**\n• **Do not** modify **`studentList`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — exam grid**\n\n• Roster order maps to columns: **col 0** = Karen, Lester, Glen, Danny down rows; **col 1** = Liz, Henry, Fran, **null**; etc.\n• Index **`idx`** into **`studentList`** runs **0, 1, 2, …** as you walk the grid',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2014_Q3_REF_CONSTRUCTOR,
      },
      {
        id: 'ps14-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `removeAbsentStudents`**\n\n• For each non-**`null`** seat, if **`getAbsenceCount() > allowedAbsences`**, set that cell to **`null`**\n• **Do not** shift other students — only **replace** high-absence slots\n• Return **how many** students were removed',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-3-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2014_Q3_REF_REMOVE_ABSENT,
      },
      {
        id: 'ps14-3-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [{ id: 'al', name: 'allowedAbsences', type: 'primitive', value: 4 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** includes only **`SeatingChart`** — **`Student`** is given on the exam.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps14-3-fill',
        name: 'Constructor (column-major)',
        description: 'Outer loop over cols, inner over rows; idx into studentList.',
        lines: [33, 34, 35],
        implementationLines: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        memory: {
          stack: [
            { id: 'c', name: 'c', type: 'primitive', value: 1 },
            { id: 'r', name: 'r', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Column-major** matches the exam picture: down each column before moving right.',
      },
      {
        id: 'c-ps14-3-abs',
        name: 'removeAbsentStudents',
        description: 'Double loop; null out cells where absences exceed allowed; count removals.',
        lines: [47, 48, 49],
        implementationLines: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        memory: {
          stack: [{ id: 'rm', name: 'removed', type: 'primitive', value: 3 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Exam **`removeAbsentStudents(4)`** removes **3** students with counts **> 4**.',
      },
    ],
  },
  {
    id: 'ps-2014-4-trio',
    order: 143,
    chapter: '9 · AP CS A Problems',
    title: 'Trio — MenuItem & sum of two highest prices',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2014',
    algorithmSubsection: 'Interfaces & composition',
    apExamFrqSheet: ap2014FrqTrio,
    algorithmDesign: {
      implementationStartStepIndex: 4,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2014_Q4_TRIO_PRINTED,
    implementationWorkspaceCode: FRQ_2014_Q4_TRIO_REFERENCE,
    steps: [
      {
        id: 'ps14-4-s1',
        codeLine: -1,
        description:
          '**Types & compile-time checks**\n\n• **`Trio(Sandwich, Salad, Drink)`** only — wrong permutations or duplicate types **do not compile**\n• Store the three items in **private** fields',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-4-s2',
        codeLine: -1,
        description:
          '**`getName`**\n\n• **`sandwich.getName() + "/" + salad.getName() + "/" + drink.getName() + " Trio"`**\n• Example: **`Cheeseburger/Spinach Salad/Orange Soda Trio`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-4-s3',
        codeLine: -1,
        description:
          '**`getPrice`**\n\n• **Total** of the **two highest** item prices (lowest is **free**)\n• Example: **2.75 + 1.25 + 1.25 → 4.00**; **2.75 + 1.25 + 3.50 → 6.25**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps14-4-s4',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2014_Q4_TRIO_REFERENCE,
      },
      {
        id: 'ps14-4-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'tr',
              className: 'Trio',
              fields: [
                { name: 'sandwich', value: '(ref)' },
                { name: 'salad', value: '(ref)' },
                { name: 'drink', value: '(ref)' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: **`Sandwich`**, **`Salad`**, **`Drink`** satisfy **`MenuItem`** on the exam.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps14-4-ctor',
        name: 'Constructor & fields',
        description: 'Sandwich, Salad, Drink fields; constructor assigns this.* references.',
        lines: [11, 12, 13],
        implementationLines: [8, 9, 10, 11, 12, 13, 14, 15, 16],
        memory: { stack: [], heap: [], staticArea: [] },
        memoryCaption: 'Parameter types enforce the exam’s **sandwich / salad / drink** order.',
      },
      {
        id: 'c-ps14-4-name',
        name: 'getName',
        description: 'Slash-separated names plus " Trio" suffix.',
        lines: [15, 16, 17],
        implementationLines: [18, 19, 20],
        memory: { stack: [], heap: [], staticArea: [] },
        memoryCaption: 'Use **`"/"`** between names exactly as in the examples.',
      },
      {
        id: 'c-ps14-4-price',
        name: 'getPrice',
        description: 'Sum minus minimum of three prices (two highest count).',
        lines: [19, 20, 21],
        implementationLines: [22, 23, 24, 25, 26, 27],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`a + b + c - Math.min(a, Math.min(b, c))`** matches the rubric.',
      },
    ],
  },
];
