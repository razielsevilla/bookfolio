"use client";
import { useState } from 'react';
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page7Projects2() {
  const { data, selectedCertificateId, setSelectedCertificate, goToMobilePage } = useBookfolio();
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    // Update the image on the other page
    setSelectedCertificate(id);
    
    // Mobile: automatically flip to the certificate details page (Index 8 is Page 8)
    goToMobilePage(8);
    
    // Desktop: Toggle the expansion on this page
    if (expandedCertId === id) {
      setExpandedCertId(null);
    } else {
      setExpandedCertId(id);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER V : SEALS OF VALIDATION</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Credentials Vault</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2 border-t border-[#4E4B46]/30 pt-2">
        {data.certificates.map(cert => {
          const isSelected = cert.id === (selectedCertificateId || data.certificates[0]?.id);
          const isExpanded = expandedCertId === cert.id;
          
          return (
            <div 
              key={cert.id} 
              onClick={() => handleToggle(cert.id)}
              className={`py-3 px-3 border-b border-[#4E4B46]/20 cursor-pointer group transition-all rounded-lg mb-1 ${
                isExpanded ? 'bg-black/5 border-transparent shadow-sm' : 'hover:bg-black/5'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className={`font-bold text-sm font-headline transition-colors ${
                  isSelected ? 'text-[#D4A574]' : 'text-[#1A2340] group-hover:text-[#D4A574]'
                }`}>
                  {cert.title}
                </h4>
                <svg 
                  className={`w-4 h-4 text-[#1A2340]/50 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <div className="pl-2 border-l-2 border-[#D4A574]/40 space-y-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#1A2340]/50 font-bold block">Issuer</span>
                    <p className="text-xs text-[#1A2340] font-body font-semibold">{cert.issuer}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#1A2340]/50 font-bold block">Topics & Tags</span>
                    <p className="text-xs font-mono text-[#1A2340]/70 leading-tight">{cert.tag}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
