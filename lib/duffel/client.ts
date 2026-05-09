import { Duffel } from '@duffel/api';

// Server-side only — never expose this key to the client
export const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY!,
});

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  tripType: 'one_way' | 'return';
}

export async function searchFlights(params: FlightSearchParams) {
  const slices = [
    {
      origin: params.origin,
      destination: params.destination,
      departure_date: params.departureDate,
    },
  ];

  if (params.tripType === 'return' && params.returnDate) {
    slices.push({
      origin: params.destination,
      destination: params.origin,
      departure_date: params.returnDate,
    });
  }

  const offerRequest = await duffel.offerRequests.create({
    slices,
    passengers: Array(params.adults).fill({ type: 'adult' as const }),
    cabin_class: params.cabinClass,
    return_offers: true,
  });

  return offerRequest;
}

export async function getOffer(offerId: string) {
  return duffel.offers.get(offerId);
}

export async function createOrder(params: {
  offerId: string;
  passengers: Array<{
    id: string;
    title: string;
    given_name: string;
    family_name: string;
    gender: 'male' | 'female';
    born_on: string;
    email: string;
    phone_number: string;
  }>;
  paymentType: 'arc_bsp_cash' | 'balance';
  amount: string;
  currency: string;
}) {
  return duffel.orders.create({
    selected_offers: [params.offerId],
    passengers: params.passengers as Parameters<typeof duffel.orders.create>[0]['passengers'],
    payments: [
      {
        type: params.paymentType,
        amount: params.amount,
        currency: params.currency,
      },
    ],
  });
}
