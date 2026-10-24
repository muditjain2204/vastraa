'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { ALL_PRODUCTS, ProductItem } from '@/data/fashionData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex-1 absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#140e0b] border border-[#2b1f18] rounded-xl shadow-2xl p-6 overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#2b1f18] pb-4">
          <Search className="w-5 h-5 text-[#ffb733] mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search silhouettes, fabrics, silk, lehenga, overshirt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base md:text-lg text-white placeholder:text-[#6e6052] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#8c7d6d] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="mt-5 max-h-[60vh] overflow-y-auto space-y-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#ffb733] font-medium block mb-2">
            {query.trim() ? `SEARCH RESULTS (${results.length})` : 'CURATED SUGGESTIONS'}
          </span>

          {results.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#827464]">
              No pieces found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-[#1f1611] border border-transparent hover:border-[#382b21] transition-all cursor-pointer group"
              >
                <div className="relative w-12 aspect-[2/3] rounded overflow-hidden bg-[#241a14] flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] tracking-widest uppercase text-[#ffb733]">
                    {product.category}
                  </span>
                  <h4 className="font-serif text-sm text-[#f5ede3] group-hover:text-[#ffb733] transition-colors truncate">
                    {product.title}
                  </h4>
                  <p className="text-[11px] text-[#8c7e6e] truncate">{product.fabric}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-white">{product.displayPrice}</span>
                  <ArrowRight className="w-4 h-4 text-[#8c7e6e] group-hover:text-[#ffb733] group-hover:translate-x-1 transition-all ml-auto mt-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
