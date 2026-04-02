import Link from 'next/link';
import { LayoutDashboard, Users, Dices, Heart, Medal, Settings, LogOut, ShieldCheck } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-slate-800">
             <ShieldCheck className="text-blue-500 mr-2" size={24} />
            <span className="font-bold text-xl text-white tracking-tight">Admin<span className="text-blue-500">Panel</span></span>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Analytics Overview" active />
            <NavItem href="/admin/users" icon={<Users size={20} />} label="User Management" />
            <NavItem href="/admin/draws" icon={<Dices size={20} />} label="Draw Engine" />
            <NavItem href="/admin/charities" icon={<Heart size={20} />} label="Charity CMS" />
            <NavItem href="/admin/winners" icon={<Medal size={20} />} label="Winner Verification" />
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800 space-y-1">
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="System Settings" />
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:text-white hover:bg-slate-800 transition-colors">
            <LogOut size={20} />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

// Reusable Navigation Item
function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}