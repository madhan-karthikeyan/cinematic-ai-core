import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

export function Portrait() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-[3/4]">
      {/* dual-tone ambient light behind portrait */}
      <motion.div
        aria-hidden
        className="absolute inset-[-25%] -z-10 blur-[80px]"
        animate={{ opacity: [0.55, 0.7, 0.55] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(38% 50% at 28% 35%, color-mix(in oklab, var(--accent-cyan) 28%, transparent), transparent 70%)," +
            "radial-gradient(42% 55% at 72% 65%, color-mix(in oklab, var(--accent-warm) 22%, transparent), transparent 72%)",
        }}
      />

      {/* soft atmospheric depth layer */}
      <div
        aria-hidden
        className="absolute inset-[-10%] -z-10 blur-2xl opacity-60"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 55%, color-mix(in oklab, white 4%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(14px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative h-full w-full"
      >
        <motion.img
          src={portrait}
          alt="Madhan Karthikeyan portrait"
          className="absolute inset-0 h-full w-full object-contain object-bottom select-none pointer-events-none"
          style={{
            filter:
              "drop-shadow(-22px -2px 36px rgba(59,130,246,0.32)) drop-shadow(26px 18px 44px rgba(255,165,90,0.18)) drop-shadow(0 36px 64px rgba(0,0,0,0.65))",
            maskImage:
              "radial-gradient(ellipse 88% 92% at 50% 48%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 88% 92% at 50% 48%, black 55%, transparent 100%)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
        />
        {/* fade into the page */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 12%, color-mix(in oklab, var(--bg-primary) 70%, transparent) 55%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, color-mix(in oklab, var(--bg-primary) 60%, transparent), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, color-mix(in oklab, var(--bg-primary) 60%, transparent), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
