import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { offerId, passengers, amount, currency, description, customerEmail } = body;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Save pending booking to Supabase
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user?.id ?? null,
        duffel_offer_id: offerId,
        passenger_count: passengers?.length ?? 1,
        total_amount: amount / 100,
        currency,
        status: 'pending',
        booking_type: 'flight',
        passenger_details: passengers,
        description,
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Booking insert error:', bookingError);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const session = await createCheckoutSession({
      bookingId: booking?.id ?? 'temp',
      amount,
      currency: currency || 'USD',
      description,
      customerEmail,
      successUrl: `${appUrl}/dashboard/bookings?success=true&booking_id=${booking?.id}`,
      cancelUrl: `${appUrl}/flights`,
      metadata: { offer_id: offerId, user_id: user?.id ?? '' },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error('Checkout session error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create checkout session' }, { status: 500 });
  }
}
