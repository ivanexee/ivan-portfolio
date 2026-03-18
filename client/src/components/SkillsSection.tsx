/* ============================================================
   DESIGN: Dark Luxury Tech — Skills Section
   Animated skill bars, tech stack grid, and category tabs
   ============================================================ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    name: "Frontend",
    color: "#00E5FF",
    skills: [
      { name: "HTML5 / CSS3", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "React.js", level: 82 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    name: "Backend & Tools",
    color: "#FFD700",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "REST APIs", level: 78 },
      { name: "Git & GitHub", level: 85 },
      { name: "Vite / Build Tools", level: 75 },
      { name: "Gemini AI API", level: 72 },
    ],
  },
];

const techStack = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS",
  "Node.js", "Vite", "Git", "GitHub", "Framer Motion", "Gemini AI",
  "W3.CSS", "Font Awesome", "Google Maps API", "Responsive Design",
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/80 font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
          {name}
        </span>
        <span className="text-xs font-semibold" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color === "#00E5FF" ? "#0080FF" : "#FF8C00"})`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            02 / Skills
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            Technologies &<br />
            <span className="text-gradient-gold">Expertise</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Skill bars grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              className="glass-card rounded-2xl p-8"
            >
              <h3
                className="text-lg font-bold mb-6 flex items-center gap-3"
                style={{ fontFamily: "Syne, sans-serif", color: cat.color }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
                {cat.name}
              </h3>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={0.3 + si * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech stack tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3
            className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6 text-center"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Full Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.04 }}
                className="tech-tag hover:bg-cyan-400/15 hover:border-cyan-400/40 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
