import { createClient } from '@supabase/supabase-js';
import { Search, Edit2, ShieldAlert, UserX, CheckCircle2 } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminUsersPage() {
  // 1. Fetch profiles and join with the charities table to get the charity name
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select(`
      id, 
      first_name, 
      last_name, 
      email, 
      subscription_status, 
      charity_percentage,
      charities:selected_charity_id (name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">View profiles, manage subscriptions, and audit score entries.</p>
        </div>
        
        {/* Search UI (Note: Logic would require a Client Component or Search Params) */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subscription</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Chosen Charity</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {profiles?.map((profile) => (
              <tr key={profile.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">
                    {profile.first_name} {profile.last_name}
                  </p>
                  <p className="text-sm text-slate-500">{profile.email}</p>
                </td>
                <td className="px-6 py-4">
                  {profile.subscription_status === "active" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                      <CheckCircle2 size={14} /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                      <UserX size={14} /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">
                    {/* @ts-ignore - Supabase join syntax */}
                    {profile.charities?.name || "None Selected"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Commitment: {profile.charity_percentage}%
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Profile & Scores">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Manage Subscription">
                      <ShieldAlert size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {profiles?.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400 italic">No users found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}