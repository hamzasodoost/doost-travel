import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { DESTINATIONS, formatCurrency } from '@/lib/utils';
export const metadata = { title: 'Destinations' };

const ALL = [...DESTINATIONS, ...DESTINATIONS.map(d => ({ ...d, id: d.id + '6' }))];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-navy-700 py-16 px-4 text-center">
        <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">Around the World</p>
        <h1 className="font-display font-bold text-white text-5xl mb-4">Destinations</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">120+ breathtaking destinations handpicked by our travel experts. Where will you go next?</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL.map((dest) => (
            <Link key={dest.id} href="/flights" className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 block">
              <div className="relative h-60 overflow-hidden">
                <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                <span className="absolute top-4 left-4 bg-gold-500/90 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">{dest.tag}</span>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1 mb-1"><Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" /><span className="text-gold-400 text-xs font-semibold">{dest.rating}</span><span className="text-white/60 text-xs">({dest.reviews.toLocaleString()})</span></div>
                  <h3 className="font-display font-bold text-white text-xl">{dest.name}, {dest.country}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{dest.description}</p>
                <div className="flex items-center justify-between">
                  <div><span className="text-gray-400 text-xs">Flights from</span><span className="text-navy-700 font-bold text-lg ml-1">{formatCurrency(dest.price)}</span></div>
                  <span className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Search Flights</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
