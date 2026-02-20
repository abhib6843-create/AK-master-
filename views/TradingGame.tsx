
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Trophy, TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';

const TradingGame: React.FC = () => {
  const { setCurrentView, user, setUser, gameControls, setGameControls } = useApp();
  const [betAmount, setBetAmount] = useState(100);
  const [isTrading, setIsTrading] = useState(false);
  const [chartData, setChartData] = useState<number[]>(new Array(20).fill(50));
  const [currentPrice, setCurrentPrice] = useState(18450.65);
  const [prediction, setPrediction] = useState<'UP' | 'DOWN' | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10;
      setCurrentPrice(prev => parseFloat((prev + change).toFixed(2)));
      setChartData(prev => [...prev.slice(1), Math.max(10, Math.min(90, prev[prev.length - 1] + (Math.random() - 0.5) * 15))]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = (type: 'UP' | 'DOWN') => {
    if (!user || user.wallets.main < betAmount) return alert("Insufficient Balance!");
    setPrediction(type);
    setIsTrading(true);
    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});

    setTimeout(() => {
      // Admin Control Check
      const forcedResult = gameControls.tradeNext;
      const result = forcedResult || (Math.random() > 0.5 ? 'UP' : 'DOWN');
      
      if (gameControls.tradeNext) setGameControls({ ...gameControls, tradeNext: undefined });

      if (result === type) {
        const win = betAmount * 1.95;
        setUser(prev => prev ? { ...prev, wallets: { ...prev.wallets, winning: prev.wallets.winning + win }} : null);
        alert(`MARKET PROFIT! Result: ${result}`);
      } else {
        alert(`MARKET LOSS! Result: ${result}`);
      }
      setIsTrading(false);
      setPrediction(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-4 text-center">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-black text-emerald-400 uppercase tracking-tighter italic flex items-center">
              <Activity size={18} className="mr-2" /> SHARE BAZAR
            </h2>
            <p className="text-[9px] text-slate-500 font-bold">AK MASTER TRADING INDEX</p>
        </div>
        <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-bold">
           <Trophy size={12} className="text-amber-400" /> ₹{user?.wallets.main}
        </div>
      </div>

      <div className="glass p-6 rounded-[2.5rem] border border-white/5 mb-6 relative overflow-hidden bg-slate-900/50">
         <div className="flex justify-between items-start mb-8">
            <div className="text-left">
               <p className="text-[10px] font-black text-slate-500 uppercase">Live Nifty 50</p>
               <h3 className="text-3xl font-black text-white tracking-tighter">{currentPrice}</h3>
            </div>
            <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs">
               <TrendingUp size={14} /> <span>+0.45%</span>
            </div>
         </div>

         <div className="h-32 flex items-end space-x-1 px-2 mb-4">
            {chartData.map((val, i) => (
              <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm relative group" style={{ height: `${val}%` }}>
                 <div className="absolute inset-0 bg-indigo-400 opacity-20 group-last:opacity-100 group-last:bg-emerald-400"></div>
              </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <button 
           disabled={isTrading}
           onClick={() => handleTrade('UP')}
           className={`py-6 rounded-[2rem] border-4 flex flex-col items-center justify-center space-y-1 transition-all ${prediction === 'UP' ? 'bg-emerald-600 border-emerald-400 text-white scale-105' : 'glass border-emerald-500/20 text-emerald-400'}`}
         >
            <TrendingUp size={24} />
            <span className="text-sm font-black uppercase">TRADE UP</span>
         </button>
         <button 
           disabled={isTrading}
           onClick={() => handleTrade('DOWN')}
           className={`py-6 rounded-[2rem] border-4 flex flex-col items-center justify-center space-y-1 transition-all ${prediction === 'DOWN' ? 'bg-rose-600 border-rose-400 text-white scale-105' : 'glass border-rose-500/20 text-rose-400'}`}
         >
            <TrendingDown size={24} />
            <span className="text-sm font-black uppercase">TRADE DOWN</span>
         </button>
      </div>

      <div className="glass p-8 rounded-[3rem] space-y-6">
         <div className="grid grid-cols-4 gap-2">
            {[100, 500, 1000, 5000].map(a => (
              <button key={a} onClick={() => !isTrading && setBetAmount(a)} className={`py-3 rounded-xl text-[10px] font-black border transition-all ${betAmount === a ? 'bg-indigo-600 text-white border-indigo-400' : 'glass border-white/5 text-slate-500'}`}>₹{a}</button>
            ))}
         </div>
         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Prediction Time: 30 Seconds</p>
      </div>
    </div>
  );
};

export default TradingGame;
