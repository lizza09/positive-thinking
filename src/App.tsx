import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Settings, X, Timer as TimerIcon } from 'lucide-react';
import { BREATHING_PATTERNS, BreathingPattern, BreathingStage } from './types';
import BreathingCircle from './components/BreathingCircle';
import MindfulnessTip from './components/MindfulnessTip';

export default function App() {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeftInStep, setTimeLeftInStep] = useState(0);
  const [totalSessionTime, setTotalSessionTime] = useState(300); // Default 5 mins
  const [elapsedTime, setElapsedTime] = useState(0);

  const startSession = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
    setCurrentStepIndex(0);
    setTimeLeftInStep(pattern.steps[0].duration);
    setIsActive(true);
    setElapsedTime(0);
  };

  const stopSession = () => {
    setIsActive(false);
    setSelectedPattern(null);
  };

  const togglePause = () => setIsActive(!isActive);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && selectedPattern) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        setTimeLeftInStep(prev => {
          if (prev <= 1) {
            const nextIndex = (currentStepIndex + 1) % selectedPattern.steps.length;
            setCurrentStepIndex(nextIndex);
            return selectedPattern.steps[nextIndex].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, selectedPattern, currentStepIndex]);

  // Handle session auto-stop if needed (future feature)

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500/30">
      <div className="mesh-bg" />
      
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {!selectedPattern ? (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl w-full text-center space-y-12"
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold tracking-tight text-indigo-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  MindfulBreath
                </motion.h1>
                <p className="text-slate-600 text-lg max-w-xl mx-auto">
                  深呼吸，專注當下。選擇一個適合您的呼吸練習。
                </p>
              </div>

              <MindfulnessTip />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BREATHING_PATTERNS.map((pattern, index) => (
                  <motion.button
                    key={pattern.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 3) }}
                    onClick={() => startSession(pattern)}
                    className="glass-card p-8 group hover:bg-white/40 transition-all duration-500 text-left space-y-4 shadow-sm"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${pattern.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                    <h3 className="text-xl font-semibold text-slate-800">{pattern.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {pattern.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="session"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-12 w-full max-w-2xl"
            >
              {/* Header Info */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">{selectedPattern.name}</h2>
                <div className="flex items-center justify-center gap-4 text-indigo-500/60 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <TimerIcon size={14} />
                    <span>已練習 {formatTime(elapsedTime)}</span>
                  </div>
                </div>
              </div>

              {/* Central Visualizer */}
              <div className="flex-1 flex flex-col items-center justify-center py-8 space-y-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStepIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="text-slate-600 text-lg md:text-xl font-medium text-center h-8"
                  >
                    {selectedPattern.steps[currentStepIndex].cue}
                  </motion.p>
                </AnimatePresence>
                <BreathingCircle 
                  stage={selectedPattern.steps[currentStepIndex].stage} 
                  totalDuration={selectedPattern.steps[currentStepIndex].duration}
                  remainingTime={timeLeftInStep}
                  isActive={isActive}
                />
              </div>

              {/* Progress dots */}
              <div className="flex gap-2">
                {selectedPattern.steps.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStepIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-indigo-200'
                    }`}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-8">
                <button 
                  onClick={stopSession}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/40 border border-white/60 hover:bg-white/60 text-slate-600 shadow-sm transition-colors"
                >
                  <X size={20} />
                </button>
                
                <button 
                  onClick={togglePause}
                  className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>

                <button 
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setTimeLeftInStep(selectedPattern.steps[0].duration);
                    setElapsedTime(0);
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/40 border border-white/60 hover:bg-white/60 text-slate-600 shadow-sm transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-8 left-0 right-0 z-20 text-center">
        <p className="text-slate-400 text-xs tracking-[0.3em] uppercase font-medium">
          Find your peace • MindfulBreath
        </p>
      </footer>
    </div>
  );
}
