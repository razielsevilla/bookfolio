// Project Schema (project.js)
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'tech', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['live', 'in-progress', 'case-study', 'archived', 'completed', 'active'] } },
    { name: 'liveLink', title: 'Live Link', type: 'url' },
    { name: 'repoLink', title: 'Repo Link', type: 'string' },
    { name: 'highlight', title: 'Highlight', type: 'boolean' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'order', title: 'Display Order', type: 'number' }
  ]
};
