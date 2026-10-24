import { defineField, defineType } from 'sanity'

const group = defineField({
  name: 'group',
  title: 'Group',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Group Label', type: 'string', description: 'e.g. "Languages", "Frontend Ecosystem"' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], description: 'Individual skills, shown as badge pills.' }),
  ],
  preview: {
    select: { label: 'label', tags: 'tags' },
    prepare({ label, tags }) {
      return { title: label, subtitle: (tags || []).join(', ') }
    },
  },
})

const section = defineField({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string', description: 'e.g. "Full-Stack & Web Architecture"' }),
    defineField({ name: 'groups', title: 'Groups', type: 'array', of: [group] }),
  ],
  preview: {
    select: { title: 'title' },
  },
})

export default defineType({
  name: 'competencies',
  title: 'Chapter II — Competencies',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'In order — the first 3 render on the left page, the next 3 on the right page.',
      type: 'array',
      of: [section],
      validation: (Rule) => Rule.length(6).warning('Chapter II is designed for exactly 6 sections (3 per page).'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Competencies (Chapter II)', subtitle: 'Grimoire of Competencies — technical skills catalog' }
    },
  },
})
