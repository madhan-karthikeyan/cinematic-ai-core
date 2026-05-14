import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/data/portfolio";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 md:px-10 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 max-w-3xl">
          <SectionLabel index="04">Experience</SectionLabel>
          <h2 className="mt-5 font-display text-4xl md:text-5xl tracking-tight text-text-primary">
            A short, focused trajectory.
          </h2>
        </Reveal>

        <div ref={ref} className="relative pl-10 md:pl-14">
          {/* track */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 md:left-5 top-0 w-px bg-gradient-to-b from-accent-cyan via-accent-indigo to-accent-violet shadow-[0_0_12px] shadow-accent-indigo"
          />

          <div className="space-y-16">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.org} delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute -left-[34px] md:-left-[42px] top-2 h-3 w-3 rounded-full bg-[var(--bg-primary)] border border-white/30 shadow-[0_0_0_4px_rgba(0,0,0,0.4),0_0_18px_rgba(79,70,229,0.5)]" />
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-tertiary">
                    {e.period}
                  </div>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight text-text-primary">
                    {e.role}
                  </h3>
                  <div className="text-text-secondary mt-1">
                    {e.org} · <span className="text-text-tertiary">{e.location}</span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-text-secondary leading-relaxed text-sm md:text-base relative pl-5"
                      >
                        <span className="absolute left-0 top-2.5 h-1 w-2 bg-text-tertiary/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-4">
                Education
              </div>
              <ul className="space-y-4">
                {EDUCATION.map((ed) => (
                  <li key={ed.school}>
                    <div className="text-text-primary">{ed.school}</div>
                    <div className="text-sm text-text-secondary">{ed.detail}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary mt-1">
                      {ed.period}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-4">
                Certifications
              </div>
              <ul className="space-y-3">
                {CERTIFICATIONS.map((c) => (
                  <li
                    key={c}
                    className="text-text-secondary text-sm leading-relaxed flex gap-2"
                  >
                    <span className="text-accent-cyan font-mono">▸</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
