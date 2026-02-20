
import React, { useState } from 'react';
import { useApp } from '../store';
import { ChevronLeft, Trophy, Swords, Map, User, Clock, ShieldCheck } from 'lucide-react';

const FreeFire: React.FC = () => {
  const { setCurrentView, user, setUser } = useApp();
  const [joinedMatches, setJoinedMatches] = useState<string[]>([]);

  const matches = [
    { id: 'FF001', title: 'Daily Booyah! Solo', fee: 50, prize: 500, type: 'SOLO', map: 'Bermuda', time: '18:00', perKill: 5 },
    { id: 'FF002', title: 'Weekend Clash Duo', fee: 100, prize: 1500, type: 'DUO', map: 'Purgatory', time: '20:30', perKill: 10 },
    { id: 'FF003', title: 'Squad Pro League', fee: 200, prize: 5000, type: 'SQUAD', map: 'Kalahari', time: '22:00', perKill: 20 },
  ];

  const handleJoin = (matchId: string, fee: number) => {
    if (!user) return;
    if (user.wallets.main < fee) {
      alert("Insufficient Balance!");
      return;
    }
    if (joinedMatches.includes(matchId)) {
      alert("Already Joined!");
      return;
    }

    if (confirm(`Join this match for ₹${fee}? ID & Password will be shared 15 min before match.`)) {
      setUser({
        ...user,
        wallets: { ...user.wallets, main: user.wallets.main - fee }
      });
      setJoinedMatches([...joinedMatches, matchId]);
      alert("Successfully joined the tournament!");
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 bg-slate-950">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentView('Games')} className="p-2 glass rounded-full text-white"><ChevronLeft size={20} /></button>
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-black text-orange-500 uppercase flex items-center">
              <Swords className="mr-2" size={24} /> FREE FIRE TOURNAMENTS
            </h2>
        </div>
        <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-bold">
           <Trophy size={12} className="text-amber-400" /> ₹{user?.wallets.main}
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass p-4 rounded-2xl flex items-center justify-between border border-orange-500/20 bg-orange-500/5">
           <div className="flex items-center space-x-3">
              <ShieldCheck className="text-orange-500" size={24} />
              <div className="text-left">
                 <p className="text-xs font-black">Admin Verified Room</p>
                 <p className="text-[10px] text-slate-400">Result will be updated manually by admin</p>
              </div>
           </div>
        </div>

        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest px-2">Upcoming Matches</h3>

        {matches.map(m => (
          <div key={m.id} className="glass rounded-[2rem] overflow-hidden border border-white/5">
             <div className="bg-gradient-to-r from-orange-600/20 to-transparent p-5 flex justify-between items-start">
                <div className="space-y-1 text-left">
                   <h4 className="text-lg font-black">{m.title}</h4>
                   <div className="flex space-x-3">
                      <div className="flex items-center text-[10px] text-slate-400"><Map size={10} className="mr-1" /> {m.map}</div>
                      <div className="flex items-center text-[10px] text-slate-400"><User size={10} className="mr-1" /> {m.type}</div>
                      <div className="flex items-center text-[10px] text-orange-400 font-bold"><Clock size={10} className="mr-1" /> {m.time}</div>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Entry Fee</p>
                   <p className="text-xl font-black text-emerald-400">₹{m.fee}</p>
                </div>
             </div>
             
             <div className="p-5 flex justify-between items-center border-t border-white/5">
                <div className="flex space-x-6">
                   <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase">Prize Pool</p>
                      <p className="text-sm font-bold text-amber-400">₹{m.prize}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase">Per Kill</p>
                      <p className="text-sm font-bold text-white">₹{m.perKill}</p>
                   </div>
                </div>
                <button 
                  onClick={() => handleJoin(m.id, m.fee)}
                  disabled={joinedMatches.includes(m.id)}
                  className={`px-8 py-3 rounded-xl font-black text-xs uppercase transition-all ${
                    joinedMatches.includes(m.id) 
                      ? 'bg-slate-800 text-slate-500' 
                      : 'bg-orange-600 text-white shadow-lg shadow-orange-600/20 active:scale-95'
                  }`}
                >
                  {joinedMatches.includes(m.id) ? 'JOINED' : 'JOIN MATCH'}
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 glass rounded-2xl border border-white/5 space-y-4 text-left">
         <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Tournament Rules</h4>
         <ul className="text-[10px] text-slate-500 space-y-2 list-disc pl-4">
            <li>Hacking is strictly prohibited. ID will be banned.</li>
            <li>Results will be verified by admin via screenshots.</li>
            <li>Winnings will be credited to winning wallet after verification.</li>
            <li>Minimum entry ₹50. Room ID shared 15 mins before start.</li>
         </ul>
      </div>
    </div>
  );
};

export default FreeFire;
