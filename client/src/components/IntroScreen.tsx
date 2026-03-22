/* ============================================================
   DESIGN: Cinematic 5-Phase Intro Sequence
   Phase 1 — IDLE:    Dark screen, laptop closed, "Click to enter" prompt
   Phase 2 — OPENING: Lid opens in 3D toward the viewer (perspective)
   Phase 3 — FACE:    Facial recognition scan UI — outline, beam, "Access Granted"
   Phase 4 — ZOOM:    Viewport zooms into the laptop screen (scale to fill)
   Phase 5 — LOADING: Full-screen dark loader with IVAN logo + progress bar
   Phase 6 — DONE:    Fades out → main portfolio revealed
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────── */
type Phase = "idle" | "opening" | "face" | "zoom" | "loading" | "exiting";

interface IntroScreenProps {
  onComplete: () => void;
}

/* ── Face scan sub-states ───────────────────────────────────── */
type FaceState = "scanning" | "granted";

/* ── Helpers ────────────────────────────────────────────────── */
function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/* ── Face Recognition Screen ────────────────────────────────── */
function FaceScreen({ onGranted }: { onGranted: () => void }) {
  const [faceState, setFaceState] = useState<FaceState>("scanning");
  const [scanY, setScanY] = useState(0);
  const [dots, setDots] = useState<{ x: number; y: number; delay: number }[]>([]);
  const [progress, setProgress] = useState(0);

  // Generate random face-mesh dots
  useEffect(() => {
    const generated = Array.from({ length: 28 }, () => ({
      x: 20 + Math.random() * 60,
      y: 15 + Math.random() * 70,
      delay: Math.random() * 0.8,
    }));
    setDots(generated);
  }, []);

  // Animate scan beam
  useInterval(() => {
    setScanY((y) => {
      const next = y + 1.4;
      return next > 100 ? 0 : next;
    });
  }, faceState === "scanning" ? 16 : null);

  // Progress bar
  useInterval(() => {
    setProgress((p) => {
      if (p >= 100) return 100;
      return p + 1.2;
    });
  }, faceState === "scanning" ? 30 : null);

  // Trigger granted at 100%
  useEffect(() => {
    if (progress >= 100 && faceState === "scanning") {
      setFaceState("granted");
      setTimeout(onGranted, 1400);
    }
  }, [progress, faceState, onGranted]);

  const isGranted = faceState === "granted";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: "100%",
        height: "100%",
        background: "#050708",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "linear-gradient(rgba(0,200,224,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,224,1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        pointerEvents: "none",
      }} />

      {/* Status label */}
      <motion.p
        animate={{ color: isGranted ? "#00FF88" : "#00C8E0" }}
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "clamp(0.42rem, 1.2vw, 0.55rem)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          zIndex: 1,
        }}
      >
        {isGranted ? "✓ Access Granted" : "Facial Recognition — Scanning..."}
      </motion.p>

      {/* Face frame */}
      <div style={{ position: "relative", width: "clamp(80px, 18vw, 120px)", height: "clamp(96px, 22vw, 144px)", zIndex: 1 }}>
        {/* Corner brackets */}
        {[
          { top: 0, left: 0, borderTop: true, borderLeft: true },
          { top: 0, right: 0, borderTop: true, borderRight: true },
          { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
          { bottom: 0, right: 0, borderBottom: true, borderRight: true },
        ].map((corner, i) => (
          <motion.div
            key={i}
            animate={{ borderColor: isGranted ? "#00FF88" : "#00C8E0" }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              width: "18px", height: "18px",
              borderTopWidth: corner.borderTop ? "2px" : "0",
              borderLeftWidth: corner.borderLeft ? "2px" : "0",
              borderRightWidth: (corner as any).borderRight ? "2px" : "0",
              borderBottomWidth: corner.borderBottom ? "2px" : "0",
              borderStyle: "solid",
              borderColor: "#00C8E0",
              ...(corner.top !== undefined ? { top: corner.top } : { bottom: (corner as any).bottom }),
              ...(corner.left !== undefined ? { left: corner.left } : { right: (corner as any).right }),
            }}
          />
        ))}

        {/* Face silhouette */}
        <svg
          viewBox="0 0 100 120"
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0, opacity: 0.18 }}
          fill="none"
        >
          <ellipse cx="50" cy="52" rx="28" ry="34" stroke="#00C8E0" strokeWidth="1.5" />
          <ellipse cx="50" cy="100" rx="22" ry="14" stroke="#00C8E0" strokeWidth="1" />
          <line x1="50" y1="86" x2="50" y2="100" stroke="#00C8E0" strokeWidth="1" />
          <ellipse cx="38" cy="48" rx="5" ry="3.5" stroke="#00C8E0" strokeWidth="1" />
          <ellipse cx="62" cy="48" rx="5" ry="3.5" stroke="#00C8E0" strokeWidth="1" />
          <path d="M 38 66 Q 50 73 62 66" stroke="#00C8E0" strokeWidth="1" fill="none" />
        </svg>

        {/* Mesh dots */}
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isGranted ? 0.9 : 0.55, scale: 1 }}
            transition={{ delay: dot.delay, duration: 0.3 }}
            style={{
              position: "absolute",
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: "2px", height: "2px",
              borderRadius: "50%",
              background: isGranted ? "#00FF88" : "#00C8E0",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Scan beam */}
        {!isGranted && (
          <div
            style={{
              position: "absolute",
              left: 0, right: 0,
              top: `${scanY}%`,
              height: "2px",
              background: "linear-gradient(to right, transparent, rgba(0,200,224,0.8), transparent)",
              boxShadow: "0 0 8px rgba(0,200,224,0.6)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Granted checkmark */}
        <AnimatePresence>
          {isGranted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "50%",
                background: "rgba(0,255,136,0.15)",
                border: "2px solid #00FF88",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(0,255,136,0.4)",
              }}>
                <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }} fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      {!isGranted && (
        <div style={{ width: "clamp(80px, 18vw, 120px)", height: "2px", background: "rgba(0,200,224,0.15)", overflow: "hidden", zIndex: 1 }}>
          <motion.div
            style={{ height: "100%", background: "#00C8E0", width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
      )}

      {/* Percentage */}
      <p style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "clamp(0.4rem, 1vw, 0.5rem)",
        letterSpacing: "0.1em",
        color: isGranted ? "#00FF88" : "rgba(0,200,224,0.5)",
        zIndex: 1,
        transition: "color 0.4s",
      }}>
        {isGranted ? "IDENTITY VERIFIED" : `${Math.round(progress)}% COMPLETE`}
      </p>
    </motion.div>
  );
}

/* ── Loading Screen ─────────────────────────────────────────── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadText, setLoadText] = useState("Initializing...");

  const stages = [
    { at: 20, text: "Loading assets..." },
    { at: 45, text: "Building interface..." },
    { at: 70, text: "Preparing portfolio..." },
    { at: 90, text: "Almost there..." },
    { at: 100, text: "Welcome." },
  ];

  useInterval(() => {
    setProgress((p) => {
      if (p >= 100) return 100;
      const increment = p < 60 ? 1.8 : p < 85 ? 1.2 : 0.7;
      return Math.min(p + increment, 100);
    });
  }, progress < 100 ? 30 : null);

  useEffect(() => {
    const stage = [...stages].reverse().find((s) => progress >= s.at);
    if (stage) setLoadText(stage.text);
    if (progress >= 100) {
      setTimeout(onComplete, 700);
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#08090B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        zIndex: 9999,
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,200,224,0.07) 0%, transparent 70%)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center" }}
      >
        {/* Monogram badge */}
        <motion.div
          animate={{ boxShadow: ["0 0 0px rgba(0,200,224,0)", "0 0 30px rgba(0,200,224,0.3)", "0 0 0px rgba(0,200,224,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: "64px", height: "64px",
            background: "#F0EEE8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#0D0D0D",
            letterSpacing: "-0.04em",
          }}>
            IV
          </span>
        </motion.div>

        <p style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
          color: "#F0EEE8",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}>
          IVAN
        </p>
        <p style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
          letterSpacing: "0.2em",
          color: "rgba(240,238,232,0.3)",
          textTransform: "uppercase",
          marginTop: "0.4rem",
        }}>
          Full-Stack Developer
        </p>
      </motion.div>

      {/* Progress */}
      <div style={{ width: "clamp(160px, 30vw, 240px)", display: "flex", flexDirection: "column", gap: "0.6rem", alignItems: "center" }}>
        <div style={{ width: "100%", height: "1px", background: "rgba(240,238,232,0.08)", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: "linear-gradient(to right, #00C8E0, rgba(0,200,224,0.4))", width: `${progress}%` }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(0.45rem, 1.2vw, 0.55rem)",
            letterSpacing: "0.1em",
            color: "rgba(240,238,232,0.3)",
            textTransform: "uppercase",
          }}>
            {loadText}
          </p>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(0.45rem, 1.2vw, 0.55rem)",
            letterSpacing: "0.1em",
            color: "rgba(0,200,224,0.6)",
          }}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main IntroScreen ───────────────────────────────────────── */
export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [lidAngle, setLidAngle] = useState(0); // 0 = closed, 1 = fully open
  const [laptopScale, setLaptopScale] = useState(1);
  const [laptopOpacity, setLaptopOpacity] = useState(1);
  const laptopRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  /* Phase 2: Lid opening animation */
  useEffect(() => {
    if (phase !== "opening") return;
    let start: number | null = null;
    const duration = 1400;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setLidAngle(eased);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Lid fully open → go to face scan
        setTimeout(() => setPhase("face"), 300);
      }
    };
    requestAnimationFrame(animate);
  }, [phase]);

  /* Phase 4: Zoom into screen */
  useEffect(() => {
    if (phase !== "zoom") return;
    let start: number | null = null;
    const duration = 1100;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = Math.pow(progress, 2.5);
      setLaptopScale(1 + eased * 18);
      setLaptopOpacity(1 - Math.max(0, (progress - 0.65) / 0.35));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase("loading");
      }
    };
    requestAnimationFrame(animate);
  }, [phase]);

  const handleClick = () => {
    if (phase === "idle") setPhase("opening");
  };

  const handleGranted = useCallback(() => {
    setTimeout(() => setPhase("zoom"), 200);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setPhase("exiting");
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // lidAngle: 0 = closed, 1 = fully open
  // rotateX(170deg) = closed (lid flat on base), rotateX(30deg) = open (screen facing viewer)

  if (phase === "loading" || phase === "exiting") {
    return (
      <AnimatePresence>
        {phase !== "exiting" && (
          <LoadingScreen onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="intro-wrapper"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#08090B",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: phase === "idle" ? "pointer" : "default",
          overflow: "hidden",
        }}
        onClick={handleClick}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          width: "700px", height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,224,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />

        {/* Laptop 3D container — perspective wrapper */}
        <div
          ref={laptopRef}
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 30%",
            width: "min(560px, 90vw)",
            position: "relative",
            transform: `scale(${laptopScale})`,
            opacity: laptopOpacity,
            transition: phase === "zoom" ? "none" : "transform 0.1s, opacity 0.1s",
          }}
        >
          {/* 3D scene — whole laptop tilted slightly toward viewer */}
          <div style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-8deg)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}>

            {/* ── Lid (screen half) — sits ON TOP of base ── */}
            {/* lidAngle=0: rotateX(-170deg) = closed flat (lid folded down onto base, face-down) */}
            {/* lidAngle=1: rotateX(-20deg)  = open, screen tilted back facing viewer            */}
            <div
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "bottom center",
                transform: `rotateX(${-170 + 150 * lidAngle}deg)`,
                position: "relative",
                zIndex: 2,
                order: 1,
              }}
            >
              <div style={{
                background: "linear-gradient(to bottom, #1C1F24, #16191E)",
                border: "2px solid #2C3038",
                borderRadius: "14px 14px 4px 4px",
                padding: "clamp(6px, 1.5vw, 12px)",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}>
                {/* Camera notch */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(4px, 1vw, 8px)" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: phase === "face" ? "rgba(0,200,224,0.6)" : "#252830", transition: "background 0.4s", boxShadow: phase === "face" ? "0 0 8px rgba(0,200,224,0.5)" : "none" }} />
                </div>

                {/* Screen display */}
                <div style={{
                  background: "#050708",
                  borderRadius: "6px",
                  overflow: "hidden",
                  aspectRatio: "16/10",
                  position: "relative",
                }}>
                  {phase === "idle" && (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <div style={{ width: "28px", height: "28px", border: "1.5px solid rgba(0,200,224,0.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 0, height: 0, borderLeft: "8px solid rgba(0,200,224,0.8)", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", marginLeft: "2px" }} />
                      </div>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.4rem, 1.2vw, 0.55rem)", letterSpacing: "0.15em", color: "rgba(240,238,232,0.3)", textTransform: "uppercase" }}>
                        Click to open
                      </p>
                    </div>
                  )}
                  {phase === "opening" && (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "18px", height: "18px", border: "2px solid rgba(0,200,224,0.6)", borderTopColor: "transparent", borderRadius: "50%", animation: "intro-spin 0.6s linear infinite" }} />
                    </div>
                  )}
                  {phase === "face" && <FaceScreen onGranted={handleGranted} />}
                  {phase === "zoom" && (
                    <div style={{ width: "100%", height: "100%", background: "#050708", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
                      >
                        <div style={{ width: "28px", height: "28px", background: "#F0EEE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "#0D0D0D" }}>IV</span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Base (keyboard half) — always visible at bottom ── */}
            <div style={{
              background: "linear-gradient(to bottom, #1E2228, #181B20)",
              border: "2px solid #2C3038",
              borderTop: "1px solid #252830",
              borderRadius: "4px 4px 16px 16px",
              height: "clamp(22px, 4vw, 32px)",
              position: "relative",
              zIndex: 1,
              order: 2,
              boxShadow: "0 20px 60px rgba(0,0,0,0.9), 0 8px 20px rgba(0,0,0,0.5)",
            }}>
              {/* Trackpad */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "clamp(50px, 12vw, 80px)", height: "clamp(6px, 1.2vw, 10px)", background: "#252830", borderRadius: "3px", opacity: 0.7 }} />
            </div>

            {/* Ground shadow */}
            <div style={{ position: "absolute", bottom: "-20px", left: "5%", right: "5%", height: "20px", background: "radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)", filter: "blur(12px)", zIndex: 0 }} />

          </div>{/* end 3D scene */}
        </div>

        {/* Bottom label (idle only) */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ marginTop: "2.5rem", textAlign: "center" }}
            >
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1rem, 3vw, 1.4rem)", color: "rgba(240,238,232,0.85)", letterSpacing: "-0.02em" }}>
                Ivan's Portfolio
              </p>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.45rem, 1.2vw, 0.58rem)", letterSpacing: "0.18em", color: "rgba(240,238,232,0.28)", textTransform: "uppercase", marginTop: "0.4rem" }}>
                Click the laptop to enter
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "1.25rem" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00C8E0", animation: "intro-pulse 2s ease-out infinite" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase label (opening/face) */}
        <AnimatePresence>
          {(phase === "opening" || phase === "face") && (
            <motion.p
              key="phase-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(0.45rem, 1.2vw, 0.55rem)",
                letterSpacing: "0.18em",
                color: "rgba(240,238,232,0.2)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {phase === "opening" ? "Opening system..." : "Verifying identity..."}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Skip button */}
        {phase !== "idle" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={(e) => {
              e.stopPropagation();
              setPhase("loading");
            }}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              right: "1.5rem",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.45rem, 1.2vw, 0.58rem)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(240,238,232,0.25)",
              background: "transparent",
              border: "1px solid rgba(240,238,232,0.1)",
              padding: "5px 12px",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#00C8E0";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#00C8E0";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,238,232,0.25)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,238,232,0.1)";
            }}
          >
            Skip →
          </motion.button>
        )}

        <style>{`
          @keyframes intro-spin { to { transform: rotate(360deg); } }
          @keyframes intro-pulse {
            0% { box-shadow: 0 0 0 0 rgba(0,200,224,0.5); }
            70% { box-shadow: 0 0 0 10px rgba(0,200,224,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,200,224,0); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
