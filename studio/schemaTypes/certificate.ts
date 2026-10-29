import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Chapter V — Certificate',
  type: 'document',
  groups: [
    { name: 'ledger', title: 'Credentials Ledger (Left Page)', default: true },
    { name: 'plate', title: 'Credential Plate (Right Page)' },
  ],
  fields: [
    // --- Credentials Ledger: drives the Chapter V left-page master list ---
    defineField({
      name: 'orderRank',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers show up first (1, 2, 3) in the Chapter V ledger. Unset items go to the end.',
      group: 'ledger',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'ledger',
    }),
    defineField({
      name: 'category',
      title: 'Category Micro-Badge',
      type: 'string',
      description: 'e.g. "DEGREE & CURRICULUM", "CLOUD COMPUTING", "MACHINE LEARNING" — shown on the Chapter V ledger.',
      group: 'ledger',
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Body',
      type: 'string',
      description: 'Shown on both the ledger list and the credential plate.',
      group: 'ledger',
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'string',
      description: 'e.g. "2026" or "March 2026". Shown on both the ledger list and the credential plate.',
      group: 'ledger',
    }),

    // --- Credential Plate: the Chapter V right-page detail/preview ---
    defineField({
      name: 'credentialId',
      title: 'Credential ID / Hash',
      type: 'string',
      description: 'Optional verification code or hash shown in the credential metadata.',
      group: 'plate',
    }),
    defineField({
      name: 'verifyUrl',
      title: 'Verify Credential URL',
      type: 'url',
      group: 'plate',
    }),
    defineField({
      name: 'pdfUrl',
      title: 'View Original PDF URL',
      type: 'url',
      group: 'plate',
    }),
    defineField({
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      description: 'Shown as the Credential Plate on Chapter V. Natural aspect ratio is preserved (landscape certificates or portrait transcripts both work).',
      options: {
        hotspot: true,
      },
      group: 'plate',
    }),
    defineField({
      name: 'previewCaption',
      title: 'Plate Caption (Figure Inscription)',
      type: 'string',
      description: 'e.g. "Plate V.A — Official Academic Progress Tracker, Pamantasan ng Cabuyao"',
      group: 'plate',
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category', issuer: 'issuer', issueDate: 'issueDate' },
    prepare({ title, category, issuer, issueDate }) {
      return {
        title,
        subtitle: [category, issuer, issueDate].filter(Boolean).join('  |  '),
      }
    },
  },
})
