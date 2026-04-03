import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }

    // NEW: Add a fallback URL just in case the env variable is missing
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // NEW: Use the safe appUrl variable here
      success_url: `${appUrl}/dashboard?success=true`,
      cancel_url: `${appUrl}/dashboard?canceled=true`,
      metadata: {
        clerkUserId: userId,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}