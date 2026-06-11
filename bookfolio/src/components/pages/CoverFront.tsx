export default function CoverFront() {
  return (
    <>
      <div className="absolute -inset-8 bg-[radial-gradient(circle_at_center,_rgba(212,165,116,0.08)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4A574]/30 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4A574]/30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4A574]/30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4A574]/30 pointer-events-none"></div>

      <div className="z-10 relative mt-2 text-center">
        <p className="text-xs tracking-[0.25em] font-medium text-[#D4A574] font-body">PORTFOLIO CODEX 2026</p>
        <div className="w-12 h-px bg-[#D4A574]/40 mx-auto mt-2"></div>
      </div>

      <div className="my-auto py-6 z-10 relative text-center">
        <div className="relative w-36 h-36 mx-auto mb-10 flex items-center justify-center">
          <div className="absolute inset-0 border-[1px] border-dashed border-[#D4A574]/40 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-2 border-[1px] border-dotted border-[#E8C77A]/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute inset-5 border border-[#E8C77A]/30 bg-[#1A2340]/80 rounded-full shadow-[0_0_30px_rgba(232,199,122,0.15)] flex items-center justify-center text-[#E8C77A] backdrop-blur-sm">
            <svg className="w-10 h-10 drop-shadow-[0_0_8px_rgba(232,199,122,0.5)]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-[0.2em] font-headline leading-tight text-[#E8C77A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">BOOKFOLIO</h2>
        <p className="text-[10px] tracking-widest mt-4 text-[#D4A574] font-body opacity-90 drop-shadow-md">A MULTI-DIMENSIONAL WEB SHOWCASE</p>
        
        <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-10 h-[1px] bg-[#D4A574]/30"></div>
            <p className="text-[10px] tracking-[0.3em] text-[#E8C77A]/70 font-mono">RAZIEL SEVILLA</p>
            <div className="w-10 h-[1px] bg-[#D4A574]/30"></div>
        </div>
      </div>

      <div className="text-[10px] text-center tracking-[0.2em] font-headline text-[#E8C77A] hover:text-white transition-all animate-pulse z-10 relative mb-2">
        CLICK TO UNVEIL &rarr;
      </div>
    </>
  );
}
