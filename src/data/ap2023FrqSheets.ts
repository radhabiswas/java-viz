import type { ApExamFrqSheet } from '../types';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';

const AP23 = AP_PAST_PAPER_RELEASED_PDFS['2023'];

/** Printed exam context — Question 1 (AppointmentBook). */
export const FRQ_2023_Q1_APPOINTMENT_BOOK_PRINTED = `public class AppointmentBook {

  /** Returns true if minute in period is available; false otherwise.
   *  Preconditions: 1 <= period <= 8; 0 <= minute <= 59 */
  private boolean isMinuteFree(int period, int minute) {
    /* implementation not shown */
  }

  /** Marks startMinute through startMinute + duration - 1 in period as reserved.
   *  Preconditions: 1 <= period <= 8; 0 <= startMinute <= 59; 1 <= duration <= 60 */
  private void reserveBlock(int period, int startMinute, int duration) {
    /* implementation not shown */
  }

  /** Returns the first starting minute of a block of duration consecutive free minutes
   *  in period, or -1 if no such block exists.
   *  Preconditions: 1 <= period <= 8; 1 <= duration <= 60 */
  public int findFreeBlock(int period, int duration) {
    /* to be implemented in part (a) */
  }

  /** Searches periods startPeriod through endPeriod, inclusive, for a free block of
   *  duration minutes and reserves the first such block found.
   *  Preconditions: 1 <= startPeriod <= endPeriod <= 8; 1 <= duration <= 60 */
  public boolean makeAppointment(int startPeriod, int endPeriod, int duration) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors, or methods that are not shown. */
}
`;

/** Reference workspace: student methods plus minimal stubs for hidden helpers. */
export const FRQ_2023_Q1_REFERENCE_COMPLETE = `public class AppointmentBook {

  private boolean isMinuteFree(int period, int minute) {
    return true;
  }

  private void reserveBlock(int period, int startMinute, int duration) {
  }

  public int findFreeBlock(int period, int duration) {
    int blockLength = 0;
    for (int minute = 0; minute < 60; minute++) {
      if (isMinuteFree(period, minute)) {
        blockLength++;
        if (blockLength == duration) {
          return minute - blockLength + 1;
        }
      } else {
        blockLength = 0;
      }
    }
    return -1;
  }

  public boolean makeAppointment(int startPeriod, int endPeriod, int duration) {
    for (int period = startPeriod; period <= endPeriod; period++) {
      int minute = findFreeBlock(period, duration);
      if (minute != -1) {
        reserveBlock(period, minute, duration);
        return true;
      }
    }
    return false;
  }
}
`;

export const FRQ_2023_Q1_REF_FIND_FREE_BLOCK = `  public int findFreeBlock(int period, int duration) {
    int blockLength = 0;
    for (int minute = 0; minute < 60; minute++) {
      if (isMinuteFree(period, minute)) {
        blockLength++;
        if (blockLength == duration) {
          return minute - blockLength + 1;
        }
      } else {
        blockLength = 0;
      }
    }
    return -1;
  }`;

export const FRQ_2023_Q1_REF_MAKE_APPOINTMENT = `  public boolean makeAppointment(int startPeriod, int endPeriod, int duration) {
    for (int period = startPeriod; period <= endPeriod; period++) {
      int minute = findFreeBlock(period, duration);
      if (minute != -1) {
        reserveBlock(period, minute, duration);
        return true;
      }
    }
    return false;
  }`;

/** Question 2 — complete Sign class (printed stubs). */
export const FRQ_2023_Q2_SIGN_PRINTED = `public class Sign {

  public Sign(String message, int width) {
    /* to be implemented */
  }

  public int numberOfLines() {
    /* to be implemented */
  }

  public String getLines() {
    /* to be implemented */
  }
}
`;

export const FRQ_2023_Q2_REFERENCE_CLASS = `public class Sign {
  private String message;
  private int width;

  public Sign(String m, int w) {
    message = m;
    width = w;
  }

  public int numberOfLines() {
    int len = message.length();
    if (len % width == 0) {
      return len / width;
    }
    return len / width + 1;
  }

  public String getLines() {
    int linesNeeded = numberOfLines();
    if (linesNeeded == 0) {
      return null;
    }
    String signLines = "";
    for (int i = 1; i < linesNeeded; i++) {
      signLines += message.substring((i - 1) * width, i * width) + ";";
    }
    return signLines + message.substring((linesNeeded - 1) * width);
  }
}
`;

export const FRQ_2023_Q3_WEATHER_DATA_PRINTED = `import java.util.ArrayList;

public class WeatherData {

  /** Guaranteed not to be null and to contain only non-null entries */
  private ArrayList temperatures;

  /** Removes all values from temperatures that are strictly less than lower or strictly greater than upper */
  public void cleanData(double lower, double upper) {
    /* to be implemented in part (a) */
  }

  /** Returns the length of the longest heat wave in temperatures, as described in part (b)
   *  Precondition: There is at least one heat wave in temperatures */
  public int longestHeatWave(double threshold) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors, and methods that are not shown. */
}
`;

export const FRQ_2023_Q3_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class WeatherData {
  private ArrayList<Double> temperatures;

  public WeatherData(ArrayList<Double> temps) {
    temperatures = temps;
  }

  public void cleanData(double lower, double upper) {
    for (int i = temperatures.size() - 1; i >= 0; i--) {
      double temp = temperatures.get(i);
      if (temp < lower || temp > upper) {
        temperatures.remove(i);
      }
    }
  }

  public int longestHeatWave(double threshold) {
    int waveLength = 0;
    int maxWaveLength = 0;
    for (double temp : temperatures) {
      if (temp > threshold) {
        waveLength++;
        if (waveLength > maxWaveLength) {
          maxWaveLength = waveLength;
        }
      } else {
        waveLength = 0;
      }
    }
    return maxWaveLength;
  }
}
`;

export const FRQ_2023_Q3_REF_CLEAN_DATA = `  public void cleanData(double lower, double upper) {
    for (int i = temperatures.size() - 1; i >= 0; i--) {
      double temp = temperatures.get(i);
      if (temp < lower || temp > upper) {
        temperatures.remove(i);
      }
    }
  }`;

export const FRQ_2023_Q3_REF_LONGEST_HEAT_WAVE = `  public int longestHeatWave(double threshold) {
    int waveLength = 0;
    int maxWaveLength = 0;
    for (double temp : temperatures) {
      if (temp > threshold) {
        waveLength++;
        if (waveLength > maxWaveLength) {
          maxWaveLength = waveLength;
        }
      } else {
        waveLength = 0;
      }
    }
    return maxWaveLength;
  }`;

export const FRQ_2023_Q4_BOX_OF_CANDY_PRINTED = `public class Candy {

  /** Returns a String representing the flavor of this piece of candy */
  public String getFlavor() {
    /* implementation not shown */
  }

  /* There may be instance variables, constructors, and methods that are not shown. */
}

public class BoxOfCandy {

  /** Contains a non-null reference to a rectangular array of Candy objects
   *  Precondition: box has at least one row */
  private Candy[][] box;

  /** Moves a piece of candy in column col, if possible, to row 0 and returns true;
   *  otherwise it returns false, as described in part (a)
   *  Precondition: col is a valid column index in box. */
  public boolean moveCandyToFirstRow(int col) {
    /* to be implemented in part (a) */
  }

  /** Removes and returns a piece of candy whose flavor matches flavor, as described in part (b).
   *  Returns null if no such piece of candy is found */
  public Candy removeNextByFlavor(String flavor) {
    /* to be implemented in part (b) */
  }

  /* There may be instance variables, constructors, or methods that are not shown. */
}
`;

export const FRQ_2023_Q4_REFERENCE_COMPLETE = `public class Candy {
  private final String flavor;

  public Candy(String flavor) {
    this.flavor = flavor;
  }

  public String getFlavor() {
    return flavor;
  }
}

public class BoxOfCandy {
  private Candy[][] box;

  public BoxOfCandy(Candy[][] box) {
    this.box = box;
  }

  public boolean moveCandyToFirstRow(int col) {
    if (box[0][col] != null) {
      return true;
    }
    for (int row = 1; row < box.length; row++) {
      if (box[row][col] != null) {
        box[0][col] = box[row][col];
        box[row][col] = null;
        return true;
      }
    }
    return false;
  }

  public Candy removeNextByFlavor(String flavor) {
    for (int row = box.length - 1; row >= 0; row--) {
      for (int col = 0; col < box[0].length; col++) {
        if (box[row][col] != null && box[row][col].getFlavor().equals(flavor)) {
          Candy taken = box[row][col];
          box[row][col] = null;
          return taken;
        }
      }
    }
    return null;
  }
}
`;

export const FRQ_2023_Q4_REF_MOVE_CANDY_TO_FIRST_ROW = `  public boolean moveCandyToFirstRow(int col) {
    if (box[0][col] != null) {
      return true;
    }
    for (int row = 1; row < box.length; row++) {
      if (box[row][col] != null) {
        box[0][col] = box[row][col];
        box[row][col] = null;
        return true;
      }
    }
    return false;
  }`;

export const FRQ_2023_Q4_REF_REMOVE_NEXT_BY_FLAVOR = `  public Candy removeNextByFlavor(String flavor) {
    for (int row = box.length - 1; row >= 0; row--) {
      for (int col = 0; col < box[0].length; col++) {
        if (box[row][col] != null && box[row][col].getFlavor().equals(flavor)) {
          Candy taken = box[row][col];
          box[row][col] = null;
          return taken;
        }
      }
    }
    return null;
  }`;

export const ap2023FrqAppointmentBook: ApExamFrqSheet = {
  year: '2023',
  questionNumber: 1,
  headline: '**AppointmentBook** — **consecutive free minutes**; **`makeAppointment`** across **periods**.',
  examIntro:
    '**`isMinuteFree(period, minute)`** and **`reserveBlock(period, startMinute, duration)`** are private helpers (not shown). **(a)** **`findFreeBlock(period, duration)`** returns the **starting minute** of the **first** block of **`duration`** consecutive free minutes in that **period**, or **-1**. Minutes are **0–59**. **(b)** **`makeAppointment(startPeriod, endPeriod, duration)`** searches **periods** from **`startPeriod`** through **`endPeriod`** **inclusive** for the **first** block **`findFreeBlock`** can find; if found, **`reserveBlock`** and return **true**; else **false**.',
  examClassContext: FRQ_2023_Q1_APPOINTMENT_BOOK_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2023 Section II question paper (College Board)', href: AP23.questionPaper },
    { label: '2023 scoring guidelines', href: AP23.scoringGuidelines },
    { label: 'Sample response — question 1', href: AP23.sampleByQuestion[0] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`findFreeBlock`',
      body:
        'Loop minutes **0…59**. Track **consecutive** free minutes with **`isMinuteFree`**. **Reset** when a minute is busy. When the run length reaches **`duration`**, return **start** = **`minute - runLength + 1`**. Return **-1** if the hour ends without a full block.',
    },
    {
      label: '(b)',
      title: '`makeAppointment`',
      body:
        'For each **period** from **`startPeriod`** to **`endPeriod`**, call **`findFreeBlock(period, duration)`**. If the result is not **-1**, call **`reserveBlock`** with that **period**, **starting minute**, and **`duration`**, then return **true**. If no period works, return **false**.',
    },
  ],
  solutionHint:
    '**(a)** Counter `blockLength`; increment on `isMinuteFree`, else zero; on match return `minute - blockLength + 1`.\n\n' +
    '**(b)** `for (int p = startPeriod; p <= endPeriod; p++)` with guard before `reserveBlock`.',
};

export const ap2023FrqSign: ApExamFrqSheet = {
  year: '2023',
  questionNumber: 2,
  headline: '**Sign** — **ceiling** line count; **`getLines`** with **`;`** and **no trailing semicolon**.',
  examIntro:
    'Write the **complete** **`Sign`** class. **Constructor** **`Sign(String message, int width)`** stores both; **`width`** is max characters per line (message is split **without** regard to word breaks). **`numberOfLines()`** returns how many lines are needed (**ceiling** of length ÷ width; **0** if message is empty). **`getLines()`** returns lines joined by **`";"`**, **no** semicolon after the last line, or **`null`** if the message is empty.',
  examClassContext: FRQ_2023_Q2_SIGN_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2023 Section II question paper (College Board)', href: AP23.questionPaper },
    { label: '2023 scoring guidelines', href: AP23.scoringGuidelines },
    { label: 'Sample response — question 2', href: AP23.sampleByQuestion[1] },
  ],
  parts: [
    {
      label: 'Specification',
      title: '`Sign`',
      body:
        '**`numberOfLines`**: if **`len % width == 0`** return **`len / width`**, else **`len / width + 1`** (or **`(len + width - 1) / width`**). **`getLines`**: if **0** lines → **`null`**; else append full **`width`**-character slices with **`";"`** between them, last slice **without** trailing **`";"`**.',
    },
  ],
  solutionHint:
    'Store `message` and `width`. `getLines`: loop `i` from **1** to `linesNeeded-1` adding `substring` + `";"`; then append final `substring` without semicolon.',
};

export const ap2023FrqWeatherData: ApExamFrqSheet = {
  year: '2023',
  questionNumber: 3,
  headline: '**WeatherData** — **`cleanData`** by **removing** out-of-range temps; **longest heat wave**.',
  examIntro:
    '**`temperatures`** is an **`ArrayList`** (no null elements). **(a)** **`cleanData(lower, upper)`** removes every value **strictly less** than **`lower`** or **strictly greater** than **`upper`**; keep order of what remains. **(b)** **`longestHeatWave(threshold)`** returns the length of the **longest** sequence of **2+** consecutive days with temperature **strictly greater** than **`threshold`**. Precondition: at least one such heat wave exists.',
  examClassContext: FRQ_2023_Q3_WEATHER_DATA_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2023 Section II question paper (College Board)', href: AP23.questionPaper },
    { label: '2023 scoring guidelines', href: AP23.scoringGuidelines },
    { label: 'Sample response — question 3', href: AP23.sampleByQuestion[2] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`cleanData`',
      body:
        'Traverse **backwards** (**`size()-1`** down to **0**). If **`get(i)`** is **`< lower`** or **`> upper`**, **`remove(i)`**. Backwards avoids **skipping** after **`remove`**. ',
    },
    {
      label: '(b)',
      title: '`longestHeatWave`',
      body:
        'Run-length on **`temperatures`**: if **`temp > threshold`**, grow current streak and update **max**; else reset streak to **0**. Return **max**.',
    },
  ],
  solutionHint:
    '**(a)** `for (int i = temperatures.size()-1; i >= 0; i--)` with `< lower || > upper` then `remove`.\n\n' +
    '**(b)** `waveLength` / `maxWaveLength`; strict `> threshold`.',
};

export const ap2023FrqBoxOfCandy: ApExamFrqSheet = {
  year: '2023',
  questionNumber: 4,
  headline: '**BoxOfCandy** — **column** fill to row **0**; **removeNextByFlavor** with fixed **traversal**.',
  examIntro:
    '**`Candy`** has **`getFlavor()`**. **`box`** is a rectangular **`Candy[][]`** (may contain **`null`**). **(a)** **`moveCandyToFirstRow(col)`** — if **`box[0][col]`** already has candy, return **true**; else move the **first** candy found in that column at **row ≥ 1** up to row **0** and **null** the old cell; return **false** if the column is **empty**. **(b)** **`removeNextByFlavor(flavor)`** — traverse **bottom row to top**, and **left to right** within each row; remove and return the **first** candy whose flavor **`.equals`** the parameter; **`null`** if none. **Guard** **`null`** before **`getFlavor()`**.',
  examClassContext: FRQ_2023_Q4_BOX_OF_CANDY_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2023 Section II question paper (College Board)', href: AP23.questionPaper },
    { label: '2023 scoring guidelines', href: AP23.scoringGuidelines },
    { label: 'Sample response — question 4', href: AP23.sampleByQuestion[3] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`moveCandyToFirstRow`',
      body:
        '**Early return true** if top cell **non-null**. Else scan **rows 1…last**; on first **non-null**, copy to **`[0][col]`**, **null** source, return **true**. **false** if no candy in column.',
    },
    {
      label: '(b)',
      title: '`removeNextByFlavor`',
      body:
        '**Outer** loop **`row`** from **`length-1`** down to **0**; **inner** **`col`** from **0** to **`length-1`**. If cell **non-null** and **`getFlavor().equals(flavor)`**, save reference, **null** cell, return saved candy. **`null`** after loops if not found.',
    },
  ],
  solutionHint:
    '**(a)** Check `box[0][col]` first; then `for (int row = 1; row < box.length; row++)`.\n\n' +
    '**(b)** Bottom-up rows; `Candy taken = box[r][c]` before nulling.',
};
