const fs = require('fs');

// 1. Update lessons.ts
let content = fs.readFileSync('src/data/lessons.ts', 'utf8');

content = content.replace(/chapter: '1\. Introduction and Basic building blocks'/g, "chapter: 'Unit 1: Using Objects and Methods'");
content = content.replace(/chapter: '4\. Defining a class'/g, "chapter: 'Unit 3: Class Creation'");
content = content.replace(/chapter: '5\. Writing Classes'/g, "chapter: 'Unit 3: Class Creation'");
content = content.replace(/chapter: '6\. Arrays'/g, "chapter: 'Unit 4: Data Collections'");
content = content.replace(/chapter: '10\. Recursion'/g, "chapter: 'Unit 4: Data Collections'");

const newLessons = `
  },
  {
    id: '2-1',
    chapter: 'Unit 2: Selection and Iteration',
    title: 'For Loops and Iteration',
    code: \`int sum = 0;
for (int i = 1; i <= 3; i++) {
  sum += i;
}\`,
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
    id: '4-3',
    chapter: 'Unit 4: Data Collections',
    title: 'ArrayLists in Memory',
    code: \`ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");\`,
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
            { id: 'str1', className: 'String', fields: [{ name: 'value', '"Apple"' }] }
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
            { id: 'str1', className: 'String', fields: [{ name: 'value', '"Apple"' }] },
            { id: 'str2', className: 'String', fields: [{ name: 'value', '"Banana"' }] }
          ],
          staticArea: []
        }
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
  }
];
`;

content = content.replace(/  }\n];/g, newLessons);
fs.writeFileSync('src/data/lessons.ts', content);

// 2. Update Sidebar.tsx sorting logic
let sidebar = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace(
  /const numA = parseInt\(a\.split\('\.'\)\[0\]\);\n    const numB = parseInt\(b\.split\('\.'\)\[0\]\);/g,
  "const numA = parseInt(a.match(/\\\\d+/)?.[0] || '0');\n    const numB = parseInt(b.match(/\\\\d+/)?.[0] || '0');"
);
fs.writeFileSync('src/components/Sidebar.tsx', sidebar);

console.log('Done updating lessons and sidebar.');
