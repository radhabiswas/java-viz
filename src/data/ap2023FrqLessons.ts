import type { Lesson } from '../types';
import {
  ap2023FrqAppointmentBook,
  ap2023FrqBoxOfCandy,
  ap2023FrqSign,
  ap2023FrqWeatherData,
  FRQ_2023_Q1_APPOINTMENT_BOOK_PRINTED,
  FRQ_2023_Q1_REFERENCE_COMPLETE,
  FRQ_2023_Q1_REF_FIND_FREE_BLOCK,
  FRQ_2023_Q1_REF_MAKE_APPOINTMENT,
  FRQ_2023_Q2_REFERENCE_CLASS,
  FRQ_2023_Q2_SIGN_PRINTED,
  FRQ_2023_Q3_REFERENCE_COMPLETE,
  FRQ_2023_Q3_REF_CLEAN_DATA,
  FRQ_2023_Q3_REF_LONGEST_HEAT_WAVE,
  FRQ_2023_Q3_WEATHER_DATA_PRINTED,
  FRQ_2023_Q4_BOX_OF_CANDY_PRINTED,
  FRQ_2023_Q4_REFERENCE_COMPLETE,
  FRQ_2023_Q4_REF_MOVE_CANDY_TO_FIRST_ROW,
  FRQ_2023_Q4_REF_REMOVE_NEXT_BY_FLAVOR,
} from './ap2023FrqSheets';

/** Full 2023 FRQ set — orders 112–115 after 2024 (108–111); PDF stubs use orders ≥ 152. */
export const ap2023FrqLessons: Lesson[] = [
  {
    id: 'ps-2023-1-appointment-book',
    order: 112,
    chapter: '9 · AP CS A Problems',
    title: 'AppointmentBook — free blocks & scheduling periods',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2023',
    algorithmSubsection: 'Loops & method calls',
    apExamFrqSheet: ap2023FrqAppointmentBook,
    algorithmDesign: {
      implementationStartStepIndex: 7,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2023_Q1_APPOINTMENT_BOOK_PRINTED,
    implementationWorkspaceCode: FRQ_2023_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps23-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — `findFreeBlock(period, duration)`**\n\n• Return the **starting minute** (0–59) of the **first** **consecutive** block of **`duration`** **free** minutes in **`period`**\n• Use **`isMinuteFree(period, minute)`** for each minute\n• Return **-1** if no such block fits in the hour',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **Counter** for consecutive free minutes; **+1** when free, **0** when busy\n• When counter hits **`duration`**, the block **ends** at **`minute`** → start = **`minute - duration + 1`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2023_Q1_REF_FIND_FREE_BLOCK,
      },
      {
        id: 'ps23-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — `makeAppointment(startPeriod, endPeriod, duration)`**\n\n• Try **each period** from **`startPeriod`** through **`endPeriod`** **inclusive**\n• Use **`findFreeBlock`**; on **non -1**, **`reserveBlock`** and return **true**\n• Return **false** if no period has a block',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — guard**\n\n• **Never** call **`reserveBlock`** with a **-1** start minute\n• Assume **`findFreeBlock`** works as specified',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-1-s6',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2023_Q1_REF_MAKE_APPOINTMENT,
      },
      {
        id: 'ps23-1-s7',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is the **consecutive-run** pattern (same idea as **heat waves** in Q3). Part (b) is **composition**: loop periods, call **(a)**, reserve once.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-1-s8',
        codeLine: -1,
        description:
          '**Implementation**\n\n**Reference editor** uses trivial **`isMinuteFree`** / **`reserveBlock`** stubs so the student methods compile; on the exam those helpers are already correct.',
        memory: {
          stack: [
            { id: 'pd', name: 'period', type: 'primitive', value: 2 },
            { id: 'du', name: 'duration', type: 'primitive', value: 15 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Sample **`findFreeBlock(2, 15)`** context — track a run of free minutes.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps23-1-free',
        name: 'Part (a): findFreeBlock',
        description: 'Consecutive free minutes; reset on busy; return start of first full block.',
        lines: [18, 19],
        implementationLines: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        memory: {
          stack: [
            { id: 'bl', name: 'blockLength', type: 'primitive', value: 15 },
            { id: 'mn', name: 'minute', type: 'primitive', value: 44 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'When **`blockLength == duration`**, return **`minute - blockLength + 1`**.',
      },
      {
        id: 'c-ps23-1-appt',
        name: 'Part (b): makeAppointment',
        description: 'Loop periods; findFreeBlock then reserveBlock when minute ≠ -1.',
        lines: [25, 26],
        implementationLines: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        memory: {
          stack: [{ id: 'st', name: 'minute', type: 'primitive', value: 30 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Reserve only after a **valid** starting minute.',
      },
    ],
  },
  {
    id: 'ps-2023-2-sign',
    order: 113,
    chapter: '9 · AP CS A Problems',
    title: 'Sign — line count, substring & semicolons',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2023',
    algorithmSubsection: 'Class design & String',
    apExamFrqSheet: ap2023FrqSign,
    algorithmDesign: {
      implementationStartStepIndex: 4,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2023_Q2_SIGN_PRINTED,
    implementationWorkspaceCode: FRQ_2023_Q2_REFERENCE_CLASS,
    steps: [
      {
        id: 'ps23-2-s1',
        codeLine: -1,
        description:
          '**Fields & constructor**\n\n• Store **`message`** and **`width`** (**max** characters per line)\n• **No** word wrapping — cut lines at **`width`** exactly',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-2-s2',
        codeLine: -1,
        description:
          '**`numberOfLines()`**\n\n• **Ceiling** of **`message.length()`** ÷ **`width`**\n• **Empty** message → **0** lines\n• Equivalent: **`(len + width - 1) / width`** when **`len > 0`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-2-s3',
        codeLine: -1,
        description:
          '**`getLines()`**\n\n• **`null`** if **0** lines (empty message)\n• Otherwise **`substring`** chunks of **`width`**, joined by **`";"`**\n• **No** trailing **`";"`** after the last chunk',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-2-s4',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2023_Q2_REFERENCE_CLASS,
      },
      {
        id: 'ps23-2-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'sg',
              className: 'Sign',
              fields: [
                { name: 'message', value: '"ABC222DE"' },
                { name: 'width', value: '3' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**`getLines()`** → **`"ABC;222;DE"`** for width **3**.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps23-2-lines',
        name: 'numberOfLines',
        description: 'Ceiling division; 0 when message is empty.',
        lines: [7, 8, 9],
        implementationLines: [10, 11, 12, 13, 14, 15, 16],
        memory: {
          stack: [{ id: 'ln', name: 'len', type: 'primitive', value: 8 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`len % width == 0`** → **`len / width`** only.',
      },
      {
        id: 'c-ps23-2-get',
        name: 'getLines',
        description: 'null for empty; loop first n-1 lines with semicolon; append last slice.',
        lines: [11, 12, 13],
        implementationLines: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Loop **`i`** from **1** to **`linesNeeded - 1`** so the last line has **no** **`";"`**.',
      },
    ],
  },
  {
    id: 'ps-2023-3-weather-data',
    order: 114,
    chapter: '9 · AP CS A Problems',
    title: 'WeatherData — clean ArrayList & longest heat wave',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2023',
    algorithmSubsection: 'ArrayList & traversal',
    apExamFrqSheet: ap2023FrqWeatherData,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2023_Q3_WEATHER_DATA_PRINTED,
    implementationWorkspaceCode: FRQ_2023_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps23-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `cleanData(lower, upper)`**\n\n• **Remove** values **strictly below** **`lower`** or **strictly above** **`upper`**\n• **Keep** values **equal** to **`lower`** or **`upper`**\n• **Preserve order** of remaining temperatures',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — traversal**\n\n• Removing while going **forward** **skips** elements after **`remove`**\n• Traverse **backwards** from **`size() - 1`** to **0** (or adjust index after each remove)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2023_Q3_REF_CLEAN_DATA,
      },
      {
        id: 'ps23-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `longestHeatWave(threshold)`**\n\n• **Heat wave** = **2+** consecutive days with **`temp > threshold`** (**strict**)\n• Return the **length** of the **longest** such run\n• Precondition: at least one heat wave exists',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-3-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below — same **run-length** pattern as **`findFreeBlock`**.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2023_Q3_REF_LONGEST_HEAT_WAVE,
      },
      {
        id: 'ps23-3-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** uses **`ArrayList<Double>`**; the printed stem may show a **raw** `ArrayList` — match the exam declaration in your answer.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps23-3-clean',
        name: 'cleanData',
        description: 'Backwards loop; remove when temp < lower || temp > upper.',
        lines: [9, 10],
        implementationLines: [10, 11, 12, 13, 14, 15, 16, 17],
        memory: {
          stack: [{ id: 'ix', name: 'i', type: 'primitive', value: 4 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`remove(i)`** shifts elements; **backwards** avoids skipping.',
      },
      {
        id: 'c-ps23-3-wave',
        name: 'longestHeatWave',
        description: 'Strict > threshold; reset run on failure; track max run length.',
        lines: [15, 16],
        implementationLines: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        memory: {
          stack: [
            { id: 'wl', name: 'waveLength', type: 'primitive', value: 3 },
            { id: 'mx', name: 'maxWaveLength', type: 'primitive', value: 3 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Use **`>`**, not **`>=`**, vs **`threshold`**.',
      },
    ],
  },
  {
    id: 'ps-2023-4-box-of-candy',
    order: 115,
    chapter: '9 · AP CS A Problems',
    title: 'BoxOfCandy — column moves & flavored removal',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2023',
    algorithmSubsection: '2D array & null',
    apExamFrqSheet: ap2023FrqBoxOfCandy,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2023_Q4_BOX_OF_CANDY_PRINTED,
    implementationWorkspaceCode: FRQ_2023_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps23-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `moveCandyToFirstRow(col)`**\n\n• If **`box[0][col]`** is **non-null** → **true** (nothing to move)\n• Else find **first** **non-null** in that column at **row ≥ 1**, move it to row **0**, **null** the old cell → **true**\n• **false** if the **whole column** is empty',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — order**\n\n• Handle row **0** **before** the loop so you **don’t** “move” a candy that is **already** on row **0**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2023_Q4_REF_MOVE_CANDY_TO_FIRST_ROW,
      },
      {
        id: 'ps23-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — `removeNextByFlavor(flavor)`**\n\n• Traverse **last row → first row**; within each row **left → right**\n• **First** match: flavor via **`.equals`** (not **`==`**)\n• **Null-check** before **`getFlavor()`**\n• **Save** the **`Candy`** reference, then **null** the cell, **return** saved',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps23-4-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2023_Q4_REF_REMOVE_NEXT_BY_FLAVOR,
      },
      {
        id: 'ps23-4-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'cl', name: 'col', type: 'primitive', value: 1 },
            { id: 'rw', name: 'row', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**Part (b)** outer loop: **`row`** from **`length - 1`** down to **0**.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps23-4-move',
        name: 'moveCandyToFirstRow',
        description: 'Early exit if top occupied; else promote first candy from rows 1+.',
        lines: [20, 21],
        implementationLines: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Copy **up**, then **null** the source slot.',
      },
      {
        id: 'c-ps23-4-remove',
        name: 'removeNextByFlavor',
        description: 'Bottom-to-top, left-to-right; null guard; equals; save before null.',
        lines: [26, 27],
        implementationLines: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**`Candy taken = box[row][col]`** before **`box[row][col] = null`**.',
      },
    ],
  },
];
