import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { DESTINATIONS, formatCurrency } from '@/lib/utils';

export default function FeaturedDestinations() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-teal-500 font-semibold text-sm uppercase tracking-widest mb-3">Explore the World</p>
            <h2 className="font-display font-bold text-navy-700 text-4xl lg:text-5xl">
              Popular<br /><span className="text-teal-500">Destinations</span>
            </h2>
          </div>
          <Link
            href="/destinations"
            className="hidden md:flex items-center gap-2 text-navy-700 hover:text-teal-500 font-semibold transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <Link
              key={dest.id}
              href={`/destinations`}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${
                i === 0 ? 'md:row-span-2 md:col-span-1' : ''
              }`}
              style={{ minHeight: i === 0 ? '480px' : '220px' }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-gold-500/90 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                  {dest.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" />
                  <span className="text-gold-400 text-xs font-semibold">{dest.rating}</span>
                  <span className="text-white/60 text-xs">({dest.reviews.toLocaleString()})</span>
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-0.5">{dest.name}</h3>
                <p className="text-white/70 text-sm mb-3">{dest.country}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white/60 text-xs">From</span>
                    <span className="text-white font-bold text-lg ml-1">{formatCurrency(dest.price)}</span>
                  </div>
                  <span className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-full transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-navy-700 hover:text-teal-500 font-semibold transition-colors"
          >
            View All Destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
