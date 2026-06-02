"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  
  // Zustand state
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // Form state
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    tableOrAddress: "",
    paymentMethod: "Cash" // Default selection
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit order to Backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Calculate final total including the 5% tax from the cart page
    const finalTotal = getTotalPrice() * 1.05;

    // Format the items to match the Mongoose Order Schema
    const orderItems = items.map(item => ({
      menuItem: item._id, // Send the ID of the menu item
      quantity: item.quantity,
      priceAtTime: item.price // Preserve the price at the time of ordering
    }));

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items: orderItems,
          totalAmount: finalTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place order.");
      }

      // Success! Clear the cart and show success screen
      clearCart();
      setSuccess(true);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If the cart is empty and order wasn't just placed successfully, redirect to cart
  if (items.length === 0 && !success) {
    router.push("/cart");
    return null;
  }

  // Success Screen
  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          Thank you for your order, {formData.customerName}. Your delicious meal will be ready soon.
        </p>
        <Link href="/menu" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition-colors">
          Order More Food
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Billing & Checkout</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 font-medium">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Table / Delivery Address */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Table Number / Delivery Address</label>
            <input 
              type="text" 
              name="tableOrAddress"
              required
              value={formData.tableOrAddress}
              onChange={handleChange}
              placeholder="Table 5 OR 123 Main St, City"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Payment Method Dropdown */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
            <select 
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
            >
              <option value="Cash">Cash on Delivery / Counter</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="QR">QR Code (Mobile Pay)</option>
            </select>
          </div>

          {/* Order Summary Recap */}
          <div className="bg-gray-50 p-6 rounded-xl border mt-8">
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {items.map(item => (
                <div key={item._id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="font-bold text-gray-900">Total to Pay</span>
              <span className="text-2xl font-black text-orange-600">${(getTotalPrice() * 1.05).toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-colors flex justify-center items-center gap-2 ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
          >
            {isLoading ? (
              <><Loader2 className="animate-spin" size={20} /> Processing...</>
            ) : (
              "Confirm & Place Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}