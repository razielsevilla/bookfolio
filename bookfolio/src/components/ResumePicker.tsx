"use client";
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDismissOnOutsideOrEscape } from '../hooks/useDismissOnOutsideOrEscape';

interface OptionItem {
  id: string;
  label: string;
}

interface Options {
  skills: { id: string; name: string }[];
  experience: { id: string; title: string; organization?: string; yearRange: string }[];
  activities: { id: string; title: string; organization?: string; dateRange: string }[];
  education: { id: string; institution: string; dateRange: string }[];
}

type SectionKey = 'skills' | 'experience' | 'activities' | 'education';

const SECTION_KEYS: SectionKey[] = ['skills', 'experience', 'activities', 'education'];

const SECTION_LABELS: Record<SectionKey, string> = {
  skills: 'Skills',
  experience: 'Experience',
  activities: 'Activities',
  education: 'Education',
};

function toItems(section: SectionKey, options: Options): OptionItem[] {
  switch (section) {
    case 'skills':
      return options.skills.map(s => ({ id: s.id, label: s.name }));
    case 'experience':
      return options.experience.map(e => ({
        id: e.id,
        label: `${e.title}${e.organization ? ` — ${e.organization}` : ''} (${e.yearRange})`,
      }));
    case 'activities':
      return options.activities.map(a => ({
        id: a.id,
        label: `${a.title}${a.organization ? ` — ${a.organization}` : ''} (${a.dateRange})`,
      }));
    case 'education':
      return options.education.map(ed => ({ id: ed.id, label: `${ed.institution} (${ed.dateRange})` }));
  }
}

export default function ResumePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Options | null>(null);
  const [enabledSections, setEnabledSections] = useState<Record<SectionKey, boolean>>({
    skills: true,
    experience: true,
    activities: true,
    education: true,
  });
  const [selectedIds, setSelectedIds] = useState<Record<SectionKey, Set<string>>>({
    skills: new Set(),
    experience: new Set(),
    activities: new Set(),
    education: new Set(),
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useDismissOnOutsideOrEscape(containerRef, isOpen, () => setIsOpen(false));

  const handleOpen = async () => {
    setIsOpen(true);
    if (options) return; // already loaded this session
    setIsLoading(true);
    try {
      const response = await fetch('/api/resume/options');
      const data: Options = await response.json();
      setOptions(data);
      setEnabledSections({ skills: true, experience: true, activities: true, education: true });
      setSelectedIds({
        skills: new Set(data.skills.map(s => s.id)),
        experience: new Set(data.experience.map(e => e.id)),
        activities: new Set(data.activities.map(a => a.id)),
        education: new Set(data.education.map(ed => ed.id)),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section: SectionKey) => {
    setEnabledSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleItem = (section: SectionKey, id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev[section]);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, [section]: next };
    });
  };

  const handleGenerate = () => {
    const params = new URLSearchParams();
    const included = SECTION_KEYS.filter(key => enabledSections[key]);
    params.set('include', included.join(','));
    included.forEach(key => {
      params.set(key, Array.from(selectedIds[key]).join(','));
    });
    window.location.href = `/api/resume?${params.toString()}`;
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="p-2 rounded-full border border-[#D4A574]/40 hover:border-[#D4A574] bg-[#1A2340]/40 text-[#E8C77A] hover:bg-[#1A2340]/80 transition-all"
        title="Download résumé"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Choose what to include in your résumé"
            className="paper-page relative w-full max-w-md rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          >
            <div className="corner-curl" onClick={() => setIsOpen(false)} title="Close"></div>

            <div className="p-5 pb-4 border-b border-[#4E4B46]/20 shrink-0 flex items-start justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">Appendix : Compose Your Codex</span>
                <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">Customize Your Résumé</h3>
                <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-2"></div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="p-1 rounded-full text-[#1A2340]/50 hover:text-[var(--paper-primary)] hover:bg-black/5 transition-all shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isLoading || !options ? (
              <div className="p-5 text-xs text-[#1A2340]/60 font-body text-center italic">Unfurling your codex...</div>
            ) : (
              <div className="flex-1 min-h-0 overflow-y-auto page-scroll p-5 space-y-3">
                {SECTION_KEYS.map(section => {
                  const items = toItems(section, options);
                  if (items.length === 0) return null;
                  return (
                    <div key={section} className="bg-black/5 border border-[#4E4B46]/20 rounded-lg p-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-[#94683c]"
                          checked={enabledSections[section]}
                          onChange={() => toggleSection(section)}
                        />
                        <span className="text-sm font-bold font-headline text-[#1A2340]">{SECTION_LABELS[section]}</span>
                      </label>
                      {enabledSections[section] && (
                        <div className="mt-2 ml-6 pl-3 border-l border-[#4E4B46]/20 space-y-1.5">
                          {items.map(item => (
                            <label key={item.id} className="flex items-start gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="mt-0.5 accent-[#94683c]"
                                checked={selectedIds[section].has(item.id)}
                                onChange={() => toggleItem(section, item.id)}
                              />
                              <span className="text-xs text-[#1A2340]/80 font-body leading-snug">{item.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="p-5 pt-4 border-t border-[#4E4B46]/20 shrink-0">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !options}
                className="w-full bg-[#1A2340] text-[#F4EAD5] font-bold text-xs py-3 rounded-lg hover:bg-[#243054] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Generate PDF
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
