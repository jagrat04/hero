"use client";

import { useState } from 'react';
import { SignIn } from "@clerk/nextjs";
import { ShieldCheck, Target, Mail } from 'lucide-react';
import { loginAdmin } from '@/app/actions/adminAuth';

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminError, setAdminError] = useState("");


  async function handleAdminSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAdminError("");
    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);
    if (res?.error) setAdminError(res.error);
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Role Toggle Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setIsAdmin(false)}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${!isAdmin ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Target size={16} /> Subscriber
          </button>
          <button 
            onClick={() => setIsAdmin(true)}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${isAdmin ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <ShieldCheck size={16} /> Administrator
          </button>
        </div>

        {!isAdmin ? (
          /* CLERK UI FOR SUBSCRIBERS */
          <div className="p-8 flex justify-center">
            <SignIn 
  routing="hash" 
  fallbackRedirectUrl="/dashboard" 
  appearance={{ elements: { rootBox: "w-full shadow-none", card: "shadow-none border-0 p-0" }}} 
/>
          </div>
        ) : (
          /* CUSTOM UI FOR HARDCODED ADMIN */
          <>
            <div className="p-8 pb-6 text-center">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
              <p className="text-slate-500 text-sm mt-2">Secure login for platform administrators.</p>
            </div>
            <div className="px-8 pb-8">
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="email" type="email" required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input name="password" type="password" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none" />
                </div>
                {adminError && <p className="text-red-500 text-sm font-medium">{adminError}</p>}
                <button type="submit" className="w-full text-white py-3.5 rounded-xl font-semibold shadow-lg transition-colors mt-2 bg-slate-900 hover:bg-slate-800">
                  Secure Login
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}