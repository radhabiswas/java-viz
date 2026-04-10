import type { ApExamFrqSheet } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';

const AP24_FRQ_PDF = 'https://apcentral.collegeboard.org/media/pdf/ap24-frq-comp-sci-a.pdf';
const AP24_SG = 'https://apcentral.collegeboard.org/media/pdf/ap24-sg-computer-science-a.pdf';
const AP24_Q1_SAMPLE =
  'https://cdn.savemyexams.com/uploads/2026/02/10997-ap24-apc-computer-science-a-q1.pdf';

/** Printed exam context — Question 1 (Feeder). */
export const FRQ_2024_Q1_FEEDER_PRINTED = `public class Feeder {
/**
 * The amount of food, in grams, currently in the bird feeder; initialized in the constructor and
 * always greater than or equal to zero
 */
private int currentFood;
/**
 * Simulates one day with numBirds birds or possibly a bear at the bird feeder,
 * as described in part (a)
 * Precondition: numBirds > 0
 */
public void simulateOneDay(int numBirds) {
  /* to be implemented in part (a) */
}
/**
 * Returns the number of days birds or a bear found food to eat at the feeder in this simulation,
 * as described in part (b)
 * Preconditions: numBirds > 0, numDays > 0
 */
public int simulateManyDays(int numBirds, int numDays) {
  /* to be implemented in part (b) */
}
/* There may be instance variables, constructors, or methods that are not shown. */
}
`;

export const FRQ_2024_Q1_REFERENCE_COMPLETE = `public class Feeder {
  private int currentFood;

  public Feeder(int food) {
    currentFood = food;
  }

  public void simulateOneDay(int numBirds) {
    if (Math.random() < 0.05) {
      currentFood = 0;
      return;
    }
    int perBird = (int) (Math.random() * 41) + 10;
    int consumed = numBirds * perBird;
    if (consumed > currentFood) {
      currentFood = 0;
    } else {
      currentFood -= consumed;
    }
  }

  public int simulateManyDays(int numBirds, int numDays) {
    int count = 0;
    for (int day = 0; day < numDays; day++) {
      if (currentFood == 0) {
        break;
      }
      simulateOneDay(numBirds);
      count++;
    }
    return count;
  }
}
`;

export const FRQ_2024_Q1_REF_SIMULATE_ONE_DAY = `  public void simulateOneDay(int numBirds) {
    if (Math.random() < 0.05) {
      currentFood = 0;
      return;
    }
    int perBird = (int) (Math.random() * 41) + 10;
    int consumed = numBirds * perBird;
    if (consumed > currentFood) {
      currentFood = 0;
    } else {
      currentFood -= consumed;
    }
  }`;

export const FRQ_2024_Q1_REF_SIMULATE_MANY_DAYS = `  public int simulateManyDays(int numBirds, int numDays) {
    int count = 0;
    for (int day = 0; day < numDays; day++) {
      if (currentFood == 0) {
        break;
      }
      simulateOneDay(numBirds);
      count++;
    }
    return count;
  }`;

/** Question 2 — students write the full class; stubs keep line anchors for Concepts / quizzes. */
export const FRQ_2024_Q2_SCOREBOARD_PRINTED = `public class Scoreboard {

  public Scoreboard(String team1Name, String team2Name) {
    /* to be implemented */
  }

  public void recordPlay(int points) {
    /* to be implemented */
  }

  public String getScore() {
    /* to be implemented */
  }
}
`;

export const FRQ_2024_Q2_REFERENCE_CLASS = `public class Scoreboard {
  private final String name1;
  private final String name2;
  private int score1;
  private int score2;
  private boolean team1Active;

  public Scoreboard(String team1Name, String team2Name) {
    name1 = team1Name;
    name2 = team2Name;
    score1 = 0;
    score2 = 0;
    team1Active = true;
  }

  public void recordPlay(int points) {
    if (points > 0) {
      if (team1Active) {
        score1 += points;
      } else {
        score2 += points;
      }
    } else {
      team1Active = !team1Active;
    }
  }

  public String getScore() {
    String active = team1Active ? name1 : name2;
    return score1 + "-" + score2 + "-" + active;
  }
}
`;

export const FRQ_2024_Q3_WORD_CHECKER_PRINTED = `import java.util.ArrayList;

public class WordChecker {

  /** Initialized in the constructor and contains no null elements */
  private ArrayList wordList;

  /**
   * Returns true if each element of wordList (except the first) contains the previous
   * element as a substring and returns false otherwise, as described in part (a)
   * Precondition: wordList contains at least two elements.
   * Postcondition: wordList is unchanged.
   */
  public boolean isWordChain() {
    /* to be implemented in part (a) */
  }

  /**
   * Returns an ArrayList based on strings from wordList that start
   * with target, as described in part (b). Each element of the returned ArrayList has had
   * the initial occurrence of target removed.
   * Postconditions: wordList is unchanged.
   * Items appear in the returned list in the same order as they appear in wordList.
   */
  public ArrayList createList(String target) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors, and methods that are not shown. */
}
`;

export const FRQ_2024_Q3_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class WordChecker {
  private ArrayList<String> wordList;

  public WordChecker(ArrayList<String> words) {
    wordList = words;
  }

  public boolean isWordChain() {
    for (int i = 1; i < wordList.size(); i++) {
      if (!wordList.get(i).contains(wordList.get(i - 1))) {
        return false;
      }
    }
    return true;
  }

  public ArrayList<String> createList(String target) {
    ArrayList<String> out = new ArrayList<String>();
    for (String w : wordList) {
      if (w.startsWith(target)) {
        out.add(w.substring(target.length()));
      }
    }
    return out;
  }
}
`;

export const FRQ_2024_Q3_REF_IS_WORD_CHAIN = `  public boolean isWordChain() {
    for (int i = 1; i < wordList.size(); i++) {
      if (!wordList.get(i).contains(wordList.get(i - 1))) {
        return false;
      }
    }
    return true;
  }`;

export const FRQ_2024_Q3_REF_CREATE_LIST = `  public ArrayList<String> createList(String target) {
    ArrayList<String> out = new ArrayList<String>();
    for (String w : wordList) {
      if (w.startsWith(target)) {
        out.add(w.substring(target.length()));
      }
    }
    return out;
  }`;

export const FRQ_2024_Q4_GRID_PATH_PRINTED = `public class Location {
  private int theRow;
  private int theCol;

  public Location(int r, int c) {
    theRow = r;
    theCol = c;
  }

  public int getRow() {
    return theRow;
  }

  public int getCol() {
    return theCol;
  }
}

public class GridPath {

  /** Initialized in the constructor with distinct values that never change */
  private int[][] grid;

  /**
   * Returns the Location representing a neighbor of the grid element at row and col,
   * as described in part (a)
   * Preconditions: row is a valid row index and col is a valid column index in grid.
   * row and col do not specify the element in the last row and last column of grid.
   */
  public Location getNextLoc(int row, int col) {
    /* to be implemented in part (a) */
  }

  /**
   * Computes and returns the sum of all values on a path through grid, as described in
   * part (b)
   * Preconditions: row is a valid row index and col is a valid column index in grid.
   * row and col do not specify the element in the last row and last column of grid.
   */
  public int sumPath(int row, int col) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors, or methods that are not shown. */
}
`;

export const FRQ_2024_Q4_REFERENCE_COMPLETE = `public class Location {
  private int theRow;
  private int theCol;

  public Location(int r, int c) {
    theRow = r;
    theCol = c;
  }

  public int getRow() {
    return theRow;
  }

  public int getCol() {
    return theCol;
  }
}

public class GridPath {
  private int[][] grid;

  public GridPath(int[][] g) {
    grid = g;
  }

  public Location getNextLoc(int row, int col) {
    int rows = grid.length;
    int cols = grid[0].length;
    boolean hasDown = row + 1 < rows;
    boolean hasRight = col + 1 < cols;
    if (hasDown && hasRight) {
      if (grid[row + 1][col] < grid[row][col + 1]) {
        return new Location(row + 1, col);
      }
      return new Location(row, col + 1);
    }
    if (hasDown) {
      return new Location(row + 1, col);
    }
    return new Location(row, col + 1);
  }

  public int sumPath(int row, int col) {
    int r = row;
    int c = col;
    int sum = 0;
    int lastR = grid.length - 1;
    int lastC = grid[0].length - 1;
    while (r != lastR || c != lastC) {
      sum += grid[r][c];
      Location n = getNextLoc(r, c);
      r = n.getRow();
      c = n.getCol();
    }
    sum += grid[lastR][lastC];
    return sum;
  }
}
`;

export const FRQ_2024_Q4_REF_GET_NEXT_LOC = `  public Location getNextLoc(int row, int col) {
    int rows = grid.length;
    int cols = grid[0].length;
    boolean hasDown = row + 1 < rows;
    boolean hasRight = col + 1 < cols;
    if (hasDown && hasRight) {
      if (grid[row + 1][col] < grid[row][col + 1]) {
        return new Location(row + 1, col);
      }
      return new Location(row, col + 1);
    }
    if (hasDown) {
      return new Location(row + 1, col);
    }
    return new Location(row, col + 1);
  }`;

export const FRQ_2024_Q4_REF_SUM_PATH = `  public int sumPath(int row, int col) {
    int r = row;
    int c = col;
    int sum = 0;
    int lastR = grid.length - 1;
    int lastC = grid[0].length - 1;
    while (r != lastR || c != lastC) {
      sum += grid[r][c];
      Location n = getNextLoc(r, c);
      r = n.getRow();
      c = n.getCol();
    }
    sum += grid[lastR][lastC];
    return sum;
  }`;

export const ap2024FrqFeeder: ApExamFrqSheet = {
  year: '2024',
  questionNumber: 1,
  headline: '**Feeder** — random **bird** consumption vs **bear**; count days with food available.',
  examIntro:
    '**`currentFood`** is grams in the feeder (≥ 0). **`simulateOneDay(numBirds)`** models one day: **95%** normal — each bird eats the **same** random integer **10–50** grams (uniform); total consumed = **`numBirds * perBird`**; if that total **>** **`currentFood`**, the feeder ends at **0**; else subtract. **5%** abnormal — a **bear** empties the feeder (**0**). **`simulateManyDays`** runs at most **`numDays`** days using **`simulateOneDay`**; returns how many days birds or a bear **found food** (started the day with food **>** 0).',
  examClassContext: FRQ_2024_Q1_FEEDER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2024 Section II question paper (College Board)', href: AP24_FRQ_PDF },
    { label: '2024 scoring guidelines', href: AP24_SG },
    { label: 'Sample response — question 1', href: AP24_Q1_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`simulateOneDay`',
      body:
        '**95%** — draw **`perBird`** in **10…50** inclusive, each value equally likely; **`eaten = numBirds * perBird`**. If **`eaten > currentFood`** → **0**; else **`currentFood -= eaten`**. **5%** — **`currentFood = 0`**.',
    },
    {
      label: '(b)',
      title: '`simulateManyDays`',
      body:
        'Repeat up to **`numDays`** times: if **`currentFood == 0`** before a day, **stop**. Otherwise call **`simulateOneDay(numBirds)`** and **count** that day. Return the count.',
    },
  ],
  solutionHint:
    '**(a)** `if (Math.random() < 0.05) { currentFood = 0; return; }` then `perBird = (int)(Math.random()*41)+10`, `consumed = numBirds*perBird`, update.\n\n' +
    '**(b)** Loop; break on empty feeder; else `simulateOneDay`; increment count.',
};

export const ap2024FrqScoreboard: ApExamFrqSheet = {
  year: '2024',
  questionNumber: 2,
  headline: '**Scoreboard** — two teams, **active** team, **`recordPlay`**, string **`getScore`**.',
  examIntro:
    'Write the **complete** **`Scoreboard`** class. **Constructor** (**team1**, **team2**): scores **0–0**, **team 1** is **active**. **`recordPlay(points)`** — if **`points > 0`**, add to the **active** team’s score (turn continues). If **`points == 0`**, no points; **switch** active team. **`getScore()`** returns **`"score1-score2-ActiveTeamName"`** (hyphens as in the exam table).',
  examClassContext: FRQ_2024_Q2_SCOREBOARD_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2024 Section II question paper (College Board)', href: AP24_FRQ_PDF },
    { label: '2024 scoring guidelines', href: AP24_SG },
    {
      label: 'Sample response — question 2',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q2.pdf',
    },
  ],
  parts: [
    {
      label: 'Specification',
      title: '`Scoreboard`',
      body:
        'Track **two** team names, **two** scores, and **which** team is active. **0** on **`recordPlay`** flips active team only; **positive** points go to the active team without flipping.',
    },
  ],
  solutionHint:
    'Fields: names, two ints, boolean `team1Active`. `recordPlay`: if `points > 0` add to active score; else flip boolean. `getScore`: build string with active name from boolean.',
};

export const ap2024FrqWordChecker: ApExamFrqSheet = {
  year: '2024',
  questionNumber: 3,
  headline: '**WordChecker** — **substring chain** on an **`ArrayList`**; **`createList`** strips a **prefix**.',
  examIntro:
    '**`wordList`** has no nulls (≥ 2 elements for **`isWordChain`**). **(a)** **`isWordChain`** — for each index **≥ 1**, **`wordList.get(i).contains(wordList.get(i-1))`**. **(b)** **`createList(target)`** — new list of words that **`startsWith(target)`**, each stored **without** the first occurrence of **`target`** (may be empty string); preserve order; **`wordList`** unchanged.',
  examClassContext: FRQ_2024_Q3_WORD_CHECKER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2024 Section II question paper (College Board)', href: AP24_FRQ_PDF },
    { label: '2024 scoring guidelines', href: AP24_SG },
    {
      label: 'Sample response — question 3',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q3.pdf',
    },
  ],
  parts: [
    {
      label: '(a)',
      title: '`isWordChain`',
      body: 'Loop **i** from **1** to **`size-1`**. If any **`get(i)`** does not **`contains(get(i-1))`**, return **false**. Else **true**.',
    },
    {
      label: '(b)',
      title: '`createList`',
      body:
        'New **`ArrayList`**. For each **`w`** in **`wordList`**, if **`w.startsWith(target)`**, **`add(w.substring(target.length()))`**. Return the new list.',
    },
  ],
  solutionHint: '**(a)** `for (int i = 1; i < wordList.size(); i++)` with `contains`.\n\n' + '**(b)** `startsWith` + `substring(target.length())`.',
};

export const ap2024FrqGridPath: ApExamFrqSheet = {
  year: '2024',
  questionNumber: 4,
  headline: '**GridPath** — next cell **down** or **right**; **`sumPath`** along **`getNextLoc`**.',
  examIntro:
    '**`Location`** holds **row** and **column**. **`getNextLoc(row, col)`** considers **below** and **to the right** (if they exist). If **both** exist, return the **`Location`** of the **smaller** value (values always differ). If **one** neighbor exists, return that one. **`sumPath`** starts at **`(row,col)`**, repeatedly **`getNextLoc`** until the **bottom-right** cell; return the **sum** of all values on the path (including endpoints).',
  examClassContext: FRQ_2024_Q4_GRID_PATH_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2024 Section II question paper (College Board)', href: AP24_FRQ_PDF },
    { label: '2024 scoring guidelines', href: AP24_SG },
    {
      label: 'Sample response — question 4',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q4.pdf',
    },
  ],
  parts: [
    {
      label: '(a)',
      title: '`getNextLoc`',
      body:
        'Test **`row+1`** and **`col+1`** against **`grid.length`** and **`grid[0].length`**. Compare **`grid[row+1][col]`** vs **`grid[row][col+1]`** when both valid; return **`new Location(...)`** for the smaller.',
    },
    {
      label: '(b)',
      title: '`sumPath`',
      body:
        '**`sum`** starts at **0**. While not at **last row & last col**, add **`grid[r][c]`**, then **`loc = getNextLoc(r,c)`**, update **r, c**. Finally add the **corner** value.',
    },
  ],
  solutionHint:
    '**(a)** Booleans `hasDown`, `hasRight`; if both, compare two cells.\n\n' + '**(b)** `while (r != lastR || c != lastC)` then add corner.',
};
