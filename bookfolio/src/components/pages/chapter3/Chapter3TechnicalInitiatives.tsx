"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';
import ExperienceEntryBlock from './ExperienceEntryBlock';

// Chapter III — Right Page: Technical Initiatives & Institutional Governance
export default function Chapter3TechnicalInitiatives({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data } = useBookfolio();
  const experiences = data.experiences ?? [];
  const leftCount = experiences.filter(e => e.pageSide === 'left').length;
  const rightEntries = experiences.filter(e => e.pageSide === 'right');

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2">
        {rightEntries.map((entry, idx) => (
          <ExperienceEntryBlock key={entry._id} number={leftCount + idx + 1} entry={entry} />
        ))}
      </div>
    </div>
  );
}
