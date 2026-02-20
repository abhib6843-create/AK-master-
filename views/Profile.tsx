
import React from 'react';
import { useApp } from '../store';
import { User, ShieldCheck, Share2, MessageCircle, LogOut, ChevronRight, Gift, Smartphone } from 'lucide-react';

const ProfileView: React.FC = () => {
  const { user, setUser } = useApp();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setUser(null);
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-3 pt-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-indigo-600 p-1">
             <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <User size={48} className="text-emerald-400" />
             </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-emerald-500 p-1.5 rounded-full border-2 border-slate-950">
             <ShieldCheck size={14} className="text-slate-950" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black">{user?.phone}</h2>
          <p className="text-xs text-slate-500">ID: {user?.id} • Member since Feb 2024</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
         <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Referrals</span>
            <span className="text-lg font-black text-white">42</span>
         </div>
         <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Bonus Rank</span>
            <span className="text-lg font-black text-emerald-400">GOLD</span>
         </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-3">
         <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-2">Account Management</h3>
         <div className="glass rounded-[2rem] overflow-hidden divide-y divide-white/5">
            {[
              { label: 'KYC Verification', icon: ShieldCheck, color: 'text-amber-400', badge: 'UNVERIFIED' },
              { label: 'Security & Password', icon: Smartphone, color: 'text-cyan-400' },
              { label: 'Referral System', icon: Share2, color: 'text-emerald-400', subtitle: 'Invite & Earn ₹500/friend' },
              { label: 'Bonus & Gift Center', icon: Gift, color: 'text-rose-400' },
              { label: 'Customer Support', icon: MessageCircle, color: 'text-indigo-400' },
            ].map((item, idx) => (
              <button key={idx} className="w-full p-5 flex items-center justify-between hover:bg-white/5 active:bg-white/10 transition-colors">
                 <div className="flex items-center space-x-4">
                    <div className={`p-2.5 rounded-xl bg-white/5 ${item.color}`}>
                       <item.icon size={20} />
                    </div>
                    <div className="text-left">
                       <p className="text-sm font-bold">{item.label}</p>
                       {item.subtitle && <p className="text-[10px] text-slate-500">{item.subtitle}</p>}
                    </div>
                 </div>
                 <div className="flex items-center space-x-2">
                    {item.badge && <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">{item.badge}</span>}
                    <ChevronRight size={18} className="text-slate-600" />
                 </div>
              </button>
            ))}
         </div>
      </div>

      <button onClick={handleLogout} className="w-full py-5 glass rounded-3xl flex items-center justify-center space-x-3 text-rose-500 font-black hover:bg-rose-500/10 transition-colors border border-rose-500/10 mt-4">
         <LogOut size={20} />
         <span>LOG OUT SECURELY</span>
      </button>

      <div className="text-center pb-8 pt-4">
         <p className="text-[10px] text-slate-700 font-medium">v2.4.0 • LuckSphere Elite Gaming</p>
      </div>
    </div>
  );
};

export default ProfileView;
