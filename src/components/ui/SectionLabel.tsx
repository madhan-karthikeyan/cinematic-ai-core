import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-text-tertiary flex items-center gap-3">
      <span>{index}</span>
      <span className="h-px w-10 bg-text-tertiary/40" />
      {children}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
