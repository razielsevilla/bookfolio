"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page5ProjectsList() {
  const { goToSheet, data, setSelectedProject, selectedProjectId } = useBookfolio();

  const viewProject = (id: string) => {
    setSelectedProject(id);
    goToSheet(3);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER IV : RELICS OF CREATION</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Great Forge</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-1 pb-2">
        <div className="grid grid-cols-1 gap-3 mt-2">
          {data.projects.map(item => {
            const isActive = item.id === (selectedProjectId || data.projects[0]?.id);
            return (
              <div 
                key={item.id}
                onClick={() => viewProject(item.id)}
                className={`rounded-xl p-4 flex items-center justify-between border cursor-pointer group transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#D4A574]/15 to-transparent border-[#D4A574]/50 shadow-md opacity-100' 
                    : 'bg-black/5 border-[#4E4B46]/20 shadow-sm hover:border-[#D4A574]/40 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-[#1A2340] font-bold text-base sm:text-lg font-headline truncate tracking-wide">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-[10px] text-[#1A2340]/60 font-mono mt-1 uppercase tracking-wider truncate">{item.subtitle}</p>
                  )}
                </div>
                <div className={`ml-4 shrink-0 p-2 rounded-full border transition-colors ${
                  isActive 
                    ? 'bg-[#D4A574]/20 border-[#D4A574]/30' 
                    : 'bg-black/5 border-black/5 group-hover:bg-[#1A2340]/10'
                }`}>
                  <svg className={`w-4 h-4 transition-all ${
                    isActive 
                      ? 'text-[#1A2340] translate-x-0.5' 
                      : 'text-[#1A2340]/70 group-hover:translate-x-0.5 group-hover:text-[#1A2340]'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
