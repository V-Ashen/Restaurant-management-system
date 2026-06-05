"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50">
        {/* Frosted glass bar */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 shrink-0"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">🍴</span>
                <span className="text-white font-black text-lg tracking-tight">
                  Flavor<span className="text-orange-400">Bite</span>
                </span>
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        active
                          ? "text-white bg-white/10"
                          : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.10] hover:border-orange-500/30 transition-all duration-200"
                >
                  <ShoppingCart size={18} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-orange-500/40">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.10] transition-all duration-200"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-white bg-white/[0.08] border border-white/[0.08]"
                      : "text-white/45 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}