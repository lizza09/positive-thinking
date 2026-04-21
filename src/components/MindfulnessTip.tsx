import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MindfulnessTip() {
  const [tip, setTip] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTip() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "請分享一段簡短、富有詩意且具有啟發性的正念呼吸小提示（繁體中文），大約 30 字以內。",
          config: {
            systemInstruction: "你是一位平靜的正念大師。你的文字應該溫暖、簡潔且充滿智慧。",
          }
        });
        setTip(response.text || '深呼吸，感受當下的平靜。');
      } catch (error) {
        console.error('Error fetching tip:', error);
        setTip('吸氣時，你知道自己在吸氣；呼氣時，你知道自己在呼氣。');
      } finally {
        setLoading(false);
      }
    }

    fetchTip();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-indigo-500/60 text-sm font-medium italic"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>平息雜念中...</span>
          </motion.div>
        ) : (
          <motion.div
            key="tip"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto p-6 rounded-3xl bg-white/30 border border-white/50 text-center shadow-sm backdrop-blur-md"
          >
            <p className="text-slate-700 leading-relaxed font-medium italic">
              「{tip}」
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
