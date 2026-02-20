
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Trophy, Zap, Swords } from 'lucide-react';

const DragonTiger: React.FC = () => {
  const { setCurrentView, user, setUser } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [selection, setSelection] = useState<'Dragon' | 'Tiger' | 'Tie' | null>(null);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<{ d: number; t: number } | null>(null);

  const handleBet = () => {
    if (!selection) return alert("Select Dragon, Tiger or Tie!");
    if (!user || user.wallets.main < betAmount) return alert("Insufficient Balance!");

    setLoading(true);
    setCards(null);
    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});

    setTimeout(() => {
      const d = Math.floor(Math.random() * 13) + 1;
      const t = Math.floor(Math.random() * 13) + 1;
      setCards({ d, t });
      setLoading(false);

      let winner: 'Dragon' | 'Tiger' | 'Tie' = 'Tie';
      if (d > t) winner = 'Dragon';
      else if (t > d) winner = 'Tiger';

      if (winner === selection) {
        const mult = selection === 'Tie' ? 8 : 1.95;
        const win = betAmount * mult;
        setUser(prev => prev ? { ...prev, wallets: { ...prev.wallets, winning: prev.wallets.winning + win }} : null);
        alert(`AK MASTER WIN! Result: ${winner}`);
      } else {
        alert(`Loss! Result: ${winner}`);
      }
      setSelection(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-6 text-center">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <h2 className="text-lg font-black text-rose-500 uppercase italic tracking-tighter">DRAGON vs TIGER</h2>
        <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-bold">
           <Trophy size={12} className="text-amber-400" /> ₹{user?.wallets.main}
        </div>
      </div>

      <div className="flex justify-center items-center space-x-8 mb-12 h-40">
        <div className={`w-28 h-40 glass rounded-2xl flex flex-col items-center justify-center border-2 ${cards && cards.d > cards.t ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5'}`}>
           <span className="text-[10px] font-black text-indigo-400 uppercase mb-2">Dragon</span>
           {cards ? <span className="text-5xl font-black">{cards.d}</span> : <div className="w-12 h-16 bg-white/5 rounded-lg animate-pulse"></div>}
        </div>
        <div className="text-2xl font-black italic text-slate-700">VS</div>
        <div className={`w-28 h-40 glass rounded-2xl flex flex-col items-center justify-center border-2 ${cards && cards.t > cards.d ? 'border-rose-500 bg-rose-500/10' : 'border-white/5'}`}>
           <span className="text-[10px] font-black text-rose-400 uppercase mb-2">Tiger</span>
           {cards ? <span className="text-5xl font-black">{cards.t}</span> : <div className="w-12 h-16 bg-white/5 rounded-lg animate-pulse"></div>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
         <button onClick={() => setSelection('Dragon')} className={`py-6 rounded-[2rem] border-4 flex flex-col items-center justify-center space-y-1 transition-all ${selection === 'Dragon' ? 'bg-indigo-600 border-indigo-400 text-white scale-105 shadow-xl' : 'glass border-white/5 text-indigo-400'}`}>
            <span className="text-xs font-black">DRAGON</span>
            <span className="text-[8px] opacity-60">2.0x</span>
         </button>
         <button onClick={() => setSelection('Tie')} className={`py-6 rounded-[2rem] border-4 flex flex-col items-center justify-center space-y-1 transition-all ${selection === 'Tie' ? 'bg-amber-600 border-amber-400 text-white scale-105 shadow-xl' : 'glass border-white/5 text-amber-400'}`}>
            <span className="text-xs font-black">TIE</span>
            <span className="text-[8px] opacity-60">8.0x</span>
         </button>
         <button onClick={() => setSelection('Tiger')} className={`py-6 rounded-[2rem] border-4 flex flex-col items-center justify-center space-y-1 transition-all ${selection === 'Tiger' ? 'bg-rose-600 border-rose-400 text-white scale-105 shadow-xl' : 'glass border-white/5 text-rose-400'}`}>
            <span className="text-xs font-black">TIGER</span>
            <span className="text-[8px] opacity-60">2.0x</span>
         </button>
      </div>

      <div className="glass p-8 rounded-[3rem] space-y-6">
         <div className="grid grid-cols-4 gap-2">
            {[10, 50, 100, 1000].map(a => (
              <button key={a} onClick={() => setBetAmount(a)} className={`py-3 rounded-xl text-[10px] font-black border transition-all ${betAmount === a ? 'bg-white/10 border-white/20 text-white' : 'glass border-white/5 text-slate-600'}`}>₹{a}</button>
            ))}
         </div>
         <button onClick={handleBet} disabled={loading} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all text-sm tracking-widest uppercase italic">
            {loading ? 'REVEALING CARDS...' : `BET ON ${selection || '?'} FOR ₹${betAmount}`}
         </button>
      </div>
    </div>
  );
};

export default DragonTiger;
