import { defineField, defineType } from 'sanity'
import { richTextBlocks } from './lib/richText'

export default defineType({
  name: 'award',
  title: 'Chapter VI — Award / Accolade',
  type: 'document',
  groups: [
    { name: 'ledger', title: 'Roll of Honor (Left Page)' },
    { name: 'citation', title: 'Archival Citation (Right Page)' },
  ],
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers show up first (1, 2, 3) in the Roll of Honor. Unset items go to the end.',
      group: 'ledger',
    }),
    defineField({
      name: 'title',
      title: 'Distinction Title',
      type: 'string',
      description: 'e.g. "HACK4APROGRESS 2026"',
      group: 'ledger',
    }),
    defineField({
      name: 'category',
      title: 'Category Micro-Badge',
      type: 'string',
      description: 'e.g. "NATIONAL HACKATHON", "INTER-COLLEGIATE", "COMMUNITY LEADERSHIP"',
      group: 'ledger',
    }),
    defineField({
      name: 'distinctionTier',
      title: 'Distinction Tier / Result',
      type: 'string',
      description: 'e.g. "Top 8 Finalist", "8th Place National"',
      group: 'ledger',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      description: 'Optional, e.g. "Team PnCCs"',
      group: 'ledger',
    }),
    defineField({
      name: 'hostOrganization',
      title: 'Convening Body / Host Organization',
      type: 'string',
      group: 'citation',
    }),
    defineField({
      name: 'dateAwarded',
      title: 'Date Awarded',
      type: 'string',
      description: 'e.g. "2026" or "March 2026"',
      group: 'citation',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'citation',
    }),
    defineField({
      name: 'significance',
      title: 'Significance',
      type: 'array',
      of: richTextBlocks,
      description: 'Why this distinction matters — scope, what was built, and the skills it proved. Select text and use the link icon to credit a teammate with a link to their portfolio.',
      group: 'citation',
    }),
    defineField({
      name: 'image',
      title: 'Citation / Trophy / Certificate Image',
      type: 'image',
      description: 'Certificate of recognition, competition plaque, or podium/stage photograph. Natural aspect ratio is preserved.',
      options: { hotspot: true },
      group: 'citation',
    }),
    defineField({
      name: 'previewCaption',
      title: 'Plate Caption (Figure Inscription)',
      type: 'string',
      description: 'e.g. "Plate VI.A — Verified Distinction"',
      group: 'citation',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'distinctionTier' },
  },
})
