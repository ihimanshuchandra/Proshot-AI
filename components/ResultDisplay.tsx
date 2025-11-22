import React, { useState } from 'react';
import { Download, RefreshCw, ArrowLeft, ArrowLeftRight, ExternalLink, Printer, FileText, Linkedin } from 'lucide-react';
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

      <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-slate-100 mb-8">
        <div className="relative w-full aspect-[1/1] md:aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden mb-8 group select-none">
          {/* Image Container */}
          <img 
            src={showOriginal ? originalImage : generatedImage} 
            alt="Headshot Result" 
            className="w-full h-full object-contain transition-opacity duration-200"
          />
          
          {/* Comparison Badge */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-all">
            {showOriginal ? 'Original Photo' : 'AI Generated'}
          </div>

          {/* Comparison Toggle Button (Floating) */}
          <button
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 px-5 py-2.5 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 transition-all active:scale-95 border border-slate-200/50"
          >
            <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
            Hold to Compare
          </button>
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

      {/* Monetization / Affiliate Section */}
      <div className="bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-indigo-600" />
          Maximize Your New Look
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Vistaprint */}
          <a 
            href="https://www.vistaprint.com/business-cards" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 hover:border-indigo-300 group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Print Business Cards</h4>
            <p className="text-xs text-slate-500">Get 20% off professional printing with Vistaprint.</p>
          </a>

          {/* Card 2: Resume.io */}
          <a 
            href="https://resume.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 hover:border-indigo-300 group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Build Your Resume</h4>
            <p className="text-xs text-slate-500">Update your CV with your new photo using Resume.io.</p>
          </a>

          {/* Card 3: LinkedIn */}
          <a 
            href="https://www.linkedin.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 hover:border-indigo-300 group"
          >
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 mb-3 group-hover:scale-110 transition-transform">
              <Linkedin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Update LinkedIn</h4>
            <p className="text-xs text-slate-500">Upload your new headshot to your professional profile.</p>
          </a>
        </div>
      </div>
    </div>
  );
};