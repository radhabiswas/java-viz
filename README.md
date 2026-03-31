
# JavaViz

**JavaViz** is a browser-based visualizer for Java concepts you meet in AP Computer Science A and early coursework: memory (stack, heap, static area), control flow, recursion, parameter passing, and more.

### Why this project exists

I’m **Radha Biswas**, a tenth grader preparing for the **AP Computer Science A** exam. While I studied, my father helped me learn to *see* what Java is doing—not just read the syntax but imagine frames on the call stack, objects on the heap, and how `if`, loops, and recursion drive execution. I wanted a tool that could give other students that same kind of intuition, so I built JavaViz using **vibe coding**—working with AI-assisted tools to design, implement, and refine the app quickly while keeping the pedagogy front and center.

If JavaViz helps you study, I hope you’ll share it or suggest improvements. The public source lives at **[github.com/radhabiswas/java-viz](https://github.com/radhabiswas/java-viz)**.

---

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

## Deploy at neurosymphony.ai/projects/javaviz

The static build supports a **base path** so assets resolve under `/projects/javaviz/`.

1. **Production build** (either form):

   ```bash
   JAVAVIZ_BASE=/projects/javaviz/ npm run build
   ```

   or:

   ```bash
   npm run build:subpath
   ```

2. Upload the **`dist/`** folder so its `index.html` is served at  
   `https://neurosymphony.ai/projects/javaviz/` (and assets at  
   `https://neurosymphony.ai/projects/javaviz/assets/...`).

3. **SPA fallback:** configure the host so requests under `/projects/javaviz/*` that are not files fall back to `index.html` (if you add deep links later).

4. **Smoke-test locally** after a subpath build:

   ```bash
   npm run build:subpath
   npm run preview:subpath
   ```

   Open the URL Vite prints; paths should include `/projects/javaviz/`.
