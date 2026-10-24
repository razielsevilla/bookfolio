"use client";
import { useRef, useState } from 'react';
import { useBookfolio } from '../context/BookfolioContext';
import { useDismissOnOutsideOrEscape } from '../hooks/useDismissOnOutsideOrEscape';
import { CHAPTERS, resolveChapterContent } from '../lib/chapters';

export default function JumpToMenu() {
  const { goToSheet, data } = useBookfolio();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // `target` is the currentSheetIndex that reveals this chapter's full spread
  // (chapters are 1-indexed sheet targets — see Book.tsx).
  const sections = CHAPTERS.map((chapter, idx) => ({
    label: resolveChapterContent(chapter, data.siteContent?.chapters).title,
    target: idx + 1,
  }));

  useDismissOnOutsideOrEscape(containerRef, isOpen, () => setIsOpen(false));

  const handleSelect = (target: number) => {
    setIsOpen(false);
    goToSheet(target);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="jump-to-menu"
        className="p-2 rounded-full border border-[#D4A574]/40 hover:border-[#D4A574] bg-[#1A2340]/40 text-[#E8C77A] hover:bg-[#1A2340]/80 transition-all"
        title="Jump to section"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="jump-to-menu"
          role="menu"
          className="absolute top-full right-0 mt-2 w-44 bg-[#1A2340]/95 border border-[#D4A574]/40 rounded-xl shadow-lg backdrop-blur-md overflow-hidden z-50"
        >
          {sections.map(section => (
            <button
              key={section.label}
              role="menuitem"
              onClick={() => handleSelect(section.target)}
              className="w-full flex items-center gap-3 p-3 text-left text-sm text-[#F4EAD5] hover:bg-[#D4A574]/20 hover:text-[#E8C77A] transition-all font-body"
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
