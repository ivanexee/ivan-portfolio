/* ============================================================
   DESIGN: Editorial Contact — withradiance.com inspired
   - Real contact: i.cxc@icloud.com | (347) 792-9029
   - HIGH CONTRAST form: bright labels, visible borders, clear placeholders
   - Form submits via mailto: so messages go to Ivan's iCloud
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, CheckCircle, Send } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "i.cxc@icloud.com", href: "mailto:i.cxc@icloud.com" },
  { icon: Phone, label: "Phone", value: "(347) 792-9029", href: "tel:+13477929029" },
  { icon: Github, label: "GitHub", value: "github.com/ivanexee", href: "https://github.com/ivanexee" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ivan-dev", href: "https://linkedin.com" },
  { icon: MapPin, label: "Location", value: "New York City, NY", href: null },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "rgba(255,255,255,0.07)",
  border: "1.5px solid rgba(255,255,255,0.22)",
  color: "#F0EEE8",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  borderRadius: "2px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "JetBrains Mono, monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.14em",
  color: "rgba(240,238,232,0.75)",
  textTransform: "uppercase" as const,
  marginBottom: "0.5rem",
  fontWeight: 500,
};

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website Inquiry from ${form.name}${form.company ? ` — ${form.company}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "N/A"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:i.cxc@icloud.com?subject=${subject}&body=${body}`;
    setTimeout(() => setSubmitted(true), 600);
  };

  const getInputStyle = (field: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === field ? "#00C8E0" : "rgba(255,255,255,0.22)",
    background: focused === field ? "rgba(0,200,224,0.05)" : "rgba(255,255,255,0.07)",
  });

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
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#0D0D0D", marginBottom: "3rem" }}
        >
          Ready to build<br />
          your website?<br />
          <span style={{ color: "#00C8E0" }}>Let's talk.</span>
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
              I'm currently available for new projects. Whether you're a restaurant owner, a startup founder, a school, or a growing business — I build websites that work. Fill out the form and I'll get back to you within 24 hours.
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

          {/* Right: Dark form — high contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div style={{ background: "#111318", padding: "clamp(1.5rem, 4vw, 2.5rem)", border: "1px solid rgba(255,255,255,0.07)" }}>
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
                    Your email client should have opened. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Form title */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#F0EEE8", letterSpacing: "-0.01em" }}>
                      Send a Message
                    </p>
                    <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", color: "rgba(240,238,232,0.45)", marginTop: "0.25rem" }}>
                      All fields marked * are required
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="John Smith"
                        style={getInputStyle("name")}
                        className="placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="john@company.com"
                        style={getInputStyle("email")}
                        className="placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Business / Organization</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused(null)}
                      placeholder="Your restaurant, company, or school name"
                      style={getInputStyle("company")}
                      className="placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Tell Me About Your Project *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="What kind of website do you need? What's your timeline and budget? Any specific features in mind?"
                      style={{ ...getInputStyle("message"), resize: "none" }}
                      className="placeholder:text-white/30"
                    />
                  </div>

                  {/* Helper text */}
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", color: "rgba(240,238,232,0.4)", lineHeight: 1.6 }}>
                    Clicking "Send Message" will open your email client pre-filled with your details, addressed to <span style={{ color: "#00C8E0" }}>i.cxc@icloud.com</span>.
                  </p>

                  <button
                    type="submit"
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.9rem 2rem", background: "#F0EEE8", color: "#0D0D0D", fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer", border: "none", transition: "background 0.2s" }}
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
