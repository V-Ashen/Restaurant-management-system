"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
          <p className="text-white/30 text-sm tracking-widest uppercase">Loading cart</p>
        </div>
      </div>
    );
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 bg-white/[0.04] border border-white/[0.08] rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="text-white/20" size={36} />
        </div>
        <h1
          className="text-4xl font-black text-white mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Cart is empty
        </h1>
        <p className="text-white/35 text-base mb-10 max-w-sm leading-relaxed">
          You haven't added any meals yet. Browse our menu and find something delicious.
        </p>
        <Link
          href="/menu"
          className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
        >
          Browse Menu
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="relative pt-32 pb-10 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full bg-orange-600/8 blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <p className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Review</p>
          <h1
            className="text-5xl font-black text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Your Cart
            <span className="text-white/20 ml-3 text-3xl font-bold">({totalItems})</span>
          </h1>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 pb-28">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Cart Items */}
          <div className="lg:w-2/3 w-full space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="group flex items-center gap-5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-4 transition-all duration-200"
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                  style={{ filter: "brightness(0.85)" }}
                />

                {/* Name & price */}
                <div className="flex-grow min-w-0">
                  <h3 className="text-white font-bold text-base truncate">{item.name}</h3>
                  <p className="text-orange-400 font-black text-lg mt-0.5">${item.price.toFixed(2)}</p>
                  <p className="text-white/25 text-xs mt-0.5">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 rounded-lg transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-white font-bold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 rounded-lg transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-8 h-8 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {/* Clear cart */}
            <div className="flex justify-end pt-1">
              <button
                onClick={clearCart}
                className="text-white/25 hover:text-red-400 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={12} /> Clear entire cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 w-full sticky top-24">
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <h2
                className="text-xl font-black text-white mb-6"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="text-white/70 text-sm font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">Taxes & Fees (5%)</span>
                  <span className="text-white/70 text-sm font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">Delivery</span>
                  <span className="text-green-400 text-sm font-semibold">Free</span>
                </div>
              </div>

              <div className="border-t border-white/[0.07] pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black text-orange-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="group w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/menu"
                className="mt-3 w-full text-white/30 hover:text-white/60 text-xs font-medium text-center block transition-colors py-2"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}