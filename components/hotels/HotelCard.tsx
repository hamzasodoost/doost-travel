'use client';

import { useState } from 'react';
import { Star, Wifi, Waves, Coffee, Dumbbell, Car, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  currency: string;
  image: string;
  images?: string[];
  amenities: string[];
  description: string;
  tag?: string;
  distanceToCenter?: string;
}

interface HotelCardProps {
  hotel: Hotel;
  nights: number;
  onSelect: (hotel: Hotel) => void;
}

const amenityIcon = (a: string) => {
  const map: Record<string, React.ReactNode> = {
    'WiFi':       <Wifi className="h-3.5 w-3.5" />,
    'Pool':       <Waves className="h-3.5 w-3.5" />,
    'Breakfast':  <Coffee className="h-3.5 w-3.5" />,
    'Gym':        <Dumbbell className="h-3.5 w-3.5" />,
    'Parking':    <Car className="h-3.5 w-3.5" />,
  };
  return map[a] ?? null;
};

export default function HotelCard({ hotel, nights, onSelect }: HotelCardProps) {
  const [expanded, setExpanded] = useState(false);
  const total = hotel.pricePerNight * nights;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-60 h-48 sm:h-auto shrink-0 overflow-hidden">
          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
          {hotel.tag && (
            <span className="absolute top-3 left-3 bg-gold-500 text-navy-900 text-xs font-bold px-2.5 py-1 rounded-full">
              {hotel.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <h3 className="font-display font-bold text-navy-700 text-lg leading-tight">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                  <MapPin className="h-3 w-3" />
                  {hotel.location}
                  {hotel.distanceToCenter && <span className="ml-1">· {hotel.distanceToCenter} from centre</span>}
                </div>
              </div>

              {/* Rating */}
              <div className="text-right shrink-0">
                <div className="bg-teal-500 text-white text-sm font-bold px-2.5 py-1 rounded-xl inline-block">
                  {hotel.rating.toFixed(1)}
                </div>
                <div className="text-gray-400 text-xs mt-1">{hotel.reviews.toLocaleString()} reviews</div>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mt-3">
              {hotel.amenities.slice(0, 5).map(a => (
                <span key={a} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                  {amenityIcon(a)} {a}
                </span>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
            <div>
              <button onClick={() => setExpanded(!expanded)}
                className="text-xs text-gray-400 hover:text-navy-700 flex items-center gap-1 transition-colors">
                {expanded ? 'Hide details' : 'Show details'}
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs mb-0.5">
                {formatCurrency(hotel.pricePerNight, hotel.currency)} / night
              </div>
              <div className="font-display font-bold text-navy-700 text-2xl">
                {formatCurrency(total, hotel.currency)}
              </div>
              <div className="text-gray-400 text-xs mb-3">total for {nights} night{nights !== 1 ? 's' : ''}</div>
              <button onClick={() => onSelect(hotel)}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded description */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
          <p className="text-sm text-gray-600 leading-relaxed">{hotel.description}</p>
          {hotel.amenities.length > 5 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {hotel.amenities.slice(5).map(a => (
                <span key={a} className="text-xs text-gray-500 bg-white border border-gray-100 px-2.5 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
