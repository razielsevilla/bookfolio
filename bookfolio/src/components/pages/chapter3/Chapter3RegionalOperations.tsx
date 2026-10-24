"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';
import ExperienceEntryBlock from './ExperienceEntryBlock';

// Chapter III — Left Page: Regional Operations & Guilds
export default function Chapter3RegionalOperations({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data } = useBookfolio();
  const leftEntries = (data.experiences ?? []).filter(e => e.pageSide === 'left');

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2">
        {leftEntries.map((entry, idx) => (
          <ExperienceEntryBlock key={entry._id} number={idx + 1} entry={entry} />
        ))}
      </div>
    </div>
  );
}
