import React, { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo } from 'react';
import { Lesson, Concept } from '../types';
import CodeViewer from './CodeViewer';
import MemoryVisualizer from './MemoryVisualizer';
import ParameterPassingPanel from './ParameterPassingPanel';
import FlowPanel from './FlowPanel';
import RecursionPanel from './RecursionPanel';
import ClassHierarchyPanel from './ClassHierarchyPanel';
import ArrayTracePanel from './ArrayTracePanel';
import SectionQuizPanel from './SectionQuizPanel';
import FrqProblemSolutionFocus from './FrqProblemSolutionFocus';
import { StepCodeExamples } from './StepCodeExamples';
import { formatJavaCode } from '../lib/formatJava';
import { simulateJavaMemoryUpTo } from '../lib/javaMemorySimulator';
import { buildHierarchyRows } from '../lib/classHierarchy';
import { cn } from '../lib/utils';
import { StepDescription } from '../lib/stepDescriptionRichText';
import {
  getEffectiveParameterPassing,
  lessonHasParameterPassingOpportunity,
} from '../lib/inferParameterPassing';
import { inferLessonRecursionTrace, lessonHasRecursionPanel } from '../lib/controlFlowInference';
import {
  getPrimaryLessonCode,
  lessonHasSteppedExecutionTrace,
  lessonUsesControlConstructs,
} from '../lib/statementFlowInference';
import { sectionQuizzesByLessonId } from '../data/sectionQuizzes';
import { finalQuizzesByLessonId } from '../data/finalQuizzes';
import { chapterQuizNavId } from '../lib/lessonProgress';
import { buildDesignPhaseRanges, phaseContextForStep } from '../lib/algorithmDesignPhaseRanges';
import { frqPhaseAccentForLabel } from '../lib/frqWalkthroughPhaseAccent';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  LayoutGrid,
  LayoutPanelLeft,
  LayoutTemplate,
  Rows2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Pencil,
  Lightbulb,
  DraftingCompass,
  StepBack,
  StepForward,
  ArrowLeft,
  BookOpen,
  Code2,
  LayoutList,
} from 'lucide-react';

/** Diagram types that can appear in the Show row — used for mobile full-screen viz tabs. */
type LessonDiagramPanelKey =
  | 'memory'
  | 'arrayView'
  | 'parameters'
  | 'flow'
  | 'recursion'
  | 'hierarchy';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export default function LessonViewer({ 
  lesson, 
  onQuizComplete, 
  isQuizCompleted,
  completedSectionQuizIds,
  onSectionQuizComplete,
  onEditLesson,
  onReplaceCustomLessonCode,
  onOpenChapterHub,
}: { 
  lesson: Lesson;
  onQuizComplete: (quizId: string, points: number) => void;
  isQuizCompleted: boolean;
  completedSectionQuizIds: Set<string>;
  onSectionQuizComplete: (sectionQuizId: string, points: number) => void;
  onEditLesson: (code: string) => void;
  /** When set, Format rebuilds this custom lesson in place instead of opening the Custom Code screen. */
  onReplaceCustomLessonCode?: (lessonId: string, newCode: string) => void;
  /** Navigate to the chapter quiz hub (`ch-quiz:…`); used when a question sets `reviewChapter`. */
  onOpenChapterHub?: (navId: string) => void;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  /** Below lg: separate walkthrough, code, and diagrams so each gets full width/height. */
  const [mobileStudioTab, setMobileStudioTab] = useState<'walkthrough' | 'code' | 'diagrams'>('walkthrough');
  /** Below lg: lessons without design phases — Lesson vs one full-screen diagram at a time. */
  const [mobileStandardVizTab, setMobileStandardVizTab] = useState<'lesson' | LessonDiagramPanelKey>('lesson');
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [activeSectionQuizId, setActiveSectionQuizId] = useState<string | null>(null);
  const [quizExplainLines, setQuizExplainLines] = useState<number[] | null>(null);
  const [quizExplainFile, setQuizExplainFile] = useState<string | null>(null);
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [formatError, setFormatError] = useState('');
  const [formatNotice, setFormatNotice] = useState('');
  const [panelVisibility, setPanelVisibility] = useState({
    memory: true,
    parameters: false,
    flow: true,
    recursion: true,
    hierarchy: true,
    arrayView: false,
  });
  /** Tabs = one full-height panel at a time (windowed); Tile = stack panels top-to-bottom. */
  const [diagramPanelLayout, setDiagramPanelLayout] = useState<'tabs' | 'tile'>('tabs');
  /** AP CS A Problems (FRQ): full-width Problem/Solution tabs; editor + diagrams when true. */
  const [frqWorkspaceOpen, setFrqWorkspaceOpen] = useState(false);
  const [fileTabRequest, setFileTabRequest] = useState<{ file: string; key: number; line?: number } | null>(
    null,
  );
  /** Active tab in the code viewer (for single-file “Modify code” export). */
  const editorTabRef = useRef<string | null>(null);
  const sectionQuizMenuRef = useRef<HTMLDetailsElement>(null);

  const boundedStepIndex =
    lesson.steps.length === 0 ? 0 : Math.min(currentStepIndex, lesson.steps.length - 1);
  const step = lesson.steps[boundedStepIndex] ?? lesson.steps[0];
  if (!step) return null;

  const hasParameterLessonOpportunity = useMemo(
    () => lessonHasParameterPassingOpportunity(lesson),
    [lesson],
  );

  /**
   * Custom single-file lessons bake memory at creation time; re-simulate so stack matches the current engine.
   * Depends on currentStepIndex: many steps share one codeLine (e.g. each recursive call), so codeLine alone would
   * leave Memory / recursion highlight stuck on the first of those steps.
   */
  const memoryState = useMemo(() => {
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    const frqOnImplStep =
      impl != null &&
      lesson.problemSolvingNumber != null &&
      boundedStepIndex >= impl;
    if (frqOnImplStep && activeConcept?.memory != null) {
      const cm = activeConcept.memory;
      const hasAny =
        cm.stack.length > 0 || cm.heap.length > 0 || cm.staticArea.length > 0;
      if (hasAny) return cm;
    }
    if (lesson.id.startsWith('custom-') && !lesson.files?.length) {
      const lines = lesson.code.split('\n');
      return simulateJavaMemoryUpTo(lines, step.codeLine);
    }
    return step.memory ?? { stack: [], heap: [], staticArea: [] };
  }, [
    lesson.id,
    lesson.code,
    lesson.files,
    lesson.problemSolvingNumber,
    lesson.algorithmDesign?.implementationStartStepIndex,
    step,
    step?.codeLine,
    boundedStepIndex,
    activeConcept?.id,
    activeConcept?.memory,
  ]);

  const memoryDiagramCaption = useMemo(() => {
    const fromConcept = activeConcept?.memoryCaption?.trim();
    if (fromConcept) return fromConcept;
    const fromStep = step.memoryCaption?.trim();
    if (fromStep) return fromStep;
    return undefined;
  }, [activeConcept?.memoryCaption, step.memoryCaption]);

  const memoryPanelBorderAccent = useMemo(() => {
    if (lesson.problemSolvingNumber == null) return null;
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    if (impl == null || boundedStepIndex < impl) return null;
    if (activeConcept?.name) return frqPhaseAccentForLabel(activeConcept.name);
    return step.memoryPanelAccent ?? null;
  }, [
    lesson.problemSolvingNumber,
    lesson.algorithmDesign?.implementationStartStepIndex,
    boundedStepIndex,
    activeConcept?.name,
    step.memoryPanelAccent,
  ]);

  const sectionQuizzes = lesson.sectionQuizzes ?? sectionQuizzesByLessonId[lesson.id] ?? [];
  const effectiveFinalQuiz = lesson.finalQuiz ?? finalQuizzesByLessonId[lesson.id];
  const legacyEndQuiz = lesson.quiz && !effectiveFinalQuiz ? lesson.quiz : undefined;
  const activeSectionQuiz = useMemo(
    () => sectionQuizzes.find((q) => q.id === activeSectionQuizId) ?? null,
    [sectionQuizzes, activeSectionQuizId],
  );

  const isProblemSolvingFrq = lesson.problemSolvingNumber != null;
  const frqImplementationWorkspaceGuide = useMemo(
    () =>
      isProblemSolvingFrq &&
      frqWorkspaceOpen &&
      lesson.algorithmDesign?.implementationStartStepIndex != null &&
      boundedStepIndex >= lesson.algorithmDesign.implementationStartStepIndex,
    [
      isProblemSolvingFrq,
      frqWorkspaceOpen,
      lesson.algorithmDesign?.implementationStartStepIndex,
      boundedStepIndex,
    ],
  );

  /** FRQ implementation workspace: editor + flow use reference-complete source when provided. */
  const codeSourceLesson = useMemo((): Lesson => {
    if (
      lesson.problemSolvingNumber == null ||
      !frqWorkspaceOpen ||
      lesson.algorithmDesign?.implementationStartStepIndex == null ||
      boundedStepIndex < lesson.algorithmDesign.implementationStartStepIndex ||
      !lesson.implementationWorkspaceCode?.trim()
    ) {
      return lesson;
    }
    return { ...lesson, code: lesson.implementationWorkspaceCode };
  }, [
    lesson,
    frqWorkspaceOpen,
    boundedStepIndex,
    lesson.problemSolvingNumber,
    lesson.algorithmDesign?.implementationStartStepIndex,
    lesson.implementationWorkspaceCode,
  ]);

  const primaryLessonCode = useMemo(() => getPrimaryLessonCode(codeSourceLesson), [codeSourceLesson]);
  const hierarchySourceFallback = lesson.files?.length ? undefined : primaryLessonCode;
  const hierarchyRows = useMemo(
    () => buildHierarchyRows(lesson.classHierarchy, lesson.files, hierarchySourceFallback),
    [lesson.classHierarchy, lesson.files, hierarchySourceFallback],
  );
  const hasClassHierarchy = hierarchyRows.length > 0;
  const usesImplementationWorkspaceCode = codeSourceLesson !== lesson;

  const effectiveParameterPassing = useMemo(
    () => getEffectiveParameterPassing(codeSourceLesson, step),
    [codeSourceLesson, step],
  );

  const apExamFrqSheet = lesson.apExamFrqSheet;
  const showApExamFrqPanel = isProblemSolvingFrq && apExamFrqSheet != null;

  const frqStubImplementationWalkthrough = useMemo(() => {
    if (lesson.problemSolvingNumber == null || lesson.algorithmDesign == null) return false;
    const impl = lesson.algorithmDesign.implementationStartStepIndex;
    return lesson.steps.slice(impl).every((s) => s.codeLine < 0);
  }, [lesson]);

  const algorithmicThinkingUi = useMemo(() => {
    const meta = lesson.algorithmDesign;
    if (meta == null || meta.phaseStarts.length === 0) return null;
    const impl = meta.implementationStartStepIndex;
    const phaseRanges = buildDesignPhaseRanges(meta, impl);
    if (phaseRanges == null || phaseRanges.length === 0) return null;
    const { phaseIndex: currentPhaseRangeIndex, range: cr, withinPhaseDisplay, withinPhaseTotal } =
      phaseContextForStep(phaseRanges, boundedStepIndex);
    const inDesignPhase = boundedStepIndex < impl;
    const codeStepTotal = Math.max(0, lesson.steps.length - impl);
    return {
      implStart: impl,
      phaseRanges,
      currentPhaseRangeIndex,
      currentPhaseLabel: cr.label,
      withinPhaseDisplay,
      withinPhaseTotal,
      inDesignPhase,
      designStepTotal: impl,
      designStepDisplay: inDesignPhase ? boundedStepIndex + 1 : impl,
      codeStepTotal,
      codeStepDisplay: !inDesignPhase && codeStepTotal > 0 ? boundedStepIndex - impl + 1 : 0,
    };
  }, [lesson.algorithmDesign, lesson.steps.length, boundedStepIndex]);

  useEffect(() => {
    if (algorithmicThinkingUi == null) {
      setMobileStudioTab('code');
      return;
    }
    setMobileStudioTab(algorithmicThinkingUi.inDesignPhase ? 'walkthrough' : 'code');
  }, [lesson.id, algorithmicThinkingUi]);

  useEffect(() => {
    setMobileStandardVizTab('lesson');
  }, [lesson.id]);

  const frqFocusLayout =
    showApExamFrqPanel && !frqWorkspaceOpen && algorithmicThinkingUi != null;

  const pendingSectionQuizzes = useMemo(
    () => sectionQuizzes.filter((q) => !completedSectionQuizIds.has(q.id)),
    [sectionQuizzes, completedSectionQuizIds],
  );
  const hasFlowContext = useMemo(
    () => lessonUsesControlConstructs(primaryLessonCode) && lessonHasSteppedExecutionTrace(lesson),
    [primaryLessonCode, lesson],
  );
  const hasRecursionContext = useMemo(() => lessonHasRecursionPanel(lesson), [lesson]);
  const hasArrayTraceLesson = useMemo(
    () => lesson.steps.some((s) => s.arrayTrace != null),
    [lesson],
  );

  /** Avoid empty Array view on steps that omit arrayTrace; reuse the latest prior snapshot. */
  const effectiveArrayTrace = useMemo(() => {
    if (step.arrayTrace != null) return step.arrayTrace;
    if (!hasArrayTraceLesson) return undefined;
    for (let i = boundedStepIndex - 1; i >= 0; i--) {
      const prev = lesson.steps[i]?.arrayTrace;
      if (prev != null) return prev;
    }
    return undefined;
  }, [step.arrayTrace, hasArrayTraceLesson, boundedStepIndex, lesson.steps]);

  /** FRQ workspace: design lives in Problem/Solution; workspace is implementation-only (step clamped ≥ impl). */
  const frqInWorkspace = isProblemSolvingFrq && frqWorkspaceOpen;
  const frqImplStartForPanels = lesson.algorithmDesign?.implementationStartStepIndex;
  const frqDesignInWorkspace =
    frqInWorkspace && frqImplStartForPanels != null && boundedStepIndex < frqImplStartForPanels;

  type DiagramPanelKey = 'memory' | 'hierarchy' | 'parameters' | 'flow' | 'recursion' | 'arrayView';

  const visibleDiagramPanels = useMemo((): DiagramPanelKey[] => {
    const keys: DiagramPanelKey[] = [];
    if (panelVisibility.memory && !frqDesignInWorkspace) keys.push('memory');
    if (panelVisibility.arrayView && hasArrayTraceLesson) keys.push('arrayView');
    if (panelVisibility.hierarchy && hasClassHierarchy && !frqDesignInWorkspace) keys.push('hierarchy');
    if (panelVisibility.parameters && hasParameterLessonOpportunity) keys.push('parameters');
    if (panelVisibility.flow && hasFlowContext) keys.push('flow');
    if (panelVisibility.recursion && hasRecursionContext) keys.push('recursion');
    return keys;
  }, [
    panelVisibility.memory,
    panelVisibility.arrayView,
    panelVisibility.hierarchy,
    panelVisibility.parameters,
    hasParameterLessonOpportunity,
    panelVisibility.flow,
    panelVisibility.recursion,
    hasArrayTraceLesson,
    hasClassHierarchy,
    hasFlowContext,
    hasRecursionContext,
    frqDesignInWorkspace,
  ]);

  /** Panels this lesson can show — drives mobile full-screen tabs (replaces cramped Show row below lg). */
  const standardMobileDiagramCandidates = useMemo(() => {
    const out: { key: LessonDiagramPanelKey; short: string }[] = [];
    if (!frqDesignInWorkspace) out.push({ key: 'memory', short: 'Memory' });
    if (hasArrayTraceLesson) out.push({ key: 'arrayView', short: 'Array' });
    if (hasParameterLessonOpportunity) out.push({ key: 'parameters', short: 'Params' });
    if (hasFlowContext) out.push({ key: 'flow', short: 'Flow' });
    if (hasRecursionContext) out.push({ key: 'recursion', short: 'Recursion' });
    if (hasClassHierarchy && !frqDesignInWorkspace) out.push({ key: 'hierarchy', short: 'Classes' });
    return out;
  }, [
    frqDesignInWorkspace,
    hasArrayTraceLesson,
    hasParameterLessonOpportunity,
    hasFlowContext,
    hasRecursionContext,
    hasClassHierarchy,
  ]);

  /** Design phase: stack diagrams with array (or the sole panel) taking most vertical space — no tabs. */
  const designPhaseDiagramOrder: DiagramPanelKey[] = [
    'arrayView',
    'memory',
    'flow',
    'parameters',
    'recursion',
    'hierarchy',
  ];
  const designPhaseOrderedPanels = useMemo(
    () => designPhaseDiagramOrder.filter((k) => visibleDiagramPanels.includes(k)),
    [visibleDiagramPanels],
  );
  const designPhasePrimaryPanel = useMemo((): DiagramPanelKey | null => {
    if (designPhaseOrderedPanels.length === 0) return null;
    if (designPhaseOrderedPanels.includes('arrayView')) return 'arrayView';
    return designPhaseOrderedPanels[0];
  }, [designPhaseOrderedPanels]);

  const wrapDiagramArea = useCallback(
    (node: React.ReactNode) => {
      const mobileCompactDiagramChrome =
        visibleDiagramPanels.length === 0 && algorithmicThinkingUi?.inDesignPhase === true;
      const diagramAreaClass = 'flex min-h-0 flex-1 flex-col overflow-hidden';
      return algorithmicThinkingUi?.inDesignPhase ? (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className={cn(
            diagramAreaClass,
            'h-full',
            mobileCompactDiagramChrome && 'max-lg:flex-none max-lg:h-auto max-lg:min-h-0 max-lg:shrink-0',
          )}
        >
          {node}
        </motion.div>
      ) : (
        <div className={diagramAreaClass}>{node}</div>
      );
    },
    [algorithmicThinkingUi?.inDesignPhase, step.id, visibleDiagramPanels.length],
  );

  const [diagramFocus, setDiagramFocus] = useState<DiagramPanelKey>('memory');
  const quizExplainConcept = useMemo<Concept | null>(() => {
    if (!quizExplainLines || quizExplainLines.length === 0) return null;
    if (lesson.files?.length) {
      const file = quizExplainFile ?? step.activeFile ?? lesson.files[0].name;
      return {
        id: 'section-quiz-explain',
        name: 'Section quiz explanation',
        description: 'Highlighted lines from section quiz explanation',
        files: [{ name: file, lines: quizExplainLines }],
      };
    }
    return {
      id: 'section-quiz-explain',
      name: 'Section quiz explanation',
      description: 'Highlighted lines from section quiz explanation',
      lines: quizExplainLines,
    };
  }, [quizExplainLines, quizExplainFile, lesson.files, step.activeFile]);

  useEffect(() => {
    if (visibleDiagramPanels.length === 0) return;
    if (!visibleDiagramPanels.includes(diagramFocus)) {
      setDiagramFocus(visibleDiagramPanels[0]);
    }
  }, [visibleDiagramPanels, diagramFocus]);

  const tilePanelOrder = useMemo(() => {
    const order: DiagramPanelKey[] = ['memory', 'arrayView', 'parameters', 'flow', 'recursion', 'hierarchy'];
    return order.filter((k) => visibleDiagramPanels.includes(k));
  }, [visibleDiagramPanels]);

  const renderDiagramPanel = useCallback(
    (k: DiagramPanelKey) => {
      switch (k) {
        case 'memory':
          return (
            <div
              className={cn(
                'flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-slate-900 min-h-[12rem] max-lg:min-h-[min(42dvh,22rem)]',
                memoryPanelBorderAccent === 'violet' && 'border-violet-300 dark:border-violet-700',
                memoryPanelBorderAccent === 'amber' && 'border-amber-300 dark:border-amber-700',
                memoryPanelBorderAccent === 'sky' && 'border-sky-300 dark:border-sky-700',
                memoryPanelBorderAccent == null && 'border-slate-200 dark:border-slate-800',
              )}
            >
              <MemoryVisualizer state={memoryState} caption={memoryDiagramCaption} />
            </div>
          );
        case 'hierarchy':
          return (
            <ClassHierarchyPanel
              classHierarchy={lesson.classHierarchy}
              files={lesson.files}
              sourceCodeFallback={hierarchySourceFallback}
              embedded
            />
          );
        case 'parameters':
          return <ParameterPassingPanel data={effectiveParameterPassing} embedded />;
        case 'flow':
          return <FlowPanel lesson={codeSourceLesson} currentStepIndex={boundedStepIndex} embedded />;
        case 'recursion':
          return (
            <RecursionPanel
              lesson={codeSourceLesson}
              currentStepIndex={boundedStepIndex}
              memoryState={memoryState}
              embedded
            />
          );
        case 'arrayView':
          return (
            <div className="flex min-h-0 h-full min-w-0 flex-col overflow-hidden">
              <ArrayTracePanel
                trace={effectiveArrayTrace}
                compact={algorithmicThinkingUi?.inDesignPhase === true}
              />
            </div>
          );
        default:
          return null;
      }
    },
    [
      memoryState,
      memoryDiagramCaption,
      memoryPanelBorderAccent,
      lesson,
      codeSourceLesson,
      effectiveParameterPassing,
      boundedStepIndex,
      effectiveArrayTrace,
      algorithmicThinkingUi?.inDesignPhase,
      hierarchySourceFallback,
    ],
  );

  const openEditorFile = useCallback((file: string, scrollLine?: number) => {
    setFileTabRequest((prev) => ({
      file,
      key: (prev?.key ?? 0) + 1,
      ...(scrollLine !== undefined ? { line: scrollLine } : {}),
    }));
  }, []);

  const handleFormatToCustom = useCallback(async () => {
    setFormatError('');
    setFormatNotice('');
    try {
      let raw: string;
      if (lesson.files?.length) {
        const pick = editorTabRef.current ?? step.activeFile ?? lesson.files[0].name;
        const file = lesson.files.find((f) => f.name === pick) ?? lesson.files[0];
        raw = file.code;
      } else {
        raw = getPrimaryLessonCode(codeSourceLesson);
      }
      const formatted = await formatJavaCode(raw);
      if (onReplaceCustomLessonCode && lesson.id.startsWith('custom-') && !lesson.files?.length) {
        onReplaceCustomLessonCode(lesson.id, formatted);
        setFormatNotice('Reformatted — steps were rebuilt from the new source.');
        window.setTimeout(() => setFormatNotice(''), 5000);
      } else {
        onEditLesson(formatted);
      }
    } catch (e) {
      setFormatError(e instanceof Error ? e.message : 'Could not format this file.');
    }
  }, [
    lesson.files,
    lesson.code,
    lesson.id,
    step.activeFile,
    codeSourceLesson,
    onEditLesson,
    onReplaceCustomLessonCode,
  ]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setActiveSectionQuizId(null);
    setQuizExplainLines(null);
    setQuizExplainFile(null);
    setActiveConcept(null);
    setFileTabRequest(null);
    editorTabRef.current = null;
    setFormatError('');
    setFormatNotice('');
    setFrqWorkspaceOpen(false);
    const code = getPrimaryLessonCode(lesson);
    const arr = lesson.steps.some((s) => s.arrayTrace != null);
    const trace = inferLessonRecursionTrace(lesson);
    const algoThink = lesson.algorithmDesign != null;
    if (algoThink && arr) {
      setPanelVisibility({
        memory: false,
        parameters: false,
        hierarchy: false,
        flow: false,
        recursion: false,
        arrayView: true,
      });
      setDiagramFocus('arrayView');
    } else if (lesson.problemSolvingNumber != null) {
      setPanelVisibility({
        memory: false,
        parameters: false,
        hierarchy: false,
        flow: false,
        recursion: false,
        arrayView: false,
      });
      setDiagramFocus('memory');
    } else {
      setPanelVisibility({
        memory: true,
        parameters: lessonHasParameterPassingOpportunity(lesson),
        hierarchy: true,
        flow: lessonUsesControlConstructs(code),
        recursion: lessonHasRecursionPanel(lesson),
        arrayView: arr,
      });
      setDiagramFocus(
        trace?.traceKind === 'generic'
          ? 'recursion'
          : arr
            ? 'arrayView'
            : 'memory',
      );
    }
    setDiagramPanelLayout('tabs');
  }, [lesson.id]);

  /**
   * Problem/Solving FRQ: the walkthrough design steps duplicate the Problem & Solution sheet; the workspace is for stepping
   * reference code with diagrams — clamp to the first implementation step whenever the workspace is open.
   */
  useLayoutEffect(() => {
    if (lesson.problemSolvingNumber == null || !frqWorkspaceOpen) return;
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    if (impl == null) return;
    if (boundedStepIndex < impl) {
      setCurrentStepIndex(impl);
    }
  }, [
    lesson.problemSolvingNumber,
    frqWorkspaceOpen,
    lesson.algorithmDesign?.implementationStartStepIndex,
    boundedStepIndex,
    lesson.id,
  ]);

  /**
   * Algorithmic thinking: design phase shows only Array view when the lesson has traces (memory/flow return in implementation).
   */
  useEffect(() => {
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    if (impl == null) return;
    if (lesson.problemSolvingNumber != null && !frqWorkspaceOpen) {
      setPanelVisibility({
        memory: false,
        parameters: false,
        hierarchy: false,
        flow: false,
        recursion: false,
        arrayView: false,
      });
      return;
    }
    const hasFlow = lessonUsesControlConstructs(primaryLessonCode);
    const arr = lesson.steps.some((s) => s.arrayTrace != null);
    if (boundedStepIndex < impl) {
      if (arr) {
        setPanelVisibility({
          memory: false,
          parameters: false,
          hierarchy: false,
          flow: false,
          recursion: false,
          arrayView: true,
        });
        setDiagramFocus('arrayView');
      } else {
        const frqWsDesign = lesson.problemSolvingNumber != null && frqWorkspaceOpen;
        setPanelVisibility({
          memory: !frqWsDesign,
          parameters: lessonHasParameterPassingOpportunity(lesson),
          hierarchy: !frqWsDesign,
          flow: hasFlow,
          recursion: lessonHasRecursionPanel(lesson),
          arrayView: false,
        });
        setDiagramFocus(
          frqWsDesign
            ? hasFlow
              ? 'flow'
              : lessonHasParameterPassingOpportunity(lesson)
                ? 'parameters'
                : lessonHasRecursionPanel(lesson)
                  ? 'recursion'
                  : 'flow'
            : 'memory',
        );
      }
    } else {
      setPanelVisibility({
        memory: !frqDesignInWorkspace,
        parameters: lessonHasParameterPassingOpportunity(lesson),
        hierarchy: true,
        flow: hasFlow,
        recursion: lessonHasRecursionPanel(lesson),
        arrayView: arr,
      });
      setDiagramPanelLayout('tabs');
      if (boundedStepIndex === impl) {
        setDiagramFocus(
          frqInWorkspace
            ? arr
              ? 'arrayView'
              : 'hierarchy'
            : 'memory',
        );
      }
    }
  }, [
    boundedStepIndex,
    frqWorkspaceOpen,
    lesson.algorithmDesign?.implementationStartStepIndex,
    lesson.id,
    lesson.problemSolvingNumber,
    lesson.steps,
    primaryLessonCode,
    frqInWorkspace,
    frqDesignInWorkspace,
  ]);

  /** AP CS A Problems (FRQ): restore diagrams when opening the implementation workspace (design phase: algorithm effect sets panels; skip here). */
  useEffect(() => {
    if (lesson.problemSolvingNumber == null || !frqWorkspaceOpen) return;
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    if (impl != null && boundedStepIndex < impl) return;
    const arr = lesson.steps.some((s) => s.arrayTrace != null);
    const trace = inferLessonRecursionTrace(lesson);
    setPanelVisibility({
      memory: true,
      parameters: lessonHasParameterPassingOpportunity(lesson),
      hierarchy: true,
      flow: lessonUsesControlConstructs(primaryLessonCode),
      recursion: lessonHasRecursionPanel(lesson),
      arrayView: arr,
    });
    setDiagramFocus(trace?.traceKind === 'generic' ? 'recursion' : arr ? 'arrayView' : 'hierarchy');
    setDiagramPanelLayout('tabs');
  }, [
    frqWorkspaceOpen,
    lesson.problemSolvingNumber,
    lesson.steps,
    primaryLessonCode,
    boundedStepIndex,
    lesson.algorithmDesign?.implementationStartStepIndex,
  ]);

  /** FRQ implementation workspace: diagrams stay tabbed — tile stacks too much vertical space. */
  useEffect(() => {
    if (!frqImplementationWorkspaceGuide) return;
    if (diagramPanelLayout !== 'tabs') setDiagramPanelLayout('tabs');
  }, [frqImplementationWorkspaceGuide, diagramPanelLayout]);

  /** FRQ: concept-linked memory applies only on implementation steps; clear when stepping back to design/solution. */
  useEffect(() => {
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    if (lesson.problemSolvingNumber == null || impl == null) return;
    if (boundedStepIndex < impl) setActiveConcept(null);
  }, [boundedStepIndex, lesson.algorithmDesign?.implementationStartStepIndex, lesson.problemSolvingNumber]);

  /** Same custom lesson after Format: rebuild steps; refresh panel relevance. Must not re-enable Flow during design (array-only). */
  useEffect(() => {
    setCurrentStepIndex(0);
    const code = getPrimaryLessonCode(lesson);
    const arr = lesson.steps.some((s) => s.arrayTrace != null);
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    if (lesson.algorithmDesign != null && impl != null && impl > 0) {
      if (lesson.problemSolvingNumber != null && !frqWorkspaceOpen) {
        setPanelVisibility({
          memory: false,
          parameters: false,
          hierarchy: false,
          flow: false,
          recursion: false,
          arrayView: false,
        });
        setDiagramFocus('memory');
      } else if (arr) {
        setPanelVisibility({
          memory: false,
          parameters: false,
          hierarchy: false,
          flow: false,
          recursion: false,
          arrayView: true,
        });
        setDiagramFocus('arrayView');
      } else {
        setPanelVisibility({
          memory: true,
          parameters: lessonHasParameterPassingOpportunity(lesson),
          hierarchy: true,
          flow: lessonUsesControlConstructs(code),
          recursion: lessonHasRecursionPanel(lesson),
          arrayView: false,
        });
        setDiagramFocus('memory');
      }
    } else {
      setPanelVisibility((p) => ({
        ...p,
        flow: lessonUsesControlConstructs(code),
        recursion: lessonHasRecursionPanel(lesson),
        arrayView: arr,
        parameters: lessonHasParameterPassingOpportunity(lesson),
      }));
    }
    setDiagramPanelLayout('tabs');
  }, [lesson.code, lesson, frqWorkspaceOpen]);

  const handleNext = () => {
    setQuizExplainLines(null);
    setQuizExplainFile(null);
    const impl = lesson.algorithmDesign?.implementationStartStepIndex;
    if (impl != null) {
      if (boundedStepIndex < impl) {
        if (boundedStepIndex < impl - 1) setCurrentStepIndex(boundedStepIndex + 1);
        else setCurrentStepIndex(impl);
        return;
      }
      if (boundedStepIndex < lesson.steps.length - 1) setCurrentStepIndex(boundedStepIndex + 1);
      return;
    }
    if (boundedStepIndex < lesson.steps.length - 1) setCurrentStepIndex(boundedStepIndex + 1);
  };

  const handlePrev = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (activeSectionQuizId) {
      setActiveSectionQuizId(null);
    } else {
      setQuizExplainLines(null);
      setQuizExplainFile(null);
      const impl = lesson.algorithmDesign?.implementationStartStepIndex;
      if (impl != null) {
        if (boundedStepIndex < impl) {
          if (boundedStepIndex > 0) setCurrentStepIndex(boundedStepIndex - 1);
          return;
        }
        if (boundedStepIndex > impl) setCurrentStepIndex(boundedStepIndex - 1);
        else if (boundedStepIndex === impl) setCurrentStepIndex(impl - 1);
        return;
      }
      if (boundedStepIndex > 0) setCurrentStepIndex(boundedStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setShowQuiz(false);
    setActiveSectionQuizId(null);
    setQuizExplainLines(null);
    setQuizExplainFile(null);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const handleAnswerSubmit = (index: number) => {
    if (!legacyEndQuiz || isQuizCompleted || isAnswerCorrect) return;

    setSelectedAnswer(index);
    const correct = index === legacyEndQuiz.correctAnswer;
    setIsAnswerCorrect(correct);

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      onQuizComplete(legacyEndQuiz.id, legacyEndQuiz.points);
    }
  };

  const implementationStepNavigation =
    algorithmicThinkingUi && !algorithmicThinkingUi.inDesignPhase && !frqStubImplementationWalkthrough ? (
      <div
        className="flex shrink-0 items-center gap-1 rounded-xl border-2 border-teal-500/35 bg-teal-50/90 p-1 shadow-md shadow-teal-900/10 ring-1 ring-teal-500/15 dark:border-teal-400/40 dark:bg-teal-950/50 dark:shadow-black/30 dark:ring-teal-400/20"
        role="group"
        aria-label="Java implementation walkthrough — previous or next executed line"
      >
        <button
          type="button"
          onClick={handlePrev}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-teal-900 transition-colors hover:bg-white/90 active:bg-white dark:text-teal-100 dark:hover:bg-teal-900/80 dark:active:bg-teal-900"
          title="Previous code step"
          aria-label="Previous code step"
        >
          <ChevronLeft size={28} strokeWidth={2.5} className="shrink-0" />
        </button>
        <span className="min-w-[3.75rem] px-2 text-center font-mono text-sm font-extrabold tabular-nums tracking-tight text-teal-950 dark:text-teal-50">
          {algorithmicThinkingUi.codeStepDisplay}/{algorithmicThinkingUi.codeStepTotal}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={boundedStepIndex === lesson.steps.length - 1}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm transition-colors hover:bg-teal-500 active:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
          title="Next code step"
          aria-label="Next code step"
        >
          <ChevronRight size={28} strokeWidth={2.75} className="shrink-0" />
        </button>
      </div>
    ) : (
      <div
        className="flex shrink-0 items-center gap-1 rounded-xl border-2 border-teal-500/35 bg-teal-50/90 p-1 shadow-md shadow-teal-900/10 ring-1 ring-teal-500/15 dark:border-teal-400/40 dark:bg-teal-950/50 dark:shadow-black/30 dark:ring-teal-400/20"
        role="group"
        aria-label="Lesson steps"
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={boundedStepIndex === 0}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-teal-900 transition-colors hover:bg-white/90 active:bg-white disabled:cursor-not-allowed disabled:opacity-35 dark:text-teal-100 dark:hover:bg-teal-900/80 dark:active:bg-teal-900"
          title="Previous step"
          aria-label="Previous step"
        >
          <ChevronLeft size={28} strokeWidth={2.5} className="shrink-0" />
        </button>
        <span className="min-w-[3.75rem] px-2 text-center font-mono text-sm font-extrabold tabular-nums tracking-tight text-teal-950 dark:text-teal-50">
          {boundedStepIndex + 1}/{lesson.steps.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={boundedStepIndex === lesson.steps.length - 1}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm transition-colors hover:bg-teal-500 active:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
          title="Next step"
          aria-label="Next step"
        >
          <ChevronRight size={28} strokeWidth={2.75} className="shrink-0" />
        </button>
      </div>
    );

  const useStdMobileFullBleed =
    algorithmicThinkingUi == null &&
    !frqFocusLayout &&
    standardMobileDiagramCandidates.length > 0 &&
    mobileStandardVizTab !== 'lesson';

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-4 overflow-hidden bg-slate-100 p-3 dark:bg-slate-950 lg:gap-6 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <div className="min-w-0">
          <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
            {lesson.chapter}
          </h2>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white lg:text-3xl">
            {lesson.title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:justify-end">
          {sectionQuizzes.length > 0 && (
            <details ref={sectionQuizMenuRef} className="relative group">
              <summary className="cursor-pointer list-none rounded-lg border border-teal-300 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 transition-colors hover:bg-teal-100 dark:border-teal-800 dark:bg-teal-900/35 dark:text-teal-200 dark:hover:bg-teal-900/50 [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-1.5">
                  Practice checks
                  <span className="rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-[10px] text-teal-900 dark:bg-teal-950/60 dark:text-teal-100">
                    {pendingSectionQuizzes.length}/{sectionQuizzes.length} pending
                  </span>
                </span>
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-4rem))] rounded-xl border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <p className="border-b border-slate-100 px-3 pb-2 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  All section quizzes for this lesson
                </p>
                <ul className="max-h-64 overflow-y-auto py-1">
                  {sectionQuizzes.map((sq) => {
                    const done = completedSectionQuizIds.has(sq.id);
                    return (
                      <li
                        key={sq.id}
                        className="flex flex-col gap-1.5 border-b border-slate-50 px-3 py-2 last:border-b-0 dark:border-slate-800/80"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="min-w-0 text-xs font-semibold leading-snug text-slate-800 dark:text-slate-100">
                            {done ? '✓ ' : ''}
                            {sq.title}
                          </span>
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              done
                                ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300'
                                : 'bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
                            }`}
                          >
                            {done ? 'Done' : 'Pending'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentStepIndex(
                                Math.max(0, Math.min(sq.checkpointStepIndex, lesson.steps.length - 1)),
                              );
                              setQuizExplainLines(null);
                              setQuizExplainFile(null);
                              sectionQuizMenuRef.current?.removeAttribute('open');
                            }}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            Go to step {sq.checkpointStepIndex + 1}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSectionQuizId(sq.id);
                              sectionQuizMenuRef.current?.removeAttribute('open');
                            }}
                            className="rounded-md border border-teal-400/60 bg-teal-600 px-2 py-1 text-[10px] font-bold text-white hover:bg-teal-500"
                          >
                            Open quiz
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </details>
          )}
          {effectiveFinalQuiz && (
            <button
              type="button"
              onClick={() => setShowQuiz(true)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                isQuizCompleted
                  ? 'border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  : 'border-amber-400/70 bg-amber-50 text-amber-950 hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-950/55'
              }`}
              title="Open end-of-lesson review (optional)"
            >
              Lesson review{isQuizCompleted ? ' ✓' : ''}
            </button>
          )}
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            title="Reset Lesson"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {activeSectionQuiz && (
        <SectionQuizPanel
          lesson={lesson}
          quiz={activeSectionQuiz}
          variant="section"
          checkpointStepIndex={activeSectionQuiz.checkpointStepIndex}
          alreadyCompleted={completedSectionQuizIds.has(activeSectionQuiz.id)}
          onBackToLesson={() => setActiveSectionQuizId(null)}
          onJumpToStep={(stepIndex, lines) => {
            setCurrentStepIndex(Math.max(0, Math.min(stepIndex, lesson.steps.length - 1)));
            setQuizExplainLines(lines ?? null);
            setQuizExplainFile(lesson.steps[stepIndex]?.activeFile ?? null);
            setActiveSectionQuizId(null);
          }}
          onOpenChapterHub={
            onOpenChapterHub ? (chapter) => onOpenChapterHub(chapterQuizNavId(chapter)) : undefined
          }
          onComplete={(quizId, pointsEarned) => {
            onSectionQuizComplete(quizId, pointsEarned);
            setActiveSectionQuizId(null);
          }}
        />
      )}
      {!activeSectionQuiz && showQuiz && effectiveFinalQuiz ? (
        <motion.div
          key={`${lesson.id}-final-quiz`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-0 flex-1 flex-col items-stretch overflow-y-auto overscroll-contain"
        >
          <SectionQuizPanel
            lesson={lesson}
            quiz={effectiveFinalQuiz}
            variant="final"
            alreadyCompleted={isQuizCompleted}
            onBackToLesson={() => setShowQuiz(false)}
            onJumpToStep={(stepIndex, lines) => {
              setCurrentStepIndex(Math.max(0, Math.min(stepIndex, lesson.steps.length - 1)));
              setQuizExplainLines(lines ?? null);
              setQuizExplainFile(lesson.steps[stepIndex]?.activeFile ?? null);
              setShowQuiz(false);
            }}
            onOpenChapterHub={
              onOpenChapterHub ? (chapter) => onOpenChapterHub(chapterQuizNavId(chapter)) : undefined
            }
            onComplete={(quizId, pointsEarned) => {
              onQuizComplete(quizId, pointsEarned);
              if (pointsEarned > 0) {
                confetti({ particleCount: 90, spread: 68, origin: { y: 0.62 } });
              }
            }}
          />
        </motion.div>
      ) : !activeSectionQuiz && showQuiz && legacyEndQuiz ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 min-h-0 flex flex-col items-stretch overflow-y-auto overscroll-contain"
        >
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl mx-auto mb-6 shrink-0">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <button
                  onClick={handlePrev}
                  className="shrink-0 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Back to Lesson"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="truncate text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                  Knowledge Check
                </h2>
              </div>
              <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-900/35 dark:text-amber-400">
                {legacyEndQuiz.points} Points
              </span>
            </div>

            <p className="mb-5 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 sm:text-[15px]">
              {legacyEndQuiz.question}
            </p>

            <div className="space-y-2.5">
              {legacyEndQuiz.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === legacyEndQuiz.correctAnswer;
                const showStatus = isSelected || (isAnswerCorrect !== null && isCorrect);
                
                let buttonClass =
                  'w-full rounded-xl border-2 px-3.5 py-2.5 text-left text-sm font-medium leading-snug transition-all duration-200 flex items-center justify-between gap-3 sm:text-[15px] ';
                
                if (showStatus) {
                  if (isCorrect) {
                    buttonClass += "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400";
                  } else if (isSelected) {
                    buttonClass += "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400";
                  }
                } else {
                  buttonClass += "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSubmit(idx)}
                    disabled={isAnswerCorrect === true || isQuizCompleted}
                    className={buttonClass}
                  >
                    <span>{option}</span>
                    {showStatus && isCorrect && <CheckCircle2 className="size-5 shrink-0 text-green-500" />}
                    {showStatus && !isCorrect && isSelected && <XCircle className="size-5 shrink-0 text-red-500" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {(isAnswerCorrect !== null || isQuizCompleted) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-5"
                >
                  <div
                    className={`rounded-xl p-4 text-sm leading-relaxed sm:text-[15px] ${
                      isAnswerCorrect || isQuizCompleted
                        ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200'
                        : 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200'
                    }`}
                  >
                    <h3
                      className={`mb-1.5 text-xs font-bold uppercase tracking-wide ${
                        isAnswerCorrect || isQuizCompleted
                          ? 'text-green-950/80 dark:text-green-100/90'
                          : 'text-red-950/80 dark:text-red-100/90'
                      }`}
                    >
                      {isAnswerCorrect || isQuizCompleted ? 'Correct' : 'Not quite'}
                    </h3>
                    <p className="whitespace-pre-wrap opacity-95">{legacyEndQuiz.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : !activeSectionQuiz ? (
        <>
          {frqFocusLayout && apExamFrqSheet ? (
            <FrqProblemSolutionFocus
              lesson={lesson}
              sheet={apExamFrqSheet}
              implStart={algorithmicThinkingUi!.implStart}
              boundedStepIndex={boundedStepIndex}
              onStepIndexChange={setCurrentStepIndex}
              onOpenImplementationWorkspace={() => {
                setFrqWorkspaceOpen(true);
                setCurrentStepIndex(algorithmicThinkingUi!.implStart);
              }}
            />
          ) : (
            <div
              className={cn(
                'flex min-h-0 min-w-0 flex-1 flex-col gap-2',
                algorithmicThinkingUi == null && !frqFocusLayout
                  ? 'overflow-y-auto overscroll-y-contain lg:overflow-hidden'
                  : 'overflow-hidden',
              )}
            >
              {frqWorkspaceOpen && showApExamFrqPanel ? (
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFrqWorkspaceOpen(false);
                      setCurrentStepIndex(0);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-2.5 py-2 text-[11px] font-bold text-sky-900 transition-colors hover:bg-sky-100 sm:px-3 sm:text-xs dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-100 dark:hover:bg-sky-900/40"
                  >
                    <ArrowLeft size={16} className="shrink-0" aria-hidden />
                    <span className="hidden sm:inline">Problem & solution view</span>
                    <span className="sm:hidden">Problem view</span>
                  </button>
                </div>
              ) : null}
              {algorithmicThinkingUi == null &&
              !frqFocusLayout &&
              standardMobileDiagramCandidates.length > 0 ? (
                <div
                  className="-mx-0.5 flex shrink-0 gap-1 overflow-x-auto overflow-y-hidden overscroll-x-contain px-0.5 pb-1 [scrollbar-width:thin] lg:hidden"
                  role="tablist"
                  aria-label="Lesson — switch between steps and full-screen diagrams"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mobileStandardVizTab === 'lesson'}
                    onClick={() => setMobileStandardVizTab('lesson')}
                    className={cn(
                      'flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors',
                      mobileStandardVizTab === 'lesson'
                        ? 'bg-teal-600 text-white shadow-sm dark:bg-teal-600'
                        : 'border border-slate-200 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300',
                    )}
                  >
                    <BookOpen size={14} className="shrink-0 opacity-90" aria-hidden />
                    Lesson
                  </button>
                  {standardMobileDiagramCandidates.map(({ key, short }) => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={mobileStandardVizTab === key}
                      onClick={() => {
                        setMobileStandardVizTab(key);
                        setPanelVisibility((p) => ({ ...p, [key]: true }));
                        setDiagramFocus(key);
                      }}
                      className={cn(
                        'flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors',
                        mobileStandardVizTab === key
                          ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-600'
                          : 'border border-slate-200 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300',
                      )}
                    >
                      <LayoutPanelLeft size={14} className="shrink-0 opacity-80" aria-hidden />
                      {short}
                    </button>
                  ))}
                </div>
              ) : null}
              {algorithmicThinkingUi != null && !frqFocusLayout ? (
                <div
                  className="flex shrink-0 gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:hidden"
                  role="tablist"
                  aria-label="Lesson view — walkthrough, code, or diagrams"
                >
                  {algorithmicThinkingUi.inDesignPhase ? (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mobileStudioTab === 'walkthrough'}
                      onClick={() => setMobileStudioTab('walkthrough')}
                      className={cn(
                        'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors',
                        mobileStudioTab === 'walkthrough'
                          ? 'bg-violet-600 text-white shadow-sm dark:bg-violet-600'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                      )}
                    >
                      <DraftingCompass size={14} className="shrink-0 opacity-90" aria-hidden />
                      Walkthrough
                    </button>
                  ) : null}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mobileStudioTab === 'code'}
                    onClick={() => setMobileStudioTab('code')}
                    className={cn(
                      'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors',
                      mobileStudioTab === 'code'
                        ? 'bg-teal-600 text-white shadow-sm dark:bg-teal-600'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                    )}
                  >
                    <Code2 size={14} className="shrink-0 opacity-90" aria-hidden />
                    Code
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mobileStudioTab === 'diagrams'}
                    onClick={() => setMobileStudioTab('diagrams')}
                    className={cn(
                      'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors',
                      mobileStudioTab === 'diagrams'
                        ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-600'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                    )}
                  >
                    <LayoutList size={14} className="shrink-0 opacity-90" aria-hidden />
                    Diagrams
                  </button>
                </div>
              ) : null}
              <div
                className={cn(
                  'grid min-h-0 min-w-0 flex-1 grid-cols-1 gap-3 max-lg:min-h-0 lg:gap-6 lg:grid-cols-2',
                  useStdMobileFullBleed && 'max-lg:min-h-[min(78dvh,40rem)]',
                  frqWorkspaceOpen &&
                    showApExamFrqPanel &&
                    'max-lg:min-h-[min(72dvh,32rem)]',
                  algorithmicThinkingUi != null &&
                    !frqFocusLayout &&
                    'max-lg:[grid-template-rows:minmax(0,1fr)]',
                )}
              >
          {/* Editor column: step narrative + controls sit directly above code (not full viewport width) */}
          <div
            className={cn(
              'flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden',
              algorithmicThinkingUi != null && !frqFocusLayout && 'max-lg:order-2',
              algorithmicThinkingUi != null &&
                !frqFocusLayout &&
                mobileStudioTab !== 'code' &&
                'hidden lg:flex',
              algorithmicThinkingUi == null &&
                !frqFocusLayout &&
                standardMobileDiagramCandidates.length > 0 &&
                mobileStandardVizTab !== 'lesson' &&
                'hidden lg:flex',
            )}
          >
            {!algorithmicThinkingUi?.inDesignPhase ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:gap-2.5 sm:px-3.5 sm:py-2.5"
                >
                  <div className="shrink-0 text-teal-500 dark:text-teal-400">
                    <Info size={18} className="sm:h-[22px] sm:w-[22px]" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <StepDescription
                      text={step.description}
                      className="text-xs font-medium text-slate-700 dark:text-slate-300 sm:text-[13px] [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:text-[12px] dark:[&_code]:bg-slate-800"
                    />
                    {!frqImplementationWorkspaceGuide ? (
                      <StepCodeExamples step={step} defaultVariant="teal" />
                    ) : null}
                    {step.fileLinks && step.fileLinks.length > 0 && lesson.files && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Open
                        </span>
                        {step.fileLinks.map((l) => (
                          <button
                            key={l.file}
                            type="button"
                            onClick={() => openEditorFile(l.file)}
                            className="rounded-md border border-teal-500/40 bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-500/20 dark:border-teal-400/35 dark:bg-teal-500/15 dark:text-teal-200 dark:hover:bg-teal-500/25"
                          >
                            {l.label ?? l.file}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {implementationStepNavigation}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="shrink-0 rounded-xl border border-violet-200/85 bg-gradient-to-r from-violet-50/90 to-indigo-50/40 px-3 py-2.5 dark:border-violet-900/50 dark:from-violet-950/40 dark:to-indigo-950/25">
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-violet-800 dark:text-violet-300">Design walkthrough</span>{' '}
                  <span className="hidden lg:inline">
                    (stages, explanation, diagrams, and stage controls) is in the{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">column on the right</span>. The
                    editor below shows the Java you will step through after the design phase.
                  </span>
                  <span className="lg:hidden">
                    Use the <span className="font-semibold text-slate-700 dark:text-slate-300">Walkthrough</span> tab for
                    stages and text; <span className="font-semibold text-slate-700 dark:text-slate-300">Code</span> for the
                    Java you will step after design; <span className="font-semibold text-slate-700 dark:text-slate-300">Diagrams</span> when a visualization is on.
                  </span>
                </p>
              </div>
            )}

            {lesson.concepts && lesson.concepts.length > 0 && (
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  <Lightbulb size={14} className="text-amber-500" />
                  Concepts
                </div>
                {lesson.concepts.map((concept) => (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => setActiveConcept(activeConcept?.id === concept.id ? null : concept)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      activeConcept?.id === concept.id
                        ? 'border-amber-600 bg-amber-500 text-white shadow-sm shadow-amber-500/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-amber-400'
                    }`}
                  >
                    {concept.name}
                  </button>
                ))}
              </div>
            )}
            {activeConcept && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="shrink-0 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-200"
              >
                <strong>{activeConcept.name}:</strong> {activeConcept.description}
              </motion.div>
            )}

            {formatError && (
              <div className="shrink-0 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
                {formatError}
              </div>
            )}
            {formatNotice && (
              <div className="shrink-0 rounded-xl border border-teal-300 bg-teal-50 px-3 py-2 text-xs text-teal-900 dark:border-teal-700 dark:bg-teal-950/40 dark:text-teal-100">
                {formatNotice}
              </div>
            )}

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <CodeViewer
                code={primaryLessonCode}
                files={lesson.files}
                step={step}
                activeConcept={activeConcept ?? quizExplainConcept}
                preferImplementationConceptLines={usesImplementationWorkspaceCode}
                fileTabRequest={lesson.files?.length ? fileTabRequest : null}
                codeNav={lesson.codeNav}
                onSelectedFileChange={(name) => {
                  editorTabRef.current = name;
                }}
                onNavigateToSymbol={
                  lesson.files?.length && lesson.codeNav?.length
                    ? (t) => openEditorFile(t.file, t.line)
                    : undefined
                }
                onFormatToCustom={handleFormatToCustom}
                onEditLesson={() => {
                  if (lesson.files?.length) {
                    const pick =
                      editorTabRef.current ??
                      step.activeFile ??
                      lesson.files[0].name;
                    const file = lesson.files.find((f) => f.name === pick) ?? lesson.files[0];
                    onEditLesson(file.code);
                  } else {
                    onEditLesson(lesson.code);
                  }
                }}
              />
            </div>
          </div>

          <div
            className={cn(
              'flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden',
              algorithmicThinkingUi != null && !frqFocusLayout && 'max-lg:order-1',
              algorithmicThinkingUi != null &&
                !frqFocusLayout &&
                mobileStudioTab === 'code' &&
                'hidden lg:flex',
              algorithmicThinkingUi == null &&
                !frqFocusLayout &&
                standardMobileDiagramCandidates.length > 0 &&
                mobileStandardVizTab === 'lesson' &&
                'hidden lg:flex',
              useStdMobileFullBleed && 'max-lg:min-h-[min(78dvh,40rem)] max-lg:flex-1',
              algorithmicThinkingUi?.inDesignPhase && !frqFocusLayout && 'flex-col lg:flex-col-reverse',
              algorithmicThinkingUi != null &&
                !frqFocusLayout &&
                'max-lg:h-full max-lg:min-h-0 max-lg:min-w-0',
            )}
          >
            {useStdMobileFullBleed ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:hidden">
                {renderDiagramPanel(mobileStandardVizTab as DiagramPanelKey)}
              </div>
            ) : null}
            <div
              className={cn(
                'flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden',
                useStdMobileFullBleed && 'max-lg:hidden',
                algorithmicThinkingUi?.inDesignPhase &&
                  !frqFocusLayout &&
                  'max-lg:h-full max-lg:min-h-0',
              )}
            >
            {!algorithmicThinkingUi?.inDesignPhase && !frqFocusLayout ? (
              <div
                className={cn(
                  'flex shrink-0 flex-col gap-2',
                  standardMobileDiagramCandidates.length > 0 && 'max-lg:hidden',
                )}
              >
                <div
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  role="group"
                  aria-label="Diagram panels — show or hide"
                >
                  <LayoutPanelLeft className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Show
                  </span>
                  {(
                    [
                      { key: 'memory' as const, label: 'Memory state' },
                      { key: 'arrayView' as const, label: 'Array view' },
                      { key: 'parameters' as const, label: 'Parameters' },
                      { key: 'flow' as const, label: 'Flow' },
                      { key: 'recursion' as const, label: 'Recursion' },
                      { key: 'hierarchy' as const, label: 'Class hierarchy' },
                    ] as const
                  ).map(({ key, label }) => {
                    if (key === 'memory' && frqDesignInWorkspace) return null;
                    if (key === 'hierarchy' && (frqDesignInWorkspace || !hasClassHierarchy)) return null;
                    if (key === 'arrayView' && !hasArrayTraceLesson) return null;
                    if (key === 'flow' && !hasFlowContext) return null;
                    if (key === 'recursion' && !hasRecursionContext) return null;
                    if (key === 'parameters' && !hasParameterLessonOpportunity) return null;
                    const on = panelVisibility[key];
                    const canEnableAsTab =
                      key === 'memory' ||
                      (key === 'arrayView' && hasArrayTraceLesson) ||
                      (key === 'hierarchy' && hasClassHierarchy) ||
                      (key === 'parameters' && hasParameterLessonOpportunity) ||
                      (key === 'flow' && hasFlowContext) ||
                      (key === 'recursion' && hasRecursionContext);
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          const willEnable = !on;
                          setPanelVisibility((p) => ({ ...p, [key]: !p[key] }));
                          if (willEnable && canEnableAsTab) setDiagramFocus(key);
                        }}
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors',
                          on
                            ? 'border-teal-500/60 bg-teal-500/15 text-teal-800 dark:border-teal-400/50 dark:bg-teal-500/15 dark:text-teal-100'
                            : 'border-slate-200 bg-slate-50 text-slate-500 opacity-60 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-500',
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {visibleDiagramPanels.length >= 1 && !frqImplementationWorkspaceGuide ? (
                  <div
                    className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    role="group"
                    aria-label="Diagram layout"
                  >
                    <LayoutTemplate className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Layout
                    </span>
                    <button
                      type="button"
                      aria-pressed={diagramPanelLayout === 'tabs'}
                      onClick={() => setDiagramPanelLayout('tabs')}
                      title="One panel at a time (tabbed)"
                      className={cn(
                        'flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors',
                        diagramPanelLayout === 'tabs'
                          ? 'border-teal-500/60 bg-teal-500/15 text-teal-800 dark:border-teal-400/50 dark:bg-teal-500/15 dark:text-teal-100'
                          : 'border-slate-200 bg-slate-50 text-slate-500 opacity-80 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400',
                      )}
                    >
                      <LayoutGrid size={12} aria-hidden />
                      Tabs
                    </button>
                    <button
                      type="button"
                      aria-pressed={diagramPanelLayout === 'tile'}
                      onClick={() => setDiagramPanelLayout('tile')}
                      title="Stack panels vertically — Memory, Array view, Parameters, Flow, Recursion, Hierarchy"
                      className={cn(
                        'flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors',
                        diagramPanelLayout === 'tile'
                          ? 'border-teal-500/60 bg-teal-500/15 text-teal-800 dark:border-teal-400/50 dark:bg-teal-500/15 dark:text-teal-100'
                          : 'border-slate-200 bg-slate-50 text-slate-500 opacity-80 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400',
                      )}
                    >
                      <Rows2 size={12} aria-hidden />
                      Tile
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
            {algorithmicThinkingUi?.inDesignPhase ? (
              <div
                className={cn(
                  'flex shrink-0 flex-col gap-1.5',
                  mobileStudioTab === 'diagrams' && 'max-lg:hidden',
                )}
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 px-0.5 text-violet-950 dark:text-violet-50">
                  <span className="inline-flex items-center gap-1.5">
                    <DraftingCompass
                      className="size-4 shrink-0 text-violet-600 dark:text-violet-400"
                      aria-hidden
                    />
                    <span className="text-sm font-extrabold tracking-tight">Design</span>
                  </span>
                  {lesson.algorithmSubsection ? (
                    <>
                      <span className="text-violet-400/70 dark:text-violet-500/70" aria-hidden>
                        ·
                      </span>
                      <span className="min-w-0 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
                        {lesson.algorithmSubsection}
                      </span>
                    </>
                  ) : null}
                </div>
                <div
                  className="flex flex-col gap-2 rounded-xl border border-violet-200/90 bg-violet-50/50 p-2.5 shadow-sm dark:border-violet-900/55 dark:bg-violet-950/25"
                  role="region"
                  aria-label="Design walkthrough — stages and step text"
                >
                  <div
                    className="-mx-0.5 flex flex-nowrap gap-1.5 overflow-x-auto overscroll-x-contain px-0.5 pb-0.5 [scrollbar-width:thin]"
                    role="tablist"
                    aria-label="Stages — jump to start"
                  >
                    {algorithmicThinkingUi.phaseRanges.map((r, i) => {
                      const active = i === algorithmicThinkingUi.currentPhaseRangeIndex;
                      const stageSteps = r.endExclusive - r.start;
                      return (
                        <button
                          key={`${r.start}-${r.label}`}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          title={`${stageSteps} step${stageSteps === 1 ? '' : 's'} in this stage`}
                          onClick={() => {
                            setQuizExplainLines(null);
                            setQuizExplainFile(null);
                            setCurrentStepIndex(r.start);
                          }}
                          className={cn(
                            'shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-left text-[11px] font-bold transition-colors',
                            active
                              ? 'border-violet-600 bg-violet-600 text-white shadow-sm dark:border-violet-500 dark:bg-violet-600'
                              : 'border-violet-200/90 bg-white/95 text-violet-950 hover:border-violet-300 hover:bg-violet-50/90 dark:border-violet-800/70 dark:bg-slate-900/80 dark:text-violet-100 dark:hover:border-violet-600 dark:hover:bg-violet-950/55',
                          )}
                        >
                          <span className="tabular-nums text-[10px] opacity-90">{i + 1}</span>
                          <span className="mx-1 opacity-40" aria-hidden>
                            ·
                          </span>
                          {r.label}
                          <span className="ml-1 tabular-nums text-[10px] font-semibold opacity-75">
                            ({stageSteps})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                <div className="max-h-[min(22vh,9.5rem)] min-h-0 overflow-y-auto overflow-x-hidden rounded-lg border border-violet-200/70 bg-white px-2.5 py-2 dark:border-violet-800/50 dark:bg-slate-900/85 max-lg:max-h-[min(32vh,14rem)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      <StepDescription
                        text={step.description}
                        className="text-[13px] font-medium text-slate-800 dark:text-slate-200 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:text-[12px] dark:[&_code]:bg-slate-800 [&_strong]:text-violet-900 dark:[&_strong]:text-violet-200"
                      />
                      <StepCodeExamples step={step} defaultVariant="violet" />
                      {step.fileLinks && step.fileLinks.length > 0 && lesson.files && (
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          {step.fileLinks.map((l) => (
                            <button
                              key={l.file}
                              type="button"
                              onClick={() => openEditorFile(l.file)}
                              className="rounded border border-violet-500/40 bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-violet-800 dark:border-violet-400/35 dark:text-violet-200"
                            >
                              {l.label ?? l.file}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-violet-200/50 pt-2 dark:border-violet-800/40">
                  <p className="min-w-0 text-[10px] font-semibold leading-tight text-violet-900 dark:text-violet-100">
                    <span className="text-slate-600 dark:text-slate-400">{algorithmicThinkingUi.currentPhaseLabel}</span>
                    <span className="mx-1 text-violet-400">·</span>
                    <span className="tabular-nums">
                      {algorithmicThinkingUi.withinPhaseDisplay}/{algorithmicThinkingUi.withinPhaseTotal}
                    </span>
                    <span className="mx-1 text-violet-400">·</span>
                    <span className="tabular-nums text-slate-500 dark:text-slate-400">
                      {algorithmicThinkingUi.designStepDisplay}/{algorithmicThinkingUi.designStepTotal}
                    </span>
                  </p>
                  <div
                    className="flex shrink-0 items-center gap-0.5 rounded-lg border border-violet-400/40 bg-violet-50/90 p-0.5 dark:border-violet-500/35 dark:bg-violet-950/60"
                    role="group"
                    aria-label={`Previous or next design step (${algorithmicThinkingUi.currentPhaseLabel})`}
                  >
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={boundedStepIndex === 0}
                      className="flex min-h-9 min-w-9 items-center justify-center rounded-md text-violet-950 transition-colors hover:bg-white/90 active:bg-white disabled:cursor-not-allowed disabled:opacity-35 dark:text-violet-100 dark:hover:bg-violet-900/70"
                      title="Previous step"
                      aria-label="Previous design step"
                    >
                      <StepBack size={22} strokeWidth={2.25} className="shrink-0" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex min-h-9 min-w-9 items-center justify-center rounded-md bg-violet-600 text-white shadow-sm transition-colors hover:bg-violet-500 active:bg-violet-700 dark:bg-violet-600"
                      title="Next step"
                      aria-label="Next design step"
                    >
                      <StepForward size={22} strokeWidth={2.25} className="shrink-0" />
                    </button>
                  </div>
                </div>
                </div>
              </div>
            ) : algorithmicThinkingUi &&
              !algorithmicThinkingUi.inDesignPhase &&
              !frqStubImplementationWalkthrough ? (
              <div className="shrink-0 rounded-xl border border-teal-200/85 bg-teal-50/60 px-3 py-2 text-[11px] font-medium text-slate-700 shadow-sm dark:border-teal-900/45 dark:bg-teal-950/30 dark:text-slate-300">
                <span className="font-extrabold uppercase tracking-wide text-teal-800 dark:text-teal-300">
                  Implementation
                </span>
                {' — '}
                {frqImplementationWorkspaceGuide
                  ? 'Diagrams: tabs under Show (Memory, Array view, Hierarchy, …).'
                  : 'Chevrons step Java; use Show / Layout for diagrams.'}
              </div>
            ) : null}
            <div
              className={cn(
                'flex min-h-0 flex-1 flex-col overflow-hidden',
                !algorithmicThinkingUi?.inDesignPhase && !frqFocusLayout && 'min-h-[12rem]',
                algorithmicThinkingUi?.inDesignPhase &&
                  visibleDiagramPanels.length === 0 &&
                  'max-lg:flex-none max-lg:min-h-0',
              )}
            >
            {visibleDiagramPanels.length === 0 ? (
              <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400 max-lg:max-h-28 max-lg:flex-none max-lg:py-3 max-lg:text-[11px] max-lg:leading-snug">
                {algorithmicThinkingUi?.inDesignPhase ? (
                  <>
                    No diagram panels are available for this lesson step. If you expected a visualization, continue
                    stepping — or switch to implementation mode for full diagram controls.
                  </>
                ) : (
                  <>
                    Turn on a diagram above (for example{' '}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Memory state</span> or{' '}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Flow</span> when this lesson uses{' '}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">if</span> /{' '}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">loops</span>).
                  </>
                )}
              </div>
            ) : algorithmicThinkingUi?.inDesignPhase && designPhaseOrderedPanels.length > 0 ? (
              wrapDiagramArea(
                <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden">
                  {designPhaseOrderedPanels.map((panelKey) => {
                    const primary = designPhasePrimaryPanel === panelKey;
                    return (
                      <div
                        key={panelKey}
                        className={cn(
                          'flex min-w-0 flex-col overflow-hidden',
                          primary
                            ? 'min-h-0 flex-[1_1_0%] max-lg:min-h-[min(42dvh,20rem)]'
                            : 'max-h-[min(28vh,13rem)] min-h-0 shrink-0 flex-[0_1_auto] max-lg:max-h-[min(22vh,11rem)]',
                        )}
                      >
                        {renderDiagramPanel(panelKey)}
                      </div>
                    );
                  })}
                </div>,
              )
            ) : diagramPanelLayout === 'tile' ? (
              wrapDiagramArea(
                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
                  {tilePanelOrder.map((panelKey) => (
                    <div
                      key={panelKey}
                      className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden"
                    >
                      {renderDiagramPanel(panelKey)}
                    </div>
                  ))}
                </div>,
              )
            ) : (
              wrapDiagramArea(
                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
                  <div
                    className="flex shrink-0 flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/80"
                    role="tablist"
                    aria-label="Diagram view"
                  >
                    {visibleDiagramPanels.map((panelKey) => {
                      const tabLabel =
                        panelKey === 'memory'
                          ? 'Memory'
                          : panelKey === 'arrayView'
                            ? 'Array'
                            : panelKey === 'hierarchy'
                              ? 'Hierarchy'
                              : panelKey === 'parameters'
                                ? 'Parameters'
                                : panelKey === 'flow'
                                  ? 'Flow'
                                  : 'Recursion';
                      const selected = diagramFocus === panelKey;
                      return (
                        <button
                          key={panelKey}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          id={`diagram-tab-${panelKey}`}
                          aria-controls={`diagram-panel-${panelKey}`}
                          onClick={() => setDiagramFocus(panelKey)}
                          className={cn(
                            'rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors',
                            selected
                              ? 'bg-white text-teal-800 shadow-sm dark:bg-slate-900 dark:text-teal-100'
                              : 'text-slate-500 hover:bg-white/70 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700/80 dark:hover:text-slate-200',
                          )}
                        >
                          {tabLabel}
                        </button>
                      );
                    })}
                  </div>
                  <div
                    className="flex min-h-0 flex-1 flex-col overflow-hidden"
                    role="tabpanel"
                    id={`diagram-panel-${diagramFocus}`}
                    aria-labelledby={`diagram-tab-${diagramFocus}`}
                  >
                    {renderDiagramPanel(diagramFocus)}
                  </div>
                </div>,
              )
            )}
            </div>
            </div>
          </div>
        </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
