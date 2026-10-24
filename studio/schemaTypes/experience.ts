import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Chapter III — Experience',
  type: 'document',
  groups: [
    { name: 'core', title: 'Role & Organization', default: true },
    { name: 'content', title: 'Content' },
    { name: 'placement', title: 'Book Placement' },
  ],
  fields: [
    // --- Role & Organization: the "who/where/when" of the entry ---
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      group: 'core',
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      description: 'Company/org name — used by the generated CV/résumé and Chapter III.',
      group: 'core',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Laguna, Philippines" — shown on Chapter III.',
      group: 'core',
    }),
    defineField({
      name: 'yearRange',
      title: 'Year Range',
      type: 'string',
      description: 'e.g. "2024 - Present"',
      group: 'core',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date (For Sorting)',
      type: 'date',
      description: 'Pick the starting date. This is ONLY used to sort your experiences (newest at the top).',
      group: 'core',
    }),

    // --- Content: shown on Chapter III and/or the résumé ---
    defineField({
      name: 'focus',
      title: 'Focus (one-liner)',
      type: 'text',
      description: 'Short one-line focus/summary shown under the role on Chapter III, e.g. "Operational scaling, volunteer logistics, and developer engagement."',
      group: 'content',
    }),
    defineField({
      name: 'bullets',
      title: 'Achievement Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Achievement bullet points — used by the generated CV/résumé and Chapter III.',
      group: 'content',
    }),

    // --- Book Placement: whether/where this shows up in Chapter III ---
    defineField({
      name: 'pageSide',
      title: 'Chapter III Placement',
      type: 'string',
      options: { list: [{ title: 'Left Page — Regional Operations & Guilds', value: 'left' }, { title: 'Right Page — Technical Initiatives & Leadership', value: 'right' }] },
      description: 'Which page of Chapter III (Chronicles of Experience) this entry appears on. Leave blank to keep this entry résumé-only (hidden from the book).',
      group: 'placement',
    }),
  ],
  preview: {
    select: { title: 'title', organization: 'organization', yearRange: 'yearRange', pageSide: 'pageSide' },
    prepare({ title, organization, yearRange, pageSide }) {
      const meta = [organization, yearRange].filter(Boolean).join(' · ')
      const placement = pageSide ? `Chapter III — ${pageSide}` : 'Résumé only'
      return {
        title,
        subtitle: [meta, placement].filter(Boolean).join('  |  '),
      }
    },
  },
})
