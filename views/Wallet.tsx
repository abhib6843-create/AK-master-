
import React, { useState } from 'react';
import { useApp } from '../store';
import { Wallet as WalletIcon, ArrowDownCircle, ArrowUpCircle, History, QrCode, CreditCard, Copy, ChevronRight, CheckCircle2, ArrowLeft, Building2, User, Landmark, ShieldCheck } from 'lucide-react';

const WalletView: React.FC = () => {
  const { user, setCurrentView, addTransaction } = useApp();
  const [activeTab, setActiveTab] = useState<'Deposit' | 'Withdraw'>('Deposit');
  const [amount, setAmount] = useState('125');
  const [useBank, setUseBank] = useState(false);
  const [utr, setUtr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updated UPI ID from @ybl to @ybi per user request
  const UPI_ID = "7725055354@ybi";
  const BANK_DETAILS = {
    holder: "Abhishek Kumar",
    account: "50200012345678",
    ifsc: "HDFC0001234",
    bankName: "HDFC BANK"
  };

  const handleDepositSubmit = () => {
    const depositAmt = parseInt(amount);
    if (isNaN(depositAmt) || depositAmt < 125) {
      alert("न्यूनतम जमा राशि ₹125 है! (Min Deposit is ₹125)");
      return;
    }
    if (utr.length < 10) {
      alert("कृपया सही 12-अंकों का UTR / Transaction ID डालें!");
      return;
    }
    setIsSubmitting(true);
    
    setTimeout(() => {
      addTransaction({
        id: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        type: 'Deposit',
        amount: depositAmt,
        status: 'Pending',
        timestamp: Date.now(),
        description: `${useBank ? 'BANK' : 'UPI'} UTR: ${utr}`
      });
      setIsSubmitting(false);
      setUtr('');
      alert("पेमेंट रिक्वेस्ट भेज दी गई है! एडमिन 30 मिनट में वेरीफाई करेगा।");
      setCurrentView('History');
    }, 1000);
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl glass text-indigo-400 border border-indigo-500/20">
             <WalletIcon size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase italic tracking-tighter">My Wallet</h1>
            <p className="text-xs text-slate-500 font-bold">AK Master Financials</p>
          </div>
        </div>
        <button onClick={() => setCurrentView('History')} className="p-2 rounded-xl glass text-slate-400"><History size={20} /></button>
      </div>

      {/* Balance Card */}
      <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 relative overflow-hidden">
         <div className="relative z-10">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Total Balance</p>
            <h2 className="text-4xl font-black text-white">₹{user?.wallets.main.toLocaleString()}.00</h2>
            <div className="mt-8 flex space-x-4">
               <div className="flex-1 bg-white/5 p-3 rounded-2xl">
                  <p className="text-[9px] text-emerald-500 font-black uppercase mb-1 tracking-widest">Winning</p>
                  <p className="text-lg font-black">₹{user?.wallets.winning}</p>
               </div>
               <div className="flex-1 bg-white/5 p-3 rounded-2xl">
                  <p className="text-[9px] text-amber-500 font-black uppercase mb-1 tracking-widest">Bonus</p>
                  <p className="text-lg font-black">₹{user?.wallets.bonus}</p>
               </div>
            </div>
         </div>
      </div>

      {/* Tab Selector */}
      <div className="glass p-1 rounded-2xl flex">
        {(['Deposit', 'Withdraw'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 rounded-xl flex items-center justify-center space-x-2 text-xs font-black transition-all ${
              activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'
            }`}
          >
            {tab === 'Deposit' ? <ArrowDownCircle size={14} /> : <ArrowUpCircle size={14} />}
            <span>{tab.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {activeTab === 'Deposit' ? (
        <div className="space-y-6 animate-fade-in pb-10">
           {/* Amount Selection */}
           <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Select Amount (Min ₹125)</h3>
              <div className="grid grid-cols-4 gap-2">
                 {['125', '500', '1000', '5000'].map(val => (
                   <button 
                    key={val} 
                    onClick={() => setAmount(val)} 
                    className={`py-3 rounded-xl text-xs font-black border transition-all ${amount === val ? 'bg-indigo-500/10 border-indigo-400 text-indigo-400' : 'glass border-white/5 text-slate-500'}`}
                   >
                     ₹{val}
                   </button>
                 ))}
              </div>
           </div>

           {/* Direct Payment UI */}
           <div className="glass p-6 rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Payment Details</span>
                <button 
                  onClick={() => setUseBank(!useBank)} 
                  className="text-[9px] font-black text-indigo-400 uppercase flex items-center space-x-1 border border-indigo-400/20 px-3 py-1 rounded-full bg-indigo-400/5"
                >
                  {useBank ? <QrCode size={12} /> : <Landmark size={12} />}
                  <span>{useBank ? 'Switch to UPI' : 'Switch to Bank'}</span>
                </button>
              </div>

              {!useBank ? (
                <div className="space-y-6 animate-fade-in">
                   <div className="bg-white p-4 rounded-3xl mx-auto w-fit shadow-xl border-4 border-emerald-500/20">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${UPI_ID}&pn=AK_Master&am=${amount}&cu=INR`} 
                        alt="QR" 
                        className="w-40 h-40" 
                      />
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] text-slate-500 font-black uppercase text-center">Scan QR or Copy ID</p>
                      <div className="flex items-center justify-between bg-indigo-500/5 p-4 rounded-2xl border border-white/5">
                         <span className="text-sm font-black text-emerald-400">{UPI_ID}</span>
                         <button 
                          onClick={() => {navigator.clipboard.writeText(UPI_ID); alert("UPI ID कॉपी हो गया!");}} 
                          className="p-2 text-indigo-400 active:scale-90 transition-transform"
                         >
                          <Copy size={20} />
                         </button>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                   <div className="p-5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] text-slate-500 font-bold uppercase">A/C Holder</span>
                         <span className="text-sm font-black text-white">{BANK_DETAILS.holder}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] text-slate-500 font-bold uppercase">Account No</span>
                         <div className="flex items-center">
                            <span className="text-sm font-black text-white mr-2">{BANK_DETAILS.account}</span>
                            <button onClick={() => {navigator.clipboard.writeText(BANK_DETAILS.account); alert("Account No Copied!");}} className="text-indigo-400"><Copy size={16} /></button>
                         </div>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] text-slate-500 font-bold uppercase">IFSC Code</span>
                         <div className="flex items-center">
                            <span className="text-sm font-black text-white mr-2">{BANK_DETAILS.ifsc}</span>
                            <button onClick={() => {navigator.clipboard.writeText(BANK_DETAILS.ifsc); alert("IFSC Copied!");}} className="text-indigo-400"><Copy size={16} /></button>
                         </div>
                      </div>
                      <div className="text-center pt-2 border-t border-white/5">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{BANK_DETAILS.bankName}</span>
                      </div>
                   </div>
                </div>
              )}

              {/* UTR Input Section */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                 <div className="text-left">
                    <p className="text-[10px] text-slate-500 font-black uppercase mb-2 px-2 flex justify-between">
                      <span>Enter Transaction ID / UTR</span>
                      <span className="text-emerald-500 italic">12 Digits Required</span>
                    </p>
                    <div className="glass p-1 rounded-2xl flex items-center border border-white/5 focus-within:border-emerald-500/30 transition-all">
                       <input 
                        type="text" 
                        value={utr}
                        maxLength={12}
                        onChange={(e) => setUtr(e.target.value.replace(/\W/g, ''))}
                        placeholder="UTR / REF Number" 
                        className="bg-transparent border-none outline-none p-4 text-center font-black tracking-[0.3em] text-white w-full uppercase placeholder:text-slate-700 placeholder:tracking-normal" 
                       />
                    </div>
                 </div>
                 <button 
                  onClick={handleDepositSubmit}
                  disabled={isSubmitting || utr.length < 5}
                  className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-3xl shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50 uppercase italic tracking-widest transition-all"
                 >
                   {isSubmitting ? 'VERIFYING...' : 'CONFIRM DEPOSIT'}
                 </button>
              </div>
           </div>

           <div className="flex items-center justify-center space-x-2 text-slate-600">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Secured Payment Gateway</span>
           </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
           {/* Withdrawal Destination */}
           <div className="glass p-6 rounded-3xl border border-white/5 bg-slate-900/40">
              <p className="text-[10px] text-slate-600 font-black uppercase mb-4 tracking-widest">Withdrawal Destination</p>
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-black italic shadow-lg">AK</div>
                    <div>
                       <p className="text-xs font-black text-white">{user?.phone}</p>
                       <p className="text-[9px] text-emerald-500 font-bold uppercase">Verified UPI Linked</p>
                    </div>
                 </div>
                 <button className="text-indigo-400 text-[10px] font-black uppercase">Edit</button>
              </div>
           </div>
           
           {/* Withdrawal Amount */}
           <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Enter Amount</h3>
              <div className="glass p-5 rounded-3xl border border-rose-500/10 bg-rose-500/5">
                 <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-black text-rose-400">₹</span>
                    <input type="number" placeholder="Min. 500" className="bg-transparent border-none outline-none text-3xl font-black text-white w-32 text-center" />
                 </div>
              </div>
           </div>

           <button className="w-full py-5 bg-rose-500 text-white font-black rounded-[2rem] shadow-xl shadow-rose-500/20 active:scale-95 transition-all uppercase italic tracking-widest">
             REQUEST WITHDRAWAL
           </button>
        </div>
      )}
    </div>
  );
};

export default WalletView;
