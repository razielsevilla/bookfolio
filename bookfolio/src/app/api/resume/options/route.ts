import { client } from '../../../../sanity/client';

export async function GET() {
  const [skills, experience, activities, education] = await Promise.all([
    client.fetch(`*[_type == "skill"]{"id": _id, name}`),
    client.fetch(`*[_type == "experience"] | order(startDate desc) {"id": _id, title, organization, yearRange}`),
    client.fetch(`*[_type == "activity"] | order(startDate desc) {"id": _id, title, organization, dateRange}`),
    client.fetch(`*[_type == "education"] | order(startDate desc) {"id": _id, institution, dateRange}`),
  ]);

  return Response.json({ skills, experience, activities, education });
}
