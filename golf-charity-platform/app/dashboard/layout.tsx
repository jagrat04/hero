"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, Heart, Trophy, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-slate-100">
            <span className="font-bold text-xl tracking-tight">Impact<span className="text-blue-600">Drive</span></span>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem 
              href="/dashboard" 
              icon={<LayoutDashboard size={20} />} 
              label="Overview" 
              active={pathname === '/dashboard'} 
            />
            <NavItem 
              href="/dashboard/scores" 
              icon={<Target size={20} />} 
              label="My Scores" 
              active={pathname?.startsWith('/dashboard/scores')} 
            />
            <NavItem 
              href="/dashboard/charity" 
              icon={<Heart size={20} />} 
              label="Impact" 
              active={pathname?.startsWith('/dashboard/charity')} 
            />
            <NavItem 
              href="/dashboard/winnings" 
              icon={<Trophy size={20} />} 
              label="Winnings" 
              active={pathname?.startsWith('/dashboard/winnings')} 
            />
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-100 space-y-1">
          <NavItem 
            href="/dashboard/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={pathname?.startsWith('/dashboard/settings')}
          />
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

// Reusable Navigation Item Component
function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
        active 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}