export default function CoverBack() {
  return (
    <>
      <div className="absolute -inset-8 bg-[radial-gradient(circle_at_center,_rgba(212,165,116,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4A574]/20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4A574]/20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4A574]/20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4A574]/20 pointer-events-none"></div>

      <div className="z-10 relative mt-2 text-center">
        <h4 className="text-sm tracking-[0.2em] font-medium text-[#E8C77A] font-headline">BOOKFOLIO</h4>
        <div className="w-12 h-px bg-[#D4A574]/30 mx-auto mt-2"></div>
      </div>

      <div className="my-auto z-10 relative text-center">
        <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border-[1px] border-dashed border-[#D4A574]/20 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
          <div className="absolute inset-3 border border-[#D4A574]/20 bg-[#1A2340]/50 rounded-full flex items-center justify-center text-[#D4A574]/70 shadow-[0_0_20px_rgba(232,199,122,0.05)]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        
        <h3 className="text-xl font-bold font-headline text-[#E8C77A] tracking-[0.15em]">COLOPHON</h3>
        <div className="w-8 h-[1px] bg-[#D4A574]/30 mx-auto mt-3 mb-5"></div>
        <p className="text-[11px] text-[#F4EAD5]/70 max-w-[220px] mx-auto font-body leading-relaxed uppercase tracking-wider">
          Hand-compiled using HTML5 CSS3 preservation matrices and dynamic synthesized physical nodes in 2026.
        </p>
      </div>

      <div className="text-[9px] tracking-[0.2em] text-[#D4A574]/80 font-mono z-10 relative mb-2 text-center">
        &copy; 2026 RAZIEL SEVILLA<br/>ALL RIGHTS RESERVED
      </div>
    </>
  );
}
