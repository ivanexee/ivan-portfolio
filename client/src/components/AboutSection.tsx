/* ============================================================
   DESIGN: Dark Luxury Tech — About Section
   Two-column layout with profile card and bio text
   ============================================================ */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Briefcase, Heart } from "lucide-react";

const PROFILE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/profile-bg-63DmUeQnmZVzGq4hCzbeGw.webp";

const highlights = [
  { icon: GraduationCap, label: "Education", value: "Brooklyn College, CUNY" },
  { icon: MapPin, label: "Location", value: "New York City, NY" },
  { icon: Briefcase, label: "Focus", value: "Web Apps & Digital Platforms" },
  { icon: Heart, label: "Passion", value: "Building for Real Communities" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            01 / About
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            The Developer<br />
            <span className="text-gradient-cyan">Behind the Code</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={PROFILE_BG}
                alt="Abstract tech background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D0F14]/40 to-transparent" />

              {/* Floating code snippet card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6 glass-card rounded-xl p-4"
              >
                <p className="text-xs text-white/40 mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  ivan.profile.ts
                </p>
                <pre className="text-xs text-cyan-300 leading-relaxed" style={{ fontFamily: "JetBrains Mono, monospace" }}>
{`const ivan = {
  role: "Full-Stack Developer",
  location: "New York City",
  available: true,
  passion: "Building real things"
};`}
                </pre>
              </motion.div>
            </div>

            {/* Decorative border */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-cyan-400/20 pointer-events-none" />
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-white/70 text-lg leading-relaxed mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
              I'm <strong className="text-white">Ivan</strong>, a self-driven developer based in New York City with a passion for
              turning ideas into polished, functional web applications. I study at{" "}
              <strong className="text-cyan-400">Brooklyn College, CUNY</strong>, where I've channeled my coursework into
              real-world projects that serve actual users and communities.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>
              From building a full-featured restaurant website for a family business in Queens, to engineering an
              AI-powered professor-rating platform for Brooklyn College students — I build software that{" "}
              <em className="text-white/80">matters</em>. I work across the full stack, leveraging HTML, CSS, JavaScript,
              TypeScript, React, and AI APIs to deliver experiences that are both beautiful and functional.
            </p>

            {/* Highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      {item.label}
                    </p>
                    <p className="text-sm text-white font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="https://github.com/ivanexee"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#0D0F14] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 glow-cyan"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              View GitHub Profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
