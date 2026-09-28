import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'guestbook',
  title: 'Guestbook Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Visitor Name',
      type: 'string',
      validation: Rule => Rule.max(60).warning('Keep names under 60 characters.'),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.max(500).warning('Keep messages under 500 characters.'),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji Selection',
      type: 'string',
      options: {
        list: ['✍️', '🚀', '✨', '🔥'],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date String',
      type: 'string',
      description: 'e.g. "Just now", "2 days ago"',
    }),
  ],
})
