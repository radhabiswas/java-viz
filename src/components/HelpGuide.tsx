import React, { useEffect } from 'react';
import { ArrowLeft, BookMarked } from 'lucide-react';
import { HELP_SECTIONS } from '../data/helpGuide';

function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-teal-700 dark:text-teal-200">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function HelpGuide({
  onBack,
  scrollToSectionId,
  onScrollConsumed,
  onOpenLesson,
}: {
  onBack: () => void;
  scrollToSectionId: string | null;
  onScrollConsumed?: () => void;
  /** Jump to a curriculum example from a "Related examples" link. */
  onOpenLesson?: (lessonId: string) => void;
}) {
  useEffect(() => {
    if (!scrollToSectionId) return;
    const el = document.getElementById(`help-section-${scrollToSectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onScrollConsumed?.();
  }, [scrollToSectionId, onScrollConsumed]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <header className="shrink-0 border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/80 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:border-teal-400/60 hover:bg-teal-50/80 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-teal-500/40 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={18} aria-hidden />
            Back to lessons
          </button>
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <BookMarked className="text-teal-600 dark:text-teal-400" size={22} aria-hidden />
            <h1 className="text-lg font-bold tracking-tight md:text-xl">Help</h1>
          </div>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-snug text-slate-600 dark:text-slate-400">
          Short pointers only. Open the matching lesson from the left (topics{' '}
          <strong className="font-medium text-slate-800 dark:text-slate-300">Parameter passing</strong>,{' '}
          <strong className="font-medium text-slate-800 dark:text-slate-300">Constructors</strong>, etc.).{' '}
          <strong className="font-medium text-slate-800 dark:text-slate-300">Find</strong> searches lessons and this page.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <nav
          className="hidden w-56 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-900/40 md:block"
          aria-label="Help sections"
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Jump to</p>
          <ul className="flex flex-col gap-1">
            {HELP_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#help-section-${s.id}`}
                  className="block rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200/80 hover:text-teal-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-teal-300"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`help-section-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-8">
          <div className="mx-auto max-w-2xl space-y-10">
            {HELP_SECTIONS.map((section) => (
              <article
                key={section.id}
                id={`help-section-${section.id}`}
                className="scroll-mt-6 border-b border-slate-200/90 pb-10 last:border-0 last:pb-0 dark:border-slate-800/80"
              >
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white md:text-xl">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>
                      <RichLine text={p} />
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
                    {section.bullets.map((b, i) => (
                      <li key={i}>
                        <RichLine text={b} />
                      </li>
                    ))}
                  </ul>
                )}
                {section.relatedLessons && section.relatedLessons.length > 0 && (
                  <div className="mt-4 rounded-lg border border-teal-400/35 bg-teal-50/90 px-4 py-3 dark:border-teal-500/25 dark:bg-teal-950/20">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400/90">
                      Open in app
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-teal-900 dark:text-teal-100/90">
                      {section.relatedLessons.map((r) => (
                        <li key={r.id}>
                          {onOpenLesson ? (
                            <button
                              type="button"
                              onClick={() => onOpenLesson(r.id)}
                              className="text-left text-teal-800 underline decoration-teal-500/50 underline-offset-2 transition-colors hover:text-teal-950 hover:decoration-teal-600 dark:text-teal-200 dark:decoration-teal-500/40 dark:hover:text-white dark:hover:decoration-teal-400"
                            >
                              <span className="font-mono text-xs text-slate-500 dark:text-slate-500">{r.id}</span>
                              {' — '}
                              {r.label}
                            </button>
                          ) : (
                            <>
                              <span className="font-mono text-xs text-slate-500">{r.id}</span>
                              {' — '}
                              {r.label}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
