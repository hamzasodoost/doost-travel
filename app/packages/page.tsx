import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Check, Filter } from 'lucide-react';
import { PACKAGES, formatCurrency } from '@/lib/utils';
export const metadata = { title: 'Tour Packages' };

const ALL = [...PACKAGES, ...PACKAGES.map(p => ({ ...p, id: p.id + '5' }))];
const tags = ['All', 'Best Seller', 'Popular', 'Premium', 'Luxury'];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-navy-700 py-16 px-4 text-center">
        <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">Curated For You</p>
        <h1 className="font-display font-bold text-white text-5xl mb-4">Tour Packages</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">All-inclusive packages with flights, hotels, and experiences handpicked by our travel experts.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 mb-10">
          {tags.map(tag => (
            <button key={tag} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tag === 'All' ? 'bg-navy-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-navy-700 hover:text-navy-700'}`}>{tag}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
                <span className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">{pkg.tag}</span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-white/80" /><span className="text-white text-xs">{pkg.duration}</span></div>
                  <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" /><span className="text-white text-xs font-semibold">{pkg.rating} ({pkg.reviews})</span></div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-navy-700 text-lg mb-1 group-hover:text-teal-600 transition-colors">{pkg.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{pkg.destination}</p>
                <div className="grid grid-cols-2 gap-1 mb-4">
                  {pkg.included.map(item => (
                    <div key={item} className="flex items-center gap-1.5 text-xs text-gray-600"><Check className="h-3 w-3 text-teal-500 shrink-0" />{item}</div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-xs line-through">{formatCurrency(pkg.originalPrice)}</div>
                    <div className="text-navy-700 font-bold text-xl">{formatCurrency(pkg.price)}</div>
                    <div className="text-gray-400 text-xs">per person</div>
                  </div>
                  <Link href="/auth/signup" className="bg-navy-700 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
