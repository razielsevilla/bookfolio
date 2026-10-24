import { Experience } from '../../../context/BookfolioContext';

interface ExperienceEntryBlockProps {
  number: number;
  entry: Experience;
}

// Shared renderer for one "Entry 0N" role, used by both the left and right
// pages of Chapter III so the layout/numbering stays identical.
export default function ExperienceEntryBlock({ number, entry }: ExperienceEntryBlockProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[9px] font-mono text-[var(--paper-primary)]/70 font-bold">ENTRY {String(number).padStart(2, '0')}</span>
          <h5 className="font-bold text-sm font-headline text-[#1A2340] leading-snug">{entry.title}</h5>
          <p className="text-xs italic text-[#1A2340]/70 font-body">
            {entry.organization}
            {entry.location && <> &middot; {entry.location}</>}
          </p>
        </div>
        {entry.yearRange && (
          <span className="shrink-0 text-[9px] font-mono text-[var(--paper-primary)]/80 bg-[#1A2340]/5 border border-[var(--paper-primary)]/20 rounded-full px-2 py-0.5 whitespace-nowrap mt-0.5">
            {entry.yearRange}
          </span>
        )}
      </div>

      {entry.focus && (
        <p className="text-[11px] italic text-[#1A2340]/60 font-body mt-1">{entry.focus}</p>
      )}

      {entry.bullets && entry.bullets.length > 0 && (
        <ul className="mt-2 space-y-1">
          {entry.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-2 text-xs text-[#1A2340]/85 font-body leading-relaxed">
              <span className="text-[var(--paper-primary)] shrink-0 mt-0.5 text-[9px]">&#9670;</span>
              <span className="text-justify">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
