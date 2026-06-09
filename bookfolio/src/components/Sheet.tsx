"use client";
import React from 'react';
import { useBookfolio } from '../context/BookfolioContext';

interface TabDef {
  title: string;
  tooltip: string;
  top: number;
  target: number;
}

interface SheetProps {
  sheetIndex: number;
  tabs?: TabDef[];
  children: React.ReactNode;
}

export default function Sheet({ sheetIndex, tabs, children }: SheetProps) {
  const { currentSheetIndex, totalSheets, goToSheet } = useBookfolio();

  const isFlipped = sheetIndex < currentSheetIndex;
  const zIndex = isFlipped ? sheetIndex + 1 : totalSheets - sheetIndex;

  return (
    <div className={`sheet ${isFlipped ? 'flipped' : ''}`} style={{ zIndex }}>
      {tabs?.map((tab, idx) => {
        const isActiveTab = currentSheetIndex === tab.target;
        return (
          <div 
            key={idx}
            onClick={() => goToSheet(tab.target)} 
            className={`book-tab ${isActiveTab ? 'active-tab' : ''}`} 
            style={{ top: `${tab.top}px` }}
          >
            <span className="text-xs font-bold font-headline">{tab.title}</span>
            <div className="tab-tooltip shadow-md">{tab.tooltip}</div>
          </div>
        );
      })}
      {children}
    </div>
  );
}
