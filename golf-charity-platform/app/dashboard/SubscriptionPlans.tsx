"use client";

import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

export default function SubscriptionPlans() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planType: string) => {
    try {
      setIsLoading(planType);
      
      // Safety check just in case the env var is missing
      if (!priceId) {
        console.error("Missing Stripe Price ID in Environment Variables!");
        return;
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      // Check if the API returned an error JSON
      if (!response.ok) {
        console.error("Backend Error:", data.error);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(null);
    }
  };
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8 text-left">
      
      {/* Monthly Plan Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col relative z-10">
        <h3 className="text-xl font-bold text-slate-900">Monthly Plan</h3>
        <p className="text-4xl font-extrabold mt-4 text-slate-900">
          $10<span className="text-lg text-slate-500 font-medium">/mo</span>
        </p>
        <ul className="mt-8 space-y-4 mb-8 flex-grow text-slate-600">
          <li className="flex items-center gap-2">✓ Enter monthly charity draws</li>
          <li className="flex items-center gap-2">✓ Track stableford scores</li>
          <li className="flex items-center gap-2">✓ Route 10% to your charity</li>
        </ul>
        <button 
          onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!, 'monthly')}
          disabled={!!isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading === 'monthly' ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <><CreditCard size={20} /> Subscribe Monthly</>
          )}
        </button>
      </div>

      {/* Yearly Plan Card */}
      <div className="bg-blue-600 p-8 rounded-3xl shadow-lg shadow-blue-900/50 flex flex-col text-white relative z-10 transform md:-translate-y-4">
        <div className="bg-blue-500/50 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 border border-blue-400/50">
          Best Value
        </div>
        <h3 className="text-xl font-bold">Yearly Plan</h3>
        <p className="text-4xl font-extrabold mt-4">
          $100<span className="text-lg text-blue-200 font-medium">/yr</span>
        </p>
        <ul className="mt-8 space-y-4 mb-8 flex-grow text-blue-50">
          <li className="flex items-center gap-2">✓ Two months free</li>
          <li className="flex items-center gap-2">✓ Enter all monthly draws</li>
          <li className="flex items-center gap-2">✓ Maximum charity impact</li>
        </ul>
        <button 
          onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!, 'yearly')}
          disabled={!!isLoading}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-90"
        >
          {isLoading === 'yearly' ? (
            <Loader2 className="animate-spin text-blue-600" size={20} />
          ) : (
            <><CreditCard size={20} /> Subscribe Yearly</>
          )}
        </button>
      </div>

    </div>
  );
}