import { describe, expect, it } from 'vitest';
import { lessons } from './lessons';
import { finalQuizzesByLessonId } from './finalQuizzes';

describe('finalQuizzes data', () => {
  it.each(Object.keys(finalQuizzesByLessonId))(
    'final quiz for %s references valid lesson steps',
    (lessonId) => {
      const lesson = lessons.find((l) => l.id === lessonId);
      expect(lesson).toBeTruthy();
      const cap = finalQuizzesByLessonId[lessonId];
      expect(cap?.questions.length).toBeGreaterThan(0);
      if (!lesson || !cap) return;
      expect(cap.id).toBeTruthy();
      for (const q of cap.questions) {
        expect(q.visual).toBeDefined();
        if (!q.visual) continue;
        expect(q.visual.stepIndex).toBeGreaterThanOrEqual(0);
        expect(q.visual.stepIndex).toBeLessThan(lesson.steps.length);
      }
    },
  );
});
