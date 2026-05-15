import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV = [
  { label: "Projects", href: "#projects" },
  { label: "Systems", href: "#systems" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    const sections = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean);
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 w-[min(1040px,calc(100%-2rem))]"
    >
      <nav
        className={`flex items-center justify-between gap-4 rounded-full pl-4 pr-2 py-1 ease-cinematic transition-all duration-700 ${
          scrolled
            ? "bg-black/35 border border-white/[0.05] backdrop-blur-xl backdrop-saturate-150"
            : "bg-white/[0.015] border border-white/[0.035] backdrop-blur-md"
        }`}
      >
        <a
          href="#top"
          className="font-display text-[13px] tracking-tight flex items-center gap-2 text-text-primary/85"
        >
          <span className="h-1 w-1 rounded-full bg-text-primary/40" />
          <span>MK</span>
        </a>
        <ul className="hidden md:flex items-center gap-0.5 text-[12.5px] text-text-secondary/90">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`relative px-3 py-1.5 rounded-full transition-colors duration-500 ease-cinematic group ${
                  active === n.href
                    ? "text-text-primary"
                    : "text-text-secondary/90 hover:text-text-primary"
                }`}
              >
                {n.label}
                <span
                  className={`absolute left-3 right-3 bottom-1 h-px transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active === n.href
                      ? "scale-x-100 bg-text-primary/50"
                      : "scale-x-0 bg-text-primary/35 group-hover:scale-x-100"
                  }`}
                />
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
