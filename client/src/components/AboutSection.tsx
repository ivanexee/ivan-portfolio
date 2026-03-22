/* ============================================================
   DESIGN: Editorial About — withradiance.com inspired
   - Orbiting coding language logos around Ivan's photo
   - Two rings: inner (slow) and outer (fast, reverse)
   - Fully responsive, elevated language, no AI references
   ============================================================ */
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const IVAN_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030255758/DDfpWJxoFfb5X2JWXTp5x7/ivan-photo_226dbee6.jpg";

const highlights = [
  { label: "Location", value: "New York City, NY" },
  { label: "Focus", value: "Full-Stack Web Development" },
  { label: "Education", value: "Columbia University & Brooklyn College" },
  { label: "GitHub", value: "@ivanexee" },
];

// Language items: name + SVG icon path (devicons CDN)
const INNER_LANGS = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
];

const OUTER_LANGS = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "Ruby", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
  { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

interface OrbitItem {
  name: string;
  icon: string;
}

interface OrbitRingProps {
  items: OrbitItem[];
  radius: number;
  duration: number;
  reverse?: boolean;
  itemSize: number;
  inView: boolean;
}

function OrbitRing({ items, radius, duration, reverse = false, itemSize, inView }: OrbitRingProps) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    const speed = (360 / duration) * (reverse ? -1 : 1); // degrees per second

    const tick = (time: number) => {
      if (lastTimeRef.current) {
        const delta = (time - lastTimeRef.current) / 1000;
        setAngle(a => a + speed * delta);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, duration, reverse]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: radius * 2,
        height: radius * 2,
        marginTop: -radius,
        marginLeft: -radius,
        pointerEvents: "none",
      }}
    >
      {items.map((item, i) => {
        const baseAngle = (360 / items.length) * i;
        const totalAngle = baseAngle + angle;
        const rad = (totalAngle * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        // Counter-rotate the badge so it stays upright
        const counterRot = -totalAngle;

        return (
          <div
            key={item.name}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(${x - itemSize / 2}px, ${y - itemSize / 2}px) rotate(${counterRot}deg)`,
              width: itemSize,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              pointerEvents: "auto",
            }}
            title={item.name}
          >
            <div
              style={{
                width: itemSize * 0.72,
                height: itemSize * 0.72,
                borderRadius: "50%",
                background: "rgba(13,13,13,0.88)",
                border: "1.5px solid rgba(0,200,224,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0,200,224,0.08)",
                backdropFilter: "blur(4px)",
              }}
            >
              <img
                src={item.icon}
                alt={item.name}
                style={{ width: "55%", height: "55%", objectFit: "contain" }}
                loading="lazy"
              />
            </div>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.38rem",
                letterSpacing: "0.08em",
                color: "rgba(13,13,13,0.45)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);

  // Orbit sizes — responsive via state
  const [orbitSize, setOrbitSize] = useState({ inner: 220, outer: 310, photo: 260, item: 52, outerItem: 46 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setOrbitSize({ inner: 155, outer: 218, photo: 180, item: 40, outerItem: 34 });
      } else if (w < 768) {
        setOrbitSize({ inner: 185, outer: 260, photo: 215, item: 46, outerItem: 40 });
      } else {
        setOrbitSize({ inner: 220, outer: 310, photo: 260, item: 52, outerItem: 46 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="about" style={{ background: "#F5F3EE", color: "#0D0D0D" }} ref={ref}>
      {/* Section header rule */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="section-num">(01)</span>
          <span className="section-category">(THE DEVELOPER)</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left: photo with orbiting language rings */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex justify-center items-center"
            style={{
              position: "relative",
              height: (orbitSize.outer + orbitSize.outerItem) * 2 + 20,
              width: "100%",
            }}
          >
            {/* Orbit rings (visual dashed guides) */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: orbitSize.inner * 2,
              height: orbitSize.inner * 2,
              marginTop: -orbitSize.inner,
              marginLeft: -orbitSize.inner,
              borderRadius: "50%",
              border: "1px dashed rgba(0,200,224,0.12)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: orbitSize.outer * 2,
              height: orbitSize.outer * 2,
              marginTop: -orbitSize.outer,
              marginLeft: -orbitSize.outer,
              borderRadius: "50%",
              border: "1px dashed rgba(0,200,224,0.07)",
              pointerEvents: "none",
            }} />

            {/* Inner orbit ring */}
            <OrbitRing
              items={INNER_LANGS}
              radius={orbitSize.inner}
              duration={28}
              reverse={false}
              itemSize={orbitSize.item}
              inView={inView}
            />

            {/* Outer orbit ring — reverse direction */}
            <OrbitRing
              items={OUTER_LANGS}
              radius={orbitSize.outer}
              duration={44}
              reverse={true}
              itemSize={orbitSize.outerItem}
              inView={inView}
            />

            {/* Center: photo */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: orbitSize.photo,
              height: orbitSize.photo,
              marginTop: -orbitSize.photo / 2,
              marginLeft: -orbitSize.photo / 2,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(0,200,224,0.45)",
              boxShadow: "0 0 40px rgba(0,200,224,0.12), 0 24px 60px rgba(0,0,0,0.22)",
              zIndex: 10,
            }}>
              <img
                src={IVAN_PHOTO}
                alt="Ivan — App Developer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "contrast(1.04) brightness(1.02)",
                }}
              />
              {/* Subtle gradient overlay */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 100%)",
                borderRadius: "0 0 50% 50%",
              }} />
              {/* Name tag */}
              <div style={{
                position: "absolute",
                bottom: "18%",
                left: 0, right: 0,
                textAlign: "center",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#F5F3EE", letterSpacing: "-0.02em", lineHeight: 1.1 }}>Ivan</p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.45rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.5)", textTransform: "uppercase", marginTop: "3px" }}>App Developer · NYC</p>
              </div>
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="animate-float"
              style={{
                position: "absolute",
                top: "8%",
                right: "8%",
                background: "#0D0D0D",
                padding: "0.65rem 1rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                zIndex: 20,
                border: "1px solid rgba(0,200,224,0.18)",
              }}
            >
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#00C8E0", lineHeight: 1 }}>15+</p>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.42rem", letterSpacing: "0.12em", color: "rgba(240,238,232,0.4)", textTransform: "uppercase", marginTop: "3px" }}>Projects</p>
            </motion.div>
          </motion.div>

          {/* Right: editorial text */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", letterSpacing: "0.15em", color: "rgba(13,13,13,0.38)", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Why Ivan?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#0D0D0D", marginBottom: "1.5rem" }}
            >
              Every language.<br />Every platform.<br />Your vision — built.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "rgba(13,13,13,0.6)", lineHeight: 1.8, marginBottom: "1.25rem" }}
            >
              I'm Ivan — a New York City-based developer who has mastered the full spectrum of programming languages and frameworks. From a family-owned taqueria in Queens to a mentorship platform for Brooklyn College students, I build production-ready digital products that perform at the highest level.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "rgba(13,13,13,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}
            >
              Whether it's HTML, CSS, JavaScript, TypeScript, Python, Java, C++, C#, Ruby, Swift, Go, Rust, or any framework in between — I command the tools, not the other way around. My education at Columbia University and Brooklyn College sharpened both my theoretical foundations and my real-world engineering instincts.
            </motion.p>

            {/* Highlights grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  onHoverStart={() => setHoveredHighlight(i)}
                  onHoverEnd={() => setHoveredHighlight(null)}
                  animate={{ borderLeftColor: hoveredHighlight === i ? "#0D0D0D" : "#00C8E0" }}
                  transition={{ duration: 0.2 }}
                  style={{ borderLeft: "2px solid #00C8E0", paddingLeft: "0.75rem", cursor: "default" }}
                >
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(13,13,13,0.33)", textTransform: "uppercase" }}>
                    {item.label}
                  </p>
                  <motion.p
                    animate={{ color: hoveredHighlight === i ? "#00C8E0" : "#0D0D0D" }}
                    transition={{ duration: 0.2 }}
                    style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", fontWeight: 500, marginTop: "2px" }}
                  >
                    {item.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="https://github.com/ivanexee"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F3EE] transition-colors duration-200"
              >
                View GitHub Profile →
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="border-t py-6 overflow-hidden" style={{ borderColor: "rgba(13,13,13,0.08)" }}>
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(13,13,13,0.28)", textTransform: "uppercase", textAlign: "center", marginBottom: "1.25rem" }}>
          Trusted by founders &amp; growing businesses
        </p>
        <div className="marquee-outer">
          <div className="marquee-track-slow">
            {[
              "Huitlacoche Taqueria", "Brooklyn College", "Columbia University", "React",
              "TypeScript", "Node.js", "Python", "Java", "C++", "Full-Stack Dev",
              "Huitlacoche Taqueria", "Brooklyn College", "Columbia University", "React",
              "TypeScript", "Node.js", "Python", "Java", "C++", "Full-Stack Dev",
            ].map((item, i) => (
              <span
                key={i}
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(0.85rem, 2vw, 1.05rem)", color: "rgba(13,13,13,0.16)", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
              >
                {item}
                <span style={{ margin: "0 2rem", color: "rgba(13,13,13,0.1)" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
