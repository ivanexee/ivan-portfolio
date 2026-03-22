/* ============================================================
   DESIGN: Editorial About — withradiance.com inspired
   - Fully responsive: stacked on mobile, side-by-side on desktop
   - Elevated language, Columbia University, no AI references
   - Interactive hover on highlight items
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const IVAN_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/ivan-photo_226dbee6.jpg";
const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/restaurant-mockup-bTyaJVhRjbR57eZ869h5zw.webp";
const BROOKLYN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/brooklyn-mockup-PmCkNYnh7JFzsNNFvbU2UY.webp";

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

          {/* Left: Ivan's photo — editorial frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative flex justify-center lg:justify-start"
            style={{ paddingBottom: "18px", paddingRight: "18px" }}
          >
            {/* Offset decorative border */}
            <div style={{
              position: "absolute",
              top: "18px", left: "18px",
              right: "0px", bottom: "0px",
              border: "2px solid #00C8E0",
              zIndex: 0,
            }} />

            {/* Photo container */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "min(380px, 90vw)",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
            }}>
              <img
                src={IVAN_PHOTO}
                alt="Ivan — App Developer"
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center top",
                  aspectRatio: "3/4",
                  filter: "contrast(1.04) brightness(1.02)",
                }}
              />

              {/* Gradient overlay at bottom */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "38%",
                background: "linear-gradient(to top, rgba(13,13,13,0.78) 0%, transparent 100%)",
              }} />

              {/* Name tag overlay */}
              <div style={{
                position: "absolute",
                bottom: "1.5rem", left: "1.5rem",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#F5F3EE", letterSpacing: "-0.02em", lineHeight: 1.1 }}>Ivan</p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.52rem", letterSpacing: "0.14em", color: "rgba(240,238,232,0.55)", textTransform: "uppercase", marginTop: "4px" }}>App Developer · NYC</p>
              </div>

              {/* Cyan accent bar */}
              <div style={{
                position: "absolute",
                top: 0, left: 0,
                width: "3px", height: "100%",
                background: "linear-gradient(to bottom, #00C8E0, transparent)",
              }} />
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="animate-float"
              style={{
                position: "absolute",
                top: "-1rem", right: "0rem",
                background: "#0D0D0D",
                padding: "0.75rem 1.1rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                zIndex: 2,
              }}
            >
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#00C8E0", lineHeight: 1 }}>15+</p>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.48rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.45)", textTransform: "uppercase", marginTop: "4px" }}>Projects</p>
            </motion.div>
          </motion.div>

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
