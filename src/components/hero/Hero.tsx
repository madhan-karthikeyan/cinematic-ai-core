import { motion } from "framer-motion";
import { Portrait } from "./Portrait";
import { PROFILE } from "@/data/portfolio";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] pt-20 md:pt-24 pb-20 md:pb-28 px-6 md:px-12"
    >
      {/* environmental dual-tone lighting */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ opacity: [0.78, 0.92, 0.78] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute -top-56 -left-44 h-[58vh] w-[58vh] rounded-full blur-[140px] opacity-22"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent-cyan) 24%, transparent), transparent 75%)",
          }}
        />
        <div
          className="absolute -bottom-52 -right-44 h-[62vh] w-[62vh] rounded-full blur-[140px] opacity-18"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent-warm) 22%, transparent), transparent 75%)",
          }}
        />
        <div
          className="absolute top-[18%] left-[30%] h-[75vh] w-[80vh] rounded-full blur-[200px] opacity-[0.07]"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent-cyan) 16%, transparent), transparent 75%)",
          }}
        />
        <div
          className="absolute top-[38%] left-[15%] right-[25%] h-px blur-[3px] opacity-[0.04]"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent-cyan) 15%, transparent) 50%, transparent)",
          }}
        />
        <div
          className="absolute top-[5%] left-[5%] h-[90vh] w-[120vh] rounded-full blur-[300px] opacity-[0.045]"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent-cyan) 12%, transparent), transparent 75%)",
          }}
        />
        <div
          className="absolute top-[12%] left-[20%] h-[80vh] w-[100vh] rounded-full blur-[280px] opacity-[0.035]"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, color-mix(in oklab, var(--accent-indigo) 40%, var(--accent-cyan)) 14%, transparent), transparent 75%)",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-8 items-start">
        <motion.div
          variants={stagger(0.1, 0.12)}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-[10px] uppercase tracking-[0.36em] text-text-tertiary mb-7 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-text-tertiary/50" />
            {PROFILE.role}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold text-[clamp(2.25rem,5.6vw,4.75rem)] leading-[0.96] tracking-tight text-text-primary"
          >
            {PROFILE.firstName}
            <br />
            <span className="bg-gradient-to-r from-text-primary via-text-primary to-text-secondary bg-clip-text text-transparent">
              {PROFILE.lastName}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-12 max-w-sm text-balance text-[16.5px] md:text-[17.5px] text-text-secondary leading-relaxed"
          >
            {PROFILE.tagline}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-sm text-[13.5px] text-text-tertiary leading-relaxed"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-medium glass-strong hover:bg-white/10 transition-all ease-cinematic"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <span className="inline-block transition-transform duration-500 ease-cinematic group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </a>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-6 py-3 text-sm font-medium glass hover:bg-white/[0.08] transition-all ease-cinematic"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="rounded-full px-5 py-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors ease-cinematic"
            >
              Contact →
            </a>
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2 lg:-translate-y-[5.25rem] lg:translate-x-12">
          <Portrait />
        </div>
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-text-tertiary/70 hover:text-text-secondary transition-colors ease-cinematic"
      >
        scroll
        <span className="h-10 w-px bg-gradient-to-b from-text-tertiary/60 to-transparent" />
      </motion.a>
    </section>
  );
}
