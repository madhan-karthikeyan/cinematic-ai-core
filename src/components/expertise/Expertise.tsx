import { EXPERTISE } from "@/data/portfolio";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";

export function Expertise() {
  return (
    <section id="stack" className="relative px-6 md:px-10 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-3xl">
          <SectionLabel index="03">Technical Expertise</SectionLabel>
          <h2 className="mt-5 font-display text-4xl md:text-5xl tracking-tight text-text-primary">
            The stack behind the systems.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {EXPERTISE.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.05}>
              <div className="group glass rounded-2xl p-6 md:p-8 h-full relative overflow-hidden transition-all duration-700 ease-cinematic hover:border-white/15">
                <div
                  className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(50% 80% at 0% 0%, color-mix(in oklab, var(--accent-indigo) 18%, transparent), transparent 70%)",
                  }}
                />
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight text-text-primary">
                  {cat.title}
                </h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {cat.items.map((it) => (
                    <li
                      key={it}
                      className="font-mono text-xs px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.02] text-text-secondary group-hover:text-text-primary transition-colors duration-500 ease-cinematic"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
