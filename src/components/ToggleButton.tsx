import React from 'react';

interface ToggleButtonProps {
  label: string;
  description: string;
  isActive: boolean;
  onChange: (value: boolean) => void;
}

export default function ToggleButton({
  label,
  description,
  isActive,
  onChange,
}: ToggleButtonProps) {
  return (
    <div className="flex items-start space-x-3">
      <button
        onClick={() => onChange(!isActive)}
        className={`
          relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black
          ${isActive ? 'bg-gradient-to-r from-[#FF007A] to-[#FF66B2]' : 'bg-white/10'}
        `}
      >
        <span
          className={`
            absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out
            ${isActive ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      <div className="flex flex-col">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-white/60">{description}</span>
      </div>
    </div>
  );
}