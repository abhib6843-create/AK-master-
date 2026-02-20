
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Trophy, Grid3X3, Gem, Bomb, Zap } from 'lucide-react';

const MinesGame: React.FC = () => {
  const { setCurrentView, user, setUser } = useApp();
  const [betAmount, setBetAmount] = useState(10);
  const [minesCount, setMinesCount] = useState(3);
  const [grid, setGrid] = useState<('GEM' | 'BOMB' | null)[]>(new Array(25).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [bombPositions, setBombPositions] = useState<number[]>([]);

  const startNewGame = () => {
    if (!user || user.wallets.main < betAmount) return alert("Insufficient balance!");
    
    // Reset state
    const bombs: number[] = [];
    while (bombs.length < minesCount) {
      const pos = Math.floor(Math.random() * 25);
      if (!bombs.includes(pos)) bombs.push(pos);
    }

    setBombPositions(bombs);
    setGrid(new Array(25).fill(null));
    setIsGameOver(false);
    setRevealedCount(0);
    setIsGameActive(true);
    
    setUser({ ...user, wallets: { ...user.wallets, main: user.wallets.main - betAmount }});
  };

  const handleCellClick = (index: number) => {
    if (!isGameActive || isGameOver || grid[index]) return;

    if (bombPositions.includes(index)) {
      // BOOM!
      const newGrid = [...grid];
      bombPositions.forEach(pos => newGrid[pos] = 'BOMB');
      setGrid(newGrid);
      setIsGameOver(true);
      setIsGameActive(false);
    } else {
      // GEM!
      const newGrid = [...grid];
      newGrid[index] = 'GEM';
      setGrid(newGrid);
      setRevealedCount(prev => prev + 1);
    }
  };

  const cashOut = () => {
    if (!isGameActive || isGameOver || revealedCount === 0) return;
    
    const multiplier = 1 + (revealedCount * 0.2) + (minesCount * 0.1);
    const winAmount = Math.floor(betAmount * multiplier);

    if (user) {
      setUser({ ...user, wallets: { ...user.wallets, winning: user.wallets.winning + winAmount }});
    }

    alert(`CONGRATS! You won ₹${winAmount}`);
    setIsGameActive(false);
    setIsGameOver(true);
    // Show all bombs
    const newGrid = [...grid];
    bombPositions.forEach(pos => newGrid[pos] = 'BOMB');
    setGrid(newGrid);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-4 px-6 text-center">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-black text-amber-400 uppercase tracking-tighter italic">AK MINES</h2>
            <p className="text-[10px] text-slate-500 font-bold">REVEAL GEMS, AVOID BOMBS</p>
        </div>
        <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-bold">
           <Trophy size={12} className="text-amber-400" /> ₹{user?.wallets.main}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 max-w-[320px] mx-auto mb-8">
        {grid.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 transform ${
              cell === 'GEM' ? 'bg-emerald-500 scale-100' : 
              cell === 'BOMB' ? 'bg-rose-500 scale-105 shadow-lg shadow-rose-500/50' : 
              'glass hover:bg-white/5 active:scale-90 border border-white/5'
            }`}
          >
            {cell === 'GEM' && <Gem size={20} className="text-white" />}
            {cell === 'BOMB' && <Bomb size={20} className="text-white" />}
          </button>
        ))}
      </div>

      <div className="glass p-6 rounded-[2.5rem] space-y-6">
        <div className="flex justify-between items-center px-2">
           <div className="text-left">
              <p className="text-[9px] font-black text-slate-500 uppercase">Mines</p>
              <div className="flex space-x-2 mt-1">
                 {[1, 3, 5, 10].map(m => (
                   <button key={m} onClick={() => !isGameActive && setMinesCount(m)} className={`px-2 py-1 rounded text-[10px] font-black ${minesCount === m ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-500'}`}>{m}</button>
                 ))}
              </div>
           </div>
           <div className="text-right">
              <p className="text-[9px] font-black text-slate-500 uppercase">Current Payout</p>
              <p className="text-xl font-black text-emerald-400">{(1 + (revealedCount * 0.2) + (minesCount * 0.1)).toFixed(2)}x</p>
           </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
           {[10, 50, 100, 500].map(a => (
             <button key={a} onClick={() => !isGameActive && setBetAmount(a)} className={`py-2 rounded-xl text-[10px] font-black border transition-all ${betAmount === a ? 'bg-indigo-600 text-white border-indigo-400' : 'glass border-white/5 text-slate-500'}`}>₹{a}</button>
           ))}
        </div>

        {isGameActive ? (
          <button onClick={cashOut} className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex flex-col items-center">
            <span className="text-[10px] opacity-60">TAKE PROFIT</span>
            <span className="text-lg">₹{Math.floor(betAmount * (1 + (revealedCount * 0.2) + (minesCount * 0.1)))}</span>
          </button>
        ) : (
          <button onClick={startNewGame} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all uppercase tracking-widest italic">
            START MINING
          </button>
        )}
      </div>
    </div>
  );
};

export default MinesGame;
