import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            About <span className="text-orange-500">FlavorBite</span>
          </h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto text-gray-300">
            Delivering exceptional culinary experiences with a seamless, modern ordering system.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story & System</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              FlavorBite started with a simple mission: to provide delicious, high-quality meals while ensuring the customer experience is completely frictionless. 
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              To achieve this, we developed our custom <strong>Restaurant Order & Billing Management System</strong>. This platform allows us to manage our daily operations centrally, meaning your food is prepared faster, your billing is perfectly accurate, and our staff can focus entirely on food quality rather than paperwork.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-orange-600 w-6 h-6" />
                <span className="text-gray-800 font-medium text-lg">Real-time order tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-orange-600 w-6 h-6" />
                <span className="text-gray-800 font-medium text-lg">Secure and flexible payment options</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-orange-600 w-6 h-6" />
                <span className="text-gray-800 font-medium text-lg">Always fresh, dynamic digital menus</span>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant interior" 
              className="rounded-2xl w-full h-48 object-cover shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop" 
              alt="Customer billing" 
              className="rounded-2xl w-full h-48 object-cover shadow-md mt-8"
            />
          </div>
          
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-orange-600 py-16 text-center px-4">
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
          <p className="text-xl font-medium leading-relaxed opacity-90">
            "Whether you are dining in, picking up, or ordering delivery, our integrated management system ensures every single meal is prepared with care and delivered on time."
          </p>
        </div>
      </section>

    </div>
  );
}