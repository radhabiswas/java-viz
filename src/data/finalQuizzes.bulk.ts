import type { LessonFinalQuiz, SectionQuizQuestion } from '../types';

const V = (stepIndex: number, caption: string, lines: number[]) => ({
  stepIndex,
  caption,
  lines,
});

type QuizAuthorExtras = { reviewChapter?: string };

function cap(id: string, title: string, questions: SectionQuizQuestion[]): LessonFinalQuiz {
  return { id, title, questions };
}

function mcq(
  id: string,
  prompt: string,
  options: string[],
  a: number,
  ex: string,
  vi: number,
  vc: string,
  vl: number[],
  pts = 12,
  extras?: QuizAuthorExtras,
): SectionQuizQuestion {
  return {
    id,
    kind: 'mcq',
    prompt,
    options,
    correctOptionIndex: a,
    explanation: ex,
    points: pts,
    visual: V(vi, vc, vl),
    ...(extras?.reviewChapter ? { reviewChapter: extras.reviewChapter } : {}),
  };
}

function fill(
  id: string,
  prompt: string,
  ph: string,
  ans: string[],
  ex: string,
  vi: number,
  vc: string,
  vl: number[],
  pts = 12,
  extras?: QuizAuthorExtras,
): SectionQuizQuestion {
  return {
    id,
    kind: 'fillBlank',
    prompt,
    placeholder: ph,
    acceptedAnswers: ans,
    explanation: ex,
    points: pts,
    visual: V(vi, vc, vl),
    ...(extras?.reviewChapter ? { reviewChapter: extras.reviewChapter } : {}),
  };
}

/** End-of-lesson capstones: every item ties to a memory / call-stack step. */
export const bulkFinalQuizzes: Record<string, LessonFinalQuiz> = {
  '1-2': cap('final-1-2', 'Lesson review · Aliasing & mutators', [
    mcq('f12-1', 'p1 and p2 refer to one Player. takeDamage affects p1 because?', ['Different objects', 'Shared heap object', 'Static binding', 'String pool'], 1, 'Aliases see the same instance state.', 3, 'Two stack refs, one heap Player.', [5], 14),
    mcq('f12-2', 'maxHealth is a primitive beside references — it stores:', ['An address', 'The int 100 directly', 'The Player', 'null'], 1, 'Primitives hold values in their stack slots.', 1, 'maxHealth sits on the stack.', [3], 12),
    mcq('f12-3', 'Pass-by-value for the int argument 20 means amount holds:', ['Reference to 20', 'Copy of 20', 'Player ref', 'void'], 1, 'Parameters copy primitive bits.', 5, 'amount is its own int slot.', [10], 12),
    fill('f12-4', 'After damage, health on the heap reads [blank].', 'value', ['80'], '100−20 with floor at 0.', 6, 'health field updated on shared object.', [11], 12),
    mcq('f12-5', 'Could p1 see health 80 if p2 pointed at a different object?', ['Always yes', 'No — only if they share the target', 'Only if static', 'Random'], 1, 'Different objects have independent fields.', 3, 'Aliasing is what couples views.', [5], 12),
    mcq('f12-6', 'The receiver for takeDamage in the diagram is passed as:', ['Explicit String', 'Hidden this referencing the Player', 'static void', 'new'], 1, 'Instance calls bind this to the object.', 4, 'Parameter-passing card shows this → p2.', [6], 14),
  ]),

  '1-3': cap('final-1-3', 'Lesson review · Methods & references', [
    mcq('f13-1', 'label() returns a String; the Song object fields:', ['Are replaced by banner', 'Stay unchanged — new String on heap', 'Become null', 'Move to stack'], 1, 'Immutable pattern: new return value.', 3, 'strBanner appears; songs unchanged.', [5], 14),
    mcq('f13-2', 'track1 and track2 reference:', ['The same Song', 'Different heap Song objects', 'stack copies', 'static'], 1, 'Two constructors → two objects.', 2, 'song1 vs song2 on heap.', [4], 12),
    mcq('f13-3', 'currentlyPlaying = track2 changes:', ['song1 contents', 'Which reference currentlyPlaying points at', 'track1 to null', 'artist field'], 1, 'References are reassigned independently.', 5, 'Pointer moves to song2.', [7], 12),
    fill('f13-4', 'banner’s type on the stack is a reference to [blank].', 'type', ['string', 'String'], 'String is a reference type holding text object.', 3, 'banner slot references strBanner.', [5], 10),
    mcq('f13-5', 'Calling label() uses which implicit receiver?', ['Main', 'The Song whose method runs', 'String class', 'banner'], 1, 'Instance method runs on the object before the dot.', 3, 'track1 was the call target.', [5], 12),
    mcq('f13-6', 'If track1 were set null but track2 still references song2, song2:', ['Is collected', 'Stays reachable', 'Moves static', 'Duplicates'], 1, 'Any live reference keeps the object.', 5, 'song2 still targeted.', [7], 12),
  ]),

  '1-4': cap('final-1-4', 'Lesson review · null & aliases', [
    mcq('f14-1', 'post2 = null means:', ['Object deleted instantly', 'post2 references nothing', 'post1 null', 'likes reset'], 1, 'null is absence of target.', 2, 'post2 arrow absent.', [4], 12),
    mcq('f14-2', 'After post2 = post1, addLike runs on:', ['Two posts', 'The single shared SocialPost', 'null', 'String content'], 1, 'One object, many references.', 4, 'likes becomes 1 on postObj1.', [6], 14),
    mcq('f14-3', 'post1 = null with post2 still referencing means the object:', ['Collected', 'Reachable via post2', 'static', 'split'], 1, 'Reachability needs any reference.', 5, 'post2 still points at post.', [7], 12),
    fill('f14-4', 'Immediately after construction, likes equals [blank].', 'n', ['0'], 'Constructor sets likes to 0.', 1, 'Field starts at zero.', [3], 10),
    mcq('f14-5', 'NullPointerException risk appears if you call a method on:', ['A live reference', 'null', 'this inside accessor', 'primitive int'], 1, 'No object ⇒ NPE on instance call.', 2, 'Contrast with valid post1.', [4], 12),
    mcq('f14-6', 'Aliasing means both references compare as equal targets when they:', ['Point at same id', 'Have different types', 'Are both null only', 'Are primitives'], 1, 'Same reference value → same object.', 3, 'Both reference postObj1.', [5], 12),
  ]),

  '1-5': cap('final-1-5', 'Lesson review · GC & primitives', [
    mcq('f15-1', 'tag keeps 120 after pair1 = pair2 because:', ['References copy into tag', 'int is copied by value and not rewired', 'GC restores it', 'Adidas writes tag'], 1, 'Primitive locals are independent copies.', 5, 'tag stays while refs move.', [7], 14),
    mcq('f15-2', 'Nike becomes garbage when:', ['price drops', 'Zero references aim at that object', 'luxe flips', 'getPrice runs'], 1, 'Unreachable heap objects may be collected.', 5, 'shoe1 marked garbage.', [7], 14),
    mcq('f15-3', 'luxe stores:', ['Reference to Sneaker', 'boolean primitive', 'String brand', 'int[]'], 1, 'boolean returned by value.', 4, 'luxe=true on stack.', [6], 12),
    mcq('f15-4', 'Accessor getPrice reads from:', ['Stack tag only', 'Instance field on heap object', 'static count', 'pair2 only'], 1, 'Getter observes receiver state.', 3, 'price field on shoe.', [5], 12),
    mcq('f15-5', 'Both pair variables reference Adidas after reassignment — heap has:', ['Two Sneaker objects reachable', 'One reachable plus garbage Nike', 'Only Nike', 'zero objects'], 1, 'Diagram shows garbage + live object.', 5, 'shoe2 shared by pair1/pair2.', [7], 12),
    fill('f15-6', 'When pair1 and pair2 share shoe2, there is [blank] reachable Sneaker (digit).', 'count', ['1', 'one'], 'Single live shoe object.', 5, 'One non-garbage Sneaker.', [7], 10),
  ]),

  '4-1': cap('final-4-1', 'Lesson review · Class anatomy', [
    mcq('f41-1', 'count in staticArea models:', ['Per-instance field', 'One shared class field', 'local temp', 'parameter'], 1, 'Static ≠ per object.', 1, 'staticArea holds Fraction.count.', [2], 14),
    mcq('f41-2', 'Constructor runs when:', ['Class loads only', 'new creates an instance', 'static import', 'compile'], 1, 'new invokes constructor.', 3, 'Constructor highlight on new path.', [9], 12),
    mcq('f41-3', 'getNumer returns numer for:', ['Class name', 'Implicit this object', 'staticArea only', 'void'], 1, 'Accessors read instance fields.', 4, 'Instance method on receiver.', [16], 12),
    fill('f41-4', 'Instance fields numer/denom live [blank] each object.', 'where', ['inside', 'in', 'on'], 'State stored in instance payload.', 2, 'Blue-highlight fields.', [5], 10),
    mcq('f41-5', 'Static initializer count++ in ctor affects:', ['One object copy', 'Shared class counter', 'stack numerals', 'compiler'], 1, 'Static touched for every construction.', 3, 'count increments in static story.', [12], 12),
    mcq('f41-6', 'Which highlight color matched “instance method” in the walkthrough?', ['Green constructor only', 'Orange accessor', 'Purple static', 'Blue instance vars'], 1, 'Getter block uses orange cue.', 4, 'getNumer lines highlighted.', [16], 10),
  ]),

  '4-2': cap('final-4-2', 'Lesson review · Client & constructor', [
    mcq('f42-1', 'studentName parameter in ctor is:', ['Heap field directly', 'Stack local copy / alias of argument', 'static', 'missing'], 1, 'Parameters are frame locals.', 2, 'studentName + initialGrade on stack in ctor.', [4], 14),
    mcq('f42-2', 'name = studentName copies:', ['Main’s stack into class file', 'Parameter reference into instance field name', 'static', 'literal wrong type'], 1, 'Ctor wires parameters into object.', 3, 'obj1 fields filled.', [5], 14),
    mcq('f42-3', 'After ctor, s1 in Main references:', ['str1 only', 'Student obj1', 'static', 'null'], 1, 'Client holds reference to new object.', 4, 's1 → Student on heap.', [2], 12),
    mcq('f42-4', 'study() bumps grade because:', ['static shared int', 'this.grade mutates receiver object', 'String concat', 'new Student'], 1, 'Instance method changes fields.', 6, 'grade 90 on heap.', [9], 12),
    fill('f42-5', 'Hidden receiver for s1.study() is passed as [blank].', 'param', ['this', 'this reference'], 'Compiler passes receiver as this.', 5, 'Parameter-passing overlay.', [3], 10),
    mcq('f42-6', 'Arguments "Alice" and 85 are passed:', ['By reference for both wrongly', 'String ref copy + int copy (value)', 'only stack literals', 'garbage'], 1, 'Pass-by-value always copies; objects copy refs.', 1, 'Call site mappings.', [2], 12),
  ]),

  '5-1': cap('final-5-1', 'Lesson review · Locals & fields', [
    mcq('f51-1', 'temp exists:', ['Forever on heap', 'Only during add execution', 'In staticArea', 'global'], 1, 'Locals die with frame.', 4, 'temp disappears later.', [8], 12),
    mcq('f51-2', 'this.total = temp writes:', ['into parameter amount', 'instance field reachable via calc', 'Main’s stack only', 'static'], 1, 'Mutator updates object state.', 5, 'total field becomes 10.', [9], 12),
    mcq('f51-3', 'getTotal returns value into Main as:', ['Heap pointer', 'Primitive int in result', 'void', 'Calculator clone'], 1, 'int return copies bits to caller.', 7, 'result local on stack.', [4], 12),
    fill('f51-4', 'After add(10), Calculator total field is [blank].', 'n', ['10'], '0+10 update.', 5, 'heap total=10.', [9], 10),
    mcq('f51-5', 'calc reference during add points at:', ['new stack frame only', 'Same heap Calculator as in Main', 'static Math', 'null'], 1, 'Object identity preserved across call.', 3, 'calc ref in caller.', [3], 12),
    mcq('f51-6', 'amount parameter scope ends when:', ['loop breaks', 'add returns', 'GC decides', 'never'], 1, 'Method completion pops locals.', 6, 'Locals cleared after line 10.', [10], 12),
  ]),

  '5-2': cap('final-5-2', 'Lesson review · static vs instance', [
    mcq('f52-1', 'MathUtils.square(5) needs no:', ['int parameter', 'receiver object', 'return', 'semicolon'], 1, 'Static skips this.', 2, 'Class.method style.', [3], 12),
    mcq('f52-2', 'multiply uses implicit this tied to:', ['MathUtils class name', 'utils reference’s object', 'static square', 'num literal'], 1, 'Instance call supplies receiver.', 7, 'utils on stack with factor.', [7], 14),
    mcq('f52-3', 'Inside square, stack shows:', ['Only static count', 'Parameter num', 'this and utils', 'heap Calculator'], 1, 'Static frame: simple locals.', 2, 'num=5 local.', [13], 12),
    fill('f52-4', 'After square, sq equals [blank].', 'n', ['25'], '5*5.', 4, 'sq primitive in Main.', [3], 10),
    mcq('f52-5', 'Why can’t static read instance field value blindly?', ['private keyword only', 'No this / no instance context', 'syntax error always', 'needs import'], 1, 'Instance state needs an object.', 2, 'Contrast instance frame at multiply.', [8], 12),
    mcq('f52-6', 'result = utils.multiply(2) combines:', ['static + 5', 'instance field 10 * factor 2', 'stack utils alone', 'void'], 1, 'value * factor with this.value.', 9, 'result=20.', [7], 12),
  ]),

  '6-1': cap('final-6-1', 'Lesson review · 1D arrays', [
    mcq('f61-1', 'scores variable holds:', ['three ints inline', 'reference to heap int[]', 'static', 'String'], 1, 'Arrays are objects.', 1, 'scores → arr1.', [0], 12),
    mcq('f61-2', 'Default cells before writes were:', ['undefined', '0 for int', 'null', '-1'], 1, 'Numeric default zero.', 1, 'slots [0..2] zero.', [0], 12),
    fill('f61-3', 'scores[2] ends as [blank].', 'n', ['100'], 'Last assignment.', 4, '[2]=100.', [3], 10),
    mcq('f61-4', 'scores[0]=95 mutates:', ['Stack scores variable bytes', 'Heap array slot', 'compile table', 'two arrays'], 1, 'Data lives in heap object.', 2, '[0] becomes 95.', [1], 12),
    mcq('f61-5', 'Length fixed after new int[3]?', ['Grows with add', 'Stays 3', 'Becomes 0', 'random'], 1, 'Plain arrays don’t resize.', 1, 'Three slots only.', [0], 12),
    mcq('f61-6', 'Reference scores stays same while slots change:', ['false', 'true — same object, updated fields', 'scores duplicates', 'moves stack'], 1, 'Mutation updates innards.', 4, 'Same arr1 id throughout.', [3], 12),
  ]),

  '10-1': cap('final-10-1', 'Lesson review · Recursion stack', [
    mcq('f101-1', 'Deepest frame before unwind is:', ['fact(5)', 'fact(0)', 'main', 'static'], 1, 'Base case at n=0.', 6, 'fact(0) atop stack.', [6], 14),
    mcq('f101-2', 'Base case prevents:', ['compilation', 'infinite recursion / overflow', 'parameters', 'returns'], 1, 'Must stop calls.', 7, 'fact(0) returns.', [7], 12),
    fill('f101-3', 'fact(5) final value [blank].', 'n', ['120'], '5! = 120.', 11, 'outer frame done.', [11], 10),
    mcq('f101-4', 'Each frame stores its own:', ['shared global n', 'copy of n for that invocation', 'heap list', 'String'], 1, 'Parameter n per activation.', 3, 'frames carry distinct n.', [3], 12),
    mcq('f101-5', 'Returning from fact(0) allows:', ['skip fact(1)', 'fact(1) to multiply 1*1', 'delete Java', 'static override'], 1, 'Unwind resumes caller.', 7, 'stack shrinks; products combine.', [7], 12),
    mcq('f101-6', 'Call stack visualization grows toward:', ['heap', 'new frames pushed upward', 'static', 'garbage'], 1, 'Nested calls push frames.', 5, 'many frames before base.', [5], 12),
  ]),

  '2-1': cap('final-2-1', 'Lesson review · for loops', [
    mcq('f21-1', 'Final sum after loop:', ['3', '6', '10', '0'], 1, '1+2+3.', 7, 'sum=6 before i discarded.', [8], 12),
    mcq('f21-2', 'i declared in header is in scope:', ['Whole class', 'Loop only', 'forever on stack after loop', 'heap'], 1, 'Loop-local variable.', 8, 'i absent after exit.', [8], 12),
    mcq('f21-3', 'First iteration adds i=', ['0', '1', '2', '3'], 1, 'Init sets i=1.', 3, 'sum+=1.', [2], 12),
    fill('f21-4', 'Condition i <= 3 fails when i becomes [blank].', 'n', ['4'], 'Update makes i=4, exit.', 8, 'loop ends.', [1], 10),
    mcq('f21-5', 'sum lives longer than i because:', ['sum declared before loop', 'i is volatile', 'static', 'array'], 1, 'Outer block scope survives.', 1, 'sum declared line 0.', [0], 12),
    mcq('f21-6', 'Update i++ runs:', ['Never', 'After each body, before next test', 'Only once', 'in heap'], 1, 'For-loop progression.', 4, 'i becomes 2 second time.', [1], 12),
  ]),

  '2-2': cap('final-2-2', 'Lesson review · compound operators', [
    mcq('f22-1', 'total += 5 with total=10 yields:', ['5', '15', '105', 'error'], 1, 'Add-assign merges read+write.', 2, 'slot 15.', [1], 12),
    mcq('f22-2', 'total++ after 15:', ['15', '16', '17', 'stays'], 1, 'Increment operator.', 3, 'primitive 16.', [2], 12),
    mcq('f22-3', 'scale *= 3 with scale=4:', ['7', '12', '34', '1'], 1, 'Multiply-assign.', 5, 'scale 12.', [4], 12),
    fill('f22-4', 'Still on stack beside scale after all lines: total = [blank].', 'n', ['16'], 'total unchanged after scale ops except earlier inc.', 5, 'total 16 persists.', [4], 10),
    mcq('f22-5', 'Compound ops mutate:', ['new variables each time', 'existing primitive slots', 'heap strings only', 'static area'], 1, 'Same name, updated value.', 2, 'one total variable.', [1], 12),
    mcq('f22-6', 'No heap objects appear because:', ['all primitives here', 'Strings hidden', 'arrays missing', 'error'], 1, ' ints on stack only.', 1, 'stack-only diagram.', [0], 10),
  ]),

  '4-3': cap('final-4-3', 'Lesson review · ArrayList', [
    mcq('f43-1', 'Internal storage for elements uses:', ['Embedded objects inline', 'References in growable structure', 'static pool', 'int stack'], 1, 'Refs to heap Strings.', 3, '[0],[1] refs.', [2], 14),
    mcq('f43-2', 'After two adds, conceptual size:', ['0', '2', '1', 'null'], 1, 'Tracks element count.', 3, 'size=2.', [2], 12),
    mcq('f43-3', 'list variable is:', ['primitive array', 'reference to ArrayList', 'String', 'void'], 1, 'Collections are reference types.', 1, 'list→al1.', [0], 12),
    fill('f43-4', 'Second element text after adds is [blank].', 'fruit', ['banana', 'Banana'], 'Case as in lesson literal.', 3, 'str2 banana.', [2], 10),
    mcq('f43-5', 'Apple String object location:', ['Inside ArrayList bytes only', 'Separate heap node referenced', 'stack char', 'static'], 1, 'Elements point outward.', 2, 'str1 distinct object.', [1], 12),
    mcq('f43-6', 'Compared to int[], ArrayList here grows via:', ['Resize story in lesson', 'Fixed [3] only', 'cannot', 'compiler magic'], 1, 'Teaching model shows growth.', 1, 'Starts empty container.', [0], 10),
  ]),

  '4-4': cap('final-4-4', 'Lesson review · Sequential search', [
    mcq('f44-1', 'idx starts at -1 meaning:', ['found', 'no match recorded yet', 'error', 'length'], 1, 'Sentinel before success.', 1, 'idx=-1 with data ref.', [2], 12),
    mcq('f44-2', 'data[i]==target with i=1 sets idx to:', ['-1', '1', '9', '3'], 1, 'Match index stored.', 3, 'idx updated in loop body.', [4], 14),
    mcq('f44-3', 'Array lives on:', ['stack only', 'heap', 'static literal pool', 'method name'], 1, 'int[] object.', 1, 'arrData on heap.', [0], 12),
    fill('f44-4', 'Target 9 sits at index [blank].', 'i', ['1'], 'Zero-based position.', 4, 'final idx=1.', [4], 10),
    mcq('f44-5', 'Loop variable i is:', ['instance field', 'primitive local in loop', 'reference', 'static'], 1, 'for-loop index local.', 3, 'i on stack during search.', [3], 12),
    mcq('f44-6', 'After loop, unreachable i implies:', ['memory leak', 'scope ended — i not shown', 'still 0', 'copy to heap'], 1, 'Loop locals end with loop.', 4, 'stack sans i.', [4], 12),
  ]),

  'ap-3-1': cap('final-ap-3-1', 'Lesson review · Booleans & if', [
    mcq('fa31-1', 'passed stores result of:', ['assignment only', 'relational >=', 'println', 'void'], 1, 'boolean expression.', 2, 'passed=true.', [1], 12),
    mcq('fa31-2', 'Guard passed && score < 90 requires:', ['OR', 'both conjuncts true', 'never', 'static'], 1, 'Short-circuit AND story.', 3, 'enters block.', [2], 12),
    mcq('fa31-3', 'After body, score reads:', ['82', '87', '90', '70'], 1, 'Adds 5 once.', 4, '87 primitive.', [3], 12),
    fill('fa31-4', 'score >= 70 with score 82 is [blank].', 'bool', ['true'], 'Relational true.', 2, 'boolean eval.', [1], 10),
    mcq('fa31-5', 'Without mutating block, passed would stay:', ['false', 'true while score unchanged at 82', 'null', 'int'], 1, 'boolean local unchanged unless assigned.', 2, 'still true after skipped mutator hypothetical.', [2], 12),
    mcq('fa31-6', 'Primitives score and passed coexist on:', ['heap', 'stack', 'static', 'pool'], 1, 'Locals in main.', 2, 'two slots.', [2], 10),
  ]),

  'ap-3-2': cap('final-ap-3-2', 'Lesson review · String identity', [
    mcq('fa32-1', 'a == b here because:', ['text only', 'same pooled literal reference', 'new forced', 'error'], 1, 'Literal interning teaching model.', 2, 'one str1.', [3], 14),
    mcq('fa32-2', 'a == c is false with identical text because:', ['equals broken', 'different heap objects', 'compile ban', 'static'], 1, 'new allocates fresh object.', 3, 'str1 vs str2.', [4], 14),
    mcq('fa32-3', 'equals on a and c:', ['false', 'true for same characters', 'only if ==', 'throws'], 1, 'Value equality.', 4, 'textEqAC true.', [8], 12),
    fill('fa32-4', 'Use [blank] for comparing String text equality.', 'method', ['equals', '.equals'], 'API contract.', 4, 'boolean flags in diagram.', [8], 10),
    mcq('fa32-5', 'refEqAC boolean primitive sits:', ['on heap inside String', 'on stack in Main', 'static', 'missing'], 1, 'boolean local.', 4, 'false slot.', [8], 12),
    mcq('fa32-6', 'Two "hi" String objects still show same literal in field named:', ['ref', 'value label in node', 'static', 'void'], 1, 'Human-readable value column.', 3, 'both show "hi".', [4], 10),
  ]),

  'ap-2-1': cap('final-ap-2-1', 'Lesson review · String API', [
    mcq('fa21-1', 'toUpperCase produced:', ['mutation of name', 'new String JAVA', 'int', 'null'], 1, 'Immutability ⇒ new instance.', 2, 'strUpper.', [1], 12),
    mcq('fa21-2', 'len type:', ['String', 'int primitive', 'double', 'boolean'], 1, 'length() returns int.', 3, 'len=4 stack.', [2], 12),
    mcq('fa21-3', 'name still "java" after upper because:', ['method cleared it', 'String immutable', 'error', 'static'], 1, 'Original object untouched.', 2, 'strName unchanged.', [1], 12),
    fill('fa21-4', 'upper holds reference distinct from [blank] variable name.', 'other', ['name'], 'Second reference var.', 2, 'two refs on stack.', [1], 10),
    mcq('fa21-5', 'Chaining conceptually uses return of:', ['void', 'String from toUpperCase for length', 'int', 'class'], 1, 'Upper feeds length call.', 3, 'len derived from upper.', [2], 12),
    mcq('fa21-6', 'Heap holds at least how many String objects after snippet?', ['1', '2', '0', '4'], 1, 'name + upper.', 3, 'two nodes.', [2], 10),
  ]),

  'ap-4-1': cap('final-ap-4-1', 'Lesson review · while accumulation', [
    mcq('fa41-1', 'Loop exits when n becomes:', ['positive', '0', '6', 'undefined'], 1, 'Condition n>0 fails.', 3, 'n=0 final.', [3], 12),
    mcq('fa41-2', 'total after visits:', ['0', '6', '3', '9'], 1, '3+2+1.', 3, '6 on stack.', [3], 12),
    mcq('fa41-3', 'Decrement n-- ensures:', ['drift upward', 'progress toward termination', 'static init', 'duplicate'], 1, 'Variant toward 0.', 3, 'n decreases each time.', [3], 12),
    fill('fa41-4', 'First iteration adds current n = [blank] to total.', 'n', ['3'], 'Starts at 3.', 3, 'accumulator path.', [3], 10),
    mcq('fa41-5', 'Primitives n and total live on:', ['heap', 'stack in this lesson', 'ArrayList', 'class file'], 1, 'main locals.', 2, 'two ints.', [2], 10),
    mcq('fa41-6', 'While checks condition', ['after body always before only', 'before each iteration', 'never', 'once'], 1, 'Top-tested loop.', 3, 'guard drives repeats.', [3], 12),
  ]),

  'ap-5-1': cap('final-ap-5-1', 'Lesson review · BankAccount', [
    mcq('fa51-1', 'Constructor sets balance from parameter:', ['static', 'start int copy', 'void', 'String'], 1, 'Initializer wiring.', 1, 'balance=100.', [2], 12),
    mcq('fa51-2', 'deposit changes:', ['reference acct only', 'heap balance field', 'Main’s stack names', 'class file'], 1, 'Mutator path.', 2, '125 in object.', [3], 12),
    mcq('fa51-3', 'getBalance returns int to:', ['heap', 'local b in Main', 'this only', 'null'], 1, 'Copy to caller.', 3, 'b=125.', [4], 12),
    fill('fa51-4', 'After deposit, balance is [blank].', 'n', ['125'], '100+25.', 2, 'field update.', [3], 10),
    mcq('fa51-5', 'acct points at:', ['Two accounts', 'One BankAccount throughout', 'static', 'int'], 1, 'Single object mutated.', 3, 'acct ref stable.', [4], 12),
    mcq('fa51-6', 'Accessor should generally:', ['mutate two fields', 'avoid unintended state change', 'allocate new class', 'ignore this'], 1, 'Getter read-only spirit.', 3, 'read balance.', [4], 10),
  ]),

  'ap-6-1': cap('final-ap-6-1', 'Lesson review · Array traversal', [
    mcq('fa61-1', 'Valid last index for length 3:', ['3', '2', '4', '-1'], 1, '0..length-1.', 1, 'indices 0,1,2.', [0], 12),
    mcq('fa61-2', 'sum after loop:', ['200', '245', '255', '90'], 1, '70+85+90.', 9, '245 primitive.', [2], 12, {
      reviewChapter: '5 · Arrays & algorithms',
    }),
    mcq('fa61-3', 'scores[i] read pulls from:', ['stack slot i', 'heap array element', 'static', 'String'], 1, 'Array object stores elements.', 4, 'unchanged array data.', [3], 12),
    fill('fa61-4', 'scores.length is [blank].', 'n', ['3'], 'Initializer length.', 1, 'three cells.', [0], 10),
    mcq('fa61-5', 'Enhanced loop could still read sums but we used:', ['for-index', 'while(true) only', 'switch', 'recursion'], 1, 'Classic index loop here.', 5, 'i index implied in story.', [2], 10),
    mcq('fa61-6', 'Array object identity while summing:', ['replaced each add', 'same reference throughout', 'null mid-way', 'duplicates'], 1, 'One array, many reads.', 6, 'arrScores stable.', [3], 12),
  ]),

  'ap-7-1': cap('final-ap-7-1', 'Lesson review · ArrayList ops', [
    mcq('fa71-1', 'set(1,"Bo") with Ava,Bern→Bo keeps size:', ['1', '2', '3', '0'], 1, 'Replacement not growth.', 3, 'size constant in story.', [3], 12),
    mcq('fa71-2', 'remove(0) shifts:', ['right', 'left compaction', 'error', 'static'], 1, 'Front removal squeezes.', 4, 'Bo alone index0.', [4], 12),
    mcq('fa71-3', 'names reference:', ['String literal', 'ArrayList heap object', 'int[]', 'null'], 1, 'Consistent ref variable.', 1, 'alNames.', [1], 12),
    fill('fa71-4', 'Final size after remove is [blank].', 'n', ['1'], 'One element remains.', 4, 'size=1.', [4], 10),
    mcq('fa71-5', 'add("Ava") created:', ['primitive', 'String heap node referenced', 'fork JVM', 'class static'], 1, 'Element is object ref.', 2, 'first element.', [2], 12),
    mcq('fa71-6', 'Compared to array, ArrayList tracks:', ['fixed length only', 'size field separate from capacity teaching view', 'no storage', 'stack data'], 1, 'Dynamic list model.', 1, 'size 0 start.', [1], 10),
  ]),

  'ap-8-1': cap('final-ap-8-1', 'Lesson review · 2D traversal', [
    mcq('fa81-1', 'grid.length here:', ['number of columns first', 'number of rows', 'total cells without rows', '6'], 1, 'Top-level array rows.', 1, 'two row refs.', [0], 12),
    mcq('fa81-2', 'Inner loop bound uses:', ['grid.length', 'grid[r].length', 'constant 2 always wrong', 'string'], 1, 'Row-major inner bound.', 2, 'per-row cells.', [6], 12),
    mcq('fa81-3', 'Sum 1..4:', ['8', '9', '10', '7'], 1, 'Row major covers all.', 6, 'total=10.', [7], 12),
    fill('fa81-4', 'grid[1][0] value is [blank].', 'n', ['3'], 'Second row first col.', 1, 'row-major path touches it.', [0], 10),
    mcq('fa81-5', 'Row objects are themselves:', ['primitives on stack', 'int[] on heap', 'String only', 'null'], 1, 'Array of arrays.', 1, 'row0 row1 nodes.', [0], 12),
    mcq('fa81-6', 'total primitive accumulates from:', ['static', 'every grid[r][c]', 'only first row', 'random'], 1, 'Nested loops.visit all.', 6, 'running sum.', [7], 12),
  ]),

  'ap-9-1': cap('final-ap-9-1', 'Lesson review · Polymorphism', [
    mcq('fa91-1', 'Heap class at runtime for v = new Car():', ['Vehicle exactly', 'Car', 'interface', 'Object only'], 1, 'new Car builds Car.', 1, 'Car node.', [2], 14),
    mcq('fa91-2', 'Compiler type of v is:', ['Car', 'Vehicle (reference)', 'String', 'int'], 1, 'Declared reference type.', 1, 'Vehicle variable.', [2], 12),
    mcq('fa91-3', 'v.move() picks:', ['Vehicle body always', 'Car override at runtime', 'static Vehicle', 'fails'], 1, 'Dynamic dispatch.', 2, 'msg "Car drives".', [3], 14),
    fill('fa91-4', 'Keyword on Car class before move is often @[blank].', 'anno', ['override', 'Override'], 'Annotation documents override.', 2, 'override concept.', [3], 10),
    mcq('fa91-5', 'msg references:', ['Vehicle table', 'String heap return', 'Car class static', 'void'], 1, 'Return value stored.', 2, 'strMsg literal object.', [3], 12),
    mcq('fa91-6', 'Substitution principle: treat Car as Vehicle because Car', ['is unrelated', 'is-a Vehicle', 'has-a engine only in jargon file', 'cannot compile'], 1, 'Inheritance substitutability.', 1, 'widening ref assignment.', [2], 12),
  ]),

  'ap-10-1': cap('final-ap-10-1', 'Lesson review · Recursive sum', [
    mcq('fa101-1', 'Base case n==1 returns:', ['0', '1', 'n+1', 'error'], 1, 'Stopping recursion.', 5, 'frame sumTo(1).', [4], 12),
    mcq('fa101-2', 'The first recursive call from sumTo(4) passes argument:', ['5', '3', '0', '1 only'], 1, 'Each call reduces n by 1.', 2, 'stack grows downward n.', [2], 12),
    mcq('fa101-3', 'Unwind adds:', ['random', 'child return into parent expression', 'static fields', 'GUI'], 1, 'n + recursive result.', 7, 'Combines 4+6.', [7], 12),
    fill('fa101-4', 'Closed form sum 1..4 = [blank].', 'n', ['10'], 'Triangular number.', 8, 'completed outer call.', [8], 10),
    mcq('fa101-5', 'Without base, recursion would:', ['finish instantly', 'StackOverflowError risk', 'return 0 always', 'compile fail always'], 1, 'Need termination.', 4, 'deepest frame concept.', [4], 12),
    mcq('fa101-6', 'Frames track distinct:', ['same n always', 'n per call', 'heap list duplicate', 'String'], 1, 'Each activation its n.', 2, 'sumTo(4) vs sumTo(3).', [2], 12),
  ]),

  '6-lib-arraylist': cap('final-lib-al', 'Lesson review · List & ArrayList', [
    mcq('fl-al-1', 'ArrayList grows when:', ['never', 'elements added beyond capacity teaching story', 'compile only', 'static'], 1, 'Dynamic array-backed list.', 1, 'nums gains elements.', [8], 12),
    mcq('fl-al-2', 'List on left, ArrayList on right illustrates:', ['error', 'program to interface, implement with class', 'primitive widening', 'import failure'], 1, 'Polymorphic variable type.', 3, 'words declaration.', [17], 14),
    mcq('fl-al-3', 'nums.get(0) after adds yields:', ['20', '10', 'size', 'void'], 1, 'Zero-based access.', 2, 'x=10 snapshot.', [11], 12),
    fill('fl-al-4', 'After remove(0) in demo, first remaining element is [blank].', 'n', ['99'], 'Teaching diagram end state.', 2, '_nums internal shift.', [11], 10),
    mcq('fl-al-5', 'size() differs from Array .length because:', ['same spelling', 'List uses method size()', 'String rules', 'illegal'], 1, 'API naming.', 2, 'size primitive in diagram.', [11], 12),
    mcq('fl-al-6', 'Wrapper generic Integer in snippet stores:', ['boxed always shown', 'unboxed int values in teaching cells', 'String', 'void'], 1, 'Simplified int slots.', 1, '[0]=10 style.', [8], 10),
  ]),

  '6-lib-string': cap('final-lib-st', 'Lesson review · java.lang.String', [
    mcq('fl-st-1', 'substring(1,4) excludes:', ['index 1', 'index 4 char', 'all', 'nothing'], 1, 'End exclusive.', 1, 'piece "bcd".', [8], 12),
    mcq('fl-st-2', 'indexOf("cd") reports starting index:', ['1', '2', '3', '-1'], 1, 'cd begins at 2.', 1, 'pos=2.', [8], 12),
    mcq('fl-st-3', 'text unchanged after methods because:', ['StringBuilder rules', 'String immutability', 'compile erase', 'static'], 1, 'Methods return fresh values.', 1, 'strText persists.', [8], 12),
    fill('fl-st-4', 'length of "abcdef" is [blank].', 'n', ['6'], 'char count.', 1, 'len=6 local.', [8], 10),
    mcq('fl-st-5', 'piece references:', ['same as text', 'new heap String "bcd"', 'int', 'null'], 1, 'substring allocates new.', 1, 'strPiece node.', [8], 12),
    mcq('fl-st-6', 'Use equals to compare text not:', ['hashCode', '== always', 'length', 'charAt'], 1, 'Reference vs value.', 1, 'ok boolean from equals.', [8], 12),
  ]),

  '6-lib-math': cap('final-lib-math', 'Lesson review · Math & wrappers', [
    mcq('fl-m-1', 'Math is:', ['instantiated often', 'static utility holder', 'interface', 'Annotation'], 1, 'Private ctor pattern.', 1, 'Math locals.', [9], 12),
    mcq('fl-m-2', 'Math.sqrt(9.0) yields:', ['2', '3', '4.5', '81'], 1, 'Square root.', 1, 'root variable.', [9], 12),
    mcq('fl-m-3', 'Integer.parseInt turns:', ['int to String', 'String to int primitive', 'double only', 'boolean'], 1, 'Decoding text.', 2, 'fromStr=100.', [15], 12),
    fill('fl-m-4', 'Math.pow(2,4) == [blank].', 'n', ['16'], 'Exponentiation.', 1, 'pow local.', [9], 10),
    mcq('fl-m-5', 'MAX_VALUE constant describes:', ['double only', 'int upper bound', 'String length', 'array'], 1, 'Wrapper constant.', 2, 'imax slot.', [15], 12),
    mcq('fl-m-6', 'Random rnd is:', ['always 0.5', 'sample double in [0,1) teaching snapshot', 'int', 'String'], 1, 'random() conceptual.', 1, 'rnd local.', [9], 10),
  ]),

  '6-lib-2d': cap('final-lib-2d', 'Lesson review · 2D row-major', [
    mcq('fl-2d-1', 'm.length rows here:', ['3', '2', '6', '1'], 1, 'Two row arrays.', 2, 'row0 row1.', [6], 12),
    mcq('fl-2d-2', 'Sum all cells 1..6:', ['18', '20', '21', '15'], 1, '1+2+3+4+5+6.', 4, 'total=21.', [6], 12),
    mcq('fl-2d-3', 'Inner uses m[r].length for:', ['column uniformity guarantee', 'possibly ragged rows in general', 'syntax error fix', 'static'], 1, 'Per-row sizing.', 1, 'loop bound teaching.', [5], 12),
    fill('fl-2d-4', 'm[0][2] in example is [blank].', 'n', ['3'], 'First row third entry.', 2, 'row0 cells.', [6], 10),
    mcq('fl-2d-5', 'm references:', ['flat int[6]', 'int[][] aggregator on heap', 'stack array only', 'list'], 1, 'Nested structure.', 1, 'm2d node.', [2], 12),
    mcq('fl-2d-6', 'Row-major visits all cells exactly:', ['once', 'twice', 'never', 'random'], 1, 'Full coverage.', 4, 'nested loops.', [6], 10),
  ]),

  'ap-0-1': cap('final-ap-0-1', 'Lesson review · main & output', [
    mcq('f-a01-1', 'JVM starts in:', ['any private method', 'public static void main(String[] args)', 'static block only', 'package'], 1, 'Entry contract.', 0, 'lesson intro.', [0], 12),
    mcq('f-a01-2', 'Literal "Hello" in teaching diagram:', ['Is always stack only', 'May appear as heap String', 'Is int', 'Skipped'], 1, 'String is reference type with literal pooling story.', 1, 'strHello node.', [2], 12),
    mcq('f-a01-3', 'int x = 42 uses stack slot for:', ['Reference to 42 object', 'Primitive 42', 'static', 'void'], 1, 'int is primitive.', 2, 'x slot.', [3], 12),
    fill('f-a01-4', 'println(42) prints [blank] (digits only).', 'n', ['42'], 'Decimal form.', 3, 'final step.', [4], 10),
    mcq('f-a01-5', 'System.out is:', ['Your class field', 'Standard output stream for printing', 'Scanner', 'Heap array'], 1, 'Platform-provided stream.', 1, 'println call.', [2], 10),
    mcq('f-a01-6', 'Quoting in println changes output because:', ['Compiler bug', 'Literals are String text, not variable lookup', 'Ints need quotes', 'static'], 1, 'First line prints letters Hello.', 1, 'compare lines.', [2], 10),
  ]),

  'ap-0-2': cap('final-ap-0-2', 'Lesson review · Scanner', [
    mcq('f-a02-1', 'new Scanner(System.in) allocates:', ['primitive', 'heap Scanner', 'String only', 'static'], 1, 'Object allocation.', 1, 'sc1 on heap.', [4], 12),
    mcq('f-a02-2', 'Variable `in` holds:', ['byte stream inline', 'reference to Scanner', 'int 16', 'null always'], 1, 'Reference type.', 1, 'in → sc1.', [4], 12),
    mcq('f-a02-3', 'nextInt stores result in age as:', ['Scanner ref', 'int primitive copy', 'String', 'void'], 1, 'Parsing returns primitive.', 2, 'age=16.', [5], 12),
    fill('f-a02-4', 'Package for Scanner is java.[blank].', 'pkg', ['util'], 'import java.util.Scanner.', 0, 'import line.', [0], 10),
    mcq('f-a02-5', 'Compared to String, Scanner is:', ['Always stack-only', 'Mutable service object for tokenizing input', 'keyword', 'int'], 1, 'Stateful reader.', 1, 'Scanner fields.', [4], 10),
    mcq('f-a02-6', 'Without consuming input, calling nextInt again would:', ['Reuse 16 forever', 'Read the next token (teaching model)', 'Delete Scanner', 'Compile error always'], 1, 'Stream cursor advances.', 2, 'token advance concept.', [5], 10),
  ]),

  'ap-3-3': cap('final-ap-3-3', 'Lesson review · Short-circuit', [
    mcq('f-a33-1', '(x != 0) && ... with x=0 skips right because:', ['Math rule', '&& needs left true to bother', '|| law', 'static'], 1, 'Short-circuit AND.', 2, 'leftGuard false.', [1], 12),
    mcq('f-a33-2', '(x == 0) || ... skips right when:', ['left false', 'left true', 'never', 'error'], 1, 'OR already satisfied.', 3, 'rightOr true.', [2], 12),
    mcq('f-a33-3', 'Short-circuit can prevent:', ['all errors', 'unsafe right-hand evaluation like division', 'compilation', 'stack frames'], 1, 'Guard idioms rely on order.', 2, 'divide-by-zero avoided.', [1], 12),
    fill('f-a33-4', 'If left of && is false, result is [blank] without evaluating right.', 'bool', ['false'], 'Conjunction short-circuit.', 2, 'boolean eval.', [1], 10),
    mcq('f-a33-5', 'leftGuard and rightOr are:', ['String refs', 'boolean primitives on stack', 'Scanner', 'int[]'], 1, 'Expression results.', 3, 'two flags.', [2], 10),
    mcq('f-a33-6', 'Evaluation order for && is:', ['Right first always', 'Left then maybe right', 'Random', 'Parallel'], 1, 'Left-to-right with shortcutting.', 1, 'x local first.', [0], 10),
  ]),

  'ap-3-4': cap('final-ap-3-4', 'Lesson review · De Morgan', [
    mcq('f-a34-1', '!(true && false) evaluates to:', ['false', 'true', '0', 'null'], 1, 'Inner AND false, NOT flips.', 2, 'dem1.', [2], 12),
    mcq('f-a34-2', '!true || !false is:', ['false || false = false', 'false || true = true', 'true', 'error'], 1, '!p false, !q true, OR true.', 3, 'dem2.', [3], 12),
    mcq('f-a34-3', 'Equivalent expressions have:', ['Different truth always', 'Same truth table on these inputs', 'No relationship', 'Syntax error'], 1, 'Law verified for snapshot.', 3, 'both true.', [3], 12),
    fill('f-a34-4', 'De Morgan: !(p && q) matches !p [blank] !q.', 'op', ['||', 'or'], 'OR of negations.', 3, 'dem2 shape.', [3], 10),
    mcq('f-a34-5', 'p and q in lesson are:', ['references', 'boolean primitives', 'doubles', 'arrays'], 1, 'boolean locals.', 1, 'p q slots.', [1], 10),
    mcq('f-a34-6', 'To prove laws generally you use:', ['One example only', 'Truth tables or algebraic laws', 'Random tests', 'println'], 1, 'Boolean algebra reasoning.', 0, 'law overview.', [0], 10),
  ]),

  '2-3': cap('final-2-3', 'Lesson review · Nested for', [
    mcq('f23-1', 'Total ++ executions equal:', ['i alone', 'i count × j count per outer', 'j only once', 'random'], 1, '2×3 grid of body runs.', 0, 'nested plan.', [0], 12),
    mcq('f23-2', 'After outer starts with i=0, inner j runs:', ['0..1', '0..2 inclusive', 'never', 'only when i=1'], 1, 'j bound 3 iterations.', 2, 'i=0 j loop.', [1], 12),
    mcq('f23-3', 'Mid snapshot total=3 implies:', ['about half of 6 increments', 'finished', 'error', 'infinite'], 0, 'Teaching midpoint.', 3, 'total=3.', [2], 12),
    fill('f23-4', 'Final total after full nested run is [blank].', 'n', ['6'], '2 outer × 3 inner.', 4, 'total=6.', [3], 10),
    mcq('f23-5', 'Inner loop bound uses:', ['i only', 'a.length style j < 3 here', 'static', 'String'], 1, 'j < 3 in snippet.', 2, 'inner header.', [1], 10),
    mcq('f23-6', 'Outer i values in example:', ['0..1', '0..2', 'only 0', 'unbounded'], 0, 'i < 2.', 1, 'initial total setup.', [0], 10),
  ]),

  '5-3': cap('final-5-3', 'Lesson review · this & shadowing', [
    mcq('f53-1', 'In setValue(int value), field write uses:', ['value = value only', 'this.value = value', 'static field', 'new'], 1, 'Disambiguate shadowed name.', 2, 'parameter passing Card.', [9], 12),
    mcq('f53-2', 'Parameter value inside setValue is:', ['the heap Counter', 'stack copy int from caller', 'reference to this', 'String'], 1, 'Pass-by-value int.', 2, 'value=3 slot.', [9], 12),
    mcq('f53-3', 'After setValue(3), Counter field reads:', ['5 still', '3', 'null', 'static'], 1, 'Assignment reached heap.', 3, 'field updated.', [10], 12),
    fill('f53-4', 'Receiver object lives through reference [blank] in main.', 'name', ['c'], 'Same object all calls.', 4, 'c at getValue call.', [4], 10),
    mcq('f53-5', 'getValue() returns field without this because:', ['Illegal otherwise', 'No shadowing — plain field name resolves', 'static', 'void'], 1, 'No parameter named value.', 5, 'return value in getValue.', [12], 12),
    mcq('f53-6', 'Constructor Counter(int value) also needs:', ['No this ever', 'this.value = value to hit fields', 'static block', 'duplicate class'], 1, 'Same shadowing pattern.', 0, 'lesson overview.', [0], 10),
  ]),

  '4-5': cap('final-4-5', 'Lesson review · Iterative binary search', [
    mcq('f45-1', 'First mid index with lo=0 hi=4 is:', ['0', '2', '4', '5'], 1, '(0+4)/2 = 2.', 1, 'mid=2 snapshot.', [4], 12),
    mcq('f45-2', 'sorted[mid]=7 < target 12 implies:', ['hi = mid-1', 'lo = mid+1', 'done', 'shuffle'], 1, 'Search upper half.', 1, 'narrow upward.', [4], 12),
    mcq('f45-3', 'Loop requires data:', ['unsorted ok', 'sorted ascending usual', 'all equal only', 'String array'], 1, 'Comparison direction.', 0, 'BS intro.', [0], 12),
    fill('f45-4', 'When sorted[3]==12, mid == [blank].', 'n', ['3'], 'Index of hit.', 3, 'found step.', [2], 10),
    mcq('f45-5', 'Variables lo hi mid are:', ['heap objects', 'int locals on stack', 'Scanner', 'static'], 1, 'Primitive indices.', 1, 'stack lo hi mid.', [4], 10),
    mcq('f45-6', 'Compared to linear scan, each step halves:', ['entire JVM', 'index range under inspection', 'String pool', 'garbage'], 1, 'Interval shrink.', 2, 'lo/hi update.', [2], 10),
  ]),

  '4-6': cap('final-4-6', 'Lesson review · Selection sort', [
    mcq('f46-1', 'Outer i loop stops at length-1 because:', ['Error otherwise', 'Last element already placed by prior passes', 'compiler', 'static'], 1, 'Final slot sorted implicitly.', 0, 'algorithm intro.', [0], 12),
    mcq('f46-2', 'Inner j starts at i+1 to:', ['Rescan whole array always', 'Search unsorted suffix only', 'skip swap', 'print'], 1, 'Avoid comparing to self wrong.', 2, 'minIdx search.', [1], 12),
    mcq('f46-3', 'After first pass teaching swap, front cell holds:', ['8', '2', '1', '5'], 2, 'Minimum 1 moved to index 0.', 6, 'array {1,2,9,5,8}.', [9], 12),
    fill('f46-4', 'Algorithm class is [blank] sort (select min each pass).', 'name', ['selection', 'Selection'], 'Name from selecting min.', 0, 'selection idea.', [0], 10),
    mcq('f46-5', 'Swap uses tmp because:', ['Java forbids two assignments', 'Need hold one value while copying', 'GC', 'static'], 1, 'Classic three-way exchange.', 3, 'tmp swap lines.', [10], 10),
    mcq('f46-6', 'Array a stays:', ['stack inline cells', 'heap int[] mutated in place', 'immutable always', 'Scanner'], 1, 'Sorts by rearranging slots.', 1, 'heap arrA.', [0], 10),
  ]),

  '4-7': cap('final-4-7', 'Lesson review · Insertion sort', [
    mcq('f47-1', 'Key variable holds:', ['index i only', 'value being inserted from a[i]', 'length', 'Scanner'], 1, 'Copied element to place.', 2, 'key=2 trace.', [3], 12),
    mcq('f47-2', 'While loop shifts cells when:', ['a[j] > key', 'a[j] < key', 'j < 0 only', 'random'], 0, 'Move larger rights.', 2, 'shift while.', [5], 12),
    mcq('f47-3', 'After full lesson trace, array is:', ['unsorted', 'sorted ascending {1,2,4,5,8}', 'reversed', 'empty'], 1, 'prefix invariant.', 15, 'final array on the heap.', [1], 12),
    fill('f47-4', 'Outer loop starts i at [blank] (not 0).', 'n', ['1'], 'Need predecessor to compare.', 0, 'insertion idea.', [0], 10),
    mcq('f47-5', 'Compared to selection, insertion often:', ['Never shifts', 'Shifts neighbors inside prefix', 'allocates new arrays each pass', 'uses only =='], 1, 'Slide to make gap.', 2, 'shift pattern.', [5], 10),
    mcq('f47-6', 'When j becomes -1, insertion position is:', ['end', 'front index 0', 'illegal', 'static'], 1, 'Placed before all seen.', 4, 'j=-1 state.', [6], 10),
  ]),

  '4-8': cap('final-4-8', 'Lesson review · Enhanced for', [
    mcq('f48-1', 'for (int s : scores) iteration variable s is:', ['index', 'element copy for int', 'array ref', 'String'], 1, 'Each value read.', 0, 'for-each concept.', [0], 12),
    mcq('f48-2', 'scores reference type is:', ['primitive', 'int[] on heap', 'double only', 'void'], 1, 'Array object.', 1, 'scores→arrF.', [0], 12),
    mcq('f48-3', 'Mid loop sum=30 with s=20 means:', ['two elements summed', 'bug', 'finished', 'static'], 0, '10+20 so far.', 6, 'sum and s.', [3], 12, {
      reviewChapter: '2 · Control flow',
    }),
    fill('f48-4', 'Final sum of 10+20+30 is [blank].', 'n', ['60'], 'All elements.', 9, 'sum=60.', [3], 10),
    mcq('f48-5', 'Enhanced for cannot directly change:', ['loop variable s local copy here', 'the array size', 'both are limitations story', 'nothing'], 2, 's is copy; array structure fixed.', 0, 'iteration note.', [0], 10),
    mcq('f48-6', 'Compared to index for, enhanced for omits:', ['variable name', 'explicit index subscript', 'types', 'semicolons'], 1, 'Implicit traversal.', 1, 'scores header.', [0], 10),
  ]),

  'ap-9-2': cap('final-ap-9-2', 'Lesson review · equals vs ==', [
    mcq('f92-1', 'a == b with two Points:', ['true always', 'false if distinct objects', 'compile error', ' compares x only'], 1, 'Reference identity.', 3, 'refs=false.', [5], 12),
    mcq('f92-2', 'a.equals(b) with same x,y:', ['false always', 'true if override compares fields', 'only if same ref', 'random'], 1, 'Logical equality.', 2, 'same=true.', [4], 12),
    mcq('f92-3', 'equals first checks instanceof to:', ['speed only', 'avoid cast errors on unrelated objects', 'make == true', 'static'], 1, 'Type guard pattern.', 0, 'equals intro.', [0], 12),
    fill('f92-4', 'After casting, fields compared with [blank]== for ints here.', 'op', ['=='], 'Primitive field compare.', 2, 'Point.equals body.', [4], 10),
    mcq('f92-5', 'Two heap nodes ptA ptB in diagram:', ['always alias', 'distinct objects with same coordinates allowed', 'must merge', 'String pool'], 1, 'Separate allocations.', 1, 'two Points.', [2], 10),
    mcq('f92-6', 'Annotation @Override on equals signals:', ['compiler hook—intends superclass signature', 'field shadow', 'static', 'interface only'], 0, 'Documents override.', 2, 'equals header.', [4], 10),
  ]),

  'ap-10-2': cap('final-ap-10-2', 'Lesson review · Recursive binary search (not found)', [
    mcq('fb2-1', 'Base case return -1 when:', ['found', 'lo > hi empty range', 'mid==0', 'unsorted'], 1, 'Failure sentinel.', 0, 'recursion intro.', [0], 12),
    mcq('fb2-2', 'Mid index uses:', ['random', '(lo + hi) / 2 with int division', 'length only', 'String'], 1, 'Standard probe.', 1, 'first call locals.', [12], 12),
    mcq('fb2-3', 'When a[mid] < target, recursion searches:', ['left half', 'right half (higher indices)', 'whole array', 'static'], 1, 'Discard values ≤ mid.', 1, 'go right.', [12], 12),
    fill('fb2-4', 'Base case lo > hi yields return [blank] in this lesson.', 'n', ['-1'], 'Not found.', 7, 'base case.', [2], 10),
    mcq('fb2-5', 'The int[] searched lives on:', ['stack inline', 'heap; a is a reference', 'static area only', 'String pool'], 1, 'Arrays are objects.', 1, 'heap arrBS.', [1], 12),
    mcq('fb2-6', 'Unwind means each return feeds:', ['garbage collector', 'the waiting caller expression', 'println only', 'Scanner'], 1, 'Replace recursive call.', 11, 'final return.', [2], 10),
  ]),

  'ap-10-2-found': cap('final-ap-10-2-found', 'Lesson review · Recursive binary search (found)', [
    mcq('fb2f-1', 'When a[mid] equals target, this call returns:', ['-1', 'mid', 'lo', 'hi'], 1, 'Index of the hit.', 5, 'equality branch.', [6], 12),
    mcq('fb2f-2', 'After finding at mid, deeper frames:', ['keep searching', 'stop; value returns upward', 'clear the array', 'swap lo and hi'], 1, 'Base success path.', 6, 'return mid.', [7], 12),
    fill('fb2f-3', 'This trace searches for target [blank] in the same sorted array.', 'n', ['12'], 'Found case.', 0, 'intro.', [0], 10),
    mcq('fb2f-4', 'First probe (lo=0,hi=6) compares a[mid]=10 to 12 and recurses:', ['left', 'right (higher indices)', 'not at all', 'to static'], 1, '10 < 12.', 1, 'first mid.', [5], 12),
    mcq('fb2f-5', 'Unwind labels show ret = 4 because:', ['random', 'each callee returned the found index', 'mid was 0', 'array copied'], 1, 'Return value propagates.', 7, 'unwind.', [10], 12),
    mcq('fb2f-6', 'Final outcome to the original caller is:', ['-1', '4', '12', '6'], 1, 'Index where 12 sits.', 8, 'done.', [10], 10),
  ]),

  'ap-10-3': cap('final-ap-10-3', 'Lesson review · Merge (sorted halves)', [
    mcq('fb3-1', 'The merge step requires each input half to be:', ['sorted', 'random', 'empty only', 'equal length'], 0, 'Pick smaller front safely.', 0, 'merge intro.', [0], 12),
    mcq('fb3-2', 'out array length is:', ['max(left,right)', 'left.length + right.length', 'constant 2', 'random'], 1, 'All elements copied.', 1, 'alloc out.', [1], 12),
    mcq('fb3-3', 'Main while compares:', ['lengths only', 'front elements left[i] vs right[j]', 'hash codes', 'static'], 1, 'Merge decision.', 1, 'merge loop start.', [4], 12),
    fill('fb3-4', 'After first merge pick on {1,3,6,10} vs {2,4,5,12}, out[0] is [blank].', 'n', ['1'], 'Smallest front.', 2, 'first write.', [5], 10),
    mcq('fb3-5', 'Tail loops after main while drain:', ['only left', 'remainder of whichever side has unused elements', 'nothing', 'heap'], 1, 'Copy leftovers.', 9, 'drain right tail.', [13, 14], 10),
    mcq('fb3-6', 'Pointers i j k are:', ['heap objects', 'int indices on stack', 'String', 'methods'], 1, 'Running cursors.', 1, 'i j k locals.', [1], 10),
  ]),

  '6-lib-scanner': cap('final-lib-scanner', 'Lesson review · Scanner on String', [
    mcq('fl-sc-1', 'new Scanner("8 15 done") reads from:', ['System.in only', 'in-memory String source', 'file path', 'static void'], 1, 'Alternate constructor.', 1, 'sc1 wraps strSrc.', [4], 12),
    mcq('fl-sc-2', 'Variable s holds:', ['entire string inline', 'reference to Scanner on heap', 'three ints', 'void'], 1, 'Object reference.', 1, 's→sc1.', [4], 12),
    mcq('fl-sc-3', 'Third token from next() after two ints:', ['8', '15', 'done', 'space'], 2, 'Whitespace separates tokens.', 2, 'w→done.', [7], 12),
    fill('fl-sc-4', 'First nextInt stores in local [blank].', 'name', ['a'], 'First number token.', 2, 'a=8.', [7], 10),
    mcq('fl-sc-5', 'Same Scanner class as System.in variant means:', ['different package', 'same token API nextInt next', 'no nextInt', 'always file'], 1, 'Source differs, usage similar.', 0, 'API note.', [0], 10),
    mcq('fl-sc-6', 'Literal "8 15 done" is heap String strSrc; Scanner field references:', ['stack copy bytes', 'that String teaching link', 'int array', 'null'], 1, 'Teaching diagram link.', 1, 'Scanner input field.', [4], 10),
  ]),
};
