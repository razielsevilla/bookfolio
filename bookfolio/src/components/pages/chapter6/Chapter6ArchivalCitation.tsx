"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';
import CredentialPlate from '../chapter5/CredentialPlate';

// Chapter VI — Right Page: Archival Citation (Dynamic Detail & Preview)
export default function Chapter6ArchivalCitation({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data, selectedAwardId } = useBookfolio();
  const awards = data.awards ?? [];
  const activeAward = (selectedAwardId && awards.find(a => a._id === selectedAwardId)) || awards[0];

  if (!activeAward) {
    return (
      <div className="flex flex-col h-full">
        <div className="shrink-0">
          <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
          <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
          <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
        </div>
        <p className="text-xs text-[#1A2340]/50 italic font-body">No accolades on file yet.</p>
      </div>
    );
  }

  const significancePoints = [
    { label: 'Scope & Scale', text: activeAward.impactScopeScale },
    { label: 'Delivered Build', text: activeAward.impactDeliveredBuild },
    { label: 'Core Competencies Proven', text: activeAward.impactCoreCompetencies },
  ].filter((p): p is { label: string; text: string } => Boolean(p.text));

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4"></div>
      </div>

      {/* Keying by award id remounts this container on selection change,
          replaying the ink-bleed fade-in defined in globals.css. */}
      <div key={activeAward._id} className="flex-1 overflow-y-auto page-scroll pr-2 ink-bleed-in">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-base font-headline text-[#1A2340] leading-snug">{activeAward.title}</h4>
          </div>
          {activeAward.distinctionTier && (
            <span className="inline-block mt-1.5 text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1A2340]/5 border border-amber-900/20 text-[var(--paper-primary)]">
              {activeAward.distinctionTier}
            </span>
          )}
          {(activeAward.hostOrganization || activeAward.dateAwarded || activeAward.location) && (
            <p className="text-xs italic text-[#1A2340]/70 font-body mt-1.5">
              {activeAward.hostOrganization}
              {activeAward.hostOrganization && activeAward.dateAwarded && ' · '}
              {activeAward.dateAwarded}
              {(activeAward.hostOrganization || activeAward.dateAwarded) && activeAward.location && ' · '}
              {activeAward.location}
            </p>
          )}
        </div>

        <CredentialPlate image={activeAward.image} caption={activeAward.previewCaption} />

        {significancePoints.length > 0 && (
          <div className="space-y-3">
            {significancePoints.map(point => (
              <div key={point.label}>
                <span className="text-[10px] uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{point.label}</span>
                <p className="text-sm leading-relaxed font-body text-[#1A2340]/90 mt-1">{point.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
