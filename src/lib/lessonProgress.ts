import type { Lesson } from '../types';
import { finalQuizzesByLessonId } from '../data/finalQuizzes';
import { sectionQuizzesByLessonId } from '../data/sectionQuizzes';

export function sectionQuizIdsForLesson(lessonId: string): string[] {
  return (sectionQuizzesByLessonId[lessonId] ?? []).map((q) => q.id);
}

export function finalQuizIdForLesson(lesson: Lesson): string | null {
  return (
    lesson.finalQuiz?.id ?? finalQuizzesByLessonId[lesson.id]?.id ?? lesson.quiz?.id ?? null
  );
}

export function lessonHasAssessments(lesson: Lesson): boolean {
  return sectionQuizIdsForLesson(lesson.id).length > 0 || finalQuizIdForLesson(lesson) !== null;
}

/** All section checkpoints (if any) and the end capstone / legacy quiz (if any) are completed. */
export function isLessonFullyComplete(
  lesson: Lesson,
  completedSectionQuizIds: Set<string>,
  completedQuizIds: Set<string>,
): boolean {
  for (const sid of sectionQuizIdsForLesson(lesson.id)) {
    if (!completedSectionQuizIds.has(sid)) return false;
  }
  const fid = finalQuizIdForLesson(lesson);
  if (fid && !completedQuizIds.has(fid)) return false;
  return true;
}

export function chapterHasQuizHub(lessonsInChapter: Lesson[]): boolean {
  return lessonsInChapter.some((l) => finalQuizIdForLesson(l) !== null);
}

export function isChapterFullyComplete(
  lessonsInChapter: Lesson[],
  completedSectionQuizIds: Set<string>,
  completedQuizIds: Set<string>,
): boolean {
  if (lessonsInChapter.length === 0) return false;
  return lessonsInChapter.every((l) => isLessonFullyComplete(l, completedSectionQuizIds, completedQuizIds));
}

export function chapterQuizNavId(chapter: string): string {
  return `ch-quiz:${encodeURIComponent(chapter)}`;
}

export function parseChapterQuizNavId(activeLessonId: string): string | null {
  if (!activeLessonId.startsWith('ch-quiz:')) return null;
  try {
    return decodeURIComponent(activeLessonId.slice('ch-quiz:'.length));
  } catch {
    return null;
  }
}
