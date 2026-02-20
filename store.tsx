
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Transaction, GameResult, AppView, Bet } from './types';

interface GameControls {
  colorNext?: { color: 'red' | 'green' | 'violet'; size: 'big' | 'small' };
  aviatorNext?: number;
  diceNext?: number;
  santaNext?: number;
  yesNoNext?: 'YES' | 'NO';
  abNext?: 'A' | 'B';
  tradeNext?: 'UP' | 'DOWN';
  dragonTigerNext?: 'Dragon' | 'Tiger' | 'Tie';
  sikkaNext?: 'Heads' | 'Tails';
  minesForce?: 'Win' | 'Loss';
}

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  approveTransaction: (txId: string) => void;
  gameHistory: GameResult[];
  addGameResult: (res: GameResult) => void;
  bets: Bet[];
  placeBet: (bet: Bet) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  gameControls: GameControls;
  setGameControls: (controls: GameControls) => void;
  autoModeEnabled: boolean;
  setAutoModeEnabled: (enabled: boolean) => void;
  adminManualResult: 'YES' | 'NO' | null;
  setAdminManualResult: (res: 'YES' | 'NO' | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('Home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [gameControls, setGameControls] = useState<GameControls>({});
  const [autoModeEnabled, setAutoModeEnabled] = useState(true);
  const [adminManualResult, setAdminManualResult] = useState<'YES' | 'NO' | null>(null);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const approveTransaction = (txId: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txId && t.status === 'Pending') {
        const updatedTx = { ...t, status: 'Success' as const };
        if (user && t.type === 'Deposit') {
          setUser({
            ...user,
            wallets: { ...user.wallets, main: user.wallets.main + t.amount }
          });
        }
        return updatedTx;
      }
      return t;
    }));
  };

  const addGameResult = (res: GameResult) => {
    setGameHistory(prev => [res, ...prev.slice(0, 49)]);
  };

  const placeBet = (bet: Bet) => {
    setBets(prev => [bet, ...prev]);
    if (user) {
      setUser({
        ...user,
        wallets: { ...user.wallets, main: user.wallets.main - bet.amount }
      });
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, currentView, setCurrentView, 
      transactions, addTransaction, approveTransaction, gameHistory, addGameResult,
      bets, placeBet, isAdmin, setIsAdmin,
      gameControls, setGameControls,
      autoModeEnabled, setAutoModeEnabled,
      adminManualResult, setAdminManualResult
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
