"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  category: { name: string };
}

export default function FoodDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/menu/${params.id}`);
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchItemDetails();
  }, [params.id]);

  const handleAddToCart = () => {
    if (item) {
      // Add the item, and then forcefully update its quantity to what the user selected
      addToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
      });
      // Small hack: update the cart quantity immediately after adding it
      updateQuantity(item._id, quantity);
      router.push("/cart"); // Redirect to cart
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-xl">Loading details...</div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center font-bold text-xl text-red-500">Item not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8 font-medium">
        <ArrowLeft size={20} /> Back to Menu
      </button>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img 
            src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"} 
            alt={item.name} 
            className="w-full h-[400px] md:h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-orange-600 font-bold mb-2">
            {item.category?.name || "Uncategorized"}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{item.name}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{item.description}</p>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-black text-gray-900">${item.price.toFixed(2)}</span>
            <div className={`flex items-center gap-1 font-medium px-3 py-1 rounded-full text-sm ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {item.isAvailable ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {item.isAvailable ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          {item.isAvailable && (
            <div className="flex items-center gap-4 mt-auto border-t pt-8">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-colors">-</button>
                <div className="w-12 text-center font-bold text-lg">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-colors">+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-bold text-lg transition-colors flex justify-center items-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}