"use client";
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page3Experience() {
  const { data } = useBookfolio();
  const experiences = data.experiences || [];

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER II : TRAILS &amp; CHRONICLES</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Chronicles of the Crucible</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>

      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <div key={exp.id || idx} className={`relative pl-6 ${idx < experiences.length - 1 ? 'border-l-2 border-[#D4A574]/30' : ''}`}>
            <div className={`absolute ${idx < experiences.length - 1 ? '-left-[9px]' : '-left-[7px]'} top-1 w-4 h-4 rounded-full bg-[#D4A574] border-4 border-[#F4EAD5]`}></div>
            <span className="text-[10px] font-mono uppercase text-[var(--paper-primary)] font-bold">{exp.startDate} - {exp.endDate || 'Present'}</span>
            <h4 className="font-bold text-xs leading-snug text-[#1A2340] font-headline">{exp.title}</h4>
            <p className="text-[11px] text-[#1A2340]/80 leading-relaxed font-body">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
