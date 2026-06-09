"use client";
import { useBookfolio } from '../context/BookfolioContext';

const chapterLabels = [
  "Cover at Rest",
  "Chapter I: The Scribe's Awakening",
  "Chapter II: Trails & Chronicles",
  "Chapter III: The Arcanum of Crafts",
  "Chapter IV: Relics of Creation",
  "Chapter V: Seals of Validation",
  "Chapter VI: Echoes from the Ledger",
  "Chapter VII: Letters to the Horizon",
  "Closing Colophon"
];

export default function Footer() {
  const { currentSheetIndex, totalSheets, prevPage, nextPage } = useBookfolio();

  return (
    <footer className="theme-header-footer w-full px-6 py-4 border-t backdrop-blur-md flex items-center justify-center z-30">
      <div className="flex items-center space-x-6">
        <button onClick={prevPage} className="p-3 bg-[#1A2340]/40 hover:bg-[#1A2340]/80 border border-[#4E4B46] rounded-full transition-all flex items-center justify-center shadow-lg group hover:-translate-x-1" aria-label="Previous Page">
          <svg className="w-5 h-5 text-[#F4EAD5] group-hover:text-[#D4A574]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <div className="flex space-x-1 mb-1">
            {Array.from({ length: totalSheets + 1 }).map((_, idx) => (
              <span key={idx} className={`w-8 h-1 rounded-full transition-all ${idx <= currentSheetIndex ? 'bg-[#D4A574]' : 'bg-[#4E4B46]/50'}`}></span>
            ))}
          </div>
          <span className="text-[10px] font-mono text-[#D4A574] tracking-widest uppercase">
            {chapterLabels[currentSheetIndex] || "NAVIGATING CODEX"}
          </span>
        </div>

        <button onClick={nextPage} className="p-3 bg-[#1A2340]/40 hover:bg-[#1A2340]/80 border border-[#4E4B46] rounded-full transition-all flex items-center justify-center shadow-lg group hover:translate-x-1" aria-label="Next Page">
          <svg className="w-5 h-5 text-[#F4EAD5] group-hover:text-[#D4A574]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
