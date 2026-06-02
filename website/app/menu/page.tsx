"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

// Define TypeScript interfaces for our data
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
  
  // Filtering & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Zustand Cart action
  const addToCart = useCartStore((state) => state.addToCart);

  // Fetch data from our Admin Backend API (Port 3001)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, catRes] = await Promise.all([
          fetch("http://localhost:3001/api/menu"),
          fetch("http://localhost:3001/api/categories")
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

  // Filter logic based on search input and selected category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Loading Menu...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Menu</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-2 w-full md:w-auto gap-2 scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${selectedCategory === "All" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button 
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${selectedCategory === cat._id ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search food..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-xl">No items found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border">
              <Link href={`/menu/${item._id}`}>
                {/* Fallback image if no imageUrl is provided */}
                <img 
                  src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"} 
                  alt={item.name} 
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/menu/${item._id}`}>
                    <h2 className="text-xl font-bold text-gray-900 cursor-pointer hover:text-orange-600">{item.name}</h2>
                  </Link>
                  <span className="text-lg font-extrabold text-orange-600">${item.price.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">{item.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className={`text-sm font-medium ${item.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                    {item.isAvailable ? "Available" : "Out of Stock"}
                  </span>
                  
                  <button 
                    disabled={!item.isAvailable}
                    onClick={() => addToCart({
                      _id: item._id,
                      name: item.name,
                      price: item.price,
                      imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                    })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${item.isAvailable ? 'bg-gray-900 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    <ShoppingCart size={18} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}