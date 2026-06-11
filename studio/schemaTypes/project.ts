import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Project ID',
      type: 'string',
      description: 'A unique id string, e.g. "kumpirma"',
    }),
    defineField({
      name: 'orderRank',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers show up first (1, 2, 3). Unset items go to the end.',
    }),
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "Blockchain / AI"',
      validation: Rule => Rule.max(80).error('Subtitle must be 80 characters or less to fit on the page.'),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.max(450).error('Description must be 450 characters or less to fit on one page without scrolling.'),
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'string',
      description: 'e.g. "TensorFlow.js / Blockchain / Laravel"',
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborator',
      type: 'string',
      description: 'If any, e.g. "John Doe, Jane Smith"',
    }),
    defineField({
      name: 'repoUrl',
      title: 'GitHub Repo',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live App',
      type: 'url',
    }),
    defineField({
      name: 'landingUrl',
      title: 'Landing Page',
      type: 'url',
    }),
  ],
})
