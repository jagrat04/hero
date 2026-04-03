import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { Lock } from 'lucide-react';
import ScoreForm from './scores/ScoreForm';
import SubscriptionPlans from './SubscriptionPlans';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function DashboardPage() {
  const { userId } = await auth();

  // 1. Fetch the user's profile to check subscription status
  let isActive = false;
  
  if (userId) {
    const { data } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', userId)
      .single();

    isActive = data?.subscription_status === 'active';
  }

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20">
      
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your scores, charities, and monthly draws.</p>
      </header>

      {/* THE UPGRADE BANNER (Only shows if inactive) */}
      {!isActive && (
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-center relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
          <div className="mx-auto h-12 w-12 bg-white/10 text-white rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Unlock the Platform</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            You need an active subscription to submit scores and enter the charity draws.
          </p>
          
          <SubscriptionPlans />
        </div>
      )}

      {/* THE FEATURES (Visible, but disabled if inactive) */}
      <div className={`transition-opacity duration-500 ${!isActive ? 'opacity-60 grayscale-[0.5] pointer-events-none' : ''}`}>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left Column: Score Form */}
          <div className="md:col-span-1">
            <ScoreForm isActive={isActive} />
          </div>

          {/* Right Column: Placeholder for the Draw Engine */}
          <div className="md:col-span-2">
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center h-64 text-slate-400 italic">
                <p>Draw Engine UI will be managed via dedicated /winnings and /charity pages.</p>
             </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}