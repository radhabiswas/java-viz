import type { Lesson } from '../types';
import {
  ap2012FrqClimbingClub,
  ap2012FrqGrayImage,
  ap2012FrqHorseBarn,
  ap2012FrqRetroBug,
  FRQ_2012_Q1_CLIMBING_PRINTED,
  FRQ_2012_Q1_REF_ADD_CLIMB_APPEND,
  FRQ_2012_Q1_REF_ADD_CLIMB_SORTED,
  FRQ_2012_Q1_REFERENCE_COMPLETE,
  FRQ_2012_Q2_REFERENCE_COMPLETE,
  FRQ_2012_Q2_RETRO_BUG_PRINTED,
  FRQ_2012_Q3_HORSE_BARN_PRINTED,
  FRQ_2012_Q3_REF_CONSOLIDATE,
  FRQ_2012_Q3_REF_FIND_HORSE_SPACE,
  FRQ_2012_Q3_REFERENCE_COMPLETE,
  FRQ_2012_Q4_GRAY_IMAGE_PRINTED,
  FRQ_2012_Q4_REF_COUNT_WHITE,
  FRQ_2012_Q4_REF_PROCESS_IMAGE,
  FRQ_2012_Q4_REFERENCE_COMPLETE,
} from './ap2012FrqSheets';

/** Full 2012 FRQ set — orders 148–151 (parallel wave before PDF-stub hubs at 152+). */
export const ap2012FrqLessons: Lesson[] = [
  {
    id: 'ps-2012-1-climbing-club',
    order: 148,
    chapter: '9 · AP CS A Problems',
    title: 'ClimbingClub — addClimb order vs sorted; distinctPeakNames',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2012',
    algorithmSubsection: 'Lists & ordering',
    apExamFrqSheet: ap2012FrqClimbingClub,
    algorithmDesign: {
      implementationStartStepIndex: 9,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
        { at: 6, label: 'Part (c)' },
      ],
    },
    code: FRQ_2012_Q1_CLIMBING_PRINTED,
    implementationWorkspaceCode: FRQ_2012_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps12-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — what you implement**\n\n• **`addClimb(peakName, climbTime)`** — **`new ClimbInfo`** then append to **`climbList`**\n• **Post:** new entry is **last**; relative order of older entries **unchanged**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`climbList.add(new ClimbInfo(peakName, climbTime))`**\n• No searching — **O(1)** amortized append',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2012_Q1_REF_ADD_CLIMB_APPEND,
      },
      {
        id: 'ps12-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — what you implement**\n\n• **Pre:** **`climbList`** already **alphabetical** by peak name\n• Insert new **`ClimbInfo`** so the list stays sorted (**`String.compareTo`**)\n• **Same names** may cluster in **either** order within the group',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Scan index **`i`** while **`peakName.compareTo(climbList.get(i).getName()) > 0`**\n• **`climbList.add(i, new ClimbInfo(...))`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2012_Q1_REF_ADD_CLIMB_SORTED,
      },
      {
        id: 'ps12-1-s7',
        codeLine: -1,
        description:
          '**Part (c)(i) — insertion-order `addClimb`**\n\n• **`distinctPeakNames`** increments when **adjacent** names **differ**\n• With duplicates **not** necessarily adjacent (e.g. **Monadnock** … **Monadnock**), the method can **over-count** → **NO**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-1-s8',
        codeLine: -1,
        description:
          '**Part (c)(ii) — sorted `addClimb`**\n\n• Equal names are **grouped** → duplicates are **adjacent** → **`compareTo`** stays **0** between them → **YES** (returns **3** for the sample)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-1-s9',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart **(a)** is a one-liner append. Part **(b)** is **linear insert** in a sorted list. Part **(c)** is about **algorithm assumption** vs **data ordering**.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-1-s10',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'pn', name: 'peakName', type: 'reference', value: '"Algonquin"' },
            { id: 'tm', name: 'climbTime', type: 'primitive', value: 225 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** uses **sorted** **`addClimb`** (part **(b)**); compare with the **append** snippet in the walkthrough.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps12-1-a',
        name: 'Part (a): append',
        description: 'Create ClimbInfo and add at end of climbList.',
        lines: [43, 44, 45, 46],
        memory: {
          stack: [],
          heap: [{ id: 'cl', className: 'ArrayList', fields: [{ name: 'size', value: '4' }] }],
          staticArea: [],
        },
        memoryCaption: 'Insertion order keeps the sample list in add order.',
      },
      {
        id: 'c-ps12-1-b',
        name: 'Part (b): sorted insert',
        description: 'Scan with compareTo; add at index i to preserve alphabetical order.',
        lines: [43, 44, 45, 46],
        implementationLines: [30, 31, 32, 33, 34, 35, 36, 37],
        memory: {
          stack: [{ id: 'ix', name: 'i', type: 'primitive', value: 1 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'While peakName is lexicographically greater, advance i.',
      },
      {
        id: 'c-ps12-1-c',
        name: 'distinctPeakNames',
        description: 'Counts adjacent name changes — valid only when equal names are grouped.',
        lines: [60, 61, 62, 63],
        implementationLines: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
        memory: {
          stack: [
            { id: 'pv', name: 'prevName', type: 'reference', value: '"Monadnock"' },
            { id: 'cv', name: 'currName', type: 'reference', value: '"Monadnock"' },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Same adjacent names do not increment numNames.',
      },
    ],
  },
  {
    id: 'ps-2012-2-retro-bug',
    order: 149,
    chapter: '9 · AP CS A Problems',
    title: 'RetroBug — GridWorld save/restore',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2012',
    algorithmSubsection: 'Inheritance & case study',
    apExamFrqSheet: ap2012FrqRetroBug,
    algorithmDesign: {
      implementationStartStepIndex: 4,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2012_Q2_RETRO_BUG_PRINTED,
    implementationWorkspaceCode: FRQ_2012_Q2_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps12-2-s1',
        codeLine: -1,
        description:
          '**GridWorld context**\n\n• **`RetroBug`** extends **`Bug`**\n• At **start** of each **`act`**, remember **location** and **direction**\n• Then **`super.act()`** — normal bug behavior\n• **`restore()`** — uses **last** saved state until the **next** **`act`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-2-s2',
        codeLine: -1,
        description:
          '**`restore()` rules**\n\n• **No-op** before the **first** **`act`** (guard uninitialized / null save)\n• **Always** reset **direction** to the saved one\n• **Move** to saved **location** only if that cell is **empty** or a **`Flower`** — otherwise stay put',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-2-s3',
        codeLine: -1,
        description:
          '**Design**\n\n• Fields: **`Location`**, **`Direction`** (or sentinel for “never acted”)\n• **`act`**: assign fields **before** **`super.act()`**\n• **`restore`**: **`setDirection`**; **`getGrid().get(saved)`** then **`moveTo`** when allowed',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-2-s4',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2012_Q2_REFERENCE_COMPLETE,
      },
      {
        id: 'ps12-2-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'rb',
              className: 'RetroBug',
              fields: [
                { name: 'savedLocation', value: '(1,1)' },
                { name: 'savedDirection', value: 'EAST' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** matches the published solution shape (`Bug`, `Flower`, `Actor`, `GridWorld` types on the original exam).',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps12-2-act',
        name: 'act',
        description: 'Save location and direction, then super.act().',
        lines: [5, 6, 7],
        implementationLines: [5, 6, 7, 8, 9],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Snapshot is from the beginning of this act call.',
      },
      {
        id: 'c-ps12-2-restore',
        name: 'restore',
        description: 'Guard first call; setDirection; moveTo when cell empty or Flower.',
        lines: [13, 14, 15],
        implementationLines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Direction is always restored; position only when allowed.',
      },
    ],
  },
  {
    id: 'ps-2012-3-horse-barn',
    order: 150,
    chapter: '9 · AP CS A Problems',
    title: 'HorseBarn — findHorseSpace & consolidate',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2012',
    algorithmSubsection: '1D arrays',
    apExamFrqSheet: ap2012FrqHorseBarn,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2012_Q3_HORSE_BARN_PRINTED,
    implementationWorkspaceCode: FRQ_2012_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps12-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `findHorseSpace(name)`**\n\n• Return **first** index **`i`** with **`spaces[i] != null`** and **`name.equals(spaces[i].getName())`**\n• If none → **-1**\n• Precondition: names are **unique**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`for (int i = 0; i < spaces.length; i++)`**\n• **`equals`** on **`getName()`**, not **`==`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2012_Q3_REF_FIND_HORSE_SPACE,
      },
      {
        id: 'ps12-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `consolidate`**\n\n• Pack non-**null** horses into **`0 … count-1`**\n• Preserve **relative order** (left-to-right scan)\n• Remaining slots **null**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-3-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• **First pass:** copy non-null references into **`temp`** (or tally **`count`**)\n• **Second pass:** write **`spaces[i] = temp[i]`** for **`i < count`**, else **`null`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-3-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2012_Q3_REF_CONSOLIDATE,
      },
      {
        id: 'ps12-3-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [{ id: 'nm', name: 'name', type: 'reference', value: '"Silver"' }],
          heap: [
            {
              id: 'bn',
              className: 'HorseBarn',
              fields: [{ name: 'spaces.length', value: '7' }],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: sample search index and barn length.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps12-3-find',
        name: 'findHorseSpace',
        description: 'Linear scan; null-check before getName.',
        lines: [25, 26, 27],
        implementationLines: [4, 5, 6, 7, 8, 9, 10, 11],
        memory: {
          stack: [{ id: 'ix', name: 'i', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Return as soon as the name matches.',
      },
      {
        id: 'c-ps12-3-consolidate',
        name: 'consolidate',
        description: 'Collect non-null in order, then write back with trailing nulls.',
        lines: [35, 36, 37],
        implementationLines: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        memory: {
          stack: [
            { id: 'ct', name: 'count', type: 'primitive', value: 4 },
            { id: 'ix', name: 'i', type: 'primitive', value: 5 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Order preserved from the original left-to-right scan.',
      },
    ],
  },
  {
    id: 'ps-2012-4-gray-image',
    order: 151,
    chapter: '9 · AP CS A Problems',
    title: 'GrayImage — white count & offset subtraction',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2012',
    algorithmSubsection: '2D arrays',
    apExamFrqSheet: ap2012FrqGrayImage,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2012_Q4_GRAY_IMAGE_PRINTED,
    implementationWorkspaceCode: FRQ_2012_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps12-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `countWhitePixels`**\n\n• Count entries **== `WHITE`** (**255**)\n• **Do not** modify **`pixelValues`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Nested **`for`** over **rows** and **columns**\n• **`if (pixelValues[r][c] == WHITE)`** → increment counter',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2012_Q4_REF_COUNT_WHITE,
      },
      {
        id: 'ps12-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — `processImage`**\n\n• **Row-major** order\n• For **`(r,c)`**, if **`(r+2, c+2)`** exists, set **`pixelValues[r][c]`** to **`max(BLACK, old - neighbor)`** (clamp)\n• If neighbor **out of bounds**, leave pixel **unchanged**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-4-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• **`rr = r + 2`**, **`cc = c + 2`**\n• **`if (rr < pixelValues.length && cc < pixelValues[r].length)`** then read neighbor and subtract\n• Clamp with **`if (v < BLACK) v = BLACK`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps12-4-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2012_Q4_REF_PROCESS_IMAGE,
      },
      {
        id: 'ps12-4-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'rw', name: 'r', type: 'primitive', value: 1 },
            { id: 'cl', name: 'c', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: trace **`(r,c)`** vs **`(r+2,c+2)`** bounds.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps12-4-count',
        name: 'countWhitePixels',
        description: 'Double loop; compare each cell to WHITE.',
        lines: [15, 16, 17],
        implementationLines: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        memory: {
          stack: [{ id: 'nw', name: 'n', type: 'primitive', value: 5 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Exam sample matrix has five WHITE cells.',
      },
      {
        id: 'c-ps12-4-process',
        name: 'processImage',
        description: 'Subtract pixel at (r+2,c+2) when in bounds; clamp to BLACK.',
        lines: [25, 26, 27],
        implementationLines: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        memory: {
          stack: [
            { id: 'rr', name: 'rr', type: 'primitive', value: 3 },
            { id: 'vv', name: 'v', type: 'primitive', value: 0 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Bottom rows lack a (row+2,col+2) neighbor — skip.',
      },
    ],
  },
];
