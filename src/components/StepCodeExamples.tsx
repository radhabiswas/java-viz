import type { Step } from '../types';
import { StepCodeExampleBlock } from './StepCodeExampleBlock';
import {
  frqPhaseAccentForLabel,
  frqReferenceBlockShellClass,
  frqReferenceBlockTitleClass,
} from '../lib/frqWalkthroughPhaseAccent';
import { cn } from '../lib/utils';

export function StepCodeExamples({
  step,
  defaultVariant = 'teal',
}: {
  step: Step;
  defaultVariant?: 'teal' | 'violet';
}) {
  const blocks = step.codeExampleBlocks;
  if (blocks != null && blocks.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        {blocks.map((block, i) => {
          const accent = block.title ? frqPhaseAccentForLabel(block.title) : 'sky';
          const titled = Boolean(block.title);
          return (
            <div
              key={i}
              className={cn(
                titled ? frqReferenceBlockShellClass(accent) : undefined,
                titled ? 'p-2.5 shadow-sm dark:shadow-none' : undefined,
              )}
            >
              {block.title ? (
                <p
                  className={cn(
                    'mb-2 text-[10px] font-bold uppercase tracking-[0.14em]',
                    frqReferenceBlockTitleClass(accent),
                  )}
                >
                  {block.title}
                </p>
              ) : null}
              <StepCodeExampleBlock
                code={block.code}
                variant={block.variant ?? (i % 2 === 0 ? 'violet' : 'teal')}
              />
            </div>
          );
        })}
      </div>
    );
  }
  if (step.codeExample) {
    return <StepCodeExampleBlock code={step.codeExample} variant={defaultVariant} />;
  }
  return null;
}
