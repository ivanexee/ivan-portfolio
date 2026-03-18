/* ============================================================
   DESIGN: Dark Luxury Tech — Projects Section
   Featured project cards with device mockup images, tech tags, links
   ============================================================ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Globe, GraduationCap, Utensils, Brain } from "lucide-react";

const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/restaurant-preview-A2MTbXJ9ZpGjsGguKqUFxV.webp";
const BROOKLYN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/brooklyn-preview-ghKpNvnKStnvm7GBnijBcb.webp";

const projects = [
  {
    id: 1,
    number: "01",
    title: "Huitlacoche Taqueria",
    subtitle: "Restaurant Website",
    description:
      "A full multi-page website built for a family-owned authentic Mexican restaurant in Queens, NY. The site features a cinematic hero with parallax backgrounds, an interactive menu, gallery, online reservation form, Google Maps integration, and customer testimonials — all crafted to drive real foot traffic and reservations.",
    longDescription:
      "Built from scratch using HTML5, CSS3, and vanilla JavaScript, this project demonstrates the ability to deliver a complete, production-ready web presence for a local business. The site is fully responsive, includes smooth scroll animations, and has been live for the restaurant since launch.",
    image: RESTAURANT_IMG,
    icon: Utensils,
    iconColor: "#FFD700",
    tags: ["HTML5", "CSS3", "JavaScript", "W3.CSS", "Google Maps", "Font Awesome", "Responsive"],
    features: [
      "Multi-page architecture (Home, Menu, Gallery, Reservations)",
      "Parallax hero with background slideshow",
      "Interactive reservation form",
      "Google Maps embed with directions",
      "Mobile-first responsive design",
    ],
    links: {
      github: "https://github.com/ivanexee/Huitlacoche-Taqueria-Restaurant-website",
      live: "https://ivanexee.github.io/Huitlacoche-Taqueria-Restaurant-website",
    },
    client: "Huitlacoche Taqueria, Queens NY",
    year: "2025",
    type: "Client Project",
    accentColor: "#FFD700",
  },
  {
    id: 2,
    number: "02",
    title: "BC MentorHub",
    subtitle: "Brooklyn College Platform",
    description:
      "An AI-powered professor-rating and mentorship platform built exclusively for Brooklyn College students. Think 'Rate My Professor' — but smarter, with an integrated Gemini AI chatbot, real-time professor search, department filtering, student/faculty role authentication, bookmark system, and a fully interactive settings panel.",
    longDescription:
      "Built with TypeScript, React, and Tailwind CSS, this app showcases advanced front-end engineering: multi-role authentication flows, real-time filtering logic, AI chat integration via the Gemini API, and a polished component library. Designed to solve a real problem for thousands of Brooklyn College students.",
    image: BROOKLYN_IMG,
    icon: GraduationCap,
    iconColor: "#00E5FF",
    tags: ["TypeScript", "React", "Tailwind CSS", "Gemini AI", "Vite", "Lucide Icons", "CUNY"],
    features: [
      "AI-powered chatbot via Gemini API",
      "Multi-role auth (Student / Faculty)",
      "Real-time professor search & filtering",
      "Bookmark system for saved professors",
      "Department catalog with major filtering",
    ],
    links: {
      github: "https://github.com/ivanexee/Brooklyn-mentorHub-Project-Unofficial-",
      live: null,
    },
    client: "Brooklyn College, CUNY (Unofficial)",
    year: "2026",
    type: "Personal / Institutional Project",
    accentColor: "#00E5FF",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? "" : "lg:grid-flow-dense"}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${isEven ? "" : "lg:col-start-2"}`}>
          <div className="aspect-video lg:aspect-auto lg:h-full min-h-[280px] relative group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}15, transparent)`,
              }}
            />
            {/* Number badge */}
            <div className="absolute top-4 left-4">
              <span
                className="text-5xl font-black opacity-20"
                style={{ fontFamily: "Syne, sans-serif", color: project.accentColor }}
              >
                {project.number}
              </span>
            </div>
            {/* Type badge */}
            <div className="absolute top-4 right-4">
              <span className="tech-tag text-xs" style={{ color: project.accentColor, borderColor: `${project.accentColor}40` }}>
                {project.type}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`p-8 lg:p-10 flex flex-col justify-between ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}>
          <div>
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}30` }}
              >
                <project.icon className="w-6 h-6" style={{ color: project.accentColor }} />
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  {project.client} · {project.year}
                </p>
                <h3
                  className="text-2xl font-black text-white leading-tight"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: project.accentColor, fontFamily: "Outfit, sans-serif" }}>
                  {project.subtitle}
                </p>
              </div>
            </div>

            <p className="text-white/65 text-sm leading-relaxed mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
              {project.description}
            </p>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/55" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: project.accentColor }} />
                  {f}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="tech-tag"
                  style={{ color: project.accentColor, borderColor: `${project.accentColor}25`, background: `${project.accentColor}08` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-all duration-200"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0D0F14] transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)`,
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                <Globe className="w-4 h-4" />
                Live Site
              </a>
            ) : (
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/30 border border-white/5 cursor-not-allowed"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <Brain className="w-4 h-4" />
                Private Repo
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            03 / Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            Apps I've Built<br />
            <span className="text-gradient-cyan">For Real Clients</span>
          </h2>
          <div className="section-divider" />
          <p className="text-white/50 text-base mt-6 max-w-xl" style={{ fontFamily: "Outfit, sans-serif" }}>
            Every project here was built for a real purpose — a real business, a real institution, real users.
            No templates, no tutorials — just original code solving original problems.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/ivanexee"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <Github className="w-4 h-4" />
            See all repositories on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
