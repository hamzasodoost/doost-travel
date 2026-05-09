import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { createClient } from '@supabase/supabase-js';

// Use service role for webhook (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const bookingId = session.metadata?.booking_id;

    if (bookingId) {
      await supabaseAdmin
        .from('bookings')
        .update({ status: 'confirmed', stripe_session_id: session.id, paid_at: new Date().toISOString() })
        .eq('id', bookingId);
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as any;
    const bookingId = session.metadata?.booking_id;
    if (bookingId) {
      await supabaseAdmin.from('bookings').update({ status: 'expired' }).eq('id', bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
