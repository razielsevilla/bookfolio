"use client";
import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDismissOnOutsideOrEscape } from '../hooks/useDismissOnOutsideOrEscape';

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface Profile {
  name: string;
  location?: string;
  email?: string;
  phone?: string;
  portfolioUrl?: string;
  socials: SocialLink[];
}

interface SkillItem {
  id: string;
  name: string;
  sectionTitle: string;
}

interface ExperienceItem {
  id: string;
  title: string;
  organization?: string;
  yearRange: string;
  bullets?: string[];
}

interface EducationItem {
  id: string;
  institution: string;
  dateRange: string;
  programs?: string[];
}

interface Options {
  profile: Profile;
  skills: SkillItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

type SectionKey = 'skills' | 'experience' | 'education';

const TABS: { key: SectionKey; label: string }[] = [
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
];

function extractFileName(contentDisposition: string | null): string {
  const match = contentDisposition?.match(/filename="([^"]+)"/);
  return match?.[1] ?? 'Resume.pdf';
}

function groupSkillsBySection(skills: SkillItem[]): { sectionTitle: string; items: SkillItem[] }[] {
  const groups: { sectionTitle: string; items: SkillItem[] }[] = [];
  skills.forEach(skill => {
    let group = groups.find(g => g.sectionTitle === skill.sectionTitle);
    if (!group) {
      group = { sectionTitle: skill.sectionTitle, items: [] };
      groups.push(group);
    }
    group.items.push(skill);
  });
  return groups;
}

export default function ResumePicker() {
  const [isOpen, setIsOpen] = useState(false);

  // Password gate — this feature is restricted to whoever knows
  // RESUME_ACCESS_PASSWORD (server-side env secret, never shipped to the
  // client). Verified once per page load, then reused for the actual
  // generate request so nothing sensitive sits in the URL/browser history.
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [options, setOptions] = useState<Options | null>(null);
  const [activeTab, setActiveTab] = useState<SectionKey>('skills');
  // Nothing is pre-selected — the résumé starts empty and you opt items in.
  const [selectedIds, setSelectedIds] = useState<Record<SectionKey, Set<string>>>({
    skills: new Set(),
    experience: new Set(),
    education: new Set(),
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useDismissOnOutsideOrEscape(containerRef, isOpen, () => setIsOpen(false));

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;
    setIsVerifying(true);
    setAuthError(null);
    try {
      const response = await fetch('/api/resume/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (response.status === 401) {
        setAuthError('Incorrect password.');
        return;
      }
      if (!response.ok) {
        setAuthError('Something went wrong. Try again.');
        return;
      }
      const data: Options = await response.json();
      setOptions(data);
      setIsUnlocked(true);
      setSelectedIds({ skills: new Set(), experience: new Set(), education: new Set() });
    } catch {
      setAuthError('Could not reach the server. Try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const toggleItem = (section: SectionKey, id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev[section]);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, [section]: next };
    });
  };

  const setAllInSection = (section: SectionKey, ids: string[], selected: boolean) => {
    setSelectedIds(prev => ({ ...prev, [section]: new Set(selected ? ids : []) }));
  };

  const totalSelected = selectedIds.skills.size + selectedIds.experience.size + selectedIds.education.size;

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          selected: {
            skills: Array.from(selectedIds.skills),
            experience: Array.from(selectedIds.experience),
            education: Array.from(selectedIds.education),
          },
        }),
      });

      if (response.status === 401) {
        // The password was valid a moment ago but isn't anymore (e.g. env
        // var changed) — drop back to the password prompt rather than fail silently.
        setIsUnlocked(false);
        setOptions(null);
        setAuthError('Your session expired. Please re-enter the password.');
        return;
      }
      if (!response.ok) {
        setGenerateError('Failed to generate the résumé. Try again.');
        return;
      }

      const blob = await response.blob();
      const fileName = extractFileName(response.headers.get('Content-Disposition'));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setIsOpen(false);
    } catch {
      setGenerateError('Could not reach the server. Try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const skillGroups = useMemo(() => (options ? groupSkillsBySection(options.skills) : []), [options]);

  return (
    <>
      <button
        onClick={() => setIsOpen(prev => !prev)}
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
            aria-label={isUnlocked ? 'Choose what to include in your résumé' : 'Enter résumé access password'}
            className={`paper-page relative w-full rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-all ${isUnlocked ? 'max-w-4xl' : 'max-w-md'}`}
          >
            <div className="corner-curl" onClick={() => setIsOpen(false)} title="Close"></div>

            <div className="p-5 pb-4 border-b border-[#4E4B46]/20 shrink-0 flex items-start justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">Appendix : Compose Your Codex</span>
                <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{isUnlocked ? 'Customize Your Résumé' : 'Restricted Appendix'}</h3>
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

            {!isUnlocked ? (
              <form onSubmit={handleUnlock} className="p-5 space-y-3">
                <p className="text-xs text-[#1A2340]/70 font-body leading-relaxed">
                  Résumé generation is password-protected. Enter the access password to continue.
                </p>
                <input
                  type="password"
                  autoFocus
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Access password"
                  className="w-full bg-black/5 border border-[#4E4B46]/20 rounded-lg p-2.5 text-xs text-[#1A2340] focus:outline-none focus:border-[var(--paper-primary)] placeholder-[#1A2340]/40"
                />
                {authError && (
                  <p className="text-xs text-red-600 font-body">{authError}</p>
                )}
                <button
                  type="submit"
                  disabled={isVerifying || !password}
                  className="w-full bg-[#1A2340] text-[#F4EAD5] font-bold text-xs py-3 rounded-lg hover:bg-[#243054] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Unlock'}
                </button>
              </form>
            ) : !options ? (
              <div className="p-5 text-xs text-[#1A2340]/60 font-body text-center italic">Unfurling your codex...</div>
            ) : (
              <>
                <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
                  {/* Selection pane */}
                  <div className="lg:w-72 shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-[#4E4B46]/20 min-h-0">
                    <div className="flex shrink-0 border-b border-[#4E4B46]/20">
                      {TABS.map(tab => {
                        const count = selectedIds[tab.key].size;
                        const isActive = activeTab === tab.key;
                        return (
                          <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-2.5 text-xs font-bold font-body transition-all border-b-2 ${
                              isActive
                                ? 'border-[var(--paper-primary)] text-[var(--paper-primary)]'
                                : 'border-transparent text-[#1A2340]/50 hover:text-[#1A2340]/80'
                            }`}
                          >
                            {tab.label}
                            {count > 0 && <span className="ml-1 text-[var(--paper-primary)]">({count})</span>}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto page-scroll p-4 max-h-[30vh] lg:max-h-none">
                      {activeTab === 'skills' && (
                        skillGroups.length === 0 ? (
                          <p className="text-xs text-[#1A2340]/50 italic font-body">No skills found.</p>
                        ) : (
                          <div className="space-y-3">
                            {skillGroups.map(group => {
                              const ids = group.items.map(i => i.id);
                              const allSelected = ids.every(id => selectedIds.skills.has(id));
                              return (
                                <div key={group.sectionTitle}>
                                  <div className="flex items-center justify-between gap-2 mb-1.5">
                                    <span className="text-[10px] uppercase tracking-wider text-[var(--paper-primary)] font-bold font-body">{group.sectionTitle}</span>
                                    <button
                                      onClick={() => setSelectedIds(prev => {
                                        const next = new Set(prev.skills);
                                        ids.forEach(id => allSelected ? next.delete(id) : next.add(id));
                                        return { ...prev, skills: next };
                                      })}
                                      className="text-[9px] uppercase text-[#1A2340]/40 hover:text-[var(--paper-primary)] font-body shrink-0"
                                    >
                                      {allSelected ? 'Clear' : 'All'}
                                    </button>
                                  </div>
                                  <div className="space-y-1">
                                    {group.items.map(item => (
                                      <label key={item.id} className="flex items-start gap-2 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          className="mt-0.5 accent-[#94683c]"
                                          checked={selectedIds.skills.has(item.id)}
                                          onChange={() => toggleItem('skills', item.id)}
                                        />
                                        <span className="text-xs text-[#1A2340]/80 font-body leading-snug">{item.name}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )
                      )}

                      {activeTab === 'experience' && (
                        options.experience.length === 0 ? (
                          <p className="text-xs text-[#1A2340]/50 italic font-body">No experience entries found.</p>
                        ) : (
                          <div>
                            <div className="flex justify-end mb-2">
                              <button
                                onClick={() => setAllInSection('experience', options.experience.map(e => e.id), selectedIds.experience.size < options.experience.length)}
                                className="text-[9px] uppercase text-[#1A2340]/40 hover:text-[var(--paper-primary)] font-body"
                              >
                                {selectedIds.experience.size === options.experience.length ? 'Clear all' : 'Select all'}
                              </button>
                            </div>
                            <div className="space-y-1.5">
                              {options.experience.map(item => (
                                <label key={item.id} className="flex items-start gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="mt-0.5 accent-[#94683c]"
                                    checked={selectedIds.experience.has(item.id)}
                                    onChange={() => toggleItem('experience', item.id)}
                                  />
                                  <span className="text-xs text-[#1A2340]/80 font-body leading-snug">
                                    {item.title}{item.organization ? ` — ${item.organization}` : ''} <span className="opacity-60">({item.yearRange})</span>
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      )}

                      {activeTab === 'education' && (
                        options.education.length === 0 ? (
                          <p className="text-xs text-[#1A2340]/50 italic font-body">No education entries found.</p>
                        ) : (
                          <div>
                            <div className="flex justify-end mb-2">
                              <button
                                onClick={() => setAllInSection('education', options.education.map(e => e.id), selectedIds.education.size < options.education.length)}
                                className="text-[9px] uppercase text-[#1A2340]/40 hover:text-[var(--paper-primary)] font-body"
                              >
                                {selectedIds.education.size === options.education.length ? 'Clear all' : 'Select all'}
                              </button>
                            </div>
                            <div className="space-y-1.5">
                              {options.education.map(item => (
                                <label key={item.id} className="flex items-start gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="mt-0.5 accent-[#94683c]"
                                    checked={selectedIds.education.has(item.id)}
                                    onChange={() => toggleItem('education', item.id)}
                                  />
                                  <span className="text-xs text-[#1A2340]/80 font-body leading-snug">
                                    {item.institution} <span className="opacity-60">({item.dateRange})</span>
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Live preview pane — pure client-side derivation of current
                      selections, no server round-trip, so it updates instantly. */}
                  <div className="flex-1 min-h-0 overflow-y-auto page-scroll p-5 bg-black/[0.02]">
                    <ResumePreviewPane options={options} selectedIds={selectedIds} />
                  </div>
                </div>

                <div className="p-5 pt-4 border-t border-[#4E4B46]/20 shrink-0">
                  {generateError && (
                    <p className="text-xs text-red-600 font-body mb-2">{generateError}</p>
                  )}
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || totalSelected === 0}
                    className="w-full bg-[#1A2340] text-[#F4EAD5] font-bold text-xs py-3 rounded-lg hover:bg-[#243054] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {isGenerating ? 'Generating...' : totalSelected === 0 ? 'Select at least one item' : 'Generate PDF'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function ResumePreviewPane({
  options,
  selectedIds,
}: {
  options: Options;
  selectedIds: Record<SectionKey, Set<string>>;
}) {
  const selectedSkillGroups = useMemo(() => {
    const picked = options.skills.filter(s => selectedIds.skills.has(s.id));
    return groupSkillsBySection(picked);
  }, [options.skills, selectedIds.skills]);

  const selectedExperience = options.experience.filter(e => selectedIds.experience.has(e.id));
  const selectedEducation = options.education.filter(ed => selectedIds.education.has(ed.id));

  const hasAnything = selectedSkillGroups.length > 0 || selectedExperience.length > 0 || selectedEducation.length > 0;

  const contactParts = [
    options.profile.location,
    options.profile.email,
    options.profile.phone,
    options.profile.portfolioUrl ? 'Portfolio' : undefined,
    ...options.profile.socials
      .filter(s => s.platform === 'linkedin' || s.platform === 'github')
      .map(s => s.label || (s.platform === 'linkedin' ? 'LinkedIn' : 'GitHub')),
  ].filter(Boolean);

  return (
    <div className="font-serif text-[#1A2340]">
      <div className="text-center mb-4 pb-3 border-b border-[#4E4B46]/15">
        <h4 className="text-lg font-bold">{options.profile.name || 'Your Name'}</h4>
        {contactParts.length > 0 && (
          <p className="text-[10px] text-[#1A2340]/60 mt-1">{contactParts.join(' | ')}</p>
        )}
      </div>

      {!hasAnything ? (
        <p className="text-xs text-[#1A2340]/40 italic text-center py-8">
          Your résumé preview will appear here as you select items from the left.
        </p>
      ) : (
        <div className="space-y-4">
          {selectedSkillGroups.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider border-b border-[#1A2340]/20 pb-1 mb-2">Skills</h5>
              {selectedSkillGroups.map(group => (
                <p key={group.sectionTitle} className="text-[11px] leading-relaxed mb-1">
                  <span className="font-bold">{group.sectionTitle}:</span> {group.items.map(i => i.name).join(', ')}
                </p>
              ))}
            </div>
          )}

          {selectedExperience.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider border-b border-[#1A2340]/20 pb-1 mb-2">Experience</h5>
              {selectedExperience.map(entry => (
                <div key={entry.id} className="mb-2.5">
                  <p className="text-[11px]">
                    <span className="font-bold">{entry.title}</span>, <span className="italic">{entry.yearRange}</span>
                  </p>
                  {entry.organization && <p className="text-[11px] italic">{entry.organization}</p>}
                  {entry.bullets?.map((bullet, idx) => (
                    <p key={idx} className="text-[10px] leading-snug pl-3 relative before:content-['•'] before:absolute before:left-0">
                      {bullet}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}

          {selectedEducation.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider border-b border-[#1A2340]/20 pb-1 mb-2">Education</h5>
              {selectedEducation.map(entry => (
                <div key={entry.id} className="mb-2.5">
                  <p className="text-[11px]">
                    <span className="font-bold">{entry.institution}</span> <span className="italic">{entry.dateRange}</span>
                  </p>
                  {entry.programs?.map((program, idx) => (
                    <p key={idx} className="text-[10px] leading-snug pl-3 relative before:content-['•'] before:absolute before:left-0">
                      {program}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
