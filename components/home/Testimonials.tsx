import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/utils';

export default function Testimonials() {
  return (
    <section className="py-24 bg-navy-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">Traveler Stories</p>
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl">
            What Our Guests<br /><span className="text-gold-400">Are Saying</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-7 flex flex-col">
              <Quote className="h-8 w-8 text-gold-400 mb-4" />
              <p className="text-white/80 text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-gold-400/30">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.location} · {t.destination}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
