"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { usePageFlipAudio } from '../hooks/usePageFlipAudio';

// Sanity Portable Text — an array of block objects. Used for every narrative
// field (case studies, bios, colophon copy) so entries can bold/link text
// (e.g. crediting a teammate with a link to their portfolio).
export type RichText = any[];

export interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  award?: string;
  featured?: boolean;
  orderRank?: number;
  previewImage?: any;
  previewCaption?: string;
  desc?: RichText;
  caseStudyChallenge?: RichText;
  caseStudyArchitecture?: RichText;
  tech?: string;
  repoUrl?: string;
  liveUrl?: string;
  landingUrl?: string;
}

export interface Certificate {
  _id: string;
  orderRank?: number;
  title: string;
  category?: string;
  issuer?: string;
  issueDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  pdfUrl?: string;
  image?: any;
  previewCaption?: string;
}

export interface GuestbookEntry {
  name: string;
  message: string;
  emoji: string;
  date: string;
}

export interface Experience {
  _id: string;
  title: string;
  organization?: string;
  yearRange: string;
  location?: string;
  focus?: string;
  bullets?: string[];
  pageSide?: 'left' | 'right';
}

export interface EducationEntry {
  institution: string;
  dateRange: string;
  programs?: string[];
}

export interface Author {
  name: string;
  role: string;
  photo?: any;
  affiliation?: string;
  availabilityStatus?: string;
  manifesto?: RichText;
  summaryNarrative?: RichText;
  corePillars?: string[];
  // Résumé-only — not shown in any book chapter.
  educationHistory?: EducationEntry[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'email' | 'website' | 'other';
  url: string;
  label?: string;
}

export interface SiteContentCovers {
  frontEyebrow: string;
  frontTagline: string;
  frontName: string;
  frontCue: string;
  backHeading: string;
  backDescription: RichText;
  backCopyrightLine: string;
}

export interface SiteContentColophon {
  introParagraph: RichText;
  socials: SocialLink[];
}

export interface SiteContentContact {
  recipientEmail: string;
  location?: string;
  phone?: string;
}

export interface ChapterContentEntry {
  title?: string;
  leftSubtitle?: string;
  rightSubtitle?: string;
}

export interface SiteContentChapters {
  chapter1?: ChapterContentEntry;
  chapter2?: ChapterContentEntry;
  chapter3?: ChapterContentEntry;
  chapter4?: ChapterContentEntry;
  chapter5?: ChapterContentEntry;
  chapter6?: ChapterContentEntry;
  chapter7?: ChapterContentEntry;
  chapter8?: ChapterContentEntry;
}

export interface SiteContent {
  covers: SiteContentCovers;
  colophon: SiteContentColophon;
  contact: SiteContentContact;
  chapters?: SiteContentChapters;
}

export interface CompetencyGroup {
  label: string;
  tags: string[];
}

export interface CompetencySection {
  title: string;
  groups: CompetencyGroup[];
}

export interface Competencies {
  sections: CompetencySection[];
}

export interface Award {
  _id: string;
  orderRank?: number;
  title: string;
  category?: string;
  distinctionTier?: string;
  team?: string;
  hostOrganization?: string;
  dateAwarded?: string;
  location?: string;
  significance?: RichText;
  image?: any;
  previewCaption?: string;
}

export interface BookfolioData {
  projects: Project[];
  certificates: Certificate[];
  guestbook: GuestbookEntry[];
  experiences?: Experience[];
  author?: Author;
  siteContent?: SiteContent;
  competencies?: Competencies;
  awards?: Award[];
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
  selectedAwardId: string | null;
  setSelectedAward: (id: string) => void;
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
  const [selectedAwardId, setSelectedAward] = useState<string | null>(null);
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
      selectedAwardId, setSelectedAward,
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
