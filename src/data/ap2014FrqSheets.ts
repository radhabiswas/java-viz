import type { ApExamFrqSheet } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';

const AP14 = AP_PAST_PAPER_RELEASED_PDFS['2014'];
const AP14_FRQ_PDF = AP14.questionPaper;
const AP14_SG = AP14.scoringGuidelines;
const AP14_Q1_SAMPLE = AP14.sampleByQuestion[0];
const AP14_Q2_SAMPLE = AP14.sampleByQuestion[1];
const AP14_Q3_SAMPLE = AP14.sampleByQuestion[2];
const AP14_Q4_SAMPLE = AP14.sampleByQuestion[3];

/** Printed exam context — Question 1 (scrambleWord / scrambleOrRemove). */
export const FRQ_2014_Q1_SCRAMBLE_PRINTED = `import java.util.List;

public class Scramble {

  /** Scrambles a given word.
   * @param word the word to be scrambled
   * @return the scrambled word (possibly equal to word)
   * Precondition: word is either an empty string or contains only uppercase letters.
   * Postcondition: the string returned was created from word as follows:
   * - the word was scrambled, beginning at the first letter and continuing from left to right
   * - two consecutive letters consisting of "A" followed by a letter that was not "A" were swapped
   * - letters were swapped at most once
   */
  public static String scrambleWord(String word) {
    /* to be implemented in part (a) */
  }

  /** Modifies wordList by replacing each word with its scrambled
   * version, removing any words that are unchanged as a result of scrambling.
   * @param wordList the list of words
   * Precondition: wordList contains only non-null objects
   * Postcondition:
   * - all words unchanged by scrambling have been removed from wordList
   * - each of the remaining words has been replaced by its scrambled version
   * - the relative ordering of the entries in wordList is the same as it was
   * before the method was called
   */
  public static void scrambleOrRemove(List wordList) {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2014_Q1_REFERENCE_COMPLETE = `import java.util.List;

public class Scramble {

  public static String scrambleWord(String word) {
    StringBuilder sb = new StringBuilder(word);
    int i = 0;
    while (i < sb.length() - 1) {
      if (sb.charAt(i) == 'A' && sb.charAt(i + 1) != 'A') {
        char t = sb.charAt(i);
        sb.setCharAt(i, sb.charAt(i + 1));
        sb.setCharAt(i + 1, t);
        i += 2;
      } else {
        i++;
      }
    }
    return sb.toString();
  }

  public static void scrambleOrRemove(List<String> wordList) {
    for (int i = 0; i < wordList.size(); i++) {
      String original = wordList.get(i);
      String scram = scrambleWord(original);
      if (scram.equals(original)) {
        wordList.remove(i);
        i--;
      } else {
        wordList.set(i, scram);
      }
    }
  }
}
`;

export const FRQ_2014_Q1_REF_SCRAMBLE_WORD = `  public static String scrambleWord(String word) {
    StringBuilder sb = new StringBuilder(word);
    int i = 0;
    while (i < sb.length() - 1) {
      if (sb.charAt(i) == 'A' && sb.charAt(i + 1) != 'A') {
        char t = sb.charAt(i);
        sb.setCharAt(i, sb.charAt(i + 1));
        sb.setCharAt(i + 1, t);
        i += 2;
      } else {
        i++;
      }
    }
    return sb.toString();
  }`;

export const FRQ_2014_Q1_REF_SCRAMBLE_OR_REMOVE = `  public static void scrambleOrRemove(List<String> wordList) {
    for (int i = 0; i < wordList.size(); i++) {
      String original = wordList.get(i);
      String scram = scrambleWord(original);
      if (scram.equals(original)) {
        wordList.remove(i);
        i--;
      } else {
        wordList.set(i, scram);
      }
    }
  }`;

/** Question 2 — GridWorld **Director** (extends **Rock**). */
export const FRQ_2014_Q2_DIRECTOR_PRINTED = `import java.awt.Color;

public class Director extends Rock {
  /* Write the complete class: zero-parameter constructor; act().
   * Initial color Color.RED; alternate RED/GREEN each act().
   * If GREEN at the start of act(), each neighboring Actor turns 90° right. */
}
`;

export const FRQ_2014_Q2_DIRECTOR_REFERENCE = `import java.awt.Color;

public class Director extends Rock {

  public Director() {
    setColor(Color.RED);
  }

  public void act() {
    if (getColor().equals(Color.GREEN)) {
      Grid<Actor> gr = getGrid();
      if (gr != null) {
        for (Location loc : gr.getOccupiedAdjacentLocations(getLocation())) {
          Actor neighbor = gr.get(loc);
          neighbor.setDirection(neighbor.getDirection() + Location.RIGHT);
        }
      }
    }
    if (getColor().equals(Color.RED)) {
      setColor(Color.GREEN);
    } else {
      setColor(Color.RED);
    }
  }
}
`;

export const FRQ_2014_Q2_REF_ACT = `  public void act() {
    if (getColor().equals(Color.GREEN)) {
      Grid<Actor> gr = getGrid();
      if (gr != null) {
        for (Location loc : gr.getOccupiedAdjacentLocations(getLocation())) {
          Actor neighbor = gr.get(loc);
          neighbor.setDirection(neighbor.getDirection() + Location.RIGHT);
        }
      }
    }
    if (getColor().equals(Color.RED)) {
      setColor(Color.GREEN);
    } else {
      setColor(Color.RED);
    }
  }`;

/** Question 3 — **SeatingChart** (2D array, column-major fill). */
export const FRQ_2014_Q3_SEATING_PRINTED = `import java.util.List;

public class Student {
  /** Returns the name of this Student. */
  public String getName() {
    /* implementation not shown */
  }

  /** Returns the number of times this Student has missed class. */
  public int getAbsenceCount() {
    /* implementation not shown */
  }
}

public class SeatingChart {

  /** seats[r][c] represents the Student in row r and column c in the classroom. */
  private Student[][] seats;

  /** Creates a seating chart with the given number of rows and columns from the students in
   * studentList. Empty seats in the seating chart are represented by null.
   * @param rows the number of rows of seats in the classroom
   * @param cols the number of columns of seats in the classroom
   * Precondition: rows > 0; cols > 0;
   * rows * cols >= studentList.size()
   * Postcondition:
   * - Students appear in the seating chart in the same order as they appear
   * in studentList, starting at seats[0][0].
   * - seats is filled column by column from studentList, followed by any
   * empty seats (represented by null).
   * - studentList is unchanged.
   */
  public SeatingChart(List studentList, int rows, int cols) {
    /* to be implemented in part (a) */
  }

  /** Removes students who have more than a given number of absences from the
   * seating chart, replacing those entries in the seating chart with null
   * and returns the number of students removed.
   * @param allowedAbsences an integer >= 0
   * @return number of students removed from seats
   * Postcondition:
   * - All students with allowedAbsences or fewer are in their original positions in seats.
   * - No student in seats has more than allowedAbsences absences.
   * - Entries without students contain null.
   */
  public int removeAbsentStudents(int allowedAbsences) {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2014_Q3_REFERENCE_COMPLETE = `import java.util.List;

public class SeatingChart {
  private Student[][] seats;

  public SeatingChart(List<Student> studentList, int rows, int cols) {
    seats = new Student[rows][cols];
    int idx = 0;
    for (int c = 0; c < cols; c++) {
      for (int r = 0; r < rows; r++) {
        if (idx < studentList.size()) {
          seats[r][c] = studentList.get(idx);
          idx++;
        } else {
          seats[r][c] = null;
        }
      }
    }
  }

  public int removeAbsentStudents(int allowedAbsences) {
    int removed = 0;
    for (int r = 0; r < seats.length; r++) {
      for (int c = 0; c < seats[r].length; c++) {
        Student s = seats[r][c];
        if (s != null && s.getAbsenceCount() > allowedAbsences) {
          seats[r][c] = null;
          removed++;
        }
      }
    }
    return removed;
  }
}
`;

export const FRQ_2014_Q3_REF_CONSTRUCTOR = `  public SeatingChart(List<Student> studentList, int rows, int cols) {
    seats = new Student[rows][cols];
    int idx = 0;
    for (int c = 0; c < cols; c++) {
      for (int r = 0; r < rows; r++) {
        if (idx < studentList.size()) {
          seats[r][c] = studentList.get(idx);
          idx++;
        } else {
          seats[r][c] = null;
        }
      }
    }
  }`;

export const FRQ_2014_Q3_REF_REMOVE_ABSENT = `  public int removeAbsentStudents(int allowedAbsences) {
    int removed = 0;
    for (int r = 0; r < seats.length; r++) {
      for (int c = 0; c < seats[r].length; c++) {
        Student s = seats[r][c];
        if (s != null && s.getAbsenceCount() > allowedAbsences) {
          seats[r][c] = null;
          removed++;
        }
      }
    }
    return removed;
  }`;

/** Question 4 — **Trio** implements **MenuItem**. */
export const FRQ_2014_Q4_TRIO_PRINTED = `public interface MenuItem {
  /** @return the name of the menu item */
  String getName();

  /** @return the price of the menu item */
  double getPrice();
}

public class Trio implements MenuItem {

  public Trio(Sandwich sandwich, Salad salad, Drink drink) {
    /* to be implemented */
  }

  public String getName() {
    /* to be implemented */
  }

  public double getPrice() {
    /* to be implemented */
  }
}
`;

export const FRQ_2014_Q4_TRIO_REFERENCE = `public interface MenuItem {
  String getName();

  double getPrice();
}

public class Trio implements MenuItem {
  private Sandwich sandwich;
  private Salad salad;
  private Drink drink;

  public Trio(Sandwich sandwich, Salad salad, Drink drink) {
    this.sandwich = sandwich;
    this.salad = salad;
    this.drink = drink;
  }

  public String getName() {
    return sandwich.getName() + "/" + salad.getName() + "/" + drink.getName() + " Trio";
  }

  public double getPrice() {
    double a = sandwich.getPrice();
    double b = salad.getPrice();
    double c = drink.getPrice();
    return a + b + c - Math.min(a, Math.min(b, c));
  }
}
`;

export const ap2014FrqScramble: ApExamFrqSheet = {
  year: '2014',
  questionNumber: 1,
  headline: '**Scramble** — **A** + non-**A** swaps left-to-right; **`scrambleOrRemove`** on a **List**.',
  examIntro:
    '**(a)** **`scrambleWord`** — scan **left to right**. Whenever **`"A"`** is immediately followed by a **non-`A`**, **swap** those two characters; **neither** position may participate in **another** swap. **(b)** **`scrambleOrRemove`** — replace each list entry with **`scrambleWord`**, **remove** entries **unchanged** by scrambling; **preserve order**.',
  examClassContext: FRQ_2014_Q1_SCRAMBLE_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2014 Section II question paper (College Board)', href: AP14_FRQ_PDF },
    { label: '2014 scoring guidelines', href: AP14_SG },
    { label: 'Sample response — question 1', href: AP14_Q1_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`scrambleWord`',
      body:
        'Walk index **i** through the word. If **`charAt(i) == \'A\'`** and **`charAt(i+1) != \'A\'`**, swap and advance **i** by **2**; else **i++**. Use **`StringBuilder`** or build a new string.',
    },
    {
      label: '(b)',
      title: '`scrambleOrRemove`',
      body:
        'For each index **i**, compute **`scrambleWord(get(i))`**. If equal to original, **`remove(i)`** and **`i--`**; else **`set(i, scrambled)`**.',
    },
  ],
  solutionHint:
    '**(a)** `while (i < len-1)` with swap on `A` + non-`A`, then `i += 2`, else `i++`.\n\n' +
    '**(b)** Forward loop with `remove`/`set` and index adjustment.',
};

export const ap2014FrqDirector: ApExamFrqSheet = {
  year: '2014',
  questionNumber: 2,
  headline: '**Director** (GridWorld) — **Rock** that **toggles** **RED**/**GREEN** and **rotates** neighbors.',
  examIntro:
    '**GridWorld** case study. **`Director`** extends **`Rock`**. **Constructor** — initial **`Color.RED`**. **`act`** — if color is **`GREEN`** at the **start**, each **`Actor`** in **occupied** adjacent cells turns **`Location.RIGHT`** (90°) from its current direction. Then **alternate** color **RED** ↔ **GREEN** every act.',
  examClassContext: FRQ_2014_Q2_DIRECTOR_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2014 Section II question paper (College Board)', href: AP14_FRQ_PDF },
    { label: '2014 scoring guidelines', href: AP14_SG },
    { label: 'Sample response — question 2', href: AP14_Q2_SAMPLE },
  ],
  parts: [
    {
      label: 'Class',
      title: '`Director`',
      body:
        '**`Director()`** — **`setColor(Color.RED)`**. **`act`** — on **GREEN**, loop **`getOccupiedAdjacentLocations(getLocation())`**, **`setDirection(getDirection() + Location.RIGHT)`** on each neighbor; then flip **RED**/**GREEN**.',
    },
  ],
  solutionHint:
    'Check **GREEN** first (neighbor rotation). Then **`setColor`** to the **other** color using **`getColor().equals(Color.RED)`**.',
};

export const ap2014FrqSeatingChart: ApExamFrqSheet = {
  year: '2014',
  questionNumber: 3,
  headline: '**SeatingChart** — **column-major** fill; **remove** high-**absence** students.',
  examIntro:
    '**`seats[r][c]`** holds **`Student`** or **`null`**. **(a)** **Constructor** — allocate **`rows × cols`**, copy **`studentList`** in order starting at **`[0][0]`**, filling **column by column** (for each **col**, all **rows**), then **`null`** for empties. **List** unchanged. **(b)** **`removeAbsentStudents(allowed)`** — **`null`** out seats where **`getAbsenceCount() > allowed`**; return **count** removed; others stay **in place**.',
  examClassContext: FRQ_2014_Q3_SEATING_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2014 Section II question paper (College Board)', href: AP14_FRQ_PDF },
    { label: '2014 scoring guidelines', href: AP14_SG },
    { label: 'Sample response — question 3', href: AP14_Q3_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body: '**`for (c = 0; c < cols; c++)`** inner **`for (r = 0; r < rows; r++)`** — assign **`get(idx++)`** or **`null`**. ',
    },
    {
      label: '(b)',
      title: '`removeAbsentStudents`',
      body: 'Double loop; if **`s != null`** and **`s.getAbsenceCount() > allowedAbsences`**, set **`seats[r][c] = null`** and increment **removed**.',
    },
  ],
  solutionHint: '**(a)** Column-major: outer **col**, inner **row**.\n\n' + '**(b)** Do **not** shift students — only **null** high-absence cells.',
};

export const ap2014FrqTrio: ApExamFrqSheet = {
  year: '2014',
  questionNumber: 4,
  headline: '**Trio** — **MenuItem** with **sandwich / salad / drink**; price = **sum of two highest**.',
  examIntro:
    '**`Trio`** implements **`MenuItem`**. **Constructor** **`(Sandwich, Salad, Drink)`** only — other argument types **do not compile**. **`getName`** — **`sandwich/salad/drink`** names joined by **`"/"`**, then **`" Trio"`**. **`getPrice`** — **total** of the **two** larger prices (lowest-priced item is **free**).',
  examClassContext: FRQ_2014_Q4_TRIO_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2014 Section II question paper (College Board)', href: AP14_FRQ_PDF },
    { label: '2014 scoring guidelines', href: AP14_SG },
    { label: 'Sample response — question 4', href: AP14_Q4_SAMPLE },
  ],
  parts: [
    {
      label: 'Class',
      title: '`Trio`',
      body:
        'Store **three** fields. **`getName`** — string concatenation with **`"/"`** and **`" Trio"`** suffix. **`getPrice`** — **`a + b + c - Math.min(a, Math.min(b, c))`** (or equivalent).',
    },
  ],
  solutionHint: 'Constructor types enforce **Sandwich**, **Salad**, **Drink**. Price: subtract **minimum** of the three from the **sum**.',
};
