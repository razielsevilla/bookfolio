"use client";
import React from 'react';
import { useBookfolio } from '../context/BookfolioContext';
import Sheet from './Sheet';
import Page from './Page';

// Placeholder content components, these will be replaced with real components
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

export default function Book() {
  const { currentSheetIndex, totalSheets } = useBookfolio();

  let transform = 'rotateX(10deg) rotateY(0deg) translateX(0%)';
  if (currentSheetIndex === 0) {
    transform = 'rotateX(10deg) rotateY(-5deg) translateX(-25%)';
  } else if (currentSheetIndex === totalSheets) {
    transform = 'rotateX(10deg) rotateY(5deg) translateX(25%)';
  }

  return (
    <main className="flex-grow flex items-center justify-center relative p-4 overflow-hidden z-10">
      <div id="book-scaler" className="transition-transform duration-300 ease-out flex items-center justify-center">
        <div className="scene">
          <div className="book" style={{ transform }}>
            <div className="book-spine"></div>
            
            {/* Sheet 1 */}
            <Sheet 
              sheetIndex={0} 
              tabs={[{ title: "I", tooltip: "I: Awakening", top: 60, target: 1 }]}
            >
              <Page side="front" isCover>
                <CoverFront />
              </Page>
              <Page side="back" pageNumber={1}>
                <Page1Bio />
              </Page>
            </Sheet>

            {/* Sheet 2 */}
            <Sheet 
              sheetIndex={1} 
              tabs={[{ title: "II", tooltip: "II: Chronicles", top: 120, target: 2 }]}
            >
              <Page side="front" pageNumber={2}>
                <Page2Timeline />
              </Page>
              <Page side="back" pageNumber={3}>
                <Page3Experience />
              </Page>
            </Sheet>

            {/* Sheet 3 */}
            <Sheet 
              sheetIndex={2} 
              tabs={[{ title: "III", tooltip: "III: Arcanum", top: 180, target: 2 }]}
            >
              <Page side="front" pageNumber={4}>
                <Page4Skills />
              </Page>
              <Page side="back" pageNumber={5}>
                <Page5ProjectsList />
              </Page>
            </Sheet>

            {/* Sheet 4 */}
            <Sheet 
              sheetIndex={3}
              tabs={[{ title: "IV", tooltip: "IV: Relics", top: 240, target: 3 }]}
            >
              <Page side="front" pageNumber={6}>
                <Page6Projects1 />
              </Page>
              <Page side="back" pageNumber={7}>
                <Page7Projects2 />
              </Page>
            </Sheet>

            {/* Sheet 5 */}
            <Sheet 
              sheetIndex={4} 
              tabs={[{ title: "V", tooltip: "V: Seals", top: 300, target: 4 }]}
            >
              <Page side="front" pageNumber={8}>
                <Page8Credentials />
              </Page>
              <Page side="back" pageNumber={9}>
                <Page9Guestbook />
              </Page>
            </Sheet>

            {/* Sheet 6 */}
            <Sheet 
              sheetIndex={5} 
              tabs={[{ title: "VI", tooltip: "VI: Echoes", top: 360, target: 5 }]}
            >
              <Page side="front" pageNumber={10}>
                <Page10GuestbookList />
              </Page>
              <Page side="back" pageNumber={11}>
                <Page11ContactForm />
              </Page>
            </Sheet>

            {/* Sheet 7 */}
            <Sheet 
              sheetIndex={6}
              tabs={[{ title: "VII", tooltip: "VII: Letters", top: 420, target: 6 }]}
            >
              <Page side="front" pageNumber={12}>
                <Page12Colophon />
              </Page>
              <Page side="back" isCover>
                <CoverBack />
              </Page>
            </Sheet>

          </div>
        </div>
      </div>
    </main>
  );
}
