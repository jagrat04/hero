import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import CharitySettingsForm from './CharitySettingsForm';
import { Heart } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function CharityPage() {
  const { userId } = await auth();

  // 1. Fetch available charities from your 'charities' table
  const { data: charities } = await supabase
    .from('charities')
    .select('id, name, description')
    .order('name');

  // 2. Fetch user settings (Using 'selected_charity_id' from your schema)
  let userProfile = null;
  if (userId) {
    const { data } = await supabase
      .from('profiles')
      .select('charity_percentage, selected_charity_id')
      .eq('id', userId)
      .single();
    userProfile = data;
  }

  // 3. Calculate Platform Impact (Active Users * $10 * 10%)
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active');

  const activeUsers = count || 0; 
  const totalCharityPool = (activeUsers * 10) * 0.10;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Your Giving Strategy</h1>
        <p className="text-slate-500 mt-1">Control how your winnings make an impact.</p>
      </header>

      {/* Real Platform Impact Header */}
      <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden flex items-center justify-between">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Heart size={20} className="text-emerald-400"/> Current Platform Impact
          </h2>
          <p className="text-sm text-slate-400">Projected for {new Date().toLocaleString('default', { month: 'long' })}</p>
        </div>
        <div className="relative z-10 text-right">
          <p className="text-4xl font-extrabold text-white">${totalCharityPool.toFixed(2)}</p>
        </div>
      </div>

      <CharitySettingsForm 
        charities={charities || []} 
        currentPercentage={userProfile?.charity_percentage || 10}
        currentCharityId={userProfile?.selected_charity_id} 
      />
    </div>
  );
}