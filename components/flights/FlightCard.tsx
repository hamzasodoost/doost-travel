'use client';

import { useState } from 'react';
import { Plane, Clock, ArrowRight, Wifi, Utensils, Luggage, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, formatTime, formatDuration } from '@/lib/utils';

interface Slice {
  origin: { iata_code: string; name: string; city_name: string };
  destination: { iata_code: string; name: string; city_name: string };
  duration: number;
  departing_at: string;
  arriving_at: string;
  segments: Array<{
    operating_carrier: { name: string; iata_code: string };
    marketing_carrier_flight_number: string;
    aircraft: { name: string };
    stops: number;
  }>;
}

interface Offer {
  id: string;
  total_amount: string;
  total_currency: string;
  slices: Slice[];
  conditions?: {
    change_before_departure?: { allowed: boolean; penalty_currency: string; penalty_amount: string } | null;
    refund_before_departure?: { allowed: boolean; penalty_currency: string; penalty_amount: string } | null;
  };
}

interface FlightCardProps {
  offer: Offer;
  onSelect: (offer: Offer) => void;
}

export default function FlightCard({ offer, onSelect }: FlightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const slice = offer.slices[0];
  const returnSlice = offer.slices[1];
  const seg = slice?.segments?.[0];
  const stops = slice?.segments?.length - 1 ?? 0;

  const canChange = offer.conditions?.change_before_departure?.allowed;
  const canRefund = offer.conditions?.refund_before_departure?.allowed;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Airline */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
              <Plane className="h-5 w-5 text-navy-700" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-navy-700 text-sm truncate">
                {seg?.operating_carrier?.name ?? 'Airline'}
              </div>
              <div className="text-gray-400 text-xs">{seg?.marketing_carrier_flight_number}</div>
            </div>
          </div>

          {/* Outbound flight */}
          <div className="flex items-center gap-3 flex-1 min-w-0 justify-center">
            <div className="text-right">
              <div className="font-bold text-navy-700 text-xl">{formatTime(slice.departing_at)}</div>
              <div className="text-gray-500 text-xs font-medium">{slice.origin.iata_code}</div>
              <div className="text-gray-400 text-xs truncate max-w-[80px]">{slice.origin.city_name}</div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 max-w-[120px]">
              <div className="text-gray-400 text-xs">{formatDuration(slice.duration)}</div>
              <div className="relative w-full flex items-center">
                <div className="h-px bg-gray-200 flex-1" />
                <Plane className="h-3 w-3 text-teal-500 mx-1 rotate-45" />
                <div className="h-px bg-gray-200 flex-1" />
              </div>
              <div className={`text-xs font-medium ${stops === 0 ? 'text-teal-500' : 'text-amber-500'}`}>
                {stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`}
              </div>
            </div>
            <div>
              <div className="font-bold text-navy-700 text-xl">{formatTime(slice.arriving_at)}</div>
              <div className="text-gray-500 text-xs font-medium">{slice.destination.iata_code}</div>
              <div className="text-gray-400 text-xs truncate max-w-[80px]">{slice.destination.city_name}</div>
            </div>
          </div>

          {/* Return flight (if round trip) */}
          {returnSlice && (
            <>
              <div className="hidden lg:block w-px h-10 bg-gray-100" />
              <div className="hidden lg:flex items-center gap-3 flex-1 min-w-0 justify-center">
                <div className="text-right">
                  <div className="font-bold text-navy-700 text-lg">{formatTime(returnSlice.departing_at)}</div>
                  <div className="text-gray-400 text-xs">{returnSlice.origin.iata_code}</div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 max-w-[100px]">
                  <div className="text-gray-400 text-xs">{formatDuration(returnSlice.duration)}</div>
                  <div className="h-px bg-gray-200 w-full relative">
                    <Plane className="h-3 w-3 text-teal-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-navy-700 text-lg">{formatTime(returnSlice.arriving_at)}</div>
                  <div className="text-gray-400 text-xs">{returnSlice.destination.iata_code}</div>
                </div>
              </div>
            </>
          )}

          {/* Price & Select */}
          <div className="text-right shrink-0">
            <div className="text-gray-400 text-xs mb-0.5">Total price</div>
            <div className="font-display font-bold text-navy-700 text-2xl">
              {formatCurrency(offer.total_amount, offer.total_currency)}
            </div>
            <div className="text-gray-400 text-xs mb-3">per person</div>
            <button
              onClick={() => onSelect(offer)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              Select <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Amenities & conditions */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Luggage className="h-3.5 w-3.5" /> Carry-on
            </div>
            <div className={`flex items-center gap-1.5 text-xs ${canChange ? 'text-teal-600' : 'text-gray-400'}`}>
              <Clock className="h-3.5 w-3.5" /> {canChange ? 'Changeable' : 'No changes'}
            </div>
            <div className={`flex items-center gap-1.5 text-xs ${canRefund ? 'text-teal-600' : 'text-gray-400'}`}>
              <ArrowRight className="h-3.5 w-3.5" /> {canRefund ? 'Refundable' : 'Non-refundable'}
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-400 hover:text-navy-700 flex items-center gap-1 transition-colors"
          >
            Details {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          {offer.slices.map((sl, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <div className="text-xs font-semibold text-navy-700 uppercase tracking-wide mb-2">
                {idx === 0 ? 'Outbound' : 'Return'} · {sl.origin.iata_code} → {sl.destination.iata_code}
              </div>
              {sl.segments.map((seg, segIdx) => (
                <div key={segIdx} className="flex items-center gap-3 text-xs text-gray-600 mb-1">
                  <span className="font-medium">{seg.operating_carrier.iata_code}{seg.marketing_carrier_flight_number}</span>
                  <span>·</span>
                  <span>{seg.aircraft?.name ?? 'Aircraft TBD'}</span>
                  <span>·</span>
                  <span className={seg.stops > 0 ? 'text-amber-500' : 'text-teal-500'}>
                    {seg.stops === 0 ? 'Direct' : `${seg.stops} stop`}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
