
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store';
import Navigation from './components/Navigation';
import HomeView from './views/Home';
import GamesView from './views/Games';
import ColorGame from './views/ColorGame';
import SantaGame from './views/SantaGame';
import AviatorGame from './views/AviatorGame';
import DiceGame from './views/DiceGame';
import YesNoGame from './views/YesNoGame';
import ABBetGame from './views/ABBetGame';
import AdminPrediction from './views/AdminPrediction';
import FreeFire from './views/FreeFire';
import MinesGame from './views/MinesGame';
import DragonTiger from './views/DragonTiger';
import HeadTails from './views/HeadTails';
import TradingGame from './views/TradingGame';
import WalletView from './views/Wallet';
import HistoryView from './views/History';
import ProfileView from './views/Profile';
import AdminView from './views/Admin';
import { Smartphone, Lock, RefreshCw, UserPlus, LogIn, ShieldCheck, ArrowRight } from 'lucide-react';

const AuthView: React.FC = () => {
  const { setUser, setIsAdmin, setCurrentView } = useApp();
  const [isSignup, setIsSignup] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, [isSignup]);

  const handleAuth = () => {
    // Admin Master Access
    if (phone === '7725055354' && password === 'abhi@7725') {
      setIsAdmin(true);
      setUser({
        id: 'ADMIN_MASTER',
        phone: `+91 ${phone}`,
        referralCode: 'MASTER',
        kycStatus: 'Approved',
        wallets: { main: 999999, winning: 999999, bonus: 999999 }
      });
      setCurrentView('Admin');
      alert("एडमिन एक्सेस ग्रांटेड! स्वागत है मास्टर।");
      return;
    }

    if (phone.length < 10) return alert("कृपया सही मोबाइल नंबर डालें (10 अंक)");
    if (password.length < 6) return alert("पासवर्ड कम से कम 6 अक्षर का होना चाहिए");
    
    if (isSignup) {
      if (password !== confirmPassword) return alert("पासवर्ड मैच नहीं कर रहे हैं");
      if (captchaInput !== generatedCaptcha) {
        alert("कैप्चा कोड गलत है!");
        generateCaptcha();
        return;
      }
    }

    // Normal Login/Register Simulation
    setUser({
      id: 'AK' + Math.floor(Math.random() * 900000 + 100000),
      phone: `+91 ${phone}`,
      referralCode: 'AK777',
      kycStatus: 'None',
      wallets: { main: 0, winning: 0, bonus: 0 }
    });
    alert(isSignup ? "रजिस्ट्रेशन सफल!" : "लॉगिन सफल!");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-10 animate-fade-in relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      
      <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white text-5xl font-black shadow-[0_0_60px_rgba(79,70,229,0.4)] relative z-10 border-4 border-white/20 uppercase italic">AK</div>
      
      <div className="space-y-2 relative z-10">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">AK master</h1>
        <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">Professional Gaming Arena</p>
      </div>

      <div className="w-full max-w-sm space-y-4 relative z-10">
        <div className="glass p-5 rounded-3xl flex items-center border border-white/5 focus-within:border-indigo-500/50 transition-all">
          <Smartphone size={22} className="text-indigo-400 mr-4" />
          <span className="text-slate-500 font-black mr-2">+91</span>
          <input 
            type="tel" 
            placeholder="मोबाइल नंबर" 
            value={phone}
            maxLength={10}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            className="bg-transparent border-none outline-none text-white w-full font-black tracking-widest placeholder:text-slate-700" 
          />
        </div>

        <div className="glass p-5 rounded-3xl flex items-center border border-white/5 focus-within:border-indigo-500/50 transition-all">
          <Lock size={22} className="text-indigo-400 mr-4" />
          <input 
            type="password" 
            placeholder="पासवर्ड (Password)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full font-black placeholder:text-slate-700" 
          />
        </div>

        {isSignup && (
          <div className="space-y-4 animate-slide-up">
            <div className="glass p-5 rounded-3xl flex items-center border border-white/5 focus-within:border-indigo-500/50 transition-all">
              <ShieldCheck size={22} className="text-indigo-400 mr-4" />
              <input 
                type="password" 
                placeholder="पासवर्ड कन्फर्म करें" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full font-black placeholder:text-slate-700" 
              />
            </div>

            <div className="flex space-x-3">
              <div className="flex-1 glass p-5 rounded-3xl flex items-center border border-white/5">
                <input 
                  type="text" 
                  placeholder="CAPTCHA" 
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full font-black tracking-widest uppercase placeholder:text-slate-700" 
                />
              </div>
              <div className="w-32 glass rounded-3xl flex items-center justify-center border border-indigo-500/20 bg-indigo-500/5">
                <span className="text-xl font-black italic tracking-widest text-indigo-400">{generatedCaptcha}</span>
                <button onClick={generateCaptcha} className="ml-2 text-slate-500"><RefreshCw size={14} /></button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 flex flex-col space-y-4">
          <button 
            onClick={handleAuth} 
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-black rounded-[2rem] shadow-xl shadow-indigo-600/30 active:scale-95 transition-all text-lg flex items-center justify-center space-x-3 uppercase italic tracking-widest border border-white/10"
          >
            {isSignup ? <UserPlus size={24} /> : <LogIn size={24} />}
            <span>{isSignup ? 'रजिस्टर करें (SIGN UP)' : 'लॉगिन करें (LOGIN)'}</span>
          </button>

          <div className="flex items-center space-x-4">
             <div className="flex-1 h-[1px] bg-white/5"></div>
             <span className="text-[10px] font-black text-slate-600 uppercase">या फिर (OR)</span>
             <div className="flex-1 h-[1px] bg-white/5"></div>
          </div>

          <button 
            onClick={() => setIsSignup(!isSignup)} 
            className="w-full py-4 glass border border-white/5 text-[10px] font-black text-slate-400 hover:text-indigo-400 transition-all uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center space-x-2"
          >
            <span>{isSignup ? 'पहले से अकाउंट है? लॉगिन' : 'नया अकाउंट बनाएँ? रजिस्टर'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
      
      <div className="text-slate-800 flex items-center space-x-1">
        <ShieldCheck size={12} />
        <p className="text-[9px] font-black uppercase tracking-[0.3em]">AK master Secured v5.0</p>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentView, user } = useApp();
  if (!user) return <AuthView />;

  const renderView = () => {
    switch (currentView) {
      case 'Home': return <HomeView />;
      case 'Games': return <GamesView />;
      case 'ColorGame': return <ColorGame />;
      case 'SantaGame': return <SantaGame />;
      case 'Aviator': return <AviatorGame />;
      case 'Dice': return <DiceGame />;
      case 'YesNo': return <YesNoGame />;
      case 'ABBet': return <ABBetGame />;
      case 'AdminPrediction': return <AdminPrediction />;
      case 'FreeFire': return <FreeFire />;
      case 'MinesGame': return <MinesGame />;
      case 'DragonTiger': return <DragonTiger />;
      case 'HeadTails': return <HeadTails />;
      case 'TradingGame': return <TradingGame />;
      case 'Wallet': return <WalletView />;
      case 'History': return <HistoryView />;
      case 'Profile': return <ProfileView />;
      case 'Admin': return <AdminView />;
      default: return <HomeView />;
    }
  };

  const hideNav = ['ColorGame', 'Admin', 'SantaGame', 'Aviator', 'Dice', 'YesNo', 'ABBet', 'AdminPrediction', 'FreeFire', 'MinesGame', 'DragonTiger', 'HeadTails', 'TradingGame'].includes(currentView);

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto relative bg-slate-950 shadow-2xl overflow-hidden">
      <main className="animate-fade-in">{renderView()}</main>
      {!hideNav && <Navigation />}
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
