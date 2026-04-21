export type BreathingStage = 'In' | 'Hold' | 'Out' | 'Pause';

export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  steps: {
    stage: BreathingStage;
    duration: number; // in seconds
    cue: string;
  }[];
  color: string;
}

export const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: 'box',
    name: '箱式呼吸 (Box Breathing)',
    description: '重置神經系統，減少壓力，提高專注力。',
    steps: [
      { stage: 'In', duration: 4, cue: '吸氣... 想像空氣填滿胸腔' },
      { stage: 'Hold', duration: 4, cue: '屏住呼吸... 保持平靜' },
      { stage: 'Out', duration: 4, cue: '慢慢呼氣... 釋放壓力' },
      { stage: 'Pause', duration: 4, cue: '暫停... 感受靜謐' },
    ],
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: '478',
    name: '4-7-8 呼吸法',
    description: '深層放鬆，有助於減輕焦慮並幫助入眠。',
    steps: [
      { stage: 'In', duration: 4, cue: '靜靜吸氣...' },
      { stage: 'Hold', duration: 7, cue: '屏氣，讓身體吸收能量...' },
      { stage: 'Out', duration: 8, cue: '呼氣，發出嘶嘶聲，釋放所有緊張' },
    ],
    color: 'from-purple-400 to-indigo-400',
  },
  {
    id: 'relax',
    name: '放鬆呼吸 (Relaxation)',
    description: '簡單的節奏，適合快速平復情緒。',
    steps: [
      { stage: 'In', duration: 4, cue: '吸氣...' },
      { stage: 'Out', duration: 6, cue: '呼氣，比吸氣更長一點...' },
    ],
    color: 'from-emerald-400 to-teal-400',
  },
];
