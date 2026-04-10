import type { ApExamFrqSheet } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';

const AP21 = AP_PAST_PAPER_RELEASED_PDFS['2021'];
const AP21_FRQ_PDF = AP21.questionPaper;
const AP21_SG = AP21.scoringGuidelines;
const AP21_Q1_SAMPLE = AP21.sampleByQuestion[0];
const AP21_Q2_SAMPLE = AP21.sampleByQuestion[1];
const AP21_Q3_SAMPLE = AP21.sampleByQuestion[2];
const AP21_Q4_SAMPLE = AP21.sampleByQuestion[3];

/** Printed exam context — Question 1 (WordMatch). */
export const FRQ_2021_Q1_WORD_MATCH_PRINTED = `public class WordMatch {

  /** The secret string. */
  private String secret;

  /** Constructs a WordMatch object with the given secret string of lowercase letters. */
  public WordMatch(String word) {
    /* implementation not shown */
  }

  /** Returns a score for guess, as described in part (a).
   * Precondition: 0 < guess.length() <= secret.length()
   */
  public int scoreGuess(String guess) {
    /* to be implemented in part (a) */
  }

  /** Returns the better of two guesses, as determined by scoreGuess and the rules for a
   * tie-breaker that are described in part (b).
   * Precondition: guess1 and guess2 contain all lowercase letters.
   * guess1 is not the same as guess2.
   */
  public String findBetterGuess(String guess1, String guess2) {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2021_Q1_REFERENCE_COMPLETE = `public class WordMatch {
  private String secret;

  public WordMatch(String word) {
    secret = word;
  }

  public int scoreGuess(String guess) {
    int count = 0;
    int len = guess.length();
    for (int i = 0; i <= secret.length() - len; i++) {
      if (secret.substring(i, i + len).equals(guess)) {
        count++;
      }
    }
    return count * len * len;
  }

  public String findBetterGuess(String guess1, String guess2) {
    int s1 = scoreGuess(guess1);
    int s2 = scoreGuess(guess2);
    if (s1 > s2) {
      return guess1;
    }
    if (s2 > s1) {
      return guess2;
    }
    if (guess1.compareTo(guess2) > 0) {
      return guess1;
    }
    return guess2;
  }
}
`;

export const FRQ_2021_Q1_REF_SCORE_GUESS = `  public int scoreGuess(String guess) {
    int count = 0;
    int len = guess.length();
    for (int i = 0; i <= secret.length() - len; i++) {
      if (secret.substring(i, i + len).equals(guess)) {
        count++;
      }
    }
    return count * len * len;
  }`;

export const FRQ_2021_Q1_REF_FIND_BETTER = `  public String findBetterGuess(String guess1, String guess2) {
    int s1 = scoreGuess(guess1);
    int s2 = scoreGuess(guess2);
    if (s1 > s2) {
      return guess1;
    }
    if (s2 > s1) {
      return guess2;
    }
    if (guess1.compareTo(guess2) > 0) {
      return guess1;
    }
    return guess2;
  }`;

/** Question 2 — CombinedTable (SingleTable API from exam). */
export const FRQ_2021_Q2_SINGLE_TABLE_PRINTED = `public class SingleTable {

  /** Returns the number of seats at this table. The value is always greater than or equal to 4. */
  public int getNumSeats() {
    /* implementation not shown */
  }

  /** Returns the height of this table in centimeters. */
  public int getHeight() {
    /* implementation not shown */
  }

  /** Returns the quality of the view from this table. */
  public double getViewQuality() {
    /* implementation not shown */
  }

  /** Sets the quality of the view from this table to value. */
  public void setViewQuality(double value) {
    /* implementation not shown */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}

public class CombinedTable {

  public CombinedTable(SingleTable t1, SingleTable t2) {
    /* to be implemented */
  }

  public boolean canSeat(int n) {
    /* to be implemented */
  }

  public double getDesirability() {
    /* to be implemented */
  }
}
`;

export const FRQ_2021_Q2_REFERENCE_CLASS = `public class CombinedTable {
  private SingleTable first;
  private SingleTable second;

  public CombinedTable(SingleTable t1, SingleTable t2) {
    first = t1;
    second = t2;
  }

  public boolean canSeat(int n) {
    return n <= first.getNumSeats() + second.getNumSeats() - 2;
  }

  public double getDesirability() {
    double avg = (first.getViewQuality() + second.getViewQuality()) / 2.0;
    if (first.getHeight() != second.getHeight()) {
      avg -= 10.0;
    }
    return avg;
  }
}
`;

/** Question 3 — MemberInfo + ClubMembers (raw ArrayList in exam). */
export const FRQ_2021_Q3_CLUB_MEMBERS_PRINTED = `import java.util.ArrayList;

public class MemberInfo {

  /** Constructs a MemberInfo object for the club member with name name,
   * graduation year gradYear, and standing hasGoodStanding.
   */
  public MemberInfo(String name, int gradYear, boolean hasGoodStanding) {
    /* implementation not shown */
  }

  /** Returns the graduation year of the club member. */
  public int getGradYear() {
    /* implementation not shown */
  }

  /** Returns true if the member is in good standing and false otherwise. */
  public boolean inGoodStanding() {
    /* implementation not shown */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}

public class ClubMembers {

  private ArrayList memberList;

  /** Adds new club members to memberList, as described in part (a).
   * Precondition: names is a non-empty array.
   */
  public void addMembers(String[] names, int gradYear) {
    /* to be implemented in part (a) */
  }

  /** Removes members who have graduated and returns a list of members who have graduated
   * and are in good standing, as described in part (b).
   */
  public ArrayList removeMembers(int year) {
    /* to be implemented in part (b) */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}
`;

export const FRQ_2021_Q3_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class MemberInfo {
  private String name;
  private int gradYear;
  private boolean goodStanding;

  public MemberInfo(String name, int gradYear, boolean hasGoodStanding) {
    this.name = name;
    this.gradYear = gradYear;
    goodStanding = hasGoodStanding;
  }

  public int getGradYear() {
    return gradYear;
  }

  public boolean inGoodStanding() {
    return goodStanding;
  }
}

public class ClubMembers {
  private ArrayList<MemberInfo> memberList;

  public ClubMembers() {
    memberList = new ArrayList<MemberInfo>();
  }

  public void addMembers(String[] names, int gradYear) {
    for (String n : names) {
      memberList.add(new MemberInfo(n, gradYear, true));
    }
  }

  public ArrayList<MemberInfo> removeMembers(int year) {
    ArrayList<MemberInfo> graduatedGood = new ArrayList<MemberInfo>();
    for (int i = 0; i < memberList.size(); i++) {
      MemberInfo m = memberList.get(i);
      if (m.getGradYear() <= year && m.inGoodStanding()) {
        graduatedGood.add(m);
      }
    }
    for (int i = memberList.size() - 1; i >= 0; i--) {
      MemberInfo m = memberList.get(i);
      if (m.getGradYear() <= year) {
        memberList.remove(i);
      }
    }
    return graduatedGood;
  }
}
`;

export const FRQ_2021_Q3_REF_ADD_MEMBERS = `  public void addMembers(String[] names, int gradYear) {
    for (String n : names) {
      memberList.add(new MemberInfo(n, gradYear, true));
    }
  }`;

export const FRQ_2021_Q3_REF_REMOVE_MEMBERS = `  public ArrayList<MemberInfo> removeMembers(int year) {
    ArrayList<MemberInfo> graduatedGood = new ArrayList<MemberInfo>();
    for (int i = 0; i < memberList.size(); i++) {
      MemberInfo m = memberList.get(i);
      if (m.getGradYear() <= year && m.inGoodStanding()) {
        graduatedGood.add(m);
      }
    }
    for (int i = memberList.size() - 1; i >= 0; i--) {
      MemberInfo m = memberList.get(i);
      if (m.getGradYear() <= year) {
        memberList.remove(i);
      }
    }
    return graduatedGood;
  }`;

export const FRQ_2021_Q4_ARRAY_RESIZER_PRINTED = `public class ArrayResizer {

  /** Returns true if and only if every value in row r of array2D is non-zero.
   * Precondition: r is a valid row index in array2D.
   * Postcondition: array2D is unchanged.
   */
  public static boolean isNonZeroRow(int[][] array2D, int r) {
    /* to be implemented in part (a) */
  }

  /** Returns the number of rows in array2D that contain all non-zero values.
   * Postcondition: array2D is unchanged.
   */
  public static int numNonZeroRows(int[][] array2D) {
    /* implementation not shown */
  }

  /** Returns a new, possibly smaller, two-dimensional array that contains only rows
   * from array2D with no zeros, as described in part (b).
   * Precondition: array2D contains at least one column and at least one row with no zeros.
   * Postcondition: array2D is unchanged.
   */
  public static int[][] resize(int[][] array2D) {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2021_Q4_REFERENCE_COMPLETE = `public class ArrayResizer {

  public static boolean isNonZeroRow(int[][] array2D, int r) {
    for (int c = 0; c < array2D[r].length; c++) {
      if (array2D[r][c] == 0) {
        return false;
      }
    }
    return true;
  }

  public static int numNonZeroRows(int[][] array2D) {
    int n = 0;
    for (int row = 0; row < array2D.length; row++) {
      if (isNonZeroRow(array2D, row)) {
        n++;
      }
    }
    return n;
  }

  public static int[][] resize(int[][] array2D) {
    int rows = numNonZeroRows(array2D);
    int cols = array2D[0].length;
    int[][] smaller = new int[rows][cols];
    int dest = 0;
    for (int r = 0; r < array2D.length; r++) {
      if (isNonZeroRow(array2D, r)) {
        for (int c = 0; c < cols; c++) {
          smaller[dest][c] = array2D[r][c];
        }
        dest++;
      }
    }
    return smaller;
  }
}
`;

export const FRQ_2021_Q4_REF_IS_NON_ZERO_ROW = `  public static boolean isNonZeroRow(int[][] array2D, int r) {
    for (int c = 0; c < array2D[r].length; c++) {
      if (array2D[r][c] == 0) {
        return false;
      }
    }
    return true;
  }`;

export const FRQ_2021_Q4_REF_RESIZE = `  public static int[][] resize(int[][] array2D) {
    int rows = numNonZeroRows(array2D);
    int cols = array2D[0].length;
    int[][] smaller = new int[rows][cols];
    int dest = 0;
    for (int r = 0; r < array2D.length; r++) {
      if (isNonZeroRow(array2D, r)) {
        for (int c = 0; c < cols; c++) {
          smaller[dest][c] = array2D[r][c];
        }
        dest++;
      }
    }
    return smaller;
  }`;

export const ap2021FrqWordMatch: ApExamFrqSheet = {
  year: '2021',
  questionNumber: 1,
  headline: '**WordMatch** — **substring** occurrences × **length²**; **`findBetterGuess`** & ties.',
  examIntro:
    '**`secret`** is a lowercase string. **`scoreGuess(guess)`** counts how many times **`guess`** occurs as a **substring** of **`secret`** (**overlapping** allowed), then returns **count × guess.length()²**. **`findBetterGuess`** returns the guess with the **higher** score; if scores tie, return the **lexicographically greater** string (`compareTo`).',
  examClassContext: FRQ_2021_Q1_WORD_MATCH_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2021 Section II question paper (College Board)', href: AP21_FRQ_PDF },
    { label: '2021 scoring guidelines', href: AP21_SG },
    { label: 'Sample response — question 1', href: AP21_Q1_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`scoreGuess`',
      body:
        'Slide a window of length **`guess.length()`** along **`secret`**: each position **`i`** where **`secret.substring(i, i+len)`** equals **`guess`** counts. Return **`count * len * len`**.',
    },
    {
      label: '(b)',
      title: '`findBetterGuess`',
      body:
        'Compare **`scoreGuess(guess1)`** vs **`scoreGuess(guess2)`**; return the higher-scoring guess. If equal, return whichever is **greater** by **`compareTo`**.',
    },
  ],
  solutionHint:
    '**(a)** `for (int i = 0; i <= secret.length() - len; i++)` with `substring` + `equals`.\n\n' +
    '**(b)** Compare scores; on tie use `guess1.compareTo(guess2) > 0 ? guess1 : guess2`.',
};

export const ap2021FrqCombinedTable: ApExamFrqSheet = {
  year: '2021',
  questionNumber: 2,
  headline: '**CombinedTable** — two **`SingleTable`** refs, **`canSeat`**, **`getDesirability`**.',
  examIntro:
    'A **combined** table seats **two fewer** than the sum of the two **`SingleTable`** seat counts (lost seats where tables meet). **`canSeat(n)`** is **true** iff **`n`** ≤ that capacity. **`getDesirability()`** is the **average** of the two view qualities; if **heights differ**, subtract **10** from that average. Hold **references** to the two tables so **`setViewQuality`** on a **`SingleTable`** affects the combined table’s desirability.',
  examClassContext: FRQ_2021_Q2_SINGLE_TABLE_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2021 Section II question paper (College Board)', href: AP21_FRQ_PDF },
    { label: '2021 scoring guidelines', href: AP21_SG },
    { label: 'Sample response — question 2', href: AP21_Q2_SAMPLE },
  ],
  parts: [
    {
      label: 'Specification',
      title: '`CombinedTable`',
      body:
        '**Fields** — two **`SingleTable`** references set in the constructor. **`canSeat`** — compare **`n`** to **`t1.getNumSeats() + t2.getNumSeats() - 2`**. **`getDesirability`** — average views; **`-10`** when **`getHeight()`** values differ.',
    },
  ],
  solutionHint:
    'Store `SingleTable` fields. `canSeat`: sum seats − 2. `getDesirability`: `(v1+v2)/2` or that minus 10 if heights differ.',
};

export const ap2021FrqClubMembers: ApExamFrqSheet = {
  year: '2021',
  questionNumber: 3,
  headline: '**ClubMembers** — **`addMembers`**; **`removeMembers`** (graduate + good standing list).',
  examIntro:
    '**`addMembers(names, gradYear)`** adds one **`MemberInfo`** per name with that graduation year and **good standing** **true** (any order). **`removeMembers(year)`** returns a **new list** of members whose **`getGradYear() <= year`** **and** **`inGoodStanding()`**, then **removes every** member with **`getGradYear() <= year`** from **`memberList`** (including not in good standing).',
  examClassContext: FRQ_2021_Q3_CLUB_MEMBERS_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2021 Section II question paper (College Board)', href: AP21_FRQ_PDF },
    { label: '2021 scoring guidelines', href: AP21_SG },
    { label: 'Sample response — question 3', href: AP21_Q3_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`addMembers`',
      body: 'For each name in **`names`**, **`add(new MemberInfo(name, gradYear, true))`** to **`memberList`**.',
    },
    {
      label: '(b)',
      title: '`removeMembers`',
      body:
        'First pass: collect members with **`gradYear <= year`** and **good standing** into the result list. Second pass (often **backwards**): **`remove`** all with **`gradYear <= year`** from **`memberList`**.',
    },
  ],
  solutionHint:
    '**(a)** Simple loop with `new MemberInfo(..., true)`.\n\n' + '**(b)** Build return list, then remove all graduated; iterate from end when removing to avoid index shift bugs.',
};

export const ap2021FrqArrayResizer: ApExamFrqSheet = {
  year: '2021',
  questionNumber: 4,
  headline: '**ArrayResizer** — **`isNonZeroRow`**; **`resize`** using **`numNonZeroRows`**.',
  examIntro:
    '**`isNonZeroRow(array2D, r)`** is **true** iff **every** entry in row **`r`** is non-zero. **`resize`** returns a **new** 2D array containing **only** rows with **no zeros**, **preserving order**. Use **`numNonZeroRows`** (given) and **`isNonZeroRow`** as required.',
  examClassContext: FRQ_2021_Q4_ARRAY_RESIZER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2021 Section II question paper (College Board)', href: AP21_FRQ_PDF },
    { label: '2021 scoring guidelines', href: AP21_SG },
    { label: 'Sample response — question 4', href: AP21_Q4_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`isNonZeroRow`',
      body: 'Loop each column index **`c`** in **`array2D[r]`**; if any **`array2D[r][c] == 0`**, return **false**; else **true**.',
    },
    {
      label: '(b)',
      title: '`resize`',
      body:
        'Allocate **`new int[numNonZeroRows(array2D)][array2D[0].length]`**. Walk rows in order; copy each **all-non-zero** row into the next free row of the result.',
    },
  ],
  solutionHint:
    '**(a)** `for (c…)` test zero.\n\n' + '**(b)** `dest` index; copy row when `isNonZeroRow` is true.',
};
