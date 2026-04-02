import React, { useEffect, useMemo, useState } from 'react';
import type { Lesson, LessonFinalQuiz, LessonSectionQuiz, SectionQuizQuestion, StackVariable } from '../types';
import { cn } from '../lib/utils';
import {
  evaluateSectionQuizQuestion,
  sectionQuizQuestionPoints,
  type SectionQuizAnswer,
} from '../lib/sectionQuizEval';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  RotateCcw,
  XCircle,
} from 'lucide-react';

function primitiveChips(stack: StackVariable[]): { name: string; value: string }[] {
  return stack
    .filter((v) => v.type === 'primitive')
    .slice(0, 6)
    .map((v) => ({ name: v.name, value: String(v.value ?? '') }));
}

function orderAll(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

function fallbackStepForQuestion(
  q: SectionQuizQuestion,
  checkpointStepIndex: number | undefined,
): number {
  if (q.visual) return q.visual.stepIndex;
  if (checkpointStepIndex != null) return checkpointStepIndex;
  return 0;
}

function ChapterReviewButton({
  chapter,
  onOpenChapterHub,
}: {
  chapter: string | undefined;
  onOpenChapterHub?: (chapter: string) => void;
}) {
  if (!chapter?.trim() || !onOpenChapterHub) return null;
  return (
    <button
      type="button"
      onClick={() => onOpenChapterHub(chapter)}
      className="inline-flex items-center gap-1 rounded-md border border-violet-500/40 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-900 dark:bg-violet-950/30 dark:text-violet-200"
      title={chapter}
    >
      <Layers size={12} className="shrink-0" />
      Chapter overview
    </button>
  );
}

export default function SectionQuizPanel({
  lesson,
  quiz,
  variant = 'section',
  alreadyCompleted,
  checkpointStepIndex,
  onBackToLesson,
  onJumpToStep,
  onOpenChapterHub,
  onComplete,
}: {
  lesson: Lesson;
  quiz: LessonSectionQuiz | LessonFinalQuiz;
  /** `final` = end-of-lesson capstone copy. */
  variant?: 'section' | 'final';
  alreadyCompleted: boolean;
  /** Section anchor step when a question has no `visual` (final quizzes omit this). */
  checkpointStepIndex?: number;
  onBackToLesson: () => void;
  onJumpToStep: (stepIndex: number, lines?: number[]) => void;
  /** When set, questions may include `reviewChapter` (exact `Lesson.chapter` string) to open the chapter quiz hub. */
  onOpenChapterHub?: (chapter: string) => void;
  onComplete: (quizId: string, pointsEarned: number) => void;
}) {
  const [phase, setPhase] = useState<'questions' | 'recap'>('questions');
  const [questionOrder, setQuestionOrder] = useState<number[]>(() => orderAll(quiz.questions.length));
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState<SectionQuizAnswer | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [earnedThisQuiz, setEarnedThisQuiz] = useState(0);
  const [resultByQuestion, setResultByQuestion] = useState<Record<string, boolean>>({});
  const [pointsAwardedFor, setPointsAwardedFor] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setPhase('questions');
    setQuestionOrder(orderAll(quiz.questions.length));
    setQuestionIdx(0);
    setAnswer(null);
    setSubmitted(false);
    setEarnedThisQuiz(0);
    setResultByQuestion({});
    setPointsAwardedFor(new Set());
  }, [quiz.id]);

  const originalIndex = questionOrder[questionIdx] ?? 0;
  const q = quiz.questions[originalIndex];
  const isLast = questionIdx >= questionOrder.length - 1;
  const currentResult = resultByQuestion[q.id];
  const totalPossible = useMemo(
    () => quiz.questions.reduce((s, x) => s + sectionQuizQuestionPoints(x), 0),
    [quiz.questions],
  );

  const wrongAfterCurrentPass = useMemo(() => {
    return quiz.questions.filter((qq) => resultByQuestion[qq.id] === false);
  }, [quiz.questions, resultByQuestion]);

  const visualStep = q.visual ? lesson.steps[q.visual.stepIndex] : null;
  const chips = visualStep ? primitiveChips(visualStep.memory.stack) : [];

  const canSubmit = (() => {
    if (!answer) return false;
    if (q.kind === 'mcq') return answer.kind === 'mcq' && answer.optionIndex !== null;
    if (q.kind === 'fillBlank') return answer.kind === 'fillBlank' && answer.text.trim().length > 0;
    return answer.kind === 'clickableCode' && answer.selectedChoiceIds.length > 0;
  })();

  const submit = () => {
    if (!answer || submitted) return;
    const { correct } = evaluateSectionQuizQuestion(q, answer);
    setSubmitted(true);
    setResultByQuestion((prev) => ({ ...prev, [q.id]: correct }));
    if (correct && !alreadyCompleted && !pointsAwardedFor.has(q.id)) {
      setPointsAwardedFor((prev) => new Set(prev).add(q.id));
      setEarnedThisQuiz((p) => p + sectionQuizQuestionPoints(q));
    }
  };

  const finishQuiz = () => {
    onComplete(quiz.id, alreadyCompleted ? 0 : earnedThisQuiz);
    onBackToLesson();
  };

  const goNext = () => {
    if (!isLast) {
      setQuestionIdx((i) => i + 1);
      setAnswer(null);
      setSubmitted(false);
      return;
    }
    if (wrongAfterCurrentPass.length > 0) {
      setPhase('recap');
      return;
    }
    finishQuiz();
  };

  const startRetryMissed = () => {
    const wrongIndices = quiz.questions
      .map((qq, i) => (resultByQuestion[qq.id] === false ? i : -1))
      .filter((i) => i >= 0);
    if (wrongIndices.length === 0) return;
    setQuestionOrder(wrongIndices);
    setQuestionIdx(0);
    setAnswer(null);
    setSubmitted(false);
    setResultByQuestion((prev) => {
      const next = { ...prev };
      for (const i of wrongIndices) {
        delete next[quiz.questions[i].id];
      }
      return next;
    });
    setPhase('questions');
  };

  const jumpForQuestion = (qq: SectionQuizQuestion) => {
    const step = fallbackStepForQuestion(qq, checkpointStepIndex);
    const lines = qq.visual?.lines;
    onJumpToStep(step, lines);
  };

  const answerUi = (() => {
    if (q.kind === 'mcq') {
      const selected = answer?.kind === 'mcq' ? answer.optionIndex : null;
      return (
        <div className="space-y-2.5">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => !submitted && setAnswer({ kind: 'mcq', optionIndex: idx })}
              className={cn(
                'w-full rounded-xl border-2 px-3 py-2.5 text-left text-sm transition-colors',
                selected === idx
                  ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-100'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/60',
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }
    if (q.kind === 'fillBlank') {
      const text = answer?.kind === 'fillBlank' ? answer.text : '';
      return (
        <input
          value={text}
          onChange={(e) => !submitted && setAnswer({ kind: 'fillBlank', text: e.target.value })}
          placeholder={q.placeholder ?? 'Type your answer'}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-600 dark:bg-slate-900"
        />
      );
    }
    const selected = new Set(
      answer?.kind === 'clickableCode' ? answer.selectedChoiceIds : ([] as string[]),
    );
    return (
      <div className="space-y-2.5">
        {q.snippet ? (
          <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-900">
            <code>{q.snippet}</code>
          </pre>
        ) : null}
        {q.choices.map((c) => {
          const on = selected.has(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                if (submitted) return;
                const next = new Set(selected);
                if (next.has(c.id)) next.delete(c.id);
                else next.add(c.id);
                setAnswer({ kind: 'clickableCode', selectedChoiceIds: Array.from(next) });
              }}
              className={cn(
                'w-full rounded-xl border-2 px-3 py-2.5 text-left text-sm font-mono transition-colors',
                on
                  ? 'border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/30 dark:text-violet-100'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/60',
              )}
            >
              {c.text}
            </button>
          );
        })}
      </div>
    );
  })();

  if (phase === 'recap') {
    const n = wrongAfterCurrentPass.length;
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onBackToLesson}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ChevronLeft size={14} />
              Back
            </button>
            <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">{quiz.title}</h2>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-900/35 dark:text-amber-300">
              {alreadyCompleted ? 'Review mode' : `${earnedThisQuiz}/${totalPossible} pts`}
            </span>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-4 dark:border-amber-900/50 dark:bg-amber-950/25">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-950 dark:text-amber-100">
              <BookOpen size={18} className="shrink-0" />
              {n === 1 ? '1 question to revisit' : `${n} questions to revisit`}
            </div>
            <p className="text-sm text-amber-950/90 dark:text-amber-100/90">
              Open the walkthrough where indicated, then use <strong>Retry missed questions</strong>. Only your first
              correct answer per question counts for points{alreadyCompleted ? '; this is practice only' : ''}.
            </p>
            {variant === 'section' && checkpointStepIndex != null ? (
              <p className="mt-2 text-xs text-amber-900/80 dark:text-amber-200/80">
                This check is anchored near walkthrough step {checkpointStepIndex + 1}.
              </p>
            ) : null}
          </div>

          <ul className="mt-4 space-y-3">
            {wrongAfterCurrentPass.map((qq) => {
              const step = fallbackStepForQuestion(qq, checkpointStepIndex);
              return (
                <li
                  key={qq.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/50"
                >
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{qq.prompt}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{qq.explanation}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => jumpForQuestion(qq)}
                      className="inline-flex items-center gap-1 rounded-md border border-teal-500/40 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950/30 dark:text-teal-200"
                    >
                      <BookOpen size={12} />
                      Open walkthrough — step {step + 1}
                    </button>
                    <ChapterReviewButton chapter={qq.reviewChapter} onOpenChapterHub={onOpenChapterHub} />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={startRetryMissed}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white"
            >
              <RotateCcw size={16} />
              Retry missed questions
            </button>
            <button
              type="button"
              onClick={finishQuiz}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              {variant === 'final' ? 'Close lesson review' : 'Close section check'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBackToLesson}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">{quiz.title}</h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-900/35 dark:text-amber-300">
            {alreadyCompleted ? 'Review mode' : `${earnedThisQuiz}/${totalPossible} pts`}
          </span>
        </div>

        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Question {questionIdx + 1} / {questionOrder.length}
        </div>
        <p className="mb-4 text-sm font-medium text-slate-800 dark:text-slate-200">{q.prompt}</p>

        {answerUi}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!submitted ? (
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Check answer
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white"
            >
              {isLast
                ? wrongAfterCurrentPass.length > 0
                  ? 'See summary'
                  : variant === 'final'
                    ? 'Finish lesson review'
                    : 'Finish section quiz'
                : 'Next question'}
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        {submitted ? (
          <div
            className={cn(
              'mt-4 rounded-xl border p-3',
              currentResult
                ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30'
                : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30',
            )}
          >
            <div className="mb-1 flex items-center gap-2 text-sm font-bold">
              {currentResult ? (
                <>
                  <CheckCircle2 size={16} className="text-green-600" /> Correct
                </>
              ) : (
                <>
                  <XCircle size={16} className="text-red-600" /> Not quite
                </>
              )}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200">{q.explanation}</p>

            {!currentResult ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900/80">
                <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">
                  Review the matching part of the lesson, then continue or use the summary to retry.
                </p>
                {q.visual ? (
                  <>
                    {q.visual.caption ? (
                      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{q.visual.caption}</p>
                    ) : null}
                    {chips.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {chips.map((c) => (
                          <span
                            key={c.name}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] dark:border-slate-600 dark:bg-slate-800"
                          >
                            {c.name} = {c.value}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : variant === 'section' && checkpointStepIndex != null ? (
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    This check is tied to walkthrough step {checkpointStepIndex + 1}.
                  </p>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const step = fallbackStepForQuestion(q, checkpointStepIndex);
                      onJumpToStep(step, q.visual?.lines);
                    }}
                    className="inline-flex items-center gap-1 rounded-md border border-teal-500/40 bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950/30 dark:text-teal-200"
                  >
                    <BookOpen size={12} className="shrink-0" />
                    Open walkthrough — step {fallbackStepForQuestion(q, checkpointStepIndex) + 1}
                  </button>
                  <ChapterReviewButton chapter={q.reviewChapter} onOpenChapterHub={onOpenChapterHub} />
                </div>
              </div>
            ) : q.visual ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900/80">
                <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">
                  {q.visual.caption ?? 'See this in JavaViz panels'}
                </p>
                {chips.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {chips.map((c) => (
                      <span
                        key={c.name}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] dark:border-slate-600 dark:bg-slate-800"
                      >
                        {c.name} = {c.value}
                      </span>
                    ))}
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => onJumpToStep(q.visual!.stepIndex, q.visual!.lines)}
                  className="mt-2 rounded-md border border-teal-500/40 bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950/30 dark:text-teal-200"
                >
                  Open walkthrough — step {q.visual.stepIndex + 1}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
