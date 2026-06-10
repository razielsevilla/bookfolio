"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page4Skills() {
  const { data } = useBookfolio();
  const skills = data.skills || [];
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const activeSkill = skills.find(s => s.id === activeSkillId);

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER III : THE ARCANUM OF CRAFTS</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Guild of Instruments</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>

      <div className="space-y-4">
        {skills.map(skill => (
          <div 
            key={skill.id}
            className={`p-3 rounded-xl border transition-all cursor-pointer group ${activeSkillId === skill.id ? 'bg-black/10 border-[var(--paper-primary)]/40' : 'bg-black/5 border-[#4E4B46]/15 hover:border-[var(--paper-primary)]/40 hover:bg-black/10'}`}
            onClick={() => setActiveSkillId(skill.id)}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold flex items-center gap-2 text-[#1A2340] font-body">
                <span dangerouslySetInnerHTML={{ __html: skill.iconSvg || '<svg class="w-4 h-4 text-[var(--paper-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>' }} />
                {skill.title}
              </span>
              <span className="text-xs font-mono text-[var(--paper-primary)] font-bold">{skill.percentage}%</span>
            </div>
            <div className="w-full bg-[#1A2340]/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[var(--paper-primary)] h-1.5 rounded-full transition-all duration-1000" style={{ width: `${skill.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-black/5 border border-[#4E4B46]/20 rounded-xl text-xs leading-relaxed text-[#1A2340]/80 font-body">
        {activeSkill ? (
          <span><span className="font-bold">{activeSkill.title}:</span> {activeSkill.description}</span>
        ) : (
          <>
            <span className="font-bold block text-[var(--paper-primary)] mb-1">Interactive Highlight:</span>
            Click on any capability card above to review practical deployment details and architecture methodologies instantly.
          </>
        )}
      </div>
    </div>
  );
}
