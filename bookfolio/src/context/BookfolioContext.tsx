"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { usePageFlipAudio } from '../hooks/usePageFlipAudio';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  desc: string;
  tech: string;
  collaborators?: string;
  repoUrl?: string;
  liveUrl?: string;
  landingUrl?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  tag: string;
  image?: any;
}

export interface GuestbookEntry {
  name: string;
  message: string;
  emoji: string;
  date: string;
}

export interface Skill {
  id: string;
  _id?: string;
  name: string;
  category?: string;
  percentage: number;
  description: string;
  iconSvg?: string;
}

export interface Experience {
  id: string;
  yearRange: string;
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
  mobilePageIndex: number;
  setMobilePageIndex: React.Dispatch<React.SetStateAction<number>>;
  goToMobilePage: (index: number) => void;
  playPageFlipAudio: () => void;
  data: BookfolioData;
  selectedProjectId: string | null;
  setSelectedProject: (id: string) => void;
  selectedCertificateId: string | null;
  setSelectedCertificate: (id: string) => void;
  addGuestbookEntry: (entry: GuestbookEntry) => void;
}

const BookfolioContext = createContext<BookfolioContextType | undefined>(undefined);

export function BookfolioProvider({ children, totalSheets, initialData }: { children: ReactNode, totalSheets: number, initialData: BookfolioData }) {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [data, setData] = useState<BookfolioData>(initialData);
  const [selectedProjectId, setSelectedProject] = useState<string | null>(null);
  const [selectedCertificateId, setSelectedCertificate] = useState<string | null>(null);
  const { playPageFlipAudio } = usePageFlipAudio(soundEnabled);

  const addGuestbookEntry = useCallback((entry: GuestbookEntry) => {
    setData(prev => ({
      ...prev,
      guestbook: [entry, ...prev.guestbook]
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
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
    if (targetIndex === currentSheetIndex) return;
      
    setIsTransitioning(true);
    const steps = Math.abs(targetIndex - currentSheetIndex);
    const direction = targetIndex > currentSheetIndex ? 1 : -1;

    setCurrentSheetIndex(currentSheetIndex + direction);
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
  }, [isTransitioning, currentSheetIndex, playPageFlipAudio]);

  const goToMobilePage = useCallback((targetIndex: number) => {
    setMobilePageIndex(targetIndex);
    playPageFlipAudio();
  }, [playPageFlipAudio]);

  return (
    <BookfolioContext.Provider value={{
      currentSheetIndex, totalSheets, soundEnabled, isTransitioning,
      toggleSound, nextPage, prevPage, goToSheet, 
      mobilePageIndex, setMobilePageIndex, goToMobilePage,
      playPageFlipAudio, data,
      selectedProjectId, setSelectedProject,
      selectedCertificateId, setSelectedCertificate,
      addGuestbookEntry
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
