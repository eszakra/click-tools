import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  available: boolean;
}

export default function ToolCard({
  name,
  description,
  icon: Icon,
  onClick,
  available,
}: ToolCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border border-white/10 p-6
        transition-all duration-300
        ${available ? 'cursor-pointer hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/10' : 'opacity-50 cursor-not-allowed'}
        bg-gradient-to-br from-black/40 to-black/20
      `}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 p-3">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-sm text-white/60 mb-4">{description}</p>
          <button
            className={`
              text-sm px-4 py-2 rounded-lg font-medium
              transition-all duration-300
              ${available
                ? 'bg-gradient-to-r from-[#FF007A] to-[#FF66B2] text-white hover:shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/10 text-white/40'
              }
            `}
            disabled={!available}
          >
            {available ? 'Open Tool' : 'Coming Soon'}
          </button>
        </div>
      </div>
    </div>
  );
}