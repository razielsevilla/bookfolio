"use client";
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page6Projects1() {
  const { data, selectedProjectId } = useBookfolio();
  
  // Default to first project if none selected
  const activeProject = selectedProjectId 
    ? data.projects.find(p => p.id === selectedProjectId) || data.projects[0]
    : data.projects[0];

  if (!activeProject) {
    return <div>No projects found.</div>;
  }

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body" id="showcase-category">RELIQUARY VIEW</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]" id="showcase-title">{activeProject.title}</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>

      <div className={`relative w-full h-32 rounded-xl bg-gradient-to-br ${activeProject.color || 'from-[#243054] to-[#1A2340]'} border border-[#4E4B46]/35 p-0.5 overflow-hidden mb-4 shadow-md group`}>
        <div 
          className="absolute inset-0 bg-black/20 flex items-center justify-center text-[#E8C77A]" 
          id="showcase-graphic"
          dangerouslySetInnerHTML={{ __html: activeProject.graphic || '' }}
        />
      </div>

      <p className="text-sm leading-relaxed text-[#1A2340]/90 text-justify mb-4 font-body" id="showcase-desc">
        {activeProject.desc}
      </p>

      <div className="p-3 bg-black/5 rounded-xl border border-[#4E4B46]/20 grid grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Client:</span>
          <span className="text-[#1A2340] font-bold font-body" id="showcase-client">{activeProject.client}</span>
        </div>
        <div>
          <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Tech Stack:</span>
          <span className="text-[#1A2340] font-bold font-body" id="showcase-tech">{activeProject.tech}</span>
        </div>
      </div>
    </div>
  );
}
