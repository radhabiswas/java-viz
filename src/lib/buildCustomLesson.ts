import { Lesson, Step } from '../types';
import { simulateJavaMemoryUpTo } from './javaMemorySimulator';

function titleFromCode(code: string): string {
  const first = code.split('\n').find((l) => l.trim().length > 0)?.trim() ?? 'Custom snippet';
  const t = first.length > 56 ? `${first.slice(0, 53)}…` : first;
  return t;
}

/**
 * Builds a predictable, offline lesson from arbitrary Java text: one step per source line
 * plus an intro step. Memory is simulated locally for common intro patterns (locals,
 * assignments, `new`, references, `static` primitives).
 */
export function buildDeterministicCustomLesson(code: string): Lesson {
  const lines = code.split('\n');
  const steps: Step[] = [
    {
      id: 's0',
      codeLine: -1,
      description: 'Line-by-line; memory updates when the simulator can model it.',
      memory: simulateJavaMemoryUpTo(lines, -1),
    },
    ...lines.map((line, i) => ({
      id: `s${i + 1}`,
      codeLine: i,
      description: `Line ${i + 1}: ${line.length ? line : '(blank line)'}`,
      memory: simulateJavaMemoryUpTo(lines, i),
    })),
  ];

  return {
    id: `custom-${Date.now()}`,
    order: 10000,
    chapter: 'Custom Code',
    title: titleFromCode(code),
    code,
    steps,
  };
}
