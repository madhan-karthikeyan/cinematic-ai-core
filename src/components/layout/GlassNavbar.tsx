import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Systems", href: "#systems" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(900px,calc(100%-2rem))]"
    >
      <nav
        className={`flex items-center justify-between gap-4 rounded-full px-3 py-2 ease-cinematic transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : "glass"
        }`}
      >
        <a
          href="#top"
          className="font-display text-sm pl-3 tracking-tight flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_12px] shadow-accent-cyan" />
          <span>MK</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 text-sm text-text-secondary">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="relative px-3 py-1.5 rounded-full hover:text-text-primary transition-colors ease-cinematic group"
              >
                {n.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-cinematic bg-gradient-to-r from-accent-cyan to-accent-indigo" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest glass hover:bg-white/10 transition-colors ease-cinematic"
        >
          Resume
        </a>
      </nav>
    </motion.header>
  );
}
