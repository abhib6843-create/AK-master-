
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  initialSeconds: number;
  onFinish?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds, onFinish }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      if (onFinish) onFinish();
      setSeconds(initialSeconds);
      return;
    }
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, initialSeconds, onFinish]);

  const formatted = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold font-mono tracking-widest text-emerald-400 animate-pulse-slow">
        {formatted}
      </div>
      <div className="text-[10px] text-slate-500 uppercase font-semibold">Next Draw In</div>
    </div>
  );
};

export default Countdown;
