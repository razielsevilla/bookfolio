"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import type { ChapterPageProps } from '../../../lib/chapters';
import CredentialPlate from '../chapter5/CredentialPlate';
import { RichBulletSection } from '../../shared/ChunkedText';

function SignificanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
}

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

        <RichBulletSection icon={SignificanceIcon} label="Significance" value={activeAward.significance} />
      </div>
    </div>
  );
}
