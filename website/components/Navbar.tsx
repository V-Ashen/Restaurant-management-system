"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get cart items from our Zustand store
  const cartItems = useCartStore((state) => state.items);
  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-600">
            Flavor<span className="text-gray-800">Bite</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">Home</Link>
            <Link href="/menu" className="text-gray-600 hover:text-orange-600 font-medium">Menu</Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-600 font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-orange-600 font-medium">Contact</Link>
            
            <Link href="/cart" className="relative text-gray-600 hover:text-orange-600">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link href="/cart" className="relative text-gray-600 mr-4">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">Home</Link>
            <Link href="/menu" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">Menu</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}