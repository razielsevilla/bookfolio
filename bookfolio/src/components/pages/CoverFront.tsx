export default function CoverFront() {
  return (
    <>
      <div>
        <p className="text-xs tracking-[0.25em] font-medium text-[#D4A574] font-body">PORTFOLIO CODEX 2026</p>
        <div className="w-12 h-px bg-[#D4A574]/40 mx-auto mt-2"></div>
      </div>

      <div className="my-auto py-6">
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center text-[#E8C77A] rounded-full border border-[#D4A574]/30 bg-[#243054]/40 shadow-lg interactive-cue">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest font-headline leading-tight text-[#E8C77A]">BOOKFOLIO</h2>
        <p className="text-[10px] tracking-widest mt-3 text-[#D4A574] font-body">A MULTI-DIMENSIONAL WEB SHOWCASE</p>
      </div>

      <div className="text-xs tracking-[0.2em] font-headline text-[#E8C77A] hover:text-white transition-all animate-pulse">
        CLICK TO UNVEIL &rarr;
      </div>
    </>
  );
}
