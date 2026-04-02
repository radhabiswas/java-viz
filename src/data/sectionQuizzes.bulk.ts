import type { LessonSectionQuiz, SectionQuizQuestion } from '../types';

const vis = (stepIndex: number, caption: string, lines: number[]) => ({
  stepIndex,
  caption,
  lines,
});

type QuizAuthorExtras = { reviewChapter?: string };

function mcq(
  id: string,
  prompt: string,
  options: string[],
  correctOptionIndex: number,
  explanation: string,
  stepIndex: number,
  caption: string,
  lines: number[],
  points = 22,
  extras?: QuizAuthorExtras,
): SectionQuizQuestion {
  return {
    id,
    kind: 'mcq',
    prompt,
    options,
    correctOptionIndex,
    explanation,
    points,
    visual: vis(stepIndex, caption, lines),
    ...(extras?.reviewChapter ? { reviewChapter: extras.reviewChapter } : {}),
  };
}

function fill(
  id: string,
  prompt: string,
  placeholder: string,
  acceptedAnswers: string[],
  explanation: string,
  stepIndex: number,
  caption: string,
  lines: number[],
  points = 22,
  extras?: QuizAuthorExtras,
): SectionQuizQuestion {
  return {
    id,
    kind: 'fillBlank',
    prompt,
    placeholder,
    acceptedAnswers,
    explanation,
    points,
    visual: vis(stepIndex, caption, lines),
    ...(extras?.reviewChapter ? { reviewChapter: extras.reviewChapter } : {}),
  };
}

function checkpoints(
  lessonKey: string,
  blocks: {
    title: string;
    checkpointStepIndex: number;
    questions: SectionQuizQuestion[];
  }[],
): LessonSectionQuiz[] {
  return blocks.map((b, i) => ({
    id: `sq-${lessonKey}-blk${i}`,
    title: b.title,
    checkpointStepIndex: b.checkpointStepIndex,
    questions: b.questions,
  }));
}

/**
 * Section checkpoints for all lessons (except ap-1-1 & 1-1 — kept in sectionQuizzes.ts).
 * Every question includes a memory-diagram visual anchor.
 */
export const bulkSectionQuizzes: Record<string, LessonSectionQuiz[]> = {
  '1-2': checkpoints('1-2', [
    {
      title: 'Section Check · new and heap',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-12-a',
          'After `Player p1 = new Player("Jett", maxHealth);`, where does the Player object live?',
          ['On the stack next to maxHealth', 'On the heap; p1 holds a reference', 'In the static area', 'Inside the main method frame only'],
          1,
          'Objects created with new are allocated on the heap; the stack holds references.',
          2,
          'JavaViz shows one Player box on the heap and p1 pointing at it.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Aliasing before the call',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-12-b',
          'After `Player p2 = p1;`, how many distinct Player objects do p1 and p2 refer to?',
          ['Two', 'One — both references point to the same object', 'Zero until takeDamage', 'Cannot tell from the diagram'],
          1,
            'Reference assignment copies the address; both variables refer to one object.',
          3,
          'Both stack arrows target the same heap id.',
          [5],
        ),
      ],
    },
    {
      title: 'Section Check · Mutation through either reference',
      checkpointStepIndex: 6,
      questions: [
        mcq(
          'sq-12-c',
          'After `p2.takeDamage(20)`, why does p1 see health 80?',
          [
            'takeDamage copies the object',
            'p1 and p2 refer to the same object; mutators update that shared heap state',
            'Primitives are reassigned automatically',
            'Static binding redirects p1',
          ],
          1,
          'Aliasing means there is only one object; any mutator on either reference changes that object.',
          6,
          'The heap Player’s health field reads 80; both references still aim at it.',
          [11],
        ),
      ],
    },
  ]),

  '1-3': checkpoints('1-3', [
    {
      title: 'Section Check · Two songs on the heap',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-13-a',
          'After creating track2, how many Song objects exist on the heap?',
          ['One — songs are merged', 'Two distinct Song objects', 'Zero — only references exist', 'Three including banner'],
          1,
          'Each new Song(...) allocates another object; track1 and track2 refer to different heap objects.',
          2,
          'Heap shows song1 and song2 with different titles.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Accessor returns new String',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-13-b',
          'After `String banner = track1.label();`, what does banner reference?',
          [
            'The Song object',
            'A String object built from the song’s fields — Songs stay unchanged',
            'The same reference as track2',
            'null until printed',
          ],
          1,
          'label() returns a new String; the Song’s fields are not replaced by that return.',
          3,
          'Heap adds strBanner; song1 fields unchanged.',
          [5],
        ),
      ],
    },
    {
      title: 'Section Check · Reassigning currentlyPlaying',
      checkpointStepIndex: 5,
      questions: [
        mcq(
          'sq-13-c',
          'After `currentlyPlaying = track2;`, which object is still reachable via track1?',
          ['Nothing — track1 cleared', 'The Blinding Lights song — track1 still points at song1', 'Only track2’s object', 'banner exclusively'],
          1,
          'Reassigning currentlyPlaying does not remove other references; track1 still holds song1.',
          5,
          'Diagram: track1 → song1, currentlyPlaying → song2, banner → label text.',
          [7],
        ),
      ],
    },
  ]),

  '1-4': checkpoints('1-4', [
    {
      title: 'Section Check · null reference',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-14-a',
          'When `post2` is set to null, what does the diagram show?',
          [
            'post2 still points at the same object as post1',
            'post2’s slot has no target — it does not reference any object',
            'The SocialPost object is collected',
            'post1 becomes null automatically',
          ],
          1,
          'null means “no object”; no heap object is removed unless unreachable.',
          2,
          'post2 is null; post1 still references the post.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Alias then mutate',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-14-b',
          'After post2 = post1 and post2.addLike(), the likes field is 1 because:',
          ['addLike creates a new post', 'Both references pointed at the same heap object', 'null boosted the counter', 'likes is static'],
          1,
          'Aliases refer to one object; mutators act on that single instance.',
          4,
          'One SocialPost on heap; likes increments to 1.',
          [6],
        ),
      ],
    },
    {
      title: 'Section Check · Clearing one reference',
      checkpointStepIndex: 5,
      questions: [
        mcq(
          'sq-14-c',
          'After post1 = null, can the SocialPost still be used through post2?',
          ['No — JVM deletes methods', 'Yes — post2 still references the object', 'Only if addLike runs again', 'Only from static context'],
          1,
          'One live reference is enough to keep the object reachable.',
          5,
          'post1 null, post2 → same heap object with likes == 1.',
          [7],
        ),
      ],
    },
  ]),

  '1-5': checkpoints('1-5', [
    {
      title: 'Section Check · Primitive copies from getters',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-15-a',
          '`int tag = pair1.getPrice();` stores 120 on the stack. Later reassignment of pair1 affects tag how?',
          ['tag follows pair1 automatically', 'tag stays 120 — primitives copy by value', 'tag becomes null', 'tag references the Sneaker'],
          1,
          'getPrice returns an int primitive; that value is copied into tag independently of references.',
          3,
          'Stack shows tag=120 alongside pair references.',
          [5],
        ),
      ],
    },
    {
      title: 'Section Check · boolean from instance method',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-15-b',
          'After luxe = pair2.isLuxury(), luxe is:',
          ['A reference to Sneaker', 'A primitive boolean on the stack', 'Stored inside shoe2 only', 'Always false'],
          1,
          'boolean is a primitive; the method return is copied into luxe.',
          4,
          'luxe=true on stack while heap shoes unchanged.',
          [6],
        ),
      ],
    },
    {
      title: 'Section Check · Garbage after reassignment',
      checkpointStepIndex: 5,
      questions: [
        mcq(
          'sq-15-c',
          'Why is the Nike shoe eligible for garbage collection after pair1 = pair2?',
          [
            'Adidas forced collection',
            'No remaining references point at the Nike object',
            'final fields expire',
            'getPrice returned 0',
          ],
          1,
          'Unreachable objects (zero references) may be collected.',
          5,
          'Diagram marks Nike as garbage; both pair variables reference Adidas.',
          [7],
        ),
      ],
    },
  ]),

  '4-1': checkpoints('4-1', [
    {
      title: 'Section Check · Static vs instance storage',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-41-a',
          'Where does JavaViz place the static field count for Fraction?',
          ['On every object’s copy', 'In the static area for the class', 'Only on the stack', 'Inside main'],
          1,
          'Static fields have one shared location associated with the class, not per instance.',
          1,
          'staticArea holds Fraction.count.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Instance fields',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-41-b',
          'numer and denom in the diagram represent:',
          ['Class-level shared slots', 'Per-object state on each Fraction instance', 'Local variables', 'Constants in static area'],
          1,
          'Instance variables define per-object state stored inside each instance.',
          2,
          'Highlights show instance variable declarations.',
          [5],
        ),
      ],
    },
    {
      title: 'Section Check · Instance method and this',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-41-c',
          'getNumer reads numer for “the current object”. That binding is expressed as:',
          ['Static lookup', 'Implicit this on the receiver object', 'Global namespace', 'new keyword'],
          1,
          'Instance methods run on an object; this refers to that receiver.',
          4,
          'Accessor lines tie to implicit this on a Fraction instance.',
          [16],
        ),
      ],
    },
  ]),

  '4-2': checkpoints('4-2', [
    {
      title: 'Section Check · Constructor parameters as locals',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-42-a',
          'Inside Student(String studentName, int initialGrade), studentName and initialGrade on the stack are:',
          ['Aliases of Main’s variables', 'Parameter slots holding copies of argument values', 'Heap fields already', 'Static'],
          1,
          'Parameters are local variables initialized from copies of the argument values.',
          2,
          'Stack shows studentName ref and initialGrade int during construction.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Fields after this assign',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-42-b',
          'After name = studentName and grade = initialGrade, the new Student object’s fields show Alice because:',
          ['Parameters moved to heap literally', 'Field slots received copied values/references from parameters', 'String literals clone themselves', 'Main wrote directly'],
          1,
          'Assignments copy from parameter locals into the object’s instance fields.',
          3,
          'Heap Student shows name and grade initialized.',
          [5],
        ),
      ],
    },
    {
      title: 'Section Check · study() mutates receiver',
      checkpointStepIndex: 6,
      questions: [
        mcq(
          'sq-42-c',
          'After s1.study(), grade becomes 90. The diagram ties that update to:',
          ['A new Student object', 'The same object s1 references (this inside study)', 'Main’s stack only', 'String pooling'],
          1,
          'Instance methods mutate the receiver object’s fields via this.',
          6,
          'Single Student on heap; grade field increased.',
          [9],
        ),
      ],
    },
  ]),

  '5-1': checkpoints('5-1', [
    {
      title: 'Section Check · Parameter amount',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-51-a',
          'Inside add(10), amount on the stack holds:',
          ['A reference to calc', 'A copy of the int 10', 'The old total', 'Static storage'],
          1,
          'Primitives are passed by value; the parameter receives a copy.',
          3,
          'Stack frame shows amount = 10 beside calc reference.',
          [7],
        ),
      ],
    },
    {
      title: 'Section Check · Locals vanish',
      checkpointStepIndex: 6,
      questions: [
        mcq(
          'sq-51-b',
          'After add returns, which variables disappear from the stack diagram?',
          ['calc and total on the object', 'Locals amount and temp for that method only', 'All stack entries', 'Nothing'],
          1,
          'Method locals are destroyed when the frame ends; the object’s fields persist.',
          6,
          'Diagram drops amount/temp; heap total stays updated.',
          [10],
        ),
      ],
    },
    {
      title: 'Section Check · Return value into Main',
      checkpointStepIndex: 7,
      questions: [
        mcq(
          'sq-51-c',
          '`int result = calc.getTotal();` places the returned int:',
          ['Inside the Calculator object only', 'In Main’s result local — a primitive copy', 'On the heap as Integer', 'Into static area'],
          1,
          'Return values copy into the caller’s receiving variable.',
          7,
          'Main stack shows result beside calc reference.',
          [4],
        ),
      ],
    },
  ]),

  '5-2': checkpoints('5-2', [
    {
      title: 'Section Check · Static call frame',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-52-a',
          'Inside square(5), why is there no this parameter shown?',
          ['this is hidden as null', 'Static methods are not tied to an instance', 'square is private', 'Compiler error'],
          1,
          'Static methods belong to the class; no receiver object exists.',
          2,
          'Only num appears on the stack inside square.',
          [13],
        ),
      ],
    },
    {
      title: 'Section Check · Instance method this',
      checkpointStepIndex: 7,
      questions: [
        mcq(
          'sq-52-b',
          'During multiply(2), reading value uses:',
          ['The utils reference’s object — implicit this', 'MathUtils class name only', 'Static count', 'argument factor alone'],
          1,
          'Instance methods resolve fields on the object the method was invoked on.',
          7,
          'Stack shows utils and factor; heap object supplies value.',
          [8],
        ),
      ],
    },
    {
      title: 'Section Check · After both calls',
      checkpointStepIndex: 9,
      questions: [
        mcq(
          'sq-52-c',
          'After static square and instance multiply, sq and result represent:',
          ['Heap objects', 'Primitive locals in Main holding 25 and 20', 'Method parameters still alive', 'Static fields'],
          1,
          'Primitives returned from methods are stored in Main’s locals.',
          9,
          'Main stack: sq=25, result=20, utils→heap MathUtils.',
          [7],
        ),
      ],
    },
  ]),

  '6-1': checkpoints('6-1', [
    {
      title: 'Section Check · Array reference',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-61-a',
          '`int[] scores` on the stack holds:',
          ['The three ints inline', 'A reference to an array object on the heap', 'Static pool', 'Nothing until assignment'],
          1,
          'Arrays are heap objects referenced from the stack.',
          1,
          'scores → int[] with slots [0]..[2].',
          [0],
        ),
      ],
    },
    {
      title: 'Section Check · Default initialization',
      checkpointStepIndex: 1,
      questions: [
        fill(
          'sq-61-b',
          'New int[3] cells start at [blank] before explicit assignments.',
          'value',
          ['0'],
          'Numeric array elements default to zero.',
          1,
            'Heap slots show 0 before writes.',
          [0],
        ),
      ],
    },
    {
      title: 'Section Check · After fills',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-61-c',
          'After all three assignments, the array object contains:',
          ['All zeros', '95, 88, 100 in indices 0..2', 'References only', 'One combined int'],
          1,
          'Each index stores the written primitive.',
          4,
          'Heap array fields show final grades.',
          [3],
        ),
      ],
    },
  ]),

  '10-1': checkpoints('10-1', [
    {
      title: 'Section Check · Stack growth',
      checkpointStepIndex: 6,
      questions: [
        mcq(
          'sq-101-a',
          'At the deepest recursion (fact(0) frame on top), what stopped further calls?',
          ['Loop exit', 'Base case n == 0 returning 1', 'Stack underflow', 'void return'],
          1,
          'Base cases halt recursion; here n reaches 0.',
          6,
          'Call stack shows fact(0) as innermost frame.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Unwinding',
      checkpointStepIndex: 10,
      questions: [
        mcq(
          'sq-101-b',
          'When frames pop during returns, where do intermediate products like 4×6 get combined?',
          ['In static memory', 'In outer frames as they resume after inner returns', 'On the heap', 'Discarded'],
          1,
          'Each caller multiplies its n with the returned value from the callee.',
          10,
          'Stack shrinks to fact(4) computing 4×6.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Final result',
      checkpointStepIndex: 11,
      questions: [
        fill(
          'sq-101-c',
          'fact(5) returns [blank] to the original caller.',
          'number',
          ['120'],
          '5! = 120.',
          11,
          'Top frame shows completion with factorial result.',
          [2],
        ),
      ],
    },
  ]),

  '2-1': checkpoints('2-1', [
    {
      title: 'Section Check · Loop locals on stack',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-21-a',
          'When the loop begins, which variables occupy stack slots in the diagram?',
          ['Only sum', 'sum and loop index i', 'Heap iterator', 'Static counters'],
          1,
          'Loop variables declared in the for header are locals like any others while the loop runs.',
          2,
          'Stack shows sum=0, i=1.',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · Accumulator update',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-21-b',
          'After first iteration sum += i, sum equals:',
          ['0', '1', '3', '6'],
          1,
          'i is 1 on the first body execution; sum becomes 1.',
          3,
          'Memory shows sum updated while i still 1.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Scope after loop',
      checkpointStepIndex: 8,
      questions: [
        mcq(
          'sq-21-c',
          'When the loop exits, the diagram drops i but keeps sum because:',
          ['i is loop-scoped; sum declared outside the loop', 'Both are deleted', 'i moves to heap', 'Compiler error'],
          1,
          'for-loop index variables are only in scope inside the loop.',
          8,
          'Final stack shows sum=6 without i.',
          [1],
        ),
      ],
    },
  ]),

  '2-2': checkpoints('2-2', [
    {
      title: 'Section Check · += rewrites the slot',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-22-a',
          'After total += 5 with total starting at 10, the stack slot for total holds:',
          ['10 still', '15 — same variable, updated value', 'Two totals', 'A new reference'],
          1,
          'Compound assignment reads and writes the same primitive variable.',
          2,
          'single total entry shows 15.',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · Post-increment',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-22-b',
          'After total++; the diagram’s total value is:',
          ['15', '16', 'undefined', '5'],
          1,
          'Post-increment adds one to the stored primitive.',
          3,
          'total primitive becomes 16.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · *= on another local',
      checkpointStepIndex: 5,
      questions: [
        mcq(
          'sq-22-c',
          'scale *= 3 with scale==4 leaves scale as:',
          ['4', '7', '12', '12.0'],
          2,
          'Multiplication-assignment updates the int local to 12.',
          5,
          'scale slot reads 12 beside total.',
          [4],
        ),
      ],
    },
  ]),

  '4-3': checkpoints('4-3', [
    {
      title: 'Section Check · Empty list object',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-43-a',
          'new ArrayList<>() allocates:',
          ['A stack array of Strings', 'A heap ArrayList object referenced by list', 'Static pool', 'null'],
          1,
          'Collections are heap objects like any other reference type.',
          1,
          'list → ArrayList with size 0.',
          [0],
        ),
      ],
    },
    {
      title: 'Section Check · add stores reference',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-43-b',
          'After add("Apple"), the internal slot [0] stores:',
          ['The char data inline', 'A reference to a String object on the heap', 'int hash only', 'Copies of all future fruits'],
          1,
          'ArrayList elements for reference types hold references to heap objects.',
          2,
          'Heap: ArrayList slot points at String "Apple".',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · Second element',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-43-c',
          'After add("Banana"), size in the diagram reflects:',
          ['1', '2', '0', 'depends on GC'],
          1,
          'Each successful add increments logical size.',
          3,
          'ArrayList size=2 with two string refs.',
          [2],
        ),
      ],
    },
  ]),

  '4-4': checkpoints('4-4', [
    {
      title: 'Section Check · data and target',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-44-a',
          'The int[] data lives where in the diagram?',
          ['Entirely on stack', 'Heap object referenced from stack', 'Static only', 'Inside the loop variable'],
          1,
          'Arrays are heap objects; the stack holds the array reference and scalar locals.',
          1,
          'data arrow → int[] with values.',
          [0],
        ),
      ],
    },
    {
      title: 'Section Check · Search progress',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-44-b',
          'When i reaches the index where data[i] == target, idx becomes:',
          ['-1 always', 'That index i', 'length', 'target'],
          1,
          'Sequential search records the index on match.',
          3,
            'Stack shows idx updated while i scans.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Final idx',
      checkpointStepIndex: 4,
      questions: [
        fill(
          'sq-44-c',
          'For target 9 in {4,9,2}, idx ends at [blank].',
          'index',
          ['1'],
          '9 is at index 1.',
          4,
          'Final locals show idx=1.',
          [5],
        ),
      ],
    },
  ]),

  'ap-3-1': checkpoints('ap-3-1', [
    {
      title: 'Section Check · Relational to boolean',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a31-a',
          '`boolean passed = score >= 70;` stores what when score is 82?',
          ['false', 'true', '82', 'null'],
          1,
          'Relational operators yield boolean results.',
          2,
          'Stack shows passed=true and score=82.',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · Compound condition',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a31-b',
          'passed && score < 90 with the diagram’s values evaluates to:',
          ['false', 'true', '82', 'compile error'],
          1,
          'Both conjuncts true here, so AND is true.',
          3,
          'Condition true before body runs.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Mutation in branch',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-a31-c',
          'After score += 5 inside the if, the stack shows score as:',
          ['82', '87', '90', 'unchanged passed'],
          1,
          'The int local updates in place.',
          4,
          'score primitive becomes 87.',
          [3],
        ),
      ],
    },
  ]),

  'ap-3-2': checkpoints('ap-3-2', [
    {
      title: 'Section Check · Literal interning',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a32-a',
          'String b = "hi"; after a already pointed at a "hi" literal, a == b often shows:',
          ['Always false', 'true when both reference the same pooled literal object', 'Compile error', 'null'],
          1,
          'String literals may share one interned object; == then compares references that match.',
          2,
          'Diagram: a and b arrows aim at one String object.',
          [3],
        ),
      ],
    },
    {
      title: 'Section Check · new String',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a32-b',
          '`String c = new String("hi");` compared to a means a == c is usually:',
          ['true — same text', 'false — different heap objects', 'illegal', 'always null'],
          1,
          'new creates a distinct object even with identical characters.',
          3,
          'Heap shows two String objects for "hi".',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · equals',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-a32-c',
          'a.equals(c) when both represent "hi" is:',
          ['false', 'true — character content matches', 'random', 'only true if =='],
          1,
          'Use equals to compare sequence values, not reference identity.',
          4,
          'Different refs can still be equals in text.',
          [8],
        ),
      ],
    },
  ]),

  'ap-2-1': checkpoints('ap-2-1', [
    {
      title: 'Section Check · Immutable receiver',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a21-a',
          'After upper = name.toUpperCase(), the original String referenced by name:',
          ['Becomes "JAVA"', 'Unchanged — new String for upper', 'null', 'Moves to stack'],
          1,
          'String methods like toUpperCase return new Strings; receivers stay the same.',
          2,
          'Heap: strName still "java", strUpper new.',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · length primitive',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a21-b',
          'len stores:',
          ['A String reference', 'An int primitive length', 'char', 'boolean'],
          1,
          'length() returns int.',
          3,
          'Stack len=4 beside string refs.',
          [2],
        ),
      ],
    },
  ]),

  'ap-4-1': checkpoints('ap-4-1', [
    {
      title: 'Section Check · Accumulator pattern',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a41-a',
          'After the while loop, total equals the sum of n values visited because:',
          ['n never changed', 'total += n ran while n>0 with n decrementing', 'while runs once', 'static helper'],
          1,
          'Loop adds each positive n then decrements until n==0.',
          3,
          'Final stack: total=6, n=0.',
          [3],
        ),
      ],
    },
    {
      title: 'Section Check · Guard',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a41-b',
          'Initially n=3 and total=0. First test n > 0 is:',
          ['false', 'true', 'undefined', 'error'],
          1,
          'Loop enters when condition is true.',
          2,
          'Memory before body shows n=3, total=0.',
          [2],
        ),
      ],
    },
  ]),

  'ap-5-1': checkpoints('ap-5-1', [
    {
      title: 'Section Check · Constructor effect',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a51-a',
          'new BankAccount(100) leaves balance on the heap object as:',
          ['0', '100', 'null', '125'],
          1,
          'Constructor initializes instance state from start argument.',
          1,
          'acct → BankAccount balance 100.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Mutator',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a51-b',
          'After deposit(25), balance becomes:',
          ['100', '125', '25', 'unchanged'],
          1,
          'Mutator adds to instance field.',
          2,
          'Heap balance 125.',
          [3],
        ),
      ],
    },
    {
      title: 'Section Check · Accessor copy',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a51-c',
          'int b = acct.getBalance(); copies:',
          ['The BankAccount reference', 'Primitive 125 into b', 'double', 'String'],
          1,
          'Accessor returns int by value into caller local.',
          3,
          'Stack b=125 next to acct ref.',
          [4],
        ),
      ],
    },
  ]),

  'ap-6-1': checkpoints('ap-6-1', [
    {
      title: 'Section Check · length vs field',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a61-a',
          'scores.length for the diagram array is:',
          ['2', '3', '70', 'scores[0]'],
          1,
          'Three elements → length 3.',
          1,
          'int[] shows three slots.',
          [0],
        ),
      ],
    },
    {
      title: 'Section Check · Traversal sum',
      checkpointStepIndex: 8,
      questions: [
        mcq(
          'sq-a61-b',
          '70+85+90 equals',
          ['235', '245', '225', '255'],
          1,
          'Accumulator adds all elements.',
          8,
          'sum primitive shows 245 with array unchanged.',
          [3],
        ),
      ],
    },
  ]),

  'ap-7-1': checkpoints('ap-7-1', [
    {
      title: 'Section Check · set does not add',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a71-a',
          'After set(1, "Bo"), list size:',
          ['Stays 2 — replacement', 'Becomes 3', 'Drops to 1', 'undefined'],
          1,
          'set replaces an element at valid index without growing count.',
          3,
          'ArrayList size=2, index1 updated.',
          [3],
        ),
      ],
    },
    {
      title: 'Section Check · remove shifts',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-a71-b',
          'remove(0) on ["Ava","Bo"] yields conceptual storage:',
          ['["Ava","Bo"]', '["Bo"] with size 1', '[]', 'null list'],
          1,
          'Front removal shifts remaining element.',
          4,
          'Diagram size 1, [0]=Bo.',
          [4],
        ),
      ],
    },
  ]),

  'ap-8-1': checkpoints('ap-8-1', [
    {
      title: 'Section Check · Row arrays',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a81-a',
          'grid in the diagram references:',
          ['One flat int[]', 'int[][] whose rows are separate int[] objects', 'Stack matrix', 'static grid'],
          1,
          '2D arrays are arrays of row arrays.',
          1,
            'Heap shows grid2d pointing at row0 and row1.',
          [0],
        ),
      ],
    },
    {
      title: 'Section Check · Row-major sum',
      checkpointStepIndex: 6,
      questions: [
        mcq(
          'sq-a81-b',
          '1+2+3+4 totals',
          ['9', '10', '12', '16'],
          1,
          'Row-major visits every cell once.',
          6,
          'total primitive becomes 10.',
          [7],
        ),
      ],
    },
  ]),

  'ap-9-1': checkpoints('ap-9-1', [
    {
      title: 'Section Check · Widening reference',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a91-a',
          'Vehicle v = new Car(); the heap object’s actual type is:',
          ['Vehicle only', 'Car — a subclass instance', 'Object unused', 'interface'],
          1,
          'new determines runtime class; variable type is the declared reference type.',
          1,
            'Heap className Car; v references it.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Dynamic dispatch',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a91-b',
          'v.move() here runs:',
          ['Vehicle.move', 'Car.move override', 'static Vehicle helper', 'fails compile'],
          1,
          'Runtime type selects overriding implementation.',
          2,
          'msg String shows "Car drives" from Car.move.',
          [3],
        ),
      ],
    },
  ]),

  'ap-10-1': checkpoints('ap-10-1', [
    {
      title: 'Section Check · Base frame',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-a101-a',
          'sumTo(1) returns immediately because:',
          ['n==1 base case', 'stack overflow', 'void', 'missing return'],
          1,
          'Recursion stops when the base condition fires.',
          4,
          'Innermost frame sumTo(1).',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · Recursive decomposition',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a101-b',
          'sumTo(4) first pushes then waits on:',
          ['sumTo(5)', 'sumTo(3)', 'sumTo(0)', 'IO'],
          1,
          'Recursive line returns n + sumTo(n-1).',
          2,
          'Stack shows sumTo(4) over sumTo(3).',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Closed form',
      checkpointStepIndex: 8,
      questions: [
        fill(
          'sq-a101-c',
          'sumTo(4) returns [blank] (1+2+3+4).',
          'sum',
          ['10'],
          'Triangular sum.',
          8,
          'Top frame completes with 10.',
          [4],
        ),
      ],
    },
  ]),

  '6-lib-arraylist': checkpoints('6-lib-arraylist', [
    {
      title: 'Section Check · API shape',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-lib-al-a',
          'nums.get(0) after two adds reads:',
          ['20', '10', 'size', 'error'],
          1,
          'Index 0 is first element.',
          1,
          'Diagram shows x=10 from first slot.',
          [8],
        ),
      ],
    },
    {
      title: 'Section Check · Interface variable',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-lib-al-b',
          '`List<String> words = new ArrayList<>();` — the heap object is:',
          ['Interface List', 'Concrete ArrayList instance', 'String', 'null'],
          1,
          'The runtime object is the constructed class; the variable type is interface.',
          3,
          'words → ArrayList backing storage.',
          [17],
        ),
      ],
    },
  ]),

  '6-lib-string': checkpoints('6-lib-string', [
    {
      title: 'Section Check · substring bounds',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-lib-st-a',
          'substring(1, 4) on "abcdef" yields length:',
          ['4', '3', '6', '1'],
          1,
          'End index exclusive → three characters.',
          1,
          'piece references "bcd" on heap.',
          [8],
        ),
      ],
    },
    {
      title: 'Section Check · equals vs content',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-lib-st-b',
          'text.equals("abcdef") compares:',
          ['Reference identity only', 'Character sequence', 'memory addresses of locals', 'hash of stack'],
          1,
          'equals checks value equality for String.',
          1,
          'ok primitive true in diagram.',
          [8],
        ),
      ],
    },
  ]),

  '6-lib-math': checkpoints('6-lib-math', [
    {
      title: 'Section Check · Static Math',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-lib-m-a',
          'Math.pow(2,4) in the diagram contributes which primitive to the stack view?',
          ['2', '4', '16', 'double only error'],
          2,
          'pow returns double; here shown as 16 in teaching snapshot.',
          1,
          'pow slot equals 16 among Math locals.',
          [9],
        ),
      ],
    },
    {
      title: 'Section Check · parseInt',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-lib-m-b',
          'Integer.parseInt("100") produces:',
          ['String "100"', 'int 100 on stack', 'double', 'Boolean'],
          1,
          'Parsing decodes text to primitive int.',
          2,
          'fromStr primitive 100.',
          [15],
        ),
      ],
    },
  ]),

  '6-lib-2d': checkpoints('6-lib-2d', [
    {
      title: 'Section Check · Row sum',
      checkpointStepIndex: 4,
      questions: [
        mcq(
          'sq-lib-2d-a',
          'The nested loops sum all entries to:',
          ['15', '21', '18', '6'],
          1,
          '1..6 totals 21.',
          4,
            'total=21 next to m reference.',
          [6],
        ),
      ],
    },
    /** second checkpoint: repeat row-major concept with fill */
    {
      title: 'Section Check · Inner bound',
      checkpointStepIndex: 2,
      questions: [
        fill(
          'sq-lib-2d-b',
          'Inner loop uses c < m[r].[blank]',
          'property',
          ['length'],
          'Each row array has its own length.',
          2,
          'Traversal bound tied to m[r].length.',
          [5],
        ),
      ],
    },
  ]),

  'ap-0-1': checkpoints('ap-0-1', [
    {
      title: 'Section Check · Entry point',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a01-a',
          'After `int x = 42`, where does JavaViz show 42?',
          ['Heap String', 'Primitive slot for x on stack', 'static area', 'Inside println'],
          1,
          'Local int lives on the stack.',
          2,
          'Stack holds x=42.',
          [3],
        ),
      ],
    },
    {
      title: 'Section Check · println types',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a01-b',
          'println(x) prints the variable’s value without quotes because:',
          ['x is String', 'x is int — decimal form', 'println drops numbers', 'error'],
          1,
          'Primitives print as their textual number form.',
          3,
          'Compare to quoted "Hello" earlier.',
          [4],
        ),
      ],
    },
  ]),

  'ap-0-2': checkpoints('ap-0-2', [
    {
      title: 'Section Check · Scanner on heap',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a02-a',
          '`in` after `new Scanner` refers to:',
          ['System.in directly', 'A Scanner object on the heap', 'int on stack', 'null'],
          1,
          'Reference variable → heap object.',
          1,
          'Diagram: in → sc1.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · nextInt copy',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a02-b',
          'age after nextInt holds:',
          ['Scanner reference', 'Primitive int parsed from stream', 'String', 'void'],
          1,
          'Parsing returns a primitive copied into age.',
          2,
          'age=16 snapshot.',
          [5],
        ),
      ],
    },
  ]),

  'ap-3-3': checkpoints('ap-3-3', [
    {
      title: 'Section Check · && short-circuit',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a33-a',
          'With x==0, (x != 0) && (…) evaluates the right side?',
          ['Yes always', 'No — left false stops &&', 'Only on Thursday', 'Compiler removes'],
          1,
          'False && … does not evaluate …. ',
          2,
          'leftGuard false without divide.',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · || short-circuit',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a33-b',
          'With x==0, (x == 0) || (…) evaluates the right side?',
          ['Yes', 'No — left true stops ||', 'Random', 'Error'],
          1,
          'True || … skips …. ',
          3,
          'rightOr true, divide skipped.',
          [2],
        ),
      ],
    },
  ]),

  'ap-3-4': checkpoints('ap-3-4', [
    {
      title: 'Section Check · Truth stack',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-a34-a',
          '!(p && q) with p=true, q=false yields:',
          ['false', 'true', 'q', 'null'],
          1,
          '(true && false) is false; negation is true.',
          2,
          'dem1 true on stack.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · De Morgan equality',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a34-b',
          'dem2 = !p || !q matches dem1 because:',
          ['Luck', 'De Morgan equivalence', 'ints differ', 'Strings match'],
          1,
          'Same boolean value for these inputs.',
          3,
          'both boolean results true.',
          [3],
        ),
      ],
    },
  ]),

  '2-3': checkpoints('2-3', [
    {
      title: 'Section Check · Nested indices',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-23-a',
          'Outer i and inner j are both:',
          ['Heap fields', 'Stack locals in nested scopes', 'static', 'String'],
          1,
          'Loop indices are method locals.',
          2,
          'i and j on stack.',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · Product of bounds',
      checkpointStepIndex: 4,
      questions: [
        fill(
          'sq-23-b',
          '2 outer × 3 inner iterations ⇒ total increments = [blank].',
          'n',
          ['6'],
          'Multiply iterations.',
          4,
          'total=6 final.',
          [1],
        ),
      ],
    },
  ]),

  '5-3': checkpoints('5-3', [
    {
      title: 'Section Check · Shadowing',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-53-a',
          'Inside setValue(int value), unqualified `value` usually means:',
          ['The instance field', 'The int parameter local', 'this', 'static'],
          1,
          'Parameter hides field name in its block.',
          2,
          'parameter slot value=3.',
          [9],
        ),
      ],
    },
    {
      title: 'Section Check · Field write',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-53-b',
          '`this.value = value` copies into:',
          ['The parameter only', 'The heap object’s value field', 'Main’s v', 'String pool'],
          1,
          'this selects instance storage.',
          3,
          'ctr1 field becomes 3.',
          [10],
        ),
      ],
    },
  ]),

  '4-5': checkpoints('4-5', [
    {
      title: 'Section Check · Bounds',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-45-a',
          'Initial mid = (lo+hi)/2 for lo=0 hi=4:',
          ['1', '2', '4', '12'],
          1,
          'Integer division: 4/2=2.',
          1,
          'mid=2 points at 7.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Discard half',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-45-b',
          'When sorted[mid] < target, you raise:',
          ['hi', 'lo to mid+1', 'target', 'array length'],
          1,
          'Search right half.',
          2,
          'lo becomes 3.',
          [6],
        ),
      ],
    },
  ]),

  '4-6': checkpoints('4-6', [
    {
      title: 'Section Check · min index',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-46-a',
          'After j=1 with i=0 in {5,2,9,1,8}, minIdx is:',
          ['0', '1', '2', '3'],
          1,
          '2 < 5 updates minIdx to index 1.',
          2,
          'minIdx=1.',
          [3],
        ),
      ],
    },
    {
      title: 'Section Check · Swap effect',
      checkpointStepIndex: 6,
      questions: [
        mcq(
          'sq-46-b',
          'After first outer pass swap, [0] holds:',
          ['5', '2', '1', '8'],
          2,
          'Minimum (1) moved to index 0.',
          6,
          'array {1,2,9,5,8}.',
          [9],
        ),
      ],
    },
  ]),

  '4-7': checkpoints('4-7', [
    {
      title: 'Section Check · Key local',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-47-a',
          'key = a[i] copies:',
          ['The array reference', 'Primitive from slot i', 'j', 'void'],
          1,
          'Primitives copy by value.',
          2,
          'key=2 snapshot.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · Sorted prefix',
      checkpointStepIndex: 5,
      questions: [
        mcq(
          'sq-47-b',
          'After i=1 pass, array begins:',
          ['{5,2,8,1,4}', '{2,5,8,1,4}', '{2,5,5,8,4}', '{}'],
          1,
          '2 inserted before 5; rest unchanged.',
          5,
          'heap after first insert.',
          [8],
        ),
      ],
    },
  ]),

  '4-8': checkpoints('4-8', [
    {
      title: 'Section Check · No index var',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-48-a',
          'Enhanced for exposes:',
          ['Index i only', 'Element values into s', 'The array length field', 'References only'],
          1,
          'Each iteration binds s to next element.',
          3,
          's primitive copy from array.',
          [2],
          22,
          { reviewChapter: '2 · Control flow' },
        ),
      ],
    },
    {
      title: 'Section Check · Sum result',
      checkpointStepIndex: 8,
      questions: [
        fill(
          'sq-48-b',
          '10+20+30 = [blank].',
          'n',
          ['60'],
          'Accumulator over all elements.',
          8,
          'sum=60.',
          [3],
          22,
          { reviewChapter: '2 · Control flow' },
        ),
      ],
    },
  ]),

  'ap-9-2': checkpoints('ap-9-2', [
    {
      title: 'Section Check · Two objects',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a92-a',
          'Heap shows two Point nodes — references a and b:',
          ['Must be ==', 'Point at different ids', 'Share always', 'Are null'],
          1,
          'Distinct new objects in teaching story.',
          1,
          'ptA vs ptB.',
          [2],
        ),
      ],
    },
    {
      title: 'Section Check · equals vs ==',
      checkpointStepIndex: 3,
      questions: [
        mcq(
          'sq-a92-b',
          'same is true but refs false means:',
          ['Bug', 'equals matches fields; == compares references', 'GC issue', 'static'],
          1,
          'Value vs identity distinction.',
          3,
          'booleans on stack.',
          [5],
        ),
      ],
    },
  ]),

  'ap-10-2': checkpoints('ap-10-2', [
    {
      title: 'Section Check · First probe',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a102-a',
          'For lo=0 and hi=6, mid = (lo+hi)/2 equals:',
          ['2', '3', '4', '6'],
          1,
          'Integer division: (0+6)/2 = 3.',
          1,
          'compare a[3]=10 to target 11.',
          [12],
        ),
      ],
    },
    {
      title: 'Section Check · Missing value',
      checkpointStepIndex: 7,
      questions: [
        mcq(
          'sq-a102-b',
          'When lo > hi, the method returns:',
          ['mid', '-1', 'hi', 'lo'],
          1,
          'Empty index range — classic “not found” sentinel.',
          7,
          'base case before unwind.',
          [2],
        ),
      ],
    },
  ]),

  'ap-10-2-found': checkpoints('ap-10-2-found', [
    {
      title: 'Section Check · Narrowing to the hit',
      checkpointStepIndex: 5,
      questions: [
        mcq(
          'sq-a102f-a',
          'At lo=4, hi=4, mid probes index:',
          ['3', '4', '5', '6'],
          1,
          'Collapsed range: (4+4)/2 = 4.',
          5,
          'call 3 — equality check.',
          [6],
        ),
      ],
    },
    {
      title: 'Section Check · Return value',
      checkpointStepIndex: 7,
      questions: [
        mcq(
          'sq-a102f-b',
          'After a successful match, the method returns to the caller:',
          ['-1', 'mid (the index)', 'target value only', 'array length'],
          1,
          'Success branch: return the index where a[mid] matched.',
          7,
          'unwind with index 4.',
          [10],
        ),
      ],
    },
  ]),

  'ap-10-3': checkpoints('ap-10-3', [
    {
      title: 'Section Check · Output buffer',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-a103-a',
          'out[k++] writes into:',
          ['left array', 'new heap int[]', 'Scanner', 'static'],
          1,
          'Merge destination array.',
          1,
          'arrOut slots.',
          [1],
        ),
      ],
    },
    {
      title: 'Section Check · Merge outcome',
      checkpointStepIndex: 9,
      questions: [
        mcq(
          'sq-a103-b',
          'After merging {1,3,6,10} and {2,4,5,12}, out ends as:',
          ['{1,3,6,10,2,4,5,12}', '{1,2,3,4,5,6,10,12}', '{12,10,6,5,4,3,2,1}', '{1,1,2,2,3,3,4,4}'],
          1,
          'Always pick the smaller front until one side is empty, then drain the other.',
          9,
          'out fully filled.',
          [14],
        ),
      ],
    },
  ]),

  '6-lib-scanner': checkpoints('6-lib-scanner', [
    {
      title: 'Section Check · String source',
      checkpointStepIndex: 1,
      questions: [
        mcq(
          'sq-lib-sc-a',
          'Scanner wraps:',
          ['Only System.in', 'A CharSequence / readable source — here a String literal', 'int[]', 'Thread'],
          1,
          'Flexible input abstraction.',
          1,
          'Scanner → string source.',
          [4],
        ),
      ],
    },
    {
      title: 'Section Check · Tokens',
      checkpointStepIndex: 2,
      questions: [
        mcq(
          'sq-lib-sc-b',
          '`w` after ints references:',
          ['8', '15', 'String "done"', 'null'],
          2,
          'next() returns next token as String.',
          2,
          'strW on heap.',
          [7],
        ),
      ],
    },
  ]),
};
