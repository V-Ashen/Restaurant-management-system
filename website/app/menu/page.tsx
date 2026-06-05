"use client";

import { API_BASE_URL } from "@/lib/api";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface Category {
  _id: string;
  name: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  category: { _id: string; name: string };
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedId, setAddedId] = useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, catRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/menu`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);
        const menuData = await menuRes.json();
        const catData = await catRes.json();
        setMenuItems(menuData);
        setCategories(catData);
      } catch (error) {
        console.error("Failed to fetch menu data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      imageUrl:
        item.imageUrl ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
    });
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-12 h-12 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
          <p className="text-white/40 text-sm tracking-widest uppercase font-medium">
            Loading Menu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ── Page Header ── */}
      <div className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-orange-600/10 blur-[100px] pointer-events-none" />
        <p className="relative text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Explore
        </p>
        <h1
          className="relative text-5xl md:text-7xl font-black text-white tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Our Menu
        </h1>
        <p className="relative text-white/35 mt-4 text-lg">
          {menuItems.length} dishes crafted fresh daily
        </p>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto scrollbar-hide">
            <SlidersHorizontal size={16} className="text-white/30 shrink-0" />
            {[{ _id: "All", name: "All" }, ...categories].map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-200 shrink-0 ${
                  selectedCategory === cat._id
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/[0.06] text-white/50 hover:bg-white/[0.10] hover:text-white/80 border border-white/[0.08]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 text-sm pl-10 pr-10 py-2.5 rounded-full focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-2">
        <p className="text-white/25 text-sm">
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
          {selectedCategory !== "All" && (
            <span className="text-orange-400/70">
              {" "}· {categories.find((c) => c._id === selectedCategory)?.name}
            </span>
          )}
        </p>
      </div>

      {/* ── Menu Grid ── */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-6">🍽️</div>
            <p className="text-white/40 text-xl font-medium mb-2">Nothing found</p>
            <p className="text-white/20 text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white/[0.03] border border-white/[0.07] hover:border-orange-500/25 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05]"
              >
                {/* Image */}
                <Link href={`/menu/${item._id}`} className="block relative overflow-hidden">
                  <img
                    src={
                      item.imageUrl ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                    }
                    alt={item.name}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.9)" }}
                  />
                  {/* Availability badge */}
                  <div className="absolute top-3 left-3">
                    {item.isAvailable ? (
                      <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Available
                      </span>
                    ) : (
                      <span className="bg-black/60 backdrop-blur-md text-red-400 text-xs font-semibold px-3 py-1 rounded-full border border-red-500/20">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  {/* Category badge */}
                  {item.category?.name && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/60 backdrop-blur-md text-white/60 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                        {item.category.name}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <Link href={`/menu/${item._id}`}>
                      <h2 className="text-white font-bold text-lg leading-tight hover:text-orange-400 transition-colors cursor-pointer">
                        {item.name}
                      </h2>
                    </Link>
                    <span className="text-orange-400 font-black text-lg shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-white/35 text-sm leading-relaxed line-clamp-2 min-h-[40px] mb-5">
                    {item.description}
                  </p>

                  <button
                    disabled={!item.isAvailable}
                    onClick={() => handleAddToCart(item)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                      !item.isAvailable
                        ? "bg-white/[0.05] text-white/20 cursor-not-allowed"
                        : addedId === item._id
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-orange-500/15 text-orange-400 border border-orange-500/25 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {addedId === item._id ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}