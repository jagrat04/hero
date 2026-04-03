import { createClient } from '@supabase/supabase-js';
import { Check, X, ExternalLink, Eye, Trophy, Clock } from 'lucide-react';
import { reviewWinning } from '@/app/actions/winnings';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminWinnersPage() {
  // Fetch winnings joined with profile data
  const { data: winners } = await supabase
    .from('winnings')
    .select(`
      *,
      profiles:user_id (first_name, last_name, email)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Payout Verification</h1>
        <p className="text-slate-500 mt-1">Review uploaded scorecards and authorize prize distributions.</p>
      </header>

      <div className="grid gap-6">
        {winners?.map((win) => (
          <div key={win.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            
            {/* 1. IMAGE PREVIEW SECTION */}
            <div className="md:w-64 bg-slate-100 relative group aspect-video md:aspect-auto">
              {win.proof_image_url ? (
                <>
                  <img 
                    src={win.proof_image_url} 
                    alt="Scorecard Proof" 
                    className="w-full h-full object-cover"
                  />
                  <a 
                    href={win.proof_image_url} 
                    target="_blank" 
                    className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold"
                  >
                    <Eye size={20} /> View Full
                  </a>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                  <Clock size={32} className="mb-2 opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-widest">Waiting for Upload</p>
                </div>
              )}
            </div>

            {/* 2. DETAILS SECTION */}
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
                      ID: {win.id.slice(0, 8)}
                    </span>
                    {win.status === 'paid' && (
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded">
                        Verified & Paid
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {/* @ts-ignore */}
                    {win.profiles?.first_name} {win.profiles?.last_name}
                  </h2>
                  {/* @ts-ignore */}
                  <p className="text-slate-500 text-sm">{win.profiles?.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Prize Amount</p>
                  <p className="text-3xl font-black text-slate-900">${Number(win.prize_amount).toFixed(2)}</p>
                </div>
              </div>

              {/* 3. ACTIONS SECTION */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <p className="text-xs text-slate-400">
                  Won on: {new Date(win.created_at).toLocaleDateString()}
                </p>

                {win.status === 'pending_proof' && win.proof_image_url && (
                  <div className="flex gap-3">
                    {/* REJECT BUTTON */}
                    <form action={async () => {
                      'use server';
                      await reviewWinning(win.id, 'rejected');
                    }}>
                      <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all">
                        <X size={18} /> Reject
                      </button>
                    </form>

                    {/* APPROVE BUTTON */}
                    <form action={async () => {
                      'use server';
                      await reviewWinning(win.id, 'paid');
                    }}>
                      <button className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
                        <Check size={18} /> Approve & Confirm Payout
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {(!winners || winners.length === 0) && (
          <div className="p-20 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl">
            <Trophy className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-medium">No payout requests found in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}