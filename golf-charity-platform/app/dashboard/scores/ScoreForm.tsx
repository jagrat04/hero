"use client";

import { useState, useRef } from 'react';
import { Plus, Target, Calendar, AlertCircle, Lock } from 'lucide-react';
import { submitGolfScore } from '@/app/actions/scores';

// 1. Add the prop definition
export default function ScoreForm({ isActive }: { isActive: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  async function handleAction(formData: FormData) {
    // Extra safety check on the client
    if (!isActive) return; 

    setIsPending(true);
    // ... rest of your submit logic
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
      
      {/* Visual Lock Overlay if inactive */}
      {!isActive && (
        <div className="absolute top-4 right-4 text-slate-300 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
          <Lock size={14} /> Locked
        </div>
      )}

      <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
        <Target size={24} />
      </div>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Log New Score</h2>
      
      <form ref={formRef} action={handleAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date Played</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="date" 
              name="datePlayed" 
              required 
              disabled={!isActive} // 2. Disable input
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl disabled:bg-slate-50 disabled:text-slate-400 outline-none" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Stableford Score</label>
          <input 
            type="number" 
            name="score" 
            min="1" max="45" 
            required 
            disabled={!isActive} // 2. Disable input
            placeholder="1 - 45" 
            className="w-full px-4 py-2 border border-slate-200 rounded-xl disabled:bg-slate-50 disabled:text-slate-400 outline-none" 
          />
        </div>

        <button 
          type="submit" 
          disabled={!isActive || isPending} // 3. Disable button
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          {isPending ? 'Saving...' : <><Plus size={18} /> Submit Score</>}
        </button>
      </form>
    </div>
  );
}