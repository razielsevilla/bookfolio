export default function CoverBack() {
  return (
    <>
      <div>
        <h4 className="text-sm tracking-[0.2em] font-medium text-[#E8C77A] font-headline">BOOKFOLIO</h4>
        <div className="w-12 h-px bg-[#D4A574]/30 mx-auto mt-2"></div>
      </div>

      <div className="my-auto">
        <div className="w-16 h-16 mx-auto mb-4 border border-[#D4A574]/20 rounded-full flex items-center justify-center text-[#D4A574]/70">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-xl font-bold font-headline text-[#E8C77A]">COLOPHON</h3>
        <p className="text-xs text-[#F4EAD5]/80 max-w-xs mx-auto mt-2 font-body leading-relaxed">
          Hand-compiled using HTML5 CSS3 preservation matrices and dynamic synthesized physical nodes in 2026.
        </p>
      </div>

      <div className="text-[10px] tracking-wider text-[#D4A574] font-body">
        &copy; 2026 RAZIEL SEVILLA. ALL RIGHTS RESERVED.
      </div>
    </>
  );
}
