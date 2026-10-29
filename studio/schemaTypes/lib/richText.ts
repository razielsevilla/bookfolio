import { defineArrayMember, defineField } from 'sanity'

// A minimal rich-text config shared by every narrative/description field in
// the book: paragraphs only (no headings/lists — these are prose fields, not
// page builders), with bold/italic and a URL link annotation so entries can
// credit teammates, collaborators, etc. with a clickable link.
export const richTextBlocks = [
  defineArrayMember({
    type: 'block',
    styles: [{ title: 'Normal', value: 'normal' }],
    lists: [],
    marks: {
      decorators: [
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    },
  }),
]
