import { NextRequest, NextResponse } from 'next/server';
import { searchFlights } from '@/lib/duffel/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { origin, destination, departureDate, returnDate, adults, cabinClass, tripType } = body;

    if (!origin || !destination || !departureDate) {
      return NextResponse.json({ error: 'Missing required fields: origin, destination, departureDate' }, { status: 400 });
    }

    const result = await searchFlights({
      origin, destination, departureDate,
      returnDate, adults: Number(adults) || 1,
      cabinClass: cabinClass || 'economy',
      tripType: tripType || 'one_way',
    });

    return NextResponse.json({
      offerRequestId: result.data.id,
      offers: result.data.offers,
    });
  } catch (error: any) {
    console.error('Duffel search error:', error);
    return NextResponse.json(
      { error: error?.errors?.[0]?.message || error.message || 'Flight search failed' },
      { status: 500 }
    );
  }
}
