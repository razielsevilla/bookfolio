import { defineField, defineType } from 'sanity'

// One field group per chapter: { title, leftSubtitle, rightSubtitle }.
// `studioTitle` names the chapter for a non-technical editor; the book's
// chapter order/pages themselves stay fixed in code (bookfolio/src/lib/chapters.ts) —
// only this chapter's title and its two page headings are editable here.
const chapterField = (name: string, studioTitle: string) =>
  defineField({
    name,
    title: studioTitle,
    type: 'object',
    fields: [
      defineField({ name: 'title', title: 'Chapter Title', type: 'string' }),
      defineField({ name: 'leftSubtitle', title: 'Left Page Subtitle', type: 'string' }),
      defineField({ name: 'rightSubtitle', title: 'Right Page Subtitle', type: 'string' }),
    ],
  })

export default defineType({
  name: 'siteContent',
  title: 'Site Content — Covers & Chapter VIII',
  type: 'document',
  groups: [
    { name: 'covers', title: 'Covers' },
    { name: 'colophon', title: 'Colophon' },
    { name: 'contact', title: 'Contact' },
    { name: 'chapters', title: 'Chapter Titles & Subtitles' },
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
      title: 'Chapter Titles & Subtitles',
      type: 'object',
      group: 'chapters',
      description: 'The book always has these 8 chapters in this order — only their title/subtitle text is editable here.',
      fields: [
        chapterField('chapter1', 'Chapter I — Prologue'),
        chapterField('chapter2', 'Chapter II — Grimoire of Competencies'),
        chapterField('chapter3', 'Chapter III — Chronicles of Experience'),
        chapterField('chapter4', 'Chapter IV — The Forge'),
        chapterField('chapter5', 'Chapter V — Academic Inscriptions'),
        chapterField('chapter6', 'Chapter VI — Accolades & Milestones'),
        chapterField('chapter7', 'Chapter VII — The Fellowship'),
        chapterField('chapter8', 'Chapter VIII — The Dispatch'),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Content', subtitle: 'Covers, colophon, contact & chapter titles' }
    },
  },
})
