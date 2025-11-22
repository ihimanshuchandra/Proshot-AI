import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface ProcessingViewProps {
  originalImage: string;
}

const STATUS_MESSAGES = [
  "Analyzing facial structure...",
  "Applying professional studio lighting...",
  "Constructing realistic background...",
  "Adjusting depth of field...",
  "Refining texture and details...",
  "Polishing final image..."
];

export const ProcessingView: React.FC<ProcessingViewProps> = ({ originalImage }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  
  useEffect(() => {
    // Progress bar animation with a more natural curve
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        // Fast at start, slower at end
        const remaining = 100 - prev;
        const increment = Math.max(0.2, remaining * 0.05); 
        return prev + increment;
      });
    }, 150);

    // Rotate status messages
    const statusInterval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto text-center animate-fade-in py-12 px-4">
      <div className="relative w-48 h-48 mx-auto mb-10">
        {/* Scanning effect container */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl ring-1 ring-slate-200">
          <img 
            src={originalImage} 
            alt="Processing" 
            className="w-full h-full object-cover opacity-60 blur-[2px] scale-110"
          />
          <div className="absolute inset-0 bg-indigo-900/10"></div>
          
          {/* Scanner line */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 animate-scan shadow-[0_0_20px_rgba(99,102,241,0.4)]"></div>
        </div>
        
        <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-full shadow-lg animate-bounce border border-indigo-50">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
            Creating your Headshot
            <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
          </h3>
          <div className="h-6 relative overflow-hidden">
            <p 
              key={statusIndex}
              className="text-slate-500 text-sm font-medium animate-fade-in absolute w-full left-0 top-0"
            >
              {STATUS_MESSAGES[statusIndex]}
            </p>
          </div>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative p-[2px]">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-200 ease-out shadow-sm relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
          </div>
        </div>
        
        <p className="text-xs text-slate-400">
          Powered by Gemini 2.5 Flash
        </p>
      </div>
    </div>
  );
};