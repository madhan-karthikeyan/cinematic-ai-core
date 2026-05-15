import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "> initializing retrieval systems...",
  "> loading semantic pipelines...",
  "> embedding portfolio interface...",
  "> system online.",
];

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    const interval = setInterval(() => {
      setShown((s) => {
        if (s >= LINES.length) return s;
        return s + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(() => setExiting(true), 300);
      const t2 = setTimeout(() => onDone(), 800);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [shown, onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]"
        >
          <div className="font-mono text-sm md:text-base text-text-secondary w-[min(560px,90vw)] space-y-2">
            <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-tertiary">
              <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
              system boot
            </div>
            {LINES.slice(0, shown).map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={i === LINES.length - 1 ? "text-text-primary" : ""}
              >
                {l}
              </motion.div>
            ))}
            {shown < LINES.length && (
              <span className="inline-block h-4 w-2 translate-y-0.5 bg-text-secondary animate-pulse" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
