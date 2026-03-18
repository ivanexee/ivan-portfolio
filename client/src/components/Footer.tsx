/* ============================================================
   DESIGN: Dark Luxury Tech — Footer
   Minimal dark footer with links and copyright
   ============================================================ */
import { Github, Linkedin, Mail, Code2, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/5 bg-[#0A0C10] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-[#0D0F14]" />
            </div>
            <span className="font-bold text-base" style={{ fontFamily: "Syne, sans-serif" }}>
              <span className="text-white">Ivan</span>
              <span className="text-gradient-cyan">.</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-xs text-center" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            © {new Date().getFullYear()} Ivan. Built with React + TypeScript + Tailwind CSS.
          </p>

          {/* Social + scroll to top */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/ivanexee" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-white/40 hover:text-cyan-400 transition-colors">
              <Github className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-white/40 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="mailto:ivan.dev@outlook.com"
              className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-white/40 hover:text-cyan-400 transition-colors">
              <Mail className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-white/40 hover:text-cyan-400 transition-colors ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
