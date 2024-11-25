import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageDown, Paintbrush, Image, Scissors } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import Logo from '../components/Logo';

const tools = [
  {
    id: 'downscaler',
    name: 'Image Downscaler',
    description: 'Optimize image quality with advanced compression for JPEG and WebP.',
    icon: ImageDown,
    path: '/downscaler',
    available: true,
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove image backgrounds with AI-powered precision.',
    icon: Scissors,
    path: '/background-remover',
    available: false,
  },
  {
    id: 'color-enhancer',
    name: 'Color Enhancer',
    description: 'Enhance and adjust image colors professionally.',
    icon: Paintbrush,
    path: '/color-enhancer',
    available: false,
  },
  {
    id: 'thumbnail-generator',
    name: 'Thumbnail Generator',
    description: 'Create perfect thumbnails for any platform.',
    icon: Image,
    path: '/thumbnail-generator',
    available: false,
  },
];

export default function Hub() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <Logo className="mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Click Tools</h1>
        <p className="text-white/60">Your go-to suite for creative image tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            onClick={() => tool.available && navigate(tool.path)}
            available={tool.available}
          />
        ))}
      </div>

      <footer className="mt-16 text-center">
        <p className="text-sm text-white/60">
          Powered by{' '}
          <span className="text-pink-500 border-b border-transparent hover:border-pink-500 transition-all duration-300">
            Click Tools
          </span>
          <span className="ml-2 text-white/40">v1.0</span>
        </p>
      </footer>
    </div>
  );
}