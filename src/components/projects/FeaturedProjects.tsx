import { motion } from "framer-motion";
import { PROJECTS, type Project } from "@/data/portfolio";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { PipelineDiagram } from "./PipelineDiagram";

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <Reveal className="">
      <article className="group relative">
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* copy */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-cyan/80">
              {project.category}
            </div>
            <h3 className="mt-3 font-display text-4xl md:text-5xl tracking-tight text-text-primary">
              {project.name}
            </h3>
            <div className="mt-2 text-text-secondary text-sm md:text-base">
              {project.subtitle}
            </div>
            <p className="mt-5 text-text-secondary leading-relaxed max-w-xl">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {project.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-mono"
                >
                  <div className="text-text-primary text-xl md:text-2xl">{m.value}</div>
                  <div className="text-text-tertiary text-[10px] uppercase tracking-[0.16em] mt-1">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* visual side */}
          <div className="relative">
            <div className="relative rounded-3xl glass-strong p-6 md:p-8 overflow-hidden transition-all duration-700 ease-cinematic group-hover:border-white/20">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                style={{
                  background:
                    "radial-gradient(60% 60% at 30% 20%, color-mix(in oklab, var(--accent-indigo) 22%, transparent), transparent 70%)",
                }}
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-4 flex items-center justify-between">
                <span>architecture</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  live
                </span>
              </div>
              <PipelineDiagram nodes={project.pipeline} />

              <div className="mt-6 grid grid-cols-2 gap-3">
                {project.metrics.slice(0, 2).map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <div className="font-mono text-text-primary text-lg">{m.value}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </article>
    </Reveal>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative px-6 md:px-10 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-20 max-w-3xl">
          <SectionLabel index="01">Featured Projects</SectionLabel>
          <h2 className="mt-5 font-display text-4xl md:text-6xl tracking-tight text-text-primary text-balance">
            Engineering case studies
            <span className="text-text-tertiary"> — production systems, not prototypes.</span>
          </h2>
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {PROJECTS.map((p, i) => (
            <ProjectCase key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
