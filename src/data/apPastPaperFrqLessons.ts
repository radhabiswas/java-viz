import type { ApExamFrqSheet, Lesson } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';
import { AP_PAST_PAPER_RELEASED_PDFS, AP_PAST_PAPER_YEARS_DESC, ApPastPaperYearPack } from './apPastPaperReleasedPdfs';

const PAST_INDEX_URL =
  'https://www.savemyexams.com/us/ap/computer-science/college-board/a/past-papers';

function buildPastPaperSheet(year: string, questionNumber: number, pack: ApPastPaperYearPack): ApExamFrqSheet {
  const sample = pack.sampleByQuestion[questionNumber - 1];
  const stubClass = `// May ${year} — Section II question ${questionNumber}\n// Copy starter code from the official question paper PDF, or practice here.\npublic class FrqQ${questionNumber} {\n}\n`;
  return {
    year,
    questionNumber,
    headline: `**May ${year}** — Free-response **question ${questionNumber}** (released PDFs).`,
    examIntro:
      'This screen **does not reproduce** the exam stem or figures from the PDF (**College Board** copyright). Use the **Released PDFs** at the bottom of this panel for the full question, rubric, and an authentic scored sample for **this** question number.\n\n' +
      `**Curated index:** [Save My Exams — AP CSA past papers](${PAST_INDEX_URL}) (third-party listing; same PDFs).\n\n` +
      '**Implementation workspace** is for **your** code — there is no bundled reference solution for these years (unlike the in-depth **2019** set in this chapter).',
    examClassContext: stubClass,
    directions: AP_SECTION_II_DIRECTIONS,
    notes: AP_SECTION_II_NOTES,
    parts: [
      {
        label: 'How to use',
        title: 'With the official PDFs',
        body:
          '**1.** Open the **question paper** and work the problem on paper or in the editor.\n\n' +
          '**2.** Compare your approach to the **scoring guidelines**.\n\n' +
          '**3.** Read the **sample response** for this question to see how points were earned.\n\n' +
          'Links open in a new tab.',
      },
    ],
    solutionHint:
      'After your attempt, trace each rubric bullet in the scoring guidelines against the **sample response** PDF for this question.',
    footerExamLinks: [
      { label: `${year} — question paper (PDF)`, href: pack.questionPaper },
      { label: `${year} — scoring guidelines (PDF)`, href: pack.scoringGuidelines },
      { label: `${year} — sample response, question ${questionNumber} (PDF)`, href: sample },
    ],
  };
}

function buildPastPaperLesson(
  year: string,
  questionNumber: number,
  pack: ApPastPaperYearPack,
  order: number,
): Lesson {
  const id = `ps-frq-${year}-q${questionNumber}`;
  const sheet = buildPastPaperSheet(year, questionNumber, pack);
  const code = sheet.examClassContext ?? `public class FrqQ${questionNumber} {\n}\n`;
  return {
    id,
    order,
    chapter: '9 · AP CS A Problems',
    title: `${year} · FRQ ${questionNumber}`,
    problemSolvingNumber: questionNumber,
    problemSolvingGroup: year,
    algorithmSubsection: `AP CSA · ${year}`,
    apExamFrqSheet: sheet,
    code,
    algorithmDesign: {
      implementationStartStepIndex: 1,
      phaseStarts: [{ at: 0, label: 'Resources' }],
    },
    steps: [
      {
        id: `${id}-r0`,
        codeLine: -1,
        description:
          '**Official materials**\n\nUse **Intro**, **Class** (when given), and **Problem** tabs for the exam-style header. **Released PDFs** at the bottom link the **question paper**, **scoring guidelines**, and **sample response** for this question number.\n\nOpen **Implementation workspace** when you are ready to type Java next to those PDFs.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: `${id}-p1`,
        codeLine: -1,
        description:
          '**Practice**\n\nPaste the method or class skeleton from the PDF, or write from scratch. There is no auto-grader here — compare your finished work to the scoring guidelines and sample response.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
    ],
  };
}

/**
 * Past-paper PDF hubs. Full FRQ lessons reserve **order 112–151** (10 years × 4 questions) for
 * in-depth 2023→2012 work in parallel — see `.cursor/skills/add-ap-csa-frq-year/PARALLEL-FRQ-WAVE.md`.
 * Stubs start at **152** so they never collide with that block (2025: 104–107, 2024: 108–111, 2019: 100–103).
 */
export const apPastPaperFrqLessons: Lesson[] = (() => {
  const out: Lesson[] = [];
  let order = 152;
  for (const year of AP_PAST_PAPER_YEARS_DESC) {
    const pack = AP_PAST_PAPER_RELEASED_PDFS[year];
    if (!pack) continue;
    for (let q = 1; q <= 4; q++) {
      out.push(buildPastPaperLesson(year, q, pack, order));
      order += 1;
    }
  }
  return out;
})();
