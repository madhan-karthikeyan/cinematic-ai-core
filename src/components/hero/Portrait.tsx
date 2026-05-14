import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

const WIDGETS = [
  { label: "Semantic Retrieval", value: "<500ms latency", pos: "top-[6%] -left-[8%]", delay: 0.2 },
  { label: "Vector Systems", value: "FAISS + ChromaDB", pos: "top-[34%] -right-[10%]", delay: 0.4 },
  { label: "Async Infrastructure", value: "Redis · Celery", pos: "bottom-[22%] -left-[10%]", delay: 0.6 },
  { label: "Production ML", value: "Systems @ scale", pos: "bottom-[6%] right-[2%]", delay: 0.8 },
];

export function Portrait() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-[3/4]">
      {/* glow backdrop */}
      <div
        className="absolute inset-[-15%] -z-10 blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(45% 50% at 30% 30%, color-mix(in oklab, var(--accent-cyan) 30%, transparent), transparent 70%)," +
            "radial-gradient(50% 55% at 70% 60%, color-mix(in oklab, var(--accent-warm) 18%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: "blur(14px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative h-full w-full"
      >
        <motion.img
          src={portrait}
          alt="Madhan Karthikeyan portrait"
          className="absolute inset-0 h-full w-full object-contain object-bottom select-none pointer-events-none"
          style={{
            filter:
              "drop-shadow(-18px 0 28px rgba(59,130,246,0.35)) drop-shadow(22px 18px 42px rgba(255,170,90,0.12)) drop-shadow(0 30px 50px rgba(0,0,0,0.6))",
            maskImage:
              "radial-gradient(ellipse 90% 95% at 50% 55%, black 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 95% at 50% 55%, black 60%, transparent 100%)",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
        />
        {/* bottom fade into darkness */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent" />
      </motion.div>

      {/* floating glass widgets */}
      {WIDGETS.map((w) => (
        <motion.div
          key={w.label}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.2 + w.delay }}
          className={`hidden md:block absolute ${w.pos}`}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6 + w.delay * 2, repeat: Infinity, ease: "easeInOut" }}
            className="glass rounded-xl px-3.5 py-2.5 min-w-[180px]"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
              {w.label}
            </div>
            <div className="font-mono text-xs text-text-primary mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px] shadow-accent-cyan" />
              {w.value}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
