'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plane, SlidersHorizontal, ArrowUpDown, Loader2 } from 'lucide-react';
import FlightCard from '@/components/flights/FlightCard';
import PassengerForm from '@/components/flights/PassengerForm';
import { formatCurrency } from '@/lib/utils';

function FlightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState<'results' | 'passengers' | 'payment'>('results');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [offerRequestId, setOfferRequestId] = useState('');

  // Form state (editable)
  const [from, setFrom] = useState(searchParams.get('origin') || '');
  const [to, setTo] = useState(searchParams.get('destination') || '');
  const [depart, setDepart] = useState(searchParams.get('departureDate') || '');
  const [returnDate, setReturnDate] = useState(searchParams.get('returnDate') || '');
  const [passengers, setPassengers] = useState(Number(searchParams.get('adults')) || 1);
  const [tripType, setTripType] = useState<'one_way' | 'return'>(
    (searchParams.get('tripType') as any) || 'return'
  );
  const [cabin, setCabin] = useState(searchParams.get('cabinClass') || 'economy');

  const searchFlights = async () => {
    if (!from || !to || !depart) return;
    setLoading(true);
    setError('');
    setOffers([]);
    setSelectedOffer(null);
    setBookingStep('results');

    try {
      const res = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: from, destination: to, departureDate: depart,
          returnDate: tripType === 'return' ? returnDate : undefined,
          adults: passengers, cabinClass: cabin, tripType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      setOffers(data.offers || []);
      setOfferRequestId(data.offerRequestId || '');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (from && to && depart) searchFlights();
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
      const res = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: selectedOffer.id,
          passengers: paxData,
          amount: Math.round(parseFloat(selectedOffer.total_amount) * 100),
          currency: selectedOffer.total_currency,
          description: `Flight: ${from} → ${to}`,
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Bar */}
      <div className="bg-navy-700 py-6 px-4">
        <div className="max-w-6xl mx-auto">
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
              <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
            </div>
            {tripType === 'return' && (
              <div>
                <label className="text-white/60 text-xs block mb-1">Return</label>
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                  min={depart}
                  className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
              </div>
            )}
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
            <button onClick={searchFlights} disabled={loading || !from || !to || !depart}
              className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plane className="h-4 w-4 rotate-45" />}
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {bookingStep === 'passengers' && selectedOffer ? (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setBookingStep('results')} className="text-gray-500 hover:text-navy-700 text-sm">← Back to results</button>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy-700">{from} → {to}</p>
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
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                {loading ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
                    Searching for the best flights…
                  </div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : offers.length > 0 ? (
                  <p className="text-navy-700 font-medium">
                    <span className="text-teal-500 font-bold">{offers.length}</span> flights found
                    {from && to ? ` — ${from} to ${to}` : ''}
                  </p>
                ) : !from || !to ? (
                  <p className="text-gray-500">Enter origin and destination to search flights.</p>
                ) : null}
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

            {/* Flight list */}
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
              {!loading && !error && offers.length === 0 && from && to && (
                <div className="text-center py-20 text-gray-400">
                  <Plane className="h-12 w-12 mx-auto mb-4 opacity-30 rotate-45" />
                  <p className="font-medium text-lg mb-2">No flights found</p>
                  <p className="text-sm">Try different dates or airports</p>
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
