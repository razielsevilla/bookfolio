import { BookfolioProvider } from '../context/BookfolioContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Book from '../components/Book';
import { client } from '../sanity/client';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Sanity
  const sanityProjects = await client.fetch(`*[_type == "project"]`);
  const sanityCertificates = await client.fetch(`*[_type == "certificate"]`);
  const sanityGuestbook = await client.fetch(`*[_type == "guestbook"] | order(_createdAt desc)`);
  const sanitySkills = await client.fetch(`*[_type == "skill"]`);
  const sanityExperiences = await client.fetch(`*[_type == "experience"] | order(startDate desc)`);
  const sanityAuthor = await client.fetch(`*[_type == "author"][0]`);

  const initialData = {
    projects: sanityProjects,
    certificates: sanityCertificates,
    guestbook: sanityGuestbook,
    skills: sanitySkills,
    experiences: sanityExperiences,
    author: sanityAuthor || undefined,
  };

  return (
    <BookfolioProvider totalSheets={7} initialData={initialData}>
      <Header />
      <Book />
      <Footer />
    </BookfolioProvider>
  );
}
