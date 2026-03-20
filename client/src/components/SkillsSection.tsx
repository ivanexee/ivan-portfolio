/* ============================================================
   DESIGN: Editorial Skills — withradiance.com inspired
   - "Every language. No exceptions." heading
   - Covers all major languages: HTML, CSS, JS, TS, Python, Java, C++, etc.
   - No AI references — pure engineering craft
   - Interactive hover: skill bar highlights on hover
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      { name: "HTML5 / CSS3", level: 98 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "Java", level: 80 },
      { name: "C / C++", level: 75 },
    ],
  },
  {
    label: "Frameworks & Tools",
    skills: [
      { name: "React.js", level: 93 },
      { name: "Node.js", level: 88 },
      { name: "Tailwind CSS", level: 95 },
      { name: "REST APIs", level: 90 },
      { name: "Git & GitHub", level: 92 },
      { name: "Vite / Build Tools", level: 85 },
    ],
  },
];

const techStack = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "Python", "Java", "C++",
  "React", "Node.js", "Tailwind CSS", "REST APIs", "Git", "GitHub",
  "Vite", "Framer Motion", "Responsive Design", "SQL", "JSON", "Bash",
  "HTML5", "CSS3", "JavaScript", "TypeScript", "Python", "Java", "C++",
  "React", "Node.js", "Tailwind CSS", "REST APIs", "Git", "GitHub",
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="mb-5 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <motion.span
          animate={{ color: hovered ? "#00C8E0" : "rgba(13,13,13,0.75)" }}
          transition={{ duration: 0.2 }}
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem", fontWeight: 500 }}
        >
          {name}
        </motion.span>
        <motion.span
          animate={{ color: hovered ? "#00C8E0" : "rgba(13,13,13,0.35)" }}
          transition={{ duration: 0.2 }}
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.08em" }}
        >
          {level}%
        </motion.span>
      </div>
      <div style={{ height: "2px", background: "rgba(13,13,13,0.1)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: "100%", background: hovered ? "#0D0D0D" : "#00C8E0", transition: "background 0.2s" }}
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
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#0D0D0D", marginBottom: "0.75rem" }}
        >
          Every language.<br />No exceptions.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "rgba(13,13,13,0.5)", lineHeight: 1.7, maxWidth: "560px", marginBottom: "3.5rem" }}
        >
          From low-level C++ to modern TypeScript, from scripting in Python to building enterprise-grade Java systems — I speak the full language of software. Hover to explore.
        </motion.p>

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
