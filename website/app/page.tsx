import Link from "next/link";
import { ArrowRight, Utensils, Clock, Truck, Star, Users, ShoppingBag, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] font-sans">



      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover scale-105"
            style={{ filter: "brightness(0.3) saturate(0.8)" }}
          />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(234,88,12,0.18),transparent)]" />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Pill tag */}
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 backdrop-blur-md text-white/80 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Fresh · Fast · Delivered
          </div>

          <h1
            className="text-[clamp(3rem,9vw,7rem)] font-black text-white leading-[0.9] tracking-tight mb-8"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Food that
            <br />
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              moves you.
            </em>
          </h1>

          <p className="text-white/55 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
            Restaurant-quality meals crafted with fresh ingredients, delivered to your door in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/menu"
              className="group flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Order Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/menu"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Browse the menu
              <ChevronDown size={14} />
            </Link>
          </div>
        </div>

      </section>

      {/* ── Stats ── */}
      <section className="bg-[#0f0f0f] border-y border-white/5 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { icon: <Users size={20} />, value: "10K+", label: "Happy Customers" },
              { icon: <ShoppingBag size={20} />, value: "500+", label: "Orders Daily" },
              { icon: <Star size={20} />, value: "4.9", label: "Customer Rating" },
            ].map(({ icon, value, label }) => (
              <div key={label} className="group">
                <div className="flex justify-center mb-3 text-orange-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  {icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-white tracking-tight">{value}</div>
                <div className="text-white/35 text-sm mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-28 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-20">
            <p className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Why Us</p>
            <h2
              className="text-5xl md:text-6xl font-black text-white leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Crafted for
              <br />
              <span className="text-white/30">the discerning.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Utensils size={22} />,
                title: "Premium Quality",
                desc: "Fresh ingredients sourced daily, prepared by expert chefs who care about every detail.",
                num: "01",
              },
              {
                icon: <Clock size={22} />,
                title: "Quick Service",
                desc: "From kitchen to door in under 30 minutes. We respect your time as much as your taste.",
                num: "02",
              },
              {
                icon: <Truck size={22} />,
                title: "Home Delivery",
                desc: "Enjoy restaurant-quality meals without leaving the comfort of your home.",
                num: "03",
              },
            ].map(({ icon, title, desc, num }) => (
              <div
                key={title}
                className="group relative bg-white/[0.03] border border-white/[0.07] hover:border-orange-500/30 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="absolute top-6 right-6 text-white/8 text-5xl font-black group-hover:text-orange-500/10 transition-colors">
                  {num}
                </div>
                <div className="bg-orange-500/10 text-orange-400 w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  {icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Explore</p>
              <h2
                className="text-5xl font-black text-white"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Popular picks
              </h2>
            </div>
            <Link href="/menu" className="text-white/40 hover:text-orange-400 text-sm font-medium transition-colors flex items-center gap-1">
              All categories <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🍕", name: "Pizza", count: "24 items" },
              { emoji: "🍔", name: "Burgers", count: "18 items" },
              { emoji: "🍝", name: "Pasta", count: "15 items" },
              { emoji: "🍰", name: "Desserts", count: "20 items" },
            ].map((cat) => (
              <Link
                href={`/menu?category=${cat.name.toLowerCase()}`}
                key={cat.name}
                className="group relative aspect-square bg-white/[0.03] border border-white/[0.07] hover:border-orange-500/25 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-white/[0.06] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-500" />
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                <div className="text-center">
                  <div className="text-white font-bold text-lg">{cat.name}</div>
                  <div className="text-white/30 text-xs">{cat.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 overflow-hidden bg-[#0a0a0a]">
        {/* decorative blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-400/8 blur-[80px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-6">Get Started</p>
          <h2
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-8"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Your next
            <br />
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              favourite meal
            </em>
            <br />
            awaits.
          </h2>
          <p className="text-white/45 text-lg mb-12 leading-relaxed">
            Browse our full menu and enjoy restaurant-quality food delivered straight to you.
          </p>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 bg-white hover:bg-orange-50 text-[#0a0a0a] font-black text-lg px-10 py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1"
          >
            Explore Full Menu
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#080808] border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍴</span>
            <span className="text-white font-black tracking-tight">FlavorBite</span>
          </div>
          <p className="text-white/25 text-sm">© 2026 FlavorBite. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link key={item} href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}