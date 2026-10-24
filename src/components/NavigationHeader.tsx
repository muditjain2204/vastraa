'use client';

import React from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';

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
}: NavigationHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-4 flex items-center justify-between pointer-events-auto">
      {/* Subtle gradient backdrop for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none" />

      {/* Brand Logo */}
      <div
        onClick={() => onNavigateSection('hero')}
        className="relative z-10 cursor-pointer"
      >
        <span className="font-serif text-xl md:text-2xl font-light tracking-[0.35em] text-white/90 hover:text-[#daa520] transition-colors duration-300">
          VASTRAA
        </span>
      </div>

      {/* Center Navigation */}
      <nav className="relative z-10 hidden lg:flex items-center space-x-8 text-[11px] font-medium tracking-[0.22em] text-white/70 uppercase">
        {['HOME', 'SHOP', 'COLLECTIONS', 'ABOUT', 'CONTACT'].map((label) => (
          <button
            key={label}
            onClick={() => {
              const sectionMap: Record<string, string> = {
                HOME: 'hero',
                SHOP: 'catalog',
                COLLECTIONS: 'collections',
                ABOUT: 'about',
                CONTACT: 'contact',
              };
              onNavigateSection(sectionMap[label] || 'hero');
            }}
            className="hover:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#daa520] hover:after:w-full after:transition-all after:duration-300"
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Right Icons */}
      <div className="relative z-10 flex items-center space-x-5 text-white/70">
        <button
          onClick={onOpenSearch}
          className="hover:text-white transition-colors p-1"
          aria-label="Search"
        >
          <Search className="w-[18px] h-[18px] stroke-[1.5]" />
        </button>

        <button
          onClick={onOpenAccount}
          className="hover:text-white transition-colors p-1"
          aria-label="Account"
        >
          <User className="w-[18px] h-[18px] stroke-[1.5]" />
        </button>

        <button
          onClick={onOpenCart}
          className="relative hover:text-white transition-colors p-1"
          aria-label="Cart"
        >
          <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-[#cc1100] text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
