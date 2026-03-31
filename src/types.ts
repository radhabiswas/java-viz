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

/** Shown below Memory State to relate actual arguments to formal parameters (pass-by-value). */
export type ParameterPassing = {
  /** Short line under the section title (e.g. call site vs inside callee). */
  subtitle?: string;
  /** e.g. Student(String name, int grade) */
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
  memory: MemoryState;
  highlights?: CodeHighlight[];
  /** Optional: actual → formal parameter mapping (pass-by-value) below the memory diagram. */
  parameterPassing?: ParameterPassing;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
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
  files?: { name: string; lines: number[] }[]; // For multi-file lessons
  colorClass?: string;
  /** When this concept is selected, show explicit receiver parameter (ClassName this) in the given file. */
  implicitThis?: {
    file: string;
    className: string;
  };
};

export type Lesson = {
  id: string;
  /** Lower numbers appear first in the sidebar (curriculum progression). */
  order?: number;
  title: string;
  chapter: string;
  /**
   * Domain-story lessons (gaming, music, etc.): sidebar shows
   * "Real life Example N: …" before the title.
   */
  realLifeApplicationExampleNumber?: number;
  code: string;
  files?: CodeFile[];
  /** Symbols the learner can click in the editor to jump to a definition tab/line. */
  codeNav?: CodeNavTarget[];
  /** Inheritance / type hierarchy rows (merged with auto-detect from sources when omitted). */
  classHierarchy?: ClassHierarchyEntry[];
  steps: Step[];
  quiz?: QuizQuestion;
  concepts?: Concept[];
};
