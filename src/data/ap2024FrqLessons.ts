import type { Lesson } from '../types';
import {
  ap2024FrqFeeder,
  ap2024FrqGridPath,
  ap2024FrqScoreboard,
  ap2024FrqWordChecker,
  FRQ_2024_Q1_FEEDER_PRINTED,
  FRQ_2024_Q1_REFERENCE_COMPLETE,
  FRQ_2024_Q1_REF_SIMULATE_MANY_DAYS,
  FRQ_2024_Q1_REF_SIMULATE_ONE_DAY,
  FRQ_2024_Q2_REFERENCE_CLASS,
  FRQ_2024_Q2_SCOREBOARD_PRINTED,
  FRQ_2024_Q3_REFERENCE_COMPLETE,
  FRQ_2024_Q3_REF_CREATE_LIST,
  FRQ_2024_Q3_REF_IS_WORD_CHAIN,
  FRQ_2024_Q3_WORD_CHECKER_PRINTED,
  FRQ_2024_Q4_GRID_PATH_PRINTED,
  FRQ_2024_Q4_REFERENCE_COMPLETE,
  FRQ_2024_Q4_REF_GET_NEXT_LOC,
  FRQ_2024_Q4_REF_SUM_PATH,
} from './ap2024FrqSheets';

/** Full 2024 FRQ set — orders 108–111 after 2025 (104–107) and before PDF-stub hubs (112+). */
export const ap2024FrqLessons: Lesson[] = [
  {
    id: 'ps-2024-1-feeder',
    order: 108,
    chapter: '9 · AP CS A Problems',
    title: 'Feeder — birds, bear & multi-day simulation',
    problemSolvingNumber: 1,
    problemSolvingGroup: '2024',
    algorithmSubsection: 'Random & simulation',
    apExamFrqSheet: ap2024FrqFeeder,
    algorithmDesign: {
      implementationStartStepIndex: 8,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2024_Q1_FEEDER_PRINTED,
    implementationWorkspaceCode: FRQ_2024_Q1_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps24-1-s1',
        codeLine: -1,
        description:
          '**Part (a) — what you implement**\n\n• **Method** — `simulateOneDay(int numBirds)`\n• **95%** — each bird eats the **same** random **10–50** grams (integer, uniform)\n• **Total** eaten = **`numBirds * perBird`**; if **>** **`currentFood`** → feeder **0**; else subtract\n• **5%** — **bear** → feeder **0**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-1-s2',
        codeLine: -1,
        description:
          '**Part (a) — design**\n\n• **`if (Math.random() < 0.05)`** → empty and **return**\n• Else **`perBird = (int)(Math.random() * 41) + 10`**\n• **`consumed = numBirds * perBird`** then compare to **`currentFood`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-1-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2024_Q1_REF_SIMULATE_ONE_DAY,
      },
      {
        id: 'ps24-1-s4',
        codeLine: -1,
        description:
          '**Part (b) — what you implement**\n\n• **`simulateManyDays(numBirds, numDays)`** uses **`simulateOneDay`**\n• **Return** how many **days** birds or a bear **found food** (feeder had food **before** that day’s simulation)\n• **Stop early** if **`currentFood == 0`** before starting another day',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-1-s5',
        codeLine: -1,
        description:
          '**Part (b) — exam outcomes**\n\n• **2400** / 4 days → return **4** if every day started with food\n• **250** / 5 days → after two days food can be **0** → return **2**\n• **0** at start → return **0** without calling **`simulateOneDay`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-1-s6',
        codeLine: -1,
        description:
          '**Part (b) — design**\n\n• Loop **`day`** from **0** to **`numDays - 1`**\n• If **`currentFood == 0`** → **break**\n• Else **`simulateOneDay(numBirds)`**; **`count++`**\n• Assume **`simulateOneDay`** works as specified',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-1-s7',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2024_Q1_REF_SIMULATE_MANY_DAYS,
      },
      {
        id: 'ps24-1-s8',
        codeLine: -1,
        description:
          '**Before you code**\n\nPart (a) is **probability + arithmetic + clamp to zero**. Part (b) is **composition**: only simulate when food remains, then count successful days.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-1-s9',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [
            { id: 'fd', name: 'currentFood', type: 'primitive', value: 500 },
            { id: 'nb', name: 'numBirds', type: 'primitive', value: 12 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor**: sample locals while reasoning about **`simulateOneDay`** / **`simulateManyDays`** — use **Concepts** for Part (a) vs Part (b) highlights.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps24-1-a',
        name: 'Part (a): simulateOneDay',
        description: '5% bear empties; else uniform 10–50 per bird; cap consumption at available food.',
        lines: [12, 13],
        implementationLines: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        memory: {
          stack: [
            { id: 'pb', name: 'perBird', type: 'primitive', value: 20 },
            { id: 'cs', name: 'consumed', type: 'primitive', value: 240 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Normal day: **perBird** drawn once; all birds share that rate.',
      },
      {
        id: 'c-ps24-1-b',
        name: 'Part (b): simulateManyDays',
        description: 'Break on empty feeder; otherwise simulateOneDay and count the day.',
        lines: [20, 21],
        implementationLines: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        memory: {
          stack: [
            { id: 'ct', name: 'count', type: 'primitive', value: 2 },
            { id: 'dy', name: 'day', type: 'primitive', value: 2 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Mid-run: **count** after days with food at day start.',
      },
    ],
  },
  {
    id: 'ps-2024-2-scoreboard',
    order: 109,
    chapter: '9 · AP CS A Problems',
    title: 'Scoreboard — turns, points & getScore string',
    problemSolvingNumber: 2,
    problemSolvingGroup: '2024',
    algorithmSubsection: 'Class design & state',
    apExamFrqSheet: ap2024FrqScoreboard,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Specification' },
        { at: 3, label: 'Solution' },
      ],
    },
    code: FRQ_2024_Q2_SCOREBOARD_PRINTED,
    implementationWorkspaceCode: FRQ_2024_Q2_REFERENCE_CLASS,
    steps: [
      {
        id: 'ps24-2-s1',
        codeLine: -1,
        description:
          '**Fields & constructor**\n\n• Store **both** team **names** and **two** scores (**int**)\n• Track **which** team is **active** (**boolean** or index)\n• **Team 1** active after construction',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-2-s2',
        codeLine: -1,
        description:
          '**`recordPlay(points)`**\n\n• **`points > 0`** → add to **active** team’s score; **same** team stays active\n• **`points == 0`** → **no** points; **flip** active team',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-2-s3',
        codeLine: -1,
        description:
          '**`getScore()`**\n\n• Return **`score1 + "-" + score2 + "-" + activeTeamName`**\n• Exam table: **`"0-0-Red"`**, **`"1-0-Blue"`**, **`"1-8-Red"`**, etc.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-2-s4',
        codeLine: -1,
        description: '**Solution — full class**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2024_Q2_REFERENCE_CLASS,
      },
      {
        id: 'ps24-2-s5',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [
            {
              id: 'sb',
              className: 'Scoreboard',
              fields: [
                { name: 'score1', value: '1' },
                { name: 'score2', value: '8' },
                { name: 'team1Active', value: 'true' },
              ],
            },
          ],
          staticArea: [],
        },
        memoryCaption: '**Reference editor**: sample **`Scoreboard`** after several **`recordPlay`** calls.',
        memoryPanelAccent: 'sky',
      },
    ],
    concepts: [
      {
        id: 'c-ps24-2-play',
        name: 'recordPlay',
        description: 'Positive points go to active team; zero flips active only.',
        lines: [7, 8, 9],
        implementationLines: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        memory: {
          stack: [{ id: 'pt', name: 'points', type: 'primitive', value: 0 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: '**points == 0** ends the turn — switch active team.',
      },
      {
        id: 'c-ps24-2-score',
        name: 'getScore',
        description: 'Build hyphenated string with active team name.',
        lines: [11, 12, 13],
        implementationLines: [28, 29, 30, 31, 32, 33],
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Order: **score1-score2-activeName**.',
      },
    ],
  },
  {
    id: 'ps-2024-3-word-checker',
    order: 110,
    chapter: '9 · AP CS A Problems',
    title: 'WordChecker — chain & prefix stripping',
    problemSolvingNumber: 3,
    problemSolvingGroup: '2024',
    algorithmSubsection: 'ArrayList & String',
    apExamFrqSheet: ap2024FrqWordChecker,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2024_Q3_WORD_CHECKER_PRINTED,
    implementationWorkspaceCode: FRQ_2024_Q3_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps24-3-s1',
        codeLine: -1,
        description:
          '**Part (a) — `isWordChain`**\n\n• For each index **i ≥ 1**, **`wordList.get(i)`** must **`contains`** **`get(i-1)`**\n• Return **false** on first failure; **true** if all pass\n• **Do not** modify **`wordList`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-3-s2',
        codeLine: -1,
        description:
          '**Part (a) — examples**\n\n• **`["an","band","band","abandon"]`** → **true**\n• **`["to","too","stool","tools"]`** → **false** (**`"tools"`** lacks **`"stool"`**)',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-3-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2024_Q3_REF_IS_WORD_CHAIN,
      },
      {
        id: 'ps24-3-s4',
        codeLine: -1,
        description:
          '**Part (b) — `createList(target)`**\n\n• New **`ArrayList`**\n• For each **`w`** in **`wordList`**: if **`w.startsWith(target)`**, add **`w.substring(target.length())`**\n• Preserve **order**; **`wordList`** unchanged\n• Example: **`createList("cat")`** on **`["catch","bobcat",...]`** → **`["ch","chacat",""]`**',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-3-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2024_Q3_REF_CREATE_LIST,
      },
      {
        id: 'ps24-3-s6',
        codeLine: -1,
        description: '**Implementation**',
        memory: {
          stack: [],
          heap: [],
          staticArea: [],
        },
        memoryCaption:
          '**Reference editor** uses **`ArrayList<String>`** for clarity; the exam may show **raw** `ArrayList` — stay consistent in your answer.',
        memoryPanelAccent: 'amber',
      },
    ],
    concepts: [
      {
        id: 'c-ps24-3-chain',
        name: 'isWordChain',
        description: 'Loop neighbors; require contains(previous).',
        lines: [14, 15, 16],
        implementationLines: [10, 11, 12, 13, 14, 15, 16, 17],
        memory: {
          stack: [{ id: 'i', name: 'i', type: 'primitive', value: 2 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Check **`get(i)`** against **`get(i-1)`**.',
      },
      {
        id: 'c-ps24-3-list',
        name: 'createList',
        description: 'startsWith then substring(target.length()).',
        lines: [24, 25, 26],
        implementationLines: [19, 20, 21, 22, 23, 24, 25, 26, 27],
        memory: {
          stack: [{ id: 'tg', name: 'target', type: 'reference', refId: 'strCat' }],
          heap: [{ id: 'strCat', className: 'String', fields: [{ name: 'value', value: '"cat"' }] }],
          staticArea: [],
        },
        memoryCaption: 'Strip **one** leading **`target`** per matching word.',
      },
    ],
  },
  {
    id: 'ps-2024-4-grid-path',
    order: 111,
    chapter: '9 · AP CS A Problems',
    title: 'GridPath — next neighbor & path sum',
    problemSolvingNumber: 4,
    problemSolvingGroup: '2024',
    algorithmSubsection: '2D array & objects',
    apExamFrqSheet: ap2024FrqGridPath,
    algorithmDesign: {
      implementationStartStepIndex: 5,
      phaseStarts: [
        { at: 0, label: 'Part (a)' },
        { at: 3, label: 'Part (b)' },
      ],
    },
    code: FRQ_2024_Q4_GRID_PATH_PRINTED,
    implementationWorkspaceCode: FRQ_2024_Q4_REFERENCE_COMPLETE,
    steps: [
      {
        id: 'ps24-4-s1',
        codeLine: -1,
        description:
          '**Part (a) — `getNextLoc(row, col)`**\n\n• Neighbors: **cell below** and **cell to the right** (if in bounds)\n• **Both** exist → return **`Location`** of **smaller** value (values always differ)\n• **One** exists → return that neighbor',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-4-s2',
        codeLine: -1,
        description:
          '**Part (a) — bounds**\n\n• **Down** valid when **`row + 1 < grid.length`**\n• **Right** valid when **`col + 1 < grid[0].length`**\n• Never called on **bottom-right** corner',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-4-s3',
        codeLine: -1,
        description: '**Solution — Part (a)**\n\nReference below.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2024_Q4_REF_GET_NEXT_LOC,
      },
      {
        id: 'ps24-4-s4',
        codeLine: -1,
        description:
          '**Part (b) — `sumPath`**\n\n• Start at **`(row, col)`**; add **`grid[row][col]`**\n• While not at **last row & last column**, **`getNextLoc`**, move, keep summing\n• **Include** the bottom-right value once',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 'ps24-4-s5',
        codeLine: -1,
        description: '**Solution — Part (b)**\n\nReference below — must call **`getNextLoc`** as specified.',
        memory: { stack: [], heap: [], staticArea: [] },
        codeExample: FRQ_2024_Q4_REF_SUM_PATH,
      },
      {
        id: 'ps24-4-s6',
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
        memoryCaption: 'Sample start cell for **`sumPath`**; **Concepts** split neighbor choice vs path accumulation.',
        memoryPanelAccent: 'violet',
      },
    ],
    concepts: [
      {
        id: 'c-ps24-4-next',
        name: 'getNextLoc',
        description: 'Compare down vs right when both exist; otherwise the sole neighbor.',
        lines: [30, 31, 32],
        implementationLines: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
        memory: {
          stack: [
            { id: 'rr', name: 'row', type: 'primitive', value: 0 },
            { id: 'cc', name: 'col', type: 'primitive', value: 0 },
          ],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Smaller neighbor wins when **down** and **right** both exist.',
      },
      {
        id: 'c-ps24-4-sum',
        name: 'sumPath',
        description: 'Walk with getNextLoc until corner; add final cell.',
        lines: [40, 41, 42],
        implementationLines: [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
        memory: {
          stack: [{ id: 'sm', name: 'sum', type: 'primitive', value: 19 }],
          heap: [],
          staticArea: [],
        },
        memoryCaption: 'Loop until **(lastR, lastC)**; don’t double-count incorrectly.',
      },
    ],
  },
];
