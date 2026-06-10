"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page3Experience() {
  const { data } = useBookfolio();
  const experiences = data.experiences || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER II : TRAILS &amp; CHRONICLES</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Chronicles of the Crucible</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2 space-y-4">
        {experiences.map((exp, idx) => (
          <div key={exp.id || idx} className={`relative pl-6 ${idx < experiences.length - 1 ? 'border-l-2 border-[#D4A574]/30' : ''}`}>
            <div className={`absolute ${idx < experiences.length - 1 ? '-left-[9px]' : '-left-[7px]'} top-1 w-4 h-4 rounded-full bg-[#D4A574] border-4 border-[#F4EAD5]`}></div>
            
            <button 
              onClick={() => {
                const identifier = exp.id || String(idx);
                setExpandedId(expandedId === identifier ? null : identifier);
              }}
              className="w-full text-left group cursor-pointer"
              type="button"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase text-[var(--paper-primary)] font-bold">
                  {exp.yearRange}
                </span>
                <span className="text-xs font-bold text-[#1A2340]/40 group-hover:text-[var(--paper-primary)] transition-colors">
                  {expandedId === (exp.id || String(idx)) ? '−' : '+'}
                </span>
              </div>
              <h4 className="font-bold text-sm leading-snug text-[#1A2340] font-headline group-hover:text-[var(--paper-primary)] transition-colors">
                {exp.title}
              </h4>
            </button>
            
            {expandedId === (exp.id || String(idx)) && (
              <p className="mt-1 text-[11px] text-[#1A2340]/80 leading-relaxed font-body">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
