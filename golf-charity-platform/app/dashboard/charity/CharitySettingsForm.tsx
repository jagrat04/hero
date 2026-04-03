"use client";

import { useState, useRef } from 'react';
import { updateCharitySettings } from '@/app/actions/charity';
import { Heart, Percent, Save, CheckCircle, Loader2 } from 'lucide-react';

type Charity = {
  id: string;
  name: string;
  description: string;
};

export default function CharitySettingsForm({ 
  charities, 
  currentPercentage = 10, 
  currentCharityId 
}: { 
  charities: Charity[], 
  currentPercentage?: number, 
  currentCharityId?: string 
}) {
  const [percentage, setPercentage] = useState(currentPercentage);
  const [selectedCharity, setSelectedCharity] = useState(currentCharityId || '');
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSave(formData: FormData) {
    setIsPending(true);
    setSuccess(false);
    
    const result = await updateCharitySettings(formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
    }
    setIsPending(false);
  }

  return (
    <form ref={formRef} action={handleSave} className="space-y-8">
      
      {/* 1. Charity Selection */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Heart size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Choose Your Cause</h2>
            <p className="text-sm text-slate-500">Where should your winnings be routed?</p>
          </div>
        </div>

        <input type="hidden" name="charityId" value={selectedCharity} />
        
        <div className="grid sm:grid-cols-2 gap-4">
          {charities.length === 0 ? (
            <p className="text-slate-500 text-sm italic col-span-2">No charities available yet.</p>
          ) : (
            charities.map((charity) => (
              <div 
                key={charity.id}
                onClick={() => setSelectedCharity(charity.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedCharity === charity.id 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold ${selectedCharity === charity.id ? 'text-emerald-900' : 'text-slate-900'}`}>
                    {charity.name}
                  </h3>
                  {selectedCharity === charity.id && <CheckCircle size={18} className="text-emerald-500" />}
                </div>
                <p className={`text-xs ${selectedCharity === charity.id ? 'text-emerald-700' : 'text-slate-500'} line-clamp-2`}>
                  {charity.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. Percentage Slider */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Percent size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Donation Amount</h2>
            <p className="text-sm text-slate-500">What % of your prize money goes to charity?</p>
          </div>
        </div>

        <div className="px-2">
          <div className="flex justify-between items-end mb-4">
            <span className="text-4xl font-extrabold text-slate-900">{percentage}%</span>
            <span className="text-sm font-medium text-slate-500 pb-1">to Charity</span>
          </div>
          
          <input 
            type="range" 
            name="percentage"
            min="0" 
            max="100" 
            step="5"
            value={percentage}
            onChange={(e) => setPercentage(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          
          <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
            <span>0% (Keep it all)</span>
            <span>50%</span>
            <span>100% (Full Philanthropist)</span>
          </div>
        </div>
      </div>

      {/* 3. Submit Button */}
      <div className="flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isPending || !selectedCharity}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Giving Strategy
        </button>
        {success && <span className="text-emerald-600 text-sm font-bold animate-in fade-in flex items-center gap-1"><CheckCircle size={16}/> Saved!</span>}
      </div>

    </form>
  );
}