import { defineField, defineType } from 'sanity'
import { richTextBlocks } from './lib/richText'

export default defineType({
  name: 'author',
  title: 'Chapter I — Author / Bio',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity (Chapter I — Left Page)' },
    { name: 'summary', title: 'Executive Summary (Chapter I — Right Page)' },
    { name: 'education', title: 'Education (Résumé Only)' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'photo',
      title: 'Photo / Monogram',
      type: 'image',
      description: 'Embossed monogram/photo shown on Chapter I. Not included in the generated resume/CV.',
      group: 'identity',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'role',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Full-Stack Engineer & Systems Builder"',
      group: 'identity',
    }),
    defineField({
      name: 'affiliation',
      title: 'Affiliation',
      type: 'string',
      description: 'e.g. "Pamantasan ng Cabuyao — BS Computer Science Candidate"',
      group: 'identity',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability & Status',
      type: 'string',
      description: 'e.g. "Open to full-time opportunities & freelance collaborations"',
      group: 'identity',
    }),
    defineField({
      name: 'manifesto',
      title: 'Builder Manifesto',
      type: 'array',
      of: richTextBlocks,
      description: 'A short, highlighted blockquote framing your engineering philosophy. Select text and use the link icon to credit a person or project.',
      group: 'identity',
    }),
    defineField({
      name: 'summaryNarrative',
      title: 'Executive Summary',
      type: 'array',
      of: richTextBlocks,
      description: 'A fluid 2-3 sentence executive paragraph — keyword-rich (ATS-ready) but read as prose, not a bullet breakdown. Select text and use the link icon to credit a person or project.',
      group: 'summary',
    }),
    defineField({
      name: 'corePillars',
      title: 'Core Pillars At-A-Glance',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short badge labels, e.g. "Full-Stack", "AI/Vision".',
      group: 'summary',
    }),
    defineField({
      name: 'educationHistory',
      title: 'Education History',
      type: 'array',
      description: 'Not shown in any book chapter — used only by the generated résumé/CV.',
      group: 'education',
      of: [
        defineField({
          name: 'educationEntry',
          type: 'object',
          fields: [
            defineField({ name: 'institution', title: 'Institution', type: 'string' }),
            defineField({ name: 'dateRange', title: 'Date Range', type: 'string', description: 'e.g. "2023-2027"' }),
            defineField({
              name: 'programs',
              title: 'Programs / Degrees',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'One entry per degree/program line.',
            }),
          ],
          preview: {
            select: { institution: 'institution', dateRange: 'dateRange' },
            prepare({ institution, dateRange }) {
              return { title: institution, subtitle: dateRange }
            },
          },
        }),
      ],
    }),
  ],
})
