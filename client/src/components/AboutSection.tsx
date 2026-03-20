/* ============================================================
   DESIGN: Editorial About — withradiance.com inspired
   - Fully responsive: stacked on mobile, side-by-side on desktop
   - Elevated language, Columbia University, no AI references
   - Interactive hover on highlight items
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/restaurant-mockup-bTyaJVhRjbR57eZ869h5zw.webp";
const BROOKLYN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/brooklyn-mockup-PmCkNYnh7JFzsNNFvbU2UY.webp";
const CODE_IMG = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80";

const highlights = [
  { label: "Location", value: "New York City, NY" },
  { label: "Focus", value: "Full-Stack Web Development" },
  { label: "Education", value: "Columbia University & Brooklyn College" },
  { label: "GitHub", value: "@ivanexee" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);

  return (
    <section id="about" style={{ background: "#F5F3EE", color: "#0D0D0D" }} ref={ref}>
      {/* Section header rule */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="section-num">(01)</span>
          <span className="section-category">(THE DEVELOPER)</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left: collage — hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block relative h-[560px]">
            {/* Restaurant mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={inView ? { opacity: 1, y: 0, rotate: -2 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="absolute top-0 left-0 w-[58%] shadow-xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            >
              <img src={RESTAURANT_IMG} alt="Huitlacoche Taqueria website" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: "rgba(13,13,13,0.82)" }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(240,238,232,0.7)", textTransform: "uppercase" }}>
                  Huitlacoche Taqueria
                </p>
              </div>
            </motion.div>

            {/* Brooklyn mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 2 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="absolute top-[28%] right-0 w-[52%] shadow-xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            >
              <img src={BROOKLYN_IMG} alt="Brooklyn MentorHub app" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: "rgba(13,13,13,0.82)" }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(240,238,232,0.7)", textTransform: "uppercase" }}>
                  BC MentorHub
                </p>
              </div>
            </motion.div>

            {/* Code image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute bottom-0 left-[8%] w-[35%] shadow-lg overflow-hidden animate-float-slow"
            >
              <img src={CODE_IMG} alt="Code" className="w-full h-auto object-cover" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="absolute top-[16%] right-[2%] px-4 py-3 shadow-lg animate-float"
              style={{ background: "#0D0D0D" }}
            >
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(240,238,232,0.65)", textTransform: "uppercase" }}>
                ▪ No limits.
              </p>
            </motion.div>
          </div>

          {/* Mobile: simple stacked images */}
          <div className="lg:hidden grid grid-cols-2 gap-3">
            <img src={RESTAURANT_IMG} alt="Huitlacoche Taqueria" className="w-full h-40 object-cover shadow-md" />
            <img src={BROOKLYN_IMG} alt="BC MentorHub" className="w-full h-40 object-cover shadow-md" />
          </div>

          {/* Right: editorial text */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", letterSpacing: "0.15em", color: "rgba(13,13,13,0.38)", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Why Ivan?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#0D0D0D", marginBottom: "1.5rem" }}
            >
              Every language.<br />Every platform.<br />Your vision — built.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "rgba(13,13,13,0.6)", lineHeight: 1.8, marginBottom: "1.25rem" }}
            >
              I'm Ivan — a New York City-based developer who has mastered the full spectrum of programming languages and frameworks. From a family-owned taqueria in Queens to a mentorship platform for Brooklyn College students, I build production-ready digital products that perform at the highest level.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "rgba(13,13,13,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}
            >
              Whether it's HTML, CSS, JavaScript, TypeScript, Python, Java, C++, or any framework in between — I command the tools, not the other way around. My education at Columbia University and Brooklyn College sharpened both my theoretical foundations and my real-world engineering instincts.
            </motion.p>

            {/* Highlights grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  onHoverStart={() => setHoveredHighlight(i)}
                  onHoverEnd={() => setHoveredHighlight(null)}
                  animate={{ borderLeftColor: hoveredHighlight === i ? "#0D0D0D" : "#00C8E0" }}
                  transition={{ duration: 0.2 }}
                  style={{ borderLeft: "2px solid #00C8E0", paddingLeft: "0.75rem", cursor: "default" }}
                >
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(13,13,13,0.33)", textTransform: "uppercase" }}>
                    {item.label}
                  </p>
                  <motion.p
                    animate={{ color: hoveredHighlight === i ? "#00C8E0" : "#0D0D0D" }}
                    transition={{ duration: 0.2 }}
                    style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", fontWeight: 500, marginTop: "2px" }}
                  >
                    {item.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="https://github.com/ivanexee"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F3EE] transition-colors duration-200"
              >
                View GitHub Profile →
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="border-t py-6 overflow-hidden" style={{ borderColor: "rgba(13,13,13,0.08)" }}>
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(13,13,13,0.28)", textTransform: "uppercase", textAlign: "center", marginBottom: "1.25rem" }}>
          Trusted by founders &amp; growing businesses
        </p>
        <div className="marquee-outer">
          <div className="marquee-track-slow">
            {[
              "Huitlacoche Taqueria", "Brooklyn College", "Columbia University", "React",
              "TypeScript", "Node.js", "Python", "Java", "C++", "Full-Stack Dev",
              "Huitlacoche Taqueria", "Brooklyn College", "Columbia University", "React",
              "TypeScript", "Node.js", "Python", "Java", "C++", "Full-Stack Dev",
            ].map((item, i) => (
              <span
                key={i}
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(0.85rem, 2vw, 1.05rem)", color: "rgba(13,13,13,0.16)", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
              >
                {item}
                <span style={{ margin: "0 2rem", color: "rgba(13,13,13,0.1)" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
