import { describe, expect, it } from 'vitest';
import { HELP_SECTIONS, helpSectionMatchesQuery, lessonMatchesQuery } from './helpGuide';
import type { Lesson } from '../types';

const mockLesson = (overrides: Partial<Lesson>): Lesson => ({
  id: 'x-1',
  title: 'Test Lesson',
  chapter: '9 · Test chapter',
  code: '',
  steps: [],
  ...overrides,
});

describe('helpSectionMatchesQuery', () => {
  it('matches title substring', () => {
    const s = HELP_SECTIONS.find((x) => x.id === 'constructors')!;
    expect(helpSectionMatchesQuery(s, 'constructor')).toBe(true);
  });

  it('matches searchBlob', () => {
    const s = HELP_SECTIONS.find((x) => x.id === 'parameter-passing')!;
    expect(helpSectionMatchesQuery(s, 'pass by value')).toBe(true);
  });

  it('returns false for non-matching query', () => {
    const s = HELP_SECTIONS[0];
    expect(helpSectionMatchesQuery(s, 'zzznomatchzzz')).toBe(false);
  });
});

describe('lessonMatchesQuery', () => {
  it('matches title, chapter, and id', () => {
    const l = mockLesson({ title: 'Arrays', id: '4-1', chapter: 'Collections' });
    expect(lessonMatchesQuery(l, 'array')).toBe(true);
    expect(lessonMatchesQuery(l, 'collection')).toBe(true);
    expect(lessonMatchesQuery(l, '4-1')).toBe(true);
  });

  it('returns false for empty query', () => {
    expect(lessonMatchesQuery(mockLesson({}), '')).toBe(false);
  });
});

describe('HELP_SECTIONS', () => {
  it('has unique ids', () => {
    const ids = HELP_SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes topic help sections', () => {
    expect(HELP_SECTIONS.some((s) => s.id === 'parameter-passing')).toBe(true);
    expect(HELP_SECTIONS.some((s) => s.id === 'constructors')).toBe(true);
    expect(HELP_SECTIONS.some((s) => s.id === 'access-rules')).toBe(true);
    expect(HELP_SECTIONS.some((s) => s.id === 'static-methods')).toBe(true);
  });
});
