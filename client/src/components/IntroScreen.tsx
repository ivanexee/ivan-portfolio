/* ============================================================
   DESIGN: Cinematic Intro Entrance Screen
   - Dark overlay with a 3D laptop mockup in the center
   - "Click to open" prompt
   - On click: laptop lid opens (CSS 3D transform)
   - Slideshow of project screenshots plays on the screen
   - Then the whole overlay fades out → main portfolio revealed
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/restaurant-mockup-bTyaJVhRjbR57eZ869h5zw.webp";
const BROOKLYN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/brooklyn-mockup-PmCkNYnh7JFzsNNFvbU2UY.webp";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/hero-dark-bg-jjsBD9P9pySXUkzJ8kAmMm.webp";

const SLIDES = [
  { img: HERO_BG, label: "Ivan — Full-Stack Developer" },
  { img: RESTAURANT_IMG, label: "Huitlacoche Taqueria · Restaurant Website" },
  { img: BROOKLYN_IMG, label: "BC MentorHub · University Platform" },
  { img: HERO_BG, label: "Every Language. Every Platform. Every Vision." },
];

type Phase = "idle" | "opening" | "slideshow" | "exiting";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [slideIndex, setSlideIndex] = useState(0);
  const [lidAngle, setLidAngle] = useState(0); // 0 = closed, 1 = fully open
  const slideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate lid opening
  useEffect(() => {
    if (phase !== "opening") return;
    let start: number | null = null;
    const duration = 1200; // ms
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setLidAngle(eased);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase("slideshow");
      }
    };
    requestAnimationFrame(animate);
  }, [phase]);

  // Auto-advance slides
  useEffect(() => {
    if (phase !== "slideshow") return;
    slideTimer.current = setTimeout(() => {
      if (slideIndex < SLIDES.length - 1) {
        setSlideIndex((i) => i + 1);
      } else {
        setPhase("exiting");
        setTimeout(onComplete, 900);
      }
    }, 1600);
    return () => { if (slideTimer.current) clearTimeout(slideTimer.current); };
  }, [phase, slideIndex, onComplete]);

  const handleClick = () => {
    if (phase === "idle") setPhase("opening");
  };

  // Lid open angle: 0deg = closed (flat), -110deg = fully open
  const lidRotateX = -110 * lidAngle;

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#08090B", cursor: phase === "idle" ? "pointer" : "default" }}
          onClick={handleClick}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,200,224,0.08) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />

          {/* Laptop container — 3D perspective */}
          <div
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 60%",
              width: "min(520px, 88vw)",
              position: "relative",
            }}
          >
            {/* Lid (screen) */}
            <div
              style={{
                transformOrigin: "bottom center",
                transform: `rotateX(${lidRotateX}deg)`,
                transition: "none",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Screen bezel */}
              <div
                style={{
                  background: "#1A1C20",
                  border: "2px solid #2A2D33",
                  borderRadius: "12px 12px 0 0",
                  padding: "10px",
                  boxShadow: "0 -8px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {/* Camera dot */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2A2D33" }} />
                </div>
                {/* Screen area */}
                <div
                  style={{
                    background: "#0D0F12",
                    borderRadius: "6px",
                    overflow: "hidden",
                    aspectRatio: "16/10",
                    position: "relative",
                  }}
                >
                  {phase === "idle" && (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ width: "32px", height: "32px", border: "1.5px solid rgba(0,200,224,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "0", height: "0", borderLeft: "8px solid rgba(0,200,224,0.7)", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", marginLeft: "2px" }} />
                      </div>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase" }}>
                        Click to open
                      </p>
                    </div>
                  )}

                  {phase === "opening" && (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "20px", height: "20px", border: "2px solid rgba(0,200,224,0.6)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                    </div>
                  )}

                  {phase === "slideshow" && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slideIndex}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.5 }}
                        style={{ position: "absolute", inset: 0 }}
                      >
                        <img
                          src={SLIDES[slideIndex].img}
                          alt={SLIDES[slideIndex].label}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        {/* Slide label */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 10px", background: "rgba(13,13,13,0.75)" }}>
                          <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(240,238,232,0.6)", textTransform: "uppercase" }}>
                            {SLIDES[slideIndex].label}
                          </p>
                        </div>
                        {/* Slide dots */}
                        <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", gap: "4px" }}>
                          {SLIDES.map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: i === slideIndex ? "14px" : "4px",
                                height: "4px",
                                borderRadius: "2px",
                                background: i === slideIndex ? "#00C8E0" : "rgba(240,238,232,0.25)",
                                transition: "width 0.3s",
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>

            {/* Base (keyboard) */}
            <div
              style={{
                background: "linear-gradient(to bottom, #1E2025, #16181C)",
                border: "2px solid #2A2D33",
                borderTop: "none",
                borderRadius: "0 0 14px 14px",
                height: "22px",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
              }}
            >
              {/* Trackpad */}
              <div style={{ position: "absolute", bottom: "4px", left: "50%", transform: "translateX(-50%)", width: "80px", height: "10px", background: "#2A2D33", borderRadius: "3px" }} />
            </div>

            {/* Shadow */}
            <div style={{ position: "absolute", bottom: "-30px", left: "10%", right: "10%", height: "30px", background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)", filter: "blur(8px)" }} />
          </div>

          {/* Bottom label */}
          <AnimatePresence>
            {phase === "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: "2.5rem", textAlign: "center" }}
              >
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "rgba(240,238,232,0.9)", letterSpacing: "-0.02em" }}>
                  Ivan's Portfolio
                </p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase", marginTop: "0.4rem" }}>
                  Click the laptop to enter
                </p>
                {/* Pulse ring */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1.25rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00C8E0", animation: "pulse-ring 2s ease-out infinite" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button */}
          {phase !== "idle" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={(e) => { e.stopPropagation(); setPhase("exiting"); setTimeout(onComplete, 900); }}
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "2rem",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(240,238,232,0.3)",
                background: "transparent",
                border: "1px solid rgba(240,238,232,0.12)",
                padding: "6px 14px",
                cursor: "pointer",
              }}
              className="hover:text-[#00C8E0] hover:border-[#00C8E0] transition-colors duration-200"
            >
              Skip →
            </motion.button>
          )}

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes pulse-ring {
              0% { box-shadow: 0 0 0 0 rgba(0,200,224,0.5); }
              70% { box-shadow: 0 0 0 12px rgba(0,200,224,0); }
              100% { box-shadow: 0 0 0 0 rgba(0,200,224,0); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
