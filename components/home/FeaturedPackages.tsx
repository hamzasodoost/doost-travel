import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Check, ArrowRight } from 'lucide-react';
import { PACKAGES, formatCurrency } from '@/lib/utils';

export default function FeaturedPackages() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-teal-500 font-semibold text-sm uppercase tracking-widest mb-3">Curated Experiences</p>
            <h2 className="font-display font-bold text-navy-700 text-4xl lg:text-5xl">
              Best Travel<br /><span className="text-teal-500">Packages</span>
            </h2>
          </div>
          <Link href="/packages" className="hidden md:flex items-center gap-2 text-navy-700 hover:text-teal-500 font-semibold transition-colors">
            All Packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
                <span className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                  {pkg.tag}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-white/80" />
                    <span className="text-white text-xs">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" />
                    <span className="text-white text-xs font-semibold">{pkg.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-navy-700 text-lg mb-1 group-hover:text-teal-600 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{pkg.destination}</p>

                <div className="grid grid-cols-2 gap-1 mb-4">
                  {pkg.included.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Check className="h-3 w-3 text-teal-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-xs line-through">{formatCurrency(pkg.originalPrice)}</div>
                    <div className="text-navy-700 font-bold text-xl">{formatCurrency(pkg.price)}</div>
                    <div className="text-gray-400 text-xs">per person</div>
                  </div>
                  <Link
                    href={`/packages`}
                    className="bg-navy-700 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
