import type { ApExamFrqSheet } from '../types';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';

const AP13 = AP_PAST_PAPER_RELEASED_PDFS['2013'];

/** Printed exam context — Question 1 (DownloadInfo + MusicDownloads). */
export const FRQ_2013_Q1_DOWNLOADS_PRINTED = `public class DownloadInfo {
  /** Creates a new instance with the given unique title and sets the
   * number of times downloaded to 1.
   * @param title the unique title of the downloaded song
   */
  public DownloadInfo(String title) {
    /* implementation not shown */
  }

  /** @return the title */
  public String getTitle() {
    /* implementation not shown */
  }

  /** Increment the number times downloaded by 1 */
  public void incrementTimesDownloaded() {
    /* implementation not shown */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}

public class MusicDownloads {
  /** The list of downloaded information.
   * Guaranteed not to be null and not to contain duplicate titles.
   */
  private List downloadList;

  /** Creates the list of downloaded information. */
  public MusicDownloads() {
    downloadList = new ArrayList();
  }

  /** Returns a reference to the DownloadInfo object with the requested title if it exists.
   * @param title the requested title
   * @return a reference to the DownloadInfo object with the
   * title that matches the parameter title if it exists in the list;
   * null otherwise.
   * Postcondition:
   * - no changes were made to downloadList.
   */
  public DownloadInfo getDownloadInfo(String title) {
    /* to be implemented in part (a) */
  }

  /** Updates downloadList with information from titles.
   * @param titles a list of song titles
   * Postcondition:
   * - there are no duplicate titles in downloadList.
   * - no entries were removed from downloadList.
   * - all songs in titles are represented in downloadList.
   * - for each existing entry in downloadList, the download count is increased by
   * the number of times its title appeared in titles.
   * - the order of the existing entries in downloadList is not changed.
   * - the first time an object with a title from titles is added to downloadList, it
   * is added to the end of the list.
   * - new entries in downloadList appear in the same order
   * in which they first appear in titles.
   * - for each new entry in downloadList, the download count is equal to
   * the number of times its title appeared in titles.
   */
  public void updateDownloads(List titles) {
    /* to be implemented in part (b) */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}
`;

export const FRQ_2013_Q1_REFERENCE_COMPLETE = `import java.util.ArrayList;
import java.util.List;

public class DownloadInfo {
  private final String title;
  private int timesDownloaded;

  public DownloadInfo(String title) {
    this.title = title;
    timesDownloaded = 1;
  }

  public String getTitle() {
    return title;
  }

  public void incrementTimesDownloaded() {
    timesDownloaded++;
  }
}

public class MusicDownloads {
  private List<DownloadInfo> downloadList;

  public MusicDownloads() {
    downloadList = new ArrayList<DownloadInfo>();
  }

  public DownloadInfo getDownloadInfo(String title) {
    for (DownloadInfo info : downloadList) {
      if (info.getTitle().equals(title)) {
        return info;
      }
    }
    return null;
  }

  public void updateDownloads(List<String> titles) {
    for (int i = 0; i < titles.size(); i++) {
      String t = titles.get(i);
      DownloadInfo info = getDownloadInfo(t);
      if (info == null) {
        downloadList.add(new DownloadInfo(t));
      } else {
        info.incrementTimesDownloaded();
      }
    }
  }
}
`;

export const FRQ_2013_Q1_REF_GET_DOWNLOAD_INFO = `  public DownloadInfo getDownloadInfo(String title) {
    for (DownloadInfo info : downloadList) {
      if (info.getTitle().equals(title)) {
        return info;
      }
    }
    return null;
  }`;

export const FRQ_2013_Q1_REF_UPDATE_DOWNLOADS = `  public void updateDownloads(List<String> titles) {
    for (int i = 0; i < titles.size(); i++) {
      String t = titles.get(i);
      DownloadInfo info = getDownloadInfo(t);
      if (info == null) {
        downloadList.add(new DownloadInfo(t));
      } else {
        info.incrementTimesDownloaded();
      }
    }
  }`;

export const FRQ_2013_Q2_TOKEN_PASS_PRINTED = `public class TokenPass {
  private int[] board;
  private int currentPlayer;

  /** Creates the board array to be of size playerCount and fills it with
   * random integer values from 1 to 10, inclusive. Initializes currentPlayer to a
   * random integer value in the range between 0 and playerCount-1, inclusive.
   * @param playerCount the number of players
   */
  public TokenPass(int playerCount) {
    /* to be implemented in part (a) */
  }

  /** Distributes the tokens from the current player's position one at a time to each player in
   * the game. Distribution begins with the next position and continues until all the tokens
   * have been distributed. If there are still tokens to distribute when the player at the
   * highest position is reached, the next token will be distributed to the player at position 0.
   * Precondition: the current player has at least one token.
   * Postcondition: the current player has not changed.
   */
  public void distributeCurrentPlayerTokens() {
    /* to be implemented in part (b) */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}
`;

export const FRQ_2013_Q2_REFERENCE_COMPLETE = `public class TokenPass {
  private int[] board;
  private int currentPlayer;

  public TokenPass(int playerCount) {
    board = new int[playerCount];
    for (int i = 0; i < playerCount; i++) {
      board[i] = (int) (Math.random() * 10) + 1;
    }
    currentPlayer = (int) (Math.random() * playerCount);
  }

  public void distributeCurrentPlayerTokens() {
    int tokens = board[currentPlayer];
    board[currentPlayer] = 0;
    int next = currentPlayer + 1;
    while (tokens > 0) {
      if (next >= board.length) {
        next = 0;
      }
      board[next]++;
      tokens--;
      next++;
    }
  }
}
`;

export const FRQ_2013_Q2_REF_CONSTRUCTOR = `  public TokenPass(int playerCount) {
    board = new int[playerCount];
    for (int i = 0; i < playerCount; i++) {
      board[i] = (int) (Math.random() * 10) + 1;
    }
    currentPlayer = (int) (Math.random() * playerCount);
  }`;

export const FRQ_2013_Q2_REF_DISTRIBUTE = `  public void distributeCurrentPlayerTokens() {
    int tokens = board[currentPlayer];
    board[currentPlayer] = 0;
    int next = currentPlayer + 1;
    while (tokens > 0) {
      if (next >= board.length) {
        next = 0;
      }
      board[next]++;
      tokens--;
      next++;
    }
  }`;

/** Historical GridWorld case study (2013 exam). */
export const FRQ_2013_Q3_GRIDWORLD_PRINTED = `import java.util.ArrayList;

public class GridWorldUtilities {
  /** Gets all the locations in grid that do not contain objects.
   * @param grid a reference to a BoundedGrid object
   * @return an array list (possibly empty) of empty locations in grid.
   * The size of the returned list is 0 if there are no empty locations in grid.
   * Each empty location in grid should appear exactly once in the returned list.
   */
  public static ArrayList getEmptyLocations(Grid grid) {
    /* to be implemented in part (a) */
  }

  // There may be instance variables that are not shown.
}

public class JumpingCritter extends Critter {
  /* Write the complete class (part (b)). Do not override act. */
}
`;

export const FRQ_2013_Q3_REFERENCE_COMPLETE = `import info.gridworld.actor.Critter;
import info.gridworld.grid.Grid;
import info.gridworld.grid.Location;
import java.util.ArrayList;

public class GridWorldUtilities {
  public static ArrayList<Location> getEmptyLocations(Grid grid) {
    ArrayList<Location> empty = new ArrayList<Location>();
    for (int r = 0; r < grid.getNumRows(); r++) {
      for (int c = 0; c < grid.getNumCols(); c++) {
        Location loc = new Location(r, c);
        if (grid.get(loc) == null) {
          empty.add(loc);
        }
      }
    }
    return empty;
  }
}

public class JumpingCritter extends Critter {
  public ArrayList<Location> getMoveLocations() {
    return GridWorldUtilities.getEmptyLocations(getGrid());
  }
}
`;

export const FRQ_2013_Q3_REF_GET_EMPTY = `  public static ArrayList<Location> getEmptyLocations(Grid grid) {
    ArrayList<Location> empty = new ArrayList<Location>();
    for (int r = 0; r < grid.getNumRows(); r++) {
      for (int c = 0; c < grid.getNumCols(); c++) {
        Location loc = new Location(r, c);
        if (grid.get(loc) == null) {
          empty.add(loc);
        }
      }
    }
    return empty;
  }`;

export const FRQ_2013_Q3_REF_JUMPING = `public class JumpingCritter extends Critter {
  public ArrayList<Location> getMoveLocations() {
    return GridWorldUtilities.getEmptyLocations(getGrid());
  }
}`;

export const FRQ_2013_Q4_SKY_VIEW_PRINTED = `public class SkyView {
  /** A rectangular array that holds the data representing a rectangular area of the sky. */
  private double[][] view;

  /** Constructs a SkyView object from a 1-dimensional array of scan data.
   * @param numRows the number of rows represented in the view
   * Precondition: numRows > 0
   * @param numCols the number of columns represented in the view
   * Precondition: numCols > 0
   * @param scanned the scan data received from the telescope, stored in telescope order
   * Precondition: scanned.length == numRows * numCols
   * Postcondition: view has been created as a rectangular 2-dimensional array
   * with numRows rows and numCols columns and the values in
   * scanned have been copied to view and are ordered as
   * in the original rectangular area of sky.
   */
  public SkyView(int numRows, int numCols, double[] scanned) {
    /* to be implemented in part (a) */
  }

  /** Returns the average of the values in a rectangular section of view.
   * @param startRow the first row index of the section
   * @param endRow the last row index of the section
   * @param startCol the first column index of the section
   * @param endCol the last column index of the section
   * Precondition: 0 <= startRow <= endRow < view.length
   * Precondition: 0 <= startCol <= endCol < view[0].length
   * @return the average of the values in the specified section of view
   */
  public double getAverage(int startRow, int endRow, int startCol, int endCol) {
    /* to be implemented in part (b) */
  }

  // There may be instance variables, constructors, and methods that are not shown.
}
`;

export const FRQ_2013_Q4_REFERENCE_COMPLETE = `public class SkyView {
  private double[][] view;

  public SkyView(int numRows, int numCols, double[] scanned) {
    view = new double[numRows][numCols];
    int idx = 0;
    for (int r = 0; r < numRows; r++) {
      if (r % 2 == 0) {
        for (int c = 0; c < numCols; c++) {
          view[r][c] = scanned[idx++];
        }
      } else {
        for (int c = numCols - 1; c >= 0; c--) {
          view[r][c] = scanned[idx++];
        }
      }
    }
  }

  public double getAverage(int startRow, int endRow, int startCol, int endCol) {
    double sum = 0;
    int count = 0;
    for (int r = startRow; r <= endRow; r++) {
      for (int c = startCol; c <= endCol; c++) {
        sum += view[r][c];
        count++;
      }
    }
    return sum / count;
  }
}
`;

export const FRQ_2013_Q4_REF_CONSTRUCTOR = `  public SkyView(int numRows, int numCols, double[] scanned) {
    view = new double[numRows][numCols];
    int idx = 0;
    for (int r = 0; r < numRows; r++) {
      if (r % 2 == 0) {
        for (int c = 0; c < numCols; c++) {
          view[r][c] = scanned[idx++];
        }
      } else {
        for (int c = numCols - 1; c >= 0; c--) {
          view[r][c] = scanned[idx++];
        }
      }
    }
  }`;

export const FRQ_2013_Q4_REF_GET_AVERAGE = `  public double getAverage(int startRow, int endRow, int startCol, int endCol) {
    double sum = 0;
    int count = 0;
    for (int r = startRow; r <= endRow; r++) {
      for (int c = startCol; c <= endCol; c++) {
        sum += view[r][c];
        count++;
      }
    }
    return sum / count;
  }`;

export const ap2013FrqMusicDownloads: ApExamFrqSheet = {
  year: '2013',
  questionNumber: 1,
  headline: '**MusicDownloads** — **`getDownloadInfo`**; **`updateDownloads`** with **`List`** of titles.',
  examIntro:
    'Each **`DownloadInfo`** holds a **unique** song title and a download count (constructor sets count to **1**). **`MusicDownloads`** keeps **`downloadList`** — **no** duplicate titles, never **null**. **(a)** **`getDownloadInfo(title)`** returns the matching **`DownloadInfo`** or **`null`**; **must not** change the list. **(b)** **`updateDownloads(titles)`** walks **`titles`** in order: for each title, either **`incrementTimesDownloaded`** on an existing entry or **`add`** a **new** **`DownloadInfo`** at the **end**; you **must** use **`getDownloadInfo`**.',
  examClassContext: FRQ_2013_Q1_DOWNLOADS_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2013 Section II question paper (College Board)', href: AP13.questionPaper },
    { label: '2013 scoring guidelines', href: AP13.scoringGuidelines },
    { label: 'Sample response — question 1', href: AP13.sampleByQuestion[0] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`getDownloadInfo`',
      body:
        'Scan **`downloadList`**; return the **`DownloadInfo`** whose **`getTitle()`** **`equals`** the parameter, else **`null`**. Do **not** modify the list.',
    },
    {
      label: '(b)',
      title: '`updateDownloads`',
      body:
        'For each title in **`titles`** (in order): if **`getDownloadInfo(t)`** is **`null`**, **`add(new DownloadInfo(t))`**; else **`incrementTimesDownloaded()`** once. New titles append in **first-seen** order; existing entries keep their relative order.',
    },
  ],
  solutionHint:
    '**(a)** Enhanced for over `downloadList` with `getTitle().equals(title)`.\n\n' +
    '**(b)** Loop `titles`; call `getDownloadInfo`; branch add vs increment.',
};

export const ap2013FrqTokenPass: ApExamFrqSheet = {
  year: '2013',
  questionNumber: 2,
  headline: '**TokenPass** — random **board**; **distribute** tokens from **current** player.',
  examIntro:
    '**`board[i]`** is tokens at player **i**. **(a)** Constructor: array length **`playerCount`**, each entry random **1–10**, **`currentPlayer`** random **0 … playerCount−1**. **(b)** **`distributeCurrentPlayerTokens`** — take **all** tokens from **`board[currentPlayer]`** (set to **0**), then give **one** at a time to the **next** index, wrapping past the last player to **0**; **`currentPlayer`** unchanged.',
  examClassContext: FRQ_2013_Q2_TOKEN_PASS_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2013 Section II question paper (College Board)', href: AP13.questionPaper },
    { label: '2013 scoring guidelines', href: AP13.scoringGuidelines },
    { label: 'Sample response — question 2', href: AP13.sampleByQuestion[1] },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body: '**`board = new int[playerCount]`**; fill with **`(int)(Math.random() * 10) + 1`**; **`currentPlayer`** in **0 … length−1**.',
    },
    {
      label: '(b)',
      title: '`distributeCurrentPlayerTokens`',
      body:
        'Read count from **`board[currentPlayer]`**, zero it, then **`while (tokens > 0)`**: advance **`next`** (start at **`currentPlayer + 1`**), wrap at **`length`**, **`board[next]++`**, decrement **`tokens`**, **`next++`**.',
    },
  ],
  solutionHint:
    '**(a)** Two loops or one for fill; one assignment for currentPlayer.\n\n' + '**(b)** `int next = currentPlayer + 1` then wrap with `if (next >= board.length) next = 0` each token.',
};

export const ap2013FrqGridWorldJump: ApExamFrqSheet = {
  year: '2013',
  questionNumber: 3,
  headline: '**GridWorld** — **`getEmptyLocations`**; **`JumpingCritter`** (historical case study).',
  examIntro:
    'Uses the **GridWorld** case study (**not** on the current AP CSA exam). **(a)** **`GridWorldUtilities.getEmptyLocations(grid)`** — every **`Location`** with **`grid.get(loc) == null`**, each once, any order. **(b)** **`JumpingCritter`** extends **`Critter`**: **do not** override **`act`**. **Must** use **`GridWorldUtilities.getEmptyLocations`** (do not reimplement). Inherited **`selectMoveLocation`** picks a random move; **`JumpingCritter`** only needs **`getMoveLocations`** to return **all** empty cells — if none, critter removes itself.',
  examClassContext: FRQ_2013_Q3_GRIDWORLD_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2013 Section II question paper (College Board)', href: AP13.questionPaper },
    { label: '2013 scoring guidelines', href: AP13.scoringGuidelines },
    { label: 'Sample response — question 3', href: AP13.sampleByQuestion[2] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`getEmptyLocations`',
      body: 'Double loop **rows** × **cols**; **`new Location(r, c)`**; if **`grid.get(loc) == null`**, **`add`** to **`ArrayList`**.',
    },
    {
      label: '(b)',
      title: '`JumpingCritter`',
      body: 'Override **`getMoveLocations`** to **`return GridWorldUtilities.getEmptyLocations(getGrid());`** only.',
    },
  ],
  solutionHint: '**(a)** Nested for loops with `grid.getNumRows()` / `getNumCols()`.\n\n' + '**(b)** One method override delegating to the utility.',
};

export const ap2013FrqSkyView: ApExamFrqSheet = {
  year: '2013',
  questionNumber: 4,
  headline: '**SkyView** — **telescope order** into **`view[][]`**; **`getAverage`** sub-rectangle.',
  examIntro:
    '**`scanned`** is **row-major in telescope order**: row **0** left→right, row **1** right→left, row **2** left→right, etc. **(a)** Build **`view[numRows][numCols]`** by filling from **`scanned`** with that zigzag. **(b)** **`getAverage`** — average of all **`view[r][c]`** with **`startRow ≤ r ≤ endRow`** and **`startCol ≤ c ≤ endCol`**.',
  examClassContext: FRQ_2013_Q4_SKY_VIEW_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2013 Section II question paper (College Board)', href: AP13.questionPaper },
    { label: '2013 scoring guidelines', href: AP13.scoringGuidelines },
    { label: 'Sample response — question 4', href: AP13.sampleByQuestion[3] },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body:
        '**`int idx = 0`**. For each row **r**, if **r % 2 == 0** fill **c = 0 … numCols−1** with **`scanned[idx++]`**; else fill **c = numCols−1 … 0**.',
    },
    {
      label: '(b)',
      title: '`getAverage`',
      body: 'Nested loops over the inclusive bounds; **`sum / count`** as **`double`** (accumulate with **`double sum`**).',
    },
  ],
  solutionHint: '**(a)** Even rows forward for-loop; odd rows backward.\n\n' + '**(b)** `for (int r = startRow; r <= endRow; r++)` etc.',
};
