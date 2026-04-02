import { Search, Heart, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function CharitiesDirectory() {
  const charities = [
    { id: 1, name: "Fairway Foundation", category: "Youth Sports", description: "Providing underprivileged youth with access to sports equipment and mentorship programs.", impact: "$12,450 raised" },
    { id: 2, name: "Ocean Cleanup Initiative", category: "Environment", description: "Removing plastic waste from coastal areas and funding marine conservation research.", impact: "$8,200 raised" },
    { id: 3, name: "Veterans Drive", category: "Veterans", description: "Supporting military veterans through recreational therapy and community building.", impact: "$15,100 raised" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header & Search */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Choose Your <span className="text-blue-600">Impact</span>
          </h1>
          <p className="text-lg text-slate-600">
            A minimum of 10% of your subscription goes directly to the charity of your choice. Explore our verified partners below.
          </p>
          
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search charities by name or cause..." 
              className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-lg"
            />
          </div>
        </div>

        {/* Charity Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charities.map(charity => (
            <div key={charity.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 bg-slate-100 relative">
                {/* Placeholder for Charity Image */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                  {charity.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{charity.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {charity.description}
                </p>
                
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1"><Heart size={16} className="text-blue-600" /> Platform Impact</span>
                    <span className="font-bold text-slate-900">{charity.impact}</span>
                  </div>
                  <Link href={`/charities/${charity.id}`} className="w-full block text-center bg-slate-50 text-slate-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors">
                    View Full Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}