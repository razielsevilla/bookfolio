"use client";
import { useState } from 'react';

const skillDetails = {
  interface: "Interface Layer: Deep expertise in React, Next.js, Tailwind CSS, and DOM 3D hardware acceleration. Built tactile physics and interactions with WebAudio API.",
  systems: "Systems & Data Layer: Architecture of robust Node.js and Laravel environments. Proficient in database indexing and state machine implementations to prevent race-conditions.",
  infra: "Infrastructure & Cloud: Deployments on AWS and Vercel. Engineered high-frequency logging systems in C++ and memory-safe cryptographic pipelines in Rust."
};

export default function Page4Skills() {
  const [activeSkill, setActiveSkill] = useState<keyof typeof skillDetails | null>(null);

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER III : THE ARCANUM OF CRAFTS</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Guild of Instruments</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>

      <div className="space-y-4">
        <div 
          className={`p-3 rounded-xl border transition-all cursor-pointer group ${activeSkill === 'interface' ? 'bg-black/10 border-[var(--paper-primary)]/40' : 'bg-black/5 border-[#4E4B46]/15 hover:border-[var(--paper-primary)]/40 hover:bg-black/10'}`}
          onClick={() => setActiveSkill('interface')}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold flex items-center gap-2 text-[#1A2340] font-body">
              <svg className="w-4 h-4 text-[var(--paper-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              Interface Layer
            </span>
            <span className="text-xs font-mono text-[var(--paper-primary)] font-bold">95%</span>
          </div>
          <div className="w-full bg-[#1A2340]/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[var(--paper-primary)] h-1.5 rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
          </div>
        </div>

        <div 
          className={`p-3 rounded-xl border transition-all cursor-pointer group ${activeSkill === 'systems' ? 'bg-black/10 border-[var(--paper-primary)]/40' : 'bg-black/5 border-[#4E4B46]/15 hover:border-[var(--paper-primary)]/40 hover:bg-black/10'}`}
          onClick={() => setActiveSkill('systems')}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold flex items-center gap-2 text-[#1A2340] font-body">
              <svg className="w-4 h-4 text-[var(--paper-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Systems &amp; Data Layer
            </span>
            <span className="text-xs font-mono text-[var(--paper-primary)] font-bold">90%</span>
          </div>
          <div className="w-full bg-[#1A2340]/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[var(--paper-primary)] h-1.5 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
          </div>
        </div>

        <div 
          className={`p-3 rounded-xl border transition-all cursor-pointer group ${activeSkill === 'infra' ? 'bg-black/10 border-[var(--paper-primary)]/40' : 'bg-black/5 border-[#4E4B46]/15 hover:border-[var(--paper-primary)]/40 hover:bg-black/10'}`}
          onClick={() => setActiveSkill('infra')}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold flex items-center gap-2 text-[#1A2340] font-body">
              <svg className="w-4 h-4 text-[var(--paper-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Infrastructure &amp; Cloud
            </span>
            <span className="text-xs font-mono text-[var(--paper-primary)] font-bold">85%</span>
          </div>
          <div className="w-full bg-[#1A2340]/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[var(--paper-primary)] h-1.5 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-black/5 border border-[#4E4B46]/20 rounded-xl text-xs leading-relaxed text-[#1A2340]/80 font-body">
        {activeSkill ? (
          <span>{skillDetails[activeSkill]}</span>
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
