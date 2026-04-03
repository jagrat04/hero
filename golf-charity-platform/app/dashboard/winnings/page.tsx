import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { Trophy, Calendar, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import UploadProofForm from './UploadProofForm'; // Import the functional component

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function WinningsPage() {
  const { userId } = await auth();

  // 1. Fetch the latest active draw pool from 'draws' table
  const { data: currentDraw } = await supabase
    .from('draws')
    .select('total_pool, target_month')
    .eq('status', 'published')
    .order('target_month', { ascending: false })
    .limit(1)
    .single();

  // 2. Fetch User's Real History from 'winnings' table
  const { data: userWinnings } = await supabase
    .from('winnings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // 3. Count active players for the stat card
  const { count: activeUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active');

  // Logic: Check for the most recent win that needs verification
  const winRequiringProof = userWinnings?.find(w => w.status === 'pending_proof' && !w.proof_image_url);

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Winnings & Draws</h1>
        <p className="text-slate-500 mt-1">Track pools and claim your prizes.</p>
      </header>

      {/* 1. DYNAMIC PRIZE POOL */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/30">
              <Trophy size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Projected Prize Pool</h2>
              <p className="text-sm font-medium text-slate-400">
                {currentDraw?.target_month ? new Date(currentDraw.target_month).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Upcoming Draw'}
              </p>
            </div>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
            <Users size={16} className="text-blue-400" />
            <span className="text-sm font-bold">{activeUsers || 0} Entered</span>
          </div>
        </div>
        <div className="relative z-10 mb-8 border-b border-slate-800 pb-8">
          <p className="text-7xl font-extrabold text-white tracking-tight">
            ${Number(currentDraw?.total_pool || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* 2. FUNCTIONAL VERIFICATION CARD */}
      {winRequiringProof && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 shadow-sm border-l-8 border-l-amber-500">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-amber-900">Action Required: Verify Your Win</h2>
              <p className="text-amber-800 text-sm mt-1 mb-4">
                Congratulations! You have a pending win of <strong>${Number(winRequiringProof.prize_amount).toFixed(2)}</strong>. 
                Upload your scorecard screenshot to receive payment.
              </p>
              
              {/* This is now the functional client component we built */}
              <UploadProofForm winningId={winRequiringProof.id} />
              
            </div>
          </div>
        </div>
      )}

      {/* 3. REAL PAYOUT HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Your Winnings Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userWinnings?.map((win) => (
                <tr key={win.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {new Date(win.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">
                    ${Number(win.prize_amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                      win.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {win.status === 'paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {win.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
              {(!userWinnings || userWinnings.length === 0) && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                    No winnings recorded yet. Time to hit the range!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}