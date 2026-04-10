import React, { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } from 'react';
import { Step, CodeFile, Concept, CodeNavTarget } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDarkMode } from '../lib/useDarkMode';
import { FileCode2, LayoutGrid, Layers2, Loader2, Pencil, Sparkles } from 'lucide-react';
import { codeLineElementId, wordAtClick } from '../lib/wordAtClick';
import ImplicitThisJavaBlock from './ImplicitThisJavaBlock';
import { buildScopeLanes, filterScopeLanesForFocus, scopeGutterStyle, scopeLineStyle } from '../lib/javaScopeHints';
import {
  classLayoutDataAttrs,
  classLayoutLineClassNames,
  classLayoutLineStyle,
  classLayoutLineTitle,
  parseJavaClassLayout,
} from '../lib/javaClassLayout';

export default function CodeViewer({
  code,
  files,
  step,
  onEditLesson,
  /** Pretty-print active file and open Custom Code (same as Modify, but formatted). */
  onFormatToCustom,
  activeConcept,
  fileTabRequest,
  codeNav,
  onNavigateToSymbol,
  onSelectedFileChange,
  /** FRQ implementation workspace: use `Concept.implementationLines` when present. */
  preferImplementationConceptLines = false,
}: {
  code: string;
  files?: CodeFile[];
  step: Step;
  onEditLesson?: () => void;
  onFormatToCustom?: () => void | Promise<void>;
  /** Reports the active tab so “Modify code” can export a single .java file. */
  onSelectedFileChange?: (fileName: string) => void;
  activeConcept?: Concept | null;
  preferImplementationConceptLines?: boolean;
  /** Increment key to switch tab from lesson “open definition” links without changing step. */
  fileTabRequest?: { file: string; key: number; line?: number } | null;
  codeNav?: CodeNavTarget[];
  onNavigateToSymbol?: (target: { file: string; line: number }) => void;
}) {
  const hasFiles = files && files.length > 0;
  const isDark = useDarkMode();
  const prismStyle = isDark ? vscDarkPlus : oneLight;
  const codeAreaRef = useRef<HTMLDivElement>(null);
  const [scrollToLine, setScrollToLine] = useState<{ file: string; line: number } | null>(null);
  const [showScopeLanes, setShowScopeLanes] = useState(true);
  /** 'all' = every local lane; otherwise a single variable name from main's locals. */
  const [scopeVariableFocus, setScopeVariableFocus] = useState<'all' | string>('all');
  const [showClassLayout, setShowClassLayout] = useState(true);
  const [formatBusy, setFormatBusy] = useState(false);

  // Default to the first file if files exist, or fallback to the single code string
  const [selectedFile, setSelectedFile] = useState<string>(hasFiles ? files[0].name : 'Main.java');

  const navBySymbol = useMemo(() => {
    const m = new Map<string, { file: string; line: number }>();
    for (const e of codeNav ?? []) {
      m.set(e.symbol, { file: e.file, line: e.line });
    }
    return m;
  }, [codeNav]);

  // Auto-switch tab if the step specifies an active file
  useEffect(() => {
    if (step.activeFile && hasFiles) {
      setSelectedFile(step.activeFile);
    }
  }, [step.activeFile, hasFiles]);

  useEffect(() => {
    if (!hasFiles || !fileTabRequest?.file || fileTabRequest.key < 1) return;
    if (files.some((f) => f.name === fileTabRequest.file)) {
      setSelectedFile(fileTabRequest.file);
      if (fileTabRequest.line != null) {
        setScrollToLine({ file: fileTabRequest.file, line: fileTabRequest.line });
      }
    }
  }, [fileTabRequest?.key, fileTabRequest?.file, fileTabRequest?.line, hasFiles, files]);

  // Open the right tab when a multi-file concept is selected (highlights are per-file)
  useEffect(() => {
    if (!hasFiles || !activeConcept?.files?.[0]?.name) return;
    const target = activeConcept.files[0].name;
    if (files.some((f) => f.name === target)) setSelectedFile(target);
  }, [activeConcept?.id, hasFiles, activeConcept?.files, files]);

  useEffect(() => {
    onSelectedFileChange?.(selectedFile);
  }, [selectedFile, onSelectedFileChange]);

  const currentCode = hasFiles 
    ? (files.find(f => f.name === selectedFile)?.code || '') 
    : code;

  const implicit = activeConcept?.implicitThis;
  /** Multi-file: active tab must match `implicit.file`. Single-file lessons use tab `Main.java`. */
  const implicitThisActive = !!(implicit && selectedFile === implicit.file);

  const codeLines = useMemo(() => currentCode.split('\n'), [currentCode]);

  const classStructureLayout = useMemo(() => {
    if (!showClassLayout || implicitThisActive) return null;
    return parseJavaClassLayout(currentCode);
  }, [showClassLayout, implicitThisActive, currentCode]);

  /** Wider margin after line numbers when access glyphs are shown so +/− sit in a clear column, not on the code. */
  const accessGlyphGutter =
    showClassLayout && classStructureLayout && !implicitThisActive ? '1.25em' : '0.25em';

  const scopeVisualization = useMemo(() => {
    if (!showScopeLanes || implicitThisActive) {
      return { inner: null as ReturnType<typeof buildScopeLanes>['inner'], lanes: [] as ReturnType<typeof buildScopeLanes>['lanes'] };
    }
    const isStepFile = !hasFiles || !step.activeFile || step.activeFile === selectedFile;
    if (!isStepFile) {
      return { inner: null, lanes: [] };
    }
    return buildScopeLanes(codeLines, step.codeLine);
  }, [showScopeLanes, implicitThisActive, hasFiles, step.activeFile, step.codeLine, selectedFile, codeLines]);

  const scopeLanesForDisplay = useMemo(
    () => filterScopeLanesForFocus(scopeVisualization.lanes, scopeVariableFocus),
    [scopeVisualization.lanes, scopeVariableFocus],
  );

  useEffect(() => {
    if (scopeVariableFocus === 'all') return;
    if (!scopeVisualization.lanes.some((l) => l.name === scopeVariableFocus)) {
      setScopeVariableFocus('all');
    }
  }, [scopeVisualization.lanes, scopeVariableFocus]);

  useEffect(() => {
    setScopeVariableFocus('all');
  }, [step.id, selectedFile]);

  useLayoutEffect(() => {
    if (!scrollToLine || scrollToLine.file !== selectedFile) return;
    const id = codeLineElementId(scrollToLine.file, scrollToLine.line);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      setScrollToLine(null);
    }, 32);
    return () => clearTimeout(t);
  }, [scrollToLine, selectedFile]);

  /** Keep the current step line in view when stepping (Next/Prev) or switching tabs into another file. */
  useLayoutEffect(() => {
    if (step.codeLine < 0) return;
    const isStepForThisFile = !hasFiles || !step.activeFile || step.activeFile === selectedFile;
    if (!isStepForThisFile) return;
    const id = codeLineElementId(selectedFile, step.codeLine);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 48);
    return () => clearTimeout(t);
  }, [step.id, step.codeLine, step.activeFile, selectedFile, hasFiles, implicitThisActive]);

  const handleCodeMouseUp = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      if (ev.button !== 0) return;
      if (window.getSelection()?.toString()) return;
      const root = codeAreaRef.current;
      if (!root?.contains(ev.target as Node)) return;
      const w = wordAtClick(ev.clientX, ev.clientY, document);
      if (!w) return;

      const isStepFile = !hasFiles || !step.activeFile || step.activeFile === selectedFile;
      if (showScopeLanes && isStepFile && !implicitThisActive) {
        const names = new Set(scopeVisualization.lanes.map((l) => l.name));
        if (names.has(w)) {
          setScopeVariableFocus(w);
          return;
        }
      }

      if (!onNavigateToSymbol || navBySymbol.size === 0) return;
      const target = navBySymbol.get(w);
      if (target) onNavigateToSymbol(target);
    },
    [
      hasFiles,
      step.activeFile,
      selectedFile,
      showScopeLanes,
      implicitThisActive,
      scopeVisualization.lanes,
      onNavigateToSymbol,
      navBySymbol,
    ],
  );

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 font-mono text-sm text-slate-800 shadow-inner dark:border-slate-800 dark:bg-[#1e1e1e] dark:text-slate-50">
      {/* Toolbar above file tabs: always room for Class / Scopes / Format / Edit */}
      <div className="shrink-0 border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-[#252526]">
        <div className="flex flex-wrap items-center justify-end gap-1.5 border-b border-slate-200/90 px-2 py-2 dark:border-slate-800/90">
          <button
            type="button"
            onClick={() => setShowClassLayout((v) => !v)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
              showClassLayout
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-900 hover:bg-amber-500/25 dark:border-amber-500/35 dark:bg-amber-500/12 dark:text-amber-100 dark:hover:bg-amber-500/20'
                : 'border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:border-slate-600/60 dark:text-slate-500 dark:hover:border-slate-500 dark:hover:text-slate-300',
            )}
            title={
              showClassLayout
                ? 'Hide class layout overlays'
                : 'Show section ribbons, row tints, and access glyphs'
            }
          >
            <LayoutGrid size={12} />
            Class
          </button>
          <button
            type="button"
            onClick={() => setShowScopeLanes((v) => !v)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
              showScopeLanes
                ? 'border-violet-500/35 bg-violet-100 text-violet-900 hover:bg-violet-200/80 dark:bg-violet-500/15 dark:text-violet-200 dark:hover:bg-violet-500/25'
                : 'border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:border-slate-600/60 dark:text-slate-500 dark:hover:border-slate-500 dark:hover:text-slate-300',
            )}
            title={
              showScopeLanes
                ? 'Hide scope visualization'
                : 'Show scope: main body tint and lanes for locals (click a name or use the scope menu to focus one)'
            }
          >
            <Layers2 size={12} />
            Scopes
          </button>
          <button
            type="button"
            disabled={formatBusy || !currentCode.trim()}
            onClick={async () => {
              if (!onFormatToCustom) return;
              setFormatBusy(true);
              try {
                await onFormatToCustom();
              } finally {
                setFormatBusy(false);
              }
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-200/80 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600/60 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800/60"
            title={
              onFormatToCustom
                ? 'Pretty-print this tab with Prettier (Java). Custom visualizations update here; examples open in Custom Code with formatted source.'
                : undefined
            }
          >
            {formatBusy ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            Format
          </button>
          {onEditLesson && (
            <button
              type="button"
              onClick={onEditLesson}
              aria-label="Edit in Custom Code"
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-teal-500/35 bg-teal-50 px-2.5 py-1.5 text-xs font-medium text-teal-800 transition-colors hover:bg-teal-100 dark:border-teal-500/25 dark:bg-teal-500/10 dark:text-teal-400 dark:hover:bg-teal-500/20"
              title="Edit this file in Custom Code"
            >
              <Pencil size={12} />
              Edit
            </button>
          )}
        </div>
        {/* File tabs: own row scrolls horizontally so labels are never clipped */}
        <div className="flex min-w-0 overflow-x-auto overflow-y-hidden [scrollbar-width:thin]">
          {hasFiles ? (
            files.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file.name)}
                className={cn(
                  'flex shrink-0 items-center gap-2 whitespace-nowrap border-t-2 px-4 py-2.5 text-xs font-medium transition-colors',
                  selectedFile === file.name
                    ? 'border-teal-500 bg-slate-50 text-teal-800 dark:bg-[#1e1e1e] dark:text-teal-400'
                    : 'border-transparent text-slate-600 hover:bg-slate-200/90 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#2a2d2e] dark:hover:text-slate-300',
                )}
              >
                <FileCode2 size={14} className="shrink-0" />
                {file.name}
              </button>
            ))
          ) : (
            <div className="flex shrink-0 items-center gap-2 whitespace-nowrap border-t-2 border-teal-500 bg-slate-50 px-4 py-2.5 text-xs font-medium text-teal-800 dark:bg-[#1e1e1e] dark:text-teal-400">
              <FileCode2 size={14} />
              Main.java
            </div>
          )}
        </div>
      </div>

      {/* Code Area */}
      <div
        ref={codeAreaRef}
        className="flex-1 overflow-y-auto p-4"
        onMouseUp={handleCodeMouseUp}
        title={
          navBySymbol.size > 0 && onNavigateToSymbol
            ? 'Click a name to open its definition tab'
            : undefined
        }
      >
        {navBySymbol.size > 0 && onNavigateToSymbol && (
          <p className="mb-2 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
            Click a name in the code to jump to its definition when available.
          </p>
        )}
        {showScopeLanes &&
          !implicitThisActive &&
          scopeVisualization.lanes.length > 0 &&
          (!hasFiles || !step.activeFile || step.activeFile === selectedFile) && (
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] leading-snug text-violet-900 dark:text-violet-200/90">
              <span className="font-bold uppercase tracking-wide text-violet-800 dark:text-violet-300/95">Scope lane</span>
              <label className="inline-flex items-center gap-2">
                <span className="text-violet-800/90 dark:text-violet-200/75">Show</span>
                <select
                  value={scopeVariableFocus}
                  onChange={(e) => setScopeVariableFocus(e.target.value)}
                  className="max-w-[12rem] cursor-pointer rounded-md border border-violet-300 bg-white px-2 py-1 font-mono text-[11px] font-semibold text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-violet-500/35 dark:bg-[#1e1e1e] dark:text-violet-100 dark:focus:ring-violet-500/40"
                  aria-label="Which local variable scope to show in the gutter"
                >
                  <option value="all">All variables</option>
                  {scopeVisualization.lanes.map((l) => (
                    <option key={l.name} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </label>
              <span className="text-violet-700/90 dark:text-violet-200/65">or click a local name in the code.</span>
            </div>
          )}
        {implicitThisActive && implicit && (
          <p className="mb-2 text-[11px] leading-snug text-fuchsia-900 dark:text-fuchsia-200/90">
            Teaching view: extra receiver parameter (not real Java;{' '}
            <code className="text-fuchsia-800 dark:text-fuchsia-100">this</code> is still implicit).
          </p>
        )}
        {implicitThisActive && implicit ? (
          <ImplicitThisJavaBlock
            rawCode={currentCode}
            javaClassName={implicit.className}
            selectedFile={selectedFile}
            step={step}
            hasFiles={!!hasFiles}
            activeConcept={activeConcept ?? null}
            preferImplementationConceptLines={preferImplementationConceptLines}
          />
        ) : (
          <SyntaxHighlighter
            language="java"
            style={prismStyle}
            customStyle={{
              background: 'transparent',
              margin: 0,
              padding: 0,
              // Horizontal center of access glyph in the gutter after line numbers (see index.css)
              ['--cv-access-glyph-center' as string]: `calc(3em + 1.25em + (${accessGlyphGutter} * 0.5))`,
              ['--cv-line-num-margin-right' as string]: accessGlyphGutter,
            }}
            codeTagProps={{
              className: 'language-java cv-syntax-code',
              style: {
                ...(prismStyle['code[class*="language-"]'] as object),
                ...((prismStyle['code[class*="language-java"]'] ?? {}) as object),
              },
            }}
            showLineNumbers={true}
            wrapLines={true}
            lineProps={(lineNumber) => {
              const index = lineNumber - 1;
              const isStepForThisFile = !hasFiles || step.activeFile === selectedFile;
              const isCurrentLine = isStepForThisFile && index === step.codeLine;
              const highlight = isStepForThisFile ? step.highlights?.find((h) => h.line === index) : undefined;

              let isConceptLine = false;
              if (activeConcept) {
                if (hasFiles && activeConcept.files) {
                  const fileConcept = activeConcept.files.find((f) => f.name === selectedFile);
                  if (fileConcept && fileConcept.lines.includes(index)) {
                    isConceptLine = true;
                  }
                } else if (!hasFiles) {
                  const lineSet =
                    preferImplementationConceptLines && activeConcept.implementationLines?.length
                      ? activeConcept.implementationLines
                      : activeConcept.lines;
                  if (lineSet?.includes(index)) isConceptLine = true;
                }
              }

              const scopeStyle =
                showScopeLanes && isStepForThisFile
                  ? scopeLineStyle(index, scopeVisualization.inner, scopeLanesForDisplay, step.codeLine)
                  : undefined;
              const layoutStyle =
                showClassLayout && !implicitThisActive ? classLayoutLineStyle(index, classStructureLayout) : undefined;
              const mergedStyle =
                scopeStyle || layoutStyle ? { ...layoutStyle, ...scopeStyle } : undefined;

              const lineClassName = cn(
                'block px-2 py-1 rounded transition-colors duration-300 relative group',
                isConceptLine
                  ? 'border-l-4 border-amber-500 bg-amber-500/15 dark:bg-amber-500/20'
                  : isCurrentLine
                    ? 'border-l-4 border-teal-500 bg-teal-100 dark:bg-teal-900/40'
                    : 'border-l-4 border-transparent hover:bg-slate-200/70 dark:hover:bg-slate-800/50',
                highlight?.colorClass,
                showClassLayout && !implicitThisActive && classLayoutLineClassNames(classStructureLayout, index),
              );

              const ribbon = classLayoutDataAttrs(classStructureLayout, index);
              const layoutTitle = classLayoutLineTitle(classStructureLayout, index);

              return {
                ...ribbon,
                className: lineClassName,
                id: codeLineElementId(selectedFile, index),
                style: mergedStyle,
                title: layoutTitle,
              };
            }}
            lineNumberStyle={(lineNumber) => {
              const index = lineNumber - 1;
              const isStepForThisFile = !hasFiles || !step.activeFile || step.activeFile === selectedFile;
              if (!showScopeLanes || !isStepForThisFile || implicitThisActive) return {};
              const gs = scopeGutterStyle(
                index,
                scopeVisualization.inner,
                scopeLanesForDisplay,
                step.codeLine,
              );
              return gs ?? {};
            }}
          >
            {currentCode}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
