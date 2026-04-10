import type { ApExamFrqSheet } from '../types';
import { stepDescriptionToReactNodes } from '../lib/stepDescriptionRichText';
import { cn } from '../lib/utils';

function Rich({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        'whitespace-pre-wrap text-[13px] leading-relaxed text-slate-800 dark:text-slate-200 [&_strong]:text-slate-950 dark:[&_strong]:text-white',
        className,
      )}
    >
      {stepDescriptionToReactNodes(text)}
    </div>
  );
}

export default function ApExamFrqSheetPanel({ sheet }: { sheet: ApExamFrqSheet }) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-2 border-slate-800/25 bg-[#fbfaf7] shadow-sm dark:border-slate-500/35 dark:bg-slate-950/90"
      role="region"
      aria-label={`AP ${sheet.year} free-response question ${sheet.questionNumber}`}
    >
      <header className="shrink-0 border-b border-slate-300/90 bg-slate-200/60 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/90">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
          {sheet.year} AP Computer Science A — Section II (abridged for screen)
        </p>
        <h2 className="mt-1.5 font-serif text-[17px] font-bold leading-snug text-slate-900 dark:text-slate-100">
          <span className="tabular-nums">Question {sheet.questionNumber}. </span>
          {stepDescriptionToReactNodes(sheet.headline)}
        </h2>
      </header>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-3 py-3">
        <section>
          <h3 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
            Directions
          </h3>
          <Rich text={sheet.directions} />
          <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] leading-relaxed text-slate-700 dark:text-slate-300">
            {sheet.notes.map((n, i) => (
              <li key={i}>{stepDescriptionToReactNodes(n)}</li>
            ))}
          </ul>
        </section>
        {sheet.parts.map((p) => (
          <section
            key={p.label}
            className="rounded-lg border border-slate-300/80 bg-white/90 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/60"
          >
            <h3 className="mb-1.5 font-serif text-[15px] font-bold text-slate-900 dark:text-slate-100">
              {p.label}
              {p.title ? <> — {stepDescriptionToReactNodes(p.title)}</> : null}
            </h3>
            <Rich text={p.body} />
          </section>
        ))}
        {sheet.solutionHint ? (
          <details className="rounded-lg border border-teal-200/80 bg-teal-50/50 px-3 py-2 dark:border-teal-900/50 dark:bg-teal-950/25">
            <summary className="cursor-pointer text-xs font-bold text-teal-900 dark:text-teal-200">
              Approach (not a scored rubric)
            </summary>
            <div className="mt-2 border-t border-teal-200/60 pt-2 dark:border-teal-900/40">
              <Rich text={sheet.solutionHint} className="text-[12px]" />
            </div>
          </details>
        ) : null}
        {sheet.footerExamLinks && sheet.footerExamLinks.length > 0 ? (
          <div className="space-y-1.5 pb-1 text-[10px] leading-snug text-slate-500 dark:text-slate-500">
            <p className="font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">Released PDFs</p>
            <ul className="list-none space-y-1 pl-0">
              {sheet.footerExamLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="font-semibold text-teal-700 underline decoration-teal-500/40 underline-offset-2 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
