import { defineField, defineType } from 'sanity'
import { richTextBlocks } from './lib/richText'

export default defineType({
  name: 'project',
  title: 'Chapter IV — Project',
  type: 'document',
  groups: [
    { name: 'index', title: 'Project Ledger (Left Page)', default: true },
    { name: 'exhibit', title: 'Case Study (Right Page)' },
    { name: 'links', title: 'Tech & Links' },
  ],
  fields: [
    // --- Project Ledger: drives the Chapter IV left-page index/selector ---
    defineField({
      name: 'orderRank',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers show up first (1, 2, 3). Unset items go to the end.',
      group: 'index',
    }),
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      group: 'index',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / One-Liner',
      type: 'string',
      description: 'Short one-line summary shown in the Chapter IV project index, e.g. "Blockchain / AI"',
      validation: Rule => Rule.max(80).error('Subtitle must be 80 characters or less to fit on the page.'),
      group: 'index',
    }),
    defineField({
      name: 'featured',
      title: 'Featured in Chapter IV',
      type: 'boolean',
      description: 'Only featured projects appear in the Chapter IV catalog (ordered by Sort Order above). Unfeatured projects still exist in the CMS but stay off the book.',
      initialValue: false,
      group: 'index',
    }),

    // --- Case Study: the Chapter IV right-page "Dynamic Exhibit" narrative ---
    defineField({
      name: 'award',
      title: 'Award / Context Badge',
      type: 'string',
      description: 'Optional recognition badge, e.g. "Top 8 Finalist, HACK4APROGRESS 2026". Leave blank if none.',
      group: 'exhibit',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Screenshot',
      type: 'image',
      description: 'Shown as an archival plate/vignette on Chapter IV. 16:9 or 21:9 aspect ratio recommended.',
      options: { hotspot: true },
      group: 'exhibit',
    }),
    defineField({
      name: 'previewCaption',
      title: 'Preview Caption (Figure Inscription)',
      type: 'string',
      description: 'e.g. "Plate IV.A — Interface preview & cryptographic triage workflow"',
      group: 'exhibit',
    }),
    defineField({
      name: 'desc',
      title: 'Description (fallback overview)',
      type: 'array',
      of: richTextBlocks,
      description: 'Shown as a general overview on Chapter IV when the structured case-study sections below are empty. Select text and use the link icon to credit a teammate or collaborator.',
      group: 'exhibit',
    }),
    defineField({
      name: 'caseStudyChallenge',
      title: 'Case Study — The Challenge / Premise',
      type: 'array',
      of: richTextBlocks,
      description: 'The concrete real-world problem being addressed. Select text and use the link icon to credit a teammate or collaborator.',
      group: 'exhibit',
    }),
    defineField({
      name: 'caseStudyArchitecture',
      title: 'Case Study — Architectural Blueprint',
      type: 'array',
      of: richTextBlocks,
      description: 'The technical stack, data pipelines, algorithms, and design choices. Select text and use the link icon to credit a teammate or collaborator.',
      group: 'exhibit',
    }),
    // --- Tech & Links: badge pills and outbound links shown alongside the case study ---
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'string',
      description: 'Slash-separated, shown as badge pills on Chapter IV, e.g. "TensorFlow.js / Blockchain / Laravel"',
      group: 'links',
    }),
    defineField({
      name: 'repoUrl',
      title: 'GitHub Repo',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live App',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'landingUrl',
      title: 'Landing Page',
      type: 'url',
      description: 'Shown as the "Live System" link only when Live App above is left blank.',
      group: 'links',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', featured: 'featured' },
    prepare({ title, subtitle, featured }) {
      return {
        title,
        subtitle: [subtitle, featured ? 'Featured — in Chapter IV' : 'Not featured — hidden from book'].filter(Boolean).join('  |  '),
      }
    },
  },
})
