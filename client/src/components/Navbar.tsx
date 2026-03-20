/* ============================================================
   DESIGN: Editorial Navbar — withradiance.com inspired
   - Animated "Ivan" logo: letters slide in one by one on mount
   - Logo top-left, uppercase mono nav links top-right, one outlined CTA
   - Transparent on hero (dark), cream on scroll (light sections)
   ============================================================ */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const LOGO_LETTERS = ["I", "v", "a", "n"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isLight
            ? "bg-[#F5F3EE]/95 backdrop-blur-md border-b border-black/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Animated Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
              className="flex items-center gap-2 group"
            >
              {/* Square badge */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                className={`w-7 h-7 rounded-sm flex items-center justify-center font-black text-xs transition-colors duration-300 ${
                  isLight ? "bg-[#0D0D0D] text-[#F5F3EE]" : "bg-[#F0EEE8] text-[#0D0F12]"
                }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                IV
              </motion.div>

              {/* Animated name letters */}
              <span
                className={`font-bold text-sm tracking-tight overflow-hidden flex transition-colors duration-300 ${
                  isLight ? "text-[#0D0D0D]" : "text-[#F0EEE8]"
                }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {LOGO_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: "inline-block" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={isLight ? "nav-link-editorial" : "nav-link-editorial-light"}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex">
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75 }}
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className={`px-5 py-1.5 text-xs font-medium tracking-widest uppercase border transition-all duration-200 ${
                  isLight
                    ? "border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F3EE]"
                    : "border-[#F0EEE8]/40 text-[#F0EEE8] hover:bg-[#F0EEE8] hover:text-[#0D0F12]"
                }`}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Get Started
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <button
              className={`md:hidden p-2 transition-colors ${
                isLight ? "text-[#0D0D0D]" : "text-[#F0EEE8]"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-[#F5F3EE] border-b border-black/10 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="nav-link-editorial text-sm py-1 border-b border-black/6"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="mt-2 px-5 py-2.5 text-xs font-medium tracking-widest uppercase border border-[#0D0D0D] text-[#0D0D0D] text-center hover:bg-[#0D0D0D] hover:text-[#F5F3EE] transition-colors"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
