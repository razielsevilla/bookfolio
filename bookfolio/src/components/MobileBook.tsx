"use client";
import React, { useRef, useCallback, useMemo } from 'react';
import { useBookfolio } from '../context/BookfolioContext';
import { useBookKeyboardNav } from '../hooks/useBookKeyboardNav';
import CoverFront from './pages/CoverFront';
import CoverBack from './pages/CoverBack';
import ChapterPage from './pages/ChapterPage';
import { CHAPTERS, resolveChapterContent } from '../lib/chapters';

interface MobilePage {
  id: string;
  render: () => React.ReactNode;
  isCover: boolean;
  pageNumber: number | null;
}

// 1 front cover + 2 pages per chapter + 1 back cover — fixed regardless of
// Sanity content, used for nav bounds-checking below.
const MOBILE_PAGE_COUNT = CHAPTERS.length * 2 + 2;

export default function MobileBook() {
  const { playPageFlipAudio, mobilePageIndex, setMobilePageIndex, data } = useBookfolio();

  const mobilePages = useMemo<MobilePage[]>(() => {
    const chapterContents = CHAPTERS.map(chapter => resolveChapterContent(chapter, data.siteContent?.chapters));
    return [
      { id: 'cover-front', render: () => <CoverFront />, isCover: true, pageNumber: null },
      ...CHAPTERS.flatMap((chapter, idx) => {
        const content = chapterContents[idx];
        return [
          {
            id: `chapter-${idx + 1}-left`,
            render: () => (chapter.LeftComponent
              ? <chapter.LeftComponent chapterTitle={content.title} subtitle={content.leftSubtitle} />
              : <ChapterPage title={content.title} subtitle={content.leftSubtitle} />),
            isCover: false,
            pageNumber: idx * 2 + 1,
          },
          {
            id: `chapter-${idx + 1}-right`,
            render: () => (chapter.RightComponent
              ? <chapter.RightComponent chapterTitle={content.title} subtitle={content.rightSubtitle} />
              : <ChapterPage title={content.title} subtitle={content.rightSubtitle} />),
            isCover: false,
            pageNumber: idx * 2 + 2,
          },
        ];
      }),
      { id: 'cover-back', render: () => <CoverBack />, isCover: true, pageNumber: null },
    ];
  }, [data.siteContent?.chapters]);

  const nextPage = useCallback(() => {
    setMobilePageIndex(prev => {
      if (prev < MOBILE_PAGE_COUNT - 1) {
        playPageFlipAudio();
        return prev + 1;
      }
      return prev;
    });
  }, [playPageFlipAudio, setMobilePageIndex]);

  const prevPage = useCallback(() => {
    setMobilePageIndex(prev => {
      if (prev > 0) {
        playPageFlipAudio();
        return prev - 1;
      }
      return prev;
    });
  }, [playPageFlipAudio, setMobilePageIndex]);

  // Keyboard and Volume buttons support
  useBookKeyboardNav(nextPage, prevPage);

  // Touch Swipe support
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only trigger if horizontal swipe is greater than vertical swipe (avoid triggering on scrolling)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) nextPage(); // Swiped left
      else prevPage(); // Swiped right
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto h-full relative mobile-scene" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

      {/* Invisible Tap Zones for Navigation */}
      <div
        className="absolute left-0 top-16 bottom-16 w-1/5 z-40 cursor-pointer"
        onClick={prevPage}
        aria-label="Previous Page"
      />
      <div
        className="absolute right-0 top-16 bottom-16 w-1/5 z-40 cursor-pointer"
        onClick={nextPage}
        aria-label="Next Page"
      />

      {/* Book binding — anchors the flip to a real spine edge rather than
          pages sliding past each other in flat 2D. */}
      <div className="mobile-spine" />

      {mobilePages.map((page, index) => {
        const isFlipped = index < mobilePageIndex;
        const isActive = index === mobilePageIndex;
        // Mirrors the desktop Sheet's z-index formula: the page mid-flip (or
        // the active one) stays on top; everything else layers by distance
        // from the current page so the "unread" stack sits convincingly beneath it.
        const zIndex = isFlipped ? index + 1 : mobilePages.length - index;

        return (
          <div
            key={page.id}
            className={`absolute inset-0 mobile-page-flip px-2 pb-6 pt-2 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ zIndex, transform: `rotateY(${isFlipped ? -180 : 0}deg)` }}
          >
            <div className={`w-full h-full rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] relative overflow-hidden p-6 ${page.isCover ? 'leather-cover items-center text-center flex flex-col justify-center' : 'paper-page flex flex-col'}`}>

              {/* Internal padding container similar to the 3D book */}
              {page.isCover ? (
                <div className="cover-rim absolute inset-3 flex flex-col justify-between p-6">
                  {page.render()}
                </div>
              ) : (
                <>
                  <div className="flex-1 flex flex-col min-h-0 w-full pb-2 relative z-10">
                    {page.render()}
                  </div>
                  {page.pageNumber && (
                    <div className="flex shrink-0 justify-center items-center text-xs text-[var(--paper-primary)]/70 mt-auto pt-3 border-t border-[#4E4B46]/20 font-mono relative z-10">
                      <span>Page {page.pageNumber}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Progress Indicator */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1.5 z-40 pointer-events-none">
        {mobilePages.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === mobilePageIndex ? 'w-4 bg-[#D4A574]' : 'w-1.5 bg-[#4E4B46]/60'}`}
          />
        ))}
      </div>
    </div>
  );
}
