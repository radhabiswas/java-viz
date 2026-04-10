import type { Lesson } from '../types';

/** Pseudo-lesson id: open full help from the sidebar or search. */
export const HELP_LESSON_ID = 'javaviz-help';

export type HelpRelatedLesson = { id: string; label: string };

export type HelpSection = {
  id: string;
  title: string;
  /** Used for search matching (lowercase substring). */
  searchBlob: string;
  paragraphs: string[];
  bullets?: string[];
  relatedLessons?: HelpRelatedLesson[];
};

/**
 * Curated sidebar groups (below Custom Code). Same lesson may appear in more than one group
 * when it fits multiple topics (e.g. 4-2 for both parameter passing and constructors).
 */
export const CURRICULUM_TOPIC_GROUPS: { title: string; lessonIds: string[] }[] = [
  { title: 'Parameter passing', lessonIds: ['4-2'] },
  { title: 'Constructors', lessonIds: ['4-1', '4-2'] },
  { title: 'Access rules', lessonIds: ['4-1'] },
  { title: 'Static methods', lessonIds: ['5-2'] },
];

export function topicFeaturedLessonIdSet(): Set<string> {
  return new Set(CURRICULUM_TOPIC_GROUPS.flatMap((g) => g.lessonIds));
}

/** Minimal help: short pointers only; deep explanation lives in the linked lessons. */
export const HELP_SECTIONS: HelpSection[] = [
  {
    id: 'overview',
    title: 'Welcome',
    searchBlob: 'welcome start overview javaviz memory stack heap static custom code',
    paragraphs: [
      'JavaViz steps through examples line by line. The diagram shows **Stack**, **Heap**, and **Static**; some steps add **Parameter passing**, **Class hierarchy**, or other panels. Use **Custom Code** to paste your own Java and step when the simulator can model it.',
    ],
  },
  {
    id: 'using-app',
    title: 'Using the app',
    searchBlob: 'find search next prev editor class scopes format quiz account score points modify',
    paragraphs: [
      '**Find** searches lessons and this help. **Next** / **Prev** move the current line and description. Multi-file lessons use editor tabs. Toolbar: **Class**, **Scopes** (use **All variables** or click a local to show one lane), **Format**, **Modify**. Diagram panels default to **Tabs** (one panel at a time); switch to **Tile** for a vertical stack next to **Show**.',
      'Quizzes add **points**; an optional **Account** saves progress in this browser.',
    ],
  },
  {
    id: 'parameter-passing',
    title: 'Parameter passing',
    searchBlob:
      'parameter passing pass by value reference primitive copy argument formal actual stack callee',
    paragraphs: [
      'Java is **pass-by-value**: each argument is copied into a new parameter variable. Primitives copy the value; references copy the **pointer** (still one object on the heap). Follow the lesson—use the **Parameter passing** panel when it shows **type name = actual**.',
    ],
    relatedLessons: [{ id: '4-2', label: 'Class vs Client (Student)' }],
  },
  {
    id: 'constructors',
    title: 'Constructors',
    searchBlob: 'constructor new object initialization this super default chain class name',
    paragraphs: [
      '**`new`** allocates an object and runs a **constructor** (same name as the class, no return type). See **Fraction** in one file and **Student** split across client + class.',
    ],
    relatedLessons: [
      { id: '4-1', label: 'Class Anatomy (Fraction)' },
      { id: '4-2', label: 'Class vs Client (Student)' },
    ],
  },
  {
    id: 'access-rules',
    title: 'Access rules',
    searchBlob: 'public private protected package access visibility field method getter encapsulation',
    paragraphs: [
      '**`public`**, **`private`**, etc. control visibility. Turn on **Class** in the toolbar to see access and section ribbons on the lesson code.',
    ],
    relatedLessons: [{ id: '4-1', label: 'Class Anatomy (Fraction)' }],
  },
  {
    id: 'static-methods',
    title: 'Static methods',
    searchBlob: 'static method instance class context this no implicit',
    paragraphs: [
      '**`static`** members belong to the **class**, not an instance—there is no **`this`**. Compare with instance methods in the lesson below.',
    ],
    relatedLessons: [{ id: '5-2', label: 'Static vs Instance Methods' }],
  },
  {
    id: 'java-libraries',
    title: 'Libraries (java.util & java.lang)',
    searchBlob:
      'arraylist list reverse split string array string[] math integer double random substring equals indexof pow sqrt min max wrapper parseint parsedouble 2d row column ragged grid traversal java.util java.lang library collections',
    paragraphs: [
      'Intro courses often stress **java.lang** and **java.util**: **`ArrayList`**, **`List`**, **`String.split`**, **`Math`**, **`Integer`** / **`Double`**, and **2D arrays** (row sums, column walks, **`grid[r].length`**).',
      'Under **More lessons → 7 · Libraries**, each topic is its **own short lesson** (ArrayList & List, String, Math & wrappers, 2D arrays) so explanations stay focused.',
    ],
    relatedLessons: [
      { id: '6-lib-arraylist', label: 'ArrayList & List' },
      { id: '6-lib-string', label: 'String methods' },
      { id: '6-lib-math', label: 'Math & wrappers' },
      { id: '6-lib-2d', label: '2D arrays' },
    ],
  },
  {
    id: 'algorithmic-thinking',
    title: 'Algorithmic thinking',
    searchBlob:
      'algorithmic thinking problem solving design phase examples generalize plan pseudocode substring occurrences indexof overlap haystack needle pattern arrays recursion math simulation',
    paragraphs: [
      'These lessons are under **More lessons**, chapter **8 · Algorithmic Thinking** (before **9 · AP CS A Problems**). Each lesson can list a **subsection** — today **String based algorithms**; good candidates as the library grows: **Array based**, **Numeric / math**, **Date & calendar logic**, **Simulation**, **Recursive** patterns.',
      'A lesson splits into two modes: **Design phase** — stage controls walk through examples, plain-language logic, and the right-hand **Array**, **Recursion**, or other diagram that fits the problem. Then **Implementation** — the usual **chevron** controls step executed **Java** line by line with **memory** (and flow when relevant), like the rest of the curriculum.',
    ],
    relatedLessons: [{ id: 'alg-1-occurrences', label: 'String based: all occurrences of a substring' }],
  },
  {
    id: 'ap-cs-a-problems',
    title: 'AP CS A Problems (FRQ-style)',
    searchBlob:
      'ap cs a problems apcsa problem solving frq ap calendar steptracker delimiters lightboard leap year day of week numberOfLeapYears dayOfWeek isLeapYear dayOfYear firstDayOfYear past papers 2025 2024 2023 2022 2021 2018 2017 2016 2015 2014 2013 2012 college board released pdf scoring guidelines sample response',
    paragraphs: [
      'Chapter **9 · AP CS A Problems** appears **after** **8 · Algorithmic Thinking** (lesson **order** keeps that sequence). **2025**, **2024**, **2023**, **2022**, **2021**, **2019**, **2018**, **2017**, **2016**, **2015**, **2014**, **2013**, and **2012** have full in-app FRQs (design stages, **Implementation workspace**, **Concepts**, reference Java). Other released years may still use **PDF hub** entries (links only) where those hubs are listed; hubs sort after reserved full-FRQ **order** slots.',
      '**2019** FRQs use top tabs for the prompt and walkthrough; **Implementation workspace** opens the **editor** with **memory**, **array** (when present), **class hierarchy**, and **Concepts** like other lessons. **Other years** use the workspace to type **your** solution beside the PDFs.',
      'The sidebar shows **compact numbers** (**1**, **2**, **3**, **4**) under each **year**. Hover or use screen-reader labels for the full title.',
      '**Link to algorithmic thinking:** prompts are chosen so the **same habits** apply — decompose the task, reuse **helpers**, respect **loop exit** and **bounds**, and use **modular arithmetic** where needed (e.g. weekdays).',
    ],
    relatedLessons: [
      { id: 'ps-2025-1-dog-walker', label: '2025 · 1 · DogWalker' },
      { id: 'ps-2024-1-feeder', label: '2024 · 1 · Feeder' },
      { id: 'ps-2014-1-scramble', label: '2014 · 1 · Scramble' },
      { id: 'ps-2023-1-appointment-book', label: '2023 · 1 · AppointmentBook' },
      { id: 'ps-2016-1-random-chooser', label: '2016 · 1 · RandomStringChooser' },
      { id: 'ps-2022-1-game', label: '2022 · 1 · Game / Level' },
      { id: 'ps-2021-1-word-match', label: '2021 · 1 · WordMatch' },
      { id: 'ps-2018-1-frog-simulation', label: '2018 · 1 · FrogSimulation' },
      { id: 'ps-2012-1-climbing-club', label: '2012 · 1 · ClimbingClub' },
      { id: 'ps-2017-1-digits', label: '2017 · 1 · Digits' },
      { id: 'ps-2015-1-diverse-array', label: '2015 · 1 · DiverseArray' },
      { id: 'ps-2013-1-music-downloads', label: '2013 · 1 · MusicDownloads' },
      { id: 'ps-1-ap-calendar', label: '2019 · 1 · AP Calendar' },
      { id: 'ps-2-step-tracker', label: '2019 · 2 · StepTracker' },
      { id: 'ps-3-delimiters', label: '2019 · 3 · Delimiters' },
      { id: 'ps-4-light-board', label: '2019 · 4 · LightBoard' },
    ],
  },
];

export function helpSectionMatchesQuery(section: HelpSection, queryLower: string): boolean {
  if (!queryLower) return false;
  return (
    section.title.toLowerCase().includes(queryLower) ||
    section.searchBlob.includes(queryLower) ||
    section.paragraphs.some((p) => p.toLowerCase().includes(queryLower))
  );
}

export function lessonMatchesQuery(lesson: Lesson, queryLower: string): boolean {
  if (!queryLower) return false;
  return (
    lesson.title.toLowerCase().includes(queryLower) ||
    lesson.chapter.toLowerCase().includes(queryLower) ||
    lesson.id.toLowerCase().includes(queryLower)
  );
}
