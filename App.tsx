import React, { useState, useRef } from 'react';
import { UploadSection } from './components/UploadSection';
import { StyleSelector } from './components/StyleSelector';
import { ProcessingView } from './components/ProcessingView';
import { ResultDisplay } from './components/ResultDisplay';
import { Button } from './components/Button';
import { AppView, HeadshotStyle } from './types';
import { generateEditedImage } from './services/geminiService';
import { Camera, ChevronRight, Sparkles } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setOriginalImage(previewUrl);
    setView(AppView.UPLOAD);
    setTimeout(() => {
        // Small delay for smooth transition animation
        setView(AppView.EDITOR);
    }, 500);
  };

  const handleStyleSelect = (style: HeadshotStyle) => {
    setSelectedStyle(style);
  };

  const handleGenerate = async () => {
    if (!originalImage || !selectedStyle) return;

    setView(AppView.RESULT); // We'll use a sub-state effectively by showing processing content
    // But strictly speaking, let's create a PROCESSING view if we want to be cleaner,
    // Or just conditionally render in RESULT view. 
    // Let's add a temporary processing state variable for clarity or map View to 'PROCESSING'
    // Re-mapping View to generic 'PROCESSING' isn't in the Enum, let's just use a conditional return 
    // or add a loading state.
    // Actually, I'll just handle it inside the component render logic below for 'RESULT' when image is null?
    // No, let's add a dedicated visual state.
    
    // Simple state machine approach:
    // View: EDITOR -> (Generating) -> RESULT
    
    const finalPrompt = selectedStyle.id === 'custom' 
      ? customPrompt 
      : selectedStyle.prompt;

    if (!finalPrompt) {
      setError("Please enter a description for your custom style.");
      return;
    }

    setError(null);
    
    // Show loading UI
    // For now, I'll use a separate state variable to indicate loading over the RESULT view
    // or just switch to a "PROCESSING" view if I update the Enum.
    // Let's just render the ProcessingView when generating is true.
    const isProcessing = true; // Local variable won't work for render, using generatedImage === null check in RESULT view? 
    // Let's update the view to a new one I'll add implicitly or just conditionally render.
    
    // Let's assume specific view for processing to keep App clean
    // I'll use a specialized "PROCESSING" string cast for internal state if needed, or better:
    // Add proper loading handling.
    
    // Let's set view to RESULT, but generatedImage is null, so ResultDisplay shows ProcessingView.
    setView(AppView.RESULT);
    setGeneratedImage(null); // Ensure it's null to trigger loading state

    try {
      const result = await generateEditedImage(originalImage, finalPrompt);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
      setView(AppView.EDITOR); // Go back
    }
  };

  const resetApp = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setSelectedStyle(null);
    setCustomPrompt('');
    setError(null);
    setView(AppView.LANDING);
  };

  const tryAnotherStyle = () => {
    setGeneratedImage(null);
    setView(AppView.EDITOR);
  };

  // --- Render Logic ---

  const renderContent = () => {
    switch (view) {
      case AppView.LANDING:
        return (
          <div className="flex flex-col items-center text-center space-y-8 pt-12 animate-fade-in-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div>
              <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-indigo-50">
                <Camera className="w-16 h-16 text-indigo-600" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Powered
              </div>
            </div>
            
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Professional Headshots <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  from Casual Selfies
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Skip the expensive studio. Upload a selfie and let our AI transform it into a high-quality professional profile picture in seconds.
              </p>
            </div>

            <div className="pt-8 w-full max-w-xl">
               <UploadSection onImageSelect={handleImageSelect} />
            </div>

            <div className="pt-12 flex gap-8 text-slate-400 text-sm font-medium">
               <span>TRUSTED FOR</span>
               <div className="flex gap-6">
                 <span>LinkedIn</span>
                 <span>Resumes</span>
                 <span>Company Profiles</span>
                 <span>Portfolios</span>
               </div>
            </div>
          </div>
        );

      case AppView.UPLOAD:
        return (
           <div className="flex flex-col items-center justify-center min-h-[400px]">
              <ProcessingView originalImage={originalImage || ''} /> {/* Just a transition placeholder */}
           </div>
        );

      case AppView.EDITOR:
        return (
          <div className="flex flex-col lg:flex-row gap-12 items-start animate-fade-in pt-8">
            <div className="w-full lg:w-1/3 space-y-6 sticky top-8">
              <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100">
                 <img 
                   src={originalImage!} 
                   alt="Original" 
                   className="w-full h-auto rounded-2xl" 
                 />
                 <div className="mt-4 text-center">
                    <button 
                      onClick={resetApp}
                      className="text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                    >
                      Change Photo
                    </button>
                 </div>
              </div>
              
              <div className="hidden lg:block bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Pro Tip
                </h4>
                <p className="text-indigo-800/80 text-sm">
                  For best results, use a photo with good lighting where your face is clearly visible and not covered by accessories.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-2/3 pb-24">
               <StyleSelector 
                 selectedStyleId={selectedStyle?.id || null}
                 onSelect={handleStyleSelect}
                 customPrompt={customPrompt}
                 onCustomPromptChange={setCustomPrompt}
               />
               
               <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 flex justify-center lg:sticky lg:bottom-4 lg:rounded-2xl lg:border lg:shadow-xl lg:mt-8 z-50">
                 <div className="w-full max-w-md">
                   <Button 
                     onClick={handleGenerate} 
                     disabled={!selectedStyle || (selectedStyle.id === 'custom' && !customPrompt.trim())}
                     className="w-full"
                     icon={<Sparkles className="w-5 h-5" />}
                   >
                     Generate Headshot
                   </Button>
                 </div>
               </div>
            </div>
          </div>
        );

      case AppView.RESULT:
        if (!generatedImage) {
          return (
             <div className="pt-12">
                <ProcessingView originalImage={originalImage!} />
             </div>
          );
        }
        return (
          <ResultDisplay 
            originalImage={originalImage!}
            generatedImage={generatedImage}
            onReset={resetApp}
            onTryAnother={tryAnotherStyle}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      {/* Header */}
      <header ref={headerRef} className="w-full py-6 px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={view !== AppView.LANDING ? resetApp : undefined}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">ProShot AI</span>
        </div>
        
        {view !== AppView.LANDING && (
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <span className={view === AppView.EDITOR ? "text-indigo-600" : ""}>Edit</span>
            <ChevronRight className="w-4 h-4" />
            <span className={view === AppView.RESULT ? "text-indigo-600" : ""}>Result</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        {error && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-600 px-6 py-3 rounded-full shadow-lg z-50 animate-shake flex items-center gap-2 border border-red-100">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {error}
          </div>
        )}
        
        {renderContent()}
      </main>
    </div>
  );
}