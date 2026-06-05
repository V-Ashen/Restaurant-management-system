import { CheckCircle, Utensils, Zap, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[200px] h-[200px] rounded-full bg-amber-500/6 blur-[80px] pointer-events-none" />

        <p className="relative text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-5">
          Our Story
        </p>
        <h1
          className="relative text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          About{" "}
          <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
            FlavorBite
          </em>
        </h1>
        <p className="relative text-white/45 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Delivering exceptional culinary experiences with a seamless, modern ordering system.
        </p>
      </section>

      {/* ── Story & System ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <h2
              className="text-4xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Our Story &{" "}
              <span className="text-white/30">System</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              FlavorBite started with a simple mission: to provide delicious, high-quality meals while ensuring the customer experience is completely frictionless.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              To achieve this, we developed our custom{" "}
              <span className="text-white/80 font-semibold">Restaurant Order & Billing Management System</span>.
              {" "}This platform allows us to manage daily operations centrally — meaning your food is prepared faster, billing is perfectly accurate, and our staff can focus entirely on quality.
            </p>

            <div className="space-y-4">
              {[
                "Real-time order tracking",
                "Secure and flexible payment options",
                "Always fresh, dynamic digital menus",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-3.5 hover:border-orange-500/25 transition-colors"
                >
                  <CheckCircle className="text-orange-400 shrink-0" size={18} />
                  <span className="text-white/70 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop"
              alt="Restaurant interior"
              className="rounded-2xl w-full h-52 object-cover"
              style={{ filter: "brightness(0.75) saturate(0.9)" }}
            />
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
              alt="Customer billing"
              className="rounded-2xl w-full h-52 object-cover mt-10"
              style={{ filter: "brightness(0.75) saturate(0.9)" }}
            />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">What Drives Us</p>
            <h2
              className="text-4xl font-black text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Built on three pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Utensils size={20} />,
                title: "Quality First",
                desc: "Every ingredient is hand-picked and every dish is crafted to perfection by our expert kitchen team.",
                num: "01",
              },
              {
                icon: <Zap size={20} />,
                title: "Speed & Precision",
                desc: "Our integrated system means your order goes from tap to table without a single hiccup.",
                num: "02",
              },
              {
                icon: <ShieldCheck size={20} />,
                title: "Trust & Transparency",
                desc: "Accurate billing, honest pricing, and real-time updates — no surprises, ever.",
                num: "03",
              },
            ].map(({ icon, title, desc, num }) => (
              <div
                key={title}
                className="group relative bg-white/[0.03] border border-white/[0.07] hover:border-orange-500/30 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="absolute top-6 right-6 text-white/[0.06] text-5xl font-black group-hover:text-orange-500/10 transition-colors">
                  {num}
                </div>
                <div className="bg-orange-500/10 text-orange-400 w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  {icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commitment Quote ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-orange-600/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-8">Our Commitment</p>
          <blockquote
            className="text-3xl md:text-4xl font-black text-white leading-snug mb-8"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            "Whether you are dining in, picking up, or ordering delivery — every meal is{" "}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              prepared with care
            </em>{" "}
            and delivered on time."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-white/10" />
            <span className="text-white/30 text-sm font-medium">The FlavorBite Team</span>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

    </div>
  );
}