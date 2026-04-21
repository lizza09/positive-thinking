import { motion, AnimatePresence } from 'motion/react';
import { BreathingStage } from '../types';

interface BreathingCircleProps {
  stage: BreathingStage;
  totalDuration: number;
  remainingTime: number;
  isActive: boolean;
}

export default function BreathingCircle({ stage, totalDuration, remainingTime, isActive }: BreathingCircleProps) {
  const getScale = () => {
    switch (stage) {
      case 'In': return 1.5;
      case 'Hold': return 1.5;
      case 'Out': return 1;
      case 'Pause': return 1;
      default: return 1;
    }
  };

  const getLabel = () => {
    switch (stage) {
      case 'In': return '吸氣 (Inhale)';
      case 'Hold': return '憋氣 (Hold)';
      case 'Out': return '吐氣 (Exhale)';
      case 'Pause': return '暫停 (Pause)';
      default: return '';
    }
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
      {/* Outer Glow */}
      <motion.div
        animate={{
          scale: isActive ? getScale() : 1,
          opacity: isActive ? [0.1, 0.2, 0.1] : 0.1,
        }}
        transition={{ duration: totalDuration, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-indigo-500/20 blur-3xl"
      />

      {/* Main Circle */}
      <motion.div
        animate={{
          scale: isActive ? getScale() : 1,
        }}
        transition={{ 
          duration: totalDuration, 
          ease: stage === 'Hold' || stage === 'Pause' ? "linear" : "easeInOut" 
        }}
        className="relative z-10 w-full h-full rounded-full border border-white/50 flex items-center justify-center bg-white/40 backdrop-blur-xl shadow-[0_0_60px_rgba(165,180,252,0.3)]"
      >
        <div className="absolute inset-4 rounded-full border border-white/20" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center px-4"
          >
            <p className="text-xl font-semibold tracking-widest text-slate-800 mb-2">
              {getLabel()}
            </p>
            <p className="text-4xl font-bold text-indigo-600 timer-text italic">
              {remainingTime}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Pulsing rings */}
      {isActive && (stage === 'In' || stage === 'Out') && (
        <motion.div
          animate={{
            scale: [1, 2],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-full border border-indigo-400/40"
        />
      )}
    </div>
  );
}
