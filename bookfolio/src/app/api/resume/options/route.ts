import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../../sanity/client';
import { flattenCompetencyTags } from '../../../../lib/resume/competencyTags';
import { isValidResumePassword } from '../../../../lib/resume/auth';
import { getSiteUrl } from '../../../../lib/resume/siteUrl';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!isValidResumePassword(body?.password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const [competencies, experience, author, siteContent] = await Promise.all([
    client.fetch(`*[_type == "competencies"][0]`),
    client.fetch(`*[_type == "experience"] | order(startDate desc) {"id": _id, title, organization, yearRange, bullets}`),
    client.fetch(`*[_type == "author"][0]{name, educationHistory}`),
    client.fetch(`*[_type == "siteContent"][0]{contact, colophon}`),
  ]);

  const skills = flattenCompetencyTags(competencies).map(tag => ({
    id: tag.id,
    name: tag.name,
    sectionTitle: tag.sectionTitle,
  }));
  const education = (author?.educationHistory ?? []).map((entry: any, idx: number) => ({
    id: entry._key ?? String(idx),
    institution: entry.institution,
    dateRange: entry.dateRange,
    programs: entry.programs,
  }));

  const profile = {
    name: author?.name || '',
    location: siteContent?.contact?.location || undefined,
    email: siteContent?.contact?.recipientEmail || undefined,
    phone: siteContent?.contact?.phone || undefined,
    portfolioUrl: getSiteUrl(),
    socials: siteContent?.colophon?.socials || [],
  };

  return NextResponse.json({ profile, skills, experience, education });
}
