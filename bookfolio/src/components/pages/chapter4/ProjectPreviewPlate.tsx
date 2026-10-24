"use client";
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { urlFor } from '../../../sanity/imageUrl';
import { useDismissOnOutsideOrEscape } from '../../../hooks/useDismissOnOutsideOrEscape';

interface ProjectPreviewPlateProps {
  image: any;
  caption?: string;
}

// The "Archival Plate / Vignette" — a screenshot presented like an engraved
// illustration in a vintage technical manuscript: inlaid matting border, a
// warm sepia tint that lifts on hover to reveal true UI colors, a figure
// caption, and a click-to-inspect lightbox.
export default function ProjectPreviewPlate({ image, caption }: ProjectPreviewPlateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useDismissOnOutsideOrEscape(modalRef, isOpen, () => setIsOpen(false));

  if (!image) return null;

  const previewUrl = urlFor(image).width(640).height(360).fit('crop').url();
  const fullUrl = urlFor(image).width(1600).url();

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group block w-full rounded-md overflow-hidden border border-[rgba(120,53,15,0.25)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.08)] cursor-zoom-in"
        aria-label="Open Codex Plate Inspection"
      >
        <img
          src={previewUrl}
          alt={caption || 'Project preview'}
          className="w-full aspect-video object-cover [filter:sepia(8%)_contrast(98%)_brightness(98%)] transition-[filter] duration-300 ease-out group-hover:[filter:none]"
        />
      </button>
      {caption && (
        <p className="text-[11px] italic text-[var(--paper-primary)]/70 mt-1.5 text-center font-body">{caption}</p>
      )}

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div ref={modalRef} className="relative max-w-3xl w-full">
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
            <img src={fullUrl} alt={caption || 'Project preview'} className="w-full rounded-md shadow-2xl" />
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
