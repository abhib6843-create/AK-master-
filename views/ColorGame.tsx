
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Info, Trophy, Timer, History as HistoryIcon, LayoutGrid, Maximize2 } from 'lucide-react';
import Countdown from '../components/Countdown';

const ColorGame: React.FC = () => {
  const { setCurrentView, user, placeBet, gameHistory } = useApp();
  const [selectedMode, setSelectedMode] = useState<'30s' | '60s'>('30s');
  const [betCategory, setBetCategory] = useState<'ColorNumber' | 'BigSmall'>('ColorNumber');
  const [betAmount, setBetAmount] = useState(10);
  const [isBetting, setIsBetting] = useState(false);
  const [selectedBet, setSelectedBet] = useState<any>(null);

  const handleBet = (type: any) => {
    setSelectedBet(type);
    setIsBetting(true);
  };

  const confirmBet = () => {
    if (!user || user.wallets.main < betAmount) {
       alert("Insufficient balance!");
       return;
    }
    placeBet({
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      periodId: '202402010' + (gameHistory.length + 1),
      amount: betAmount,
      betOn: selectedBet,
      status: 'Pending'
    });
    setIsBetting(false);
    setSelectedBet(null);
  };

  return (
    <div className="pb-24 pt-4 min-h-screen bg-slate-950">
      {/* Header */}
      <div className="px-4 flex items-center justify-between mb-4">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white">
          <ChevronLeft size={20} />
        </button>
        <div className="glass px-4 py-1.5 rounded-full flex items-center space-x-2">
           <Trophy size={14} className="text-amber-400" />
           <span className="text-xs font-bold">₹{user?.wallets.main}</span>
        </div>
        <button className="p-2 glass rounded-full text-white">
          <Info size={20} />
        </button>
      </div>

      {/* Round Mode Selector (30s / 60s) */}
      <div className="px-4 mb-4">
        <div className="glass p-1 rounded-2xl flex">
          {(['30s', '60s'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                selectedMode === mode ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'
              }`}
            >
              {mode === '30s' ? 'WIN GO 30S' : 'WIN GO 1MIN'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Area */}
      <div className="px-4 space-y-4">
        <div className="glass rounded-3xl p-6 relative overflow-hidden flex justify-between items-center border border-white/5 bg-gradient-to-br from-slate-900 to-indigo-950/20">
           <div className="space-y-1">
             <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Period ID</p>
             <h3 className="text-lg font-black font-mono">202402010{gameHistory.length + 1}</h3>
           </div>
           <Countdown initialSeconds={selectedMode === '30s' ? 30 : 60} />
           <div className="absolute top-0 right-0 p-4 opacity-5">
              <Timer size={80} />
           </div>
        </div>

        {/* Betting Category Selector */}
        <div className="flex bg-white/5 rounded-2xl p-1 mx-2">
          <button 
            onClick={() => setBetCategory('ColorNumber')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter ${
              betCategory === 'ColorNumber' ? 'bg-white/10 text-emerald-400 shadow-inner border border-white/10' : 'text-slate-500'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Colors & Numbers</span>
          </button>
          <button 
            onClick={() => setBetCategory('BigSmall')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter ${
              betCategory === 'BigSmall' ? 'bg-white/10 text-amber-400 shadow-inner border border-white/10' : 'text-slate-500'
            }`}
          >
            <Maximize2 size={14} />
            <span>Big & Small</span>
          </button>
        </div>

        {/* Dynamic Betting UI based on Category */}
        <div className="transition-all duration-300 transform scale-100 opacity-100">
          {betCategory === 'ColorNumber' ? (
            <div className="space-y-4 animate-fade-in">
              {/* Color Betting */}
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => handleBet('Green')} className="py-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_8px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none transition-all font-black text-sm text-white">GREEN</button>
                <button onClick={() => handleBet('Violet')} className="py-5 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 shadow-[0_8px_0_rgb(192,38,211)] active:translate-y-1 active:shadow-none transition-all font-black text-sm text-white">VIOLET</button>
                <button onClick={() => handleBet('Red')} className="py-5 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 shadow-[0_8px_0_rgb(225,29,72)] active:translate-y-1 active:shadow-none transition-all font-black text-sm text-white">RED</button>
              </div>

              {/* Number Betting */}
              <div className="glass p-4 rounded-3xl border border-white/5 bg-slate-900/40">
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                      key={num}
                      onClick={() => handleBet(num)}
                      className={`w-full aspect-square rounded-xl flex items-center justify-center font-black text-lg border-2 ${
                        num % 2 === 0 ? 'border-rose-500/30 text-rose-400' : 'border-emerald-500/30 text-emerald-400'
                      } hover:bg-white/5 active:scale-90 transition-transform`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in py-4">
              {/* Big/Small Betting Only */}
              <div className="grid grid-cols-2 gap-4 h-48">
                 <button 
                  onClick={() => handleBet('Big')} 
                  className="rounded-3xl glass border-2 border-indigo-500/50 bg-indigo-500/5 text-indigo-400 font-black text-2xl tracking-[0.2em] shadow-lg shadow-indigo-500/10 active:scale-95 transition-all flex flex-col items-center justify-center space-y-2"
                 >
                   <span>BIG</span>
                   <span className="text-[10px] font-bold text-slate-500 tracking-normal opacity-60">Payout 2.0x</span>
                 </button>
                 <button 
                  onClick={() => handleBet('Small')} 
                  className="rounded-3xl glass border-2 border-amber-500/50 bg-amber-500/5 text-amber-400 font-black text-2xl tracking-[0.2em] shadow-lg shadow-amber-500/10 active:scale-95 transition-all flex flex-col items-center justify-center space-y-2"
                 >
                   <span>SMALL</span>
                   <span className="text-[10px] font-bold text-slate-500 tracking-normal opacity-60">Payout 2.0x</span>
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result History Preview */}
      <div className="px-4 mt-8 space-y-4">
         <div className="flex items-center justify-between">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center">
             <HistoryIcon size={16} className="mr-2" /> Recent History
           </h3>
           <span className="text-[10px] font-bold text-slate-600">LAST 10 ROUNDS</span>
         </div>
         <div className="glass rounded-3xl overflow-hidden divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02]">
                 <div className="text-xs font-mono text-slate-500">202402010{gameHistory.length - idx}</div>
                 <div className="flex items-center space-x-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-inner ${idx % 2 === 0 ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                      {idx * 2 + 1}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">{idx % 2 === 0 ? 'Red' : 'Green'}</span>
                    <span className={`text-[10px] font-black uppercase ${idx % 3 === 0 ? 'text-amber-400' : 'text-indigo-400'}`}>
                      {idx % 3 === 0 ? 'Small' : 'Big'}
                    </span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Betting Modal */}
      {isBetting && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsBetting(false)}></div>
           <div className="relative glass w-full max-w-md p-8 rounded-[3rem] animate-slide-up border-t border-emerald-500/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-black mb-1">Bet Confirmation</h3>
              <p className="text-xs text-slate-500 mb-6">Predicton: <span className="text-emerald-400 font-black uppercase tracking-widest">{selectedBet}</span></p>
              
              <div className="grid grid-cols-4 gap-2 mb-8">
                 {[10, 50, 100, 500, 1000, 5000, 10000, 20000].map(amt => (
                   <button
                    key={amt}
                    onClick={() => setBetAmount(amt)}
                    className={`py-3 rounded-xl text-[10px] font-black border transition-all ${
                      betAmount === amt ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-105 shadow-lg shadow-emerald-500/20' : 'glass border-white/5 text-slate-400'
                    }`}
                   >
                     ₹{amt}
                   </button>
                 ))}
              </div>

              <div className="flex items-center justify-between mb-8 px-2 py-4 rounded-2xl bg-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Available</span>
                  <span className="text-xs font-black text-white">₹{user?.wallets.main}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Total Bet</span>
                  <span className="text-lg font-black text-emerald-400">₹{betAmount}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button onClick={() => setIsBetting(false)} className="flex-1 py-4 glass rounded-2xl text-slate-400 font-bold active:scale-95 transition-all text-sm uppercase tracking-widest">CANCEL</button>
                <button onClick={confirmBet} className="flex-2 w-2/3 py-4 bg-emerald-500 rounded-2xl text-slate-950 font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest">PLACE BET</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ColorGame;
