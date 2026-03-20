/* ============================================================
   DESIGN: Editorial Projects — withradiance.com inspired
   - No AI references — pure engineering craft
   - Elevated descriptions for both projects
   - Full-bleed hover-reveal cards
   ============================================================ */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/restaurant-mockup-bTyaJVhRjbR57eZ869h5zw.webp";
const BROOKLYN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/brooklyn-mockup-PmCkNYnh7JFzsNNFvbU2UY.webp";

const projects = [
  {
    id: "01",
    name: "Huitlacoche Taqueria",
    category: "Restaurant Website",
    description: "A fully custom, multi-page website built for an authentic Mexican taqueria in Queens, NY. Features a digital menu, photo gallery, Google Maps integration, and a mobile-first responsive design that brings the restaurant's identity to life online — driving real foot traffic and customer engagement.",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Google Maps API"],
    github: "https://github.com/ivanexee/Huitlacoche-Taqueria-Restaurant-website",
    live: "https://ivanexee.github.io/Huitlacoche-Taqueria-Restaurant-website",
    image: RESTAURANT_IMG,
    year: "2024",
  },
  {
    id: "02",
    name: "BC MentorHub",
    category: "University Platform",
    description: "A full-stack web platform built exclusively for Brooklyn College students — a professor rating and mentorship discovery system. Features dynamic search, student reviews, faculty profiles, and a real-time recommendation engine. Built with React and TypeScript for maximum performance and scalability.",
    stack: ["React", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/ivanexee/Brooklyn-mentorHub-Project-Unofficial-",
    live: null,
    image: BROOKLYN_IMG,
    year: "2025",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      className="relative overflow-hidden"
      style={{ background: "#0D0D0D", aspectRatio: "4/3" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover transition-all duration-700"
        style={{
          opacity: hovered ? 0.3 : 0.72,
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.1) 50%, transparent 100%)" }}
      />

      {/* Top: year + category */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.4)", textTransform: "uppercase" }}>
          {project.id}
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.35)", textTransform: "uppercase" }}>
          {project.year}
        </span>
      </div>

      {/* Hover reveal: description + stack */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
        transition={{ duration: 0.3 }}
        className="absolute top-14 left-5 right-5"
      >
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem", color: "rgba(240,238,232,0.72)", lineHeight: 1.7 }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.08em", padding: "3px 10px", border: "1px solid rgba(240,238,232,0.2)", color: "rgba(240,238,232,0.55)", textTransform: "uppercase" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Bottom: name + CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.4)", textTransform: "uppercase", marginBottom: "5px" }}>
            {project.category}
          </p>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", color: "#F0EEE8", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {project.name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 12px", background: "#00C8E0", color: "#0D0D0D", fontWeight: 600 }}
              className="hover:bg-white transition-colors duration-200"
            >
              Live Site
            </motion.a>
          )}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            animate={{ opacity: hovered ? 1 : 0.4, scale: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 flex items-center justify-center border border-[#F0EEE8]/30 text-[#F0EEE8] hover:bg-[#F0EEE8] hover:text-[#0D0D0D] transition-colors duration-200"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" style={{ background: "#F5F3EE", color: "#0D0D0D" }}>
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="section-num">(03)</span>
          <span className="section-category">(THE WORK)</span>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#0D0D0D" }}
        >
          Real products.<br />Real impact.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "rgba(13,13,13,0.5)", marginTop: "1rem", maxWidth: "480px" }}
        >
          Every project is a live, production-grade product built for real users and real businesses. Hover over each card to explore.
        </motion.p>
      </div>

      {/* Full-bleed project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2px", background: "#E0DED8" }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* View all CTA */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 flex justify-end">
        <a
          href="https://github.com/ivanexee"
          target="_blank"
          rel="noreferrer"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F3EE] transition-colors duration-200"
        >
          View All on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
