import { BookfolioProvider } from '../context/BookfolioContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Book from '../components/Book';
import MobileBook from '../components/MobileBook';
import { client } from '../sanity/client';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Sanity (in parallel — independent queries, no need to wait on each other)
  const [
    sanityProjects,
    sanityCertificates,
    sanityGuestbook,
    sanitySkills,
    sanityExperiences,
    sanityAuthor,
    sanitySiteContent,
  ] = await Promise.all([
    client.fetch(`*[_type == "project"] | order(orderRank asc, _createdAt asc)`),
    client.fetch(`*[_type == "certificate"]`),
    client.fetch(`*[_type == "guestbook"] | order(_createdAt desc)`),
    client.fetch(`*[_type == "skill"]`),
    client.fetch(`*[_type == "experience"] | order(startDate desc)`),
    client.fetch(`*[_type == "author"][0]`),
    client.fetch(`*[_type == "siteContent"][0]`),
  ]);

  const initialData = {
    projects: sanityProjects,
    certificates: sanityCertificates,
    guestbook: sanityGuestbook,
    skills: sanitySkills,
    experiences: sanityExperiences,
    author: sanityAuthor || undefined,
    siteContent: sanitySiteContent || undefined,
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
