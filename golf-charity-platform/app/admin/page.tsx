import { Users, DollarSign, HeartHandshake, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminOverview() {
  // Mock data to satisfy PRD reporting requirements
  const stats = {
    totalUsers: 12450,
    activeSubscriptions: 11200,
    currentPrizePool: 45000,
    charityContributions: 18500,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Platform Analytics</h1>
          <p className="text-slate-500 mt-1">Real-time overview of subscriptions, pools, and impact.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg border border-amber-200 text-sm font-medium">
          <AlertCircle size={16} />
          <span>12 Pending Winner Verifications</span>
        </div>
      </header>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Total Registered Users" 
          value={stats.totalUsers.toLocaleString()} 
          subtext={`${stats.activeSubscriptions.toLocaleString()} Active Subs`}
          icon={<Users size={24} />}
          color="blue"
        />
        <StatCard 
          title="Est. Monthly Prize Pool" 
          value={`$${stats.currentPrizePool.toLocaleString()}`} 
          subtext="Based on active subs"
          icon={<DollarSign size={24} />}
          color="emerald"
        />
        <StatCard 
          title="Charity Contributions" 
          value={`$${stats.charityContributions.toLocaleString()}`} 
          subtext="To be disbursed this month"
          icon={<HeartHandshake size={24} />}
          color="indigo"
        />
        <StatCard 
          title="Platform Growth" 
          value="+14.2%" 
          subtext="Compared to last month"
          icon={<TrendingUp size={24} />}
          color="slate"
        />
      </div>

      {/* Secondary Section: Draw Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Draw Engine Status */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-lg font-bold text-slate-900">Current Month Draw Status</h2>
             <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">Executing in 12 Days</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-500">5-Number Match (40% Pool)</p>
                <p className="text-xl font-bold text-slate-900">$18,000</p>
              </div>
              <div className="text-right">
                 <p className="text-sm font-medium text-amber-600">Includes $5,000 Rollover</p>
              </div>
            </div>
             <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-500">4-Number Match (35% Pool)</p>
                <p className="text-xl font-bold text-slate-900">$15,750</p>
              </div>
            </div>
             <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-500">3-Number Match (25% Pool)</p>
                <p className="text-xl font-bold text-slate-900">$11,250</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-2xl shadow-md p-6 text-white flex flex-col">
           <h2 className="text-lg font-bold mb-6">Admin Actions</h2>
           <div className="space-y-3 flex-1">
             <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-sm font-medium flex justify-between items-center">
               Run Draw Simulation <span>→</span>
             </button>
             <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-sm font-medium flex justify-between items-center">
               Review Pending Proofs <span>→</span>
             </button>
             <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-sm font-medium flex justify-between items-center">
               Export Charity Data <span>→</span>
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}

// Helper Component for the top row cards
function StatCard({ title, value, subtext, icon, color }: { title: string, value: string, subtext: string, icon: React.ReactNode, color: 'blue' | 'emerald' | 'indigo' | 'slate' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-xs text-slate-400">{subtext}</p>
    </div>
  );
}