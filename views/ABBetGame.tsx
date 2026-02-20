
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, CreditCard, Trophy } from 'lucide-react';

const ABBetGame: React.FC = () => {
  const { setCurrentView, user, setUser } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBet = () => {
    if (!choice) return alert("Select A or B!");
    if (!user || user.wallets.main < betAmount) return alert("Insufficient Balance!");

    setLoading(true);
    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});

    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'A' : 'B';
      setLoading(false);
      if (result === choice) {
        const win = betAmount * 1.95;
        setUser(prev => prev ? { ...prev, wallets: { ...prev.wallets, winning: prev.wallets.winning + win }} : null);
        alert(`Win! Card was ${result}`);
      } else {
        alert(`Loss! Card was ${result}`);
      }
      setChoice(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-6 text-center">
      <div className="flex items-center justify-between mb-12">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <h2 className="text-xl font-black text-cyan-400 uppercase">A / B Bet</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-12">
         <div className="grid grid-cols-2 gap-6 h-48">
            <button onClick={() => setChoice('A')} className={`rounded-[2rem] border-4 flex flex-col items-center justify-center space-y-2 transition-all ${choice === 'A' ? 'bg-cyan-500 border-cyan-400 text-slate-950 scale-105' : 'glass border-white/5 text-cyan-400'}`}>
               <span className="text-4xl font-black tracking-tighter">SIDE A</span>
               <span className="text-[10px] opacity-60">Payout 1.95x</span>
            </button>
            <button onClick={() => setChoice('B')} className={`rounded-[2rem] border-4 flex flex-col items-center justify-center space-y-2 transition-all ${choice === 'B' ? 'bg-rose-500 border-rose-400 text-slate-950 scale-105' : 'glass border-white/5 text-rose-500'}`}>
               <span className="text-4xl font-black tracking-tighter">SIDE B</span>
               <span className="text-[10px] opacity-60">Payout 1.95x</span>
            </button>
         </div>

         <div className="glass p-8 rounded-[3rem] space-y-6">
            <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase px-2">
               <span>Betting Amount</span>
               <span className="text-cyan-400">Balance: ₹{user?.wallets.main}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
               {[10, 50, 100, 500].map(a => (
                 <button key={a} onClick={() => setBetAmount(a)} className={`py-3 rounded-xl text-xs font-bold border transition-all ${betAmount === a ? 'bg-white/10 border-white/20 text-white' : 'glass border-white/5 text-slate-600'}`}>₹{a}</button>
               ))}
            </div>
            <button onClick={handleBet} disabled={loading} className="w-full py-5 bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-500/20 active:scale-95 transition-all text-sm tracking-widest uppercase">
               {loading ? 'WAITING FOR CARD...' : `BET ON ${choice || '?'} FOR ₹${betAmount}`}
            </button>
         </div>
      </div>
    </div>
  );
};

export default ABBetGame;
