import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

export function Portrait() {
  return (
    <div className="relative w-full max-w-[280px] md:max-w-[400px] lg:max-w-[620px] mx-auto aspect-[3/4]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[2%] -left-[2%] w-[52%] h-[38%] blur-[85px] opacity-[0.36]"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 20%, color-mix(in oklab, var(--accent-cyan) 48%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute top-[8%] left-[28%] w-[44%] h-[32%] blur-[70px] opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 30%, color-mix(in oklab, var(--accent-cyan) 25%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute -top-[1%] right-[4%] w-[32%] h-[34%] blur-[55px] opacity-[0.1]"
          style={{
            background:
              "radial-gradient(ellipse 45% 35% at 65% 20%, color-mix(in oklab, var(--accent-cyan) 28%, transparent), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(14px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative h-full w-full"
        style={{
          maskImage: "radial-gradient(ellipse 80% 55% at 48% 28%, black 32%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 48% 28%, black 32%, transparent 100%)",
        }}
      >
        <motion.img
          src={portrait}
          alt="Madhan Karthikeyan portrait"
          className="absolute inset-0 h-full w-full object-contain object-center select-none pointer-events-none"
          style={{
            filter: "brightness(1.06) drop-shadow(-18px -3px 28px rgba(110,197,255,0.28))",
            willChange: "transform",
            transform: "translateZ(0)"
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 1%, color-mix(in oklab, var(--bg-primary) 90%, transparent) 10%, color-mix(in oklab, var(--bg-primary) 50%, transparent) 22%, transparent 35%)",
          }}
        />
      </motion.div>
    </div>
  );
}
