"use client";
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { urlFor } from '../../../sanity/imageUrl';
import { useDismissOnOutsideOrEscape } from '../../../hooks/useDismissOnOutsideOrEscape';

interface CredentialPlateProps {
  image: any;
  caption?: string;
}

// A framed-diploma display: a nested double border like a picture frame,
// centered on the page — distinct from Chapter IV's edge-to-edge screenshot
// plate. Certificate scans keep their natural aspect ratio.
export default function CredentialPlate({ image, caption }: CredentialPlateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useDismissOnOutsideOrEscape(modalRef, isOpen, () => setIsOpen(false));

  if (!image) return null;

  const previewUrl = urlFor(image).width(640).url();
  const fullUrl = urlFor(image).width(1600).url();

  return (
    <div className="mb-5 flex flex-col items-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="block mx-auto max-w-[85%] rounded-sm border-2 border-double border-[var(--paper-primary)]/50 bg-white/30 p-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.18)] cursor-zoom-in"
        aria-label="Open Codex Plate Inspection"
      >
        <div className="border border-[rgba(120,53,15,0.25)] p-1">
          <img
            src={previewUrl}
            alt={caption || 'Certificate preview'}
            className="max-h-52 w-auto mx-auto"
          />
        </div>
      </button>
      {caption && (
        <p className="text-[11px] italic text-[var(--paper-primary)]/70 mt-2 text-center font-body max-w-[85%]">{caption}</p>
      )}

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div ref={modalRef} className="relative max-w-2xl w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-[#E8C77A] font-bold font-body">Codex Plate Inspection</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="p-1 rounded-full text-[#E8C77A]/70 hover:text-[#E8C77A] hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img src={fullUrl} alt={caption || 'Certificate preview'} className="max-h-[80vh] w-auto mx-auto rounded-md shadow-2xl" />
            {caption && (
              <p className="text-xs italic text-[#E8C77A]/70 mt-2 text-center font-body">{caption}</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
