import { motion } from "framer-motion";
import { PROJECTS, type Project } from "@/data/portfolio";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { MediCoreTopology } from "./visuals/MediCoreTopology";
import { SatelliteRetrievalMap } from "./visuals/SatelliteRetrievalMap";
import { RagOrchestrationGraph } from "./visuals/RagOrchestrationGraph";
import { DriftBenchTemporal } from "./visuals/DriftBenchTemporal";
import { ClusterRetrievalTopology } from "./visuals/ClusterRetrievalTopology";

const VISUALS: Record<string, React.ComponentType> = {
  medicore: MediCoreTopology,
  satellite: SatelliteRetrievalMap,
  rag: RagOrchestrationGraph,
  driftbench: DriftBenchTemporal,
  cluster: ClusterRetrievalTopology,
};

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const Visual = VISUALS[project.id];
  return (
    <Reveal>
      <article className="group relative">
        <div
          className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center ${
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
            <div className="mt-2 text-text-secondary text-sm md:text-base">
              {project.subtitle}
            </div>
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
          </div>

          {/* visual */}
          <div className="relative">{Visual ? <Visual /> : null}</div>
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
          {PROJECTS.map((p, i) => (
            <ProjectCase key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
