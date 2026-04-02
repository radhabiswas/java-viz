import type { SectionQuizQuestion } from '../types';

export type SectionQuizAnswer =
  | { kind: 'mcq'; optionIndex: number | null }
  | { kind: 'fillBlank'; text: string }
  | { kind: 'clickableCode'; selectedChoiceIds: string[] };

export function sectionQuizQuestionPoints(q: SectionQuizQuestion): number {
  return q.points ?? 10;
}

export function evaluateSectionQuizQuestion(
  q: SectionQuizQuestion,
  answer: SectionQuizAnswer,
): { correct: boolean } {
  if (q.kind === 'mcq') {
    if (answer.kind !== 'mcq') return { correct: false };
    return { correct: answer.optionIndex === q.correctOptionIndex };
  }
  if (q.kind === 'fillBlank') {
    if (answer.kind !== 'fillBlank') return { correct: false };
    const normalized = answer.text.trim().toLowerCase();
    const accepted = q.acceptedAnswers.map((a) => a.trim().toLowerCase());
    return { correct: accepted.includes(normalized) };
  }
  if (answer.kind !== 'clickableCode') return { correct: false };
  const expected = new Set(q.choices.filter((c) => c.correct).map((c) => c.id));
  const got = new Set(answer.selectedChoiceIds);
  if (expected.size !== got.size) return { correct: false };
  for (const id of expected) {
    if (!got.has(id)) return { correct: false };
  }
  return { correct: true };
}

