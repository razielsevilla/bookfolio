"use client";
import { useBookfolio } from '../context/BookfolioContext';

export default function Header() {
  const { soundEnabled, toggleSound } = useBookfolio();

  return (
    <header className="theme-header-footer w-full px-6 py-4 flex items-center justify-between border-b backdrop-blur-md z-30">
      <div className="flex items-center space-x-3">
        <svg className="w-8 h-8 text-[#D4A574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        <div>
          <h1 className="text-xl font-bold tracking-widest font-headline leading-none text-[#E8C77A]">BOOKFOLIO</h1>
          <span className="text-[10px] tracking-wider uppercase opacity-85 font-body">3D Interactive Portfolio Codex</span>
        </div>
      </div>

      <div className="flex items-center space-x-4 relative z-50">
        <button onClick={toggleSound} className="p-2 rounded-full border border-[#D4A574]/40 hover:border-[#D4A574] bg-[#1A2340]/40 text-[#E8C77A] hover:bg-[#1A2340]/80 transition-all" title="Toggle sound FX">
          {soundEnabled ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>

        <div className="hidden sm:flex items-center space-x-2 border border-[#4E4B46] px-3 py-1.5 rounded-full bg-[#1A2340]/60 text-xs font-mono text-[#D4A574]">
          <span className="w-2 h-2 rounded-full bg-[#E8C77A] animate-pulse"></span>
          <span>MAPPED INDEX V.2.6</span>
        </div>
      </div>
    </header>
  );
}
