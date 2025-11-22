import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface UploadSectionProps {
  onImageSelect: (file: File, previewUrl: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    setError(null);
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size is too large. Please upload an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [onImageSelect]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div
        className={`relative group border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' 
            : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 bg-white'
          } shadow-sm`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
          <div className={`p-4 rounded-2xl transition-colors duration-300 ${isDragging ? 'bg-indigo-100' : 'bg-indigo-50 group-hover:bg-indigo-100'}`}>
            <Upload className={`w-10 h-10 ${isDragging ? 'text-indigo-600' : 'text-indigo-500'}`} />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-slate-900">
              Upload your selfie
            </h3>
            <p className="text-slate-500">
              Drag & drop or click to browse
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
            <ImageIcon className="w-3 h-3" />
            <span>Supports JPG, PNG, WebP up to 5MB</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
};