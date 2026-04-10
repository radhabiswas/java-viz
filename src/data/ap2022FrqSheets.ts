import type { ApExamFrqSheet } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';

const AP22 = AP_PAST_PAPER_RELEASED_PDFS['2022'];
const AP22_FRQ_PDF = AP22.questionPaper;
const AP22_SG = AP22.scoringGuidelines;

/** Printed exam context — Question 1 (`Level` + `Game`). */
export const FRQ_2022_Q1_LEVEL_GAME_PRINTED = `public class Level {

  /**
   * Returns true if the player reached the goal on this level and returns false otherwise
   */
  public boolean goalReached() {
    /* implementation not shown */
  }

  /**
   * Returns the number of points (a positive integer) recorded for this level
   */
  public int getPoints() {
    /* implementation not shown */
  }

  /* There may be instance variables, constructors, and methods that are not shown. */
}

public class Game {

  private Level levelOne;
  private Level levelTwo;
  private Level levelThree;

  /**
   * Postcondition: All instance variables have been initialized.
   */
  public Game() {
    /* implementation not shown */
  }

  /**
   * Returns true if this game is a bonus game and returns false otherwise
   */
  public boolean isBonus() {
    /* implementation not shown */
  }

  /**
   * Simulates the play of this Game (consisting of three levels) and updates all relevant
   * game data
   */
  public void play() {
    /* implementation not shown */
  }

  /**
   * Returns the score earned in the most recently played game, as described in part (a)
   */
  public int getScore() {
    /* to be implemented in part (a) */
  }

  /**
   * Simulates the play of num games and returns the highest score earned, as
   * described in part (b)
   * Precondition: num > 0
   */
  public int playManyTimes(int num) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors, or methods that are not shown. */
}
`;

export const FRQ_2022_Q1_REFERENCE_COMPLETE = `public class Level {
  private final boolean goal;
  private final int points;

  public Level(boolean goal, int points) {
    this.goal = goal;
    this.points = points;
  }

  public boolean goalReached() {
    return goal;
  }

  public int getPoints() {
    return points;
  }
}

public class Game {
  private Level levelOne;
  private Level levelTwo;
  private Level levelThree;
  private boolean bonus;

  public Game(Level one, Level two, Level three, boolean bonus) {
    levelOne = one;
    levelTwo = two;
    levelThree = three;
    this.bonus = bonus;
  }

  public boolean isBonus() {
    return bonus;
  }

  public void play() {
    /* updates level state after one play — not shown on exam */
  }

  public int getScore() {
    int score = 0;
    if (levelOne.goalReached()) {
      score += levelOne.getPoints();
      if (levelTwo.goalReached()) {
        score += levelTwo.getPoints();
        if (levelThree.goalReached()) {
          score += levelThree.getPoints();
        }
      }
    }
    if (isBonus()) {
      score = score * 3;
    }
    return score;
  }

  public int playManyTimes(int num) {
    int highest = 0;
    for (int i = 0; i < num; i++) {
      play();
      int s = getScore();
      if (s > highest) {
        highest = s;
      }
    }
    return highest;
  }
}
`;

export const FRQ_2022_Q1_REF_GET_SCORE = `  public int getScore() {
    int score = 0;
    if (levelOne.goalReached()) {
      score += levelOne.getPoints();
      if (levelTwo.goalReached()) {
        score += levelTwo.getPoints();
        if (levelThree.goalReached()) {
          score += levelThree.getPoints();
        }
      }
    }
    if (isBonus()) {
      score = score * 3;
    }
    return score;
  }`;

export const FRQ_2022_Q1_REF_PLAY_MANY_TIMES = `  public int playManyTimes(int num) {
    int highest = 0;
    for (int i = 0; i < num; i++) {
      play();
      int s = getScore();
      if (s > highest) {
        highest = s;
      }
    }
    return highest;
  }`;

/** Question 2 — complete `Textbook` class. */
export const FRQ_2022_Q2_TEXTBOOK_PRINTED = `public class Book {

  /** The title of the book */
  private String title;

  /** The price of the book */
  private double price;

  /** Creates a new Book with given title and price */
  public Book(String bookTitle, double bookPrice) {
    /* implementation not shown */
  }

  /** Returns the title of the book */
  public String getTitle() {
    return title;
  }

  /** Returns a string containing the title and price of the Book */
  public String getBookInfo() {
    return title + "-" + price;
  }

  /* There may be instance variables, constructors, and methods that are not shown. */
}

public class Textbook extends Book {

  public Textbook(String bookTitle, double bookPrice, int edition) {
    /* to be implemented */
  }

  public int getEdition() {
    /* to be implemented */
  }

  public String getBookInfo() {
    /* to be implemented */
  }

  public boolean canSubstituteFor(Textbook other) {
    /* to be implemented */
  }
}
`;

export const FRQ_2022_Q2_REFERENCE_CLASS = `public class Book {
  private String title;
  private double price;

  public Book(String bookTitle, double bookPrice) {
    title = bookTitle;
    price = bookPrice;
  }

  public String getTitle() {
    return title;
  }

  public String getBookInfo() {
    return title + "-" + price;
  }
}

public class Textbook extends Book {
  private int edition;

  public Textbook(String bookTitle, double bookPrice, int edition) {
    super(bookTitle, bookPrice);
    this.edition = edition;
  }

  public int getEdition() {
    return edition;
  }

  public String getBookInfo() {
    return super.getBookInfo() + "-" + edition;
  }

  public boolean canSubstituteFor(Textbook other) {
    return getTitle().equals(other.getTitle()) && edition >= other.getEdition();
  }
}
`;

export const FRQ_2022_Q3_REVIEW_PRINTED = `import java.util.ArrayList;

public class Review {
  private int rating;
  private String comment;

  /**
   * Precondition: r >= 0
   * c is not null.
   */
  public Review(int r, String c) {
    rating = r;
    comment = c;
  }

  public int getRating() {
    return rating;
  }

  public String getComment() {
    return comment;
  }

  /* There may be instance variables, constructors, and methods that are not shown. */
}

public class ReviewAnalysis {

  /** All user reviews to be included in this analysis */
  private Review[] allReviews;

  /** Initializes allReviews to contain all the Review objects to be analyzed */
  public ReviewAnalysis() {
    /* implementation not shown */
  }

  /**
   * Returns a double representing the average rating of all the Review objects to be
   * analyzed, as described in part (a)
   * Precondition: allReviews contains at least one Review.
   * No element of allReviews is null.
   */
  public double getAverageRating() {
    /* to be implemented in part (a) */
  }

  /**
   * Returns an ArrayList of String objects containing formatted versions of
   * selected user comments, as described in part (b)
   * Precondition: allReviews contains at least one Review.
   * No element of allReviews is null.
   * Postcondition: allReviews is unchanged.
   */
  public ArrayList collectComments() {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2022_Q3_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class Review {
  private int rating;
  private String comment;

  public Review(int r, String c) {
    rating = r;
    comment = c;
  }

  public int getRating() {
    return rating;
  }

  public String getComment() {
    return comment;
  }
}

public class ReviewAnalysis {
  private Review[] allReviews;

  public ReviewAnalysis(Review[] reviews) {
    allReviews = reviews;
  }

  public double getAverageRating() {
    double sum = 0;
    for (Review r : allReviews) {
      sum += r.getRating();
    }
    return sum / allReviews.length;
  }

  public ArrayList<String> collectComments() {
    ArrayList<String> out = new ArrayList<String>();
    for (int i = 0; i < allReviews.length; i++) {
      String c = allReviews[i].getComment();
      if (c.indexOf('!') >= 0) {
        String s = i + "-" + c;
        char last = c.charAt(c.length() - 1);
        if (last != '.' && last != '!') {
          s = s + ".";
        }
        out.add(s);
      }
    }
    return out;
  }
}
`;

export const FRQ_2022_Q3_REF_GET_AVERAGE = `  public double getAverageRating() {
    double sum = 0;
    for (Review r : allReviews) {
      sum += r.getRating();
    }
    return sum / allReviews.length;
  }`;

export const FRQ_2022_Q3_REF_COLLECT_COMMENTS = `  public ArrayList<String> collectComments() {
    ArrayList<String> out = new ArrayList<String>();
    for (int i = 0; i < allReviews.length; i++) {
      String c = allReviews[i].getComment();
      if (c.indexOf('!') >= 0) {
        String s = i + "-" + c;
        char last = c.charAt(c.length() - 1);
        if (last != '.' && last != '!') {
          s = s + ".";
        }
        out.add(s);
      }
    }
    return out;
  }`;

export const FRQ_2022_Q4_DATA_PRINTED = `public class Data {

  public static final int MAX = /* value not shown */;

  private int[][] grid;

  /**
   * Fills all elements of grid with randomly generated values, as described in part (a)
   * Precondition: grid is not null.
   * grid has at least one element.
   */
  public void repopulate() {
    /* to be implemented in part (a) */
  }

  /**
   * Returns the number of columns in grid that are in increasing order, as described
   * in part (b)
   * Precondition: grid is not null.
   * grid has at least one element.
   */
  public int countIncreasingCols() {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors, and methods that are not shown. */
}
`;

export const FRQ_2022_Q4_REFERENCE_COMPLETE = `public class Data {

  public static final int MAX = 1000;

  private int[][] grid;

  public Data(int[][] g) {
    grid = g;
  }

  public void repopulate() {
    for (int r = 0; r < grid.length; r++) {
      for (int c = 0; c < grid[r].length; c++) {
        int val;
        do {
          val = (int) (Math.random() * MAX) + 1;
        } while (val % 10 != 0 || val % 100 == 0);
        grid[r][c] = val;
      }
    }
  }

  public int countIncreasingCols() {
    int count = 0;
    int cols = grid[0].length;
    for (int c = 0; c < cols; c++) {
      boolean ok = true;
      for (int r = 1; r < grid.length; r++) {
        if (grid[r][c] < grid[r - 1][c]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        count++;
      }
    }
    return count;
  }
}
`;

export const FRQ_2022_Q4_REF_REPOPULATE = `  public void repopulate() {
    for (int r = 0; r < grid.length; r++) {
      for (int c = 0; c < grid[r].length; c++) {
        int val;
        do {
          val = (int) (Math.random() * MAX) + 1;
        } while (val % 10 != 0 || val % 100 == 0);
        grid[r][c] = val;
      }
    }
  }`;

export const FRQ_2022_Q4_REF_COUNT_INCREASING_COLS = `  public int countIncreasingCols() {
    int count = 0;
    int cols = grid[0].length;
    for (int c = 0; c < cols; c++) {
      boolean ok = true;
      for (int r = 1; r < grid.length; r++) {
        if (grid[r][c] < grid[r - 1][c]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        count++;
      }
    }
    return count;
  }`;

export const ap2022FrqGame: ApExamFrqSheet = {
  year: '2022',
  questionNumber: 1,
  headline: '**Game** / **Level** — **cascading** goals, **bonus** triple, **`playManyTimes`**.',
  examIntro:
    'Three **levels** with **`goalReached`** and **`getPoints`**. **(a)** **`getScore`** after the latest **`play`**: add **level 1** points only if level 1’s goal was reached; level 2 only if **both** 1 and 2 reached; level 3 only if **all three** reached. If **`isBonus()`**, **triple** the sum. **(b)** **`playManyTimes(num)`** — loop **`num`** times: each iteration **`play()`** then **`getScore()`**; return the **maximum** score seen.',
  examClassContext: FRQ_2022_Q1_LEVEL_GAME_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2022 Section II question paper (College Board)', href: AP22_FRQ_PDF },
    { label: '2022 scoring guidelines', href: AP22_SG },
    { label: 'Sample response — question 1', href: AP22.sampleByQuestion[0] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`getScore`',
      body:
        '**Nested** checks: **`levelOne.goalReached()`** → add **`getPoints()`**; then if level 2 goal → add its points; then if level 3 goal → add its points. If **`isBonus()`**, multiply the total by **3**.',
    },
    {
      label: '(b)',
      title: '`playManyTimes`',
      body:
        '**`int highest = 0`**. **`for`** **`num`** times: **`play()`**; **`int s = getScore()`**; if **`s > highest`**, update **`highest`**. Return **`highest`**.',
    },
  ],
  solutionHint:
    '**(a)** Add points only along a chain of goals; **`if (isBonus()) score *= 3`**.\n\n' +
    '**(b)** Each iteration: **`play()`** then **`getScore()`**; track max.',
};

export const ap2022FrqTextbook: ApExamFrqSheet = {
  year: '2022',
  questionNumber: 2,
  headline: '**Textbook** extends **Book** — **edition**, **`getBookInfo`**, **`canSubstituteFor`**.',
  examIntro:
    '**Title** and **price** stay in **`Book`**. **`Textbook`** adds **edition** (positive **`int`**). **Constructor** **`(title, price, edition)`** initializes **`Book`** and edition. **`getBookInfo`** returns **`super.getBookInfo() + "-" + edition`** (see table: **`"Biology-39.75-3"`**). **`canSubstituteFor(other)`** — **`true`** iff **same title** (**`getTitle().equals(other.getTitle())`**) and **`this.edition >= other.edition`**.',
  examClassContext: FRQ_2022_Q2_TEXTBOOK_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2022 Section II question paper (College Board)', href: AP22_FRQ_PDF },
    { label: '2022 scoring guidelines', href: AP22_SG },
    { label: 'Sample response — question 2', href: AP22.sampleByQuestion[1] },
  ],
  parts: [
    {
      label: 'Specification',
      title: '`Textbook`',
      body:
        '**`super`** in constructor. **`@Override`** **`getBookInfo`**. **`canSubstituteFor`** compares **titles** and **editions** as specified.',
    },
  ],
  solutionHint:
    'Fields: **`edition`**. Constructor: **`super(bookTitle, bookPrice)`**. **`getBookInfo`**: append **`"-" + edition`**. **`canSubstituteFor`**: **`getTitle().equals(other.getTitle()) && edition >= other.getEdition()`**.',
};

export const ap2022FrqReviewAnalysis: ApExamFrqSheet = {
  year: '2022',
  questionNumber: 3,
  headline: '**ReviewAnalysis** — **average rating** & **`collectComments`** with **`!`**.',
  examIntro:
    '**(a)** **`getAverageRating`** — arithmetic **mean** of **`getRating()`** over **`allReviews`**. **(b)** **`collectComments`** — new **`ArrayList`** of **`String`**: for each index **`i`**, if **`getComment()`** contains **`!`**, add **`i + "-" + comment`**. Result must end with **`.`** or **`!`**; if the original comment does not end with **`.`** or **`!`**, **append `.`**. **`allReviews`** unchanged.',
  examClassContext: FRQ_2022_Q3_REVIEW_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2022 Section II question paper (College Board)', href: AP22_FRQ_PDF },
    { label: '2022 scoring guidelines', href: AP22_SG },
    { label: 'Sample response — question 3', href: AP22.sampleByQuestion[2] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`getAverageRating`',
      body: 'Sum ratings in a loop; **`return sum / allReviews.length`** (double division).',
    },
    {
      label: '(b)',
      title: '`collectComments`',
      body:
        '**`indexOf(\'!\') >= 0`** filters. Build **`i + "-" + c`**. Check last char; append **`"."`** if needed.',
    },
  ],
  solutionHint:
    '**(a)** Enhanced for-loop over **`allReviews`**.\n\n' + '**(b)** **`char last = c.charAt(c.length()-1)`**; if not **`.`** or **`!`**, **`s = s + "."`**.',
};

export const ap2022FrqData: ApExamFrqSheet = {
  year: '2022',
  questionNumber: 4,
  headline: '**Data** — **`repopulate`** (div **10**, not **100**) & **increasing columns**.',
  examIntro:
    '**(a)** **`repopulate`** — assign each **`grid[r][c]`** a random **`int`** in **1…MAX** inclusive that is **divisible by 10** but **not** by **100**; every valid value equally likely (reject-and-retry on a uniform **1…MAX** draw works). **(b)** **`countIncreasingCols`** — count columns where each row after the first is **≥** the row above; a **one-row** column counts as increasing.',
  examClassContext: FRQ_2022_Q4_DATA_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2022 Section II question paper (College Board)', href: AP22_FRQ_PDF },
    { label: '2022 scoring guidelines', href: AP22_SG },
    { label: 'Sample response — question 4', href: AP22.sampleByQuestion[3] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`repopulate`',
      body:
        '**`do { val = (int)(Math.random() * MAX) + 1; } while (val % 10 != 0 || val % 100 == 0);`** then assign.',
    },
    {
      label: '(b)',
      title: '`countIncreasingCols`',
      body:
        'For each column **`c`**, scan **`r = 1 … rows-1`**; if any **`grid[r][c] < grid[r-1][c]`**, column fails. Count passing columns.',
    },
  ],
  solutionHint:
    '**(a)** Rejection sampling from **1…MAX**.\n\n' + '**(b)** Nested loops: outer **columns**, inner **rows**.',
};
