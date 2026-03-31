import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Lesson, Concept } from '../types';
import CodeViewer from './CodeViewer';
import MemoryVisualizer from './MemoryVisualizer';
import ParameterPassingPanel from './ParameterPassingPanel';
import FlowPanel from './FlowPanel';
import RecursionPanel from './RecursionPanel';
import ClassHierarchyPanel from './ClassHierarchyPanel';
import { formatJavaCode } from '../lib/formatJava';
import { simulateJavaMemoryUpTo } from '../lib/javaMemorySimulator';
import { buildHierarchyRows } from '../lib/classHierarchy';
import { cn } from '../lib/utils';
import { getEffectiveParameterPassing } from '../lib/inferParameterPassing';
import { inferMaxUniformNumericRecursionFromLesson } from '../lib/controlFlowInference';
import { getPrimaryLessonCode, lessonUsesControlConstructs } from '../lib/statementFlowInference';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  LayoutGrid,
  LayoutPanelLeft,
  Rows2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Pencil,
  Lightbulb,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export default function LessonViewer({ 
  lesson, 
  onQuizComplete, 
  isQuizCompleted,
  onEditLesson,
  onReplaceCustomLessonCode,
}: { 
  lesson: Lesson;
  onQuizComplete: (quizId: string, points: number) => void;
  isQuizCompleted: boolean;
  onEditLesson: (code: string) => void;
  /** When set, Format rebuilds this custom lesson in place instead of opening the Custom Code screen. */
  onReplaceCustomLessonCode?: (lessonId: string, newCode: string) => void;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [formatError, setFormatError] = useState('');
  const [formatNotice, setFormatNotice] = useState('');
  const [panelVisibility, setPanelVisibility] = useState({
    memory: true,
    parameters: true,
    flow: true,
    recursion: true,
    hierarchy: true,
  });
  /** Tabs = one full-height panel at a time (windowed); Tile = stack panels top-to-bottom. */
  const [diagramPanelLayout, setDiagramPanelLayout] = useState<'tabs' | 'tile'>('tabs');
  const [fileTabRequest, setFileTabRequest] = useState<{ file: string; key: number; line?: number } | null>(
    null,
  );
  /** Active tab in the code viewer (for single-file “Modify code” export). */
  const editorTabRef = useRef<string | null>(null);

  const step = lesson.steps[currentStepIndex];

  const effectiveParameterPassing = useMemo(
    () => getEffectiveParameterPassing(lesson, step),
    [lesson, step],
  );

  /**
   * Custom single-file lessons bake memory at creation time; re-simulate so stack matches the current engine.
   * Depends on currentStepIndex: many steps share one codeLine (e.g. each recursive call), so codeLine alone would
   * leave Memory / recursion highlight stuck on the first of those steps.
   */
  const memoryState = useMemo(() => {
    if (lesson.id.startsWith('custom-') && !lesson.files?.length) {
      const lines = lesson.code.split('\n');
      return simulateJavaMemoryUpTo(lines, step.codeLine);
    }
    return step.memory;
  }, [lesson.id, lesson.code, lesson.files, step.codeLine, currentStepIndex]);

  const hierarchyRows = useMemo(
    () => buildHierarchyRows(lesson.classHierarchy, lesson.files),
    [lesson.classHierarchy, lesson.files],
  );
  const hasClassHierarchy = hierarchyRows.length > 0;

  const primaryLessonCode = useMemo(() => getPrimaryLessonCode(lesson), [lesson]);
  const hasFlowContext = useMemo(() => lessonUsesControlConstructs(primaryLessonCode), [primaryLessonCode]);
  const hasRecursionContext = useMemo(
    () => inferMaxUniformNumericRecursionFromLesson(lesson) !== null,
    [lesson],
  );

  type DiagramPanelKey = 'memory' | 'hierarchy' | 'parameters' | 'flow' | 'recursion';

  const visibleDiagramPanels = useMemo((): DiagramPanelKey[] => {
    const keys: DiagramPanelKey[] = [];
    if (panelVisibility.memory) keys.push('memory');
    if (panelVisibility.hierarchy && hasClassHierarchy) keys.push('hierarchy');
    if (panelVisibility.parameters) keys.push('parameters');
    if (panelVisibility.flow && hasFlowContext) keys.push('flow');
    if (panelVisibility.recursion && hasRecursionContext) keys.push('recursion');
    return keys;
  }, [
    panelVisibility.memory,
    panelVisibility.hierarchy,
    panelVisibility.parameters,
    panelVisibility.flow,
    panelVisibility.recursion,
    hasClassHierarchy,
    hasFlowContext,
    hasRecursionContext,
  ]);

  const [diagramFocus, setDiagramFocus] = useState<DiagramPanelKey>('memory');

  useEffect(() => {
    if (visibleDiagramPanels.length === 0) return;
    if (!visibleDiagramPanels.includes(diagramFocus)) {
      setDiagramFocus(visibleDiagramPanels[0]);
    }
  }, [visibleDiagramPanels, diagramFocus]);

  const tilePanelOrder = useMemo(() => {
    const order: DiagramPanelKey[] = ['memory', 'parameters', 'flow', 'recursion', 'hierarchy'];
    return order.filter((k) => visibleDiagramPanels.includes(k));
  }, [visibleDiagramPanels]);

  const renderDiagramPanel = useCallback(
    (k: DiagramPanelKey) => {
      switch (k) {
        case 'memory':
          return (
            <div className="flex min-h-0 h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <MemoryVisualizer state={memoryState} />
            </div>
          );
        case 'hierarchy':
          return (
            <ClassHierarchyPanel classHierarchy={lesson.classHierarchy} files={lesson.files} embedded />
          );
        case 'parameters':
          return <ParameterPassingPanel data={effectiveParameterPassing} embedded />;
        case 'flow':
          return <FlowPanel lesson={lesson} currentStepIndex={currentStepIndex} embedded />;
        case 'recursion':
          return (
            <RecursionPanel
              lesson={lesson}
              currentStepIndex={currentStepIndex}
              memoryState={memoryState}
              embedded
            />
          );
        default:
          return null;
      }
    },
    [memoryState, lesson, effectiveParameterPassing, currentStepIndex],
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
        raw = lesson.code;
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
  }, [lesson.files, lesson.code, lesson.id, step.activeFile, onEditLesson, onReplaceCustomLessonCode]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setActiveConcept(null);
    setFileTabRequest(null);
    editorTabRef.current = null;
    setFormatError('');
    setFormatNotice('');
    const code = getPrimaryLessonCode(lesson);
    setPanelVisibility({
      memory: true,
      parameters: true,
      hierarchy: true,
      flow: lessonUsesControlConstructs(code),
      recursion: inferMaxUniformNumericRecursionFromLesson(lesson) !== null,
    });
    setDiagramFocus('memory');
  }, [lesson.id]);

  /** Same custom lesson after Format: rebuild steps; refresh flow/recursion panel relevance. */
  useEffect(() => {
    setCurrentStepIndex(0);
    const code = getPrimaryLessonCode(lesson);
    setPanelVisibility((p) => ({
      ...p,
      flow: lessonUsesControlConstructs(code),
      recursion: inferMaxUniformNumericRecursionFromLesson(lesson) !== null,
    }));
  }, [lesson.code, lesson]);

  const handleNext = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (lesson.quiz && !showQuiz) {
      setShowQuiz(true);
    }
  };

  const handlePrev = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const handleAnswerSubmit = (index: number) => {
    if (isQuizCompleted || isAnswerCorrect) return;
    
    setSelectedAnswer(index);
    const correct = index === lesson.quiz?.correctAnswer;
    setIsAnswerCorrect(correct);
    
    if (correct && lesson.quiz) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onQuizComplete(lesson.quiz.id, lesson.quiz.points);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-slate-100 dark:bg-slate-950 p-6 gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">{lesson.chapter}</h2>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            title="Reset Lesson"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {showQuiz && lesson.quiz ? (
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
                {lesson.quiz.points} Points
              </span>
            </div>

            <p className="mb-5 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 sm:text-[15px]">
              {lesson.quiz.question}
            </p>

            <div className="space-y-2.5">
              {lesson.quiz.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === lesson.quiz?.correctAnswer;
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
                    <p className="whitespace-pre-wrap opacity-95">{lesson.quiz.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Editor column: step narrative + controls sit directly above code (not full viewport width) */}
          <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex shrink-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mt-0.5 shrink-0 text-teal-500 dark:text-teal-400">
                  <Info size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 sm:text-[15px]">
                    {step.description}
                  </p>
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
                <div
                  className="flex shrink-0 items-center gap-1 rounded-xl border-2 border-teal-500/35 bg-teal-50/90 p-1 shadow-md shadow-teal-900/10 ring-1 ring-teal-500/15 dark:border-teal-400/40 dark:bg-teal-950/50 dark:shadow-black/30 dark:ring-teal-400/20"
                  role="group"
                  aria-label="Lesson steps"
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStepIndex === 0}
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-teal-900 transition-colors hover:bg-white/90 active:bg-white disabled:cursor-not-allowed disabled:opacity-35 dark:text-teal-100 dark:hover:bg-teal-900/80 dark:active:bg-teal-900"
                    title="Previous step"
                    aria-label="Previous step"
                  >
                    <ChevronLeft size={28} strokeWidth={2.5} className="shrink-0" />
                  </button>
                  <span className="min-w-[3.75rem] px-2 text-center font-mono text-sm font-extrabold tabular-nums tracking-tight text-teal-950 dark:text-teal-50">
                    {currentStepIndex + 1}/{lesson.steps.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!lesson.quiz && currentStepIndex === lesson.steps.length - 1}
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm transition-colors hover:bg-teal-500 active:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
                    title="Next step"
                    aria-label="Next step"
                  >
                    <ChevronRight size={28} strokeWidth={2.75} className="shrink-0" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

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
                code={lesson.code}
                files={lesson.files}
                step={step}
                activeConcept={activeConcept}
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

          <div className="flex min-h-0 min-w-0 flex-col gap-3 overflow-hidden">
            <div
              className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              role="group"
              aria-label="Diagram panels"
            >
              <LayoutPanelLeft className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Show
              </span>
              {(
                [
                  { key: 'memory' as const, label: 'Memory state' },
                  { key: 'parameters' as const, label: 'Parameters' },
                  { key: 'flow' as const, label: 'Flow' },
                  { key: 'recursion' as const, label: 'Recursion' },
                  { key: 'hierarchy' as const, label: 'Class hierarchy' },
                ] as const
              ).map(({ key, label }) => {
                if (key === 'hierarchy' && !hasClassHierarchy) return null;
                if (key === 'flow' && !hasFlowContext) return null;
                if (key === 'recursion' && !hasRecursionContext) return null;
                const on = panelVisibility[key];
                const canEnableAsTab =
                  key === 'memory' ||
                  (key === 'hierarchy' && hasClassHierarchy) ||
                  key === 'parameters' ||
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
              {visibleDiagramPanels.length >= 2 && (
                <>
                  <span
                    className="hidden h-4 w-px shrink-0 bg-slate-200 sm:inline dark:bg-slate-700"
                    aria-hidden
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                    title="Stack Memory, Parameters, Flow, Recursion, and Hierarchy vertically"
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
                </>
              )}
            </div>

            {visibleDiagramPanels.length === 0 ? (
              <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
                Turn on a diagram above (for example{' '}
                <span className="font-semibold text-slate-600 dark:text-slate-300">Memory state</span> or{' '}
                <span className="font-semibold text-slate-600 dark:text-slate-300">Flow</span> when this lesson uses{' '}
                <span className="font-semibold text-slate-600 dark:text-slate-300">if</span> /{' '}
                <span className="font-semibold text-slate-600 dark:text-slate-300">loops</span>).
              </div>
            ) : visibleDiagramPanels.length === 1 ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{renderDiagramPanel(visibleDiagramPanels[0])}</div>
            ) : diagramPanelLayout === 'tile' ? (
              <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
                {tilePanelOrder.map((panelKey) => (
                  <div
                    key={panelKey}
                    className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden"
                  >
                    {renderDiagramPanel(panelKey)}
                  </div>
                ))}
              </div>
            ) : (
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
