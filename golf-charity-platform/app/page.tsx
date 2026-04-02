import Link from 'next/link';
import { ArrowRight, Trophy, HeartHandshake, Target } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="font-bold text-2xl tracking-tighter">Impact<span className="text-blue-600">Drive</span></div>
        <div className="space-x-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
            Subscribe Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
          <HeartHandshake size={16} />
          <span>Over $50k raised for charity this month</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Play Your Game. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Change The World.
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          The only subscription platform where your golf scores enter you into monthly prize draws, while automatically funding charities you care about.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-transform hover:scale-105 duration-200 shadow-lg shadow-blue-200">
            Start Your Impact 
            <ArrowRight size={20} />
          </Link>
          <Link href="/charities" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
            Explore Charities
          </Link>
        </div>
      </section>

      {/* How it Works - Value Props */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Log Your Scores</h3>
            <p className="text-slate-600">Enter your latest 5 Stableford scores. No matter how you play, you're in the game.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Win The Draw</h3>
            <p className="text-slate-600">Match 3, 4, or 5 numbers in our monthly automated draws to win cash from the prize pool.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <HeartHandshake size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Support Causes</h3>
            <p className="text-slate-600">A guaranteed percentage of your subscription goes directly to your chosen registered charity.</p>
          </div>
        </div>
      </section>
    </main>
  );
}