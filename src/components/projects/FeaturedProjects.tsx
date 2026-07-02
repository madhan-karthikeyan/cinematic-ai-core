import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { FEATURED_PROJECTS, type Project } from "@/data/portfolio";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";

const DecisionDriftVisual = lazy(() =>
  import("./visuals/DecisionDriftVisual").then((m) => ({ default: m.DecisionDriftVisual })),
);
const ApexVisual = lazy(() =>
  import("./visuals/ApexVisual").then((m) => ({ default: m.ApexVisual })),
);
const JobLensVisual = lazy(() =>
  import("./visuals/JobLensVisual").then((m) => ({ default: m.JobLensVisual })),
);
const SatelliteVisual = lazy(() =>
  import("./visuals/SatelliteVisual").then((m) => ({ default: m.SatelliteVisual })),
);
const CinemaVisual = lazy(() =>
  import("./visuals/CinemaVisual").then((m) => ({ default: m.CinemaVisual })),
);

const VISUALS: Record<string, React.ComponentType> = {
  decisiondrift: DecisionDriftVisual,
  apex: ApexVisual,
  joblens: JobLensVisual,
  satellite: SatelliteVisual,
  cinema: CinemaVisual,
};

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const Visual = VISUALS[project.id];
  return (
    <Reveal>
      <article className="group relative">
        <div
          className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center flex-col-reverse flex lg:grid ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* copy */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              {project.category}
            </div>
            <h3 className="mt-3 font-display text-4xl md:text-5xl tracking-tight text-text-primary">
              {project.name}
            </h3>
            <div className="mt-2 text-text-secondary text-sm md:text-base">{project.subtitle}</div>
            <p className="mt-6 text-text-secondary leading-relaxed max-w-xl">
              {project.description}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary"
            >
              {project.stack.slice(0, 6).map((s) => (
                <span key={s}>{s}</span>
              ))}
            </motion.div>

            {(project.github || project.demo) && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 flex flex-wrap gap-3"
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono uppercase tracking-[0.22em] text-text-secondary hover:text-text-primary transition-colors ease-cinematic flex items-center gap-1.5"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    {project.github.includes("github") ? "Source" : "Repository"}
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent-cyan hover:text-text-primary transition-colors ease-cinematic flex items-center gap-1.5"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* visual */}
          <div className="relative">
            {Visual ? (
              <Suspense
                fallback={
                  <div className="h-full w-full aspect-[1000/620] bg-black/20 rounded-2xl border border-white/[0.04] animate-pulse" />
                }
              >
                <Visual />
              </Suspense>
            ) : null}
          </div>
        </div>
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
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

        <div className="space-y-24 md:space-y-32">
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectCase key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
