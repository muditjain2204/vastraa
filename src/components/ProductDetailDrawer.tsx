'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Check, ShoppingBag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { ProductItem } from '@/data/fashionData';

interface ProductDetailDrawerProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, selectedSize: string, selectedColor: string, quantity: number) => void;
}

export default function ProductDetailDrawer({
  product,
  onClose,
  onAddToCart,
}: ProductDetailDrawerProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Initialize defaults when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || 'Original');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-all duration-300">
      {/* Click outside to close backdrop */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-2xl h-full bg-[#110d0b] text-[#f7f3ee] border-l border-[#2e231c] shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#261c16] flex items-center justify-between sticky top-0 bg-[#110d0b]/95 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.25em] text-[#ffb733] uppercase font-medium">
              VASTRAA ATELIER
            </span>
            <span className="text-[#554235]">•</span>
            <span className="text-xs text-[#a89b8c] tracking-widest uppercase">
              {product.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#d4cbbf] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          {/* Main Showcase Image & Quick Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Model Photograph */}
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden border border-[#2b201a] shadow-xl bg-[#1a1410] group">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] tracking-wider text-[#ffb733] border border-[#ffb733]/30 uppercase">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Title, Pricing & Highlights */}
            <div className="flex flex-col justify-center space-y-4">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#f7f3ee] leading-tight">
                  {product.title}
                </h2>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-medium text-[#ffb733] tracking-wide">
                    {product.displayPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#7a6d5f] line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-emerald-400 font-light ml-auto">
                    In Stock • Ready to Dispatch
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#b8ab9b] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Fabric Spec Card */}
              <div className="p-3.5 rounded bg-[#18120e] border border-[#2e221b] text-xs">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#ffb733] font-medium block mb-1">
                  FABRIC & TEXTILE
                </span>
                <span className="text-[#ded5c8]">{product.fabric}</span>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="tracking-[0.2em] uppercase text-[#b0a394]">
                  COLOR PALETTE
                </span>
                <span className="text-[#ffb733]">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3.5 py-1.5 rounded text-xs transition-all tracking-wider ${
                      selectedColor === c
                        ? 'bg-[#ffb733] text-black font-medium shadow-[0_0_10px_rgba(255,183,51,0.4)]'
                        : 'bg-[#1b140f] text-[#cfc5b8] border border-[#33251c] hover:border-[#ffb733]/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="tracking-[0.2em] uppercase text-[#b0a394]">
                  SELECT SIZE
                </span>
                <span className="text-[#a6998b] underline cursor-pointer hover:text-white">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 rounded text-xs transition-all uppercase tracking-widest ${
                      selectedSize === s
                        ? 'bg-[#ffb733] text-black font-semibold shadow-[0_0_10px_rgba(255,183,51,0.4)]'
                        : 'bg-[#1b140f] text-[#cfc5b8] border border-[#33251c] hover:border-[#ffb733]/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#b0a394]">
              QUANTITY:
            </span>
            <div className="flex items-center border border-[#33251c] rounded bg-[#17110d]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-sm hover:text-[#ffb733] transition-colors"
              >
                -
              </button>
              <span className="px-4 text-xs font-medium text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-sm hover:text-[#ffb733] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Key Tailoring & Craftsmanship Details */}
          {product.details && product.details.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-[#231a14]">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#ffb733] font-medium block">
                CRAFT & CONSTRUCTION
              </span>
              <ul className="space-y-1.5 text-xs text-[#bfb2a3]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb733]/70" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Luxury Commitments */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#9c8e7e]">
            <div className="flex items-center gap-2 p-3 rounded bg-[#16100c] border border-[#261c16]">
              <Truck className="w-4 h-4 text-[#ffb733]" />
              <span>Complimentary Global Express</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded bg-[#16100c] border border-[#261c16]">
              <ShieldCheck className="w-4 h-4 text-[#ffb733]" />
              <span>100% Authentic Handcrafted</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#261c16] bg-[#110d0b] sticky bottom-0 z-10 flex gap-4">
          <button
            onClick={handleAdd}
            className={`flex-1 py-3.5 px-6 rounded text-xs font-semibold uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-[#ffb733] hover:bg-[#ffc65c] text-black shadow-[0_0_15px_rgba(255,183,51,0.3)]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO SHOPPING BAG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
