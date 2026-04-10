import React from 'react';
import { Step, Concept } from '../types';
import { cn } from '../lib/utils';
import { codeLineElementId } from '../lib/wordAtClick';
import { applyImplicitThisTeachingTransform, javaLineToTeachingHtml } from '../lib/implicitThisSyntax';

type Props = {
  rawCode: string;
  javaClassName: string;
  selectedFile: string;
  step: Step;
  hasFiles: boolean;
  activeConcept: Concept | null;
  preferImplementationConceptLines?: boolean;
};

export default function ImplicitThisJavaBlock({
  rawCode,
  javaClassName,
  selectedFile,
  step,
  hasFiles,
  activeConcept,
  preferImplementationConceptLines = false,
}: Props) {
  const transformed = applyImplicitThisTeachingTransform(rawCode, javaClassName);
  const lines = transformed.split('\n');

  return (
    <pre
      className="m-0 bg-transparent p-0 font-mono text-[13px] leading-relaxed"
      style={{ margin: 0, padding: 0, background: 'transparent' }}
    >
      {lines.map((line, index) => {
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

        const rowClass = cn(
          'block px-2 py-1 rounded transition-colors duration-300 border-l-4',
          isConceptLine
            ? 'border-amber-500 bg-amber-500/15 dark:bg-amber-500/20'
            : isCurrentLine
              ? 'border-teal-500 bg-teal-100 dark:bg-teal-900/40'
              : 'border-transparent hover:bg-slate-200/70 dark:hover:bg-slate-800/50',
          highlight?.colorClass,
        );

        const html = javaLineToTeachingHtml(line, javaClassName);

        return (
          <div
            key={index}
            id={codeLineElementId(selectedFile, index)}
            className={rowClass}
            style={{ display: 'block' }}
          >
            <span className="cv-java-line-gutter">
              {index + 1}
            </span>
            <code dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      })}
    </pre>
  );
}
