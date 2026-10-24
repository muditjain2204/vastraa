'use client';

import React from 'react';
import { SHOWCASE_PAIRS, ProductItem } from '@/data/fashionData';

interface OverlayControlsProps {
  activeFrameIndex: number;
  onJumpToFrame: (frame: number) => void;
  onSelectProduct: (product: ProductItem) => void;
  scrollProgress: number;
}

export default function OverlayControls({
  activeFrameIndex,
  onJumpToFrame,
  scrollProgress,
}: OverlayControlsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* Left Side — Frame Counter "01 / 04" like reference */}
      <div className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto">
        <div className="flex flex-col items-center space-y-1.5">
          {/* Active frame number — large */}
          <span className="font-serif text-2xl md:text-3xl font-light text-white/90 tracking-wider">
            0{activeFrameIndex}
          </span>

          {/* Thin vertical line */}
          <div className="w-[1px] h-6 bg-gradient-to-b from-white/50 to-white/10" />

          {/* Total count — small */}
          <span className="text-[11px] font-light text-white/40 tracking-widest">
            04
          </span>
        </div>

        {/* Frame switcher dots */}
        <div className="mt-6 flex flex-col space-y-2.5">
          {[1, 2, 3, 4].map((f) => (
            <button
              key={f}
              onClick={() => onJumpToFrame(f)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeFrameIndex === f
                  ? 'bg-[#daa520] scale-[1.8] shadow-[0_0_6px_rgba(218,165,32,0.7)]'
                  : 'bg-white/15 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Center — Mouse Scroll Indicator */}
      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {/* Vertical line above mouse */}
        <div className="w-[1px] h-5 bg-gradient-to-b from-transparent to-white/40 mb-2" />

        {/* Mouse outline */}
        <div className="w-[18px] h-[28px] rounded-full border border-white/40 flex justify-center pt-[6px]">
          <div className="w-[2px] h-[6px] bg-white/60 rounded-full animate-bounce" />
        </div>

        {/* Label */}
        <span className="mt-2 text-[9px] md:text-[10px] font-light tracking-[0.35em] text-white/50 uppercase">
          SCROLL TO EXPLORE
        </span>
      </div>
    </div>
  );
}
