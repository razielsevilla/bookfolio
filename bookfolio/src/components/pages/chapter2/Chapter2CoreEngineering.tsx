"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';
import CompetencySectionBlock from './CompetencySectionBlock';

// Chapter II — Left Page: Core Engineering & Intelligent Systems (§ 01-03)
export default function Chapter2CoreEngineering({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data } = useBookfolio();
  const leftSections = (data.competencies?.sections ?? []).slice(0, 3);

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2">
        {leftSections.map((section, idx) => (
          <CompetencySectionBlock key={idx} number={idx + 1} section={section} />
        ))}
      </div>
    </div>
  );
}
