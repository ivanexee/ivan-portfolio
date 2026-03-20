/* ============================================================
   DESIGN: Editorial Footer — withradiance.com inspired
   - Dark background (#0D0D0D)
   - Real contact: i.cxc@icloud.com | (347) 792-9029
   - Oversized viewport-width "IVAN" display text at bottom
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone, ArrowUp } from "lucide-react";

export default function Footer() {
  const [fontSize, setFontSize] = useState(200);
  const testRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calcSize = () => {
      const vw = window.innerWidth;
      const span = testRef.current;
      if (!span) return;
      let lo = 40, hi = 600;
      while (hi - lo > 1) {
        const mid = (lo + hi) / 2;
        span.style.fontSize = `${mid}px`;
        if (span.offsetWidth <= vw) lo = mid;
        else hi = mid;
      }
      setFontSize(lo);
    };
    calcSize();
    window.addEventListener("resize", calcSize);
    return () => window.removeEventListener("resize", calcSize);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "#0D0D0D", color: "#F0EEE8", overflow: "hidden" }}>
      {/* Hidden span for measuring */}
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

      {/* Top section */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Left: tagline */}
          <div>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#F0EEE8", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Ivan.
            </p>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem", color: "rgba(240,238,232,0.4)", maxWidth: "280px", lineHeight: 1.7 }}>
              Building world-class websites and web applications for businesses, institutions, and communities across New York and beyond.
            </p>
          </div>

          {/* Right: links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.14em", color: "rgba(240,238,232,0.25)", textTransform: "uppercase", marginBottom: "1rem" }}>
                Navigate
              </p>
              <div className="flex flex-col gap-3">
                {["About", "Services", "Work", "Skills", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); document.querySelector(`#${link.toLowerCase() === "work" ? "projects" : link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" }); }}
                    style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "rgba(240,238,232,0.55)", fontWeight: 400 }}
                    className="hover:text-[#00C8E0] transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.14em", color: "rgba(240,238,232,0.25)", textTransform: "uppercase", marginBottom: "1rem" }}>
                Connect
              </p>
              <div className="flex flex-col gap-3">
                <a href="mailto:i.cxc@icloud.com"
                  style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "rgba(240,238,232,0.55)" }}
                  className="hover:text-[#00C8E0] transition-colors duration-200 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> i.cxc@icloud.com
                </a>
                <a href="tel:+13477929029"
                  style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "rgba(240,238,232,0.55)" }}
                  className="hover:text-[#00C8E0] transition-colors duration-200 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> (347) 792-9029
                </a>
                <a href="https://github.com/ivanexee" target="_blank" rel="noreferrer"
                  style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "rgba(240,238,232,0.55)" }}
                  className="hover:text-[#00C8E0] transition-colors duration-200 flex items-center gap-2">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                  style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "rgba(240,238,232,0.55)" }}
                  className="hover:text-[#00C8E0] transition-colors duration-200 flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(240,238,232,0.07)", marginTop: "3rem", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(240,238,232,0.2)", textTransform: "uppercase" }}>
            © {new Date().getFullYear()} Ivan. All rights reserved. · Columbia University & Brooklyn College
          </p>
          <button
            onClick={scrollToTop}
            style={{ width: "2rem", height: "2rem", border: "1px solid rgba(240,238,232,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,238,232,0.35)", cursor: "pointer", background: "transparent" }}
            className="hover:border-[#00C8E0] hover:text-[#00C8E0] transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Oversized IVAN text — like RADIANCE footer */}
      <div style={{ overflow: "hidden", lineHeight: 0.85, paddingBottom: "0" }}>
        <h2
          className="display-xl select-none"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: `${fontSize}px`,
            letterSpacing: "-0.04em",
            color: "rgba(240,238,232,0.04)",
            whiteSpace: "nowrap",
            display: "block",
            lineHeight: 0.85,
            paddingLeft: "0",
            marginLeft: "-0.02em",
          }}
        >
          IVAN
        </h2>
      </div>
    </footer>
  );
}
