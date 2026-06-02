import Link from "next/link";
import { ArrowRight, Utensils, Clock, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {/* Using a placeholder food image */}
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            alt="Delicious food background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Delicious Food, <span className="text-orange-500">Delivered To You</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-10">
            Experience the best meals in town. Order online easily and get it hot and fresh.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/menu" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors flex items-center gap-2">
              Order Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation / Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-orange-50 rounded-2xl">
              <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-orange-600">
                <Utensils size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Food</h3>
              <p className="text-gray-600">Prepared with fresh ingredients by our expert chefs daily.</p>
            </div>
            
            <div className="p-6 bg-orange-50 rounded-2xl">
              <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-orange-600">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Service</h3>
              <p className="text-gray-600">Quick preparation and seamless table service for dine-in.</p>
            </div>

            <div className="p-6 bg-orange-50 rounded-2xl">
              <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-orange-600">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Home Delivery</h3>
              <p className="text-gray-600">Enjoy our meals from the comfort of your own home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Placeholder */}
      <section className="py-16 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to order?</h2>
          <Link href="/menu" className="inline-block border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
            Explore Full Menu
          </Link>
        </div>
      </section>

    </div>
  );
}