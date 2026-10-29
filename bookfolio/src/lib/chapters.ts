import { ComponentType } from 'react';
import type { SiteContentChapters } from '../context/BookfolioContext';
import Chapter1Frontispiece from '../components/pages/chapter1/Chapter1Frontispiece';
import Chapter1ExecutiveSummary from '../components/pages/chapter1/Chapter1ExecutiveSummary';
import Chapter2CoreEngineering from '../components/pages/chapter2/Chapter2CoreEngineering';
import Chapter2ProtocolsLifecycle from '../components/pages/chapter2/Chapter2ProtocolsLifecycle';
import Chapter3RegionalOperations from '../components/pages/chapter3/Chapter3RegionalOperations';
import Chapter3TechnicalInitiatives from '../components/pages/chapter3/Chapter3TechnicalInitiatives';
import Chapter4ProjectIndex from '../components/pages/chapter4/Chapter4ProjectIndex';
import Chapter4CaseStudy from '../components/pages/chapter4/Chapter4CaseStudy';
import Chapter5CredentialsLedger from '../components/pages/chapter5/Chapter5CredentialsLedger';
import Chapter5CredentialPlate from '../components/pages/chapter5/Chapter5CredentialPlate';
import Chapter6HonorRoll from '../components/pages/chapter6/Chapter6HonorRoll';
import Chapter6ArchivalCitation from '../components/pages/chapter6/Chapter6ArchivalCitation';
import Chapter7Inscribe from '../components/pages/chapter7/Chapter7Inscribe';
import Chapter7GreetingsScroll from '../components/pages/chapter7/Chapter7GreetingsScroll';
import Chapter8ContactForm from '../components/pages/chapter8/Chapter8ContactForm';
import Chapter8Colophon from '../components/pages/chapter8/Chapter8Colophon';

// Every chapter page component receives its (possibly Sanity-overridden)
// running-header eyebrow and page heading as props, rather than hardcoding
// its own text — see resolveChapterContent below.
export interface ChapterPageProps {
  chapterTitle: string;
  subtitle: string;
}

export interface ChapterDef {
  // Matches a key under siteContent.chapters in Sanity (Chapter Titles &
  // Subtitles group) — lets editors override title/subtitles without touching code.
  key: keyof SiteContentChapters;
  title: string; // default chapter title — nav (tabs/footer/jump menu) + page eyebrow fallback
  leftSubtitle: string; // default left-page heading
  rightSubtitle: string; // default right-page heading
  // Bespoke left/right page components, filled in chapter-by-chapter as content
  // is designed. Falls back to the generic ChapterPage placeholder when absent.
  LeftComponent?: ComponentType<ChapterPageProps>;
  RightComponent?: ComponentType<ChapterPageProps>;
}

// Single source of truth for the book's chapters. Each chapter is exactly one
// left+right page pair (one sheet flip reveals the whole chapter) — see Book.tsx.
export const CHAPTERS: ChapterDef[] = [
  {
    key: 'chapter1',
    title: 'Prologue',
    leftSubtitle: 'Frontispiece & Coordinates',
    rightSubtitle: 'The Executive Summary',
    LeftComponent: Chapter1Frontispiece,
    RightComponent: Chapter1ExecutiveSummary,
  },
  {
    key: 'chapter2',
    title: 'Grimoire of Competencies',
    leftSubtitle: 'Core Engineering & Intelligent Systems',
    rightSubtitle: 'Protocols, Lifecycle & Execution',
    LeftComponent: Chapter2CoreEngineering,
    RightComponent: Chapter2ProtocolsLifecycle,
  },
  {
    key: 'chapter3',
    title: 'Chronicles of Experience',
    leftSubtitle: 'Regional Operations & Community Ecosystems',
    rightSubtitle: 'Technical Initiatives & Institutional Governance',
    LeftComponent: Chapter3RegionalOperations,
    RightComponent: Chapter3TechnicalInitiatives,
  },
  {
    key: 'chapter4',
    title: 'The Forge (Creations & Prototypes)',
    leftSubtitle: 'The Forge: Inscribed Works & MVPs',
    rightSubtitle: 'Architecture & Engineering Report',
    LeftComponent: Chapter4ProjectIndex,
    RightComponent: Chapter4CaseStudy,
  },
  {
    key: 'chapter5',
    title: 'Academic Inscriptions',
    leftSubtitle: 'Certifications & Academic Proofs',
    rightSubtitle: 'Credential Verification & Plate',
    LeftComponent: Chapter5CredentialsLedger,
    RightComponent: Chapter5CredentialPlate,
  },
  {
    key: 'chapter6',
    title: 'Accolades & Milestones',
    leftSubtitle: 'Competitive Triumphs & Honors',
    rightSubtitle: 'Distinction Record & Certificate',
    LeftComponent: Chapter6HonorRoll,
    RightComponent: Chapter6ArchivalCitation,
  },
  {
    key: 'chapter7',
    title: 'The Fellowship (Leave a Message)',
    leftSubtitle: 'Leave a Message',
    rightSubtitle: 'Messages & Testimonials',
    LeftComponent: Chapter7Inscribe,
    RightComponent: Chapter7GreetingsScroll,
  },
  {
    key: 'chapter8',
    title: 'The Dispatch (Contact Me)',
    leftSubtitle: 'Send a Message',
    rightSubtitle: 'Connect Privately',
    LeftComponent: Chapter8ContactForm,
    RightComponent: Chapter8Colophon,
  },
];

export interface ResolvedChapterContent {
  title: string;
  leftSubtitle: string;
  rightSubtitle: string;
}

// Merges a chapter's hardcoded defaults with any Sanity override, field by
// field — so a partially-filled Studio entry still falls back per-field
// instead of all-or-nothing.
export function resolveChapterContent(chapter: ChapterDef, chapters?: SiteContentChapters): ResolvedChapterContent {
  const override = chapters?.[chapter.key];
  return {
    title: override?.title || chapter.title,
    leftSubtitle: override?.leftSubtitle || chapter.leftSubtitle,
    rightSubtitle: override?.rightSubtitle || chapter.rightSubtitle,
  };
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export function toRoman(n: number): string {
  return ROMAN_NUMERALS[n - 1] ?? String(n);
}
