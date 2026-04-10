import type { ApExamFrqSheet } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';

const AP25_FRQ_PDF = 'https://apcentral.collegeboard.org/media/pdf/ap25-frq-computer-science-a.pdf';
const AP25_SG = 'https://apcentral.collegeboard.org/media/pdf/ap25-sg-computer-science-a.pdf';

/** Printed exam context — Question 1 (DogWalkCompany + DogWalker stubs). */
export const FRQ_2025_Q1_DOG_WALKER_PRINTED = `public class DogWalkCompany {

  /**
   * Returns the number of dogs, always greater than 0, that are available
   * for a walk during the time specified by hour
   * Precondition: 0 <= hour <= 23
   */
  public int numAvailableDogs(int hour) {
    /* implementation not shown */
  }

  /**
   * Decreases, by numberDogsWalked, the number of dogs available for a walk
   * during the time specified by hour
   * Preconditions: 0 <= hour <= 23
   * numberDogsWalked > 0
   */
  public void updateDogs(int hour, int numberDogsWalked) {
    /* implementation not shown */
  }

  /* There may be instance variables, constructors,
  and methods that are not shown. */
}

public class DogWalker {

  /** The maximum number of dogs this walker can walk simultaneously per hour */
  private int maxDogs;

  /** The dog-walking company this dog walker is associated with */
  private DogWalkCompany company;

  /**
   * Assigns max to maxDogs and comp to company
   * Precondition: max > 0
   */
  public DogWalker(int max, DogWalkCompany comp) {
    /* implementation not shown */
  }

  /**
   * Takes at least one dog for a walk during the time specified by hour, as described in part (a)
   * Preconditions: 0 <= hour <= 23
   * maxDogs > 0
   */
  public int walkDogs(int hour) {
    /* to be implemented in part (a) */
  }

  /**
   * Performs an entire dog-walking shift and returns the amount earned, in dollars, as described in part (b)
   * Preconditions: 0 <= startHour <= endHour <= 23
   * maxDogs > 0
   */
  public int dogWalkShift(int startHour, int endHour) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors,
  and methods that are not shown. */
}
`;

/** Runnable reference: simple company + full walker (for editor / Concepts). */
export const FRQ_2025_Q1_REFERENCE_COMPLETE = `public class DogWalkCompany {
  private final int[] available = new int[24];

  public void seedHour(int hour, int dogs) {
    available[hour] = dogs;
  }

  public int numAvailableDogs(int hour) {
    return available[hour];
  }

  public void updateDogs(int hour, int numberDogsWalked) {
    available[hour] -= numberDogsWalked;
  }
}

public class DogWalker {
  private int maxDogs;
  private DogWalkCompany company;

  public DogWalker(int max, DogWalkCompany comp) {
    maxDogs = max;
    company = comp;
  }

  public int walkDogs(int hour) {
    int avail = company.numAvailableDogs(hour);
    int walk = Math.min(maxDogs, avail);
    company.updateDogs(hour, walk);
    return walk;
  }

  public int dogWalkShift(int startHour, int endHour) {
    int total = 0;
    for (int h = startHour; h <= endHour; h++) {
      int walked = walkDogs(h);
      int earn = walked * 5;
      if (walked == maxDogs || (h >= 9 && h <= 17)) {
        earn += 3;
      }
      total += earn;
    }
    return total;
  }
}
`;

export const FRQ_2025_Q1_REF_WALK_DOGS = `  public int walkDogs(int hour) {
    int avail = company.numAvailableDogs(hour);
    int walk = Math.min(maxDogs, avail);
    company.updateDogs(hour, walk);
    return walk;
  }`;

export const FRQ_2025_Q1_REF_SHIFT = `  public int dogWalkShift(int startHour, int endHour) {
    int total = 0;
    for (int h = startHour; h <= endHour; h++) {
      int walked = walkDogs(h);
      int earn = walked * 5;
      if (walked == maxDogs || (h >= 9 && h <= 17)) {
        earn += 3;
      }
      total += earn;
    }
    return total;
  }`;

export const FRQ_2025_Q2_SIGNED_TEXT_PRINTED = `public class SignedText {
  /* instance variables, constructor, and methods not shown */
}
`;

export const FRQ_2025_Q2_REFERENCE_CLASS = `public class SignedText {
  private String first;
  private String last;

  public SignedText(String f, String l) {
    first = f;
    last = l;
  }

  public String getSignature() {
    if (first.isEmpty()) {
      return last;
    }
    return first.charAt(0) + "-" + last;
  }

  public String addSignature(String text) {
    String sig = getSignature();
    if (text.endsWith(sig)) {
      return text;
    }
    if (text.startsWith(sig)) {
      return text.substring(sig.length()) + sig;
    }
    return text + sig;
  }
}
`;

export const FRQ_2025_Q3_ROUND_PRINTED = `/** A single competitor in the tournament */
public class Competitor {
  /** The competitor's name and rank */
  private String name;
  private int rank;

  /**
   * Assigns n to name and initialRank to rank
   * Precondition: initialRank >= 1
   */
  public Competitor(String n, int initialRank) {
    /* implementation not shown */
  }

  /* There may be instance variables, constructors,
  and methods that are not shown. */
}

/** A match between two competitors */
public class Match {
  public Match(Competitor one, Competitor two) {
    /* implementation not shown */
  }

  /* There may be instance variables, constructors,
  and methods that are not shown. */
}

/** A single round of the tournament */
public class Round {
  /** The list of competitors participating in this round */
  private ArrayList competitorList;

  /** Initializes competitorList, as described in part (a) */
  public Round(String[] names) {
    /* to be implemented in part (a) */
  }

  /**
   * Creates an ArrayList of Match objects for the next round of the tournament, as described in part (b)
   * Preconditions: competitorList contains at least one element.
   * competitorList is ordered from best to worst rank.
   * Postcondition: competitorList is unchanged.
   */
  public ArrayList buildMatches() {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors,
  and methods that are not shown. */
}
`;

export const FRQ_2025_Q3_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class Competitor {
  private String name;
  private int rank;

  public Competitor(String n, int initialRank) {
    name = n;
    rank = initialRank;
  }
}

public class Match {
  public Match(Competitor one, Competitor two) {
  }
}

public class Round {
  private ArrayList<Competitor> competitorList;

  public Round(String[] names) {
    competitorList = new ArrayList<>();
    for (int i = 0; i < names.length; i++) {
      competitorList.add(new Competitor(names[i], i + 1));
    }
  }

  public ArrayList<Match> buildMatches() {
    ArrayList<Match> out = new ArrayList<>();
    int n = competitorList.size();
    int lo = 0;
    int hi = n - 1;
    if (n % 2 == 1) {
      lo = 1;
    }
    while (lo < hi) {
      out.add(new Match(competitorList.get(lo), competitorList.get(hi)));
      lo++;
      hi--;
    }
    return out;
  }
}
`;

export const FRQ_2025_Q3_REF_CONSTRUCTOR = `  public Round(String[] names) {
    competitorList = new ArrayList<>();
    for (int i = 0; i < names.length; i++) {
      competitorList.add(new Competitor(names[i], i + 1));
    }
  }`;

export const FRQ_2025_Q3_REF_BUILD_MATCHES = `  public ArrayList<Match> buildMatches() {
    ArrayList<Match> out = new ArrayList<>();
    int n = competitorList.size();
    int lo = 0;
    int hi = n - 1;
    if (n % 2 == 1) {
      lo = 1;
    }
    while (lo < hi) {
      out.add(new Match(competitorList.get(lo), competitorList.get(hi)));
      lo++;
      hi--;
    }
    return out;
  }`;

export const FRQ_2025_Q4_SUM_OR_SAME_PRINTED = `public class SumOrSameGame {
  private int[][] puzzle;

  /**
   * Creates a two-dimensional array and fills it with random integers, as described in part (a)
   * Precondition: numRows > 0; numCols > 0
   */
  public SumOrSameGame(int numRows, int numCols) {
    /* to be implemented in part (a) */
  }

  /**
   * Identifies and clears an element of puzzle that can be paired with the element at the given row and column,
   * as described in part (b)
   * Preconditions: row and col are valid row and column indices in puzzle.
   * The element at the given row and column is between 1 and 9, inclusive.
   */
  public boolean clearPair(int row, int col) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors,
  and methods that are not shown. */
}
`;

export const FRQ_2025_Q4_REFERENCE_COMPLETE = `public class SumOrSameGame {
  private int[][] puzzle;

  public SumOrSameGame(int numRows, int numCols) {
    puzzle = new int[numRows][numCols];
    for (int r = 0; r < numRows; r++) {
      for (int c = 0; c < numCols; c++) {
        puzzle[r][c] = (int) (Math.random() * 9) + 1;
      }
    }
  }

  public boolean clearPair(int row, int col) {
    int v = puzzle[row][col];
    for (int r = row; r < puzzle.length; r++) {
      int c0 = r == row ? col : 0;
      for (int c = c0; c < puzzle[r].length; c++) {
        if (r == row && c == col) {
          continue;
        }
        int w = puzzle[r][c];
        if (w == 0) {
          continue;
        }
        if (v == w || v + w == 10) {
          puzzle[row][col] = 0;
          puzzle[r][c] = 0;
          return true;
        }
      }
    }
    return false;
  }
}
`;

export const FRQ_2025_Q4_REF_CONSTRUCTOR = `  public SumOrSameGame(int numRows, int numCols) {
    puzzle = new int[numRows][numCols];
    for (int r = 0; r < numRows; r++) {
      for (int c = 0; c < numCols; c++) {
        puzzle[r][c] = (int) (Math.random() * 9) + 1;
      }
    }
  }`;

export const FRQ_2025_Q4_REF_CLEAR_PAIR = `  public boolean clearPair(int row, int col) {
    int v = puzzle[row][col];
    for (int r = row; r < puzzle.length; r++) {
      int c0 = r == row ? col : 0;
      for (int c = c0; c < puzzle[r].length; c++) {
        if (r == row && c == col) {
          continue;
        }
        int w = puzzle[r][c];
        if (w == 0) {
          continue;
        }
        if (v == w || v + w == 10) {
          puzzle[row][col] = 0;
          puzzle[r][c] = 0;
          return true;
        }
      }
    }
    return false;
  }`;

export const ap2025FrqDogWalker: ApExamFrqSheet = {
  year: '2025',
  questionNumber: 1,
  headline:
    'A **DogWalkCompany** tracks dogs per hour; a **DogWalker** walks up to **`maxDogs`** and earns **pay + bonus** over a shift.',
  examIntro:
    'This question involves dog walkers paid through a company. The company has a varying number of dogs per hour. A **DogWalkCompany** provides **`numAvailableDogs(hour)`** and **`updateDogs(hour, count)`**. A **DogWalker** has **`maxDogs`**, **`company`**, and methods **`walkDogs`** and **`dogWalkShift`**.',
  examClassContext: FRQ_2025_Q1_DOG_WALKER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2025 Section II question paper (College Board)', href: AP25_FRQ_PDF },
    { label: '2025 scoring guidelines', href: AP25_SG },
    {
      label: 'Sample response — question 1',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap25-apc-computer-science-a-q1.pdf',
    },
  ],
  parts: [
    {
      label: '(a)',
      title: '`walkDogs`',
      body:
        'Walk as many available dogs as possible, **capped** by **`maxDogs`**. Call **`numAvailableDogs(hour)`**, then **`updateDogs(hour, walked)`** with the number **this** walker takes. **Return** how many dogs this walker walks.\n\n' +
        '**Example:** 10 available, **`maxDogs`** 4 → **`updateDogs`** with **4**, return **4**. **3** available, **`maxDogs`** 4 → update **3**, return **3**.',
    },
    {
      label: '(b)',
      title: '`dogWalkShift`',
      body:
        'Loop **each hour** from **`startHour`** to **`endHour`** inclusive (e.g. 14–16 → hours **14, 15, 16**). For each hour, use **`walkDogs`**. **Base pay:** **$5** per dog walked. **Bonus +$3** if **either** **`walked == maxDogs`** **or** the hour is a **peak hour** (**9** through **17**, inclusive).\n\n' +
        '**Table (exam):** hour 7: 3 dogs → 3×5+3=**18**; hour 8: 2 dogs → **10**; hour 9: 2 dogs → **13**; hour 10: 3 dogs → **18**; **total 59**.',
    },
  ],
  solutionHint:
    '**(a)** `walk = min(maxDogs, numAvailableDogs(hour))`; `updateDogs(hour, walk)`; return `walk`.\n\n' +
    '**(b)** For each `h`, `w = walkDogs(h)`; add `5*w` plus `3` if `w == maxDogs || (h >= 9 && h <= 17)`.',
};

export const ap2025FrqSignedText: ApExamFrqSheet = {
  year: '2025',
  questionNumber: 2,
  headline: '**SignedText** builds a **signature** from first/last names and can **append** or **relocate** it in a string.',
  examIntro:
    'You will write the **complete** **SignedText** class: **constructor** (**first**, **last** — last length ≥ 1), **`getSignature`**, and **`addSignature`**. Rules follow the exam table (empty first name → last name only; else first **letter**, **"-"**, last name). **`addSignature`**: no signature in text → append signature; signature at **end** → unchanged; at **beginning** → remove from front and append at end.',
  examClassContext: FRQ_2025_Q2_SIGNED_TEXT_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2025 Section II question paper (College Board)', href: AP25_FRQ_PDF },
    { label: '2025 scoring guidelines', href: AP25_SG },
    {
      label: 'Sample response — question 2',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap25-apc-computer-science-a-q2.pdf',
    },
  ],
  parts: [
    {
      label: 'Specification',
      title: '`SignedText`',
      body:
        '**`getSignature`:** empty **`first`** → **`last`** only; else **`first.charAt(0) + "-" + last`** (exam examples preserve case of last name).\n\n' +
        '**`addSignature(text)`:** parameter has **at most one** occurrence of the signature, at **start** or **end**. If absent → **`text + signature`**. If at end → return **`text`**. If at start → **`text.substring(sig.length()) + sig`**.',
    },
  ],
  solutionHint:
    'Store **`first`** and **`last`**. In **`addSignature`**, compute **`sig = getSignature()`** once; test **`endsWith` / `startsWith`** in an order that matches the three cases.',
};

export const ap2025FrqRound: ApExamFrqSheet = {
  year: '2025',
  questionNumber: 3,
  headline: '**Round** holds **Competitor**s by rank and builds **Match** pairs for the next round.',
  examIntro:
    'Tournament **Round** has **`competitorList`**. **Constructor** **`Round(String[] names)`**: same order as **`names`**; rank **1** for first name, **2** for second, … **n** for last. **`buildMatches`**: if **even** count, pair **best vs worst**, **second vs second-worst**, …; if **odd**, **skip** the **best-ranked** competitor, then pair the rest with the **even** rule. **`competitorList`** unchanged. Return a new **`ArrayList`** of **`Match`**.',
  examClassContext: FRQ_2025_Q3_ROUND_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2025 Section II question paper (College Board)', href: AP25_FRQ_PDF },
    { label: '2025 scoring guidelines', href: AP25_SG },
    {
      label: 'Sample response — question 3',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap25-apc-computer-science-a-q3.pdf',
    },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body:
        'Initialize **`competitorList`**. For each index **`i`** in **`names`**, add **`new Competitor(names[i], i + 1)`** so ranks match positions (**1** = best).',
    },
    {
      label: '(b)',
      title: '`buildMatches`',
      body:
        'Let **`lo = 0`**, **`hi = size - 1`**. If **`size % 2 == 1`**, set **`lo = 1`** (skip rank 1). While **`lo < hi`**, add **`new Match(list.get(lo), list.get(hi))`**, then **`lo++`**, **`hi--`**. Return the list of matches (order of matches not specified).',
    },
  ],
  solutionHint:
    '**(a)** Loop `i` from 0; `add(new Competitor(names[i], i + 1))`.\n\n' +
    '**(b)** Odd size → start pairing from index 1; two-pointer from ends inward.',
};

export const ap2025FrqSumOrSame: ApExamFrqSheet = {
  year: '2025',
  questionNumber: 4,
  headline: '**SumOrSameGame** — random **1–9** grid; **clear** pairs that **match** or **sum to 10**.',
  examIntro:
    '**`puzzle`** is **`int[numRows][numCols]`**. **Constructor:** random **1–9** inclusive per cell, equal probability. **`clearPair(row, col)`:** given non-zero **`puzzle[row][col]`**, find **another** cell at row **≥** **`row`** such that values are **equal** or **sum to 10**; if multiple, any valid pair. Clear **both** to **0** and return **`true`**; else return **`false`** without changes. First index = **row**, second = **column**.',
  examClassContext: FRQ_2025_Q4_SUM_OR_SAME_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2025 Section II question paper (College Board)', href: AP25_FRQ_PDF },
    { label: '2025 scoring guidelines', href: AP25_SG },
    {
      label: 'Sample response — question 4',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap25-apc-computer-science-a-q4.pdf',
    },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body:
        'Allocate **`puzzle`** with **`numRows`** and **`numCols`**. Nested loops: each cell **`(int)(Math.random() * 9) + 1`**.',
    },
    {
      label: '(b)',
      title: '`clearPair`',
      body:
        'Scan cells with row **≥** parameter **`row`**. For row **`row`**, start column at **`col`** (include same row, columns from **`col`** onward); for later rows, all columns. Skip **`(row, col)`** itself. Skip zeros. If **`v == w || v + w == 10`**, set both to **0**, return **`true`**. If none found, return **`false`**.',
    },
  ],
  solutionHint:
    '**(a)** `new int[numRows][numCols]`; double loop assign 1–9.\n\n' +
    '**(b)** Nested loops `r` from `row`, `c` from `(r == row ? col : 0)`; skip self and cleared cells.',
};
