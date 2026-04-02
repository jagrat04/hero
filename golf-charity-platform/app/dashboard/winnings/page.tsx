import { Wallet, UploadCloud, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function WinningsPage() {
  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Your Winnings</h1>
        <p className="text-slate-500 mt-1">Track your prize money and submit verification for payouts.</p>
      </header>

      {/* Verification Required Card (Active Call to Action) */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-amber-900">Action Required: Verify Your Win</h2>
            <p className="text-amber-800 text-sm mt-1 mb-4">
              Congratulations! You matched 4 numbers in the October Draw. To claim your $350.00 prize, please upload a screenshot of your official golf platform scores for verification.
            </p>
            
            <div className="border-2 border-dashed border-amber-300 bg-white/50 rounded-xl p-8 text-center hover:bg-white transition-colors cursor-pointer">
              <UploadCloud className="mx-auto text-amber-500 mb-2" size={32} />
              <p className="text-sm font-medium text-amber-900">Click to upload or drag and drop</p>
              <p className="text-xs text-amber-700 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Winnings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Payout History</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Draw Month</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Match Type</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Amount</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm font-medium text-slate-900">October 2023</td>
              <td className="px-6 py-4 text-sm text-slate-600">4-Number Match</td>
              <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">$350.00</td>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  <Clock size={12} /> Pending Proof
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm font-medium text-slate-900">August 2023</td>
              <td className="px-6 py-4 text-sm text-slate-600">3-Number Match</td>
              <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">$45.00</td>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  <CheckCircle size={12} /> Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}