"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message.");

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase =
    "w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-orange-600/10 blur-[110px] pointer-events-none" />
        <p className="relative text-orange-400 text-xs font-bold tracking-[0.3em] uppercase mb-5">
          Say Hello
        </p>
        <h1
          className="relative text-5xl md:text-7xl font-black text-white tracking-tight mb-5"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Get in{" "}
          <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
            Touch
          </em>
        </h1>
        <p className="relative text-white/40 text-lg max-w-md mx-auto leading-relaxed">
          Questions about our menu, reservations, or catering? We'd love to hear from you.
        </p>
      </section>

      {/* ── Main Grid ── */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* ── Contact Info ── */}
          <div className="space-y-5">
            {/* Info cards */}
            {[
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: "123 Flavor Street, Food City, FC 90210",
              },
              {
                icon: <Phone size={18} />,
                label: "Phone",
                value: "+1 (555) 123-4567",
              },
              {
                icon: <Mail size={18} />,
                label: "Email",
                value: "hello@flavorbite.com",
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="group flex items-center gap-5 bg-white/[0.03] border border-white/[0.07] hover:border-orange-500/25 rounded-2xl px-6 py-5 transition-all duration-200 hover:bg-white/[0.05]"
              >
                <div className="bg-orange-500/10 text-orange-400 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  {icon}
                </div>
                <div>
                  <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-white/75 text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}

            {/* Hours card */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-6 mt-2">
              <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">
                Opening Hours
              </p>
              <div className="space-y-2.5">
                {[
                  { day: "Mon – Fri", hours: "10:00 AM – 10:00 PM" },
                  { day: "Saturday", hours: "11:00 AM – 11:00 PM" },
                  { day: "Sunday", hours: "12:00 PM – 9:00 PM" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-white/45 text-sm">{day}</span>
                    <span className="text-white/70 text-sm font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="text-green-400" size={28} />
                </div>
                <h3
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Message Sent!
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-orange-400 hover:text-orange-300 font-semibold text-sm flex items-center gap-1.5 transition-colors"
                >
                  Send another message <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6">
                  <h2
                    className="text-2xl font-black text-white mb-1"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Send a message
                  </h2>
                  <p className="text-white/30 text-sm">We typically reply within a few hours.</p>
                </div>

                {error && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-white/35 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/35 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/35 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-400 disabled:bg-white/[0.06] disabled:text-white/25 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 text-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}