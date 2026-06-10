"use client";
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page7Projects2() {
  const { data } = useBookfolio();

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER V : SEALS OF VALIDATION</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Credentials Vault</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>

      <div className="h-[340px] overflow-y-auto page-scroll space-y-3 pr-1">
        {data.certificates.map(cert => (
          <div key={cert.id} className="p-3 bg-white/50 rounded-xl border border-[#4E4B46]/15 hover:border-[var(--paper-primary)]/40 hover:bg-white/80 transition-all cursor-pointer group shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 bg-[#1A2340]/5 rounded border border-[#1A2340]/10 text-[var(--paper-primary)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#1A2340] font-headline">{cert.title}</h4>
                <p className="text-[10px] text-[var(--paper-primary)] font-body mt-0.5 uppercase tracking-wide">{cert.issuer}</p>
                <p className="text-[9px] font-mono text-[#1A2340]/70 mt-1.5 leading-snug">{cert.tag}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
