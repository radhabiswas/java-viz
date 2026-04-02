import { describe, expect, it } from 'vitest';
import { isValidElement } from 'react';
import { stepDescriptionToReactNodes } from './stepDescriptionRichText';

describe('stepDescriptionToReactNodes', () => {
  it('returns plain string when no bold markers', () => {
    expect(stepDescriptionToReactNodes('plain')).toBe('plain');
  });

  it('returns a React element tree for **bold**', () => {
    const n = stepDescriptionToReactNodes('Hello **world** end');
    expect(isValidElement(n)).toBe(true);
  });
});
