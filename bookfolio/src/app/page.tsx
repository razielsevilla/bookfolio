"use client";
import { BookfolioProvider } from '../context/BookfolioContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Book from '../components/Book';

export default function Home() {
  return (
    <BookfolioProvider totalSheets={7}>
      <Header />
      <Book />
      <Footer />
    </BookfolioProvider>
  );
}
