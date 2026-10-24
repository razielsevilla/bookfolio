export interface CompetencyTagItem {
  id: string;
  name: string;
  sectionTitle: string;
}

// The résumé's "Skills" section has no dedicated Sanity type of its own —
// it's sourced directly from Chapter II's competencies content, flattened
// from sections > groups > tags into individually selectable items.
export function flattenCompetencyTags(competencies: any): CompetencyTagItem[] {
  const sections = competencies?.sections ?? [];
  const items: CompetencyTagItem[] = [];
  sections.forEach((section: any, sIdx: number) => {
    (section.groups ?? []).forEach((group: any, gIdx: number) => {
      (group.tags ?? []).forEach((tag: string, tIdx: number) => {
        items.push({ id: `${sIdx}-${gIdx}-${tIdx}`, name: tag, sectionTitle: section.title });
      });
    });
  });
  return items;
}
