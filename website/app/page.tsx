import Link from "next/link";
import {
  ArrowRight,
  Utensils,
  Clock,
  Truck,
  Star,
  Users,
  ShoppingBag,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
            alt="Delicious food background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-center">
          {/* Badges */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            <span className="bg-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              🍴 Fresh Food Daily
            </span>

            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
              🚚 Fast Delivery
            </span>

            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
              ⭐ Top Rated Restaurant
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Delicious Food,
            <br />
            <span className="text-orange-500">
              Delivered To Your Door
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-2xl max-w-3xl mx-auto text-gray-300">
            Experience mouth-watering meals prepared with fresh ingredients and
            delivered hot, fast, and right when you need them.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/menu"
              className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
            >
              Order Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="mx-auto mb-3" size={32} />
              <h3 className="text-4xl font-bold">10K+</h3>
              <p className="text-orange-100">Happy Customers</p>
            </div>

            <div>
              <ShoppingBag className="mx-auto mb-3" size={32} />
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="text-orange-100">Orders Daily</p>
            </div>

            <div>
              <Star className="mx-auto mb-3" size={32} />
              <h3 className="text-4xl font-bold">4.9/5</h3>
              <p className="text-orange-100">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              We bring quality food and exceptional service to your table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-orange-50 p-8 rounded-3xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-orange-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                <Utensils size={36} />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Premium Quality
              </h3>

              <p className="text-gray-600">
                Fresh ingredients sourced daily and prepared by expert chefs.
              </p>
            </div>

            <div className="group bg-orange-50 p-8 rounded-3xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-orange-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                <Clock size={36} />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Quick Service
              </h3>

              <p className="text-gray-600">
                Fast preparation and efficient delivery to save your time.
              </p>
            </div>

            <div className="group bg-orange-50 p-8 rounded-3xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-orange-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                <Truck size={36} />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Home Delivery
              </h3>

              <p className="text-gray-600">
                Enjoy restaurant-quality meals from the comfort of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Popular Categories
            </h2>
            <p className="text-gray-600 mt-4">
              Discover your favorite meals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                emoji: "🍕",
                name: "Pizza",
              },
              {
                emoji: "🍔",
                name: "Burgers",
              },
              {
                emoji: "🍝",
                name: "Pasta",
              },
              {
                emoji: "🍰",
                name: "Desserts",
              },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="text-5xl mb-4">
                  {category.emoji}
                </div>

                <h3 className="text-xl font-bold">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready To Order?
          </h2>

          <p className="text-xl text-orange-100 mb-10">
            Browse our delicious menu and enjoy your favorite meals today.
          </p>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore Full Menu
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}