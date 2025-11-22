import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ProcessingViewProps {
  originalImage: string;
}

const STATUS_MESSAGES = [
  "Analyzing facial features...",
  "Applying professional lighting...",
  "Enhancing background...",
  "Refining details...",
  "Polishing final look..."
];

export const ProcessingView: React.FC<ProcessingViewProps> = ({ originalImage }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  
  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        // Decelerating progress curve
        const increment = Math.max(0.5, (95 - prev) / 20);
        return prev + increment;
      });
    }, 100);

    // Status message rotation
    const statusInterval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto text-center animate-fade-in space-y-8 py-8">
      <div className="relative w-48 h-48 mx-auto">
        {/* Scanning effect container */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <img 
            src={originalImage} 
            alt="Processing" 
            className="w-full h-full object-cover opacity-50 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-indigo-900/20"></div>
          
          {/* Scanner line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-scan opacity-80"></div>
        </div>
        
        <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg animate-bounce">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">Working Magic</h3>
        <div className="h-6 overflow-hidden relative">
          <p 
            key={statusIndex}
            className="text-slate-500 animate-fade-in absolute w-full left-0"
          >
            {STATUS_MESSAGES[statusIndex]}
          </p>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-200 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};