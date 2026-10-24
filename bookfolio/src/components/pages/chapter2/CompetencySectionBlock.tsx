import { CompetencySection } from '../../../context/BookfolioContext';

interface CompetencySectionBlockProps {
  number: number;
  section: CompetencySection;
}

// Shared renderer for one "§ 0N — Section Title" block, used by both the left
// and right pages of Chapter II so the numbering/pill styling stays identical.
export default function CompetencySectionBlock({ number, section }: CompetencySectionBlockProps) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[10px] font-mono text-[var(--paper-primary)] font-bold shrink-0">§ {String(number).padStart(2, '0')}</span>
        <h5 className="text-sm font-bold font-headline text-[#1A2340]">{section.title}</h5>
      </div>
      <div className="space-y-2 pl-1">
        {section.groups?.map((group, idx) => (
          <div key={idx}>
            <span className="text-xs italic text-[#1A2340]/70 font-body">{group.label}: </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {group.tags?.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="text-[10px] font-bold font-mono px-2 py-1 rounded-full bg-[#1A2340]/5 border border-amber-900/20 text-[var(--paper-primary)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
