"use client";
import { useBookfolio } from '../../../context/BookfolioContext';
import { urlFor } from '../../../sanity/imageUrl';
import type { ChapterPageProps } from '../../../lib/chapters';
import { RichParagraphs } from '../../shared/ChunkedText';

// Strips the scheme/mailto/www/trailing-slash so a URL reads as a clean handle,
// e.g. "https://github.com/razielsevilla" -> "github.com/razielsevilla".
function formatHandle(url: string): string {
  if (url.startsWith('mailto:')) return url.slice('mailto:'.length);
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === 'email') {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

// Chapter I — Left Page: Frontispiece & Coordinates
export default function Chapter1Frontispiece({ chapterTitle, subtitle }: ChapterPageProps) {
  const { data } = useBookfolio();
  const author = data.author;
  const socials = data.siteContent?.colophon?.socials ?? [];
  const location = data.siteContent?.contact?.location;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 text-center">
        <span className="text-xs uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">{chapterTitle}</span>
        <h3 className="text-xl font-bold mt-1 font-headline text-[#1A2340]">{subtitle}</h3>
        <div className="w-16 h-[2px] bg-[var(--paper-primary)]/30 mt-1 mb-4 mx-auto"></div>
      </div>

      <div className="flex-1 overflow-y-auto page-scroll pr-2">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="relative w-20 h-20 mb-3">
            <div className="absolute inset-0 rounded-full border border-[#D4A574]/40"></div>
            <div className="absolute inset-[3px] rounded-full overflow-hidden bg-[#1A2340]/5 border-2 border-[#D4A574]/70 flex items-center justify-center text-[var(--paper-primary)] shadow-md">
              {author?.photo ? (
                <img
                  src={urlFor(author.photo).width(160).height(160).fit('crop').url()}
                  alt={author?.name || 'Profile photo'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>
          </div>
          <h4 className="font-bold text-base text-[#1A2340] font-headline">{author?.name}</h4>
          <p className="text-xs text-[var(--paper-primary)] font-bold font-body mt-0.5">{author?.role}</p>
          {author?.affiliation && (
            <p className="text-[11px] text-[#1A2340]/70 font-body mt-1">{author.affiliation}</p>
          )}
        </div>

        {(socials.length > 0 || location) && (
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-widest text-[var(--paper-primary)] font-bold font-body">Vital Coordinates</span>
            <ul className="mt-2 space-y-1.5">
              {socials.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#1A2340]/80 font-body hover:text-[#D4A574] transition-colors"
                  >
                    <SocialIcon platform={social.platform} />
                    {formatHandle(social.url)}
                  </a>
                </li>
              ))}
              {location && (
                <li className="text-xs text-[#1A2340]/80 font-body">{location}</li>
              )}
            </ul>
          </div>
        )}

        {(author?.manifesto?.length ?? 0) > 0 && (
          <>
            <div className="w-full h-px bg-[#D4A574]/25 mb-4"></div>
            <div className="text-center italic text-[#1A2340]/70 font-body text-xs leading-relaxed px-3">
              <span aria-hidden="true">&ldquo;</span>
              <RichParagraphs value={author?.manifesto} className="inline" paragraphClassName="inline" />
              <span aria-hidden="true">&rdquo;</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
