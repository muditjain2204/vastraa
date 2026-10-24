'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { ProductItem } from '@/data/fashionData';

export interface CartItem {
  id: string; // unique item id with size/color combo
  product: ProductItem;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckoutSuccess?: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 25;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VASTRAA10') {
      setDiscountPercent(10);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'LUXURY20') {
      setDiscountPercent(20);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try VASTRAA10');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Cart Container */}
      <div className="w-full max-w-md h-full bg-[#120d0a] text-[#f7f3ee] border-l border-[#2e231c] shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#261c16] flex items-center justify-between sticky top-0 bg-[#120d0a]/95 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-wider text-[#faf6f0]">
              SHOPPING BAG
            </span>
            <span className="text-xs text-[#a39482]">
              ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#d4cbbf] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Modal State */}
        {orderComplete ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-white">Order Confirmed</h3>
            <p className="text-xs text-[#b8ab9b] leading-relaxed max-w-xs">
              Thank you for choosing VASTRAA. Your bespoke garment order #VAS-8842 has been dispatched to our master tailors.
            </p>
            <button
              onClick={() => {
                setOrderComplete(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded bg-[#ffb733] text-black text-xs font-semibold tracking-wider uppercase hover:bg-[#ffc763]"
            >
              Continue Exploring
            </button>
          </div>
        ) : items.length === 0 ? (
          // Empty state
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4 text-[#8a7d6e]">
            <span className="font-serif text-2xl text-[#c2b5a5]">
              Your Bag is Empty
            </span>
            <p className="text-xs max-w-xs leading-relaxed">
              Explore the 3D showroom tunnel or our ready-to-wear catalog to curate your bespoke wardrobe.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded bg-[#1e1713] border border-[#3b2d24] text-[#ffb733] text-xs font-medium tracking-wider uppercase hover:bg-[#ffb733] hover:text-black transition-all"
            >
              Explore Runway
            </button>
          </div>
        ) : (
          // Cart item list
          <div className="p-5 space-y-4 flex-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 rounded-lg bg-[#18110d] border border-[#261d17] hover:border-[#382b22] transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 aspect-[2/3] rounded overflow-hidden bg-[#241a14] flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm text-[#f5efe6] line-clamp-1 pr-2">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#7d6f60] hover:text-[#ff3b30] transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#998b7a]">
                      <span>Size: {item.size}</span>
                      <span>•</span>
                      <span>{item.color}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#33261d] rounded bg-[#130d0a] text-xs">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-0.5 hover:text-[#ffb733] transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-0.5 hover:text-[#ffb733] transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-medium text-[#ffb733]">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code Input */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try VASTRAA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#18110d] border border-[#2b2018] rounded px-3 py-2 text-xs uppercase tracking-wider text-white placeholder:text-[#6e6052] focus:outline-none focus:border-[#ffb733]"
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-2 bg-[#221812] hover:bg-[#ffb733] hover:text-black border border-[#36271e] text-xs uppercase tracking-wider transition-all"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-[#ff4d4d] mt-1">{promoError}</p>
              )}
              {discountPercent > 0 && (
                <p className="text-[11px] text-emerald-400 mt-1">
                  ✓ {discountPercent}% Luxury VIP discount applied!
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-3 border-t border-[#231a14] text-xs text-[#a89a8a]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#e8decb]">${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Promo ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Climate-Neutral Shipping</span>
                <span className="text-[#e8decb]">
                  {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-white pt-2 border-t border-[#231a14]">
                <span>Total</span>
                <span className="text-base text-[#ffb733]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout */}
        {items.length > 0 && !orderComplete && (
          <div className="p-5 border-t border-[#261c16] bg-[#120d0a] sticky bottom-0">
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 bg-[#ffb733] hover:bg-[#ffc65c] text-black font-semibold text-xs tracking-[0.25em] uppercase rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(255,183,51,0.3)] disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>PROCESSING CONCIERGE CHECKOUT...</span>
              ) : (
                <>
                  <span>CHECKOUT (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#736555]">
              <Shield className="w-3.5 h-3.5 text-[#ffb733]" />
              <span>Encrypted 256-Bit Luxury Concierge Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
