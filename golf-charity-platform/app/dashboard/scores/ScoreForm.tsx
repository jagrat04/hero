"use client";

import { useState, useRef } from 'react';
import { Plus, Target, Info, Calendar, AlertCircle } from 'lucide-react';
import { submitGolfScore } from '@/app/actions/scores';

export default function ScoreForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  async function handleAction(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    
    const result = await submitGolfScore(formData);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: "Score logged successfully!" });
      formRef.current?.reset();
    }
    
    setIsPending(false);
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
      <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
        <Target size={24} />
      </div>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Log New Score</h2>
      
      <form ref={formRef} action={handleAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date Played</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="date" name="datePlayed" required className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Stableford Score</label>
          <input type="number" name="score" min="1" max="45" required placeholder="1 - 45" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
            {message.type === 'error' && <AlertCircle size={16} className="shrink-0 mt-0.5" />}
            <p>{message.text}</p>
          </div>
        )}

        <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
          {isPending ? 'Saving...' : <><Plus size={18} /> Submit Score</>}
        </button>
      </form>

      <div className="mt-6 p-4 bg-slate-50 rounded-xl flex items-start gap-3">
        <Info className="text-slate-400 shrink-0 mt-0.5" size={16} />
        <p className="text-xs text-slate-500 leading-relaxed">
          We only keep your latest 5 scores. Submitting a new score will automatically replace your oldest entry.
        </p>
      </div>
    </div>
  );
}