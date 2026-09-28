import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
    }),
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'string',
      description: 'e.g. "2023-2027"',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date (For Sorting)',
      type: 'date',
      description: 'Used only to sort education entries (newest at the top).',
    }),
    defineField({
      name: 'programs',
      title: 'Programs / Degrees',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One entry per degree/program line.',
    }),
  ],
})
