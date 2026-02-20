
import React from 'react';
import { useApp } from '../store';
import { History as HistoryIcon, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const HistoryView: React.FC = () => {
  const { transactions } = useApp();

  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-2xl glass text-emerald-400">
           <HistoryIcon size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black">ट्रांजेक्शन इतिहास</h1>
          <p className="text-xs text-slate-500">आपके सभी लेन-देन का विवरण</p>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map(txn => (
            <div key={txn.id} className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${txn.type === 'Deposit' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                     {txn.type === 'Deposit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                     <p className="text-sm font-bold text-white">{txn.type === 'Deposit' ? 'पैसे जमा किए' : 'पैसे निकाले'}</p>
                     <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase mt-0.5">
                        <Clock size={10} className="mr-1" />
                        {new Date(txn.timestamp).toLocaleDateString()}
                     </div>
                  </div>
               </div>
               <div className="text-right">
                  <p className={`text-sm font-black ${txn.type === 'Deposit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                     {txn.type === 'Deposit' ? '+' : '-'} ₹{txn.amount}
                  </p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                    txn.status === 'Approved' || txn.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' : 
                    txn.status === 'Pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                     {txn.status === 'Approved' ? 'सफल' : txn.status === 'Pending' ? 'पेंडिंग' : 'रिजेक्ट'}
                  </span>
               </div>
            </div>
          ))
        ) : (
          <div className="glass p-12 rounded-3xl flex flex-col items-center justify-center space-y-4 opacity-40">
             <HistoryIcon size={48} className="text-slate-600" />
             <p className="text-xs font-black uppercase tracking-widest text-slate-600">कोई ट्रांजेक्शन नहीं मिला</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
