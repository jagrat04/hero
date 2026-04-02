import Link from 'next/link';
import { Target } from 'lucide-react';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-8">
        
        <div className="p-8 pb-6 border-b border-slate-100 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 bg-blue-600 text-white rounded-xl mb-4 shadow-sm">
            <Target size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Join the Impact</h1>
          <p className="text-slate-500 text-sm mt-2">Create your account to start logging scores and supporting great causes.</p>
        </div>

        <div className="px-8 pt-6">
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Or register manually</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>
        </div>

        <form className="px-8 pb-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Secure Password</label>
            <input type="password" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Your Charity (Required)</label>
            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none appearance-none cursor-pointer">
              <option value="" disabled defaultValue="">Choose a cause to support...</option>
              <option value="1">Fairway Foundation</option>
              <option value="2">Ocean Cleanup Initiative</option>
              <option value="3">Veterans Drive</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">A minimum of 10% of your subscription will be routed here automatically.</p>
          </div>

          <button type="button" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 mt-4">
            Create Account & Subscribe
          </button>
        </form>

        <div className="p-6 bg-slate-50 text-center text-sm border-t border-slate-100">
          <span className="text-slate-500">Already have an account? </span>
          <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">Log In</Link>
        </div>
      </div>
    </main>
  );
}