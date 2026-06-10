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
    defineField({
      name: 'quote',
      title: 'Quote (Page 1)',
      type: 'string',
      description: 'A brief quote or statement for the first page',
    }),
    defineField({
      name: 'page2Paragraph1',
      title: 'Page 2 Paragraph 1',
      type: 'text',
    }),
    defineField({
      name: 'page2Quote',
      title: 'Page 2 Quote',
      type: 'string',
    }),
    defineField({
      name: 'page2Paragraph2',
      title: 'Page 2 Paragraph 2',
      type: 'text',
    }),
  ],
})
