
import React, { useState, useMemo } from 'react';
import { useApp } from '../store';
import { 
  Settings, Users, Swords, Zap, ChevronLeft, 
  ShieldAlert, CheckCircle2, LayoutDashboard, 
  Wallet, Gamepad2, Plane, Dice5, Eye,
  Activity, Coins, Grid3X3, TrendingUp, TrendingDown
} from 'lucide-react';

const AdminView: React.FC = () => {
  const { 
    setCurrentView, gameControls, setGameControls, 
    transactions, autoModeEnabled, setAutoModeEnabled,
    approveTransaction 
  } = useApp();
  
  const [activeFolder, setActiveFolder] = useState<'MANAGEMENT' | 'GAMES' | 'FINANCE' | 'MONITOR' | null>('GAMES');

  const pendingDeposits = transactions.filter(t => t.type === 'Deposit' && t.status === 'Pending');

  const updateControl = (key: string, value: any) => {
    setGameControls({ ...gameControls, [key]: value });
    alert(`कंट्रोल सेट: ${key} -> ${JSON.stringify(value)}`);
  };

  const FolderTab = ({ id, label, icon: Icon, color }: any) => (
    <button 
      onClick={() => setActiveFolder(id)}
      className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all border ${
        activeFolder === id ? `${color} bg-white/10 border-white/20 shadow-lg` : 'text-slate-500 border-transparent grayscale'
      }`}
    >
      <Icon size={18} />
      <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">{label}</span>
    </button>
  );

  return (
    <div className="pb-24 pt-6 px-4 space-y-6 bg-slate-950 min-h-screen overflow-y-auto">
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentView('Home')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <div className="text-center">
            <h1 className="text-lg font-black tracking-widest text-emerald-400 uppercase italic">AK ADMIN PRO</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Master Control Panel</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="glass p-2 rounded-3xl flex space-x-2 border border-white/5">
         <FolderTab id="GAMES" label="गेम कंट्रोलर" icon={Gamepad2} color="text-amber-400" />
         <FolderTab id="FINANCE" label="पेमेंट" icon={Wallet} color="text-emerald-400" />
         <FolderTab id="MANAGEMENT" label="यूजर" icon={Users} color="text-indigo-400" />
      </div>

      {activeFolder === 'GAMES' && (
        <div className="space-y-6 animate-fade-in">
           {/* Trading Control */}
           <div className="glass p-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-black text-emerald-400 uppercase flex items-center"><Activity size={14} className="mr-2" /> Share Bazar (Trading)</h3>
                 {gameControls.tradeNext && <span className="text-[8px] bg-emerald-500 text-slate-950 px-2 rounded-full font-black animate-pulse">ACTIVE: {gameControls.tradeNext}</span>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => updateControl('tradeNext', 'UP')} className={`py-3 rounded-xl font-black text-[10px] border ${gameControls.tradeNext === 'UP' ? 'bg-emerald-500 text-slate-950' : 'glass text-emerald-500 border-emerald-500/30'}`}>FORCE UP</button>
                 <button onClick={() => updateControl('tradeNext', 'DOWN')} className={`py-3 rounded-xl font-black text-[10px] border ${gameControls.tradeNext === 'DOWN' ? 'bg-rose-500 text-slate-950' : 'glass text-rose-500 border-rose-500/30'}`}>FORCE DOWN</button>
              </div>
           </div>

           {/* Dragon Tiger Control */}
           <div className="glass p-5 rounded-3xl border border-rose-500/20 bg-rose-500/5 space-y-4">
              <h3 className="text-xs font-black text-rose-400 uppercase flex items-center"><Swords size={14} className="mr-2" /> Dragon vs Tiger</h3>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={() => updateControl('dragonTigerNext', 'Dragon')} className="py-2.5 glass border border-indigo-500/30 text-indigo-400 text-[9px] font-black rounded-lg">DRAGON</button>
                 <button onClick={() => updateControl('dragonTigerNext', 'Tie')} className="py-2.5 glass border border-amber-500/30 text-amber-400 text-[9px] font-black rounded-lg">TIE</button>
                 <button onClick={() => updateControl('dragonTigerNext', 'Tiger')} className="py-2.5 glass border border-rose-500/30 text-rose-400 text-[9px] font-black rounded-lg">TIGER</button>
              </div>
           </div>

           {/* Mines Control */}
           <div className="glass p-5 rounded-3xl border border-amber-500/20 bg-amber-500/5 space-y-4">
              <h3 className="text-xs font-black text-amber-400 uppercase flex items-center"><Grid3X3 size={14} className="mr-2" /> Mines Master</h3>
              <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => updateControl('minesForce', 'Win')} className="py-3 glass border border-emerald-500/30 text-emerald-400 text-[10px] font-black rounded-xl uppercase">Force Win (No Bombs)</button>
                 <button onClick={() => updateControl('minesForce', 'Loss')} className="py-3 glass border border-rose-500/30 text-rose-400 text-[10px] font-black rounded-xl uppercase">Instant Bomb</button>
              </div>
           </div>

           {/* Sikka Control */}
           <div className="glass p-5 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 space-y-4">
              <h3 className="text-xs font-black text-yellow-500 uppercase flex items-center"><Coins size={14} className="mr-2" /> Sikka (Head/Tail)</h3>
              <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => updateControl('sikkaNext', 'Heads')} className="py-3 glass border border-yellow-500/30 text-yellow-500 text-[10px] font-black rounded-xl uppercase">HEADS</button>
                 <button onClick={() => updateControl('sikkaNext', 'Tails')} className="py-3 glass border border-indigo-500/30 text-indigo-400 text-[10px] font-black rounded-xl uppercase">TAILS</button>
              </div>
           </div>
        </div>
      )}

      {activeFolder === 'FINANCE' && (
        <div className="space-y-4 animate-fade-in">
           <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest px-2 flex items-center">
              <Wallet size={14} className="mr-2" /> पेंडिंग पेमेंट्स
           </h3>
           {pendingDeposits.length > 0 ? (
             pendingDeposits.map(txn => (
                <div key={txn.id} className="glass p-5 rounded-3xl border border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-xl font-black text-white">₹{txn.amount}</p>
                         <p className="text-[10px] text-slate-500 font-mono">UTR: {txn.description}</p>
                      </div>
                      <button 
                        onClick={() => approveTransaction(txn.id)}
                        className="px-6 py-2 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-lg"
                      >
                         APPROVE
                      </button>
                   </div>
                </div>
             ))
           ) : (
             <p className="text-center text-slate-600 text-xs py-10 italic">No pending payments.</p>
           )}
        </div>
      )}
    </div>
  );
};

export default AdminView;
