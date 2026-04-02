import { Plus, Target, Info, Calendar } from 'lucide-react';

export default function ScoresPage() {
  // Mock data representing the user's current 5 scores
  const currentScores = [
    { id: 1, date: '2023-10-24', score: 38 },
    { id: 2, date: '2023-10-18', score: 41 },
    { id: 3, date: '2023-10-12', score: 35 },
    { id: 4, date: '2023-10-05', score: 42 },
    { id: 5, date: '2023-09-28', score: 39 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Score Management</h1>
        <p className="text-slate-500 mt-1">Log your Stableford scores to participate in the monthly draws.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Score Entry Form */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Log New Score</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date Played</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Stableford Score</label>
                <input 
                  type="number" 
                  min="1" 
                  max="45"
                  placeholder="1 - 45"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                />
              </div>
              <button 
                type="button" 
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Plus size={18} />
                Submit Score
              </button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl flex items-start gap-3">
              <Info className="text-slate-400 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-slate-500 leading-relaxed">
                We only keep your latest 5 scores. Submitting a new score will automatically replace your oldest entry.
              </p>
            </div>
          </div>
        </div>

        {/* Current Rolling Scores */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Your Active Scores (Rolling 5)</h2>
          {currentScores.map((score, index) => (
            <div key={score.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-lg font-bold text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                  {score.score}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{score.date}</p>
                  <p className="text-xs text-slate-500">Stableford Points</p>
                </div>
              </div>
              <div>
                {index === 0 && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full">Newest</span>
                )}
                {index === 4 && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full">Dropping Next</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}