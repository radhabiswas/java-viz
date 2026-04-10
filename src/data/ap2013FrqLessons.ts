import type { Lesson } from '../types';
import {
  ap2013FrqGridWorldJump,
  ap2013FrqMusicDownloads,
  ap2013FrqSkyView,
  ap2013FrqTokenPass,
  FRQ_2013_Q1_DOWNLOADS_PRINTED,
  FRQ_2013_Q1_REFERENCE_COMPLETE,
  FRQ_2013_Q1_REF_GET_DOWNLOAD_INFO,
  FRQ_2013_Q1_REF_UPDATE_DOWNLOADS,
  FRQ_2013_Q2_REFERENCE_COMPLETE,
  FRQ_2013_Q2_REF_CONSTRUCTOR,
  FRQ_2013_Q2_REF_DISTRIBUTE,
  FRQ_2013_Q2_TOKEN_PASS_PRINTED,
  FRQ_2013_Q3_GRIDWORLD_PRINTED,
  FRQ_2013_Q3_REFERENCE_COMPLETE,
  FRQ_2013_Q3_REF_GET_EMPTY,
  FRQ_2013_Q3_REF_JUMPING,
  FRQ_2013_Q4_REFERENCE_COMPLETE,
  FRQ_2013_Q4_REF_CONSTRUCTOR,
  FRQ_2013_Q4_REF_GET_AVERAGE,
  FRQ_2013_Q4_SKY_VIEW_PRINTED,
} from './ap2013FrqSheets';

/** Full 2013 FRQ set — orders 144–147 (parallel wave before PDF-stub hubs at 152+). */
export const ap2013FrqLessons: Lesson[] = [
  {
    id: 'ps-2013-1-music-downloads',
    order: 144,
    chapter: '9 · AP CS A Problems',
    title: 'MusicDownloads — lookup & update from title list',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2013',
    algorithmSubsection: 'ArrayList & object state',
    apExamFrqSheet: ap2013FrqMusicDownloads,
    algorithmDesign: {
      implementationStartStepIndex: 7,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2013_Q1_DOWNLOADS_PRINTED,
    implementationWorkspaceCode: FRQ_2013_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps13-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — `getDownloadInfo(title)`**\n\n• Return the **`DownloadInfo`** in **`downloadList`** whose **`getTitle()`** matches **`title`** (**`equals`**)\n• Return **`null`** if none\n• **Do not** modify **`downloadList`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Loop over **`downloadList`** (index or enhanced **`for`**)\n• Compare each **`getTitle()`** to the parameter\n• Return the first match; **`null`** after the loop',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q1_REF_GET_DOWNLOAD_INFO,
      },
      {
        id: 'ps13-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `updateDownloads(titles)`**\n\n• Process **`titles`** **in order**\n• If **`getDownloadInfo(t)`** is **`null`** → **`add(new DownloadInfo(t))`** (count starts at **1**)\n• Else → **`incrementTimesDownloaded()`** once per occurrence\n• **Must** call **`getDownloadInfo`** — do not duplicate its search logic inline',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — example**\n\n**`{"Lights","Aqualung","Soul Sister","Go Now","Lights","Soul Sister"}`** on an existing list updates counts for **Aqualung** / **Soul Sister**, adds **Lights** (then second **Lights** increments to **2**) and **Go Now** at the **end**, preserving original entry order.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q1_REF_UPDATE_DOWNLOADS,
      },
      {
        id: 'ps13-1-s7',
        codeLine: -1,
        description:
          '**Before you code**\n\n**(a)** is a **search** with **no** side effects. **(b)** is **one pass** over **`titles`** using **(a)** as a helper — new songs append in **first-appearance** order.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-1-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [{ id: 't', name: 'title', type: 'reference', refId: 'strT' }],
          heap: [{ id: 'strT', className: 'String', fields: [{ name: 'value', value: '"Aqualung"' }] }],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** uses generics on **`List`** for clarity; the exam may show **raw** types.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps13-1-get',
        name: 'getDownloadInfo',
        description: 'Linear search on downloadList; equals on titles.',
        lines: [49, 50, 51],
        implementationLines: [30, 31, 32, 33, 34, 35, 36, 37],
        memory: {
          stack: [{ id: 'ti', name: 'title', type: 'reference', refId: 's1' }],
          heap: [{ id: 's1', className: 'String', fields: [{ name: 'value', value: '"Hey Jude"' }] }],
          staticArea: [],
        },
        memoryCaption: 'Return **`null`** only after checking every entry.',
      },
      {
        id: 'c-ps13-1-update',
        name: 'updateDownloads',
        description: 'Per title: getDownloadInfo then add new or increment.',
        lines: [69, 70, 71],
        implementationLines: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        memory: {
          stack: [],
          heap: [
            {
              id: 'dl',
              className: 'ArrayList',
              fields: [{ name: 'size', value: '3' }],
            },
          ],
          staticArea: [],
        },
        memoryCaption: 'Constructor gives **1**; each repeat title calls **`incrementTimesDownloaded`**.',
      },
    ],
  },
  {
    id: 'ps-2013-2-token-pass',
    order: 145,
    chapter: '9 · AP CS A Problems',
    title: 'TokenPass — random board & wrapped distribution',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2013',
    algorithmSubsection: '1D array & simulation',
    apExamFrqSheet: ap2013FrqTokenPass,
    algorithmDesign: {
      implementationStartStepIndex: 7,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2013_Q2_TOKEN_PASS_PRINTED,
    implementationWorkspaceCode: FRQ_2013_Q2_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps13-2-s1',
        codeLine: -1,
        description:
          '**Part (a) — constructor**\n\n• **`board`** length **`playerCount`**\n• Each slot random **1–10** inclusive: **`(int)(Math.random() * 10) + 1`**\n• **`currentPlayer`** random **0 … playerCount − 1**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-2-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`new int[playerCount]`** then a **`for`** to fill\n• **`currentPlayer = (int)(Math.random() * playerCount)`** — upper bound exclusive matches **0…n−1**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-2-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q2_REF_CONSTRUCTOR,
      },
      {
        id: 'ps13-2-s4',
        codeLine: -1,
        description:
          '**Part (b) — `distributeCurrentPlayerTokens`**\n\n• Read **`tokens = board[currentPlayer]`**, set that cell to **0**\n• First recipient index **`currentPlayer + 1`** (may need wrap before adding)\n• Give **one** token per step; after index **`length − 1`**, next is **0**\n• **`currentPlayer`** unchanged when done',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-2-s5',
        codeLine: -1,
        description:
          '**Part (b) — walkthrough**\n\nFour players, current **2**, six tokens: order of receives is **3 → 0 → 1 → 2 → 3 → 0** (wrap after **3**).',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-2-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q2_REF_DISTRIBUTE,
      },
      {
        id: 'ps13-2-s7',
        codeLine: -1,
        description:
          '**Before you code**\n\n**(a)** is **`Random`** bounds. **(b)** is a **circular** walk: normalize **`next`** before each **`board[next]++`**.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-2-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'cp', name: 'currentPlayer', type: 'primitive', value: 2 },
            { id: 'tk', name: 'tokens', type: 'primitive', value: 6 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Sample state before **`distributeCurrentPlayerTokens`**.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps13-2-con',
        name: 'Constructor',
        description: 'Random fill 1–10; random starting player index.',
        lines: [10, 11, 12],
        implementationLines: [5, 6, 7, 8, 9, 10, 11],
        memory: {
          stack: [{ id: 'pc', name: 'playerCount', type: 'primitive', value: 4 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`Math.random() * 10`** gives **0…9**; add **1** for **1…10**.',
      },
      {
        id: 'c-ps13-2-dist',
        name: 'distributeCurrentPlayerTokens',
        description: 'Zero current cell; circular single-token handouts.',
        lines: [19, 20, 21],
        implementationLines: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        memory: {
          stack: [{ id: 'nx', name: 'next', type: 'primitive', value: 0 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Wrap **`next`** when it reaches **`board.length`**.',
      },
    ],
  },
  {
    id: 'ps-2013-3-gridworld-jump',
    order: 146,
    chapter: '9 · AP CS A Problems',
    title: 'GridWorld — empty cells & JumpingCritter',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2013',
    algorithmSubsection: 'Historical case study',
    apExamFrqSheet: ap2013FrqGridWorldJump,
    algorithmDesign: {
      implementationStartStepIndex: 7,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2013_Q3_GRIDWORLD_PRINTED,
    implementationWorkspaceCode: FRQ_2013_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps13-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `getEmptyLocations`**\n\n• Every **`Location (r,c)`** where **`grid.get(loc) == null`**\n• Each empty cell **exactly once**\n• Return **`ArrayList`** (may be empty)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`r`** from **0** to **`grid.getNumRows() - 1`**, **`c`** over columns\n• **`new Location(r, c)`**; test **`grid.get(loc)`**\n• **`add`** to result list',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q3_REF_GET_EMPTY,
      },
      {
        id: 'ps13-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `JumpingCritter`**\n\n• Extends **`Critter`**; **do not** override **`act`**\n• **Must** use **`GridWorldUtilities.getEmptyLocations(getGrid())`** — no copy-paste of part (a)\n• If the list is **empty**, inherited behavior removes the critter; otherwise it jumps to a **random** empty cell',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-3-s5',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\nOverride **`getMoveLocations`** to return **all** empty **`Location`**s. **`Critter`** already chooses randomly from that list and handles **null** / empty.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-3-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q3_REF_JUMPING,
      },
      {
        id: 'ps13-3-s7',
        codeLine: -1,
        description:
          '**Context**\n\n**GridWorld** was the **2013** case study; it is **not** on the current AP CSA exam. Types live in **`info.gridworld.*`**.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-3-s8',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Reference editor** includes **`info.gridworld`** imports for a faithful solution.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps13-3-empty',
        name: 'getEmptyLocations',
        description: 'Scan grid; null occupant means empty.',
        lines: [11, 12, 13],
        implementationLines: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        memory: {
          stack: [{ id: 'loc', name: 'loc', type: 'reference', refId: 'lc1' }],
          heap: [{ id: 'lc1', className: 'Location', fields: [{ name: 'row', value: '1' }, { name: 'col', value: '2' }] }],
          staticArea: [],
        },
        memoryCaption: '**`grid.getNumRows()`** / **`getNumCols()`** bound the loops.',
      },
      {
        id: 'c-ps13-3-jump',
        name: 'JumpingCritter',
        description: 'Delegate getMoveLocations to utility on getGrid().',
        lines: [18, 19, 20],
        implementationLines: [22, 23, 24],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Single override; **do not** reimplement the empty-cell scan.',
      },
    ],
  },
  {
    id: 'ps-2013-4-sky-view',
    order: 147,
    chapter: '9 · AP CS A Problems',
    title: 'SkyView — telescope order & subgrid average',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2013',
    algorithmSubsection: '2D array & indexing',
    apExamFrqSheet: ap2013FrqSkyView,
    algorithmDesign: {
      implementationStartStepIndex: 6,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2013_Q4_SKY_VIEW_PRINTED,
    implementationWorkspaceCode: FRQ_2013_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps13-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — telescope order**\n\n• Row **0**: **`scanned`** fills **left → right**\n• Row **1**: **right → left**\n• Row **2**: **left → right**, and so on\n• **`scanned.length == numRows * numCols`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• Allocate **`view[numRows][numCols]`**\n• **`int idx = 0`** walks **`scanned`** strictly in order\n• Even **`r`**: **`c`** from **0** to **`numCols-1`**; odd **`r`**: **`c`** from **`numCols-1`** down to **0**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q4_REF_CONSTRUCTOR,
      },
      {
        id: 'ps13-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — `getAverage`**\n\n• Inclusive bounds **`startRow…endRow`**, **`startCol…endCol`**\n• Sum every **`view[r][c]`** in the rectangle; divide by **count**\n• Use **`double`** accumulation to match return type',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-4-s5',
        codeLine: -1,
        description:
          '**Part (b) — example**\n\nExam: **`getAverage(1, 2, 0, 1)`** on the **4×3** sample → **(1.1 + 1.4 + 0.2 + 0.5) / 4 = 0.8**.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps13-4-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2013_Q4_REF_GET_AVERAGE,
      },
      {
        id: 'ps13-4-s7',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'sr', name: 'startRow', type: 'primitive', value: 1 },
            { id: 'er', name: 'endRow', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Concepts** split zigzag fill vs averaging loops.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps13-4-con',
        name: 'Constructor',
        description: 'Even rows forward; odd rows reverse when copying scanned.',
        lines: [17, 18, 19],
        implementationLines: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        memory: {
          stack: [{ id: 'ix', name: 'idx', type: 'primitive', value: 6 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`r % 2`** chooses column loop direction.',
      },
      {
        id: 'c-ps13-4-avg',
        name: 'getAverage',
        description: 'Inclusive nested loops; sum/count as double.',
        lines: [30, 31, 32],
        implementationLines: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        memory: {
          stack: [{ id: 'sm', name: 'sum', type: 'primitive', value: 3.2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`<= endRow`** and **`<= endCol`** per preconditions.',
      },
    ],
  },
];
