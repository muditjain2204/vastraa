'use client';

import React from 'react';
import { X, Crown, Sparkles, Gem, Clock } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex-1 absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-[#130d0a] border border-[#2b1f18] rounded-xl shadow-2xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-[#241a14]">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#ffb733]" />
            <h3 className="font-serif text-lg tracking-wider text-[#faf6f0]">
              VASTRAA PRIVÉ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8c7d6d] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Status */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-[#211611] to-[#140e0b] border border-[#3b2d22] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-[#ffb733] uppercase font-medium">
              TIER: HAUTE COUTURE
            </span>
            <Gem className="w-4 h-4 text-[#ffb733]" />
          </div>
          <p className="font-serif text-xl text-white mt-1">Client Privileged Access</p>
          <p className="text-xs text-[#a19280] font-light mt-1">
            Complimentary Personal Atelier Fitting & Priority Runway Dispatches
          </p>
        </div>

        {/* Perks list */}
        <div className="space-y-3 text-xs text-[#bfb2a1]">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#ffb733]" />
            <span>Private digital previews of upcoming seasonal drops</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#ffb733]" />
            <span>Dedicated concierge styling appointment</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded bg-[#ffb733] hover:bg-[#ffc65c] text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(255,183,51,0.25)]"
          >
            Access Atelier Lounge
          </button>
        </div>
      </div>
    </div>
  );
}
