import type { LessonFinalQuiz } from '../types';
import { bulkFinalQuizzes } from './finalQuizzes.bulk';

/**
 * End-of-lesson capstones with mixed question formats.
 * Criteria: variety, coverage, and low redundancy.
 */
export const finalQuizzesByLessonId: Record<string, LessonFinalQuiz> = {
  ...bulkFinalQuizzes,
  'ap-1-1': {
    id: 'final-ap-1-1',
    title: 'Lesson review · Variables, types & casting',
    questions: [
      {
        id: 'f-ap11-01',
        kind: 'mcq',
        prompt: 'Which type best represents a course average such as 92.6?',
        options: ['int', 'double', 'boolean', 'String'],
        correctOptionIndex: 1,
        explanation: 'Averages can include decimals, so double is the right fit.',
        points: 12,
        visual: {
          stepIndex: 3,
          caption: 'In this lesson, total is a double (17.5).',
          lines: [2],
        },
      },
      {
        id: 'f-ap11-02',
        kind: 'mcq',
        prompt: 'Which type records a yes/no flag like isRaining?',
        options: ['int', 'double', 'boolean', 'String'],
        correctOptionIndex: 2,
        explanation: 'Two-state conditions use boolean: true or false.',
        points: 12,
        visual: {
          stepIndex: 2,
          caption: 'Primitives like double and int sit on the stack with their values.',
          lines: [1],
        },
      },
      {
        id: 'f-ap11-03',
        kind: 'mcq',
        prompt: 'Which type should hold a first name?',
        options: ['int', 'double', 'boolean', 'String'],
        correctOptionIndex: 3,
        explanation: 'Text values are represented with String.',
        points: 12,
        visual: {
          stepIndex: 1,
          caption: 'Stack slots pair with types; String would be a reference in fuller examples.',
          lines: [0],
        },
      },
      {
        id: 'f-ap11-04',
        kind: 'fillBlank',
        prompt: 'Fill in the type keyword: [blank] ticketsSold = 120;',
        placeholder: 'keyword',
        acceptedAnswers: ['int'],
        explanation: 'A ticket count is a whole number, so int is appropriate.',
        points: 10,
        visual: {
          stepIndex: 1,
          caption: 'items is an int primitive on the stack in this lesson’s pattern.',
          lines: [0],
        },
      },
      {
        id: 'f-ap11-05',
        kind: 'fillBlank',
        prompt: 'Write the full statement: declare age as int and initialize to 5.',
        placeholder: 'int age = 5;',
        acceptedAnswers: ['int age = 5', 'int age=5', 'int age = 5;', 'int age=5;'],
        explanation: 'Declaration with initializer form: int age = 5;',
        points: 12,
        visual: {
          stepIndex: 1,
          caption: 'Mirrors how items is declared with an initializer.',
          lines: [0],
        },
      },
      {
        id: 'f-ap11-06',
        kind: 'clickableCode',
        prompt: 'Click every line that is a variable declaration.',
        snippet: `int numLives;
numLives = 0;
double health = 8.5;
boolean powerUp;
powerUp = true;`,
        choices: [
          { id: 'a', text: 'int numLives;', correct: true },
          { id: 'b', text: 'numLives = 0;', correct: false },
          { id: 'c', text: 'double health = 8.5;', correct: true },
          { id: 'd', text: 'boolean powerUp;', correct: true },
          { id: 'e', text: 'powerUp = true;', correct: false },
        ],
        explanation: 'A declaration introduces a variable name with a type.',
        points: 14,
        visual: {
          stepIndex: 2,
          caption: 'Compare to this lesson’s stacking of items, price, total.',
          lines: [1],
        },
      },
      {
        id: 'f-ap11-07',
        kind: 'clickableCode',
        prompt: 'Click every line that is a first-time initialization.',
        snippet: `int level;
level = 1;
double rate = 0.08;
boolean ok = false;
ok = true;`,
        choices: [
          { id: 'a', text: 'int level;', correct: false },
          { id: 'b', text: 'level = 1;', correct: true },
          { id: 'c', text: 'double rate = 0.08;', correct: true },
          { id: 'd', text: 'boolean ok = false;', correct: true },
          { id: 'e', text: 'ok = true;', correct: false },
        ],
        explanation: 'First initialization is the first assignment of a value to each variable.',
        points: 14,
        visual: {
          stepIndex: 3,
          caption: 'total appears after items and price are already live locals.',
          lines: [2],
        },
      },
      {
        id: 'f-ap11-08',
        kind: 'mcq',
        prompt: 'When Java evaluates items * price with int items and double price, what happens?',
        options: [
          'items is truncated before multiply',
          'items is promoted to double for the operation',
          'The expression fails to compile',
          'The result remains int',
        ],
        correctOptionIndex: 1,
        explanation: 'int is widened to double, so multiplication runs in floating point.',
        points: 14,
        visual: {
          stepIndex: 3,
          caption: 'total becomes 17.5 (double).',
          lines: [2],
        },
      },
      {
        id: 'f-ap11-09',
        kind: 'fillBlank',
        prompt: '(int) 17.9 evaluates to [blank].',
        placeholder: 'integer',
        acceptedAnswers: ['17'],
        explanation: 'Casting to int truncates the fractional part.',
        points: 12,
        visual: {
          stepIndex: 4,
          caption: 'rounded stores the truncated int value.',
          lines: [3],
        },
      },
      {
        id: 'f-ap11-10',
        kind: 'mcq',
        prompt: 'What happens if you reassign a variable declared with final?',
        options: [
          'It overwrites the value',
          'Compile-time error',
          'Runtime exception only',
          'It is ignored',
        ],
        correctOptionIndex: 1,
        explanation: 'final variables cannot be reassigned after initialization.',
        points: 14,
        visual: {
          stepIndex: 4,
          caption: 'Once rounded is set, imagine it as final—no second assignment.',
          lines: [3],
        },
      },
      {
        id: 'f-ap11-11',
        kind: 'clickableCode',
        prompt: 'Debugging: click all lines that have compile-time errors.',
        snippet: `int temperature = 70.5;
double channel = 101;
boolean sunny = 1;
System.out.print("Weather on channel ");
System.out.println(Channel);`,
        choices: [
          { id: 'a', text: 'int temperature = 70.5;', correct: true },
          { id: 'b', text: 'double channel = 101;', correct: false },
          { id: 'c', text: 'boolean sunny = 1;', correct: true },
          { id: 'd', text: 'System.out.print("Weather on channel ");', correct: false },
          { id: 'e', text: 'System.out.println(Channel);', correct: true },
        ],
        explanation:
          'Errors: assigning a decimal to int, assigning 1 to boolean, and wrong variable name case (Channel vs channel).',
        points: 18,
        visual: {
          stepIndex: 3,
          caption: 'Type mismatches mirror illegal int/double/boolean mixes.',
          lines: [2],
        },
      },
      {
        id: 'f-ap11-12',
        kind: 'mcq',
        prompt: 'Best pair for GPA and student count?',
        options: [
          'int GPA; int count;',
          'double GPA; int count;',
          'double GPA; double count;',
          'int GPA; boolean count;',
        ],
        correctOptionIndex: 1,
        explanation: 'GPA can be fractional; counts are whole numbers.',
        points: 12,
        visual: {
          stepIndex: 2,
          caption: 'double beside int mirrors GPA vs count pairing.',
          lines: [1],
        },
      },
      {
        id: 'f-ap11-13',
        kind: 'mcq',
        prompt: 'What does System.out.println("score"); print?',
        options: ['Value of variable score', 'The letters score', 'Compile-time error', 'Nothing'],
        correctOptionIndex: 1,
        explanation: 'Quoted text is a String literal, not a variable lookup.',
        points: 10,
        visual: {
          stepIndex: 0,
          caption: 'This lesson’s diagram tracks primitive slots before casting.',
          lines: [0],
        },
      },
    ],
  },

  '1-1': {
    id: 'final-1-1',
    title: 'Lesson review · Primitives vs references',
    questions: [
      {
        id: 'f11-01',
        kind: 'mcq',
        prompt: 'A primitive variable like int directly holds:',
        options: [
          'The actual value in its stack slot',
          'A heap address',
          'Only the type name',
          'A class object',
        ],
        correctOptionIndex: 0,
        explanation: 'Primitives store actual values directly.',
        points: 12,
        visual: { stepIndex: 1, caption: 'x holds primitive value 5.', lines: [3] },
      },
      {
        id: 'f11-02',
        kind: 'mcq',
        prompt: 'A reference variable like Fraction f1 holds:',
        options: [
          'Object fields inline on stack',
          'An address/reference to a heap object (or null)',
          'Only keyword Fraction',
          'A deep copy of the object',
        ],
        correctOptionIndex: 1,
        explanation: 'Reference variables store references, not the object payload.',
        points: 12,
        visual: { stepIndex: 2, caption: 'f1 is a reference slot; initially null.', lines: [4] },
      },
      {
        id: 'f11-03',
        kind: 'mcq',
        prompt: 'After Fraction f2 = f1;, what is true?',
        options: [
          'A new Fraction object is created',
          'f1 and f2 refer to the same heap object',
          'f1 becomes null',
          'Object moves to stack',
        ],
        correctOptionIndex: 1,
        explanation: 'Reference assignment copies the reference value.',
        points: 14,
        visual: { stepIndex: 4, caption: 'Both arrows point to the same object.', lines: [6] },
      },
      {
        id: 'f11-04',
        kind: 'clickableCode',
        prompt: 'Click every declaration line.',
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
        explanation: 'Declarations introduce variable names with types.',
        points: 14,
        visual: { stepIndex: 4, caption: 'Declarations include typed names on the stack.', lines: [3, 4, 6] },
      },
      {
        id: 'f11-05',
        kind: 'clickableCode',
        prompt: 'Click each first-time initialization line.',
        snippet: `int x = 5;
Fraction f1;
f1 = new Fraction(2, 3);
Fraction f2 = f1;`,
        choices: [
          { id: 'a', text: 'int x = 5;', correct: true },
          { id: 'b', text: 'Fraction f1;', correct: false },
          { id: 'c', text: 'f1 = new Fraction(2, 3);', correct: true },
          { id: 'd', text: 'Fraction f2 = f1;', correct: true },
        ],
        explanation: 'Initialization is the first assignment of a value to a variable.',
        points: 14,
        visual: { stepIndex: 3, caption: 'new Fraction assigns f1’s first object.', lines: [5] },
      },
      {
        id: 'f11-06',
        kind: 'mcq',
        prompt: 'Which type best fits a two-state flag like hasPowerUp?',
        options: ['int', 'double', 'boolean', 'String'],
        correctOptionIndex: 2,
        explanation: 'boolean is designed for true/false state.',
        points: 10,
        visual: { stepIndex: 1, caption: 'Primitives include int; boolean is another primitive type.', lines: [3] },
      },
      {
        id: 'f11-07',
        kind: 'fillBlank',
        prompt:
          'In this lesson, `Fraction f2` is a second reference to the same heap object as `f1`. A descriptive camelCase name for “second fraction” (matching Java style) is:',
        placeholder: 'identifier',
        acceptedAnswers: ['secondfraction', 'secondFraction'],
        explanation:
          'camelCase starts with a lowercase letter, then capitalizes the next word: secondFraction.',
        points: 10,
        visual: { stepIndex: 4, caption: 'f2 is another reference variable name on the stack.', lines: [6] },
      },
      {
        id: 'f11-08',
        kind: 'mcq',
        prompt: 'gameScore is declared, but code uses gamescore. What happens?',
        options: [
          'Always prints 0',
          'Compile-time error',
          'Prints gameScore anyway',
          'Runs and prints null',
        ],
        correctOptionIndex: 1,
        explanation: 'Java is case-sensitive; gamescore is a different identifier.',
        points: 12,
        visual: { stepIndex: 1, caption: 'Identifiers like x match exact spelling in memory diagrams.', lines: [3] },
      },
      {
        id: 'f11-09',
        kind: 'mcq',
        prompt: 'What happens if you try to change final double PI = 3.14; later in code?',
        options: ['Value updates', 'Compile-time error', 'Runtime warning only', 'Ignored silently'],
        correctOptionIndex: 1,
        explanation: 'final variables cannot be reassigned after initialization.',
        points: 12,
        visual: { stepIndex: 2, caption: 'Reference f1, once initialized, could be final in a variant.', lines: [4] },
      },
      {
        id: 'f11-10',
        kind: 'clickableCode',
        prompt: 'Debugging: click all lines that contain compile-time errors.',
        snippet: `int score;
4 = score;
boolean won = 1;
System.out.println(won);`,
        choices: [
          { id: 'a', text: 'int score;', correct: false },
          { id: 'b', text: '4 = score;', correct: true },
          { id: 'c', text: 'boolean won = 1;', correct: true },
          { id: 'd', text: 'System.out.println(won);', correct: false },
        ],
        explanation: 'Errors are reversed assignment and invalid boolean initialization.',
        points: 16,
        visual: { stepIndex: 3, caption: 'Valid assignments copy values into variables, not literals into literals.', lines: [5] },
      },
      {
        id: 'f11-11',
        kind: 'mcq',
        prompt: 'Best pair for GPA and enrollment count?',
        options: ['int GPA; int count;', 'double GPA; int count;', 'int GPA; double count;', 'String GPA; int count;'],
        correctOptionIndex: 1,
        explanation: 'GPA may have decimals; enrollment is a whole count.',
        points: 12,
        visual: { stepIndex: 1, caption: 'int vs double roles echo primitive slots in this lesson.', lines: [3] },
      },
    ],
  },
};
