/**
 * Direct links to College Board (and a few CDN-hosted) released PDFs for AP Computer Science A Section II.
 * Years 2025–2012 (no at-home 2020 exam). Full in-app FRQ lessons: 2013–2019, 2021–2025 (including **2023**), and (in progress) remaining PDF-only years — remove a year from `AP_PAST_PAPER_YEARS_DESC` when its full lessons merge. PDF stubs use orders **≥ 152** (see `apPastPaperFrqLessons`).
 */
export type ApPastPaperYearPack = {
  questionPaper: string;
  scoringGuidelines: string;
  sampleByQuestion: [string, string, string, string];
};

export const AP_PAST_PAPER_YEARS_DESC = [] as const;

export const AP_PAST_PAPER_RELEASED_PDFS: Record<string, ApPastPaperYearPack> = {
  '2025': {
    questionPaper: 'https://cdn.savemyexams.com/uploads/2026/02/32618-ap25-frq-computer-science-a.pdf',
    scoringGuidelines: 'https://apcentral.collegeboard.org/media/pdf/ap25-sg-computer-science-a.pdf',
    sampleByQuestion: [
      'https://cdn.savemyexams.com/uploads/2026/02/33923-ap25-apc-computer-science-a-q1.pdf',
      'https://cdn.savemyexams.com/uploads/2026/02/62589-ap25-apc-computer-science-a-q2.pdf',
      'https://cdn.savemyexams.com/uploads/2026/02/13871-ap25-apc-computer-science-a-q3.pdf',
      'https://cdn.savemyexams.com/uploads/2026/02/60942-ap25-apc-computer-science-a-q4.pdf',
    ],
  },
  '2024': {
    questionPaper: 'https://apcentral.collegeboard.org/media/pdf/ap24-frq-comp-sci-a.pdf',
    scoringGuidelines: 'https://apcentral.collegeboard.org/media/pdf/ap24-sg-computer-science-a.pdf',
    sampleByQuestion: [
      'https://cdn.savemyexams.com/uploads/2026/02/10997-ap24-apc-computer-science-a-q1.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q2.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q3.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q4.pdf',
    ],
  },
  '2023': {
    questionPaper: 'https://apcentral.collegeboard.org/media/pdf/ap23-frq-comp-sci-a.pdf',
    scoringGuidelines: 'https://apcentral.collegeboard.org/media/pdf/ap23-sg-computer-science-a.pdf',
    sampleByQuestion: [
      'https://apcentral.collegeboard.org/media/pdf/ap23-apc-computer-science-a-q1.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap23-apc-computer-science-a-q2.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap23-apc-computer-science-a-q3.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap23-apc-computer-science-a-q4.pdf',
    ],
  },
  '2022': {
    questionPaper: 'https://apcentral.collegeboard.org/media/pdf/ap22-frq-computer-science-a.pdf',
    scoringGuidelines: 'https://apcentral.collegeboard.org/media/pdf/ap22-sg-computer-science-a.pdf',
    sampleByQuestion: [
      'https://apcentral.collegeboard.org/media/pdf/ap22-apc-computer-science-a-q1.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap22-apc-computer-science-a-q2.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap22-apc-computer-science-a-q3.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap22-apc-computer-science-a-q4.pdf',
    ],
  },
  '2021': {
    questionPaper: 'https://apcentral.collegeboard.org/media/pdf/ap21-frq-computer-science-a.pdf',
    scoringGuidelines: 'https://apcentral.collegeboard.org/media/pdf/ap21-sg-computer-science-a.pdf',
    sampleByQuestion: [
      'https://apcentral.collegeboard.org/media/pdf/ap21-apc-computer-science-a-q1.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap21-apc-computer-science-a-q2.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap21-apc-computer-science-a-q3.pdf',
      'https://apcentral.collegeboard.org/media/pdf/ap21-apc-computer-science-a-q4.pdf',
    ],
  },
  '2018': {
    questionPaper: 'https://secure-media.collegeboard.org/apc/ap18-frq-computer-science-a.pdf',
    scoringGuidelines: 'https://secure-media.collegeboard.org/ap/pdf/ap18-sg-comp-sci-a.pdf',
    sampleByQuestion: [
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap18-computer-science-a-q1.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap18-computer-science-a-q2.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap18-computer-science-a-q3.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap18-computer-science-a-q4.pdf',
    ],
  },
  '2017': {
    questionPaper: 'https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-frq-2017.pdf',
    scoringGuidelines: 'https://secure-media.collegeboard.org/ap/pdf/ap17-sg-comp-sci-a.pdf',
    sampleByQuestion: [
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap17-comp-sci-a-q1.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap17-comp-sci-a-q2.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap17-comp-sci-a-q3.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap17-comp-sci-a-q4.pdf',
    ],
  },
  '2016': {
    questionPaper:
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap16_frq_computer_science_a.pdf',
    scoringGuidelines:
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap16_computer_science_a_sg.pdf',
    sampleByQuestion: [
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap16_compsci_a_q1.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap16_compsci_a_q2.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap16_compsci_a_q3.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap16_compsci_a_q4.pdf',
    ],
  },
  '2015': {
    questionPaper:
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap15_frq_computer_science_a.pdf',
    scoringGuidelines: 'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap15_comp_sci_sg.pdf',
    sampleByQuestion: [
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap15_compsci_a_q1.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap15_compsci_a_q2.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap15_compsci_a_q3.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap15_compsci_a_q4.pdf',
    ],
  },
  '2014': {
    questionPaper:
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap14_frq_computer_science_a.pdf',
    scoringGuidelines:
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap14_comp_sci_scoring_guidelines.pdf',
    sampleByQuestion: [
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap14_computer_science_a_q1.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap14_computer_science_a_q2.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap14_computer_science_a_q3.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap14_computer_science_a_q4.pdf',
    ],
  },
  '2013': {
    questionPaper:
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap13_frq_comp_sci.pdf',
    scoringGuidelines:
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap13_comp_sci_a_scoring_guidelines.pdf',
    sampleByQuestion: [
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap13_computer%20science%20a_q1.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap13_computer%20science%20a_q2.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap13_computer%20science%20a_q3.pdf',
      'https://secure-media.collegeboard.org/digitalServices/pdf/ap/apcentral/ap13_computer%20science%20a_q4.pdf',
    ],
  },
  '2012': {
    questionPaper: 'https://secure-media.collegeboard.org/apc/ap_frq_computerscience_12.pdf',
    scoringGuidelines:
      'https://secure-media.collegeboard.org/apc/ap12_computer_science_a_scoring_guidelines.pdf',
    sampleByQuestion: [
      'https://secure-media.collegeboard.org/apc/ap12_computer_science_a_q1.pdf',
      'https://secure-media.collegeboard.org/apc/ap12_computer_science_a_q2.pdf',
      'https://secure-media.collegeboard.org/apc/ap12_computer_science_a_q3.pdf',
      'https://secure-media.collegeboard.org/apc/ap12_computer_science_a_q4.pdf',
    ],
  },
};
