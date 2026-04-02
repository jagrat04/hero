import { HeartHandshake, ArrowRight, Settings2, DollarSign, Edit } from 'lucide-react';
import Link from 'next/link';

export default function CharityImpactPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Your Impact</h1>
        <p className="text-slate-500 mt-1">Manage your charitable contributions and supported causes.</p>
      </header>

      {/* Current Supported Charity Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <HeartHandshake size={180} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="max-w-xl">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm mb-4 inline-block">
              Currently Supporting
            </span>
            <h2 className="text-3xl font-bold mb-2">Ocean Cleanup Initiative</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Removing plastic waste from coastal areas and funding marine conservation research globally. 
            </p>
            <div className="flex gap-4">
               <button className="bg-white text-indigo-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm">
                 <Edit size={16} /> Change Charity
               </button>
               <Link href="/charities/2" className="bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
                 View Full Profile
               </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full md:w-64 shrink-0 text-center">
            <p className="text-indigo-200 text-sm font-medium mb-1">Total Impact</p>
            <p className="text-4xl font-bold">$124.50</p>
            <p className="text-xs text-slate-300 mt-2">Contributed via your subscription so far.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contribution Percentage Manager */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Settings2 className="text-blue-600" size={24} />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Subscription Split</h3>
              <p className="text-xs text-slate-500">Adjust how much of your fee goes to charity.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-slate-900">15%</p>
                <p className="text-sm font-medium text-emerald-600 mt-1">Currently contributing $3.00/month</p>
              </div>
            </div>

            <div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                defaultValue="15" 
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>10% (Minimum)</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-md">
              Update Split Percentage
            </button>
          </div>
        </div>

        {/* Independent Donation Modal Trigger */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <DollarSign size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">One-Time Donation</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Want to make a bigger impact? You can make an independent, one-off donation directly to the Ocean Cleanup Initiative at any time.
            </p>
          </div>

          <form className="space-y-3 mt-auto">
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="number" 
                placeholder="0.00"
                min="1"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none font-medium"
              />
            </div>
            <button type="button" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-200">
              Make Independent Donation <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}