/* ============================================================
   DESIGN: Dark Hero — withradiance.com inspired editorial style
   - Oversized "IVAN" viewport-width display name
   - Tagline above: "Build Fast. Build Smart. Build Once."
   - Cinematic dark background image
   - Minimal layout: tagline top, big name center, subtitle + CTA bottom
   - Scroll indicator at bottom right
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/hero-dark-bg-jjsBD9P9pySXUkzJ8kAmMm.webp";

export default function HeroSection() {
  const [fontSize, setFontSize] = useState(160);
  const containerRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calcSize = () => {
      const vw = window.innerWidth;
      const padding = vw < 640 ? 48 : vw < 1024 ? 64 : 96;
      const available = vw - padding;
      // Binary search for best font size
      let lo = 40, hi = 400;
      const span = testRef.current;
      if (!span) return;
      while (hi - lo > 1) {
        const mid = (lo + hi) / 2;
        span.style.fontSize = `${mid}px`;
        if (span.offsetWidth <= available) lo = mid;
        else hi = mid;
      }
      setFontSize(lo);
    };
    calcSize();
    window.addEventListener("resize", calcSize);
    return () => window.removeEventListener("resize", calcSize);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0D0F12" }}
    >
      {/* Hidden span for measuring text width */}
      <span
        ref={testRef}
        aria-hidden="true"
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          top: 0, left: 0,
        }}
      >
        IVAN
      </span>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.22, objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0D0F12 0%, transparent 30%, transparent 60%, #0D0F12 100%)" }} />
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className="relative z-10 flex flex-col justify-between flex-1 min-h-screen px-6 lg:px-12 py-20 max-w-[1440px] mx-auto w-full"
      >
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-start justify-between pt-4"
        >
          <div>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.18em", color: "rgba(240,238,232,0.35)", textTransform: "uppercase" }}>
              Build Fast. Build Smart.
            </p>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.18em", color: "rgba(240,238,232,0.35)", textTransform: "uppercase", marginTop: "2px" }}>
              Build Once.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E0] animate-pulse" />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.35)", textTransform: "uppercase" }}>
              Open to work
            </span>
          </div>
        </motion.div>

        {/* Center: oversized name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <h1
            className="display-xl text-[#F0EEE8] leading-none select-none"
            style={{ fontSize: `${fontSize}px` }}
          >
            IVAN
          </h1>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4"
        >
          {/* Left: subtitle + CTA */}
          <div className="max-w-lg">
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "rgba(240,238,232,0.55)", lineHeight: 1.7 }}>
              A full-stack developer who builds custom web applications for businesses, restaurants, and educational institutions. Clean code. Real results.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
                className="px-6 py-2.5 bg-[#F0EEE8] text-[#0D0F12] font-semibold hover:bg-[#00C8E0] transition-colors duration-200"
              >
                View Work
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
                className="px-6 py-2.5 border border-[#F0EEE8]/25 text-[#F0EEE8]/60 hover:border-[#00C8E0] hover:text-[#00C8E0] transition-colors duration-200"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Right: stats + scroll */}
          <div className="flex items-end gap-10">
            {[
              { num: "3+", label: "Apps Shipped" },
              { num: "2+", label: "Companies" },
              { num: "10+", label: "Tech Stack" },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2rem", color: "#F0EEE8", lineHeight: 1 }}>
                  {s.num}
                </p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase", marginTop: "4px" }}>
                  {s.label}
                </p>
              </div>
            ))}
            <button
              onClick={scrollToAbout}
              className="flex flex-col items-center gap-1.5 text-[#F0EEE8]/25 hover:text-[#00C8E0] transition-colors ml-4"
              aria-label="Scroll down"
            >
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Scroll
              </span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
