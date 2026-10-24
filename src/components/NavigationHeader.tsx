'use client';

import React from 'react';
import { Search, User, ShoppingBag, Volume2, VolumeX } from 'lucide-react';

interface NavigationHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigateSection: (sectionId: string) => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export default function NavigationHeader({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  onNavigateSection,
  isMuted,
  onToggleSound,
}: NavigationHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px]">
      {/* Brand Logo - High Fashion Editorial Serif */}
      <div
        onClick={() => onNavigateSection('hero')}
        className="cursor-pointer group flex items-center gap-1 select-none"
      >
        <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.3em] text-[#faf6f0] transition-colors duration-300 group-hover:text-[#ffb733]">
          VASTRAA
        </span>
      </div>

      {/* Center Navigation Links - Uppercase & Spaced */}
      <nav className="hidden lg:flex items-center space-x-10 text-[11px] font-medium tracking-[0.25em] text-[#e3ded6] uppercase select-none">
        <button
          onClick={() => onNavigateSection('hero')}
          className="hover:text-[#ffb733] transition-colors duration-200 tracking-[0.28em] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#ffb733] hover:after:w-full after:transition-all"
        >
          HOME
        </button>
        <button
          onClick={() => onNavigateSection('catalog')}
          className="hover:text-[#ffb733] transition-colors duration-200 tracking-[0.28em] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#ffb733] hover:after:w-full after:transition-all"
        >
          SHOP
        </button>
        <button
          onClick={() => onNavigateSection('collections')}
          className="hover:text-[#ffb733] transition-colors duration-200 tracking-[0.28em] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#ffb733] hover:after:w-full after:transition-all"
        >
          COLLECTIONS
        </button>
        <button
          onClick={() => onNavigateSection('about')}
          className="hover:text-[#ffb733] transition-colors duration-200 tracking-[0.28em] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#ffb733] hover:after:w-full after:transition-all"
        >
          ABOUT
        </button>
        <button
          onClick={() => onNavigateSection('contact')}
          className="hover:text-[#ffb733] transition-colors duration-200 tracking-[0.28em] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#ffb733] hover:after:w-full after:transition-all"
        >
          CONTACT
        </button>
      </nav>

      {/* Right Action Icons: Audio toggle, Search, Profile, Cart */}
      <div className="flex items-center space-x-6 text-[#eae5de]">
        {/* Subtle Ambient Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={isMuted ? 'Enable Showroom Atmosphere Sound' : 'Mute Sound'}
          className="text-[#cfc8bf] hover:text-[#ffb733] transition-colors duration-200 p-1.5 focus:outline-none"
          aria-label="Sound Toggle"
        >
          {isMuted ? (
            <VolumeX className="w-[18px] h-[18px] opacity-60 hover:opacity-100" />
          ) : (
            <Volume2 className="w-[18px] h-[18px] text-[#ffb733] animate-pulse" />
          )}
        </button>

        {/* Search Icon */}
        <button
          onClick={onOpenSearch}
          className="hover:text-[#ffb733] transition-colors duration-200 p-1.5 focus:outline-none"
          aria-label="Search"
          title="Search collections"
        >
          <Search className="w-[19px] h-[19px] stroke-[1.6]" />
        </button>

        {/* Account Icon */}
        <button
          onClick={onOpenAccount}
          className="hover:text-[#ffb733] transition-colors duration-200 p-1.5 focus:outline-none"
          aria-label="Account"
          title="VIP Member Account"
        >
          <User className="w-[19px] h-[19px] stroke-[1.6]" />
        </button>

        {/* Shopping Bag with Red Counter Badge */}
        <button
          onClick={onOpenCart}
          className="relative hover:text-[#ffb733] transition-colors duration-200 p-1.5 focus:outline-none group"
          aria-label="Shopping Bag"
          title="Shopping Bag"
        >
          <ShoppingBag className="w-[19px] h-[19px] stroke-[1.6]" />
          <span className="absolute -top-1 -right-1 bg-[#ff1e0e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#16100c] shadow-[0_0_8px_rgba(255,30,14,0.6)]">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}
