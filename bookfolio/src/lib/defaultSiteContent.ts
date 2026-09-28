import type { SiteContent } from '../context/BookfolioContext';

// Mirrors the copy that used to be hardcoded in each page component, so the site
// renders identically even before a `siteContent` document exists in Sanity, and
// so a partially-filled document still falls back field-by-field instead of page-by-page.
export const DEFAULT_SITE_CONTENT: SiteContent = {
  covers: {
    frontEyebrow: 'PORTFOLIO CODEX 2026',
    frontTagline: 'A MULTI-DIMENSIONAL WEB SHOWCASE',
    frontName: 'RAZIEL SEVILLA',
    frontCue: 'CLICK TO UNVEIL →',
    backHeading: 'COLOPHON',
    backDescription: 'Hand-compiled using HTML5 CSS3 preservation matrices and dynamic synthesized physical nodes in 2026.',
    backCopyrightLine: '© 2026 RAZIEL SEVILLA',
  },
  colophon: {
    introParagraph:
      'The boundary between digital rendering and physical design is merely a matter of architecture, perspective, and clean interaction matrices.\n\nIf you have inquiries, collaboration ideas, or wish to commission a project, my channels are open.',
    socials: [
      { platform: 'github', url: 'https://github.com/razielsevilla', label: 'GitHub' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/raziel-lloyd-sevilla-b9b64938a/', label: 'LinkedIn' },
      { platform: 'email', url: 'mailto:raziel.lloyd.sevilla.cs@gmail.com', label: 'Email' },
    ],
  },
  contact: {
    recipientEmail: 'raziel.lloyd.sevilla.cs@gmail.com',
  },
  chapters: {
    page1: { chapterLabel: "CHAPTER I : THE SCRIBE'S AWAKENING", title: 'The Reader & Creator' },
    page2: { chapterLabel: "CHAPTER I : THE SCRIBE'S AWAKENING", title: 'Our Narrative Path' },
    page3: { chapterLabel: 'CHAPTER II : TRAILS & CHRONICLES', title: 'Chronicles of the Crucible' },
    page4: { chapterLabel: 'CHAPTER III : THE ARCANUM OF CRAFTS', title: 'The Guild of Instruments' },
    page5: { chapterLabel: 'CHAPTER IV : RELICS OF CREATION', title: 'The Great Forge' },
    page6: { chapterLabel: 'CHAPTER IV : RELICS OF CREATION', title: 'The Great Forge' },
    page7: { chapterLabel: 'CHAPTER V : SEALS OF VALIDATION', title: 'Credentials Vault' },
    page8: { chapterLabel: 'CHAPTER V : SEALS OF VALIDATION', title: 'Credentials Vault' },
    page9: { chapterLabel: 'CHAPTER VI : ECHOES FROM THE LEDGER', title: 'Inscribe Your Tale' },
    page10: { chapterLabel: 'CHAPTER VI : ECHOES FROM THE LEDGER', title: 'The Scroll of Greetings' },
    page11: { chapterLabel: 'CHAPTER VII : LETTERS TO THE HORIZON', title: 'Dispatch an Envoy' },
    page12: { chapterLabel: 'CHAPTER VII : LETTERS TO THE HORIZON', title: 'Connect Privately' },
  },
};
