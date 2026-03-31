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
      '**Find** searches lessons and this help. **Next** / **Prev** move the current line and description. Multi-file lessons use editor tabs. Toolbar: **Class**, **Scopes** (use **All variables** or click a local to show one lane), **Format**, **Modify**. When several diagram panels are on, use **Tabs** vs **Tile** (vertical stack) next to **Show**.',
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
      'arraylist list string math integer double random substring equals indexof pow sqrt min max wrapper parseint parsedouble 2d array traversal java.util java.lang library collections',
    paragraphs: [
      'Intro courses often stress **java.lang** and **java.util**: **`ArrayList`**, **`String`**, **`Math`**, **`Integer`** / **`Double`**, the **`List`** interface, and **row-major 2D traversal** (`grid.length`, `grid[r].length`).',
      'Under **More lessons → 6 · Libraries**, each topic is its **own short lesson** (ArrayList & List, String, Math & wrappers, 2D arrays) so explanations stay focused.',
    ],
    relatedLessons: [
      { id: '6-lib-arraylist', label: 'ArrayList & List' },
      { id: '6-lib-string', label: 'String methods' },
      { id: '6-lib-math', label: 'Math & wrappers' },
      { id: '6-lib-2d', label: '2D arrays' },
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
