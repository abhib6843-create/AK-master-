
import React, { useState, useEffect } from 'react';
import { useApp } from '../store';
import { ChevronLeft, ShieldAlert, Trophy, Loader2 } from 'lucide-react';

const AdminPrediction: React.FC = () => {
  const { setCurrentView, user, setUser, adminManualResult } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [prediction, setPrediction] = useState<'AdminYes' | 'AdminNo' | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleBet = () => {
    if (!prediction) return alert("Select HA (Yes) or NA (No)!");
    if (!user || user.wallets.main < betAmount) return alert("Insufficient Balance!");

    // Deduct bet
    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});
    setIsWaiting(true);
    setShowResult(false);
  };

  useEffect(() => {
    // If admin sets a result and user is waiting
    if (adminManualResult && isWaiting) {
      const predValue = prediction === 'AdminYes' ? 'YES' : 'NO';
      setIsWaiting(false);
      setShowResult(true);

      if (adminManualResult === predValue) {
        const win = betAmount * 1.95;
        setUser(prev => prev ? { ...prev, wallets: { ...prev.wallets, winning: prev.wallets.winning + win }} : null);
      }
    }
  }, [adminManualResult, isWaiting, prediction, betAmount, setUser]);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-6 text-center">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <div className="flex flex-col items-center">
            <span className="text-xs font-black text-emerald-400 flex items-center uppercase tracking-widest"><ShieldAlert size={12} className="mr-1" /> VIP Game</span>
            <h2 className="text-lg font-black text-white uppercase">Admin's Choice</h2>
        </div>
        <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-bold">
           <Trophy size={12} className="text-amber-400" /> ₹{user?.wallets.main}
        </div>
      </div>

      <div className="mb-8 p-6 glass rounded-3xl border border-emerald-500/20 bg-emerald-500/5">
         <p className="text-xs text-slate-400 font-bold uppercase mb-4">Current Prediction Phase</p>
         {isWaiting ? (
            <div className="flex flex-col items-center space-y-4 py-4">
               <Loader2 size={48} className="text-emerald-400 animate-spin" />
               <p className="text-sm font-black text-emerald-400 animate-pulse">WAITING FOR ADMIN TO DECLARE WINNER...</p>
            </div>
         ) : showResult ? (
            <div className="py-4 space-y-2">
               <p className="text-[10px] text-slate-500 font-bold uppercase">WINNER DECLARED</p>
               <h4 className={`text-4xl font-black ${adminManualResult === (prediction === 'AdminYes' ? 'YES' : 'NO') ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {adminManualResult === 'YES' ? 'हां (YES)' : 'ना (NO)'}
               </h4>
               <button onClick={() => {setShowResult(false); setPrediction(null);}} className="text-[10px] font-black text-slate-500 underline uppercase mt-4">Play Again</button>
            </div>
         ) : (
            <div className="py-4">
               <p className="text-lg font-black text-white">WILL THE ADMIN PICK 'YES' THIS TIME?</p>
               <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Place your bets below</p>
            </div>
         )}
      </div>

      <div className="space-y-8">
         <div className="flex justify-center space-x-6">
            <button 
                onClick={() => !isWaiting && setPrediction('AdminYes')} 
                disabled={isWaiting}
                className={`w-32 h-32 rounded-3xl border-4 font-black text-2xl transition-all flex flex-col items-center justify-center ${prediction === 'AdminYes' ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-105' : 'glass border-white/5 text-emerald-500'}`}
            >
                <span>हां</span>
                <span className="text-xs opacity-60">(YES)</span>
            </button>
            <button 
                onClick={() => !isWaiting && setPrediction('AdminNo')} 
                disabled={isWaiting}
                className={`w-32 h-32 rounded-3xl border-4 font-black text-2xl transition-all flex flex-col items-center justify-center ${prediction === 'AdminNo' ? 'bg-rose-500 border-rose-400 text-slate-950 scale-105' : 'glass border-white/5 text-rose-500'}`}
            >
                <span>ना</span>
                <span className="text-xs opacity-60">(NO)</span>
            </button>
         </div>

         <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <div className="grid grid-cols-4 gap-2">
               {[10, 50, 100, 500].map(a => (
                 <button key={a} onClick={() => !isWaiting && setBetAmount(a)} disabled={isWaiting} className={`py-2 rounded-lg text-xs font-bold ${betAmount === a ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500'}`}>₹{a}</button>
               ))}
            </div>
            <button onClick={handleBet} disabled={isWaiting || !prediction} className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/20 disabled:opacity-50">
               {isWaiting ? 'PLACED - WAITING...' : `BET ON ${prediction === 'AdminYes' ? 'हां' : 'ना'} FOR ₹${betAmount}`}
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminPrediction;
