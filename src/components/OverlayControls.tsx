'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SHOWCASE_PAIRS, ProductItem } from '@/data/fashionData';

interface OverlayControlsProps {
  activeFrameIndex: number; // 1, 2, 3, 4
  onJumpToFrame: (frame: number) => void;
  onSelectProduct: (product: ProductItem) => void;
  scrollProgress: number;
}

export default function OverlayControls({
  activeFrameIndex,
  onJumpToFrame,
  onSelectProduct,
  scrollProgress,
}: OverlayControlsProps) {
  const currentPair = SHOWCASE_PAIRS[activeFrameIndex - 1] || SHOWCASE_PAIRS[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* 1. Left Progress Indicator ("01 / 04") - Exactly like Reference Image */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto">
        <div className="flex flex-col items-center space-y-2">
          {/* Active Frame Number */}
          <span className="font-serif text-3xl md:text-4xl font-normal text-[#f5f1eb] tracking-wider transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,180,50,0.4)]">
            0{activeFrameIndex}
          </span>

          {/* Thin Vertical Divider */}
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#ffb733] via-white/40 to-white/10" />

          {/* Total Frames */}
          <span className="text-xs md:text-sm font-light text-[#9d9284] tracking-widest">
            04
          </span>
        </div>

        {/* Interactive Quick Frame Switcher Dots */}
        <div className="mt-8 flex flex-col space-y-3">
          {[1, 2, 3, 4].map((f) => (
            <button
              key={f}
              onClick={() => onJumpToFrame(f)}
              title={`View Frame 0${f} (${SHOWCASE_PAIRS[f - 1].themeTitle})`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeFrameIndex === f
                  ? 'bg-[#ffb733] scale-150 shadow-[0_0_8px_#ffb733]'
                  : 'bg-white/20 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Interactive Foreground Explore Links (Left & Right displays) */}
      {/* Left Display Info Card & Explore */}
      <div className="absolute left-6 md:left-24 bottom-24 md:bottom-28 pointer-events-auto max-w-[280px] transition-all duration-500 opacity-90 hover:opacity-100">
        <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:border-[#ffb733]/50 transition-all duration-300 group">
          <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#ffb733] uppercase font-medium mb-1">
            <Sparkles className="w-3 h-3" />
            <span>{currentPair.leftItem.category}</span>
          </div>
          <h4 className="font-serif text-lg md:text-xl text-[#f7f3ee] line-clamp-1 group-hover:text-[#ffb733] transition-colors">
            {currentPair.leftItem.title}
          </h4>
          <p className="text-xs text-[#a3988a] font-light mt-1">
            {currentPair.leftItem.displayPrice}
          </p>
          <button
            onClick={() => onSelectProduct(currentPair.leftItem)}
            className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#f7f3ee] group-hover:text-[#ffb733] transition-colors font-medium cursor-pointer"
          >
            <span>EXPLORE LOOK</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right Display Info Card & Explore */}
      <div className="absolute right-6 md:right-24 bottom-24 md:bottom-28 pointer-events-auto max-w-[280px] transition-all duration-500 opacity-90 hover:opacity-100">
        <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:border-[#ffb733]/50 transition-all duration-300 group text-right flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#ffb733] uppercase font-medium mb-1">
            <span>{currentPair.rightItem.category}</span>
            <Sparkles className="w-3 h-3" />
          </div>
          <h4 className="font-serif text-lg md:text-xl text-[#f7f3ee] line-clamp-1 group-hover:text-[#ffb733] transition-colors">
            {currentPair.rightItem.title}
          </h4>
          <p className="text-xs text-[#a3988a] font-light mt-1">
            {currentPair.rightItem.displayPrice}
          </p>
          <button
            onClick={() => onSelectProduct(currentPair.rightItem)}
            className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#f7f3ee] group-hover:text-[#ffb733] transition-colors font-medium cursor-pointer"
          >
            <span>EXPLORE LOOK</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Center - Minimal Mouse Scroll Indicator - Exactly like Reference Image */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto select-none">
        {/* Animated Mouse Icon */}
        <div className="w-5 h-8 rounded-full border border-white/50 flex justify-center p-1 relative shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          <div className="w-1 h-2 bg-[#ffb733] rounded-full animate-bounce mt-0.5" />
        </div>

        {/* "SCROLL TO EXPLORE" Subtitle */}
        <span className="mt-2.5 text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-[#dfd9ce] uppercase opacity-90 drop-shadow-[0_0_8px_rgba(255,180,50,0.3)]">
          SCROLL TO EXPLORE
        </span>

        {/* Small subtle frame theme tag */}
        <span className="text-[9px] tracking-[0.25em] text-[#918576] uppercase mt-0.5 font-light">
          {currentPair.themeTitle}
        </span>
      </div>
    </div>
  );
}
