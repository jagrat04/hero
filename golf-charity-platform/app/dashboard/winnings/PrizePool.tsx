import { Trophy, Calendar, Users } from 'lucide-react';

interface PrizePoolProps {
  amount: number;
  activeUsers: number;
}

export default function PrizePool({ amount, activeUsers }: PrizePoolProps) {
  // Calculate the last day of the current month
  const today = new Date();
  const nextDrawDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const formattedDate = nextDrawDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-0"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Trophy size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Monthly Draw</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <Calendar size={14} />
          {formattedDate}
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center relative z-10">
        <p className="text-sm font-medium text-slate-500 mb-1">Current Prize Pool</p>
        <p className="text-5xl font-extrabold text-slate-900">${amount.toFixed(2)}</p>
        <p className="text-sm text-slate-400 mt-2">Winner takes all at month end.</p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm relative z-10">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Users size={16} />
          <span>{activeUsers} Players Entered</span>
        </div>
      </div>
    </div>
  );
}