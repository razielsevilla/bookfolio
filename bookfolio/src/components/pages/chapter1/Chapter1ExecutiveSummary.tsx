"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';

// Chapter I — Right Page: The Executive Summary
export default function Chapter1ExecutiveSummary({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data } = useBookfolio();
  const author = data.author;
  const corePillars = author?.corePillars ?? [];

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2 space-y-4">
        {author?.summaryNarrative && (
          <p className="text-sm leading-relaxed text-justify font-body text-[#1A2340]/90">
            {author.summaryNarrative}
          </p>
        )}

        {corePillars.length > 0 && (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">Core Pillars At-A-Glance</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {corePillars.map((pillar, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold font-mono px-2 py-1 rounded-full bg-[#1A2340]/5 border border-amber-900/20 text-[var(--paper-primary)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        )}

        {author?.availabilityStatus && (
          <div className="pt-1 flex items-center gap-2 text-xs text-[#1A2340]/80 font-body">
            <span className="w-2 h-2 rounded-full bg-[var(--paper-primary)] animate-pulse"></span>
            {author.availabilityStatus}
          </div>
        )}
      </div>
    </div>
  );
}
