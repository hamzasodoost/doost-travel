'use client';

import { useState, useMemo } from 'react';
import { BedDouble, Search, SlidersHorizontal, Users, Calendar, MapPin, Star, Loader2, X } from 'lucide-react';
import HotelCard, { Hotel } from '@/components/hotels/HotelCard';
import { MOCK_HOTELS } from '@/lib/utils';

const CITIES = ['All Cities', 'Dubai', 'Tokyo', 'Santorini', 'Bali', 'Maldives', 'Rome', 'Bangkok', 'Utah'];
const STAR_OPTIONS = [5, 4, 3];
const AMENITY_FILTERS = ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Spa'];

export default function HotelsPage() {
  const today = new Date().toISOString().split('T')[0];
  const defaultCheckOut = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];

  // Search state
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter state
  const [filterCity, setFilterCity] = useState('All Cities');
  const [filterStars, setFilterStars] = useState<number[]>([]);
  const [filterAmenities, setFilterAmenities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Selected hotel modal
  const [selected, setSelected] = useState<Hotel | null>(null);

  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));

  const handleSearch = () => {
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setFilterCity(city || 'All Cities');
      setLoading(false);
      setSearched(true);
    }, 800);
  };

  const results = useMemo(() => {
    let hotels = [...MOCK_HOTELS] as Hotel[];

    if (filterCity !== 'All Cities') {
      hotels = hotels.filter(h => h.city.toLowerCase() === filterCity.toLowerCase());
    }
    if (filterStars.length > 0) {
      hotels = hotels.filter(h => filterStars.includes(h.stars));
    }
    if (filterAmenities.length > 0) {
      hotels = hotels.filter(h => filterAmenities.every(a => h.amenities.includes(a)));
    }
    hotels = hotels.filter(h => h.pricePerNight <= maxPrice);

    hotels.sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price_desc') return b.pricePerNight - a.pricePerNight;
      return b.rating - a.rating;
    });

    return hotels;
  }, [filterCity, filterStars, filterAmenities, maxPrice, sortBy]);

  const toggleStar = (s: number) =>
    setFilterStars(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleAmenity = (a: string) =>
    setFilterAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Search */}
      <div className="bg-navy-700 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BedDouble className="h-6 w-6 text-gold-400" />
            <h1 className="font-display font-bold text-white text-2xl">Find Your Perfect Stay</h1>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex flex-wrap gap-3 items-end">
            {/* Destination */}
            <div className="flex-1 min-w-[160px]">
              <label className="text-white/60 text-xs block mb-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City or hotel name"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label className="text-white/60 text-xs block mb-1">Check-in</label>
              <input type="date" value={checkIn} min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
            </div>

            {/* Check-out */}
            <div>
              <label className="text-white/60 text-xs block mb-1">Check-out</label>
              <input type="date" value={checkOut} min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
            </div>

            {/* Guests */}
            <div>
              <label className="text-white/60 text-xs block mb-1">Guests</label>
              <div className="flex items-center gap-2">
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="text-gray-900">{n} Guest{n > 1 ? 's' : ''}</option>)}
                </select>
                <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))}
                  className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400">
                  {[1,2,3,4].map(n => <option key={n} value={n} className="text-gray-900">{n} Room{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
            </div>

            {/* Search button */}
            <button onClick={handleSearch} disabled={loading}
              className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search Hotels
            </button>
          </div>

          {/* Nights summary */}
          {checkIn && checkOut && (
            <p className="text-white/50 text-xs mt-3">
              <Calendar className="inline h-3 w-3 mr-1" />
              {nights} night{nights !== 1 ? 's' : ''} · {guests} guest{guests !== 1 ? 's' : ''} · {rooms} room{rooms !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Results toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            {loading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin text-teal-500" /> Searching hotels…
              </div>
            ) : searched || results.length > 0 ? (
              <p className="text-navy-700 font-medium">
                <span className="text-teal-500 font-bold">{results.length}</span> hotels available
                {filterCity !== 'All Cities' ? ` in ${filterCity}` : ''}
              </p>
            ) : (
              <p className="text-gray-500">Enter a destination above to search hotels.</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500">
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                showFilters ? 'bg-navy-700 text-white border-navy-700' : 'border-gray-200 text-gray-600 hover:border-teal-500 hover:text-teal-600'
              }`}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
              {(filterStars.length + filterAmenities.length) > 0 && (
                <span className="bg-teal-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {filterStars.length + filterAmenities.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter panel */}
          {showFilters && (
            <div className="w-64 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-navy-700">Filters</h3>
                  <button onClick={() => { setFilterStars([]); setFilterAmenities([]); setMaxPrice(2500); setFilterCity('All Cities'); }}
                    className="text-xs text-teal-500 hover:text-teal-600">Clear all</button>
                </div>

                {/* City */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">City</p>
                  <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500">
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Stars */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Star Rating</p>
                  <div className="space-y-2">
                    {STAR_OPTIONS.map(s => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={filterStars.includes(s)} onChange={() => toggleStar(s)}
                          className="rounded text-teal-500 focus:ring-teal-500" />
                        <span className="flex gap-0.5">
                          {Array.from({ length: s }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                          ))}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Amenities</p>
                  <div className="space-y-2">
                    {AMENITY_FILTERS.map(a => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={filterAmenities.includes(a)} onChange={() => toggleAmenity(a)}
                          className="rounded text-teal-500 focus:ring-teal-500" />
                        <span className="text-sm text-gray-600">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Max price */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Max price / night: <span className="text-navy-700">${maxPrice}</span>
                  </p>
                  <input type="range" min={100} max={2500} step={50} value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-teal-500" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$100</span><span>$2,500+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hotel list */}
          <div className="flex-1 space-y-4">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="h-12 w-12 animate-spin text-teal-500 mb-4" />
                <p className="font-medium">Finding the best hotels…</p>
              </div>
            )}

            {!loading && results.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} nights={nights} onSelect={setSelected} />
            ))}

            {!loading && results.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <BedDouble className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium text-lg mb-2">No hotels match your filters</p>
                <p className="text-sm">Try adjusting your filters or search a different city</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reserve Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-navy-700 text-2xl">{selected.name}</h2>
                <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {selected.location}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-teal-50 rounded-2xl p-5 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Check-in</span>
                <span className="font-semibold text-navy-700">{new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Check-out</span>
                <span className="font-semibold text-navy-700">{new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold text-navy-700">{nights} night{nights !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Guests / Rooms</span>
                <span className="font-semibold text-navy-700">{guests} guest{guests > 1 ? 's' : ''} / {rooms} room{rooms > 1 ? 's' : ''}</span>
              </div>
              <div className="pt-3 border-t border-teal-100 flex justify-between">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="font-display font-bold text-navy-700 text-xl">
                  ${(selected.pricePerNight * nights * rooms).toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6 text-center">
              Hotel booking via live API coming soon. For now, contact us to reserve.
            </p>

            <div className="flex gap-3">
              <button onClick={() => setSelected(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-2xl text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <a href="/contact"
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-2xl text-sm transition-colors text-center">
                Contact to Book
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
