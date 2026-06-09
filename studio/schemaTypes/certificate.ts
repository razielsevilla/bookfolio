import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Certificate ID',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Topics',
      type: 'string',
    }),
  ],
})
