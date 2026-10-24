'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationHeader from '@/components/NavigationHeader';
import OverlayControls from '@/components/OverlayControls';
import ProductDetailDrawer from '@/components/ProductDetailDrawer';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import CatalogSection from '@/components/CatalogSection';
import SearchModal from '@/components/SearchModal';
import AccountModal from '@/components/AccountModal';
import { ProductItem, SHOWCASE_PAIRS, ALL_PRODUCTS } from '@/data/fashionData';
import { playShowroomChime, playTransitionWhoosh } from '@/utils/soundEffects';

// Register GSAP ScrollTrigger safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import Three.js TunnelCanvas with ssr disabled
const TunnelCanvas = dynamic(() => import('@/components/TunnelCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#0e0907] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="font-serif text-2xl tracking-[0.3em] text-[#ffb733] animate-pulse">
          VASTRAA
        </span>
        <span className="text-[10px] tracking-[0.25em] text-[#857666] uppercase">
          Initializing 3D Runway Atelier...
        </span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const previousFrameRef = useRef<number>(1);

  // Setup GSAP ScrollTrigger for pinned 3D camera travel
  useEffect(() => {
    if (!scrollTrackRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollTrackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Calculate active frame (1 to 4)
          let currentFrame = 1;
          if (p >= 0.70) {
            currentFrame = 4;
          } else if (p >= 0.45) {
            currentFrame = 3;
          } else if (p >= 0.20) {
            currentFrame = 2;
          } else {
            currentFrame = 1;
          }

          setActiveFrameIndex((prev) => {
            if (prev !== currentFrame) {
              if (!isMuted) {
                playTransitionWhoosh();
              }
            }
            return currentFrame;
          });
        },
      });
    }, scrollTrackRef);

    return () => {
      ctx.revert();
    };
  }, [isMuted]);

  // Jump smoothly to a specific frame (1, 2, 3, 4)
  const jumpToFrame = (frame: number) => {
    if (!scrollTrackRef.current) return;
    const trackHeight = scrollTrackRef.current.offsetHeight - window.innerHeight;
    const frameTargets: { [key: number]: number } = {
      1: 0,
      2: 0.32,
      3: 0.58,
      4: 0.84,
    };
    const targetP = frameTargets[frame] ?? 0;
    const targetScrollY = targetP * trackHeight;

    if (!isMuted) {
      playShowroomChime(520);
    }

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Navigate to sections (Shop / Catalog, Collections, About, Contact)
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: scroll past the 3D track
        if (scrollTrackRef.current) {
          window.scrollTo({
            top: scrollTrackRef.current.offsetHeight,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  // Add product to cart handler
  const handleAddToCart = (
    product: ProductItem,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (!isMuted) {
      playShowroomChime(640);
    }

    setCartItems((prev) => {
      const cartItemId = `${product.id}-${size}-${color}`;
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          size,
          color,
          quantity,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const handleQuickAdd = (product: ProductItem) => {
    handleAddToCart(
      product,
      product.sizes[0] || 'M',
      product.colors[0] || 'Original',
      1
    );
    setIsCartOpen(true);
  };

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (!nextState) {
      playShowroomChime(580);
    }
  };

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <main className="relative min-h-screen bg-[#0d0907] text-[#f7f3ee]">
      {/* 1. Slim Top Navigation Header */}
      <NavigationHeader
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigateSection={handleNavigate}
        isMuted={isMuted}
        onToggleSound={toggleSound}
      />

      {/* 2. Scroll Track for Pinned 3D Runway Corridor */}
      {/* 450vh tall container allows smooth scrubbing through the 4 frames */}
      <div ref={scrollTrackRef} className="relative w-full h-[450vh]">
        {/* Pinned Sticky Viewport for the 3D Scene */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Three.js 3D WebGL Runway Scene */}
          <TunnelCanvas
            scrollProgress={scrollProgress}
            onSelectProduct={(product) => setSelectedProduct(product)}
            activeFrameIndex={activeFrameIndex}
          />

          {/* HTML Overlay Controls matching Reference Image */}
          <OverlayControls
            activeFrameIndex={activeFrameIndex}
            onJumpToFrame={jumpToFrame}
            onSelectProduct={(product) => setSelectedProduct(product)}
            scrollProgress={scrollProgress}
          />
        </div>
      </div>

      {/* 3. Ready-To-Wear E-Commerce Catalog Section */}
      <CatalogSection
        onSelectProduct={(product) => setSelectedProduct(product)}
        onQuickAdd={handleQuickAdd}
      />

      {/* 4. Interactive Look & Product Detail Drawer */}
      <ProductDetailDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Luxury Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* 6. Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* 7. VIP Concierge Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </main>
  );
}
