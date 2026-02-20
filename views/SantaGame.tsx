
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Gift, Snowflake, Trophy, Sparkles } from 'lucide-react';

const SantaGame: React.FC = () => {
  const { setCurrentView, user, setUser, gameControls, setGameControls } = useApp();
  const [betAmount, setBetAmount] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<{ multiplier: number; win: number } | null>(null);

  const multipliers = [0, 0, 1.2, 1.5, 2, 5, 0.5, 1.1];

  const handlePlay = () => {
    if (!user || user.wallets.main < betAmount) {
      alert("Insufficient Balance!");
      return;
    }

    setIsPlaying(true);
    setResult(null);

    setTimeout(() => {
      // Check for Admin Control
      const mult = gameControls.santaNext !== undefined ? gameControls.santaNext : multipliers[Math.floor(Math.random() * multipliers.length)];
      
      // Clear control
      if (gameControls.santaNext !== undefined) {
        setGameControls({ ...gameControls, santaNext: undefined });
      }

      const winAmount = Math.floor(betAmount * mult);

      if (user) {
        setUser({
          ...user,
          wallets: {
            ...user.wallets,
            main: user.wallets.main - betAmount,
            winning: user.wallets.winning + winAmount
          }
        });
      }

      setResult({ multiplier: mult, win: winAmount });
      setIsPlaying(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-24 pt-4 bg-slate-950 relative overflow-hidden">
      <div className="px-4 flex items-center justify-between relative z-10">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white">
          <ChevronLeft size={20} />
        </button>
        <div className="glass px-4 py-1.5 rounded-full flex items-center space-x-2">
           <Trophy size={14} className="text-amber-400" />
           <span className="text-xs font-bold">₹{user?.wallets.main}</span>
        </div>
        <div className="p-2 glass rounded-full text-rose-500">
          <Gift size={20} />
        </div>
      </div>

      <div className="mt-8 px-6 text-center space-y-2 relative z-10">
        <h1 className="text-3xl font-black text-rose-500 tracking-tighter flex items-center justify-center">
          SANTA'S <Sparkles className="mx-2 text-amber-400" /> SURPRISE
        </h1>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pick a gift & win up to 5x!</p>
      </div>

      <div className="flex flex-col items-center justify-center py-12 relative z-10">
         <div className={`relative transition-all duration-500 ${isPlaying ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
            <div className="w-48 h-48 bg-gradient-to-br from-rose-500 to-rose-700 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(225,29,72,0.3)] border-4 border-white/10 relative">
               <Gift size={80} className={`text-white transition-transform ${isPlaying ? 'animate-bounce' : ''}`} />
               {result && (
                 <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-950 w-16 h-16 rounded-full flex flex-col items-center justify-center font-black border-4 border-slate-950 animate-bounce">
                    <span className="text-xs leading-none">{result.multiplier}x</span>
                 </div>
               )}
            </div>
         </div>

         {result && (
           <div className="mt-8 animate-fade-in text-center">
             <p className={`text-2xl font-black ${result.win > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
               {result.win > 0 ? `YOU WON ₹${result.win}!` : 'BETTER LUCK NEXT TIME!'}
             </p>
           </div>
         )}
      </div>

      <div className="px-6 space-y-6 relative z-10">
        <div className="glass p-6 rounded-[2.5rem] border border-white/5 space-y-4">
           <button
             disabled={isPlaying}
             onClick={handlePlay}
             className={`w-full py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl transition-all active:scale-95 ${
               isPlaying ? 'bg-slate-800 text-slate-600' : 'bg-rose-500 text-white shadow-rose-500/20'
             }`}
           >
             {isPlaying ? 'OPENING GIFT...' : 'OPEN SURPRISE GIFT'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default SantaGame;
