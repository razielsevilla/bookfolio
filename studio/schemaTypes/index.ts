import siteContent from './siteContent'
import author from './author'
import competencies from './competencies'
import experience from './experience'
import project from './project'
import certificate from './certificate'
import award from './award'
import guestbook from './guestbook'

// Ordered to match the book's own sequence — Site Content (covers + Chapter
// VIII) first, then Chapter I through VII in order. This is also the order
// Sanity Studio's default desk structure lists document types in, so
// reordering this array is what actually reorders the sidebar.
//
// Skills, experience/activities, and education all feed the résumé generator
// directly from these chapter-content types (competencies, experience,
// author.educationHistory) — there are no separate résumé-only document types.
export const schemaTypes = [
  siteContent,
  author,
  competencies,
  experience,
  project,
  certificate,
  award,
  guestbook,
]
