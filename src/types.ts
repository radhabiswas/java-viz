export type StackVariable = {
  id: string;
  name: string;
  type: 'primitive' | 'reference';
  value?: string | number | boolean;
  refId?: string | null;
};

export type HeapObject = {
  id: string;
  className: string;
  fields: { name: string; value: string | number | boolean | null }[];
};

export type StaticVariable = {
  id: string;
  className: string;
  name: string;
  value: string | number | boolean;
};

export type MemoryState = {
  stack: StackVariable[];
  heap: HeapObject[];
  staticArea: StaticVariable[];
};

/** Optional visual row for the Array view panel (search/sort traces). */
export type ArrayTraceBand = {
  id: string;
  label: string;
  values: (string | number)[];
};

export type ArrayTraceMarkerKind =
  | 'lo'
  | 'hi'
  | 'mid'
  | 'i'
  | 'j'
  | 'minIdx'
  | 'key'
  | 'swap'
  | 'compare'
  /** Inclusive index: treat [0..idx] as sorted (insertion sort). */
  | 'sortedThrough';

export type ArrayTraceMarker = {
  index: number;
  /**
   * When set, the marker appears only on that band (e.g. one row of a 2D layout).
   * When omitted, any band whose cells use the same column index shows the marker (e.g. main array + key strip).
   */
  bandId?: string;
  kind: ArrayTraceMarkerKind;
  /** Override the small tag above the cell (e.g. "lo=0"). */
  label?: string;
};

/** How bands are drawn in the Array view panel. */
export type ArrayTraceLayout = 'bands' | 'grid2d';

/** Rich array runway: indices, values, and markers (lo/hi/mid, i/j, swaps, etc.). */
export type ArrayTraceView = {
  caption?: string;
  /** Primary row is usually the heap array being searched or sorted. */
  bands: ArrayTraceBand[];
  /** Markers apply to the first band by index (0-based slot). */
  markers: ArrayTraceMarker[];
  /**
   * `grid2d`: one band per row; columns align. Cell sublabels use (r,c); optional header row shows c=0,1,….
   * Use `sortedThrough` + `bandId` on each cell to show row-major “already visited” shading.
   */
  layout?: ArrayTraceLayout;
};

/** Shown below Memory State to relate actual arguments to formal parameters (pass-by-value). */
export type ParameterPassing = {
  /** Short line under the section title (e.g. call site vs inside callee). */
  subtitle?: string;
  /** e.g. Student(String studentName, int initialGrade) */
  calleeSignature: string;
  mappings: {
    formalType: string;
    formalName: string;
    /** Expression as written at the call site */
    actual: string;
    /** Optional extra explanation (hidden when using compact formal = actual UI). */
    detail?: string;
  }[];
  /** Short reminder (e.g. pass-by-value); optional for compact steps. */
  footnote?: string;
  /**
   * Set when inference matches `new Class()` and the class source declares no constructors:
   * Java’s implicit default no-arg constructor (UI may show a tailored empty-parameter explanation).
   */
  implicitDefaultConstructor?: boolean;
};

export type CodeHighlight = {
  line: number;
  colorClass: string;
  label?: string;
};

export type Step = {
  id: string;
  codeLine: number;
  activeFile?: string;
  description: string;
  /** Optional tabs to open a file in the editor (multi-file lessons). */
  fileLinks?: { file: string; label?: string }[];
  /**
   * Optional Java (or pseudocode) shown below the step narrative in a monospace block
   * (e.g. FRQ solution walkthrough before the Implementation stage).
   */
  codeExample?: string;
  /**
   * When set, rendered instead of {@link codeExample} as titled blocks (e.g. Q1 Part (a)/(b) on Implementation).
   */
  codeExampleBlocks?: { title?: string; code: string; variant?: 'teal' | 'violet' }[];
  /**
   * Shown above Memory State for this step (e.g. what the diagram illustrates for FRQ snapshots).
   */
  memoryCaption?: string;
  /**
   * When no concept is selected, tint the memory panel border (align with Part (a) / Part (b) colors).
   */
  memoryPanelAccent?: 'violet' | 'amber' | 'sky';
  memory: MemoryState;
  highlights?: CodeHighlight[];
  /** Optional: actual → formal parameter mapping (pass-by-value) below the memory diagram. */
  parameterPassing?: ParameterPassing;
  /** Optional: cell-by-cell array animation (search/sort) in the Array view panel. */
  arrayTrace?: ArrayTraceView;
  /**
   * Recursive call chain for the Recursion panel (outer caller first → innermost last),
   * same naming convention as frame rows like fact(5). Use when stack locals are modeled
   * as parameters instead of synthetic frame variables (e.g. binSearch with lo/hi/mid).
   */
  recursionCallStack?: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
};

export type SectionQuizVisualExplain = {
  /**
   * Move JavaViz to this step so existing memory/code/flow/recursion panels explain the answer visually.
   * 0-based index into lesson.steps.
   */
  stepIndex: number;
  /** Optional short lead-in text above the visual explanation controls. */
  caption?: string;
  /** Optional code lines (0-based) to emphasize in this explanation context. */
  lines?: number[];
};

/** Optional remediation link: must match a `Lesson.chapter` string exactly (e.g. `"5 · Arrays & algorithms"`). */
export type SectionQuizQuestionChapterRef = {
  reviewChapter?: string;
};

export type SectionQuizMcq = {
  id: string;
  kind: 'mcq';
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  points?: number;
  visual?: SectionQuizVisualExplain;
} & SectionQuizQuestionChapterRef;

export type SectionQuizFillBlank = {
  id: string;
  kind: 'fillBlank';
  prompt: string;
  placeholder?: string;
  /**
   * Case-insensitive accepted answers; values are trimmed before comparison.
   * Example: ["int"].
   */
  acceptedAnswers: string[];
  explanation: string;
  points?: number;
  visual?: SectionQuizVisualExplain;
} & SectionQuizQuestionChapterRef;

export type SectionQuizClickableCodeChoice = {
  id: string;
  text: string;
  correct: boolean;
};

export type SectionQuizClickableCode = {
  id: string;
  kind: 'clickableCode';
  prompt: string;
  /** Optional snippet shown above choices. */
  snippet?: string;
  /** Select all that apply. */
  choices: SectionQuizClickableCodeChoice[];
  explanation: string;
  points?: number;
  visual?: SectionQuizVisualExplain;
} & SectionQuizQuestionChapterRef;

export type SectionQuizQuestion =
  | SectionQuizMcq
  | SectionQuizFillBlank
  | SectionQuizClickableCode;

export type LessonSectionQuiz = {
  /** Unique per-lesson section quiz id. */
  id: string;
  title: string;
  /** Step index tied to this quiz’s visuals (“anchor”); walkthrough no longer auto-opens here. */
  checkpointStepIndex: number;
  questions: SectionQuizQuestion[];
};

/** End-of-lesson capstone (multi-question, all interaction kinds). Optional `lesson.quiz` remains for legacy single-MCQ lessons. */
export type LessonFinalQuiz = {
  id: string;
  title: string;
  questions: SectionQuizQuestion[];
};

export type CodeFile = {
  name: string;
  code: string;
};

/** Maps a clicked identifier in the editor to another file/line (go-to-definition). */
export type CodeNavTarget = {
  symbol: string;
  file: string;
  /** 0-based line index in that file (same as step codeLine / concept lines). */
  line: number;
};

/** Optional diagram for inheritance lessons (shown under Memory State). */
export type ClassHierarchyEntry = {
  className: string;
  file?: string;
  extends?: string | null;
  implements?: string[];
};

export type Concept = {
  id: string;
  name: string;
  description: string;
  lines?: number[]; // For single file lessons
  /**
   * 0-based line highlights when the editor shows `Lesson.implementationWorkspaceCode`
   * (FRQ implementation workspace). Falls back to `lines`.
   */
  implementationLines?: number[];
  files?: { name: string; lines: number[] }[]; // For multi-file lessons
  /**
   * When set, selecting this concept shows this memory diagram (e.g. FRQ implementation steps
   * where `codeLine` is not stepped). Ignored outside implementation phase for AP CS A Problems (FRQ) lessons.
   */
  memory?: MemoryState;
  /** Explains how this concept’s memory ties to the highlighted editor lines. */
  memoryCaption?: string;
  colorClass?: string;
  /** When this concept is selected, show explicit receiver parameter (ClassName this) in the given file. */
  implicitThis?: {
    file: string;
    className: string;
  };
};

/** First step index (0-based) where this design-phase label begins; only steps with index < implementationStartStepIndex use these. */
export type AlgorithmDesignPhaseStart = { at: number; label: string };

/**
 * Algorithmic thinking: explore examples and logic with visuals first, then a separate code walkthrough.
 * Steps before `implementationStartStepIndex` use design navigation; from that index onward, chevrons step executed code + memory.
 */
export type AlgorithmDesignMeta = {
  /** Step index where line-by-line Java execution walkthrough begins (e.g. first `codeLine >= 0`). */
  implementationStartStepIndex: number;
  /** Ordered stages within the design phase (each `at` must be < implementationStartStepIndex). */
  phaseStarts: AlgorithmDesignPhaseStart[];
  /** Optional short note in the design panel (e.g. how visuals map to the stages). */
  footnote?: string;
};

/** One part of an AP-style FRQ (e.g. (a), (b)) shown in **apExamFrqSheet**. */
export type ApExamFrqPart = {
  label: string;
  title?: string;
  body: string;
};

/** Exam-style question sheet (abridged on-screen layout; same substance as the released PDF). */
export type ApExamFrqSheet = {
  year: string;
  questionNumber: number;
  headline: string;
  /**
   * Opening paragraph(s) as on the exam, before the printed class (e.g. “You will write two methods…”).
   * **Intro** tab (when present). Rich text: **bold** like step descriptions.
   */
  examIntro?: string;
  /**
   * Java source exactly as students see in the exam booklet for this question (class + stubs / “not shown”).
   * Shown in the **Class** tab (when present), separate from **examIntro**.
   */
  examClassContext?: string;
  /** Section II directions (shared wording; may be shortened on later questions). */
  directions: string;
  /** Bullet notes under directions (Java Quick Reference, preconditions, etc.). */
  notes: string[];
  parts: ApExamFrqPart[];
  /** Optional “approach” line for the sidebar panel footer. */
  solutionHint?: string;
  /**
   * Shown at the bottom of the exam sheet panel as labeled links (e.g. released question PDF, scoring guidelines, sample response).
   * Legacy 2019 sheets set this explicitly; past-paper stubs always set it.
   */
  footerExamLinks?: { label: string; href: string }[];
};

export type Lesson = {
  id: string;
  /** Lower numbers appear first in the sidebar (curriculum progression). */
  order?: number;
  title: string;
  chapter: string;
  /** When set, lesson uses design-stage navigation + right-hand design panel before the normal Java walkthrough. */
  algorithmDesign?: AlgorithmDesignMeta;
  /**
   * Under chapter 8 (Algorithmic Thinking): topic family for sidebar and design panel, e.g. "String based algorithms".
   */
  algorithmSubsection?: string;
  /**
   * Under chapter 9 (AP CS A Problems): show this integer in the sidebar instead of the full title so the nav stays compact (1, 2, 3, …).
   */
  problemSolvingNumber?: number;
  /**
   * Under chapter 9 (AP CS A Problems): optional subheading above this lesson’s row of chips (e.g. exam year **2019** for AP FRQ groupings).
   */
  problemSolvingGroup?: string;
  /**
   * When set (typically with **problemSolvingNumber**), shows an exam-style prompt panel beside the editor.
   * Copy is curriculum text; **bold** segments render like step descriptions.
   */
  apExamFrqSheet?: ApExamFrqSheet;
  /**
   * Domain-story lessons (gaming, music, etc.): sidebar shows
   * "Real life Example N: …" before the title.
   */
  realLifeApplicationExampleNumber?: number;
  code: string;
  /**
   * Full Java source for the editor after opening the FRQ **implementation** workspace
   * (exam stubs are still in `code` for the sheet / earlier steps). Omitted when same as `code`.
   */
  implementationWorkspaceCode?: string;
  files?: CodeFile[];
  /** Symbols the learner can click in the editor to jump to a definition tab/line. */
  codeNav?: CodeNavTarget[];
  /** Inheritance / type hierarchy rows (merged with auto-detect from sources when omitted). */
  classHierarchy?: ClassHierarchyEntry[];
  /**
   * Generic recursion only: violet return-arc labels, innermost pop first (length = peak call depth − 1).
   * E.g. recursive binary search with four stacked calls uses three labels, one per unwind step.
   */
  recursionUnwindReturnLabels?: string[];
  /** Generic recursion: value shown in “to caller” when only the outer frame remains after full unwind. */
  recursionFinalReturnValue?: number | string;
  steps: Step[];
  /** Optional section quizzes (on-demand from the lesson header; merged with data files when omitted). */
  sectionQuizzes?: LessonSectionQuiz[];
  /** Multi-question lesson review at the end (preferred when present). */
  finalQuiz?: LessonFinalQuiz;
  quiz?: QuizQuestion;
  concepts?: Concept[];
};
