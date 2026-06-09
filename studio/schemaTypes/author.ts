import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author / Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'bioParagraph1',
      title: 'Bio Paragraph 1',
      type: 'text',
    }),
    defineField({
      name: 'bioParagraph2',
      title: 'Bio Paragraph 2',
      type: 'text',
    }),
  ],
})
