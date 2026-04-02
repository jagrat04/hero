"use client";

import { SignUp } from "@clerk/nextjs";
import { Target } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 bg-blue-600 text-white rounded-xl mb-4 shadow-sm">
          <Target size={24} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Join ImpactDrive</h1>
        <p className="text-slate-500 mt-2 max-w-sm mx-auto">
          Create your secure account. We will set up your charity preferences on the inside.
        </p>
      </div>

      {/* Clerk handles the entire flow (Email, Google, Passwords, OTPs) */}
      <SignUp 
        routing="hash" 
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "shadow-xl rounded-3xl overflow-hidden border border-slate-200",
            card: "shadow-none border-0",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 shadow-sm",
            socialButtonsBlockButton: "border border-slate-200 hover:bg-slate-50 transition-colors",
          }
        }} 
      />

      <div className="mt-8 text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">
          Log In
        </Link>
      </div>

    </main>
  );
}