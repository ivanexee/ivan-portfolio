/* ============================================================
   DESIGN: Editorial Services — withradiance.com inspired
   - Light cream background
   - Numbered section header: (02) / (WHAT I DO)
   - Large editorial heading
   - Numbered accordion rows (001), (002)... that expand on click
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const services = [
  {
    num: "(001)",
    title: "Web Application Development",
    tagline: "From idea to production-ready app",
    description: "I build full-stack web applications from the ground up — React frontends, Node.js backends, database design, and API integrations. Whether it's a customer-facing product or an internal tool, I deliver clean, maintainable code that scales.",
  },
  {
    num: "(002)",
    title: "Restaurant & Local Business Websites",
    tagline: "Bring your business online beautifully",
    description: "Custom websites for restaurants, retail, and local businesses that actually drive customers. Full menu pages, reservation systems, Google Maps integration, photo galleries, and mobile-first design — everything a business needs to compete online.",
  },
  {
    num: "(003)",
    title: "AI-Powered Platform Development",
    tagline: "Future-proof your product with AI",
    description: "I integrate AI capabilities — chatbots, recommendation engines, smart search — into web platforms using APIs like Google Gemini, OpenAI, and more. I built an AI-powered professor-rating platform for Brooklyn College students as a real example.",
  },
  {
    num: "(004)",
    title: "UI/UX Design & Frontend Engineering",
    tagline: "Interfaces that feel crafted, not assembled",
    description: "Pixel-perfect, accessible, and performant user interfaces built with React, TypeScript, and Tailwind CSS. I care deeply about the user experience — smooth animations, intuitive navigation, and designs that convert.",
  },
  {
    num: "(005)",
    title: "Educational & Institutional Platforms",
    tagline: "Technology that empowers learning communities",
    description: "Custom platforms for schools, colleges, and educational organizations. Student portals, faculty directories, course management tools, and community platforms — built with the specific needs of academic institutions in mind.",
  },
  {
    num: "(006)",
    title: "Maintenance, Optimization & Consulting",
    tagline: "Keep your digital presence sharp",
    description: "Ongoing support, performance optimization, SEO improvements, and technical consulting for existing web properties. I help businesses identify what's slowing them down and fix it — fast.",
  },
];

function AccordionRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      style={{ borderBottom: "1px solid rgba(13,13,13,0.1)" }}
    >
      <button
        className="w-full flex items-center gap-5 py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {/* Number */}
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(13,13,13,0.28)", minWidth: "3.5rem", flexShrink: 0 }}>
          {service.num}
        </span>

        {/* Title */}
        <span
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 1.8vw, 1.3rem)", color: open ? "#00C8E0" : "#0D0D0D", letterSpacing: "-0.02em", flex: 1, transition: "color 0.2s" }}
        >
          {service.title}
        </span>

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
      </button>

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
          I build your entire digital ecosystem.
        </motion.h2>
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
