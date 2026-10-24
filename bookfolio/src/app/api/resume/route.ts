import { createElement } from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { client } from '../../../sanity/client';
import ResumeDocument, { ResumeData, ResumeSkillGroup } from '../../../lib/resume/ResumeDocument';
import { flattenCompetencyTags } from '../../../lib/resume/competencyTags';
import { isValidResumePassword } from '../../../lib/resume/auth';
import { getSiteUrl } from '../../../lib/resume/siteUrl';

// @react-pdf/renderer needs Node APIs (not Edge-compatible).
export const runtime = 'nodejs';

// Skills, Experience, and Education all come from the same chapter-content
// types the book uses (Chapter II competencies, Chapter III experience, and
// Chapter I's author.educationHistory) — there are no résumé-only Sanity types.
type SectionKey = 'skills' | 'experience' | 'education';

interface ResumeRequestBody {
  password?: string;
  // Nothing pre-selected by default on the client — an absent/empty array
  // for a section simply omits it (ResumeDocument only renders a heading
  // when that section has at least one entry).
  selected?: Partial<Record<SectionKey, string[]>>;
}

export async function POST(request: NextRequest) {
  const body: ResumeRequestBody | null = await request.json().catch(() => null);

  if (!isValidResumePassword(body?.password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const selectedIds: Record<SectionKey, string[]> = {
    skills: Array.isArray(body?.selected?.skills) ? body!.selected!.skills! : [],
    experience: Array.isArray(body?.selected?.experience) ? body!.selected!.experience! : [],
    education: Array.isArray(body?.selected?.education) ? body!.selected!.education! : [],
  };

  function filterSection<T extends { _id: string }>(key: SectionKey, docs: T[]): T[] {
    const ids = selectedIds[key];
    return docs.filter(doc => ids.includes(doc._id));
  }

  const [author, siteContent, experience, competencies] = await Promise.all([
    client.fetch(`*[_type == "author"][0]`),
    client.fetch(`*[_type == "siteContent"][0]`),
    client.fetch(`*[_type == "experience"] | order(startDate desc)`),
    client.fetch(`*[_type == "competencies"][0]`),
  ]);

  const educationDocs = (author?.educationHistory ?? []).map((entry: any, idx: number) => ({
    _id: entry._key ?? String(idx),
    institution: entry.institution,
    dateRange: entry.dateRange,
    programs: entry.programs,
  }));

  const skillTags = flattenCompetencyTags(competencies).map(tag => ({ _id: tag.id, ...tag }));
  const selectedSkillTags = filterSection('skills', skillTags);
  const skillGroups: ResumeSkillGroup[] = [];
  selectedSkillTags.forEach(tag => {
    let group = skillGroups.find(g => g.sectionTitle === tag.sectionTitle);
    if (!group) {
      group = { sectionTitle: tag.sectionTitle, skills: [] };
      skillGroups.push(group);
    }
    group.skills.push(tag.name);
  });

  const data: ResumeData = {
    name: author?.name || '',
    location: siteContent?.contact?.location || undefined,
    email: siteContent?.contact?.recipientEmail || undefined,
    phone: siteContent?.contact?.phone || undefined,
    portfolioUrl: getSiteUrl(),
    socials: siteContent?.colophon?.socials || [],
    experience: filterSection('experience', experience || []).map((e: any) => ({
      title: e.title,
      organization: e.organization || undefined,
      yearRange: e.yearRange,
      bullets: e.bullets || undefined,
    })),
    education: filterSection('education', educationDocs).map((ed: any) => ({
      institution: ed.institution,
      dateRange: ed.dateRange,
      programs: ed.programs || undefined,
    })),
    skills: skillGroups,
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
