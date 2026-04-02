"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, Mail } from 'lucide-react';

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Role Toggle Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setIsAdmin(false)}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${!isAdmin ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Target size={16} /> Subscriber
          </button>
          <button 
            onClick={() => setIsAdmin(true)}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${isAdmin ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <ShieldCheck size={16} /> Administrator
          </button>
        </div>

        <div className="p-8 pb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isAdmin ? 'Admin Portal Access' : 'Welcome Back'}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {isAdmin ? 'Secure login for platform administrators.' : 'Log in to manage your scores and impact.'}
          </p>
        </div>

        <div className="px-8 pb-8 space-y-5">
          {/* Social Login (Hidden for Admins for security aesthetics) */}
          {!isAdmin && (
            <>
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-slate-100"></div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Or email</span>
                <div className="flex-1 h-px bg-slate-100"></div>
              </div>
            </>
          )}

          {/* Traditional Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot?</a>
              </div>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
            </div>

            <button type="button" className={`w-full text-white py-3.5 rounded-xl font-semibold shadow-lg transition-colors mt-2 ${isAdmin ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}>
              {isAdmin ? 'Secure Login' : 'Log In'}
            </button>
          </form>
        </div>

        {/* Footer for non-admins */}
        {!isAdmin && (
          <div className="p-6 bg-slate-50 text-center text-sm border-t border-slate-100">
            <span className="text-slate-500">Don't have an account? </span>
            <Link href="/signup" className="font-bold text-blue-600 hover:text-blue-700">Sign Up</Link>
          </div>
        )}
      </div>
    </main>
  );
}