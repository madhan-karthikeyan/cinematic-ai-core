import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";

const NODES = [
  { label: "Input", sub: "query / document" },
  { label: "Embedding Pipeline", sub: "encoder + chunker" },
  { label: "Semantic Cache", sub: "cluster-indexed reuse" },
  { label: "Vector Retrieval", sub: "FAISS / ChromaDB" },
  { label: "LLM / Reranker", sub: "context-grounded" },
  { label: "Response", sub: "source-cited" },
];

export function ArchitectureShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="systems" className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 max-w-3xl">
          <SectionLabel index="05">Systems Thinking</SectionLabel>
          <h2 className="mt-5 font-display text-4xl md:text-5xl tracking-tight text-text-primary">
            Anatomy of a retrieval system.
          </h2>
          <p className="mt-5 text-text-secondary max-w-2xl leading-relaxed">
            Every component earns its place. Latency, observability, and graceful degradation
            are first-class design constraints.
          </p>
        </Reveal>

        <div ref={ref} className="glass-strong rounded-3xl p-6 md:p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              background:
                "radial-gradient(40% 60% at 30% 30%, color-mix(in oklab, var(--accent-indigo) 22%, transparent), transparent 70%)," +
                "radial-gradient(40% 60% at 80% 70%, color-mix(in oklab, var(--accent-cyan) 16%, transparent), transparent 70%)",
            }}
          />

          <div className="grid md:grid-cols-3 gap-x-6 gap-y-10 relative">
            {NODES.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                transition={{
                  duration: 0.7,
                  delay: 0.15 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 group hover:border-white/25 transition-all duration-700 ease-cinematic">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-tertiary">
                      node {String(i + 1).padStart(2, "0")}
                    </div>
                    <motion.span
                      initial={{ opacity: 0.3 }}
                      animate={inView ? { opacity: 1 } : undefined}
                      transition={{ delay: 0.15 * i + 0.4, duration: 0.6 }}
                      className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_12px] shadow-accent-cyan"
                    />
                  </div>
                  <div className="mt-3 font-display text-xl md:text-2xl tracking-tight text-text-primary">
                    {n.label}
                  </div>
                  <div className="mt-1 text-sm text-text-secondary">{n.sub}</div>
                </div>

                {/* connector arrow on desktop */}
                {i < NODES.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : undefined}
                    transition={{ delay: 0.15 * i + 0.3, duration: 0.5 }}
                    className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 items-center"
                  >
                    <span className="font-mono text-text-tertiary/60">→</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" /> async
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo" /> cache-aware
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-violet" /> source-cited
            </span>
            <span className="ml-auto">cubic-bezier(0.22, 1, 0.36, 1)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
