"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useBookfolio } from '../context/BookfolioContext';
import CoverFront from './pages/CoverFront';
import CoverBack from './pages/CoverBack';
import Page1Bio from './pages/Page1Bio';
import Page2Timeline from './pages/Page2Timeline';
import Page3Experience from './pages/Page3Experience';
import Page4Skills from './pages/Page4Skills';
import Page5ProjectsList from './pages/Page5ProjectsList';
import Page6Projects1 from './pages/Page6Projects1';
import Page7Projects2 from './pages/Page7Projects2';
import Page8Credentials from './pages/Page8Credentials';
import Page9Guestbook from './pages/Page9Guestbook';
import Page10GuestbookList from './pages/Page10GuestbookList';
import Page11ContactForm from './pages/Page11ContactForm';
import Page12Colophon from './pages/Page12Colophon';

const mobilePages = [
  { id: 'cover-front', component: CoverFront, isCover: true, pageNumber: null },
  { id: 'page-1', component: Page1Bio, isCover: false, pageNumber: 1 },
  { id: 'page-2', component: Page2Timeline, isCover: false, pageNumber: 2 },
  { id: 'page-3', component: Page3Experience, isCover: false, pageNumber: 3 },
  { id: 'page-4', component: Page4Skills, isCover: false, pageNumber: 4 },
  { id: 'page-5', component: Page5ProjectsList, isCover: false, pageNumber: 5 },
  { id: 'page-6', component: Page6Projects1, isCover: false, pageNumber: 6 },
  { id: 'page-7', component: Page7Projects2, isCover: false, pageNumber: 7 },
  { id: 'page-8', component: Page8Credentials, isCover: false, pageNumber: 8 },
  { id: 'page-9', component: Page9Guestbook, isCover: false, pageNumber: 9 },
  { id: 'page-10', component: Page10GuestbookList, isCover: false, pageNumber: 10 },
  { id: 'page-11', component: Page11ContactForm, isCover: false, pageNumber: 11 },
  { id: 'page-12', component: Page12Colophon, isCover: false, pageNumber: 12 },
  { id: 'cover-back', component: CoverBack, isCover: true, pageNumber: null },
];

export default function MobileBook() {
  const { playPageFlipAudio, mobilePageIndex, setMobilePageIndex } = useBookfolio();

  const nextPage = useCallback(() => {
    setMobilePageIndex(prev => {
      if (prev < mobilePages.length - 1) {
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'AudioVolumeDown') {
        if (e.key === 'AudioVolumeDown') e.preventDefault(); // Attempt to block default volume UI
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'AudioVolumeUp') {
        if (e.key === 'AudioVolumeUp') e.preventDefault();
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

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
    <div className="w-full max-w-[480px] mx-auto h-full relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      
      {/* Invisible Tap Zones for Navigation */}
      <div 
        className="absolute left-0 top-16 bottom-16 w-1/5 z-20 cursor-pointer" 
        onClick={prevPage} 
        aria-label="Previous Page"
      />
      <div 
        className="absolute right-0 top-16 bottom-16 w-1/5 z-20 cursor-pointer" 
        onClick={nextPage} 
        aria-label="Next Page"
      />

      {mobilePages.map((page, index) => {
        const Comp = page.component;
        
        let translateX = 'translate-x-0';
        let opacity = 'opacity-100';
        let pointerEvents = 'pointer-events-auto';

        if (index < mobilePageIndex) {
          translateX = '-translate-x-[110%]';
          opacity = 'opacity-0';
          pointerEvents = 'pointer-events-none';
        } else if (index > mobilePageIndex) {
          translateX = 'translate-x-[110%]';
          opacity = 'opacity-0';
          pointerEvents = 'pointer-events-none';
        }

        return (
          <div 
            key={page.id} 
            className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${translateX} ${opacity} ${pointerEvents} px-2 pb-6 pt-2`}
          >
            <div className={`w-full h-full rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] relative overflow-hidden p-6 ${page.isCover ? 'leather-cover items-center text-center flex flex-col justify-center' : 'paper-page flex flex-col'}`}>
              
              {/* Internal padding container similar to the 3D book */}
              {page.isCover ? (
                <div className="cover-rim absolute inset-3 flex flex-col justify-between p-6">
                  <Comp />
                </div>
              ) : (
                <>
                  <div className="flex-1 flex flex-col min-h-0 w-full pb-2 relative z-10">
                    <Comp />
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
      <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1.5 z-20 pointer-events-none">
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
