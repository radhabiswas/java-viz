import { describe, expect, it } from 'vitest';
import type { SectionQuizQuestion } from '../types';
import {
  evaluateSectionQuizQuestion,
  sectionQuizQuestionPoints,
} from './sectionQuizEval';

describe('sectionQuizEval', () => {
  it('scores mcq', () => {
    const q: SectionQuizQuestion = {
      id: 'q1',
      kind: 'mcq',
      prompt: 'p',
      options: ['a', 'b'],
      correctOptionIndex: 1,
      explanation: 'e',
    };
    expect(evaluateSectionQuizQuestion(q, { kind: 'mcq', optionIndex: 1 }).correct).toBe(true);
    expect(evaluateSectionQuizQuestion(q, { kind: 'mcq', optionIndex: 0 }).correct).toBe(false);
  });

  it('scores fillBlank case-insensitively with trimming', () => {
    const q: SectionQuizQuestion = {
      id: 'q2',
      kind: 'fillBlank',
      prompt: 'p',
      acceptedAnswers: ['int'],
      explanation: 'e',
    };
    expect(evaluateSectionQuizQuestion(q, { kind: 'fillBlank', text: ' INT ' }).correct).toBe(true);
    expect(evaluateSectionQuizQuestion(q, { kind: 'fillBlank', text: 'double' }).correct).toBe(
      false,
    );
  });

  it('scores clickableCode with exact selected set', () => {
    const q: SectionQuizQuestion = {
      id: 'q3',
      kind: 'clickableCode',
      prompt: 'p',
      choices: [
        { id: 'a', text: 'int x = 5;', correct: true },
        { id: 'b', text: 'x = 7;', correct: false },
        { id: 'c', text: 'double d;', correct: true },
      ],
      explanation: 'e',
    };
    expect(
      evaluateSectionQuizQuestion(q, {
        kind: 'clickableCode',
        selectedChoiceIds: ['a', 'c'],
      }).correct,
    ).toBe(true);
    expect(
      evaluateSectionQuizQuestion(q, {
        kind: 'clickableCode',
        selectedChoiceIds: ['a'],
      }).correct,
    ).toBe(false);
    expect(
      evaluateSectionQuizQuestion(q, {
        kind: 'clickableCode',
        selectedChoiceIds: ['a', 'b', 'c'],
      }).correct,
    ).toBe(false);
  });

  it('returns default points when omitted', () => {
    const q: SectionQuizQuestion = {
      id: 'q4',
      kind: 'mcq',
      prompt: 'p',
      options: ['x'],
      correctOptionIndex: 0,
      explanation: 'e',
    };
    expect(sectionQuizQuestionPoints(q)).toBe(10);
  });
});

