
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Dice5, Trophy, Sparkles } from 'lucide-react';

const DiceGame: React.FC = () => {
  const { setCurrentView, user, setUser, gameControls, setGameControls } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);

  const handleRoll = () => {
    if (!selectedNum) {
      alert("Please select a number!");
      return;
    }
    if (!user || user.wallets.main < betAmount) {
      alert("Insufficient Balance!");
      return;
    }

    setIsRolling(true);
    setLastResult(null);

    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});

    setTimeout(() => {
      // Check for Admin Control
      const result = gameControls.diceNext || (Math.floor(Math.random() * 6) + 1);
      
      // Clear control
      if (gameControls.diceNext) {
        setGameControls({ ...gameControls, diceNext: undefined });
      }

      setLastResult(result);
      setIsRolling(false);

      if (result === selectedNum) {
        const win = betAmount * 5;
        setUser(prev => prev ? {
          ...prev,
          wallets: { ...prev.wallets, winning: prev.wallets.winning + win }
        } : null);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-4 text-center">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <h2 className="text-xl font-black text-fuchsia-400">DICE ROLLER</h2>
        <div className="glass px-4 py-1.5 rounded-full flex items-center space-x-2 text-xs font-bold">
           <Trophy size={14} className="text-amber-400" /> ₹{user?.wallets.main}
        </div>
      </div>

      <div className="flex justify-center my-12">
         <div className={`w-32 h-32 glass rounded-3xl flex items-center justify-center border-4 border-fuchsia-500/30 ${isRolling ? 'animate-spin' : ''}`}>
            {lastResult ? (
              <span className="text-6xl font-black text-fuchsia-400">{lastResult}</span>
            ) : (
              <Dice5 size={64} className="text-fuchsia-400 opacity-20" />
            )}
         </div>
      </div>

      <div className="space-y-6">
         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Your Number (5x Win)</p>
         <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button key={n} onClick={() => setSelectedNum(n)} className={`py-4 rounded-xl font-black ${selectedNum === n ? 'bg-fuchsia-500 text-white' : 'glass text-slate-400'}`}>{n}</button>
            ))}
         </div>

         <div className="glass p-6 rounded-3xl space-y-4">
            <div className="flex justify-center space-x-3">
               {[10, 50, 100, 500].map(a => (
                 <button key={a} onClick={() => setBetAmount(a)} className={`px-4 py-2 rounded-lg text-xs font-bold ${betAmount === a ? 'bg-white/20 text-white' : 'text-slate-500'}`}>₹{a}</button>
               ))}
            </div>
            <button onClick={handleRoll} disabled={isRolling} className="w-full py-5 bg-fuchsia-500 text-white font-black rounded-2xl shadow-xl shadow-fuchsia-500/20">
               {isRolling ? 'ROLLING...' : `ROLL DICE FOR ₹${betAmount}`}
            </button>
         </div>
      </div>
    </div>
  );
};

export default DiceGame;
