import { Lesson } from '../types';
import { lessonAdditions } from './lessons.additions';

export const lessons: Lesson[] = [
  {
    id: '1-1',
    order: 2,
    chapter: '1 · Variables & types',
    title: 'Main & Fraction: primitives vs references',
    code: '',
    files: [
      {
        name: 'Main.java',
        code: `// Client; Fraction is defined in Fraction.java.
public class Main {
  public static void main(String[] args) {
    int x = 5;
    Fraction f1;
    f1 = new Fraction(2, 3);
    Fraction f2 = f1;
  }
}
`,
      },
      {
        name: 'Fraction.java',
        code: `/**
 * Fraction with public final fields so the heap diagram can show numer and
 * denom directly (common in introductory courses).
 */
public class Fraction {
  public final int numer;
  public final int denom;

  public Fraction(int numer, int denom) {
    this.numer = numer;
    this.denom = denom;
  }
}
`,
      },
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Main = client; Fraction.java = type definition.',
        fileLinks: [{ file: 'Main.java', label: 'Main.java (client)' }, { file: 'Fraction.java', label: 'Fraction.java (class)' }],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "A primitive variable 'x' of type int is created on the stack. It directly holds the value 5.",
        memory: {
          stack: [{ id: 'x', name: 'x', type: 'primitive', value: 5 }],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 4,
        activeFile: 'Main.java',
        description: "A reference variable 'f1' of type Fraction is created. It doesn't point to any object yet (it is null).",
        memory: {
          stack: [
            { id: 'x', name: 'x', type: 'primitive', value: 5 },
            { id: 'f1', name: 'f1', type: 'reference', refId: null },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 5,
        activeFile: 'Main.java',
        description:
          "The 'new' keyword creates a Fraction object on the heap. The constructor initializes its fields. 'f1' now points to this object.",
        memory: {
          stack: [
            { id: 'x', name: 'x', type: 'primitive', value: 5 },
            { id: 'f1', name: 'f1', type: 'reference', refId: 'obj1' },
          ],
          heap: [
            {
              id: 'obj1',
              className: 'Fraction',
              fields: [
                { name: 'numer', value: 2 },
                { name: 'denom', value: 3 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 6,
        activeFile: 'Main.java',
        description:
          "Another reference 'f2' is created and assigned the value of 'f1'. They now both point to the SAME object in memory.",
        memory: {
          stack: [
            { id: 'x', name: 'x', type: 'primitive', value: 5 },
            { id: 'f1', name: 'f1', type: 'reference', refId: 'obj1' },
            { id: 'f2', name: 'f2', type: 'reference', refId: 'obj1' },
          ],
          heap: [
            {
              id: 'obj1',
              className: 'Fraction',
              fields: [
                { name: 'numer', value: 2 },
                { name: 'denom', value: 3 },
              ],
            },
          ],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c1',
        name: 'Primitive Variable',
        description:
          'A variable that directly holds a value (like an int, double, or boolean) on the stack.',
        files: [{ name: 'Main.java', lines: [3] }],
      },
      {
        id: 'c2',
        name: 'Reference Variable',
        description:
          'A variable that holds a memory address pointing to an object on the heap. Before initialization, it is null.',
        files: [{ name: 'Main.java', lines: [4] }],
      },
      {
        id: 'c3',
        name: 'Anatomy of Object Creation',
        description:
          'The "new" keyword allocates memory on the heap, calls the constructor to initialize fields, and returns the reference to the variable.',
        files: [{ name: 'Main.java', lines: [5] }],
      },
      {
        id: 'c4',
        name: 'Reference Assignment',
        description:
          'Assigning one reference to another copies the memory address, so both variables point to the exact same object.',
        files: [{ name: 'Main.java', lines: [6] }],
      },
      {
        id: 'c1-1-this',
        name: 'Implicit this',
        description: 'Open for explicit `Fraction this` and `this.` on `numer` / `denom` (teaching overlay).',
        files: [{ name: 'Fraction.java', lines: [8, 9, 10] }],
        implicitThis: { file: 'Fraction.java', className: 'Fraction' },
      },
    ],
  },
  {
    id: '1-2',
    order: 8,
    chapter: '3 · Objects & classes',
    realLifeApplicationExampleNumber: 1,
    title: 'Gaming: Player Health & Shield',
    code: '',
    files: [
      {
        name: 'Main.java',
        code: `// Client
public class Main {
  public static void main(String[] args) {
    int maxHealth = 100;
    Player p1 = new Player("Jett", maxHealth);
    Player p2 = p1;
    p2.takeDamage(20);
  }
}
`,
      },
      {
        name: 'Player.java',
        code: `// For memory diagram
public class Player {
  private final String name;
  private int health;

  public Player(String name, int health) {
    this.name = name;
    this.health = health;
  }

  public void takeDamage(int amount) {
    this.health = Math.max(0, this.health - amount);
  }
}
`,
      },
    ],
    codeNav: [
      { symbol: 'Player', file: 'Player.java', line: 1 },
      { symbol: 'takeDamage', file: 'Player.java', line: 10 },
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Main vs Player.java — click Player or takeDamage in Main to jump.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'Player.java', label: 'Player.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "Primitive variable maxHealth is created on the stack.",
        memory: {
          stack: [{ id: 'maxHealth', name: 'maxHealth', type: 'primitive', value: 100 }],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 4,
        activeFile: 'Main.java',
        description: "A Player object is created on the heap. p1 points to it.",
        memory: {
          stack: [
            { id: 'maxHealth', name: 'maxHealth', type: 'primitive', value: 100 },
            { id: 'p1', name: 'p1', type: 'reference', refId: 'player1' },
          ],
          heap: [
            {
              id: 'player1',
              className: 'Player',
              fields: [
                { name: 'name', value: '"Jett"' },
                { name: 'health', value: 100 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 5,
        activeFile: 'Main.java',
        description: "p2 is assigned p1. They now point to the same Player object.",
        memory: {
          stack: [
            { id: 'maxHealth', name: 'maxHealth', type: 'primitive', value: 100 },
            { id: 'p1', name: 'p1', type: 'reference', refId: 'player1' },
            { id: 'p2', name: 'p2', type: 'reference', refId: 'player1' },
          ],
          heap: [
            {
              id: 'player1',
              className: 'Player',
              fields: [
                { name: 'name', value: '"Jett"' },
                { name: 'health', value: 100 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 6,
        activeFile: 'Main.java',
        description:
          'Call p2.takeDamage(20): the receiver and argument are copied into the method’s parameters (pass-by-value).',
        parameterPassing: {
          subtitle:
            'Instance method: Main passes p2 as the hidden this target and 20 as amount.',
          calleeSignature: 'void takeDamage(int amount)',
          mappings: [
            {
              formalType: 'Player',
              formalName: 'this',
              actual: 'p2',
              detail:
                'Same as s1.study() style: the reference in p2 is copied so the callee’s this points at the shared Player object.',
            },
            {
              formalType: 'int',
              formalName: 'amount',
              actual: '20',
              detail: 'A copy of the literal 20 is stored in the int parameter amount.',
            },
          ],
          footnote:
            'Java is pass-by-value: p2’s reference is copied into this; 20 is copied into amount.',
        },
        memory: {
          stack: [
            { id: 'maxHealth', name: 'maxHealth', type: 'primitive', value: 100 },
            { id: 'p1', name: 'p1', type: 'reference', refId: 'player1' },
            { id: 'p2', name: 'p2', type: 'reference', refId: 'player1' },
          ],
          heap: [
            {
              id: 'player1',
              className: 'Player',
              fields: [
                { name: 'name', value: '"Jett"' },
                { name: 'health', value: 100 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 10,
        activeFile: 'Player.java',
        description:
          'Inside takeDamage: parameter amount holds a copy of 20; this refers to the object p2 pointed at.',
        parameterPassing: {
          subtitle: 'Callee view: formals are locals initialized from the argument copies.',
          calleeSignature: 'void takeDamage(int amount)',
          mappings: [
            {
              formalType: 'Player',
              formalName: 'this',
              actual: 'p2',
              detail: 'Still the same heap Player as in Main; both p1 and p2 reference it.',
            },
            {
              formalType: 'int',
              formalName: 'amount',
              actual: '20',
              detail: 'Changing amount would not change the literal in Main; it is its own local.',
            },
          ],
          footnote: 'Stack diagram shows amount on the callee side; Main’s locals are omitted for clarity.',
        },
        memory: {
          stack: [{ id: 'amount', name: 'amount', type: 'primitive', value: 20 }],
          heap: [
            {
              id: 'player1',
              className: 'Player',
              fields: [
                { name: 'name', value: '"Jett"' },
                { name: 'health', value: 100 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's6',
        codeLine: 11,
        activeFile: 'Player.java',
        description:
          'After this line runs, health on the shared object is 80 — visible through both p1 and p2 in Main.',
        parameterPassing: {
          subtitle: 'Same bindings while executing the method body.',
          calleeSignature: 'void takeDamage(int amount)',
          mappings: [
            {
              formalType: 'Player',
              formalName: 'this',
              actual: 'p2',
              detail: 'Mutating this.health updates the one heap object p1 and p2 share.',
            },
            {
              formalType: 'int',
              formalName: 'amount',
              actual: '20',
              detail: 'Still 20 for this execution of takeDamage.',
            },
          ],
          footnote: 'When the method returns, amount disappears; the object keeps the new health.',
        },
        memory: {
          stack: [{ id: 'amount', name: 'amount', type: 'primitive', value: 20 }],
          heap: [
            {
              id: 'player1',
              className: 'Player',
              fields: [
                { name: 'name', value: '"Jett"' },
                { name: 'health', value: 80 },
              ],
            },
          ],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c1-2-1',
        name: 'Primitive Variable',
        description: 'A variable that directly stores a value (like an int) on the stack.',
        files: [{ name: 'Main.java', lines: [3] }],
      },
      {
        id: 'c1-2-2',
        name: 'Object Creation',
        description: 'The "new" keyword allocates an object on the heap and returns a reference.',
        files: [{ name: 'Main.java', lines: [4] }],
      },
      {
        id: 'c1-2-3',
        name: 'Reference Assignment (Aliasing)',
        description: 'Assigning one reference to another makes both variables point to the same object.',
        files: [{ name: 'Main.java', lines: [5] }],
      },
      {
        id: 'c1-2-4',
        name: 'Mutator Method Call',
        description: 'A method call that changes an object’s internal state.',
        files: [
          { name: 'Main.java', lines: [6] },
          { name: 'Player.java', lines: [10, 11] },
        ],
      },
      {
        id: 'c1-2-5',
        name: 'Implicit this',
        description: 'Open for explicit `Player this` and `this.` on the constructor and `takeDamage` (teaching overlay).',
        files: [{ name: 'Player.java', lines: [5, 6, 7, 10, 11, 12] }],
        implicitThis: { file: 'Player.java', className: 'Player' },
      },
    ],
    quiz: {
      id: 'q1-2',
      question: "After p2.takeDamage(20) executes, what is the health of the player referenced by p1?",
      options: [
        "100",
        "80",
        "0",
        "It throws an error"
      ],
      correctAnswer: 1,
      explanation: "Since p1 and p2 reference the exact same object in memory, modifying the object through p2 also affects what p1 sees. The health is 80.",
      points: 100
    },
  },
  {
    id: '1-3',
    order: 9,
    chapter: '3 · Objects & classes',
    realLifeApplicationExampleNumber: 2,
    title: 'Music: Playlist & Tracks',
    code: '',
    files: [
      {
        name: 'Main.java',
        code: `// Client
public class Main {
  public static void main(String[] args) {
    Song track1 = new Song("Blinding Lights", "The Weeknd");
    Song track2 = new Song("Starboy", "The Weeknd");
    String banner = track1.label();
    Song currentlyPlaying = track1;
    currentlyPlaying = track2;
  }
}
`,
      },
      {
        name: 'Song.java',
        code: `public class Song {
  public final String title;
  public final String artist;

  public Song(String title, String artist) {
    this.title = title;
    this.artist = artist;
  }

  /** Display line for UIs / sharing — does not change the song’s fields. */
  public String label() {
    return title + " — " + artist;
  }
}
`,
      },
    ],
    codeNav: [
      { symbol: 'Song', file: 'Song.java', line: 0 },
      { symbol: 'label', file: 'Song.java', line: 10 },
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description:
          'Instance method for display vs reference reassignment: `label()` builds text from the object’s fields; `currentlyPlaying` is just another variable pointing at a song.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'Song.java', label: 'Song.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "track1 points to a new Song object on the heap.",
        memory: {
          stack: [{ id: 'track1', name: 'track1', type: 'reference', refId: 'song1' }],
          heap: [
            {
              id: 'song1',
              className: 'Song',
              fields: [
                { name: 'title', value: '"Blinding Lights"' },
                { name: 'artist', value: '"The Weeknd"' },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 4,
        activeFile: 'Main.java',
        description: "track2 points to a second Song object on the heap.",
        memory: {
          stack: [
            { id: 'track1', name: 'track1', type: 'reference', refId: 'song1' },
            { id: 'track2', name: 'track2', type: 'reference', refId: 'song2' }
          ],
          heap: [
            { id: 'song1', className: 'Song', fields: [{ name: 'title', value: '"Blinding Lights"' }, { name: 'artist', value: '"The Weeknd"' }] },
            { id: 'song2', className: 'Song', fields: [{ name: 'title', value: '"Starboy"' }, { name: 'artist', value: '"The Weeknd"' }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 5,
        activeFile: 'Main.java',
        description:
          "`track1.label()` runs on the song object: `this` is that object. The returned `String` is stored in `banner` (a new reference). The Song on the heap is unchanged.",
        memory: {
          stack: [
            { id: 'track1', name: 'track1', type: 'reference', refId: 'song1' },
            { id: 'track2', name: 'track2', type: 'reference', refId: 'song2' },
            { id: 'banner', name: 'banner', type: 'reference', refId: 'strBanner' },
          ],
          heap: [
            {
              id: 'song1',
              className: 'Song',
              fields: [
                { name: 'title', value: '"Blinding Lights"' },
                { name: 'artist', value: '"The Weeknd"' },
              ],
            },
            {
              id: 'song2',
              className: 'Song',
              fields: [
                { name: 'title', value: '"Starboy"' },
                { name: 'artist', value: '"The Weeknd"' },
              ],
            },
            {
              id: 'strBanner',
              className: 'String',
              fields: [{ name: 'value', value: '"Blinding Lights — The Weeknd"' }],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 6,
        activeFile: 'Main.java',
        description: "currentlyPlaying is assigned track1. It now points to the first song.",
        memory: {
          stack: [
            { id: 'track1', name: 'track1', type: 'reference', refId: 'song1' },
            { id: 'track2', name: 'track2', type: 'reference', refId: 'song2' },
            { id: 'banner', name: 'banner', type: 'reference', refId: 'strBanner' },
            { id: 'currentlyPlaying', name: 'currentlyPlaying', type: 'reference', refId: 'song1' },
          ],
          heap: [
            { id: 'song1', className: 'Song', fields: [{ name: 'title', value: '"Blinding Lights"' }, { name: 'artist', value: '"The Weeknd"' }] },
            { id: 'song2', className: 'Song', fields: [{ name: 'title', value: '"Starboy"' }, { name: 'artist', value: '"The Weeknd"' }] },
            {
              id: 'strBanner',
              className: 'String',
              fields: [{ name: 'value', value: '"Blinding Lights — The Weeknd"' }],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 7,
        activeFile: 'Main.java',
        description:
          'currentlyPlaying → track2; track1 and banner still reference the first song and its label text — only the playlist pointer moved.',
        memory: {
          stack: [
            { id: 'track1', name: 'track1', type: 'reference', refId: 'song1' },
            { id: 'track2', name: 'track2', type: 'reference', refId: 'song2' },
            { id: 'banner', name: 'banner', type: 'reference', refId: 'strBanner' },
            { id: 'currentlyPlaying', name: 'currentlyPlaying', type: 'reference', refId: 'song2' },
          ],
          heap: [
            { id: 'song1', className: 'Song', fields: [{ name: 'title', value: '"Blinding Lights"' }, { name: 'artist', value: '"The Weeknd"' }] },
            { id: 'song2', className: 'Song', fields: [{ name: 'title', value: '"Starboy"' }, { name: 'artist', value: '"The Weeknd"' }] },
            {
              id: 'strBanner',
              className: 'String',
              fields: [{ name: 'value', value: '"Blinding Lights — The Weeknd"' }],
            },
          ],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c1-3-this',
        name: 'Implicit this',
        description: 'Open for explicit `Song this` and `this.` in the constructor and `label()` (teaching overlay).',
        files: [{ name: 'Song.java', lines: [4, 5, 6, 10, 11] }],
        implicitThis: { file: 'Song.java', className: 'Song' },
      },
    ],
    quiz: {
      id: 'q1-3',
      question: "When 'currentlyPlaying' is reassigned to 'track2', what happens to the 'Blinding Lights' object?",
      options: [
        "It is immediately deleted from memory.",
        "Its title changes to 'Starboy'.",
        "It remains in memory because 'track1' still references it.",
        "It becomes null."
      ],
      correctAnswer: 2,
      explanation: "Objects in Java are only deleted (garbage collected) when NO references point to them. Since 'track1' still points to 'Blinding Lights', it stays in memory.",
      points: 100
    },
  },
  {
    id: '1-4',
    order: 10,
    chapter: '3 · Objects & classes',
    realLifeApplicationExampleNumber: 3,
    title: 'Social: Null References',
    code: '',
    files: [
      {
        name: 'Main.java',
        code: `// Client
public class Main {
  public static void main(String[] args) {
    SocialPost post1 = new SocialPost("Just had a great lunch!");
    SocialPost post2 = null;
    post2 = post1;
    post2.addLike();
    post1 = null;
  }
}
`,
      },
      {
        name: 'SocialPost.java',
        code: `public class SocialPost {
  private final String content;
  private int likes;

  public SocialPost(String content) {
    this.content = content;
    this.likes = 0;
  }

  /** Alters state on whichever reference you use to call it. */
  public void addLike() {
    likes++;
  }
}
`,
      },
    ],
    codeNav: [
      { symbol: 'SocialPost', file: 'SocialPost.java', line: 0 },
      { symbol: 'addLike', file: 'SocialPost.java', line: 10 },
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description:
          'null vs aliases vs mutators: `post2` can be null, then alias `post1`, then call `addLike()` on that alias — the shared object on the heap updates.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'SocialPost.java', label: 'SocialPost.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "post1 points to a new SocialPost object.",
        memory: {
          stack: [{ id: 'post1', name: 'post1', type: 'reference', refId: 'postObj1' }],
          heap: [{ id: 'postObj1', className: 'SocialPost', fields: [{ name: 'content', value: '"Just had a great lunch!"' }, { name: 'likes', value: 0 }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 4,
        activeFile: 'Main.java',
        description: "post2 is explicitly set to null. It points nowhere.",
        memory: {
          stack: [
            { id: 'post1', name: 'post1', type: 'reference', refId: 'postObj1' },
            { id: 'post2', name: 'post2', type: 'reference', refId: null },
          ],
          heap: [
            {
              id: 'postObj1',
              className: 'SocialPost',
              fields: [
                { name: 'content', value: '"Just had a great lunch!"' },
                { name: 'likes', value: 0 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 5,
        activeFile: 'Main.java',
        description: "post2 is assigned post1. Now both point to the post object.",
        memory: {
          stack: [
            { id: 'post1', name: 'post1', type: 'reference', refId: 'postObj1' },
            { id: 'post2', name: 'post2', type: 'reference', refId: 'postObj1' }
          ],
          heap: [{ id: 'postObj1', className: 'SocialPost', fields: [{ name: 'content', value: '"Just had a great lunch!"' }, { name: 'likes', value: 0 }] }],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 6,
        activeFile: 'Main.java',
        description:
          "`post2.addLike()` — same object as `post1` pointed to: `likes` becomes 1. If you only cleared `post2` you'd still see the effect through any other reference.",
        memory: {
          stack: [
            { id: 'post1', name: 'post1', type: 'reference', refId: 'postObj1' },
            { id: 'post2', name: 'post2', type: 'reference', refId: 'postObj1' },
          ],
          heap: [
            {
              id: 'postObj1',
              className: 'SocialPost',
              fields: [
                { name: 'content', value: '"Just had a great lunch!"' },
                { name: 'likes', value: 1 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 7,
        activeFile: 'Main.java',
        description:
          'post1 = null; the object still has `likes == 1` and post2 still points to it — only the post1 variable is empty.',
        memory: {
          stack: [
            { id: 'post1', name: 'post1', type: 'reference', refId: null },
            { id: 'post2', name: 'post2', type: 'reference', refId: 'postObj1' },
          ],
          heap: [
            {
              id: 'postObj1',
              className: 'SocialPost',
              fields: [
                { name: 'content', value: '"Just had a great lunch!"' },
                { name: 'likes', value: 1 },
              ],
            },
          ],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c1-4-this',
        name: 'Implicit this',
        description: 'Open for explicit `SocialPost this` and `this.` in the constructor and `addLike()` (teaching overlay).',
        files: [{ name: 'SocialPost.java', lines: [4, 5, 6, 10, 11] }],
        implicitThis: { file: 'SocialPost.java', className: 'SocialPost' },
      },
    ],
    quiz: {
      id: 'q1-4',
      question: "If we added a line 'post2 = null;' at the end, what would happen to the SocialPost object?",
      options: [
        "It would stay in memory forever.",
        "It would become eligible for Garbage Collection because no references point to it.",
        "It would throw a NullPointerException.",
        "It would automatically recreate a reference to itself."
      ],
      correctAnswer: 1,
      explanation: "When an object has zero references pointing to it, Java's Garbage Collector automatically removes it from the heap to free up memory.",
      points: 150
    },
  },
  {
    id: '1-5',
    order: 11,
    chapter: '3 · Objects & classes',
    realLifeApplicationExampleNumber: 4,
    title: 'E-commerce: Garbage Collection',
    code: '',
    files: [
      {
        name: 'Main.java',
        code: `// Client
public class Main {
  public static void main(String[] args) {
    Sneaker pair1 = new Sneaker("Nike Air Max", 120);
    Sneaker pair2 = new Sneaker("Adidas Ultraboost", 180);
    int tag = pair1.getPrice();
    boolean luxe = pair2.isLuxury();
    pair1 = pair2;
  }
}
`,
      },
      {
        name: 'Sneaker.java',
        code: `public class Sneaker {
  public final String brand;
  public final int price;

  public Sneaker(String brand, int price) {
    this.brand = brand;
    this.price = price;
  }

  public int getPrice() {
    return price;
  }

  public boolean isLuxury() {
    return price >= 150;
  }
}
`,
      },
    ],
    codeNav: [
      { symbol: 'Sneaker', file: 'Sneaker.java', line: 0 },
      { symbol: 'getPrice', file: 'Sneaker.java', line: 9 },
      { symbol: 'isLuxury', file: 'Sneaker.java', line: 13 },
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description:
          'Queries before reassignment: `getPrice()` reads an `int`; `isLuxury()` returns a `boolean` from the same object’s state. Then `pair1` is reassigned and the Nike shoe can be collected.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'Sneaker.java', label: 'Sneaker.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "pair1 points to a Nike sneaker object.",
        memory: {
          stack: [{ id: 'pair1', name: 'pair1', type: 'reference', refId: 'shoe1' }],
          heap: [{ id: 'shoe1', className: 'Sneaker', fields: [{ name: 'brand', value: '"Nike Air Max"' }, { name: 'price', value: 120 }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 4,
        activeFile: 'Main.java',
        description: "pair2 points to an Adidas sneaker object.",
        memory: {
          stack: [
            { id: 'pair1', name: 'pair1', type: 'reference', refId: 'shoe1' },
            { id: 'pair2', name: 'pair2', type: 'reference', refId: 'shoe2' },
          ],
          heap: [
            {
              id: 'shoe1',
              className: 'Sneaker',
              fields: [
                { name: 'brand', value: '"Nike Air Max"' },
                { name: 'price', value: 120 },
              ],
            },
            {
              id: 'shoe2',
              className: 'Sneaker',
              fields: [
                { name: 'brand', value: '"Adidas Ultraboost"' },
                { name: 'price', value: 180 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 5,
        activeFile: 'Main.java',
        description:
          "`tag` stores the primitive returned from `pair1.getPrice()` (120). Primitives are copied by value — later changes to references don't rewrite `tag`.",
        memory: {
          stack: [
            { id: 'pair1', name: 'pair1', type: 'reference', refId: 'shoe1' },
            { id: 'pair2', name: 'pair2', type: 'reference', refId: 'shoe2' },
            { id: 'tag', name: 'tag', type: 'primitive', value: 120 },
          ],
          heap: [
            {
              id: 'shoe1',
              className: 'Sneaker',
              fields: [
                { name: 'brand', value: '"Nike Air Max"' },
                { name: 'price', value: 120 },
              ],
            },
            {
              id: 'shoe2',
              className: 'Sneaker',
              fields: [
                { name: 'brand', value: '"Adidas Ultraboost"' },
                { name: 'price', value: 180 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 6,
        activeFile: 'Main.java',
        description:
          '`pair2.isLuxury()` is true because 180 ≥ 150. The `boolean` `luxe` is another independent copy on the stack.',
        memory: {
          stack: [
            { id: 'pair1', name: 'pair1', type: 'reference', refId: 'shoe1' },
            { id: 'pair2', name: 'pair2', type: 'reference', refId: 'shoe2' },
            { id: 'tag', name: 'tag', type: 'primitive', value: 120 },
            { id: 'luxe', name: 'luxe', type: 'primitive', value: true },
          ],
          heap: [
            {
              id: 'shoe1',
              className: 'Sneaker',
              fields: [
                { name: 'brand', value: '"Nike Air Max"' },
                { name: 'price', value: 120 },
              ],
            },
            {
              id: 'shoe2',
              className: 'Sneaker',
              fields: [
                { name: 'brand', value: '"Adidas Ultraboost"' },
                { name: 'price', value: 180 },
              ],
            },
          ],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 7,
        activeFile: 'Main.java',
        description:
          "pair1 is reassigned to pair2's object. The Nike object now has NO references pointing to it! It is 'garbage' and will be cleaned up by Java. `tag` and `luxe` are unchanged.",
        memory: {
          stack: [
            { id: 'pair1', name: 'pair1', type: 'reference', refId: 'shoe2' },
            { id: 'pair2', name: 'pair2', type: 'reference', refId: 'shoe2' },
            { id: 'tag', name: 'tag', type: 'primitive', value: 120 },
            { id: 'luxe', name: 'luxe', type: 'primitive', value: true },
          ],
          heap: [
            { id: 'shoe1', className: 'Sneaker (Garbage)', fields: [{ name: 'brand', value: '"Nike Air Max"' }, { name: 'price', value: 120 }] },
            { id: 'shoe2', className: 'Sneaker', fields: [{ name: 'brand', value: '"Adidas Ultraboost"' }, { name: 'price', value: 180 }] },
          ],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c1-5-this',
        name: 'Implicit this',
        description:
          'Open for explicit `Sneaker this` and `this.` in the constructor, `getPrice()`, and `isLuxury()` (teaching overlay).',
        files: [{ name: 'Sneaker.java', lines: [4, 5, 6, 9, 10, 13, 14] }],
        implicitThis: { file: 'Sneaker.java', className: 'Sneaker' },
      },
    ],
    quiz: {
      id: 'q1-5',
      question: "Why did the 'Nike Air Max' object become garbage?",
      options: [
        "Because it was cheaper than the Adidas.",
        "Because 'pair1' was reassigned, leaving zero references pointing to the Nike object.",
        "Because 'pair2' was created after it.",
        "Because we didn't use the 'delete' keyword."
      ],
      correctAnswer: 1,
      explanation: "An object becomes eligible for garbage collection the moment the last reference pointing to it is removed or reassigned.",
      points: 150
    }
  },
  {
    id: '4-1',
    order: 12,
    chapter: '3 · Objects & classes',
    title: 'Class Anatomy',
        code: `public class Fraction {
  // static variable
  private static int count = 0;

  // instance variables
  private int numer;
  private int denom;

  // constructor
  public Fraction(int n, int d) {
    numer = n;
    denom = d;
    count++;
  }

  // instance method
  public int getNumer() {
    return numer;
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Class anatomy: static vs instance, constructor, methods.',
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's1',
        codeLine: 2,
        description: 'Static field: one copy for the whole class.',
        highlights: [{ line: 2, colorClass: 'bg-purple-500/30', label: 'Static Variable' }],
        memory: { stack: [], heap: [], staticArea: [{ id: 'count', className: 'Fraction', name: 'count', value: 0 }] }
      },
      {
        id: 's2',
        codeLine: 5,
        description: 'Instance fields: each object has its own copy.',
        highlights: [
          { line: 5, colorClass: 'bg-blue-500/30', label: 'Instance Variable' },
          { line: 6, colorClass: 'bg-blue-500/30' }
        ],
        memory: { stack: [], heap: [], staticArea: [{ id: 'count', className: 'Fraction', name: 'count', value: 0 }] }
      },
      {
        id: 's3',
        codeLine: 9,
        description: 'Constructor: runs on new; initializes the new object.',
        highlights: [
          { line: 9, colorClass: 'bg-green-500/30', label: 'Constructor' },
          { line: 10, colorClass: 'bg-green-500/30' },
          { line: 11, colorClass: 'bg-green-500/30' },
          { line: 12, colorClass: 'bg-green-500/30' },
          { line: 13, colorClass: 'bg-green-500/30' }
        ],
        memory: { stack: [], heap: [], staticArea: [{ id: 'count', className: 'Fraction', name: 'count', value: 0 }] }
      },
      {
        id: 's4',
        codeLine: 16,
        description: 'Instance methods use implicit this — the object they run on.',
        highlights: [
          { line: 16, colorClass: 'bg-orange-500/30', label: 'Instance Method' },
          { line: 17, colorClass: 'bg-orange-500/30' },
          { line: 18, colorClass: 'bg-orange-500/30' }
        ],
        memory: { stack: [], heap: [], staticArea: [{ id: 'count', className: 'Fraction', name: 'count', value: 0 }] }
      }
    ],
    concepts: [
      {
        id: 'c1',
        name: 'Static Variable',
        description: 'A variable shared across all instances of the class. It belongs to the class itself.',
        lines: [2]
      },
      {
        id: 'c2',
        name: 'Instance Variables',
        description: 'Variables that hold the state of an individual object. Each object has its own copy.',
        lines: [5, 6]
      },
      {
        id: 'c3',
        name: 'Constructor',
        description: 'A special method called when an object is created using "new". It initializes the object.',
        lines: [9, 10, 11, 12, 13]
      },
      {
        id: 'c4',
        name: 'Implicit "this"',
        description: 'The "this" keyword refers to the current object the method or constructor is acting upon.',
        lines: [10, 11, 17],
        implicitThis: { file: 'Main.java', className: 'Fraction' },
      },
      {
        id: 'c5',
        name: 'Accessor Method',
        description: 'A method (often called a "getter") that returns the value of an instance variable.',
        lines: [16, 17, 18]
      }
    ],
    quiz: {
      id: 'q4-1',
      question: "Which type of variable is shared across ALL instances of a class?",
      options: [
        "Instance variables",
        "Local variables",
        "Static variables",
        "Parameters"
      ],
      correctAnswer: 2,
      explanation: "Static variables are associated with the class itself, meaning there is only one copy of the variable in memory, shared by all objects of that class.",
      points: 200
    }
  },
  {
    id: '4-2',
    order: 13,
    chapter: '3 · Objects & classes',
    title: 'Class vs Client (Student)',
    code: '',
    files: [
      {
        name: 'Student.java',
        code: `public class Student {
  private String name;
  private int grade;

  public Student(String studentName, int initialGrade) {
    name = studentName;
    grade = initialGrade;
  }

  public void study() {
    grade += 5;
  }
}`
      },
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    Student s1 = new Student("Alice", 85);
    s1.study();
  }
}`
      }
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Student.java = blueprint; Main = client. Use tabs.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'Student.java', label: 'Student.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        activeFile: 'Main.java',
        description: 'new Student("Alice", 85) invokes the constructor.',
        memory: { stack: [], heap: [], staticArea: [] },
        parameterPassing: {
          subtitle: 'Call site: two argument values head into the constructor (stack next step).',
          calleeSignature: 'Student(String studentName, int initialGrade)',
          mappings: [
            {
              formalType: 'String',
              formalName: 'studentName',
              actual: '"Alice"',
              detail: 'String argument = reference value; that reference is copied into studentName (pass-by-value).',
            },
            {
              formalType: 'int',
              formalName: 'initialGrade',
              actual: '85',
              detail: 'Primitive: a copy of 85 is stored in initialGrade.',
            },
          ],
          footnote: 'Java is pass-by-value: primitives copy data; objects copy the reference, not the object.',
        },
      },
      {
        id: 's2',
        codeLine: 4,
        activeFile: 'Student.java',
        description:
          'Constructor runs: parameters studentName and initialGrade sit on the stack (different names from the fields so the assignments stay unambiguous in source).',
        parameterPassing: {
          subtitle: 'Formals are locals initialized with copies of the arguments.',
          calleeSignature: 'Student(String studentName, int initialGrade)',
          mappings: [
            {
              formalType: 'String',
              formalName: 'studentName',
              actual: '"Alice"',
              detail: 'studentName holds a copy of the String reference; same String object as at the call unless reassigned.',
            },
            {
              formalType: 'int',
              formalName: 'initialGrade',
              actual: '85',
              detail: 'initialGrade holds a copy of 85; changing it does not change anything in Main.',
            },
          ],
          footnote: 'Callee gets new parameter variables with copied values—not aliases of caller locals.',
        },
        memory: {
          stack: [
            { id: 'sn', name: 'studentName', type: 'reference', refId: 'str1' },
            { id: 'ig', name: 'initialGrade', type: 'primitive', value: 85 },
          ],
          heap: [
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"Alice"' }] },
            { id: 'obj1', className: 'Student', fields: [{ name: 'name', value: 'null' }, { name: 'grade', value: 0 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 5,
        activeFile: 'Student.java',
        description:
          'name = studentName and grade = initialGrade copy into the new object. Unqualified field names mean the instance fields here; use the Implicit this concept to see the explicit receiver and this. form.',
        parameterPassing: {
          subtitle: 'Fields load from the same parameter copies.',
          calleeSignature: 'Student(String studentName, int initialGrade)',
          mappings: [
            {
              formalType: 'String',
              formalName: 'studentName',
              actual: '"Alice"',
              detail: 'Field name receives the reference from parameter studentName (same String object).',
            },
            {
              formalType: 'int',
              formalName: 'initialGrade',
              actual: '85',
              detail: 'Field grade receives the int copy from parameter initialGrade.',
            },
          ],
          footnote: 'Parameters stay pass-by-value locals; assignments copy their values into the object’s fields.',
        },
        memory: {
          stack: [
            { id: 'sn', name: 'studentName', type: 'reference', refId: 'str1' },
            { id: 'ig', name: 'initialGrade', type: 'primitive', value: 85 },
          ],
          heap: [
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"Alice"' }] },
            { id: 'obj1', className: 'Student', fields: [{ name: 'name', value: '"Alice"' }, { name: 'grade', value: 85 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 2,
        activeFile: 'Main.java',
        description: 'Back in Main: s1 references the new Student.',
        memory: {
          stack: [
            { id: 's1', name: 's1', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"Alice"' }] },
            { id: 'obj1', className: 'Student', fields: [{ name: 'name', value: '"Alice"' }, { name: 'grade', value: 85 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's5',
        codeLine: 3,
        activeFile: 'Main.java',
        description: 's1.study() from Main.',
        parameterPassing: {
          subtitle:
            'Instance method call: the receiver (left of the dot) is passed as the hidden first argument, this.',
          calleeSignature: 'void study(Student this)',
          mappings: [
            {
              formalType: 'Student',
              formalName: 'this',
              actual: 's1',
              detail:
                'The reference stored in s1 is copied into the implicit parameter this (pass-by-value, like any argument).',
            },
          ],
          footnote:
            'You write s1.study(); the compiler supplies the extra argument so inside study, this refers to that object.',
        },
        memory: {
          stack: [
            { id: 's1', name: 's1', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"Alice"' }] },
            { id: 'obj1', className: 'Student', fields: [{ name: 'name', value: '"Alice"' }, { name: 'grade', value: 85 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's6',
        codeLine: 9,
        activeFile: 'Student.java',
        description: 'Inside study(): the instance field grade changes.',
        parameterPassing: {
          subtitle: 'Inside the callee, this is the formal that received the receiver from the call site.',
          calleeSignature: 'void study(Student this)',
          mappings: [
            {
              formalType: 'Student',
              formalName: 'this',
              actual: 's1',
              detail: 'Same object as at the call: Main passed s1, so here this refers to that Student instance.',
            },
          ],
          footnote: 'No explicit parameters besides this; grade is an instance field, not a parameter.',
        },
        memory: {
          stack: [
            { id: 's1', name: 's1', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"Alice"' }] },
            { id: 'obj1', className: 'Student', fields: [{ name: 'name', value: '"Alice"' }, { name: 'grade', value: 90 }] }
          ],
          staticArea: []
        }
      }
    ],
    concepts: [
      {
        id: 'c1',
        name: 'Non-Default Constructor',
        description: 'A constructor that takes parameters to initialize the object with specific values.',
        files: [{ name: 'Student.java', lines: [4, 5, 6, 7] }]
      },
      {
        id: 'c2',
        name: 'Object Creation (Client)',
        description: 'The client code uses the "new" keyword and calls the constructor to create an object.',
        files: [{ name: 'Main.java', lines: [2] }]
      },
      {
        id: 'c3',
        name: 'Method Call (Client)',
        description: 'The client code calls a method on the object using the dot operator.',
        files: [{ name: 'Main.java', lines: [3] }]
      },
      {
        id: 'c4',
        name: 'Implicit this',
        description: 'Open for explicit `Student this` and `this.` on fields (teaching overlay).',
        files: [{ name: 'Student.java', lines: [4, 5, 6, 9, 10] }],
        implicitThis: { file: 'Student.java', className: 'Student' },
      },
    ],
    quiz: {
      id: 'q4-2',
      question: "What is the primary difference between a Class and a Client in Java?",
      options: [
        "A Class contains the main method, while a Client defines the object's blueprint.",
        "A Class defines the blueprint (fields and methods), while a Client uses the blueprint to create and interact with objects.",
        "A Class can only have static methods, while a Client has instance methods.",
        "There is no difference; they are the same thing."
      ],
      correctAnswer: 1,
      explanation: "A Class acts as a blueprint defining the structure and behavior of objects. A Client is the code (like a main method or another class) that instantiates those objects and calls their methods.",
      points: 200
    },
  },
  {
    id: '5-1',
    order: 15,
    chapter: '3 · Objects & classes',
    title: 'Methods and Scope',
    code: '',
    files: [
      {
        name: 'Calculator.java',
        code: `public class Calculator {
  private int total;

  public Calculator() {
    this.total = 0;
  }

  public void add(int amount) {
    int temp = this.total + amount;
    this.total = temp;
  }

  public int getTotal() {
    return this.total;
  }
}`
      },
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    Calculator calc = new Calculator();
    calc.add(10);
    int result = calc.getTotal();
  }
}`
      }
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Main vs Calculator.java — locals vs instance fields.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'Calculator.java', label: 'Calculator.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        activeFile: 'Main.java',
        description: "We create a new Calculator object. The constructor initializes 'total' to 0.",
        memory: {
          stack: [
            { id: 'calc', name: 'calc', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'obj1', className: 'Calculator', fields: [{ name: 'total', value: 0 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "We call the 'add' method, passing the argument 10.",
        memory: {
          stack: [
            { id: 'calc', name: 'calc', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'obj1', className: 'Calculator', fields: [{ name: 'total', value: 0 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 7,
        activeFile: 'Calculator.java',
        description: "Inside 'add', the parameter 'amount' is a local variable with the value 10.",
        memory: {
          stack: [
            { id: 'calc', name: 'calc', type: 'reference', refId: 'obj1' },
            { id: 'amount', name: 'amount', type: 'primitive', value: 10 }
          ],
          heap: [
            { id: 'obj1', className: 'Calculator', fields: [{ name: 'total', value: 0 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 8,
        activeFile: 'Calculator.java',
        description: "We declare another local variable 'temp'. It only exists within this method.",
        memory: {
          stack: [
            { id: 'calc', name: 'calc', type: 'reference', refId: 'obj1' },
            { id: 'amount', name: 'amount', type: 'primitive', value: 10 },
            { id: 'temp', name: 'temp', type: 'primitive', value: 10 }
          ],
          heap: [
            { id: 'obj1', className: 'Calculator', fields: [{ name: 'total', value: 0 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's5',
        codeLine: 9,
        activeFile: 'Calculator.java',
        description: "We update the instance variable 'total' using 'this.total'.",
        memory: {
          stack: [
            { id: 'calc', name: 'calc', type: 'reference', refId: 'obj1' },
            { id: 'amount', name: 'amount', type: 'primitive', value: 10 },
            { id: 'temp', name: 'temp', type: 'primitive', value: 10 }
          ],
          heap: [
            { id: 'obj1', className: 'Calculator', fields: [{ name: 'total', value: 10 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's6',
        codeLine: 10,
        activeFile: 'Calculator.java',
        description: "As the 'add' method finishes, its local variables ('amount' and 'temp') are removed from the stack.",
        memory: {
          stack: [
            { id: 'calc', name: 'calc', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'obj1', className: 'Calculator', fields: [{ name: 'total', value: 10 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's7',
        codeLine: 4,
        activeFile: 'Main.java',
        description: "Back in Main, we call 'getTotal()' and store the returned value in a new local variable 'result'.",
        memory: {
          stack: [
            { id: 'calc', name: 'calc', type: 'reference', refId: 'obj1' },
            { id: 'result', name: 'result', type: 'primitive', value: 10 }
          ],
          heap: [
            { id: 'obj1', className: 'Calculator', fields: [{ name: 'total', value: 10 }] }
          ],
          staticArea: []
        }
      }
    ],
    concepts: [
      {
        id: 'c1',
        name: 'Default Constructor',
        description: 'A constructor with no parameters. If you don\'t write any constructor, Java provides an empty one by default. Here we wrote our own.',
        files: [{ name: 'Calculator.java', lines: [3, 4, 5] }]
      },
      {
        id: 'c2',
        name: 'Mutator Method',
        description: 'A method (often called a "setter") that modifies the internal state of an object.',
        files: [{ name: 'Calculator.java', lines: [7, 8, 9, 10] }]
      },
      {
        id: 'c3',
        name: 'Accessor Method',
        description: 'A method (often called a "getter") that returns information about the object\'s state without changing it.',
        files: [{ name: 'Calculator.java', lines: [12, 13, 14] }]
      },
      {
        id: 'c4',
        name: 'Local Variable',
        description: 'Variables declared inside a method. They only exist while the method is running.',
        files: [{ name: 'Calculator.java', lines: [7, 8] }]
      },
      {
        id: 'c5',
        name: 'Object Creation',
        description: 'The "new" keyword allocates memory on the heap, calls the constructor, and returns a reference to the new object.',
        files: [{ name: 'Main.java', lines: [2] }]
      },
      {
        id: 'c6',
        name: 'Implicit this',
        description: 'Open for explicit `Calculator this` and `this.` on `total` (teaching overlay).',
        files: [{ name: 'Calculator.java', lines: [3, 7, 12] }],
        implicitThis: { file: 'Calculator.java', className: 'Calculator' },
      },
    ],
    quiz: {
      id: 'q5-1',
      question: "What happens to local variables when a method finishes executing?",
      options: [
        "They are saved in the heap for later use.",
        "They are removed from the stack and destroyed.",
        "They become instance variables.",
        "They are accessible by other methods in the same class."
      ],
      correctAnswer: 1,
      explanation: "Local variables (including parameters) are created on the stack when a method is called and are destroyed when the method completes execution.",
      points: 200
    }
  },
  {
    id: '5-2',
    order: 16,
    chapter: '3 · Objects & classes',
    title: 'Static vs Instance Methods',
    code: '',
    files: [
      {
        name: 'MathUtils.java',
        code: `public class MathUtils {
  private int value;

  public MathUtils(int v) {
    value = v;
  }

  // Instance method: requires an object
  public int multiply(int factor) {
    return value * factor;
  }

  // Static method: belongs to the class
  public static int square(int num) {
    return num * num;
  }
}`
      },
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    // Calling a static method (Class.method)
    int sq = MathUtils.square(5);

    // Calling an instance method (object.method)
    MathUtils utils = new MathUtils(10);
    int result = utils.multiply(2);
  }
}`
      }
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Static vs instance calls — Main + MathUtils.java.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'MathUtils.java', label: 'MathUtils.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "We call the static method 'square' using the class name 'MathUtils'. No object is needed.",
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's2',
        codeLine: 13,
        activeFile: 'MathUtils.java',
        description: "Inside the static method, there is no 'this' reference because it's not called on an object.",
        memory: {
          stack: [
            { id: 'num', name: 'num', type: 'primitive', value: 5 }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 14,
        activeFile: 'MathUtils.java',
        description: "The static method returns the calculated value (25).",
        memory: {
          stack: [
            { id: 'num', name: 'num', type: 'primitive', value: 5 }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "The returned value is stored in the local variable 'sq'.",
        memory: {
          stack: [
            { id: 'sq', name: 'sq', type: 'primitive', value: 25 }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's5',
        codeLine: 6,
        activeFile: 'Main.java',
        description: "Now we create an object of MathUtils to call an instance method.",
        memory: {
          stack: [
            { id: 'sq', name: 'sq', type: 'primitive', value: 25 },
            { id: 'utils', name: 'utils', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'obj1', className: 'MathUtils', fields: [{ name: 'value', value: 10 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's6',
        codeLine: 7,
        activeFile: 'Main.java',
        description: "We call the instance method 'multiply' on the 'utils' object.",
        memory: {
          stack: [
            { id: 'sq', name: 'sq', type: 'primitive', value: 25 },
            { id: 'utils', name: 'utils', type: 'reference', refId: 'obj1' }
          ],
          heap: [
            { id: 'obj1', className: 'MathUtils', fields: [{ name: 'value', value: 10 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's7',
        codeLine: 8,
        activeFile: 'MathUtils.java',
        description: "Inside the instance method, 'this' refers to the object 'utils' points to.",
        memory: {
          stack: [
            { id: 'sq', name: 'sq', type: 'primitive', value: 25 },
            { id: 'utils', name: 'utils', type: 'reference', refId: 'obj1' },
            { id: 'factor', name: 'factor', type: 'primitive', value: 2 }
          ],
          heap: [
            { id: 'obj1', className: 'MathUtils', fields: [{ name: 'value', value: 10 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's8',
        codeLine: 9,
        activeFile: 'MathUtils.java',
        description: "The method reads the instance field value (10) and multiplies it by 'factor' (2). In the teaching view, that access is shown as this.value.",
        memory: {
          stack: [
            { id: 'sq', name: 'sq', type: 'primitive', value: 25 },
            { id: 'utils', name: 'utils', type: 'reference', refId: 'obj1' },
            { id: 'factor', name: 'factor', type: 'primitive', value: 2 }
          ],
          heap: [
            { id: 'obj1', className: 'MathUtils', fields: [{ name: 'value', value: 10 }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's9',
        codeLine: 7,
        activeFile: 'Main.java',
        description: "The result (20) is stored in the local variable 'result'.",
        memory: {
          stack: [
            { id: 'sq', name: 'sq', type: 'primitive', value: 25 },
            { id: 'utils', name: 'utils', type: 'reference', refId: 'obj1' },
            { id: 'result', name: 'result', type: 'primitive', value: 20 }
          ],
          heap: [
            { id: 'obj1', className: 'MathUtils', fields: [{ name: 'value', value: 10 }] }
          ],
          staticArea: []
        }
      }
    ],
    concepts: [
      {
        id: 'c5-2-1',
        name: 'Static Method Call',
        description: 'Static methods are called with ClassName.methodName(...) and do not require an object.',
        files: [{ name: 'Main.java', lines: [2, 3] }]
      },
      {
        id: 'c5-2-2',
        name: 'Instance Method Call',
        description: 'Instance methods are called with reference.methodName(...) and use an implicit "this".',
        files: [{ name: 'Main.java', lines: [5, 6, 7] }]
      },
      {
        id: 'c5-2-3',
        name: 'No this in Static Context',
        description: 'Static methods do not have access to instance state unless given an object reference.',
        files: [{ name: 'MathUtils.java', lines: [13, 14] }]
      },
      {
        id: 'c5-2-4',
        name: 'Implicit "this" (Instance Method)',
        description: 'Inside an instance method, "this" refers to the object the method was called on.',
        files: [{ name: 'MathUtils.java', lines: [8, 9] }],
        implicitThis: { file: 'MathUtils.java', className: 'MathUtils' },
      }
    ],
    quiz: {
      id: 'q5-2',
      question: "Why can't a static method access instance variables (like 'this.value') directly?",
      options: [
        "Because static methods are executed before the program starts.",
        "Because static methods belong to the class, not to any specific object, so there is no 'this' object.",
        "Because instance variables are private.",
        "Because static methods can only return void."
      ],
      correctAnswer: 1,
      explanation: "Static methods are called on the class itself, not on an instance of the class. Therefore, they don't have access to an implicit 'this' reference and cannot access instance variables directly.",
      points: 200
    }
  },
  {
    id: '6-1',
    order: 17,
    chapter: '5 · Arrays & algorithms',
    title: '1D Arrays in Memory',
    code: `int[] scores = new int[3];
scores[0] = 95;
scores[1] = 88;
scores[2] = 100;`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: "An array is a special type of object in Java that holds multiple values of the same type.",
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's1',
        codeLine: 0,
        description: "The 'new int[3]' creates an array object on the heap with 3 slots, initialized to 0. The reference 'scores' points to it.",
        memory: {
          stack: [{ id: 'scores', name: 'scores', type: 'reference', refId: 'arr1' }],
          heap: [{ id: 'arr1', className: 'int[]', fields: [{ name: '[0]', value: 0 }, { name: '[1]', value: 0 }, { name: '[2]', value: 0 }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "We assign 95 to the first slot (index 0).",
        memory: {
          stack: [{ id: 'scores', name: 'scores', type: 'reference', refId: 'arr1' }],
          heap: [{ id: 'arr1', className: 'int[]', fields: [{ name: '[0]', value: 95 }, { name: '[1]', value: 0 }, { name: '[2]', value: 0 }] }],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 2,
        description: "We assign 88 to the second slot (index 1).",
        memory: {
          stack: [{ id: 'scores', name: 'scores', type: 'reference', refId: 'arr1' }],
          heap: [{ id: 'arr1', className: 'int[]', fields: [{ name: '[0]', value: 95 }, { name: '[1]', value: 88 }, { name: '[2]', value: 0 }] }],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 3,
        description: "We assign 100 to the third slot (index 2).",
        memory: {
          stack: [{ id: 'scores', name: 'scores', type: 'reference', refId: 'arr1' }],
          heap: [{ id: 'arr1', className: 'int[]', fields: [{ name: '[0]', value: 95 }, { name: '[1]', value: 88 }, { name: '[2]', value: 100 }] }],
          staticArea: []
        }
      }
    ],
    quiz: {
      id: 'q6-1',
      question: "What is the default value of the elements in a newly created integer array (e.g., new int[5])?",
      options: [
        "null",
        "0",
        "Undefined",
        "-1"
      ],
      correctAnswer: 1,
      explanation: "In Java, when an array of primitive integers is created, all elements are automatically initialized to 0.",
      points: 150
    }
  },
  {
    id: '10-1',
    order: 23,
    chapter: '6 · Inheritance & recursion',
    title: 'Call Stack (Factorial)',
    code: `public int fact(int n) {
  if (n == 0) return 1;
  return n * fact(n - 1);
}
// Calling fact(5)`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: "Recursion happens when a method calls itself. Each call gets its own frame on the Call Stack.",
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's1',
        codeLine: 4,
        description: "We start by calling fact(5). A stack frame is created for n=5.",
        memory: {
          stack: [{ id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' }],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 2,
        description: "Since n is not 0, fact(5) calls fact(4). A NEW stack frame is placed on top.",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 2,
        description: "fact(4) calls fact(3). Another frame is added.",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' },
            { id: 'frame3', name: 'fact(3)', type: 'primitive', value: 'n = 3' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 2,
        description: "fact(3) calls fact(2).",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' },
            { id: 'frame3', name: 'fact(3)', type: 'primitive', value: 'n = 3' },
            { id: 'frame4', name: 'fact(2)', type: 'primitive', value: 'n = 2' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's5',
        codeLine: 2,
        description: "fact(2) calls fact(1).",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' },
            { id: 'frame3', name: 'fact(3)', type: 'primitive', value: 'n = 3' },
            { id: 'frame4', name: 'fact(2)', type: 'primitive', value: 'n = 2' },
            { id: 'frame5', name: 'fact(1)', type: 'primitive', value: 'n = 1' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's6',
        codeLine: 2,
        description: "fact(1) calls fact(0). The deepest frame is the base-case call.",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' },
            { id: 'frame3', name: 'fact(3)', type: 'primitive', value: 'n = 3' },
            { id: 'frame4', name: 'fact(2)', type: 'primitive', value: 'n = 2' },
            { id: 'frame5', name: 'fact(1)', type: 'primitive', value: 'n = 1' },
            { id: 'frame6', name: 'fact(0)', type: 'primitive', value: 'n = 0' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's7',
        codeLine: 1,
        description: "fact(0) hits the base case (n == 0) and returns 1. Its frame is popped off the stack.",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' },
            { id: 'frame3', name: 'fact(3)', type: 'primitive', value: 'n = 3' },
            { id: 'frame4', name: 'fact(2)', type: 'primitive', value: 'n = 2' },
            { id: 'frame5', name: 'fact(1)', type: 'primitive', value: 'n = 1 (returns 1×1)' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's8',
        codeLine: 2,
        description: "fact(1) finishes and returns 1. That frame pops; fact(2) is now the innermost active call.",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' },
            { id: 'frame3', name: 'fact(3)', type: 'primitive', value: 'n = 3' },
            { id: 'frame4', name: 'fact(2)', type: 'primitive', value: 'n = 2 (computes 2×1)' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's9',
        codeLine: 2,
        description: "fact(2) returns 2 to fact(3). One more frame pops; fact(3) combines 3 with that return.",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4' },
            { id: 'frame3', name: 'fact(3)', type: 'primitive', value: 'n = 3 (computes 3×2)' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's10',
        codeLine: 2,
        description: "fact(3) returns 6 to fact(4). Stack shrinks again; fact(4) multiplies 4 × 6.",
        memory: {
          stack: [
            { id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5' },
            { id: 'frame2', name: 'fact(4)', type: 'primitive', value: 'n = 4 (computes 4×6)' }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's11',
        codeLine: 2,
        description: "fact(4) returns 24 to fact(5). The original call finishes: 5 × 24 = 120 to the caller.",
        memory: {
          stack: [{ id: 'frame1', name: 'fact(5)', type: 'primitive', value: 'n = 5 (returns 120)' }],
          heap: [],
          staticArea: []
        }
      }
    ],
    quiz: {
      id: 'q10-1',
      question: "What is the purpose of the 'base case' in a recursive method?",
      options: [
        "To start the recursion.",
        "To stop the recursion and prevent an infinite loop (StackOverflowError).",
        "To make the code run faster.",
        "To define the variables."
      ],
      correctAnswer: 1,
      explanation: "Without a base case, a recursive method would call itself forever, eventually filling up the call stack and crashing the program with a StackOverflowError.",
      points: 300
    }
  },
  {
    id: '2-1',
    order: 5,
    chapter: '2 · Control flow',
    title: 'For Loops and Iteration',
    code: `int sum = 0;
for (int i = 1; i <= 3; i++) {
  sum += i;
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: "Let's trace a for loop. It has initialization, condition, and update expressions.",
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's1',
        codeLine: 0,
        description: "Initialize sum to 0.",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 0 }], heap: [], staticArea: [] }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "Loop initialization: int i = 1. Condition i <= 3 is true.",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 0 }, { id: 'i', name: 'i', type: 'primitive', value: 1 }], heap: [], staticArea: [] }
      },
      {
        id: 's3',
        codeLine: 2,
        description: "Iteration 1: sum += i (sum becomes 1).",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 1 }, { id: 'i', name: 'i', type: 'primitive', value: 1 }], heap: [], staticArea: [] }
      },
      {
        id: 's4',
        codeLine: 1,
        description: "Loop update: i++ (i becomes 2). Condition i <= 3 is true.",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 1 }, { id: 'i', name: 'i', type: 'primitive', value: 2 }], heap: [], staticArea: [] }
      },
      {
        id: 's5',
        codeLine: 2,
        description: "Iteration 2: sum += i (sum becomes 3).",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 3 }, { id: 'i', name: 'i', type: 'primitive', value: 2 }], heap: [], staticArea: [] }
      },
      {
        id: 's6',
        codeLine: 1,
        description: "Loop update: i++ (i becomes 3). Condition i <= 3 is true.",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 3 }, { id: 'i', name: 'i', type: 'primitive', value: 3 }], heap: [], staticArea: [] }
      },
      {
        id: 's7',
        codeLine: 2,
        description: "Iteration 3: sum += i (sum becomes 6).",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 6 }, { id: 'i', name: 'i', type: 'primitive', value: 3 }], heap: [], staticArea: [] }
      },
      {
        id: 's8',
        codeLine: 1,
        description: "Loop update: i++ (i becomes 4). Condition i <= 3 is FALSE. Loop terminates.",
        memory: { stack: [{ id: 'sum', name: 'sum', type: 'primitive', value: 6 }], heap: [], staticArea: [] }
      }
    ],
    quiz: {
      id: 'q2-1',
      question: "When does the loop variable 'i' go out of scope in a standard for loop?",
      options: [
        "It never goes out of scope.",
        "When the loop terminates.",
        "After the first iteration.",
        "At the end of the method."
      ],
      correctAnswer: 1,
      explanation: "Variables declared in the initialization section of a for loop are only in scope within the loop. Once the loop terminates, they are removed from memory.",
      points: 150
    }
  },
  {
    id: '2-2',
    order: 3,
    chapter: '2 · Control flow',
    title: 'Compound assignment & increment',
    code: `int total = 10;
total += 5;
total++;
int scale = 4;
scale *= 3;`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Compound ops (+=, ++, *=) update the same stack slots — trace each rewrite.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: "Primitive total starts at 10.",
        memory: { stack: [{ id: 'total', name: 'total', type: 'primitive', value: 10 }], heap: [], staticArea: [] },
      },
      {
        id: 's2',
        codeLine: 1,
        description: 'total += 5 stores 15 in the same variable.',
        memory: { stack: [{ id: 'total', name: 'total', type: 'primitive', value: 15 }], heap: [], staticArea: [] },
      },
      {
        id: 's3',
        codeLine: 2,
        description: 'post-increment: total becomes 16.',
        memory: { stack: [{ id: 'total', name: 'total', type: 'primitive', value: 16 }], heap: [], staticArea: [] },
      },
      {
        id: 's4',
        codeLine: 3,
        description: 'scale is another local primitive: 4.',
        memory: {
          stack: [
            { id: 'total', name: 'total', type: 'primitive', value: 16 },
            { id: 'scale', name: 'scale', type: 'primitive', value: 4 },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 4,
        description: 'scale *= 3 rewrites scale to 12 (still beside total on the stack).',
        memory: {
          stack: [
            { id: 'total', name: 'total', type: 'primitive', value: 16 },
            { id: 'scale', name: 'scale', type: 'primitive', value: 12 },
          ],
          heap: [],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-2-2',
      question: 'After total++; in this lesson, what value does total hold?',
      options: ['10', '15', '16', '21'],
      correctAnswer: 2,
      explanation: '+= adds 5 (→15), then ++ adds 1 (→16).',
      points: 150,
    },
  },
  {
    id: '4-3',
    order: 19,
    chapter: '4 · Collections',
    title: 'ArrayLists in Memory',
    code: `ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: "ArrayLists are dynamic arrays that can grow and shrink. Let's see how they are stored.",
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's1',
        codeLine: 0,
        description: "An ArrayList object is created on the heap. The reference 'list' points to it.",
        memory: {
          stack: [{ id: 'list', name: 'list', type: 'reference', refId: 'al1' }],
          heap: [{ id: 'al1', className: 'ArrayList', fields: [{ name: 'size', value: 0 }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "We add 'Apple' to the list. A String object is created, and the ArrayList stores a reference to it.",
        memory: {
          stack: [{ id: 'list', name: 'list', type: 'reference', refId: 'al1' }],
          heap: [
            { id: 'al1', className: 'ArrayList', fields: [{ name: 'size', value: 1 }, { name: '[0]', value: '@str1' }] },
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"Apple"' }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 2,
        description: "We add 'Banana'. Another String is created, and the ArrayList updates its internal array to include the new reference.",
        memory: {
          stack: [{ id: 'list', name: 'list', type: 'reference', refId: 'al1' }],
          heap: [
            { id: 'al1', className: 'ArrayList', fields: [{ name: 'size', value: 2 }, { name: '[0]', value: '@str1' }, { name: '[1]', value: '@str2' }] },
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"Apple"' }] },
            { id: 'str2', className: 'String', fields: [{ name: 'value', value: '"Banana"' }] }
          ],
          staticArea: []
        }
      }
    ],
    concepts: [
      {
        id: 'c1',
        name: 'ArrayList Creation',
        description: 'Creating a new ArrayList object. It starts empty but can grow dynamically.',
        lines: [0]
      },
      {
        id: 'c2',
        name: 'Adding Elements',
        description: 'When you add an object to an ArrayList, it stores a reference to that object, not the object itself.',
        lines: [1, 2]
      },
      {
        id: 'c3',
        name: 'Heap-to-Heap Reference',
        description: 'The ArrayList object on the heap contains references that point to other objects (like Strings) also on the heap.',
        lines: [1, 2]
      }
    ],
    quiz: {
      id: 'q4-3',
      question: "What does an ArrayList of objects actually store internally?",
      options: [
        "The objects themselves directly in contiguous memory.",
        "References (memory addresses) to the objects.",
        "Copies of the objects.",
        "Primitive values only."
      ],
      correctAnswer: 1,
      explanation: "Collections like ArrayList store references to objects, not the objects themselves. The actual objects live elsewhere on the heap.",
      points: 200
    }
  },
  {
    id: '4-4',
    order: 17.4,
    chapter: '5 · Arrays & algorithms',
    title: 'Sequential search in an array',
    code: `int[] data = {4, 9, 2};
int target = 9;
int idx = -1;
for (int i = 0; i < data.length; i++) {
  if (data[i] == target) {
    idx = i;
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Linear search: scan indices until data[i] matches target, recording idx.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          caption: 'We will compare each slot to target 9 in order.',
          bands: [{ id: 'data', label: 'data (int[])', values: [4, 9, 2] }],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 0,
        description: 'data references a heap int[]; target and idx are stack primitives.',
        memory: {
          stack: [
            { id: 'data', name: 'data', type: 'reference', refId: 'arrData' },
            { id: 'target', name: 'target', type: 'primitive', value: 9 },
            { id: 'idx', name: 'idx', type: 'primitive', value: -1 },
          ],
          heap: [{ id: 'arrData', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 9 }, { name: '[2]', value: 2 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Array on the heap — search has not started yet.',
          bands: [{ id: 'data', label: 'data (int[])', values: [4, 9, 2] }],
          markers: [],
        },
      },
      {
        id: 's2',
        codeLine: 3,
        description: 'Loop local i on stack; first visits index 0 (no match yet, idx stays -1).',
        memory: {
          stack: [
            { id: 'data', name: 'data', type: 'reference', refId: 'arrData' },
            { id: 'target', name: 'target', type: 'primitive', value: 9 },
            { id: 'idx', name: 'idx', type: 'primitive', value: -1 },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
          ],
          heap: [{ id: 'arrData', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 9 }, { name: '[2]', value: 2 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'i == 0: compare data[0] (4) with target (9); no match, idx stays −1.',
          bands: [{ id: 'data', label: 'data (int[])', values: [4, 9, 2] }],
          markers: [
            { index: 0, kind: 'i' },
            { index: 0, kind: 'compare', label: 'vs 9' },
          ],
        },
      },
      {
        id: 's2b',
        codeLine: 3,
        description:
          'The **for** header advances **i** to 1 (another iteration). We have not compared slot 1 yet in this step.',
        memory: {
          stack: [
            { id: 'data', name: 'data', type: 'reference', refId: 'arrData' },
            { id: 'target', name: 'target', type: 'primitive', value: 9 },
            { id: 'idx', name: 'idx', type: 'primitive', value: -1 },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
          ],
          heap: [{ id: 'arrData', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 9 }, { name: '[2]', value: 2 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'i == 1 — about to test data[1] against 9.',
          bands: [{ id: 'data', label: 'data (int[])', values: [4, 9, 2] }],
          markers: [
            { index: 1, kind: 'i' },
            { index: 0, kind: 'compare', label: 'was 4' },
          ],
        },
      },
      {
        id: 's3',
        codeLine: 4,
        description: 'At i = 1, data[i] == target so idx becomes 1.',
        memory: {
          stack: [
            { id: 'data', name: 'data', type: 'reference', refId: 'arrData' },
            { id: 'target', name: 'target', type: 'primitive', value: 9 },
            { id: 'idx', name: 'idx', type: 'primitive', value: 1 },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
          ],
          heap: [{ id: 'arrData', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 9 }, { name: '[2]', value: 2 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Match at i == 1 — idx updated to 1 (heap array unchanged).',
          bands: [{ id: 'data', label: 'data (int[])', values: [4, 9, 2] }],
          markers: [
            { index: 1, kind: 'i' },
            { index: 1, kind: 'compare', label: 'hit' },
          ],
        },
      },
      {
        id: 's4',
        codeLine: 3,
        description: 'Loop finishes; i is out of scope — idx remains the last match index (1).',
        memory: {
          stack: [
            { id: 'data', name: 'data', type: 'reference', refId: 'arrData' },
            { id: 'target', name: 'target', type: 'primitive', value: 9 },
            { id: 'idx', name: 'idx', type: 'primitive', value: 1 },
          ],
          heap: [{ id: 'arrData', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 9 }, { name: '[2]', value: 2 }] }],
          staticArea: [],
        },
        arrayTrace: {
          caption: 'Search finished — answer is index 1 (value 9).',
          bands: [{ id: 'data', label: 'data (int[])', values: [4, 9, 2] }],
          markers: [{ index: 1, kind: 'compare', label: 'found' }],
        },
      },
    ],
    quiz: {
      id: 'q-4-4',
      question: 'For target 9 in {4, 9, 2}, what idx does this search leave on the stack?',
      options: ['-1', '0', '1', '2'],
      correctAnswer: 2,
      explanation: '9 appears at index 1.',
      points: 175,
    },
  },
  {
    id: 'ap-1-1',
    order: 1,
    chapter: '1 · Variables & types',
    title: 'Primitive Types and Casting',
    code: `int items = 7;
double price = 2.5;
double total = items * price;
int rounded = (int) total;`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Primitives on the stack: ints, doubles, and a cast.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: "An int variable 'items' is stored on the stack with value 7.",
        memory: { stack: [{ id: 'items', name: 'items', type: 'primitive', value: 7 }], heap: [], staticArea: [] }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "A double variable 'price' is created with value 2.5.",
        memory: {
          stack: [
            { id: 'items', name: 'items', type: 'primitive', value: 7 },
            { id: 'price', name: 'price', type: 'primitive', value: 2.5 }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 2,
        description: "Mixed-type arithmetic promotes the int to double, so 'total' becomes 17.5.",
        memory: {
          stack: [
            { id: 'items', name: 'items', type: 'primitive', value: 7 },
            { id: 'price', name: 'price', type: 'primitive', value: 2.5 },
            { id: 'total', name: 'total', type: 'primitive', value: 17.5 }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 3,
        description: "Casting to int truncates the decimal part, so 'rounded' becomes 17.",
        memory: {
          stack: [
            { id: 'items', name: 'items', type: 'primitive', value: 7 },
            { id: 'price', name: 'price', type: 'primitive', value: 2.5 },
            { id: 'total', name: 'total', type: 'primitive', value: 17.5 },
            { id: 'rounded', name: 'rounded', type: 'primitive', value: 17 }
          ],
          heap: [],
          staticArea: []
        }
      }
    ],
  },
  {
    id: 'ap-3-1',
    order: 4,
    chapter: '2 · Control flow',
    title: 'Boolean Logic and if/else',
    code: `int score = 82;
boolean passed = score >= 70;
if (passed && score < 90) {
  score += 5;
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Booleans, relational operators, and a guarded if.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: "The primitive variable 'score' is initialized to 82.",
        memory: { stack: [{ id: 'score', name: 'score', type: 'primitive', value: 82 }], heap: [], staticArea: [] }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "The boolean expression score >= 70 is true, so 'passed' stores true.",
        memory: {
          stack: [
            { id: 'score', name: 'score', type: 'primitive', value: 82 },
            { id: 'passed', name: 'passed', type: 'primitive', value: true }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 2,
        description: "The compound condition passed && score < 90 is true, so the if-block executes.",
        memory: {
          stack: [
            { id: 'score', name: 'score', type: 'primitive', value: 82 },
            { id: 'passed', name: 'passed', type: 'primitive', value: true }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 3,
        description: "Inside the block, score is incremented by 5 and becomes 87.",
        memory: {
          stack: [
            { id: 'score', name: 'score', type: 'primitive', value: 87 },
            { id: 'passed', name: 'passed', type: 'primitive', value: true }
          ],
          heap: [],
          staticArea: []
        }
      }
    ],
    quiz: {
      id: 'q-ap-3-1',
      question: 'When does an if statement execute its block?',
      options: [
        'When the condition evaluates to true',
        'When the condition evaluates to false',
        'Always',
        'Only when it contains a loop'
      ],
      correctAnswer: 0,
      explanation: 'An if block runs only when its boolean condition is true.',
      points: 150
    }
  },
  {
    id: 'ap-2-1',
    order: 7,
    chapter: '3 · Objects & classes',
    title: 'String Methods and Object References',
    code: `String name = "java";
String upper = name.toUpperCase();
int len = upper.length();`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'String references on the heap and method chains with dot notation.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: "The reference 'name' points to a String object in the heap.",
        memory: {
          stack: [{ id: 'name', name: 'name', type: 'reference', refId: 'strName' }],
          heap: [{ id: 'strName', className: 'String', fields: [{ name: 'value', value: '"java"' }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 1,
        description: 'toUpperCase() returns a new String object, referenced by upper.',
        memory: {
          stack: [
            { id: 'name', name: 'name', type: 'reference', refId: 'strName' },
            { id: 'upper', name: 'upper', type: 'reference', refId: 'strUpper' }
          ],
          heap: [
            { id: 'strName', className: 'String', fields: [{ name: 'value', value: '"java"' }] },
            { id: 'strUpper', className: 'String', fields: [{ name: 'value', value: '"JAVA"' }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 2,
        description: 'length() returns a primitive int stored in len.',
        memory: {
          stack: [
            { id: 'name', name: 'name', type: 'reference', refId: 'strName' },
            { id: 'upper', name: 'upper', type: 'reference', refId: 'strUpper' },
            { id: 'len', name: 'len', type: 'primitive', value: 4 }
          ],
          heap: [
            { id: 'strName', className: 'String', fields: [{ name: 'value', value: '"java"' }] },
            { id: 'strUpper', className: 'String', fields: [{ name: 'value', value: '"JAVA"' }] }
          ],
          staticArea: []
        }
      }
    ],
    quiz: {
      id: 'q-ap-2-1',
      question: 'What does a method call like s.length() return?',
      options: ['Always a String', 'A value defined by the method return type', 'Nothing', 'A new class definition'],
      correctAnswer: 1,
      explanation: 'The return value depends on the method signature. For String.length(), the return type is int.',
      points: 150
    }
  },
  {
    id: 'ap-3-2',
    order: 14.5,
    chapter: '3 · Objects & classes',
    title: 'String: == vs equals',
    code: '',
    files: [
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    String a = "hi";
    String b = "hi";
    String c = new String("hi");
    boolean sameRefAB = (a == b);
    boolean sameText = a.equals(b);
    boolean refEqAC = (a == c);
    boolean textEqAC = a.equals(c);
  }
}
`,
      },
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Literal pooling vs new String: reference identity (==) vs character equality (equals).',
        fileLinks: [{ file: 'Main.java', label: 'Main.java' }],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        activeFile: 'Main.java',
        description: 'a points at one String object for "hi".',
        memory: {
          stack: [{ id: 'a', name: 'a', type: 'reference', refId: 'str1' }],
          heap: [{ id: 'str1', className: 'String', fields: [{ name: 'value', value: '"hi"' }] }],
          staticArea: [],
        },
      },
      {
        id: 's2',
        codeLine: 3,
        activeFile: 'Main.java',
        description: 'b uses the same pooled literal — a and b share one heap String.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'str1' },
            { id: 'b', name: 'b', type: 'reference', refId: 'str1' },
          ],
          heap: [{ id: 'str1', className: 'String', fields: [{ name: 'value', value: '"hi"' }] }],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 4,
        activeFile: 'Main.java',
        description: 'new String("hi") allocates a second object with identical characters.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'str1' },
            { id: 'b', name: 'b', type: 'reference', refId: 'str1' },
            { id: 'c', name: 'c', type: 'reference', refId: 'str2' },
          ],
          heap: [
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"hi"' }] },
            { id: 'str2', className: 'String', fields: [{ name: 'value', value: '"hi"' }] },
          ],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 8,
        activeFile: 'Main.java',
        description: 'sameRefAB true; sameText true; refEqAC false (different objects); textEqAC true.',
        memory: {
          stack: [
            { id: 'a', name: 'a', type: 'reference', refId: 'str1' },
            { id: 'b', name: 'b', type: 'reference', refId: 'str1' },
            { id: 'c', name: 'c', type: 'reference', refId: 'str2' },
            { id: 'sameRefAB', name: 'sameRefAB', type: 'primitive', value: true },
            { id: 'sameText', name: 'sameText', type: 'primitive', value: true },
            { id: 'refEqAC', name: 'refEqAC', type: 'primitive', value: false },
            { id: 'textEqAC', name: 'textEqAC', type: 'primitive', value: true },
          ],
          heap: [
            { id: 'str1', className: 'String', fields: [{ name: 'value', value: '"hi"' }] },
            { id: 'str2', className: 'String', fields: [{ name: 'value', value: '"hi"' }] },
          ],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-ap-3-2',
      question: 'When should you use equals instead of == for String text?',
      options: [
        'Never — == is always enough',
        'When comparing character content, not reference identity',
        'Only for literals',
        'Only inside loops',
      ],
      correctAnswer: 1,
      explanation: '== compares references; equals compares the underlying character sequence.',
      points: 200,
    },
  },
  {
    id: 'ap-4-1',
    order: 6,
    chapter: '2 · Control flow',
    title: 'while Loop Accumulation',
    code: `int n = 3;
int total = 0;
while (n > 0) {
  total += n;
  n--;
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'while loop: condition-driven repetition and an accumulator.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 0,
        description: "Initialize loop control variable 'n' to 3.",
        memory: { stack: [{ id: 'n', name: 'n', type: 'primitive', value: 3 }], heap: [], staticArea: [] }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "Initialize accumulator 'total' to 0.",
        memory: {
          stack: [
            { id: 'n', name: 'n', type: 'primitive', value: 3 },
            { id: 'total', name: 'total', type: 'primitive', value: 0 }
          ],
          heap: [],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 3,
        description: 'The loop runs while n > 0; total becomes 6 after three iterations.',
        memory: {
          stack: [
            { id: 'n', name: 'n', type: 'primitive', value: 0 },
            { id: 'total', name: 'total', type: 'primitive', value: 6 }
          ],
          heap: [],
          staticArea: []
        }
      }
    ],
    quiz: {
      id: 'q-ap-4-1',
      question: 'What prevents a while loop from running forever?',
      options: [
        'A changing loop condition that eventually becomes false',
        'The compiler stops it automatically',
        'All while loops run once',
        'A static method call'
      ],
      correctAnswer: 0,
      explanation: 'The condition must eventually evaluate to false for termination.',
      points: 150
    }
  },
  {
    id: 'ap-5-1',
    order: 14,
    chapter: '3 · Objects & classes',
    title: 'Constructor and Accessor/Mutator',
    code: '',
    files: [
      {
        name: 'BankAccount.java',
        code: `public class BankAccount {
  private int balance;

  public BankAccount(int start) {
    balance = start;
  }

  public void deposit(int amount) {
    balance += amount;
  }

  public int getBalance() {
    return balance;
  }
}`
      },
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    BankAccount acct = new BankAccount(100);
    acct.deposit(25);
    int b = acct.getBalance();
  }
}`
      }
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Main vs BankAccount.java.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'BankAccount.java', label: 'BankAccount.java (class)' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        activeFile: 'Main.java',
        description: "new BankAccount(100) creates an object with balance initialized by the constructor.",
        memory: {
          stack: [{ id: 'acct', name: 'acct', type: 'reference', refId: 'acct1' }],
          heap: [{ id: 'acct1', className: 'BankAccount', fields: [{ name: 'balance', value: 100 }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 3,
        activeFile: 'Main.java',
        description: 'deposit(25) mutates object state; balance becomes 125.',
        memory: {
          stack: [{ id: 'acct', name: 'acct', type: 'reference', refId: 'acct1' }],
          heap: [{ id: 'acct1', className: 'BankAccount', fields: [{ name: 'balance', value: 125 }] }],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 4,
        activeFile: 'Main.java',
        description: 'getBalance() returns an int value stored in local variable b.',
        memory: {
          stack: [
            { id: 'acct', name: 'acct', type: 'reference', refId: 'acct1' },
            { id: 'b', name: 'b', type: 'primitive', value: 125 }
          ],
          heap: [{ id: 'acct1', className: 'BankAccount', fields: [{ name: 'balance', value: 125 }] }],
          staticArea: []
        }
      }
    ],
    concepts: [
      {
        id: 'c-ap-5-1-this',
        name: 'Implicit this',
        description: 'Open for explicit `BankAccount this` and `this.` on `balance` (teaching overlay).',
        files: [{ name: 'BankAccount.java', lines: [3, 4, 5, 6, 7, 8, 9, 10] }],
        implicitThis: { file: 'BankAccount.java', className: 'BankAccount' },
      },
    ],
    quiz: {
      id: 'q-ap-5-1',
      question: 'Which method type should modify an object’s state?',
      options: ['Accessor', 'Mutator', 'Constructor only', 'Static utility'],
      correctAnswer: 1,
      explanation: 'Mutator methods (setters or updaters) change instance variable values.',
      points: 175
    }
  },
  {
    id: 'ap-6-1',
    order: 18,
    chapter: '5 · Arrays & algorithms',
    title: 'Array Traversal and Updating',
    code: `int[] scores = {70, 85, 90};
int sum = 0;
for (int i = 0; i < scores.length; i++) {
  sum += scores[i];
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Fixed-size array: index, read, and accumulate in a loop.',
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's1',
        codeLine: 0,
        description: "An int array is created on the heap and 'scores' stores its reference.",
        memory: {
          stack: [{ id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' }],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "A running total variable 'sum' is initialized to 0.",
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 0 }
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 2,
        description: 'First iteration: **i = 0**, condition **i < scores.length** is true; about to run the body.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 0 },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 3,
        description: '**sum += scores[0]** → **sum = 0 + 70 = 70**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 70 },
            { id: 'i', name: 'i', type: 'primitive', value: 0 },
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 2,
        description: '**i** becomes **1**; still **i < 3** — second iteration.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 70 },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: [],
        },
      },
      {
        id: 's6',
        codeLine: 3,
        description: '**sum += scores[1]** → **70 + 85 = 155**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 155 },
            { id: 'i', name: 'i', type: 'primitive', value: 1 },
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: [],
        },
      },
      {
        id: 's7',
        codeLine: 2,
        description: '**i = 2**; last index still satisfies **i < 3**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 155 },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: [],
        },
      },
      {
        id: 's8',
        codeLine: 3,
        description: '**sum += scores[2]** → **155 + 90 = 245**.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 245 },
            { id: 'i', name: 'i', type: 'primitive', value: 2 },
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: [],
        },
      },
      {
        id: 's9',
        codeLine: 2,
        description: '**i++** makes **i = 3**; **i < scores.length** is false — loop exits. **i** goes out of scope.',
        memory: {
          stack: [
            { id: 'scores', name: 'scores', type: 'reference', refId: 'arrScores' },
            { id: 'sum', name: 'sum', type: 'primitive', value: 245 },
          ],
          heap: [{ id: 'arrScores', className: 'int[]', fields: [{ name: '[0]', value: 70 }, { name: '[1]', value: 85 }, { name: '[2]', value: 90 }] }],
          staticArea: [],
        },
      },
    ],
    quiz: {
      id: 'q-ap-6-1',
      question: 'What is the valid index range for an array of length n?',
      options: ['1 to n', '0 to n', '0 to n - 1', '-1 to n - 1'],
      correctAnswer: 2,
      explanation: 'Java arrays are zero-indexed, so valid indices are from 0 through n - 1.',
      points: 175
    }
  },
  {
    id: 'ap-7-1',
    order: 20,
    chapter: '4 · Collections',
    title: 'ArrayList add, set, and remove',
    code: `ArrayList<String> names = new ArrayList<>();
names.add("Ava");
names.add("Ben");
names.set(1, "Bo");
names.remove(0);`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'ArrayList: add, set, and remove alter size and slots.',
        memory: { stack: [], heap: [], staticArea: [] }
      },
      {
        id: 's1',
        codeLine: 0,
        description: "An empty ArrayList object is created on the heap.",
        memory: {
          stack: [{ id: 'names', name: 'names', type: 'reference', refId: 'alNames' }],
          heap: [{ id: 'alNames', className: 'ArrayList', fields: [{ name: 'size', value: 0 }] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 1,
        description: "Adding 'Ava' appends the first element.",
        memory: {
          stack: [{ id: 'names', name: 'names', type: 'reference', refId: 'alNames' }],
          heap: [{ id: 'alNames', className: 'ArrayList', fields: [{ name: 'size', value: 1 }, { name: '[0]', value: '"Ava"' }] }],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 3,
        description: "set(1, 'Bo') replaces 'Ben' at index 1.",
        memory: {
          stack: [{ id: 'names', name: 'names', type: 'reference', refId: 'alNames' }],
          heap: [{ id: 'alNames', className: 'ArrayList', fields: [{ name: 'size', value: 2 }, { name: '[0]', value: '"Ava"' }, { name: '[1]', value: '"Bo"' }] }],
          staticArea: []
        }
      },
      {
        id: 's4',
        codeLine: 4,
        description: "remove(0) deletes the first element and shifts remaining elements left.",
        memory: {
          stack: [{ id: 'names', name: 'names', type: 'reference', refId: 'alNames' }],
          heap: [{ id: 'alNames', className: 'ArrayList', fields: [{ name: 'size', value: 1 }, { name: '[0]', value: '"Bo"' }] }],
          staticArea: []
        }
      }
    ],
    quiz: {
      id: 'q-ap-7-1',
      question: 'What happens after removing index 0 from an ArrayList?',
      options: [
        'All following elements shift left by one',
        'Nothing changes',
        'The list becomes null',
        'The removed value becomes 0'
      ],
      correctAnswer: 0,
      explanation: 'ArrayList elements after the removed index shift one position toward the front.',
      points: 175
    }
  },
  {
    id: 'ap-8-1',
    order: 21,
    chapter: '5 · Arrays & algorithms',
    title: '2D Array Row-Major Traversal',
    code: `int[][] grid = {
  {1, 2},
  {3, 4}
};
int total = 0;
for (int r = 0; r < grid.length; r++) {
  for (int c = 0; c < grid[r].length; c++) {
    total += grid[r][c];
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: '2D grid: nested loops and row-major traversal.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          layout: 'grid2d',
          caption:
            'Logical matrix: row r and column c match grid[r][c]. Row-major order walks one full row before r advances.',
          bands: [
            { id: 'g0', label: 'grid[0] (int[])', values: [1, 2] },
            { id: 'g1', label: 'grid[1] (int[])', values: [3, 4] },
          ],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 0,
        description: "A 2D int array is created; each row is itself an int[] object.",
        memory: {
          stack: [{ id: 'grid', name: 'grid', type: 'reference', refId: 'grid2d' }],
          heap: [
            { id: 'grid2d', className: 'int[][]', fields: [{ name: '[0]', value: '@row0' }, { name: '[1]', value: '@row1' }] },
            { id: 'row0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }] },
            { id: 'row1', className: 'int[]', fields: [{ name: '[0]', value: 3 }, { name: '[1]', value: 4 }] }
          ],
          staticArea: []
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: 'Heap: grid references two row arrays — the grid matches this layout.',
          bands: [
            { id: 'g0', label: 'grid[0] (int[])', values: [1, 2] },
            { id: 'g1', label: 'grid[1] (int[])', values: [3, 4] },
          ],
          markers: [],
        },
      },
      {
        id: 's2',
        codeLine: 7,
        description:
          '**total = 0**; outer loop **r = 0**, inner **c = 0** — about to add **grid[0][0]** (value 1).',
        memory: {
          stack: [
            { id: 'grid', name: 'grid', type: 'reference', refId: 'grid2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 0 },
            { id: 'r', name: 'r', type: 'primitive', value: 0 },
            { id: 'c', name: 'c', type: 'primitive', value: 0 },
          ],
          heap: [
            { id: 'grid2d', className: 'int[][]', fields: [{ name: '[0]', value: '@row0' }, { name: '[1]', value: '@row1' }] },
            { id: 'row0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }] },
            { id: 'row1', className: 'int[]', fields: [{ name: '[0]', value: 3 }, { name: '[1]', value: 4 }] }
          ],
          staticArea: []
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: 'Current cell **(0,0)** — first in row-major order.',
          bands: [
            { id: 'g0', label: 'grid[0] (int[])', values: [1, 2] },
            { id: 'g1', label: 'grid[1] (int[])', values: [3, 4] },
          ],
          markers: [{ bandId: 'g0', index: 0, kind: 'compare', label: '+=1' }],
        },
      },
      {
        id: 's2b',
        codeLine: 6,
        description: 'After **total += grid[0][0]**: total is **1**. Inner **c** becomes **1**.',
        memory: {
          stack: [
            { id: 'grid', name: 'grid', type: 'reference', refId: 'grid2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 1 },
            { id: 'r', name: 'r', type: 'primitive', value: 0 },
            { id: 'c', name: 'c', type: 'primitive', value: 1 },
          ],
          heap: [
            { id: 'grid2d', className: 'int[][]', fields: [{ name: '[0]', value: '@row0' }, { name: '[1]', value: '@row1' }] },
            { id: 'row0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }] },
            { id: 'row1', className: 'int[]', fields: [{ name: '[0]', value: 3 }, { name: '[1]', value: 4 }] }
          ],
          staticArea: []
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: '**(0,0)** done (green). Next: **(0,1)** adds 2 → total will be 3.',
          bands: [
            { id: 'g0', label: 'grid[0] (int[])', values: [1, 2] },
            { id: 'g1', label: 'grid[1] (int[])', values: [3, 4] },
          ],
          markers: [
            { bandId: 'g0', index: 0, kind: 'sortedThrough' },
            { bandId: 'g0', index: 1, kind: 'compare', label: '+=2' },
          ],
        },
      },
      {
        id: 's2c',
        codeLine: 6,
        description: '**total = 3**. **r = 1**, **c = 0** — first cell of the second row.',
        memory: {
          stack: [
            { id: 'grid', name: 'grid', type: 'reference', refId: 'grid2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 3 },
            { id: 'r', name: 'r', type: 'primitive', value: 1 },
            { id: 'c', name: 'c', type: 'primitive', value: 0 },
          ],
          heap: [
            { id: 'grid2d', className: 'int[][]', fields: [{ name: '[0]', value: '@row0' }, { name: '[1]', value: '@row1' }] },
            { id: 'row0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }] },
            { id: 'row1', className: 'int[]', fields: [{ name: '[0]', value: 3 }, { name: '[1]', value: 4 }] }
          ],
          staticArea: []
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: 'Row **0** finished; outer loop advanced **r**. Now at **(1,0)**.',
          bands: [
            { id: 'g0', label: 'grid[0] (int[])', values: [1, 2] },
            { id: 'g1', label: 'grid[1] (int[])', values: [3, 4] },
          ],
          markers: [
            { bandId: 'g0', index: 0, kind: 'sortedThrough' },
            { bandId: 'g0', index: 1, kind: 'sortedThrough' },
            { bandId: 'g1', index: 0, kind: 'compare', label: '+=3' },
          ],
        },
      },
      {
        id: 's2d',
        codeLine: 6,
        description: '**total = 6**. About to add **grid[1][1] = 4**.',
        memory: {
          stack: [
            { id: 'grid', name: 'grid', type: 'reference', refId: 'grid2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 6 },
            { id: 'r', name: 'r', type: 'primitive', value: 1 },
            { id: 'c', name: 'c', type: 'primitive', value: 1 },
          ],
          heap: [
            { id: 'grid2d', className: 'int[][]', fields: [{ name: '[0]', value: '@row0' }, { name: '[1]', value: '@row1' }] },
            { id: 'row0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }] },
            { id: 'row1', className: 'int[]', fields: [{ name: '[0]', value: 3 }, { name: '[1]', value: 4 }] }
          ],
          staticArea: []
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: '**(1,0)** done. Last visit **(1,1)** completes the walk.',
          bands: [
            { id: 'g0', label: 'grid[0] (int[])', values: [1, 2] },
            { id: 'g1', label: 'grid[1] (int[])', values: [3, 4] },
          ],
          markers: [
            { bandId: 'g0', index: 0, kind: 'sortedThrough' },
            { bandId: 'g0', index: 1, kind: 'sortedThrough' },
            { bandId: 'g1', index: 0, kind: 'sortedThrough' },
            { bandId: 'g1', index: 1, kind: 'compare', label: '+=4' },
          ],
        },
      },
      {
        id: 's3',
        codeLine: 6,
        description: 'Row-major traversal finished: **1+2+3+4 = 10**.',
        memory: {
          stack: [
            { id: 'grid', name: 'grid', type: 'reference', refId: 'grid2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 10 }
          ],
          heap: [
            { id: 'grid2d', className: 'int[][]', fields: [{ name: '[0]', value: '@row0' }, { name: '[1]', value: '@row1' }] },
            { id: 'row0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }] },
            { id: 'row1', className: 'int[]', fields: [{ name: '[0]', value: 3 }, { name: '[1]', value: 4 }] }
          ],
          staticArea: []
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: 'Order was **(0,0)→(0,1)→(1,0)→(1,1)** — **c** moves fastest while **r** is fixed.',
          bands: [
            { id: 'g0', label: 'grid[0] (int[])', values: [1, 2] },
            { id: 'g1', label: 'grid[1] (int[])', values: [3, 4] },
          ],
          markers: [
            { bandId: 'g0', index: 0, kind: 'sortedThrough' },
            { bandId: 'g0', index: 1, kind: 'sortedThrough' },
            { bandId: 'g1', index: 0, kind: 'sortedThrough' },
            { bandId: 'g1', index: 1, kind: 'compare', label: 'last' },
          ],
        },
      }
    ],
    quiz: {
      id: 'q-ap-8-1',
      question: 'In row-major traversal, which index changes fastest?',
      options: ['Row index', 'Column index', 'Both equally', 'Neither'],
      correctAnswer: 1,
      explanation: 'For each fixed row, the inner loop changes the column index first.',
      points: 200
    }
  },
  {
    id: 'ap-9-1',
    order: 22,
    chapter: '6 · Inheritance & recursion',
    title: 'Superclass, Subclass, and Overriding',
    classHierarchy: [
      { className: 'Vehicle', file: 'Vehicle.java', extends: null },
      { className: 'Car', file: 'Car.java', extends: 'Vehicle' },
    ],
    code: '',
    files: [
      {
        name: 'Vehicle.java',
        code: `public class Vehicle {
  public String move() {
    return "Vehicle moves";
  }
}`
      },
      {
        name: 'Car.java',
        code: `public class Car extends Vehicle {
  @Override
  public String move() {
    return "Car drives";
  }
}`
      },
      {
        name: 'Main.java',
        code: `public class Main {
  public static void main(String[] args) {
    Vehicle v = new Car();
    String msg = v.move();
  }
}`
      }
    ],
    steps: [
      {
        id: 's0',
        codeLine: -1,
        activeFile: 'Main.java',
        description: 'Vehicle ref, Car instance — three tabs.',
        fileLinks: [
          { file: 'Main.java', label: 'Main.java (client)' },
          { file: 'Vehicle.java', label: 'Vehicle.java' },
          { file: 'Car.java', label: 'Car.java' },
        ],
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 2,
        activeFile: 'Main.java',
        description: "A Vehicle reference points to a Car object, demonstrating polymorphism.",
        memory: {
          stack: [{ id: 'v', name: 'v', type: 'reference', refId: 'car1' }],
          heap: [{ id: 'car1', className: 'Car', fields: [] }],
          staticArea: []
        }
      },
      {
        id: 's2',
        codeLine: 3,
        activeFile: 'Main.java',
        description: "Calling v.move() uses dynamic dispatch and executes Car's overridden move method.",
        parameterPassing: {
          subtitle:
            'Instance call: the receiver v is passed as the hidden first argument this. Dynamic dispatch runs Car.move.',
          calleeSignature: 'String move(Car this)',
          mappings: [
            {
              formalType: 'Car',
              formalName: 'this',
              actual: 'v',
              detail:
                'v is declared as Vehicle but holds a Car reference; that reference is copied into this for the invoked override.',
            },
          ],
          footnote:
            'The compiler uses the declared type for checking; the JVM uses the object’s actual type to pick Car.move at runtime.',
        },
        memory: {
          stack: [
            { id: 'v', name: 'v', type: 'reference', refId: 'car1' },
            { id: 'msg', name: 'msg', type: 'reference', refId: 'strMsg' }
          ],
          heap: [
            { id: 'car1', className: 'Car', fields: [] },
            { id: 'strMsg', className: 'String', fields: [{ name: 'value', value: '"Car drives"' }] }
          ],
          staticArea: []
        }
      },
      {
        id: 's3',
        codeLine: 3,
        activeFile: 'Car.java',
        description: 'Inside Car.move(): return runs on the same receiver that dynamic dispatch bound to this.',
        parameterPassing: {
          subtitle: 'Inside the override, this is the Car instance.',
          calleeSignature: 'String move(Car this)',
          mappings: [
            {
              formalType: 'Car',
              formalName: 'this',
              actual: 'v',
              detail: 'Runtime type Car; method body uses this object’s state.',
            },
          ],
          footnote: 'The String literal is created and returned to the caller’s msg slot.',
        },
        memory: {
          stack: [{ id: 'v', name: 'v', type: 'reference', refId: 'car1' }],
          heap: [{ id: 'car1', className: 'Car', fields: [] }],
          staticArea: [],
        },
      },
    ],
    concepts: [
      {
        id: 'c-ap-9-1-this',
        name: 'Implicit this',
        description: 'Open for explicit `Vehicle this` / `Car this` and `this.` on instance code (teaching overlay).',
        files: [
          { name: 'Vehicle.java', lines: [1, 2, 3] },
          { name: 'Car.java', lines: [1, 2, 3, 4] },
        ],
        implicitThis: { file: 'Car.java', className: 'Car' },
      },
    ],
    quiz: {
      id: 'q-ap-9-1',
      question: 'Why does v.move() call Car.move() when v is declared as Vehicle?',
      options: [
        'Because Java ignores declared types',
        'Because overridden instance methods are chosen by the object type at runtime',
        'Because move is static',
        'Because Vehicle cannot define methods'
      ],
      correctAnswer: 1,
      explanation: 'Java uses dynamic dispatch for instance methods, so the actual object type controls which overridden method runs.',
      points: 250
    }
  },
  {
    id: 'ap-10-1',
    order: 24,
    chapter: '6 · Inheritance & recursion',
    title: 'Recursive Sum with Base Case',
    code: `public int sumTo(int n) {
  if (n == 1) {
    return 1;
  }
  return n + sumTo(n - 1);
}
// sumTo(4)`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description: 'Base case vs recursive case for sumTo(n).',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 6,
        description: 'Calling sumTo(4) creates the first stack frame.',
        memory: { stack: [{ id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'n = 4' }], heap: [], staticArea: [] },
      },
      {
        id: 's2',
        codeLine: 4,
        description: 'Since n is not 1, sumTo(4) calls sumTo(3). A new frame is pushed.',
        memory: {
          stack: [
            { id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'n = 4' },
            { id: 'f2', name: 'sumTo(3)', type: 'primitive', value: 'n = 3' },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's3',
        codeLine: 4,
        description: 'sumTo(3) calls sumTo(2).',
        memory: {
          stack: [
            { id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'n = 4' },
            { id: 'f2', name: 'sumTo(3)', type: 'primitive', value: 'n = 3' },
            { id: 'f3', name: 'sumTo(2)', type: 'primitive', value: 'n = 2' },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's4',
        codeLine: 4,
        description: 'sumTo(2) calls sumTo(1). The deepest frame is the base-case call.',
        memory: {
          stack: [
            { id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'n = 4' },
            { id: 'f2', name: 'sumTo(3)', type: 'primitive', value: 'n = 3' },
            { id: 'f3', name: 'sumTo(2)', type: 'primitive', value: 'n = 2' },
            { id: 'f4', name: 'sumTo(1)', type: 'primitive', value: 'n = 1' },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's5',
        codeLine: 1,
        description: 'sumTo(1) hits the base case (n == 1) and returns 1. Its frame is popped.',
        memory: {
          stack: [
            { id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'n = 4' },
            { id: 'f2', name: 'sumTo(3)', type: 'primitive', value: 'n = 3' },
            { id: 'f3', name: 'sumTo(2)', type: 'primitive', value: 'n = 2 (computes 2+1)' },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's6',
        codeLine: 4,
        description: 'sumTo(2) returns 3 to sumTo(3). That frame pops; sumTo(3) adds 3 + 3.',
        memory: {
          stack: [
            { id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'n = 4' },
            { id: 'f2', name: 'sumTo(3)', type: 'primitive', value: 'n = 3 (computes 3+3)' },
          ],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's7',
        codeLine: 4,
        description: 'sumTo(3) returns 6 to sumTo(4). sumTo(4) evaluates 4 + 6.',
        memory: {
          stack: [{ id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'n = 4 (computes 4+6)' }],
          heap: [],
          staticArea: [],
        },
      },
      {
        id: 's8',
        codeLine: 4,
        description: 'sumTo(4) returns 10 to the original caller.',
        memory: { stack: [{ id: 'f1', name: 'sumTo(4)', type: 'primitive', value: 'returns 10' }], heap: [], staticArea: [] },
      },
    ],
    quiz: {
      id: 'q-ap-10-1',
      question: 'What are the two essential parts of a recursive method?',
      options: [
        'A while loop and an array',
        'A constructor and a mutator',
        'A base case and a recursive call',
        'A static variable and an instance variable'
      ],
      correctAnswer: 2,
      explanation: 'A base case stops recursion, and a recursive call reduces the problem toward that base case.',
      points: 250
    }
  },
  {
    id: '6-lib-arraylist',
    order: 26,
    chapter: '7 · Libraries',
    title: 'ArrayList & List',
    code: `import java.util.ArrayList;
import java.util.List;

public class ArrayListAndList {
  public static void main(String[] args) {
    // Growable list (java.util.ArrayList)
    ArrayList<Integer> nums = new ArrayList<Integer>();
    nums.add(10);
    nums.add(20);
    int x = nums.get(0);
    nums.set(1, 99);
    nums.remove(0);
    int size = nums.size();

    // Interface on the left, ArrayList on the right
    List<String> words = new ArrayList<String>();
    words.add("item");
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'java.util.ArrayList grows as you add; java.util.List is the interface type you often declare when you only need list operations.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 8,
        description: 'After two adds, the list holds two elements; the reference nums points at one ArrayList on the heap.',
        memory: {
          stack: [{ id: 'nums', name: 'nums', type: 'reference', refId: 'alNums' }],
          heap: [
            {
              id: 'alNums',
              className: 'ArrayList',
              fields: [
                { name: 'size', value: 2 },
                { name: '[0]', value: 10 },
                { name: '[1]', value: 20 },
              ],
            },
          ],
          staticArea: [],
        },
        highlights: [
          { line: 7, colorClass: 'bg-amber-500/25', label: 'ArrayList' },
          { line: 8, colorClass: 'bg-amber-500/25' },
          { line: 9, colorClass: 'bg-amber-500/25' },
        ],
      },
      {
        id: 's2',
        codeLine: 11,
        description: 'get, set, remove, and size—lists use .size(); arrays use .length.',
        memory: {
          stack: [
            { id: 'nums', name: 'nums', type: 'reference', refId: 'alNums' },
            { id: 'x', name: 'x', type: 'primitive', value: 10 },
            { id: 'size', name: 'size', type: 'primitive', value: 1 },
          ],
          heap: [{ id: 'alNums', className: 'ArrayList', fields: [{ name: 'size', value: 1 }, { name: '[0]', value: 99 }] }],
          staticArea: [],
        },
        highlights: [
          { line: 10, colorClass: 'bg-amber-500/25' },
          { line: 11, colorClass: 'bg-amber-500/25' },
          { line: 12, colorClass: 'bg-amber-500/25' },
          { line: 13, colorClass: 'bg-amber-500/25' },
        ],
      },
      {
        id: 's3',
        codeLine: 17,
        description: 'Programming to List<String> keeps the field flexible; new ArrayList<>() still backs the concrete object.',
        memory: {
          stack: [
            { id: 'nums', name: 'nums', type: 'reference', refId: 'alNums' },
            { id: 'x', name: 'x', type: 'primitive', value: 10 },
            { id: 'size', name: 'size', type: 'primitive', value: 1 },
            { id: 'words', name: 'words', type: 'reference', refId: 'alWords' },
          ],
          heap: [
            { id: 'alNums', className: 'ArrayList', fields: [{ name: 'size', value: 1 }, { name: '[0]', value: 99 }] },
            {
              id: 'alWords',
              className: 'ArrayList',
              fields: [{ name: 'size', value: 1 }, { name: '[0]', value: '@strItem' }],
            },
            { id: 'strItem', className: 'String', fields: [{ name: 'value', value: '"item"' }] },
          ],
          staticArea: [],
        },
        highlights: [
          { line: 16, colorClass: 'bg-teal-500/25', label: 'List' },
          { line: 17, colorClass: 'bg-teal-500/25' },
        ],
      },
    ],
    concepts: [
      {
        id: 'c-6-lib-al-1',
        name: 'ArrayList<E>',
        description: 'Growable list: add, get, set, remove, size.',
        lines: [7, 8, 9, 10, 11, 12, 13],
      },
      {
        id: 'c-6-lib-al-2',
        name: 'List & ArrayList',
        description: 'Declare List when you only need list operations; instantiate ArrayList (or another implementation).',
        lines: [16, 17],
      },
    ],
    quiz: {
      id: 'q-6-lib-arraylist',
      question: 'How do you obtain the number of elements currently stored in an ArrayList nums?',
      options: ['nums.length', 'nums.size()', 'ArrayList.count(nums)', 'nums.getLength()'],
      correctAnswer: 1,
      explanation: 'ArrayList uses the instance method size(). length is for arrays and Strings.',
      points: 200,
    },
  },
  {
    id: '6-lib-string',
    order: 27,
    chapter: '7 · Libraries',
    title: 'String methods',
    code: `public class StringDemo {
  public static void main(String[] args) {
    String text = "abcdef";
    int len = text.length();
    String piece = text.substring(1, 4);
    int pos = text.indexOf("cd");
    boolean ok = text.equals("abcdef");
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'java.lang.String is always available (no import). Strings are immutable—methods return new values rather than changing the receiver.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 8,
        description:
          'length(), substring(begin, endExclusive), indexOf, and equals(value)—use equals for text, not ==.',
        memory: {
          stack: [
            { id: 'text', name: 'text', type: 'reference', refId: 'strText' },
            { id: 'len', name: 'len', type: 'primitive', value: 6 },
            { id: 'piece', name: 'piece', type: 'reference', refId: 'strPiece' },
            { id: 'pos', name: 'pos', type: 'primitive', value: 2 },
            { id: 'ok', name: 'ok', type: 'primitive', value: true },
          ],
          heap: [
            { id: 'strText', className: 'String', fields: [{ name: 'value', value: '"abcdef"' }] },
            { id: 'strPiece', className: 'String', fields: [{ name: 'value', value: '"bcd"' }] },
          ],
          staticArea: [],
        },
        highlights: [
          { line: 4, colorClass: 'bg-sky-500/25', label: 'String' },
          { line: 5, colorClass: 'bg-sky-500/25' },
          { line: 6, colorClass: 'bg-sky-500/25' },
          { line: 7, colorClass: 'bg-sky-500/25' },
          { line: 8, colorClass: 'bg-sky-500/25' },
        ],
      },
    ],
    concepts: [
      {
        id: 'c-6-lib-str-1',
        name: 'Common String API',
        description: 'length, substring (end index exclusive), indexOf, equals.',
        lines: [4, 5, 6, 7, 8],
      },
    ],
    quiz: {
      id: 'q-6-lib-string',
      question: 'Which is true about comparing two String objects for equal text?',
      options: [
        'Use == so both refer to the same object',
        'Use .equals(...) to compare character sequences',
        'Use Math.min on the two strings',
        'Use .substring(0) on each and compare pointers',
      ],
      correctAnswer: 1,
      explanation:
        '== tests reference equality; .equals(...) tests whether the character sequences match—what you want for String content.',
      points: 200,
    },
  },
  {
    id: '6-lib-math',
    order: 28,
    chapter: '7 · Libraries',
    title: 'Math & wrapper classes',
    code: `public class MathAndWrappers {
  public static void main(String[] args) {
    double rnd = Math.random();
    int abs = Math.abs(-5);
    double pow = Math.pow(2, 4);
    double root = Math.sqrt(9.0);
    int lo = Math.min(2, 8);
    int hi = Math.max(2, 8);

    int imax = Integer.MAX_VALUE;
    int imin = Integer.MIN_VALUE;
    int fromStr = Integer.parseInt("100");
    double d = Double.parseDouble("2.5");
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'java.lang.Math exposes static numeric helpers; Integer and Double hold constants and parsing helpers for primitives.',
        memory: { stack: [], heap: [], staticArea: [] },
      },
      {
        id: 's1',
        codeLine: 9,
        description: 'Call Math methods on the type: random, abs, pow, sqrt, min, max—you never instantiate Math.',
        memory: {
          stack: [
            { id: 'rnd', name: 'rnd', type: 'primitive', value: 0.37 },
            { id: 'abs', name: 'abs', type: 'primitive', value: 5 },
            { id: 'pow', name: 'pow', type: 'primitive', value: 16 },
            { id: 'root', name: 'root', type: 'primitive', value: 3 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 2 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 8 },
          ],
          heap: [],
          staticArea: [],
        },
        highlights: [
          { line: 4, colorClass: 'bg-violet-500/25', label: 'Math' },
          { line: 5, colorClass: 'bg-violet-500/25' },
          { line: 6, colorClass: 'bg-violet-500/25' },
          { line: 7, colorClass: 'bg-violet-500/25' },
          { line: 8, colorClass: 'bg-violet-500/25' },
          { line: 9, colorClass: 'bg-violet-500/25' },
        ],
      },
      {
        id: 's2',
        codeLine: 15,
        description: 'Wrapper types expose limits (MAX_VALUE) and parsers that turn text into int or double.',
        memory: {
          stack: [
            { id: 'rnd', name: 'rnd', type: 'primitive', value: 0.37 },
            { id: 'abs', name: 'abs', type: 'primitive', value: 5 },
            { id: 'pow', name: 'pow', type: 'primitive', value: 16 },
            { id: 'root', name: 'root', type: 'primitive', value: 3 },
            { id: 'lo', name: 'lo', type: 'primitive', value: 2 },
            { id: 'hi', name: 'hi', type: 'primitive', value: 8 },
            { id: 'imax', name: 'imax', type: 'primitive', value: 2147483647 },
            { id: 'imin', name: 'imin', type: 'primitive', value: -2147483648 },
            { id: 'fromStr', name: 'fromStr', type: 'primitive', value: 100 },
            { id: 'd', name: 'd', type: 'primitive', value: 2.5 },
          ],
          heap: [],
          staticArea: [],
        },
        highlights: [
          { line: 12, colorClass: 'bg-emerald-500/25', label: 'Wrappers' },
          { line: 13, colorClass: 'bg-emerald-500/25' },
          { line: 14, colorClass: 'bg-emerald-500/25' },
          { line: 15, colorClass: 'bg-emerald-500/25' },
        ],
      },
    ],
    concepts: [
      {
        id: 'c-6-lib-math-1',
        name: 'java.lang.Math',
        description: 'Static helpers: random, abs, pow, sqrt, min, max.',
        lines: [4, 5, 6, 7, 8, 9],
      },
      {
        id: 'c-6-lib-math-2',
        name: 'Integer & Double utilities',
        description: 'Limits and parseInt / parseDouble for decoding strings.',
        lines: [12, 13, 14, 15],
      },
    ],
    quiz: {
      id: 'q-6-lib-math',
      question: 'Which statement about java.lang.Math is correct?',
      options: [
        'You must do new Math() before calling methods',
        'All useful methods are static; you call Math.methodName(...)',
        'Math can only generate random integers',
        'Math is in java.util and must be imported',
      ],
      correctAnswer: 1,
      explanation: 'Math is a final class with a private constructor; its methods are static utilities.',
      points: 200,
    },
  },
  {
    id: '6-lib-2d',
    order: 29,
    chapter: '7 · Libraries',
    title: '2D arrays (row-major)',
    code: `public class TwoDArrayDemo {
  public static void main(String[] args) {
    int[][] m = { {1, 2, 3}, {4, 5, 6} };
    int total = 0;
    for (int r = 0; r < m.length; r++) {
      for (int c = 0; c < m[r].length; c++) {
        total += m[r][c];
      }
    }
  }
}`,
    steps: [
      {
        id: 's0',
        codeLine: -1,
        description:
          'A 2D array is an array of row arrays. Row-major traversal: for each row r, visit columns 0 .. m[r].length - 1.',
        memory: { stack: [], heap: [], staticArea: [] },
        arrayTrace: {
          layout: 'grid2d',
          caption:
            '2×3 logical grid: **m[r][c]** uses row **r** and column **c**. Inner loop **c** runs across each row before **r** advances.',
          bands: [
            { id: 'm0', label: 'm[0] (int[])', values: [1, 2, 3] },
            { id: 'm1', label: 'm[1] (int[])', values: [4, 5, 6] },
          ],
          markers: [],
        },
      },
      {
        id: 's1',
        codeLine: 6,
        description:
          '**r = 0**, **c = 0**, **total = 0** — first visit **m[0][0] = 1**.',
        memory: {
          stack: [
            { id: 'm', name: 'm', type: 'reference', refId: 'm2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 0 },
            { id: 'r', name: 'r', type: 'primitive', value: 0 },
            { id: 'c', name: 'c', type: 'primitive', value: 0 },
          ],
          heap: [
            { id: 'm2d', className: 'int[][]', fields: [{ name: '[0]', value: '@mRow0' }, { name: '[1]', value: '@mRow1' }] },
            { id: 'mRow0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }, { name: '[2]', value: 3 }] },
            { id: 'mRow1', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 5 }, { name: '[2]', value: 6 }] },
          ],
          staticArea: [],
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: 'Start at **(0,0)** — top-left in row-major order.',
          bands: [
            { id: 'm0', label: 'm[0] (int[])', values: [1, 2, 3] },
            { id: 'm1', label: 'm[1] (int[])', values: [4, 5, 6] },
          ],
          markers: [{ bandId: 'm0', index: 0, kind: 'compare', label: '+=1' }],
        },
        highlights: [
          { line: 4, colorClass: 'bg-rose-500/20', label: '2D' },
          { line: 5, colorClass: 'bg-rose-500/20' },
          { line: 6, colorClass: 'bg-rose-500/20' },
          { line: 7, colorClass: 'bg-rose-500/20' },
        ],
      },
      {
        id: 's2',
        codeLine: 6,
        description:
          '**total = 6** after finishing row **0** (1+2+3). Outer loop sets **r = 1**; inner starts **c = 0** at **m[1][0] = 4**.',
        memory: {
          stack: [
            { id: 'm', name: 'm', type: 'reference', refId: 'm2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 6 },
            { id: 'r', name: 'r', type: 'primitive', value: 1 },
            { id: 'c', name: 'c', type: 'primitive', value: 0 },
          ],
          heap: [
            { id: 'm2d', className: 'int[][]', fields: [{ name: '[0]', value: '@mRow0' }, { name: '[1]', value: '@mRow1' }] },
            { id: 'mRow0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }, { name: '[2]', value: 3 }] },
            { id: 'mRow1', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 5 }, { name: '[2]', value: 6 }] },
          ],
          staticArea: [],
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: 'Entire first row visited (green). **c** resets for the new row while **r** is **1**.',
          bands: [
            { id: 'm0', label: 'm[0] (int[])', values: [1, 2, 3] },
            { id: 'm1', label: 'm[1] (int[])', values: [4, 5, 6] },
          ],
          markers: [
            { bandId: 'm0', index: 0, kind: 'sortedThrough' },
            { bandId: 'm0', index: 1, kind: 'sortedThrough' },
            { bandId: 'm0', index: 2, kind: 'sortedThrough' },
            { bandId: 'm1', index: 0, kind: 'compare', label: '+=4' },
          ],
        },
        highlights: [
          { line: 4, colorClass: 'bg-rose-500/20', label: '2D' },
          { line: 5, colorClass: 'bg-rose-500/20' },
          { line: 6, colorClass: 'bg-rose-500/20' },
          { line: 7, colorClass: 'bg-rose-500/20' },
        ],
      },
      {
        id: 's3',
        codeLine: 6,
        description:
          '**total = 15**; about to add **m[1][2] = 6** — last cell in row-major order.',
        memory: {
          stack: [
            { id: 'm', name: 'm', type: 'reference', refId: 'm2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 15 },
            { id: 'r', name: 'r', type: 'primitive', value: 1 },
            { id: 'c', name: 'c', type: 'primitive', value: 2 },
          ],
          heap: [
            { id: 'm2d', className: 'int[][]', fields: [{ name: '[0]', value: '@mRow0' }, { name: '[1]', value: '@mRow1' }] },
            { id: 'mRow0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }, { name: '[2]', value: 3 }] },
            { id: 'mRow1', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 5 }, { name: '[2]', value: 6 }] },
          ],
          staticArea: [],
        },
        arrayTrace: {
          layout: 'grid2d',
          caption: 'Only **(1,2)** remains; **c** has walked 0→1→2 on this row.',
          bands: [
            { id: 'm0', label: 'm[0] (int[])', values: [1, 2, 3] },
            { id: 'm1', label: 'm[1] (int[])', values: [4, 5, 6] },
          ],
          markers: [
            { bandId: 'm0', index: 0, kind: 'sortedThrough' },
            { bandId: 'm0', index: 1, kind: 'sortedThrough' },
            { bandId: 'm0', index: 2, kind: 'sortedThrough' },
            { bandId: 'm1', index: 0, kind: 'sortedThrough' },
            { bandId: 'm1', index: 1, kind: 'sortedThrough' },
            { bandId: 'm1', index: 2, kind: 'compare', label: '+=6' },
          ],
        },
        highlights: [
          { line: 4, colorClass: 'bg-rose-500/20', label: '2D' },
          { line: 5, colorClass: 'bg-rose-500/20' },
          { line: 6, colorClass: 'bg-rose-500/20' },
          { line: 7, colorClass: 'bg-rose-500/20' },
        ],
      },
      {
        id: 's4',
        codeLine: 6,
        description: 'All cells visited: **1+2+3+4+5+6 = 21**.',
        memory: {
          stack: [
            { id: 'm', name: 'm', type: 'reference', refId: 'm2d' },
            { id: 'total', name: 'total', type: 'primitive', value: 21 },
          ],
          heap: [
            { id: 'm2d', className: 'int[][]', fields: [{ name: '[0]', value: '@mRow0' }, { name: '[1]', value: '@mRow1' }] },
            { id: 'mRow0', className: 'int[]', fields: [{ name: '[0]', value: 1 }, { name: '[1]', value: 2 }, { name: '[2]', value: 3 }] },
            { id: 'mRow1', className: 'int[]', fields: [{ name: '[0]', value: 4 }, { name: '[1]', value: 5 }, { name: '[2]', value: 6 }] },
          ],
          staticArea: [],
        },
        arrayTrace: {
          layout: 'grid2d',
          caption:
            'Full walk **(0,0)…(0,2)** then **(1,0)…(1,2)** — inner bound **m[r].length** allowed three columns on each row.',
          bands: [
            { id: 'm0', label: 'm[0] (int[])', values: [1, 2, 3] },
            { id: 'm1', label: 'm[1] (int[])', values: [4, 5, 6] },
          ],
          markers: [
            { bandId: 'm0', index: 0, kind: 'sortedThrough' },
            { bandId: 'm0', index: 1, kind: 'sortedThrough' },
            { bandId: 'm0', index: 2, kind: 'sortedThrough' },
            { bandId: 'm1', index: 0, kind: 'sortedThrough' },
            { bandId: 'm1', index: 1, kind: 'sortedThrough' },
            { bandId: 'm1', index: 2, kind: 'compare', label: 'last' },
          ],
        },
        highlights: [
          { line: 4, colorClass: 'bg-rose-500/20', label: '2D' },
          { line: 5, colorClass: 'bg-rose-500/20' },
          { line: 6, colorClass: 'bg-rose-500/20' },
          { line: 7, colorClass: 'bg-rose-500/20' },
        ],
      },
    ],
    concepts: [
      {
        id: 'c-6-lib-2d-1',
        name: 'Row-major loops',
        description: 'for r, then for c < m[r].length—sums and searches follow this skeleton.',
        lines: [4, 5, 6, 7, 8],
      },
    ],
    quiz: {
      id: 'q-6-lib-2d',
      question: 'In row-major traversal of int[][] grid, what is the usual inner-loop bound?',
      options: ['grid.length', 'grid[0].length only', 'grid[r].length', 'grid[c].length'],
      correctAnswer: 2,
      explanation:
        'Each row can differ in length; the inner loop should run while c < grid[r].length (after r < grid.length on the outside).',
      points: 200,
    },
  },
  ...lessonAdditions,
];
