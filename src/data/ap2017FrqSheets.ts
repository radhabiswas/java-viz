import type { ApExamFrqSheet } from '../types';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';

const pack = AP_PAST_PAPER_RELEASED_PDFS['2017'];
const AP17_FRQ_PDF = pack.questionPaper;
const AP17_SG = pack.scoringGuidelines;
const [AP17_Q1_SAMPLE, AP17_Q2_SAMPLE, AP17_Q3_SAMPLE, AP17_Q4_SAMPLE] = pack.sampleByQuestion;

/** Printed exam context — Question 1 (Digits). */
export const FRQ_2017_Q1_DIGITS_PRINTED = `import java.util.ArrayList;

public class Digits {

  /**
   * The list of digits from the number used to construct this object.
   * The digits appear in the list in the same order in which they appear in the original number.
   */
  private ArrayList digitList;

  /**
   * Constructs a Digits object that represents num.
   * Precondition: num >= 0
   */
  public Digits(int num) {
    /* to be implemented in part (a) */
  }

  /**
   * Returns true if the digits in this Digits object are in strictly increasing order;
   * false otherwise.
   */
  public boolean isStrictlyIncreasing() {
    /* to be implemented in part (b) */
  }
}`;

export const FRQ_2017_Q1_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class Digits {
  private ArrayList<Integer> digitList;

  public Digits(int num) {
    digitList = new ArrayList<Integer>();
    if (num == 0) {
      digitList.add(0);
    } else {
      while (num > 0) {
        digitList.add(0, num % 10);
        num /= 10;
      }
    }
  }

  public boolean isStrictlyIncreasing() {
    for (int i = 1; i < digitList.size(); i++) {
      if (digitList.get(i) <= digitList.get(i - 1)) {
        return false;
      }
    }
    return true;
  }
}`;

export const FRQ_2017_Q1_REF_DIGITS_CONSTRUCTOR = `  public Digits(int num) {
    digitList = new ArrayList<Integer>();
    if (num == 0) {
      digitList.add(0);
    } else {
      while (num > 0) {
        digitList.add(0, num % 10);
        num /= 10;
      }
    }
  }`;

export const FRQ_2017_Q1_REF_IS_STRICTLY_INCREASING = `  public boolean isStrictlyIncreasing() {
    for (int i = 1; i < digitList.size(); i++) {
      if (digitList.get(i) <= digitList.get(i - 1)) {
        return false;
      }
    }
    return true;
  }`;

/** Question 2 — interface + class skeleton; students write complete MultPractice. */
export const FRQ_2017_Q2_MULT_PRACTICE_PRINTED = `public interface StudyPractice {

  /** Returns the current practice problem. */
  String getProblem();

  /** Changes to the next practice problem. */
  void nextProblem();
}

public class MultPractice implements StudyPractice {

  public MultPractice(int first, int second) {
    /* to be implemented */
  }

  public String getProblem() {
    /* to be implemented */
  }

  public void nextProblem() {
    /* to be implemented */
  }
}`;

export const FRQ_2017_Q2_REFERENCE_COMPLETE = `public interface StudyPractice {

  /** Returns the current practice problem. */
  String getProblem();

  /** Changes to the next practice problem. */
  void nextProblem();
}

public class MultPractice implements StudyPractice {
  private int first;
  private int second;

  public MultPractice(int first, int second) {
    this.first = first;
    this.second = second;
  }

  public String getProblem() {
    return first + " TIMES " + second;
  }

  public void nextProblem() {
    second++;
  }
}`;

export const FRQ_2017_Q3_PHRASE_PRINTED = `public class Phrase {

  private String currentPhrase;

  /** Constructs a new Phrase object. */
  public Phrase(String p) {
    currentPhrase = p;
  }

  /**
   * Returns the index of the nth occurrence of str in the current phrase;
   * returns -1 if the nth occurrence does not exist.
   * Precondition: str.length() > 0 and n > 0
   * Postcondition: the current phrase is not modified.
   */
  public int findNthOccurrence(String str, int n) {
    /* implementation not shown */
  }

  /**
   * Modifies the current phrase by replacing the nth occurrence of str with repl.
   * If the nth occurrence does not exist, the current phrase is unchanged.
   * Precondition: str.length() > 0 and n > 0
   */
  public void replaceNthOccurrence(String str, int n, String repl) {
    /* to be implemented in part (a) */
  }

  /**
   * Returns the index of the last occurrence of str in the current phrase;
   * returns -1 if str is not found.
   * Precondition: str.length() > 0
   * Postcondition: the current phrase is not modified.
   */
  public int findLastOccurrence(String str) {
    /* to be implemented in part (b) */
  }

  /** Returns a string containing the current phrase. */
  public String toString() {
    return currentPhrase;
  }
}`;

export const FRQ_2017_Q3_REFERENCE_COMPLETE = `public class Phrase {

  private String currentPhrase;

  public Phrase(String p) {
    currentPhrase = p;
  }

  public int findNthOccurrence(String str, int n) {
    int idx = -1;
    int start = 0;
    for (int k = 1; k <= n; k++) {
      idx = currentPhrase.indexOf(str, start);
      if (idx < 0) {
        return -1;
      }
      start = idx + 1;
    }
    return idx;
  }

  public void replaceNthOccurrence(String str, int n, String repl) {
    int idx = findNthOccurrence(str, n);
    if (idx >= 0) {
      currentPhrase =
          currentPhrase.substring(0, idx) + repl + currentPhrase.substring(idx + str.length());
    }
  }

  public int findLastOccurrence(String str) {
    int last = -1;
    int n = 1;
    while (true) {
      int idx = findNthOccurrence(str, n);
      if (idx < 0) {
        return last;
      }
      last = idx;
      n++;
    }
  }

  public String toString() {
    return currentPhrase;
  }
}`;

export const FRQ_2017_Q3_REF_REPLACE_NTH = `  public void replaceNthOccurrence(String str, int n, String repl) {
    int idx = findNthOccurrence(str, n);
    if (idx >= 0) {
      currentPhrase =
          currentPhrase.substring(0, idx) + repl + currentPhrase.substring(idx + str.length());
    }
  }`;

export const FRQ_2017_Q3_REF_FIND_LAST = `  public int findLastOccurrence(String str) {
    int last = -1;
    int n = 1;
    while (true) {
      int idx = findNthOccurrence(str, n);
      if (idx < 0) {
        return last;
      }
      last = idx;
      n++;
    }
  }`;

export const FRQ_2017_Q4_SUCCESSORS_PRINTED = `public class Position {

  /** Constructs a Position object with row r and column c. */
  public Position(int r, int c) {
    /* implementation not shown */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}

public class Successors {

  /**
   * Returns the position of num in intArr;
   * returns null if no such element exists in intArr.
   * Precondition: intArr contains at least one row.
   */
  public static Position findPosition(int num, int[][] intArr) {
    /* to be implemented in part (a) */
  }

  /**
   * Returns a 2D successor array as described in part (b) constructed from intArr.
   * Precondition: intArr contains at least one row and contains consecutive values.
   * Each of these integers may be in any position in the 2D array.
   */
  public static Position[][] getSuccessorArray(int[][] intArr) {
    /* to be implemented in part (b) */
  }
}`;

export const FRQ_2017_Q4_REFERENCE_COMPLETE = `public class Position {
  private int row;
  private int col;

  public Position(int r, int c) {
    row = r;
    col = c;
  }

  public int getRow() {
    return row;
  }

  public int getCol() {
    return col;
  }
}

public class Successors {

  public static Position findPosition(int num, int[][] intArr) {
    for (int r = 0; r < intArr.length; r++) {
      for (int c = 0; c < intArr[r].length; c++) {
        if (intArr[r][c] == num) {
          return new Position(r, c);
        }
      }
    }
    return null;
  }

  public static Position[][] getSuccessorArray(int[][] intArr) {
    int rows = intArr.length;
    int cols = intArr[0].length;
    Position[][] result = new Position[rows][cols];
    int maxVal = intArr[0][0];
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (intArr[r][c] > maxVal) {
          maxVal = intArr[r][c];
        }
      }
    }
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        int v = intArr[r][c];
        if (v == maxVal) {
          result[r][c] = null;
        } else {
          result[r][c] = findPosition(v + 1, intArr);
        }
      }
    }
    return result;
  }
}`;

export const FRQ_2017_Q4_REF_FIND_POSITION = `  public static Position findPosition(int num, int[][] intArr) {
    for (int r = 0; r < intArr.length; r++) {
      for (int c = 0; c < intArr[r].length; c++) {
        if (intArr[r][c] == num) {
          return new Position(r, c);
        }
      }
    }
    return null;
  }`;

export const FRQ_2017_Q4_REF_GET_SUCCESSOR_ARRAY = `  public static Position[][] getSuccessorArray(int[][] intArr) {
    int rows = intArr.length;
    int cols = intArr[0].length;
    Position[][] result = new Position[rows][cols];
    int maxVal = intArr[0][0];
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (intArr[r][c] > maxVal) {
          maxVal = intArr[r][c];
        }
      }
    }
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        int v = intArr[r][c];
        if (v == maxVal) {
          result[r][c] = null;
        } else {
          result[r][c] = findPosition(v + 1, intArr);
        }
      }
    }
    return result;
  }`;

export const ap2017FrqDigits: ApExamFrqSheet = {
  year: '2017',
  questionNumber: 1,
  headline: '**Digits** — build **`digitList`** from **`num`**; **`isStrictlyIncreasing`** on the list.',
  examIntro:
    '**`Digits`** stores each digit of a non-negative integer as **`Integer`** objects in an **`ArrayList`**, left-to-right. **(a)** Constructor fills **`digitList`** from **`num`** (**`new Digits(0)`** → list **`[0]`**). **(b)** **`isStrictlyIncreasing`** returns **true** iff every digit after the first is **strictly greater** than the previous.',
  examClassContext: FRQ_2017_Q1_DIGITS_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2017 Section II question paper (College Board)', href: AP17_FRQ_PDF },
    { label: '2017 scoring guidelines', href: AP17_SG },
    { label: 'Sample response — question 1', href: AP17_Q1_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`Digits` constructor',
      body:
        'Initialize **`digitList`**. If **`num == 0`**, add **0**. Otherwise repeatedly take **`num % 10`** and **prepend** (or build right-to-left then fix order) so digits match **`num`** left-to-right.',
    },
    {
      label: '(b)',
      title: '`isStrictlyIncreasing`',
      body:
        'Return **false** if any adjacent pair has **`get(i) <= get(i-1)`**; otherwise **true**. A one-element list is strictly increasing.',
    },
  ],
  solutionHint:
    '**(a)** `digitList = new ArrayList();` then `if (num==0) add(0);` else `while (num>0) { add(0, num%10); num/=10; }`.\n\n' +
    '**(b)** Loop `i` from 1; compare `get(i)` with `get(i-1)`.',
};

export const ap2017FrqMultPractice: ApExamFrqSheet = {
  year: '2017',
  questionNumber: 2,
  headline: '**MultPractice** — implements **`StudyPractice`**; **`"first TIMES second"`** string.',
  examIntro:
    '**`MultPractice(first, initialSecond)`** keeps **first** fixed and **second** starting at **initialSecond**. **`getProblem()`** returns **`first + " TIMES " + second`** (spaces as in the exam). **`nextProblem()`** increments **second** by **1** (does not change **first**). **`getProblem`** may be called multiple times without **`nextProblem`** — same string until advanced.',
  examClassContext: FRQ_2017_Q2_MULT_PRACTICE_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2017 Section II question paper (College Board)', href: AP17_FRQ_PDF },
    { label: '2017 scoring guidelines', href: AP17_SG },
    { label: 'Sample response — question 2', href: AP17_Q2_SAMPLE },
  ],
  parts: [
    {
      label: 'Class',
      title: '`MultPractice`',
      body:
        'Two **`int`** fields; constructor copies parameters. **`getProblem`** builds the required string. **`nextProblem`** does **`second++`**.',
    },
  ],
  solutionHint:
    'Fields `first`, `second`. Constructor assigns both. `getProblem`: return `first + " TIMES " + second`. `nextProblem`: `second++`.',
};

export const ap2017FrqPhrase: ApExamFrqSheet = {
  year: '2017',
  questionNumber: 3,
  headline: '**Phrase** — **`replaceNthOccurrence`** and **`findLastOccurrence`** using **`findNthOccurrence`**.',
  examIntro:
    '**`findNthOccurrence(str, n)`** is given (**not shown**). **(a)** **`replaceNthOccurrence`** — if the **n**th occurrence exists, replace that substring with **`repl`**; else leave **`currentPhrase`** unchanged. **(b)** **`findLastOccurrence(str)`** — return the **index** of the **last** occurrence of **`str`**, or **-1** if none. You **must** call **`findNthOccurrence`** appropriately for credit.',
  examClassContext: FRQ_2017_Q3_PHRASE_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2017 Section II question paper (College Board)', href: AP17_FRQ_PDF },
    { label: '2017 scoring guidelines', href: AP17_SG },
    { label: 'Sample response — question 3', href: AP17_Q3_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`replaceNthOccurrence`',
      body:
        '**`idx = findNthOccurrence(str, n)`**. If **`idx >= 0`**, set **`currentPhrase`** to **`substring(0,idx) + repl + substring(idx+str.length())`**.',
    },
    {
      label: '(b)',
      title: '`findLastOccurrence`',
      body:
        'Try **`n = 1, 2, …`** with **`findNthOccurrence`** until **-1**; return the **last non-negative** index seen (or **-1** if never found).',
    },
  ],
  solutionHint:
    '**(a)** Index check then concatenate three pieces.\n\n' +
    '**(b)** `int last = -1; for (n=1; ; n++) { int i = findNthOccurrence(str,n); if (i<0) return last; last = i; }`',
};

export const ap2017FrqSuccessors: ApExamFrqSheet = {
  year: '2017',
  questionNumber: 4,
  headline: '**Successors** — **`findPosition`**; **`getSuccessorArray`** with **`findPosition(v+1)`**.',
  examIntro:
    '**`Position(r,c)`** marks a cell. **(a)** **`findPosition(num, intArr)`** — nested loops; return **`new Position(r,c)`** where **`intArr[r][c]==num`**, else **`null`**. **(b)** **`getSuccessorArray`** — same dimensions; each cell is the **`Position`** of **value+1** in **`intArr`**, or **`null`** for the **maximum** value (no successor). Assume **consecutive** integers. Use **`findPosition`** for part (b).',
  examClassContext: FRQ_2017_Q4_SUCCESSORS_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2017 Section II question paper (College Board)', href: AP17_FRQ_PDF },
    { label: '2017 scoring guidelines', href: AP17_SG },
    { label: 'Sample response — question 4', href: AP17_Q4_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`findPosition`',
      body: 'Double **`for`** over rows and columns; compare with **`num`**; **`return null`** after loops.',
    },
    {
      label: '(b)',
      title: '`getSuccessorArray`',
      body:
        'Find **`maxVal`** in **`intArr`**. For each **`v`**, if **`v == maxVal`** store **`null`**; else **`findPosition(v+1, intArr)`**.',
    },
  ],
  solutionHint:
    '**(a)** Classic 2D search.\n\n' +
    '**(b)** Scan for max; fill result with `findPosition(v+1, intArr)` or null.',
};
