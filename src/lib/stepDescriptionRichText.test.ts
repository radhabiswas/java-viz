import React from 'react';
import { describe, expect, it } from 'vitest';
import { isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StepDescription, stepDescriptionToReactNodes } from './stepDescriptionRichText';

describe('stepDescriptionToReactNodes', () => {
  it('returns plain string when no bold markers', () => {
    expect(stepDescriptionToReactNodes('plain')).toBe('plain');
  });

  it('returns a React element tree for **bold**', () => {
    const n = stepDescriptionToReactNodes('Hello **world** end');
    expect(isValidElement(n)).toBe(true);
  });

  it('renders `code` segments', () => {
    const html = renderToStaticMarkup(
      React.createElement('span', null, stepDescriptionToReactNodes('Call `foo()` now')),
    );
    expect(html).toContain('<code');
    expect(html).toContain('foo()');
  });
});

describe('StepDescription', () => {
  it('renders paragraphs split by blank lines', () => {
    const html = renderToStaticMarkup(
      React.createElement(StepDescription, { text: '**A**\n\n**B** line two' }),
    );
    expect(html.split('<p').length - 1).toBe(2);
  });

  it('renders • lines as a list', () => {
    const html = renderToStaticMarkup(
      React.createElement(StepDescription, {
        text: '**Title**\n\n• **One**\n• **Two**',
      }),
    );
    expect(html).toContain('<ul');
    expect(html).toContain('<li');
  });

  it('renders fenced **title** as heading strip', () => {
    const html = renderToStaticMarkup(
      React.createElement(StepDescription, { text: '**Part (a)**\n\nBody line.' }),
    );
    expect(html).toContain('border-l-');
    expect(html).toContain('Part (a)');
  });
});
