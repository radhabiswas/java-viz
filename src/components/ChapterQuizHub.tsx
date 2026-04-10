import React from 'react';
import type { Lesson } from '../types';
import { cn } from '../lib/utils';
import {
  finalQuizIdForLesson,
  isChapterFullyComplete,
  isLessonFullyComplete,
  lessonHasAssessments,
  sectionQuizIdsForLesson,
} from '../lib/lessonProgress';
import { CheckCircle2, ChevronLeft, Circle, ListChecks, PlayCircle } from 'lucide-react';

export default function ChapterQuizHub({
  chapter,
  lessons,
  completedQuizIds,
  completedSectionQuizIds,
  onBack,
  onOpenLesson,
}: {
  chapter: string;
  lessons: Lesson[];
  completedQuizIds: Set<string>;
  completedSectionQuizIds: Set<string>;
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const chapterDone = isChapterFullyComplete(lessons, completedSectionQuizIds, completedQuizIds);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-slate-100 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] dark:bg-slate-950 lg:p-6">
      <div className="mx-auto w-full max-w-2xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ChevronLeft size={18} aria-hidden />
          Back to sidebar
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Chapter quiz
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {chapter}
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Finish each lesson’s walkthrough on your own schedule; section checks and the lesson review stay optional and
                open from the lesson header — use this hub to jump into any lesson quickly.
              </p>
            </div>
            <div
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold',
                chapterDone
                  ? 'border-green-300 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-200'
                  : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
              )}
            >
              {chapterDone ? (
                <>
                  <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" aria-hidden />
                  Chapter complete
                </>
              ) : (
                <>
                  <ListChecks size={16} aria-hidden />
                  In progress
                </>
              )}
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {lessons.map((lesson) => {
              const hasFinal = finalQuizIdForLesson(lesson) !== null;
              const sectionIds = sectionQuizIdsForLesson(lesson.id);
              const finalId = finalQuizIdForLesson(lesson);
              const finalDone = !finalId || completedQuizIds.has(finalId);
              const lessonDone = isLessonFullyComplete(lesson, completedSectionQuizIds, completedQuizIds);
              const showAssess = lessonHasAssessments(lesson);

              return (
                <li
                  key={lesson.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {lessonDone ? (
                          <CheckCircle2 className="text-teal-600 dark:text-teal-400" size={22} aria-hidden />
                        ) : (
                          <Circle className="text-slate-300 dark:text-slate-600" size={22} aria-hidden />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-bold text-slate-900 dark:text-white">{lesson.title}</h2>
                        {showAssess ? (
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                            Section checks:{' '}
                            {sectionIds.length === 0
                              ? 'none'
                              : `${sectionIds.filter((id) => completedSectionQuizIds.has(id)).length}/${sectionIds.length}`}{' '}
                            · Lesson review: {finalDone ? 'done' : 'pending'}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenLesson(lesson.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        title={
                          hasFinal
                            ? 'Walkthrough first; optional Lesson review in the lesson header'
                            : undefined
                        }
                      >
                        <PlayCircle size={14} aria-hidden />
                        Open lesson
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
