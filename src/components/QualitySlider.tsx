interface QualitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QualitySlider({ value, onChange }: QualitySliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Quality</label>
        <span className="text-sm text-white/60">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gradient-to-r
          [&::-webkit-slider-thumb]:from-[#FF007A]
          [&::-webkit-slider-thumb]:to-[#FF66B2]
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-pink-500/20
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:hover:scale-110"
      />
      <div className="flex justify-between text-xs text-white/40">
        <span>Best Quality</span>
        <span>Worst Quality</span>
      </div>
    </div>
  );
}
