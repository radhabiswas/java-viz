import { describe, expect, it } from 'vitest';
import { lessons } from './lessons';
import { sectionQuizzesByLessonId } from './sectionQuizzes';

describe('sectionQuizzes data', () => {
  /** Past-exam PDF hub lessons are practice shells without diagram-stepped quizzes. */
  const lessonIdsWithSectionQuizzes = lessons
    .filter((l) => !l.id.startsWith('ps-frq-'))
    .map((l) => l.id);

  it.each(lessonIdsWithSectionQuizzes)(
    'lesson %s has section quizzes with diagram-linked prompts',
    (lessonId) => {
      const lesson = lessons.find((l) => l.id === lessonId);
      expect(lesson).toBeTruthy();
      const quizzes = sectionQuizzesByLessonId[lessonId];
      expect(quizzes?.length).toBeGreaterThan(0);
      if (!lesson || !quizzes) return;
      for (const sq of quizzes) {
        expect(sq.questions.length).toBeGreaterThan(0);
        expect(sq.checkpointStepIndex).toBeGreaterThanOrEqual(0);
        expect(sq.checkpointStepIndex).toBeLessThan(lesson.steps.length);
        for (const q of sq.questions) {
          expect(q.visual).toBeDefined();
          if (!q.visual) continue;
          expect(q.visual.stepIndex).toBeGreaterThanOrEqual(0);
          expect(q.visual.stepIndex).toBeLessThan(lesson.steps.length);
        }
      }
    },
  );
});

