
import React from 'react';
import { useApp } from '../store';
import { Bell, ShieldCheck, Zap, Trophy, Flame, LayoutDashboard } from 'lucide-react';

const HomeView: React.FC = () => {
  const { user, setCurrentView, isAdmin } = useApp();

  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center font-black text-white border border-white/10 shadow-lg shadow-indigo-500/20">
            AK
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight tracking-tighter uppercase italic">AK master</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{isAdmin ? 'ADMIN CONTROL' : `WELCOME, ${user?.phone.split(' ')[2]}`}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isAdmin && (
            <button onClick={() => setCurrentView('Admin')} className="p-2.5 rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 animate-pulse">
              <LayoutDashboard size={20} />
            </button>
          )}
          <button className="p-2 rounded-full glass text-indigo-400 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-950"></span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-44 rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 flex items-center border border-white/5">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center px-2.5 py-1 bg-white/5 text-emerald-400 text-[9px] font-black rounded-lg border border-white/10 uppercase tracking-[0.2em]">
            <Zap size={10} className="mr-1 fill-emerald-400" /> New Era Gaming
          </div>
          <h2 className="text-3xl font-black text-white leading-none">AK MASTER<br/><span className="text-indigo-400">OFFICIAL APP</span></h2>
          <button onClick={() => setCurrentView('Wallet')} className="px-8 py-2.5 bg-indigo-600 text-white text-[10px] font-black rounded-xl shadow-xl shadow-indigo-600/30 uppercase tracking-widest">
            जमा करें (DEPOSIT)
          </button>
        </div>
        <div className="absolute -top-10 -right-10 opacity-10">
          <Trophy size={200} className="text-white" />
        </div>
      </div>

      {/* Marquee/News */}
      <div className="glass h-10 rounded-2xl flex items-center px-4 space-x-3 border border-white/5">
         <Flame size={16} className="text-rose-500 fill-rose-500" />
         <div className="flex-1 overflow-hidden whitespace-nowrap text-[11px] font-bold text-slate-400 uppercase tracking-tight">
            {React.createElement('marquee' as any, {}, "🔥 AK master में आपका स्वागत है! • ₹500 बोनस हर रेफरल पर! • UPI पेमेंट अब और भी तेज • आज का लकी कलर: GREEN • Aviator 50x Win! 🔥")}
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-5 rounded-3xl flex flex-col justify-between h-28 border border-white/5">
           <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Main Wallet</span>
           <span className="text-xl font-black text-white">₹{user?.wallets.main.toLocaleString()}</span>
        </div>
        <div className="glass p-5 rounded-3xl border-l-4 border-indigo-500 flex flex-col justify-between h-28">
           <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Winning</span>
           <span className="text-xl font-black text-white">₹{user?.wallets.winning.toLocaleString()}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">HOT SELECTION</h3>
          <button onClick={() => setCurrentView('Games')} className="text-[10px] font-black text-indigo-400 uppercase">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => setCurrentView('ColorGame')} className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-indigo-950 border border-white/5 active:scale-95 transition-transform cursor-pointer">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
             <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <LayoutDashboard size={40} className="text-indigo-400 mb-2" />
                <p className="text-sm font-black text-white uppercase italic">WIN GO</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Lottery Game</p>
             </div>
          </div>
          <div onClick={() => setCurrentView('Aviator')} className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-rose-950 border border-white/5 active:scale-95 transition-transform cursor-pointer">
             <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-transparent"></div>
             <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <Zap size={40} className="text-rose-400 mb-2" />
                <p className="text-sm font-black text-white uppercase italic">AVIATOR</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Instant Crash</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
