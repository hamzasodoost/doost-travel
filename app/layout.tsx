import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { default: 'Doost Travel — Explore the World with Confidence', template: '%s | Doost Travel' },
  description: 'Curated travel experiences, unbeatable prices, and 24/7 support. Book flights, tours, and packages to 120+ destinations worldwide.',
  keywords: ['travel', 'flights', 'tours', 'packages', 'vacation', 'holiday', 'doost travel'],
  openGraph: {
    type: 'website',
    siteName: 'Doost Travel',
    images: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900 bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
