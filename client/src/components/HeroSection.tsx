/* ============================================================
   DESIGN: Dark Luxury Tech — Hero Section
   Full-screen hero with animated typewriter, particle bg, CTAs
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/hero-bg-BAhcoDu46N73mNVz3q3x5i.webp";

const ROLES = [
  "Full-Stack Developer",
  "Web App Builder",
  "UI/UX Engineer",
  "Digital Solutions Creator",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const stats = [
  { value: "3+", label: "Projects Shipped" },
  { value: "2+", label: "Companies Served" },
  { value: "4+", label: "Languages Used" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function HeroSection() {
  const role = useTypewriter(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0D0F14]/75" />
      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-[#0D0F14]/80" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="tech-tag">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse inline-block" />
            Available for new projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-none tracking-tight"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          <span className="text-white">Hi, I'm </span>
          <span className="text-gradient-cyan">Ivan</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10 flex items-center justify-center gap-1"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          <span className="text-white/80">{role}</span>
          <span className="text-cyan-400 cursor-blink">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          I build custom web applications and digital platforms that help businesses grow — from
          restaurant websites to AI-powered university tools. Clean code, real results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3.5 rounded-xl font-semibold text-[#0D0F14] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 glow-cyan flex items-center gap-2 text-sm"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            View My Work
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3.5 rounded-xl font-semibold text-white border border-white/20 hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-200 text-sm"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <div
                className="text-2xl font-black text-gradient-cyan mb-1"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/50" style={{ fontFamily: "Outfit, sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/ivanexee"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:ivan@example.com"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
