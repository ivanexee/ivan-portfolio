/* ============================================================
   DESIGN: Editorial Services — withradiance.com inspired
   - Elevated language, no AI references
   - Business-focused: "Your business deserves a website that works as hard as you do"
   - Numbered accordion rows (001)–(006)
   - Interactive: hover highlights row, click expands
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const services = [
  {
    num: "(001)",
    title: "Business Website Development",
    tagline: "Your storefront on the internet",
    description: "A professionally built website is the most powerful marketing tool your business can have. I design and develop custom websites for restaurants, retail stores, service businesses, and local brands — fully responsive, fast-loading, and built to convert visitors into customers.",
  },
  {
    num: "(002)",
    title: "Full-Stack Web Application Development",
    tagline: "From concept to production-ready product",
    description: "I build complete web applications from the ground up — dynamic frontends, robust backends, database architecture, and API integrations. Whether you need a customer portal, a booking system, or an internal tool, I deliver clean, scalable code that grows with your business.",
  },
  {
    num: "(003)",
    title: "E-Commerce & Online Ordering Systems",
    tagline: "Sell more. Everywhere.",
    description: "Custom e-commerce solutions and online ordering platforms built specifically for your business model. Menu pages, product catalogs, payment integrations, and order management — everything your business needs to sell online without relying on expensive third-party platforms.",
  },
  {
    num: "(004)",
    title: "UI/UX Design & Frontend Engineering",
    tagline: "Interfaces that feel crafted, not assembled",
    description: "Pixel-perfect, accessible, and performant user interfaces built with React, TypeScript, and modern CSS frameworks. I care deeply about the user experience — smooth animations, intuitive navigation, and designs that reflect your brand identity and convert.",
  },
  {
    num: "(005)",
    title: "Educational & Institutional Platforms",
    tagline: "Technology that empowers learning communities",
    description: "Custom platforms for schools, colleges, and educational organizations. Student portals, faculty directories, course management tools, and community platforms — built with the specific needs of academic institutions in mind. Proven by my work at Brooklyn College.",
  },
  {
    num: "(006)",
    title: "Maintenance, SEO & Performance Optimization",
    tagline: "Keep your digital presence sharp",
    description: "Ongoing support, performance optimization, SEO improvements, and technical consulting for existing web properties. I help businesses identify what's slowing them down — page speed, search rankings, outdated code — and fix it fast.",
  },
];

function AccordionRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      style={{ borderBottom: "1px solid rgba(13,13,13,0.1)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.button
        className="w-full flex items-center gap-5 py-6 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        animate={{ background: hovered && !open ? "rgba(0,200,224,0.03)" : "transparent" }}
        transition={{ duration: 0.2 }}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.5rem 0", textAlign: "left", background: "transparent", border: "none", cursor: "pointer" }}
      >
        {/* Number */}
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(13,13,13,0.28)", minWidth: "3.5rem", flexShrink: 0 }}>
          {service.num}
        </span>

        {/* Title */}
        <motion.span
          animate={{ color: open ? "#00C8E0" : hovered ? "#0D0D0D" : "#0D0D0D" }}
          transition={{ duration: 0.2 }}
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 1.8vw, 1.3rem)", letterSpacing: "-0.02em", flex: 1 }}
        >
          {service.title}
        </motion.span>

        {/* Tagline (hidden on mobile) */}
        <span
          className="hidden md:block"
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", color: "rgba(13,13,13,0.35)", fontStyle: "italic", flex: "0 0 auto", maxWidth: "240px", textAlign: "right" }}
        >
          {service.tagline}
        </span>

        {/* Toggle icon */}
        <div className="flex-shrink-0 ml-4">
          {open
            ? <Minus className="w-4 h-4 text-[#00C8E0]" />
            : <Plus className="w-4 h-4" style={{ color: "rgba(13,13,13,0.35)" }} />
          }
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-7" style={{ paddingLeft: "5.5rem", paddingRight: "3rem" }}>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem", color: "rgba(13,13,13,0.58)", lineHeight: 1.8, maxWidth: "600px" }}>
                {service.description}
              </p>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#00C8E0", display: "inline-block", marginTop: "1rem" }}
                className="hover:underline"
              >
                Get a quote →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" style={{ background: "#F5F3EE", color: "#0D0D0D" }}>
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="section-num">(02)</span>
          <span className="section-category">(WHAT I DO)</span>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.8rem)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#0D0D0D", maxWidth: "700px" }}
        >
          Your business deserves a website that works as hard as you do.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "rgba(13,13,13,0.5)", lineHeight: 1.7, maxWidth: "500px", marginTop: "1.25rem" }}
        >
          Click any service below to learn more about what I can build for you.
        </motion.p>
      </div>

      {/* Accordion rows */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-20" style={{ borderTop: "1px solid rgba(13,13,13,0.1)" }}>
        {services.map((service, i) => (
          <AccordionRow key={service.num} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
