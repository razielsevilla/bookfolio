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
    location: 'Laguna, Philippines',
  },
};
