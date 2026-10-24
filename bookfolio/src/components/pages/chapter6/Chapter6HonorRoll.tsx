"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';

// Chapter VI — Left Page: The Roll of Honor (Master List)
// Interactive card list matching Chapter IV's original pattern, per spec.
export default function Chapter6HonorRoll({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data, selectedAwardId, setSelectedAward } = useBookfolio();
  const awards = data.awards ?? [];
  const activeId = selectedAwardId && awards.some(a => a._id === selectedAwardId)
    ? selectedAwardId
    : awards[0]?._id;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2 space-y-2">
        {awards.map((award, idx) => {
          const isActive = award._id === activeId;
          return (
            <button
              key={award._id}
              type="button"
              onClick={() => setSelectedAward(award._id)}
              className={`w-full text-left p-3 rounded-lg border transition-all group ${
                isActive
                  ? 'bg-amber-900/10 border-[var(--paper-primary)] border-l-4'
                  : 'bg-[#1A2340]/5 border-[#4E4B46]/15 hover:bg-[#1A2340]/10 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`text-xs shrink-0 ${isActive ? 'text-[var(--paper-primary)]' : 'text-[#1A2340]/30 group-hover:text-[var(--paper-primary)]'}`}>
                  {isActive ? '▸' : '•'}
                </span>
                <span className="text-xs font-mono text-[var(--paper-primary)] font-bold">{String(idx + 1).padStart(2, '0')}.</span>
                <h5 className="font-bold text-sm font-headline text-[#1A2340]">{award.title}</h5>
              </div>
              {award.category && (
                <span className="block text-[9px] font-mono uppercase tracking-wider text-[var(--paper-primary)]/70 mt-1 ml-5">
                  {award.category}
                </span>
              )}
              {(award.distinctionTier || award.team) && (
                <p className="text-[11px] text-[#1A2340]/70 font-body mt-1 ml-5 leading-snug">
                  {award.distinctionTier}
                  {award.distinctionTier && award.team && ' · '}
                  {award.team}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
