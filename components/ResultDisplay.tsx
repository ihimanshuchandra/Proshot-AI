import React, { useState } from 'react';
import { Download, RefreshCw, ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { Button } from './Button';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
  onTryAnother: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  originalImage, 
  generatedImage, 
  onReset,
  onTryAnother
}) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `proshot-headshot-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up pb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Your New Look</h2>
        <Button variant="ghost" onClick={onReset} className="text-sm">
          Start Over
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-slate-100">
        <div className="relative w-full aspect-[1/1] md:aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden mb-8 group">
          <img 
            src={showOriginal ? originalImage : generatedImage} 
            alt="Headshot Result" 
            className="w-full h-full object-contain"
          />
          
          {/* Comparison Toggle Button */}
          <button
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 hover:bg-white transition-all select-none active:scale-95"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Hold to Compare
          </button>
          
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
            {showOriginal ? 'Original' : 'Generated'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownload} icon={<Download className="w-5 h-5" />}>
            Download HD
          </Button>
          <Button variant="secondary" onClick={onTryAnother} icon={<RefreshCw className="w-5 h-5" />}>
            Try Another Style
          </Button>
          <Button variant="outline" onClick={onReset} icon={<ArrowLeft className="w-5 h-5" />}>
            New Upload
          </Button>
        </div>
      </div>
    </div>
  );
};