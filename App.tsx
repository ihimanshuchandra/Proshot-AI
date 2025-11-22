import React, { useState, useRef } from 'react';
import { UploadSection } from './components/UploadSection';
import { StyleSelector } from './components/StyleSelector';
import { ProcessingView } from './components/ProcessingView';
import { ResultDisplay } from './components/ResultDisplay';
import { Button } from './components/Button';
import { AppView, HeadshotStyle } from './types';
import { generateEditedImage } from './services/geminiService';
import { Camera, ChevronRight, Sparkles, Coffee, CheckCircle, Zap, Shield, User } from 'lucide-react';

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

    const finalPrompt = selectedStyle.id === 'custom' 
      ? customPrompt 
      : selectedStyle.prompt;

    if (!finalPrompt) {
      setError("Please enter a description for your custom style.");
      return;
    }

    setError(null);
    
    // Show loading UI
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

            {/* SEO Content Section */}
            <div className="w-full max-w-5xl mx-auto mt-32 text-left space-y-24 pb-12">
              
              {/* Features Grid */}
              <section>
                <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why use ProShot AI?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Results</h3>
                    <p className="text-slate-500">No waiting days for a photographer to edit photos. Get your professional headshot in under 30 seconds.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Privacy First</h3>
                    <p className="text-slate-500">We process everything in your browser session. Your photos are not stored on our servers.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Studio Quality</h3>
                    <p className="text-slate-500">Powered by Google's Gemini 2.5 Flash, our AI understands lighting, composition, and attire.</p>
                  </div>
                </div>
              </section>

              {/* How it works */}
              <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-lg">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">How to generate a professional headshot</h2>
                    <ol className="space-y-6">
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                          <h4 className="font-bold text-slate-900">Upload a casual photo</h4>
                          <p className="text-slate-500 text-sm">Selfies work best. Ensure your face is well-lit and clearly visible.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                          <h4 className="font-bold text-slate-900">Choose your style</h4>
                          <p className="text-slate-500 text-sm">Select from Corporate, Modern Tech, Outdoor, or create a Custom style.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                          <h4 className="font-bold text-slate-900">Download & Impress</h4>
                          <p className="text-slate-500 text-sm">Get your high-resolution headshot instantly. Perfect for LinkedIn or your CV.</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl transform rotate-3 opacity-20"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                      alt="Professional Business Woman Headshot" 
                      className="relative rounded-2xl shadow-xl"
                    />
                  </div>
                </div>
              </section>

              {/* FAQ for SEO */}
              <section className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Is this AI headshot generator free?</h3>
                    <p className="text-slate-600">Yes, ProShot AI uses advanced generative technology to create professional photos at no cost to you.</p>
                  </div>
                  <div className="border-b border-slate-200 pb-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">What makes a good photo for AI generation?</h3>
                    <p className="text-slate-600">For the best AI headshot results, upload a photo where your face is unobstructed, the lighting is even (no harsh shadows), and you are looking directly at the camera.</p>
                  </div>
                  <div className="border-b border-slate-200 pb-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Can I use these photos for LinkedIn?</h3>
                    <p className="text-slate-600">Absolutely. The "Corporate" and "Modern Tech" styles are specifically tuned to meet the professional standards required for LinkedIn profiles.</p>
                  </div>
                </div>
              </section>

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
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
      <header ref={headerRef} className="w-full py-6 px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto shrink-0">
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
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12 grow w-full flex flex-col">
        {error && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-600 px-6 py-3 rounded-full shadow-lg z-50 animate-shake flex items-center gap-2 border border-red-100">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {error}
          </div>
        )}
        
        {renderContent()}
      </main>
      
      {/* Footer / Support Section */}
      <footer className="w-full py-8 border-t border-slate-200 bg-white shrink-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 ProShot AI. Free to use for everyone.
          </p>
          
          <a 
            href="https://www.buymeacoffee.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-sm"
          >
            <Coffee className="w-4 h-4" />
            Support the Developer
          </a>
        </div>
      </footer>
    </div>
  );
}