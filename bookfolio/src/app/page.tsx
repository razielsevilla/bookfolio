import { BookfolioProvider } from '../context/BookfolioContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Book from '../components/Book';
import MobileBook from '../components/MobileBook';
import { client } from '../sanity/client';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Sanity
  const sanityProjects = await client.fetch(`*[_type == "project"] | order(orderRank asc, _createdAt asc)`);
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
      <div className="hidden lg:flex flex-grow items-center justify-center relative p-4 overflow-hidden z-10">
        <Book />
      </div>
      <div className="lg:hidden flex-grow overflow-hidden px-2 py-4 relative z-10">
        <MobileBook />
      </div>
      <Footer />
    </BookfolioProvider>
  );
}
