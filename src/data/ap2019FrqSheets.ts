import type { ApExamFrqSheet } from '../types';

export const AP_SECTION_II_DIRECTIONS =
  '**SHOW ALL YOUR WORK.** Program segments are to be written in **Java**.';

export const AP_SECTION_II_NOTES = [
  'Assume that the types listed in the **Java Quick Reference** have been imported where appropriate.',
  'Unless otherwise noted, parameters are **not** **null** and methods are called only when **preconditions** hold.',
  'You may use accessible methods from classes defined in this question; **avoid re-coding** what those methods already provide.',
];

/** Question 1 — printed class (same string as lesson `code` in **ps-1-ap-calendar**). */
export const FRQ_2019_Q1_AP_CALENDAR_PRINTED_CLASS = `public class APCalendar {

  /** Returns true if year is a leap year and false otherwise. */
  private static boolean isLeapYear(int year) {
    /* implementation not shown */
  }

  /**
   * Returns the number of leap years between year1 and year2, inclusive.
   * Precondition: 0 <= year1 <= year2
   */
  public static int numberOfLeapYears(int year1, int year2) {
    /* to be implemented in part (a) */
  }

  /**
   * Returns the value representing the day of the week for the first day of year,
   * where 0 denotes Sunday, 1 denotes Monday, ..., and 6 denotes Saturday.
   */
  private static int firstDayOfYear(int year) {
    /* implementation not shown */
  }

  /**
   * Returns n, where month, day, and year specify the nth day of the year.
   * Returns 1 for January 1 (month = 1, day = 1) of any year.
   * Precondition: The date represented by month, day, year is a valid date.
   */
  private static int dayOfYear(int month, int day, int year) {
    /* implementation not shown */
  }

  /**
   * Returns the value representing the day of the week for the given date
   * (month, day, year), where 0 denotes Sunday, 1 denotes Monday, ...,
   * and 6 denotes Saturday.
   * Precondition: The date represented by month, day, year is a valid date.
   */
  public static int dayOfWeek(int month, int day, int year) {
    /* to be implemented in part (b) */
  }

  // There may be instance variables, constructors, and other methods not shown.
}`;

/** Q1 part (a) — reference implementation (shared by Solution + Implementation steps). */
export const FRQ_2019_Q1_REF_NUMBER_OF_LEAP_YEARS = `  public static int numberOfLeapYears(int year1, int year2) {
    int count = 0;
    for (int y = year1; y <= year2; y++) {
      if (isLeapYear(y)) {
        count++;
      }
    }
    return count;
  }`;

/** Q1 part (b) — reference implementation (shared by Solution + Implementation steps). */
export const FRQ_2019_Q1_REF_DAY_OF_WEEK = `  public static int dayOfWeek(int month, int day, int year) {
    int start = firstDayOfYear(year);
    int n = dayOfYear(month, day, year);
    return (start + n - 1) % 7;
  }`;

/**
 * Q1 — reference class for the implementation workspace: Parts (a)(b) plus concrete
 * private helpers so the editor is a full, readable program (exam booklet leaves helpers “not shown”).
 */
export const FRQ_2019_Q1_AP_CALENDAR_REFERENCE_COMPLETE = `public class APCalendar {

  /** Returns true if year is a leap year and false otherwise. */
  private static boolean isLeapYear(int year) {
    if (year % 400 == 0) {
      return true;
    }
    if (year % 100 == 0) {
      return false;
    }
    return year % 4 == 0;
  }

  /**
   * Returns the number of leap years between year1 and year2, inclusive.
   * Precondition: 0 <= year1 <= year2
   */
  public static int numberOfLeapYears(int year1, int year2) {
    int count = 0;
    for (int y = year1; y <= year2; y++) {
      if (isLeapYear(y)) {
        count++;
      }
    }
    return count;
  }

  /**
   * Returns the value representing the day of the week for the first day of year,
   * where 0 denotes Sunday, 1 denotes Monday, ..., and 6 denotes Saturday.
   */
  private static int firstDayOfYear(int year) {
    int v = java.time.LocalDate.of(year, 1, 1).getDayOfWeek().getValue();
    return v == 7 ? 0 : v;
  }

  /**
   * Returns n, where month, day, and year specify the nth day of the year.
   * Returns 1 for January 1 (month = 1, day = 1) of any year.
   * Precondition: The date represented by month, day, year is a valid date.
   */
  private static int dayOfYear(int month, int day, int year) {
    int[] dim = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
    if (isLeapYear(year)) {
      dim[1] = 29;
    }
    int n = day;
    for (int m = 0; m < month - 1; m++) {
      n += dim[m];
    }
    return n;
  }

  /**
   * Returns the value representing the day of the week for the given date
   * (month, day, year), where 0 denotes Sunday, 1 denotes Monday, ...,
   * and 6 denotes Saturday.
   * Precondition: The date represented by month, day, year is a valid date.
   */
  public static int dayOfWeek(int month, int day, int year) {
    int start = firstDayOfYear(year);
    int n = dayOfYear(month, day, year);
    return (start + n - 1) % 7;
  }

  // There may be instance variables, constructors, and other methods not shown.
}`;

export const FRQ_2019_Q2_STEP_TRACKER_PRINTED_CLASS = `public class StepTracker {

  public StepTracker(int minActive) {
  }

  public void addDailySteps(int steps) {
  }

  public int activeDays() {
    return 0;
  }

  public double averageSteps() {
    return 0.0;
  }
}`;

/** Q2 — reference class (Solution + Implementation steps reuse this). */
export const FRQ_2019_Q2_REFERENCE_CLASS = `public class StepTracker {
  private final int minActive;
  private int totalSteps;
  private int daysRecorded;
  private int activeCount;

  public StepTracker(int minActive) {
    this.minActive = minActive;
    totalSteps = 0;
    daysRecorded = 0;
    activeCount = 0;
  }

  public void addDailySteps(int steps) {
    totalSteps += steps;
    daysRecorded++;
    if (steps >= minActive) {
      activeCount++;
    }
  }

  public int activeDays() {
    return activeCount;
  }

  public double averageSteps() {
    if (daysRecorded == 0) {
      return 0.0;
    }
    return (double) totalSteps / daysRecorded;
  }
}`;

export const FRQ_2019_Q3_DELIMITERS_PRINTED_CLASS = `import java.util.ArrayList;

public class Delimiters {

  private String openDel;
  private String closeDel;

  public Delimiters(String open, String close) {
    openDel = open;
    closeDel = close;
  }

  /** Returns delimiters from tokens in order (part (a)). */
  public ArrayList<String> getDelimitersList(String[] tokens) {
    return null;
  }

  /** True if balanced per part (b). Precondition: only open/close strings. */
  public boolean isBalanced(ArrayList<String> delimiters) {
    return false;
  }
}`;

/** Q3 — full class with reference method bodies (implementation workspace editor). */
export const FRQ_2019_Q3_DELIMITERS_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class Delimiters {

  private String openDel;
  private String closeDel;

  public Delimiters(String open, String close) {
    openDel = open;
    closeDel = close;
  }

  /** Returns delimiters from tokens in order (part (a)). */
  public ArrayList<String> getDelimitersList(String[] tokens) {
    ArrayList<String> out = new ArrayList<String>();
    for (String t : tokens) {
      if (t.equals(openDel) || t.equals(closeDel)) {
        out.add(t);
      }
    }
    return out;
  }

  /** True if balanced per part (b). Precondition: only open/close strings. */
  public boolean isBalanced(ArrayList<String> delimiters) {
    int balance = 0;
    for (String d : delimiters) {
      if (d.equals(openDel)) {
        balance++;
      } else {
        balance--;
      }
      if (balance < 0) {
        return false;
      }
    }
    return balance == 0;
  }
}`;

/** Q3 — reference method bodies (Solution + Implementation steps reuse this). */
export const FRQ_2019_Q3_REFERENCE_METHODS = `  public ArrayList<String> getDelimitersList(String[] tokens) {
    ArrayList<String> out = new ArrayList<String>();
    for (String t : tokens) {
      if (t.equals(openDel) || t.equals(closeDel)) {
        out.add(t);
      }
    }
    return out;
  }

  public boolean isBalanced(ArrayList<String> delimiters) {
    int balance = 0;
    for (String d : delimiters) {
      if (d.equals(openDel)) {
        balance++;
      } else {
        balance--;
      }
      if (balance < 0) {
        return false;
      }
    }
    return balance == 0;
  }`;

export const FRQ_2019_Q4_LIGHT_BOARD_PRINTED_CLASS = `public class LightBoard {

  private boolean[][] lights;

  /** Each cell true with probability 0.4 (part (a)). */
  public LightBoard(int numRows, int numCols) {
  }

  /** Rules in part (b); precondition: valid row, col. */
  public boolean evaluateLight(int row, int col) {
    return false;
  }
}`;

/** Q4 — full class with reference implementations (implementation workspace editor). */
export const FRQ_2019_Q4_LIGHT_BOARD_REFERENCE_COMPLETE = `public class LightBoard {

  private boolean[][] lights;

  /** Each cell true with probability 0.4 (part (a)). */
  public LightBoard(int numRows, int numCols) {
    lights = new boolean[numRows][numCols];
    for (int r = 0; r < numRows; r++) {
      for (int c = 0; c < numCols; c++) {
        lights[r][c] = Math.random() < 0.4;
      }
    }
  }

  /** Rules in part (b); precondition: valid row, col. */
  public boolean evaluateLight(int row, int col) {
    int onInCol = 0;
    for (int r = 0; r < lights.length; r++) {
      if (lights[r][col]) {
        onInCol++;
      }
    }
    boolean on = lights[row][col];
    if (on && onInCol % 2 == 0) {
      return false;
    }
    if (!on && onInCol % 3 == 0) {
      return true;
    }
    return on;
  }
}`;

/** Q4 — reference constructor + method (Solution + Implementation steps reuse this). */
export const FRQ_2019_Q4_REFERENCE_METHODS = `  public LightBoard(int numRows, int numCols) {
    lights = new boolean[numRows][numCols];
    for (int r = 0; r < numRows; r++) {
      for (int c = 0; c < numCols; c++) {
        lights[r][c] = Math.random() < 0.4;
      }
    }
  }

  public boolean evaluateLight(int row, int col) {
    int onInCol = 0;
    for (int r = 0; r < lights.length; r++) {
      if (lights[r][col]) {
        onInCol++;
      }
    }
    boolean on = lights[row][col];
    if (on && onInCol % 2 == 0) {
      return false;
    }
    if (!on && onInCol % 3 == 0) {
      return true;
    }
    return on;
  }`;

export const ap2019FrqApCalendar: ApExamFrqSheet = {
  year: '2019',
  questionNumber: 1,
  headline: 'The **APCalendar** class calculates calendar information. You will write **two** methods.',
  examIntro:
    'The **APCalendar** class contains methods used to calculate information about a calendar. You will write **two** methods of the class.',
  examClassContext: FRQ_2019_Q1_AP_CALENDAR_PRINTED_CLASS,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    {
      label: 'Full Section II question paper (College Board)',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap19-frq-computer-science-a.pdf',
    },
  ],
  parts: [
    {
      label: '(a)',
      title: '`numberOfLeapYears`',
      body:
        'Write the static method **`numberOfLeapYears`**, which returns the number of **leap years** between **`year1`** and **`year2`**, **inclusive**.\n\n' +
        'A helper is provided: **`isLeapYear(year)`** returns **true** if **year** is a leap year.\n\n' +
        '**Complete** **`numberOfLeapYears`** below. You **must** use **`isLeapYear`** appropriately to receive full credit.',
    },
    {
      label: '(b)',
      title: '`dayOfWeek`',
      body:
        'Write the static method **`dayOfWeek`**, which returns **0**–**6** for **Sunday** … **Saturday** for the given **valid** date.\n\n' +
        '**Examples:** **2019** began on a **Tuesday**. **January 5** is the **5th** day of **2019**, so **`dayOfWeek(1, 5, 2019)`** returns **6** (Saturday). **January 10** is the **10th** day, so **`dayOfWeek(1, 10, 2019)`** returns **4** (Thursday).\n\n' +
        '**Helpers:** **`firstDayOfYear(year)`** — weekday of **Jan 1** (same **0**–**6** code). **`dayOfYear(month, day, year)`** — **n** where the date is the **nth** day of the year (**1** for **Jan 1**); accounts for leap years (e.g. **Mar 1, 2017** → **60**; **Mar 1, 2016** → **61**).\n\n' +
        '**Complete** **`dayOfWeek`** below. You **must** use **`firstDayOfYear`** and **`dayOfYear`** appropriately to receive full credit.',
    },
  ],
  solutionHint:
    '**(a)** Loop **`y`** from **`year1`** to **`year2`** inclusive; count when **`isLeapYear(y)`**.\n\n' +
    '**(b)** Let **`start = firstDayOfYear(year)`** and **`n = dayOfYear(month, day, year)`**. Advance **`n - 1`** days from **`start`** on a **7**-day cycle → **`(start + n - 1) % 7`**, adjusting if **`%`** can be negative in your formulation.',
};

export const ap2019FrqStepTracker: ApExamFrqSheet = {
  year: '2019',
  questionNumber: 2,
  headline:
    'A **StepTracker** models fitness tracking. An object is created with a **minimum** step count for a day to count as **active**.',
  examIntro:
    'This question involves the implementation of a fitness tracking system that is represented by the **StepTracker** class. A **StepTracker** object is created with a parameter that defines the **minimum** number of steps that must be taken for a day to be considered **active**.\n\n' +
    'The **StepTracker** class provides a **constructor** and the following methods.\n\n' +
    '• **`addDailySteps`** — accumulates information about steps, in readings taken **once per day**.\n' +
    '• **`activeDays`** — returns the number of **active** days.\n' +
    '• **`averageSteps`** — returns the **average** number of steps per day, calculated by dividing the **total** number of steps taken by the **number of days** tracked.\n\n' +
    'You will write the **complete** **StepTracker** class, including the required **instance variables**, **constructor**, and **methods**.',
  examClassContext: FRQ_2019_Q2_STEP_TRACKER_PRINTED_CLASS,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    {
      label: 'Full Section II question paper (College Board)',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap19-frq-computer-science-a.pdf',
    },
  ],
  parts: [
    {
      label: 'Specification',
      body:
        '**Methods:** **`addDailySteps`** (accumulate daily readings), **`activeDays`** (count of active days), **`averageSteps`** (total steps ÷ days tracked; **0.0** if no days yet).\n\n' +
        '**Sample sequence** (minimum **10,000** for an active day):\n\n' +
        '**`new StepTracker(10000)`** — threshold **10,000**.\n' +
        '**`activeDays()`** → **0**; **`averageSteps()`** → **0.0**.\n' +
        '**`addDailySteps(9000)`**, **`addDailySteps(5000)`** — neither active → **`activeDays()`** **0**; **`averageSteps()`** **7000.0** (**14000 / 2**).\n' +
        '**`addDailySteps(13000)`** — one active day → **`activeDays()`** **1**; **`averageSteps()`** **9000.0** (**27000 / 3**).\n' +
        '**`addDailySteps(23000)`**, **`addDailySteps(1111)`** → **`activeDays()`** **2**; **`averageSteps()`** **10222.2** (**51111 / 5**).\n\n' +
        'Write the **complete** **`StepTracker`** class, including the **constructor**, **instance variables**, and **methods**. Your implementation must match this behavior.',
    },
  ],
  solutionHint:
    'Store **threshold**, **total steps**, and **day count**; optionally **active day count** or derive from a list. **`averageSteps`** uses **days actually recorded** (the table uses **5** after five **`addDailySteps`** calls).',
};

export const ap2019FrqDelimiters: ApExamFrqSheet = {
  year: '2019',
  questionNumber: 3,
  headline:
    '**Delimiters** are non-empty strings that bound parts of a larger string. Each pair has an **open** and **close** delimiter; they must be **balanced**.',
  examIntro:
    '**Delimiters** are non-empty strings used to **bound** parts of a larger string. Each delimiter pair consists of an **open delimiter** string and a **close delimiter** string.\n\n' +
    'The **`Delimiters`** class below stores one such pair. You will implement **`getDelimitersList`** and **`isBalanced`** as specified in the **Problem** tab.',
  examClassContext: FRQ_2019_Q3_DELIMITERS_PRINTED_CLASS,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    {
      label: 'Full Section II question paper (College Board)',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap19-frq-computer-science-a.pdf',
    },
  ],
  parts: [
    {
      label: 'Context',
      body:
        '**Example (math):** **`(`** and **`)`** — **`(x + y) * 5`** is valid; **`(x + (y)`** is not (unmatched open).\n\n' +
        '**Example (HTML-style):** paired tags must match; an open without a matching close is invalid.\n\n' +
        'Class **`Delimiters`** has **`openDel`**, **`closeDel`**, constructor **`Delimiters(String open, String close)`**, and methods **`getDelimitersList`** and **`isBalanced`** (signatures in the editor).',
    },
    {
      label: '(a)',
      title: '`getDelimitersList`',
      body:
        '**`tokens`** is a **`String[]`**: each element is either the **open** delimiter, the **close** delimiter, or a non-delimiter substring.\n\n' +
        'Return an **`ArrayList`** (in order) of **every** open and close delimiter appearing in **`tokens`**.\n\n' +
        '**Example:** open **`(`**, close **`)`**, tokens **`(`**, **`x + y`**, **`)`**, **` * 5`** → list **`(`**, **`)`**.',
    },
    {
      label: '(b)',
      title: '`isBalanced`',
      body:
        'Return **true** if delimiters are **balanced**:\n' +
        '**1.** Scanning left to right, the count of **close** delimiters never exceeds **open** delimiters at any prefix.\n' +
        '**2.** Total **open** count equals total **close** count.\n\n' +
        '**Precondition:** the list contains only valid open/close delimiter strings for this object.',
    },
  ],
  solutionHint:
    '**(a)** Loop **`tokens`**; if a token **equals** **`openDel`** or **`closeDel`**, add it to the list.\n\n' +
    '**(b)** Track a **running balance** of opens minus closes; it must **never** go negative, and end at **0**.',
};

export const ap2019FrqLightBoard: ApExamFrqSheet = {
  year: '2019',
  questionNumber: 4,
  headline:
    '**LightBoard** models a **2D** grid of lights (**true** = on, **false** = off). Implement the **constructor** and **`evaluateLight`**.',
  examIntro:
    'The **LightBoard** class models a **two-dimensional** display of **Boolean** values, where each entry **`lights[row][col]`** is **true** if the light at that location is **on** and **false** otherwise. You will implement the **constructor** and **`evaluateLight`** as specified in the **Problem** tab.',
  examClassContext: FRQ_2019_Q4_LIGHT_BOARD_PRINTED_CLASS,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    {
      label: 'Full Section II question paper (College Board)',
      href: 'https://apcentral.collegeboard.org/media/pdf/ap19-frq-computer-science-a.pdf',
    },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body:
        '**`LightBoard(int numRows, int numCols)`**\n\n' +
        '**Precondition:** **`numRows > 0`**, **`numCols > 0`**.\n\n' +
        '**Postcondition:** each **`lights[r][c]`** is set to **on** (**true**) with **40%** probability.',
    },
    {
      label: '(b)',
      title: '`evaluateLight`',
      body:
        '**`evaluateLight(int row, int col)`** — use the **current** board.\n\n' +
        'Let **N** = number of lights **on** in **column** **`col`** (including **`lights[row][col]`** if it is on).\n\n' +
        '**1.** If this light is **on**: return **false** if **N** is **even**.\n' +
        '**2.** If this light is **off**: return **true** if **N** is **divisible by 3**.\n' +
        '**3.** Otherwise return the light’s **current** boolean value.\n\n' +
        '**Example calls** (on a **7 × 5** sample board): **`evaluateLight(0, 3)`** → **false**; **`evaluateLight(6, 0)`** → **true**; **`evaluateLight(4, 1)`** → **false**; **`evaluateLight(5, 4)`** → **true**.',
    },
  ],
  solutionHint:
    '**(a)** Allocate **`lights`**, nested loops, set **`true`** when **`Math.random() < 0.4`** (or equivalent).\n\n' +
    '**(b)** First loop **column** **`col`** to count **on** cells, then apply the three rules.',
};
