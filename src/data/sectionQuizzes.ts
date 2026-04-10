import type { LessonSectionQuiz } from '../types';
import { bulkSectionQuizzes } from './sectionQuizzes.bulk';

/**
 * Section quizzes keyed by lesson id (lesson data stays legacy-compatible).
 */
export const sectionQuizzesByLessonId: Record<string, LessonSectionQuiz[]> = {
  'ap-1-1': [
    {
      id: 'sq-ap-1-1-primitives',
      title: 'Primitives in this snippet',
      checkpointStepIndex: 2,
      questions: [
        {
          id: 'sq-ap-1-1-q1',
          kind: 'mcq',
          prompt: 'Which type best fits a whole count like the number of items (7)?',
          options: ['int', 'double', 'boolean', 'String'],
          correctOptionIndex: 0,
          explanation:
            'Counts with no fractional part are typically stored as int.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption:
              'JavaViz shows items as a primitive slot on the stack holding the int value 7.',
            lines: [0],
          },
        },
        {
          id: 'sq-ap-1-1-q2',
          kind: 'mcq',
          prompt: 'Which type best fits a decimal price like 2.5?',
          options: ['int', 'double', 'boolean', 'String'],
          correctOptionIndex: 1,
          explanation:
            'Decimal values use floating-point types; double is the usual choice in introductory Java.',
          points: 20,
          visual: {
            stepIndex: 2,
            caption:
              'price is stored as a double — notice the fractional part in memory.',
            lines: [1],
          },
        },
      ],
    },
    {
      id: 'sq-ap-1-1-mixed',
      title: 'int × double',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ap-1-1-q3',
          kind: 'mcq',
          prompt:
            'When Java evaluates `items * price`, what happens to `items` (int) for the multiply?',
          options: [
            'It is truncated to 0 decimal places before multiply',
            'It is promoted to double for the operation',
            'The expression does not compile',
            'The result stays int',
          ],
          correctOptionIndex: 1,
          explanation:
            'Binary numeric promotion lifts int to double so the multiply is done in floating point; total is double.',
          points: 25,
          visual: {
            stepIndex: 3,
            caption:
              'Step through: total is a double (17.5), matching the promoted multiply.',
            lines: [2],
          },
        },
      ],
    },
    {
      id: 'sq-ap-1-1-cast',
      title: 'Cast to int',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-ap-1-1-q4',
          kind: 'fillBlank',
          prompt:
            'After `int rounded = (int) total;` with total = 17.5, rounded equals [blank] (truncation toward zero).',
          placeholder: 'integer value',
          acceptedAnswers: ['17'],
          explanation:
            'Casting double to int drops the fractional part; it does not round to the nearest int.',
          points: 25,
          visual: {
            stepIndex: 4,
            caption:
              'JavaViz shows rounded as an int on the stack — compare to total on the previous line.',
            lines: [3],
          },
        },
      ],
    },
  ],
  '1-1': [
    {
      id: 'sq-1-1-types',
      title: 'Primitive on the stack',
      checkpointStepIndex: 1,
      questions: [
        {
          id: 'sq-1-1-types-q1',
          kind: 'mcq',
          prompt:
            'JavaViz shows `int x` on the stack with value 5. What does that tell you about how this variable stores data?',
          options: [
            'The stack slot directly holds the integer value 5',
            'The stack slot holds a reference; the 5 lives on the heap',
            'x is a label only — Java has not reserved memory yet',
            'x points at the same heap object as Fraction variables',
          ],
          correctOptionIndex: 0,
          explanation:
            'For a primitive like int, the variable’s stack slot stores the value itself, not an address to some other location.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption:
              'Compare this to Fraction in the next steps: primitives show the value right in the stack entry.',
            lines: [3],
          },
        },
        {
          id: 'sq-1-1-types-q2',
          kind: 'mcq',
          prompt:
            'If the program later had `int y = x;`, what would happen when that line runs (before anything else changes x)?',
          options: [
            'y gets its own copy of the value 5 in another stack slot',
            'y and x share one stack slot holding 5',
            'y becomes an alias to the same heap object as x',
            'The compiler rejects the assignment because x is primitive',
          ],
          correctOptionIndex: 0,
          explanation:
            'Assignment copies the value for primitives — y receives 5 in its own memory, independent of x.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption:
              'That “copy the bits of the value” behavior is what you’ll contrast with `Fraction f2 = f1` later.',
            lines: [3],
          },
        },
      ],
    },
    {
      id: 'sq-1-1-declare-init',
      title: 'Declaration vs Initialization',
      checkpointStepIndex: 2,
      questions: [
        {
          id: 'sq-1-1-declare-init-q1',
          kind: 'clickableCode',
          prompt: 'Click all lines that are variable declarations.',
          snippet: `int x = 5;
Fraction f1;
f1 = new Fraction(2, 3);
Fraction f2 = f1;`,
          choices: [
            { id: 'a', text: 'int x = 5;', correct: true },
            { id: 'b', text: 'Fraction f1;', correct: true },
            { id: 'c', text: 'f1 = new Fraction(2, 3);', correct: false },
            { id: 'd', text: 'Fraction f2 = f1;', correct: true },
          ],
          explanation:
            'A declaration introduces a variable with a type. Assignment alone (f1 = new Fraction...) does not declare a new variable.',
          points: 30,
          visual: {
            stepIndex: 2,
            caption:
              'JavaViz separates declaration of f1 (reference slot exists, null) from later object creation and assignment.',
            lines: [4, 5],
          },
        },
      ],
    },
    {
      id: 'sq-1-1-reference-share',
      title: 'Reference Assignment',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-1-1-reference-share-q1',
          kind: 'mcq',
          prompt: "After `Fraction f2 = f1;`, what is true in memory?",
          options: [
            'A new Fraction object is created for f2',
            'f1 and f2 point to the same Fraction object',
            'f1 becomes null and f2 takes over',
            'The heap object is copied to stack',
          ],
          correctOptionIndex: 1,
          explanation:
            'Reference assignment copies the address, not the object. Both variables refer to the same heap object.',
          points: 30,
          visual: {
            stepIndex: 4,
            caption:
              'In JavaViz, both f1 and f2 arrows target the same heap object id, showing shared reference identity.',
            lines: [6],
          },
        },
      ],
    },
  ],
  'ps-1-ap-calendar': [
    {
      id: 'sq-ps-1-calendar',
      title: 'AP Calendar — parts (a) and (b)',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps-1-a',
          kind: 'mcq',
          prompt:
            'For `numberOfLeapYears(year1, year2)`, which approach matches the specification and use of `isLeapYear`?',
          options: [
            'Loop y from year1 to year2 inclusive; increment a counter when `isLeapYear(y)` is true',
            'Return `year2 - year1`',
            'Return `isLeapYear(year2) ? 1 : 0`',
            'Call `isLeapYear` only once on `(year1 + year2) / 2`',
          ],
          correctOptionIndex: 0,
          explanation:
            'Each year in the closed interval must be tested; the helper tells whether that single year is a leap year.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a) design: enumerate the inclusive year range and count with isLeapYear.',
            lines: [12],
          },
        },
        {
          id: 'sq-ps-1-b',
          kind: 'mcq',
          prompt: 'For `dayOfWeek(month, day, year)`, what must you combine (as in the spec)?',
          options: [
            '`firstDayOfYear(year)` and `dayOfYear(month, day, year)` with wrap modulo 7',
            'Only `dayOfYear` — `firstDayOfYear` is optional',
            'Only `isLeapYear(year)`',
            '`year % 7`',
          ],
          correctOptionIndex: 0,
          explanation:
            'Use the weekday of January 1 as an anchor, then advance by (dayOfYear − 1) days, reducing modulo 7.',
          points: 22,
          visual: {
            stepIndex: 6,
            caption: 'Part (b) design: anchor on Jan 1, offset by day-of-year, mod 7.',
            lines: [39],
          },
        },
      ],
    },
  ],
  'ps-2-step-tracker': [
    {
      id: 'sq-ps-2-tracker',
      title: 'StepTracker — state & averages',
      checkpointStepIndex: 0,
      questions: [
        {
          id: 'sq-ps-2-q1',
          kind: 'mcq',
          prompt:
            'After `new StepTracker(10000)` and no `addDailySteps` calls yet, what should `averageSteps()` return?',
          options: ['0', '0.0', '10000.0', 'It should throw an exception'],
          correctOptionIndex: 1,
          explanation: 'The exam table specifies 0.0 when no step data have been recorded.',
          points: 20,
          visual: {
            stepIndex: 0,
            caption: 'Design: distinguish “no days yet” (0.0) from the per-day average once data exist.',
            lines: [3, 4],
          },
        },
      ],
    },
  ],
  'ps-3-delimiters': [
    {
      id: 'sq-ps-3-delims',
      title: 'Delimiters — list & balance',
      checkpointStepIndex: 0,
      questions: [
        {
          id: 'sq-ps-3-q1',
          kind: 'mcq',
          prompt:
            'For `isBalanced`, which condition must hold while scanning the ArrayList from first to last?',
          options: [
            'At every prefix, #close ≤ #open',
            'At every prefix, #open ≤ #close',
            'The first token must be the open delimiter',
            'The list length must be even',
          ],
          correctOptionIndex: 0,
          explanation:
            'Condition 1 in the exam: you must never have more close delimiters than open delimiters at any point.',
          points: 20,
          visual: {
            stepIndex: 0,
            caption: 'Design: prefix balance — running opens minus closes never negative.',
            lines: [16, 17],
          },
        },
      ],
    },
  ],
  'ps-4-light-board': [
    {
      id: 'sq-ps-4-board',
      title: 'LightBoard — probability & column rules',
      checkpointStepIndex: 0,
      questions: [
        {
          id: 'sq-ps-4-q1',
          kind: 'mcq',
          prompt:
            'A light is **on**. You count lights **on** in its column (including itself). When does `evaluateLight` return **false** per the exam?',
          options: [
            'When that count is even',
            'When that count is odd',
            'When that count is divisible by 3',
            'Always',
          ],
          correctOptionIndex: 0,
          explanation: 'Part (b) rule 1: if the light is on, return false when the number of on lights in the column is even.',
          points: 20,
          visual: {
            stepIndex: 0,
            caption: 'Design: rule 1 uses column count parity for an on light.',
            lines: [6, 7],
          },
        },
      ],
    },
  ],
  'ps-2025-1-dog-walker': [
    {
      id: 'sq-ps25-1',
      title: 'DogWalker — cap, update, shift pay',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps25-1-a',
          kind: 'mcq',
          prompt: 'In `walkDogs(hour)`, what must you pass to `updateDogs`?',
          options: [
            '`Math.min(maxDogs, numAvailableDogs(hour))`',
            '`maxDogs` always',
            '`numAvailableDogs(hour)` always',
            '`hour` only',
          ],
          correctOptionIndex: 0,
          explanation: 'Walk the smaller of availability and the walker’s cap; book exactly that many with updateDogs.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): min of company supply and maxDogs, then update.',
            lines: [46, 47],
          },
        },
        {
          id: 'sq-ps25-1-b',
          kind: 'mcq',
          prompt: 'When does an hour earn the +$3 bonus in `dogWalkShift`?',
          options: [
            'If `walkDogs` returned `maxDogs` OR the hour is 9–17 inclusive',
            'Only if the hour is 9–17',
            'Only if `walkDogs` returned `maxDogs`',
            'Every hour',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: bonus when the walker is at full capacity for that hour or during peak hours 9–17.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): table shows peak and full-capacity bonuses.',
            lines: [55, 56],
          },
        },
      ],
    },
  ],
  'ps-2025-2-signed-text': [
    {
      id: 'sq-ps25-2',
      title: 'SignedText — signature rules',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps25-2-q1',
          kind: 'mcq',
          prompt: 'First name empty, last name `"Wong"`. What does `getSignature()` return?',
          options: ['`"Wong"`', '`"-Wong"`', '`"W"`', 'Empty string'],
          correctOptionIndex: 0,
          explanation: 'Spec: empty first name → signature is just the last name.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption: 'getSignature: empty first vs first letter + dash + last.',
            lines: [0, 1],
          },
        },
      ],
    },
  ],
  'ps-2025-3-round': [
    {
      id: 'sq-ps25-3',
      title: 'Round — ranks & pairing',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps25-3-q1',
          kind: 'mcq',
          prompt: '`names` has 3 players (odd). Who is skipped when building matches?',
          options: [
            'The best-ranked competitor (rank 1)',
            'The worst-ranked competitor',
            'No one — pair all three',
            'The middle-ranked competitor',
          ],
          correctOptionIndex: 0,
          explanation: 'Odd count: ignore rank 1; pair the rest best-vs-worst inward.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): odd size → skip rank 1, then pair from the ends.',
            lines: [43, 44],
          },
        },
      ],
    },
  ],
  'ps-2025-4-sum-or-same': [
    {
      id: 'sq-ps25-4',
      title: 'SumOrSameGame — clearPair search',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps25-4-q1',
          kind: 'mcq',
          prompt:
            'Which cells can pair with `(row, col)` per the exam? (Besides skipping the cell itself.)',
          options: [
            'Any cell whose row index ≥ `row`, same value or values sum to 10',
            'Only cells in the same row',
            'Only cells strictly below `row`',
            'Any cell in the grid regardless of row',
          ],
          correctOptionIndex: 0,
          explanation: 'Second index must be at same or later row; then check equality or sum-to-10.',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Part (b): scan order and pair conditions.',
            lines: [16, 17],
          },
        },
      ],
    },
  ],
  'ps-2024-1-feeder': [
    {
      id: 'sq-ps24-1',
      title: 'Feeder — bear chance & multi-day count',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps24-1-a',
          kind: 'mcq',
          prompt: 'Under **normal** conditions in `simulateOneDay`, how is food eaten per bird modeled?',
          options: [
            'One random integer 10–50 grams per bird, same value for every bird that day',
            'Each bird gets its own independent random 10–50 grams',
            'Always exactly 30 grams per bird',
            'Normal days never reduce `currentFood`',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: under normal conditions each bird consumes the same randomly chosen amount from 10…50 inclusive.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): normal vs abnormal (bear) branches.',
            lines: [12, 13],
          },
        },
        {
          id: 'sq-ps24-1-b',
          kind: 'mcq',
          prompt: 'In `simulateManyDays`, when should you **stop** counting further days?',
          options: [
            'Before starting a new day if `currentFood` is already 0',
            'Only after `numDays` iterations no matter what',
            'When `simulateOneDay` throws an exception',
            'When the bear appears on two consecutive days',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: if the feeder is empty before a day begins, return the count so far — do not simulate more days.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): break on empty feeder before calling `simulateOneDay`.',
            lines: [20, 21],
          },
        },
      ],
    },
  ],
  'ps-2024-2-scoreboard': [
    {
      id: 'sq-ps24-2',
      title: 'Scoreboard — active team & recordPlay',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps24-2-q1',
          kind: 'mcq',
          prompt: 'What does `recordPlay(0)` do?',
          options: [
            'Ends the active team’s turn and switches which team is active (no points)',
            'Adds zero points but leaves the active team unchanged',
            'Resets both scores to 0',
            'Throws an exception',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: a failed play (0 points) ends the turn and the other team becomes active.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption: 'recordPlay: positive points vs turn-ending 0.',
            lines: [7, 8],
          },
        },
      ],
    },
  ],
  'ps-2024-3-word-checker': [
    {
      id: 'sq-ps24-3',
      title: 'WordChecker — chain & createList',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps24-3-q1',
          kind: 'mcq',
          prompt: 'For `createList("cat")` on `["catch","bobcat","catchacat","cat","at"]`, which result matches the exam?',
          options: [
            '`["ch","chacat",""]`',
            '`["atch","bobcat","atchacat","",""]`',
            '`["catch","catchacat","cat"]`',
            'Empty list — no word starts with `"cat"`',
          ],
          correctOptionIndex: 0,
          explanation: 'Strip the first occurrence of `target` from each word that starts with `target`; `"cat"` alone becomes `""`.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): startsWith + substring(target.length()).',
            lines: [24, 25],
          },
        },
      ],
    },
  ],
  'ps-2024-4-grid-path': [
    {
      id: 'sq-ps24-4',
      title: 'GridPath — neighbors & sumPath',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps24-4-q1',
          kind: 'mcq',
          prompt: 'In `getNextLoc`, if **both** down and right neighbors exist, which do you choose?',
          options: [
            'The neighbor with the **smaller** grid value (values always differ)',
            'Always the neighbor to the right',
            'Always the neighbor below',
            'The neighbor with the larger value',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: compare `grid[row+1][col]` and `grid[row][col+1]`; return the `Location` of the smaller.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): down vs right when both in bounds.',
            lines: [30, 31],
          },
        },
      ],
    },
  ],
  'ps-2023-1-appointment-book': [
    {
      id: 'sq-ps23-1',
      title: 'AppointmentBook — free block & makeAppointment',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps23-1-a',
          kind: 'mcq',
          prompt:
            'In `findFreeBlock`, when your consecutive-free counter first reaches `duration`, which value should you **return** as the start of the block?',
          options: [
            '`minute` (the index of the last minute in the block)',
            '`minute - blockLength + 1` (the first minute of the block)',
            '`0` always',
            '`duration`',
          ],
          correctOptionIndex: 1,
          explanation:
            'When the run length hits `duration`, `minute` is the **last** free minute in that block; subtract `blockLength - 1` to get the **starting** minute.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): consecutive free minutes and reset on busy.',
            lines: [18, 19],
          },
        },
        {
          id: 'sq-ps23-1-b',
          kind: 'mcq',
          prompt: 'In `makeAppointment`, when must you call `reserveBlock`?',
          options: [
            'Only when `findFreeBlock` returns a starting minute **not** equal to `-1`',
            'For every period in the range, before calling `findFreeBlock`',
            'Only when `duration` is greater than 60',
            'Never — `reserveBlock` is optional',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: guard on `findFreeBlock` ≠ -1 so you never reserve with an invalid start minute.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): loop periods and reserve the first free block found.',
            lines: [25, 26],
          },
        },
      ],
    },
  ],
  'ps-2023-2-sign': [
    {
      id: 'sq-ps23-2',
      title: 'Sign — lines & getLines',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps23-2-q1',
          kind: 'mcq',
          prompt: 'For `new Sign("", 4)`, what must `getLines()` return?',
          options: ['`null`', '`""` (empty string)', '`";"`', 'Throws an exception'],
          correctOptionIndex: 0,
          explanation: 'Exam: empty message → zero lines → `getLines` returns `null`.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption: '`numberOfLines` and empty-message behavior.',
            lines: [7, 8, 9],
          },
        },
      ],
    },
  ],
  'ps-2023-3-weather-data': [
    {
      id: 'sq-ps23-3',
      title: 'WeatherData — cleanData & heat wave',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps23-3-q1',
          kind: 'mcq',
          prompt: 'Why traverse **backwards** when removing out-of-range values from `temperatures`?',
          options: [
            '`remove(i)` shifts later elements left, so forward traversal can skip unchecked elements',
            'Backwards traversal is required by the Java language',
            'Temperatures must be sorted descending before removal',
            'It makes no difference; either direction is always safe',
          ],
          correctOptionIndex: 0,
          explanation:
            'After `remove(i)`, the next element slides into index `i`; going forward can skip it. Backwards removal avoids that bug.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): bounds and removal order.',
            lines: [9, 10],
          },
        },
      ],
    },
  ],
  'ps-2023-4-box-of-candy': [
    {
      id: 'sq-ps23-4',
      title: 'BoxOfCandy — column move & remove by flavor',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps23-4-q1',
          kind: 'mcq',
          prompt: 'In `removeNextByFlavor`, which traversal order matches the exam?',
          options: [
            'Rows from **last** to **first**; within each row, columns **left to right**',
            'Rows from **first** to **last**; columns **right to left**',
            'Columns first, then rows, always top to bottom',
            'Random order until a match is found',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: bottom-to-top rows, left-to-right within each row — first match in that order wins.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): row 0 vs lower rows in a column.',
            lines: [20, 21],
          },
        },
      ],
    },
  ],
  'ps-2013-1-music-downloads': [
    {
      id: 'sq-ps13-1',
      title: 'MusicDownloads — search & ordered updates',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps13-1-a',
          kind: 'mcq',
          prompt: 'In **`updateDownloads`**, what should you do **first** for each title `t` from the list?',
          options: [
            'Call **`getDownloadInfo(t)`** and branch on **`null`** vs found',
            'Always **`add(new DownloadInfo(t))`** without searching',
            'Remove any existing entry with the same title, then add a fresh one',
            'Sort **`downloadList`** alphabetically before processing **`titles`**',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: you must use **`getDownloadInfo`**; **`null`** means append a new **`DownloadInfo`** (count 1), otherwise **`incrementTimesDownloaded()`**.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): helper lookup drives add vs increment.',
            lines: [69, 70],
          },
        },
        {
          id: 'sq-ps13-1-b',
          kind: 'mcq',
          prompt: 'What does **`getDownloadInfo`** return when **no** song matches?',
          options: ['`null`', '`new DownloadInfo("")`', 'The first object in **`downloadList`**', '`0`'],
          correctOptionIndex: 0,
          explanation: 'Exam: return **`null`** if no **`DownloadInfo`** has a matching **`getTitle()`**.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): scan by title equality.',
            lines: [49, 50],
          },
        },
      ],
    },
  ],
  'ps-2013-2-token-pass': [
    {
      id: 'sq-ps13-2',
      title: 'TokenPass — wrap-around distribution',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps13-2-q1',
          kind: 'mcq',
          prompt: 'After collecting tokens from **`currentPlayer`**, where does the **first** distributed token go?',
          options: [
            '`currentPlayer + 1`, wrapping past the last index to **0**',
            'Always **`currentPlayer`** again',
            'Always **`0`** regardless of **`currentPlayer`**',
            'The index with the **fewest** tokens',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: distribution starts at the **next** position in increasing order, wrapping from the highest index back to **0**.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): next index after collecting from current player.',
            lines: [19, 20],
          },
        },
      ],
    },
  ],
  'ps-2013-3-gridworld-jump': [
    {
      id: 'sq-ps13-3',
      title: 'GridWorld — empty cells & jumping',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps13-3-q1',
          kind: 'mcq',
          prompt: 'Which **`JumpingCritter`** approach matches the exam (**without** overriding **`act`**)?',
          options: [
            'Override **`getMoveLocations`** to return **`GridWorldUtilities.getEmptyLocations(getGrid())`**',
            'Override **`act`** to call **`getEmptyLocations`** directly',
            'Override **`selectMoveLocation`** to scan the grid for null cells',
            'Copy the nested loops from part (a) inside **`getMoveLocations`** instead of calling the utility',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: do **not** override **`act`**; delegate to **`GridWorldUtilities.getEmptyLocations`** (reimplementing part (a) loses credit).',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): single override delegating to the utility.',
            lines: [18, 19],
          },
        },
      ],
    },
  ],
  'ps-2013-4-sky-view': [
    {
      id: 'sq-ps13-4',
      title: 'SkyView — telescope order & average',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps13-4-q1',
          kind: 'mcq',
          prompt: 'How should row **1** (0-based) of **`view`** be filled from **`scanned`** in telescope order?',
          options: [
            '**Right-to-left** — reverse column order for that row while **`idx`** still moves forward through **`scanned`**',
            '**Left-to-right**, same as row **0**',
            'Skip row **1** entirely',
            'Copy the entire **`scanned`** array into row **1**',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: even rows left→right, odd rows right→left; consume **`scanned[idx++]`** in order.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): alternate row direction when filling `view`.',
            lines: [17, 18],
          },
        },
        {
          id: 'sq-ps13-4-q2',
          kind: 'mcq',
          prompt: 'In **`getAverage`**, which bounds are **inclusive**?',
          options: [
            '**Both** row and column ranges are inclusive (**`startRow`…`endRow`**, **`startCol`…`endCol`**) ',
            '**Exclusive** end rows and columns (stop before **`endRow`** / **`endCol`**) ',
            'Only corners of the rectangle',
            'Only elements on the border of the rectangle',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: average every **`view[r][c]`** with **`startRow ≤ r ≤ endRow`** and **`startCol ≤ c ≤ endCol`**.',
          points: 20,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): nested inclusive loops over the section.',
            lines: [30, 31],
          },
        },
      ],
    },
  ],
  'ps-2012-1-climbing-club': [
    {
      id: 'sq-ps12-1',
      title: 'ClimbingClub — distinctPeakNames & list ordering',
      checkpointStepIndex: 7,
      questions: [
        {
          id: 'sq-ps12-1-q1',
          kind: 'mcq',
          prompt:
            'Why does the given `distinctPeakNames` implementation **fail** when `addClimb` uses **insertion order** (part (a)) on the sample with two "Monadnock" climbs?',
          options: [
            'Duplicate peak names are not always adjacent, so every reappearance increments the counter again',
            '`compareTo` cannot compare mountain names',
            '`climbList` is null after part (a)',
            'The method always returns 0 for empty lists',
          ],
          correctOptionIndex: 0,
          explanation:
            'The algorithm only skips duplicates when they appear on consecutive list entries; insertion order can separate equal names.',
          points: 22,
          visual: {
            stepIndex: 6,
            caption: 'Part (c): adjacent-name transitions vs grouped duplicates.',
            lines: [60, 61, 62],
          },
        },
      ],
    },
  ],
  'ps-2012-2-retro-bug': [
    {
      id: 'sq-ps12-2',
      title: 'RetroBug — restore & GridWorld rules',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps12-2-q1',
          kind: 'mcq',
          prompt: 'What must `restore` do **every** time (after the first `act`)?',
          options: [
            'Always set direction back to the direction saved at the start of the previous `act`',
            'Only move the bug; direction may stay unchanged',
            'Remove every `Flower` on the grid',
            'Call `super.restore()`',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam rubric: direction is always restored; location move depends on empty or Flower.',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Specification: direction vs conditional move.',
            lines: [5, 6, 7],
          },
        },
      ],
    },
  ],
  'ps-2012-3-horse-barn': [
    {
      id: 'sq-ps12-3',
      title: 'HorseBarn — search & pack',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps12-3-q1',
          kind: 'mcq',
          prompt: 'In `consolidate`, how should relative horse order be preserved?',
          options: [
            'Collect non-null entries left-to-right, then refill `spaces` from index 0 in that order',
            'Sort horses by `getWeight()` ascending',
            'Reverse the array',
            'Swap only adjacent nulls',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: pack without changing the sequence of horses from the original array.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): two-pass pack to the front.',
            lines: [35, 36, 37],
          },
        },
      ],
    },
  ],
  'ps-2012-4-gray-image': [
    {
      id: 'sq-ps12-4',
      title: 'GrayImage — WHITE count & offset subtract',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps12-4-q1',
          kind: 'mcq',
          prompt: 'When does `processImage` change the pixel at `(row, col)`?',
          options: [
            'Only when `(row + 2, col + 2)` is a valid index; subtract that neighbor and clamp to BLACK',
            'Always subtract `(row + 1, col + 1)`',
            'Only on the last row',
            'Never — the method only counts pixels',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: row-major processing with a +2/+2 neighbor when in bounds; clamp below BLACK.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): bounds on r+2 and c+2.',
            lines: [25, 26, 27],
          },
        },
      ],
    },
  ],
  'ps-2017-1-digits': [
    {
      id: 'sq-ps17-1',
      title: 'Digits — constructor & strictly increasing',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps17-1-a',
          kind: 'mcq',
          prompt: 'What should `new Digits(0)` put in `digitList`?',
          options: [
            'A single element `0`',
            'An empty list',
            '`[0, 0]`',
            'Only digits from `num` when `num > 0`, so skip construction',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: zero is a valid non-negative integer; the list contains one Integer 0.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): special case for `num == 0` vs extracting digits.',
            lines: [15, 16],
          },
        },
        {
          id: 'sq-ps17-1-b',
          kind: 'mcq',
          prompt: 'When is `isStrictlyIncreasing` **false**?',
          options: [
            'When some digit equals the previous digit, or a later digit is smaller',
            'Whenever the list has more than one element',
            'Only when the first digit is 0',
            'Never — digit lists are always strictly increasing',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: strictly increasing means each digit must be greater than (not equal to) the previous.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): compare adjacent Integer digits.',
            lines: [23, 24],
          },
        },
      ],
    },
  ],
  'ps-2017-2-mult-practice': [
    {
      id: 'sq-ps17-2',
      title: 'MultPractice — TIMES string & nextProblem',
      checkpointStepIndex: 2,
      questions: [
        {
          id: 'sq-ps17-2-q1',
          kind: 'mcq',
          prompt: 'After `new MultPractice(7, 3)` and **no** `nextProblem`, what does `getProblem()` return?',
          options: ['`7 TIMES 3`', '`7TIMES3`', '`7 times 3`', '`3 TIMES 7`'],
          correctOptionIndex: 0,
          explanation: 'Exam: literal spaces around TIMES and first operand first, as in the table.',
          points: 20,
          visual: {
            stepIndex: 0,
            caption: 'Format: first + " TIMES " + second.',
            lines: [16, 17],
          },
        },
      ],
    },
  ],
  'ps-2017-3-phrase': [
    {
      id: 'sq-ps17-3',
      title: 'Phrase — replace nth & last occurrence',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps17-3-q1',
          kind: 'mcq',
          prompt: 'In `replaceNthOccurrence`, what must you do **first** to earn full credit?',
          options: [
            'Call `findNthOccurrence(str, n)` and only splice if the index is valid',
            'Replace every occurrence of `str`',
            'Sort `currentPhrase`',
            'Use `lastIndexOf` instead of the required helper',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: you must use `findNthOccurrence` appropriately; -1 means no change.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): index from findNthOccurrence, then substring concat.',
            lines: [25, 26],
          },
        },
      ],
    },
  ],
  'ps-2017-4-successors': [
    {
      id: 'sq-ps17-4',
      title: 'Successors — findPosition & successor grid',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps17-4-q1',
          kind: 'mcq',
          prompt: 'In `getSuccessorArray`, what belongs in the cell for the **largest** value in `intArr`?',
          options: [
            '`null` — that value has no successor in the grid',
            '`new Position(0, 0)`',
            'The position of value `0`',
            'A copy of the same row and column',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: the maximum consecutive value has no v+1 in the array, so the successor position is null.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): search before building the successor grid.',
            lines: [18, 19],
          },
        },
      ],
    },
  ],
  'ps-2016-1-random-chooser': [
    {
      id: 'sq-ps16-1',
      title: 'RandomStringChooser — pool & NONE',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-ps16-1-q1',
          kind: 'mcq',
          prompt: 'What should `getNext` return when **no** strings remain in the chooser?',
          options: [
            'The string `"NONE"`',
            '`null`',
            'An empty string `""`',
            'Throw an exception',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: after every original string has been returned once, further calls print `"NONE"`.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): empty pool vs random remove.',
            lines: [9, 10, 11],
          },
        },
      ],
    },
  ],
  'ps-2016-2-log-messages': [
    {
      id: 'sq-ps16-2',
      title: 'LogMessage — proper keyword boundaries',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps16-2-q1',
          kind: 'mcq',
          prompt: 'Why does **`"disk"`** **not** properly appear in **`"diskette"`**?',
          options: [
            'The match is not bounded by spaces or string ends — `"k"` follows `"disk"`',
            '`indexOf` cannot find substrings',
            'The description must be all lowercase',
            'Colons break `containsWord`',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: a proper occurrence needs a space or start before the keyword and a space or end after; `"diskette"` fails the after check.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): scan `indexOf` with neighbor checks.',
            lines: [16, 17, 18],
          },
        },
      ],
    },
  ],
  'ps-2016-3-crossword': [
    {
      id: 'sq-ps16-3',
      title: 'Crossword — toBeLabeled rule',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-ps16-3-q1',
          kind: 'mcq',
          prompt: 'A **white** square gets a **positive** label when which condition holds?',
          options: [
            'It has **no** white square **above** or **no** white square **left** (or both)',
            'It has white squares both above and to the left',
            'It is in row 0 or column 0 only',
            'It is adjacent to any black square',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: label starts of new across/down entries — blocked above or left (or edge).',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Part (a): neighbor colors for labeling.',
            lines: [38, 39, 40],
          },
        },
      ],
    },
  ],
  'ps-2016-4-string-formatter': [
    {
      id: 'sq-ps16-4',
      title: 'StringFormatter — gaps & leftovers',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps16-4-q1',
          kind: 'mcq',
          prompt: 'Where do **leftover** spaces go after computing **basic gap width**?',
          options: [
            'One extra space each into the **leftmost** gaps until leftovers are used',
            'All leftovers go in the last gap only',
            'Leftovers are discarded',
            'Random gaps',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: distribute remainder from left to right, one space at a time, across the gaps between words.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): integer division for basic width.',
            lines: [16, 17, 18],
          },
        },
      ],
    },
  ],
  'ps-2022-1-game': [
    {
      id: 'sq-ps22-1',
      title: 'Game / Level — getScore & playManyTimes',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps22-1-a',
          kind: 'mcq',
          prompt: 'When are **level 3** points included in `getScore`?',
          options: [
            'Only if goals were reached on **all three** levels',
            'Whenever level 3’s goal is reached, regardless of levels 1 and 2',
            'Only on bonus games',
            'Only if level 1’s goal was reached',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: level 3 points count only when the goals of **all three** levels were reached (levels 1 and 2 points already require their own chains).',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): nested goals before applying bonus triple.',
            lines: [51, 52],
          },
        },
        {
          id: 'sq-ps22-1-b',
          kind: 'mcq',
          prompt: 'In `playManyTimes`, what must happen **each** iteration to earn full credit?',
          options: [
            'Call `play()` then `getScore()` to update the max',
            'Call `getScore()` only — `play` runs automatically',
            'Call `play()` once total, then loop `getScore`',
            'Only call `play()`; scores come from a static field',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: each simulated game requires `play()` followed by `getScore()`; track the highest score returned.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): pair `play` with `getScore` every time.',
            lines: [60, 61],
          },
        },
      ],
    },
  ],
  'ps-2022-2-textbook': [
    {
      id: 'sq-ps22-2',
      title: 'Textbook — edition & canSubstituteFor',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps22-2-q1',
          kind: 'mcq',
          prompt: 'When does `canSubstituteFor(other)` return **true**?',
          options: [
            '`getTitle().equals(other.getTitle())` and `this` edition ≥ `other`’s edition',
            'Same price and same edition',
            'Same title only',
            '`this` edition is strictly greater than `other`’s edition',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: same title and the current textbook’s edition must be greater than or equal to the parameter’s edition.',
          points: 20,
          visual: {
            stepIndex: 2,
            caption: 'canSubstituteFor: title match + edition comparison.',
            lines: [41, 42],
          },
        },
      ],
    },
  ],
  'ps-2022-3-review-analysis': [
    {
      id: 'sq-ps22-3',
      title: 'ReviewAnalysis — average & collectComments',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps22-3-q1',
          kind: 'mcq',
          prompt: 'Which comments are included in `collectComments`?',
          options: [
            'Only those whose comment string contains `!`',
            'Every non-empty comment',
            'Only comments ending with `!`',
            'Only comments with rating ≥ 4',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: filter with `indexOf(\'!\')` (or equivalent) to detect an exclamation point anywhere in the comment.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): exclamation filter + index prefix formatting.',
            lines: [54, 55],
          },
        },
      ],
    },
  ],
  'ps-2022-4-data': [
    {
      id: 'sq-ps22-4',
      title: 'Data — repopulate & increasing columns',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps22-4-q1',
          kind: 'mcq',
          prompt: 'Which values are **valid** for `repopulate`?',
          options: [
            'Between 1 and MAX, divisible by 10, **not** divisible by 100',
            'Any multiple of 100',
            'Only 10 and 20',
            'Any integer from 1 to MAX',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: reject multiples of 100; require divisibility by 10 and inclusion in 1…MAX.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): rejection loop for 10 but not 100.',
            lines: [12, 13],
          },
        },
      ],
    },
  ],
  'ps-2021-1-word-match': [
    {
      id: 'sq-ps21-1',
      title: 'WordMatch — overlapping substrings & score',
      checkpointStepIndex: 6,
      questions: [
        {
          id: 'sq-ps21-1-a',
          kind: 'mcq',
          prompt: 'How should **`scoreGuess`** count occurrences of **`guess`** in **`secret`**?',
          options: [
            'Every substring position, including **overlapping** matches',
            'Only non-overlapping matches (after a match, skip past the whole guess)',
            'Only the first and last occurrence',
            'Count distinct characters that appear in both strings',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: occurrences may overlap — e.g. `"iss"` appears twice at different starting indices in `"mississippi"`.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): slide `guess.length()` window along `secret`.',
            lines: [17, 18],
          },
        },
        {
          id: 'sq-ps21-1-b',
          kind: 'mcq',
          prompt: 'If **`scoreGuess`** returns the **same** value for **`guess1`** and **`guess2`**, what does **`findBetterGuess`** return?',
          options: [
            'The lexicographically **greater** string (`compareTo`)',
            'Always `guess1`',
            'Always `guess2`',
            'The shorter string',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: on a score tie, return the alphabetically greater guess.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): compare scores, then break ties with `compareTo`.',
            lines: [26, 27],
          },
        },
      ],
    },
  ],
  'ps-2021-2-combined-table': [
    {
      id: 'sq-ps21-2',
      title: 'CombinedTable — capacity & desirability',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps21-2-q1',
          kind: 'mcq',
          prompt: 'How many seats does a **`CombinedTable`** lose compared to the sum of its two **`SingleTable`** seat counts?',
          options: [
            '**2** seats (one from each table where they meet)',
            '**1** seat total',
            '**0** — no seats are lost',
            'Half of the smaller table’s seats',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: combined capacity is `t1.getNumSeats() + t2.getNumSeats() - 2`.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption: '`canSeat`: total seats minus two for the join.',
            lines: [32, 33],
          },
        },
      ],
    },
  ],
  'ps-2021-3-club-members': [
    {
      id: 'sq-ps21-3',
      title: 'ClubMembers — add roster & remove graduates',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps21-3-q1',
          kind: 'mcq',
          prompt: 'After **`removeMembers(year)`**, who stays in **`memberList`**?',
          options: [
            'Only members whose **graduation year is greater than** `year`',
            'Only members still in good standing',
            'Everyone — the list is unchanged',
            'Only members who graduated in exactly `year`',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: remove **all** members with `getGradYear() <= year`, regardless of standing; keep those with later graduation years.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): add `MemberInfo` with good standing true.',
            lines: [32, 33],
          },
        },
      ],
    },
  ],
  'ps-2021-4-array-resizer': [
    {
      id: 'sq-ps21-4',
      title: 'ArrayResizer — non-zero rows & resize',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps21-4-q1',
          kind: 'mcq',
          prompt: 'What does **`resize`** put in the returned 2D array?',
          options: [
            'Only rows where **every** entry is non-zero, in **original order**',
            'Only the first non-zero row',
            'A copy of the entire original array',
            'Only rows that contain at least one zero',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: copy rows with no zeros, preserve order, use `numNonZeroRows` and `isNonZeroRow`.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): test row `r` for any zero.',
            lines: [8, 9],
          },
        },
      ],
    },
  ],
  'ps-2018-1-frog-simulation': [
    {
      id: 'sq-ps18-1',
      title: 'FrogSimulation — simulate & runSimulations',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps18-1-a',
          kind: 'mcq',
          prompt: 'Inside `simulate`, when should you return **false** immediately?',
          options: [
            'As soon as the frog’s position becomes **negative** (before finishing more hops)',
            'Only after completing all `maxHops` hops',
            'Whenever `hopDistance()` returns a negative value, before updating position',
            'Never — only return false after the loop',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: a negative position ends the simulation unsuccessfully right away; you also return false after exhausting hops without reaching the goal.',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Part (a): goal, negative position, and hop limit.',
            lines: [29, 30, 31],
          },
        },
        {
          id: 'sq-ps18-1-b',
          kind: 'mcq',
          prompt: 'How should `runSimulations(num)` compute the proportion of successful simulations?',
          options: [
            '`(double) countOfTrue / num`',
            '`countOfTrue / num` with int division only',
            '`num / countOfTrue`',
            'Return `countOfTrue` without dividing',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: example 100 of 400 → 0.25 requires floating-point division; cast the numerator (or use 400.0).',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): count `simulate()` successes then divide by `num`.',
            lines: [38, 39, 40],
          },
        },
      ],
    },
  ],
  'ps-2018-2-word-pair-list': [
    {
      id: 'sq-ps18-2',
      title: 'WordPairList — pairs & numMatches',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-ps18-2-q1',
          kind: 'mcq',
          prompt: 'Which pairs belong in `allPairs` for the constructor?',
          options: [
            'Every `(words[i], words[j])` with **0 ≤ i < j < words.length**',
            'Only adjacent pairs `(words[i], words[i+1])`',
            'All ordered pairs including `(words[j], words[i])` when j > i',
            'Only pairs where the two strings are equal',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: one `WordPair` per later index paired with an earlier index — exactly the i < j double loop.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): nested loops with j starting at i + 1.',
            lines: [30, 31, 32],
          },
        },
      ],
    },
  ],
  'ps-2018-3-code-word-checker': [
    {
      id: 'sq-ps18-3',
      title: 'CodeWordChecker — bounds & forbidden substring',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps18-3-q1',
          kind: 'mcq',
          prompt: 'When is `new CodeWordChecker("pass")` satisfied for length?',
          options: [
            'Valid lengths are **6 through 20** inclusive (defaults)',
            'Any positive length',
            'Exactly length 4',
            'Same bounds as the three-argument constructor (must pass min and max)',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: one-argument constructor sets default min 6 and max 20.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Specification: defaults vs three-parameter bounds.',
            lines: [9, 13, 14, 15],
          },
        },
      ],
    },
  ],
  'ps-2018-4-array-tester': [
    {
      id: 'sq-ps18-4',
      title: 'ArrayTester — getColumn & isLatin',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps18-4-q1',
          kind: 'mcq',
          prompt: 'What length should `getColumn(arr2D, c)` allocate for the returned array?',
          options: [
            '`arr2D.length` (number of rows)',
            '`arr2D[0].length` (number of columns)',
            '`c + 1`',
            'Always 4',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: one entry per row for that column index.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): row-major extraction of one column.',
            lines: [9, 10, 11],
          },
        },
      ],
    },
  ],
  'ps-2015-1-diverse-array': [
    {
      id: 'sq-ps15-1',
      title: 'DiverseArray — sums & distinct row totals',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps15-1-a',
          kind: 'mcq',
          prompt: 'In **`isDiverse`**, what must you compare to detect a non-diverse array?',
          options: [
            'Pairwise **row sums** (after obtaining them with `rowSums` as required)',
            'Only the first and last **rows** of the 2D array',
            'Column sums instead of row sums',
            'Whether `arraySum` on the whole 2D array is unique',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: use `rowSums`; the array is diverse iff no two rows have the same sum — compare sums (e.g. nested loops over distinct indices).',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Part (a): `arraySum` on a 1D row.',
            lines: [20, 21],
          },
        },
        {
          id: 'sq-ps15-1-b',
          kind: 'mcq',
          prompt: 'For **`rowSums(arr2D)`**, what belongs at index **`k`** of the returned array?',
          options: [
            'The sum of all entries in **row `k`** of `arr2D`',
            'The sum of column `k`',
            'The single element `arr2D[k][k]`',
            'Always zero',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: entry `k` is the sum of row `k` in row-major order.',
          points: 22,
          visual: {
            stepIndex: 7,
            caption: 'Part (c): diversity is about row sums.',
            lines: [36, 37],
          },
        },
      ],
    },
  ],
  'ps-2015-2-hidden-word': [
    {
      id: 'sq-ps15-2',
      title: 'HiddenWord — hint characters',
      checkpointStepIndex: 2,
      questions: [
        {
          id: 'sq-ps15-2-q1',
          kind: 'mcq',
          prompt: 'In **`getHint`**, when should the hint show **`+`** at position `i`?',
          options: [
            '`guess.charAt(i)` is not the same as `hidden.charAt(i)`, but that character appears somewhere in `hidden`',
            'The guess letter never appears in `hidden`',
            'Only when the entire guess equals `hidden`',
            'Whenever the guess letter is a vowel',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: `+` means the letter is in the hidden word but not at that position; exact position match shows the letter itself.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Rules: exact match vs elsewhere vs absent.',
            lines: [7, 8],
          },
        },
      ],
    },
  ],
  'ps-2015-3-sparse-array': [
    {
      id: 'sq-ps15-3',
      title: 'SparseArray — lookup & column removal',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps15-3-q1',
          kind: 'mcq',
          prompt: 'What should **`getValueAt(row, col)`** return when no entry has that row and column?',
          options: ['`0`', '`null`', 'Throw an exception', '`-1`'],
          correctOptionIndex: 0,
          explanation: 'Exam: missing entries represent zero in the conceptual sparse matrix.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): scan `entries` for a match.',
            lines: [45, 46],
          },
        },
      ],
    },
  ],
  'ps-2015-4-number-group': [
    {
      id: 'sq-ps15-4',
      title: 'NumberGroup — Range & MultipleGroups',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-ps15-4-q1',
          kind: 'mcq',
          prompt: 'For **`Range`** with min **`a`** and max **`b`** (inclusive), when does **`contains(n)`** return **true**?',
          options: [
            '`a <= n && n <= b`',
            '`a < n && n < b` (strict)',
            'Only when `n` equals `a` or `b`',
            'Only for even `n`',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: a range includes both endpoints.',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Part (b): inclusive bounds.',
            lines: [16, 17],
          },
        },
      ],
    },
  ],
  'ps-2014-1-scramble': [
    {
      id: 'sq-ps14-1',
      title: 'Scramble — A/non-A swap rule',
      checkpointStepIndex: 5,
      questions: [
        {
          id: 'sq-ps14-1-a',
          kind: 'mcq',
          prompt:
            'After **`scrambleWord`** swaps **`\'A\'`** with the next character, what must you do with the index **`i`**?',
          options: [
            'Advance **`i` by 2** so neither swapped position participates in another swap',
            'Advance **`i` by 1** only',
            'Reset **`i`** to 0 and rescan the whole word',
            'Skip to the next **`\'A\'`** using **`indexOf`** from the start each time',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: once two adjacent positions have been swapped, neither may be involved in a future swap — jump past both.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): left-to-right scan with skip-2 after each swap.',
            lines: [14, 15],
          },
        },
        {
          id: 'sq-ps14-1-b',
          kind: 'mcq',
          prompt:
            'In **`scrambleOrRemove`**, a word should be **removed** from **`wordList`** when which condition holds?',
          options: [
            '`scrambleWord(word)` **equals** the original word (unchanged by scrambling)',
            'The word contains no letter **`\'A\'`**',
            'The word is the empty string',
            'The word is longer than 10 characters',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: remove entries that are unchanged after scrambling; keep relative order of the rest.',
          points: 22,
          visual: {
            stepIndex: 4,
            caption: 'Part (b): replace or remove after comparing to `scrambleWord`.',
            lines: [28, 29],
          },
        },
      ],
    },
  ],
  'ps-2014-2-director': [
    {
      id: 'sq-ps14-2',
      title: 'Director — GREEN start & neighbor rotation',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps14-2-q1',
          kind: 'mcq',
          prompt:
            'When should a **`Director`** rotate its **occupied** neighboring **`Actor`** objects **90° to the right**?',
          options: [
            'When its color is **`Color.GREEN` at the beginning of `act()`**',
            'When its color is **`Color.RED` at the beginning of `act()`**',
            'Only on the first call to **`act()`** ever',
            'After it has toggled to **`Color.GREEN`** at the **end** of `act()`',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: if the Director is GREEN when `act` begins, each neighboring Actor turns right (`Location.RIGHT`) before the color alternation.',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Specification: GREEN-first neighbor rotation, then RED/GREEN toggle.',
            lines: [3, 4],
          },
        },
      ],
    },
  ],
  'ps-2014-3-seating-chart': [
    {
      id: 'sq-ps14-3',
      title: 'SeatingChart — column-major fill & absences',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps14-3-a',
          kind: 'mcq',
          prompt:
            'In the **`SeatingChart`** constructor, which **nested loop order** matches the exam’s **column-major** fill from **`studentList`**?',
          options: [
            '**Outer** loop over **columns**; **inner** loop over **rows**',
            '**Outer** loop over **rows**; **inner** loop over **columns**',
            'A single loop over **`rows * cols`** only, ignoring row/column structure',
            'Sort **`studentList`** by name before assigning in row-major order',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: students appear in list order starting at `seats[0][0]`, filling **down each column** before moving to the next column.',
          points: 22,
          visual: {
            stepIndex: 1,
            caption: 'Part (a): column-by-column placement from the roster.',
            lines: [33, 34],
          },
        },
        {
          id: 'sq-ps14-3-b',
          kind: 'mcq',
          prompt:
            'In **`removeAbsentStudents`**, what should happen to students who stay in the chart (absence count **`≤ allowedAbsences`)?**',
          options: [
            'They remain in **their original seat positions**',
            'They shift left to remove gaps',
            'They are copied into a new smaller array',
            'They are removed along with high-absence students',
          ],
          correctOptionIndex: 0,
          explanation:
            'Exam: only students with more than `allowedAbsences` are nulled out; others stay put — no shifting.',
          points: 22,
          visual: {
            stepIndex: 3,
            caption: 'Part (b): null high-absence cells only.',
            lines: [47, 48],
          },
        },
      ],
    },
  ],
  'ps-2014-4-trio': [
    {
      id: 'sq-ps14-4',
      title: 'Trio — name format & two-highest price',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ps14-4-q1',
          kind: 'mcq',
          prompt: 'How is a **`Trio`** price computed from its three **`MenuItem`** prices?',
          options: [
            '**Sum of the two highest** prices (the lowest-priced item is free)',
            'Sum of all three prices',
            'The price of the sandwich only',
            'The average of the three prices',
          ],
          correctOptionIndex: 0,
          explanation: 'Exam: add the two largest prices; the cheapest of the three is not charged.',
          points: 22,
          visual: {
            stepIndex: 2,
            caption: 'Specification: lowest of three is free.',
            lines: [19, 20],
          },
        },
      ],
    },
  ],
  ...bulkSectionQuizzes,
};

