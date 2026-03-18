/* ============================================================
   DESIGN: Dark Luxury Tech — Contact Section
   Contact form with glass card, social links, and info panel
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "ivan.dev@outlook.com", href: "mailto:ivan.dev@outlook.com" },
  { icon: Github, label: "GitHub", value: "github.com/ivanexee", href: "https://github.com/ivanexee" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ivan-dev", href: "https://linkedin.com" },
  { icon: MapPin, label: "Location", value: "New York City, NY", href: null },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            05 / Contact
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            Let's Build<br />
            <span className="text-gradient-cyan">Something Together</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                Ready to work together?
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>
                I'm currently available for freelance projects, contract work, and full-time opportunities.
                Whether you're a startup, a small business, or an institution — let's talk.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/35 mb-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="text-sm text-white/80 hover:text-cyan-400 transition-colors"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-white/80" style={{ fontFamily: "Outfit, sans-serif" }}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass-card rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Currently Available
                  </p>
                  <p className="text-xs text-white/40" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Response within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-white/55 text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Your company or institution"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project — what you need, your timeline, and any specific requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200 resize-none"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[#0D0F14] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 glow-cyan text-sm"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
