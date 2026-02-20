
import React, { useState } from 'react';
import { useApp } from '../store';
import { 
  Gamepad, Dice5, CreditCard, Pointer, Gift, Plane, 
  ShieldAlert, Swords, CircleDashed, Activity, 
  Zap, Trophy, Grid3X3, Coins, Flame, TrendingUp
} from 'lucide-react';

const GamesView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'LOTTERY' | 'CASINO' | 'MINI' | 'TRADING'>('ALL');

  const games = [
    { id: 'trading', name: 'SHARE BAZAR', category: 'TRADING', icon: Activity, color: 'text-emerald-400', view: 'TradingGame' },
    { id: 'color', name: 'WIN GO', category: 'LOTTERY', icon: CircleDashed, color: 'text-indigo-400', view: 'ColorGame' },
    { id: 'mines', name: 'AK MINES', category: 'MINI', icon: Grid3X3, color: 'text-amber-400', view: 'MinesGame' },
    { id: 'dt', name: 'DRAGON vs TIGER', category: 'CASINO', icon: Trophy, color: 'text-rose-500', view: 'DragonTiger' },
    { id: 'aviator', name: 'AEBETER', category: 'MINI', icon: Plane, color: 'text-rose-400', view: 'Aviator' },
    { id: 'headtails', name: 'SIKKA (H/T)', category: 'MINI', icon: Coins, color: 'text-yellow-500', view: 'HeadTails' },
    { id: 'dice', name: 'DICE ROLLER', category: 'MINI', icon: Dice5, color: 'text-fuchsia-400', view: 'Dice' },
    { id: 'yesno', name: 'YES / NO', category: 'MINI', icon: Pointer, color: 'text-emerald-400', view: 'YesNo' },
    { id: 'ab', name: 'A / B CARD', category: 'CASINO', icon: CreditCard, color: 'text-cyan-400', view: 'ABBet' },
    { id: 'santa', name: "SANTA'S GIFT", category: 'MINI', icon: Gift, color: 'text-rose-500', view: 'SantaGame' },
  ];

  const filteredGames = activeTab === 'ALL' ? games : games.filter(g => g.category === activeTab);

  const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all border shrink-0 uppercase tracking-widest ${
        activeTab === id ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'glass border-white/5 text-slate-500'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="pb-24 pt-6 space-y-6">
      <div className="px-4 flex items-center space-x-3">
        <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
           <Gamepad size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">GAME ARENA</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">AK master official choice</p>
        </div>
      </div>

      <div className="flex space-x-3 overflow-x-auto px-4 no-scrollbar">
         <TabButton id="ALL" label="ALL" />
         <TabButton id="TRADING" label="MARKET" />
         <TabButton id="LOTTERY" label="LOTTERY" />
         <TabButton id="CASINO" label="CASINO" />
         <TabButton id="MINI" label="MINI" />
      </div>

      <div className="px-4 grid grid-cols-2 gap-4">
        {filteredGames.map((g) => (
          <button
            key={g.id}
            onClick={() => g.view && setCurrentView(g.view as any)}
            className="group glass p-5 rounded-[2.5rem] flex flex-col items-center space-y-3 active:scale-95 transition-all border border-white/5 relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl bg-white/5 ${g.color}`}>
              <g.icon size={32} />
            </div>
            <div className="text-center relative z-10">
              <p className="text-[9px] text-slate-500 font-black uppercase mb-1">{g.category}</p>
              <p className="text-xs font-black uppercase text-white">{g.name}</p>
            </div>
            {g.id === 'trading' && (
              <div className="absolute top-2 right-2 flex items-center bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                 <TrendingUp size={8} className="mr-1" />
                 <span className="text-[7px] font-black uppercase">NEW</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamesView;
