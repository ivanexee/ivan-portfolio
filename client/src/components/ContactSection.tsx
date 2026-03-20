/* ============================================================
   DESIGN: Editorial Contact — withradiance.com inspired
   - Light cream background
   - Numbered section header: (05) / (LET'S TALK)
   - Large editorial CTA heading
   - Two-column: left info panel, right dark form
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 400);
  };

  return (
    <section id="contact" style={{ background: "#F5F3EE", color: "#0D0D0D" }}>
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="section-num">(05)</span>
          <span className="section-category">(LET'S TALK)</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#0D0D0D", marginBottom: "3.5rem" }}
        >
          Let's build<br />
          <span style={{ color: "#00C8E0" }}>something</span><br />
          great together.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "rgba(13,13,13,0.58)", lineHeight: 1.8 }}>
              I'm currently available for freelance projects, contract work, and full-time opportunities. Whether you're a startup, a small business, or an institution — let's talk.
            </p>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00C8E0] animate-pulse" />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", letterSpacing: "0.12em", color: "rgba(13,13,13,0.5)", textTransform: "uppercase" }}>
                Available for new projects
              </span>
            </div>

            {/* Contact info */}
            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div style={{ width: "2rem", height: "2rem", border: "1px solid rgba(13,13,13,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <item.icon style={{ width: "0.85rem", height: "0.85rem", color: "rgba(13,13,13,0.5)" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(13,13,13,0.3)", textTransform: "uppercase" }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "#0D0D0D", fontWeight: 500 }}
                        className="hover:text-[#00C8E0] transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "#0D0D0D", fontWeight: 500 }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Dark form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div style={{ background: "#0D0D0D", padding: "2.5rem" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle style={{ width: "3rem", height: "3rem", color: "#00C8E0", marginBottom: "1rem" }} />
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#F0EEE8", marginBottom: "0.5rem" }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "rgba(240,238,232,0.5)" }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ display: "block", fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        style={{ width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0EEE8", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none" }}
                        className="focus:border-[#00C8E0] transition-colors duration-200 placeholder:text-white/20"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        style={{ width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0EEE8", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none" }}
                        className="focus:border-[#00C8E0] transition-colors duration-200 placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Your company or institution"
                      style={{ width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0EEE8", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none" }}
                      className="focus:border-[#00C8E0] transition-colors duration-200 placeholder:text-white/20"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project — what you need, your timeline, and any specific requirements..."
                      style={{ width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0EEE8", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none", resize: "none" }}
                      className="focus:border-[#00C8E0] transition-colors duration-200 placeholder:text-white/20"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: "#F0EEE8", color: "#0D0D0D", fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", border: "none", transition: "background 0.2s" }}
                    className="hover:bg-[#00C8E0] transition-colors duration-200"
                  >
                    <Send style={{ width: "0.85rem", height: "0.85rem" }} />
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
