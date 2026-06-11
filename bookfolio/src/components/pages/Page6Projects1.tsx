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
      {activeProject.subtitle && (
        <p className="text-[10px] text-[var(--paper-primary)] font-mono mt-0.5 uppercase tracking-wider font-bold">{activeProject.subtitle}</p>
      )}
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-2 mb-4"></div>



      <p className="text-sm leading-relaxed text-[#1A2340]/90 text-justify mb-4 font-body" id="showcase-desc">
        {activeProject.desc}
      </p>

      <div className="p-3 bg-black/5 rounded-xl border border-[#4E4B46]/20 flex flex-col gap-2 text-xs font-mono">
        <div className="grid grid-cols-1 gap-2">
          <div>
            <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Tech Stack:</span>
            <span className="text-[#1A2340] font-bold font-body" id="showcase-tech">{activeProject.tech}</span>
          </div>
        </div>

        {(activeProject.repoUrl || activeProject.liveUrl || activeProject.landingUrl) && (
          <div className="grid grid-flow-col auto-cols-fr gap-2 pt-2 border-t border-[#4E4B46]/10">
            {activeProject.repoUrl && (
              <div>
                <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Repository:</span>
                <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#1A2340] font-bold font-body hover:underline truncate block">Source Code</a>
              </div>
            )}
            {activeProject.liveUrl && (
              <div>
                <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Live App:</span>
                <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#1A2340] font-bold font-body hover:underline truncate block">View Site</a>
              </div>
            )}
            {activeProject.landingUrl && (
              <div>
                <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Landing Page:</span>
                <a href={activeProject.landingUrl} target="_blank" rel="noopener noreferrer" className="text-[#1A2340] font-bold font-body hover:underline truncate block">Visit Page</a>
              </div>
            )}
          </div>
        )}

        {activeProject.collaborators && (
          <div className="pt-2 border-t border-[#4E4B46]/10">
            <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Collaborators:</span>
            <span className="text-[#1A2340] font-bold font-body">{activeProject.collaborators}</span>
          </div>
        )}
      </div>
    </div>
  );
}
