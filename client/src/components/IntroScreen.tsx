/* ============================================================
   IntroScreen — Cinematic Laptop Entrance
   
   Phases:
   1. IDLE    — Laptop closed, centered on screen, "Click to enter"
   2. OPENING — Lid swings open (rotates backward, screen reveals)
   3. FACE    — Facial recognition scan
   4. ZOOM    — Viewport zooms into the screen
   5. LOADING — Full-screen IVAN loader
   6. DONE    — Fades out → main portfolio
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "opening" | "face" | "zoom" | "loading" | "exiting";
type FaceState = "scanning" | "granted";

interface IntroScreenProps {
  onComplete: () => void;
}

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/* ── Loading Screen ─────────────────────────────────────────── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const messages = ["Initializing...", "Loading assets...", "Preparing portfolio...", "Almost ready..."];
  const msgIndex = Math.min(Math.floor(progress / 25), messages.length - 1);

  useInterval(() => {
    setProgress(p => {
      if (p >= 100) return 100;
      return p + 0.8;
    });
  }, progress < 100 ? 20 : null);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 600);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#080A0E",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "2rem",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "64px", height: "64px",
          background: "linear-gradient(135deg, #00C8E0, #0088AA)",
          display: "flex", alignItems: "center", justifyContent: "center",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff" }}>I</span>
        </div>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#F0EEE8", letterSpacing: "-0.03em" }}>
          IVAN
        </p>
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(240,238,232,0.35)", textTransform: "uppercase" }}>
          App Developer
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: "min(280px, 70vw)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: "linear-gradient(90deg, #00C8E0, #0088AA)", borderRadius: "2px" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "rgba(240,238,232,0.25)", textTransform: "uppercase", textAlign: "center" }}>
          {messages[msgIndex]}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Face Recognition Screen ────────────────────────────────── */
function FaceScreen({ onGranted }: { onGranted: () => void }) {
  const [faceState, setFaceState] = useState<FaceState>("scanning");
  const [scanY, setScanY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dots] = useState(() =>
    Array.from({ length: 24 }, () => ({
      x: 22 + Math.random() * 56,
      y: 12 + Math.random() * 72,
      delay: Math.random() * 0.6,
    }))
  );

  useInterval(() => setScanY(y => (y + 1.6 > 100 ? 0 : y + 1.6)), faceState === "scanning" ? 16 : null);
  useInterval(() => setProgress(p => Math.min(p + 1.1, 100)), faceState === "scanning" ? 28 : null);

  useEffect(() => {
    if (progress >= 100 && faceState === "scanning") {
      setFaceState("granted");
      setTimeout(onGranted, 1200);
    }
  }, [progress, faceState, onGranted]);

  const granted = faceState === "granted";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ width: "100%", height: "100%", background: "#050708", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.6rem", padding: "0.5rem" }}
    >
      {/* Face outline */}
      <div style={{ position: "relative", width: "clamp(50px, 12vw, 80px)", height: "clamp(60px, 14vw, 95px)" }}>
        <svg viewBox="0 0 80 95" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Face oval */}
          <ellipse cx="40" cy="47" rx="30" ry="38"
            fill="none"
            stroke={granted ? "#00FF88" : "#00C8E0"}
            strokeWidth="1.5"
            strokeDasharray={granted ? "none" : "4 3"}
            style={{ transition: "stroke 0.4s" }}
          />
          {/* Corner brackets */}
          {[
            "M 8 20 L 8 8 L 20 8",
            "M 60 8 L 72 8 L 72 20",
            "M 8 75 L 8 87 L 20 87",
            "M 60 87 L 72 87 L 72 75",
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke={granted ? "#00FF88" : "#00C8E0"} strokeWidth="2" style={{ transition: "stroke 0.4s" }} />
          ))}
          {/* Scan beam */}
          {!granted && (
            <line
              x1="10" y1={scanY * 0.95} x2="70" y2={scanY * 0.95}
              stroke="rgba(0,200,224,0.5)" strokeWidth="1"
            />
          )}
          {/* Mesh dots */}
          {dots.map((d, i) => (
            <circle key={i} cx={d.x * 0.8} cy={d.y * 0.95} r="1"
              fill={granted ? "#00FF88" : "#00C8E0"}
              opacity={granted ? 0.9 : 0.5}
              style={{ transition: "fill 0.4s, opacity 0.4s" }}
            />
          ))}
          {/* Check mark when granted */}
          {granted && (
            <motion.path
              d="M 28 47 L 37 56 L 52 38"
              fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </svg>
      </div>

      {/* Status text */}
      <p style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "clamp(0.35rem, 1vw, 0.48rem)",
        letterSpacing: "0.12em",
        color: granted ? "#00FF88" : "#00C8E0",
        textTransform: "uppercase",
        transition: "color 0.4s",
      }}>
        {granted ? "✓ Access Granted" : "Scanning..."}
      </p>

      {/* Progress bar */}
      {!granted && (
        <div style={{ width: "clamp(50px, 14vw, 90px)", height: "1.5px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#00C8E0", transition: "width 0.1s" }} />
        </div>
      )}
    </motion.div>
  );
}

/* ── Main IntroScreen ───────────────────────────────────────── */
export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  // lidAngle: 0 = fully closed, 1 = fully open
  const [lidAngle, setLidAngle] = useState(0);
  const [laptopScale, setLaptopScale] = useState(1);
  const [laptopOpacity, setLaptopOpacity] = useState(1);
  const laptopRef = useRef<HTMLDivElement>(null);

  /* Phase 2: Lid opening */
  useEffect(() => {
    if (phase !== "opening") return;
    let start: number | null = null;
    const duration = 1400;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setLidAngle(eased);
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(() => setPhase("face"), 300);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  /* Phase 4: Zoom into screen */
  useEffect(() => {
    if (phase !== "zoom") return;
    let start: number | null = null;
    const duration = 1000;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = Math.pow(t, 2.2);
      setLaptopScale(1 + eased * 20);
      setLaptopOpacity(1 - Math.max(0, (t - 0.6) / 0.4));
      if (t < 1) requestAnimationFrame(tick);
      else setPhase("loading");
    };
    requestAnimationFrame(tick);
  }, [phase]);

  const handleClick = () => { if (phase === "idle") setPhase("opening"); };
  const handleGranted = useCallback(() => { setTimeout(() => setPhase("zoom"), 200); }, []);
  const handleLoadComplete = useCallback(() => {
    setPhase("exiting");
    setTimeout(onComplete, 500);
  }, [onComplete]);

  /* ── Loading / exiting phases ── */
  if (phase === "loading" || phase === "exiting") {
    return (
      <AnimatePresence>
        {phase !== "exiting" && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>
    );
  }

  /*
    Laptop geometry (CSS 3D):
    - The outer wrapper has perspective
    - The whole laptop is tilted slightly back (rotateX(-10deg)) so you see it from slightly above
    - The BASE is a flat rectangle at the bottom
    - The LID pivots from the TOP EDGE of the base (transformOrigin: "top center")
      closed = rotateX(0deg)  → lid flat, folded down (you see its back)
      open   = rotateX(-130deg) → lid swung back, screen facing you
  */

  // Lid: 0deg closed → -130deg open
  const lidRotateX = -130 * lidAngle;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "radial-gradient(ellipse at 50% 60%, #0D1520 0%, #060810 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          cursor: phase === "idle" ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        {/* Ambient glow behind laptop */}
        <div style={{
          position: "absolute",
          width: "600px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,200,224,0.07) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />

        {/* ── Laptop wrapper (perspective container) ── */}
        <div
          ref={laptopRef}
          style={{
            perspective: "900px",
            perspectiveOrigin: "50% 50%",
            width: "min(520px, 88vw)",
            transform: `scale(${laptopScale})`,
            opacity: laptopOpacity,
            transition: phase === "zoom" ? "none" : "opacity 0.1s",
          }}
        >
          {/* Whole laptop tilted slightly so we see it from above */}
          <div style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-10deg)",
          }}>

            {/* ── LID (screen) — pivots from its bottom edge (= top of base) ── */}
            <div style={{
              transformStyle: "preserve-3d",
              transformOrigin: "bottom center",
              transform: `rotateX(${lidRotateX}deg)`,
              position: "relative",
              zIndex: 2,
            }}>
              {/* Lid outer shell */}
              <div style={{
                background: "linear-gradient(160deg, #23272F 0%, #181B22 100%)",
                border: "1.5px solid #2E333D",
                borderBottom: "none",
                borderRadius: "12px 12px 0 0",
                padding: "clamp(8px, 1.8vw, 14px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}>
                {/* Webcam */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(5px, 1.2vw, 9px)" }}>
                  <div style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: phase === "face" ? "#00C8E0" : "#1A1D24",
                    boxShadow: phase === "face" ? "0 0 10px rgba(0,200,224,0.6)" : "none",
                    transition: "background 0.4s, box-shadow 0.4s",
                  }} />
                </div>

                {/* Screen bezel + display */}
                <div style={{
                  background: "#0A0C10",
                  borderRadius: "6px",
                  overflow: "hidden",
                  aspectRatio: "16/10",
                  position: "relative",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                }}>
                  {/* IDLE */}
                  {phase === "idle" && (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        style={{
                          width: "32px", height: "32px",
                          border: "1.5px solid rgba(0,200,224,0.6)",
                          borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 0, height: 0, borderLeft: "9px solid rgba(0,200,224,0.9)", borderTop: "6px solid transparent", borderBottom: "6px solid transparent", marginLeft: "3px" }} />
                      </motion.div>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.38rem, 1vw, 0.52rem)", letterSpacing: "0.16em", color: "rgba(240,238,232,0.35)", textTransform: "uppercase" }}>
                        Click to open
                      </p>
                    </div>
                  )}

                  {/* OPENING */}
                  {phase === "opening" && (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "20px", height: "20px", border: "2px solid rgba(0,200,224,0.7)", borderTopColor: "transparent", borderRadius: "50%", animation: "intro-spin 0.7s linear infinite" }} />
                    </div>
                  )}

                  {/* FACE */}
                  {phase === "face" && <FaceScreen onGranted={handleGranted} />}

                  {/* ZOOM */}
                  {phase === "zoom" && (
                    <div style={{ width: "100%", height: "100%", background: "#050708", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
                      >
                        <div style={{ width: "30px", height: "30px", background: "#F0EEE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.75rem", color: "#0D0D0D" }}>IV</span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── BASE (keyboard) — static, always visible ── */}
            <div style={{
              background: "linear-gradient(180deg, #1E2229 0%, #16191F 100%)",
              border: "1.5px solid #2E333D",
              borderTop: "1px solid #3A3F4A",
              borderRadius: "0 0 14px 14px",
              height: "clamp(24px, 4.5vw, 36px)",
              position: "relative",
              zIndex: 1,
              boxShadow: "0 18px 50px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.5)",
            }}>
              {/* Trackpad */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "clamp(55px, 13vw, 90px)",
                height: "clamp(7px, 1.4vw, 11px)",
                background: "#252830",
                borderRadius: "3px",
                border: "1px solid #2E333D",
              }} />
            </div>

          </div>{/* end rotateX scene */}

          {/* Ground shadow */}
          <div style={{
            position: "absolute",
            bottom: "-18px", left: "10%", right: "10%",
            height: "18px",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.65) 0%, transparent 70%)",
            filter: "blur(10px)",
          }} />
        </div>

        {/* ── Label below laptop (idle only) ── */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ marginTop: "2.5rem", textAlign: "center" }}
            >
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1rem, 2.8vw, 1.4rem)", color: "rgba(240,238,232,0.88)", letterSpacing: "-0.02em" }}>
                Ivan's Portfolio
              </p>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.42rem, 1.1vw, 0.56rem)", letterSpacing: "0.2em", color: "rgba(240,238,232,0.28)", textTransform: "uppercase", marginTop: "0.5rem" }}>
                Click the laptop to enter
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "1.2rem" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00C8E0", animation: "intro-pulse 2s ease-out infinite" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase label */}
        <AnimatePresence>
          {(phase === "opening" || phase === "face") && (
            <motion.p
              key="phase-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(0.42rem, 1.1vw, 0.54rem)",
                letterSpacing: "0.18em", color: "rgba(240,238,232,0.2)",
                textTransform: "uppercase", whiteSpace: "nowrap",
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
            onClick={e => { e.stopPropagation(); setPhase("loading"); }}
            style={{
              position: "absolute", bottom: "1.5rem", right: "1.5rem",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.42rem, 1.1vw, 0.56rem)",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(240,238,232,0.25)",
              background: "transparent",
              border: "1px solid rgba(240,238,232,0.12)",
              padding: "5px 14px", cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "#00C8E0";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#00C8E0";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,238,232,0.25)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,238,232,0.12)";
            }}
          >
            Skip →
          </motion.button>
        )}

        <style>{`
          @keyframes intro-spin { to { transform: rotate(360deg); } }
          @keyframes intro-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(0,200,224,0.55); }
            70%  { box-shadow: 0 0 0 10px rgba(0,200,224,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,200,224,0); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
