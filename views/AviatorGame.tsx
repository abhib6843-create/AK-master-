
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Plane, Trophy, History as HistoryIcon, Zap } from 'lucide-react';

const AviatorGame: React.FC = () => {
  const { setCurrentView, user, setUser, gameControls, setGameControls } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(1.00);
  const [status, setStatus] = useState<'IDLE' | 'FLYING' | 'CRASHED' | 'CASHED_OUT'>('IDLE');
  const [history, setHistory] = useState<number[]>([1.45, 2.10, 1.02, 5.40, 1.88]);
  const timerRef = useRef<any>(null);

  const startRound = () => {
    if (!user || user.wallets.main < betAmount) {
      alert("Insufficient Balance!");
      return;
    }

    setUser({
      ...user,
      wallets: { ...user.wallets, main: user.wallets.main - betAmount }
    });

    setStatus('FLYING');
    setMultiplier(1.00);
    
    // Check for Admin Control
    const crashAt = gameControls.aviatorNext || (1 + Math.random() * 5);
    
    // Clear control after use
    if (gameControls.aviatorNext) {
      setGameControls({ ...gameControls, aviatorNext: undefined });
    }

    timerRef.current = setInterval(() => {
      setMultiplier(prev => {
        const next = prev + 0.02;
        if (next >= crashAt) {
          clearInterval(timerRef.current);
          setStatus('CRASHED');
          setHistory(h => [parseFloat(crashAt.toFixed(2)), ...h.slice(0, 9)]);
          return parseFloat(crashAt.toFixed(2));
        }
        return parseFloat(next.toFixed(2));
      });
    }, 100);
  };

  const cashOut = () => {
    if (status !== 'FLYING') return;
    clearInterval(timerRef.current);
    const winAmount = Math.floor(betAmount * multiplier);
    
    if (user) {
      setUser({
        ...user,
        wallets: { ...user.wallets, winning: user.wallets.winning + winAmount }
      });
    }
    
    setStatus('CASHED_OUT');
  };

  const reset = () => {
    setStatus('IDLE');
    setMultiplier(1.00);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen pb-24 pt-4 bg-slate-950 relative overflow-hidden">
      <div className="px-4 flex items-center justify-between relative z-10">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white">
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Aviator Elite</span>
          <span className="text-xs font-bold text-slate-400">PROVABLY FAIR</span>
        </div>
        <div className="glass px-4 py-1.5 rounded-full flex items-center space-x-2">
           <Trophy size={14} className="text-amber-400" />
           <span className="text-xs font-bold">₹{user?.wallets.main}</span>
        </div>
      </div>

      <div className="px-4 py-3 flex space-x-2 overflow-x-auto no-scrollbar mt-4">
        {history.map((h, i) => (
          <div key={i} className={`px-3 py-1 rounded-full text-[10px] font-black shrink-0 ${h > 2 ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-500'}`}>
            {h.toFixed(2)}x
          </div>
        ))}
      </div>

      <div className="h-64 mt-6 mx-4 glass rounded-[2.5rem] relative overflow-hidden bg-slate-900 flex items-center justify-center border border-white/5">
        <div className={`text-6xl font-black transition-all duration-300 ${status === 'CRASHED' ? 'text-rose-500 scale-125' : status === 'CASHED_OUT' ? 'text-emerald-400' : 'text-white'}`}>
          {multiplier.toFixed(2)}x
        </div>
        
        {status === 'FLYING' && (
          <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 text-rose-500 animate-bounce">
             <Plane size={48} className="rotate-[-20deg] drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
          </div>
        )}

        {status === 'CRASHED' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 font-black uppercase tracking-widest text-sm bg-rose-500/10 px-6 py-2 rounded-full border border-rose-500/30">
            FLEW AWAY!
          </div>
        )}

        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-6">
        <div className="glass p-6 rounded-[2.5rem] border border-white/5 space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                 {[10, 50, 100].map(a => (
                   <button key={a} onClick={() => setBetAmount(a)} className={`w-12 py-2 rounded-lg text-[10px] font-black border transition-all ${betAmount === a ? 'bg-indigo-500 border-indigo-400 text-white' : 'glass border-white/5 text-slate-500'}`}>₹{a}</button>
                 ))}
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-bold text-slate-500 uppercase">Betting Amount</p>
                 <p className="text-sm font-black text-white">₹{betAmount}</p>
              </div>
           </div>

           {status === 'IDLE' || status === 'CRASHED' || status === 'CASHED_OUT' ? (
             <button
               onClick={status === 'IDLE' ? startRound : reset}
               className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-sm tracking-widest"
             >
               {status === 'IDLE' ? 'BET ₹' + betAmount : 'NEXT ROUND'}
             </button>
           ) : (
             <button
               onClick={cashOut}
               className="w-full py-5 bg-amber-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all text-sm tracking-widest flex flex-col items-center"
             >
               <span className="text-[10px] opacity-60">CASH OUT</span>
               <span>₹{(betAmount * multiplier).toFixed(0)}</span>
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default AviatorGame;
