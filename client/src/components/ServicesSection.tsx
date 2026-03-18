/* ============================================================
   DESIGN: Dark Luxury Tech — Services Section
   Service cards with icons, descriptions, and pricing hints
   ============================================================ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Zap, Bot, Palette, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "Full multi-page websites for restaurants, shops, and local businesses. Responsive, fast, and built to convert visitors into customers.",
    tags: ["HTML/CSS", "JavaScript", "Responsive"],
    color: "#00E5FF",
  },
  {
    icon: Smartphone,
    title: "Web Applications",
    description:
      "Custom React-based web apps with interactive UIs, real-time data, user authentication, and scalable architecture.",
    tags: ["React", "TypeScript", "APIs"],
    color: "#FFD700",
  },
  {
    icon: Bot,
    title: "AI-Powered Platforms",
    description:
      "Integrate AI capabilities into your product — chatbots, intelligent search, recommendation engines, and more using modern AI APIs.",
    tags: ["Gemini AI", "OpenAI", "LLMs"],
    color: "#00E5FF",
  },
  {
    icon: Palette,
    title: "UI/UX Design & Dev",
    description:
      "Pixel-perfect interfaces that feel premium. From design systems to component libraries, I bridge the gap between design and code.",
    tags: ["Tailwind", "Framer Motion", "shadcn/ui"],
    color: "#FFD700",
  },
  {
    icon: Zap,
    title: "Performance & SEO",
    description:
      "Optimize existing sites for speed, accessibility, and search engine visibility. Faster sites rank better and convert more.",
    tags: ["Lighthouse", "SEO", "Accessibility"],
    color: "#00E5FF",
  },
  {
    icon: BarChart3,
    title: "Digital Strategy",
    description:
      "Help businesses define their digital presence — from choosing the right tech stack to planning a launch roadmap that fits their budget.",
    tags: ["Consulting", "Planning", "Strategy"],
    color: "#FFD700",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            04 / Services
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            What I Can Build<br />
            <span className="text-gradient-mixed">For Your Business</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-white/50 text-base mt-6 max-w-xl mx-auto" style={{ fontFamily: "Outfit, sans-serif" }}>
            Whether you need a simple landing page or a complex web application, I bring the same level of
            craft and attention to detail to every project.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card glass-card-hover rounded-2xl p-7 group"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${service.color}12`,
                  border: `1px solid ${service.color}25`,
                }}
              >
                <service.icon className="w-6 h-6" style={{ color: service.color }} />
              </div>

              <h3
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {service.title}
              </h3>

              <p className="text-white/55 text-sm leading-relaxed mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tech-tag text-[11px]"
                    style={{
                      color: service.color,
                      borderColor: `${service.color}25`,
                      background: `${service.color}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-2xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              Have a project in mind?
            </h3>
            <p className="text-white/55 text-sm mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
              Let's talk about what you need and how I can help bring it to life.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[#0D0F14] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 glow-cyan text-sm"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Start a Conversation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
