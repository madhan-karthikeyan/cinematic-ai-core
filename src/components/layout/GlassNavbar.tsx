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
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 w-[min(820px,calc(100%-2rem))]"
    >
      <nav
        className={`flex items-center justify-between gap-4 rounded-full pl-4 pr-2 py-1.5 ease-cinematic transition-all duration-700 ${
          scrolled
            ? "bg-black/40 border border-white/[0.07] backdrop-blur-xl backdrop-saturate-150"
            : "bg-white/[0.02] border border-white/[0.05] backdrop-blur-md"
        }`}
      >
        <a
          href="#top"
          className="font-display text-[13px] tracking-tight flex items-center gap-2 text-text-primary/90"
        >
          <span className="h-1 w-1 rounded-full bg-accent-cyan/80" />
          <span>MK</span>
        </a>
        <ul className="hidden md:flex items-center gap-0.5 text-[13px] text-text-secondary">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="relative px-3 py-1.5 rounded-full hover:text-text-primary transition-colors duration-500 ease-cinematic group"
              >
                {n.label}
                <span className="absolute left-3 right-3 bottom-1 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-cinematic bg-text-primary/40" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-text-secondary hover:text-text-primary border border-white/[0.06] hover:border-white/15 transition-all ease-cinematic"
        >
          Resume
        </a>
      </nav>
    </motion.header>
  );
}
