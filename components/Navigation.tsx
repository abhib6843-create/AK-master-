
import React from 'react';
import { Home, Gamepad2, Wallet, History, User } from 'lucide-react';
import { useApp } from '../store';
import { AppView } from '../types';

const Navigation: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const tabs: { label: AppView; icon: any }[] = [
    { label: 'Home', icon: Home },
    { label: 'Games', icon: Gamepad2 },
    { label: 'Wallet', icon: Wallet },
    { label: 'History', icon: History },
    { label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass h-20 px-4 flex items-center justify-between z-50 rounded-t-3xl border-t border-white/5">
      {tabs.map(({ label, icon: Icon }) => {
        const isActive = currentView === label || (label === 'Games' && currentView === 'ColorGame');
        return (
          <button
            key={label}
            onClick={() => setCurrentView(label)}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 w-16 ${
              isActive ? 'text-emerald-400 scale-110' : 'text-slate-400'
            }`}
          >
            <Icon size={24} className={isActive ? 'drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : ''} />
            <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
