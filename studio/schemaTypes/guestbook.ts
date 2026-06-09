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
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
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
