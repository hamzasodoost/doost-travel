'use client';

import { useState } from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';

interface Passenger {
  title: string;
  given_name: string;
  family_name: string;
  gender: string;
  born_on: string;
  email: string;
  phone_number: string;
}

interface PassengerFormProps {
  count: number;
  onSubmit: (passengers: Passenger[]) => void;
  isLoading?: boolean;
}

export default function PassengerForm({ count, onSubmit, isLoading }: PassengerFormProps) {
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array(count).fill(null).map(() => ({
      title: 'mr', given_name: '', family_name: '',
      gender: 'm', born_on: '', email: '', phone_number: '',
    }))
  );

  const update = (idx: number, field: keyof Passenger, value: string) => {
    setPassengers((prev) => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passengers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {passengers.map((pax, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-display font-bold text-navy-700 text-lg mb-5 flex items-center gap-2">
            <User className="h-5 w-5 text-teal-500" />
            Passenger {idx + 1}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Title</label>
              <select
                value={pax.title}
                onChange={(e) => update(idx, 'title', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-navy-700 focus:outline-none focus:border-teal-500"
              >
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
                <option value="mrs">Mrs.</option>
                <option value="dr">Dr.</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">First Name</label>
              <input
                required value={pax.given_name}
                onChange={(e) => update(idx, 'given_name', e.target.value)}
                placeholder="As on passport"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Last Name</label>
              <input
                required value={pax.family_name}
                onChange={(e) => update(idx, 'family_name', e.target.value)}
                placeholder="As on passport"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Gender</label>
              <select
                value={pax.gender}
                onChange={(e) => update(idx, 'gender', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-navy-700 focus:outline-none focus:border-teal-500"
              >
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Date of Birth</label>
              <input
                type="date" required value={pax.born_on}
                onChange={(e) => update(idx, 'born_on', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {idx === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email" required value={pax.email}
                    onChange={(e) => update(idx, 'email', e.target.value)}
                    placeholder="Booking confirmation sent here"
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel" required value={pax.phone_number}
                    onChange={(e) => update(idx, 'phone_number', e.target.value)}
                    placeholder="+1 555 000 0000"
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-navy-700 hover:bg-navy-600 disabled:opacity-60 text-white font-display font-semibold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing…
          </span>
        ) : (
          'Continue to Payment →'
        )}
      </button>
    </form>
  );
}
