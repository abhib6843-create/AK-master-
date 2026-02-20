
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Trophy, Coins, Zap } from 'lucide-react';

const HeadTails: React.FC = () => {
  const { setCurrentView, user, setUser } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [selection, setSelection] = useState<'Heads' | 'Tails' | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [lastResult, setLastResult] = useState<'Heads' | 'Tails' | null>(null);

  const handleFlip = () => {
    if (!selection) return alert("Select Head or Tail!");
    if (!user || user.wallets.main < betAmount) return alert("Insufficient Balance!");

    setFlipping(true);
    setLastResult(null);
    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});

    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
      setLastResult(result);
      setFlipping(false);

      if (result === selection) {
        const win = betAmount * 1.95;
        setUser(prev => prev ? { ...prev, wallets: { ...prev.wallets, winning: prev.wallets.winning + win }} : null);
      }
      setSelection(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-6 text-center">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <h2 className="text-lg font-black text-yellow-500 uppercase italic tracking-tighter">AK SIKKA (H/T)</h2>
        <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-bold">
           <Trophy size={12} className="text-amber-400" /> ₹{user?.wallets.main}
        </div>
      </div>

      <div className="flex justify-center my-12">
         <div className={`w-36 h-36 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full border-8 border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.3)] transition-all duration-700 ${flipping ? 'animate-spin scale-110' : 'scale-100'}`}>
            <Coins size={64} className="text-yellow-950" />
            {lastResult && !flipping && (
               <div className="absolute inset-0 bg-yellow-500 rounded-full flex items-center justify-center font-black text-slate-950 text-2xl uppercase tracking-tighter">
                  {lastResult}
               </div>
            )}
         </div>
      </div>

      <div className="space-y-8">
         <div className="flex justify-center space-x-6">
            <button onClick={() => setSelection('Heads')} className={`w-32 h-32 rounded-3xl border-4 font-black text-2xl transition-all ${selection === 'Heads' ? 'bg-yellow-500 border-yellow-400 text-slate-950 scale-105' : 'glass border-white/5 text-yellow-500'}`}>HEAD</button>
            <button onClick={() => setSelection('Tails')} className={`w-32 h-32 rounded-3xl border-4 font-black text-2xl transition-all ${selection === 'Tails' ? 'bg-indigo-500 border-indigo-400 text-white scale-105' : 'glass border-white/5 text-indigo-400'}`}>TAIL</button>
         </div>

         <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <div className="grid grid-cols-4 gap-2">
               {[10, 50, 100, 500].map(a => (
                 <button key={a} onClick={() => setBetAmount(a)} className={`py-2 rounded-lg text-xs font-bold ${betAmount === a ? 'bg-yellow-500/20 text-yellow-500' : 'text-slate-500'}`}>₹{a}</button>
               ))}
            </div>
            <button onClick={handleFlip} disabled={flipping} className="w-full py-5 bg-yellow-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-yellow-500/20 uppercase tracking-widest italic">
               {flipping ? 'FLIPPING COIN...' : `FLIP SIKKA FOR ₹${betAmount}`}
            </button>
         </div>
      </div>
    </div>
  );
};

export default HeadTails;
