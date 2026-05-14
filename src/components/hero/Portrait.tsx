import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

export function Portrait() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-[3/4]">
      {/* outer dual-tone aura */}
      <motion.div
        aria-hidden
        className="absolute inset-[-30%] -z-10 blur-[90px]"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(40% 50% at 26% 38%, color-mix(in oklab, var(--accent-cyan) 26%, transparent), transparent 72%)," +
            "radial-gradient(44% 55% at 74% 64%, color-mix(in oklab, var(--accent-warm) 20%, transparent), transparent 74%)",
        }}
      />

      {/* volumetric inner aura ring */}
      <motion.div
        aria-hidden
        className="absolute inset-[-8%] -z-10 blur-[60px] opacity-70"
        animate={{ opacity: [0.55, 0.78, 0.55] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(48% 52% at 50% 52%, color-mix(in oklab, white 6%, transparent), transparent 68%)",
        }}
      />

      {/* atmospheric haze that matches bg, used to dissolve cropped edges */}
      <div
        aria-hidden
        className="absolute inset-[-4%] -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(58% 62% at 50% 56%, color-mix(in oklab, var(--bg-primary) 0%, transparent), color-mix(in oklab, var(--bg-primary) 70%, transparent) 78%)",
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
              "drop-shadow(-22px -2px 40px rgba(59,130,246,0.30)) drop-shadow(26px 18px 48px rgba(255,165,90,0.16)) drop-shadow(0 40px 70px rgba(0,0,0,0.7))",
            // composite a radial soft-edge mask AND a vertical fade so shoulders dissolve
            maskImage:
              "radial-gradient(ellipse 78% 88% at 50% 46%, black 50%, rgba(0,0,0,0.55) 78%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 98%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 78% 88% at 50% 46%, black 50%, rgba(0,0,0,0.55) 78%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 98%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
        />

        {/* layered fade-into-page gradients (bottom + sides) */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 8%, color-mix(in oklab, var(--bg-primary) 75%, transparent) 45%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, color-mix(in oklab, var(--bg-primary) 70%, transparent), transparent 80%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, color-mix(in oklab, var(--bg-primary) 70%, transparent), transparent 80%)",
          }}
        />
      </motion.div>
    </div>
  );
}
