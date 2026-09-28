import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Role / Title',
      type: 'string',
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
    }),
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'string',
      description: 'e.g. "August 2026 - Present"',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date (For Sorting)',
      type: 'date',
      description: 'Used only to sort activities (newest at the top).',
    }),
    defineField({
      name: 'bullets',
      title: 'Résumé Bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
