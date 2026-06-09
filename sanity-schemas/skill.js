// Skill Schema (skill.js)
export default {
  name: 'skill',
  title: 'Skill Category',
  type: 'document',
  fields: [
    { 
      name: 'category', 
      title: 'Category Name', 
      type: 'string', 
      description: 'e.g., Core, Extended, Frontier' 
    },
    { name: 'order', title: 'Display Order', type: 'number' },
    {
      name: 'skills',
      title: 'Skills in this Category',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Skill Name', type: 'string' },
            { name: 'years', title: 'Years of Experience', type: 'number' }
          ]
        }
      ]
    }
  ]
};
