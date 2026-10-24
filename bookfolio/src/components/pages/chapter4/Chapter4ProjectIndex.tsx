"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';

// Chapter IV — Left Page: The Project Ledger (Index & Selector)
export default function Chapter4ProjectIndex({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data, selectedProjectId, setSelectedProject } = useBookfolio();
  const featured = (data.projects ?? []).filter(p => p.featured);
  const activeId = selectedProjectId && featured.some(p => p._id === selectedProjectId)
    ? selectedProjectId
    : featured[0]?._id;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2 space-y-2">
        {featured.map((project, idx) => {
          const isActive = project._id === activeId;
          return (
            <button
              key={project._id}
              type="button"
              onClick={() => setSelectedProject(project._id)}
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
                <h5 className="font-bold text-sm font-headline text-[#1A2340]">{project.title}</h5>
              </div>
              {project.subtitle && (
                <p className="text-[11px] text-[#1A2340]/70 font-body mt-1 ml-5 leading-snug">{project.subtitle}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
