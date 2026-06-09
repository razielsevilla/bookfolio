// Experience Schema (experience.js)
export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'title', title: 'Job Title', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'date', options: { dateFormat: 'YYYY-MM' } },
    { name: 'endDate', title: 'End Date', type: 'date', options: { dateFormat: 'YYYY-MM' } },
    { name: 'isCurrent', title: 'Currently Working Here?', type: 'boolean' },
    { name: 'bullets', title: 'Description Bullets', type: 'array', of: [{ type: 'string' }] }
  ],
  preview: {
    select: { title: 'company', subtitle: 'title' }
  }
};
