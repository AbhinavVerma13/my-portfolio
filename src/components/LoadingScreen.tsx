import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // slight delay after reaching 100% for transition
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 bg-[#050508] font-code"
    >
      <div className="flex justify-between text-xs text-neutral-500 tracking-wider">
        <span>AV_OS_V1.0</span>
        <span>STATUS: BOOTING_CORE</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-[6px] text-white">
            ABHINAV VERMA
          </h1>
          <p className="text-xs text-accent-cyan tracking-widest mt-2 uppercase">
            AI Automation & Agent Systems
          </p>
        </motion.div>

        <div className="w-48 h-[1px] bg-neutral-800 relative overflow-hidden mt-4">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-sm font-code text-neutral-400 mt-2">
          {Math.floor(progress)}%
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest">
        <span>loading static elements...</span>
        <span>© 2026 // systems online</span>
      </div>
    </motion.div>
  );
};
