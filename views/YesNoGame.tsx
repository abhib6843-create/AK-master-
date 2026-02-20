
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Pointer, Trophy } from 'lucide-react';

const YesNoGame: React.FC = () => {
  const { setCurrentView, user, setUser } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [prediction, setPrediction] = useState<'YES' | 'NO' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBet = () => {
    if (!prediction) return alert("Select Yes or No!");
    if (!user || user.wallets.main < betAmount) return alert("Insufficient Balance!");

    setLoading(true);
    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});

    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'YES' : 'NO';
      setLoading(false);
      if (result === prediction) {
        const win = betAmount * 1.95;
        setUser(prev => prev ? { ...prev, wallets: { ...prev.wallets, winning: prev.wallets.winning + win }} : null);
        alert(`Win! Result was ${result}`);
      } else {
        alert(`Loss! Result was ${result}`);
      }
      setPrediction(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-6 text-center">
      <div className="flex items-center justify-between mb-12">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <h2 className="text-xl font-black text-emerald-400">YES / NO PREDICTION</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-8">
         <div className="flex justify-center space-x-6">
            <button onClick={() => setPrediction('YES')} className={`w-32 h-32 rounded-3xl border-4 font-black text-2xl transition-all ${prediction === 'YES' ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-105' : 'glass border-white/5 text-emerald-500'}`}>YES</button>
            <button onClick={() => setPrediction('NO')} className={`w-32 h-32 rounded-3xl border-4 font-black text-2xl transition-all ${prediction === 'NO' ? 'bg-rose-500 border-rose-400 text-slate-950 scale-105' : 'glass border-white/5 text-rose-500'}`}>NO</button>
         </div>

         <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <div className="grid grid-cols-4 gap-2">
               {[10, 50, 100, 500].map(a => (
                 <button key={a} onClick={() => setBetAmount(a)} className={`py-2 rounded-lg text-xs font-bold ${betAmount === a ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500'}`}>₹{a}</button>
               ))}
            </div>
            <button onClick={handleBet} disabled={loading} className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/20">
               {loading ? 'PROCESSING...' : `PREDICT FOR ₹${betAmount}`}
            </button>
         </div>
      </div>
    </div>
  );
};

export default YesNoGame;
