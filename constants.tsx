import { HeadshotStyle } from './types';
import { Briefcase, Building2, Trees, Camera, Wand2, User } from 'lucide-react';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional grey backdrop, business suit, perfect for LinkedIn.',
    prompt: 'Edit this image to be a professional corporate headshot. Change background to a clean, neutral grey studio backdrop. Change clothing to a sharp, dark business suit. Maintain facial features strictly. Professional lighting, 8k resolution.',
    previewColor: 'bg-slate-700',
    icon: 'Briefcase'
  },
  {
    id: 'tech',
    name: 'Modern Tech',
    description: 'Bright modern office background, smart casual attire.',
    prompt: 'Edit this image to be a modern tech industry headshot. Change background to a blurred, bright modern office with glass and light wood. Change clothing to high-end smart casual (e.g., blazer over t-shirt or quality sweater). Maintain facial features strictly. Soft, natural lighting.',
    previewColor: 'bg-blue-600',
    icon: 'Building2'
  },
  {
    id: 'outdoor',
    name: 'Natural Light',
    description: 'Outdoor setting with soft bokeh, approachable vibe.',
    prompt: 'Edit this image to be an approachable outdoor headshot. Change background to a soft-focus park or nature scene with beautiful bokeh. Change clothing to nice casual attire. Maintain facial features strictly. Golden hour lighting, warm tones.',
    previewColor: 'bg-green-600',
    icon: 'Trees'
  },
  {
    id: 'studio-bw',
    name: 'Studio B&W',
    description: 'High contrast black and white artistic portrait.',
    prompt: 'Edit this image to be an artistic black and white studio portrait. Change background to pure black. High contrast lighting, dramatic shadows. Maintain facial features strictly. Monochrome, elegant.',
    previewColor: 'bg-zinc-900',
    icon: 'Camera'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant colorful background, bold artistic lighting.',
    prompt: 'Edit this image to be a creative professional headshot. Change background to a solid vibrant color (like teal or coral) with studio lighting. Change clothing to stylish, modern creative wear. Maintain facial features strictly.',
    previewColor: 'bg-purple-600',
    icon: 'Wand2'
  },
  {
    id: 'custom',
    name: 'Custom Edit',
    description: 'Describe your own style or edit request.',
    prompt: '', // Populated by user input
    previewColor: 'bg-indigo-600',
    icon: 'User'
  }
];