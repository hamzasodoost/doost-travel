import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />

      {/* CTA Banner */}
      <section className="py-24 bg-gradient-to-br from-teal-500 to-navy-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join over 50,000 travelers who trust Doost Travel for their dream journeys.
            Let us create your perfect itinerary today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/flights"
              className="bg-white text-navy-700 hover:bg-gray-50 font-display font-semibold text-lg px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              Search Flights <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/packages"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-display font-semibold text-lg px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              Browse Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
