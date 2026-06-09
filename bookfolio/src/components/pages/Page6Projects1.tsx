export default function Page6Projects1() {
  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body" id="showcase-category">RELIQUARY VIEW</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]" id="showcase-title">Kumpirma</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>

      <div className="relative w-full h-32 rounded-xl bg-gradient-to-br from-[#243054] to-[#1A2340] border border-[#4E4B46]/35 p-0.5 overflow-hidden mb-4 shadow-md group">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-[#E8C77A]" id="showcase-graphic">
          <svg className="w-16 h-16 text-[#D4A574]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-[#1A2340]/90 text-justify mb-4 font-body" id="showcase-desc">
        Explore full layout performance benchmarks, responsive design layers, and dynamic systems operations.
        Select any catalog artifact from the adjacent page to map live credentials.
      </p>

      <div className="p-3 bg-black/5 rounded-xl border border-[#4E4B46]/20 grid grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Client:</span>
          <span className="text-[#1A2340] font-bold font-body" id="showcase-client">Academic Project</span>
        </div>
        <div>
          <span className="text-[var(--paper-primary)] block uppercase text-[9px] tracking-wider font-bold">Tech Stack:</span>
          <span className="text-[#1A2340] font-bold font-body" id="showcase-tech">TensorFlow.js / Blockchain / Laravel</span>
        </div>
      </div>
    </div>
  );
}
