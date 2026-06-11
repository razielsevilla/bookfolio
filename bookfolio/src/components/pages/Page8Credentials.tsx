"use client";
import { useBookfolio } from '../../context/BookfolioContext';
import { urlFor } from '../../sanity/imageUrl';

export default function Page8Credentials() {
  const { data, selectedCertificateId } = useBookfolio();

  const activeCert = selectedCertificateId 
    ? data.certificates.find(c => c.id === selectedCertificateId) || data.certificates[0]
    : data.certificates[0];

  if (!activeCert) return <div className="text-center p-4">No certificates found.</div>;

  return (
    <div className="flex flex-col items-center justify-start h-full text-center">
      <div className="shrink-0 text-left w-full">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER V : SEALS OF VALIDATION</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Credentials Vault</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>
      </div>
      
      <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center pb-2">
        {activeCert.image ? (
          <div className="w-full flex-1 min-h-0 bg-[#1A2340]/5 rounded-xl border border-[#4E4B46]/10 p-1.5 mb-3 flex items-center justify-center">
            <img 
              src={urlFor(activeCert.image).url()} 
              alt="Certificate" 
              className="max-w-full max-h-full rounded-lg object-contain"
            />
          </div>
        ) : (
          <div className="w-full flex-1 min-h-0 bg-black/5 rounded-xl border border-[#4E4B46]/10 mb-3 flex flex-col items-center justify-center text-[#1A2340]/40">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span className="text-xs font-mono">No Image Uploaded</span>
          </div>
        )}

        <div className="shrink-0 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[var(--paper-primary)] font-bold block mb-1">Certificate ID</span>
          <p className="text-xs font-mono text-[#1A2340]/90 bg-black/5 px-3 py-1.5 rounded-lg border border-[#4E4B46]/10 inline-block">{activeCert.id}</p>
        </div>
      </div>
    </div>
  );
}
