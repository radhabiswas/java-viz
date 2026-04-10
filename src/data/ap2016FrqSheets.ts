import type { ApExamFrqSheet } from '../types';
import { AP_PAST_PAPER_RELEASED_PDFS } from './apPastPaperReleasedPdfs';
import { AP_SECTION_II_DIRECTIONS, AP_SECTION_II_NOTES } from './ap2019FrqSheets';

const AP16 = AP_PAST_PAPER_RELEASED_PDFS['2016'];

/** Printed exam context — Question 1 (RandomStringChooser / RandomLetterChooser). */
export const FRQ_2016_Q1_RANDOM_CHOOSER_PRINTED = `import java.util.ArrayList;

public class RandomStringChooser {

  public RandomStringChooser(String[] words) {
    /* to be implemented in part (a) */
  }

  public String getNext() {
    /* to be implemented in part (a) */
  }
}

public class RandomLetterChooser extends RandomStringChooser {

  public RandomLetterChooser(String str) {
    /* to be implemented in part (b) */
  }

  public static String[] getSingleLetters(String str) {
    /* implementation not shown */
  }
}
`;

export const FRQ_2016_Q1_REFERENCE_COMPLETE = `import java.util.ArrayList;

public class RandomStringChooser {
  private ArrayList<String> words;

  public RandomStringChooser(String[] arr) {
    words = new ArrayList<String>();
    for (String s : arr) {
      words.add(s);
    }
  }

  public String getNext() {
    if (words.size() == 0) {
      return "NONE";
    }
    int n = (int) (Math.random() * words.size());
    return words.remove(n);
  }
}

public class RandomLetterChooser extends RandomStringChooser {

  public RandomLetterChooser(String str) {
    super(getSingleLetters(str));
  }

  public static String[] getSingleLetters(String str) {
    String[] out = new String[str.length()];
    for (int i = 0; i < str.length(); i++) {
      out[i] = str.substring(i, i + 1);
    }
    return out;
  }
}
`;

export const FRQ_2016_Q1_REF_RANDOM_STRING_CLASS = `public class RandomStringChooser {
  private ArrayList<String> words;

  public RandomStringChooser(String[] arr) {
    words = new ArrayList<String>();
    for (String s : arr) {
      words.add(s);
    }
  }

  public String getNext() {
    if (words.size() == 0) {
      return "NONE";
    }
    int n = (int) (Math.random() * words.size());
    return words.remove(n);
  }
}
`;

export const FRQ_2016_Q1_REF_LETTER_CONSTRUCTOR = `  public RandomLetterChooser(String str) {
    super(getSingleLetters(str));
  }

  public static String[] getSingleLetters(String str) {
    String[] out = new String[str.length()];
    for (int i = 0; i < str.length(); i++) {
      out[i] = str.substring(i, i + 1);
    }
    return out;
  }`;

/** Question 2 — LogMessage + SystemLog (printed stems). */
export const FRQ_2016_Q2_LOG_MESSAGE_PRINTED = `import java.util.ArrayList;
import java.util.List;

public class LogMessage {
  private String machineId;
  private String description;

  /** Precondition: message is a valid log message. */
  public LogMessage(String message) {
    /* to be implemented in part (a) */
  }

  /** Returns true if the description in this log message properly contains keyword;
   * false otherwise.
   */
  public boolean containsWord(String keyword) {
    /* to be implemented in part (b) */
  }

  public String getMachineId() {
    return machineId;
  }

  public String getDescription() {
    return description;
  }
}

public class SystemLog {

  /** Contains all the entries in this system log.
   * Guaranteed not to be null and to contain only non-null entries.
   */
  private List messageList;

  /** Removes from the system log all entries whose descriptions properly contain keyword,
   * and returns a list (possibly empty) containing the removed entries.
   * Postcondition:
   * - Entries in the returned list properly contain keyword and
   * are in the order in which they appeared in the system log.
   * - The remaining entries in the system log do not properly contain keyword and
   * are in their original order.
   * - The returned list is empty if no messages properly contain keyword.
   */
  public List removeMessages(String keyword) {
    /* to be implemented in part (c) */
  }
}
`;

export const FRQ_2016_Q2_REFERENCE_COMPLETE = `import java.util.ArrayList;
import java.util.List;

public class LogMessage {
  private String machineId;
  private String description;

  public LogMessage(String message) {
    int colon = message.indexOf(":");
    machineId = message.substring(0, colon);
    description = message.substring(colon + 1);
  }

  public boolean containsWord(String keyword) {
    int idx = description.indexOf(keyword);
    while (idx >= 0) {
      boolean beforeOk = (idx == 0) || (description.charAt(idx - 1) == ' ');
      int after = idx + keyword.length();
      boolean afterOk = (after == description.length()) || (description.charAt(after) == ' ');
      if (beforeOk && afterOk) {
        return true;
      }
      idx = description.indexOf(keyword, idx + 1);
    }
    return false;
  }

  public String getMachineId() {
    return machineId;
  }

  public String getDescription() {
    return description;
  }
}

public class SystemLog {
  private List<LogMessage> messageList;

  public List<LogMessage> removeMessages(String keyword) {
    List<LogMessage> removed = new ArrayList<LogMessage>();
    int i = 0;
    while (i < messageList.size()) {
      LogMessage m = messageList.get(i);
      if (m.containsWord(keyword)) {
        removed.add(m);
        messageList.remove(i);
      } else {
        i++;
      }
    }
    return removed;
  }
}
`;

export const FRQ_2016_Q2_REF_CONSTRUCTOR = `  public LogMessage(String message) {
    int colon = message.indexOf(":");
    machineId = message.substring(0, colon);
    description = message.substring(colon + 1);
  }`;

export const FRQ_2016_Q2_REF_CONTAINS_WORD = `  public boolean containsWord(String keyword) {
    int idx = description.indexOf(keyword);
    while (idx >= 0) {
      boolean beforeOk = (idx == 0) || (description.charAt(idx - 1) == ' ');
      int after = idx + keyword.length();
      boolean afterOk = (after == description.length()) || (description.charAt(after) == ' ');
      if (beforeOk && afterOk) {
        return true;
      }
      idx = description.indexOf(keyword, idx + 1);
    }
    return false;
  }`;

export const FRQ_2016_Q2_REF_REMOVE_MESSAGES = `  public List<LogMessage> removeMessages(String keyword) {
    List<LogMessage> removed = new ArrayList<LogMessage>();
    int i = 0;
    while (i < messageList.size()) {
      LogMessage m = messageList.get(i);
      if (m.containsWord(keyword)) {
        removed.add(m);
        messageList.remove(i);
      } else {
        i++;
      }
    }
    return removed;
  }`;

/** Question 3 — Crossword labeling (printed). */
export const FRQ_2016_Q3_CROSSWORD_PRINTED = `public class Square {

  /** Constructs one square of a crossword puzzle grid.
   * Postcondition:
   * - The square is black if and only if isBlack is true.
   * - The square has number num.
   */
  public Square(boolean isBlack, int num) {
    /* implementation not shown */
  }
}

public class Crossword {

  /** Each element is a Square object with a color (black or white) and a number.
   * puzzle[r][c] represents the square in row r, column c.
   * There is at least one row in the puzzle.
   */
  private Square[][] puzzle;

  /** Constructs a crossword puzzle grid.
   * Precondition: There is at least one row in blackSquares.
   * Postcondition:
   * - The crossword puzzle grid has the same dimensions as blackSquares.
   * - The Square object at row r, column c in the crossword puzzle grid is black
   * if and only if blackSquares[r][c] is true.
   * - The squares in the puzzle are labeled according to the crossword labeling rule.
   */
  public Crossword(boolean[][] blackSquares) {
    /* to be implemented in part (b) */
  }

  /** Returns true if the square at row r, column c should be labeled with a positive number;
   * false otherwise.
   * The square at row r, column c is black if and only if blackSquares[r][c] is true.
   * Precondition: r and c are valid indexes in blackSquares.
   */
  private boolean toBeLabeled(int r, int c, boolean[][] blackSquares) {
    /* to be implemented in part (a) */
  }
}
`;

export const FRQ_2016_Q3_REFERENCE_COMPLETE = `public class Square {
  private boolean black;
  private int number;

  public Square(boolean isBlack, int num) {
    black = isBlack;
    number = num;
  }
}

public class Crossword {
  private Square[][] puzzle;

  private boolean toBeLabeled(int r, int c, boolean[][] blackSquares) {
    if (blackSquares[r][c]) {
      return false;
    }
    boolean upWhite = r > 0 && !blackSquares[r - 1][c];
    boolean leftWhite = c > 0 && !blackSquares[r][c - 1];
    return !upWhite || !leftWhite;
  }

  public Crossword(boolean[][] blackSquares) {
    int rows = blackSquares.length;
    int cols = blackSquares[0].length;
    puzzle = new Square[rows][cols];
    int num = 1;
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (blackSquares[r][c]) {
          puzzle[r][c] = new Square(true, 0);
        } else if (toBeLabeled(r, c, blackSquares)) {
          puzzle[r][c] = new Square(false, num);
          num++;
        } else {
          puzzle[r][c] = new Square(false, 0);
        }
      }
    }
  }
}
`;

export const FRQ_2016_Q3_REF_TO_BE_LABELED = `  private boolean toBeLabeled(int r, int c, boolean[][] blackSquares) {
    if (blackSquares[r][c]) {
      return false;
    }
    boolean upWhite = r > 0 && !blackSquares[r - 1][c];
    boolean leftWhite = c > 0 && !blackSquares[r][c - 1];
    return !upWhite || !leftWhite;
  }`;

export const FRQ_2016_Q3_REF_CONSTRUCTOR = `  public Crossword(boolean[][] blackSquares) {
    int rows = blackSquares.length;
    int cols = blackSquares[0].length;
    puzzle = new Square[rows][cols];
    int num = 1;
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (blackSquares[r][c]) {
          puzzle[r][c] = new Square(true, 0);
        } else if (toBeLabeled(r, c, blackSquares)) {
          puzzle[r][c] = new Square(false, num);
          num++;
        } else {
          puzzle[r][c] = new Square(false, 0);
        }
      }
    }
  }`;

/** Question 4 — StringFormatter (printed). */
export const FRQ_2016_Q4_STRING_FORMATTER_PRINTED = `import java.util.List;

public class StringFormatter {

  /** Returns the total number of letters in wordList.
   * Precondition: wordList contains at least two words, consisting of letters only.
   */
  public static int totalLetters(List wordList) {
    /* to be implemented in part (a) */
  }

  /** Returns the basic gap width when wordList is used to produce
   * a formatted string of formattedLen characters.
   * Precondition: wordList contains at least two words, consisting of letters only.
   * formattedLen is large enough for all the words and gaps.
   */
  public static int basicGapWidth(List wordList, int formattedLen) {
    /* to be implemented in part (b) */
  }

  public static int leftoverSpaces(List wordList, int formattedLen) {
    /* implementation not shown */
  }

  /** Returns a formatted string consisting of the words in wordList separated by spaces.
   * Precondition: The wordList contains at least two words, consisting of letters only.
   * formattedLen is large enough for all the words and gaps.
   * Postcondition: All words in wordList appear in the formatted string.
   * - The words appear in the same order as in wordList.
   * - The number of spaces between words is determined by basicGapWidth and the
   * distribution of leftoverSpaces from left to right, as described in the question.
   */
  public static String format(List wordList, int formattedLen) {
    /* to be implemented in part (c) */
  }
}
`;

export const FRQ_2016_Q4_REFERENCE_COMPLETE = `import java.util.List;

public class StringFormatter {

  public static int totalLetters(List<String> wordList) {
    int sum = 0;
    for (int i = 0; i < wordList.size(); i++) {
      sum += wordList.get(i).length();
    }
    return sum;
  }

  public static int basicGapWidth(List<String> wordList, int formattedLen) {
    int gaps = wordList.size() - 1;
    return (formattedLen - totalLetters(wordList)) / gaps;
  }

  public static int leftoverSpaces(List<String> wordList, int formattedLen) {
    int gaps = wordList.size() - 1;
    return (formattedLen - totalLetters(wordList)) % gaps;
  }

  public static String format(List<String> wordList, int formattedLen) {
    int basic = basicGapWidth(wordList, formattedLen);
    int extra = leftoverSpaces(wordList, formattedLen);
    String result = wordList.get(0);
    for (int i = 1; i < wordList.size(); i++) {
      int spaces = basic;
      if (extra > 0) {
        spaces++;
        extra--;
      }
      for (int s = 0; s < spaces; s++) {
        result += " ";
      }
      result += wordList.get(i);
    }
    return result;
  }
}
`;

export const FRQ_2016_Q4_REF_TOTAL_LETTERS = `  public static int totalLetters(List<String> wordList) {
    int sum = 0;
    for (int i = 0; i < wordList.size(); i++) {
      sum += wordList.get(i).length();
    }
    return sum;
  }`;

export const FRQ_2016_Q4_REF_BASIC_GAP = `  public static int basicGapWidth(List<String> wordList, int formattedLen) {
    int gaps = wordList.size() - 1;
    return (formattedLen - totalLetters(wordList)) / gaps;
  }`;

export const FRQ_2016_Q4_REF_FORMAT = `  public static String format(List<String> wordList, int formattedLen) {
    int basic = basicGapWidth(wordList, formattedLen);
    int extra = leftoverSpaces(wordList, formattedLen);
    String result = wordList.get(0);
    for (int i = 1; i < wordList.size(); i++) {
      int spaces = basic;
      if (extra > 0) {
        spaces++;
        extra--;
      }
      for (int s = 0; s < spaces; s++) {
        result += " ";
      }
      result += wordList.get(i);
    }
    return result;
  }`;

export const ap2016FrqRandomChooser: ApExamFrqSheet = {
  year: '2016',
  questionNumber: 1,
  headline: '**RandomStringChooser** — random **without replacement**; **`RandomLetterChooser`** subclass.',
  examIntro:
    '**(a)** Build **`RandomStringChooser(String[])`**: copy strings so the **parameter array is unchanged**; **`getNext()`** returns a **uniform** random **available** string and **removes** it; when **none** left return **`"NONE"`**. **(b)** **`RandomLetterChooser`** extends it; constructor must call **`super(getSingleLetters(str))`** — **`getSingleLetters`** is given (not shown).',
  examClassContext: FRQ_2016_Q1_RANDOM_CHOOSER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2016 Section II question paper (College Board)', href: AP16.questionPaper },
    { label: '2016 scoring guidelines', href: AP16.scoringGuidelines },
    { label: 'Sample response — question 1', href: AP16.sampleByQuestion[0] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`RandomStringChooser`',
      body:
        '**Private** copy (e.g. **`ArrayList`**) of all strings. **`getNext`**: if empty → **`"NONE"`**; else **`remove`** at random index **`(int)(Math.random() * size)`**.',
    },
    {
      label: '(b)',
      title: '`RandomLetterChooser`',
      body: '**`super(getSingleLetters(str));`** only — do not reimplement chooser logic.',
    },
  ],
  solutionHint:
    '**(a)** `ArrayList` + loop copy; `getNext` uses `size()==0` or `remove(randomIndex)`.\n\n' + '**(b)** One-line constructor calling `super` with `getSingleLetters(str)`.',
};

export const ap2016FrqLogMessage: ApExamFrqSheet = {
  year: '2016',
  questionNumber: 2,
  headline: '**LogMessage** — parse **`machineId:description`**; **proper** keyword; **`SystemLog.removeMessages`**.',
  examIntro:
    'Log lines have exactly one **`:`** with **no** space before/after. **(a)** Split into **`machineId`** (before colon) and **`description`** (after). **(b)** **`containsWord(keyword)`** — substring match where the keyword is **bounded** by **spaces** or **string ends** (not inside a longer token like **`diskette`**). **(c)** **`removeMessages`** removes all messages whose description **properly** contains the keyword, returns them **in original order**, uses **`containsWord`**.',
  examClassContext: FRQ_2016_Q2_LOG_MESSAGE_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2016 Section II question paper (College Board)', href: AP16.questionPaper },
    { label: '2016 scoring guidelines', href: AP16.scoringGuidelines },
    { label: 'Sample response — question 2', href: AP16.sampleByQuestion[1] },
  ],
  parts: [
    {
      label: '(a)',
      title: 'Constructor',
      body: '**`indexOf(":")`** then **`substring(0, colon)`** and **`substring(colon + 1)`**.',
    },
    {
      label: '(b)',
      title: '`containsWord`',
      body:
        'Scan with **`indexOf(keyword, from)`**; at each hit check **char before** (start or space) and **char after** (end or space).',
    },
    {
      label: '(c)',
      title: '`removeMessages`',
      body:
        'Walk **`messageList`** with an index; if **`containsWord`**, **add** to result and **`remove`** from log **without** advancing index.',
    },
  ],
  solutionHint:
    '**(a)** `indexOf` + two `substring` calls.\n\n' + '**(b)** Loop `indexOf` forward; validate neighbors.\n\n' + '**(c)** `while (i < size)` remove matches in place.',
};

export const ap2016FrqCrossword: ApExamFrqSheet = {
  year: '2016',
  questionNumber: 3,
  headline: '**Crossword** — **white** start cells; **row-major** labels **1, 2, …**.',
  examIntro:
    'A **white** square gets a **positive** label iff it has **no** white square **above** or **no** white **left** (or both). Labels are **consecutive** in **row-major** order. **(a)** **`toBeLabeled`**. **(b)** Build **`puzzle`** with **`Square(isBlack, num)`** — **0** when unlabeled, **black** squares always **0**.',
  examClassContext: FRQ_2016_Q3_CROSSWORD_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2016 Section II question paper (College Board)', href: AP16.questionPaper },
    { label: '2016 scoring guidelines', href: AP16.scoringGuidelines },
    { label: 'Sample response — question 3', href: AP16.sampleByQuestion[2] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`toBeLabeled`',
      body:
        '**false** if **black**. Else **true** if **top** is **black** or **row 0**, or **left** is **black** or **col 0** — i.e. **not** (white above **and** white left).',
    },
    {
      label: '(b)',
      title: 'Constructor',
      body:
        'Allocate **`puzzle`**; nested loops; **`num`** starts at **1**; **`toBeLabeled`** → **`new Square(false, num++)`**, else white unlabeled **`Square(false,0)`**, black **`Square(true,0)`**.',
    },
  ],
  solutionHint:
    '**(a)** `if (blackSquares[r][c]) return false;` then check neighbors above/left.\n\n' + '**(b)** Running counter for labeled white cells only.',
};

export const ap2016FrqStringFormatter: ApExamFrqSheet = {
  year: '2016',
  questionNumber: 4,
  headline: '**StringFormatter** — **total letters**, **basic gap width**, **evenly padded** line.',
  examIntro:
    'Format a **fixed-length** line from **`wordList`**: **gaps** = **`size - 1`**. **Basic gap width** = **floor** **(formattedLen − letterCount) / gaps**; **leftover** spaces go **one each** into the **leftmost** gaps first. **(a)** **`totalLetters`**. **(b)** **`basicGapWidth`** using **`totalLetters`**. **(c)** **`format`** using **`basicGapWidth`** and **`leftoverSpaces`** (given).',
  examClassContext: FRQ_2016_Q4_STRING_FORMATTER_PRINTED,
  directions: AP_SECTION_II_DIRECTIONS,
  notes: AP_SECTION_II_NOTES,
  footerExamLinks: [
    { label: '2016 Section II question paper (College Board)', href: AP16.questionPaper },
    { label: '2016 scoring guidelines', href: AP16.scoringGuidelines },
    { label: 'Sample response — question 4', href: AP16.sampleByQuestion[3] },
  ],
  parts: [
    {
      label: '(a)',
      title: '`totalLetters`',
      body: 'Sum **`length()`** of each word in the list.',
    },
    {
      label: '(b)',
      title: '`basicGapWidth`',
      body: '**`(formattedLen - totalLetters(wordList)) / (wordList.size() - 1)`**.',
    },
    {
      label: '(c)',
      title: '`format`',
      body:
        'Start with first word; for each gap use **`basic + (extra > 0 ? 1 : 0)`** spaces, decrement **`extra`** when you add the bonus space.',
    },
  ],
  solutionHint:
    '**(a)** Loop `get(i).length()`.\n\n' + '**(b)** Integer division on total space ÷ gaps.\n\n' + '**(c)** First `extra` gaps get `basic+1` spaces.',
};
