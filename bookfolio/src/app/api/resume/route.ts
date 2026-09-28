import { createElement } from 'react';
import { NextRequest } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { client } from '../../../sanity/client';
import ResumeDocument, { ResumeData } from '../../../lib/resume/ResumeDocument';

// @react-pdf/renderer needs Node APIs (not Edge-compatible).
export const runtime = 'nodejs';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const SECTION_KEYS = ['skills', 'experience', 'activities', 'education'] as const;
type SectionKey = (typeof SECTION_KEYS)[number];

function parseCommaList(raw: string | null): string[] | null {
  return raw === null ? null : raw.split(',').filter(Boolean);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const includeParam = params.get('include');
  // Absent `include` entirely = direct hit / safety net -> show everything.
  const includedSections: Set<SectionKey> = includeParam === null
    ? new Set(SECTION_KEYS)
    : new Set(includeParam.split(',').filter(Boolean) as SectionKey[]);

  const selectedIds: Record<SectionKey, string[] | null> = {
    skills: parseCommaList(params.get('skills')),
    experience: parseCommaList(params.get('experience')),
    activities: parseCommaList(params.get('activities')),
    education: parseCommaList(params.get('education')),
  };

  function filterSection<T extends { _id: string }>(key: SectionKey, docs: T[]): T[] {
    if (!includedSections.has(key)) return [];
    const ids = selectedIds[key];
    if (ids === null) return docs; // section included but no explicit id list -> show all
    return docs.filter(doc => ids.includes(doc._id));
  }

  const [author, siteContent, experience, activities, education, skills] = await Promise.all([
    client.fetch(`*[_type == "author"][0]`),
    client.fetch(`*[_type == "siteContent"][0]`),
    client.fetch(`*[_type == "experience"] | order(startDate desc)`),
    client.fetch(`*[_type == "activity"] | order(startDate desc)`),
    client.fetch(`*[_type == "education"] | order(startDate desc)`),
    client.fetch(`*[_type == "skill"]`),
  ]);

  const data: ResumeData = {
    name: author?.name || '',
    location: siteContent?.contact?.location || undefined,
    email: siteContent?.contact?.recipientEmail || undefined,
    phone: siteContent?.contact?.phone || undefined,
    portfolioUrl: siteUrl,
    socials: siteContent?.colophon?.socials || [],
    experience: filterSection('experience', experience || []).map((e: any) => ({
      title: e.title,
      organization: e.organization || undefined,
      yearRange: e.yearRange,
      bullets: e.bullets || undefined,
    })),
    activities: filterSection('activities', activities || []).map((a: any) => ({
      title: a.title,
      organization: a.organization || undefined,
      dateRange: a.dateRange,
      bullets: a.bullets || undefined,
    })),
    education: filterSection('education', education || []).map((ed: any) => ({
      institution: ed.institution,
      dateRange: ed.dateRange,
      programs: ed.programs || undefined,
    })),
    skills: filterSection('skills', skills || []).map((s: any) => ({
      name: s.name,
      description: s.description || undefined,
    })),
  };

  // react-pdf's types only accept a literal <Document> element, not a wrapping
  // component that returns one — this is still exactly that tree at runtime.
  const buffer = await renderToBuffer(createElement(ResumeDocument, { data }) as Parameters<typeof renderToBuffer>[0]);

  const fileName = data.name ? `${data.name.replace(/\s+/g, '-')}-Resume.pdf` : 'Resume.pdf';

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}
