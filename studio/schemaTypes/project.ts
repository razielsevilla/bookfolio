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
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Develop', value: 'dev' },
          { title: 'Design', value: 'design' },
        ],
      },
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Subtitle',
      type: 'string',
      description: 'e.g. "Blockchain / AI"',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'string',
      description: 'e.g. "TensorFlow.js / Blockchain / Laravel"',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Gradient Color Classes',
      type: 'string',
      description: 'e.g. "from-[#243054] to-[#1A2340]"',
    }),
    defineField({
      name: 'graphic',
      title: 'SVG Graphic Code',
      type: 'text',
      description: 'Paste the <svg> element code here',
    }),
  ],
})
