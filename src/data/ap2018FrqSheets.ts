import type { ApExamFrqSheet } from '../types';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';

const pack = AP_PAST_PAPER_RELEASED_PDFS['2018'];
const AP18_FRQ_PDF = pack.questionPaper;
const AP18_SG = pack.scoringGuidelines;
const [AP18_Q1_SAMPLE, AP18_Q2_SAMPLE, AP18_Q3_SAMPLE, AP18_Q4_SAMPLE] = pack.sampleByQuestion;

/** Printed exam context — Question 1 (FrogSimulation). */
export const FRQ_2018_Q1_FROG_PRINTED = `public class FrogSimulation {

  /** Distance, in inches, from the starting position to the goal. */
  private int goalDistance;

  /** Maximum number of hops allowed to reach the goal. */
  private int maxHops;

  /**
   * Constructs a FrogSimulation where dist is the distance, in inches, from the starting
   * position to the goal, and numHops is the maximum number of hops allowed to reach the goal.
   * Precondition: dist > 0; numHops > 0
   */
  public FrogSimulation(int dist, int numHops) {
    goalDistance = dist;
    maxHops = numHops;
  }

  /** Returns an integer representing the distance, in inches, to be moved when the frog hops. */
  private int hopDistance() {
    /* implementation not shown */
  }

  /**
   * Simulates a frog attempting to reach the goal as described in part (a).
   * Returns true if the frog successfully reached or passed the goal during the simulation;
   * false otherwise.
   */
  public boolean simulate() {
    /* to be implemented in part (a) */
  }

  /**
   * Runs num simulations and returns the proportion of simulations in which the frog
   * successfully reached or passed the goal.
   * Precondition: num > 0
   */
  public double runSimulations(int num) {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2018_Q1_REFERENCE_COMPLETE = `public class FrogSimulation {

  private int goalDistance;
  private int maxHops;

  public FrogSimulation(int dist, int numHops) {
    goalDistance = dist;
    maxHops = numHops;
  }

  private int hopDistance() {
    return (int) (Math.random() * 31) - 10;
  }

  public boolean simulate() {
    int position = 0;
    for (int count = 0; count < maxHops; count++) {
      position += hopDistance();
      if (position >= goalDistance) {
        return true;
      }
      if (position < 0) {
        return false;
      }
    }
    return false;
  }

  public double runSimulations(int num) {
    int countSuccess = 0;
    for (int count = 0; count < num; count++) {
      if (simulate()) {
        countSuccess++;
      }
    }
    return (double) countSuccess / num;
  }
}
`;

export const FRQ_2018_Q1_REF_SIMULATE = `  public boolean simulate() {
    int position = 0;
    for (int count = 0; count < maxHops; count++) {
      position += hopDistance();
      if (position >= goalDistance) {
        return true;
      }
      if (position < 0) {
        return false;
      }
    }
    return false;
  }`;

export const FRQ_2018_Q1_REF_RUN_SIMULATIONS = `  public double runSimulations(int num) {
    int countSuccess = 0;
    for (int count = 0; count < num; count++) {
      if (simulate()) {
        countSuccess++;
      }
    }
    return (double) countSuccess / num;
  }`;

export const FRQ_2018_Q2_WORD_PAIR_LIST_PRINTED = `import java.util.ArrayList;

public class WordPair {

  /** Constructs a WordPair object. */
  public WordPair(String first, String second) {
    /* implementation not shown */
  }

  /** Returns the first string of this WordPair object. */
  public String getFirst() {
    /* implementation not shown */
  }

  /** Returns the second string of this WordPair object. */
  public String getSecond() {
    /* implementation not shown */
  }
}

public class WordPairList {

  /** The list of word pairs, initialized by the constructor. */
  private ArrayList allPairs;

  /**
   * Constructs a WordPairList object as described in part (a).
   * Precondition: words.length >= 2
   */
  public WordPairList(String[] words) {
    /* to be implemented in part (a) */
  }

  /** Returns the number of matches as described in part (b). */
  public int numMatches() {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2018_Q2_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class WordPair {
  private final String first;
  private final String second;

  public WordPair(String first, String second) {
    this.first = first;
    this.second = second;
  }

  public String getFirst() {
    return first;
  }

  public String getSecond() {
    return second;
  }
}

public class WordPairList {
  private ArrayList<WordPair> allPairs;

  public WordPairList(String[] words) {
    allPairs = new ArrayList<WordPair>();
    for (int i = 0; i < words.length; i++) {
      for (int j = i + 1; j < words.length; j++) {
        allPairs.add(new WordPair(words[i], words[j]));
      }
    }
  }

  public int numMatches() {
    int count = 0;
    for (int i = 0; i < allPairs.size(); i++) {
      WordPair p = allPairs.get(i);
      if (p.getFirst().equals(p.getSecond())) {
        count++;
      }
    }
    return count;
  }
}
`;

export const FRQ_2018_Q2_REF_CONSTRUCTOR = `  public WordPairList(String[] words) {
    allPairs = new ArrayList<WordPair>();
    for (int i = 0; i < words.length; i++) {
      for (int j = i + 1; j < words.length; j++) {
        allPairs.add(new WordPair(words[i], words[j]));
      }
    }
  }`;

export const FRQ_2018_Q2_REF_NUM_MATCHES = `  public int numMatches() {
    int count = 0;
    for (int i = 0; i < allPairs.size(); i++) {
      WordPair p = allPairs.get(i);
      if (p.getFirst().equals(p.getSecond())) {
        count++;
      }
    }
    return count;
  }`;

export const FRQ_2018_Q3_CODE_WORD_CHECKER_PRINTED = `public interface StringChecker {

  /** Returns true if str is valid. */
  boolean isValid(String str);
}

public class CodeWordChecker implements StringChecker {

  public CodeWordChecker(int minLen, int maxLen, String str) {
    /* to be implemented */
  }

  public CodeWordChecker(String str) {
    /* to be implemented */
  }

  public boolean isValid(String str) {
    /* to be implemented */
  }
}
`;

export const FRQ_2018_Q3_REFERENCE_COMPLETE = `public interface StringChecker {

  boolean isValid(String str);
}

public class CodeWordChecker implements StringChecker {
  private int minLen;
  private int maxLen;
  private String forbidden;

  public CodeWordChecker(int minLen, int maxLen, String str) {
    this.minLen = minLen;
    this.maxLen = maxLen;
    forbidden = str;
  }

  public CodeWordChecker(String str) {
    minLen = 6;
    maxLen = 20;
    forbidden = str;
  }

  public boolean isValid(String str) {
    int len = str.length();
    if (len < minLen || len > maxLen) {
      return false;
    }
    return str.indexOf(forbidden) < 0;
  }
}
`;

export const FRQ_2018_Q4_ARRAY_TESTER_PRINTED = `public class ArrayTester {

  /**
   * Returns an array containing the elements of column c of arr2D in the same order as
   * they appear in arr2D.
   * Precondition: c is a valid column index in arr2D.
   * Postcondition: arr2D is unchanged.
   */
  public static int[] getColumn(int[][] arr2D, int c) {
    /* to be implemented in part (a) */
  }

  /**
   * Returns true if and only if every value in arr1 appears in arr2.
   * Precondition: arr1 and arr2 have the same length.
   * Postcondition: arr1 and arr2 are unchanged.
   */
  public static boolean hasAllValues(int[] arr1, int[] arr2) {
    /* implementation not shown */
  }

  /**
   * Returns true if arr contains any duplicate values;
   * false otherwise.
   */
  public static boolean containsDuplicates(int[] arr) {
    /* implementation not shown */
  }

  /**
   * Returns true if square is a Latin square as described in part (b);
   * false otherwise.
   * Precondition: square has an equal number of rows and columns.
   * square has at least one row.
   */
  public static boolean isLatin(int[][] square) {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2018_Q4_REFERENCE_COMPLETE = `public class ArrayTester {

  public static int[] getColumn(int[][] arr2D, int c) {
    int[] result = new int[arr2D.length];
    for (int r = 0; r < arr2D.length; r++) {
      result[r] = arr2D[r][c];
    }
    return result;
  }

  public static boolean hasAllValues(int[] arr1, int[] arr2) {
    for (int v : arr1) {
      boolean found = false;
      for (int x : arr2) {
        if (x == v) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }

  public static boolean containsDuplicates(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          return true;
        }
      }
    }
    return false;
  }

  public static boolean isLatin(int[][] square) {
    if (containsDuplicates(square[0])) {
      return false;
    }
    for (int r = 1; r < square.length; r++) {
      if (!hasAllValues(square[0], square[r])) {
        return false;
      }
    }
    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return false;
      }
    }
    return true;
  }
}
`;

export const FRQ_2018_Q4_REF_GET_COLUMN = `  public static int[] getColumn(int[][] arr2D, int c) {
    int[] result = new int[arr2D.length];
    for (int r = 0; r < arr2D.length; r++) {
      result[r] = arr2D[r][c];
    }
    return result;
  }`;

export const FRQ_2018_Q4_REF_IS_LATIN = `  public static boolean isLatin(int[][] square) {
    if (containsDuplicates(square[0])) {
      return false;
    }
    for (int r = 1; r < square.length; r++) {
      if (!hasAllValues(square[0], square[r])) {
        return false;
      }
    }
    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return false;
      }
    }
    return true;
  }`;

export const ap2018FrqFrogSimulation: ApExamFrqSheet = {
  year: '2018',
  questionNumber: 1,
  headline: '**FrogSimulation** — **`hopDistance`** loop; **`runSimulations`** proportion.',
  examIntro:
    '**`goalDistance`** inches to the goal; **`maxHops`** cap. **`hopDistance()`** (private, not shown) returns **positive** (toward goal) or **negative** (away). **`simulate()`** starts at **0**; each hop adds **`hopDistance()`**. Stop and return **`true`** if position **≥ `goalDistance`**; **`false`** immediately if position **< 0**; after **`maxHops`** without success return **`false`**. **`runSimulations(num)`** calls **`simulate`** **`num`** times and returns **`(double) successes / num`**.',
  examClassContext: FRQ_2018_Q1_FROG_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2018 Section II question paper (College Board)', href: AP18_FRQ_PDF },
    { label: '2018 scoring guidelines', href: AP18_SG },
    { label: 'Sample response — question 1', href: AP18_Q1_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`simulate`',
      body:
        'Loop **at most `maxHops`**: add **`hopDistance()`** to position. If **≥ `goalDistance`** → **`true`**. If **< 0** → **`false`**. After loop → **`false`**.',
    },
    {
      label: '(b)',
      title: '`runSimulations`',
      body: 'Count how many **`simulate()`** calls return **`true`**; return **`(double) count / num`** (precondition **`num > 0`**).',
    },
  ],
  solutionHint:
    '**(a)** `int position = 0;` loop `count < maxHops`, `position += hopDistance()`, check goal then negative.\n\n' +
    '**(b)** `countSuccess` loop; `return (double) countSuccess / num;`.',
};

export const ap2018FrqWordPairList: ApExamFrqSheet = {
  year: '2018',
  questionNumber: 2,
  headline: '**WordPairList** — all **i < j** pairs; **`numMatches`** equal strings.',
  examIntro:
    '**`WordPair`** exposes **`getFirst`** / **`getSecond`**. **(a)** Constructor fills **`allPairs`** with **`new WordPair(words[i], words[j])`** for every **0 ≤ i < j < words.length** (each pair once; order of list not specified). **(b)** **`numMatches`** counts pairs where **`getFirst().equals(getSecond())`**.',
  examClassContext: FRQ_2018_Q2_WORD_PAIR_LIST_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2018 Section II question paper (College Board)', href: AP18_FRQ_PDF },
    { label: '2018 scoring guidelines', href: AP18_SG },
    { label: 'Sample response — question 2', href: AP18_Q2_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body: '**`allPairs = new ArrayList();`** then nested loops **`i`**, **`j = i + 1`** … **`words.length - 1`**, **`add(new WordPair(words[i], words[j]))`**.',
    },
    {
      label: '(b)',
      title: '`numMatches`',
      body: 'Traverse **`allPairs`**; increment when **`getFirst().equals(getSecond())`**.',
    },
  ],
  solutionHint: '**(a)** Classic **i < j** double loop.\n\n' + '**(b)** `equals` on the two strings in each `WordPair`.',
};

export const ap2018FrqCodeWordChecker: ApExamFrqSheet = {
  year: '2018',
  questionNumber: 3,
  headline: '**CodeWordChecker** — **`StringChecker`**; length bounds & forbidden substring.',
  examIntro:
    '**`StringChecker.isValid(str)`**. **Three-arg** constructor: **min** and **max** length (inclusive) and a string that **must not appear** in a valid code word. **One-arg** constructor: only the forbidden string; lengths default to **6** and **20** inclusive. **`isValid`** fails if length out of bounds or **`str.indexOf(forbidden) >= 0`**.',
  examClassContext: FRQ_2018_Q3_CODE_WORD_CHECKER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2018 Section II question paper (College Board)', href: AP18_FRQ_PDF },
    { label: '2018 scoring guidelines', href: AP18_SG },
    { label: 'Sample response — question 3', href: AP18_Q3_SAMPLE },
  ],
  parts: [
    {
      label: 'Constructors',
      title: 'State',
      body: 'Store **min**, **max**, and **forbidden**. Default **6**/**20** when only the string is supplied.',
    },
    {
      label: '`isValid`',
      title: 'Rules',
      body: 'Reject if **`str.length()`** outside **[min, max]** or forbidden substring present.',
    },
  ],
  solutionHint: 'Fields + two constructors. `isValid`: length check, then `str.indexOf(forbidden) < 0`.',
};

export const ap2018FrqArrayTester: ApExamFrqSheet = {
  year: '2018',
  questionNumber: 4,
  headline: '**ArrayTester** — **`getColumn`**; **`isLatin`** with helpers.',
  examIntro:
    '**(a)** **`getColumn(arr2D, c)`** — new **`int[arr2D.length]`**, fill **`result[r] = arr2D[r][c]`**. **(b)** **`isLatin(square)`** — **false** if **`containsDuplicates(square[0])`**. Else for **each other row** **`hasAllValues(square[0], square[r])`**. For **each column** **`c`**, **`hasAllValues(square[0], getColumn(square, c))`**. All pass → **`true`**.',
  examClassContext: FRQ_2018_Q4_ARRAY_TESTER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2018 Section II question paper (College Board)', href: AP18_FRQ_PDF },
    { label: '2018 scoring guidelines', href: AP18_SG },
    { label: 'Sample response — question 4', href: AP18_Q4_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`getColumn`',
      body: 'Length = **number of rows**; copy **`arr2D[r][c]`** for **r = 0 … length-1**.',
    },
    {
      label: '(b)',
      title: '`isLatin`',
      body:
        'Use **`containsDuplicates`** on row **0**, then **`hasAllValues`** vs each row and vs **`getColumn`** for each column index.',
    },
  ],
  solutionHint:
    '**(a)** `new int[arr2D.length]` + row loop.\n\n' + '**(b)** Guard duplicates; double loop rows; loop `c` with `getColumn`.',
};
