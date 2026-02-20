
export type GameMode = '30s' | '60s';

export interface User {
  id: string;
  phone: string;
  referralCode: string;
  kycStatus: 'Pending' | 'Approved' | 'Rejected' | 'None';
  wallets: {
    main: number;
    winning: number;
    bonus: number;
  };
}

export interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdraw' | 'GameBet' | 'GameWin' | 'Bonus';
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Success';
  timestamp: number;
  description: string;
}

export interface GameResult {
  periodId: string;
  number: number;
  color: 'red' | 'green' | 'violet';
  size: 'big' | 'small';
  timestamp: number;
}

export type BetType = 
  | 'Red' | 'Green' | 'Violet' | 'Big' | 'Small' | number 
  | 'SantaGift' | 'Aviator' | 'Dice' | 'YesNo' | 'AB' 
  | 'AdminYes' | 'AdminNo' | 'FF_Entry' | 'Mines' 
  | 'Dragon' | 'Tiger' | 'Tie' | 'Heads' | 'Tails'
  | 'Trade_UP' | 'Trade_DOWN' | 'Penalty_Goal';

export interface Bet {
  id: string;
  userId: string;
  periodId: string;
  amount: number;
  betOn: BetType;
  status: 'Pending' | 'Win' | 'Loss';
  payout?: number;
}

export type AppView = 
  | 'Home' | 'Games' | 'Wallet' | 'History' | 'Profile' | 'ColorGame' 
  | 'Admin' | 'SantaGame' | 'Aviator' | 'Dice' | 'YesNo' | 'ABBet' 
  | 'AdminPrediction' | 'FreeFire' | 'MinesGame' | 'DragonTiger' 
  | 'HeadTails' | 'TradingGame' | 'PenaltyGame';
