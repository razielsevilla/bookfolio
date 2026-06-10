"use client";
import React from 'react';
import { useBookfolio } from '../context/BookfolioContext';

interface PageProps {
  side: 'front' | 'back';
  isCover?: boolean;
  pageNumber?: number;
  children: React.ReactNode;
}

export default function Page({ side, isCover, pageNumber, children }: PageProps) {
  const { nextPage, prevPage } = useBookfolio();

  const handleCurlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (side === 'front') nextPage();
    else prevPage();
  };

  const handlePageClick = () => {
    if (isCover) {
      if (side === 'front') nextPage();
      else prevPage();
    }
  };

  return (
    <div 
      className={`page ${side} ${isCover ? 'leather-cover items-center text-center cursor-pointer' : 'paper-page flex flex-col justify-between'} relative overflow-hidden`}
      onClick={handlePageClick}
    >
      {isCover ? (
        <>
          <div className="cover-rim absolute inset-4 flex flex-col justify-between p-8">
            {children}
          </div>
          <div className={side === 'front' ? 'corner-curl' : 'corner-curl-left'} onClick={handleCurlClick}></div>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col min-h-0 w-full pb-4">
            {children}
          </div>
          <div className={`flex shrink-0 ${side === 'front' ? 'justify-end' : 'justify-start'} items-center text-xs text-[var(--paper-primary)]/70 mt-auto pt-4 border-t border-[#4E4B46]/20 font-mono`}>
            <span>Page {pageNumber}</span>
          </div>
          <div className={side === 'front' ? 'corner-curl' : 'corner-curl-left'} onClick={handleCurlClick}></div>
        </>
      )}
    </div>
  );
}
