"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { usePageFlipAudio } from '../hooks/usePageFlipAudio';

export interface Project {
  id: string;
  title: string;
  category: string;
  tag: string;
  client: string;
  tech: string;
  desc: string;
  color: string;
  graphic: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  tag: string;
}

export interface GuestbookEntry {
  name: string;
  message: string;
  emoji: string;
  date: string;
}

export interface Skill {
  id: string;
  title: string;
  percentage: number;
  description: string;
  iconSvg: string;
}

export interface Experience {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
}

export interface Author {
  name: string;
  role: string;
  bioParagraph1: string;
  bioParagraph2: string;
  quote?: string;
  page2Paragraph1?: string;
  page2Quote?: string;
  page2Paragraph2?: string;
}

export interface BookfolioData {
  projects: Project[];
  certificates: Certificate[];
  guestbook: GuestbookEntry[];
  skills?: Skill[];
  experiences?: Experience[];
  author?: Author;
}

interface BookfolioContextType {
  currentSheetIndex: number;
  totalSheets: number;
  soundEnabled: boolean;
  isTransitioning: boolean;
  toggleSound: () => void;
  nextPage: () => void;
  prevPage: () => void;
  goToSheet: (index: number) => void;
  playPageFlipAudio: () => void;
  data: BookfolioData;
  selectedProjectId: string | null;
  setSelectedProject: (id: string) => void;
}

const BookfolioContext = createContext<BookfolioContextType | undefined>(undefined);

export function BookfolioProvider({ children, totalSheets, initialData }: { children: ReactNode, totalSheets: number, initialData: BookfolioData }) {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProjectId, setSelectedProject] = useState<string | null>(null);
  const { playPageFlipAudio } = usePageFlipAudio(soundEnabled);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) {
        // usePageFlipAudio captures the latest state but we can't play it directly here if we rely on hook 
        // We'll just set it. The user has to flip a page to hear it again.
      }
      return next;
    });
  }, []);

  const nextPage = useCallback(() => {
    if (isTransitioning) return;
    setCurrentSheetIndex(prev => {
      if (prev < totalSheets) {
        playPageFlipAudio();
        return prev + 1;
      }
      return prev;
    });
  }, [isTransitioning, totalSheets, playPageFlipAudio]);

  const prevPage = useCallback(() => {
    if (isTransitioning) return;
    setCurrentSheetIndex(prev => {
      if (prev > 0) {
        playPageFlipAudio();
        return prev - 1;
      }
      return prev;
    });
  }, [isTransitioning, playPageFlipAudio]);

  const goToSheet = useCallback((targetIndex: number) => {
    if (isTransitioning) return;
    
    // Because we need to know current state, we use functional update
    setCurrentSheetIndex(prevIndex => {
      if (targetIndex === prevIndex) return prevIndex;
      
      setIsTransitioning(true);
      const steps = Math.abs(targetIndex - prevIndex);
      const direction = targetIndex > prevIndex ? 1 : -1;

      // We handle the immediate first step
      playPageFlipAudio();
      
      let delay = 250;
      for (let i = 1; i < steps; i++) {
        const currentStep = i;
        setTimeout(() => {
          setCurrentSheetIndex(p => p + direction);
          playPageFlipAudio();
          if (currentStep === steps - 1) {
            setIsTransitioning(false);
          }
        }, delay);
        delay += 250;
      }
      
      if (steps === 1) {
        setTimeout(() => setIsTransitioning(false), 250);
      }

      return prevIndex + direction;
    });
  }, [isTransitioning, playPageFlipAudio]);

  return (
    <BookfolioContext.Provider value={{
      currentSheetIndex, totalSheets, soundEnabled, isTransitioning,
      toggleSound, nextPage, prevPage, goToSheet, playPageFlipAudio, data: initialData,
      selectedProjectId, setSelectedProject
    }}>
      {children}
    </BookfolioContext.Provider>
  );
}

export function useBookfolio() {
  const context = useContext(BookfolioContext);
  if (!context) throw new Error("useBookfolio must be used within a BookfolioProvider");
  return context;
}
