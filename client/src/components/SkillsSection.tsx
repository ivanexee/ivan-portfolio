/* ============================================================
   DESIGN: Editorial Skills — withradiance.com inspired
   - Light cream background
   - Numbered section header: (04) / (EXPERTISE)
   - Two-column skill bars with animated fill
   - Marquee tech stack at bottom
   ============================================================ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML5 / CSS3", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "React.js", level: 82 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    label: "Backend & Tools",
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
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS",
  "Node.js", "Vite", "Git", "GitHub", "Framer Motion", "Gemini AI",
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem", color: "rgba(13,13,13,0.75)", fontWeight: 500 }}>
          {name}
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(13,13,13,0.35)" }}>
          {level}%
        </span>
      </div>
      <div style={{ height: "2px", background: "rgba(13,13,13,0.1)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: "100%", background: "#00C8E0" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" style={{ background: "#F5F3EE", color: "#0D0D0D" }}>
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="section-num">(04)</span>
          <span className="section-category">(EXPERTISE)</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#0D0D0D", marginBottom: "3rem" }}
        >
          The tools I use<br />to build your vision.
        </motion.h2>

        {/* Skill bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: gi * 0.15 }}
            >
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: "rgba(13,13,13,0.35)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                {group.label}
              </p>
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.3 + gi * 0.1 + si * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="border-t py-6 overflow-hidden" style={{ borderColor: "rgba(13,13,13,0.08)" }}>
        <div className="marquee-outer">
          <div className="marquee-track">
            {techStack.map((tech, i) => (
              <span
                key={i}
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(13,13,13,0.22)", textTransform: "uppercase", whiteSpace: "nowrap" }}
              >
                {tech}
                <span style={{ margin: "0 1.5rem", color: "rgba(13,13,13,0.1)" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
