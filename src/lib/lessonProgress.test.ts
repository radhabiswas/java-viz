import { describe, expect, it } from 'vitest';
import { chapterQuizNavId, parseChapterQuizNavId } from './lessonProgress';

describe('lessonProgress', () => {
  it('round-trips chapter quiz nav id', () => {
    const ch = '1 · Variables & types';
    expect(parseChapterQuizNavId(chapterQuizNavId(ch))).toBe(ch);
  });

  it('parseChapterQuizNavId returns null for normal lesson ids', () => {
    expect(parseChapterQuizNavId('1-1')).toBeNull();
  });
});
