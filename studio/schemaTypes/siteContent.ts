import { defineField, defineType } from 'sanity'

// One field pair per page component: { chapterLabel, title }.
// Sub-field `title` (e.g. "Page 4 — Skills") is how this maps back to the book for a non-technical editor.
const chapterField = (name: string, studioTitle: string) =>
  defineField({
    name,
    title: studioTitle,
    type: 'object',
    fields: [
      defineField({ name: 'chapterLabel', title: 'Chapter Label', type: 'string' }),
      defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    ],
  })

export default defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  groups: [
    { name: 'covers', title: 'Covers' },
    { name: 'colophon', title: 'Colophon' },
    { name: 'contact', title: 'Contact' },
    { name: 'chapters', title: 'Chapter Titles' },
  ],
  fields: [
    defineField({
      name: 'covers',
      title: 'Covers',
      type: 'object',
      group: 'covers',
      fields: [
        defineField({ name: 'frontEyebrow', title: 'Front Cover Eyebrow', type: 'string', description: 'Small text above the emblem, e.g. "PORTFOLIO CODEX 2026".' }),
        defineField({ name: 'frontTagline', title: 'Front Cover Tagline', type: 'string' }),
        defineField({ name: 'frontName', title: 'Front Cover Name', type: 'string' }),
        defineField({ name: 'frontCue', title: 'Front Cover Cue', type: 'string', description: 'e.g. "CLICK TO UNVEIL →"' }),
        defineField({ name: 'backHeading', title: 'Back Cover Heading', type: 'string', description: 'e.g. "COLOPHON"' }),
        defineField({ name: 'backDescription', title: 'Back Cover Description', type: 'text' }),
        defineField({ name: 'backCopyrightLine', title: 'Back Cover Copyright Line', type: 'string', description: 'Year + name only — "ALL RIGHTS RESERVED" is fixed below it.' }),
      ],
    }),
    defineField({
      name: 'colophon',
      title: 'Colophon',
      type: 'object',
      group: 'colophon',
      fields: [
        defineField({ name: 'introParagraph', title: 'Intro Paragraph', type: 'text' }),
        defineField({
          name: 'socials',
          title: 'Social Links',
          type: 'array',
          of: [
            defineField({
              name: 'social',
              type: 'object',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: { list: ['github', 'linkedin', 'email', 'website', 'other'] },
                }),
                defineField({ name: 'url', title: 'URL', type: 'string' }),
                defineField({ name: 'label', title: 'Label Override', type: 'string', description: 'Optional — defaults to the platform name if left blank.' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'recipientEmail',
          title: 'Recipient Email',
          type: 'string',
          description: 'Where contact-form submissions are sent.',
          validation: Rule => Rule.required().email(),
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'e.g. "Laguna, Philippines" — shown on the generated CV/résumé.',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Shown on the generated CV/résumé.',
        }),
      ],
    }),
    defineField({
      name: 'chapters',
      title: 'Chapter Titles',
      type: 'object',
      group: 'chapters',
      fields: [
        chapterField('page1', 'Page 1 — Bio'),
        chapterField('page2', 'Page 2 — Timeline'),
        chapterField('page3', 'Page 3 — Experience'),
        chapterField('page4', 'Page 4 — Skills'),
        chapterField('page5', 'Page 5 — Projects List'),
        chapterField('page6', 'Page 6 — Projects (Detail)'),
        chapterField('page7', 'Page 7 — Credentials List'),
        chapterField('page8', 'Page 8 — Credentials (Detail)'),
        chapterField('page9', 'Page 9 — Guestbook Form'),
        chapterField('page10', 'Page 10 — Guestbook List'),
        chapterField('page11', 'Page 11 — Contact Form'),
        chapterField('page12', 'Page 12 — Colophon'),
      ],
    }),
  ],
})
