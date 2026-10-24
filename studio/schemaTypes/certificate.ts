import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Chapter V — Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers show up first (1, 2, 3) in the Chapter V ledger. Unset items go to the end.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category Micro-Badge',
      type: 'string',
      description: 'e.g. "DEGREE & CURRICULUM", "CLOUD COMPUTING", "MACHINE LEARNING" — shown on the Chapter V ledger.',
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Body',
      type: 'string',
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'string',
      description: 'e.g. "2026" or "March 2026".',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID / Hash',
      type: 'string',
      description: 'Optional verification code or hash shown in the credential metadata.',
    }),
    defineField({
      name: 'verifyUrl',
      title: 'Verify Credential URL',
      type: 'url',
    }),
    defineField({
      name: 'pdfUrl',
      title: 'View Original PDF URL',
      type: 'url',
    }),
    defineField({
      name: 'highlights',
      title: 'Curricular / Competency Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: '2-3 concise bullet points explaining what skills or courses were validated by this credential.',
    }),
    defineField({
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      description: 'Shown as the Credential Plate on Chapter V. Natural aspect ratio is preserved (landscape certificates or portrait transcripts both work).',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'previewCaption',
      title: 'Plate Caption (Figure Inscription)',
      type: 'string',
      description: 'e.g. "Plate V.A — Official Academic Progress Tracker, Pamantasan ng Cabuyao"',
    }),
  ],
})
