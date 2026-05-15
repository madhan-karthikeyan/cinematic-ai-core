import { PROFILE } from "@/data/portfolio";
import { Reveal } from "@/components/ui/SectionLabel";

const LINKS = [
  { label: "GitHub", href: PROFILE.github },
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "Email", href: `mailto:${PROFILE.email}` },
  { label: "Resume", href: PROFILE.resume },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-10 py-28 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-text-tertiary">
            05 — Contact
          </div>
          <h2 className="mt-6 font-display text-5xl md:text-7xl tracking-tight text-text-primary text-balance">
            Let's build intelligent systems.
          </h2>
          <p className="mt-6 text-text-secondary max-w-xl mx-auto leading-relaxed">
            Open to roles in AI infrastructure, retrieval systems, and backend engineering.
            Currently based in India.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") || l.href.endsWith(".pdf") ? "_blank" : undefined}
                rel="noreferrer"
                className="group rounded-full px-6 py-3 glass hover:bg-white/8 transition-all ease-cinematic flex items-center gap-2"
              >
                {l.label}
                <span className="inline-block transition-transform duration-500 ease-cinematic group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 font-mono text-xs text-text-tertiary">
            {PROFILE.email}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-text-tertiary">
        <div>Designed & engineered by Madhan Karthikeyan</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
          system online · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
