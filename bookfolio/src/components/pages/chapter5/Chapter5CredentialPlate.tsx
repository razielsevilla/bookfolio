"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';
import CredentialPlate from './CredentialPlate';

// Chapter V — Right Page: The Credential Plate (Dynamic Detail & Preview)
// Styled as a centered display plaque — a framed certificate on a wall —
// rather than Chapter IV's left-aligned case-study report.
export default function Chapter5CredentialPlate({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data, selectedCertificateId } = useBookfolio();
  const certificates = data.certificates ?? [];
  const activeCert = (selectedCertificateId && certificates.find(c => c._id === selectedCertificateId)) || certificates[0];

  if (!activeCert) {
    return (
      <div className="flex flex-col h-full">
        <div className="shrink-0">
          <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
          <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
          <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
        </div>
        <p className="text-xs text-[#1A2340]/50 italic font-body text-center">No credentials on file yet.</p>
      </div>
    );
  }

  const links = [
    { label: 'Verify Credential', url: activeCert.verifyUrl },
    { label: 'View Original PDF', url: activeCert.pdfUrl },
  ].filter((l): l is { label: string; url: string } => Boolean(l.url));

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      {/* Keying by cert id remounts this container on selection change,
          replaying the ink-bleed fade-in defined in globals.css. */}
      <div key={activeCert._id} className="flex-1 overflow-y-auto page-scroll pr-2 ink-bleed-in">
        <div className="text-center mb-4">
          <span className="text-[var(--paper-primary)]/50 text-xs">&#10022;</span>
          <h4 className="font-bold text-base font-headline text-[#1A2340] leading-snug mt-1">{activeCert.title}</h4>
          {(activeCert.issuer || activeCert.issueDate) && (
            <p className="text-xs italic text-[#1A2340]/70 font-body mt-0.5">
              {activeCert.issuer}
              {activeCert.issuer && activeCert.issueDate && ' · '}
              {activeCert.issueDate}
            </p>
          )}
          {activeCert.credentialId && (
            <p className="text-[9px] font-mono uppercase tracking-wider text-[#1A2340]/40 mt-1">ID {activeCert.credentialId}</p>
          )}

          {links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold font-mono uppercase tracking-wide px-2.5 py-1 rounded-full border border-[var(--paper-primary)]/40 text-[var(--paper-primary)] hover:bg-[var(--paper-primary)]/10 hover:border-[var(--paper-primary)] transition-all"
                >
                  {link.label} &#8599;
                </a>
              ))}
            </div>
          )}
        </div>

        <CredentialPlate image={activeCert.image} caption={activeCert.previewCaption} />

        {activeCert.highlights && activeCert.highlights.length > 0 && (
          <div className="max-w-[90%] mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-6 h-px bg-[var(--paper-primary)]/30" />
              <span className="text-[10px] uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">Highlights</span>
              <span className="w-6 h-px bg-[var(--paper-primary)]/30" />
            </div>
            <ul className="space-y-1">
              {activeCert.highlights.map((highlight, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-[#1A2340]/85 font-body leading-relaxed">
                  <span className="text-[var(--paper-primary)] shrink-0 mt-0.5 text-[9px]">&#9670;</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
