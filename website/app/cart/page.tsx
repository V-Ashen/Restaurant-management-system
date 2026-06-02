"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react"; // <-- ShoppingCart added here!
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center font-bold">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="text-orange-300 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-lg">Looks like you haven't added any delicious meals to your cart yet.</p>
        <Link href="/menu" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b last:border-0 last:pb-0">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-orange-600 font-extrabold mt-1">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold">-</button>
                      <div className="w-10 text-center font-bold">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 border-t flex justify-end">
              <button onClick={clearCart} className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors">
                Clear Entire Cart
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-medium text-gray-900">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees (Estimated)</span>
                <span className="font-medium text-gray-900">${(getTotalPrice() * 0.05).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-orange-600">${(getTotalPrice() * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center gap-2">
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}