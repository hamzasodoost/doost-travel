'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users, Plane, ArrowRight } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920',
];

const stats = [
  { label: 'Happy Travelers', value: '50,000+' },
  { label: 'Destinations', value: '120+' },
  { label: 'Tour Packages', value: '500+' },
  { label: 'Years Experience', value: '15+' },
];

export default function HeroSection() {
  const [tripType, setTripType] = useState<'one_way' | 'return'>('return');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [depart, setDepart] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      origin: from, destination: to, departureDate: depart,
      adults: String(passengers), tripType, cabinClass: 'economy',
      ...(tripType === 'return' && returnDate ? { returnDate } : {}),
    });
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={heroImages[0]}
          alt="Travel destination"
          fill className="object-cover"
          priority quality={90}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Floating badges */}
      <div className="absolute top-32 right-8 lg:right-24 hidden lg:block animate-bounce">
        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
          <p className="text-xs opacity-70">Next flight to</p>
          <p className="font-bold">Santorini ✈️</p>
          <p className="text-gold-400 text-sm font-semibold">From $899</p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Headline */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Plane className="h-4 w-4 text-gold-400 rotate-45" />
            <span className="text-white text-sm font-medium">Your Journey Starts Here</span>
          </div>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Explore the World<br />
            <span className="text-gold-400">with Confidence</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Curated travel experiences, unbeatable prices, and 24/7 support. Let us take care of every detail.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 max-w-5xl mx-auto shadow-2xl">
          {/* Trip type tabs */}
          <div className="flex gap-2 mb-6">
            {(['return', 'one_way'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  tripType === type
                    ? 'bg-white text-navy-700 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {type === 'return' ? 'Round Trip' : 'One Way'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-teal-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">From</label>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value.toUpperCase())}
                    placeholder="City or airport"
                    maxLength={3}
                    className="block w-full text-navy-700 font-semibold text-base focus:outline-none placeholder-gray-400 bg-transparent"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
                <Plane className="h-5 w-5 text-teal-500 rotate-45 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">To</label>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value.toUpperCase())}
                    placeholder="City or airport"
                    maxLength={3}
                    className="block w-full text-navy-700 font-semibold text-base focus:outline-none placeholder-gray-400 bg-transparent"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-teal-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {tripType === 'return' ? 'Depart / Return' : 'Depart'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={depart}
                      onChange={(e) => setDepart(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="flex-1 text-navy-700 font-semibold text-sm focus:outline-none bg-transparent"
                    />
                    {tripType === 'return' && (
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={depart || new Date().toISOString().split('T')[0]}
                        className="flex-1 text-navy-700 font-semibold text-sm focus:outline-none bg-transparent"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
                <Users className="h-5 w-5 text-teal-500 shrink-0" />
                <div className="flex-1">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">Passengers</label>
                  <div className="flex items-center gap-2 mt-1">
                    <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-navy-700 font-bold text-sm">−</button>
                    <span className="text-navy-700 font-bold text-base w-4 text-center">{passengers}</span>
                    <button type="button" onClick={() => setPassengers(Math.min(9, passengers + 1))}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-navy-700 font-bold text-sm">+</button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-navy-700 hover:from-teal-400 hover:to-navy-600 text-white font-display font-semibold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="h-5 w-5" />
              Search Flights
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-3xl text-gold-400 mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
