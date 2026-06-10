"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page4Skills() {
  const { data } = useBookfolio();
  const skills = data.skills || [];
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const activeSkill = skills.find(s => (s.id || s._id) === activeSkillId);

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER III : THE ARCANUM OF CRAFTS</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Guild of Instruments</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>

        <div className="p-3 bg-black/5 border border-[#4E4B46]/20 rounded-xl text-xs leading-relaxed text-[#1A2340]/80 font-body mb-4 h-[84px] flex items-center overflow-hidden">
          {activeSkill ? (
            <span><span className="font-bold">{activeSkill.name}:</span> {activeSkill.description}</span>
          ) : (
            <div className="w-full">
              <span className="font-bold block text-[var(--paper-primary)] mb-1">Interactive Highlight:</span>
              Click on any capability card below to review practical deployment details and architecture methodologies instantly.
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2 space-y-4">
        {skills.map(skill => (
          <div 
            key={skill._id || skill.id}
            className={`p-3 rounded-xl border transition-all cursor-pointer group ${activeSkillId === (skill._id || skill.id) ? 'bg-black/10 border-[var(--paper-primary)]/40' : 'bg-black/5 border-[#4E4B46]/15 hover:border-[var(--paper-primary)]/40 hover:bg-black/10'}`}
            onClick={() => setActiveSkillId(skill._id || skill.id)}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-[#1A2340]">
                <span dangerouslySetInnerHTML={{ __html: skill.iconSvg || '<svg class="w-4 h-4 text-[var(--paper-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' }} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold font-body">{skill.name}</span>
                  {skill.category && (
                    <span className="text-[9px] font-mono text-[var(--paper-primary)] uppercase tracking-wider">{skill.category}</span>
                  )}
                </div>
              </div>
              <span className="text-xs font-mono text-[var(--paper-primary)] font-bold">{skill.percentage}%</span>
            </div>
            <div className="w-full bg-[#1A2340]/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[var(--paper-primary)] h-1.5 rounded-full transition-all duration-1000" style={{ width: `${skill.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
