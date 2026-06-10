import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      description: 'e.g. "Interface Layer"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Interface Layer', value: 'Interface Layer' },
          { title: 'Systems & Data Layer', value: 'Systems & Data Layer' },
          { title: 'Infrastructure & Cloud', value: 'Infrastructure & Cloud' },
        ],
      },
    }),
    defineField({
      name: 'percentage',
      title: 'Percentage (0-100)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Interactive Highlight Description',
      type: 'text',
      validation: (Rule) => Rule.max(160).warning('Keep descriptions under 160 characters for consistent card heights.'),
    }),
  ],
})
