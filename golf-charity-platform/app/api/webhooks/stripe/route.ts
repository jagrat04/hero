import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Use the Service Role Key to bypass Row Level Security during webhooks
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();
  const signature = headerPayload.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkUserId = session.metadata?.clerkUserId;

    if (clerkUserId) {
      console.log(`Payment successful for user: ${clerkUserId}. Updating DB...`);
      
      // Update the profiles table to match your schema's 'active' ENUM
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_status: 'active' })
        .eq('id', clerkUserId);

      if (error) {
        console.error("Supabase Update Error:", error);
      } else {
        console.log("Successfully updated subscription_status to 'active'");
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}