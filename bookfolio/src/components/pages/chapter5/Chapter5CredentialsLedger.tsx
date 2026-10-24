"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';

// Chapter V — Left Page: The Credentials Ledger (Master List)
// Styled as a formal register/roll — hairline row dividers and a wax-seal
// dot indicator, rather than Chapter IV's bordered card stack.
export default function Chapter5CredentialsLedger({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data, selectedCertificateId, setSelectedCertificate } = useBookfolio();
  const certificates = data.certificates ?? [];
  const activeId = selectedCertificateId && certificates.some(c => c._id === selectedCertificateId)
    ? selectedCertificateId
    : certificates[0]?._id;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2">
        {certificates.map((cert, idx) => {
          const isActive = cert._id === activeId;
          return (
            <div key={cert._id}>
              <button
                type="button"
                onClick={() => setSelectedCertificate(cert._id)}
                className="w-full text-left py-3 group"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-[5px] w-2.5 h-2.5 rounded-full shrink-0 border transition-all ${
                      isActive
                        ? 'bg-[var(--paper-primary)] border-[var(--paper-primary)] shadow-[0_0_0_3px_rgba(148,104,60,0.15)]'
                        : 'bg-transparent border-[#1A2340]/25 group-hover:border-[var(--paper-primary)]/70'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[10px] font-mono text-[var(--paper-primary)]/60 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                      <h5
                        className={`font-headline text-sm leading-snug transition-colors ${
                          isActive ? 'font-bold text-[#1A2340]' : 'text-[#1A2340]/75 group-hover:text-[#1A2340]'
                        }`}
                      >
                        {cert.title}
                      </h5>
                    </div>
                    {isActive && <div className="w-8 h-[1.5px] bg-[var(--paper-primary)] mt-1 ml-[26px]" />}
                    {cert.category && (
                      <span className="block text-[9px] font-mono uppercase tracking-wider text-[var(--paper-primary)]/70 mt-1 ml-[26px]">
                        {cert.category}
                      </span>
                    )}
                    {(cert.issuer || cert.issueDate) && (
                      <p className="text-[11px] italic text-[#1A2340]/60 font-body mt-0.5 ml-[26px] leading-snug">
                        {cert.issuer}
                        {cert.issuer && cert.issueDate && ' · '}
                        {cert.issueDate}
                      </p>
                    )}
                  </div>
                </div>
              </button>
              {idx < certificates.length - 1 && <div className="h-px bg-[#4E4B46]/15" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
