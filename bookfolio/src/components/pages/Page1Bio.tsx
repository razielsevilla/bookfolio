"use client";
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page1Bio() {
  const { data } = useBookfolio();
  const author = data.author;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER I : THE SCRIBE'S AWAKENING</span>
        <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">The Reader &amp; Creator</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2">
        <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-[#1A2340]/5 border border-[var(--paper-primary)]/30 flex items-center justify-center text-[var(--paper-primary)]">
          <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-sm text-[#1A2340] font-body">{author?.name}</h4>
          <p className="text-xs text-[var(--paper-primary)] font-body">{author?.role}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-4 text-justify font-body text-[#1A2340]/90">
        {author?.bioParagraph1}
      </p>
      <p className="text-sm leading-relaxed mb-4 text-justify font-body text-[#1A2340]/90">
        {author?.bioParagraph2}
      </p>
      
      {author?.quote && (
        <div className="mt-6 border-l-2 border-[var(--paper-primary)] pl-4 italic text-[#1A2340]/70 font-body text-xs">
          "{author.quote}"
        </div>
      )}
      </div>
    </div>
  );
}
