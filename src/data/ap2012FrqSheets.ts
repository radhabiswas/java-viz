import type { ApExamFrqSheet } from '../types';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';

const pack = AP_PAST_PAPER_RELEASED_PDFS['2012'];
const AP12_FRQ_PDF = pack.questionPaper;
const AP12_SG = pack.scoringGuidelines;
const [AP12_Q1_SAMPLE, AP12_Q2_SAMPLE, AP12_Q3_SAMPLE, AP12_Q4_SAMPLE] = pack.sampleByQuestion;

/** Printed exam context — Question 1 (ClimbingClub / ClimbInfo). */
export const FRQ_2012_Q1_CLIMBING_PRINTED = `import java.util.ArrayList;
import java.util.List;

public class ClimbInfo {
  /**
   * Creates a ClimbInfo object with name peakName and time climbTime.
   * @param peakName the name of the mountain peak
   * @param climbTime the number of minutes taken to complete the climb
   */
  public ClimbInfo(String peakName, int climbTime) {
    /* implementation not shown */
  }

  /** @return the name of the mountain peak */
  public String getName() {
    /* implementation not shown */
  }

  /** @return the number of minutes taken to complete the climb */
  public int getTime() {
    /* implementation not shown */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}

public class ClimbingClub {
  /**
   * The list of climbs completed by members of the club.
   * Guaranteed not to be null. Contains only non-null references.
   */
  private List climbList;

  /** Creates a new ClimbingClub object. */
  public ClimbingClub() {
    climbList = new ArrayList();
  }

  /**
   * Adds a new climb with name peakName and time climbTime to the list of climbs.
   * @param peakName the name of the mountain peak climbed
   * @param climbTime the number of minutes taken to complete the climb
   */
  public void addClimb(String peakName, int climbTime) {
    /* to be implemented in part (a) with ClimbInfo objects in the order they were added */
    /* to be implemented in part (b) with ClimbInfo objects in alphabetical order by name */
  }

  /** @return the number of distinct names in the list of climbs */
  public int distinctPeakNames() {
    if (climbList.size() == 0) {
      return 0;
    }
    ClimbInfo currInfo = climbList.get(0);
    String prevName = currInfo.getName();
    String currName = null;
    int numNames = 1;
    for (int k = 1; k < climbList.size(); k++) {
      currInfo = climbList.get(k);
      currName = currInfo.getName();
      if (prevName.compareTo(currName) != 0) {
        numNames++;
        prevName = currName;
      }
    }
    return numNames;
  }

  // There may be instance variables, constructors, and methods that are not shown.
}
`;

export const FRQ_2012_Q1_REFERENCE_COMPLETE = `import java.util.ArrayList;
import java.util.List;

public class ClimbInfo {
  private final String peakName;
  private final int climbTime;

  public ClimbInfo(String peakName, int climbTime) {
    this.peakName = peakName;
    this.climbTime = climbTime;
  }

  public String getName() {
    return peakName;
  }

  public int getTime() {
    return climbTime;
  }
}

public class ClimbingClub {
  private List<ClimbInfo> climbList;

  public ClimbingClub() {
    climbList = new ArrayList<ClimbInfo>();
  }

  /** Part (b): list stays sorted by peak name (String compareTo). */
  public void addClimb(String peakName, int climbTime) {
    int i = 0;
    while (i < climbList.size()
        && peakName.compareTo(climbList.get(i).getName()) > 0) {
      i++;
    }
    climbList.add(i, new ClimbInfo(peakName, climbTime));
  }

  public int distinctPeakNames() {
    if (climbList.size() == 0) {
      return 0;
    }
    ClimbInfo currInfo = climbList.get(0);
    String prevName = currInfo.getName();
    String currName = null;
    int numNames = 1;
    for (int k = 1; k < climbList.size(); k++) {
      currInfo = climbList.get(k);
      currName = currInfo.getName();
      if (prevName.compareTo(currName) != 0) {
        numNames++;
        prevName = currName;
      }
    }
    return numNames;
  }
}
`;

export const FRQ_2012_Q1_REF_ADD_CLIMB_APPEND = `  /** Part (a): append in insertion order. */
  public void addClimb(String peakName, int climbTime) {
    climbList.add(new ClimbInfo(peakName, climbTime));
  }`;

export const FRQ_2012_Q1_REF_ADD_CLIMB_SORTED = `  /** Part (b): insert in alphabetical order by peak name (String compareTo). */
  public void addClimb(String peakName, int climbTime) {
    int i = 0;
    while (i < climbList.size()
        && peakName.compareTo(climbList.get(i).getName()) > 0) {
      i++;
    }
    climbList.add(i, new ClimbInfo(peakName, climbTime));
  }`;

/** Question 2 — GridWorld RetroBug (extends Bug); printed stem matches the case-study FRQ. */
export const FRQ_2012_Q2_RETRO_BUG_PRINTED = `public class RetroBug extends Bug {

  /* Write necessary instance variables. */

  public void act() {
    /* to be implemented */
  }

  /**
   * Restores location (when allowed) and direction from the start of the previous act.
   * No effect before the first act.
   */
  public void restore() {
    /* to be implemented */
  }
}
`;

/**
 * Reference shaped like the published canonical solution (GridWorld: Bug, Location, Direction,
 * Flower, Actor). Types match the case study; not bundled in the app runtime.
 */
export const FRQ_2012_Q2_REFERENCE_COMPLETE = `public class RetroBug extends Bug {
  private Location savedLocation;
  private Direction savedDirection;

  public void act() {
    savedLocation = getLocation();
    savedDirection = getDirection();
    super.act();
  }

  public void restore() {
    if (savedLocation == null) {
      return;
    }
    setDirection(savedDirection);
    Actor neighbor = getGrid().get(savedLocation);
    if (neighbor == null || neighbor instanceof Flower) {
      moveTo(savedLocation);
    }
  }
}
`;

export const FRQ_2012_Q3_HORSE_BARN_PRINTED = `public interface Horse {
  /** @return the horse's name */
  String getName();

  /** @return the horse's weight */
  int getWeight();

  // There may be methods that are not shown.
}

public class HorseBarn {
  /**
   * The spaces in the barn. Each array element holds a reference to the horse
   * that is currently occupying the space. A null value indicates an empty space.
   */
  private Horse[] spaces;

  /**
   * Returns the index of the space that contains the horse with the specified name.
   * Precondition: No two horses in the barn have the same name.
   * @param name the name of the horse to find
   * @return the index of the space containing the horse with the specified name;
   * -1 if no horse with the specified name is in the barn.
   */
  public int findHorseSpace(String name) {
    /* to be implemented in part (a) */
  }

  /**
   * Consolidates the barn by moving horses so that the horses are in adjacent spaces,
   * starting at index 0, with no empty space between any two horses.
   * Postcondition: The order of the horses is the same as before the consolidation.
   */
  public void consolidate() {
    /* to be implemented in part (b) */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}
`;

export const FRQ_2012_Q3_REFERENCE_COMPLETE = `public class HorseBarn {
  private Horse[] spaces;

  public int findHorseSpace(String name) {
    for (int i = 0; i < spaces.length; i++) {
      if (spaces[i] != null && name.equals(spaces[i].getName())) {
        return i;
      }
    }
    return -1;
  }

  public void consolidate() {
    Horse[] temp = new Horse[spaces.length];
    int count = 0;
    for (int i = 0; i < spaces.length; i++) {
      if (spaces[i] != null) {
        temp[count] = spaces[i];
        count++;
      }
    }
    for (int i = 0; i < spaces.length; i++) {
      if (i < count) {
        spaces[i] = temp[i];
      } else {
        spaces[i] = null;
      }
    }
  }
}
`;

export const FRQ_2012_Q3_REF_FIND_HORSE_SPACE = `  public int findHorseSpace(String name) {
    for (int i = 0; i < spaces.length; i++) {
      if (spaces[i] != null && name.equals(spaces[i].getName())) {
        return i;
      }
    }
    return -1;
  }`;

export const FRQ_2012_Q3_REF_CONSOLIDATE = `  public void consolidate() {
    Horse[] temp = new Horse[spaces.length];
    int count = 0;
    for (int i = 0; i < spaces.length; i++) {
      if (spaces[i] != null) {
        temp[count] = spaces[i];
        count++;
      }
    }
    for (int i = 0; i < spaces.length; i++) {
      if (i < count) {
        spaces[i] = temp[i];
      } else {
        spaces[i] = null;
      }
    }
  }`;

export const FRQ_2012_Q4_GRAY_IMAGE_PRINTED = `public class GrayImage {
  public static final int BLACK = 0;
  public static final int WHITE = 255;

  /**
   * The 2-dimensional representation of this image. Guaranteed not to be null.
   * All values in the array are within the range [BLACK, WHITE], inclusive.
   */
  private int[][] pixelValues;

  /**
   * @return the total number of white pixels in this image.
   * Postcondition: this image has not been changed.
   */
  public int countWhitePixels() {
    /* to be implemented in part (a) */
  }

  /**
   * Processes this image in row-major order and decreases the value of each pixel at
   * position (row, col) by the value of the pixel at position (row + 2, col + 2) if it exists.
   * Resulting values that would be less than BLACK are replaced by BLACK.
   * Pixels for which there is no pixel at position (row + 2, col + 2) remain unchanged.
   */
  public void processImage() {
    /* to be implemented in part (b) */
  }
}
`;

export const FRQ_2012_Q4_REFERENCE_COMPLETE = `public class GrayImage {
  public static final int BLACK = 0;
  public static final int WHITE = 255;
  private int[][] pixelValues;

  public int countWhitePixels() {
    int n = 0;
    for (int r = 0; r < pixelValues.length; r++) {
      for (int c = 0; c < pixelValues[r].length; c++) {
        if (pixelValues[r][c] == WHITE) {
          n++;
        }
      }
    }
    return n;
  }

  public void processImage() {
    for (int r = 0; r < pixelValues.length; r++) {
      for (int c = 0; c < pixelValues[r].length; c++) {
        int rr = r + 2;
        int cc = c + 2;
        if (rr < pixelValues.length && cc < pixelValues[r].length) {
          int v = pixelValues[r][c] - pixelValues[rr][cc];
          if (v < BLACK) {
            v = BLACK;
          }
          pixelValues[r][c] = v;
        }
      }
    }
  }
}
`;

export const FRQ_2012_Q4_REF_COUNT_WHITE = `  public int countWhitePixels() {
    int n = 0;
    for (int r = 0; r < pixelValues.length; r++) {
      for (int c = 0; c < pixelValues[r].length; c++) {
        if (pixelValues[r][c] == WHITE) {
          n++;
        }
      }
    }
    return n;
  }`;

export const FRQ_2012_Q4_REF_PROCESS_IMAGE = `  public void processImage() {
    for (int r = 0; r < pixelValues.length; r++) {
      for (int c = 0; c < pixelValues[r].length; c++) {
        int rr = r + 2;
        int cc = c + 2;
        if (rr < pixelValues.length && cc < pixelValues[r].length) {
          int v = pixelValues[r][c] - pixelValues[rr][cc];
          if (v < BLACK) {
            v = BLACK;
          }
          pixelValues[r][c] = v;
        }
      }
    }
  }`;

export const ap2012FrqClimbingClub: ApExamFrqSheet = {
  year: '2012',
  questionNumber: 1,
  headline: '**ClimbingClub** — **`addClimb`** (insertion vs **sorted**); **`distinctPeakNames`** analysis.',
  examIntro:
    '**`ClimbInfo`** holds a peak **name** and **time**. **`ClimbingClub`** keeps a **`List`** of **`ClimbInfo`**. **(a)** **`addClimb`** appends a new **`ClimbInfo`** at the **end** (insertion order). **(b)** Another **`addClimb`** inserts so names stay in **alphabetical** order (**`String.compareTo`**); duplicate names may be grouped in either order within the group. **(c)** Given **`distinctPeakNames`** (counts transitions where adjacent names differ), decide if it works with **(a)** vs **(b)** implementations.',
  examClassContext: FRQ_2012_Q1_CLIMBING_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2012 Section II question paper (College Board)', href: AP12_FRQ_PDF },
    { label: '2012 scoring guidelines', href: AP12_SG },
    { label: 'Sample response — question 1', href: AP12_Q1_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`addClimb` — insertion order',
      body: '**`add(new ClimbInfo(peakName, climbTime))`** at the **end** of **`climbList`**.',
    },
    {
      label: '(b)',
      title: '`addClimb` — alphabetical insert',
      body:
        '**Precondition:** list already sorted by name. Find index **`i`** with **`while`** **`peakName.compareTo(get(i).getName()) > 0`**, then **`add(i, new ClimbInfo(...))`**.',
    },
    {
      label: '(c)',
      title: '`distinctPeakNames` — yes / no',
      body:
        '**(i)** With **(a)**, duplicate names may be **non-adjacent** → the scan can **over-count** → **NO**. **(ii)** With **(b)**, equal names are **grouped** → adjacent duplicates are skipped → **YES**.',
    },
  ],
  solutionHint:
    '**(a)** `climbList.add(new ClimbInfo(peakName, climbTime));`\n\n' +
    '**(b)** Linear scan with `compareTo` then `add(i, …)`.\n\n' +
    '**(c)** (i) NO; (ii) YES.',
};

export const ap2012FrqRetroBug: ApExamFrqSheet = {
  year: '2012',
  questionNumber: 2,
  headline: '**RetroBug** (GridWorld) — save **location** & **direction** at **`act`**; **`restore`**.',
  examIntro:
    '**GridWorld** case study: **`RetroBug`** extends **`Bug`**. On each **`act`**, remember **location** and **direction** at the **start** of the call, then **`super.act()`**. **`restore()`** — no effect **before the first `act`**. Always **`setDirection`** to the saved direction. **Move** back to the saved **location** only if that cell is **empty** or holds a **`Flower`**; otherwise stay put but still fix direction.',
  examClassContext: FRQ_2012_Q2_RETRO_BUG_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2012 Section II question paper (College Board)', href: AP12_FRQ_PDF },
    { label: '2012 scoring guidelines', href: AP12_SG },
    { label: 'Sample response — question 2', href: AP12_Q2_SAMPLE },
  ],
  parts: [
    {
      label: 'Class',
      title: '`RetroBug`',
      body:
        '**Fields** — saved **`Location`** (or null before first act) and **`Direction`**. **`act`** — assign fields from **`getLocation()`** / **`getDirection()`**, then **`super.act()`**. **`restore`** — guard null; **`setDirection`**; if **`getGrid().get(saved)`** is **null** or **`Flower`**, **`moveTo(saved)`**.',
    },
  ],
  solutionHint:
    'Save at **start** of `act` before `super.act()`. `restore`: early return if never acted; always `setDirection`; `moveTo` only when cell empty or `Flower`.',
};

export const ap2012FrqHorseBarn: ApExamFrqSheet = {
  year: '2012',
  questionNumber: 3,
  headline: '**HorseBarn** — **`findHorseSpace`**; **`consolidate`** without reordering horses.',
  examIntro:
    '**`Horse`** has **`getName`** / **`getWeight`**. **`spaces`** is a **`Horse[]`** with **null** gaps. **(a)** **`findHorseSpace(name)`** — first index with non-null horse whose name **`equals`** **`name`**, else **-1**. **(b)** **`consolidate`** — pack non-null horses into indices **0…k-1** in **original left-to-right order**; remaining slots **null**.',
  examClassContext: FRQ_2012_Q3_HORSE_BARN_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2012 Section II question paper (College Board)', href: AP12_FRQ_PDF },
    { label: '2012 scoring guidelines', href: AP12_SG },
    { label: 'Sample response — question 3', href: AP12_Q3_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`findHorseSpace`',
      body: '**`for`** each index; if **`spaces[i] != null`** and **`name.equals(spaces[i].getName())`** return **`i`**. After loop return **-1**.',
    },
    {
      label: '(b)',
      title: '`consolidate`',
      body:
        'Copy non-null references in order into a **temp** array (or second pass), then write back: indices **0..count-1** filled, rest **null**.',
    },
  ],
  solutionHint: '**(a)** Simple linear search with null check.\n\n' + '**(b)** Two-pass: collect non-null, then place at front.',
};

export const ap2012FrqGrayImage: ApExamFrqSheet = {
  year: '2012',
  questionNumber: 4,
  headline: '**GrayImage** — count **`WHITE`** pixels; **`processImage`** with offset **(row+2, col+2)**.',
  examIntro:
    '**`pixelValues`** is rectangular; values in **[BLACK, WHITE]**. **(a)** **`countWhitePixels`** — count entries **== WHITE**. **(b)** **`processImage`** — row-major: each **`(r,c)`** subtract **`pixelValues[r+2][c+2]`** when that index exists; clamp below **BLACK** to **BLACK**; leave pixels unchanged when the offset neighbor is out of bounds.',
  examClassContext: FRQ_2012_Q4_GRAY_IMAGE_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2012 Section II question paper (College Board)', href: AP12_FRQ_PDF },
    { label: '2012 scoring guidelines', href: AP12_SG },
    { label: 'Sample response — question 4', href: AP12_Q4_SAMPLE },
  ],
  parts: [
    {
      label: '(a)',
      title: '`countWhitePixels`',
      body: 'Nested loops over rows/columns; increment when **`pixelValues[r][c] == WHITE`**.',
    },
    {
      label: '(b)',
      title: '`processImage`',
      body:
        'For each **`(r,c)`**, if **`r+2 < rows`** and **`c+2 < cols`** (using row width), subtract neighbor; **`Math.max(BLACK, …)`** or **`if (v < BLACK) v = BLACK`**.',
    },
  ],
  solutionHint: '**(a)** Double loop, compare to `WHITE`.\n\n' + '**(b)** Bounds on `r+2` and `c+2` before read; clamp.',
};
