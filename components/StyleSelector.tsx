import React from 'react';
import { HeadshotStyle } from '../types';
import { HEADSHOT_STYLES } from '../constants';
import { Check, Briefcase, Building2, Trees, Camera, Wand2, User } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyleId: string | null;
  onSelect: (style: HeadshotStyle) => void;
  customPrompt: string;
  onCustomPromptChange: (val: string) => void;
}

const IconMap: Record<string, React.FC<{ className?: string }>> = {
  'Briefcase': Briefcase,
  'Building2': Building2,
  'Trees': Trees,
  'Camera': Camera,
  'Wand2': Wand2,
  'User': User
};

export const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedStyleId, 
  onSelect, 
  customPrompt, 
  onCustomPromptChange 
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Choose your style</h2>
        <p className="text-slate-500">Select a professional look for your headshot</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HEADSHOT_STYLES.map((style) => {
          const Icon = IconMap[style.icon] || User;
          const isSelected = selectedStyleId === style.id;

          return (
            <div
              key={style.id}
              onClick={() => onSelect(style)}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 
                ${isSelected 
                  ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-100' 
                  : 'border-slate-200 hover:border-indigo-200 bg-white hover:shadow-md'
                }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-indigo-600 bg-white rounded-full p-1 shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl ${style.previewColor} flex items-center justify-center mb-4 text-white shadow-lg`}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="font-bold text-slate-900 mb-1">{style.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{style.description}</p>
            </div>
          );
        })}
      </div>

      {selectedStyleId === 'custom' && (
        <div className="mt-6 animate-fade-in">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Describe your desired edit
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            placeholder="e.g., 'Make me look like a superhero', 'Add a vintage film grain', 'Change background to a library'"
            className="w-full p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all h-32 resize-none"
          />
        </div>
      )}
    </div>
  );
};