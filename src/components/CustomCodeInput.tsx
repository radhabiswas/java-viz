import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../lib/useDarkMode';
import { Play, Loader2, Sparkles } from 'lucide-react';
import { formatJavaCode } from '../lib/formatJava';
import { Lesson } from '../types';
import { buildDeterministicCustomLesson } from '../lib/buildCustomLesson';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css';

export default function CustomCodeInput({
  onLessonGenerated,
  initialCode = '',
}: {
  onLessonGenerated: (lesson: Lesson) => void;
  initialCode?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formatError, setFormatError] = useState('');
  const [formatBusy, setFormatBusy] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDark = useDarkMode();

  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCode(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleFormat = async () => {
    if (!code.trim()) return;
    setFormatError('');
    setFormatBusy(true);
    try {
      const formatted = await formatJavaCode(code);
      setCode(formatted);
    } catch (e) {
      setFormatError(e instanceof Error ? e.message : 'Could not format.');
    } finally {
      setFormatBusy(false);
    }
  };

  const handleVisualize = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError('');

    try {
      await Promise.resolve();
      const lesson = buildDeterministicCustomLesson(code);
      onLessonGenerated(lesson);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Could not build a lesson from this code.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-950 p-6 gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">
            Line-by-line
          </h2>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Custom Java Code
          </h1>
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border ${isDragging ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-900/10' : 'border-slate-200 dark:border-slate-800'} overflow-hidden p-6 transition-colors`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">
          Paste Java or{' '}
          <strong className="text-teal-600 dark:text-teal-400">drop a .java file</strong> here.{' '}
          <span className="text-slate-500 dark:text-slate-500">
            Visualization is built locally: one step per line, no external services.
          </span>
        </p>

        <div
          className={`flex w-full flex-1 flex-col overflow-hidden rounded-xl border shadow-inner ${
            isDark
              ? 'border-slate-800 bg-[#1d1f21]'
              : 'border-slate-200 bg-[#f8f9fc]'
          }`}
        >
          <div
            className={`flex items-center justify-end gap-2 border-b px-3 py-2 ${
              isDark ? 'border-slate-800 bg-[#252526]' : 'border-slate-200 bg-slate-100'
            }`}
          >
            <button
              type="button"
              disabled={formatBusy || !code.trim()}
              onClick={handleFormat}
              className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                isDark
                  ? 'border-slate-600 text-slate-200 hover:border-slate-500 hover:bg-slate-800/80'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-white'
              }`}
              title="Pretty-print with Prettier (Java)"
            >
              {formatBusy ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              Format
            </button>
          </div>
          <div className="javaviz-custom-editor flex-1 overflow-y-auto">
            <Editor
              value={code}
              onValueChange={(c) => setCode(c)}
              highlight={(c) => Prism.highlight(c, Prism.languages.java, 'java')}
              padding={16}
              placeholder={`public class Main {\n  public static void main(String[] args) {\n    int x = 10;\n    String s = \"Hello\";\n  }\n}`}
              className="font-mono text-sm min-h-full"
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                backgroundColor: 'transparent',
                color: isDark ? '#c5c8c6' : '#383a42',
              }}
              textareaClassName="focus:outline-none"
            />
          </div>
        </div>

        {(formatError || error) && (
          <div className="mt-4 space-y-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {formatError && <p>{formatError}</p>}
            {error && <p>{error}</p>}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleVisualize}
            disabled={loading || !code.trim()}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-teal-900/20"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Building steps…
              </>
            ) : (
              <>
                <Play size={20} />
                Visualize code
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
