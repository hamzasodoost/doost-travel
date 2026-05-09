import Image from 'next/image';
import { Shield, Users, Globe, Award } from 'lucide-react';
export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600" alt="About" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-700/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-display font-bold text-white text-5xl">About Doost Travel</h1>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-teal-500 font-semibold text-sm uppercase tracking-widest mb-3">Who We Are</p>
          <h2 className="font-display font-bold text-navy-700 text-4xl mb-6">Crafting Journeys Since 2009</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">Doost Travel was founded with a simple belief: that travel should be effortless, inspiring, and deeply personal. Over 15 years, we've helped more than 50,000 travelers discover the world's most extraordinary destinations.</p>
          <p className="text-gray-600 leading-relaxed">From bespoke honeymoon packages in the Maldives to adventure tours in Peru, our team of passionate travel experts is dedicated to crafting experiences that go beyond the ordinary — creating memories that last a lifetime.</p>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: '50,000+', label: 'Happy Travelers' },
              { icon: Globe, value: '120+', label: 'Destinations' },
              { icon: Award, value: '15+', label: 'Years Experience' },
              { icon: Shield, value: '99.8%', label: 'Satisfaction Rate' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4"><Icon className="h-6 w-6 text-teal-500" /></div>
                <div className="font-display font-bold text-navy-700 text-3xl mb-1">{value}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
