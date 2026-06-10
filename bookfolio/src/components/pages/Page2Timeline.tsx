"use client";
import { useBookfolio } from '../../context/BookfolioContext';

export default function Page2Timeline() {
  const { data } = useBookfolio();
  const author = data.author;

  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">CHAPTER I : THE SCRIBE'S AWAKENING</span>
      <h3 className="text-2xl font-bold mt-1 font-headline text-[#1A2340]">Our Narrative Path</h3>
      <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-6"></div>

      <p className="text-sm leading-relaxed mb-4 text-justify font-body text-[#1A2340]/90">
        {author?.page2Paragraph1}
      </p>

      {author?.page2Quote && (
        <blockquote className="border-l-4 border-[var(--primary-color)] pl-4 py-1.5 my-4 italic text-sm text-[var(--paper-primary)] font-headline">
          "{author.page2Quote}"
        </blockquote>
      )}

      <p className="text-sm leading-relaxed text-justify font-body text-[#1A2340]/90">
        {author?.page2Paragraph2}
      </p>
    </div>
  );
}
