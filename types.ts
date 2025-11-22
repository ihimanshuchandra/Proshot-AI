export interface HeadshotStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  previewColor: string;
  icon: string;
}

export interface GenerationState {
  status: 'idle' | 'uploading' | 'generating' | 'success' | 'error';
  error?: string;
}

export enum AppView {
  LANDING = 'LANDING',
  UPLOAD = 'UPLOAD',
  EDITOR = 'EDITOR',
  RESULT = 'RESULT',
}