import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import ScoreForm from './ScoreForm';

// Initialize Supabase admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function ScoresPage() {
  const { userId } = await auth();

  let realScores: any[] = [];
  let isActive = false; // Add this variable
  
  if (userId) {
    // 1. Fetch the user's active scores (You already have this)
    const { data: scoresData, error: scoresError } = await supabase
      .from('scores')
      .select('id, date_played, stableford_score')
      .eq('user_id', userId)
      .order('date_played', { ascending: false })
      .limit(5);

    if (!scoresError && scoresData) {
      realScores = scoresData;
    }

    // 2. Fetch the user's subscription status (NEW)
    const { data: profileData } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', userId)
      .single();

    isActive = profileData?.subscription_status === 'active';
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Score Management</h1>
        <p className="text-slate-500 mt-1">Log your Stableford scores to participate in the monthly draws.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: The Client Form */}
        <div className="md:col-span-1">
          {/* THE FIX: Pass the isActive prop here! */}
          <ScoreForm isActive={isActive} />
        </div>

        {/* Right Column: The Server-Fetched Data */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Your Active Scores (Rolling 5)</h2>
          
          {realScores.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-slate-500 font-medium">No scores logged yet.</p>
              <p className="text-sm text-slate-400 mt-1">Submit your first score using the form.</p>
            </div>
          ) : (
            realScores.map((score, index) => (
              <div key={score.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-lg font-bold text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    {score.stableford_score}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {new Date(score.date_played).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-slate-500">Stableford Points</p>
                  </div>
                </div>
                <div>
                  {index === 0 && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full">Newest</span>
                  )}
                  {index === 4 && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full">Dropping Next</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}