'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plane, SlidersHorizontal, ArrowUpDown, Loader2, Plus, Trash2, ArrowRight } from 'lucide-react';
import FlightCard from '@/components/flights/FlightCard';
import PassengerForm from '@/components/flights/PassengerForm';
import { formatCurrency } from '@/lib/utils';

type TripType = 'one_way' | 'return' | 'multi_city';

interface Leg {
  from: string;
  to: string;
  date: string;
}

function FlightsContent() {
  const searchParams = useSearchParams();

  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState<'results' | 'passengers'>('results');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');

  // Trip type
  const [tripType, setTripType] = useState<TripType>(
    (searchParams.get('tripType') as TripType) || 'return'
  );

  // One-way / Return state
  const [from, setFrom] = useState(searchParams.get('origin') || '');
  const [to, setTo] = useState(searchParams.get('destination') || '');
  const [depart, setDepart] = useState(searchParams.get('departureDate') || '');
  const [returnDate, setReturnDate] = useState(searchParams.get('returnDate') || '');
  const [passengers, setPassengers] = useState(Number(searchParams.get('adults')) || 1);
  const [cabin, setCabin] = useState(searchParams.get('cabinClass') || 'economy');

  // Multi-city legs
  const [legs, setLegs] = useState<Leg[]>([
    { from: '', to: '', date: '' },
    { from: '', to: '', date: '' },
  ]);

  const today = new Date().toISOString().split('T')[0];

  const addLeg = () => {
    if (legs.length < 5) setLegs([...legs, { from: '', to: '', date: '' }]);
  };

  const removeLeg = (idx: number) => {
    setLegs(legs.filter((_, i) => i !== idx));
  };

  const updateLeg = (idx: number, field: keyof Leg, value: string) => {
    const updated = [...legs];
    updated[idx] = { ...updated[idx], [field]: field === 'from' || field === 'to' ? value.toUpperCase() : value };
    setLegs(updated);
  };

  const searchFlights = async () => {
    setLoading(true);
    setError('');
    setOffers([]);
    setSelectedOffer(null);
    setBookingStep('results');

    try {
      let body: any;

      if (tripType === 'multi_city') {
        const validLegs = legs.filter(l => l.from && l.to && l.date);
        if (validLegs.length < 2) throw new Error('Please fill in at least 2 legs');
        body = { tripType: 'multi_city', legs: validLegs, adults: passengers, cabinClass: cabin };
      } else {
        if (!from || !to || !depart) throw new Error('Please fill in all fields');
        body = {
          origin: from, destination: to, departureDate: depart,
          returnDate: tripType === 'return' ? returnDate : undefined,
          adults: passengers, cabinClass: cabin, tripType,
        };
      }

      const res = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      setOffers(data.offers || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (from && to && depart && tripType !== 'multi_city') searchFlights();
  }, []);

  const sortedOffers = [...offers].sort((a, b) =>
    sortBy === 'price'
      ? parseFloat(a.total_amount) - parseFloat(b.total_amount)
      : (a.slices[0]?.duration ?? 0) - (b.slices[0]?.duration ?? 0)
  );

  const handleSelectOffer = (offer: any) => {
    setSelectedOffer(offer);
    setBookingStep('passengers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePassengersSubmit = async (paxData: any[]) => {
    if (!selectedOffer) return;
    try {
      const origin = tripType === 'multi_city' ? legs[0]?.from : from;
      const destination = tripType === 'multi_city' ? legs[legs.length - 1]?.to : to;
      const res = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: selectedOffer.id,
          passengers: paxData,
          amount: Math.round(parseFloat(selectedOffer.total_amount) * 100),
          currency: selectedOffer.total_currency,
          description: `Flight: ${origin} → ${destination}`,
          customerEmail: paxData[0]?.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (e: any) {
      alert(e.message);
    }
  };

  const tripTabs: { key: TripType; label: string }[] = [
    { key: 'return', label: 'Round Trip' },
    { key: 'one_way', label: 'One Way' },
    { key: 'multi_city', label: 'Multi-city' },
  ];

  const commonSelects = (
    <div className="flex flex-wrap gap-3 items-end">
      <div>
        <label className="text-white/60 text-xs block mb-1">Passengers</label>
        <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}
          className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400">
          {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="text-gray-900">{n} Adult{n > 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <div>
        <label className="text-white/60 text-xs block mb-1">Class</label>
        <select value={cabin} onChange={(e) => setCabin(e.target.value)}
          className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400">
          <option value="economy" className="text-gray-900">Economy</option>
          <option value="premium_economy" className="text-gray-900">Premium Economy</option>
          <option value="business" className="text-gray-900">Business</option>
          <option value="first" className="text-gray-900">First</option>
        </select>
      </div>
      <button onClick={searchFlights} disabled={loading}
        className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plane className="h-4 w-4 rotate-45" />}
        Search
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Bar */}
      <div className="bg-navy-700 py-6 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Trip type tabs */}
          <div className="flex gap-1">
            {tripTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setTripType(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  tripType === tab.key
                    ? 'bg-teal-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* One-way / Return form */}
          {tripType !== 'multi_city' && (
            <div className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="text-white/60 text-xs block mb-1">From</label>
                <input value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())} maxLength={3}
                  className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 w-24 uppercase"
                  placeholder="JFK" />
              </div>
              <div>
                <label className="text-white/60 text-xs block mb-1">To</label>
                <input value={to} onChange={(e) => setTo(e.target.value.toUpperCase())} maxLength={3}
                  className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 w-24 uppercase"
                  placeholder="DXB" />
              </div>
              <div>
                <label className="text-white/60 text-xs block mb-1">Depart</label>
                <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} min={today}
                  className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
              </div>
              {tripType === 'return' && (
                <div>
                  <label className="text-white/60 text-xs block mb-1">Return</label>
                  <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} min={depart || today}
                    className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
                </div>
              )}
              {commonSelects}
            </div>
          )}

          {/* Multi-city form */}
          {tripType === 'multi_city' && (
            <div className="space-y-3">
              {legs.map((leg, idx) => (
                <div key={idx} className="flex flex-wrap gap-3 items-end">
                  <div className="flex items-center gap-1">
                    <span className="text-white/40 text-xs w-5">{idx + 1}.</span>
                    <div>
                      <label className="text-white/60 text-xs block mb-1">From</label>
                      <input value={leg.from} onChange={(e) => updateLeg(idx, 'from', e.target.value)} maxLength={3}
                        className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 w-24 uppercase"
                        placeholder="JFK" />
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/30 mb-2.5" />
                  <div>
                    <label className="text-white/60 text-xs block mb-1">To</label>
                    <input value={leg.to} onChange={(e) => updateLeg(idx, 'to', e.target.value)} maxLength={3}
                      className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 w-24 uppercase"
                      placeholder="LHR" />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs block mb-1">Date</label>
                    <input type="date" value={leg.date} onChange={(e) => updateLeg(idx, 'date', e.target.value)} min={today}
                      className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
                  </div>
                  {idx >= 2 && (
                    <button onClick={() => removeLeg(idx)}
                      className="mb-0.5 p-2.5 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-xl transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-4 pt-1">
                {legs.length < 5 && (
                  <button onClick={addLeg}
                    className="flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                    <Plus className="h-4 w-4" /> Add another flight
                  </button>
                )}
                {commonSelects}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {bookingStep === 'passengers' && selectedOffer ? (
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setBookingStep('results')} className="text-gray-500 hover:text-navy-700 text-sm mb-6">
              ← Back to results
            </button>
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy-700">
                    {tripType === 'multi_city'
                      ? legs.filter(l => l.from && l.to).map(l => l.from).join(' → ') + ' → ' + legs.filter(l => l.to).slice(-1)[0]?.to
                      : `${from} → ${to}`}
                  </p>
                  <p className="text-gray-500 text-sm">{passengers} passenger{passengers > 1 ? 's' : ''} · {cabin}</p>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-navy-700 text-2xl">
                    {formatCurrency(selectedOffer.total_amount, selectedOffer.total_currency)}
                  </div>
                  <div className="text-gray-400 text-xs">total</div>
                </div>
              </div>
            </div>
            <h2 className="font-display font-bold text-navy-700 text-2xl mb-6">Passenger Details</h2>
            <PassengerForm count={passengers} onSubmit={handlePassengersSubmit} />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                {loading ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
                    Searching 200+ airlines…
                  </div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : offers.length > 0 ? (
                  <p className="text-navy-700 font-medium">
                    <span className="text-teal-500 font-bold">{offers.length}</span> flights found
                  </p>
                ) : (
                  <p className="text-gray-500">Enter your route above and hit Search.</p>
                )}
              </div>
              {offers.length > 0 && (
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500">
                    <option value="price">Sort by Price</option>
                    <option value="duration">Sort by Duration</option>
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {loading && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Loader2 className="h-12 w-12 animate-spin text-teal-500 mb-4" />
                  <p className="font-medium">Searching 200+ airlines…</p>
                </div>
              )}
              {!loading && sortedOffers.map((offer) => (
                <FlightCard key={offer.id} offer={offer} onSelect={handleSelectOffer} />
              ))}
              {!loading && !error && offers.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <Plane className="h-12 w-12 mx-auto mb-4 opacity-30 rotate-45" />
                  <p className="font-medium text-lg mb-2">No results yet</p>
                  <p className="text-sm">Fill in your route above and press Search</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense>
      <FlightsContent />
    </Suspense>
  );
}
