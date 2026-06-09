import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience (Chronicles)',
  type: 'document',
  fields: [
    defineField({
      name: 'yearRange',
      title: 'Year Range',
      type: 'string',
      description: 'e.g. "2024 - Present"',
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
