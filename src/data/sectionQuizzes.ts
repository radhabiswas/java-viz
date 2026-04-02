import type { LessonSectionQuiz } from '../types';
import { bulkSectionQuizzes } from './sectionQuizzes.bulk';

/**
 * Section quizzes keyed by lesson id (lesson data stays legacy-compatible).
 */
export const sectionQuizzesByLessonId: Record<string, LessonSectionQuiz[]> = {
  'ap-1-1': [
    {
      id: 'sq-ap-1-1-primitives',
      title: 'Section Check · Primitives in this snippet',
      checkpointStepIndex: 2,
      questions: [
        {
          id: 'sq-ap-1-1-q1',
          kind: 'mcq',
          prompt: 'Which type best fits a whole count like the number of items (7)?',
          options: ['int', 'double', 'boolean', 'String'],
          correctOptionIndex: 0,
          explanation:
            'Counts with no fractional part are typically stored as int.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption:
              'JavaViz shows items as a primitive slot on the stack holding the int value 7.',
            lines: [0],
          },
        },
        {
          id: 'sq-ap-1-1-q2',
          kind: 'mcq',
          prompt: 'Which type best fits a decimal price like 2.5?',
          options: ['int', 'double', 'boolean', 'String'],
          correctOptionIndex: 1,
          explanation:
            'Decimal values use floating-point types; double is the usual choice in introductory Java.',
          points: 20,
          visual: {
            stepIndex: 2,
            caption:
              'price is stored as a double — notice the fractional part in memory.',
            lines: [1],
          },
        },
      ],
    },
    {
      id: 'sq-ap-1-1-mixed',
      title: 'Section Check · int × double',
      checkpointStepIndex: 3,
      questions: [
        {
          id: 'sq-ap-1-1-q3',
          kind: 'mcq',
          prompt:
            'When Java evaluates `items * price`, what happens to `items` (int) for the multiply?',
          options: [
            'It is truncated to 0 decimal places before multiply',
            'It is promoted to double for the operation',
            'The expression does not compile',
            'The result stays int',
          ],
          correctOptionIndex: 1,
          explanation:
            'Binary numeric promotion lifts int to double so the multiply is done in floating point; total is double.',
          points: 25,
          visual: {
            stepIndex: 3,
            caption:
              'Step through: total is a double (17.5), matching the promoted multiply.',
            lines: [2],
          },
        },
      ],
    },
    {
      id: 'sq-ap-1-1-cast',
      title: 'Section Check · Cast to int',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-ap-1-1-q4',
          kind: 'fillBlank',
          prompt:
            'After `int rounded = (int) total;` with total = 17.5, rounded equals [blank] (truncation toward zero).',
          placeholder: 'integer value',
          acceptedAnswers: ['17'],
          explanation:
            'Casting double to int drops the fractional part; it does not round to the nearest int.',
          points: 25,
          visual: {
            stepIndex: 4,
            caption:
              'JavaViz shows rounded as an int on the stack — compare to total on the previous line.',
            lines: [3],
          },
        },
      ],
    },
  ],
  '1-1': [
    {
      id: 'sq-1-1-types',
      title: 'Section Check · Primitive on the stack',
      checkpointStepIndex: 1,
      questions: [
        {
          id: 'sq-1-1-types-q1',
          kind: 'mcq',
          prompt:
            'JavaViz shows `int x` on the stack with value 5. What does that tell you about how this variable stores data?',
          options: [
            'The stack slot directly holds the integer value 5',
            'The stack slot holds a reference; the 5 lives on the heap',
            'x is a label only — Java has not reserved memory yet',
            'x points at the same heap object as Fraction variables',
          ],
          correctOptionIndex: 0,
          explanation:
            'For a primitive like int, the variable’s stack slot stores the value itself, not an address to some other location.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption:
              'Compare this to Fraction in the next steps: primitives show the value right in the stack entry.',
            lines: [3],
          },
        },
        {
          id: 'sq-1-1-types-q2',
          kind: 'mcq',
          prompt:
            'If the program later had `int y = x;`, what would happen when that line runs (before anything else changes x)?',
          options: [
            'y gets its own copy of the value 5 in another stack slot',
            'y and x share one stack slot holding 5',
            'y becomes an alias to the same heap object as x',
            'The compiler rejects the assignment because x is primitive',
          ],
          correctOptionIndex: 0,
          explanation:
            'Assignment copies the value for primitives — y receives 5 in its own memory, independent of x.',
          points: 20,
          visual: {
            stepIndex: 1,
            caption:
              'That “copy the bits of the value” behavior is what you’ll contrast with `Fraction f2 = f1` later.',
            lines: [3],
          },
        },
      ],
    },
    {
      id: 'sq-1-1-declare-init',
      title: 'Section Check · Declaration vs Initialization',
      checkpointStepIndex: 2,
      questions: [
        {
          id: 'sq-1-1-declare-init-q1',
          kind: 'clickableCode',
          prompt: 'Click all lines that are variable declarations.',
          snippet: `int x = 5;
Fraction f1;
f1 = new Fraction(2, 3);
Fraction f2 = f1;`,
          choices: [
            { id: 'a', text: 'int x = 5;', correct: true },
            { id: 'b', text: 'Fraction f1;', correct: true },
            { id: 'c', text: 'f1 = new Fraction(2, 3);', correct: false },
            { id: 'd', text: 'Fraction f2 = f1;', correct: true },
          ],
          explanation:
            'A declaration introduces a variable with a type. Assignment alone (f1 = new Fraction...) does not declare a new variable.',
          points: 30,
          visual: {
            stepIndex: 2,
            caption:
              'JavaViz separates declaration of f1 (reference slot exists, null) from later object creation and assignment.',
            lines: [4, 5],
          },
        },
      ],
    },
    {
      id: 'sq-1-1-reference-share',
      title: 'Section Check · Reference Assignment',
      checkpointStepIndex: 4,
      questions: [
        {
          id: 'sq-1-1-reference-share-q1',
          kind: 'mcq',
          prompt: "After `Fraction f2 = f1;`, what is true in memory?",
          options: [
            'A new Fraction object is created for f2',
            'f1 and f2 point to the same Fraction object',
            'f1 becomes null and f2 takes over',
            'The heap object is copied to stack',
          ],
          correctOptionIndex: 1,
          explanation:
            'Reference assignment copies the address, not the object. Both variables refer to the same heap object.',
          points: 30,
          visual: {
            stepIndex: 4,
            caption:
              'In JavaViz, both f1 and f2 arrows target the same heap object id, showing shared reference identity.',
            lines: [6],
          },
        },
      ],
    },
  ],
  ...bulkSectionQuizzes,
};

