"use client";
import React, { useRef } from 'react';
import { useBookfolio } from '../context/BookfolioContext';
import { useBookKeyboardNav } from '../hooks/useBookKeyboardNav';
import { useBookScale } from '../hooks/useBookScale';
import Sheet from './Sheet';
import Page from './Page';
import CoverFront from './pages/CoverFront';
import CoverBack from './pages/CoverBack';
import ChapterPage from './pages/ChapterPage';
import { CHAPTERS, ChapterDef, resolveChapterContent, toRoman } from '../lib/chapters';

// One sheet per chapter boundary: sheet 0's front is the front cover, sheet
// N's back is the back cover, and every sheet in between carries one
// chapter's right (front) page and the next chapter's left (back) page. This
// means flipping sheet `i` (i.e. going to sheet index i+1) reveals chapter
// `i+1` as a complete, self-contained left+right spread — one flip per chapter.
const NUM_SHEETS = CHAPTERS.length + 1;

function renderChapterSide(
  chapter: ChapterDef,
  side: 'left' | 'right',
  content: { title: string; leftSubtitle: string; rightSubtitle: string }
) {
  const Component = side === 'left' ? chapter.LeftComponent : chapter.RightComponent;
  const subtitle = side === 'left' ? content.leftSubtitle : content.rightSubtitle;
  if (Component) return <Component chapterTitle={content.title} subtitle={subtitle} />;
  return <ChapterPage title={content.title} subtitle={subtitle} />;
}

export default function Book() {
  const { currentSheetIndex, totalSheets, nextPage, prevPage, data } = useBookfolio();
  useBookKeyboardNav(nextPage, prevPage);
  const chapterContents = CHAPTERS.map(chapter => resolveChapterContent(chapter, data.siteContent?.chapters));

  const scalerContainerRef = useRef<HTMLDivElement>(null);
  const scale = useBookScale(scalerContainerRef);

  let transform = 'rotateX(10deg) rotateY(0deg) translateX(0%)';
  if (currentSheetIndex === 0) {
    transform = 'rotateX(10deg) rotateY(-5deg) translateX(-25%)';
  } else if (currentSheetIndex === totalSheets) {
    transform = 'rotateX(10deg) rotateY(5deg) translateX(25%)';
  }

  return (
    <div ref={scalerContainerRef} className="w-full h-full flex items-center justify-center">
      <div id="book-scaler" className="transition-transform duration-300 ease-out flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
        <div className="scene">
          <div className="book" style={{ transform }}>
            <div className="book-spine"></div>

            {Array.from({ length: NUM_SHEETS }, (_, i) => {
              const isFirst = i === 0;
              const isLast = i === NUM_SHEETS - 1;
              const chapterIndex = i + 1; // 1-indexed chapter this sheet's tab reveals
              const roman = toRoman(chapterIndex);

              return (
                <Sheet
                  key={i}
                  sheetIndex={i}
                  tabs={isLast ? undefined : [{
                    title: roman,
                    tooltip: `${roman}: ${chapterContents[i].title}`,
                    top: 60 * chapterIndex,
                    target: chapterIndex,
                  }]}
                >
                  <Page side="front" isCover={isFirst} pageNumber={isFirst ? undefined : 2 * i}>
                    {isFirst ? <CoverFront /> : renderChapterSide(CHAPTERS[i - 1], 'right', chapterContents[i - 1])}
                  </Page>
                  <Page side="back" isCover={isLast} pageNumber={isLast ? undefined : 2 * i + 1}>
                    {isLast ? <CoverBack /> : renderChapterSide(CHAPTERS[i], 'left', chapterContents[i])}
                  </Page>
                </Sheet>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}
