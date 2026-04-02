import { ArrowRight, Activity, CalendarDays, Wallet, Plus, Heart } from 'lucide-react';

export default function DashboardOverview() {
  // Mock data for frontend development
  const mockScores = [
    { id: 1, date: 'Oct 24, 2023', score: 38 },
    { id: 2, date: 'Oct 18, 2023', score: 41 },
    { id: 3, date: 'Oct 12, 2023', score: 35 },
    { id: 4, date: 'Oct 05, 2023', score: 42 },
    { id: 5, date: 'Sep 28, 2023', score: 39 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, Alex</h1>
          <p className="text-slate-500 mt-1">Here is your impact and performance overview.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2">
          <Plus size={18} />
          Log New Score
        </button>
      </header>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscription Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Activity size={20} />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full">Active</span>
            </div>
            <h2 className="text-slate-500 text-sm font-medium">Subscription Plan</h2>
            <p className="text-2xl font-bold text-slate-900 mt-1">Pro Monthly</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-sm text-slate-500">
            <CalendarDays size={16} className="mr-2" />
            Renews Nov 15, 2023
          </div>
        </div>

        {/* Charity Impact */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
             <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Heart size={20} />
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-full">15% Split</span>
            </div>
            <h2 className="text-slate-500 text-sm font-medium">Supported Charity</h2>
            <p className="text-2xl font-bold text-slate-900 mt-1">Ocean Cleanup</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-500">Total Contributed</span>
            <span className="font-semibold text-indigo-600">$124.50</span>
          </div>
        </div>

        {/* Winnings */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-md text-white flex flex-col justify-between">
          <div>
             <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-white/10 text-white rounded-xl flex items-center justify-center">
                <Wallet size={20} />
              </div>
            </div>
            <h2 className="text-slate-300 text-sm font-medium">Total Winnings</h2>
            <p className="text-3xl font-bold mt-1">$450.00</p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
             <span className="text-slate-300">Next Draw: Oct 31</span>
             <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
               View <ArrowRight size={14} />
             </button>
          </div>
        </div>
      </div>

      {/* Rolling Scores Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Scores (Rolling 5)</h3>
          <span className="text-sm text-slate-500">Stableford Format</span>
        </div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockScores.map((score, index) => (
                <tr key={score.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{score.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">
                      {score.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    {index === 0 ? (
                      <span className="text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-1 rounded-md">Latest</span>
                    ) : (
                      <span className="text-slate-400">Recorded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}