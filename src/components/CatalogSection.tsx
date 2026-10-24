'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, ShoppingBag, Sparkles, SlidersHorizontal } from 'lucide-react';
import { ALL_PRODUCTS, ProductItem } from '@/data/fashionData';

interface CatalogSectionProps {
  onSelectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem) => void;
}

export default function CatalogSection({
  onSelectProduct,
  onQuickAdd,
}: CatalogSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = ALL_PRODUCTS.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'men') return item.subCategory === 'men';
    if (activeFilter === 'women') return item.subCategory === 'women';
    if (activeFilter === 'couture') return item.subCategory === 'couture';
    if (activeFilter === 'new') return item.badge?.toLowerCase().includes('new');
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <section id="catalog" className="w-full bg-[#0a0705] text-[#f7f3ee] py-24 px-6 md:px-12 relative z-20 border-t border-[#211712]">
      {/* Editorial Headline */}
      <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b130e] border border-[#ffb733]/20 text-[11px] tracking-[0.25em] text-[#ffb733] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AUTUMN / WINTER 2026</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#faf6f0]">
          The Contemporary Edit
        </h2>
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-[#9e9180] font-light leading-relaxed">
          Where pure architectural symmetry converges with generational Indian handloom and European sartorial drapery.
        </p>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#211712]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs tracking-wider uppercase font-medium">
          {[
            { id: 'all', label: 'All Silhouettes' },
            { id: 'men', label: 'Menswear' },
            { id: 'women', label: 'Womenswear' },
            { id: 'couture', label: 'Royal Couture' },
            { id: 'new', label: 'New Arrivals' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded transition-all duration-200 ${
                activeFilter === tab.id
                  ? 'bg-[#ffb733] text-black shadow-[0_0_12px_rgba(255,183,51,0.3)]'
                  : 'bg-[#150f0b] text-[#c2b6a5] border border-[#2b2019] hover:border-[#ffb733]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2.5 text-xs text-[#a69989]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#ffb733]" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#150f0b] border border-[#2b2019] text-[#f2ece2] rounded px-3 py-1.5 focus:outline-none focus:border-[#ffb733] text-xs cursor-pointer"
          >
            <option value="featured">Curated Runway Order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-[#120d0a] rounded-lg overflow-hidden border border-[#231a14] hover:border-[#ffb733]/40 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            {/* Image Box */}
            <div
              onClick={() => onSelectProduct(product)}
              className="relative aspect-[2/3] w-full overflow-hidden bg-[#1c140f] cursor-pointer"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Tag / Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded text-[9px] tracking-widest text-[#ffb733] uppercase border border-[#ffb733]/30">
                  {product.badge}
                </div>
              )}

              {/* Hover Quick Actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="flex-1 py-2.5 rounded bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#ffb733] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(product);
                  }}
                  className="p-2.5 rounded bg-[#ffb733] text-black hover:bg-[#ffc65c] transition-colors"
                  title="Quick Add to Bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#ffb733] uppercase font-medium">
                  {product.category}
                </span>
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="font-serif text-base text-[#f2ece2] group-hover:text-[#ffb733] transition-colors line-clamp-1 cursor-pointer mt-0.5"
                >
                  {product.title}
                </h3>
                <p className="text-[11px] text-[#8e8070] line-clamp-1 mt-1 font-light">
                  {product.fabric}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1e1611]">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-[#f5efe4]">
                    {product.displayPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#6e6052] line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#918373] group-hover:text-[#ffb733] transition-colors">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Philosophy Section */}
      <div id="about" className="max-w-5xl mx-auto mt-28 p-8 md:p-14 rounded-2xl bg-[#140e0b] border border-[#261c16] text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb733]/5 rounded-full blur-3xl pointer-events-none" />
        <span className="font-serif text-2xl tracking-[0.25em] text-[#ffb733] block">
          THE VASTRAA MANIFESTO
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-[#faf6f0] leading-snug">
          “Fashion is not an adornment; it is an architectural corridor connecting your heritage to your future.”
        </h3>
        <p className="text-xs md:text-sm text-[#a39483] font-light leading-relaxed max-w-2xl mx-auto">
          Every silhouette in the VASTRAA atelier is developed alongside generational master craftsmen across Varanasi, Kanchipuram, and Milan. From pure hand-spun mulberry silks to sharp unstructured tailoring, each garment invites you to wear your story.
        </p>
      </div>

      {/* Footer */}
      <footer id="contact" className="max-w-7xl mx-auto mt-24 pt-12 border-t border-[#211712] flex flex-col md:flex-row items-center justify-between text-xs text-[#7d7061] gap-6">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg tracking-widest text-[#f5efe6]">
            VASTRAA
          </span>
          <span>© 2026. All Rights Reserved.</span>
        </div>
        <div className="flex flex-wrap gap-6 text-[11px] tracking-widest uppercase">
          <a href="#" className="hover:text-[#ffb733] transition-colors">
            Concierge
          </a>
          <a href="#" className="hover:text-[#ffb733] transition-colors">
            Custom Atelier
          </a>
          <a href="#" className="hover:text-[#ffb733] transition-colors">
            Sustainability
          </a>
          <a href="#" className="hover:text-[#ffb733] transition-colors">
            Boutique Locations
          </a>
        </div>
      </footer>
    </section>
  );
}
