import { describe, expect, it } from 'vitest';
import { lessons } from './lessons';
import { finalQuizzesByLessonId } from './finalQuizzes';
import { sectionQuizzesByLessonId } from './sectionQuizzes';
import type { SectionQuizQuestion } from '../types';

function normalizePrompt(p: string): string {
  return p.replace(/\s+/g, ' ').trim().toLowerCase();
}

function collectQuestionsForLesson(lessonId: string): SectionQuizQuestion[] {
  const sections = sectionQuizzesByLessonId[lessonId] ?? [];
  const final = finalQuizzesByLessonId[lessonId];
  const out: SectionQuizQuestion[] = [];
  for (const sq of sections) out.push(...sq.questions);
  if (final) out.push(...final.questions);
  return out;
}

describe('quiz data integrity', () => {
  const knownChapters = new Set(lessons.map((l) => l.chapter));

  it.each(lessons.map((l) => l.id))(
    'lesson %s has unique question ids across section + final quizzes',
    (lessonId) => {
      const qs = collectQuestionsForLesson(lessonId);
      const ids = qs.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    },
  );

  it.each(lessons.map((l) => l.id))(
    'lesson %s avoids duplicate prompts (same wording) across section + final',
    (lessonId) => {
      const qs = collectQuestionsForLesson(lessonId);
      const prompts = qs.map((q) => normalizePrompt(q.prompt));
      const counts = new Map<string, number>();
      for (const p of prompts) counts.set(p, (counts.get(p) ?? 0) + 1);
      const dupes = [...counts.entries()].filter(([, n]) => n > 1).map(([p]) => p);
      expect(dupes, `Duplicate prompts: ${dupes.slice(0, 5).join(' | ')}`).toEqual([]);
    },
  );

  it.each(lessons.map((l) => l.id))(
    'lesson %s quiz reviewChapter values match a real chapter title',
    (lessonId) => {
      const qs = collectQuestionsForLesson(lessonId);
      for (const q of qs) {
        const ch = 'reviewChapter' in q ? q.reviewChapter : undefined;
        if (ch != null && ch !== '') {
          expect(knownChapters.has(ch), `Unknown reviewChapter: "${ch}"`).toBe(true);
        }
      }
    },
  );
});
