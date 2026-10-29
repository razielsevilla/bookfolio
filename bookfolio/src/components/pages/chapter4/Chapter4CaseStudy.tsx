"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';
import ProjectPreviewPlate from './ProjectPreviewPlate';
import { RichBulletSection } from '../../shared/ChunkedText';

function ChallengeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function ArchitectureIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3M6.429 9.75L12 6.75l5.571 3M2.25 12l4.179 2.25M2.25 12l4.179-2.25M21.75 12l-4.179 2.25m4.179-2.25l-4.179-2.25M21.75 12l-5.571 3m5.571-3l-5.571-3M6.429 14.25L12 17.25l5.571-3" />
    </svg>
  );
}

function OverviewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

const CASE_STUDY_SECTIONS = [
  { field: 'caseStudyChallenge', label: 'The Challenge', Icon: ChallengeIcon },
  { field: 'caseStudyArchitecture', label: 'Architectural Blueprint', Icon: ArchitectureIcon },
] as const;

// Chapter IV — Right Page: The Dynamic Exhibit (Case Study Details)
export default function Chapter4CaseStudy({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data, selectedProjectId } = useBookfolio();
  const featured = (data.projects ?? []).filter(p => p.featured);
  const activeProject = (selectedProjectId && featured.find(p => p._id === selectedProjectId)) || featured[0];

  if (!activeProject) {
    return (
      <div className="flex flex-col h-full">
        <div className="shrink-0">
          <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
          <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
          <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
        </div>
        <p className="text-xs text-[#1A2340]/50 italic font-body">No featured project selected yet.</p>
      </div>
    );
  }

  const tags = activeProject.tech ? activeProject.tech.split('/').map(t => t.trim()).filter(Boolean) : [];
  const links = [
    { label: 'GitHub Repository', url: activeProject.repoUrl },
    { label: 'Live System', url: activeProject.liveUrl || activeProject.landingUrl },
  ].filter((l): l is { label: string; url: string } => Boolean(l.url));

  const hasStructuredCaseStudy = Boolean(
    activeProject.caseStudyChallenge?.length || activeProject.caseStudyArchitecture?.length
  );

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      {/* Keying by project id remounts this container on selection change,
          replaying the ink-bleed fade-in defined in globals.css. */}
      <div key={activeProject._id} className="flex-1 overflow-y-auto page-scroll pr-2 ink-bleed-in">
        <ProjectPreviewPlate image={activeProject.previewImage} caption={activeProject.previewCaption} />

        <div className="mb-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-base font-headline text-[#1A2340] leading-snug">{activeProject.title}</h4>
          </div>
          {activeProject.subtitle && (
            <p className="text-xs italic text-[#1A2340]/70 font-body mt-0.5">{activeProject.subtitle}</p>
          )}
          {activeProject.award && (
            <span className="inline-block mt-1.5 text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1A2340]/5 border border-amber-900/20 text-[var(--paper-primary)]">
              {activeProject.award}
            </span>
          )}

          {links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--paper-primary)] font-bold font-body hover:text-[#D4A574] transition-colors inline-flex items-center gap-1"
                >
                  {link.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold font-mono px-2 py-1 rounded-full bg-[#1A2340]/5 border border-amber-900/20 text-[var(--paper-primary)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {hasStructuredCaseStudy ? (
          <div className="space-y-4">
            {CASE_STUDY_SECTIONS.map(({ field, label, Icon }) => (
              <RichBulletSection key={field} icon={Icon} label={label} value={activeProject[field]} />
            ))}
          </div>
        ) : (
          <RichBulletSection icon={OverviewIcon} label="Overview" value={activeProject.desc} />
        )}
      </div>
    </div>
  );
}
