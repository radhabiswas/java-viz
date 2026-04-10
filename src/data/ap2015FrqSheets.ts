import type { ApExamFrqSheet } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';

const AP15 = AP_PAST_PAPER_RELEASED_PDFS['2015'];
const AP15_FRQ_PDF = AP15.questionPaper;
const AP15_SG = AP15.scoringGuidelines;
const AP15_Q1_SAMPLE = AP15.sampleByQuestion[0];
const AP15_Q2_SAMPLE = AP15.sampleByQuestion[1];
const AP15_Q3_SAMPLE = AP15.sampleByQuestion[2];
const AP15_Q4_SAMPLE = AP15.sampleByQuestion[3];

/** Printed exam context — Question 1 (DiverseArray). */
export const FRQ_2015_Q1_DIVERSE_ARRAY_PRINTED = `public class DiverseArray {

  /**
   * Returns the sum of the entries in the one-dimensional array arr.
   */
  public static int arraySum(int[] arr) {
    /* to be implemented in part (a) */
  }

  /**
   * Returns a one-dimensional array in which the entry at index k is the sum of
   * the entries of row k of the two-dimensional array arr2D.
   */
  public static int[] rowSums(int[][] arr2D) {
    /* to be implemented in part (b) */
  }

  /**
   * Returns true if all rows in arr2D have different row sums;
   * false otherwise.
   */
  public static boolean isDiverse(int[][] arr2D) {
    /* to be implemented in part (c) */
  }
}
`;

export const FRQ_2015_Q1_REFERENCE_COMPLETE = `public class DiverseArray {

  public static int arraySum(int[] arr) {
    int sum = 0;
    for (int v : arr) {
      sum += v;
    }
    return sum;
  }

  public static int[] rowSums(int[][] arr2D) {
    int[] sums = new int[arr2D.length];
    for (int r = 0; r < arr2D.length; r++) {
      sums[r] = arraySum(arr2D[r]);
    }
    return sums;
  }

  public static boolean isDiverse(int[][] arr2D) {
    int[] sums = rowSums(arr2D);
    for (int i = 0; i < sums.length; i++) {
      for (int j = i + 1; j < sums.length; j++) {
        if (sums[i] == sums[j]) {
          return false;
        }
      }
    }
    return true;
  }
}
`;

export const FRQ_2015_Q1_REF_ARRAY_SUM = `  public static int arraySum(int[] arr) {
    int sum = 0;
    for (int v : arr) {
      sum += v;
    }
    return sum;
  }`;

export const FRQ_2015_Q1_REF_ROW_SUMS = `  public static int[] rowSums(int[][] arr2D) {
    int[] sums = new int[arr2D.length];
    for (int r = 0; r < arr2D.length; r++) {
      sums[r] = arraySum(arr2D[r]);
    }
    return sums;
  }`;

export const FRQ_2015_Q1_REF_IS_DIVERSE = `  public static boolean isDiverse(int[][] arr2D) {
    int[] sums = rowSums(arr2D);
    for (int i = 0; i < sums.length; i++) {
      for (int j = i + 1; j < sums.length; j++) {
        if (sums[i] == sums[j]) {
          return false;
        }
      }
    }
    return true;
  }`;

/** Question 2 — complete class. */
export const FRQ_2015_Q2_HIDDEN_WORD_PRINTED = `public class HiddenWord {

  public HiddenWord(String word) {
    /* to be implemented */
  }

  public String getHint(String guess) {
    /* to be implemented */
  }
}
`;

export const FRQ_2015_Q2_REFERENCE_CLASS = `public class HiddenWord {
  private final String hidden;

  public HiddenWord(String word) {
    hidden = word;
  }

  public String getHint(String guess) {
    StringBuilder hint = new StringBuilder();
    for (int i = 0; i < guess.length(); i++) {
      char g = guess.charAt(i);
      if (g == hidden.charAt(i)) {
        hint.append(g);
      } else if (hidden.indexOf(g) >= 0) {
        hint.append('+');
      } else {
        hint.append('*');
      }
    }
    return hint.toString();
  }
}
`;

export const FRQ_2015_Q2_REF_GET_HINT = `  public String getHint(String guess) {
    StringBuilder hint = new StringBuilder();
    for (int i = 0; i < guess.length(); i++) {
      char g = guess.charAt(i);
      if (g == hidden.charAt(i)) {
        hint.append(g);
      } else if (hidden.indexOf(g) >= 0) {
        hint.append('+');
      } else {
        hint.append('*');
      }
    }
    return hint.toString();
  }`;

/** Question 3 — SparseArrayEntry + SparseArray stubs. */
export const FRQ_2015_Q3_SPARSE_ARRAY_PRINTED = `import java.util.ArrayList;
import java.util.List;

public class SparseArrayEntry {
  private int row;
  private int col;
  private int value;

  public SparseArrayEntry(int r, int c, int v) {
    row = r;
    col = c;
    value = v;
  }

  public int getRow() {
    return row;
  }

  public int getCol() {
    return col;
  }

  public int getValue() {
    return value;
  }
}

public class SparseArray {
  private int numRows;
  private int numCols;
  private List<SparseArrayEntry> entries;

  public SparseArray() {
    entries = new ArrayList<SparseArrayEntry>();
  }

  public int getNumRows() {
    return numRows;
  }

  public int getNumCols() {
    return numCols;
  }

  public int getValueAt(int row, int col) {
    /* to be implemented in part (a) */
  }

  public void removeColumn(int col) {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2015_Q3_REFERENCE_COMPLETE = `import java.util.ArrayList;
import java.util.List;

public class SparseArrayEntry {
  private int row;
  private int col;
  private int value;

  public SparseArrayEntry(int r, int c, int v) {
    row = r;
    col = c;
    value = v;
  }

  public int getRow() {
    return row;
  }

  public int getCol() {
    return col;
  }

  public int getValue() {
    return value;
  }
}

public class SparseArray {
  private int numRows;
  private int numCols;
  private List<SparseArrayEntry> entries;

  public SparseArray() {
    entries = new ArrayList<SparseArrayEntry>();
  }

  public int getNumRows() {
    return numRows;
  }

  public int getNumCols() {
    return numCols;
  }

  public int getValueAt(int row, int col) {
    for (SparseArrayEntry e : entries) {
      if (e.getRow() == row && e.getCol() == col) {
        return e.getValue();
      }
    }
    return 0;
  }

  public void removeColumn(int col) {
    List<SparseArrayEntry> next = new ArrayList<SparseArrayEntry>();
    for (SparseArrayEntry e : entries) {
      if (e.getCol() == col) {
        continue;
      }
      if (e.getCol() > col) {
        next.add(new SparseArrayEntry(e.getRow(), e.getCol() - 1, e.getValue()));
      } else {
        next.add(e);
      }
    }
    entries = next;
    numCols--;
  }
}
`;

export const FRQ_2015_Q3_REF_GET_VALUE_AT = `  public int getValueAt(int row, int col) {
    for (SparseArrayEntry e : entries) {
      if (e.getRow() == row && e.getCol() == col) {
        return e.getValue();
      }
    }
    return 0;
  }`;

export const FRQ_2015_Q3_REF_REMOVE_COLUMN = `  public void removeColumn(int col) {
    List<SparseArrayEntry> next = new ArrayList<SparseArrayEntry>();
    for (SparseArrayEntry e : entries) {
      if (e.getCol() == col) {
        continue;
      }
      if (e.getCol() > col) {
        next.add(new SparseArrayEntry(e.getRow(), e.getCol() - 1, e.getValue()));
      } else {
        next.add(e);
      }
    }
    entries = next;
    numCols--;
  }`;

/** Question 4 — interface, Range, MultipleGroups method. */
export const FRQ_2015_Q4_NUMBER_GROUP_PRINTED = `import java.util.List;

public interface NumberGroup {
  boolean contains(int num);
}

public class Range implements NumberGroup {
  private final int min;
  private final int max;

  public Range(int min, int max) {
    this.min = min;
    this.max = max;
  }

  public boolean contains(int num) {
    /* to be implemented in part (b) */
  }
}

public class MultipleGroups implements NumberGroup {
  private List<NumberGroup> groupList;

  /**
   * Returns true if at least one of the number groups in this multiple group contains num;
   * false otherwise.
   */
  public boolean contains(int num) {
    /* to be implemented in part (c) */
  }
}
`;

export const FRQ_2015_Q4_REFERENCE_COMPLETE = `import java.util.List;

public interface NumberGroup {
  boolean contains(int num);
}

public class Range implements NumberGroup {
  private final int min;
  private final int max;

  public Range(int min, int max) {
    this.min = min;
    this.max = max;
  }

  public boolean contains(int num) {
    return num >= min && num <= max;
  }
}

public class MultipleGroups implements NumberGroup {
  private final List<NumberGroup> groupList;

  public MultipleGroups(List<NumberGroup> groups) {
    groupList = groups;
  }

  public boolean contains(int num) {
    for (NumberGroup g : groupList) {
      if (g.contains(num)) {
        return true;
      }
    }
    return false;
  }
}
`;

export const FRQ_2015_Q4_REF_RANGE_CONTAINS = `  public boolean contains(int num) {
    return num >= min && num <= max;
  }`;

export const FRQ_2015_Q4_REF_MULTI_CONTAINS = `  public boolean contains(int num) {
    for (NumberGroup g : groupList) {
      if (g.contains(num)) {
        return true;
      }
    }
    return false;
  }`;

export const ap2015FrqDiverseArray: ApExamFrqSheet = {
  year: '2015',
  questionNumber: 1,
  headline: '**DiverseArray** — **`arraySum`**, **`rowSums`**, **`isDiverse`**.',
  examIntro:
    'Static methods in **`DiverseArray`**: **(a)** **`arraySum(arr)`** — sum of a **1D** array. **(b)** **`rowSums(arr2D)`** — new **1D** array where index **k** is the sum of row **k** (row-major). **(c)** **`isDiverse(arr2D)`** — **true** iff all row sums are **distinct**; use **`rowSums`** as specified.',
  examClassContext: FRQ_2015_Q1_DIVERSE_ARRAY_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2015 Section II question paper (College Board)', href: AP15_FRQ_PDF },
    { label: '2015 scoring guidelines', href: AP15_SG },
    { label: 'Sample response — question 1', href: AP15_Q1_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`arraySum`',
      body: 'Loop (or accumulate) over **`arr`**; return the **sum** of all elements.',
    },
    {
      label: '(b)',
      title: '`rowSums`',
      body:
        '**`new int[arr2D.length]`**. For each row index **`r`**, set **`sums[r]`** to the sum of **`arr2D[r]`** (may call **`arraySum`**).',
    },
    {
      label: '(c)',
      title: '`isDiverse`',
      body:
        'Call **`rowSums`**. If **any** two row sums are **equal**, return **false**; else **true**.',
    },
  ],
  solutionHint:
    '**(a)** `int sum=0; for (int v : arr) sum += v; return sum;`\n\n' +
    '**(b)** Allocate `sums`, loop rows, `sums[r]=arraySum(arr2D[r])`.\n\n' +
    '**(c)** Nested loop over distinct pairs of `sums` indices; compare values.',
};

export const ap2015FrqHiddenWord: ApExamFrqSheet = {
  year: '2015',
  questionNumber: 2,
  headline: '**HiddenWord** — **`getHint`** vs a **guess** (Mastermind-style).',
  examIntro:
    '**Hidden** word: capital letters, fixed length. **Guess** same length. Each hint character: **same position** as hidden → that **letter**; **else** if letter **appears** elsewhere in hidden → **`+`**; **else** **`*`**. Example: **`HiddenWord("HARPS")`**, **`getHint("HEART")`** → **`"H*++*"`**.',
  examClassContext: FRQ_2015_Q2_HIDDEN_WORD_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2015 Section II question paper (College Board)', href: AP15_FRQ_PDF },
    { label: '2015 scoring guidelines', href: AP15_SG },
    { label: 'Sample response — question 2', href: AP15_Q2_SAMPLE },
  ],
  parts: [
    {
      label: 'Specification',
      title: '`HiddenWord`',
      body:
        'Store **`hidden`**. **`getHint(guess)`** — loop positions **`i`**; **`guess.charAt(i)`** vs **`hidden.charAt(i)`**; else **`hidden.indexOf(guessChar) >= 0`** → **`+`**; else **`*`**.',
    },
  ],
  solutionHint:
    '`StringBuilder`; per index: exact match → append char; else if `hidden.indexOf(g)>=0` append `+`; else `*`.',
};

export const ap2015FrqSparseArray: ApExamFrqSheet = {
  year: '2015',
  questionNumber: 3,
  headline: '**SparseArray** — **`getValueAt`** & **`removeColumn`**.',
  examIntro:
    '**`SparseArrayEntry`** — immutable **row**, **col**, **value**. **`SparseArray`** holds **`List`** of entries (unordered); each non-zero cell has **one** entry. **(a)** **`getValueAt`** — find matching **row/col** in **`entries`** or return **0**. **(b)** **`removeColumn(col)`** — drop entries in that column; shift **`col > col`** down by **1**; **`numCols--`**.',
  examClassContext: FRQ_2015_Q3_SPARSE_ARRAY_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2015 Section II question paper (College Board)', href: AP15_FRQ_PDF },
    { label: '2015 scoring guidelines', href: AP15_SG },
    { label: 'Sample response — question 3', href: AP15_Q3_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`getValueAt`',
      body: 'Traverse **`entries`**; **`getRow()`** / **`getCol()`** match → **`getValue()`**; else **0**.',
    },
    {
      label: '(b)',
      title: '`removeColumn`',
      body:
        'Build **new** list: skip **`e.getCol()==col`**; if **`e.getCol()>col`**, add **`new SparseArrayEntry(row, col-1, value)`**; else keep **`e`**. Replace **`entries`**; decrement **`numCols`**.',
    },
  ],
  solutionHint:
    '**(a)** Enhanced for over `entries` with row/col test.\n\n' +
    '**(b)** New `ArrayList`; `continue` on removed column; else clone with decremented col if needed.',
};

export const ap2015FrqNumberGroup: ApExamFrqSheet = {
  year: '2015',
  questionNumber: 4,
  headline: '**NumberGroup** — interface, **`Range`**, **`MultipleGroups.contains`**.',
  examIntro:
    '**(a)** Interface **`NumberGroup`** with **`boolean contains(int num)`**. **(b)** **`Range`** implements it — inclusive **min**..**max** in constructor. **(c)** **`MultipleGroups`** has **`groupList`**; **`contains(num)`** is **true** if **any** group’s **`contains`** is **true**.',
  examClassContext: FRQ_2015_Q4_NUMBER_GROUP_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2015 Section II question paper (College Board)', href: AP15_FRQ_PDF },
    { label: '2015 scoring guidelines', href: AP15_SG },
    { label: 'Sample response — question 4', href: AP15_Q4_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`NumberGroup`',
      body: 'Single method **`boolean contains(int num)`**.',
    },
    {
      label: '(b)',
      title: '`Range`',
      body: '**`implements NumberGroup`**; store **min**, **max**; **`contains`** → **`num >= min && num <= max`**.',
    },
    {
      label: '(c)',
      title: '`MultipleGroups.contains`',
      body: 'Loop **`groupList`**; if **any** **`g.contains(num)`**, return **true**; else **false**.',
    },
  ],
  solutionHint:
    '**(b)** Two fields + inclusive bounds test.\n\n' + '**(c)** `for (NumberGroup g : groupList) if (g.contains(num)) return true;` then `return false;`.',
};
