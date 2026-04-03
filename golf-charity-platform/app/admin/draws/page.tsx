"use client";

import { useState } from 'react';
import { runMonthlyDraw } from '@/app/actions/draws';
import { Play, CheckCircle, Trophy, DollarSign, User, Loader2 } from 'lucide-react';

export default function AdminDrawPage() {
  const [loading, setLoading] = useState(false);
  const [drawResult, setDrawResult] = useState<{ 
    success: boolean; 
    winnerId?: string; 
    pool?: number; 
    error?: string 
  } | null>(null);

  const handleExecuteDraw = async () => {
    const confirmDraw = confirm(
      "CRITICAL ACTION: This will calculate the weighted probability, select a winner, and create a record in the Winnings table. Proceed?"
    );

    if (!confirmDraw) return;

    setLoading(true);
    setDrawResult(null);

    // Hardcoded for April 2026 for now, can be dynamic later
    const result = await runMonthlyDraw('2026-04');
    
    setDrawResult(result as any);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Draw Control Center</h1>
        <p className="text-slate-500 mt-1">Execute the monthly weighted algorithm and assign winners.</p>
      </header>

      <div className="bg-white border-2 border-slate-200 rounded-3xl p-10 shadow-sm overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="font-bold text-slate-700 uppercase tracking-widest text-sm">Running Algorithm...</p>
          </div>
        )}

        <div className="text-center max-w-md mx-auto">
          <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Play size={32} />
          </div>
          <p className="text-slate-600 mb-8 font-medium">
            Clicking the button below will run the weighted algorithm across all April scores.
          </p>

          {!drawResult?.success ? (
            <button
              onClick={handleExecuteDraw}
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
            >
              Execute April Draw
            </button>
          ) : (
            <div className="space-y-6 animate-in zoom-in duration-300">
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-xl">
                <CheckCircle size={24} />
                <span>Draw Complete!</span>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Winner ID</p>
                    <p className="text-sm font-mono font-bold text-slate-700">{drawResult.winnerId}</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-center gap-4">
                  <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                    <Trophy size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-tighter">Pool Total</p>
                    <p className="text-2xl font-black text-amber-900">${drawResult.pool?.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setDrawResult(null)}
                className="text-slate-400 text-sm font-medium hover:text-slate-600 underline underline-offset-4"
              >
                Run another draw?
              </button>
            </div>
          )}
          
          {drawResult?.error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
              {drawResult.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}